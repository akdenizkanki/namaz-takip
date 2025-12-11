
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface PrayerStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface AlarmSettings {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  prayers: PrayerStatus;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

export interface KazaCounts {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  vitr: number;
}

export enum AppView {
  HOME = 'HOME',
  STATS = 'STATS',
  AI_CHAT = 'AI_CHAT',
  PRAYERS = 'PRAYERS',
  SETTINGS = 'SETTINGS'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}