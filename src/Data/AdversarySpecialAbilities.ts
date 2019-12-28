/*
Important: The data and text in this file are not covered by the GPL
Descriptions and some names are copyright and owned by Fantasy Flight Games, no copyright
claim is intended by application author(s)
*/
import { IPowerLevels } from "../Classes/Adversary";

export interface IAdversarySpecialAbility{
    name: string;
    description: string;
    examples: string;
    powerLevels: IPowerLevels;
}

export const AdversarySpecialAbilities: IAdversarySpecialAbility[] = [
    {
        name: "Aquatic",
        description: 'This adversary may breathe underwater and never suffers movement penalties for traveling through water, but cannot survive on land.',
        examples: "Fish or sea-going creatures",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Amphibious",
        description: 'This adversary may breathe underwater and never suffers movement penalties for traveling through water.',
        examples: "Fish or sea-going creatures",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    },
    // TODO more special abilities
];