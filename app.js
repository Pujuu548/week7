const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const courseId = document.getElementById('course-id').value;

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const taskName = document.getElementById('task-name').value;
  const dueDate = document.getElementById('due-date').value;
  const taskDetails = document.getElementById('task-details').value;

  // Send a POST request to the backend to add the task
  const response = await fetch(`/courses/${courseId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: taskName,
      dueDate: dueDate,
      details: taskDetails,
    }),
  });

  if (response.ok) {
    // Add the task to the list
    const task = await response.json();
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <strong>${task.name}</strong>
      <br>
      Due Date: ${task.dueDate}
      <br>
      ${task.details}
    `;
    taskList.appendChild(taskItem);
  }
});

// Get the tasks for the course
const response = await fetch(`/courses/${courseId}/tasks`);
const tasks = await response.json();

// Display the tasks
tasks.forEach((task) => {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <strong>${task.name}</strong>
    <br>
    Due Date: ${task.dueDate}
    <br>
    ${task.details}
  `;
  taskList.appendChild(taskItem);
});