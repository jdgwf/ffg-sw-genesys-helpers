export interface IAdversaryEquipmentPackage {
    name: string;
    items: string[];
}

export const AdversaryEquipmentPackages: IAdversaryEquipmentPackage[] = [
    {
        name: "Small Beast or Creature",
        items: [
            "Teeth/claws (Brawl; Damage +2; Critical 3; Range [Engaged]; Vicious 1) or hooves/tusks (Brawl; Damage +2; Critical 4; Range [Engaged]; Knockdown, Stun 2)."
        ]
    },
    {
        name: "Large Beast or Creature",
        items: [
            "Gaping maw/razor claws (Brawl; Damage +4; Critical 2; Range [Engaged]; Vicious 3)",
            "Tentacles/thundering hooves (Brawl; Damage +5; Critical 4; Range [Engaged]; Knockdown, Concussive 1)."
        ]
    },
    {
        name: "Manual Laborer",
        items: [
            "Large farming implement (Melee [Heavy]; Damage +3; Critical 5; Range [Engaged]; Cumbersome 3, Inferior).",
            "Heavy clothes (+1 soak)"
        ]
    }
];