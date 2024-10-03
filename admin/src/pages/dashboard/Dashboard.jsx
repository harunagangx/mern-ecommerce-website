import React from 'react';
import DashboardCards from '../../components/dashboardCards/DashboardCards';
import DashboardChart from '../../components/dashboardChart/DashboardChart';
import DashboardTable from '../../components/dashboardTable/DashboardTable';

const Dashboard = () => {
  return (
    <>
      <DashboardCards />
      <DashboardChart />
      <DashboardTable />
    </>
  );
};

export default Dashboard;
