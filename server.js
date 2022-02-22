const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/todosSPA_db"
);
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')

//middleware
app.use('/src', express.static(path.join(__dirname, 'src')))

app.delete('/api/todos/:id', async(req, res, next) => {
    try {
        const todo = await Todo.findByPk(req.params.id)
        await todo.destroy()
        res.sendStatus(204) //No content, need this line
    } catch (err) {
        next(err)
    }
})

app.get('/', (req, res) => {   //send the html file
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get("/api/todos", async (req, res, next) => {
  try {
    res.send(await Todo.findAll());
  } catch (err) {
    next(err);
  }
});



const Todo = sequelize.define("todo", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    const [cleanApt, readBook, walkDog, cook, shop, callParents, buyPresent] =
      await Promise.all(
        [
          "clean apartment",
          "read book",
          "walk dog",
          "cook lunch",
          "shop groceries",
          "call parents",
          "buy present",
        ].map((name) => Todo.create({ name }))
      );
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

init();
