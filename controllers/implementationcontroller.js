const router = require('express').Router();
const { Implementation, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

//creating Implementation with selected associated Id
router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const implementation = await Implementation.create(req.body);

    account.addImplementation(implementation);
    res.status(200).json(implementation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateImplementation = {
    mobileOptimized: req.body.mobileOptimized,
    jobsURL: req.body.jobsURL,
    pixelStatus: req.body.pixelStatus,
    sourceTag: req.body.sourceTag,
    bidOptimizer: req.body.bidOptimizer,
    awm: req.body.awm,
    military: req.body.military,
    ejb: req.body.ejb,
    guid: req.body.guid,
    eligibleForFree: req.body.eligibleForFree,
  };

  const query = { where: { id: req.params.id } };

  Implementation.update(updateImplementation, query)
    .then((implementation) => res.status(200).json(implementation))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Implementation.findAll({ where: { accountId: req.params.accountId } })
    .then((implementation) => res.status(200).json(implementation))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Implementation.destroy(query)
    .then(() => res.status(200).json({ message: 'Implementation Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
