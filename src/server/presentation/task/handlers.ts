import type { RouteHandler } from "@hono/zod-openapi";
import type {
  createTaskRoute,
  deleteTaskRoute,
  getTasksRoute,
  updateTaskRoute,
} from "./routes";

export const getTasksHandler: RouteHandler<typeof getTasksRoute> = (c) => {
  return c.json(
    {
      data: [
        {
          id: "task_1234567890",
          title: "タスク1のタイトル",
          description: "タスクの説明",
          completed: false,
          userId: "user_1",
        },
        {
          id: "task_0987654321",
          title: "タスク2のタイトル",
          description: null,
          completed: true,
          userId: "user_2",
        },
        {
          id: "task_1122334455",
          title: "タスク3のタイトル",
          description: "別のタスクの説明",
          completed: false,
          userId: "user_1",
        },
      ],
    },
    200,
  );
};

export const createTaskHandler: RouteHandler<typeof createTaskRoute> = (c) => {
  return c.json(
    {
      data: {
        id: "task_2233445566",
        title: "新しいタスクのタイトル",
        description: "新しいタスクの説明",
        completed: false,
        userId: "user_1",
      },
    },
    200,
  );
};

export const updateTaskHandler: RouteHandler<typeof updateTaskRoute> = (c) => {
  return c.json(
    {
      data: {
        id: "task_1234567890",
        title: "更新後タイトル",
        description: "更新後タスクの説明",
        completed: true,
        userId: "user_1",
      },
    },
    200,
  );
};

export const deleteTaskHandler: RouteHandler<typeof deleteTaskRoute> = (c) => {
  return c.json(
    {
      data: {
        id: "task_1234567890",
      },
    },
    200,
  );
};
