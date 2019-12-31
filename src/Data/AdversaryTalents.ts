/*
Important: The data and text in this file are not covered by the GPL
Descriptions and some names are copyright and owned by Fantasy Flight Games, no copyright
claim is intended by application author(s)
*/
import { IPowerLevels } from "../Classes/Adversary";

export interface IAdversaryTalent {
    name: string;
    book: string;
    page: string;
    description: string;
    powerLevels: IPowerLevels;
}

export const AdversaryTalents: IAdversaryTalent[] = [
    {
        name: "Adversary 1",
        description: "upgrade difficulty of all combat checks against this by 1",
        book: "Core",
        page: "131",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Adversary 2",
        description: "upgrade difficulty of all combat checks against this target twice",
        book: "Core",
        page: "131",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Adversary 3",
        description: "upgrade difficulty of all combat checks against this target three times",
        book: "Core",
        page: "131",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Animal Companion",
        description: "has a silhouette 0 animal companion; once per round, may spend a maneuver to direct the animal to perform one action and one maneuver during this character's turn",
        book: "Core",
        page: "77",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Barrel Roll",
        description: "when piloting a starfighter or air-plane of silhouette 3 or less, after suffering a hit, may suffer 3 system strain to reduce the damage by four as an incidental",
        book: "Core",
        page: "77",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Berserk",
        description: "Once per encounter, your character may use this talent. Until the end of the encounter or until they are incapacitated, your character adds <SU> <AD> <AD> to all melee combat checks they make. However, opponents add <SU> to all combat checks targeting your character. While berserk, your character cannot make ranged combat checks.",
        book: "Core",
        page: "75",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Brilliant Casting",
        description: "When casting a spell may spend one Story Point to use this talent to add <AD> equal to your character’s ranks in Knowledge to the results.",
        book: "EPG",
        page: "95",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Clever Retort",
        description: "once per encounter, add <TH> <TH> to another character’s social skill check",
        book: "Core",
        page: "73",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Coordinated Assault 3",
        description: "once per turn, may spend a maneuver to add <AD> to the results of all combat checks made by five allies within long range until the end of this character’s next turn",
        book: "Core",
        page: "75",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Distinctive Style",
        description: "When making a Computers check to hack a system or break into a secured network, before rolling, your character may use this talent to add <SU> <SU> <TH> <TH> to the results.",
        book: "Core",
        page: "78",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Dual Wielder",
        description: "Your character may use this talent to decrease the difficulty of the next combined combat check (see Two- Weapon Combat, on page 108) they make during the same turn by one.",
        book: "Core",
        page: "76",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Duelist",
        description: "Your character adds <B> to their melee combat checks while engaged with a single opponent. Your character adds <S> to their melee combat checks while engaged with three or more opponents.",
        book: "Core",
        page: "73",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Elementalist",
        description: "Whenever your character casts an Attack spell, they always add the chosen effect to the spell without increasing the difficulty.",
        book: "EPG",
        page: "95",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Explosive Casting",
        description: "When your character casts an attack spell, they treat the spell’s Blast quality as having a rating equal to twice your character’s ranks in Knowledge (instead of their ranks in Knowledge). When your character casts an Attack spell with the Blast effect, you may spend one Story Point to use this talent to trigger the spell’s Blast quality, instead of spending <AD> (even if the attack misses)",
        book: "EPG",
        page: "96",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Face of the Wild",
        description: "When your character casts a transform spell on themself using the Primal skill, you may spend a Story Point to have them use this talent to maintain the effects of the spell until the end of the encounter, without performing concentrate maneuvers.",
        book: "EPG",
        page: "97",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Field Commander",
        description: "Your character may use this talent to make an Average (<D> <D>) Leadership check. If successful, a number of allies equal to your character’s Presence may immediately suffer 1 strain to perform one maneuver (out of turn). If there are any questions as to which allies take their maneuvers first, your character is the final arbiter.",
        book: "Core",
        page: "78",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Flicker Step",
        description: "When your character casts a spell using the Arcana skill, they may use this talent to spend <AD> <AD> <AD> or <TR> to instantly vanish and reappear at any location within long range.",
        book: "EPG",
        page: "97",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Grenadier",
        description: "When your character makes a ranged combat check with a weapon that has the Blast item quality, you may spend one Story Point to use this talent to trigger the weapon’s Blast quality, instead of spending <AD> (even if the attack misses). In addition, your character treats grenades as having a range of medium.",
        book: "Core",
        page: "79",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Hamstring Shot",
        description: "Once per round, your character may use this talent to perform a ranged combat check against one non-vehicle target within range of the weapon used. If the check is successful, halve the damage inflicted by the attack (before reducing damage by the target’s soak). The target is immobilized until the end of its next turn.",
        book: "Core",
        page: "73",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Improved Field Commander",
        description: "Your character must have purchased the Field Commander talent to benefit from this talent. When your character uses the Field Commander talent, your character affects a number of allies equal to twice the character’s Presence. In addition, you may spend <TR> to allow one ally to suffer 1 strain to perform an action, instead of a maneuver.",
        book: "Core",
        page: "80",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Improved Inspiring Rhetoric",
        description: "Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent. Allies affected by your character’s Inspiring Rhetoric add <B> to all skill checks they make for a number of rounds equal to your character’s ranks in Leadership.",
        book: "Core",
        page: "76 and 78",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Improved Parry",
        description: "When your character suffers a hit from a melee combat check and uses Parry to reduce the damage from that hit, after the attack is resolved, you may spend <DR> or <TH> <TH> <TH> from the attacker’s check to use this talent. Then, your character automatically hits the attacker once with a Brawl or Melee weapon your character is wielding. The hit deals the weapon’s base damage, plus any damage from applicable talents or abilities. Your character can’t use this talent if the original attack incapacitates them.",
        book: "Core",
        page: "79",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Improved Scathing Tirade",
        description: "Enemies affected by your character’s Scathing Tirade add <S> to all skill checks they make for a number of rounds equal to your character’s ranks in Coercion.",
        book: "Core",
        page: "77 and 79",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 0,
        }
    },
    {
        name: "Indomitable",
        description: "Once per encounter, when your character would be incapacitated due to exceeding their wound or strain threshold, you may spend a Story Point to use this talent. Then, your character is not incapacitated until the end of their next turn. If your character reduces their strain or wounds to below their threshold before the end of their next turn, they are not incapacitated.",
        book: "Core",
        page: "81",
        powerLevels: {
            combat: 1,
            social: 1,
            general: 0,
        }
    },
    {
        name: "Lucky Strike",
        description: "When your character purchases this talent, choose one characteristic. After your character makes a successful combat check, you may spend one Story Point to use this talent to add damage equal to your character’s ranks in that characteristic to one hit of the combat check.",
        book: "Core",
        page: "76",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Master",
        description: "When you purchase this talent for your character, choose one skill. Once per round, your character may suffer 2 strain to use this talent to reduce the difficulty of the next check they make using that skill by two, to a minimum of Easy (<D>).",
        book: "Core",
        page: "81",
        powerLevels: {
            combat: 1,
            social: 1,
            general: 1,
        }
    },
    {
        name: "Masterful Casting",
        description: "",
        book: "EPG",
        page: "97",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Natural",
        description: "When your character purchases this talent, choose two skills. Once per session, your character may use this talent to reroll one skill check that uses one of those two skills.",
        book: "Core",
        page: "79",
        powerLevels: {
            combat: 1,
            social: 1,
            general: 1,
        }
    },
    {
        name: "Parry 3",
        description: "When this character suffers a hit from a melee combat check, after damage is calculated, but before soak is applied, they may suffer 3 strain to reduce the damage of the hit by five",
        book: "Core",
        page: "74",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Quick Draw",
        description: "Once per round on your character’s turn, they may use this talent to draw or holster an easily accessible weapon or item as an incidental. Quick Draw also reduces a weapon’s Prepare rating by one, to a minimum of one.",
        book: "Core",
        page: "74",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        }
    },
    {
        name: "Ruinous Repartee",
        description: "Once per encounter, your character may use this talent to make an opposed Charm or Coercion versus Discipline check targeting one character within medium range (or within earshot). If successful, the target suffers strain equal to twice your character’s Presence, plus one additional strain per <SU>. Your character heals strain equal to the strain inflicted.",
        book: "Core",
        page: "81",
        powerLevels: {
            combat: 0,
            social: 2,
            general: 0,
        }
    },
    {
        name: "Second Wind 4",
        description: "Once per encounter, your character may use this talent to heal an amount of strain equal to their ranks in Second Wind.",
        book: "Core",
        page: "81",
        powerLevels: {
            combat: 0,
            social: 1,
            general: 0,
        }
    },
    {
        name: "Strength of Faith",
        description: "Once per session, your character may use this talent to add <SU> equal to their ranks in Discipline and <AD> equal to their ranks in Willpower to the results of the next Divine skill check they make during this turn.",
        book: "EPG",
        page: "97",
        powerLevels: {
            combat: 1,
            social: 0,
            general: 1,
        }
    },
    {
        name: "Surgeon 2",
        description: "when making Medicine checks to heal wounds, heals 2 additional wounds",
        book: "Core",
        page: "74",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 1,
        }
    }

]
