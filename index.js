const express = require('express');
const sequelize = require('./config/configDb');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const emailRoutes = require('./routes/emailRoutes');
const imageRoutes = require('./routes/imageRoutes');
const faqRoutes = require('./routes/faqRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const PORT = process.env.PORT;
const allowedOrigins = ['http://localhost:5173', 'https://gridstudio.netlify.app'];
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(corsOptions);
app.use(compression());

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
})();


app.use('/api/users', userRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/email', emailRoutes)
app.use('/api/image', imageRoutes);
app.use('/*', (req,res) => res.status(404).send({ message: "Invalid action" }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

