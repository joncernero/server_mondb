// const { Router } = require('express');
const router = require('express').Router();
const { Account, User, Agency } = require('../models');
const validateSession = require('../middleware/validate-session');

// association will be selected with front end dropdown option
router.post('/create', validateSession, (req, res) => {
  const newAccount = {
    accountName: req.body.accountName,
    accountID: req.body.accountID,
    customerNumber: req.body.customerNumber,
    accountType: req.body.accountType,
    assignmentDate: req.body.assignmentDate,
    primaryXCode: req.body.primaryXCode,
    userId: req.body.userId || null,
    agencyId: req.body.agencyId || null,
  };
  Account.create(newAccount)
    .then((account) => res.status(200).json(account))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateAccount = {
    accountName: req.body.accountName,
    accountId: req.body.accountId,
    customerNumber: req.body.customerNumber,
    accountType: req.body.accountType,
    assignmentDate: req.body.assignmentDate,
    primaryXCode: req.body.primaryXCode,
    userId: req.body.userId || null,
    agencyId: req.body.agencyId || null,
  };

  const query = { where: { id: req.params.id } };

  Account.update(updateAccount, query)
    .then((account) => res.status(200).json(account))
    .catch((error) => res.status(500).json(error));
});

//fetch all accounts for main account page
router.get('/', validateSession, (req, res) => {
  console.log(req.query);
  Account.findAll()
    .then((account) => res.status(200).json(account))
    .catch((error) => res.status(500).json(error));
});

router.get('/:id', validateSession, (req, res) => {
  Account.findAll({ where: { id: req.params.id } })
    .then((account) => res.status(200).json(account))
    .catch((error) => res.status(500).json(error));
});

router.get('/:userId', validateSession, (req, res) => {
  Account.findAll({ where: { userId: req.body.userId } })
    .then((account) => res.status(200).json(account))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } }; // for now this will only allow me to delete one account at a time?

  Account.destroy(query)
    .then(() => res.status(200).json({ message: 'Account Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});

// router.get('/getaccountbyuser/:userId', validateSession, (req, res) => {
//   Account.findAll({ where: { userId: req.params.userId } })
//     .then((account) => res.status(200).json(account))
//     .catch((error) => res.status(500).json(error));
// });

// router.get('/getaccountbyagency/:agencyId', validateSession, (req, res) => {
//   Account.findAll({ where: { agencyId: req.params.agencyId } })
//     .then((account) => res.status(200).json(account))
//     .catch((error) => res.status(500).json(error));
// });

module.exports = router;
