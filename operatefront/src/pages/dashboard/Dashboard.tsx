import { MapWidget } from '../../widgets/map-view/ui/MapWidget';
import { MetricsPanel } from '../../widgets/map-view/ui/MetricsPanel';
import { TrainListPanel } from '../../widgets/train-panel/ui/TrainListPanel';
import { GlobalStatusBar } from '../../widgets/global-status/ui/GlobalStatusBar';
import { AlertPanel } from '../../widgets/alert-panel/ui/AlertPanel';
import { SocketProvider } from '../../app/providers/SocketProvider';
import { StressTest } from '../../shared/lib/StressTest';
import { LoginOverlay } from '../../features/operator-id/ui/LoginOverlay';

export const Dashboard = () => {
  return (
    <SocketProvider>
      <LoginOverlay />
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        background: 'hsl(var(--color-bg-primary))',
        position: 'relative' 
      }}>
        {/* Top layer (z-index 1000) */}
        <GlobalStatusBar />

        {/* Base layer (z-index 0) */}
        <MapWidget />
        
        {/* Floating Overlays (z-index 100-900) */}
        <AlertPanel />
        <TrainListPanel />
        <MetricsPanel />

        {/* Dev Tools */}
        <StressTest />
      </div>
    </SocketProvider>
  );
};
