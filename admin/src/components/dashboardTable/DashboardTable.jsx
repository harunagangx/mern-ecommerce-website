import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardTable.scss';

const TABLE_HEADS = ['#Order No.', 'Date', 'Customer name', 'Price', 'Status'];

const TABLE_DATA = [
  {
    id: 100,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'delivered',
    amount: 400,
  },
  {
    id: 101,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'pending',
    amount: 288,
  },
  {
    id: 102,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'canceled',
    amount: 500,
  },
  {
    id: 103,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'delivered',
    amount: 100,
  },
  {
    id: 104,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'delivered',
    amount: 60,
  },
  {
    id: 105,
    order_id: '#11232',
    date: 'Jun 29,2024',
    customer: 'Truong Nguyen',
    status: 'delivered',
    amount: 80,
  },
];

const DashboardTable = () => {
  return (
    <section className="dashboard__table">
      <div className="dashboard-table__header d-flex align-items-center justify-content-between">
        <h4 className="header__title">Recent Orders</h4>
        <Link to="/orders">
          <button>See all</button>
        </Link>
      </div>
      <div className="table__content">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.order_id}</td>
                  <td>{item.date}</td>
                  <td>{item.customer}</td>
                  <td>${item.amount}</td>
                  <td>
                    <span className={`data-status ${item.status} text-center`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardTable;
