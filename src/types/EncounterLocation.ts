import { NamedAPIResource } from "./NamedAPIResource";

export interface EncounterLocation {
  location_area: NamedAPIResource;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: NamedAPIResource;
}

export interface EncounterDetail {
  chance: number;
  condition_values: NamedAPIResource[];
  max_level: number;
  method: NamedAPIResource;
  min_level: number;
}