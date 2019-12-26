import { IPowerLevels } from "../Classes/Adversary";

export interface IAdversaryTalent {
    name: string;
    book: string;
    page: string;
    powerLevels: IPowerLevels;
}

export const AdversaryTalents: IAdversaryTalent[] = [
    {
        name: "Adversary 1",
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
        book: "Core",
        page: "131",
        powerLevels: {
            combat: 2,
            social: 0,
            general: 0,
        }
    },
    // TODO More talents
]
