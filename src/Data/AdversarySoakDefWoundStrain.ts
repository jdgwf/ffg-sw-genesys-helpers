/*
Important: The data and text in this file are not covered by the GPL
Descriptions and some names are copyright and owned by Fantasy Flight Games, no copyright
claim is intended by application author(s)
*/
import { IPowerLevels } from "../Classes/Adversary";

export interface IAdversarySoakDefWoundStrain {
    name: string;
    derivedAttribute: IDerivedAttribute;
    powerLevels: IPowerLevels;
    examples: string;
}

interface IDerivedAttribute {
    soakThreshold?: number;
    woundThreshold?: number;
    meleeDefense?: number;
    rangedDefense?: number;
    strainThreshold?: number;
}

export const AdversarySoakDefWoundStrain: IAdversarySoakDefWoundStrain[] = [

    {
        name: "Tough Skin",
        derivedAttribute: {
            soakThreshold: 1,
            woundThreshold: 1,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Minions, rivals, nemesis"
    },
    {
        name: "Armored Hide",
        derivedAttribute: {
            soakThreshold: 2,
            woundThreshold: 5,
        },
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        },
        examples: "Rival or nemesis animals or non-humans"
    },
    {
        name: "Dodgy",
        derivedAttribute: {
            rangedDefense: 1,
            meleeDefense: 1,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Minions, rivals, nemesis"
    },
    {
        name: "Close Combatant",
        derivedAttribute: {
            meleeDefense: 2,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Rivals, nemesis"
    },
    {
        name: "Camouflaged",
        derivedAttribute: {
            rangedDefense: 2,
            meleeDefense: 1,
        },
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        },
        examples: "Rival or nemesis animal or non-human"
    },
    {
        name: "Hardy",
        derivedAttribute: {
            woundThreshold: 5,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Rivals, nemesis"
    },
    {
        name: "Very Tough",
        derivedAttribute: {
            woundThreshold: 10,
        },
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        },
        examples: "Rival or nemesis animal or non-human"
    },
    {
        name: "Giant Body",
        derivedAttribute: {
            woundThreshold: 25,
        },
        powerLevels: {
            combat: 2,
            social: 0,
            general: 0,
        },
        examples: "Silhouette 3 or higher animal rivals and nemeses"
    },
    {
        name: "Savvy",
        derivedAttribute: {
            strainThreshold: 5,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Nemeses"
    },
    {
        name: "Mental Giant",
        derivedAttribute: {
            strainThreshold: 10,
        },
        powerLevels: {
            combat: 0,
            social: 1,
            general: 0,
        },
        examples: "Main character nemeses"
    }
]