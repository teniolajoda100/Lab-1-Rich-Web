const form = document.getElementById('regForm');
const dialog = document.querySelector('dialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //Close the dialog
  dialog.close();

  //Gather form data
  const data = new FormData(form);
  let message = "Registration successful!\n\nDetails:\n";

  for (const [key, value] of data.entries()) {
    message += `${key}: ${value}\n`;
  }

  // Show confirmations
  alert(message);
});
