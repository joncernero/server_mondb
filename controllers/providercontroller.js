const router = require('express').Router();
const { Provider, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const provider = await Provider.create(req.body);

    account.addProvider(provider);
    res.status(200).json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateProvider = {
    providerName: req.body.providerName,
    providerCode: req.body.providerCode,
    providerId: req.body.providerId,
    providerType: req.body.providerType,
    jobSource: req.body.jobSource,
    vendorSource: req.body.vendorSource,
  };

  const query = { where: { id: req.params.id } };

  Provider.update(updateProvider, query)
    .then((provider) => res.status(200).json(provider))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Provider.findAll({ where: { accountId: req.params.account } })
    .then((provider) => res.status(200).json(provider))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Provider.findAll({ where: { accountId: req.params.accountId } })
    .then((provider) => res.status(200).json(provider))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Provider.destroy(query)
    .then(() => res.status(200).json({ message: 'Provider removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
