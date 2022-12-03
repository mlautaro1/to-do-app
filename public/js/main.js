const submitBtn = document.querySelector('#form-submit');
const deleteBtn = document.querySelectorAll('.icon');
const checkboxes = document.querySelectorAll('.checkbox');

async function deleteTask() {
    let id = this.id;
    const f = await fetch('/todos/deleteTodo', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        if(!res.ok) {
            throw new Error('Couldnt get task ID')
        }
    })
    .then(response => {
        location.reload()
    })
    .catch(err => {
        console.log(err)
    })
}

async function markCompleted(id) { 
        const f = await fetch('/todos/markComplete', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        if(!res.ok) {
            throw new Error('Couldnt mark as completed')
        }
    })
    .then(response => {
        console.log(response)
        location.reload()
    })
    .catch(err => {
        console.log(err)
    })
}

async function markIncomplete(id) {
        const f = await fetch('/todos/markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            if(!res.ok) {
                throw new Error('Couldnt mark as incompleted')
            }
        })
        .then(response => {
            console.log(response)
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
}

async function markTask() {
    let id = this.id;
    let nextSibling = this.nextElementSibling;

    if (nextSibling.getAttribute('class') === 'not') {
        markCompleted(id);
    }

    if (nextSibling.getAttribute("class") === 'completed') {
        markIncomplete(id);
    }
}

checkboxes.forEach((element) => {
    element.addEventListener('click', markTask)
})

deleteBtn.forEach((element) => {
    element.addEventListener('click', deleteTask)
})