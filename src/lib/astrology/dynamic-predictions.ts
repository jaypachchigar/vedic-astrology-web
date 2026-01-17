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
  finance: string;
  relationships: string;
  health: string;
  spiritualGrowth: string;
  luckyPeriods: string[];
  challenges: string[];
  remedies: string[];
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

  return {
    overview,
    career,
    finance,
    relationships,
    health,
    spiritualGrowth,
    luckyPeriods,
    challenges,
    remedies
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
