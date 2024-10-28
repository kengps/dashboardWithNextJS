import React from "react";
import { Box, Typography } from "@mui/material";
import { Layout } from "antd";

const { Footer } = Layout
function AppFooter() {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
}

export default AppFooter;
