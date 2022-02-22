const ul = document.querySelector('ul')
ul.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id')
    if(e.target.tagName === 'LI') {
        console.log(id)
    }
})
const render = async() => {
    try {
        const response = await axios.get('/api/todos') //parses a JSON and returns a JS object
        const todos = response.data //the data is an array of objs
        console.log(todos) 
        const html = todos.map(todo => `
            <li data-id=${todo.id}>${todo.name}</li>
        `).join('')
        ul.innerHTML = html
    } catch (err) {
        console.log(err)
    }
}
render()