import React, { ReactElement } from 'react';
import './Initiative.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDoubleLeft, faAngleDoubleRight, faCog, faDice, faRecycle } from '@fortawesome/free-solid-svg-icons';
import NumberSelect from '../Components/NumberSelect';
import SkillSelect from '../Components/SkillSelect';
import Dice from '../Classes/Dice';

export default class Initiative extends React.Component<IInitiativeProps, IInitiativeState> {
    numPCs = 4;
    numNPCs = 2;

    currentInitiative = -1;

    initMap: IInitMapItem[] = [];
    constructor(props: IInitiativeProps) {
        super(props);

        const lsNumPCs = localStorage.getItem("numPCs");
        const lsInitMap = localStorage.getItem("initMap");
        const lsCurrentInitiative = localStorage.getItem("currentInitiative");
        const lsHideControls = localStorage.getItem("hideControls");

        let hideControls = false;
        if( lsHideControls && +lsHideControls > 0 ) {
          hideControls = true;
        }

        const lsHideRolls = localStorage.getItem("hideRolls");

        let hideRolls = false;
        if( lsHideRolls && +lsHideRolls > 0 ) {
          hideRolls = true;
        }

        const lsRoundNumber = localStorage.getItem("roundNumber");
        let roundNumber = 1;
        if( lsRoundNumber && +lsRoundNumber > 1) {
          roundNumber = +lsRoundNumber;
        }

        if( lsCurrentInitiative ) {
          this.currentInitiative = +lsCurrentInitiative;

          if( Number.isNaN(this.currentInitiative) ) {
            this.currentInitiative = -1;
          }
        }

        if( lsNumPCs ) {
          this.numPCs = +lsNumPCs;
        }

        if( lsInitMap ) {
          this.initMap = JSON.parse( lsInitMap );
        } else {
          // Init PC Map
          for( let count = 0; count < this.numPCs; count++) {
            this.initMap.push( {
              label: "PC",
              successes: 0,
              advantages: 0,
              triumphs: 0,
              npc: false,
              skillCool: {
                skillDice: 0,
                attributeDice: 0,
              },
              skillVigilance: {
                skillDice: 0,
                attributeDice: 0,
              },
            });
          }
        }

        for( let item of this.initMap ) {
          if(!item.skillCool) {
            item.skillCool = {
              skillDice: 0,
              attributeDice: 0,
            }
          }

          if(!item.skillVigilance) {
            item.skillVigilance = {
              skillDice: 0,
              attributeDice: 0,
            }
          }

          if(!item.skillCool.attributeDice) {
            item.skillCool.attributeDice = 0

          }

          if(!item.skillVigilance.attributeDice) {
            item.skillVigilance.attributeDice = 0

          }
        }

        if( this.initMap.length === 0 ) {
          hideControls = false;
          localStorage.setItem("hideControls", "0");
        }

        this.state = {
          updated: false,
          editItem: null,
          editItemIndex: -1,
          hideControls: hideControls,
          hideRolls: hideRolls,
          roundNumber: roundNumber,
        };

        this.updateInitSuccesses = this.updateInitSuccesses.bind(this);
        this.updateInitAdvantages = this.updateInitAdvantages.bind(this);
        this.updateInitTriumphs = this.updateInitTriumphs.bind(this);
        this.updateNumPCs = this.updateNumPCs.bind(this);
        this.addItem = this.addItem.bind(this);
        this.sortInit = this.sortInit.bind(this);

        this.initForward = this.initForward.bind(this);
        this.initBackward = this.initBackward.bind(this);

        this.removeSlot = this.removeSlot.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.editSlot = this.editSlot.bind(this);

        this.updateCoolValue = this.updateCoolValue.bind(this);
        this.updateVigilanceValue = this.updateVigilanceValue.bind(this);

        this.rollVigilance = this.rollVigilance.bind(this);
        this.rollCool = this.rollCool.bind(this);
        this.updateNPC = this.updateNPC.bind(this);
        this.toggleHideControls = this.toggleHideControls.bind(this);
        this.toggleHideRolls = this.toggleHideRolls.bind(this);

        this.resetRound = this.resetRound.bind(this);
        this.selectNextItem = this.selectNextItem.bind(this);
        this.selectPreviousItem = this.selectPreviousItem.bind(this);
    }

    selectPreviousItem() {
      let previousItem = null;
      let previousItemIndex = this.state.editItemIndex - 1;
      if( previousItemIndex > -1 && previousItemIndex < this.initMap.length ) {
        previousItem = this.initMap[previousItemIndex]
      } else {
        previousItemIndex = -1;
      }
      this.setState({
        editItem: previousItem,
        editItemIndex: previousItemIndex,
      })
    }

    selectNextItem() {
      let nextItem = null;
      let nextItemIndex = this.state.editItemIndex + 1;
      if( nextItemIndex < this.initMap.length ) {
        nextItem = this.initMap[nextItemIndex]
      } else {
        nextItemIndex = -1;
      }
      this.setState({
        editItem: nextItem,
        editItemIndex: nextItemIndex,
      })
    }

    resetRound() {
      localStorage.setItem("currentInitiative", "-1");
      this.currentInitiative = -1;
      this.setState({
        roundNumber: 1,
        updated: true,
      })
    }

    toggleHideRolls() {
      let hideRolls = !this.state.hideRolls;

      if( hideRolls ) {
          localStorage.setItem("hideRolls", "1");
      } else {
          localStorage.setItem("hideRolls", "0");
      }
      this.setState({
        hideRolls: hideRolls,
      })
    }

    toggleHideControls() {
      let hideControls = !this.state.hideControls;

      if( hideControls ) {
          localStorage.setItem("hideControls", "1");
      } else {
          localStorage.setItem("hideControls", "0");
      }
      this.setState({
        hideControls: hideControls,
      })
    }

    updateNPC( event: React.FormEvent<HTMLInputElement> ) {
      if( this.state.editItem && this.state.editItemIndex < this.initMap.length ) {
        this.initMap[ this.state.editItemIndex].npc = event.currentTarget.checked;
        // this.state.editItem.npc = event.currentTarget.checked;
        if( event.currentTarget.checked ) {
          this.initMap[ this.state.editItemIndex].label = "NPC";
          // this.state.editItem.label = "NPC";
        } else {
          this.initMap[ this.state.editItemIndex].label = "PC";
          // this.state.editItem.label = "PC";
        }
        this.setState({
          updated: true,
        })
        localStorage.setItem("initMap", JSON.stringify( this.initMap) );
      }

    }
    rollCool(
      indexNumber: number,
    ): void {
      if( indexNumber < this.initMap.length && this.initMap[indexNumber]) {
        let diceRoll = new Dice();
        let dieResults = diceRoll.rollFGDice(
          this.getattributeDice( this.initMap[indexNumber].skillCool), // ability: number = 0,
          this.getProcidiencyDice( this.initMap[indexNumber].skillCool),// proficiency: number = 0,
        );

        this.initMap[indexNumber].triumphs = dieResults.netTriumphs;
        this.initMap[indexNumber].successes = dieResults.netSuccesses;
        this.initMap[indexNumber].advantages = dieResults.netAdvantages;
        this.setState({
          updated: true,
        });
        localStorage.setItem("initMap", JSON.stringify( this.initMap) );
      }

    }

    rollVigilance(
      indexNumber: number,
    ): void {
      if( indexNumber < this.initMap.length && this.initMap[indexNumber]) {
        let diceRoll = new Dice();
        let dieResults = diceRoll.rollFGDice(
          this.getattributeDice( this.initMap[indexNumber].skillVigilance), // ability: number = 0,
          this.getProcidiencyDice( this.initMap[indexNumber].skillVigilance),// proficiency: number = 0,
        );

        this.initMap[indexNumber].triumphs = dieResults.netTriumphs;
        this.initMap[indexNumber].successes = dieResults.netSuccesses;
        this.initMap[indexNumber].advantages = dieResults.netAdvantages;
        this.setState({
          updated: true,
        })
        localStorage.setItem("initMap", JSON.stringify( this.initMap) );
      }
    }

    getattributeDice( skill: ISkillValue ): number {
      let maxValue = 0;
      let minValue = 0;
      if( skill.attributeDice > skill.skillDice  ) {
          maxValue =  skill.attributeDice;
          minValue =  skill.skillDice;
      } else {
          maxValue =  skill.skillDice;
          minValue =  skill.attributeDice;
      }
      return (maxValue - minValue);
    }

    getProcidiencyDice( skill: ISkillValue ): number {
      let minValue = 0;
      if( skill.attributeDice > skill.skillDice  ) {
          minValue =  skill.skillDice;
      } else {
          minValue =  skill.attributeDice;
      }

      return minValue;
    }

    updateCoolValue(
      indexNumber: number,
      newValue: ISkillValue
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].skillCool = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    updateVigilanceValue(
      indexNumber: number,
      newValue: ISkillValue
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].skillVigilance = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    editSlot( editItem: IInitMapItem, editItemIndex: number ) {
      this.setState({
        editItem: editItem,
        editItemIndex: editItemIndex,
      })
    }

    initForward() {
      let init = this.currentInitiative + 1;
      let roundNumber = this.state.roundNumber;

      if( init > this.initMap.length - 1 ) {
        roundNumber++;
        init = 0;
      }

      this.currentInitiative = init;
      localStorage.setItem("currentInitiative", init.toString() );
      this.setState({
        updated: true,
        roundNumber: roundNumber,
      })
    }

    initBackward() {
      let init = this.currentInitiative - 1;
      let roundNumber = this.state.roundNumber;
      if( init < -1 ) {

        roundNumber--;

        if( roundNumber < 1 ) {
          roundNumber = 1;
          if( init < 0 ) {
            init = -1;
          }
        } else {
          init = this.initMap.length;
        }

      }

      this.currentInitiative = init;
      localStorage.setItem("currentInitiative", init.toString() );
      this.setState({
        updated: true,
        roundNumber: roundNumber,
      })
    }

    sortInit() {
      localStorage.setItem("currentInitiative", "-1" );
      localStorage.setItem("currentRound", "1" );
      this.initMap.sort( (a, b) => {
        if( a.successes < b.successes ) {
          return 1;
        } else if( a.successes > b.successes ) {
          return -1;
        } else {
          if( a.advantages < b.advantages ) {
            return 1;
          } else if( a.advantages > b.advantages ) {
            return -1;
          } else {
            if( a.label === "PC" && b.label === "NPC" ) {
              return -1;
            } else if( a.label === "NPC" && b.label === "PC" ) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      });

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    addItem() {
      this.initMap.push( {
        label: "PC",
        successes: 0,
        advantages: 0,
        triumphs: 0,
        npc: false,
        skillCool: {
          skillDice: 0,
          attributeDice: 0,
        },
        skillVigilance: {
          skillDice: 0,
          attributeDice: 0,
        },
      });

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
        editItem: this.initMap[ this.initMap.length - 1],
        editItemIndex: this.initMap.length - 1,
      })
    }

    removeSlot( indexNumber: number ) {

      if( this.initMap.length > indexNumber) {
        this.initMap.splice( indexNumber, 1);
      }

      let hideControls = this.state.hideControls;
      if( this.initMap.length === 0 ) {
        hideControls = false;
        localStorage.setItem("hideControls", "0" );
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
        hideControls: hideControls,
      })
    }

    updateInitAdvantages(
      indexNumber: number,
      newValue: number
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].advantages = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    updateInitTriumphs(
      indexNumber: number,
      newValue: number
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].triumphs = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    updateInitSuccesses(
      indexNumber: number,
      newValue: number
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].successes = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    updateNumPCs( event: React.FormEvent<HTMLSelectElement>) {

      this.numPCs = +event.currentTarget.value;
      localStorage.setItem("numPCs", event.currentTarget.value);

      this.setState({
        updated: true,
      })
    }

    handleClose() {
      this.setState({
        editItem: null,
      })
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Initiative");
    }

    render() {
      let success = "s";
      let advantage = "a";
      let triumph = "t";

      if( this.props.appGlobals.settings.dieIconClass === "starwars") {
          success = "s";
          advantage = "a";
          triumph = "x";
      }

      return (
        <UIPage current="initiative" appGlobals={this.props.appGlobals}>
            {/* this.initMap.length: {this.initMap.length}<br />
            this.currentInitiative: {this.currentInitiative}<br /> */}
            <Modal onHide={this.handleClose} show={this.state.editItem != null}>
              <Modal.Header closeButton >
                {this.state.editItem && this.state.editItem.npc ? (
                  <>NPC Edit</>
                ) : (
                  <>PC Edit</>
                )}
              </Modal.Header>
              <Modal.Body>
              {this.state.editItem ? (
                <div className="form">
                  <label>
                    NPC:&nbsp;
                    <input
                      type="checkbox"
                      checked={this.state.editItem.npc}
                      onChange={this.updateNPC}
                    />
                  </label><br />
                  <label>
                    Successes:&nbsp;
                    <NumberSelect
                      value={this.state.editItem.successes}
                      max={8}
                      index={this.state.editItemIndex}
                      onChange={this.updateInitSuccesses}
                    />
                  </label><br />
                  <label>
                    Advantages:&nbsp;
                    <NumberSelect
                      value={this.state.editItem.advantages}
                      max={8}
                      index={this.state.editItemIndex}
                      onChange={this.updateInitAdvantages}
                    />
                  </label><br />
                  <label>
                    Triumphs:&nbsp;
                    <NumberSelect
                      value={this.state.editItem.triumphs}
                      max={8}
                      index={this.state.editItemIndex}
                      onChange={this.updateInitTriumphs}
                    />
                  </label><br />
                  <hr />
                  <SkillSelect
                      value={this.state.editItem.skillCool}
                      index={this.state.editItemIndex}
                      onChange={this.updateCoolValue}
                      label="Cool"
                  />
                  <SkillSelect
                    value={this.state.editItem.skillVigilance}
                    index={this.state.editItemIndex}
                    onChange={this.updateVigilanceValue}
                    label="Vigilance"
                  />
                </div>
              ) : (
                <></>
              )}
              </Modal.Body>
              <Modal.Footer className="text-center">

                <Button
                  variant="primary"
                  onClick={this.selectPreviousItem}
                  tabIndex={1}
                  disabled={this.state.editItemIndex < 1}
                  title="Select the previous Initiative Slot"
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  onClick={this.handleClose}
                  title="Close this dialog"
                >
                  Close
                </Button>

                #{this.state.editItemIndex + 1 } / {this.initMap.length}

                <Button
                  variant="primary"
                  onClick={this.addItem}
                  tabIndex={1}
                  title="Add an Initiative Slot"
                >
                  Add New
                </Button>

                <Button
                  variant="primary"
                  onClick={this.selectNextItem}
                  tabIndex={1}
                  title="Select the next Initiative Slot"
                  disabled={this.state.editItemIndex >= this.initMap.length - 1}
                >
                  Next
                </Button>

              </Modal.Footer>

            </Modal>
            <div className="text-center control-bar">
              <div className="text-left">
                <Button
                  variant="primary"
                  onClick={this.initBackward}
                  tabIndex={0}
                  title="Move to the last initiative"
                >
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </Button>
              </div>

{!this.state.hideControls ? (
  <>
              <div className="">
                <Button
                  variant="primary"
                  onClick={this.addItem}
                  tabIndex={1}
                  title="Add an Initiative Slot"
                >
                  Add
                </Button>
              </div>

              <div className="">
                <Button
                  variant="primary"
                  onClick={this.sortInit}
                  tabIndex={2}
                  title="Sort"
                >
                  Sort
                </Button>
              </div>
  </>
) : (
  <></>
)}
              <div className="grow text-right">
                <Button
                  variant="primary"
                  onClick={this.initForward}
                  tabIndex={4}
                  title="Move to the next initiative"
                >
                  Next Turn
                  &nbsp;<FontAwesomeIcon icon={faAngleDoubleRight} />&nbsp;
                </Button>
              </div>
            </div>

        <div className="row">
          <div className="col-md-6 round-number">
            <strong>Round Number:</strong> {this.state.roundNumber}
            <Button
              variant="primary"
              className="btn-xs"
              onClick={this.resetRound}
            >
              <FontAwesomeIcon icon={faRecycle} />
            </Button>
          </div>
          <div className="col-md-6 control-visibility">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.hideControls}
                  onChange={this.toggleHideControls}
                />&nbsp;Hide Edit Controls
              </label>
              &nbsp;|&nbsp;
              <label>
                <input
                  type="checkbox"
                  checked={this.state.hideRolls}
                  onChange={this.toggleHideRolls}
                />&nbsp;Hide Rolls
              </label>
          </div>
        </div>

        {this.initMap.length === 0 ?
        (
          <div className="text-center">
            <br />
              You have no initiative slots. Click on the&nbsp;
                <Button
                  variant="primary"
                  onClick={this.addItem}
                  tabIndex={1}
                  className="btn-xs"
                  title="Add an Initiative Slot"
                >
                  Add
                </Button>
              &nbsp;button above to add a slot.
          </div>
        ): (
           <div className="init-labels">
          {this.initMap.map( (mapItem, mapIndex ) => {
            let dieResults: ReactElement[] = [];

            for( let successCount = 0; successCount < mapItem.successes; successCount++ ) {
              dieResults.push(
                <span title="Success" key={"s" + successCount} className={this.props.appGlobals.settings.dieIconClass + " icon-single"}>{success}</span>
              )
            }

            for( let successCount = 0; successCount < mapItem.advantages; successCount++ ) {
              dieResults.push(
                <span title="Advantage" key={"a" + successCount} className={this.props.appGlobals.settings.dieIconClass + " icon-single"}>{advantage}</span>
              )
            }

            for( let successCount = 0; successCount < mapItem.triumphs; successCount++ ) {
              dieResults.push(
                <span title="Triumph" key={"t" + successCount} className={this.props.appGlobals.settings.dieIconClass + " icon-single"}>{triumph}</span>
              )
            }

            let skillCoolDieView: ReactElement[] = [];
            let maxValue = 0;
            let minValue = 0;
            if( mapItem.skillCool.attributeDice > mapItem.skillCool.skillDice  ) {
                maxValue =  mapItem.skillCool.attributeDice;
                minValue =  mapItem.skillCool.skillDice;
            } else {
                maxValue =  mapItem.skillCool.skillDice;
                minValue =  mapItem.skillCool.attributeDice;
            }

            for( let lCount = 0; lCount < maxValue; lCount++ ) {
                if( lCount < minValue ) {
                  skillCoolDieView.push(
                        <span key={lCount} className="dice die-proficiency">c</span>
                    )
                } else {
                  skillCoolDieView.push(
                        <span key={lCount} className="dice die-ability">c</span>
                    )
                }
            }

            let skillVigilanceDieView: ReactElement[] = [];
            maxValue = 0;
            minValue = 0;
            if( mapItem.skillVigilance.attributeDice > mapItem.skillVigilance.skillDice  ) {
                maxValue =  mapItem.skillVigilance.attributeDice;
                minValue =  mapItem.skillVigilance.skillDice;
            } else {
                maxValue =  mapItem.skillVigilance.skillDice;
                minValue =  mapItem.skillVigilance.attributeDice;
            }

            for( let lCount = 0; lCount < maxValue; lCount++ ) {
                if( lCount < minValue ) {
                  skillVigilanceDieView.push(
                        <span key={lCount} className="dice die-proficiency">c</span>
                    )
                } else {
                  skillVigilanceDieView.push(
                        <span key={lCount} className="dice die-ability">c</span>
                    )
                }
            }

            return (
              <div className={mapIndex === this.currentInitiative ? "init-map-item current" : "init-map-item"} key={mapIndex}>
                <div className={mapItem.npc ? "label npc" : "label pc"}>
                  <div className="name-results">
                    {mapItem.label}<br />
{!this.state.hideRolls || !this.state.hideControls ? (
<>
  &nbsp;{dieResults}
</>
) : (
  <>
  </>
)}

                  </div>
                    {
                      !this.state.hideControls && (
                      mapItem.skillCool.attributeDice > 0
                      || mapItem.skillCool.skillDice > 0
                      || mapItem.skillVigilance.attributeDice > 0
                      || mapItem.skillVigilance.skillDice > 0
                      )
                    ? (
                      <>
                      <div className="skill-values">
                        <table>
                          <tbody>
                            <tr>
                              <td className="text-right">

                                Cool:<br />
                                <Button
                                  variant="primary"
                                  onClick={() => this.rollCool( mapIndex )}
                                  className="btn-xs"
                                >
                                  <FontAwesomeIcon icon={faDice} />
                                </Button>&nbsp;
                              </td>
                              <td className="text-left">{skillCoolDieView}</td>
                            </tr>
                            <tr>
                              <td className="text-right">

                                Vigilance:<br />
                                <Button
                                  variant="primary"
                                  onClick={() => this.rollVigilance( mapIndex )}
                                  className="btn-xs"
                                >
                                  <FontAwesomeIcon icon={faDice} />
                                </Button>&nbsp;
                              </td>
                              <td className="text-right">{skillVigilanceDieView}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      </>
                    ) : (
                      <></>
                    )
                  }

                </div>

                <div className="controls">
                {!this.state.hideControls ? (
                  <>
                <Button
                    variant="primary"
                    // tabIndex={mapIndex + this.initMap.length + 5}
                    onClick={() => this.editSlot(mapItem, mapIndex)}
                    title="Edit this initiative slot"
                  >
                    <FontAwesomeIcon icon={faCog} />
                </Button>
                  </>
                ) : (
                  <></>
                )}

                  <Button
                    variant="primary"
                    tabIndex={mapIndex + this.initMap.length + 5}
                    onClick={() => this.removeSlot(mapIndex)}
                    title="Remove this initiative slot"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            )
          })}
          </div>
          )}
        </UIPage>
      );
    }
}

interface IInitMapItem {
  label: string;
  successes: number;
  advantages: number;
  triumphs: number;
  npc: boolean;
  skillVigilance: ISkillValue;
  skillCool: ISkillValue;
}

export interface ISkillValue {
  attributeDice: number;
  skillDice: number;
}

interface IInitiativeProps {
  appGlobals: IAppGlobals;
}

interface IInitiativeState {
    updated: boolean;
    editItem: IInitMapItem | null;
    editItemIndex: number;
    hideControls: boolean;
    hideRolls: boolean;
    roundNumber: number;
}