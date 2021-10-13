const router = require('express').Router();
const { Agency, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function (req, res) {
  const newAgency = {
    agencyName: req.body.agencyName,
  };

  console.log({ newAgency });

  Agency.create(newAgency)
    .then((agency) => res.status(200).json(agency))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Agency.findAll()
    .then((account) => res.status(200).json(account))
    .catch((error) => res.status(500).json(error));
});

router.get('/:id', validateSession, (req, res) => {
  Agency.findAll({ where: { id: req.params.id }, include: ['accounts'] })
    .then((agency) => res.status(200).json(agency))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Agency.destroy(query)
    .then(() => res.status(200).json({ message: 'Agency removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
