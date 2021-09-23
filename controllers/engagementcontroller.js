const router = require('express').Router();
const { Engagement, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

//create new engagement passing associated Account Id
//accountId will be collected on creation
router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const engagement = await Engagement.create(req.body);

    account.addEngagement(engagement);
    res.status(200).json(engagement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateEngagement = {
    frequency: req.body.frequency,
    engagementNote: req.body.engagementNote,
  };
  const query = { where: { id: req.params.id } };

  Engagement.update(updateEngagement, query)
    .then((engagement) => res.status(200).json(engagement))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Engagement.findAll({ where: { accountId: req.params.accountId } })
    .then((engagement) => res.status(200).json(engagement))
    .catch((error) => res.status(500).json(error));
});

//delete engagement by selected Id
router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Engagement.destroy(query)
    .then(() => res.status(200).json({ message: 'Engagement Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
