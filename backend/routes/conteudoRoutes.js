const express = require('express');
const router = express.Router();
const conteudoController = require('../controller/conteudoController');

router.post('/', conteudoController.createConteudo);
router.get('/', conteudoController.getAllConteudos)
router.get('/:id', conteudoController.getConteudoById);
router.delete('/:id', conteudoController.deleteConteudo);
router.put('/:id', conteudoController.updateConteudo);


/**
 * @swagger
 * components:
 *   schemas:
 *     Conteudo:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - tipoConteudo
 *         - conteudo
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *         titulo:
 *           type: string
 *           description: O título do conteúdo
 *         descricao:
 *           type: string
 *           description: A descrição do conteúdo
 *         tipoConteudo:
 *           type: string
 *           description: O tipo de conteúdo
 *         conteudo:
 *           type: string
 *           description: O conteúdo propriamente dito
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *           description: A data de cadastro do conteúdo
 */

/**
 * @swagger
 * /conteudos:
 *   get:
 *     summary: Retorna a lista de todos os conteúdos
 *     tags: [Conteudos]
 *     responses:
 *       200:
 *         description: A lista de conteúdos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conteudo'
 */

/**
 * @swagger
 * /conteudos:
 *   post:
 *     summary: Cria um novo conteúdo
 *     tags: [Conteudos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conteudo'
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso
 */


module.exports = router;

