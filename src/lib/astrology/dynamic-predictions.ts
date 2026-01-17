/**
 * Dynamic Astrological Predictions
 * Generates truly personalized predictions based on:
 * - Moon Sign (emotional/mental)
 * - Ascendant (physical/career)
 * - Maha Dasha (major life period)
 * - Antar Dasha (sub-period)
 * - Transit positions
 */

export interface YearlyPrediction {
  overview: string;
  career: string;
  careerQuarters: string[];
  finance: string;
  financeBreakdown: {
    income: string;
    expenses: string;
    investments: string;
    savings: string;
  };
  relationships: string;
  relationshipAreas: {
    romance: string;
    marriage: string;
    family: string;
    friendships: string;
  };
  health: string;
  healthDetails: {
    physical: string;
    mental: string;
    prevention: string[];
  };
  spiritualGrowth: string;
  spiritualPractices: string[];
  education: string;
  luckyPeriods: string[];
  challenges: string[];
  remedies: string[];
  monthlyHighlights: string[];
}

export interface MonthlyPrediction {
  month: string;
  overview: string;
  career: string;
  finance: string;
  relationships: string;
  health: string;
  keyDates: string[];
}

/**
 * Generate completely personalized yearly prediction
 */
export function generateYearlyPrediction(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  antarDasha: string,
  year: number
): YearlyPrediction {
  // Calculate unique transit positions from BOTH Moon and Ascendant
  const moonIndex = getSignIndex(moonSign);
  const ascIndex = getSignIndex(ascendant);

  // Jupiter in Taurus (until May) then Gemini
  const jupiterFromMoon1 = calculateHouse(2, moonIndex); // Taurus
  const jupiterFromMoon2 = calculateHouse(3, moonIndex); // Gemini
  const jupiterFromAsc1 = calculateHouse(2, ascIndex);
  const jupiterFromAsc2 = calculateHouse(3, ascIndex);

  // Saturn in Pisces
  const saturnFromMoon = calculateHouse(12, moonIndex);
  const saturnFromAsc = calculateHouse(12, ascIndex);

  // Rahu-Ketu axis
  const rahuFromMoon = calculateHouse(12, moonIndex); // Pisces
  const ketuFromMoon = calculateHouse(6, moonIndex); // Virgo
  const rahuFromAsc = calculateHouse(12, ascIndex);
  const ketuFromAsc = calculateHouse(6, ascIndex);

  // Get Dasha characteristics
  const dashaTheme = getDashaTheme(mahaDasha);
  const antarTheme = getAntarDashaModifier(antarDasha);
  const dashaPeriod = getDashaDuration(mahaDasha);

  // Moon sign characteristics
  const moonNature = getMoonSignNature(moonSign);
  const moonElement = getElement(moonSign);

  // Ascendant characteristics
  const ascNature = getAscendantNature(ascendant);
  const ascElement = getElement(ascendant);

  // Build completely unique overview
  const overview = buildUniqueOverview(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha,
    year,
    jupiterFromMoon1,
    jupiterFromAsc1,
    saturnFromMoon,
    saturnFromAsc,
    dashaPeriod
  );

  // Build unique career prediction
  const career = buildCareerPrediction(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha,
    jupiterFromAsc1,
    jupiterFromAsc2,
    saturnFromAsc,
    year
  );

  // Build unique finance prediction
  const finance = buildFinancePrediction(
    moonSign,
    mahaDasha,
    antarDasha,
    jupiterFromMoon1,
    jupiterFromMoon2,
    saturnFromMoon,
    year
  );

  // Build unique relationship prediction
  const relationships = buildRelationshipPrediction(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha,
    jupiterFromMoon1,
    rahuFromMoon,
    year
  );

  // Build unique health prediction
  const health = buildHealthPrediction(
    moonSign,
    ascendant,
    saturnFromAsc,
    ketuFromAsc,
    year
  );

  // Build unique spiritual guidance
  const spiritualGrowth = buildSpiritualGuidance(
    moonSign,
    mahaDasha,
    saturnFromMoon,
    rahuFromMoon,
    year
  );

  // Determine lucky periods based on actual transits
  const luckyPeriods = identifyLuckyPeriods(
    jupiterFromMoon1,
    jupiterFromMoon2,
    jupiterFromAsc1,
    jupiterFromAsc2,
    mahaDasha,
    antarDasha
  );

  // Identify challenges based on actual chart
  const challenges = identifyMainChallenges(
    saturnFromMoon,
    saturnFromAsc,
    rahuFromMoon,
    rahuFromAsc,
    mahaDasha
  );

  // Personalized remedies
  const remedies = generatePersonalizedRemedies(
    moonSign,
    ascendant,
    mahaDasha,
    saturnFromMoon,
    rahuFromMoon
  );

  // Career quarters breakdown
  const careerQuarters = buildCareerQuarters(mahaDasha, antarDasha, jupiterFromAsc1, jupiterFromAsc2, saturnFromAsc, year);

  // Finance breakdown
  const financeBreakdown = buildFinanceBreakdown(moonSign, mahaDasha, jupiterFromMoon1, jupiterFromMoon2, saturnFromMoon, year);

  // Relationship areas
  const relationshipAreas = buildRelationshipAreas(moonSign, ascendant, mahaDasha, antarDasha, jupiterFromMoon1, rahuFromMoon, year);

  // Health details
  const healthDetails = buildHealthDetails(moonSign, ascendant, saturnFromAsc, ketuFromAsc, year);

  // Spiritual practices
  const spiritualPractices = buildSpiritualPractices(moonSign, mahaDasha, saturnFromMoon, rahuFromMoon);

  // Education guidance
  const education = buildEducationGuidance(moonSign, ascendant, mahaDasha, jupiterFromMoon1, jupiterFromMoon2, year);

  // Monthly highlights
  const monthlyHighlights = buildMonthlyHighlights(jupiterFromMoon1, jupiterFromMoon2, saturnFromMoon, mahaDasha, year);

  return {
    overview,
    career,
    careerQuarters,
    finance,
    financeBreakdown,
    relationships,
    relationshipAreas,
    health,
    healthDetails,
    spiritualGrowth,
    spiritualPractices,
    education,
    luckyPeriods,
    challenges,
    remedies,
    monthlyHighlights
  };
}

/**
 * Build completely unique overview based on ALL factors
 */
function buildUniqueOverview(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  antarDasha: string,
  year: number,
  jupiterFromMoon: number,
  jupiterFromAsc: number,
  saturnFromMoon: number,
  saturnFromAsc: number,
  dashaPeriod: string
): string {
  let overview = `${year} is a ${getDashaYearType(mahaDasha, antarDasha)} year for you. `;

  // Unique combination statement
  overview += `With ${moonSign} Moon sign (${getMoonSignNature(moonSign)}) and ${ascendant} Ascendant (${getAscendantNature(ascendant)}), `;
  overview += `you experience life through ${getCombinationStyle(moonSign, ascendant)}. `;

  // Dasha influence
  overview += `Currently in ${mahaDasha} Maha Dasha ${dashaPeriod}, `;
  overview += `modified by ${antarDasha} Antar Dasha, ${getDashaCombinationEffect(mahaDasha, antarDasha)}. `;

  // Jupiter transit impact
  if (jupiterFromMoon <= 4 || jupiterFromMoon >= 10) {
    overview += `Jupiter's transit through your ${getHouseOrdinal(jupiterFromMoon)} house from Moon brings ${getJupiterHouseEffect(jupiterFromMoon)}. `;
  } else {
    overview += `Jupiter's position requires patience but builds long-term foundations. `;
  }

  if (jupiterFromAsc !== jupiterFromMoon) {
    overview += `From your Ascendant, Jupiter transits the ${getHouseOrdinal(jupiterFromAsc)} house, `;
    overview += `affecting ${getJupiterAscendantEffect(jupiterFromAsc)}. `;
  }

  // Saturn impact
  overview += `Saturn in your ${getHouseOrdinal(saturnFromMoon)} house from Moon ${getSaturnHouseEffect(saturnFromMoon)}, `;
  if (saturnFromAsc !== saturnFromMoon) {
    overview += `and ${getHouseOrdinal(saturnFromAsc)} house from Ascendant ${getSaturnAscendantEffect(saturnFromAsc)}. `;
  }

  // Overall theme
  overview += `This year's theme: ${getYearTheme(mahaDasha, jupiterFromMoon, saturnFromMoon)}.`;

  return overview;
}

/**
 * Build unique career prediction based on Ascendant and Dasha
 */
function buildCareerPrediction(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  antarDasha: string,
  jupiterFromAsc1: number,
  jupiterFromAsc2: number,
  saturnFromAsc: number,
  year: number
): string {
  let career = `Your career in ${year} is primarily influenced by your ${ascendant} Ascendant, `;
  career += `which makes you ${getAscendantCareerStyle(ascendant)}. `;

  // Dasha career impact
  career += `The ${mahaDasha} Maha Dasha ${getMahaDashaCareerImpact(mahaDasha)}. `;
  career += `${antarDasha} Antar Dasha adds ${getAntarDashaCareerModifier(antarDasha)}. `;

  // Jupiter transit from Ascendant (career house)
  if (jupiterFromAsc1 === 10 || jupiterFromAsc1 === 11 || jupiterFromAsc1 === 1) {
    career += `Excellent professional year! Jupiter in your ${getHouseOrdinal(jupiterFromAsc1)} house from Ascendant brings ${getJupiterCareerBenefit(jupiterFromAsc1)}. `;
    career += `First half of ${year} (till May) is especially favorable for ${getJupiterCareerActions(jupiterFromAsc1)}. `;
  } else if (jupiterFromAsc1 === 6) {
    career += `Jupiter in 6th from Ascendant helps you overcome workplace obstacles and competitors. Service-oriented roles thrive. `;
  } else {
    career += `Jupiter's position requires patience. Focus on skill development and networking. `;
  }

  // Saturn impact on career
  if (saturnFromAsc === 10) {
    career += `Saturn in your 10th house brings career maturity, authority, but requires disciplined hard work. Recognition comes through persistence. `;
  } else if (saturnFromAsc === 6) {
    career += `Saturn in 6th helps systematically overcome workplace challenges. Your work ethic improves significantly. `;
  } else if (saturnFromAsc === 11) {
    career += `Saturn in 11th supports achieving long-term professional goals through networking and sustained effort. `;
  }

  // Specific recommendations based on combination
  career += getCareerRecommendations(mahaDasha, antarDasha, jupiterFromAsc1, saturnFromAsc);

  return career;
}

/**
 * Build unique finance prediction
 */
function buildFinancePrediction(
  moonSign: string,
  mahaDasha: string,
  antarDasha: string,
  jupiterFromMoon1: number,
  jupiterFromMoon2: number,
  saturnFromMoon: number,
  year: number
): string {
  let finance = `Financial prospects for ${year}: `;

  // Dasha influence on wealth
  finance += `${mahaDasha} Dasha ${getDashaWealthNature(mahaDasha)}. `;
  finance += `${antarDasha} sub-period ${getAntarDashaWealthModifier(antarDasha)}. `;

  // Jupiter 2nd and 11th house effects
  if (jupiterFromMoon1 === 2) {
    finance += `Excellent! Jupiter in 2nd house from Moon significantly boosts income, family wealth, and savings. `;
    finance += `First half of ${year} (Jan-May) is particularly strong for salary increases, bonuses, or family financial support. `;
  } else if (jupiterFromMoon1 === 11) {
    finance += `Jupiter in 11th house brings gains, fulfillment of financial desires, and income from multiple sources. `;
    finance += `First half of ${year} favors investments, stock markets, and elder siblings' support. `;
  } else if (jupiterFromMoon1 === 5) {
    finance += `Jupiter in 5th house can bring speculative gains, but requires wisdom. Avoid gambling. Income through creativity or children. `;
  }

  // Saturn's impact on finances
  if (saturnFromMoon === 2) {
    finance += `Saturn in 2nd requires financial discipline. Income may feel restricted, but teaches valuable money management. `;
  } else if (saturnFromMoon === 11) {
    finance += `Saturn in 11th brings delayed but stable gains. Long-term investments favored. `;
  } else if (saturnFromMoon === 12) {
    finance += `Saturn in 12th increases expenses, especially on health, travel, or spiritual pursuits. Build emergency fund. `;
  }

  // Recommendations
  finance += getFinanceRecommendations(mahaDasha, jupiterFromMoon1, saturnFromMoon);

  return finance;
}

/**
 * Build unique relationship prediction
 */
function buildRelationshipPrediction(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  antarDasha: string,
  jupiterFromMoon: number,
  rahuFromMoon: number,
  year: number
): string {
  let relationships = `Your ${moonSign} Moon gives you ${getMoonSignEmotionalStyle(moonSign)}, `;
  relationships += `while ${ascendant} Ascendant shows ${getAscendantRelationshipStyle(ascendant)}. `;

  // Dasha impact on relationships
  if (['Venus', 'Moon', 'Jupiter'].includes(mahaDasha)) {
    relationships += `${mahaDasha} Dasha is highly favorable for relationships. `;
  } else if (['Mars', 'Sun', 'Saturn'].includes(mahaDasha)) {
    relationships += `${mahaDasha} Dasha requires patience in relationships. Focus on responsibility over romance. `;
  } else if (mahaDasha === 'Rahu') {
    relationships += `Rahu Dasha brings unconventional relationships or sudden changes. `;
  }

  relationships += `${antarDasha} sub-period ${getAntarDashaRelationshipEffect(antarDasha)}. `;

  // Jupiter 7th house effect
  if (jupiterFromMoon === 7) {
    relationships += `Excellent for marriage/partnerships! Jupiter in 7th house brings serious proposals, improved harmony, or meeting life partner. `;
  } else if (jupiterFromMoon === 5) {
    relationships += `Jupiter in 5th house enhances romance, dating, and emotional connections. Good for love affairs and creativity. `;
  } else if (jupiterFromMoon === 11) {
    relationships += `Jupiter in 11th brings fulfillment in friendships and social connections. Romantic goals may be achieved. `;
  }

  // Rahu impact
  if (rahuFromMoon === 7) {
    relationships += `Rahu in 7th can bring unconventional partners or sudden relationship changes. Be mindful in commitments. `;
  }

  return relationships;
}

/**
 * Build unique health prediction
 */
function buildHealthPrediction(
  moonSign: string,
  ascendant: string,
  saturnFromAsc: number,
  ketuFromAsc: number,
  year: number
): string {
  let health = `Health focus for ${year}: `;

  // Ascendant determines physical body
  health += `${ascendant} Ascendant indicates ${getAscendantHealthAreas(ascendant)}. `;

  // Moon sign indicates mental health
  health += `${moonSign} Moon suggests ${getMoonSignHealthTendencies(moonSign)}. `;

  // Saturn impact
  if (saturnFromAsc === 1) {
    health += `Saturn in Ascendant requires extra self-care. Regular exercise and disciplined routine essential. Chronic issues may surface but can be managed. `;
  } else if (saturnFromAsc === 6) {
    health += `Saturn in 6th helps overcome chronic diseases systematically. Disciplined health routines show excellent results. `;
  } else if (saturnFromAsc === 8) {
    health += `Saturn in 8th requires attention to chronic conditions. Focus on longevity practices and Ayurvedic care. `;
  }

  // Ketu impact
  if (ketuFromAsc === 6) {
    health += `Ketu in 6th house helps naturally dissolve health issues, especially chronic inflammation or infections. `;
  } else if (ketuFromAsc === 1) {
    health += `Ketu in Ascendant may create mysterious health issues. Spiritual healing and meditation very beneficial. `;
  }

  return health;
}

/**
 * Build unique spiritual guidance
 */
function buildSpiritualGuidance(
  moonSign: string,
  mahaDasha: string,
  saturnFromMoon: number,
  rahuFromMoon: number,
  year: number
): string {
  let spiritual = `Spiritual path in ${year}: `;

  // Dasha determines spiritual approach
  spiritual += getDashaSpiritualFocus(mahaDasha) + '. ';

  // Saturn 12th house effect
  if (saturnFromMoon === 12) {
    spiritual += `Saturn in 12th house creates powerful spiritual opportunities. Meditation, isolation, and moksha path strongly indicated. `;
  } else if (saturnFromMoon === 9) {
    spiritual += `Saturn in 9th brings serious study of philosophy, dharma, and higher wisdom. Pilgrimage beneficial. `;
  }

  // Rahu 12th house
  if (rahuFromMoon === 12) {
    spiritual += `Rahu in 12th intensifies spiritual seeking, foreign spiritual traditions, or sudden enlightenment experiences. `;
  }

  spiritual += getMoonSignSpiritualPractice(moonSign);

  return spiritual;
}

// ============================================================================
// HELPER FUNCTIONS - Calculate unique values
// ============================================================================

function getSignIndex(sign: string): number {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs.indexOf(sign);
}

function calculateHouse(transitSign: number, natalSignIndex: number): number {
  let house = transitSign - natalSignIndex;
  while (house <= 0) house += 12;
  while (house > 12) house -= 12;
  return house;
}

function getElement(sign: string): string {
  const fire = ['Aries', 'Leo', 'Sagittarius'];
  const earth = ['Taurus', 'Virgo', 'Capricorn'];
  const air = ['Gemini', 'Libra', 'Aquarius'];
  const water = ['Cancer', 'Scorpio', 'Pisces'];

  if (fire.includes(sign)) return 'Fire';
  if (earth.includes(sign)) return 'Earth';
  if (air.includes(sign)) return 'Air';
  return 'Water';
}

function getMoonSignNature(moonSign: string): string {
  const natures: Record<string, string> = {
    Aries: 'passionate and action-oriented emotional nature',
    Taurus: 'stable and comfort-seeking emotional nature',
    Gemini: 'curious and communication-focused mind',
    Cancer: 'deeply emotional and nurturing instincts',
    Leo: 'confident and expressive feelings',
    Virgo: 'analytical and service-oriented mind',
    Libra: 'balanced and relationship-focused emotions',
    Scorpio: 'intense and transformative emotional depth',
    Sagittarius: 'optimistic and freedom-loving spirit',
    Capricorn: 'disciplined and goal-oriented emotions',
    Aquarius: 'innovative and detached mental approach',
    Pisces: 'intuitive and spiritually-inclined feelings'
  };
  return natures[moonSign] || 'unique emotional expression';
}

function getAscendantNature(ascendant: string): string {
  const natures: Record<string, string> = {
    Aries: 'bold and pioneering physical presence',
    Taurus: 'steady and reliable physical constitution',
    Gemini: 'versatile and communicative appearance',
    Cancer: 'nurturing and protective demeanor',
    Leo: 'regal and confident bearing',
    Virgo: 'precise and analytical appearance',
    Libra: 'charming and diplomatic presence',
    Scorpio: 'magnetic and intense physical energy',
    Sagittarius: 'adventurous and philosophical outlook',
    Capricorn: 'disciplined and authoritative presence',
    Aquarius: 'unique and progressive appearance',
    Pisces: 'compassionate and artistic demeanor'
  };
  return natures[ascendant] || 'distinctive physical presence';
}

function getCombinationStyle(moonSign: string, ascendant: string): string {
  if (moonSign === ascendant) {
    return 'strong alignment between inner emotions and outer expression';
  }

  const moonElement = getElement(moonSign);
  const ascElement = getElement(ascendant);

  if (moonElement === ascElement) {
    return `harmonious ${moonElement} energy in both mind and body`;
  }

  if ((moonElement === 'Fire' && ascElement === 'Air') || (moonElement === 'Air' && ascElement === 'Fire')) {
    return 'dynamic combination of thought and action';
  }

  if ((moonElement === 'Earth' && ascElement === 'Water') || (moonElement === 'Water' && ascElement === 'Earth')) {
    return 'grounded emotional depth and practical sensitivity';
  }

  return `unique blend of ${moonElement} emotions and ${ascElement} physicality`;
}

function getDashaTheme(dasha: string): string {
  const themes: Record<string, string> = {
    Sun: 'self-expression, authority, and leadership',
    Moon: 'emotions, nurturing, and public connection',
    Mars: 'action, courage, and overcoming obstacles',
    Mercury: 'communication, learning, and business',
    Jupiter: 'wisdom, expansion, and spiritual growth',
    Venus: 'creativity, relationships, and material comforts',
    Saturn: 'discipline, responsibility, and long-term building',
    Rahu: 'unconventional paths and worldly desires',
    Ketu: 'spiritual liberation and detachment'
  };
  return themes[dasha] || 'transformation';
}

function getAntarDashaModifier(antar: string): string {
  const modifiers: Record<string, string> = {
    Sun: 'bringing leadership opportunities and visibility',
    Moon: 'adding emotional depth and public connection',
    Mars: 'injecting dynamic energy and courage',
    Mercury: 'enhancing communication and intellectual pursuits',
    Jupiter: 'expanding opportunities and wisdom',
    Venus: 'bringing harmony and creative expression',
    Saturn: 'requiring discipline but ensuring lasting results',
    Rahu: 'creating unexpected opportunities',
    Ketu: 'promoting spiritual insights'
  };
  return modifiers[antar] || 'modifying circumstances';
}

function getDashaDuration(dasha: string): string {
  const durations: Record<string, string> = {
    Sun: '(6-year period)',
    Moon: '(10-year period)',
    Mars: '(7-year period)',
    Mercury: '(17-year period)',
    Jupiter: '(16-year period)',
    Venus: '(20-year period)',
    Saturn: '(19-year period)',
    Rahu: '(18-year period)',
    Ketu: '(7-year period)'
  };
  return durations[dasha] || '';
}

function getDashaYearType(maha: string, antar: string): string {
  if (['Jupiter', 'Venus', 'Mercury'].includes(maha) && ['Jupiter', 'Venus', 'Mercury'].includes(antar)) {
    return 'highly favorable';
  }
  if (['Saturn', 'Rahu', 'Ketu'].includes(maha) && ['Saturn', 'Rahu', 'Ketu'].includes(antar)) {
    return 'challenging but transformative';
  }
  if (['Sun', 'Mars'].includes(maha) && ['Jupiter', 'Venus'].includes(antar)) {
    return 'dynamically growth-oriented';
  }
  return 'significant';
}

function getDashaCombinationEffect(maha: string, antar: string): string {
  return `this combination focuses on ${getDashaTheme(maha)}, ${getAntarDashaModifier(antar)}`;
}

function getHouseOrdinal(house: number): string {
  const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  return ordinals[house] || `${house}th`;
}

function getJupiterHouseEffect(house: number): string {
  const effects: Record<number, string> = {
    1: 'confidence, optimism, and personal growth',
    2: 'wealth, family harmony, and wise speech',
    3: 'courage, communication skills, and sibling support',
    4: 'domestic happiness, property gains, and emotional peace',
    5: 'creativity, romance, and children\'s progress',
    6: 'victory over obstacles, health improvement, and service success',
    7: 'partnership blessings and marriage opportunities',
    8: 'transformation and hidden wealth',
    9: 'spiritual growth, higher learning, and fortune',
    10: 'career excellence and public recognition',
    11: 'gains, fulfillment of desires, and social success',
    12: 'spiritual liberation and foreign opportunities'
  };
  return effects[house] || 'unique blessings';
}

function getJupiterAscendantEffect(house: number): string {
  const effects: Record<number, string> = {
    1: 'your personality, health, and overall well-being',
    2: 'your speech, wealth, and family matters',
    3: 'your skills, courage, and communication',
    4: 'your home, property, and mother',
    5: 'your creativity, romance, and children',
    6: 'your work environment, health, and competition',
    7: 'your partnerships, marriage, and business',
    8: 'your transformation and longevity',
    9: 'your dharma, fortune, and higher learning',
    10: 'your career, reputation, and public status',
    11: 'your gains, friendships, and aspirations',
    12: 'your spirituality, expenses, and foreign matters'
  };
  return effects[house] || 'various life areas';
}

function getSaturnHouseEffect(house: number): string {
  const effects: Record<number, string> = {
    1: 'teaches patience and self-discipline',
    2: 'requires financial discipline and careful speech',
    3: 'delays but strengthens communication and skills',
    4: 'brings property responsibilities and domestic duties',
    5: 'delays children or creative projects but ensures quality',
    6: 'helps systematically overcome diseases and enemies',
    7: 'brings serious partnerships and marriage responsibilities',
    8: 'creates transformation through challenges',
    9: 'makes dharma and wisdom serious pursuits',
    10: 'brings career maturity and authority',
    11: 'delays but ensures stable gains',
    12: 'creates spiritual opportunities through isolation'
  };
  return effects[house] || 'requiring discipline';
}

function getSaturnAscendantEffect(house: number): string {
  return getSaturnHouseEffect(house);
}

function getYearTheme(dasha: string, jupiter: number, saturn: number): string {
  if (jupiter <= 4 && ['Jupiter', 'Venus', 'Mercury'].includes(dasha)) {
    return 'expansion, growth, and abundance';
  }
  if (saturn === 12 || saturn === 9) {
    return 'spiritual evolution and inner transformation';
  }
  if (['Saturn', 'Rahu'].includes(dasha)) {
    return 'discipline, unconventional growth, and karmic lessons';
  }
  return 'balanced material and spiritual progress';
}

function getAscendantCareerStyle(ascendant: string): string {
  const styles: Record<string, string> = {
    Aries: 'natural leader who excels in pioneering roles',
    Taurus: 'reliable professional who builds lasting value',
    Gemini: 'versatile communicator who thrives in dynamic environments',
    Cancer: 'nurturing manager who creates supportive teams',
    Leo: 'charismatic leader who inspires and influences',
    Virgo: 'detail-oriented professional who ensures excellence',
    Libra: 'diplomatic negotiator who builds consensus',
    Scorpio: 'strategic thinker who transforms organizations',
    Sagittarius: 'visionary leader who expands possibilities',
    Capricorn: 'disciplined professional who achieves through persistence',
    Aquarius: 'innovative professional who brings fresh perspectives',
    Pisces: 'intuitive professional who adapts creatively'
  };
  return styles[ascendant] || 'skilled professional';
}

function getMahaDashaCareerImpact(dasha: string): string {
  const impacts: Record<string, string> = {
    Sun: 'brings leadership roles, authority, and government connections',
    Moon: 'favors public-facing roles, nurturing positions, and emotional work',
    Mars: 'supports technical fields, real estate, or action-oriented careers',
    Mercury: 'excels in business, communication, writing, or trading',
    Jupiter: 'brings teaching, advisory roles, and wisdom-based careers',
    Venus: 'favors creative fields, luxury sectors, and partnership businesses',
    Saturn: 'requires hard work but builds lasting career foundations',
    Rahu: 'brings unconventional careers, technology, or foreign opportunities',
    Ketu: 'favors behind-the-scenes work, research, or spiritual professions'
  };
  return impacts[dasha] || 'influences your career direction';
}

function getAntarDashaCareerModifier(antar: string): string {
  const modifiers: Record<string, string> = {
    Sun: 'increased visibility and leadership opportunities',
    Moon: 'emotional intelligence and public connection',
    Mars: 'dynamic action and competitive advantage',
    Mercury: 'enhanced communication and business acumen',
    Jupiter: 'wisdom-based growth and mentorship opportunities',
    Venus: 'creative projects and harmonious collaborations',
    Saturn: 'disciplined effort and long-term rewards',
    Rahu: 'unexpected opportunities and innovation',
    Ketu: 'spiritual dimension or technical mastery'
  };
  return modifiers[antar] || 'specific career energy';
}

function getJupiterCareerBenefit(house: number): string {
  const benefits: Record<number, string> = {
    1: 'personal recognition, confidence boost, and new opportunities',
    10: 'promotions, career advancement, and professional success',
    11: 'achievement of career goals, networking success, and financial gains'
  };
  return benefits[house] || 'professional benefits';
}

function getJupiterCareerActions(house: number): string {
  const actions: Record<number, string> = {
    1: 'personal branding, skill showcasing, and taking initiative',
    10: 'promotion discussions, leadership roles, and major projects',
    11: 'networking, collaborative ventures, and goal achievement'
  };
  return actions[house] || 'strategic career moves';
}

function getCareerRecommendations(maha: string, antar: string, jupiter: number, saturn: number): string {
  let rec = `Best approach: `;

  if (jupiter === 10 || jupiter === 11) {
    rec += `Take bold career initiatives in first half of year. `;
  }

  if (saturn === 10) {
    rec += `Work diligently without shortcuts. Recognition requires patience. `;
  }

  if (['Mercury', 'Venus', 'Jupiter'].includes(maha)) {
    rec += `Leverage communication, relationships, and wisdom for career growth. `;
  } else if (maha === 'Saturn') {
    rec += `Focus on building expertise through consistent effort. `;
  }

  return rec;
}

function getDashaWealthNature(dasha: string): string {
  const natures: Record<string, string> = {
    Sun: 'brings authority-based income and government benefits',
    Moon: 'supports income through public work and nurturing services',
    Mars: 'favors real estate, property, and action-oriented earnings',
    Mercury: 'excels in trading, business, and intellectual income',
    Jupiter: 'expands wealth through wisdom, teaching, and ethical work',
    Venus: 'brings luxury, arts, and relationship-based income',
    Saturn: 'requires hard work but builds lasting wealth',
    Rahu: 'creates sudden gains through unconventional means',
    Ketu: 'brings technical or spiritual income, often minimal material focus'
  };
  return natures[dasha] || 'influences your wealth patterns';
}

function getAntarDashaWealthModifier(antar: string): string {
  const modifiers: Record<string, string> = {
    Sun: 'adds government or authority-based income',
    Moon: 'brings family support or public earnings',
    Mars: 'creates property or action-based gains',
    Mercury: 'enhances business and trading profits',
    Jupiter: 'expands income sources ethically',
    Venus: 'adds luxury or creative income',
    Saturn: 'delays but stabilizes earnings',
    Rahu: 'brings sudden unexpected gains',
    Ketu: 'reduces material focus, spiritual gains'
  };
  return modifiers[antar] || 'modifies wealth flow';
}

function getFinanceRecommendations(dasha: string, jupiter: number, saturn: number): string {
  let rec = `Financial advice: `;

  if (jupiter === 2 || jupiter === 11) {
    rec += `Excellent time for investments, savings, and income growth. `;
  } else if (jupiter === 12) {
    rec += `Control expenses, especially on foreign matters or spirituality. `;
  }

  if (saturn === 12) {
    rec += `Build emergency fund. Expenses on health or travel likely. `;
  } else if (saturn === 2) {
    rec += `Practice financial discipline. Delayed but stable income. `;
  }

  if (['Venus', 'Jupiter', 'Mercury'].includes(dasha)) {
    rec += `Favorable for wealth accumulation through ethical means. `;
  }

  return rec;
}

function getMoonSignEmotionalStyle(moonSign: string): string {
  const styles: Record<string, string> = {
    Aries: 'passionate and direct emotional expression',
    Taurus: 'stable and sensual emotional needs',
    Gemini: 'intellectually connected and varied feelings',
    Cancer: 'deeply nurturing and protective emotions',
    Leo: 'warm and expressive romantic nature',
    Virgo: 'thoughtful and service-oriented love',
    Libra: 'harmonious and partnership-focused emotions',
    Scorpio: 'intense and transformative emotional bonds',
    Sagittarius: 'optimistic and freedom-loving feelings',
    Capricorn: 'serious and committed emotional approach',
    Aquarius: 'friendly and independent emotional style',
    Pisces: 'compassionate and spiritually connected feelings'
  };
  return styles[moonSign] || 'unique emotional expression';
}

function getAscendantRelationshipStyle(ascendant: string): string {
  const styles: Record<string, string> = {
    Aries: 'you approach relationships with directness and passion',
    Taurus: 'you seek stability and loyalty in partnerships',
    Gemini: 'you need intellectual connection and variety',
    Cancer: 'you create nurturing and protective relationships',
    Leo: 'you bring warmth and generosity to partnerships',
    Virgo: 'you serve and care for partners practically',
    Libra: 'you naturally create balanced and harmonious bonds',
    Scorpio: 'you form deep and transformative connections',
    Sagittarius: 'you seek adventure and philosophy in relationships',
    Capricorn: 'you build committed and responsible partnerships',
    Aquarius: 'you value friendship and independence in love',
    Pisces: 'you create compassionate and dreamy connections'
  };
  return styles[ascendant] || 'distinctive relationship approach';
}

function getAntarDashaRelationshipEffect(antar: string): string {
  const effects: Record<string, string> = {
    Sun: 'brings confidence in relationships',
    Moon: 'enhances emotional connections deeply',
    Mars: 'adds passion but requires managing anger',
    Mercury: 'improves communication and understanding',
    Jupiter: 'brings wisdom and serious commitments',
    Venus: 'creates romance, beauty, and harmony',
    Saturn: 'makes relationships serious and long-term',
    Rahu: 'brings unconventional or sudden connections',
    Ketu: 'creates spiritual bonds or detachment'
  };
  return effects[antar] || 'influences relationship dynamics';
}

function getAscendantHealthAreas(ascendant: string): string {
  const areas: Record<string, string> = {
    Aries: 'focus on head, brain, eyes, and managing stress-related issues',
    Taurus: 'attention to throat, neck, thyroid, and maintaining healthy weight',
    Gemini: 'care for lungs, arms, nervous system, and respiratory health',
    Cancer: 'focus on chest, stomach, and emotional eating patterns',
    Leo: 'attention to heart, spine, and maintaining cardiovascular health',
    Virgo: 'care for digestive system, intestines, and detail to diet',
    Libra: 'focus on kidneys, lower back, and hormonal balance',
    Scorpio: 'attention to reproductive organs, elimination, and deep-seated issues',
    Sagittarius: 'care for hips, thighs, liver, and avoiding excess',
    Capricorn: 'focus on bones, joints, knees, and long-term health building',
    Aquarius: 'attention to circulation, ankles, and nervous system',
    Pisces: 'care for feet, lymphatic system, and avoiding escapism'
  };
  return areas[ascendant] || 'overall health maintenance';
}

function getMoonSignHealthTendencies(moonSign: string): string {
  const tendencies: Record<string, string> = {
    Aries: 'tendency toward stress, headaches, and impulsive actions causing injury',
    Taurus: 'watch for overindulgence and throat-related issues',
    Gemini: 'mental stress affecting nervous system and sleep',
    Cancer: 'emotional eating and digestive issues',
    Leo: 'stress affecting heart; need for ego management',
    Virgo: 'anxiety and worry affecting digestion',
    Libra: 'indecision creating stress; need for balance',
    Scorpio: 'suppressed emotions manifesting physically',
    Sagittarius: 'over-optimism leading to accidents or excess',
    Capricorn: 'depression risk; need for emotional expression',
    Aquarius: 'detachment causing circulation issues',
    Pisces: 'escapism through substances; need for grounding'
  };
  return tendencies[moonSign] || 'mind-body connection awareness';
}

function getDashaSpiritualFocus(dasha: string): string {
  const focus: Record<string, string> = {
    Sun: 'Focus on self-realization, Atma Jnana, and solar practices like Surya Namaskar',
    Moon: 'Emphasize devotion, Bhakti, and connecting with Divine Mother',
    Mars: 'Practice Karma Yoga, selfless action, and Hanuman worship',
    Mercury: 'Study scriptures, Jnana Yoga, and develop discrimination (Viveka)',
    Jupiter: 'Engage in Guru seva, teaching, and expanding spiritual wisdom',
    Venus: 'Explore Bhakti through arts, beauty, and devotional music',
    Saturn: 'Practice discipline, Tapasya, and serve the poor and elderly',
    Rahu: 'Explore unconventional paths, foreign teachings, and break limitations',
    Ketu: 'Focus on Moksha, meditation, and liberation from material attachments'
  };
  return focus[dasha] || 'Spiritual growth through self-inquiry';
}

function getMoonSignSpiritualPractice(moonSign: string): string {
  const practices: Record<string, string> = {
    Aries: 'Dynamic practices like Kundalini Yoga and Mars mantras suit your energetic nature.',
    Taurus: 'Grounding practices like nature walks, gardening, and Lakshmi worship align with you.',
    Gemini: 'Study of multiple spiritual traditions and pranayama practices benefit you.',
    Cancer: 'Moon worship, water rituals, and devotion to Divine Mother resonate with you.',
    Leo: 'Sun worship, heart-centered meditation, and service to dharma suit you.',
    Virgo: 'Ayurveda, Yoga, and serving healers or teachers align with your nature.',
    Libra: 'Balance practices, partner meditation, and Venusian devotional arts suit you.',
    Scorpio: 'Deep meditation, tantric practices, and transformation through surrender benefit you.',
    Sagittarius: 'Pilgrimage, studying with Gurus, and philosophical inquiry resonate with you.',
    Capricorn: 'Disciplined daily practice, traditional rituals, and mountain retreats suit you.',
    Aquarius: 'Group meditation, humanitarian service, and Aquarian Age practices align with you.',
    Pisces: 'Bhakti, devotional music, seva at holy places, and surrender to Divine suit you.'
  };
  return practices[moonSign] || 'Find practices that resonate with your soul.';
}

function identifyLuckyPeriods(
  jupMoon1: number,
  jupMoon2: number,
  jupAsc1: number,
  jupAsc2: number,
  maha: string,
  antar: string
): string[] {
  const periods: string[] = [];

  if (jupMoon1 <= 4 || jupMoon1 >= 10) {
    periods.push(`January-May: Jupiter in favorable ${jupMoon1}th house from Moon`);
  }

  if (jupAsc1 === 10 || jupAsc1 === 11 || jupAsc1 === 1) {
    periods.push(`January-May: Career peak with Jupiter in ${jupAsc1}th from Ascendant`);
  }

  if (jupMoon2 <= 4 || jupMoon2 >= 10) {
    periods.push(`June-December: Jupiter shifts to beneficial ${jupMoon2}th house`);
  }

  if (['Jupiter', 'Venus', 'Mercury'].includes(maha) && ['Jupiter', 'Venus', 'Mercury'].includes(antar)) {
    periods.push(`Entire year: Favorable Dasha-Antar Dasha combination`);
  }

  return periods.length > 0 ? periods : ['Second half shows gradual improvement'];
}

function identifyMainChallenges(
  satMoon: number,
  satAsc: number,
  rahuMoon: number,
  rahuAsc: number,
  maha: string
): string[] {
  const challenges: string[] = [];

  if (satMoon === 12 || satAsc === 12) {
    challenges.push('Increased expenses or foreign-related matters requiring attention');
  }

  if (satMoon === 1 || satAsc === 1) {
    challenges.push('Physical health and self-care require extra discipline');
  }

  if (rahuMoon === 12 || rahuAsc === 12) {
    challenges.push('Sleep disturbances, expenses, or spiritual confusion possible');
  }

  if (rahuMoon === 6 || rahuAsc === 6) {
    challenges.push('Work-related stress or competition intensifies');
  }

  if (maha === 'Saturn' || maha === 'Rahu' || maha === 'Ketu') {
    challenges.push(`${maha} Dasha requires patience and spiritual approach to obstacles`);
  }

  return challenges.length > 0 ? challenges : ['Minor challenges easily overcome with discipline'];
}

function generatePersonalizedRemedies(
  moonSign: string,
  ascendant: string,
  maha: string,
  satMoon: number,
  rahuMoon: number
): string[] {
  const remedies: string[] = [];

  // Dasha-specific remedies
  const dashaRemedies: Record<string, string> = {
    Sun: 'Offer water to Sun every morning, chant Aditya Hridayam',
    Moon: 'Wear pearl, offer milk to Moon on Mondays',
    Mars: 'Hanuman Chalisa on Tuesdays, donate red items',
    Mercury: 'Feed green vegetables to cows on Wednesdays',
    Jupiter: 'Yellow Sapphire after consultation, Guru mantra on Thursdays',
    Venus: 'White clothes on Fridays, serve young girls',
    Saturn: 'Feed crows on Saturdays, donate iron or black items',
    Rahu: 'Blue Sapphire only after expert consultation, Rahu mantra',
    Ketu: 'Donate blankets, practice meditation daily'
  };
  remedies.push(dashaRemedies[maha] || 'Daily spiritual practice');

  // Saturn-specific remedies
  if (satMoon === 12) {
    remedies.push('Serve the poor on Saturdays, visit hospitals or ashrams');
  } else if (satMoon === 1) {
    remedies.push('Regular oil massage, respect elders, practice patience');
  }

  // Rahu-specific remedies
  if (rahuMoon === 12) {
    remedies.push('Donate to foreign charities, practice meditation before sleep');
  }

  // Moon sign remedies
  remedies.push(`For ${moonSign} Moon: ${getMoonSignRemedy(moonSign)}`);

  return remedies;
}

function getMoonSignRemedy(moonSign: string): string {
  const remedies: Record<string, string> = {
    Aries: 'Control anger through Hanuman worship',
    Taurus: 'Practice gratitude, avoid hoarding',
    Gemini: 'Practice focused meditation to calm mind',
    Cancer: 'Moon worship, release emotional baggage',
    Leo: 'Practice humility, serve without expectation',
    Virgo: 'Accept imperfection, practice self-compassion',
    Libra: 'Make decisions, avoid people-pleasing',
    Scorpio: 'Practice forgiveness and letting go',
    Sagittarius: 'Ground your energy, complete what you start',
    Capricorn: 'Balance work with emotional expression',
    Aquarius: 'Connect with feelings, avoid detachment',
    Pisces: 'Set boundaries, stay grounded in reality'
  };
  return remedies[moonSign] || 'Follow your dharma';
}

function buildCareerQuarters(
  mahaDasha: string,
  antarDasha: string,
  jupiterFromAsc1: number,
  jupiterFromAsc2: number,
  saturnFromAsc: number,
  year: number
): string[] {
  const quarters: string[] = [];

  const q1Jupiter = jupiterFromAsc1 === 10 || jupiterFromAsc1 === 11 || jupiterFromAsc1 === 1;
  const q1Theme = q1Jupiter ? 'expansion and opportunities' : 'building foundations';
  const q1DashaEffect = getQuarterDashaEffect(mahaDasha, antarDasha, 1);
  quarters.push(`Q1 (Jan-Mar ${year}): Focus on ${q1Theme}. Jupiter in ${getHouseOrdinal(jupiterFromAsc1)} from Ascendant ${getJupiterQuarterCareerEffect(jupiterFromAsc1)}. ${q1DashaEffect} Best actions: ${getQuarterCareerActions(jupiterFromAsc1, saturnFromAsc, mahaDasha, 1)}.`);

  const q2Theme = q1Jupiter ? 'capitalizing on momentum before Jupiter shifts' : 'strategic positioning for upcoming changes';
  const q2Transition = jupiterFromAsc2 === 10 || jupiterFromAsc2 === 11 ? 'career boost continues post-May' : 'consolidate gains before May transition';
  quarters.push(`Q2 (Apr-Jun ${year}): ${q2Theme}. Jupiter changes signs in May - ${q2Transition}. ${getQuarterDashaEffect(mahaDasha, antarDasha, 2)} Key timing: April for negotiations, May for transitions, June for new initiatives under Jupiter in ${getHouseOrdinal(jupiterFromAsc2)}.`);

  const q3Jupiter = jupiterFromAsc2 === 10 || jupiterFromAsc2 === 11 || jupiterFromAsc2 === 1;
  const saturnEffect = getSaturnQuarterEffect(saturnFromAsc, 3);
  const q3Actions = q3Jupiter ? 'Push for promotions, lead major projects, expand responsibilities' : 'Build skills, strengthen networks, prepare for future opportunities';
  quarters.push(`Q3 (Jul-Sep ${year}): ${q3Jupiter ? 'Strong period for advancement' : 'Consolidation and skill-building phase'}. Jupiter in ${getHouseOrdinal(jupiterFromAsc2)} ${getJupiterQuarterCareerEffect(jupiterFromAsc2)}. ${saturnEffect} Actions: ${q3Actions}.`);

  const q4Theme = ['Jupiter', 'Venus', 'Mercury'].includes(mahaDasha) ? 'harvest achievements and plan expansion' : 'reflect on progress and set ambitious goals';
  const q4Opportunities = getQ4CareerOpportunities(mahaDasha, antarDasha, jupiterFromAsc2, saturnFromAsc);
  quarters.push(`Q4 (Oct-Dec ${year}): Time to ${q4Theme}. ${getQuarterDashaEffect(mahaDasha, antarDasha, 4)} ${q4Opportunities} Year-end focus: performance reviews, bonus negotiations, and ${year + 1} career planning.`);

  return quarters;
}

function getJupiterQuarterCareerEffect(jupiterHouse: number): string {
  const effects: Record<number, string> = {
    1: 'boosts personal confidence and leadership visibility',
    2: 'increases earning potential and value recognition',
    3: 'enhances communication and skill presentation',
    4: 'supports work-from-home and real estate career paths',
    5: 'favors creative roles and speculative projects',
    6: 'helps overcome workplace competition and obstacles',
    7: 'excellent for partnerships, clients, and contracts',
    8: 'supports research, transformation, and joint ventures',
    9: 'favors international work, publishing, and higher positions',
    10: 'peak career house - promotions, recognition, authority',
    11: 'networking success and achieving professional goals',
    12: 'behind-the-scenes work, foreign assignments, or career transitions'
  };
  return effects[jupiterHouse] || 'influences professional direction';
}

function getQuarterDashaEffect(maha: string, antar: string, quarter: number): string {
  const mahaEnergy = getDashaCareerEnergy(maha);
  const antarModifier = getAntarCareerModifier(antar);
  const quarterTiming = ['initiating new projects', 'building momentum', 'achieving results', 'consolidating gains'][quarter - 1];
  return `${maha}-${antar} Dasha energy supports ${mahaEnergy}, with ${antarModifier}. Q${quarter} timing: ${quarterTiming}.`;
}

function getDashaCareerEnergy(dasha: string): string {
  const energies: Record<string, string> = {
    Sun: 'authority-building and leadership roles',
    Moon: 'public-facing work and emotional intelligence',
    Mars: 'competitive drives and action-oriented projects',
    Mercury: 'communication, negotiation, and intellectual work',
    Jupiter: 'expansion, mentoring, and wisdom-based advancement',
    Venus: 'creative projects and harmonious collaborations',
    Saturn: 'structured growth and long-term career building',
    Rahu: 'unconventional opportunities and rapid growth',
    Ketu: 'specialized expertise and behind-the-scenes influence'
  };
  return energies[dasha] || 'career development';
}

function getAntarCareerModifier(antar: string): string {
  const modifiers: Record<string, string> = {
    Sun: 'heightened visibility and recognition potential',
    Moon: 'improved emotional attunement to workplace dynamics',
    Mars: 'increased drive and competitive advantage',
    Mercury: 'enhanced networking and communication success',
    Jupiter: 'expanded opportunities through mentors and wisdom',
    Venus: 'improved workplace relationships and creative output',
    Saturn: 'disciplined effort yielding sustainable results',
    Rahu: 'unexpected opportunities requiring quick decisions',
    Ketu: 'intuitive insights and technical breakthroughs'
  };
  return modifiers[antar] || 'modified career energy';
}

function getQuarterCareerActions(jupiter: number, saturn: number, dasha: string, quarter: number): string {
  const actions: string[] = [];
  if (jupiter === 10 || jupiter === 11 || jupiter === 1) {
    actions.push('pursue promotions', 'take leadership roles');
  } else if (jupiter === 7) {
    actions.push('build client relationships', 'negotiate contracts');
  } else {
    actions.push('develop skills', 'strengthen foundations');
  }
  if (saturn === 10) {
    actions.push('demonstrate consistent performance');
  }
  if (['Mercury', 'Venus'].includes(dasha)) {
    actions.push('expand professional network');
  }
  return actions.slice(0, 3).join(', ');
}

function getSaturnQuarterEffect(saturnHouse: number, quarter: number): string {
  const effects: Record<number, string> = {
    1: 'Saturn demands personal discipline and self-improvement.',
    6: 'Saturn helps systematically overcome workplace challenges.',
    10: 'Saturn in career house requires hard work but rewards persistence.',
    11: 'Saturn supports achieving goals through patient networking.',
    12: 'Saturn may create behind-the-scenes pressures or transition feelings.'
  };
  return effects[saturnHouse] || 'Saturn encourages steady professional growth.';
}

function getQ4CareerOpportunities(maha: string, antar: string, jupiter: number, saturn: number): string {
  const opportunities: string[] = [];
  if (['Jupiter', 'Venus', 'Mercury'].includes(maha)) {
    opportunities.push('favorable for year-end bonuses and recognition');
  }
  if (jupiter === 10 || jupiter === 11) {
    opportunities.push('strong finish with achievement visibility');
  }
  if (saturn === 10) {
    opportunities.push('hard work throughout year pays off now');
  }
  if (['Sun', 'Mars'].includes(antar)) {
    opportunities.push('leadership opportunities emerge');
  }
  return opportunities.length > 0 ? opportunities.join('; ') + '.' : 'Focus on completing pending projects and planning ahead.';
}

function buildFinanceBreakdown(
  moonSign: string,
  mahaDasha: string,
  jupiterFromMoon1: number,
  jupiterFromMoon2: number,
  saturnFromMoon: number,
  year: number
): { income: string; expenses: string; investments: string; savings: string } {
  const moonElement = getElement(moonSign);
  const incomeBase = getDashaWealthNature(mahaDasha);
  let income = incomeBase;

  if (jupiterFromMoon1 === 2 || jupiterFromMoon1 === 11) {
    income += ` First half of ${year} (January-May) particularly strong for income growth, bonuses, and salary negotiations.`;
    if (jupiterFromMoon1 === 2) {
      income += ' Jupiter in 2nd house directly aspects wealth - excellent for family finances and accumulated savings.';
    } else {
      income += ' Jupiter in 11th brings gains from multiple sources, elder siblings, and professional networks.';
    }
  } else if (jupiterFromMoon2 === 2 || jupiterFromMoon2 === 11) {
    income += ` Second half of ${year} (June-December) shows improved income prospects after Jupiter shifts.`;
    if (jupiterFromMoon2 === 2) {
      income += ' Post-May: Wealth accumulation accelerates, family financial support possible.';
    } else {
      income += ' Post-May: Network-based income and goal achievement bring financial rewards.';
    }
  } else {
    income += ` Income flow moderate in ${year}. Focus on value delivery and skill enhancement for future growth.`;
  }
  income += ` ${moonSign} Moon's ${moonElement} nature influences your financial instincts - ${getMoonSignFinancialStyle(moonSign)}.`;

  let expenses = '';
  if (saturnFromMoon === 12) {
    expenses = `Saturn in 12th from Moon increases expenses throughout ${year}. Primary areas: health treatments, foreign travel, spiritual pursuits, or hidden matters. Budget 15-20% more than usual. Track all spending meticulously.`;
  } else if (saturnFromMoon === 6) {
    expenses = `Saturn in 6th indicates expenses on health matters, legal disputes, or employee/service provider issues. Insurance coverage essential. Medical checkups can catch issues early and save costs.`;
  } else if (saturnFromMoon === 8) {
    expenses = `Saturn in 8th warns of unexpected expenses - medical emergencies, vehicle repairs, or joint financial matters. Maintain 6-month emergency fund. Avoid large debts and risky financial commitments.`;
  } else if (saturnFromMoon === 4) {
    expenses = `Saturn in 4th may bring property-related expenses, home repairs, or vehicle maintenance. Mother's health may require attention. Budget for home improvements.`;
  } else {
    expenses = `Normal expense patterns expected in ${year}. Focus on eliminating unnecessary subscriptions, optimizing recurring costs, and building efficient spending habits.`;
  }
  expenses += ` ${moonElement} Moon element suggests ${getElementExpensePattern(moonElement)}.`;

  let investments = '';
  if (['Jupiter', 'Venus', 'Mercury'].includes(mahaDasha)) {
    investments = `${mahaDasha} Dasha strongly favors investments in ${year}. `;
    if (mahaDasha === 'Jupiter') {
      investments += 'Ethical investments, education funds, gold, and wisdom-based assets excel. Consider charitable giving for karmic returns.';
    } else if (mahaDasha === 'Venus') {
      investments += 'Real estate, luxury goods, arts, beauty industry stocks, and comfort-enhancing assets favored. Quality over quantity.';
    } else {
      investments += 'Diversified portfolios, mutual funds, business investments, and intellectual property bring returns. Active portfolio management beneficial.';
    }
  } else if (mahaDasha === 'Saturn') {
    investments = `Saturn Dasha requires conservative, long-term investment strategy. Fixed deposits, government bonds, blue-chip stocks, and real estate provide security. Avoid get-rich-quick schemes.`;
  } else if (mahaDasha === 'Rahu') {
    investments = `Rahu Dasha attracts you to technology stocks, cryptocurrency, foreign investments, and unconventional assets. Research thoroughly, start small, and diversify risk.`;
  } else if (mahaDasha === 'Mars') {
    investments = `Mars Dasha favors real estate, land, machinery, and action-oriented sectors like defense, engineering, or sports. Property investments especially indicated.`;
  } else if (mahaDasha === 'Ketu') {
    investments = `Ketu Dasha reduces material focus. Minimal, spiritual, or charitable investments suit this period. Technology backend and research sectors may appeal.`;
  } else {
    investments = `Balanced investment approach recommended for ${mahaDasha} Dasha. Mix of growth and value investments, diversified across sectors and asset classes.`;
  }
  if (jupiterFromMoon1 === 5 || jupiterFromMoon2 === 5) {
    investments += ` Jupiter in 5th house favors speculative investments, but maintain discipline - gains possible through calculated risks, not gambling.`;
  }
  investments += ` Best investment months: ${getOptimalInvestmentMonths(jupiterFromMoon1, jupiterFromMoon2, saturnFromMoon, year)}.`;

  let savings = '';
  if (saturnFromMoon === 2) {
    savings = `Saturn in 2nd house from Moon demands strict financial discipline. Income may feel restricted but this period builds lasting wealth. Automate savings of 25-30% before any spending. Delayed gratification creates future abundance.`;
  } else if (jupiterFromMoon1 === 2 || jupiterFromMoon2 === 2) {
    savings = `Jupiter in 2nd house creates excellent savings potential. Increase savings rate to 30-40% if possible. Open new savings accounts, fixed deposits, or recurring deposit schemes during favorable Jupiter periods.`;
  } else if (saturnFromMoon === 11) {
    savings = `Saturn in 11th delays but ultimately stabilizes gains. Long-term savings plans and retirement funds benefit. Patience in savings strategy pays off significantly.`;
  } else {
    savings = `Maintain consistent savings habits of 20-30% of income. ${getElementSavingsAdvice(moonElement)} Build emergency fund covering 6 months of expenses.`;
  }
  savings += ` Specific savings goal for ${year}: ${getSavingsGoal(mahaDasha, jupiterFromMoon1, jupiterFromMoon2, saturnFromMoon)}.`;

  return { income, expenses, investments, savings };
}

function getMoonSignFinancialStyle(moonSign: string): string {
  const styles: Record<string, string> = {
    Aries: 'impulsive spending tendencies - pause before major purchases',
    Taurus: 'natural financial stability and love of quality possessions',
    Gemini: 'variable spending patterns - multiple income streams appeal',
    Cancer: 'emotional connection to money and security focus',
    Leo: 'generous spending nature - budget for gifts and entertainment',
    Virgo: 'analytical approach to finances - excellent at budgeting',
    Libra: 'balance between saving and spending on aesthetics',
    Scorpio: 'strategic financial planning and wealth accumulation instinct',
    Sagittarius: 'optimistic about money but watch overspending on travel',
    Capricorn: 'disciplined saver with long-term wealth building focus',
    Aquarius: 'unconventional financial approaches may appeal',
    Pisces: 'generous nature - set firm boundaries on lending money'
  };
  return styles[moonSign] || 'balanced financial approach';
}

function getElementExpensePattern(element: string): string {
  const patterns: Record<string, string> = {
    Fire: 'impulsive purchases - implement 24-hour rule for major expenses',
    Earth: 'practical spending focused on quality and durability',
    Air: 'social and communication-related expenses - budget for networking',
    Water: 'emotional spending patterns - avoid shopping when stressed'
  };
  return patterns[element] || 'balanced spending approach';
}

function getElementSavingsAdvice(element: string): string {
  const advice: Record<string, string> = {
    Fire: 'Automate savings to avoid impulsive spending of surplus.',
    Earth: 'Your natural prudence supports savings - increase rate gradually.',
    Air: 'Set specific savings goals to focus your variable financial energy.',
    Water: 'Create emotional rewards for savings milestones achieved.'
  };
  return advice[element] || 'Regular, consistent savings build security.';
}

function getOptimalInvestmentMonths(jup1: number, jup2: number, sat: number, year: number): string {
  const months: string[] = [];
  if ([2, 5, 9, 11].includes(jup1)) {
    months.push('January-April');
  }
  months.push('May (Akshaya Tritiya)');
  if ([2, 5, 9, 11].includes(jup2)) {
    months.push('June-November');
  }
  months.push('October-November (Diwali period)');
  if (sat !== 8 && sat !== 12) {
    months.push('December (year-end tax planning)');
  }
  return months.join(', ');
}

function getSavingsGoal(dasha: string, jup1: number, jup2: number, sat: number): string {
  if (sat === 12 || sat === 8) {
    return 'Build 6-month emergency fund as priority';
  }
  if (jup1 === 2 || jup2 === 2) {
    return 'Maximize savings during Jupiter in 2nd - aim for 35% savings rate';
  }
  if (['Saturn', 'Ketu'].includes(dasha)) {
    return 'Focus on debt reduction and stable, conservative savings growth';
  }
  if (['Jupiter', 'Venus'].includes(dasha)) {
    return 'Expand investment portfolio while maintaining solid emergency reserves';
  }
  return 'Steady accumulation with focus on diversified savings instruments';
}

function buildRelationshipAreas(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  antarDasha: string,
  jupiterFromMoon: number,
  rahuFromMoon: number,
  year: number
): { romance: string; marriage: string; family: string; friendships: string } {
  const moonElement = getElement(moonSign);
  const ascElement = getElement(ascendant);
  const ascRelationStyle = getAscendantRelationshipApproach(ascendant);

  let romance = `${year} romantic outlook: Your ${moonSign} Moon gives you ${getMoonSignLoveStyle(moonSign)}, `;
  romance += `while ${ascendant} Ascendant means ${ascRelationStyle}. `;

  if (['Venus', 'Moon'].includes(mahaDasha) || ['Venus', 'Moon'].includes(antarDasha)) {
    romance += `${mahaDasha}-${antarDasha} Dasha combination highly favors romance - your emotional appeal and attractiveness are enhanced. `;
    romance += `Best periods for dating: ${getRomanticPeakMonths(mahaDasha, antarDasha, jupiterFromMoon, year)}. `;
  } else if (mahaDasha === 'Saturn' || mahaDasha === 'Ketu') {
    romance += `${mahaDasha} Dasha shifts focus toward meaningful connections over casual dating. Quality trumps quantity. `;
    romance += 'Relationships that begin now tend to be karmic and purposeful. ';
  } else {
    romance += `${mahaDasha}-${antarDasha} brings balanced romantic energy. Be open to connections that align with your values and life direction. `;
  }

  if (jupiterFromMoon === 5) {
    romance += `Jupiter in 5th house throughout first half of ${year} greatly enhances romantic opportunities, creative expression of love, and fertility matters. `;
  }
  if (rahuFromMoon === 5) {
    romance += 'Rahu in 5th may bring intense, unconventional attractions. Ensure clarity and take time before major commitments. ';
  }
  romance += `Compatible elements for ${moonElement} Moon: ${getCompatibleElements(moonElement)}.`;

  let marriage = `Marriage and committed partnerships in ${year}: `;
  if (jupiterFromMoon === 7) {
    marriage += `Excellent year for marriage! Jupiter transiting 7th house from Moon brings serious proposals, improved marital harmony, or meeting your life partner. `;
    marriage += `Best marriage muhurtas: January-May when Jupiter is in favorable position. Consult pandit for specific dates. `;
  } else if (rahuFromMoon === 7) {
    marriage += 'Rahu in 7th creates intensity and transformation in marriage. Avoid impulsive decisions or rushed commitments. ';
    marriage += 'Existing marriages need extra patience, understanding, and conscious communication. Foreign spouse or unconventional relationships indicated. ';
  } else if (['Venus', 'Jupiter'].includes(mahaDasha)) {
    marriage += `${mahaDasha} Dasha supports married life and partnership harmony. Focus on deepening your bond through shared experiences, travel, and quality time. `;
  } else {
    marriage += 'Steady period for marriage. Strengthen relationship through communication, mutual respect, and practical support. ';
  }

  marriage += `${ascendant} Ascendant in marriage: ${getAscendantMarriageStyle(ascendant)}. `;
  marriage += `${moonSign} Moon emotional needs: ${getMoonSignPartnerNeeds(moonSign)}.`;

  let family = `Family dynamics in ${year}: `;
  if (moonElement === 'Water') {
    family += `Your ${moonSign} Water Moon creates strong emotional bonds with family. Your nurturing nature supports family harmony and you intuitively sense family members\' needs. `;
  } else if (moonElement === 'Earth') {
    family += `Your ${moonSign} Earth Moon provides practical, reliable support for family. Focus on creating stability and material security for loved ones. `;
  } else if (moonElement === 'Fire') {
    family += `Your ${moonSign} Fire Moon brings dynamic energy to family interactions. Channel this into positive activities, celebrations, and motivating family members. `;
  } else {
    family += `Your ${moonSign} Air Moon connects with family through ideas and communication. Share knowledge, have meaningful discussions, and stay mentally connected. `;
  }

  if (jupiterFromMoon === 4) {
    family += `Jupiter in 4th house brings domestic happiness, mother\'s blessings, property luck, and family celebrations in ${year}. `;
  }
  if (rahuFromMoon === 4) {
    family += 'Rahu in 4th may create some domestic restlessness or changes in living situation. Maintain peace at home consciously. ';
  }

  family += `${ascElement} Ascendant element adds ${getAscendantFamilyContribution(ascElement)} to family life. `;
  family += `Key family focus for ${mahaDasha} Dasha: ${getDashaFamilyFocus(mahaDasha)}.`;

  let friendships = `Social connections and friendships in ${year}: `;
  if (jupiterFromMoon === 11) {
    friendships += `Excellent year for friendships and social expansion! Jupiter in 11th house brings beneficial new connections, supportive friend circles, and fulfillment of social aspirations. `;
    friendships += 'Network actively - friends made now bring long-term benefits. ';
  } else if (antarDasha === 'Mercury' || antarDasha === 'Venus') {
    friendships += `${antarDasha} Antar Dasha enhances social life - networking, collaborative friendships, and social events bring opportunities and joy. `;
  } else if (mahaDasha === 'Saturn') {
    friendships += 'Saturn Dasha favors fewer but more reliable friendships. Quality over quantity. Older or mature friends provide wisdom. ';
  } else {
    friendships += 'Focus on nurturing quality friendships that support your growth and well-being rather than expanding circles superficially. ';
  }

  friendships += `${moonSign} Moon social style: ${getMoonSignSocialStyle(moonSign)}. `;
  friendships += `Best social periods: ${getSocialPeakMonths(jupiterFromMoon, antarDasha, year)}.`;

  return { romance, marriage, family, friendships };
}

function getMoonSignLoveStyle(moonSign: string): string {
  const styles: Record<string, string> = {
    Aries: 'passionate, direct, and excitement-seeking love nature',
    Taurus: 'sensual, loyal, and security-oriented romantic approach',
    Gemini: 'intellectually curious and communicative in love',
    Cancer: 'deeply nurturing, protective, and emotionally bonded',
    Leo: 'warm, generous, and dramatically expressive in romance',
    Virgo: 'thoughtful, service-oriented, and detail-attentive love',
    Libra: 'harmonious, partnership-focused, and romantically idealistic',
    Scorpio: 'intensely passionate, deeply loyal, and transformative',
    Sagittarius: 'adventurous, freedom-loving, and optimistic in love',
    Capricorn: 'serious, committed, and long-term focused',
    Aquarius: 'unique, friendship-based, and intellectually connected',
    Pisces: 'dreamy, compassionate, and spiritually bonded'
  };
  return styles[moonSign] || 'unique romantic expression';
}

function getAscendantRelationshipApproach(ascendant: string): string {
  const approaches: Record<string, string> = {
    Aries: 'you pursue relationships with directness and initiative',
    Taurus: 'you build relationships slowly but with lasting commitment',
    Gemini: 'you attract through wit, communication, and versatility',
    Cancer: 'you create nurturing, home-centered relationships',
    Leo: 'you attract attention and express love generously',
    Virgo: 'you show love through practical care and service',
    Libra: 'you naturally create balanced, harmonious partnerships',
    Scorpio: 'you form deep, transformative emotional bonds',
    Sagittarius: 'you seek adventure and philosophical connection',
    Capricorn: 'you build structured, responsible partnerships',
    Aquarius: 'you value friendship and independence in relationships',
    Pisces: 'you create compassionate, spiritually-connected bonds'
  };
  return approaches[ascendant] || 'you have a distinctive relationship style';
}

function getCompatibleElements(element: string): string {
  const compatible: Record<string, string> = {
    Fire: 'Fire signs (Aries, Leo, Sagittarius) and Air signs (Gemini, Libra, Aquarius)',
    Earth: 'Earth signs (Taurus, Virgo, Capricorn) and Water signs (Cancer, Scorpio, Pisces)',
    Air: 'Air signs (Gemini, Libra, Aquarius) and Fire signs (Aries, Leo, Sagittarius)',
    Water: 'Water signs (Cancer, Scorpio, Pisces) and Earth signs (Taurus, Virgo, Capricorn)'
  };
  return compatible[element] || 'all elements with understanding';
}

function getRomanticPeakMonths(maha: string, antar: string, jupiter: number, year: number): string {
  const peaks: string[] = [];
  if (['Venus', 'Moon'].includes(maha) || ['Venus', 'Moon'].includes(antar)) {
    peaks.push('February (Valentine period)');
  }
  if (jupiter === 5 || jupiter === 7) {
    peaks.push('January-May (Jupiter favorable)');
  }
  peaks.push('August (romantic energies high)');
  peaks.push('October-November (festive season)');
  return peaks.join(', ');
}

function getAscendantMarriageStyle(ascendant: string): string {
  const styles: Record<string, string> = {
    Aries: 'needs excitement and mutual growth in marriage',
    Taurus: 'values stability, comfort, and sensual connection',
    Gemini: 'requires intellectual stimulation and communication',
    Cancer: 'creates deeply nurturing and protective home life',
    Leo: 'brings warmth, generosity, and dramatic romance',
    Virgo: 'shows love through practical service and care',
    Libra: 'naturally creates harmony and balanced partnership',
    Scorpio: 'forms intense, loyal, and transformative bonds',
    Sagittarius: 'needs freedom, adventure, and philosophical alignment',
    Capricorn: 'builds responsible, structured family life',
    Aquarius: 'values friendship and independence within marriage',
    Pisces: 'creates compassionate, spiritually-connected union'
  };
  return styles[ascendant] || 'has distinctive marriage approach';
}

function getMoonSignPartnerNeeds(moonSign: string): string {
  const needs: Record<string, string> = {
    Aries: 'need independence and excitement from partner',
    Taurus: 'need security, loyalty, and physical affection',
    Gemini: 'need mental stimulation and variety',
    Cancer: 'need emotional security and nurturing',
    Leo: 'need appreciation, admiration, and warmth',
    Virgo: 'need reliability and practical support',
    Libra: 'need harmony, fairness, and partnership',
    Scorpio: 'need depth, loyalty, and emotional intimacy',
    Sagittarius: 'need freedom, optimism, and adventure',
    Capricorn: 'need commitment, respect, and shared goals',
    Aquarius: 'need intellectual connection and space',
    Pisces: 'need empathy, spiritual connection, and romance'
  };
  return needs[moonSign] || 'unique emotional needs in partnership';
}

function getAscendantFamilyContribution(element: string): string {
  const contributions: Record<string, string> = {
    Fire: 'enthusiasm, leadership, and motivation',
    Earth: 'stability, practical support, and reliability',
    Air: 'communication, ideas, and social connections',
    Water: 'emotional support, intuition, and nurturing'
  };
  return contributions[element] || 'valuable qualities';
}

function getDashaFamilyFocus(dasha: string): string {
  const focus: Record<string, string> = {
    Sun: 'father figure matters, family leadership, and authority',
    Moon: 'mother, home environment, and emotional bonding',
    Mars: 'siblings, property matters, and family protection',
    Mercury: 'communication, education of children, and family business',
    Jupiter: 'children, family wisdom, and religious/spiritual practices',
    Venus: 'harmony, celebrations, and family comfort',
    Saturn: 'elder care, family responsibilities, and karmic debts',
    Rahu: 'family transformation and breaking old patterns',
    Ketu: 'ancestral healing and spiritual family connections'
  };
  return focus[dasha] || 'family well-being and harmony';
}

function getMoonSignSocialStyle(moonSign: string): string {
  const styles: Record<string, string> = {
    Aries: 'direct and action-oriented in friendships',
    Taurus: 'loyal and steadfast friend, values comfort in social settings',
    Gemini: 'social butterfly with diverse friend circles',
    Cancer: 'creates family-like bonds with close friends',
    Leo: 'generous host and entertaining friend',
    Virgo: 'helpful and supportive in practical ways',
    Libra: 'natural diplomat and harmonizer in groups',
    Scorpio: 'few but deeply loyal friendships',
    Sagittarius: 'optimistic and adventurous social energy',
    Capricorn: 'selective but reliable in friendships',
    Aquarius: 'values unique individuals and group causes',
    Pisces: 'compassionate and spiritually-connected friendships'
  };
  return styles[moonSign] || 'unique social expression';
}

function getSocialPeakMonths(jupiter: number, antar: string, year: number): string {
  const peaks: string[] = [];
  if (jupiter === 11) peaks.push('January-May (Jupiter in 11th)');
  if (['Mercury', 'Venus'].includes(antar)) peaks.push('Year-round (favorable Antar Dasha)');
  peaks.push('March (Holi)');
  peaks.push('August (Independence Day)');
  peaks.push('October-November (Diwali season)');
  return peaks.slice(0, 4).join(', ');
}

function buildHealthDetails(
  moonSign: string,
  ascendant: string,
  saturnFromAsc: number,
  ketuFromAsc: number,
  year: number
): { physical: string; mental: string; prevention: string[] } {
  const moonElement = getElement(moonSign);
  const ascElement = getElement(ascendant);

  let physical = `Physical health outlook for ${year}: ${getAscendantHealthAreas(ascendant)} `;
  physical += `Your ${ascendant} Ascendant governs ${getAscendantBodyParts(ascendant)}, making these areas primary health focus. `;

  if (saturnFromAsc === 1) {
    physical += `Saturn transiting your 1st house in ${year} requires dedicated attention to physical health. Energy levels may feel lower - regular checkups essential. Focus on building stamina through consistent, moderate exercise rather than intense workouts. `;
  } else if (saturnFromAsc === 6) {
    physical += `Saturn in 6th house supports overcoming chronic conditions through disciplined health routines. Excellent year for establishing sustainable exercise habits and addressing long-standing health issues systematically. `;
  } else if (saturnFromAsc === 8) {
    physical += `Saturn in 8th house in ${year} - pay attention to chronic or hidden health matters. Preventive care crucial. Focus on longevity practices, regular screenings, and addressing any lingering issues. `;
  } else if (saturnFromAsc === 4) {
    physical += `Saturn in 4th may affect emotional well-being which reflects in physical health. Chest area, stomach need attention. Maintain good posture and address any digestive discomfort. `;
  } else {
    physical += `Saturn's position supports steady health maintenance in ${year}. Consistent routines more important than dramatic changes. `;
  }

  if (ketuFromAsc === 1) {
    physical += 'Ketu in Ascendant may create vague, hard-to-diagnose symptoms. Alternative healing modalities like Ayurveda, homeopathy, or energy healing may help where conventional medicine seems limited. ';
  } else if (ketuFromAsc === 6) {
    physical += 'Ketu in 6th naturally dissolves health obstacles. Past health issues may resolve unexpectedly. Spiritual healing approaches especially effective. ';
  }

  physical += `Recommended exercise for ${ascElement} Ascendant: ${getElementExerciseType(ascElement)}. `;
  physical += `Best health months in ${year}: ${getHealthFavorableMonths(saturnFromAsc, ketuFromAsc)}.`;

  let mental = `Mental and emotional health for ${year}: ${getMoonSignHealthTendencies(moonSign)} `;
  mental += `Your ${moonSign} Moon indicates ${getMoonSignMentalPattern(moonSign)}. `;

  if (moonElement === 'Water') {
    mental += `Water Moon in ${year}: Practice emotional boundaries. You naturally absorb others\' emotions - protect your energy through conscious shielding. Avoid excessive news consumption. Water-based activities (swimming, baths) are therapeutic. `;
  } else if (moonElement === 'Fire') {
    mental += `Fire Moon in ${year}: Channel mental restlessness into physical activity. Meditation may feel difficult - try moving meditations like yoga or walking. Anger management through sport or martial arts. Avoid overstimulation. `;
  } else if (moonElement === 'Air') {
    mental += `Air Moon in ${year}: Ground racing thoughts through mindfulness and breathing exercises. Limit information intake and social media. Writing/journaling helps process thoughts. Regular digital detox recommended. `;
  } else {
    mental += `Earth Moon in ${year}: Maintain stable routines to support mental equilibrium. Resist tendency toward worry through practical planning. Nature connection and grounding practices essential. Avoid overwork. `;
  }

  mental += `Stress management for ${moonSign} Moon: ${getMoonSignStressRelief(moonSign)}. `;
  mental += `Mental wellness peak periods: ${getMentalWellnessPeaks(moonElement, year)}.`;

  const prevention: string[] = [];
  prevention.push(`${ascendant} Ascendant ${year} checkup priorities: ${getAscendantPrimaryHealthFocus(ascendant)} - schedule screenings early in the year`);
  prevention.push(`${moonSign} Moon mental wellness: Daily practice of ${getMoonSignMentalHealthPractice(moonSign)}`);

  if (saturnFromAsc === 1 || saturnFromAsc === 6 || saturnFromAsc === 8) {
    prevention.push(`Saturn transit ${year}: Establish consistent exercise routine (30 min daily), ensure 7-8 hours sleep, manage stress through discipline`);
  }
  if (ketuFromAsc === 1 || ketuFromAsc === 6) {
    prevention.push(`Ketu transit ${year}: Explore Ayurveda consultation, yoga therapy, and spiritual healing modalities`);
  }

  prevention.push(`Diet for ${ascElement} constitution: ${getElementDietRecommendation(ascElement)}`);
  prevention.push(`${moonElement} Moon emotional support: ${getMoonElementEmotionalSupport(moonElement)}`);
  prevention.push(`General ${year} wellness: Balanced meals, 2-3L water daily, 7-8 hours sleep, morning sunlight exposure, evening digital disconnect`);
  prevention.push(`Seasonal focus: Immunity in monsoon (Jul-Sep), respiratory care in winter (Dec-Feb), hydration in summer (Apr-Jun)`);

  return { physical, mental, prevention };
}

function getAscendantBodyParts(ascendant: string): string {
  const parts: Record<string, string> = {
    Aries: 'head, brain, eyes, and face',
    Taurus: 'throat, neck, vocal cords, and thyroid',
    Gemini: 'shoulders, arms, hands, lungs, and nervous system',
    Cancer: 'chest, breasts, stomach, and upper digestive system',
    Leo: 'heart, spine, upper back, and circulatory system',
    Virgo: 'intestines, digestive system, and pancreas',
    Libra: 'kidneys, lower back, skin, and hormonal system',
    Scorpio: 'reproductive organs, elimination system, and pelvis',
    Sagittarius: 'hips, thighs, liver, and sciatic nerve',
    Capricorn: 'knees, bones, teeth, joints, and skin',
    Aquarius: 'ankles, calves, circulatory system, and shins',
    Pisces: 'feet, toes, lymphatic system, and immune system'
  };
  return parts[ascendant] || 'overall body systems';
}

function getElementExerciseType(element: string): string {
  const exercises: Record<string, string> = {
    Fire: 'High-intensity workouts, competitive sports, martial arts, HIIT training',
    Earth: 'Weight training, hiking, yoga, swimming, structured gym routines',
    Air: 'Cardio, cycling, dance, group fitness classes, tennis',
    Water: 'Swimming, water aerobics, gentle yoga, tai chi, walking in nature'
  };
  return exercises[element] || 'balanced exercise routine';
}

function getHealthFavorableMonths(saturn: number, ketu: number): string {
  const favorable: string[] = [];
  if (saturn !== 1 && saturn !== 8) {
    favorable.push('January-March (steady energy)');
  }
  if (ketu !== 1) {
    favorable.push('April-June (good vitality)');
  }
  favorable.push('September-October (balanced period)');
  if (saturn === 6) {
    favorable.push('Year-round for establishing health routines');
  }
  return favorable.join(', ');
}

function getMoonSignMentalPattern(moonSign: string): string {
  const patterns: Record<string, string> = {
    Aries: 'active, impatient mind that needs constant engagement',
    Taurus: 'steady, comfort-seeking mind that resists change',
    Gemini: 'curious, restless mind that craves variety and information',
    Cancer: 'emotionally sensitive mind deeply affected by environment',
    Leo: 'confident, expressive mind that needs recognition',
    Virgo: 'analytical, detail-oriented mind prone to worry',
    Libra: 'harmony-seeking mind that struggles with decisions',
    Scorpio: 'intense, penetrating mind with deep emotional currents',
    Sagittarius: 'optimistic, expansive mind seeking meaning',
    Capricorn: 'disciplined, goal-oriented mind prone to melancholy',
    Aquarius: 'innovative, detached mind valuing independence',
    Pisces: 'intuitive, dreamy mind with permeable boundaries'
  };
  return patterns[moonSign] || 'unique mental patterns';
}

function getMoonSignStressRelief(moonSign: string): string {
  const relief: Record<string, string> = {
    Aries: 'physical exercise, competitive activities, quick action',
    Taurus: 'comfort food (healthy), nature, massage, music',
    Gemini: 'talking it out, reading, variety, short trips',
    Cancer: 'home time, cooking, family, emotional processing',
    Leo: 'creative expression, appreciation, fun activities',
    Virgo: 'organizing, problem-solving, helping others, yoga',
    Libra: 'beauty, art, harmonious company, spa treatments',
    Scorpio: 'intense exercise, deep conversations, alone time',
    Sagittarius: 'adventure, travel, humor, philosophical reading',
    Capricorn: 'accomplishing tasks, planning, mountain hikes',
    Aquarius: 'social causes, innovative projects, friend time',
    Pisces: 'music, water, meditation, spiritual practices'
  };
  return relief[moonSign] || 'personalized relaxation techniques';
}

function getMentalWellnessPeaks(element: string, year: number): string {
  const peaks: Record<string, string> = {
    Fire: `March-April (spring energy), September-October (achievement period)`,
    Earth: `April-May (grounding season), October-November (stability period)`,
    Air: `February-March (social season), August-September (intellectual peak)`,
    Water: `June-July (monsoon connection), November-December (introspective period)`
  };
  return peaks[element] || 'balanced throughout the year';
}

function getElementDietRecommendation(element: string): string {
  const diets: Record<string, string> = {
    Fire: 'Cooling foods, avoid excess spice and alcohol, hydrating fruits and vegetables',
    Earth: 'Light, varied diet to counter tendency toward heaviness, warm spices, avoid overeating',
    Air: 'Grounding, warm, moist foods, regular meal times, avoid excessive raw foods and caffeine',
    Water: 'Light, warm, dry foods, spices to aid digestion, avoid dairy excess and cold foods'
  };
  return diets[element] || 'balanced, seasonal, local foods';
}

function getMoonElementEmotionalSupport(element: string): string {
  const support: Record<string, string> = {
    Fire: 'Express emotions through action, avoid suppression, channel anger constructively',
    Earth: 'Create security through routine, allow emotional expression, avoid emotional eating',
    Air: 'Process feelings through talking and writing, avoid overthinking, connect emotionally',
    Water: 'Honor your sensitivity, maintain boundaries, use creativity for emotional release'
  };
  return support[element] || 'balanced emotional awareness';
}

function getAscendantPrimaryHealthFocus(ascendant: string): string {
  const focus: Record<string, string> = {
    Aries: 'head, eyes, and stress management',
    Taurus: 'throat, thyroid, and weight management',
    Gemini: 'lungs, respiratory health, and nervous system',
    Cancer: 'stomach, digestion, and emotional eating',
    Leo: 'heart, cardiovascular system, and blood pressure',
    Virgo: 'digestive system, intestines, and diet',
    Libra: 'kidneys, hormonal balance, and lower back',
    Scorpio: 'reproductive health and elimination',
    Sagittarius: 'liver, hips, and avoiding excess',
    Capricorn: 'bones, joints, and dental health',
    Aquarius: 'circulation, ankles, and nervous disorders',
    Pisces: 'feet, lymphatic system, and immunity'
  };
  return focus[ascendant] || 'overall health maintenance';
}

function getMoonSignMentalHealthPractice(moonSign: string): string {
  const practices: Record<string, string> = {
    Aries: 'physical exercise and competitive sports',
    Taurus: 'nature walks, gardening, and sensory pleasures',
    Gemini: 'journaling, reading, and social connection',
    Cancer: 'home environment comfort and family time',
    Leo: 'creative expression and recognition activities',
    Virgo: 'organizing, planning, and helping others',
    Libra: 'art appreciation, music, and harmonious environments',
    Scorpio: 'deep conversations and transformational practices',
    Sagittarius: 'travel, adventure, and philosophical study',
    Capricorn: 'goal achievement and structured activities',
    Aquarius: 'humanitarian causes and intellectual stimulation',
    Pisces: 'meditation, music, and spiritual practices'
  };
  return practices[moonSign] || 'mindfulness and self-care';
}

function buildSpiritualPractices(
  moonSign: string,
  mahaDasha: string,
  saturnFromMoon: number,
  rahuFromMoon: number
): string[] {
  const practices: string[] = [];

  practices.push(getDashaSpiritualFocus(mahaDasha));

  const moonPractice = getMoonSignSpiritualPractice(moonSign);
  practices.push(moonPractice.replace(/\.$/, ''));

  if (saturnFromMoon === 12) {
    practices.push('Saturn in 12th: Excellent for meditation retreats, ashram visits, and deep spiritual practice');
  } else if (saturnFromMoon === 9) {
    practices.push('Saturn in 9th: Study sacred texts seriously, connect with spiritual teachers, pilgrimage beneficial');
  }

  if (rahuFromMoon === 12) {
    practices.push('Rahu in 12th: Explore foreign spiritual traditions, past-life regression, or mystical experiences');
  } else if (rahuFromMoon === 9) {
    practices.push('Rahu in 9th: Unconventional spiritual paths may attract you, but maintain discernment');
  }

  const element = getElement(moonSign);
  if (element === 'Fire') {
    practices.push('Fire element: Dynamic practices like Surya Namaskar, Kundalini Yoga, and active meditation');
  } else if (element === 'Water') {
    practices.push('Water element: Bhakti yoga, devotional chanting, and water rituals');
  } else if (element === 'Earth') {
    practices.push('Earth element: Grounding practices, nature meditation, and seva (selfless service)');
  } else {
    practices.push('Air element: Pranayama, mantra meditation, and study of scriptures');
  }

  return practices;
}

function buildEducationGuidance(
  moonSign: string,
  ascendant: string,
  mahaDasha: string,
  jupiterFromMoon1: number,
  jupiterFromMoon2: number,
  year: number
): string {
  let education = '';

  if (jupiterFromMoon1 === 4 || jupiterFromMoon1 === 5 || jupiterFromMoon1 === 9) {
    education += `First half of ${year} excellent for education. Jupiter in ${jupiterFromMoon1}th house supports learning, examinations, and academic achievements. `;
  }

  if (jupiterFromMoon2 === 4 || jupiterFromMoon2 === 5 || jupiterFromMoon2 === 9) {
    education += `Second half of ${year} favorable for studies. Jupiter's transit enhances concentration and academic success. `;
  }

  const dashaEducation: Record<string, string> = {
    Mercury: 'Mercury Dasha strongly supports all forms of learning, communication skills, and intellectual pursuits.',
    Jupiter: 'Jupiter Dasha is excellent for higher education, spiritual learning, and gaining wisdom.',
    Venus: 'Venus Dasha supports arts, music, creative studies, and aesthetic learning.',
    Saturn: 'Saturn Dasha requires disciplined study habits but builds deep expertise over time.',
    Rahu: 'Rahu Dasha favors technology, foreign education, and unconventional learning paths.',
    Ketu: 'Ketu Dasha supports research, spiritual studies, and technical specialization.',
    Sun: 'Sun Dasha favors leadership training, government exams, and authoritative knowledge.',
    Moon: 'Moon Dasha supports intuitive learning, psychology, and subjects requiring emotional intelligence.',
    Mars: 'Mars Dasha favors technical education, engineering, medicine, and competitive exams.'
  };
  education += dashaEducation[mahaDasha] || 'Current period supports focused learning. ';

  const moonElement = getElement(moonSign);
  const ascElement = getElement(ascendant);
  if (moonElement === 'Air' || ascElement === 'Air') {
    education += 'Your air element influence enhances intellectual absorption and communication studies.';
  } else if (moonElement === 'Fire' || ascElement === 'Fire') {
    education += 'Fire element gives you competitive edge in examinations and leadership courses.';
  } else if (moonElement === 'Earth' || ascElement === 'Earth') {
    education += 'Earth element supports practical, applied learning and professional certifications.';
  } else {
    education += 'Water element enhances intuitive understanding and creative, artistic studies.';
  }

  return education;
}

function buildMonthlyHighlights(
  jupiterFromMoon1: number,
  jupiterFromMoon2: number,
  saturnFromMoon: number,
  mahaDasha: string,
  year: number
): string[] {
  const highlights: string[] = [];
  const jupiterFavorable1 = [1, 2, 4, 5, 7, 9, 10, 11].includes(jupiterFromMoon1);
  const jupiterFavorable2 = [1, 2, 4, 5, 7, 9, 10, 11].includes(jupiterFromMoon2);
  const saturnChallenging = [1, 4, 8, 12].includes(saturnFromMoon);
  const dashaPositive = ['Jupiter', 'Venus', 'Mercury', 'Moon'].includes(mahaDasha);

  const janCareer = jupiterFromMoon1 === 10 || jupiterFromMoon1 === 11 ? 'Excellent for career initiatives' : 'Build foundations steadily';
  const janFinance = jupiterFromMoon1 === 2 ? 'Strong income potential' : 'Focus on budgeting';
  const janRelation = jupiterFromMoon1 === 7 ? 'Relationship opportunities' : 'Nurture existing bonds';
  highlights.push(`January ${year}: ${janCareer}. ${janFinance}. ${janRelation}. ${mahaDasha} Dasha themes: ${getDashaMonthlyFocus(mahaDasha, 1)}. Auspicious dates: Pongal/Makar Sankranti (14th), Republic Day period.`);

  const febFinance = saturnFromMoon === 2 ? 'Financial discipline required' : 'Stable financial flow';
  const febRelation = jupiterFavorable1 ? 'Relationships flourish' : 'Patience in partnerships';
  highlights.push(`February ${year}: Love and partnerships highlighted. ${febRelation}. ${febFinance}. ${getDashaMonthlyFocus(mahaDasha, 2)}. Valentine period favorable for ${jupiterFromMoon1 === 5 || jupiterFromMoon1 === 7 ? 'romantic gestures' : 'deepening existing connections'}. Maha Shivaratri enhances spiritual practices.`);

  const marCareer = saturnFromMoon === 10 ? 'Career demands increase - rise to the challenge' : 'Steady professional progress';
  const marHealth = saturnChallenging ? 'Monitor health and energy levels' : 'Good vitality period';
  highlights.push(`March ${year}: ${marCareer}. Financial year-end planning critical. ${marHealth}. ${getDashaMonthlyFocus(mahaDasha, 3)}. Holi (around mid-March) brings social opportunities. Tax planning and investments before March 31st.`);

  const aprFinance = jupiterFromMoon1 === 11 ? 'Gains and goal achievement' : 'New financial year planning';
  const aprCareer = dashaPositive ? 'Career expansion possibilities' : 'Consolidate position';
  highlights.push(`April ${year}: New financial year begins. ${aprFinance}. ${aprCareer}. ${getDashaMonthlyFocus(mahaDasha, 4)}. Ram Navami and Hanuman Jayanti for spiritual strength. Jupiter still in ${getHouseOrdinal(jupiterFromMoon1)} - maximize remaining benefits.`);

  const mayTransition = jupiterFavorable2 ? 'Jupiter shift brings new opportunities' : 'Adapt to changing energies';
  const mayCareer = jupiterFromMoon2 === 10 || jupiterFromMoon2 === 11 ? 'Career boost incoming' : 'Preparation for new phase';
  highlights.push(`May ${year}: MAJOR TRANSIT - Jupiter enters new sign. ${mayTransition}. ${mayCareer}. ${getDashaMonthlyFocus(mahaDasha, 5)}. Akshaya Tritiya (early May) - excellent for new beginnings, gold purchases, investments. Buddha Purnima for wisdom practices.`);

  const juneFocus = jupiterFavorable2 ? 'New Jupiter energy activates ' + getHouseOrdinal(jupiterFromMoon2) + ' house themes' : 'Adjustment period to new planetary energies';
  const juneRelation = jupiterFromMoon2 === 7 ? 'Partnership opportunities emerge' : 'Relationship stability';
  highlights.push(`June ${year}: ${juneFocus}. ${juneRelation}. Mid-year review of goals and progress. ${getDashaMonthlyFocus(mahaDasha, 6)}. Summer solstice marks energy shift. Evaluate first-half achievements and adjust strategies for remainder of ${year}.`);

  const julHealth = saturnFromMoon === 6 ? 'Good for health improvements through discipline' : (saturnChallenging ? 'Health requires attention' : 'Maintain wellness routines');
  const julCareer = jupiterFromMoon2 === 6 ? 'Overcome workplace obstacles' : 'Steady professional month';
  highlights.push(`July ${year}: Health and daily routines in focus. ${julHealth}. ${julCareer}. ${getDashaMonthlyFocus(mahaDasha, 7)}. Guru Purnima - honor teachers and mentors, especially beneficial in ${mahaDasha} Dasha. Monsoon season - focus on immunity.`);

  const augCreative = jupiterFromMoon2 === 5 ? 'Creativity and romance peak' : 'Express yourself authentically';
  const augRelation = ['Venus', 'Moon'].includes(mahaDasha) ? 'Love life especially favored' : 'Balanced romantic energy';
  highlights.push(`August ${year}: Creative and romantic energies heightened. ${augCreative}. ${augRelation}. ${getDashaMonthlyFocus(mahaDasha, 8)}. Krishna Janmashtami and Raksha Bandhan strengthen family bonds. Independence Day period brings patriotic and leadership energy.`);

  const sepSpiritual = saturnFromMoon === 9 || saturnFromMoon === 12 ? 'Strong spiritual growth period' : 'Balance material and spiritual';
  const sepEducation = jupiterFromMoon2 === 4 || jupiterFromMoon2 === 5 || jupiterFromMoon2 === 9 ? 'Excellent for learning and courses' : 'Good for skill development';
  highlights.push(`September ${year}: Learning and spiritual growth emphasized. ${sepSpiritual}. ${sepEducation}. ${getDashaMonthlyFocus(mahaDasha, 9)}. Ganesh Chaturthi - remove obstacles with Ganesha blessings. Pitru Paksha - honor ancestors for karmic clearing.`);

  const octHome = jupiterFromMoon2 === 4 ? 'Domestic happiness and property matters favored' : 'Home and family need attention';
  const octFinance = jupiterFromMoon2 === 2 || jupiterFromMoon2 === 11 ? 'Favorable for finances and purchases' : 'Moderate spending recommended';
  highlights.push(`October ${year}: ${octHome}. ${octFinance}. ${getDashaMonthlyFocus(mahaDasha, 10)}. Navratri and Dussehra - victory over obstacles, new beginnings. Excellent for major purchases, vehicle, property during Navratri. Diwali preparation begins.`);

  const novWealth = dashaPositive ? 'Wealth and prosperity energies strong' : 'Steady financial period';
  const novSocial = jupiterFromMoon2 === 11 ? 'Social expansion and networking peak' : 'Quality connections over quantity';
  highlights.push(`November ${year}: Diwali brings prosperity and new beginnings. ${novWealth}. ${novSocial}. ${getDashaMonthlyFocus(mahaDasha, 11)}. Lakshmi Puja on Diwali - wealth rituals especially powerful. Govardhan Puja and Bhai Dooj strengthen relationships. Major auspicious period for investments.`);

  const decReflect = dashaPositive ? 'Celebrate achievements and plan expansion' : 'Reflect on lessons and prepare for growth';
  const decCareer = jupiterFromMoon2 === 10 ? 'Strong career finish to the year' : 'Complete pending professional matters';
  highlights.push(`December ${year}: Year-end reflection and ${year + 1} planning. ${decReflect}. ${decCareer}. ${getDashaMonthlyFocus(mahaDasha, 12)}. Winter solstice marks new energy cycle. Christmas and New Year for family bonding. Set intentions for ${year + 1} aligned with ${mahaDasha} Dasha.`);

  return highlights;
}

function getDashaMonthlyFocus(dasha: string, month: number): string {
  const dashaThemes: Record<string, string[]> = {
    Sun: ['Leadership initiatives', 'Authority building', 'Government matters', 'Father/authority figures', 'Health vitality', 'Public recognition', 'Self-confidence', 'Career visibility', 'Administrative work', 'Power dynamics', 'Professional status', 'Year-end authority review'],
    Moon: ['Emotional clarity', 'Mother/nurturing', 'Public connections', 'Home matters', 'Mental peace', 'Travel possibilities', 'Intuitive decisions', 'Family bonds', 'Emotional intelligence', 'Domestic harmony', 'Nurturing relationships', 'Inner reflection'],
    Mars: ['Action and initiative', 'Property matters', 'Courage building', 'Competition success', 'Energy management', 'Technical projects', 'Physical fitness', 'Assertiveness', 'Real estate', 'Overcoming obstacles', 'Strategic action', 'Goal completion'],
    Mercury: ['Communication', 'Business deals', 'Learning', 'Writing projects', 'Networking', 'Analytical work', 'Trade and commerce', 'Skill development', 'Intellectual pursuits', 'Documentation', 'Financial planning', 'Strategy review'],
    Jupiter: ['Wisdom expansion', 'Teaching/learning', 'Spiritual growth', 'Higher education', 'Legal matters', 'Guru connection', 'Philosophy', 'Children matters', 'Charitable acts', 'Religious practices', 'Wealth growth', 'Blessings and gratitude'],
    Venus: ['Relationships', 'Creative projects', 'Beauty and aesthetics', 'Luxury purchases', 'Romance', 'Artistic expression', 'Partnerships', 'Social events', 'Harmony building', 'Comfort seeking', 'Celebrations', 'Love and appreciation'],
    Saturn: ['Discipline building', 'Hard work rewards', 'Structure creation', 'Karmic lessons', 'Patience testing', 'Long-term planning', 'Responsibility', 'Service to others', 'Perseverance', 'Elder care', 'Legacy building', 'Year reflection'],
    Rahu: ['Unconventional paths', 'Foreign connections', 'Technology focus', 'Ambition drive', 'Material desires', 'Breaking patterns', 'Innovation', 'Risk assessment', 'Worldly gains', 'Transformation', 'New directions', 'Future visioning'],
    Ketu: ['Spiritual depth', 'Past karma', 'Letting go', 'Inner wisdom', 'Detachment practice', 'Mystical insights', 'Research', 'Healing work', 'Intuition', 'Ancestral connections', 'Liberation focus', 'Soul review']
  };
  const themes = dashaThemes[dasha] || ['General growth', 'Steady progress', 'Balance', 'Development', 'Learning', 'Adaptation', 'Building', 'Connecting', 'Achieving', 'Planning', 'Reflecting', 'Preparing'];
  return `${dasha} Dasha focus: ${themes[month - 1]}`;
}
