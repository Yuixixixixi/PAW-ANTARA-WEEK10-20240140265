const express = require('express');
const path = require('path');
const session = require('express-session');
const { sequelize } = require('./models');

const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret-key-cs-bot',
    resave: false,
    saveUninitialized: true,
  })
);

// Setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Route Frontend UI
app.get('/', (req, res) => {
  res.render('chat');
});

// Routes API
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});