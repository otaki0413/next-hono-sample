import { createRoute } from "@hono/zod-openapi";

import { appErrorSchema } from "../error";
import {
  createTaskSchema,
  deleteTaskResponseSchema,
  taskListResponseSchema,
  taskResponseSchema,
  updateTaskSchema,
} from "./schemas";

/**
 * GET /tasks - タスク一覧取得ルート
 */
export const getTasksRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Task"],
  summary: "タスク一覧を取得",
  responses: {
    200: {
      description: "タスク一覧を取得しました",
      content: {
        "application/json": {
          schema: taskListResponseSchema,
        },
      },
    },
    ...appErrorSchema,
  },
});

/**
 * POST /tasks - タスク作成ルート
 */
export const createTaskRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Task"],
  summary: "新規タスクを作成",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "タスクを作成しました",
      content: {
        "application/json": {
          schema: taskResponseSchema,
        },
      },
    },
    ...appErrorSchema,
  },
});

/**
 * PATCH /tasks/:id - タスク更新ルート
 */
export const updateTaskRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Task"],
  summary: "タスクを更新",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "タスクを更新しました",
      content: {
        "application/json": {
          schema: taskResponseSchema,
        },
      },
    },
    ...appErrorSchema,
  },
});

/**
 * DELETE /tasks/:id - タスク削除ルート
 */
export const deleteTaskRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Task"],
  summary: "タスクを削除",
  responses: {
    200: {
      description: "タスクを削除しました",
      content: {
        "application/json": {
          schema: deleteTaskResponseSchema,
        },
      },
    },
    ...appErrorSchema,
  },
});
