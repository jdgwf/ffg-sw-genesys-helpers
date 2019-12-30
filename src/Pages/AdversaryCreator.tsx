import React from 'react';
import './AdversaryCreator.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Adversary, IAdversarySave } from '../Classes/Adversary';
import { AdversaryTypes } from '../Data/AdversaryTypes';
import { AdversaryCharacteristicArrays, IAdversaryCharacteristicArray } from '../Data/AdversaryCharacteristicArrays';
import { AdversarySoakDefWoundStrain, IAdversarySoakDefWoundStrain } from '../Data/AdversarySoakDefWoundStrain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdversarySkillPackages, IAdversarySkillPackage } from '../Data/AdversarySkillPackages';
import { AdversaryTalents, IAdversaryTalent } from '../Data/AdversaryTalents';
import { AdversarySpecialAbilities, IAdversarySpecialAbility } from '../Data/AdversarySpecialAbilities';
import SanitizedHTML from '../Components/SanitizedHTML';
import domtoimage from 'dom-to-image';
import { replaceDieTags } from '../utils';
import { AdversaryEquipmentPackages, IAdversaryEquipmentPackage } from '../Data/AdversaryEquipmentPackages';
import NumericalDropDown from '../Components/NumericalDropdown';
// import { Gear } from '../Classes/Gear';
// import FileSaver from 'file-saver';

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

        this._refreshImages = this._refreshImages.bind(this);

        this.props.appGlobals.makeDocumentTitle("AdversaryCreator");
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

            <p className="text-center">Using the <a target="buyme" href="https://www.fantasyflightgames.com/en/products/genesys/products/expanded-players-guide/">Expanded Players Guide</a>, this tool aims to make the calculations for creating and balancing your own adversaries quick and painless.</p>

            <div className="row">
              <div className="col-md">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.valuesAsDice}
                    onChange={this.toggleValuesAsDice}
                  />&nbsp;Values As Dice
                </label>

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
      <strong>Skills:&nbsp;</strong>
        <SanitizedHTML
          html={ replaceDieTags(
            this.state.workingEdit.getSkillList( this.state.valuesAsDice ),
            false,
            "png",
            "16"

          )}
          raw={true}
        />

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
            false,
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
            false,
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
            false,
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
            false,
            "png",
            "16"

          )}
          raw={true}
        />
    </div>
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
              <div className="col-md">
                <div className="text-right">
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
      className="btn btn-primary pull-right"
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
      className="btn btn-primary pull-right"
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
      className="btn btn-primary pull-right"
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
      className="btn btn-primary pull-right"
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
        <div id="power-level-box" className="power-level-box pull-right">
          <div className="pl-value pl-value1">
            {this.state.workingEdit.getEquipmentPowerLevel().combat}
          </div>
          <div className="pl-value pl-value2">
            {this.state.workingEdit.getEquipmentPowerLevel().social}
          </div>
          <div className="pl-value pl-value3">
            {this.state.workingEdit.getEquipmentPowerLevel().general}
          </div>
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
        Shortcodes:
        <div className="flex">
{[
  "[ability]",
  "[proficiency]",
  "[boost]",
  "[difficulty]",
  "[challenge]",
  "[setback]",
  "[force]",

].map( (shortcode, shortcodeIndex) => {
  return (
    <div key={shortcodeIndex}>
      <SanitizedHTML
        raw={true}
        html={replaceDieTags(shortcode)}
      />&nbsp;{shortcode}
    </div>
  )
})}
             </div>
             <div className="flex">
{[


  "[advantage]",
  "[threat]",
  "[triumph]",
  "[despair]",
  "[success]",
  "[failure]",
].map( (shortcode, shortcodeIndex) => {
  return (
    <div key={shortcodeIndex}>
      <SanitizedHTML
        raw={true}
        html={replaceDieTags(shortcode)}
      />&nbsp;{shortcode}
    </div>
  )
})}
             </div>

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
}