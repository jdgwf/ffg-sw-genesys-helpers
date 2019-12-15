import React, { ReactElement } from 'react';
import './Initiative.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDoubleLeft, faAngleDoubleRight, faCog, faDice } from '@fortawesome/free-solid-svg-icons';
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
        this.state = {
            updated: false,
            editItem: null,
            editItemIndex: -1,
        };

        const lsNumPCs = localStorage.getItem("numPCs");
        const lsInitMap = localStorage.getItem("initMap");
        const lsCurrentInitiative = localStorage.getItem("currentInitiative");

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
                abilityDice: 0,
              },
              skillVigilanice: {
                skillDice: 0,
                abilityDice: 0,
              },
            });
          }
        }

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
    }

    updateNPC( event: React.FormEvent<HTMLInputElement> ) {
      if( this.state.editItem && this.state.editItemIndex < this.initMap.length ) {
        this.initMap[ this.state.editItemIndex].npc = event.currentTarget.checked;
        this.state.editItem.npc = event.currentTarget.checked;
        if( event.currentTarget.checked ) {
          this.initMap[ this.state.editItemIndex].label = "NPC";
          this.state.editItem.label = "NPC";
        } else {
          this.initMap[ this.state.editItemIndex].label = "PC";
          this.state.editItem.label = "PC";
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
          this.getAbilityDice( this.initMap[indexNumber].skillCool), // ability: number = 0,
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
          this.getAbilityDice( this.initMap[indexNumber].skillVigilanice), // ability: number = 0,
          this.getProcidiencyDice( this.initMap[indexNumber].skillVigilanice),// proficiency: number = 0,
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

    getAbilityDice( skill: ISKillValue ): number {
      let maxValue = 0;
      let minValue = 0;
      if( skill.abilityDice > skill.skillDice  ) {
          maxValue =  skill.abilityDice;
          minValue =  skill.skillDice;
      } else {
          maxValue =  skill.skillDice;
          minValue =  skill.abilityDice;
      }
      return (maxValue - minValue);
    }

    getProcidiencyDice( skill: ISKillValue ): number {
      let minValue = 0;
      if( skill.abilityDice > skill.skillDice  ) {
          minValue =  skill.skillDice;
      } else {
          minValue =  skill.abilityDice;
      }

      return minValue;
    }

    updateCoolValue(
      indexNumber: number,
      newValue: ISKillValue
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
      newValue: ISKillValue
    ): void {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].skillVigilanice = newValue;
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
      if( init > this.initMap.length - 1 ) {
        init = 0;
      }

      this.currentInitiative = init;
      localStorage.setItem("currentInitiative", init.toString() );
      this.setState({
        updated: true,
      })
    }

    initBackward() {
      let init = this.currentInitiative - 1;
      if( init < 0 ) {
        init = this.initMap.length;
      }

      this.currentInitiative = init;
      localStorage.setItem("currentInitiative", init.toString() );
      this.setState({
        updated: true,
      })
    }

    sortInit() {
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
          abilityDice: 0,
        },
        skillVigilanice: {
          skillDice: 0,
          abilityDice: 0,
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

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
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
                    value={this.state.editItem.skillVigilanice}
                    index={this.state.editItemIndex}
                    onChange={this.updateVigilanceValue}
                    label="Vigilance"
                  />
                </div>
              ) : (
                <></>
              )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={this.handleClose}
                >
                  Close
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
              <div className="">
                <Button
                  variant="primary"
                  onClick={this.addItem}
                  tabIndex={1}
                  title="Add a PC"
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
            if( mapItem.skillCool.abilityDice > mapItem.skillCool.skillDice  ) {
                maxValue =  mapItem.skillCool.abilityDice;
                minValue =  mapItem.skillCool.skillDice;
            } else {
                maxValue =  mapItem.skillCool.skillDice;
                minValue =  mapItem.skillCool.abilityDice;
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
            if( mapItem.skillVigilanice.abilityDice > mapItem.skillVigilanice.skillDice  ) {
                maxValue =  mapItem.skillVigilanice.abilityDice;
                minValue =  mapItem.skillVigilanice.skillDice;
            } else {
                maxValue =  mapItem.skillVigilanice.skillDice;
                minValue =  mapItem.skillVigilanice.abilityDice;
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
                    &nbsp;{dieResults}
                  </div>
                  {
                    mapItem.skillCool.abilityDice > 0
                    || mapItem.skillCool.skillDice > 0
                    || mapItem.skillVigilanice.abilityDice > 0
                    || mapItem.skillVigilanice.skillDice > 0

                    ? (
                      <>
                      <div className="skill-values">
                        <table>
                          <tbody>
                            <tr>
                              <td className="text-right">

                                Cool:&nbsp;
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

                                Vigilance:&nbsp;
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
                <Button
                    variant="primary"
                    // tabIndex={mapIndex + this.initMap.length + 5}
                    onClick={() => this.editSlot(mapItem, mapIndex)}
                    title="Edit this initiative slot"
                  >
                    <FontAwesomeIcon icon={faCog} />
                  </Button>
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
  skillVigilanice: {
    abilityDice: number;
    skillDice: number;
  };
  skillCool: ISKillValue;
}

export interface ISKillValue {
  abilityDice: number;
  skillDice: number;
}

interface IInitiativeProps {
  appGlobals: IAppGlobals;
}

interface IInitiativeState {
    updated: boolean;
    editItem: IInitMapItem | null;
    editItemIndex: number;
}