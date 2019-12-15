import React, { ReactElement } from 'react';
import './SkillSelect.scss';
import { ISKillValue } from '../Pages/Initiative';

export default class SkillSelect extends React.Component<ISkillSelectProps, ISkillSelectState> {

    className: string = "";
    max: number = 8;

    constructor(props: ISkillSelectProps) {
        super(props);
        if( this.props.className ) {
            this.className = this.props.className;
        }

    }

    updateProficiencyDie( newValue: number) {
        let newValueObj = this.props.value;
        newValueObj.skillDice = newValue;
        this.props.onChange(this.props.index, newValueObj)
        this.setState({
            updated: true,
        })
    }

    updateAbilityDie( newValue: number) {
        let newValueObj = this.props.value;
        newValueObj.abilityDice = newValue;
        this.props.onChange(this.props.index, newValueObj)
        this.setState({
            updated: true,
        })
    }

    render() {
        let proficiencySelectUI: ReactElement[] = [];

        for( let proficiencySelectNumber = 0; proficiencySelectNumber < this.max; proficiencySelectNumber++) {

            proficiencySelectUI.push(
                <span
                    key={"ps" + proficiencySelectNumber}
                    onClick={() => this.updateProficiencyDie(proficiencySelectNumber)}
                    className={this.props.value.skillDice === proficiencySelectNumber ? "selected" : ""}
                >
                    {proficiencySelectNumber}
                </span>
            )
        }

        let abilitySelectUI: ReactElement[] = [];

        for( let abilitySelectNumber = 0; abilitySelectNumber < this.max; abilitySelectNumber++) {

            abilitySelectUI.push(
                <span
                    key={"as" + abilitySelectNumber}
                    onClick={() => this.updateAbilityDie(abilitySelectNumber)}
                    className={this.props.value.abilityDice === abilitySelectNumber ? "selected" : ""}
                >
                    {abilitySelectNumber}
                </span>
            )
        }

        let skillDieView: ReactElement[] = [];
        let maxValue = 0;
        let minValue = 0;
        if( this.props.value.abilityDice > this.props.value.skillDice  ) {
            maxValue =  this.props.value.abilityDice;
            minValue =  this.props.value.skillDice;
        } else {
            maxValue =  this.props.value.skillDice;
            minValue =  this.props.value.abilityDice;
        }

        for( let lCount = 0; lCount < maxValue; lCount++ ) {
            if( lCount < minValue ) {
                skillDieView.push(
                    <span key={"p" + lCount} className="dice die-proficiency">c</span>
                )
            } else {
                skillDieView.push(
                    <span key={"a" + lCount} className="dice die-ability">c</span>
                )
            }
        }

        return (
            <>
                <label className="skill-select">
                {this.props.label}: {skillDieView}<br />
                    <div className="number-select text-right">
                        Ability Dice: {abilitySelectUI}<br />
                        Proficiency Dice: {proficiencySelectUI}<br />
                    </div>
                </label><br />
            </>
        )
    }
}


interface ISkillSelectProps {
    value: ISKillValue;
    onChange(
        indexNumber: number,
        newValue: ISKillValue
    ): void;
    index: number;
    className?: string;
    label: string;
  }

  interface ISkillSelectState {
      updated: boolean;

  }