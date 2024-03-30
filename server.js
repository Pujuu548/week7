const express = require('express');
const router = express.Router();
const dbFunctions = require('./dbFunctions');

router.get('/courses/:courseId/tasks', async (req, res) => {
  try {
    const tasks = await dbFunctions.getTasksByCourse(req.params.courseId);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this course.' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks.' });
  }
});

module.exports = router;