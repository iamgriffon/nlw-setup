import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors, {
  origin: ["http://localhost:3000/*"]
});

app.register(appRoutes);

const port = 4000;

app.listen({
  port: port,
}).then(() => {
  console.log(`HTTP Server is working on PORT:${port}`)
});



