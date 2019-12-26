import { IPowerLevels, ICharacteristics } from "../Classes/Adversary";

export interface IAdversaryCharacteristicArray {
    name: string;
    characteristics: ICharacteristics;
    powerLevels: IPowerLevels;
    examples: string;
}

export const AdversaryCharacteristicArrays: IAdversaryCharacteristicArray[] = [
    {
        name: "Small Creature",
        characteristics: {
            brawn: 1,
            agility: 2,
            intellect: 3,
            cunning: 1,
            willpower: 1,
            presence: 1,
        },
        powerLevels: {
            combat: -1,
            social: -1,
            general: 0,
        },
        examples: "Mouse, bird, snake, cat"
    },
    {
        name: "Large Creature",
        characteristics: {
            brawn: 4,
            agility: 2,
            intellect: 2,
            cunning: 1,
            willpower: 1,
            presence: 1,
        },
        powerLevels: {
            combat: 1,
            social: -1,
            general: 0,
        },
        examples: "Bear, ox, horse, cow, ram"
    },
    {
        name: "Stealthy Creature",
        characteristics: {
            brawn: 2,
            agility: 3,
            intellect: 3,
            cunning: 1,
            willpower: 1,
            presence: 1,
        },
        powerLevels: {
            combat: 0,
            social: -1,
            general: 0,
        },
        examples: "Puma, deer, shark"
    },
    {
        name: "Huge Creature",
        characteristics: {
            brawn: 5,
            agility: 1,
            intellect: 1,
            cunning: 1,
            willpower: 1,
            presence: 2,
        },
        powerLevels: {
            combat: 1,
            social: -1,
            general: -1,
        },
        examples: "Elephant, dinosaur"
    },
    {
        name: "Average Person",
        characteristics: {
            brawn: 2,
            agility: 2,
            intellect: 2,
            cunning: 2,
            willpower: 2,
            presence: 2,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Any regular person"
    },
    {
        name: "Tough Person",
        characteristics: {
            brawn: 3,
            agility: 2,
            intellect: 2,
            cunning: 2,
            willpower: 2,
            presence: 1,
        },
        powerLevels: {
            combat: 0,
            social: -1,
            general: 0,
        },
        examples: "Laborer, mob tough, soldier"
    },
    {
        name: "Smart Person",
        characteristics: {
            brawn: 1,
            agility: 2,
            intellect: 2,
            cunning: 3,
            willpower: 2,
            presence: 2,
        },
        powerLevels: {
            combat: -1,
            social: 0,
            general: 0,
        },
        examples: "Student, medic, hacker"
    },
    {
        name: "Sociable Person",
        characteristics: {
            brawn: 2,
            agility: 2,
            intellect: 2,
            cunning: 2,
            willpower: 1,
            presence: 3,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: "Politician, manager"
    },
    {
        name: "Jack of All Trades",
        characteristics: {
            brawn: 3,
            agility: 3,
            intellect: 3,
            cunning: 3,
            willpower: 3,
            presence: 3,
        },
        powerLevels: {
            combat: 1,
            social: 1,
            general: 1,
        },
        examples: "Any competent person"
    },
    {
        name: "Skilled Warrior",
        characteristics: {
            brawn: 4,
            agility: 3,
            intellect: 2,
            cunning: 2,
            willpower: 3,
            presence: 1,
        },
        powerLevels: {
            combat: 2,
            social: 0,
            general: 0,
        },
        examples: "Knight, berserker, veteran"
    },
    {
        name: "Savant",
        characteristics: {
            brawn: 2,
            agility: 1,
            intellect: 2,
            cunning: 5,
            willpower: 2,
            presence: 1,
        },
        powerLevels: {
            combat: -1,
            social: -1,
            general: 1,
        },
        examples: "Scholar, researcher, surgeon"
    },
    {
        name: "Born Leader",
        characteristics: {
            brawn: 2,
            agility: 2,
            intellect: 3,
            cunning: 2,
            willpower: 3,
            presence: 5,
        },
        powerLevels: {
            combat: 0,
            social: 2,
            general: 0,
        },
        examples: "President, ruler, general"
    },
    {
        name: "Cunning Foe",
        characteristics: {
            brawn: 2,
            agility: 4,
            intellect: 4,
            cunning: 2,
            willpower: 2,
            presence: 2,
        },
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        },
        examples: "Spy, assassin, military scout"
    },
    {
        name: "Mastermind",
        characteristics: {
            brawn: 3,
            agility: 3,
            intellect: 4,
            cunning: 4,
            willpower: 5,
            presence: 3,
        },
        powerLevels: {
            combat: 1,
            social: 2,
            general: 2,
        },
        examples: "The main villain in a story"
    }
];