
import { httpServerHandler } from "cloudflare:node";
import { app } from "./app.js";

const PORT = 8080;

app.listen(PORT);

export default httpServerHandler({ port: PORT });

