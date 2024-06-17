const activityService = require("../services/activityService");

const validateActivityData = (activityData) => {
  const { titulo, descricao } = activityData;
  const camposObrigatorios = ["titulo", "descricao"];

  const camposFaltando = camposObrigatorios.filter((key) => !activityData[key]);
  if (camposFaltando.length > 0) {
    return {
      isValid: false,
      message: `Os seguintes campos são obrigatórios: ${camposFaltando.join(
        ", "
      )}`,
    };
  }

  const chavesExtras = Object.keys(activityData).filter(
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

exports.getAllActivities = (req, res) => {
  activityService
    .getAllActivities()
    .then((activities) => {
      res.status(200).json(activities);
    })
    .catch((err) => {
      console.error("Erro ao buscar atividades:", err.message);
      res.status(500).json({ error: "Erro ao buscar atividades" });
    });
};

exports.getActivitiesById = (req, res) => {
  const activityId = req.params.id;
  activityService
    .getActivityById(activityId)
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({ error: "Atividade não encontrada" });
      }
      res.status(200).json(activity);
    })
    .catch((err) => {
      console.error("Erro ao obter dados da atividade:", err.message);
      res.status(404).json({ error: `A atividade com o ID: ${activityId} não foi encontrada.` });
    });
};

exports.createActivity = (req, res) => {
  const activityData = req.body;
  const validation = validateActivityData(activityData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  activityData.dataCadastro = new Date().toISOString();

  activityService.createActivity(activityData)
    .then(createdActivity => {
      res.status(201).json(createdActivity);
    })
    .catch(err => {
      console.error('Erro ao criar atividade:', err.message);
      res.status(500).json({ error: 'Erro ao criar atividade' });
    });
};

exports.deleteActivity = (req, res) => {
  const activityData = req.params.id;
  activityService
    .deleteActivity(activityData)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      console.error("Erro ao excluir atividade:", err.message);
      res.status(500).json({ error: "Erro ao excluir atividade" });
    });
};

exports.updateActivity = (req, res) => {
  const activityId = req.params.id;
  const activityData = req.body;
  const validation = validateActivityData(activityData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  activityService
    .updateActivity(activityId, activityData)
    .then((updateActivity) => {
      res.status(201).json(updateActivity);
    })
    .catch((err) => {
      if (err.message === "Atividade não encontrada") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao atualizar atividade:", err.message);
      res.status(404).json({ error: `A atividade que você está tentando alterar não existe na base de dados. ID INFORMADO: ${activityId}` });
    });
};
