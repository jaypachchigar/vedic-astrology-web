// Numerology calculation utilities

// Letter to number mapping for Pythagorean numerology
const letterValues: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

// Vowels for Soul Urge Number calculation
const vowels = ['A', 'E', 'I', 'O', 'U'];

/**
 * Reduce a number to single digit or master number (11, 22, 33)
 */
function reduceToSingleDigit(num: number): number {
  // Master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    // Check for master numbers after reduction
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }

  return num;
}

/**
 * Calculate Life Path Number from date of birth
 */
export function calculateLifePath(dateOfBirth: string): number {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1; // 0-indexed
  const year = date.getFullYear();

  // Reduce each component separately (traditional method)
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Sum and reduce
  const total = reducedDay + reducedMonth + reducedYear;
  return reduceToSingleDigit(total);
}

/**
 * Calculate Expression/Destiny Number from full name
 */
export function calculateExpression(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;

  for (const char of cleanName) {
    sum += letterValues[char] || 0;
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculate Soul Urge Number from vowels in name
 */
export function calculateSoulUrge(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;

  for (const char of cleanName) {
    if (vowels.includes(char)) {
      sum += letterValues[char] || 0;
    }
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculate Personality Number from consonants in name
 */
export function calculatePersonality(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;

  for (const char of cleanName) {
    if (!vowels.includes(char)) {
      sum += letterValues[char] || 0;
    }
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculate Personal Year Number
 */
export function calculatePersonalYear(dateOfBirth: string): number {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const currentYear = 2026; // Current year

  const sum = day + month + currentYear;
  return reduceToSingleDigit(sum);
}

/**
 * Get lucky colors based on life path number
 */
export function getLuckyColors(lifePathNumber: number): string[] {
  const colorMap: Record<number, string[]> = {
    1: ["Red", "Orange", "Gold"],
    2: ["White", "Cream", "Light Green"],
    3: ["Yellow", "Purple", "Magenta"],
    4: ["Blue", "Grey", "Earth Tones"],
    5: ["Light Blue", "Turquoise", "Silver"],
    6: ["Pink", "Blue", "Green"],
    7: ["Purple", "Violet", "Sea Green"],
    8: ["Black", "Dark Blue", "Brown"],
    9: ["Red", "Crimson", "Pink"],
    11: ["Silver", "White", "Pale Blue"],
    22: ["Coral", "Rust", "Terracotta"],
    33: ["Emerald", "Sea Green", "Aquamarine"],
  };

  return colorMap[lifePathNumber] || ["White", "Gold", "Orange"];
}

/**
 * Get lucky numbers based on life path number
 */
export function getLuckyNumbers(lifePathNumber: number): number[] {
  const numberMap: Record<number, number[]> = {
    1: [1, 10, 19, 28],
    2: [2, 11, 20, 29],
    3: [3, 12, 21, 30],
    4: [4, 13, 22, 31],
    5: [5, 14, 23],
    6: [6, 15, 24],
    7: [7, 16, 25],
    8: [8, 17, 26],
    9: [9, 18, 27],
    11: [11, 20, 29],
    22: [22, 4, 13],
    33: [33, 6, 15],
  };

  return numberMap[lifePathNumber] || [1, 10, 19];
}

/**
 * Get number meaning/description
 */
export function getNumberMeaning(number: number): string {
  const meanings: Record<number, string> = {
    1: "The Leader - Independent, ambitious, and pioneering. You are a natural leader with strong willpower and determination.",
    2: "The Peacemaker - Diplomatic, cooperative, and sensitive. You excel at bringing people together and creating harmony.",
    3: "The Creative - Expressive, optimistic, and artistic. You have a gift for communication and bringing joy to others.",
    4: "The Builder - Practical, disciplined, and hardworking. You excel at creating stable foundations and achieving long-term goals.",
    5: "The Adventurer - Dynamic, versatile, and freedom-loving. You thrive on change, variety, and new experiences.",
    6: "The Nurturer - Responsible, compassionate, and family-oriented. You have a natural ability to care for and support others.",
    7: "The Seeker - Analytical, spiritual, and introspective. You are drawn to deeper truths and understanding the mysteries of life.",
    8: "The Powerhouse - Ambitious, authoritative, and success-oriented. You have strong business acumen and material goals.",
    9: "The Humanitarian - Compassionate, idealistic, and globally conscious. You are driven to serve and uplift humanity.",
    11: "The Master Intuitive - Highly intuitive, inspirational, and visionary. You have the potential to inspire and enlighten others.",
    22: "The Master Builder - Practical visionary with the ability to turn dreams into reality on a grand scale.",
    33: "The Master Teacher - Compassionate guide with the ability to uplift and heal through teaching and nurturing.",
  };

  return meanings[number] || "A unique spiritual path awaits you.";
}

/**
 * Calculate all core numbers at once
 */
export function calculateAllNumbers(fullName: string, dateOfBirth: string) {
  const lifePath = calculateLifePath(dateOfBirth);
  const expression = calculateExpression(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  const personalYear = calculatePersonalYear(dateOfBirth);

  return {
    lifePath,
    expression,
    soulUrge,
    personality,
    personalYear,
    luckyColors: getLuckyColors(lifePath),
    luckyNumbers: getLuckyNumbers(lifePath),
    lifePathMeaning: getNumberMeaning(lifePath),
    expressionMeaning: getNumberMeaning(expression),
    soulUrgeMeaning: getNumberMeaning(soulUrge),
    personalityMeaning: getNumberMeaning(personality),
  };
}
