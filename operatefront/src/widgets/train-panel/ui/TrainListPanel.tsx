import { useTrainStore } from '../../../entities/train/store/trainStore';
import { useFilterStore } from '../../../features/alert-system/store/filterStore';
import { Panel } from '../../../shared/ui/Panel/Panel';
import { Badge } from '../../../shared/ui/Badge/Badge';
import './TrainListPanel.css';

export const TrainListPanel: React.FC = () => {
  const trainsMap = useTrainStore(state => state.trains);
  const { statusFilter } = useFilterStore();
  const trainList = Object.values(trainsMap);

  const filteredTrains = trainList.filter(t => {
    if (statusFilter === 'delayed') return t.status === 'delayed';
    return true;
  });

  // Elite Sorting: Delayed/Critical first
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (a.status === 'delayed' && b.status !== 'delayed') return -1;
    if (a.status !== 'delayed' && b.status === 'delayed') return 1;
    if (a.status === 'delayed' && b.status === 'delayed') {
      return (b.delaySeconds || 0) - (a.delaySeconds || 0);
    }
    return a.id.localeCompare(b.id);
  });

  return (
    <Panel title={`Fleet Overview (${trainList.length})`} className="fleet-panel">
      <div className="fleet-list">
        {sortedTrains.map(train => (
          <TrainCard key={train.id} train={train} />
        ))}
        {trainList.length === 0 && (
          <div className="fleet-empty">Scanning for active units...</div>
        )}
      </div>
    </Panel>
  );
};

const TrainCard: React.FC<{ train: any }> = ({ train }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delayed': return 'warning';
      case 'stopped': return 'error';
      case 'active': return 'success';
      default: return 'neutral';
    }
  };

  return (
    <div className={`fleet-card status-${train.status}`}>
      <div className="fleet-card-top">
        <div className="fleet-id-group">
          <span className="fleet-id">{train.id.substring(0, 8)}</span>
          <span className="fleet-direction">{train.direction || '→'}</span>
        </div>
        <Badge variant={getStatusVariant(train.status)} dot>
          {train.status}
        </Badge>
      </div>

      <div className="fleet-card-metrics">
        <div className="fleet-metric">
          <span className="label">Speed</span>
          <span className="value">{Math.round(train.speed)} km/h</span>
        </div>
        {train.status === 'delayed' && (
          <div className="fleet-metric text-warning">
            <span className="label">Delay</span>
            <span className="value">+{train.delaySeconds}s</span>
          </div>
        )}
      </div>

      <div className="fleet-card-footer">
        <span className="fleet-line">{train.lineId}</span>
        <span className="fleet-updated">
          {new Date(train.lastUpdatedClient).toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
