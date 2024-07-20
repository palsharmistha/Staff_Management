const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Create a new staff member
router.post('/', async (req, res) => {
  const { name, position, department } = req.body;
  try {
    const newStaff = new Staff({ name, position, department });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all staff members
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a staff member's details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, { name, position, department }, { new: true });
    res.status(200).json(updatedStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a staff member
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.findByIdAndDelete(id);
    res.status(200).json({ message: 'Staff member deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
