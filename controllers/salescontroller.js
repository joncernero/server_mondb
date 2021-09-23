const router = require('express').Router();
const { Sales, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const sales = await Sales.create(req.body);

    account.addSales(sales);
    res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateSales = {
    ppcSales: req.body.ppcSales,
    segment: req.body.segment,
    industry: req.body.industry,
    region: req.body.region,
    ats: req.body.ats,
    salesChannel: req.body.salesChannel,
    primarySales: req.body.primarySales,
  };

  const query = { where: { id: req.params.id } };

  Sales.update(updateSales, query)
    .then((sales) => res.status(200).json(sales))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Sales.findAll({ where: { accountId: req.params.accountId } })
    .then((sales) => res.status(200).json(sales))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Sales.findAll({ where: { accountId: req.params.accountId } })
    .then((sales) => res.status(200).json(sales))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Sales.destroy(query)
    .then(() => res.status(200).json({ message: 'Sales Removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
