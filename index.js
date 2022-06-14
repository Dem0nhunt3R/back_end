const express = require('express');

const {fileService} = require("./services");

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    console.log('getAll')
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const user = await fileService.reader().then(users => users.find(user => user.id === +id));
    console.log('get ' + id);
    res.json(user);
})

app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json("Set valid age");
    }

    if (!name) {
        return res.status(400).json("Set valid name")
    }

    const users = await fileService.reader();

    const newUser = {name, age, id: (users.length ? (users[users.length - 1].id + 1) : 1)};

    await fileService.writer([...users, newUser]);

    res.status(201).json(newUser);
})

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.reader();

    const index = users.findIndex(user => user.id === +id);

    if (index === -1) {
        return res.json(`User with id ${+id} not found`);
    }

    users.splice(index, 1);

    await fileService.writer(users);

    res.sendStatus(204);
})

app.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {age, name} = req.body;

    if (age && !Number.isInteger(age)) {
        return res.status(400).json('Set valid age');
    }

    if (name && name.length < 2) {
        return res.status(400).json('Set valid name');
    }

    const users = await fileService.reader();

    const index = users.findIndex(user => user.id === +id);

    const newUser = Object.assign(users[index], {...req.body});

    users.splice(index, 1);

    const newUsersArr = [...users, newUser];

    await fileService.writer(newUsersArr);

    res.status(201).json(newUser);
})

app.listen(5000, () => {
    console.log('Server 5000 listen')
})