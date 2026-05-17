import axios from 'axios';

const config = {
    domain: process.env.PTERO_DOMAIN,
    apikey: process.env.PTERO_API_KEY,
    nestid: process.env.PTERO_NEST_ID,
    egg: process.env.PTERO_EGG_ID,
    loc: process.env.PTERO_LOCATION_ID,
};

const pteroHeaders = { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${config.apikey}` };
const resourceMap = { "1gb": {ram:"1000",disk:"1000",cpu:"40"}, "2gb": {ram:"2000",disk:"1000",cpu:"60"}, "3gb": {ram:"3000",disk:"2000",cpu:"80"}, "4gb": {ram:"4000",disk:"2000",cpu:"100"}, "5gb": {ram:"5000",disk:"3000",cpu:"120"}, "6gb": {ram:"6000",disk:"3000",cpu:"140"}, "7gb": {ram:"7000",disk:"4000",cpu:"160"}, "8gb": {ram:"8000",disk:"4000",cpu:"180"}, "9gb": {ram:"9000",disk:"5000",cpu:"200"}, "10gb": {ram:"10000",disk:"5000",cpu:"220"}, "unlimited": {ram:"0",disk:"0",cpu:"0"} };

export async function createPanel(username, ramKey, customPassword) {
    const email = `${username}@andristore.com`; const name = `${username.charAt(0).toUpperCase() + username.slice(1)} Server`; const password = customPassword;
    const { ram, disk, cpu } = resourceMap[ramKey] || resourceMap["unlimited"];
    try {
        const userRes = await axios.post(`${config.domain}/api/application/users`, { email, username, first_name: name, last_name: "Server", language: "en", password }, { headers: pteroHeaders });
        const user = userRes.data.attributes;
        const eggRes = await axios.get(`${config.domain}/api/application/nests/${config.nestid}/eggs/${config.egg}`, { headers: pteroHeaders });
        const startup_cmd = eggRes.data.attributes?.startup || "npm start";
        const serverRes = await axios.post(`${config.domain}/api/application/servers`, { name, description: new Date().toLocaleString('id-ID'), user: user.id, egg: parseInt(config.egg), docker_image: "ghcr.io/parkervcp/yolks:nodejs_20", startup: startup_cmd, environment: { INST: "npm", USER_UPLOAD: "0", AUTO_UPDATE: "0", CMD_RUN: "npm start" }, limits: { memory: ram, swap: 0, disk, io: 500, cpu }, feature_limits: { databases: 5, backups: 5, allocations: 5 }, deploy: { locations: [parseInt(config.loc)], dedicated_ip: false, port_range: [] } }, { headers: pteroHeaders });
        const server = serverRes.data.attributes; const domainClean = config.domain.replace(/https?:\/\//g, "");
        return { success: true, data: { username, password, serverId: server.id, serverName: server.name, panelUrl: `https://${domainClean}` } };
    } catch (err) { return { success: false, message: err.response?.data?.errors?.[0]?.detail || err.message }; }
}

export async function createAdmin(username, customPassword) {
    const uname = username.toLowerCase(); const email = `${uname}@andristore.com`; const name = uname.charAt(0).toUpperCase() + uname.slice(1); const password = customPassword;
    try {
        const res = await axios.post(`${config.domain}/api/application/users`, { email, username: uname, first_name: name, last_name: "Admin", root_admin: true, language: "en", password }, { headers: pteroHeaders });
        if (res.data.errors) return { success: false, message: res.data.errors[0]?.detail || "Create admin failed" };
        const user = res.data.attributes; const domainClean = config.domain.replace(/https?:\/\//g, "");
        return { success: true, data: { username: user.username, password, serverId: "N/A (Admin)", serverName: "Admin Privileges", panelUrl: `https://${domainClean}` } };
    } catch (err) { return { success: false, message: err.response?.data?.errors?.[0]?.detail || err.message }; }
}