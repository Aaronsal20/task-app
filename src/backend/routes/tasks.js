const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const TaskController = require('../controllers/tasks');



router.post("", TaskController.createTask);


router.put("/:id",
TaskController.updateTask
  );

router.get("/:id", TaskController.getSingleTask);

router.delete("/:id", TaskController.deleteTask
 );

router.get('', TaskController.getTasks);

module.exports = router;
