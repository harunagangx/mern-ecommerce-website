import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <main className="page__wrapper">
      <Sidebar />
      <div className="content__wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
