const express = require('express');
const port = 5000;
const db = require('./config/mongoose.js');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy.js');
const reportsRoute = require('./routes/reports.js')
const patientRoute = require('./routes/patients.js')
const doctorRoute = require('./routes/doctors.js');
const Patient = require('./models/patient.js');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital API',
      version: '1.0.0',
    },
  },
  apis: ['./controllers/api/v1/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

fs.writeFileSync('swagger.json', JSON.stringify(specs, null, 2));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(__dirname + '/swagger.json');
});

//redirecting routes
app.use('/report', reportsRoute);
app.use('/patient', patientRoute);
app.use('/doctor', doctorRoute);

app.listen(port, function (err) {
  if (err) { console.log('error'); return; }

  console.log(`server is running on ${port}`);
});