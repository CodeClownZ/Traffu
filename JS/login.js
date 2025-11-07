// Login.js - Clean, Secure, and Stylish Login Handler

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const nidInput = document.getElementById('nid');
    const passwordInput = document.getElementById('password');

    // Auto-format NID (optional visual polish)
    nidInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';

        const data = {
            nid: nidInput.value.trim(),
            password: passwordInput.value
        };

        if (!data.nid || !data.password) {
            showError('Please fill in all fields');
            return;
        }

        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = 'Verifying...';
        button.disabled = true;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                // Success glow
                document.body.style.background = 'radial-gradient(circle at center, #003366, #0f0c29)';
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 400);
            } else {
                throw new Error(result.message || 'Invalid NID or Password');
            }
        } catch (err) {
            console.error('Login failed:', err);
            showError(err.message);
            shakeCard();
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.add('show');
    }

    function shakeCard() {
        const container = document.querySelector('.login-container');
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = 'shake 0.5s ease';
        }, 10);
    }
});

// Inject shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
        20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(shakeStyle);