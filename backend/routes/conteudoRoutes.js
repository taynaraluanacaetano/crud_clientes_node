const express = require('express');
const router = express.Router();
const conteudoController = require('../controller/conteudoController');

router.post('/', conteudoController.createConteudo);
router.get('/', conteudoController.getAllConteudos)
router.get('/:id', conteudoController.getConteudoById);
router.delete('/:id', conteudoController.deleteConteudo);
router.put('/:id', conteudoController.updateConteudo);

module.exports = router;
