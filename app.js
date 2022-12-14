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

  const alert = document.querySelector('.alert');
  console.log(alert);
  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = document.querySelector('#content')

    if(inputValue.value == null || inputValue.value == "") {
      alert.classList.add('show');
      return false;
    } else alert.classList.remove('show');

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
    // Reset the form
    e.target.reset();

    displayTodos();
  })

  displayTodos();
})

function displayTodos() {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // Create HTML elements for todo-item
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteBtn = document.createElement('button');

    input.type = 'checkbox';
    // to check if todo is checked
    // 'todo' is our object and 'done' is boolean property in it.
    input.checked = todo.done; // true/false
    span.classList.add('bubble');

    // Check for category of todo
    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    // Adding styles to elements
    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteBtn.classList.add('delete');

    // Iput element representing todo task
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

    // Apending elements
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    // Check if todo is done and cross it if true
    if (todo.done) {
      todoItem.classList.add('done');
    }

    input.addEventListener('change', (e) => {
      // chek the boolean
      todo.done = e.target.checked;
      //save change
      localStorage.setItem('todos', JSON.stringify(todos));
      // toggle style
      todoItem.classList.toggle('done');
      
      displayTodos();
    })

    // Delete btn
    deleteBtn.addEventListener('click', e => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTodos();
		})

    //Edit btn
    edit.addEventListener('click', () => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      // Blur event: https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
      input.addEventListener('blur', e => {
        //Element.setAttribute(qualifiedName: string, value: string)
        input.setAttribute('readonly', true);
        // set content to new text
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
      })
    })
  });
}


  // Todo-Item HTML
//  <div class="todo-item">
//   <label>
//     <input type="checkbox" />
//     <span class="bubble business"></span>
//   </label>

//   <div class="todo-content">
//     <input type="text" value="Make it rain" readonly>
//   </div>
//   <div class="actions">
//     <button class="edit">Edit</button>
//     <button class="delete">Delete</button>
//   </div>
// </div>