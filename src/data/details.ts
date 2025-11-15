import { type CharacterDetail } from '../types';
import charactersDetailsData from './characters_details.json';

// Convert array to map for quick lookup by name
const charactersDetails = charactersDetailsData as CharacterDetail[];
const detailsMap: Record<string, CharacterDetail> = {};

// Build the map from the characters details array
charactersDetails.forEach((detail) => {
  detailsMap[detail.name] = detail;
});

export function getDetail(name: string): CharacterDetail | null {
  return detailsMap[name] || null;
}

export function hasDetail(name: string): boolean {
  return name in detailsMap;
}


