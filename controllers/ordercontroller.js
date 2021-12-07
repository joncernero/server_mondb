const router = require('express').Router();
const { Order, Account } = require('../models');
const validateSession = require('../middleware/validate-session');
const { account } = require('.');

function findDayDifference(date1, date2) {
  return Math.floor(
    Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
  );
}

function findPacing(number1, number2) {
  return number1 / number2;
}

function figureCBU(number1, number2, number3) {
  return (number1 / (number2 * number3)) * 100;
}

router.post('/create', validateSession, (req, res) => {
  const totalDays = findDayDifference(req.body.startDate, req.body.endDate);
  const daysIn =
    findDayDifference(req.body.spendAsOfDate, req.body.startDate) + 1;
  const daysRemaining = findDayDifference(
    req.body.spendAsOfDate,
    req.body.endDate
  );
  const dailyPacing = findPacing(req.body.orderAmount, totalDays);

  const newOrder = {
    orderNumber: req.body.orderNumber,
    orderType: req.body.orderType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    campaignStartDate: req.body.campaignStartDate,
    orderAmount: req.body.orderAmount,
    spendAsOfDate: req.body.spendAsOfDate,
    totalDays: totalDays,
    daysIn: daysIn,
    daysRemaining: daysRemaining,
    budgetSpent: req.body.budgetSpent,
    dailyPacing: dailyPacing,
    cbu: figureCBU(req.body.budgetSpent, daysIn, dailyPacing),
    contractType: req.body.contractType,
    accountId: req.body.accountId,
    ioId: req.body.ioId,
  };
  console.log(newOrder);
  Order.create(newOrder)
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.put('/update/:id', validateSession, (req, res) => {
  const totalDays = findDayDifference(req.body.startDate, req.body.endDate);
  const daysIn =
    findDayDifference(req.body.spendAsOfDate, req.body.startDate) + 1;
  const daysRemaining = findDayDifference(
    req.body.spendAsOfDate,
    req.body.endDate
  );
  const dailyPacing = findPacing(req.body.orderAmount, totalDays);
  const updateOrder = {
    orderNumber: req.body.orderNumber,
    orderType: req.body.orderType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    campaignStartDate: req.body.campaignStartDate,
    orderAmount: req.body.orderAmount,
    spendAsOfDate: req.body.spendAsOfDate,
    totalDays: totalDays,
    daysIn: daysIn,
    daysRemaining: daysRemaining,
    budgetSpent: req.body.budgetSpent,
    dailyPacing: dailyPacing,
    cbu: figureCBU(req.body.budgetSpent, daysIn, dailyPacing),
    contractType: req.body.contractType,
    accountId: req.body.accountId,
    ioId: req.body.ioId,
  };

  const query = { where: { id: req.params.id } };

  Order.update(updateOrder, query)
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Order.findAll({ where: { accountId: req.params.accountId } })
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Order.findAll({ where: { accountId: req.params.accountId } })
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Order.destroy(query)
    .then(() => res.status(200).json({ message: 'Order Removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
