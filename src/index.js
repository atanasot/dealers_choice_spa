const ul = document.querySelector("ul");
const inputField = document.querySelector('input')
ul.addEventListener("click", async (e) => {
  if (e.target.tagName === "LI") {
    const id = e.target.getAttribute("data-id");
    await axios.delete(`/api/todos/${id}`); //delete with axios
    render();
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newForm = e.target;
  let newTodo = newForm.name.value; //gives us the input
  try {
    await axios.post("/api/todos", { name: newTodo });
    render();
  } catch (err) {
    console.log(err);
  }
});

const render = async () => {
  try {
    const response = await axios.get("/api/todos"); //parses a JSON and returns a JS object
    const todos = response.data; //the data is an array of objs
    const html = todos
      .map((todo) => `<li data-id=${todo.id}>${todo.name}</li>`)
      .join("");
    ul.innerHTML = html;
    inputField.value = ''
  } catch (err) {
    console.log(err);
  }
};

render();
