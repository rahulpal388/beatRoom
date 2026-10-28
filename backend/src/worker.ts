import { app } from "./index.js";
import { httpServerHandler } from "cloudflare:node";

export default httpServerHandler({ port: 3000 });
