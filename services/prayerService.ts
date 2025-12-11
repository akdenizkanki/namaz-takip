import { PrayerTimes } from '../types';

export const getPrayerTimes = async (lat: number, lng: number): Promise<PrayerTimes | null> => {
  try {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
    // Using Aladhan API (free, public)
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=13` // Method 13 is Diyanet
    );

    if (!response.ok) {
      throw new Error('Namaz vakitleri alınamadı');
    }

    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
};

export const getHijriDate = async (lat: number, lng: number): Promise<string> => {
    try {
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const response = await fetch(
            `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=13`
        );
        const data = await response.json();
        const hijri = data.data.date.hijri;
        return `${hijri.day} ${hijri.month.tr} ${hijri.year}`;
    } catch (e) {
        return "";
    }
}
