import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ParentLayout from './layouts/ParentLayout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import RegisterStudent from './pages/admin/students/RegisterStudent';
import ViewStudents from './pages/admin/students/ViewStudents';
import FaceEnrollment from './pages/admin/face/FaceEnrollment';
import LiveAttendance from './pages/admin/attendance/LiveAttendance';
import AttendanceHistoryAdmin from './pages/admin/attendance/AttendanceHistory';
import DailyReport from './pages/admin/reports/DailyReport';
import MonthlyReport from './pages/admin/reports/MonthlyReport';
import Settings from './Settings';

// Parent Pages
import DashboardParent from './pages/parent/Dashboard';
import MyChildren from './pages/parent/MyChildren';
import AttendanceHistoryParent from './pages/parent/AttendanceHistory';
import Notifications from './pages/parent/Notifications';
import Profile from './pages/parent/Profile';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students/register" element={<RegisterStudent />} />
        <Route path="students/view" element={<ViewStudents />} />
        <Route path="face-enrollment" element={<FaceEnrollment />} />
        <Route path="attendance/live" element={<LiveAttendance />} />
        <Route path="attendance/history" element={<AttendanceHistoryAdmin />} />
        <Route path="reports/daily" element={<DailyReport />} />
        <Route path="reports/monthly" element={<MonthlyReport />} />

        {/* ✅ ADMIN SETTINGS */}
        <Route path="settings" element={<Settings role="admin" />} />
      </Route>

      <Route path="/parent" element={
        <ProtectedRoute role="parent">
          <ParentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardParent />} />
        <Route path="dashboard" element={<DashboardParent />} />
        <Route path="my-children" element={<MyChildren />} />
        <Route path="attendance-history" element={<AttendanceHistoryParent />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />

        {/* ✅ PARENT SETTINGS */}
        <Route path="settings" element={<Settings role="parent" />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
