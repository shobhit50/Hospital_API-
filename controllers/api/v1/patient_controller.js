const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The patient's name
 *         phone:
 *           type: number 
 *           description: The patient's phone number
 *         doctor:
 *           type: string
 *           description: The doctor's ID
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * /patient/register:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []     # use the same name you have specified in the securitySchemes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: The patient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       200:
 *         description: The patient already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       401:
 *         description: Error occurred
 */
exports.register = async (req, res) => {

  const doctor = req.doctor._id;      // get the doctor id



  try {
    const { name, phone } = req.body; //destructure the name and phone from body
    console.log(req.body);
    let patient;
    patient = await Patient.find({
      phone
    });

    //if there is patient success if not then create
    if (patient.length > 0) {
      return res.status(200).json({
        success: true,
        body: patient[0]
      });
    }


    patient = await Patient.create({
      name,
      phone,
      doctor
    });
    // Return response
    return res.status(201).json({
      success: true,
      body: patient,
      msg: 'Patient Registered Sucessfully!'
    });
  } catch (err) {
    // Error handling
    return res.status(401).json({
      success: false,
      msg: 'Error Occoured!'
    });
  }
};

