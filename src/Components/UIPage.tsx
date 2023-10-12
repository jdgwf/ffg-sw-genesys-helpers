import React from 'react';
import {IAppGlobals} from '../AppRouter';
import ShowAlerts from './ShowAlerts';
import TopMenu from './TopMenu';

export default class UIPage extends React.Component<IUIPageProps, IUIPageState> {

    render() {
        return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current={this.props.current} sub={this.props.sub} appGlobals={this.props.appGlobals} />
          <div className={this.props.className ? "content " + this.props.className : "content"}>
            <ShowAlerts appGlobals={this.props.appGlobals} />
            {this.props.children}
          </div>
        </div>
        )
    }
}

interface IUIPageProps {
    appGlobals: IAppGlobals;
    current?: string;
    sub?: string;
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
  }

  interface IUIPageState {
      updated: boolean;

  }