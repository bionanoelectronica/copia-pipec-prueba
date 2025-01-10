import React, { useState, useEffect, useRef } from 'react';
    import { Line } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';
    import './SignalChart.css';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const SignalChart = ({ title, data: initialData, isPlaying, isPaused }) => {
      const [data, setData] = useState(initialData);
      const chartRef = useRef(null);
      const animationFrameRef = useRef(null);

      const generateRandomData = () => {
        return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
      };

      const updateChart = () => {
        if (!isPaused) {
          const newData = generateRandomData();
          setData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          }));
        }

        if (isPlaying) {
          animationFrameRef.current = requestAnimationFrame(updateChart);
        }
      };

      useEffect(() => {
        if (isPlaying) {
          animationFrameRef.current = requestAnimationFrame(updateChart);
        } else {
          cancelAnimationFrame(animationFrameRef.current);
        }

        return () => cancelAnimationFrame(animationFrameRef.current);
      }, [isPlaying, isPaused]);

      useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
          setData({
            labels: Array.from({ length: 50 }, (_, i) => i.toString()),
            datasets: [
              {
                label: 'Signal Data',
                data: generateRandomData(),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#283593',
                borderWidth: 1,
              },
            ],
          });
        }
      }, [title]);

      const options = {
        responsive: true,
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: title,
            color: '#333',
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: '#e0e0e0',
            },
          },
          y: {
            grid: {
              color: '#e0e0e0',
            },
          },
        },
      };

      return (
        <div className="signal-chart">
          <Line ref={chartRef} options={options} data={data} />
        </div>
      );
    };

    export default SignalChart;
