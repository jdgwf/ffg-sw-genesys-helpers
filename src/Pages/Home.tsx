import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDice, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

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
        <UIPage current="home" className="text-center" appGlobals={this.props.appGlobals}>

            This Progressive Web App is my collection of quick utilities and online and offline tools to help Fantasy <a target="out" href="https://www.edge-studio.net//">Flight Games</a>' <a target="out" href="https://www.edge-studio.net//en/starwarsrpg/">Star Wars</a> and <a href="https://www.edge-studio.net//en/products/genesys/" target="out">Genesys</a> games.
            <div className='text-center'>
              <div className="row">
                <div className="col-md">
                  <Link className="front-button btn btn-primary" to={`${process.env.PUBLIC_URL}/initiative`}>
                  <div className="icon-container">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="label">Initiative Tracker</div>

                    <div className="small-text">
                      Easily set up Players and Adversaries and either roll or calculate initiative orders
                    </div>
                  </Link>
                </div>
                <div className="col-md">
                  <Link className="front-button btn btn-primary" to={`${process.env.PUBLIC_URL}/adversary-creator`}>
                  <div className="icon-container">
                    <FontAwesomeIcon icon={faPeopleArrows} />
                  </div>
                  <div className="label">Genesys Adversary Creator</div>
                    <div className="small-text">
                      Create Balanced Adversaries as per the Expanded Players Guide
                    </div>
                  </Link>
                </div>
                <div className="col-md">
                  <Link className="front-button btn btn-primary" to={`${process.env.PUBLIC_URL}/dice`}>
                    <div className="icon-container">
                      <span className="dice die-ability">d</span>
                      <span className="dice die-difficulty">d</span>
                    </div>
                    <div className="label">Dice Pool Roller</div>
                    <div className="small-text">Just an online FFG Dice Pool Roller like many others.</div>
                  </Link>
                </div>
              </div>
            </div>
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