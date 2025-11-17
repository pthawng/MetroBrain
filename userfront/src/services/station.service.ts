import { ATOMIC_STATIONS } from '../features/booking/constants/map.constants';
import { FARE_MATRIX } from '../features/booking/constants/fare.constants';

export interface Station {
  id: string;
  name: string;
  index: number;
  kmFromStart: number;
  x: number;
  y: number;
  type: 'UNDERGROUND' | 'ELEVATED';
  description?: string;
}

export const STATIONS: Station[] = ATOMIC_STATIONS.map((s, index) => ({
  id: s.id,
  name: s.name,
  index,
  kmFromStart: s.km,
  x: s.x,
  y: s.y,
  type: s.id <= 'ST-03' ? 'UNDERGROUND' : 'ELEVATED'
}));

export const stationService = {
  getStations: (): Promise<Station[]> => {
    return Promise.resolve(STATIONS);
  },
  
  getRoute: (fromId: string, toId: string) => {
    const from = STATIONS.find(s => s.id === fromId);
    const to = STATIONS.find(s => s.id === toId);
    
    if (!from || !to) return null;
    
    const distance = Math.abs(to.kmFromStart - from.kmFromStart);
    // Official Fare Lookup from Matrix
    const priceK = FARE_MATRIX[from.index][to.index];
    const price = priceK * 1000;
    
    return {
      distance: Number(distance.toFixed(3)),
      price: price,
      estimatedMinutes: Math.ceil(distance * 2 + 3) // ~2min per km + 3min overhead
    };
  }
};
