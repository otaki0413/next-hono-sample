import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().openapi({ example: "task_1234567890" }),
  title: z.string().openapi({ example: "タスクのタイトル" }),
  description: z.string().nullable().openapi({ example: "タスクの説明" }),
  completed: z.boolean().openapi({ example: false }),
  userId: z.string().openapi({ example: "user_123" }),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(255),
  description: z.string().max(100).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional().nullable(),
  completed: z.boolean().optional(),
});

export const taskResponseSchema = z.object({
  data: taskSchema,
});

export const taskListResponseSchema = z.object({
  data: z.array(taskSchema),
});

export const deleteTaskResponseSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;
