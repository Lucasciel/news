//importação
const express = require('express'); //express
const bcrypt = require('bcrypt'); //criptografar senha
const usuarioModel = require('./src/module/users/users.model.js'); //banco de dado usuario
const noticiaModel = require('./src/module/noticia/noticia.model.js'); //banco de dado noticia
const jwt = require('jsonwebtoken'); //token para login

const cors = require('cors')//conectar com o front

const app = express();

app.use(cors()) //conectar com o front
app.use(express.json());//json

//pegar usuarios
app.get('/usuarios', async (req, res) => {
    const usuarios = await usuarioModel.find({});
    return res.status(201).json(usuarios);
});

app.post('/login', async (req, res) => {

    //verifica se email e senha foram passados
    if(!req.body.email) {
        return res.status(400).json({message: "email é obrigatorio"})
    }
    if(!req.body.senha) {
        return res.status(400).json({message: "senha é obrigatorio"})
    }

    //verifica se usuario existe, busca os dados dele
    const usuarioExistente = await usuarioModel.findOne({ email: req.body.email });
    if(!usuarioExistente) {
        return res.status(400).json({message: "usuario não cadastrado"})
    }

    //verifica se senha enviada é a mesma da incriptada
    const verificaSenha = bcrypt.compareSync(req.body.senha, usuarioExistente.senha);

    if(!verificaSenha) {
        return res.status(400).json({message: "E-mail ou senha incorreta"})
    }

    //cria token do usuario
    const token = jwt.sign({_id: usuarioExistente._id}, 'dnc')
    return res.status(200).json({message: "login efetuado com sucesso", token: token})

})

//adicionar usuario
app.post('/usuarios', async (req, res) => {

    //1- verifica se nome, email e senha foram passados
    if(!req.body.email) {
        return res.status(400).json({message: "email é obrigatorio"})
    }
    if(!req.body.senha) {
        return res.status(400).json({message: "senha é obrigatorio"})
    }

    //2 - verifica se usuario ja existe
    const usuarioExistente = await usuarioModel.find({ email: req.body.email });
    if(usuarioExistente.length) {
        return res.status(400).json({message: "usuario ja existe"})
    }

    //3- criptografa senha
    const senhaCriptografada = bcrypt.hashSync(req.body.senha, 10);

    //4- cria usuario
    const usuario = await usuarioModel.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: senhaCriptografada,
    });

    return res.status(201).json([usuario])
});



//pegar noticias
app.get('/noticias', async(req, res) => {
    let filtroCategoria = {};
    if(req.query.categoria) {
        filtroCategoria = {categoria: req.query.categoria}
    }
    const noticias = await noticiaModel.find(filtroCategoria);
    return res.status(201).json(noticias)
});

//adicionar noticias
app.post('/noticias', async (req, res) => {

    //verifica se titulo, img, texto e categoria foram passados
    if(!req.body.titulo) {
        return res.status(400).json({message: "titulo é obrigatorio"})
    }
    if(!req.body.img) {
        return res.status(400).json({message: "img é obrigatorio"})
    }
    if(!req.body.texto) {
        return res.status(400).json({message: "texto é obrigatorio"})
    }
    if(!req.body.categoria) {
        return res.status(400).json({message: "categoria é obrigatorio"})
    }

    //cria noticia com os dados passados
    const noticia = await noticiaModel.create({
        titulo: req.body.titulo,
        img: req.body.img,
        texto: req.body.texto,
        categoria: req.body.categoria,
    })

    //retorna noticia criada
    return res.status(201).json(noticia)
});





app.listen(8080, ()=> {
    console.log("servidor rodando na porta 8080")
})