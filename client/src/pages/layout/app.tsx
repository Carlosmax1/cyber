import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="text-neutral-200 antialiased min-h-screen bg-neutral-900">
      <Outlet />
    </div>
  );
}
