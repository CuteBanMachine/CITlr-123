document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            displayTasks(data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
});

function displayTasks(tasks) {
    const tableBody = document.querySelector('#tasks tbody');

    tasks.forEach(task => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = task.userId;
        row.insertCell(1).textContent = task.title;
        row.insertCell(2).textContent = task.completed ? 'Выполнено' : 'Не выполнено';
    });
}
