import React from 'react';
// import './Temp.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';

export default class Temp extends React.Component<ITempProps, ITempState> {
    constructor(props: ITempProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Temp");
    }

    render() {
      return (
        <UIPage current="Temp" appGlobals={this.props.appGlobals}>

          <p className="text-box">
            <span className='symbols'>a</span> = Advantage<br />
            <span className='symbols'>h</span> = Threat<br />
            <span className='symbols'>f</span> = Failure<br />
            <span className='symbols'>s</span> = Success<br />
            <span className='symbols'>t</span> = Triumph<br />
            <span className='symbols'>d</span> = Despair<br />
            <span className='die-setback'>b</span> = Setback Dice<br />
            <span className='die-boost'>b</span> = Boost Dice<br />
            <span className='die-difficulty'>d</span> = Difficulty Dice<br />
            <span className='die-ability'>d</span> = Ability Dice<br />
            <span className='die-challenge'>c</span> = Challenge Dice<br />
            <span className='die-proficiency'>c</span> = Proficiency Dice <br />
          </p>
          <p>Star Wars<br />
            <span className='dice'>s</span> = Success<br />
            <span className='dice'>a</span> = Advantage<br />
            <span className='dice'>x</span> = Triumph<br />
            <br />
            <span className='dice'>f</span> = Failure<br />
            <span className='dice'>t</span> = Threat<br />
            <span className='dice'>y</span> = Despair<br />
          </p>
        </UIPage>
      );
    }
}

interface ITempProps {
  appGlobals: IAppGlobals;
}

interface ITempState {
    updated: boolean;

}