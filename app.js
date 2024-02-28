const express = require('express');
const port = 5000;
const db = require('./config/mongoose.js');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy.js');
const reportsRoute = require('./routes/reports.js')
const patientRoute = require('./routes/patients.js')
const doctorRoute = require('./routes/doctors.js');
const Patient = require('./models/patient.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital API',
      version: '1.0.0',
    },
  },
  apis: ['./controllers/api/v1/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//redirecting routes
app.use('/report', reportsRoute);
app.use('/patient', patientRoute);
app.use('/doctor', doctorRoute);



app.listen(port, function (err) {
  if (err) { console.log('error'); return; }

  console.log(`server is running on ${port}`);
});
