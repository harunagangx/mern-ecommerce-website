import React from 'react';
import DashboardCard from './DashboardCard';
import "./DashboardCards.scss"

const DashboardCards = () => {
  return (
    <section className="content-dashboard-cards">
      <DashboardCard
        colors={['#e4e8ef', '#475be8']}
        percentFillValue={80}
        cardInfo={{
          title: 'Today Sales',
          value: '$20.4K',
          text: 'We have sold 100 items',
        }}
      />
      <DashboardCard
        colors={['#e4e8ef', '#4ce13f']}
        percentFillValue={50}
        cardInfo={{
          title: 'Todays Revenue',
          value: '$8.2K',
          text: 'Available to payout',
        }}
      />
      <DashboardCard
        colors={['#e4e8ef', '#f29a2e']}
        percentFillValue={40}
        cardInfo={{
          title: 'In Escrow',
          value: '$18.2K',
          text: 'Available to payout',
        }}
      />
    </section>
  );
};

export default DashboardCards;
