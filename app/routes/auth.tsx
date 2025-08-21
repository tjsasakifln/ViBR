import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
}
