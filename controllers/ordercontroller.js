const router = require('express').Router();
const { Order, Account } = require('../models');
const validateSession = require('../middleware/validate-session');
const { account } = require('.');

router.post('/create', validateSession, async (req, res) => {
  const newOrder = {
    orderNumber: req.body.orderNumber,
    orderType: req.body.orderType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    campaignStartDate: req.body.campaignStartDate,
    amount: req.body.amount,
    spendAsOf: req.body.spendAsOf,
    dailyPacing: req.body.dailyPacing,
    cbu: req.body.cbu,
    contractType: req.body.contractType,
    accountId: req.body.accountId || null,
    ioId: req.body.ioId || null,
  };

  Order.create(newOrder)
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateOrder = {
    orderNumber: req.body.orderNumber,
    orderType: req.body.orderType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    campaignStartDate: req.body.campaignStartDate,
    amount: req.body.amount,
    spendAsOf: req.body.spendAsOf,
    dailyPacing: req.body.dailyPacing,
    cbu: req.body.cbu,
    contractType: req.body.contractType,
    accountId: req.body.accountId || null,
    ioId: req.body.ioId || null,
  };

  const query = { where: { id: req.params.id } };

  Order.update(updateOrder, query)
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Order.findAll({ where: { accountId: req.params.accountId } })
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(200).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Order.destroy(query)
    .then(() => res.status(200).json({ message: 'Order Removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
