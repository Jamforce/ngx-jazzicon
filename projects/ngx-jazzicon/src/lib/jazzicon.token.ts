import { InjectionToken } from "@angular/core";

export interface JazziconConfig {
    diameter: number;
    colors: string[];
    shapeCount: number;
}

export const JazziconServiceConfig = new InjectionToken<JazziconConfig>('JazziconConfig');