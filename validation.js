// registration form validation
function validateRegisterForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const pwd = document.getElementById('password').value;
  const pwd2 = document.getElementById('confirm').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  if(name.length < 2) errors.push('Name must be at least 2 characters.');
  if(!emailRegex.test(email)) errors.push('Enter a valid email.');
  if(pwd.length < 6) errors.push('Password must be at least 6 characters.');
  if(pwd !== pwd2) errors.push('Passwords do not match.');

  const messageEl = document.getElementById('message');
  if(errors.length) {
    messageEl.textContent = errors.join(' ');
    messageEl.style.color = 'red';
    return false;
  }
  // if passes, send to server
  fetch('/api/auth/register', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,email,password:pwd})
  }).then(res => res.json())
    .then(data => {
      messageEl.textContent = data.message || 'Registered';
      messageEl.style.color = data.success ? 'green' : 'red';
    })
    .catch(err => {
      messageEl.textContent = 'Server error';
      messageEl.style.color='red';
    });
  return true;
}
