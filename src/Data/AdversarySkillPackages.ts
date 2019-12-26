import { IPowerLevels } from "../Classes/Adversary";

export interface IAdversarySkillPackage {
    name: string;
    powerLevels: IPowerLevels;
    skills: {
        name: string,
        value: number,
    }[];

}


export const AdversarySkillPackages: IAdversarySkillPackage[] = [
    {
        name: "Basic Creature",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        skills: [
            {
                name: "Athletics",
                value: 1,
            },
            {
                name: "Brawl",
                value: 1,
            },
            {
                name: "Survival",
                value: 1,
            },
            {
                name: "Vigilance",
                value: 1,
            },
        ]
    },
    {
        name: "Ferocious Creature",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        },
        skills: [
            {
                name: "Athletics",
                value: 3,
            },
            {
                name: "Brawl",
                value: 4,
            },
            {
                name: "Perception",
                value: 2,
            },
            {
                name: "Survival",
                value: 3,
            },
            {
                name: "Vigilance",
                value: 1,
            },
        ],
    },
    {
        name: "Predatory Creature",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        },
        skills: [
            {
                name: "Coordination",
                value: 3,
            },
            {
                name: "Brawl",
                value: 3,
            },
            {
                name: "Perception",
                value: 4,
            },
            {
                name: "Survival",
                value: 2,
            },
            {
                name: "Stealth",
                value: 3,
            },
        ],
    },
    {
        name: "Territorial Creature",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        skills: [
            {
                name: "Brawl",
                value: 1,
            },
            {
                name: "Resiliance",
                value: 3,
            },
            {
                name: "Survival",
                value: 4,
            },
            {
                name: "Vigilance",
                value: 4,
            },
        ],
    },
    // TODO - rest of table.
];
