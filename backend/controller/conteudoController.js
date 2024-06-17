const conteudoService = require("../services/conteudoService");

const validateConteudoData = (conteudoData) => {
  const { titulo, descricao, tipoConteudo, conteudo } = conteudoData;
  const camposObrigatorios = [
    "titulo",
    "descricao",
    "tipoConteudo",
    "conteudo",
  ];

  const camposFaltando = camposObrigatorios.filter((key) => !conteudoData[key]);
  if (camposFaltando.length > 0) {
    return {
      isValid: false,
      message: `Os seguintes campos são obrigatórios: ${camposFaltando.join(
        ", "
      )}`,
    };
  }

  const chavesExtras = Object.keys(conteudoData).filter(
    (key) => !camposObrigatorios.includes(key)
  );

  if (chavesExtras.length > 0) {
    return {
      isValid: false,
      message: `Campos extras encontrados: ${chavesExtras.join(", ")}`,
    };
  }

  return { isValid: true };
};

exports.createConteudo = (req, res) => {
  const conteudoData = req.body;
  const validation = validateConteudoData(conteudoData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  conteudoData.dataCadastro = new Date().toISOString();

  conteudoService
    .createConteudo(conteudoData)
    .then((createdConteudo) => {
      res.status(201).json(createdConteudo);
    })
    .catch((err) => {
      console.error("Erro ao criar conteúdo:", err.message);
      res.status(500).json({ error: "Erro ao cadastrar conteúdo!" });
    });
};

exports.getAllConteudos = (req, res) => {
  conteudoService
    .getAllConteudos()
    .then((conteudos) => {
      res.status(200).json(conteudos);
    })
    .catch((err) => {
      console.error("Erro ao buscar conteúdos:", err.message);
      res.status(404).json({ error: "Erro ao buscar os conteúdos!" });
    });
};

exports.getConteudoById = (req, res) => {
  const conteudoId = req.params.id;
  conteudoService
    .getConteudoById(conteudoId)
    .then((conteudoId) => {
      if (!conteudoId) {
        return res.status(404).json({ error: "O conteúdo não foi encontrado" });
      }
      res.status(200).json(conteudoId);
    })
    .catch((err) => {
      console.error("Erro ao obter dados do conteúdo:", err.message);
      res.status(404).json({
        error: `O conteúdo com o ID: ${conteudoId} não foi encontrado.`,
      });
    });
};

exports.deleteConteudo = (req, res) => {
  const conteudoId = req.params.id;
  conteudoService
    .deleteConteudo(conteudoId)
    .then(() => {
      res.status(200).json({ message: "O conteúdo foi removido com sucesso!" });
    })
    .catch((err) => {
      console.error("Erro ao excluir o conteúdo:", err.message);
      res
        .status(404)
        .json({
          error: "Erro ao excluir o conteúdo, o conteúdo não foi encontrado.",
        });
    });
};

exports.updateConteudo = (req, res) => {
  const conteudoId = req.params.id;
  const conteudoData = req.body;
  const validation = validateConteudoData(conteudoData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  conteudoService
    .updateConteudo(conteudoId, conteudoData)
    .then((updateConteudo) => {
      res.status(201).json(updateConteudo);
    })
    .catch((err) => {
      if (err.message === "O conteúdo não foi encontrado!") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao atualizar o conteúdo:", err.message);
      res.status(404).json({ error: `O contedúdo que você está tentando alterar não existe na base de dados. ID INFORMADO: ${conteudoId}` });
    });
};