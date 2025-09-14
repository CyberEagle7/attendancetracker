import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import NotificationPanel from './components/NotificationPanel';
import AttendanceChart from './components/AttendanceChart';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userRole] = useState('admin'); // Mock user role - could be 'employee' or 'admin'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock statistics data
  const todayStats = {
    totalEmployees: 150,
    presentToday: 142,
    absentToday: 8,
    lateArrivals: 12,
    attendanceRate: 94.7
  };

  const monthlyStats = {
    averageAttendance: 92.3,
    totalWorkingDays: 22,
    completedDays: 14
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userRole === 'admin' ? 'Administrator' : 'Employee'}!
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Live Time: {formatTime(currentTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Today's Attendance"
              value={`${todayStats?.presentToday}/${todayStats?.totalEmployees}`}
              subtitle={`${todayStats?.attendanceRate}% attendance rate`}
              icon="Users"
              trend="up"
              trendValue="+2.3%"
              color="success"
            />
            
            <StatsCard
              title="Absent Today"
              value={todayStats?.absentToday}
              subtitle="Employees not present"
              icon="UserX"
              trend="down"
              trendValue="-1.2%"
              color="error"
            />
            
            <StatsCard
              title="Late Arrivals"
              value={todayStats?.lateArrivals}
              subtitle="Arrived after 9:00 AM"
              icon="Clock"
              trend="neutral"
              trendValue="0%"
              color="warning"
            />
            
            <StatsCard
              title="Monthly Average"
              value={`${monthlyStats?.averageAttendance}%`}
              subtitle={`${monthlyStats?.completedDays}/${monthlyStats?.totalWorkingDays} days completed`}
              icon="TrendingUp"
              trend="up"
              trendValue="+5.1%"
              color="primary"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Charts */}
              <AttendanceChart />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Right Column - Notifications and Events */}
            <div className="lg:col-span-1">
              <NotificationPanel />
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon name="Target" size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Monthly Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target Attendance</span>
                  <span className="text-sm font-medium text-foreground">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(monthlyStats?.averageAttendance / 95) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current: {monthlyStats?.averageAttendance}% ({((monthlyStats?.averageAttendance / 95) * 100)?.toFixed(1)}% of goal)
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon name="Award" size={20} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Top Performer</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Top Performer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">100% attendance this month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon name="Calendar" size={20} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">This Week</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Working Days</span>
                  <span className="text-sm font-medium text-foreground">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Days Completed</span>
                  <span className="text-sm font-medium text-foreground">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Attendance</span>
                  <span className="text-sm font-medium text-foreground">91.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;