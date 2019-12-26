import { IAdversaryCharacteristicArray, AdversaryCharacteristicArrays } from "../Data/AdversaryCharacteristicArrays";
import { IAdversaryTalent } from "../Data/AdversaryTalents";
import { IAdversarySkillPackage } from "../Data/AdversarySkillPackages";
import { IAdversarySpecialAbility } from "../Data/AdversarySpecialAbilities";
import { AdversaryTypes } from "../Data/AdversaryTypes";
import { IAdversarySoakDefWoundStrain } from "../Data/AdversarySoakDefWoundStrain";
import { ISkill, SkillList } from "../Data/SkillList";

export interface ICharacteristics {
    brawn: number;
    agility: number;
    intellect: number;
    cunning: number;
    willpower: number;
    presence: number;
}

export interface IPowerLevels {
    combat: number;
    social: number;
    general: number;
}


export interface IAdversarySave {
    name: string;
    adversaryType: string;
    description: string[];
    selectedAdversaryCharacteristicArray: IAdversaryCharacteristicArray;
    selectedSkillPackages: IAdversarySkillPackage[];
    selectedSoakDefWoundStrain: IAdversarySoakDefWoundStrain[];
    selectedSpecialAbilities: IAdversarySpecialAbility[];
    selectedTalents: IAdversaryTalent[];
}

export class Adversary {
    public name: string = "";
    public description: string[] = [];
    public adversaryType: string = AdversaryTypes[0];
    public selectedAdversaryCharacteristicArray: IAdversaryCharacteristicArray = AdversaryCharacteristicArrays[0];
    public selectedSkillPackages: IAdversarySkillPackage[] = [];
    public selectedSoakDefWoundStrain: IAdversarySoakDefWoundStrain[] = [];
    public selectedSpecialAbilities: IAdversarySpecialAbility[] = [];
    public selectedTalents: IAdversaryTalent[] = [];

    private _skills: ISkill[] = [];

    constructor( saveData: IAdversarySave | null ) {
        this.loadData( saveData );
    }

    loadData( saveData: IAdversarySave | null ) {

        for( let skill of SkillList ) {
            this._skills.push(
                {
                    name: skill.name,
                    attribute: skill.attribute,
                    value: 0,
                    book: skill.book,
                    page: skill.page,
                    settings: skill.settings,
                }
             )
        }

        if( saveData ) {
            this.name = saveData.name;
            this.description = saveData.description;
            this.adversaryType = saveData.adversaryType;
            this.selectedAdversaryCharacteristicArray = saveData.selectedAdversaryCharacteristicArray;
            this.selectedSkillPackages = saveData.selectedSkillPackages;
            this.selectedSoakDefWoundStrain = saveData.selectedSoakDefWoundStrain;
            this.selectedSpecialAbilities = saveData.selectedSpecialAbilities;
            this.selectedTalents = saveData.selectedTalents;
        }
    }

    exportData(): IAdversarySave {
        let exportData: IAdversarySave = {
            name: this.name,
            description: this.description,
            adversaryType: this.adversaryType,
            selectedAdversaryCharacteristicArray: this.selectedAdversaryCharacteristicArray,
            selectedSkillPackages: this.selectedSkillPackages,
            selectedSoakDefWoundStrain: this.selectedSoakDefWoundStrain,
            selectedSpecialAbilities: this.selectedSpecialAbilities,
            selectedTalents: this.selectedTalents,
        }

        return exportData;
    }

    public getSoak(): number {
        // TODO
        return 0;
    }
    public getWoundThreshold(): number {
        // TODO
        return 0;
    }
    public getStrainThreshold(): number {
        // TODO
        return 0;
    }
    public getRangedDefense(): number {
        // TODO
        return 0;
    }
    public getMeleeDefense(): number {
        // TODO
        return 0;
    }

    private _getAttributeValue( attribute: string ): number {
        switch( attribute.toLowerCase().trim() ) {
            case "brawn":
                return this.getBrawn();
            case "agility":
                return this.getAgility();
            case "intellect":
                return this.getIntellect();
            case "cunning":
                return this.getCunning();
            case "willpower":
                return this.getWillpower();
            case "presence":
                return this.getPresence();
        }
        return 0;
    }

    public getBrawn(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.brawn;
    }
    public getAgility(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.agility;
    }
    public getIntellect(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.intellect;
    }
    public getCunning(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.cunning;
    }
    public getWillpower(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.willpower;
    }
    public getPresence(): number {
        return this.selectedAdversaryCharacteristicArray.characteristics.presence;
    }

/*
    private _setSkill(
        skillName: string,
        newValue: number,
        attribute: string
    ): ISkill {
        let foundSkill = false;

        for( let skill of this._skills ) {
            if( skill.name.toLowerCase().trim() === skillName.toLowerCase().trim() ) {
                foundSkill = true;
                if( skill.value < newValue ) {
                    skill.value = newValue;
                }
                return skill;
            }
        }

        let newSkill: ISkill = {
            name: skillName,
            value: newValue,
            attribute: attribute,
            book: "Custom",
            settings: [],
            page: "",
        }

        this._skills.push( newSkill );

        return newSkill;

    }
*/
    private _setSkills() {

        for( let skill of this._skills ) {
            skill.value = 0;
            for( let skillPackage of this.selectedSkillPackages ) {
                for( let packageSkill of skillPackage.skills ) {
                    if( skill.name.toLowerCase().trim() === packageSkill.name.toLowerCase().trim() ) {
                        if( skill.value < packageSkill.value ) {
                            skill.value = packageSkill.value;
                        }
                    }
                }
            }
        }

    }

    public calc() {

    }

    public getSkillList(
        valuesAsDice: boolean = false,
    ): string {

        this._setSkills();

        let activeSkills: ISkill[] = [];

        for( let skill of this._skills ) {
            if( skill.value > 0 ) {
                activeSkills.push( skill );
            }
        }

        activeSkills.sort( (a: ISkill, b: ISkill) => {
            if( a.name > b.name ) {
                return 1;
            } else if( a.name < b.name ) {
                return -1;
            } else {
                return 0;
            }
        })

        let returnValue: string = "";
        for( let skill of activeSkills ) {
            if( valuesAsDice === false ) {
                returnValue += skill.name + ": " + skill.value.toString() + ", ";
            } else {
                let abilityValue = this._getAttributeValue( skill.attribute );
                let maxValue = 0;
                let minValue = 0;
                if( abilityValue > skill.value  ) {
                    maxValue =  abilityValue;
                    minValue =  skill.value;
                } else {
                    maxValue =  skill.value;
                    minValue =  abilityValue;
                }

                let dieValue = "";

                for( let lCount = 0; lCount < maxValue; lCount++ ) {
                    if( lCount < minValue ) {
                        dieValue += '<img class="inline-die" src="./img/proficiency-die.png" alt="proficiency die" />';
                    } else {
                        dieValue += '<img class="inline-die" src="./img/ability-die.png" alt="ability die" />';
                    }
                }

                returnValue += skill.name + ": " + dieValue + ", ";

            }
        }
        if( returnValue ) {
            returnValue = returnValue.substr( 0, returnValue.length - 2 );
        } else {
            returnValue = "No Skills"
        }

        return returnValue;
    }

    public getTalentList(
        valuesAsDice: boolean = false,
    ): string {
        let returnValue: string = "";
        return returnValue;
    }

    public getAbilitiesList(
        valuesAsDice: boolean = false,
    ): string {
        let returnValue: string = "";
        return returnValue;
    }

    public getEquipmentList(
        valuesAsDice: boolean = false,
    ): string {
        let returnValue: string = "";
        return returnValue;
    }
}