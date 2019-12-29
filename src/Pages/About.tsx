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

        <h2>Credits</h2>
          <h4>Jeffrey D. Gordon</h4>
          <strong>Developer and Designer</strong> - <a href="https://twitter.com/gauthic/">@Gauthic</a><br/>
          <p>Jeff has been playing tabletop role playing games since the very early 80's (or earlier!) and has been a professional developer since 1996. These tools, and several others, including &nbsp;<a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/savage-worlds-web-tools/">the Savage Worlds Web Tools project</a>, &nbsp;<a target="_blank" rel="noopener noreferrer" href="https://savaged.us">Savaged.us</a>, &nbsp;<a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/battletech-tools/">Gauthic's Battletech Tools</a>,&nbsp;and <a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/tournament-tracker/">Tournament Tracker</a>&nbsp;are all created and updated in his spare time while juggling work, family, and writing a handful of novels.</p>

        <h2>Copyrights and Attributions</h2>
          <p>Genesys and its logo, and Genesys Foundry and its logo, are trademarks of Fantasy Flight Games in the U.S.A. and other countries. All Fantasy Flight Games characters and character names, and the distinctive likenesses thereof, are trademarks of Fantasy Flight Games. <a href="http://www.FantasyFlightGames.com">www.FantasyFlightGames.com</a>.</p>

          <p>All other original material in this work is copyright 2019 by Jeffrey Gordon and published under the GPL. </p>

          <p>Star Wars and its logo are owned by Lucasfilm/Disney.</p>

          <p>Die icons are owned by Fantasy Flight Games and/or Lucasfilm/Disney.</p>

          <p>Some images and icons are from

            &nbsp;<a href="https://www.dropbox.com/sh/raqr7usuzwizglm/AACsYe6LVU_-f372tRG6vxtya?dl=0">DrainSmith's Dispensary of Genesys</a>
          </p>


          <p>This project is licensed under the GPL and you can contribute to the source at <a href="https://github.com/jdgwf/ffg-sw-genesys-helpers">its GitHub repository.</a></p>
        <h2>Support</h2>
        <p>Feel free to submit issues to the <a href="https://github.com/jdgwf/ffg-sw-genesys-helpers/issues">Github Repository</a></p>

        <h2>Privacy</h2>
        <p>This app doesn't track who, where, or when you use it, so I've no idea how well used it is. If you like it, feel free to tweet me at <a href="https://twitter.com/gauthic/">@Gauthic</a></p>
        <p>In the future a syncing function may be added which will likely use tracking cookies for the sync share (possibly Firebase or other open methods), at that point it will be all on the syncing server.</p>
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