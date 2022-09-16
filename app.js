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

  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    // Create todo object
    const todo = {
      // name pertains to name of element in new-todo-form
      // content & category are names of elements which value we want to store
      content: e.target.elements.content.value, 
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().toDateString(),
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  })

})