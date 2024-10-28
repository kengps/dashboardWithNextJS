'use client';
import { useSession } from "next-auth/react";

// app/dashboard/settings/page.js


export default function SettingsPage() {
  const { data: session } = useSession();


  if (!session) {
    return (
      <p>
        คุณยังไม่ได้ล็อกอิน
        <button onClick={() => signIn()}>ล็อกอิน</button>
      </p>
    );
  }
  return (
    <div>
      <h1>Settings</h1>
      <p>This is the settings page</p>
    </div>
  );
}
