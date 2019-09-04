import React from 'react';
import './Dice.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import Dice, { IDiceResults } from '../Classes/Dice';
import Die from '../Components/Die';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default class DicePage extends React.Component<IDiceProps, IDiceState> {
    dieRolls: IDiceResults | null = null;
    diceObj = new Dice();
    constructor(props: IDiceProps) {
        super(props);

        let abilityDice = 3;
        let proficiencyDice = 1;
        let boostsDice = 0;
        let difficultyDice = 2;
        let challengeDice = 0;
        let setbackDice = 0;
        let forceDice = 0;

        let abilityDiceLS = localStorage.getItem("abilityDice");
        if( abilityDiceLS ) {
          abilityDice = +abilityDiceLS;
        }

        let proficiencyDiceLS = localStorage.getItem("proficiencyDice");
        if( proficiencyDiceLS ) {
          proficiencyDice = +proficiencyDiceLS;
        }

        let boostsDiceLS = localStorage.getItem("boostsDice");
        if( boostsDiceLS ) {
          boostsDice = +boostsDiceLS;
        }

        let difficultyDiceLS = localStorage.getItem("difficultyDice");
        if( difficultyDiceLS ) {
          difficultyDice = +difficultyDiceLS;
        }

        let challengeDiceLS = localStorage.getItem("challengeDice");
        if( challengeDiceLS ) {
          challengeDice = +challengeDiceLS;
        }

        let setbackDiceLS = localStorage.getItem("setbackDice");
        if( setbackDiceLS ) {
          setbackDice = +setbackDiceLS;
        }

        let forceDiceLS = localStorage.getItem("forceDice");
        if( forceDiceLS ) {
          forceDice = +forceDiceLS;
        }

        this.state = {
            updated: false,

            abilityDice: abilityDice,
            proficiencyDice: proficiencyDice,
            boostsDice: boostsDice,
            difficultyDice: difficultyDice,
            challengeDice: challengeDice,
            setbackDice: setbackDice,
            forceDice: forceDice,
        }

        this.rollDice = this.rollDice.bind(this);

        this.rollDice();
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Dice");
    }

    rollDice() {
      this.dieRolls = this.diceObj.rollFGDice(
        this.state.abilityDice, // ability
        this.state.proficiencyDice, // proficiency
        this.state.boostsDice, // boosts

        this.state.difficultyDice, // difficulty
        this.state.challengeDice, // challenge
        this.state.setbackDice, // setback

        this.state.forceDice, // force
      );
      this.setState({
        updated: true,
      })
    }

    incrementDie(dieType: string, incrementCount: number = 1) {
      switch( dieType.toLowerCase().trim() ) {
        case "ability": {
          let newValue = this.state.abilityDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("abilityDice", (newValue).toString())
          this.setState({
            abilityDice: newValue,
          })
          break;
        }

        case "proficiency": {
          let newValue = this.state.proficiencyDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("proficiencyDice", (newValue).toString())
          this.setState({
            proficiencyDice: newValue,
          })
          break;
        }

        case "setback": {
          let newValue = this.state.setbackDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("setbackDice", (newValue).toString())
          this.setState({
            setbackDice: newValue,
          })
          break;
        }

        case "difficulty": {
          let newValue = this.state.difficultyDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("difficultyDice", (newValue).toString())
          this.setState({
            difficultyDice: newValue,
          })
          break;
        }

        case "force": {
          let newValue = this.state.forceDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("forceDice", (newValue).toString())
          this.setState({
            forceDice: newValue,
          })
          break;
        }

        case "boost": {
          let newValue = this.state.boostsDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("boostsDice", (newValue).toString())
          this.setState({
            boostsDice: newValue,
          })
          break;
        }

        case "challenge": {
          let newValue = this.state.challengeDice + incrementCount;
          if( newValue < 0 ) {
            newValue = 0;
          }
          localStorage.setItem("challengeDice", (newValue).toString())
          this.setState({
            challengeDice: newValue,
          })
          break;
        }
      }
    }

    render() {
      return (
        <UIPage current="dice" appGlobals={this.props.appGlobals}>

        <div className="dice-select-container">
          <div className="text-center dice-select">
              <span className="title">Ability</span>
              <span className="bigger-font">
                <span className="dice die-ability">d</span>&nbsp;x{this.state.abilityDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("ability", -1)}
                disabled={this.state.abilityDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("ability", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>

          <div className="text-center dice-select">
              <span className="title">Difficulty</span>
              <span className="bigger-font">
                <span className="dice die-difficulty">d</span>&nbsp;x{this.state.difficultyDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("difficulty", -1)}
                disabled={this.state.difficultyDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("difficulty", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>

          <div className="text-center dice-select">
              <span className="title">Boost</span>
              <span className="bigger-font">
                <span className="dice die-boost">b</span>&nbsp;x{this.state.boostsDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("boost", -1)}
                disabled={this.state.boostsDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("boost", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>

          <div className="text-center dice-select">
            <span className="title">Setback</span>
              <span className="bigger-font">
                <span className="dice die-setback">b</span>&nbsp;x{this.state.setbackDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("setback", -1)}
                disabled={this.state.setbackDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("setback", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>

          <div className="text-center dice-select">
              <span className="title">Proficiency</span>
              <span className="bigger-font">
                <span className="dice die-proficiency">c</span>&nbsp;x{this.state.proficiencyDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("proficiency", -1)}
                disabled={this.state.proficiencyDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("proficiency", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>
          <div className="text-center dice-select">
            <span className="title">Challenge</span>
              <span className="bigger-font">
                <span className="dice die-challenge">c</span>&nbsp;x{this.state.challengeDice}<br />
              </span>
              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("challenge", -1)}
                disabled={this.state.challengeDice < 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              &nbsp;

              <Button
                variant="primary"
                className="btn-xs"
                onClick={() => this.incrementDie("challenge", 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
          </div>

        </div>
        <div className="text-center">
          <Button
            variant="primary"
            onClick={this.rollDice}
          >Roll</Button>
        </div>

        {this.dieRolls ? (
          <>
          <div className="die-box text-center">
            {this.dieRolls.rolls.map( (result, resultIndex) => {
              return (
                <Die
                  appGlobals={this.props.appGlobals}
                  dieResult={result}
                  className="bigger"
                />
              )
            })}
            <p>

              {this.dieRolls.grossSuccesses !== 0 ? (
                <>
                Successes: {this.dieRolls.grossSuccesses}<br />
                </>
              ) :
              (
                <></>
              )}

              {this.dieRolls.grossAdvantages !== 0 ? (
                <>
                  Advantages: {this.dieRolls.grossAdvantages}<br />
                </>
              ) :
              (
                <></>
              )}

              {this.dieRolls.grossFailures !== 0 ? (
                <>
                  Failures: {this.dieRolls.grossFailures}<br />
                </>
              ) :
              (
                <></>
              )}

              {this.dieRolls.grossThreats !== 0 ? (
                <>
                  Threats: {this.dieRolls.grossThreats}<br />
                </>
              ) :
              (
                <></>
              )}


              {this.dieRolls.grossTriumphs !== 0 ? (
                <>
                  Triumphs: {this.dieRolls.grossTriumphs}<br />
                </>
              ) :
              (
                <></>
              )}

              {this.dieRolls.grossDespairs !== 0 ? (
                <>
                  Despairs: {this.dieRolls.grossDespairs}<br />
                </>
              ) :
              (
                <></>
              )}
            </p>
          </div>
          </>
        ) : (
          <></>
        )}

        </UIPage>
      );
    }
}

interface IDiceProps {
  appGlobals: IAppGlobals;
}

interface IDiceState {
    updated: boolean;

    abilityDice: number;
    proficiencyDice: number;
    boostsDice: number;
    difficultyDice: number;
    challengeDice: number;
    setbackDice: number;
    forceDice: number;
}