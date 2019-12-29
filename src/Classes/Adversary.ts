import { IAdversaryCharacteristicArray, AdversaryCharacteristicArrays } from "../Data/AdversaryCharacteristicArrays";
import { IAdversaryTalent } from "../Data/AdversaryTalents";
import { IAdversarySkillPackage } from "../Data/AdversarySkillPackages";
import { IAdversarySpecialAbility } from "../Data/AdversarySpecialAbilities";
import { AdversaryTypes } from "../Data/AdversaryTypes";
import { IAdversarySoakDefWoundStrain } from "../Data/AdversarySoakDefWoundStrain";
import { ISkill, SkillList } from "../Data/SkillList";
import { Gear } from "./Gear";

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
    equipment: string[];
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
    public equipment: string[] = [];

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
            if( saveData.equipment ) {
                this.equipment = saveData.equipment;
            }
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
            equipment: this.equipment,
        }

        return exportData;
    }

    public getSoak(): number {
        // TODO
        let soakValue = this.getBrawn();

        // for( let equipment of this.selectedEquipment ) {

        // }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            if( advSoakDefWoundStrain.derivedAttribute.soakThreshold ) {
                soakValue += advSoakDefWoundStrain.derivedAttribute.soakThreshold;
            }
        }

        for( let item of this.getEquipmentObjs() ) {
            soakValue += +item.soak;
        }

        return soakValue;
    }
    public getWoundThreshold(): number {
        let woundThreshold = 0;
        switch( this.adversaryType.toLowerCase().trim() ) {
            case "minion": {
                if( this.getBrawn() < 2 ) {
                    woundThreshold = 3;
                } else {
                    woundThreshold = 5;
                }
                break;
            }
            case "rival": {
                woundThreshold = 8;
                break;
            }
            case "nemesis": {
                woundThreshold = 12 + this.getBrawn();
                break;
            }
        }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            if( advSoakDefWoundStrain.derivedAttribute.woundThreshold ) {
                woundThreshold += advSoakDefWoundStrain.derivedAttribute.woundThreshold;
            }
        }

        return woundThreshold;
    }

    public getStrainThreshold(): number {
        let strainThreshold = 0;
        if( this.adversaryType.toLowerCase().trim() === "nemesis" ) {
            strainThreshold = 10 + this.getWillpower();
        }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            if( advSoakDefWoundStrain.derivedAttribute.strainThreshold ) {
                strainThreshold += advSoakDefWoundStrain.derivedAttribute.strainThreshold;
            }
        }

        return strainThreshold;
    }

    public getRangedDefense(): number {
        // TODO
        let rangedDefenseValue = 0;

        // for( let equipment of this.selectedEquipment ) {

        // }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            if( advSoakDefWoundStrain.derivedAttribute.rangedDefense ) {
                rangedDefenseValue += advSoakDefWoundStrain.derivedAttribute.rangedDefense;
            }
        }


        for( let item of this.getEquipmentObjs() ) {
            rangedDefenseValue += +item.defense;
        }

        return rangedDefenseValue;
    }

    public getMeleeDefense(): number {
        // TODO
        let meleeDefenseValue = 0;

        // for( let equipment of this.selectedEquipment ) {

        // }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            if( advSoakDefWoundStrain.derivedAttribute.meleeDefense ) {
                meleeDefenseValue += advSoakDefWoundStrain.derivedAttribute.meleeDefense;
            }
        }

        for( let item of this.getEquipmentObjs() ) {
            meleeDefenseValue += +item.defense;
        }

        return meleeDefenseValue;
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
                        dieValue += '[proficiency]';
                    } else {
                        dieValue += '[ability]';
                    }
                }

                returnValue += "<div class=\"inline-block\">" + skill.name + ": " + dieValue + ",</div> ";

            }
        }
        if( returnValue ) {
            if( valuesAsDice )  {
                returnValue = returnValue.substr( 0, returnValue.length - 8 );
                returnValue += "</div>";
            } else  {
                returnValue = returnValue.substr( 0, returnValue.length - 2 );
            }

        } else {
            returnValue = "No Skills"
        }

        return returnValue;
    }

    public getPowerLevel(): IPowerLevels {
        let returnValue = {
            combat: 0,
            social: 0,
            general: 0,
        }

        if( this.selectedAdversaryCharacteristicArray ) {
            // console.log("this.selectedAdversaryCharacteristicArray.powerLevels", this.selectedAdversaryCharacteristicArray.powerLevels)
            returnValue.combat += this.selectedAdversaryCharacteristicArray.powerLevels.combat;
            returnValue.general += this.selectedAdversaryCharacteristicArray.powerLevels.general;
            returnValue.social += this.selectedAdversaryCharacteristicArray.powerLevels.social;
        }

        for( let advSoakDefWoundStrain of this.selectedSoakDefWoundStrain ) {
            // console.log("this.selectedSoakDefWoundStrain.powerLevels", advSoakDefWoundStrain.powerLevels)
            returnValue.combat += advSoakDefWoundStrain.powerLevels.combat;
            returnValue.general += advSoakDefWoundStrain.powerLevels.general;
            returnValue.social += advSoakDefWoundStrain.powerLevels.social;
        }

        for( let skillPackage of this.selectedSkillPackages ) {
            // console.log("this.selectedSkillPackages.powerLevels", skillPackage.powerLevels)
            returnValue.combat += skillPackage.powerLevels.combat;
            returnValue.general += skillPackage.powerLevels.general;
            returnValue.social += skillPackage.powerLevels.social;
        }

        for( let talent of this.selectedTalents ) {
            // console.log("this.selectedTalents.powerLevels", talent.powerLevels)
            returnValue.combat += talent.powerLevels.combat;
            returnValue.general += talent.powerLevels.general;
            returnValue.social += talent.powerLevels.social;
        }

        for( let specialAbility of this.selectedSpecialAbilities ) {
            // console.log("this.advSoakDefWoundStrain.powerLevels", specialAbility.powerLevels)
            returnValue.combat += specialAbility.powerLevels.combat;
            returnValue.general += specialAbility.powerLevels.general;
            returnValue.social += specialAbility.powerLevels.social;
        }

        returnValue.combat = this.getEquipmentPowerLevel().combat;
        returnValue.social = this.getEquipmentPowerLevel().social;
        returnValue.general = this.getEquipmentPowerLevel().general;

        if( returnValue.combat  < 1 ) {
            returnValue.combat = 1
        }

        if( returnValue.social  < 1 ) {
            returnValue.social = 1
        }

        if( returnValue.general  < 1 ) {
            returnValue.general = 1
        }


        return returnValue;
    }

    public getTalentList(): string {
        let returnValue: string = "";
        for( let talent of this.selectedTalents ) {
           returnValue += talent.name + " (" + talent.description + "), ";
        }
        if( returnValue ) {
            returnValue = returnValue.substr( 0, returnValue.length - 2 );
        }
        return returnValue;
    }

    public getAbilitiesList(): string {
        let returnValue: string = "";

        for( let ability of this.selectedSpecialAbilities ) {
            returnValue += ability.name + " (" + ability.description + "), ";
        }
        if( returnValue ) {
            returnValue = returnValue.substr( 0, returnValue.length - 2 );
        }

        return returnValue;
    }

    public getEquipmentList(): string {
        let gearItems: string[] = [];


        for( let item of this.equipment ) {
            if( item.trim() ) {
                if( item.indexOf( " or ") > -1 ) {
                    let itemObjs: string[]= [];
                    let pushToList = true;

                    for( let itemSplit of item.split(" or ")) {
                        if( itemSplit.indexOf( " and ") > -1 ) {
                            let andObjs: string[]= [];
                            for( let andSplit of itemSplit.split(" and ")) {
                                let gearObj = new Gear(andSplit);
                                andObjs.push(gearObj.exportString())
                                if( gearObj.type === "weapon" )
                                    pushToList = false;
                            }

                            itemObjs.push( andObjs.join(" and ")  );
                        } else {
                            let gearObj = new Gear(itemSplit);
                            if( gearObj.type !== "weapon" ){
                                itemObjs.push(gearObj.exportString())
                                pushToList = true;
                            }
                        }
                    }
                    if( pushToList )
                        gearItems.push( itemObjs.join(" or ")  );
                } else {
                    let gearObj = new Gear(item);
                    if( gearObj.type !== "weapon" )
                        gearItems.push( gearObj.exportString() );
                }
            }
        }
        return gearItems.join(", ");
    }

    public getWeaponList(): string {
        let gearItems: string[] = [];


        for( let item of this.equipment ) {
            if( item.trim() ) {
                if( item.indexOf( " or ") > -1 ) {
                    let itemObjs: string[]= [];
                    let pushToList = true;

                    for( let itemSplit of item.split(" or ")) {
                        if( itemSplit.indexOf( " and ") > -1 ) {
                            let andObjs: string[]= [];
                            for( let andSplit of itemSplit.split(" and ")) {
                                let gearObj = new Gear(andSplit);
                                andObjs.push(gearObj.exportString())
                                if( gearObj.type !== "weapon" )
                                    pushToList = false;
                            }

                            itemObjs.push( andObjs.join(" and ")  );
                        } else {
                            let gearObj = new Gear(itemSplit);
                            if( gearObj.type === "weapon" ){
                                itemObjs.push(gearObj.exportString())
                                pushToList = true;
                            }
                        }
                    }
                    if( pushToList )
                        gearItems.push( itemObjs.join(" or ")  );
                } else {
                    let gearObj = new Gear(item);
                    if( gearObj.type === "weapon" )
                        gearItems.push( gearObj.exportString() );
                }
            }
        }
        return gearItems.join(", ");
    }

    private _parseEquipmentItemPowerLevel( gearObj: Gear): IPowerLevels {
        let returnPowerLevel: IPowerLevels = {
            combat: 0,
            social: 0,
            general: 0,
        };


        if( +gearObj.damage < 8 ) {
            returnPowerLevel.combat += 0;
        }

        if( +gearObj.damage > 7 ) {
            returnPowerLevel.combat += 1;
        }

        if( +gearObj.soak < 2 ) {
            returnPowerLevel.combat += 0;
        }

        if( +gearObj.soak > 1  ) {
            returnPowerLevel.combat += 1;
        }

        if( gearObj.type === "armor" ) {
            for( let qual of gearObj.qualities) {
                if( qual.toLowerCase().indexOf("reinforced") > -1 ) {
                    returnPowerLevel.combat += 1;
                }
            }
        }

        // TODO check for [advantage] or [setback] and general/social skill boosts

        return returnPowerLevel
    }

    getEquipmentPowerLevel(): IPowerLevels {
        let returnPowerLevel: IPowerLevels = {
            combat: 0,
            social: 0,
            general: 0,
        };

        let combinedSoak = 0;

        for( let item of this.equipment ) {
            if( item.trim() ) {
                if( item.replace(/ *\([^)]*\) */g, "").indexOf( " or ") > -1 ) {
                    let itemValues: IPowerLevels[]= [];

                    for( let itemSplit of item.split(" or ")) {
                        if( itemSplit.replace(/ *\([^)]*\) */g, "").indexOf( " and ") > -1 ) {
                            for( let andSplit of itemSplit.split(" and ")) {
                                let gearObj = new Gear(andSplit);
                                itemValues.push(  this._parseEquipmentItemPowerLevel( gearObj ) );
                                combinedSoak += +gearObj.soak;
                            }
                        } else {
                            let gearObj = new Gear(itemSplit);
                            let value = this._parseEquipmentItemPowerLevel( gearObj );
                            combinedSoak += +gearObj.soak;
                            itemValues.push( value );
                        }
                    }

                    let highestValue: IPowerLevels = {
                        combat: 0,
                        social: 0,
                        general: 0,
                    }

                    for( let item of itemValues ) {
                        if( item.combat > highestValue.combat )
                            highestValue.combat = item.combat
                        if( item.social > highestValue.social )
                            highestValue.social = item.social
                        if( item.general > highestValue.general )
                            highestValue.general = item.general
                    }
                    returnPowerLevel.combat += highestValue.combat;
                    returnPowerLevel.social += highestValue.social;
                    returnPowerLevel.general += highestValue.general;
                } else {
                    let gearObj = new Gear(item);
                    let value = this._parseEquipmentItemPowerLevel( gearObj );

                    returnPowerLevel.combat += value.combat;
                    returnPowerLevel.social += value.social;
                    returnPowerLevel.general += value.general;
                    combinedSoak += +gearObj.soak;
                }
            }
        }

        if( combinedSoak > 6 ) {
            returnPowerLevel.combat += 1;
        }

        return returnPowerLevel;
    }


    getEquipmentObjs(): Gear[] {
        let returnGear: Gear[] = [];


        for( let item of this.equipment ) {
            if( item.trim() ) {
                if( item.replace(/ *\([^)]*\) */g, "").indexOf( " or ") > -1 ) {
                    let itemValues: Gear[]= [];

                    for( let itemSplit of item.split(" or ")) {
                        if( itemSplit.replace(/ *\([^)]*\) */g, "").indexOf( " and ") > -1 ) {
                            for( let andSplit of itemSplit.split(" and ")) {
                                let gearObj = new Gear(andSplit);
                                returnGear.push( gearObj );
                            }
                        } else {
                            let gearObj = new Gear(itemSplit);
                            returnGear.push( gearObj );
                        }
                    }


                } else {
                    let gearObj = new Gear(item);
                    returnGear.push( gearObj );
                }
            }
        }

        return returnGear;
    }

    public addTalent( selectedTalent: IAdversaryTalent ) {
        this.selectedTalents.push( selectedTalent );
    }

}