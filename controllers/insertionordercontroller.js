const router = require('express').Router();
const { Agency, IO } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  const newIo = {
    agencyIO: req.body.agencyIO,
    ioBudget: req.body.ioBudget,
    ioSpend: req.body.ioSpend,
    agencyId: req.body.agencyId,
  };
  IO.create(newIo)
    .then((io) => res.status(200).json(io))
    .catch((error) => res.status(500).json(error));
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateIO = {
    agencyIO: req.body.agencyIO,
    ioBudget: req.body.ioBudget,
    ioSpend: req.body.ioSpend,
    agencyId: req.body.agencyId,
  };

  const query = { where: { id: req.params.id } };

  IO.update(updateIO, query)
    .then((io) => res.status(200).json(io))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  IO.findAll()
    .then((io) => res.status(200).json(io))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  IO.destroy(query)
    .then(() => res.status(200).json({ message: 'Order removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
