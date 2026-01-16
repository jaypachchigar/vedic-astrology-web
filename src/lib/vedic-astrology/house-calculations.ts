/**
 * House Calculations for Vedic Astrology
 * Calculates house cusps and determines which house each planet occupies
 */

import { PlanetPosition } from './planetary-calculations';

export interface House {
  number: number;
  sign: {
    id: number;
    name: string;
    lord: string;
  };
  cuspDegree: number; // Starting degree of the house in the zodiac
  planets: string[]; // Names of planets in this house
}

// Calculate houses using Whole Sign House system (traditional Vedic astrology)
export function calculateHouses(
  ascendantDegree: number,
  planets: PlanetPosition[]
): House[] {
  const houses: House[] = [];

  // Zodiac signs
  const signs = [
    { id: 1, name: 'Aries', lord: 'Mars' },
    { id: 2, name: 'Taurus', lord: 'Venus' },
    { id: 3, name: 'Gemini', lord: 'Mercury' },
    { id: 4, name: 'Cancer', lord: 'Moon' },
    { id: 5, name: 'Leo', lord: 'Sun' },
    { id: 6, name: 'Virgo', lord: 'Mercury' },
    { id: 7, name: 'Libra', lord: 'Venus' },
    { id: 8, name: 'Scorpio', lord: 'Mars' },
    { id: 9, name: 'Sagittarius', lord: 'Jupiter' },
    { id: 10, name: 'Capricorn', lord: 'Saturn' },
    { id: 11, name: 'Aquarius', lord: 'Saturn' },
    { id: 12, name: 'Pisces', lord: 'Jupiter' },
  ];

  // WHOLE SIGN HOUSE SYSTEM:
  // The sign containing the ascendant = House 1
  // Each subsequent sign = next house
  const ascendantSignIndex = Math.floor(ascendantDegree / 30); // 0-11

  for (let i = 0; i < 12; i++) {
    const signIndex = (ascendantSignIndex + i) % 12;
    const cuspDegree = signIndex * 30; // Start of the sign

    houses.push({
      number: i + 1,
      sign: signs[signIndex],
      cuspDegree,
      planets: [],
    });
  }

  // Assign planets to houses (Whole Sign system)
  planets.forEach((planet) => {
    const planetDegree = planet.siderealLongitude;
    const planetSignIndex = Math.floor(planetDegree / 30); // Which sign is the planet in?

    // Find which house has this sign
    for (let i = 0; i < 12; i++) {
      const houseSignIndex = Math.floor(houses[i].cuspDegree / 30);
      if (planetSignIndex === houseSignIndex) {
        houses[i].planets.push(planet.name);
        break;
      }
    }
  });

  return houses;
}

// Determine which house a planet is in (Whole Sign system)
export function getPlanetHouse(planetDegree: number, ascendantDegree: number): number {
  // In Whole Sign Houses:
  // Find which sign the ascendant is in
  const ascendantSignIndex = Math.floor(ascendantDegree / 30); // 0-11

  // Find which sign the planet is in
  const planetSignIndex = Math.floor(planetDegree / 30); // 0-11

  // Calculate house number
  let houseNumber = planetSignIndex - ascendantSignIndex + 1;

  // Normalize to 1-12
  while (houseNumber <= 0) houseNumber += 12;
  while (houseNumber > 12) houseNumber -= 12;

  return houseNumber;
}
