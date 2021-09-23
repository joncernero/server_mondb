const router = require('express').Router();
const { Agency, IO } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const agency = await Agency.findOne({
      where: { id: req.body.agencyId },
    });

    const io = await IO.create(req.body);

    // agency.addIO(io);
    res.status(200).json(io);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateIO = {
    agencyIO: req.body.agencyIO,
    ioSpend: req.body.ioSpend,
  };

  const query = { where: { id: req.params.id } };

  IO.update(updateIO, query)
    .then((io) => res.status(200).json(io))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  IO.findAll({ where: { agencyId: req.params.agencyId } })
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
