// api/_lib/pterodactyl.js
import axios from 'axios';

export async function createPanel(username, ramKey, customPassword) {
    const domain = process.env.PTERO_DOMAIN;
    const apikey = process.env.PTERO_API_KEY;
    const capikey = process.env.PTERO_CLIENT_API_KEY; // capikey dimasukkan ke config
    const nestid = process.env.PTERO_NEST_ID;
    const egg = process.env.PTERO_EGG_ID;
    const loc = process.env.PTERO_LOCATION_ID;

    const pteroHeaders = { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${apikey}` };
    const resourceMap = { 
        "1gb": {ram:"1000",disk:"1000",cpu:"40"}, "2gb": {ram:"2000",disk:"1000",cpu:"60"}, 
        "3gb": {ram:"3000",disk:"2000",cpu:"80"}, "4gb": {ram:"4000",disk:"2000",cpu:"100"}, 
        "5gb": {ram:"5000",disk:"3000",cpu:"120"}, "6gb": {ram:"6000",disk:"3000",cpu:"140"}, 
        "7gb": {ram:"7000",disk:"4000",cpu:"160"}, "8gb": {ram:"8000",disk:"4000",cpu:"180"}, 
        "9gb": {ram:"9000",disk:"5000",cpu:"200"}, "10gb": {ram:"10000",disk:"5000",cpu:"220"}, 
        "unlimited": {ram:"0",disk:"0",cpu:"0"} 
    };
    const { ram, disk, cpu } = resourceMap[ramKey] || resourceMap["unlimited"];

    try {
        // 1. Create User
        const userRes = await axios.post(`${domain}/api/application/users`, { 
            email: `${username}@andristore.com`, username, first_name: username, last_name: "Server", language: "en", password: customPassword 
        }, { headers: pteroHeaders });
        const user = userRes.data.attributes;

        // 2. Get Egg Details (Auto-detect Environment & Docker Image agar tidak error)
        const eggRes = await axios.get(`${domain}/api/application/nests/${nestid}/eggs/${egg}?include=variables,config`, { headers: pteroHeaders });
        const eggData = eggRes.data.attributes;
        const startup_cmd = eggData.startup;
        const docker_image = eggData.docker_image;
        
        // Mengambil environment variable default dari egg
        const environment = {};
        if (eggData.relationships?.variables?.data) {
            eggData.relationships.variables.data.forEach(v => {
                environment[v.attributes.env_variable] = v.attributes.server_value || v.attributes.default_value;
            });
        }

        // 3. Create Server
        const serverRes = await axios.post(`${domain}/api/application/servers`, { 
            name: `${username}-server`, 
            description: "Created by Andri Store", 
            user: user.id, 
            egg: parseInt(egg), 
            docker_image, 
            startup: startup_cmd, 
            environment, 
            limits: { memory: ram, swap: 0, disk, io: 500, cpu }, 
            feature_limits: { databases: 5, backups: 5, allocations: 5 }, 
            deploy: { locations: [parseInt(loc)], dedicated_ip: false, port_range: [] } 
        }, { headers: pteroHeaders });

        const server = serverRes.data.attributes;
        return { success: true, data: { username, password: customPassword, serverId: server.id, serverName: server.name, panelUrl: domain } };

    } catch (err) {
        // Mengambil pesan error asli dari Pterodactyl
        const pteroError = err.response?.data?.errors;
        const errorMsg = pteroError ? pteroError.map(e => e.detail || e.code).join('. ') : err.message;
        console.error("PTERO ERROR:", JSON.stringify(pteroError || err.message));
        return { success: false, message: errorMsg };
    }
}

export async function createAdmin(username, customPassword) {
    const domain = process.env.PTERO_DOMAIN;
    const apikey = process.env.PTERO_API_KEY;
    const uname = username.toLowerCase();

    try {
        const res = await axios.post(`${domain}/api/application/users`, {
            email: `${uname}@andristore.com`, username: uname, first_name: uname, last_name: "Admin", root_admin: true, language: "en", password: customPassword
        }, { headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${apikey}` } });

        if (res.data.errors) return { success: false, message: res.data.errors[0]?.detail || "Create admin failed" };
        const user = res.data.attributes;
        return { success: true, data: { username: user.username, password: customPassword, serverId: "N/A (Admin)", serverName: "Admin Privileges", panelUrl: domain } };
    } catch (err) {
        const pteroError = err.response?.data?.errors;
        const errorMsg = pteroError ? pteroError.map(e => e.detail || e.code).join('. ') : err.message;
        return { success: false, message: errorMsg };
    }
}
