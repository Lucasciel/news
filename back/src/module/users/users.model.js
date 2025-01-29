const mongoose = require('../../config/mongo.js');
const {Schema} = mongoose; //schema é o formato do objeto que será salvo no banco de dados

//molde do objeto que será salvo no banco de dados
const usuarioSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
}, {timestamps: true}) //timestamps armazena a data de criação e atualização

//o nome do molde criado é 'usuarios' e o schema é usuarioSchema
const usuarioModel = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarioModel;