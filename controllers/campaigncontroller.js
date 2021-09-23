const router = require('express').Router();
const { Campaign, Account } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id: req.body.accountId },
    });

    const campaign = await Campaign.create(req.body);

    account.addCampaign(campaign);
    res.status(200).json(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateCampaign = {
    campaignMethod: req.body.campaignMethod,
    kpiRank: req.body.kpiRank,
    kpiNotes: req.body.kpiNotes,
    onsetNotes: req.body.onsetNotes,
    pacing: req.body.pacing,
    dailyPacing: req.body.dailyPacing,
    actualPacing: req.body.actualPacing,
  };

  const query = { where: { id: req.params.id } };

  Campaign.update(updateCampaign, query)
    .then((campaign) => res.status(200).json(campaign))
    .catch((error) => res.status(500).json(error));
});

router.get('/', validateSession, (req, res) => {
  Campaign.findAll({ where: { accountId: req.params.accountId } })
    .then((campaign) => res.status(200).json(campaign))
    .catch((error) => res.status(500).json(error));
});

router.get('/:accountId', validateSession, (req, res) => {
  Campaign.findAll({ where: { accountId: req.params.accountId } })
    .then((campaign) => res.status(200).json(campaign))
    .catch((error) => res.status(200).json(error));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  Campaign.destroy(query)
    .then(() => res.status(200).json({ message: 'Campaign removed' }))
    .catch((error) => res.status(500).json(error));
});
module.exports = router;
