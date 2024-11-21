import { ZoneCreationType } from "@/types/declaration";

export function determinePrice(distance: number, zones: ZoneCreationType[]): number {
  for (const zone of zones) {
    if (zone.range.includes('<')) {
      const [, maxDistance] = zone.range.split('<').map(s => parseFloat(s.trim()));
      if (distance < maxDistance) {
        return parseFloat(zone.cost);
      }
    } else if (zone.range.includes('>=') && zone.range.includes('<')) {
      const [minDistance, maxDistance] = zone.range.split('<').map(s => parseFloat(s.trim().replace('>=', '')));
      if (distance >= minDistance && distance < maxDistance) {
        return parseFloat(zone.cost);
      }
    } else if (zone.range.includes('>')) {
      const [, minDistance] = zone.range.split('>').map(s => parseFloat(s.trim()));
      if (distance > minDistance) {
        return parseFloat(zone.cost);
      }
    } else {
      // Assume it's a simple number comparison
      if (distance <= parseFloat(zone.range)) {
        return parseFloat(zone.cost);
      }
    }
  }

  // If no matching zone is found, return 0 or handle as needed
  return 0;
}

