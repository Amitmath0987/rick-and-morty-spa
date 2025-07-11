import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routeTree.gen";

export const router = createRouter({
  routeTree,
});
