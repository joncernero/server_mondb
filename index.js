require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const controllers = require('./controllers');

// sequelize.sync();
//sequelize.sync({ force: true });
app.use(require('./middleware/headers'));

app.use(express.json());

//app.use(require('./middleware/validate-session))
app.use('/user', controllers.user);
app.use('/account', controllers.account);
app.use('/agency', controllers.agency);
app.use('/io', controllers.io);
app.use('/provider', controllers.provider);
app.use('/sales', controllers.sales);
app.use('/order', controllers.order);
app.use('/budget', controllers.budget);
app.use('/campaign', controllers.campaign);
app.use('/engagement', controllers.engagement);
app.use('/implementation', controllers.implementation);
app.use('/activity', controllers.activity);
app.use('/weeklyupdate', controllers.weeklyupdate);
app.use('/status', controllers.status);

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  // .then(() => sequelize.sync({ force: true }))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log('[server]: Server Crashed');
    console.log(e);
  });
