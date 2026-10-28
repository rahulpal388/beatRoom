import { createServer } from "node:http";
import { httpServerHandler } from "cloudflare:node";
import { app } from "./index.js";
import {env} from "./zodTypes/envType.ts"

const PORT = env.PORT || 8081;


const server = createServer(app);
server.listen(PORT);

export default httpServerHandler({ port: PORT });



