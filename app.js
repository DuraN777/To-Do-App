window.addEventListener('load', () => {
  // todos is a global var, this type of declaration not recomended!
  todos= JSON.parse(localStorage.getItem('todos')) || [];
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');

  // Pull username from storage and asign it to input Username
  const username = localStorage.getItem('username') || [];
  nameInput.value = username;

  // Set username to be input.value
  nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);
  })

})