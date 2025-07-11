import { rootRoute } from "./_layout/root.route";
import { indexRoute } from "./character/index.route";
import { characterRoute } from "./character/$id.route";

export const routeTree = rootRoute.addChildren([indexRoute, characterRoute]);
