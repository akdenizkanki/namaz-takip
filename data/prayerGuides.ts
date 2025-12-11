export interface PrayerGuide {
  title: string;
  rekat: string;
  steps: {
    title: string;
    description: string;
  }[];
}

export const prayerGuides: Record<string, PrayerGuide> = {
  Fajr: {
    title: "Sabah Namazı",
    rekat: "4 Rekat (2 Sünnet, 2 Farz)",
    steps: [
      {
        title: "2 Rekat Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Sabah namazının sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "2 Rekat Farz",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Sabah namazının farzını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      }
    ]
  },
  Dhuhr: {
    title: "Öğle Namazı",
    rekat: "10 Rekat (4 İlk Sünnet, 4 Farz, 2 Son Sünnet)",
    steps: [
      {
        title: "4 Rekat İlk Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Öğle namazının sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "4 Rekat Farz",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Öğle namazının farzını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "2 Rekat Son Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Öğle namazının son sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      }
    ]
  },
  Asr: {
    title: "İkindi Namazı",
    rekat: "8 Rekat (4 Sünnet, 4 Farz)",
    steps: [
      {
        title: "4 Rekat Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için İkindi namazının sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik dualarını okuruz

3. Rekat
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "4 Rekat Farz",
        description: `1. Rekat
• "Niyet ettim Allah rızası için İkindi namazının farzını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      }
    ]
  },
  Maghrib: {
    title: "Akşam Namazı",
    rekat: "5 Rekat (3 Farz, 2 Sünnet)",
    steps: [
      {
        title: "3 Rekat Farz",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Akşam namazının farzını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "2 Rekat Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Akşam namazının sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      }
    ]
  },
  Isha: {
    title: "Yatsı Namazı",
    rekat: "13 Rekat (4 İlk Sünnet, 4 Farz, 2 Son Sünnet, 3 Vitir)",
    steps: [
      {
        title: "4 Rekat İlk Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Yatsı namazının sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik dualarını okuruz

3. Rekat
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "4 Rekat Farz",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Yatsı namazının farzını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

4. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "2 Rekat Son Sünnet",
        description: `1. Rekat
• "Niyet ettim Allah rızası için Yatsı namazının son sünnetini kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye sağa ve sola selam vererek namazı tamamlarız`
      },
      {
        title: "3 Rekat Vitir Vacip",
        description: `1. Rekat
• "Niyet ettim Allah rızası için bu günün Vitir namazını kılmaya" diye niyet ederiz
• "Allahu Ekber" diyerek İftitah Tekbiri alır ve namaza başlarız
• Sübhaneke'yi okuruz
• Euzü-besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz

2. Rekat
• Ayağa kalkarak Kıyama dururuz
• Besmele çekeriz
• Fatiha Suresini okuruz
• Kur'an'dan bir sure okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu okuruz

3. Rekat
• Besmele çekeriz
• Fatiha okuruz
• Bir namaz suresi okuruz
• "Allahu Ekber" diyerek yeniden Tekbir alırız
• Kunut dualarını okuruz
• Rüku'ya gideriz
• Secde'ye gideriz. Doğruluruz, tekrar Secde'ye gideriz
• Oturarak Ettahiyyatu ve Allâhumme salli, Allâhumme Bârik ve Rabbenâ dualarını okuruz
• "Es selâmu aleyküm ve rahmet'ullah" diye selam vererek namazı tamamlarız`
      }
    ]
  }
};
