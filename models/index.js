const User = require('./user');
const Account = require('./account');
const Provider = require('./provider');
const Sales = require('./sales');
const Agency = require('./agency');
const Order = require('./order');
const Budget = require('./budget');
const Activity = require('./activity');
const Campaign = require('./campaign');
const Engagement = require('./engagement');
const Status = require('./status');
const WeeklyUpdate = require('./weeklyupdate');
const Implementation = require('./implementation');
const IO = require('./io');

Account.belongsTo(User);
User.hasMany(Account);

Account.belongsTo(Agency);
Agency.hasMany(Account);

Provider.belongsTo(Account);
Account.hasMany(Provider);

Sales.belongsTo(Account);
Account.hasMany(Sales);

Activity.belongsTo(Account);
Account.hasMany(Activity);

Activity.belongsTo(User);
User.hasMany(Activity);

Order.belongsTo(Account);
Account.hasMany(Order);

Status.belongsTo(Account);
Account.hasMany(Status);

Implementation.belongsTo(Account);
Account.hasMany(Implementation);

Engagement.belongsTo(Account);
Account.hasMany(Engagement);

Budget.belongsTo(Account);
Account.hasMany(Budget);

Budget.belongsTo(Order);
Order.hasMany(Budget);

IO.belongsTo(Agency);
Agency.hasMany(IO);

Order.belongsTo(IO);
IO.hasMany(Order);

WeeklyUpdate.belongsTo(Account);
Account.hasMany(WeeklyUpdate);

Campaign.belongsTo(Account);
Account.hasMany(Campaign);

module.exports = {
  User,
  Account,
  Provider,
  Sales,
  Agency,
  Order,
  Budget,
  Activity,
  Campaign,
  Engagement,
  Status,
  WeeklyUpdate,
  Implementation,
  IO,
};
