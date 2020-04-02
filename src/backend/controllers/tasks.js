

const Task = require('../models/task');


exports.createTask = (req, res, next) => {
  const tasks = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    priority: req.body.priority
  });
  tasks.save().then(result => {
  console.log("TCL: result", result)
  res.status(201).json({
    message: 'Task added successfully',
    task: {
      id: result._id,
      title: result.title,
      description: result.description,
      date: result.date,
      priority: result.priority
    }
  });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a task failed!"
    })
  });
}

exports.updateTask = (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    priority: req.body.priority
  });
  Task.updateOne({_id: req.params.id}, task).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update task"
    })
  })
}

exports.getSingleTask = (req, res, next) => {
  Task.findById(req.params.id).then(task => {
  console.log("exports.getSingleTask -> task", task)
    if(task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({message: 'Task not found'});
    }
  });
}

exports.deleteTask = (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Delete successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(() => {
    res.status(500).json({
      message: "Deleting tasks failed!"
    })
  });
}

exports.getTasks = (req, res, next) => {
  const taskQuery = Task.find();
  let fetchedTasks;
  // if (pageSize && currentPage) {
  //   postQuery
  //   .skip(pageSize * (currentPage - 1))
  //   .limit(pageSize);
  // }
  taskQuery.then(documents => {
  fetchedTasks = documents;
  console.log("exports.getPosts -> fetchedPosts", fetchedTasks)
  console.log(documents);
  res.status(200).json({
    message: 'Tasks fetched successfully',
    tasks: fetchedTasks,
  });
}).catch(error => {
  res.status(500).json({
    message: "Fetching tasks failed!"
  })
});
}



