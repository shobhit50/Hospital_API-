const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');


/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The doctor's name
 *         email:
 *           type: string
 *           description: The doctor's email
 *         password:
 *           type: string
 *           description: The doctor's password
 */
/**
 * @openapi
 * /doctor/register:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The doctor's name
 *               email:
 *                 type: string
 *                 description: The doctor's email
 *               password:
 *                 type: string
 *                 description: The doctor's password
 *     responses:
 *       200:
 *         description: The doctor was successfully created
 *       500:
 *         description: Some server error
 */

//Register the doctor in app
module.exports.register = async function (req, res) {
  try {
    console.log(req.body);
    const doctor = await Doctor.create(req.body);

    return res.status(200).json({
      success: true,
      message: doctor
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
/**
 * @openapi
 * /doctor/login:
 *   post:
 *     summary: Login a doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The doctor's email
 *               password:
 *                 type: string
 *                 description: The doctor's password
 *     responses:
 *       200:
 *         description: The doctor was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 msg:
 *                   type: string
 *       400:
 *         description: No email or password provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
//Doctor Login
module.exports.login = async (req, res) => {
  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'No email or password'
      });
    }

    let doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Username or Password!"
      });
    }

    // Check if password matches // we are calling function from Doctor model bcrypt function.
    const isMatch = await doctor.matchPassword(password);
    // Error handling if invalid password
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Username or Password!"
      });
    }

    // Get JWT token
    const token = doctor.getSignedJwtToken();
    console.log('here are orignale ', token);

    // Return response
    res.status(200).json({
      success: true,
      token,
      msg: `Log In Sucessful! Keep the Token safely  ${doctor.username}!`,
      doctor_id: doctor._id  // we are sending the doctor object as well
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: 'Error Occoured!'
    });
  }
}
