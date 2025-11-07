"use client";
import CekPermohonanPageComponent from "./CekPermohonanPageComponent";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function CekPermohonanPage() {
  // Mock user data - dalam production seharusnya dari session/auth
  const user: User = {
    id: 1,
    email: "user@example.com",
    role: "PRAKTIKAN"
  };

  return <CekPermohonanPageComponent user={user} />;
}