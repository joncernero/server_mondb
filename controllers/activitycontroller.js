const router = require('express').Router();
const { Activity, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const activity = await Activity.create(req.body);

    account.addActivity(activity);
    res.status(200).json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateActivity = {
    activityNotes: req.body.activityNotes,
    dueDate: req.body.dueDate,
    userId: req.body.userId,
  };

  const query = { where: { id: req.params.id } };

  Activity.update(updateActivity, query)
    .then((activity) => res.status(200).json(activity))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Activity.findAll({ where: { accountId: req.params.accountId } })
    .then((activity) => res.status(200).json(activity))
    .catch((error) => res.status(500).json(error));
});

router.get('/:userId', validateSession, (req, res) => {
  Activity.findAll({ where: { userId: req.params.userId } })
    .then((activity) => res.status(200).json(activity))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Activity.destroy(query)
    .then(() => res.status(200).json({ message: 'Activity removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
