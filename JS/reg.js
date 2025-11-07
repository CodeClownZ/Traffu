// Login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            nid: document.getElementById('nid').value,
            drivingLicense: document.getElementById('drivingLicense').value,
            carNumber: document.getElementById('carNumber').value,
            dob: document.getElementById('dob').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/reg', {  // Replace with your actual backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                // Redirect or handle success (e.g., window.location.href = '/dashboard');
                errorMessage.textContent = '';  // Clear error
            } else {
                const error = await response.json();
                errorMessage.textContent = error.message || 'Login failed. Please try again.';
            }
        } catch (err) {
            console.error('Error:', err);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
});