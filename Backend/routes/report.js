const express = require("express"); 
const multer = require("multer");
const axios = require("axios");
//const fetch = require("node-fetch");
const fetchuser = require("../middleware/fetch");
const reports = require("../models/reports");
const { body, validationResult } = require("express-validator");
const { parse, stringify } = require('flatted');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get all the reports : Login req.
router.get("/fetchallreports", fetchuser, async (req, res) => {
  try {
    const report = await reports.find({ user: req.user.id });
    
    res.json(report);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
  }
});

// add a new report using post : Login req.
router.post(
  "/addreport",
  fetchuser,
  async (req, res) => {
    try {
      // if validation error, return
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, imageData } = req.body;
      const report = await reports.create({ title, imageData, user: req.user.id });

      //const report = await report.create({ title: req.body.title,imageData: req.file.buffer,contentType: req.file.mimetype, user: req.user.id });
      // const savedreport = await report.save();
      // res.json(savedreport);
      res.json(report);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Please try again!");
    }
  }
);

// // update an existing report: Login required
router.put("/updatereport/:id", fetchuser, async (req, res) => {
  const { title ,imageData } = req.body;
  try {
    const newreport = {};
    if (title) {
      newreport.title = title;
    }
    if (imageData) {
      newreport.imageData = imageData;
    }
    // find the report to be updated and update it
    let report = await reports.findById(req.params.id);
    // if the report we are trying to edit doesn't exists
    if (!report) {
      return res.status(404).send("Not Found");
    }
    // if the report we are trying to edit doesn't corresponds to this user
    if (report.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    report = await reports.findByIdAndUpdate(
      req.params.id,
      { $set: newreport },
      { new: true }
    );
    res.json({ report });
  } catch (error) {
    console.log(error.message + "This is error");
    res.status(500).send("Internal server error!");
  }
});

// // delete an existing report : Login req.
router.delete("/deletereport/:id", fetchuser, async (req, res) => {
  try {
    // find the report to be deleted
    let report = await reports.findById(req.params.id);
    if (!report) {
      return res.status(404).send("Not Found");
    }
    // allow deletion only if user owns the report
    if (report.user.toString() !== req.user.id) {
      return res.status(401).send("Not Alllowed");
    }
    report = await reports.findByIdAndDelete(req.params.id);
    res.json({ Success: `report has been deleted`, report });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
  }
});

router.post("/predictreport/:id", fetchuser, async (req,res) => {
  try{
    
    let report = await reports.findById(req.params.id);
    if(!report)
    {
      return res.status(404).send("Report not found");
    }
    if(report.user.toString()!=req.user.id)
    {
      return res.status(401).send("Not Allowed");
    }
    
    /*const response = await fetch(`http://127.0.0.1:5000/predict`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // convert js object into document
      body: JSON.stringify({imageData:report.imageData})
    });*/

    //const predictionResult = await response.json();
    //console.log(predictionResult);
    //res.json(predictionResult);

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post('http://127.0.0.1:5000/predict', { imageData: report.imageData }, axiosConfig);
    
    report = await reports.findByIdAndUpdate(
      req.params.id,
      { $set: { result: response.data.Results } },
      { new: true } // Return the updated document
    );

    console.log(response.data.Results)
    return res.json(response.data.Results);
  }
  catch(error)
  {
    console.log(error.message);
    res.status(500).send("Internal server error!");
  }
});

module.exports = router; 