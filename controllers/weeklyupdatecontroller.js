const router = require('express').Router();
const { WeeklyUpdate, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const weeklyupdate = await WeeklyUpdate.create(req.body);

    // account.addWeeklyUpdate(weeklyupdate);
    res.status(200).json(weeklyupdate);
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
    accountId: req.body.accountId,
  };

  const query = { where: { id: req.params.id } };

  WeeklyUpdate.update(updateWeeklyUpdate, query)
    .then((weeklyupdate) => res.status(200).json(weeklyupdate))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  WeeklyUpdate.findAll({ where: { accountId: req.params.accountId } })
    .then((weeklyupdate) => res.status(200).json(weeklyupdate))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  WeeklyUpdate.destroy(query)
    .then(() => res.status(200).json({ message: 'WeeklyUpdate Removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
