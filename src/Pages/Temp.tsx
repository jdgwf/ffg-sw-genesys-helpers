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
            <span className='setback'>b</span> = Setback Dice<br />
            <span className='boost'>b</span> = Boost Dice<br />
            <span className='difficulty'>d</span> = Difficulty Dice<br />
            <span className='ability'>d</span> = Ability Dice<br />
            <span className='challenge'>c</span> = Challenge Dice<br />
            <span className='proficiency'>c</span> = Proficiency Dice <br />
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