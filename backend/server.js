const app = require('./app');
const sequelize = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos conectada y modelos sincronizados');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar DB:', err.message);
    process.exit(1);
  });