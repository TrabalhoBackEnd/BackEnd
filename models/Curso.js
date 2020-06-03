const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    titulo: String,
    descricao: String,
    preco: Number
});


module.exports = mongoose.model('Curso', CursoSchema);