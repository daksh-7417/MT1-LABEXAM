
import express from 'express';

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: 'Develop Login Page',
        assignedTo: 'Rahul Sharma',
        status: 'Pending',
        priority: 'High'
    },
    {
        id: 2,
        taskName: 'Design Homepage',
        assignedTo: 'Amit Kumar',
        status: 'Completed',
        priority: 'Medium'
    },
    {
        id: 3,
        taskName: 'Test Application',
        assignedTo: 'Priya Singh',
        status: 'In Progress',
        priority: 'High'
    }
];

// 1. GET - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// 2. GET - Retrieve task by ID
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.status(200).json(task);
});

// 3. POST - Add a new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (
        id === undefined ||
        !taskName ||
        !assignedTo ||
        !status ||
        !priority
    ) {
        return res.status(400).json({
            message: 'All task fields are required'
        });
    }

    if (tasks.some(t => t.id === Number(id))) {
        return res.status(400).json({
            message: 'Task ID already exists'
        });
    }

    const newTask = {
        id: Number(id),
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Task added successfully',
        task: newTask
    });
});

// 4. PUT - Update task by ID
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    if (
        !taskName ||
        !assignedTo ||
        !status ||
        !priority
    ) {
        return res.status(400).json({
            message: 'All task fields are required'
        });
    }

    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.status(200).json({
        message: 'Task updated successfully',
        task: task
    });
});

// 5. DELETE - Delete task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: 'Task deleted successfully'
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
