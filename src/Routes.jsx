import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CameraAttendance from './pages/camera-attendance';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import UserRegistration from './pages/user-registration';
import QRCodeGeneration from './pages/qr-code-generation';
import AttendanceRecords from './pages/attendance-records';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AttendanceRecords />} />
        <Route path="/camera-attendance" element={<CameraAttendance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/qr-code-generation" element={<QRCodeGeneration />} />
        <Route path="/attendance-records" element={<AttendanceRecords />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
