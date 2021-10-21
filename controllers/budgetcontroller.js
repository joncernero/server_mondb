const router = require('express').Router();
const { Budget, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

//add new budget passing the associated Order Id
router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const budget = await Budget.create(req.body);

    account.addBudget(budget);

    res.status(200).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateBudget = {
    year: req.body.year,
    month: req.body.month,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    spendAsOf: req.body.spendAsOf,
    budgetAmount: req.body.budget,
    spend: req.body.spend,
    rollerOver: req.body.rollerOver,
    buPercentage: req.body.buPercentage,
    credits: req.body.credits,
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
