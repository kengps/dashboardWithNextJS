// components/AuthProvider.jsx
"use client";
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AppProviders({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    console.log("QueryClientProvider is rendering"); // ตรวจสอบว่า QueryClientProvider ทำงานแล้ว
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    );
}