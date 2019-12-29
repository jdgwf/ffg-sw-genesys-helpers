export interface IAdversaryEquipmentPackage {
    name: string;
    items: string[];
}

export const AdversaryEquipmentPackages: IAdversaryEquipmentPackage[] = [
    {
        name: "Small Beast or Creature",
        items: [
            "Teeth and claws (Brawl; Damage +2; Critical 3; Range [Engaged]; Vicious 1) or hooves and tusks (Brawl; Damage +2; Critical 4; Range [Engaged]; Knockdown, Stun 2)."
        ]
    },
    {
        name: "Large Beast or Creature",
        items: [
            "Gaping maw or razor claws (Brawl; Damage +4; Critical 2; Range [Engaged]; Vicious 3)",
            "Tentacles or thundering hooves (Brawl; Damage +5; Critical 4; Range [Engaged]; Knockdown, Concussive 1)."
        ]
    },
    {
        name: "Manual Laborer",
        items: [
            "Large farming implement (Melee [Heavy]; Damage +3; Critical 5; Range [Engaged]; Cumbersome 3, Inferior).",
            "Heavy clothes (+1 soak)"
        ]
    },
    {
        name: "Basic Citizen",
        items: [
            "Fists (Brawl; Damage +0; Critical 6; Range [Engaged]; Disorient 1, Knockdown).",
            "Clothing appropriate to the specific era",
            "average coin purse or wallet",
        ]
    },
    {
        name: "Blue Collar Worker",
        items: [
            "Improvised brawling weapon (Brawl; Damage +1; Critical 5; Range [Engaged]; Disorient 2, Inferior)",
            "Heavy clothing (+1 soak)",
            "tool belt full of tools (add [success] to checks this character makes to repair of fix something)",
            "wallet.",
        ]
    },
    {
        name: "Traveller",
        items: [
            "Walking staff (Melee [Heavy]; Damage +2; Critical 4; Range [Engaged]; Defensive 1, Disorient 2).",
            "Heavy cloak (1 defense)",
            "survival pack (removes [setback] from Survival or Perception checks this character makes)",
            "meager coin purse or wallet.",
        ]
    },
    {
        name: "Criminal",
        items: [
            "Concealable melee weapon (Melee [Light];Damage +1; Critical 2; Range [Engaged]; Pierce 2)",
            "Dark clothing (2 defense, adds [boost] to Stealth checks this character makes)",
            "thieves’ tools (add [advantage] to Skulduggery checks this character makes to open locks)",
            "backpack",
            "rope with grappling hook.",
        ]
    },
    {
        name: "Doctor",
        items: [
            "Sharp medical tool (Melee [Light]; Damage +0; Critical 1; Range [Engaged]).",
            "Clean clothing and face protection (add [boost] to Resilience checks made by this character to resist disease or airborne toxins)",
            "medicine kit (allows this character to perform Medicine checks to heal wounds and critical injuries without penalty; after this character makes a successful Medicine check to heal wounds heal one additional wound)",
            "notebook",
        ]
    },
    {
        name: "Noble",
        items: [
            "Dueling weapon (Melee [Light]; Damage +2; Critical 3; Range [Engaged]; Defensive 1).",
            "Fancy clothing (adds [advantage] to any social skill checks this character makes)",
            "signet of authority (adds [success] to any social checks this character makes when interacting with someone of a lesser social standing)",
            "important documents",
            "full coin purse or wallet.",
        ]
    },
    {
        name: "Basic Ranged Warrior",
        items: [
            "Two-handed ranged weapon (Ranged; Damage 8; Critical 3; Range [Long])",
            "one-handed backup weapon (Melee [Light]; Damage +2; Critical 3; Range [Engaged]; Vicious 1).",
            "Reinforced uniform or light armor (+1 soak)",
            "ammunition reload (may spend a maneuver to reload their ranged weapon after it runs out of ammo)",
            "survival pack (removes [setback] from Survival or Perception checks this character makes)",
            "1 painkiller.",
        ]
    },
    {
        name: "Heavy Ranged Warrior",
        items: [
            "Heavy rapid-firing ranged weapon (Gunnery; Damage 12; Critical 3; Range [Long]; Auto-Fire, Cumbersome 3, Vicious 2) or  powerful single-shot ranged weapon (Gunnery; Damage 20; Critical 2; Range [Extreme]; Blast 10, Breach 2, Cumbersome 4, Limited Ammo 1, Prepare 1).",
            "Heavy defensive armor (+3 soak)",
            "ammunition reload (may spend a maneuver to reload their ranged weapon after it runs out of ammo)",
            "backpack.",
        ]
    },
    {
        name: "Basic Melee Warrior",
        items: [
            "One-handed defensive melee weapon (Melee [Light]; Damage +2; Critical 4; Range [Engaged]; Defensive 1)",
            "shield (Melee  [Light]; Damage +0; Critical 6; Range [Engaged]; Defensive 1, Deflection 1, Inaccurate 1, Knockdown).",
            "Medium armor (+2 soak)",
            "satchel.",
        ]
    },
    {
        name: "Heavy Melee Warrior",
        items: [
            "Two-handed powerful melee weapon (Melee [Heavy]; Damage +4; Critical 3; Range [Engaged]; Cumbersome 3, Pierce 2, Vicious 1) or one-handed versatile melee weapon (Melee [Light]; Damage +3; Critical 2; Range [Engaged]; Defensive 1) and shield (Melee [Light]; Damage +0; Critical 6; Range [Engaged]; Defensive 1, Deflection 1, Inaccurate 1, Knockdown).",
            "Heavy armor (1 defense, +2 soak).",
        ]
    },
    {
        name: "Versatile Warrior",
        items: [
            "One-handed versatile melee weapon (Melee [Light]; Damage +3; Critical 2; Range [Engaged];Defensive 1)",
            "one-handed ranged weapon (Ranged [Light]; Damage 5; Critical 3; Range [Medium])",
            "Reinforced clothing (1 defense, +1 soak).",
        ]
    },
    {
        name: "Adventurer",
        items: [
            "One-handed ranged weapon (Ranged [Light];Damage 6; Critical 3; Range [Medium]; Accurate 1)",
            "backup brawling weapon (Brawl; Damage +1; Critical 4;Range [Engaged]; Disorient 3)",
            "Leather vest (+1 soak)",
            "backpack",
            "length of rope",
            "torch or other light source",
            "well-worn hat",
        ]
    },
    {
        name: "Bounty Hunter",
        items: [
            "Short-ranged entangling weapon (Ranged [Heavy]; Damage 4; Critical 5; Range [Short]; Disorient 3, Ensnare 3, Limited Ammo 1)",
            "stunning melee weapon (Melee [Light]; Damage +3; Critical 5; Range [Engaged]; Stun 4; Stun Damage)",
            "Medium armor (+2 soak)",
            "warrants for bounties",
            "restraints.",
        ]
    },
    {
        name: "Game Hunter",
        items: [
            "Long-ranged hunting weapon (Ranged [Heavy]; Damage 9; Critical 3; Range [Extreme]; Accurate 1, Limited Ammo 2; reduce the difficulty of combat checks made at long or extreme range by 1).",
            "Camouflage (2 defense, add [boost] to Stealth checks made by this character)",
            "survival pack (removes [setback] from Survival or Perception checks this character makes)",
            "ammunition reload (may spend a maneuver to reload their ranged weapon after it runs out of ammo).",
        ]
    },
    {
        name: "Law Enforcement Officer",
        items: [
            "One-handed ranged weapon (Ranged [Light]; Damage 5; Critical 3; Range [Medium]) or one-handed bludgeoning weapon (Melee [Light]; Damage +3; Critical 4; Range [Engaged]; Disorient 2)",
            "Light armor (+1 soak)",
            "badge of authority (adds [boost] to Coercion or Leadership checks this character makes)",
            "restraints",
            "torch or other light source."
        ]
    },
    {
        name: "Pilot",
        items: [
            "Concealable ranged weapon (Ranged [Light]; Damage 5; Critical 4; Range [Short]).",
            "Flight outfit",
            "emergency survival kit (removes [setback] from Survival or Perception checks this character makes)",
            "1 painkiller."
        ]
    },
    {
        name: "Flashy Outlaw",
        items: [
            "Intimidating ranged weapon (Ranged [Light];Damage 7; Critical 3; Range [Medium]; Inaccurate 1)",
            "Dashing coat with exposed holster (+1 soak,adds [advantage] to the results of all Charm and Coercion checks this character makes)",
            "fancy cape or hat (removes [setback] from all social skill checks this character makes)."
        ]
    },
    {
        name: "Defensive Magic User",
        items: [
            "Magically enhanced robes (3 defense)",
            "augmenting magical implement (when the this character casts a spell, may add the Additional Target and Additional Summon effects without increasing the difficulty. In addition, attack spells cast by this character increase their base damage by two)",
            "supernatural healing item (once per session, when this character heals wounds with a healing spell, increase the wounds healed by three)."
        ]
    },
    {
        name: "Offensive Magic User",
        items: [
            "One-handed melee weapon (Melee [Light];Damage +3; Critical 2; Range [Engaged]; Defensive 1)",
            "Robes (1 defense)",
            "offensive magical implement (when the this character casts a spell, the first Range effect they add doesn't increase the difficulty. In addition, attack spells cast by this character increase their base damage by four)."
        ]
    }
];