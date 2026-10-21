import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAdminStore } from '../../store/adminStore';
import { BookOpen, Calendar, FileText, Bell, ArrowUpRight, Clock3, MapPin } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { programs, departments } = useAdminStore();

  const program = programs.find(p => p.name === user?.program);
  const department = departments.find(d => d.name === user?.department);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-sm font-medium text-[#b08312]">Tuesday, October 22, 2024</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Good morning, {user?.name?.split(' ')[0]}.</h2><p className="mt-2 text-slate-500">Here&apos;s your academic overview for today.</p></div>
        <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm sm:block"><p className="text-xs text-slate-500">Current semester</p><p className="font-semibold text-slate-900">Fall 2024</p></div>
      </div>
      <div className="rounded-3xl bg-[#071a33] p-6 text-white shadow-xl shadow-slate-300/30 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="inline-flex rounded-full bg-[#d7a928]/15 px-3 py-1 text-xs font-semibold text-[#f5d97b]">Student dashboard</span><h3 className="mt-4 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">Keep moving toward your degree.</h3><p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">Your courses, academic records, and campus updates are all in one place.</p></div><button className="inline-flex items-center gap-2 self-start rounded-xl bg-[#d7a928] px-4 py-3 text-sm font-semibold text-[#071a33] transition hover:bg-[#edc34e]">View academic record <ArrowUpRight size={16} /></button></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Academic Info Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-[#C41E3A]" />
            Current Program
          </h3>
          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="font-medium text-gray-900">{user?.program || 'Not Assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{user?.department || 'Not Assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  {user?.status || 'Active'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium text-gray-900">{program?.level || 'Undergraduate'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">My Documents</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">Class Schedule</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-[#FFD700]" />
          Recent Announcements
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-[#002147] pl-4 py-2">
            <p className="text-sm text-gray-500 mb-1">Oct 15, 2024</p>
            <h4 className="text-md font-medium text-gray-900">Fall Semester Registration Opens</h4>
            <p className="text-sm text-gray-600 mt-1">Registration for the upcoming Fall semester will begin next week. Please check your academic advisor for course approvals.</p>
          </div>
          <div className="border-l-4 border-[#C41E3A] pl-4 py-2">
            <p className="text-sm text-gray-500 mb-1">Oct 10, 2024</p>
            <h4 className="text-md font-medium text-gray-900">Campus Library Extended Hours</h4>
            <p className="text-sm text-gray-600 mt-1">The main library will now be open 24/7 during the mid-term examination period.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
