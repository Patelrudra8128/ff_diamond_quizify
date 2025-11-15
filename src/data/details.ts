import { type CharacterDetail } from '../types';
import charactersDetailsData from './characters_details.json';
import petsDetailsData from './pets_details.json';
import weaponsDetailsData from './waepons_details.json';

// Convert arrays to maps for quick lookup by name
const charactersDetails = charactersDetailsData as CharacterDetail[];
const petsDetails = petsDetailsData as CharacterDetail[];
const weaponsDetails = weaponsDetailsData as CharacterDetail[];
const detailsMap: Record<string, CharacterDetail> = {};

// Build the map from the characters details array
charactersDetails.forEach((detail) => {
  detailsMap[detail.name] = detail;
});

// Build the map from the pets details array
petsDetails.forEach((detail) => {
  detailsMap[detail.name] = detail;
});

// Build the map from the weapons details array
weaponsDetails.forEach((detail) => {
  detailsMap[detail.name] = detail;
});

export function getDetail(name: string): CharacterDetail | null {
  return detailsMap[name] || null;
}

export function hasDetail(name: string): boolean {
  return name in detailsMap;
}


