const roleAccessMap = {
    "admin": [
        "/",
        "/auth/login",
        "/dashboard",
        "/dashboard/setting",
        // "/companies/[id]",
        // "/tickets",
        // "/tickets/[id]",
        // "/team",
        // "/payments",
        // "/payments/[id]",
        // "/analytics",
    ],
    "cs": [
        "/",
        "/companies",
        "/companies/[id]",
        "/tickets",
        "/tickets/[id]",
        "/team",
    ],
    "developer": [
        "/",
        "/projects",
        "/projects/[id]",
        "/account",
        "/company",
        "/tickets",
        "/tickets/[id]",
        "/team",
    ],
    "visitor": [
        "/",
        "/projects",
        "/account",
        "/company",
        "/support",
    ],
    "member": [
        "/",
        "/projects",
        "/account",
        "/company",
        "/support",
    ],
};

module.exports = roleAccessMap