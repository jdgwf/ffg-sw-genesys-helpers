import React from 'react';
import './Initiative.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export default class Initiative extends React.Component<IInitiativeProps, IInitiativeState> {
    numPCs = 4;
    numNPCs = 2;

    currentInitiative = -1;

    initMap: IInitMapItem[] = [];
    constructor(props: IInitiativeProps) {
        super(props);
        this.state = {
            updated: false,
        }

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
            });
          }
        }

        this.updateInitSuccesses = this.updateInitSuccesses.bind(this);
        this.updateInitAdvantages = this.updateInitAdvantages.bind(this);
        this.updateNumPCs = this.updateNumPCs.bind(this);
        this.addNPC = this.addNPC.bind(this);
        this.addPC = this.addPC.bind(this);
        this.sortInit = this.sortInit.bind(this);

        this.initForward = this.initForward.bind(this);
        this.initBackward = this.initBackward.bind(this);

        this.removeSlot = this.removeSlot.bind(this);
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

    addNPC() {
      this.initMap.push( {
        label: "NPC",
        successes: 0,
        advantages: 0,
      });

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    addPC() {
      this.initMap.push( {
        label: "PC",
        successes: 0,
        advantages: 0,
      });

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
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
    ) {
      if( this.initMap.length > indexNumber ) {
        this.initMap[indexNumber].advantages = newValue;
      }

      localStorage.setItem("initMap", JSON.stringify( this.initMap) );

      this.setState({
        updated: true,
      })
    }

    updateInitSuccesses(
      indexNumber: number,
      newValue: number
    ) {
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

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Initiative");
    }

    render() {
      return (
        <UIPage current="initiative" appGlobals={this.props.appGlobals}>
            <div className="text-center control-bar">
              <div className="text-left grow">
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
                  onClick={this.addPC}
                  tabIndex={1}
                  title="Add a PC"
                >
                  Add PC
                </Button>
              </div>
              <div className="grow">
                <Button
                  variant="primary"
                  onClick={this.sortInit}
                  tabIndex={2}
                  title="Sort by Success, Advantages, then PC vs NPC"
                >
                  Sort
                </Button>
              </div>
              <div className="">
                <Button
                  variant="primary"
                  onClick={this.addNPC}
                  tabIndex={3}
                  title="Add an NPC"
                >
                  Add NPC
                </Button>
              </div>

              <div className="grow text-right">
                <Button
                  variant="primary"
                  onClick={this.initForward}
                  tabIndex={4}
                  title="Move to the next initiative"
                >
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Button>
              </div>
            </div>

          {this.initMap.map( (mapItem, mapIndex ) => {
            return (
              <div className={mapIndex === this.currentInitiative ? "init-map-item current" : "init-map-item"} key={mapIndex}>
                <div className={mapItem.label === "PC" ? "label pc" : "label npc"}>
                  {mapItem.label}
                </div>
                <div className="successes">
                <label>

                    {/* <input
                      type="number"
                      step="1"
                      value={mapItem.successes}
                      size={3}
                      className="text-center"
                      onChange={(event: React.FormEvent<HTMLInputElement>) => this.updateInitSuccesses( mapIndex, +event.currentTarget.value)}
                      tabIndex={mapIndex + 5}
                    /> */}
                    <select
                      value={mapItem.successes}
                      className="text-center"
                      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.updateInitSuccesses( mapIndex, +event.currentTarget.value)}
                      tabIndex={mapIndex + 5}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                    <span>Successes</span>
                  </label>
                </div>
                <div className="advantages">
                  <label>

                    {/* <input
                      type="number"
                      step="1"
                      value={mapItem.advantages}
                      size={2}
                      className="text-center"
                      onChange={(event: React.FormEvent<HTMLInputElement>) => this.updateInitAdvantages( mapIndex, +event.currentTarget.value)}
                      tabIndex={mapIndex + 5}
                    /> */}
                    <select
                      value={mapItem.advantages}
                      className="text-center"
                      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.updateInitAdvantages( mapIndex, +event.currentTarget.value)}
                      tabIndex={mapIndex + 5}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                    <span>Advantages</span>
                  </label>
                </div>
                <div className="controls">
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
}

interface IInitiativeProps {
  appGlobals: IAppGlobals;
}

interface IInitiativeState {
    updated: boolean;

}