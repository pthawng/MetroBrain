import React from 'react';
import { useOperatorStore } from '../store/operatorStore';
import type { Operator } from '../store/operatorStore';
import './LoginOverlay.css';

const MOCK_OPERATORS: Operator[] = [
  { id: 'ops-01', name: 'Alpha-1 (Lead)', role: 'supervisor' },
  { id: 'ops-02', name: 'Bravo-2 (Signals)', role: 'dispatcher' },
  { id: 'ops-03', name: 'Charlie-3 (Incidents)', role: 'incident_manager' },
];

export const LoginOverlay: React.FC = () => {
  const login = useOperatorStore((state) => state.login);
  const isAuthenticated = useOperatorStore((state) => state.isAuthenticated);

  if (isAuthenticated) return null;

  const handleSelect = (op: Operator) => {
    // Add a slight delay for elite "authenticating" feel
    const btn = document.getElementById(`btn-${op.id}`);
    if (btn) btn.classList.add('authenticating');
    
    setTimeout(() => {
      login(op);
    }, 800);
  };

  return (
    <div className="login-overlay">
      <div className="login-card glass">
        <div className="login-header">
          <div className="system-logoLarge">METRO-OPS</div>
          <h2>Command Center Login</h2>
          <p>Please select an authorized operator profile to begin the session.</p>
        </div>

        <div className="operator-grid">
          {MOCK_OPERATORS.map((op) => (
            <button
              key={op.id}
              id={`btn-${op.id}`}
              className="operator-btn glass-hover"
              onClick={() => handleSelect(op)}
            >
              <div className="op-avatar">{op.name.charAt(0)}</div>
              <div className="op-info">
                <span className="op-name">{op.name}</span>
                <span className="op-role">{op.role.replace('_', ' ')}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="login-footer">
          <div className="security-badge">
            <span className="dot" /> Encrypted Session (Secure-Link v4)
          </div>
        </div>
      </div>
    </div>
  );
};
