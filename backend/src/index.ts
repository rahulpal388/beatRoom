
import "dotenv/config";
import dns from "node:dns";
import { app } from "./app.js";
import { DBConnect } from "./db/index.js";
import { env } from "./zodTypes/envType.js";

dns.setDefaultResultOrder("ipv4first");

await DBConnect();

const PORT = env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

