import React, { useEffect, useState, useMemo } from 'react';
import { metrics } from '../../../shared/lib/metrics';
import { useTrainStore } from '../../../entities/train/store/trainStore';
import { useFilterStore } from '../../../features/alert-system/store/filterStore';
import { Panel } from '../../../shared/ui/Panel/Panel';
import './MetricsPanel.css';

export const MetricsPanel: React.FC = () => {
  const [currentMetrics, setCurrentMetrics] = useState(metrics.getMetrics());
  const trainsMap = useTrainStore(state => state.trains);
  const trains = useMemo(() => Object.values(trainsMap), [trainsMap]);
  const { statusFilter, setStatusFilter } = useFilterStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(metrics.getMetrics());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const delayedCount = trains.filter(t => t.status === 'delayed').length;

  return (
    <Panel title="System Operations" className="metrics-panel">
      <div className="metrics-section">
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="label">FPS</span>
            <span className="value">{currentMetrics.fps}</span>
          </div>
          <div className="metric-item">
            <span className="label">Latency</span>
            <span className="value">{currentMetrics.updateLatency.toFixed(1)}ms</span>
          </div>
        </div>
      </div>

      <div className="metrics-divider" />

      <div className="control-section">
        <h4 className="control-title">Quick Filters</h4>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Units ({trains.length})
          </button>
          <button 
            className={`filter-btn btn-warning ${statusFilter === 'delayed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('delayed')}
          >
            Delayed ({delayedCount})
          </button>
        </div>
      </div>
    </Panel>
  );
};
