const {fileService} = require('../services');


async function getUsers(req, res) {
    const users = await fileService.reader();
    res.json(users);
}

async function getUser(req, res) {
    const {id} = req.params;
    const users = await fileService.reader();

    const find = users.find(user => user.id === +id);

    if (!find) {
        return res.status(400).json(`User with id ${id} not exist`)
    }

    res.json(find);
}

async function createUser(req, res) {
    const {name, age} = req.body;

    if (name.length < 2) {
        return res.status(400).json('Set valid name');
    }

    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age');
    }

    const users = await fileService.reader();

    const newUser = {name, age, id: (users.length ? (users[users.length - 1].id + 1) : 1)};

    await fileService.writer([...users, newUser]);

    res.status(201).json(newUser);
}

async function deleteUser(req, res) {
    const {id} = req.params;
    const users = await fileService.reader();

    const index = users.findIndex(user => user.id === +id);

    if (index === -1) {
        return res.json(`User with id ${id} not found`);
    }

    users.splice(index, 1);

    await fileService.writer(users);

    res.sendStatus(204);
}

async function updateUser(req, res) {
    const {id} = req.params;
    const {name, age} = req.body;

    if (age && age < 18 || !Number.isInteger(age)) {
        return res.status(400).json('Set valid age');
    }

    if (name && name.length < 2) {
        return res.status(400).json('Set valid name');
    }

    const users = await fileService.reader();

    const index = users.findIndex(user => user.id === +id);

    if (index === -1) {
        return res.status(400).json(`User with id ${id} not found`);
    }

    const updatedUser = Object.assign(users[index], {...req.body});

    users.splice(index, 1);

    await fileService.writer([...users, updatedUser]);

    res.status(201).json(updatedUser);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}