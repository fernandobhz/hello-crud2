const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

const usuarioFernando = {
    id: 0,
    nome: 'fernando reis guimaraes!',
    idade: 35
};

const usuarios = [usuarioFernando];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { body: { nome, idade } } = req;
    const id = usuarios.length;

    const novoUsuario = {
        id,
        nome,
        idade
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;

    const usuario = usuarios.find(usuario => usuario.id === Number(id));
    usuario.nome = nome;
    usuario.idade = idade;

    res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const index = usuarios.findIndex(usuario => usuario.id === Number(id));
    
    usuarios.splice(index, 1);

    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

