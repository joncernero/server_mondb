const router = require('express').Router();
const { WeeklyUpdate, Budget } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { id: req.body.budgetId },
    });

    const weeklyUpdate = await WeeklyUpdate.create(req.body);

    // budget.addWeeklyUpdate(weeklyUpdate);
    res.status(200).json(weeklyUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateWeeklyUpdate = {
    weeklyUpdate: req.body.weeklyUpdate,
    jobCount: req.body.jobCount,
    activeCampaigns: req.body.activeCampaigns,
    date: req.body.date,
  };

  const query = { where: { id: req.params.id } };

  WeeklyUpdate.update(updateWeeklyUpdate, query)
    .then((weeklyUpdate) => res.status(200).json(weeklyUpdate))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  WeeklyUpdate.findAll({ where: { budgetId: req.params.budgetId } }) // will this be available in params?
    .then((weeklyUpdate) => res.status(200).json(weeklyUpdate))
    .catch(error.res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  WeeklyUpdate.destroy(query)
    .then(() => res.status(200).json({ message: 'WeeklyUpdate Removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
