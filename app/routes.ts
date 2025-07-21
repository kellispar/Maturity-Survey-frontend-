import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("irm", "routes/irm/index.tsx")
] satisfies RouteConfig;
