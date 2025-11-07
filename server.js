// server.js (main entry)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const jwt = require("jsonwebtoken");
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const path = require("path");

const user = require("./models/User");
const Police = require('./models/Police');
const Penalty = require("./models/Penalty");
// Connect to MongoDB
connectDB();
app.use(express.static(path.join(__dirname,"./JS")));
app.use(express.static(path.join(__dirname,"./locals")));
// Middleware
app.use(express.json());
app.use(morgan("common")); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./locals"));
app.use(cookieParser())

// Routes
app.use('/api', authRoutes);


app.get("/Login",(req,res)=>{
  res.sendFile(path.join(__dirname,"./locals/login.html"))
})
app.get("/police/chalan",(req,res)=>{
    const Token = req.cookies.police;
  if (Token) {
    jwt.verify(Token,process.env.Secret,(err,data)=>{
      if(err) {
        console.log(err)
        res.redirect("/Login")
      }
      const ID = data.id;
      Police.findOne({"_id":ID})
      .then(info=>{
          res.status(200).render("police",{info});
      })
})
  }
  else {
    res.redirect("Login/police");
  }

  // res.sendFile(path.join(__dirname,"./locals/police.html"))
})
app.get("/police/registration",(req,res)=>{
  res.sendFile(path.join(__dirname,"./locals/police-reg.html"))
})
app.get("/dashboard/police",async (req,res)=>{
  const Token = req.cookies.police;
  if (Token) {
    jwt.verify(Token,process.env.Secret,async(err,data)=>{
      const ID = data.id;
      const due =await Penalty.find({"issuedBy":data.id,"status":"due"}).countDocuments();
      const Paid = await Penalty.find({"issuedBy":data.id,"status":"paid"}).countDocuments();
      const chalans = await Penalty.find({"issuedBy":data.id}).countDocuments();
      const taka = await Penalty.find({"issuedBy":data.id,"status":"paid"},{amount:-1});
      const PoliceObj = {
        due,Paid,chalans,taka
      }
      const penal = await  Penalty.find({"issuedBy":data.id});
      Police.findOne({"_id":ID})
      .then(info=>{
          res.status(200).render("police-dash",{info,PoliceObj,penal});
      })
    })
  }
  else {
     res.redirect("Login/police");
  }
})
app.get("/Login/police",(req,res)=>{
  res.sendFile(path.join(__dirname,"./locals/police-log.html"))
})
app.get("/Registration",(req,res)=>{
  res.sendFile(path.join(__dirname,"./locals/register.html"))
})

app.get("/check-ai", async (req, res) => {
  try {
    const data = await Penalty.find({}, { "Zone": -1, "violation": -1, "issuedAt": -1 }).limit(100);
    
    const prompt = `Please analyze this traffic penalty data and predict high-risk zones. Summarize key insights helpful to drivers, such as top violation types, risky areas, and tips to avoid fines.Use only <strong> html tag . Data: ${JSON.stringify(data, null, 2)}`;
    
    // Prepare payload for Traffic AI
    const aiPayload = {
      message: prompt
    };
    
    // Send to Traffic AI API
    const aiUrl = 'https://ai-production-b107.up.railway.app/talk';
    const aiResponse = await fetch(aiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiPayload)
    });
    
    if (!aiResponse.ok) {
      throw new Error(`Traffic AI API error: ${aiResponse.status} - ${aiResponse.statusText}`);
    }
    
    const aiData = await aiResponse.json();
    const aiReply = aiData.reply || 'No response from AI.';
    
    // Send AI reply back to client (you could also include raw data if needed)
    res.json({
      success: true,
      summary: aiReply,
    });
    
  } catch (error) {
    console.error('Error in /check-ai:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI insights: ' + error.message
    });
  }
});
 

app.get("/dashboard",(req,res)=>{
  const Token = req.cookies.traffu;
  if (Token) {
    jwt.verify(Token,process.env.Secret,(err,data)=>{
      if(err) {
        console.log(err)
        res.redirect("/Login")
      }
      const ID = data.id;
   
      user.findOne({"_id":ID})
      .then( async info=>{   
        const unpaid =  await Penalty.find({"carNumber":info.carNumber,"status":"due"});
        const Paid =  await Penalty.find({"carNumber":info.carNumber,"status":"paid"});
        const BesiInfo = {unpaid,Paid}
          res.status(200).render("dashboard",{info,BesiInfo});
      })
})
  }
  else {
    res.redirect("Login");
  }

})



app.post("/api/penalty", (req,res)=>{
   const Token = req.cookies.police;
  if (Token) {
    jwt.verify(Token,process.env.Secret,async (err,data)=>{
      const officer =await Police.findOne({"_id":data.id});
   
  const { carNumber, licenseNumber, amount, violation } = req.body;
  const NameAndRank = `${officer.rank} ${officer.name}` 
  user.findOne({"carNumber":carNumber.toUpperCase().trim()})
  .then(async info =>{
    if(info) {
    if(info.drivingLicense === licenseNumber.trim()) {
        try {
    const penalty = new Penalty({
      carNumber: carNumber.toUpperCase().trim(),
      licenseNumber: licenseNumber.trim(),
      amount: parseInt(amount),
      violation: violation.trim(),
      issuedBy: data.id,
      Zone: officer.checkpost,
      NameAndRank,
      Driver:info.name,
    });
    await penalty.save();

    res.status(201).json({
      success: true,
      message: 'Penalty issued successfully',
    
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
    }
    else {
        res.status(500).json({ success: false, message: "License and Account Doesn't match " });
    }
  }
  else {
      res.status(500).json({ success: false, message: "Not registered" });
  }
  })
 })
  } else {
     res.status(500).json({ success: false, message: 'Not Auth...' });
  }
});
app.get("/logout/:id",(req,res)=>{
  if(req.params.id === "police") {
     res.cookie("police", "", {
        maxAge: 1,
    })
    res.json(1);
  }
  else if (req.params.id === "traffu") {
    res.cookie("traffu", "", {
        maxAge: 1,
    })
    res.json(1);
  }
  else {
    res.json(0)
  }
})
app.get("/traffu",(req,res)=>{
   res.sendFile(path.join(__dirname,"./locals/traffu.html"))
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});