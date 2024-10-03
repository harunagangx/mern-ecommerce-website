import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const DashboardCard = ({ colors, percentFillValue, cardInfo }) => {
  const filledValue = (percentFillValue / 100) * 360;
  const remainedValue = 360 - filledValue;

  const data = [
    { name: 'Remained', value: remainedValue },
    { name: 'Achieved Sales', value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${(value / 360) * 100} %`;
  };

  return (
    <div className="dashboard__card">
      <div className="dashboard__card-info">
        <h5 className="info__title">{cardInfo.title}</h5>
        <div className="info__value">{cardInfo.value}</div>
        <p className="info__text">{cardInfo.text}</p>
      </div>
      <div className="dashboard-card-chart">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx={50}
            cy={45}
            innerRadius={20}
            fill="#e4e8ef"
            paddingAngle={0}
            dataKey="value"
            startAngle={-270}
            endAngle={150}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={renderTooltipContent} />
        </PieChart>
      </div>
    </div>
  );
};

export default DashboardCard;
