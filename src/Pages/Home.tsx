import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Home");
    }

    render() {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>

            This will be a collection of quick utilities to help Star Wars and Genesys games.

        </UIPage>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}