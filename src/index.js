const ul = document.querySelector('ul')
ul.addEventListener('click', async(e) => {
    if(e.target.tagName === 'LI') {
        const id = e.target.getAttribute('data-id')
        await axios.delete(`/api/todos/${id}`)
        render()
    }
})
const render = async() => {
    try {
        const response = await axios.get('/api/todos') //parses a JSON and returns a JS object
        const todos = response.data //the data is an array of objs
        const html = todos.map(todo => `
            <li data-id=${todo.id}>${todo.name}</li>
        `).join('')
        ul.innerHTML = html
    } catch (err) {
        console.log(err)
    }
}
render()