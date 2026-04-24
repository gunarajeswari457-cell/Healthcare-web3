import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock authentication check
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');
    
    if (!storedRole) {
      navigate('/login');
    } else {
      setUser({ role: storedRole, name: storedName || 'John Doe' });
    }
  }, [navigate]);

  if (!user) return <div className="flex h-screen items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar role={user.role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}
