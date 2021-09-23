const router = require('express').Router();
const { Status, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const status = await Status.create(req.body);

    account.addStatus(status);
    res.status(200).json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateStatus = {
    atRiskAtOnset: req.body.atRiskAtOnset,
    accountState: req.body.accountState,
    introStatus: req.body.introStatus,
    health: req.body.health,
    churnDate: req.body.churnDate,
    closeNotes: req.body.closeNotes,
  };

  const query = { where: { id: req.params.id } };

  Status.update(updateStatus, query)
    .then((status) => res.status(200).json(status))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Status.findAll({ where: { accountId: req.params.accountId } })
    .then((status) => res.status(200).json(status))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Status.destroy(query)
    .then(() => res.status(200).json({ message: 'Status Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
