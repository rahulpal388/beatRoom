import { app } from "./index.js";
import { httpServerHandler } from "cloudflare:node";
import { env } from "@zodTypes/envType.js";

const PORT = env.PORT || 8081;
export default httpServerHandler({ port: PORT });
