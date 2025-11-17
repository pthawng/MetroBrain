/**
 * ATOMIC GIS CONSTANTS
 * Centralized coordinate system for MetroHCM Digital Twin.
 * Grid: 1200x500
 */

export interface GISOrientation {
  id: string;
  name: string;
  x: number;
  y: number;
  km: number;
}

export const ATOMIC_STATIONS: GISOrientation[] = [
  { id: 'ST-01', name: 'Bến Thành', x: 100, y: 380, km: 0 },
  { id: 'ST-02', name: 'Nhà hát TP', x: 260, y: 350, km: 0.715 },
  { id: 'ST-03', name: 'Ba Son', x: 330, y: 330, km: 1.706 },
  { id: 'ST-04', name: 'Văn Thánh', x: 410, y: 260, km: 3.520 },
  { id: 'ST-05', name: 'Tân Cảng', x: 510, y: 220, km: 4.438 },
  { id: 'ST-06', name: 'Thảo Điền', x: 620, y: 190, km: 5.596 },
  { id: 'ST-07', name: 'An Phú', x: 720, y: 175, km: 6.553 },
  { id: 'ST-08', name: 'Rạch Chiếc', x: 830, y: 160, km: 8.207 },
  { id: 'ST-09', name: 'Phước Long', x: 950, y: 145, km: 9.673 },
  { id: 'ST-10', name: 'Bình Thái', x: 1060, y: 130, km: 11.066 },
  { id: 'ST-11', name: 'Thủ Đức', x: 1170, y: 115, km: 12.810 },
  { id: 'ST-12', name: 'Công nghệ cao', x: 1260, y: 100, km: 15.190 },
  { id: 'ST-13', name: 'ĐH Quốc Gia', x: 1320, y: 85, km: 16.765 },
  { id: 'ST-14', name: 'BX Suối Tiên', x: 1350, y: 75, km: 18.821 },
];

export const DISTRICT_METADATA = [
  { name: "District 01", lat: "10.77", long: "106.70", x: 120, y: 440 },
  { name: "Binh Thanh", lat: "10.81", long: "106.71", x: 430, y: 410 },
  { name: "Thu Duc City", lat: "10.84", long: "106.78", x: 1100, y: 260 },
  { name: "District 02", lat: "10.78", long: "106.75", x: 750, y: 340 },
];

export const SAIGON_RIVER_PATH = "M 0 450 C 200 430 300 370 330 290 C 360 210 430 250 500 400 C 570 550 750 400 900 300 C 1050 200 1300 250 1350 100";

export const MAP_CONFIG = {
  viewBox: "0 0 1400 500",
  totalKm: 19.7,
  trackOffset: 6,
};
