const express = require('express')
const bodyParser = require('body-parser')
const shopRouter = require('./routes/shop')
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth')
const app = express();
const sequelize = require('./config/mysql')
const session = require('express-session')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({ extended: false }));

const User = require('./model/user')
const Product = require('./model/product')
const errorController = require('./controller/error')
const Order = require('./model/Order')
const OrderItem = require('./model/order-item')

app.use(
  session(
    { secret: 'my secret', resave: false, saveUninitialized: false })
);

//To set local variables so that data will be available in your view
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.roles = req.session.roles;
  console.log(res.locals.roles + "roles");
  next();
});

// To get the logged in user
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  const email = req.session.email
  User.findOne({ where: { email: email } })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/', authRouter)

app.use('/shop', shopRouter)

app.use('/admin', adminRouter)

app.use(errorController.get404)


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Order.belongsToMany(Product, { through: OrderItem })
User.hasMany(Order);


sequelize.sync().then((result) => {
  app.listen(8080)
}).catch((err) => {
  console.log(err);
})

