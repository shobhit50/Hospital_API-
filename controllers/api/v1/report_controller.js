const Patient = require('../../../models/patient');
const Doctor = require('../../../models/doctor');
const Report = require('../../../models/report');






/**
 * @swagger
 * /report/create:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor:
 *                 type: string
 *               patient:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The report was successfully created
 *       401:
 *         description: Error occurred
 */
module.exports.create_report = async function (req, res) {

  const doctor = req.doctor._id;
  console.log("Dr:" + doctor);

  try {
    console.log("Inside try");

    const report = await Report.create({
      doctor: doctor,
      patient: req.params.id,
      status: req.body.status
    });

    return res.status(200).json({
      success: true
    });
  }
  catch (err) {
    // Error handling
    return res.status(401).json({
      success: false,
      msg: err.message,
    });
  }
}




/**
 * @swagger
 * /patient/{id}/all_reports:
 *   get:
 *     summary: Get all reports for a patient
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The patient ID
 *     responses:
 *       200:
 *         description: A list of reports for the patient
 *       401:
 *         description: Error occurred
 */
//find patient with id and send report
module.exports.all_reports = async function (req, res) {

  try {
    const reports = Report.find({ "patient": req.params.id });
    reports.exec(function (err, report) {
      return res.send(report);
    })
  }
  catch (err) {
    // Error handling
    return res.status(401).json({
      success: false,
      msg: err.message,
    });
  }

}







/**
 * @swagger
 * /report/{status}:
 *   get:
 *     summary: Get all reports with a specific status
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: status - [ 'Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit' ]
 *     responses: 
 *       200:
 *         description: A list of reports with the specified status
 *       500:
 *         description: Error occurred
 */
//send report by status
module.exports.report_by_status = async (req, res) => {
  console.log("Inside report by status");
  try {
    const reports = Report.find({ "status": req.params.status });
    reports.exec(function (err, rep) {
      return res.send(rep);
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }

}