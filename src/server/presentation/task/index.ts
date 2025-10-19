import { createOpenAPIHono } from "../factory";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./handlers";
import {
  createTaskRoute,
  deleteTaskRoute,
  getTasksRoute,
  updateTaskRoute,
} from "./routes";

export const taskRouter = createOpenAPIHono()
  .openapi(getTasksRoute, getTasksHandler)
  .openapi(createTaskRoute, createTaskHandler)
  .openapi(updateTaskRoute, updateTaskHandler)
  .openapi(deleteTaskRoute, deleteTaskHandler);
