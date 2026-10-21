import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, User, BookOpen, Bell, LogOut, ExternalLink, GraduationCap, Menu, X } from 'lucide-react';

const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Academic Info', path: '/student/academics', icon: BookOpen },
    { name: 'Announcements', path: '/student/announcements', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex text-slate-900">
      <div className={`fixed inset-0 z-20 bg-slate-950/40 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-[#071a33] text-white shadow-2xl transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#d7a928] text-[#071a33]"><GraduationCap size={22} /></div>
            <div><h2 className="text-lg font-bold tracking-tight">UNS Portal</h2><p className="text-xs text-slate-400">Student services</p></div>
          </div>
          <button className="lg:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="px-6 py-5"><div className="rounded-2xl bg-white/5 p-4"><p className="text-xs uppercase tracking-wider text-slate-400">Signed in as</p><p className="mt-1 truncate font-semibold">{user?.name}</p><span className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300">Active student</span></div></div>
        <nav className="flex-1 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/student' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`mx-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#d7a928] text-[#071a33] shadow-lg shadow-[#d7a928]/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`} onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button><div><p className="text-xs font-medium uppercase tracking-wider text-slate-400">University of New State</p><h1 className="text-lg font-bold text-slate-900">{navItems.find(item => location.pathname === item.path || (item.path !== '/student' && location.pathname.startsWith(item.path)))?.name || 'Portal'}</h1></div></div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#b08312]"><ExternalLink size={16} /> <span className="hidden sm:inline">View public site</span></Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-5 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
