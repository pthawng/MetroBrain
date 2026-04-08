import React from 'react';
import { useAlertStore } from '../../../features/alert-system/store/alertStore';
import type { Alert } from '../../../features/alert-system/store/alertStore';
import { Panel } from '../../../shared/ui/Panel/Panel';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { Button } from '../../../shared/ui/Button/Button';
import './AlertPanel.css';

import { useOperatorStore } from '../../../features/operator-id/store/operatorStore';

export const AlertPanel: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, clearResolved } = useAlertStore();
  const activeOperator = useOperatorStore(state => state.activeOperator);
  
  const activeAlerts = alerts.filter(a => !a.resolved);

  return (
    <Panel 
      title={`Live Alerts (${activeAlerts.length})`} 
      className="alert-panel-container"
      variant="primary"
    >
      <div className="alert-list">
        {activeAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            onAck={() => activeOperator && acknowledgeAlert(alert.id, activeOperator)}
            onResolve={() => activeOperator && resolveAlert(alert.id, activeOperator)}
          />
        ))}
        {activeAlerts.length === 0 && (
          <div className="empty-alerts">System Healthy. No active alerts.</div>
        )}
      </div>
      {alerts.some(a => a.resolved) && (
        <Button variant="ghost" size="sm" onClick={clearResolved} className="clear-btn">
          Clear Resolved
        </Button>
      )}
    </Panel>
  );
};

const AlertCard: React.FC<{ alert: Alert; onAck: () => void; onResolve: () => void }> = ({ alert, onAck, onResolve }) => {
  return (
    <div className={`alert-card severity-${alert.severity} ${alert.acknowledged ? 'acknowledged' : ''}`}>
      <div className="alert-card-header">
        <Badge variant={alert.severity as any} dot>
          {alert.severity}
        </Badge>
        <span className="alert-time">
          {new Date(alert.timestamp).toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
      
      <div className="alert-body">
        <p className="alert-message">{alert.message}</p>
        <div className="alert-meta">
          {alert.count > 1 && <span className="alert-count">×{alert.count} instances</span>}
          {alert.acknowledged && alert.acknowledgedBy && (
            <span className="alert-attribution">
              ACK by: <strong>{alert.acknowledgedBy.name}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="alert-actions">
        {!alert.acknowledged && (
          <Button variant="control" size="sm" onClick={onAck}>ACKNOWLEDGE</Button>
        )}
        <Button variant="ghost" size="sm" onClick={onResolve}>RESOLVE</Button>
      </div>
    </div>
  );
};
