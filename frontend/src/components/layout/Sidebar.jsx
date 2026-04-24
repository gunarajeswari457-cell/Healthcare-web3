import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut, HeartPulse } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar({ role }) {
  const location = useLocation();
  
  const patientLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tests', href: '/dashboard/tests', icon: Activity },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const doctorLinks = [
    { name: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
    { name: 'Patients', href: '/doctor/patients', icon: Users },
    { name: 'Settings', href: '/doctor/settings', icon: Settings },
  ];

  const links = role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <HeartPulse size={20} />
        </div>
        <span className="text-lg font-bold text-slate-900 tracking-tight">NeuroHealth</span>
      </div>
      
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          
          return (
            <NavLink
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={18} className={cn(isActive ? "text-blue-700" : "text-slate-400")} />
              {link.name}
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4">
        <NavLink
          to="/login"
          onClick={() => localStorage.removeItem('token')}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} className="text-slate-400 group-hover:text-red-600" />
          Logout
        </NavLink>
      </div>
    </div>
  );
}
