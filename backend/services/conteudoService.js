const conteudoModel = require('../model/conteudoModel');

exports.getAllConteudos = () => {
  return conteudoModel.getAllConteudos();
};

exports.createConteudo = (conteudoData) => {
  return conteudoModel.createConteudo(conteudoData);
};

exports.deleteConteudo = (conteudoData) => {
  return conteudoModel.deleteConteudo(conteudoData);
};

exports.getConteudoById = (conteudoId) => {
  return conteudoModel.getConteudoById(conteudoId);
};

exports.updateConteudo = (conteudoId, conteudoData) => {
  return conteudoModel.updateConteudo(conteudoId, conteudoData);
};
