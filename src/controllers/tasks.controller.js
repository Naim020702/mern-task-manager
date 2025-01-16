import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ //Aguardar a encontrar en la coleccion de tareas de la base de datos...
        user: req.user.id //...aquellas que le pertenecen al usuario logeado
    }).populate("user"); //Muestra la info del usuario tambien
    res.json(tasks); //Muestra las tareas
};

export const createTask = async (req, res) => {
    const { title, description, date } = req.body; //Obtiene esos elementos de la request
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id //la info que se le pegó a la request en authRequired.js. El objeto usuario
    });
    const savedTask = await newTask.save(); //Aguardar a guardar la tarea en la db
    res.json(savedTask); //Muestra la tarea creada
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
};

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};