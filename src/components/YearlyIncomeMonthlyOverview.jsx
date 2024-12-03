import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import './YearlyIncomeMonthlyOverview.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const yearlyIncomeExpenseData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Income',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: 'green',
      fill: false,
    },
    {
      label: 'Expenses',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: 'red',
      fill: false,
    },
  ],
};

const monthlyIncomeOverviewData = {
  labels: ['OPD', 'IPD', 'Pharmacy', 'Pathology', 'Radiology', 'Blood Bank', 'Ambulance', 'Income'],
  datasets: [
    {
      data: [100, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: ['#8B4513', '#FFA500', '#FFD700', '#00CED1', '#9370DB', '#4682B4', '#BEBEBE', '#008000'],
      borderWidth: 0,
      cutout: '70%', // Adjust cutout to create a more curved shape
    },
  ],
};

const yearlyChartOptions = {
  scales: {
    y: {
      min: 20000,
      max: 140000,
    },
  },
};

const YearlyIncomeMonthlyOverview = () => {
  const [showYearly, setShowYearly] = useState(true);
  const [showMonthly, setShowMonthly] = useState(true);
  const [minimizeYearly, setMinimizeYearly] = useState(false);
  const [minimizeMonthly, setMinimizeMonthly] = useState(false);

  return (
    <div className={`yearly-monthly-overview ${!showYearly || !showMonthly ? 'single-card' : ''}`}>
      {showYearly && (
        <div className={`chart-card ${minimizeYearly ? 'minimized-card' : ''}`}>
          <h2 className="chart-title">
            Yearly Income & Expense
            <div>
              <button onClick={() => setMinimizeYearly(!minimizeYearly)}>{minimizeYearly ? '+' : '−'}</button>
              <button onClick={() => setShowYearly(false)}>×</button>
            </div>
          </h2>
          {!minimizeYearly && (
            <div className="chart-container">
              <Line data={yearlyIncomeExpenseData} options={yearlyChartOptions} />
            </div>
          )}
        </div>
      )}
      {showMonthly && (
        <div className={`chart-card ${minimizeMonthly ? 'minimized-card' : ''}`}>
          <h2 className="chart-title">
            Monthly Income Overview
            <div>
              <button onClick={() => setMinimizeMonthly(!minimizeMonthly)}>{minimizeMonthly ? '+' : '−'}</button>
              <button onClick={() => setShowMonthly(false)}>×</button>
            </div>
          </h2>
          {!minimizeMonthly && (
            <div className="doughnut-container">
              <Doughnut data={monthlyIncomeOverviewData} options={{ maintainAspectRatio: false }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YearlyIncomeMonthlyOverview;
