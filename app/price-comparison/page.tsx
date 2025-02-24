// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   zoomPlugin
// );

// export default function PriceComparison() {
//   const sectors = {
//     Banking: ['BNBL', 'TBL', 'DPNB'],
//     Insurance: ['RICBL', 'BIL'],
//     Manufacturing: ['BFAL', 'DFAL', 'BPCL', 'DPL', 'BCCL'],
//   };

//   const apiEndpoints = {
//     BNBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BNBL`,
//     TBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/TBL`,
//     DPNB: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DPNB`,
//     RICBL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/RICB`,
//     BIL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BIL`,
//     BFAL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BFAL`,
//     DFAL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DFAL`,
//     BPCL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BPCL`,
//     DPL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/DPL`,
//     BCCL: `${process.env.NEXT_PUBLIC_API_URL}/fetch-price-movement/BCCL`
//   };

//   const [selectedSector, setSelectedSector] = useState('Banking');
//   const [selectedTimeFilter, setSelectedTimeFilter] = useState('All');
//   const [sectorData, setSectorData] = useState([]);

//   const timeFilters = ['1M', '3M', '6M', '1Y', 'All'];

//   useEffect(() => {
//     const fetchData = async () => {
//       const companies = sectors[selectedSector];
//       const dataPromises = companies.map(async (company) => {
//         const response = await fetch(apiEndpoints[company]);
//         const rawData = await response.json();
//         console.log('API Response for', company, rawData);
    
//         // Ensure data is an array before processing
//         const data = Array.isArray(rawData) ? rawData : [];
//         return {
//           company,
//           data: data.map(([timestamp, price]) => ({
//             date: new Date(timestamp),
//             price,
//           })),
//         };
//       });
    
//       const results = await Promise.all(dataPromises);
//       setSectorData(results);
//     };

//     fetchData();
//   }, [selectedSector]);

//   const handleSectorChange = (event) => {
//     setSelectedSector(event.target.value);
//   };

//   const handleTimeFilterChange = (filter) => {
//     setSelectedTimeFilter(filter);
//   };

//   const filterDataByTime = (data) => {
//     const today = new Date();
//     const timePeriods = {
//       '1M': 30,
//       '3M': 90,
//       '6M': 180,
//       '1Y': 365,
//       All: Infinity,
//     };

//     const daysToInclude = timePeriods[selectedTimeFilter];
//     return data.filter((point) => {
//       const differenceInDays = (today - point.date) / (1000 * 60 * 60 * 24);
//       return differenceInDays <= daysToInclude;
//     });
//   };

//   const filteredData = sectorData.map((company) => ({
//     ...company,
//     data: filterDataByTime(company.data),
//   }));

//   const chartData = {
//     labels: filteredData[0]?.data.map((point) =>
//       point.date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
//     ) || [],
//     datasets: filteredData.map((company, index) => ({
//       label: company.company,
//       data: company.data.map((point) => point.price),
//       borderColor: ['#382E7A', '#205A8A', '#7E3BF2', '#3A2A76', '#73D13D'][index],
//       backgroundColor: 'rgba(0, 0, 0, 0)',
//       tension: 0.4,
//       fill: false,
//     })),
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           title: function (context) {
//             const date = new Date(filteredData[0]?.data[context[0]?.dataIndex]?.date);
//             return date.toLocaleDateString(undefined, {
//               day: 'numeric',
//               month: 'short',
//               year: 'numeric',
//             });
//           },
//           label: function (context) {
//             return `${context.dataset.label}: ${context.raw}`;
//           },
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: { enabled: true },
//           pinch: { enabled: true },
//           mode: 'x',
//         },
//         pan: {
//           enabled: true,
//           mode: 'x',
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: selectedTimeFilter,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Price',
//         },
//       },
//     },
//     elements: {
//       point: {
//         radius: 0, // Removes the visible points on the graph
//         //hoverRadius: 0, // Prevents circles from appearing on hover
//       },
//     },
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
//       <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
//         <label className="text-sm font-medium">Select Sector</label>
//         <select
//           value={selectedSector}
//           onChange={handleSectorChange}
//           className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
//         >
//           {Object.keys(sectors).map((sector) => (
//             <option key={sector} value={sector}>
//               {sector}
//             </option>
//           ))}
//         </select>

//         <div className="flex space-x-2 mb-4">
//           {timeFilters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => handleTimeFilterChange(filter)}
//               className={`px-4 py-2 rounded-md ${
//                 selectedTimeFilter === filter ? 'bg-custom-1 text-white' : 'border'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
//         <Line data={chartData} options={options} />
//       </div>
//     </div>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>HI</div>
  )
}
