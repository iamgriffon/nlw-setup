import fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import cors from "@fastify/cors";

const app = fastify();
const prisma = new PrismaClient();

app.register(cors, {
  origin: ["http://localhost:3000/*"]
});

const port = 4000;

app.listen({
  port: port,
}).then(() => {
  console.log(`HTTP Server is working on PORT:${port}`)
});

app.get('/hello', async () => {
  const tasks = await prisma.task.findMany();

  console.log(tasks)

  return tasks
});

