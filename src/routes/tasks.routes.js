import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks); //obtener todas
router.get("/tasks/:id", authRequired, getTask); //obtener una en especifico
router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask); //crear
router.delete("/tasks/:id", authRequired, deleteTask); //eliminar una sola
router.put("/tasks/:id", authRequired, updateTask); //agregar una sola


export default router;