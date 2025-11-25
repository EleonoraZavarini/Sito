document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMessage');

  errorMsg.style.display = 'none';

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      sessionStorage.setItem('ludotecaLoggedUser', JSON.stringify(data.user));
      window.location.href = 'homeEventi.html';
    } else {
      errorMsg.textContent = data.error;
      errorMsg.style.display = 'block';
    }
  });
});
