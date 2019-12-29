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
    {
        name: "Flyer",
        description: 'This adversary can fly; see page 100 of the Genesys Core Rulebook.',
        examples: "Flying creatures",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Ghostly",
        description: 'This adversary may move over or through terrain (including doors and walls) without penalty. Halve the damage dealt to this adversary before applying soak, unless the attack came from a magical or supernatural source such as a spell, a blessed weapon, or another spirit.',
        examples: "Ghosts, spirits, or ethereal beings",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Know Your Foe",
        description: 'If this adversary knows an opponent\'s (pick one facet) Motivation, when this adversary inflicts strain on the  opponent, the opponent suffers 3 additional strain.',
        examples: "Sentient rivals and nemeses designed for social encounters",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 0,
        }
    },
    {
        name: "Loyal Followers",
        description: 'Once per round when this adversary is targeted by a combat check, they may choose one ally within short range, and the attack then targets the ally instead of this adversary.',
        examples: "Nemesis leaders with fanatical or devoted followers",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Mechanical",
        description: 'This adversary does not need to breathe, eat, or drink, and can survive in a vacuum and underwater. They are immune to poisons and toxins.',
        examples: "Robots or drones",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 2,
        }
    },
    {
        name: "Undead",
        description: 'This adversary does not need to breathe, eat, or drink, and can survive in a vacuum and underwater. They are immune to poisons and toxins.',
        examples: "Undead adversaries",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 2,
        }
    },
    {
        name: "Mental Weakness",
        description: 'If an opponent knows the adversary\'s (pick one type) Motivation, when the opponent inflicts strain on the adversary, the adversary suffers 2 additional strain.',
        examples: "Any character with a pronounced character flaw",
        powerLevels: {
            combat: 0,
            social: -1,
            general: 0,
        }
    },
    {
        name: "Ominous Reputation",
        description: 'When an opponent targets this adversary with a check, the opponent suffers 2 strain',
        examples: "Powerful nemeses with a fearsome reputation",
        powerLevels: {
            combat: 1,
            social: 2,
            general: 0,
        }
    },
    {
        name: "One Step Ahead",
        description: 'Once per round, after an opponent performs an action or maneuver, you may spend one Story Point to have this adversary perform an action or maneuver as an out-of-turn incidental.',
        examples: "Powerful nemeses who combat the PCs alone",
        powerLevels: {
            combat: 2,
            social: 1,
            general: 0,
        }
    },
    {
        name: "Pack Fighter",
        description: 'If this adversary makes a successful combat check, the next ally making a combat check against the same target during the same round Combat +1, Social +0, General +0 adds [advantage][advantage] to the results.',
        examples: "Creatures that fight in groups",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Pounce",
        description: 'Once per turn, while at short range this adversary may perform the move maneuver to engage a target as an incidental.',
        examples: "Fast creatures that can leap or lunge at foes",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Swarm",
        description: 'Halve the damage dealt to this adversary before applying soak, unless the attack has the Blast or Burn quality (regardless of whether the quality is activated).',
        examples: "A single profile representing a swarm of bugs or vermin",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Tactical Direction",
        description: 'This adversary may spend a maneuver to direct one friendly minion group within medium range. That group may immediately perform a maneuver as an out-of-turn incidental or add [boost] to the next check they make.',
        examples: "Rivals and nemeses who lead or direct small groups",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Environmental Vulnerability",
        description: 'When exposed to extreme heat, cold, or another environmental effect (pick one), this adversary adds [setback][setback] to all skill checks it makes.',
        examples: "Creatures adapted to living in certain climates",
        powerLevels: {
            combat: -1,
            social: -1,
            general: -1,
        }
    },
    {
        name: "Terrifying",
        description: 'At the start of the encounter, all opponents must make a Hard ([difficulty][difficulty][difficulty]) fear check as an out-of-turn incidental, as per page 243 of the Genesys Core Rulebook. If there are multiple sources of fear  in the encounter, the opponents only make one fear check against the most terrifying enemy.',
        examples: "Large monsters, creatures, and individuals who are incredibly frightening",
        powerLevels: {
            combat: 1,
            social: 1,
            general: 1,
        }
    }
];