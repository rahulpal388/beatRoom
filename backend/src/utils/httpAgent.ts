

import https from "https"

const agent = new https.Agent({ family: 4 });

const httpAgentAndTimeOut = { httpsAgent: agent, timeout: 10000 }
export default httpAgentAndTimeOut;