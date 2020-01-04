import React, { FormEvent } from 'react';
import './AdversaryCreator.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Adversary, IAdversarySave } from '../Classes/Adversary';
import { AdversaryTypes } from '../Data/AdversaryTypes';
import { AdversaryCharacteristicArrays, IAdversaryCharacteristicArray } from '../Data/AdversaryCharacteristicArrays';
import { AdversarySoakDefWoundStrain, IAdversarySoakDefWoundStrain } from '../Data/AdversarySoakDefWoundStrain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';
import { AdversarySkillPackages, IAdversarySkillPackage } from '../Data/AdversarySkillPackages';
import { AdversaryTalents, IAdversaryTalent } from '../Data/AdversaryTalents';
import { AdversarySpecialAbilities, IAdversarySpecialAbility } from '../Data/AdversarySpecialAbilities';
import SanitizedHTML from '../Components/SanitizedHTML';
import domtoimage from 'dom-to-image';
import { replaceDieTags, copyObject } from '../utils';
import { AdversaryEquipmentPackages, IAdversaryEquipmentPackage } from '../Data/AdversaryEquipmentPackages';
import NumericalDropDown from '../Components/NumericalDropdown';
import { Modal } from 'react-bootstrap';
import ShortCodesLegend from '../Components/ShortCodesLegend';
import WoundDots from '../Components/WoundDots';

export default class AdversaryCreator extends React.Component<IAdversaryCreatorProps, IAdversaryCreatorState> {

    constructor(props: IAdversaryCreatorProps) {
        super(props);

        let lsData = localStorage.getItem("editing_adversary");
        let editData: IAdversarySave | null = null
        if( lsData ) {
          editData = JSON.parse( lsData );
        }

        let workingEdit =  new Adversary(editData);

        let lsValuesAsDice = localStorage.getItem("values_as_dice");
        let valuesAsDice: boolean = false;
        if( lsValuesAsDice && +lsValuesAsDice > 0) {
          valuesAsDice = true;
        }


        let lsShowWoundDots = localStorage.getItem("show_wound_dots");
        let showWoundDots: boolean = false;
        if( lsShowWoundDots && +lsShowWoundDots > 0) {
          showWoundDots = true;
        }

        let lsNumberMinions = localStorage.getItem("number_minions");
        let numberMinions: number = 1;
        if( lsNumberMinions && +lsNumberMinions > 0) {
          numberMinions = +lsNumberMinions;
        }


        let equipmentText: string = workingEdit.equipment.join("\n");

        this.state = {
            updated: false,
            workingEdit: workingEdit,
            soakDefWoundStrainSelect: null,
            skillPackageSelect: null,
            talentSelect: null,
            specialAbilitiesSelect: null,
            valuesAsDice: valuesAsDice,
            equipmentText: equipmentText,
            equipmentSelect: "",
            editSoakDefWoundStrain: null,
            editSoakDefWoundStrainIndex: -1,

            editSkills: null,
            editSkillsIndex: -1,

            editTalents: null,
            editTalentsIndex: -1,

            editSpecialAbilities: null,
            editSpecialAbilitiesIndex: -1,

            showWoundDots: showWoundDots,

            numberMinions: numberMinions,
        }
        this.updateName = this.updateName.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateCharacteristicArray = this.updateCharacteristicArray.bind(this);
        this.updateSoakDefWoundStrainSelect = this.updateSoakDefWoundStrainSelect.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.addSelectedSoakDefWoundStrain = this.addSelectedSoakDefWoundStrain.bind(this);
        this.addSelectedSkillPackage = this.addSelectedSkillPackage.bind(this);
        this.updateSkillPackageSelect = this.updateSkillPackageSelect.bind(this);
        this.updateSoakDefWoundStrainSelect = this.updateSoakDefWoundStrainSelect.bind(this);
        this.addSelectedTalent = this.addSelectedTalent.bind(this);
        this.updateTalentSelect = this.updateTalentSelect.bind(this);
        this.addSelectedSpecialAbility = this.addSelectedSpecialAbility.bind(this);
        this.updateSpecialAbilitySelect = this.updateSpecialAbilitySelect.bind(this);

        this.removeSpecialAbility = this.removeSpecialAbility.bind(this);
        this.removeSoakDefWoundStrain = this.removeSoakDefWoundStrain.bind(this);
        this.removeSkillPackage = this.removeSkillPackage.bind(this);
        this.removeTalent = this.removeTalent.bind(this);

        this.toggleValuesAsDice = this.toggleValuesAsDice.bind(this);
        this.updateEquipmentText = this.updateEquipmentText.bind(this);
        this.updateEquipmentSelect = this.updateEquipmentSelect.bind(this);
        this.setEquipment = this.setEquipment.bind(this);

        this.clearAdversary = this.clearAdversary.bind(this);
        this.updateCharacteristicArrayItem = this.updateCharacteristicArrayItem.bind(this);
        this.updateCharacteristicArrayPLItem = this.updateCharacteristicArrayPLItem.bind(this);

        this.closeSoakDefWoundStrain = this.closeSoakDefWoundStrain.bind(this);
        this.editSoakDefWoundStrain = this.editSoakDefWoundStrain.bind(this);

        this.closeEditSkills = this.closeEditSkills.bind(this);
        this.editSkills = this.editSkills.bind(this);

        this.closeEditTalents = this.closeEditTalents.bind(this);
        this.editTalents = this.editTalents.bind(this);

        this.closeEditSpecialAbilities = this.closeEditSpecialAbilities.bind(this);
        this.editSpecialAbilities = this.editSpecialAbilities.bind(this);

        this._refreshImages = this._refreshImages.bind(this);

        this.updateSoakDefWoundStrainPL = this.updateSoakDefWoundStrainPL.bind(this);
        this.updateSoakDefWoundStrainDerivedAttribute = this.updateSoakDefWoundStrainDerivedAttribute.bind(this);
        this.saveSoakDefWoundStrain = this.saveSoakDefWoundStrain.bind(this);
        this.updateSoakDefWoundStrainName = this.updateSoakDefWoundStrainName.bind(this);

        this.updateTalentPL = this.updateTalentPL.bind(this);
        this.updateTalentDescription = this.updateTalentDescription.bind(this);
        this.saveTalent = this.saveTalent.bind(this);
        this.updateTalentName = this.updateTalentName.bind(this);

        this.updateSpecialAbilitiesPL = this.updateSpecialAbilitiesPL.bind(this);
        this.updateSpecialAbilitiesDescription = this.updateSpecialAbilitiesDescription.bind(this);
        this.saveSpecialAbilities = this.saveSpecialAbilities.bind(this);
        this.updateSpecialAbilitiesName = this.updateSpecialAbilitiesName.bind(this);

        this.updateSkillsPL = this.updateSkillsPL.bind(this);
        this.updateSkillsName = this.updateSkillsName.bind(this);
        this.saveSkillPackage = this.saveSkillPackage.bind(this);

        this.updateSkillItemName = this.updateSkillItemName.bind(this);
        this.updateSkillItemValue = this.updateSkillItemValue.bind(this);
        this.removeSkillIndex = this.removeSkillIndex.bind(this);
        this.addSkill = this.addSkill.bind(this);

        this.togglePowerLevelOverride = this.togglePowerLevelOverride.bind(this);
        this.updatePowerLevelOverride = this.updatePowerLevelOverride.bind(this);

        this.toggleShowWoundDots = this.toggleShowWoundDots.bind(this);
        this.setNumberMinions = this.setNumberMinions.bind(this);


        this.props.appGlobals.makeDocumentTitle("AdversaryCreator");
    }

    addSkill() {
      if( this.state.editSkills ) {
        let editSkills = this.state.editSkills;

        editSkills.skills.push({
          name: "New SKill",
          value: 1,
        })

        this.setState({
          editSkills: editSkills,
        })
      }
    }

    removeSkillIndex( skillIndex: number ) {
      if( this.state.editSkills ) {
        let editSkills = this.state.editSkills;

        if( editSkills.skills.length > skillIndex ) {
          editSkills.skills.splice(skillIndex, 1)
        }

        this.setState({
          editSkills: editSkills,
        })
      }
    }

    updateSkillItemName( skillIndex: number, newValue: string ) {
      if( this.state.editSkills ) {
        let editSkills = this.state.editSkills;

        if( editSkills.skills.length > skillIndex ) {
          editSkills.skills[skillIndex].name = newValue;
        }

        this.setState({
          editSkills: editSkills,
        })
      }
    }

    updateSkillItemValue( skillIndex: number, newValue: number ) {
      if( this.state.editSkills ) {
        let editSkills = this.state.editSkills;

        if( editSkills.skills.length > skillIndex ) {
          editSkills.skills[skillIndex].value = newValue;
        }

        this.setState({
          editSkills: editSkills,
        })
      }
    }

    closeEditTalents() {
      this.setState({
        editTalents: null,
        editSoakDefWoundStrainIndex: -1,
      })
    }

    editTalents( itemIndex: number = -1 ) {
      let editTalents: IAdversaryTalent = {
        name: "New Item",
        book: "Custom",
        page: "",
        description: "",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
      };
      if( itemIndex === -1 || itemIndex > this.state.workingEdit.selectedTalents.length ) {
        itemIndex = -1;
      } else {
        editTalents = copyObject(this.state.workingEdit.selectedTalents[ itemIndex ]);
      }
      this.setState({
        editTalents: editTalents,
        editTalentsIndex: itemIndex,
      })
    }

    closeEditSpecialAbilities() {
      this.setState({
        editSpecialAbilities: null,
        editSpecialAbilitiesIndex: -1,
      })
    }

    editSpecialAbilities( itemIndex: number = -1 ) {
      let editSpecialAbilities: IAdversarySpecialAbility = {
        name: "New Item",
        description: "",
        examples: "",
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
      }
      if( itemIndex === -1 || itemIndex > this.state.workingEdit.selectedSpecialAbilities.length ) {
        itemIndex = -1;
      } else {
        editSpecialAbilities = copyObject(this.state.workingEdit.selectedSpecialAbilities[ itemIndex ]);
      }
      this.setState({
        editSpecialAbilities: editSpecialAbilities,
        editSpecialAbilitiesIndex: itemIndex,
      })
    }

    saveSoakDefWoundStrain( event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(  this.state.editSoakDefWoundStrain ) {
        let obj = this.state.workingEdit;

        if( this.state.editSoakDefWoundStrainIndex > -1 ) {
          if( obj.selectedSoakDefWoundStrain.length > this.state.editSoakDefWoundStrainIndex ) {
            obj.selectedSoakDefWoundStrain[ this.state.editSoakDefWoundStrainIndex ] = this.state.editSoakDefWoundStrain;
          }
        } else {
          obj.selectedSoakDefWoundStrain.push( this.state.editSoakDefWoundStrain );
        }

        this.setState({
          workingEdit: obj,
        });

        this.saveLS();
        this.closeSoakDefWoundStrain();
      }

    }

    saveSkillPackage( event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(  this.state.editSkills ) {
        let obj = this.state.workingEdit;

        if( this.state.editSkillsIndex > -1 ) {
          if( obj.selectedSkillPackages.length > this.state.editSkillsIndex ) {
            obj.selectedSkillPackages[ this.state.editSkillsIndex ] = this.state.editSkills;
          }
        } else {
          obj.selectedSkillPackages.push( this.state.editSkills );
        }

        this.setState({
          workingEdit: obj,
        });

        this.saveLS();
        this.closeEditSkills();
      }

    }

    saveSpecialAbilities( event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(  this.state.editSpecialAbilities ) {
        let obj = this.state.workingEdit;

        if( this.state.editSpecialAbilitiesIndex > -1 ) {
          if( obj.selectedSpecialAbilities.length > this.state.editSpecialAbilitiesIndex ) {
            obj.selectedSpecialAbilities[ this.state.editSpecialAbilitiesIndex ] = this.state.editSpecialAbilities;
          }
        } else {
          obj.selectedSpecialAbilities.push( this.state.editSpecialAbilities );
        }

        this.setState({
          workingEdit: obj,
        });

        this.saveLS();
        this.closeEditSpecialAbilities();
      }

    }

    saveTalent( event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(  this.state.editTalents ) {
        let obj = this.state.workingEdit;

        if( this.state.editTalentsIndex > -1 ) {
          if( obj.selectedTalents.length > this.state.editTalentsIndex ) {
            obj.selectedTalents[ this.state.editTalentsIndex ] = this.state.editTalents;
          }
        } else {
          obj.selectedTalents.push( this.state.editTalents );
        }

        this.setState({
          workingEdit: obj,
        });

        this.saveLS();
        this.closeEditTalents();
      }

    }

    closeEditSkills() {
      this.setState({
        editSkills: null,
        editSkillsIndex: -1,
      })
    }

    editSkills( itemIndex: number = -1 ) {
      let editSkills: IAdversarySkillPackage = {
        name: "New Item",
        skills: [],
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
      }
      if( itemIndex === -1 || itemIndex > this.state.workingEdit.selectedSkillPackages.length ) {
        itemIndex = -1;
      } else {
        editSkills = copyObject(this.state.workingEdit.selectedSkillPackages[ itemIndex ]);
      }
      this.setState({
        editSkills: editSkills,
        editSkillsIndex: itemIndex,
      })
    }

    closeSoakDefWoundStrain() {
      this.setState({
        editSoakDefWoundStrain: null,
        editSoakDefWoundStrainIndex: -1,
      })
    }

    editSoakDefWoundStrain( itemIndex: number = -1 ) {
      let editSoakDefWoundStrain: IAdversarySoakDefWoundStrain = {
        name: "New Item",
        derivedAttribute: {
          soakThreshold: 0,
          woundThreshold: 0,
          meleeDefense: 0,
          rangedDefense: 0,
          strainThreshold: 0,
        },
        powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
        },
        examples: ""
      }
      if( itemIndex === -1 || itemIndex > this.state.workingEdit.selectedSoakDefWoundStrain.length ) {
        itemIndex = -1;
      } else {
        editSoakDefWoundStrain = copyObject(this.state.workingEdit.selectedSoakDefWoundStrain[ itemIndex ]);
      }
      this.setState({
        editSoakDefWoundStrain: editSoakDefWoundStrain,
        editSoakDefWoundStrainIndex: itemIndex,
      })
    }

    updateCharacteristicArrayItem( newValue: number, attribute: string ): void {
      let obj = this.state.workingEdit;
      switch( attribute ) {
        case "brawn": {
          obj.selectedAdversaryCharacteristicArray.characteristics.brawn = newValue;
          break;
        }
        case "agility": {
          obj.selectedAdversaryCharacteristicArray.characteristics.agility = newValue;
          break;
        }
        case "intellect": {
          obj.selectedAdversaryCharacteristicArray.characteristics.intellect = newValue;
          break;
        }
        case "cunning": {
          obj.selectedAdversaryCharacteristicArray.characteristics.cunning = newValue;
          break;
        }
        case "willpower": {
          obj.selectedAdversaryCharacteristicArray.characteristics.willpower = newValue;
          break;
        }
        case "presence": {
          obj.selectedAdversaryCharacteristicArray.characteristics.presence = newValue;
          break;
        }
      }

      this.saveLS();
      this.setState({
        workingEdit: obj,
        equipmentText: obj.equipment.join("\n"),
      })
    }

    updateCharacteristicArrayPLItem( newValue: number, attribute: string ): void {
      let obj = this.state.workingEdit;
      switch( attribute ) {
        case "combat": {
          obj.selectedAdversaryCharacteristicArray.powerLevels.combat = newValue;
          break;
        }
        case "social": {
          obj.selectedAdversaryCharacteristicArray.powerLevels.social = newValue;
          break;
        }
        case "general": {
          obj.selectedAdversaryCharacteristicArray.powerLevels.general = newValue;
          break;
        }
      }

      this.saveLS();
      this.setState({
        workingEdit: obj,
        equipmentText: obj.equipment.join("\n"),
      })
    }

    updateSoakDefWoundStrainDerivedAttribute( newValue: number, attribute: string ): void {
      let obj = this.state.editSoakDefWoundStrain;
      if( obj ) {
        switch( attribute ) {
          case "soakThreshold": {
            obj.derivedAttribute.soakThreshold = newValue;
            break;
          }
          case "strainThreshold": {
            obj.derivedAttribute.strainThreshold = newValue;
            break;
          }
          case "rangedDefense": {
            obj.derivedAttribute.rangedDefense = newValue;
            break;
          }
          case "meleeDefense": {
            obj.derivedAttribute.meleeDefense = newValue;
            break;
          }
        }

        this.setState({
          editSoakDefWoundStrain: obj,
        })
      }
    }

    updateTalentName( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editTalents;
      if( obj ) {
        obj.name = event.currentTarget.value;

        this.setState({
          editTalents: obj,
        })
      }
    }

    updateSkillsName( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editSkills;
      if( obj ) {
        obj.name = event.currentTarget.value;

        this.setState({
          editSkills: obj,
        })
      }
    }

    updateTalentDescription( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editTalents;
      if( obj ) {
        obj.description = event.currentTarget.value;

        this.setState({
          editTalents: obj,
        })
      }
    }

    updateSpecialAbilitiesName( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editSpecialAbilities;
      if( obj ) {
        obj.name = event.currentTarget.value;

        this.setState({
          editSpecialAbilities: obj,
        })
      }
    }

    updateSpecialAbilitiesDescription( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editSpecialAbilities;
      if( obj ) {
        obj.description = event.currentTarget.value;

        this.setState({
          editSpecialAbilities: obj,
        })
      }
    }

    updateSoakDefWoundStrainName( event: React.FormEvent<HTMLInputElement>): void {
      let obj = this.state.editSoakDefWoundStrain;
      if( obj ) {
        obj.name = event.currentTarget.value;

        this.setState({
          editSoakDefWoundStrain: obj,
        })
      }
    }

    updateTalentPL( newValue: number, attribute: string ): void {
      let obj = this.state.editTalents;
      if( obj ) {
        switch( attribute ) {
          case "combat": {
            obj.powerLevels.combat = newValue;
            break;
          }
          case "social": {
            obj.powerLevels.social = newValue;
            break;
          }
          case "general": {
            obj.powerLevels.general = newValue;
            break;
          }
        }

        this.setState({
          editTalents: obj,
        })
      }
    }

    updateSkillsPL( newValue: number, attribute: string ): void {
      let obj = this.state.editSkills;
      if( obj ) {
        switch( attribute ) {
          case "combat": {
            obj.powerLevels.combat = newValue;
            break;
          }
          case "social": {
            obj.powerLevels.social = newValue;
            break;
          }
          case "general": {
            obj.powerLevels.general = newValue;
            break;
          }
        }

        this.setState({
          editSkills: obj,
        })
      }
    }

    updateSpecialAbilitiesPL( newValue: number, attribute: string ): void {
      let obj = this.state.editSpecialAbilities;
      if( obj ) {
        switch( attribute ) {
          case "combat": {
            obj.powerLevels.combat = newValue;
            break;
          }
          case "social": {
            obj.powerLevels.social = newValue;
            break;
          }
          case "general": {
            obj.powerLevels.general = newValue;
            break;
          }
        }

        this.setState({
          editSpecialAbilities: obj,
        })
      }
    }

    togglePowerLevelOverride() {
      let obj = this.state.workingEdit;
      if( obj ) {
        if( obj.powerLevelOverride ) {
          obj.powerLevelOverride = null;
        } else {
          obj.powerLevelOverride = {
            combat: 0,
            social: 0,
            general: 0,
          }
        }
          this.setState({
            workingEdit: obj,
          })
          this.saveLS();
      }
    }

    updatePowerLevelOverride( newValue: number, attribute: string ): void {
      let obj = this.state.workingEdit;
      if( obj && obj.powerLevelOverride ) {
        switch( attribute ) {
          case "combat": {
            obj.powerLevelOverride.combat = newValue;
            break;
          }
          case "social": {
            obj.powerLevelOverride.social = newValue;
            break;
          }
          case "general": {
            obj.powerLevelOverride.general = newValue;
            break;
          }
        }

        this.setState({
          workingEdit: obj,
        })
        this.saveLS();
      }
    }
    updateSoakDefWoundStrainPL( newValue: number, attribute: string ): void {
      let obj = this.state.editSoakDefWoundStrain;
      if( obj ) {
        switch( attribute ) {
          case "combat": {
            obj.powerLevels.combat = newValue;
            break;
          }
          case "social": {
            obj.powerLevels.social = newValue;
            break;
          }
          case "general": {
            obj.powerLevels.general = newValue;
            break;
          }
        }

        this.setState({
          editSoakDefWoundStrain: obj,
        })
      }
    }

    clearAdversary() {
      this.setState({
        workingEdit: new Adversary(),
        equipmentText: "",
      })
    }

    setEquipment() {

      let obj = this.state.workingEdit;
      for( let item of AdversaryEquipmentPackages ) {
        if( item.name === this.state.equipmentSelect) {
          obj.equipment = item.items;
          this.saveLS();
        }
      }
      this.setState({
        workingEdit: obj,
        equipmentText: obj.equipment.join("\n"),
      })

    }

    updateEquipmentSelect( event: React.FormEvent<HTMLSelectElement>) {

      this.setState({
        equipmentSelect: event.currentTarget.value,
      })

    }

    async updateEquipmentText( event: React.FormEvent<HTMLTextAreaElement>) {
      this.setState({
        equipmentText: event.currentTarget.value,
      });

      let obj = this.state.workingEdit;
      obj.equipment = event.currentTarget.value.split("\n");
      this.saveLS();

    }

    componentDidMount() {
      this._refreshImages();
    }

    toggleValuesAsDice() {
      let newValue = !this.state.valuesAsDice;
      if( newValue )
        localStorage.setItem("values_as_dice", "1");
      else
        localStorage.setItem("values_as_dice", "0");
      this.setState( {
        valuesAsDice: newValue,
      })
    }

    toggleShowWoundDots() {
      let newValue = !this.state.showWoundDots;
      if( newValue )
        localStorage.setItem("show_wound_dots", "1");
      else
        localStorage.setItem("show_wound_dots", "0");
      this.setState( {
        showWoundDots: newValue,
      })
    }

    setNumberMinions( event: React.FormEvent<HTMLSelectElement>) {

      localStorage.setItem("number_minions", event.currentTarget.value);
      this.setState( {
        numberMinions: +event.currentTarget.value,
      })
    }

    removeSpecialAbility( indexNumber: number ) {
      if( this.state.workingEdit.selectedSpecialAbilities.length > indexNumber ) {
        let obj = this.state.workingEdit;
        obj.selectedSpecialAbilities.splice( indexNumber, 1);
        obj.calc();
        this.saveLS();
        this.setState({
          workingEdit: obj,
        })
      }
    }

    removeSoakDefWoundStrain( indexNumber: number ) {
      if( this.state.workingEdit.selectedSoakDefWoundStrain.length > indexNumber ) {
        let obj = this.state.workingEdit;
        obj.selectedSoakDefWoundStrain.splice( indexNumber, 1);
        obj.calc();
        this.saveLS();
        this.setState({
          workingEdit: obj,
        })
      }
    }

    removeSkillPackage( indexNumber: number ) {
      if( this.state.workingEdit.selectedSkillPackages.length > indexNumber ) {
        let obj = this.state.workingEdit;
        obj.selectedSkillPackages.splice( indexNumber, 1);
        obj.calc();
        this.saveLS();
        this.setState({
          workingEdit: obj,
        })
      }
    }

    removeTalent( indexNumber: number ) {
      if( this.state.workingEdit.selectedTalents.length > indexNumber ) {
        let obj = this.state.workingEdit;
        obj.selectedTalents.splice( indexNumber, 1);
        obj.calc();
        this.saveLS();
        this.setState({
          workingEdit: obj,
        })
      }
    }

    saveLS(
      noImageUpdate: boolean = false,
    ) {
      if( noImageUpdate === false )
        this._refreshImages();
      let saveData: string = JSON.stringify( this.state.workingEdit.exportData() );
      localStorage.setItem("editing_adversary", saveData);
    }

    updateName( event: React.FormEvent<HTMLInputElement>) {
      let obj = this.state.workingEdit;
      obj.name = event.currentTarget.value;
      this.saveLS( true );

      this.setState({
        workingEdit: obj,
      })

    }

    _sortByName(
      a: IAdversarySoakDefWoundStrain | IAdversarySkillPackage | IAdversaryTalent | IAdversarySpecialAbility | IAdversaryCharacteristicArray | IAdversaryEquipmentPackage,
      b: IAdversarySoakDefWoundStrain | IAdversarySkillPackage | IAdversaryTalent | IAdversarySpecialAbility | IAdversaryCharacteristicArray | IAdversaryEquipmentPackage,
    ): number {
      if( a.name > b.name ) {
        return 1
      } else if( a.name < b.name ) {
        return -1
      } else {
        return 0;
      }
    }

    updateDescription( event: React.FormEvent<HTMLTextAreaElement>) {
      let obj = this.state.workingEdit;
      obj.description = event.currentTarget.value.split("\n");
      this.saveLS( true );

      this.setState({
        workingEdit: obj,
      })

    }

    updateType( event: React.FormEvent<HTMLSelectElement>) {
      let obj = this.state.workingEdit;
      obj.adversaryType = event.currentTarget.value;
      obj.calc();
      this.saveLS();

      this.setState({
        workingEdit: obj,
      })

    }

    updateCharacteristicArray( event: React.FormEvent<HTMLSelectElement>) {
      let obj = this.state.workingEdit;
      if( event.currentTarget.value === "Custom" ) {
        obj.selectedAdversaryCharacteristicArray = {
          name: "Custom",
          characteristics: {
            brawn: 2,
            agility: 2,
            intellect: 2,
            cunning: 2,
            willpower: 2,
            presence: 2
          },
          powerLevels: {
            combat: 0,
            social: 0,
            general: 0,
          },
          examples: "",
        }
      } else {
        for( let charArray of AdversaryCharacteristicArrays ) {
          if( charArray.name === event.currentTarget.value ) {
            obj.selectedAdversaryCharacteristicArray = charArray;
          }
        }
      }

      obj.calc();
      this.saveLS();

      this.setState({
        workingEdit: obj,
      })

    }

    updateSpecialAbilitySelect( event: React.FormEvent<HTMLSelectElement>) {
      // let obj = this.state.workingEdit;
      let selectedSpecialAbility: IAdversarySpecialAbility = AdversarySpecialAbilities[0];
      for( let charArray of AdversarySpecialAbilities ) {
        if( charArray.name === event.currentTarget.value ) {
          selectedSpecialAbility = charArray;
        }
      }
      // this.saveLS();

      this.setState({
        specialAbilitiesSelect: selectedSpecialAbility,
      })

    }

    updateSkillPackageSelect( event: React.FormEvent<HTMLSelectElement>) {
      // let obj = this.state.workingEdit;
      let selectedSkillPackage: IAdversarySkillPackage = AdversarySkillPackages[0];
      for( let charArray of AdversarySkillPackages ) {
        if( charArray.name === event.currentTarget.value ) {
          selectedSkillPackage = charArray;
        }
      }
      // this.saveLS();

      this.setState({
        skillPackageSelect: selectedSkillPackage,
      })

    }

    updateTalentSelect( event: React.FormEvent<HTMLSelectElement>) {
      // let obj = this.state.workingEdit;
      let selectedTalent: IAdversaryTalent = AdversaryTalents[0];
      for( let charArray of AdversaryTalents ) {
        if( charArray.name === event.currentTarget.value ) {
          selectedTalent = charArray;
        }
      }
      // this.saveLS();

      this.setState({
        talentSelect: selectedTalent,
      })

    }

    updateSoakDefWoundStrainSelect( event: React.FormEvent<HTMLSelectElement>) {
      // let obj = this.state.workingEdit;
      let selectedSoakDefWoundStrain: IAdversarySoakDefWoundStrain = AdversarySoakDefWoundStrain[0];
      for( let charArray of AdversarySoakDefWoundStrain ) {
        if( charArray.name === event.currentTarget.value ) {
          selectedSoakDefWoundStrain = charArray;
        }
      }
      // this.saveLS();

      this.setState({
        soakDefWoundStrainSelect: selectedSoakDefWoundStrain,
      })

    }

    addSelectedSpecialAbility() {
      let obj = this.state.workingEdit;

      if( this.state.specialAbilitiesSelect ) {
        obj.selectedSpecialAbilities.push( this.state.specialAbilitiesSelect );
        obj.calc();
        this.saveLS();

        this.setState({
          workingEdit: obj,
        })

      }
    }

    addSelectedSkillPackage() {
      let obj = this.state.workingEdit;

      if( this.state.skillPackageSelect ) {
        obj.selectedSkillPackages.push( this.state.skillPackageSelect );
        obj.calc();
        this.saveLS();

        this.setState({
          workingEdit: obj,
        })

      }
    }

    addSelectedTalent() {
      let obj = this.state.workingEdit;

      if( this.state.talentSelect ) {
        obj.addTalent(  this.state.talentSelect );
        obj.calc();
        this.saveLS();

        this.setState({
          workingEdit: obj,
        })

      }
    }

    addSelectedSoakDefWoundStrain() {
      let obj = this.state.workingEdit;

      if( this.state.soakDefWoundStrainSelect ) {
        obj.selectedSoakDefWoundStrain.push( this.state.soakDefWoundStrainSelect );
        obj.calc();
        this.saveLS();

        this.setState({
          workingEdit: obj,
        })

      }
    }

    _refreshImages() {
      let nodeElement = document.getElementById('statblock');
      if( nodeElement ) {
        domtoimage
          .toPng(nodeElement)
          .then(

            function (dataUrl) {
              let nodeElement = document.getElementById('statblock-image') as HTMLImageElement;
              if( nodeElement ) {
                nodeElement.src = dataUrl;
              }
            }
          );
      }

      let nodeElement2 = document.getElementById('power-level-box');

      if( nodeElement2 ) {
        domtoimage
          .toPng(nodeElement2)
          .then(
            function (dataUrl) {
              let nodeElement = document.getElementById('power-level-image') as HTMLImageElement;
              if( nodeElement ) {
                nodeElement.src = dataUrl;
              }
            }
          );
      }
    }

    render() {
      return (
        <UIPage current="adversary-creator" appGlobals={this.props.appGlobals}>

{this.state.editSoakDefWoundStrain ? (
  <Modal onHide={this.closeSoakDefWoundStrain} show={this.state.editSoakDefWoundStrain != null}>
    <Modal.Header closeButton >
      {this.state.editSoakDefWoundStrainIndex > -1 ? (
        <>Editing Soak, Defense, Wounds, Strain item</>
      ) : (
        <>Adding Soak, Defense, Wounds, Strain</>
      )}
    </Modal.Header>
    <Modal.Body>
      <form className="form" onSubmit={this.saveSoakDefWoundStrain}>
        <label>
          Name:<br />
          <input
            type="text"
            value={this.state.editSoakDefWoundStrain.name}
            onChange={this.updateSoakDefWoundStrainName}
          />
        </label>

        <label>
          Melee Defense:
          <NumericalDropDown
              value={this.state.editSoakDefWoundStrain.derivedAttribute.meleeDefense ? this.state.editSoakDefWoundStrain.derivedAttribute.meleeDefense : 0}
              onChange={this.updateSoakDefWoundStrainDerivedAttribute}
              attribute="meleeDefense"
              start={0}
              stop={5}
            />
        </label>

        <label>
          Ranged Defense:
          <NumericalDropDown
              value={this.state.editSoakDefWoundStrain.derivedAttribute.rangedDefense ? this.state.editSoakDefWoundStrain.derivedAttribute.rangedDefense : 0}
              onChange={this.updateSoakDefWoundStrainDerivedAttribute}
              attribute="rangedDefense"
              start={0}
              stop={5}
            />
        </label>

        <label>
          Soak Threshold:
          <NumericalDropDown
              value={this.state.editSoakDefWoundStrain.derivedAttribute.soakThreshold ? this.state.editSoakDefWoundStrain.derivedAttribute.soakThreshold : 0}
              onChange={this.updateSoakDefWoundStrainDerivedAttribute}
              attribute="soakThreshold"
              start={0}
              stop={5}
            />
        </label>

        <label>
          Strain Threshold:
          <NumericalDropDown
              value={this.state.editSoakDefWoundStrain.derivedAttribute.strainThreshold ? this.state.editSoakDefWoundStrain.derivedAttribute.strainThreshold : 0}
              onChange={this.updateSoakDefWoundStrainDerivedAttribute}
              attribute="strainThreshold"
              start={0}
              stop={5}
            />
        </label>

        <table className="characteristic-select">
      <thead>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.editSoakDefWoundStrain.powerLevels.combat}
              onChange={this.updateSoakDefWoundStrainPL}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSoakDefWoundStrain.powerLevels.social}
              onChange={this.updateSoakDefWoundStrainPL}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSoakDefWoundStrain.powerLevels.general}
              onChange={this.updateSoakDefWoundStrainPL}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.closeSoakDefWoundStrain()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
) : (
  <></>
)}

{this.state.editSkills ? (
  <Modal onHide={this.closeEditSkills} show={this.state.editSkills != null}>
    <Modal.Header closeButton >
      {this.state.editSkillsIndex > -1 ? (
        <>Editing Skills Package</>
      ) : (
        <>Adding Skills Package</>
      )}
    </Modal.Header>
    <Modal.Body>
    <form className="form" onSubmit={this.saveSkillPackage}>
        <label>
          Name:<br />
          <input
            type="text"
            value={this.state.editSkills.name}
            onChange={this.updateSkillsName}
          />
        </label>

        <table className="characteristic-select">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Value</th>
              <th>
              <button
                type="button"
                className="btn btn-xs btn-primary"
                onClick={() => this.addSkill() }
              >
                New
              </button>
              </th>
            </tr>
          </thead>
          <tbody>
{this.state.editSkills.skills.map( (skill, skillIndex) => {
  return (
    <tr key={skillIndex}>
      <td>
        <input
          type="text"
          onChange={( event: React.FormEvent<HTMLInputElement>) => this.updateSkillItemName( skillIndex, event.currentTarget.value )}
          value={skill.name}
        />
      </td>
      <td>
        <NumericalDropDown
          value={skill.value}
          onChange={ (newValue: number, attribute: string ) => this.updateSkillItemValue( skillIndex, newValue)}
          attribute="general"
          start={0}
          stop={5}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-xs btn-primary"
          onClick={() => this.removeSkillIndex( skillIndex) }
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
})}
          </tbody>
        </table>

        <table className="characteristic-select">
      <thead>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.editSkills.powerLevels.combat}
              onChange={this.updateSkillsPL}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSkills.powerLevels.social}
              onChange={this.updateSkillsPL}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSkills.powerLevels.general}
              onChange={this.updateSkillsPL}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.closeEditSkills()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>    </Modal.Body>
  </Modal>
) : (
  <></>
)}

{this.state.editSpecialAbilities ? (
  <Modal onHide={this.closeEditSpecialAbilities} show={this.state.editSpecialAbilities != null}>
    <Modal.Header closeButton >
      {this.state.editSpecialAbilitiesIndex > -1 ? (
        <>Editing Special Abilities Package</>
      ) : (
        <>Adding Special Abilities Package</>
      )}
    </Modal.Header>
    <Modal.Body>
    <form className="form" onSubmit={this.saveSpecialAbilities}>
        <label>
          Name:<br />
          <input
            type="text"
            value={this.state.editSpecialAbilities.name}
            onChange={this.updateSpecialAbilitiesName}
          />
        </label>

        <label>
          Description:<br />
          <input
            type="text"
            value={this.state.editSpecialAbilities.description}
            onChange={this.updateSpecialAbilitiesDescription}
          />
        </label>

        <table className="characteristic-select">
      <thead>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.editSpecialAbilities.powerLevels.combat}
              onChange={this.updateSpecialAbilitiesPL}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSpecialAbilities.powerLevels.social}
              onChange={this.updateSpecialAbilitiesPL}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editSpecialAbilities.powerLevels.general}
              onChange={this.updateSpecialAbilitiesPL}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
    <ShortCodesLegend />
        <div className="text-right">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.closeEditSpecialAbilities()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>    </Modal.Body>
  </Modal>
) : (
  <></>
)}

{this.state.editTalents ? (
  <Modal onHide={this.closeEditTalents} show={this.state.editTalents != null}>
    <Modal.Header closeButton >
      {this.state.editTalentsIndex > -1 ? (
        <>Editing Talents Package</>
      ) : (
        <>Adding Talents Package</>
      )}
    </Modal.Header>
    <Modal.Body>
    <form className="form" onSubmit={this.saveTalent}>
        <label>
          Name:<br />
          <input
            type="text"
            value={this.state.editTalents.name}
            onChange={this.updateTalentName}
          />
        </label>

        <label>
          Description:<br />
          <input
            type="text"
            value={this.state.editTalents.description}
            onChange={this.updateTalentDescription}
          />
        </label>

        <table className="characteristic-select">
      <thead>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.editTalents.powerLevels.combat}
              onChange={this.updateTalentPL}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editTalents.powerLevels.social}
              onChange={this.updateTalentPL}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.editTalents.powerLevels.general}
              onChange={this.updateTalentPL}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
    <ShortCodesLegend />
        <div className="text-right">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.closeEditTalents()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
) : (
  <></>
)}
            <p className="text-center hide-print">Using the <a target="buyme" href="https://www.fantasyflightgames.com/en/products/genesys/products/expanded-players-guide/">Expanded Players Guide</a>, this tool aims to make the calculations for creating and balancing your own adversaries quick and painless.</p>

            <div className="row">
              <div className="col-md">
                <div className="hide-print">
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.valuesAsDice}
                      onChange={this.toggleValuesAsDice}
                    />&nbsp;Values As Dice
                  </label>
                  &nbsp;|&nbsp;
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.showWoundDots}
                      onChange={this.toggleShowWoundDots}
                    />&nbsp;Show Wound Dots
                  </label>
                  {this.state.showWoundDots && this.state.workingEdit.adversaryType.toLowerCase() === "minion" ?
                  (
                    <>
                    &nbsp;|&nbsp;
                    <label>
                      # Minions&nbsp;
                      <select
                        value={this.state.numberMinions}
                        onChange={this.setNumberMinions}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                        <option value={17}>17</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                      </select>
                    </label>
                    </>
                  ) : (
                    <>
                    </>
                  )}
              </div>
<div className="relative">
  <div className="card-container">
    <div className="adversary-card front">
      <img
        id="power-level-image"
        alt="Power Level Block"
        src=""
        />
      <h1>
        {this.state.workingEdit.name} [{this.state.workingEdit.adversaryType}]
      </h1>
      {this.state.workingEdit.description.map( (line, lineIndex) => {
        return (
          <p key={lineIndex}>{line}</p>
        )
      })}

      <div className="text-center">
      <img
        id="statblock-image"
        alt="Stat Block"
        src=""
      />
      </div>
      {this.state.workingEdit.getSkillList() ? (
    <div>

      {this.state.workingEdit.adversaryType.toLowerCase() === "minion" ? (
        <>
          <strong>Skills (group only):&nbsp;</strong>
        <SanitizedHTML
          html={this.state.workingEdit.getSkillList( this.state.valuesAsDice )}
          raw={true}
        />
        </>
      ) : (
        <>
      <strong>Skills:&nbsp;</strong>
        <SanitizedHTML
          html={ replaceDieTags(
            this.state.workingEdit.getSkillList( this.state.valuesAsDice ),
            this.props.appGlobals.settings.dieIconClass === "starwars",
            "png",
            "16"

          )}
          raw={true}
        />
        </>
      )}


    </div>
      ) : (
        <></>
      )}
    {this.state.workingEdit.getTalentList() ? (
    <div>
      <strong>Talents: </strong>&nbsp;
        <SanitizedHTML
          html={ replaceDieTags(
            this.state.workingEdit.getTalentList(),
            this.props.appGlobals.settings.dieIconClass === "starwars",
            "png",
            "16"

          )}
          raw={true}
        />
    </div>
    ) : (
      <></>
    )}
    {this.state.workingEdit.getAbilitiesList() ? (
    <div>
      <strong>Abilities: </strong>&nbsp;
        <SanitizedHTML
          html={replaceDieTags(
            this.state.workingEdit.getAbilitiesList(),
            this.props.appGlobals.settings.dieIconClass === "starwars",
            "png",
            "16"

          )}
          raw={true}
        />
    </div>
    ) : (
      <></>
    )}
    {this.state.workingEdit.getWeaponList().length > 0 ? (
      <div>
      <strong>Weapons: </strong>&nbsp;
        <SanitizedHTML
          html={replaceDieTags(
            this.state.workingEdit.getWeaponList(),
            this.props.appGlobals.settings.dieIconClass === "starwars",
            "png",
            "16"

          )}
          raw={true}
        />
    </div>
    ) : (
      <></>
    )}
    {this.state.workingEdit.getEquipmentList().length > 0 ? (
      <div>
      <strong>Equipment: </strong>&nbsp;
        <SanitizedHTML
          html={replaceDieTags(
            this.state.workingEdit.getEquipmentList(),
            this.props.appGlobals.settings.dieIconClass === "starwars",
            "png",
            "16"

          )}
          raw={true}
        />
    </div>
    ) : (
      <></>
    )}

    {this.state.showWoundDots ? (
      <>
        <hr />
        {this.state.workingEdit.adversaryType.toLowerCase() === "minion" ? (
          <>
          <table className="table small-text">
            <thead>
              <tr>
                <th className="text-center">Unsoaked Damage</th>
                <th>Effects</th>
              </tr>
            </thead>
            <tbody>
          {Array( this.state.numberMinions ).fill("x").map( (indexValue, indexCount: number) => {
            return(
              <tr key={indexCount}>
                {/* <strong>Current Wounds #{indexCount+1}</strong>:&nbsp;
                <WoundDots
                  number={this.state.workingEdit.getWoundThreshold()}
                /><br /> */}
                <td className="text-center">{this.state.workingEdit.getWoundThreshold() * (indexCount + 1) + 1 }</td>
                <td>incapacitates {indexCount + 1} {this.state.workingEdit.name}</td>

              </tr>
            )
          })}
          </tbody>
          </table>
          </>
        ) : (
          <>
          <strong>Current Wounds</strong>:&nbsp;
          <WoundDots
              number={this.state.workingEdit.getWoundThreshold()}
            /><br />
          {this.state.workingEdit.adversaryType.toLowerCase() === "nemesis" ? (
            <>
              <strong>Current Strain</strong>:&nbsp;
              <WoundDots
                  number={this.state.workingEdit.getStrainThreshold()}
              /><br />
            </>
          ) : (
            <></>
          )}

          </>
        )}
      </>
    ) : (
      <></>
    )}

    </div>

  </div>
  <div className="hidden">
      <div id="power-level-box" className="power-level-box">
          <div className="pl-value pl-value1">
            {this.state.workingEdit.getPowerLevel().combat}
          </div>
          <div className="pl-value pl-value2">
            {this.state.workingEdit.getPowerLevel().social}
          </div>
          <div className="pl-value pl-value3">
            {this.state.workingEdit.getPowerLevel().general}
          </div>
        </div>
                <div id="statblock">
                    <div className={this.state.workingEdit.adversaryType === "Nemesis" ? "statblock nemesis" : "statblock minion-rival"}>
                      <div className="label label1">
                        brawn
                      </div>
                      <div className="label label2">
                        agility
                      </div>
                      <div className="label label3">
                        intellect
                      </div>
                      <div className="label label4">
                        cunning
                      </div>
                      <div className="label label5">
                        willpower
                      </div>
                      <div className="label label6">
                        presence
                      </div>
                      <div className="value value1">
                        {this.state.workingEdit.getBrawn()}
                      </div>
                      <div className="value value2">
                      {this.state.workingEdit.getAgility()}
                      </div>
                      <div className="value value3">
                      {this.state.workingEdit.getIntellect()}
                      </div>
                      <div className="value value4">
                      {this.state.workingEdit.getCunning()}
                      </div>
                      <div className="value value5">
                      {this.state.workingEdit.getWillpower()}
                      </div>
                      <div className="value value6">
                      {this.state.workingEdit.getPresence()}
                      </div>

                      {this.state.workingEdit.adversaryType === "Nemesis" ? (
                        <>
                      <div className="nemesis-label nemesis-label1">
                        SOAK VALUE
                      </div>
                      <div className="nemesis-label nemesis-label2">
                        WOUND THRESHOLD
                      </div>
                      <div className="nemesis-label nemesis-label3">
                        STRAIN THRESHOLD
                      </div>
                      <div className="nemesis-label nemesis-label4">
                        M/R DEFENSE
                      </div>

                      <div className="nemesis-value nemesis-value1">
                        {this.state.workingEdit.getSoak()}
                      </div>
                      <div className="nemesis-value nemesis-value2">
                        {this.state.workingEdit.getWoundThreshold()}
                      </div>
                      <div className="nemesis-value nemesis-value3">
                        {this.state.workingEdit.getStrainThreshold()}
                      </div>
                      <div className="nemesis-value nemesis-value4 half">
                      {this.state.workingEdit.getMeleeDefense()}
                      </div>
                      <div className="nemesis-value nemesis-value5 half">
                      {this.state.workingEdit.getRangedDefense()}
                      </div>
                        </>
                      ) : (
                        <>
                      <div className="minion-rival-label minion-rival-label1">
                        SOAK VALUE
                      </div>
                      <div className="minion-rival-label minion-rival-label2">
                        WOUND THRESHOLD
                      </div>
                      <div className="minion-rival-label minion-rival-label3">
                        M/R DEFENSE
                      </div>

                      <div className="minion-rival-value minion-rival-value1">
                        {this.state.workingEdit.getSoak()}
                      </div>
                      <div className="minion-rival-value minion-rival-value2">
                        {this.state.workingEdit.getWoundThreshold()}
                      </div>
                      <div className="minion-rival-value minion-rival-value3 half">
                        {this.state.workingEdit.getMeleeDefense()}
                      </div>
                      <div className="minion-rival-value minion-rival-value4 half">
                        {this.state.workingEdit.getRangedDefense()}
                      </div>
                        </>
                      )}
                    </div>
    </div>
</div>
</div>

              </div>
              <div className="col-md hide-print">
                <div className="text-right">
                  <button
                    onClick={() => { window.print() }}
                    className="btn btn-primary"
                  >
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button
                    onClick={this.clearAdversary}
                    className="btn btn-primary"
                  >
                    Clear
                  </button>
                </div>
<div className="form">
              <label>
              Name:&nbsp;
              <input
                type="text"
                value={this.state.workingEdit.name}
                onChange={this.updateName}
              />
            </label>

            <label>
              Type:&nbsp;
              <select
                value={this.state.workingEdit.adversaryType}
                onChange={this.updateType}
              >
                {AdversaryTypes.map( (typeValue) => {
                  return (
                    <option key={typeValue}>{typeValue}</option>
                  )
                })}
              </select>
            </label>

            <label>
              Description:
              <textarea
                value={this.state.workingEdit.description.join("\n")}
                onChange={this.updateDescription}
              />
            </label>

            <label>
              Characteristic Array:&nbsp;
              <select
                value={this.state.workingEdit.selectedAdversaryCharacteristicArray.name}
                onChange={this.updateCharacteristicArray}
              >
                <option value="Custom">Custom</option>
                {AdversaryCharacteristicArrays.sort(this._sortByName).map( (arrayValue, typeIndex) => {
                  return (
                    <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
                  )
                })}
              </select>
            </label>
{this.state.workingEdit.selectedAdversaryCharacteristicArray.name === "Custom" ? (
  <fieldset className="fieldset">
    <legend>Custom Characteristic Array</legend>
    <table className="characteristic-select">
      <thead>
        <tr>
          <th>Brawn</th>
          <th>Agility</th>
          <th>Intellect</th>
          <th>Cunning</th>
          <th>Willpower</th>
          <th>Presence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.brawn}
              onChange={this.updateCharacteristicArrayItem}
              attribute="brawn"
              start={1}
              stop={6}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.agility}
              onChange={this.updateCharacteristicArrayItem}
              attribute="agility"
              start={1}
              stop={6}
            /></td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.intellect}
              onChange={this.updateCharacteristicArrayItem}
              attribute="intellect"
              start={1}
              stop={6}
            /></td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.cunning}
              onChange={this.updateCharacteristicArrayItem}
              attribute="cunning"
              start={1}
              stop={6}
            /></td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.willpower}
              onChange={this.updateCharacteristicArrayItem}
              attribute="willpower"
              start={1}
              stop={6}
            /></td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.characteristics.presence}
              onChange={this.updateCharacteristicArrayItem}
              attribute="presence"
              start={1}
              stop={6}
            /></td>
        </tr>
      </tbody>
    </table>

    <table className="characteristic-select">
      <thead>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.powerLevels.combat}
              onChange={this.updateCharacteristicArrayPLItem}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.powerLevels.social}
              onChange={this.updateCharacteristicArrayPLItem}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.workingEdit.selectedAdversaryCharacteristicArray.powerLevels.general}
              onChange={this.updateCharacteristicArrayPLItem}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
  </fieldset>
) : (
  <></>
)}
<fieldset className="fieldset">
    <button
      className="btn btn-primary pull-right  btn-sm"
      onClick={() => this.editSoakDefWoundStrain()}
    >
      New
    </button>
            <label className="inline-block">
              Soak, Defense, Wounds, Strain:&nbsp;
              <select
                value={this.state.soakDefWoundStrainSelect ? this.state.soakDefWoundStrainSelect.name : ""}
                onChange={this.updateSoakDefWoundStrainSelect}
              >
                <option value="">- Select -</option>
                {AdversarySoakDefWoundStrain.sort(this._sortByName).map( (arrayValue, typeIndex) => {
                  return (
                    <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
                  )
                })}
              </select>

            </label>
            <button
                className="btn-primary btn btn-sm"
                onClick={this.addSelectedSoakDefWoundStrain}
              >
                Add
              </button><br />
            {this.state.workingEdit.selectedSoakDefWoundStrain.length > 0 ? (
              <>
                <ul className="styleless">
                  {this.state.workingEdit.selectedSoakDefWoundStrain.sort(this._sortByName).map( (item, itemIndex) => {
                    return (
                      <li key={itemIndex}>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.removeSoakDefWoundStrain( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.editSoakDefWoundStrain( itemIndex )}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>&nbsp;
                      {item.name}
                    </li>
                    )
                  })}

                </ul>
              </>
            ) : (
              <>None Selected</>
            )}
</fieldset>
<fieldset className="fieldset">
    <button
      className="btn btn-primary pull-right btn-sm"
      onClick={() => this.editSkills()}
    >
      New
    </button>
            <label className="inline-block">
              Skills:&nbsp;
              <select
                value={this.state.skillPackageSelect ? this.state.skillPackageSelect.name : ""}
                onChange={this.updateSkillPackageSelect}
              >
                <option value="">- Select -</option>
                {AdversarySkillPackages.sort(this._sortByName).map( (arrayValue, typeIndex) => {
                  return (
                    <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
                  )
                })}
              </select>

            </label>
            <button
                className="btn-primary btn btn-sm"
                onClick={this.addSelectedSkillPackage}
              >
                Add
              </button><br />
            {this.state.workingEdit.selectedSkillPackages.length > 0 ? (
              <>
                <ul className="styleless">
                  {this.state.workingEdit.selectedSkillPackages.map( (item, itemIndex) => {
                    return (
                      <li key={itemIndex}>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.removeSkillPackage( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.editSkills( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>&nbsp;
                      {item.name}
                    </li>
                    )
                  })}

                </ul>
              </>
            ) : (
              <>None Selected</>
            )}
</fieldset>

<fieldset className="fieldset">
    <button
      className="btn btn-primary pull-right btn-sm"
      onClick={() => this.editTalents()}
    >
      New
    </button>
            <label className="inline-block">
              Talents:&nbsp;
              <select
                value={this.state.talentSelect ? this.state.talentSelect.name : ""}
                onChange={this.updateTalentSelect}
              >
                <option value="">- Select -</option>
                {AdversaryTalents.sort(this._sortByName).map( (arrayValue, typeIndex) => {
                  return (
                    <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
                  )
                })}
              </select>

            </label>
              <button
                className="btn-primary btn btn-sm"
                onClick={this.addSelectedTalent}
              >
                Add
              </button><br />
            {this.state.workingEdit.selectedTalents.length > 0 ? (
              <>
                <ul className="styleless">
                  {this.state.workingEdit.selectedTalents.map( (item, itemIndex) => {
                    return (
                      <li key={itemIndex}>

                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.removeTalent( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.editTalents(itemIndex)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>&nbsp;

                      <span>{item.name}</span>

                    </li>
                    )
                  })}

                </ul>
              </>
            ) : (
              <>None Selected</>
            )}
</fieldset>

<fieldset className="fieldset">
    <button
      className="btn btn-primary pull-right  btn-sm"
      onClick={() => this.editSpecialAbilities()}
    >
      New
    </button>
            <label className="inline-block">
             Special Abilities:&nbsp;
              <select
                value={this.state.specialAbilitiesSelect ? this.state.specialAbilitiesSelect.name : ""}
                onChange={this.updateSpecialAbilitySelect}
              >
                <option value="">- Select -</option>
                {AdversarySpecialAbilities.sort(this._sortByName).map( (arrayValue, typeIndex) => {
                  return (
                    <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
                  )
                })}
              </select>
            </label>
              <button
                className="btn-primary btn btn-sm"
                onClick={this.addSelectedSpecialAbility}
              >
                Add
              </button><br />
            {this.state.workingEdit.selectedSpecialAbilities.length > 0 ? (
              <>
                <ul className="styleless">
                  {this.state.workingEdit.selectedSpecialAbilities.map( (item, itemIndex) => {
                    return (
                      <li key={itemIndex}>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.removeSpecialAbility( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => this.editSpecialAbilities( itemIndex)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>&nbsp;
                      {item.name}
                    </li>
                    )
                  })}

                </ul>
              </>
            ) : (
              <>None Selected</>
            )}
</fieldset>

    <fieldset className="fieldset">
        <div className="pull-right">
          <div id="power-level-box" className="power-level-box">
            <div className="pl-value pl-value1">
              {this.state.workingEdit.getEquipmentPowerLevel().combat}
            </div>
            <div className="pl-value pl-value2">
              {this.state.workingEdit.getEquipmentPowerLevel().social}
            </div>
            <div className="pl-value pl-value3">
              {this.state.workingEdit.getEquipmentPowerLevel().general}
            </div>
          </div><br />
        {this.state.workingEdit.powerLevelOverride ? (
          <>

<table className="characteristic-select small-text full-width">
      <thead>
        <tr>
          <th colSpan={3}>
            Power Level Override
          </th>
        </tr>
        <tr>
          <th>Combat</th>
          <th>Social</th>
          <th>General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericalDropDown
              value={this.state.workingEdit.powerLevelOverride.combat}
              onChange={this.updatePowerLevelOverride}
              attribute="combat"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.workingEdit.powerLevelOverride.social}
              onChange={this.updatePowerLevelOverride}
              attribute="social"
              start={0}
              stop={5}
            />
          </td>
          <td><NumericalDropDown
              value={this.state.workingEdit.powerLevelOverride.general}
              onChange={this.updatePowerLevelOverride}
              attribute="general"
              start={0}
              stop={5}
            />
            </td>
        </tr>
      </tbody>
    </table>
    <button
      className="btn btn-sm btn-primary full-width"
      onClick={this.togglePowerLevelOverride}
    >
      Clear Override
    </button>
          </>
        ) : (
          <button
            className="btn btn-sm btn-primary full-width"
            onClick={this.togglePowerLevelOverride}
          >
            Override
          </button>
        )}
      </div>
            <label htmlFor="equipment">
             Equipment:<br />
            </label>

  <select
    value={this.state.equipmentSelect}
    onChange={this.updateEquipmentSelect}
  >
      <option value="">- Select -</option>
      {AdversaryEquipmentPackages.sort(this._sortByName).map( (arrayValue, typeIndex) => {
        return (
          <option key={typeIndex} value={arrayValue.name}>{arrayValue.name}</option>
        )
      })}
  </select>
  <button
    className="btn btn-sm btn-primary"
    onClick={this.setEquipment}
  >
    Set
  </button>

        <p className="small-text">One option per line. The parser can handle simple ands and ors on the line.</p>

        <textarea
          name="equipment"
          id="equipment"
          value={this.state.equipmentText}
          onChange={this.updateEquipmentText}
        ></textarea>

      <ShortCodesLegend />
</fieldset>
            </div>

              </div>
            </div>

        </UIPage>
      );
    }
}

interface IAdversaryCreatorProps {
  appGlobals: IAppGlobals;
}

interface IAdversaryCreatorState {
  updated: boolean;
  workingEdit: Adversary;
  soakDefWoundStrainSelect: IAdversarySoakDefWoundStrain | null;
  skillPackageSelect: IAdversarySkillPackage | null;
  talentSelect: IAdversaryTalent | null;
  specialAbilitiesSelect: IAdversarySpecialAbility | null;
  valuesAsDice: boolean;
  equipmentText: string;
  equipmentSelect: string;
  editSoakDefWoundStrain: IAdversarySoakDefWoundStrain | null;
  editSoakDefWoundStrainIndex: number;

  editSkills: IAdversarySkillPackage | null;
  editSkillsIndex: number;

  editTalents: IAdversaryTalent | null;
  editTalentsIndex: number;

  editSpecialAbilities: IAdversarySpecialAbility | null;
  editSpecialAbilitiesIndex: number;

  showWoundDots: boolean;
  numberMinions: number;
}