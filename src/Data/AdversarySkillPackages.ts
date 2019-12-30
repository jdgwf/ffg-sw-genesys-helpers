/*
Important: The data and text in this file are not covered by the GPL
Descriptions and some names are copyright and owned by Fantasy Flight Games, no copyright
claim is intended by application author(s)
*/
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
    {
        name: "Soldier",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        },
        skills: [
            {
                name: "Athletics",
                value: 2,
            },
            {
                name: "Discipline",
                value: 1,
            },
            {
                name: "Melee",
                value: 2,
            },
            {
                name: "Ranged",
                value: 2,
            },
            {
                name: "Resilience",
                value: 2,
            },
            {
                name: "Vigilance",
                value: 2,
            },
        ],
    },
    {
        name: "Duelist",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        },
        skills: [
            {
                name: "Cool",
                value: 3,
            },
            {
                name: "Coordination",
                value: 3,
            },
            {
                name: "Melee",
                value: 5,
            },
            {
                name: "Stealth",
                value: 1,
            },
        ],
    },
    {
        name: "Scout/Sniper",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 2,
        },
        skills: [
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Perception",
                value: 3,
            },
            {
                name: "Ranged",
                value: 5,
            },
            {
                name: "Stealth",
                value: 4,
            },
            {
                name: "Survival",
                value: 3,
            },
            {
                name: "Vigilance",
                value: 3,
            },
        ],
    },
    {
        name: "Brawler/Laborer",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        skills: [
            {
                name: "Athletics",
                value: 3,
            },
            {
                name: "Brawl",
                value: 2,
            },
            {
                name: "Resilience",
                value: 3,
            },
        ],
    },
    {
        name: "Gunslinger",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        },
        skills: [
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Coordination",
                value: 2,
            },
            {
                name: "Ranged",
                value: 4,
            },
            {
                name: "Skulduggery",
                value: 3,
            },
        ],
    },
    {
        name: "Sailor",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        },
        skills: [
            {
                name: "Athletics",
                value: 2,
            },
            {
                name: "Operating",
                value: 3,
            },
            {
                name: "Perception",
                value: 2,
            },
            {
                name: "Ranged",
                value: 1,
            },
            {
                name: "Vigilance",
                value: 1,
            }
        ],
    },
    {
        name: "Spy/Con Artist",
        powerLevels: {
            combat: 0,
            social: 2,
            general: 2,
        },
        skills: [
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Charm",
                value: 3,
            },
            {
                name: "Deception",
                value: 4,
            },
            {
                name: "Knowledge",
                value: 1,
            },
            {
                name: "Skulduggery",
                value: 4,
            },
            {
                name: "Stealth",
                value: 3,
            }
        ],
    },
    {
        name: "Thief/Assassin",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 4,
        },
        skills: [
            {
                name: "Coordination",
                value: 3,
            },
            {
                name: "Deception",
                value: 2,
            },
            {
                name: "Melee",
                value: 3,
            },
            {
                name: "Skulduggery",
                value: 4,
            },
            {
                name: "Stealth",
                value: 5,
            },
            {
                name: "Streetwise",
                value: 3,
            },
            {
                name: "Vigilance",
                value: 1,
            }
        ],
    },
    {
        name: "Researcher",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 5,
        },
        skills: [
            {
                name: "Astrocartography",
                value: 5,
            },
            {
                name: "Computers",
                value: 3,
            },
            {
                name: "Discipline",
                value: 2,
            },
            {
                name: "Skulduggery",
                value: 4,
            },
            {
                name: "Knowledge",
                value: 5,
            },
            {
                name: "Perception",
                value: 4,
            }
        ],
    },
    {
        name: "Natural Philosopher",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 3,
        },
        skills: [
            {
                name: "Alchemy",
                value: 4,
            },
            {
                name: "Knowledge",
                value: 4,
            },
            {
                name: "Medicine",
                value: 2,
            },
            {
                name: "Negotiation",
                value: 1,
            },
            {
                name: "Perception",
                value: 2,
            }
        ],
    },
    {
        name: "Doctor",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 2,
        },
        skills: [
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Discipline",
                value: 2,
            },
            {
                name: "Leadership",
                value: 1,
            },
            {
                name: "Medicine",
                value: 4,
            },
            {
                name: "Melee",
                value: 1,
            }
        ],
    },
    {
        name: "Knight/Warrior Leader",
        powerLevels: {
            combat: 1,
            social: 2,
            general: 2,
        },
        skills: [
            {
                name: "Athletics",
                value: 1,
            },
            {
                name: "Discipline",
                value: 2,
            },
            {
                name: "Driving",
                value: 3,
            },
            {
                name: "Leadership",
                value: 3,
            },
            {
                name: "Melee",
                value: 4,
            },
            {
                name: "Riding",
                value: 3,
            }
        ],
    },
    {
        name: "Captain of a Vessel",
        powerLevels: {
            combat: 1,
            social: 2,
            general: 3,
        },
        skills: [
            {
                name: "Astrocartography",
                value: 4,
            },
            {
                name: "Coercion",
                value: 2,
            },
            {
                name: "Discipline",
                value: 3,
            },
            {
                name: "Leadership",
                value: 4,
            },
            {
                name: "Operating",
                value: 4,
            },
            {
                name: "Ranged",
                value: 3,
            }
        ],
    },
    {
        name: "Politician/Official",
        powerLevels: {
            combat: 0,
            social: 3,
            general: 1,
        },
        skills: [
            {
                name: "Charm",
                value: 4,
            },
            {
                name: "Coercion",
                value: 2,
            },
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Leadership",
                value: 3,
            },
            {
                name: "Negotiation",
                value: 5,
            },
            {
                name: "Vigilance",
                value: 1,
            }
        ],
    },
    {
        name: "Mage",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 2,
        },
        skills: [
            {
                name: "Alchemy",
                value: 2,
            },
            {
                name: "Arcana",
                value: 4,
            },
            {
                name: "Coercion",
                value: 2,
            },
            {
                name: "Knowledge",
                value: 4,
            },
        ],
    },
    {
        name: "Priest",
        powerLevels: {
            combat: 2,
            social: 1,
            general: 2,
        },
        skills: [
            {
                name: "Charm",
                value: 2,
            },
            {
                name: "Discipline",
                value: 3,
            },
            {
                name: "Divine",
                value: 4,
            },
            {
                name: "Knowledge",
                value: 4,
            },
        ],
    },
    {
        name: "Druid",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 2,
        },
        skills: [
            {
                name: "Knowledge",
                value: 4,
            },
            {
                name: "Primal",
                value: 4,
            },
            {
                name: "Survival",
                value: 3,
            },
            {
                name: "Vigilance",
                value: 2,
            },
        ],
    },
    {
        name: "Pilot/Driver/Rider",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 3,
        },
        skills: [
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Coordination",
                value: 3,
            },
            {
                name: "Driving",
                value: 4,
            },
            {
                name: "Piloting",
                value: 4,
            },
            {
                name: "Ranged",
                value: 3,
            },
            {
                name: "Riding",
                value: 4,
            }
        ],
    },
    {
        name: "Merchant",
        powerLevels: {
            combat: 0,
            social: 3,
            general: 0,
        },
        skills: [
            {
                name: "Charm",
                value: 2,
            },
            {
                name: "Deception",
                value: 3,
            },
            {
                name: "Negotiation",
                value: 3,
            },
            {
                name: "Perception",
                value: 2,
            },
            {
                name: "Vigilance",
                value: 3,
            }
        ],
    },
    {
        name: "Crime Boss",
        powerLevels: {
            combat: 2,
            social: 3,
            general: 1,
        },
        skills: [
            {
                name: "Brawl",
                value: 4,
            },
            {
                name: "Coercion",
                value: 5,
            },
            {
                name: "Discipline",
                value: 2,
            },
            {
                name: "Leadership",
                value: 2,
            },
            {
                name: "Ranged",
                value: 2,
            },
            {
                name: "Streetwise",
                value: 4,
            }
        ],
    },
    {
        name: "Bureaucrat",
        powerLevels: {
            combat: 0,
            social: 3,
            general: 1,
        },
        skills: [
            {
                name: "Cool",
                value: 3,
            },
            {
                name: "Discipline",
                value: 3,
            },
            {
                name: "Knowledge",
                value: 2,
            },
            {
                name: "Negotiation",
                value: 2,
            },
            {
                name: "Vigilance",
                value: 3,
            }
        ],
    },
    {
        name: "Mechanic",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 3,
        },
        skills: [
            {
                name: "Athletics",
                value: 2,
            },
            {
                name: "Brawl",
                value: 1,
            },
            {
                name: "Computers",
                value: 1,
            },
            {
                name: "Mechanics",
                value: 4,
            },
            {
                name: "Resilience",
                value: 3,
            }
        ],
    },
    {
        name: "Hacker",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 3,
        },
        skills: [
            {
                name: "Computers",
                value: 5,
            },
            {
                name: "Cool",
                value: 2,
            },
            {
                name: "Deception",
                value: 2,
            },
            {
                name: "Streetwise",
                value: 2,
            }
        ],
    },
    {
        name: "Criminal Tough",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 2,
        },
        skills: [
            {
                name: "Brawl",
                value: 2,
            },
            {
                name: "Coercion",
                value: 3,
            },
            {
                name: "Resilience",
                value: 3,
            },
            {
                name: "Skulduggery",
                value: 3,
            },
            {
                name: "Streetwise",
                value: 2,
            }
        ],
    },
    {
        name: "Investigator",
        powerLevels: {
            combat: 0,
            social: 2,
            general: 3,
        },
        skills: [
            {
                name: "Charm",
                value: 2,
            },
            {
                name: "Coercion",
                value: 2,
            },
            {
                name: "Discipline",
                value: 3,
            },
            {
                name: "Perception",
                value: 3,
            },
            {
                name: "Streetwise",
                value: 3,
            },
            {
                name: "Survival",
                value: 3,
            },
            {
                name: "Vigilance",
                value: 3,
            }
        ],
    },
    {
        name: "Wrangler/Survivalist",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 3,
        },
        skills: [
            {
                name: "Athletics",
                value: 4,
            },
            {
                name: "Coordination",
                value: 2,
            },
            {
                name: "Perception",
                value: 3,
            },
            {
                name: "Ranged",
                value: 2,
            },
            {
                name: "Riding",
                value: 3,
            },
            {
                name: "Survival",
                value: 4,
            }
        ],
    },
    {
        name: "Cop/Town Guard",
        powerLevels: {
            combat: 1,
            social: 1,
            general: 0,
        },
        skills: [
            {
                name: "Coercion",
                value: 2,
            },
            {
                name: "Driving",
                value: 2,
            },
            {
                name: "Leadership",
                value: 2,
            },
            {
                name: "Melee",
                value: 2,
            },
            {
                name: "Ranged",
                value: 2,
            }
        ],
    }
];
