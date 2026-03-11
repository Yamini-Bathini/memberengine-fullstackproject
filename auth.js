async function loadUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!res.ok) {
            localStorage.clear();
            return;
        }

        const user = await res.json();

        const loginNav = document.getElementById('loginNav');
        const signupBtn = document.getElementById('signupBtn');

        if (loginNav) loginNav.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';

        const profileNav = document.getElementById('profileNav');
        if (profileNav) {
            profileNav.style.display = 'flex';
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profilePlan').textContent = `(${user.plan})`;
        }

    } catch (err) {
        console.error('Auth error:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUser();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'signin.html';
        });
    }
});