// Türkçe ↔ Osmanlıca ↔ Göktürkçe Çeviri Motoru - Sayı Çevirisi ile

// Osmanlıca harf dönüşümleri
const osmanlicaMap: Record<string, string> = {
  'a': 'ا', 'b': 'ب', 'c': 'ج', 'ç': 'چ', 'd': 'د',
  'e': 'ه', 'f': 'ف', 'g': 'گ', 'ğ': 'غ', 'h': 'ح',
  'ı': 'ى', 'i': 'ی', 'j': 'ژ', 'k': 'ك', 'l': 'ل',
  'm': 'م', 'n': 'ن', 'o': 'و', 'ö': 'و', 'p': 'پ',
  'r': 'ر', 's': 'س', 'ş': 'ش', 't': 'ت', 'u': 'و',
  'ü': 'و', 'v': 'و', 'y': 'ی', 'z': 'ز', 'â': 'آ',
  'î': 'ای', 'û': 'او', ' ': ' ',
  'A': 'ا', 'B': 'ب', 'C': 'ج', 'Ç': 'چ', 'D': 'د',
  'E': 'ه', 'F': 'ف', 'G': 'گ', 'Ğ': 'غ', 'H': 'ح',
  'I': 'ى', 'İ': 'ی', 'J': 'ژ', 'K': 'ك', 'L': 'ل',
  'M': 'م', 'N': 'ن', 'O': 'و', 'Ö': 'و', 'P': 'پ',
  'R': 'ر', 'S': 'س', 'Ş': 'ش', 'T': 'ت', 'U': 'و',
  'Ü': 'و', 'V': 'و', 'Y': 'ی', 'Z': 'ز', 'Â': 'آ',
  'Î': 'ای', 'Û': 'او',
};

// Osmanlıca rakamları
const osmanlicaNumbers: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
};

// Göktürkçe harf dönüşümleri
const gokturkceMap: Record<string, string> = {
  'a': '𐰀', 'e': '𐰀', 'ı': '𐰃', 'i': '𐰃',
  'o': '𐰆', 'u': '𐰆', 'ö': '𐰇', 'ü': '𐰇',
  'b': '𐰋', 'd': '𐰑', 'g': '𐰍', 'ğ': '𐰍',
  'l': '𐰞', 'n': '𐰣', 'r': '𐰺', 's': '𐰽',
  'ş': '𐱁', 't': '𐱃', 'y': '𐰖', 'z': '𐰔',
  'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'k': '𐰴',
  'v': '𐰉', 'w': '𐰉', 'h': '𐰴', 'c': '𐰲',
  'j': '𐰲', 'f': '𐰯', ' ': ' ',
  'A': '𐰀', 'E': '𐰀', 'I': '𐰃', 'İ': '𐰃',
  'O': '𐰆', 'U': '𐰆', 'Ö': '𐰇', 'Ü': '𐰇',
  'B': '𐰋', 'D': '𐰑', 'G': '𐰍', 'Ğ': '𐰍',
  'L': '𐰞', 'N': '𐰣', 'R': '𐰺', 'S': '𐰽',
  'Ş': '𐱁', 'T': '𐱃', 'Y': '𐰖', 'Z': '𐰔',
  'Ç': '𐰲', 'M': '𐰢', 'P': '𐰯', 'K': '𐰴',
  'V': '𐰉', 'W': '𐰉', 'H': '𐰴', 'C': '𐰲',
  'J': '𐰲', 'F': '𐰯',
};

// Göktürkçe rakamları (Orhun alfabesi sayı sistemi)
const gokturkceNumbers: Record<string, string> = {
  '0': '𐰸', '1': '𐰺', '2': '𐰼', '3': '𐰾',
  '4': '𐱀', '5': '𐱂', '6': '𐱄', '7': '𐱆',
  '8': '𐱈', '9': '𐱊',
};

// Ters dönüşüm haritaları
const osmanlicaReverseMap: Record<string, string> = Object.entries(osmanlicaMap).reduce(
  (acc, [key, val]) => ({ ...acc, [val]: key }),
  {}
);

const gokturkceReverseMap: Record<string, string> = Object.entries(gokturkceMap).reduce(
  (acc, [key, val]) => ({ ...acc, [val]: key }),
  {}
);

export type Language = 'turkce' | 'osmanlica' | 'gokturkce';

// Sayı çevirisi fonksiyonu
function translateNumbers(text: string, to: Language): string {
  if (to === 'turkce') return text;
  
  const numberMap = to === 'osmanlica' ? osmanlicaNumbers : gokturkceNumbers;
  
  return text.replace(/\d/g, (digit) => numberMap[digit] || digit);
}

// Sayıları geri çevirme
function reverseNumbers(text: string, from: Language): string {
  if (from === 'turkce') return text;
  
  const numberMap = from === 'osmanlica' ? osmanlicaNumbers : gokturkceNumbers;
  const reverseMap = Object.entries(numberMap).reduce(
    (acc, [key, val]) => ({ ...acc, [val]: key }),
    {} as Record<string, string>
  );
  
  return text.split('').map(char => reverseMap[char] || char).join('');
}

export function translate(text: string, from: Language, to: Language): string {
  if (from === to) return text;
  if (!text) return '';

  // Önce sayıları normalleştir
  const normalizedText = reverseNumbers(text, from);

  let result = '';

  // Türkçe → Osmanlıca
  if (from === 'turkce' && to === 'osmanlica') {
    result = normalizedText
      .split('')
      .map((char) => osmanlicaMap[char] || char)
      .join('');
  }
  // Türkçe → Göktürkçe
  else if (from === 'turkce' && to === 'gokturkce') {
    result = normalizedText
      .split('')
      .map((char) => gokturkceMap[char] || char)
      .join('');
  }
  // Osmanlıca → Türkçe
  else if (from === 'osmanlica' && to === 'turkce') {
    result = normalizedText
      .split('')
      .map((char) => osmanlicaReverseMap[char] || char)
      .join('');
  }
  // Göktürkçe → Türkçe
  else if (from === 'gokturkce' && to === 'turkce') {
    result = normalizedText
      .split('')
      .map((char) => gokturkceReverseMap[char] || char)
      .join('');
  }
  // Osmanlıca → Göktürkçe (Türkçe üzerinden)
  else if (from === 'osmanlica' && to === 'gokturkce') {
    const turkce = translate(text, 'osmanlica', 'turkce');
    result = translate(turkce, 'turkce', 'gokturkce');
  }
  // Göktürkçe → Osmanlıca (Türkçe üzerinden)
  else if (from === 'gokturkce' && to === 'osmanlica') {
    const turkce = translate(text, 'gokturkce', 'turkce');
    result = translate(turkce, 'turkce', 'osmanlica');
  }

  // Son olarak sayıları hedef dile çevir
  return translateNumbers(result, to);
}

// Sesli okuma (TTS) desteği
export function speak(text: string, lang: Language = 'turkce') {
  // Sayıları geri çevir
  const normalizedText = reverseNumbers(text, lang);
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(normalizedText);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// Örnek metinler
export const sampleTexts = [
  'Türk',
  'Bozkurt',
  'Ergenekon',
  'Kutlu olsun',
  'Türk milleti',
  '123',
  '2024',
];

// Dil bilgisi
export const languageInfo: Record<Language, { name: string; description: string; direction: 'rtl' | 'ltr' }> = {
  turkce: {
    name: 'Türkçe',
    description: 'Modern Latin alfabesiyle yazılan Türkiye Türkçesi',
    direction: 'ltr',
  },
  osmanlica: {
    name: 'Osmanlıca',
    description: 'Arap alfabesiyle yazılmış Türkçe, 1928\'e kadar kullanılan resmi yazı dili',
    direction: 'rtl',
  },
  gokturkce: {
    name: 'Göktürkçe',
    description: 'Orhun alfabesi olarak da bilinir, 8. yüzyıldan kalma eski Türk yazısı',
    direction: 'ltr',
  },
};
