const activityService = require('../services/activityService');

exports.getAllActivities = (req, res) => {
  activityService.getAllActivities()
    .then(activities => {
      res.status(200).json(activities);
    })
    .catch(err => {
      console.error('Erro ao buscar atividades:', err.message);
      res.status(500).json({ error: 'Erro ao buscar atividades' });
    });
};

exports.createActivity = (req, res) => {
  const activityData = req.body;
  activityService.createActivity(activityData)
    .then(createdActivity => {
      res.status(201).json(createdActivity);
    })
    .catch(err => {
      console.error('Erro ao criar atividade:', err.message);
      res.status(500).json({ error: 'Erro ao criar atividade' });
    });
};


