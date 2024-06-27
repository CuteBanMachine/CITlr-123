document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            displayTasks(data);
            addSortEventListeners(data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
});

function displayTasks(tasks) {
    const tableBody = document.querySelector('#tasks tbody');
    tableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = task.userId;
        row.insertCell(1).textContent = task.title;
        row.insertCell(2).textContent = task.completed ? 'Выполнено' : 'Не выполнено';
    });
}

function addSortEventListeners(tasks) {
    const headers = document.querySelectorAll('#tasks th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const sortedTasks = sortTasks(tasks, column);
            displayTasks(sortedTasks);
        });
    });
}

function sortTasks(tasks, column) {
    return tasks.slice().sort((a, b) => {
        if (typeof a[column] === 'string') {
            return a[column].localeCompare(b[column]);
        } else if (typeof a[column] === 'boolean') {
            return a[column] === b[column] ? 0 : a[column] ? -1 : 1;
        } else {
            return a[column] - b[column];
        }
    });
}
