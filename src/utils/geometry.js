import { METERS_PER_CELL } from "../constants";

export const distanceBetween = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
export const distanceInMeters = (x1, y1, x2, y2) => distanceBetween(x1, y1, x2, y2) * METERS_PER_CELL;
export const radiusInTiles = (radiusM) => radiusM / METERS_PER_CELL;
