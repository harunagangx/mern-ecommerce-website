import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { FaArrowUpLong } from 'react-icons/fa6';
import './DashboardChart.scss';

const data = [
  {
    month: 'Jan',
    lastYear: 45,
    thisYear: 40,
  },
  {
    month: 'Feb',
    lastYear: 60,
    thisYear: 65,
  },
  {
    month: 'Mar',
    lastYear: 70,
    thisYear: 90,
  },
  {
    month: 'Apr',
    lastYear: 60,
    thisYear: 70,
  },
  {
    month: 'May',
    lastYear: 67,
    thisYear: 80,
  },
  {
    month: 'Jun',
    lastYear: 80,
    thisYear: 50,
  },
  {
    month: 'Jul',
    lastYear: 59,
    thisYear: 75,
  },
  {
    month: 'Aug',
    lastYear: 90,
    thisYear: 86,
  },
  {
    month: 'Sep',
    lastYear: 60,
    thisYear: 78,
  },
  {
    month: 'Oct',
    lastYear: 66,
    thisYear: 70,
  },
  {
    month: 'Nov',
    lastYear: 59,
    thisYear: 67,
  },
  {
    month: 'Dec',
    lastYear: 70,
    thisYear: 74,
  },
];

const DashboardChart = () => {
  const formatToolTipValue = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="dashboard__chart">
      <div className="dashboard__chart-info mb-4">
        <h5 className="chart__title">Total Revenue</h5>
        <div className="chart__data d-flex align-items-center gap-2">
          <div className="data-value">$50.4k</div>
          <div className="data-text d-flex align-items-center gap-1">
            <FaArrowUpLong size={18} />
            <p className="pt-3">5% than last year</p>
          </div>
        </div>
      </div>
      <div className="chart__wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width="100%"
            height="100%"
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="month" tick={{ fontSize: 14, fill: '#676767' }} />
            <YAxis
              verticalAlign="top"
              padding={{ bottom: 10 }}
              tickFormatter={formatYAxisLabel}
              tick={{
                fill: '#676767',
              }}
            />
            <CartesianGrid strokeDasharray="2 2" />
            <Tooltip
              formatter={formatToolTipValue}
              cursor={{ fill: 'transparent' }}
            />
            <Legend
              iconType="rect"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Line
              dataKey="lastYear"
              type="monotone"
              stroke="#FF9500"
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: '#FF9500',
                fill: '#fff',
                strokeWidth: 4,
                r: 6,
              }}
            />
            <Line
              dataKey="thisYear"
              type="monotone"
              stroke="#24CCB8"
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: '#24CCB8',
                fill: '#fff',
                strokeWidth: 4,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
