import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askReligiousQuestion = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: "Sen yardımsever, nazik ve bilgili bir İslami asistansın. Kullanıcıların namaz, ibadet ve dini konulardaki sorularını Ehli Sünnet kaynaklarına dayalı olarak, dengeli ve anlaşılır bir Türkçe ile cevapla. Cevapların kısa, öz ve motive edici olsun. Eğer kesin bir hüküm veremeyeceğin karmaşık fıkhi bir konuysa, bir uzmana danışmalarını tavsiye et.",
        temperature: 0.7,
      }
    });

    return response.text || "Üzgünüm, şu an cevap veremiyorum.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bağlantı hatası oluştu veya kotanız doldu. Lütfen daha sonra tekrar deneyin.";
  }
};