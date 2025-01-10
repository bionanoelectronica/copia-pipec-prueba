import React, { useState, useEffect } from 'react';
    import './MonitoringControls.css';

    const MonitoringControls = ({ onPlay, onPause, onStop }) => {
      const [isPlaying, setIsPlaying] = useState(false);

      useEffect(() => {
        if (isPlaying) {
          onPlay();
        } else {
          onPause();
        }
      }, [isPlaying, onPlay, onPause]);

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleStop = () => {
        setIsPlaying(false);
        onStop();
      };

      return (
        <div className="monitoring-controls">
          <h3>Monitoreo continuo</h3>
          <div className="controls">
            <button className="control-button play" onClick={handlePlay}>
              ▶️
            </button>
            <button className="control-button pause" onClick={handlePause}>
              ⏸️
            </button>
            <button className="control-button stop" onClick={handleStop}>
              ⏹️
            </button>
          </div>
          <div className="sampling-options">
            <button className="sampling-option active">Muestra simple</button>
            <button className="sampling-option">Personalizada</button>
          </div>
        </div>
      );
    };

    export default MonitoringControls;
