// CRUD 

let tasks = [
  {id: 1, text: 'Buy coffee', completed: false},
  {id: 2, text: 'Write Code', completed: true}
];

// adding a task (spread)
const newTask = {id: 3, text: 'Debug CSS', completed: false};
tasks = [...tasks, newTask];
console.log(tasks)
//deleting task
const deleteTask = (id) => tasks.filter(task => task.id !== id);
deleteTask(1);
console.log(tasks);
