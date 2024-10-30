const roleAccessMap = require("./roleAccess");

//import { roleAccessMap } from "./index";

export function doesRoleHaveAccessToURL(role, url) {
   
    
    const accessibleRoutes = roleAccessMap[role] || [];
    return accessibleRoutes.some(route => {
        // Create a regex from the route by replacing dynamic segments
        const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(url);
    });
}