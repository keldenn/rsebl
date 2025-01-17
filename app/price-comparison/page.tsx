'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import dayjs from 'dayjs'; // Import dayjs for date formatting

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

export default function PriceComparison() {
  const sectors = {
    Banking: [
      { company: 'BNBL', data: [{ date: '2020-04-23', price: 28 }, { date: '2020-05-24', price: 28 }, { date: '2020-06-29', price: 37.9 }] },
      { company: 'TBL', data: [{ date: '2020-04-23', price: 37 }, { date: '2020-05-24', price: 37 }, { date: '2020-06-29', price: 75 }] },
      { company: 'DPNB', data: [{ date: '2020-04-23', price: 30 }, { date: '2020-04-24', price: 35 }, { date: '2020-04-29', price: 28 }] },
    ],
    Insurance: [
      { company: 'RICBL', data: [{ date: '2020-04-23', price: 50 }, { date: '2020-04-24', price: 51 }] },
      { company: 'BIL', data: [{ date: '2020-04-23', price: 60 }, { date: '2020-04-24', price: 62 }] },
    ],
    Manufacturing: [
      { company: 'BFAL', data: [{ date: '2020-04-23', price: 17 }, { date: '2020-04-24', price: 19 }] },
      { company: 'DFAL', data: [{ date: '2020-04-23', price: 20 }, { date: '2020-04-24', price: 22 }] },
    ],
  };

  const [selectedSector, setSelectedSector] = useState('Banking');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All');

  const timeFilters = ['1M', '3M', '6M', '1Y', 'All'];

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handleTimeFilterChange = (filter) => {
    setSelectedTimeFilter(filter);
  };

  const filterDataByTime = (data) => {
    const today = new Date();
    const timePeriods = {
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
      All: Infinity,
    };

    const daysToInclude = timePeriods[selectedTimeFilter];
    return data.filter((point) => {
      const pointDate = new Date(point.date);
      const differenceInDays = (today - pointDate) / (1000 * 60 * 60 * 24);
      return differenceInDays <= daysToInclude;
    });
  };

  const selectedSectorData = sectors[selectedSector].map((company) => ({
    ...company,
    data: filterDataByTime(company.data),
  }));

  const chartData = {
    labels: selectedSectorData[0]?.data.map((point) => {
      const date = new Date(point.date);
      const options = { month: 'short', year: 'numeric' }; // Short month and year format
      return date.toLocaleDateString(undefined, options);
    }) || [],
    datasets: selectedSectorData.map((company, index) => ({
      label: company.company,
      data: company.data.map((point) => point.price),
      borderColor: ['#382E7A', '#205A8A', '#7E3BF2', '#3A2A76', '#73D13D'][index],
      backgroundColor: 'rgba(0, 0, 0, 0)',
      tension: 0.4,
      fill: false,
    })),
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            // Get the full date from the data
            const date = new Date(selectedSectorData[0].data[context[0].dataIndex]?.date);
            return date.toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }); // Format: "23 Apr 2020"
          },
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: selectedTimeFilter, // Use the selected filter as the x-axis title
        },
        ticks: {
          callback: function (value, index, ticks) {
            const date = new Date(chartData.labels[index]);
            const options = { month: 'short', year: 'numeric' }; // Display month and year
            return date.toLocaleDateString(undefined, options);
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
      <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
        <label className="text-sm font-medium">Select Sector</label>
        <select
          value={selectedSector}
          onChange={handleSectorChange}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
        >
          {Object.keys(sectors).map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <div className="flex space-x-2 mb-4">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleTimeFilterChange(filter)}
              className={`px-4 py-2 rounded-md ${
                selectedTimeFilter === filter ? 'bg-blue-500 text-white' : 'border'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
