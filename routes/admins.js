const express = require("express")
const router = express.Router()
const Curso = require('../models/Curso')
const mongoose = require('mongoose')


//rota principal
router.get('/', function(req, res){
    res.render("admin/index")
})


/*/rotas para listar os cursos
router.get('/cursos', function(req, res){
    Curso.find().then((Cursos) => {
        res.render("admin/cursos", {cursos: cursos})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })    
})
*/
router.get('/cursos', async (req, res, next) => {
    try {
        const cursos = await Curso.find();
        return res.render("admin/cursos", {cursos: cursos.map(cursos => cursos.toJSON())})
    }catch (err) {
        req.flash("error_msg", "Houve um erro ao carregar os cursos")
        res.redirect('/')
    }
  })
  

//rotas para exibir o formulario de cadastro de cursos
router.get('/cursos/add', function(req, res){
    res.render("admin/addcursos")
})

//rota para fazer o cadastro de cursos
router.post('/categoria/nova', function(req, res){
    const novoCurso = {
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco,
    };

    new Curso(novoCurso).save().then(() => {
        Console.log("Curso salvo com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar Curso")
    })
})





//exportando o router
    module.exports = router