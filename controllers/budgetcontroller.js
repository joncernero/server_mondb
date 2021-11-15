const router = require('express').Router();
const { Budget, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

function findDayDifference(date1, date2) {
  return Math.floor(
    Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
  );
}
function findPacing(number1, number2) {
  return number1 / number2;
}
function figureBU(number1, number2, number3) {
  return (number1 / (number2 * number3)) * 100;
}
function figureRollOver(number1, number2) {
  return number1 - number2;
}

//add new budget selecting the associated Order Id
router.post('/create', validateSession, async (req, res) => {
  const totalDays = findDayDifference(req.body.startDate, req.body.endDate) + 1;
  const daysIn = findDayDifference(req.body.spendAsOf, req.body.startDate) + 1;
  const daysRemaining = findDayDifference(req.body.spendAsOf, req.body.endDate);
  const dailyPacing = findPacing(req.body.budgetAmount, totalDays);
  const actualPacing = findPacing(req.body.spendAmount, daysIn);
  const rollOver = figureRollOver(req.body.budgetAmount, req.body.spendAmount);

  const newBudget = {
    year: req.body.year,
    month: req.body.month,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    spendAsOf: req.body.spendAsOf || null,
    budgetAmount: req.body.budgetAmount,
    spendAmount: req.body.spendAmount,
    rollOver: rollOver || null,
    buPercentage: figureBU(req.body.spendAmount, daysIn, dailyPacing) || null,
    dailyPacing: dailyPacing,
    actualPacing: actualPacing,
    credits: req.body.credits,
    totalDays: totalDays,
    daysIn: daysIn,
    daysRemaining: daysRemaining,
    accountId: req.body.accountId || null,
    orderId: req.body.orderId || null,
  };

  Budget.create(newBudget)
    .then((budget) => res.status(200).json(budget))
    .catch((error) => res.status(500).json(error));
});

router.put('/update/:id', validateSession, (req, res) => {
  const totalDays = findDayDifference(req.body.startDate, req.body.endDate) + 1;
  const daysIn = findDayDifference(req.body.spendAsOf, req.body.startDate) + 1;
  const daysRemaining = findDayDifference(req.body.spendAsOf, req.body.endDate);
  const dailyPacing = findPacing(req.body.budgetAmount, totalDays);
  const actualPacing = findPacing(req.body.spendAmount, daysIn);
  const rollOver = figureRollOver(req.body.budgetAmount, req.body.spendAmount);
  const updateBudget = {
    year: req.body.year,
    month: req.body.month,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    spendAsOf: req.body.spendAsOf,
    budgetAmount: req.body.budgetAmount,
    spendAmount: req.body.spendAmount,
    rollOver: rollOver,
    buPercentage: figureBU(req.body.spendAmount, daysIn, dailyPacing),
    dailyPacing: dailyPacing,
    actualPacing: actualPacing,
    credits: req.body.credits,
    totalDays: totalDays,
    daysIn: daysIn,
    daysRemaining: daysRemaining,
    accountId: req.body.accountId,
    orderId: req.body.orderId,
  };

  const query = { where: { id: req.params.id } };

  Budget.update(updateBudget, query)
    .then((budget) => res.status(200).json(budget))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Budget.findAll({ where: { accountId: req.params.accountId } })
    .then((budget) => res.status(200).json(budget))
    .catch((error) => res.status(500).json(error));
});

//removing selected budget by :Id
router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Budget.destroy(query)
    .then(() => res.status(200).json({ message: 'Budget Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
