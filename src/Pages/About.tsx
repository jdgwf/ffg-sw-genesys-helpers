import React from 'react';
import './About.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';

export default class About extends React.Component<IAboutProps, IAboutState> {
    constructor(props: IAboutProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("About");
    }

    render() {
      return (
        <UIPage current="about" appGlobals={this.props.appGlobals}>

          <p>Genesys and its logo, and Genesys Foundry and its logo, are trademarks of Fantasy Flight Games in the U.S.A. and other countries. All Fantasy Flight Games characters and character names, and the distinctive likenesses thereof, are trademarks of Fantasy Flight Games. <a href="http://www.FantasyFlightGames.com">www.FantasyFlightGames.com</a>.</p>

          <p>All other original material in this work is copyright 2019 by Jeffrey Gordon and published under the GPL. </p>

          <p>Star Wars and its logo are owned by Lucasfilm.</p>

          <hr />

          <p className="text-center">This project is licensed under the GPL and you can contribute to the source at <a href="https://github.com/jdgwf/ffg-sw-genesys-helpers">its GitHub repository.</a></p>

        </UIPage>
      );
    }
}

interface IAboutProps {
  appGlobals: IAppGlobals;
}

interface IAboutState {
    updated: boolean;

}