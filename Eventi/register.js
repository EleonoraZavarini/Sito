document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMsg = document.getElementById('errorMessage');
  const successMsg = document.getElementById('successMessage');

  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';

  if (password !== confirmPassword) {
    errorMsg.textContent = 'Le password non corrispondono!';
    errorMsg.style.display = 'block';
    return;
  }

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      successMsg.textContent = 'Registrazione completata! Reindirizzamento...';
      successMsg.style.display = 'block';
      setTimeout(() => window.location.href = 'accesso.html', 1500);
    } else {
      errorMsg.textContent = data.error;
      errorMsg.style.display = 'block';
    }
  });
});
