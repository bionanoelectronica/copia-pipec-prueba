import React, { useState, useCallback } from 'react';
    import MonitoringControls from './MonitoringControls';
    import SignalChart from './SignalChart';
    import Metrics from './Metrics';
    import './VitalSigns.css';

    const VitalSigns = () => {
      const [isPlaying, setIsPlaying] = useState(false);

      const handlePlay = useCallback(() => {
        setIsPlaying(true);
      }, []);

      const handlePause = useCallback(() => {
        setIsPlaying(false);
      }, []);

      const handleStop = useCallback(() => {
        setIsPlaying(false);
      }, []);

      const chartData = {
        labels: Array.from({ length: 50 }, (_, i) => i.toString()),
        datasets: [
          {
            label: 'Signal Data',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#283593',
            borderWidth: 1,
          },
        ],
      };

      return (
        <div className="vital-signs">
          <MonitoringControls
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
          />
          <div className="charts-container">
            <SignalChart title="ECG Ch1" data={chartData} isPlaying={isPlaying} />
            <SignalChart title="ECG Ch2" data={chartData} isPlaying={isPlaying} />
            <SignalChart title="SpO2" data={chartData} isPlaying={isPlaying} />
            <SignalChart title="Resp" data={chartData} isPlaying={isPlaying} />
          </div>
          <Metrics />
        </div>
      );
    };

    export default VitalSigns;
