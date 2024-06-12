const express = require('express');
const jwt = require('jsonwebtoken');
const {User,BMI,StepCount} = require("../db/db");

const authMiddleware = require('../middleware/auth')

const UserRouter = express.Router();
const functionalityRouter = express.Router();


UserRouter.post('/signUp', async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.json({
            msg: "Please fill all details"
        });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({
                msg: "Username already exists. Please choose a different username."
            });
        }

        const newUser = await User.create({ name, username, password });
        const token = jwt.sign({ userId: newUser._id }, 'internship'); 
        const updatedUser = await User.findByIdAndUpdate(newUser._id, { token }, { new: true }); 
        return res.json({
            msg: "User Created Successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error creating user"
        });
    }
})

UserRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please provide both username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      const token = jwt.sign({ userId: user._id }, 'internship'); 
      await User.findByIdAndUpdate(user._id, { token }, { new: true }); 
      return res.status(200).json({
        msg: "Login successful",
        token: token 
      });
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error logging in" });
  }
});



function bmiCalculator(weight, height) {
    let ans = (weight) / (height * height);
    return ans; // Return only the numerical value
}


functionalityRouter.post('/bmiCal', authMiddleware, async (req, res) => {
    try {
        const { weight, height } = req.body;
        const userId = req.user._id; // Assuming req.user._id is the user's ID from the decoded token

        if (!weight || !height) {
            return res.status(400).json({ msg: 'Please provide both weight and height' });
        }

        const bmi = bmiCalculator(weight, height);
        const newBMI = await BMI.create({
            user: userId, 
            Time: Date.now(),
            weight,
            height,
            bmiValue: bmi
        });

        return res.status(201).json({ msg: 'BMI record created successfully', bmi: newBMI });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

functionalityRouter.get('/bmiRecords', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user._id is the user's ID from the decoded token

        const bmiRecords = await BMI.find({ user: userId }).sort({ Time: -1 }); // Sorting by most recent

        if (!bmiRecords.length) {
            return res.status(404).json({ msg: 'No BMI records found' });
        }

        return res.status(200).json(bmiRecords);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
UserRouter.post("/step-count", async (req, res) => {
    const { userId, stepCount } = req.body;
  
    try {
      const newStepCount = new StepCount({ userId, stepCount });
      await newStepCount.save();
      res.status(201).json({ success: true, message: "Step count saved successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error saving step count." });
    }
  });

module.exports = {
    UserRouter,
    functionalityRouter
}