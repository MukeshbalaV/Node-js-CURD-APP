const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let todos = [
    { id: 1, text: 'Learn Node.js' },
    { id: 2, text: 'Build a TODO app' },
    { id: 3, text: 'Learn Express JS ' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const newTodo = { id: todos.length + 1, text: req.body.todoText };
    todos.push(newTodo);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const todoId = parseInt(req.body.todoId);
    todos = todos.filter(todo => todo.id !== todoId);
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error');
});

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
