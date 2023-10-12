import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import Initiative from "./Pages/Initiative";
import Alerts from './Classes/Alerts';
import { Modal, Button } from 'react-bootstrap';
import SanitizedHTML from "./Components/SanitizedHTML";
import { CONFIGSiteTitle } from "./config";
import About from "./Pages/About";
import Settings from "./Pages/Settings";
import Temp from "./Pages/Temp";
import Dice from "./Pages/Dice";
import AdversaryCreator from "./Pages/AdversaryCreator";

export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {

    constructor(props: IAppRouterProps) {
        super(props);

        this.makeDocumentTitle = this.makeDocumentTitle.bind(this);
        this.openConfirmDialog = this.openConfirmDialog.bind(this);
        this.closeConfirmDialog = this.closeConfirmDialog.bind(this);
        this.confirmConfirmDialog = this.confirmConfirmDialog.bind(this);
        this.refreshGlobalState = this.refreshGlobalState.bind(this);
        this.toggleMobile = this.toggleMobile.bind(this);
        this.closeMobile = this.closeMobile.bind(this);
        this.saveSettings = this.saveSettings.bind(this);

        let uiTheme: string = "";
        let lsTheme = localStorage.getItem("uiTheme");
        if( lsTheme ) {
            uiTheme = lsTheme;
            document.body.className = uiTheme;
        } else {
            document.body.className = '';
        }

        let dieIconClass: string = "genesys";
        let lsDieIconClass = localStorage.getItem("dieIconClass");
        if( lsDieIconClass ) {
            dieIconClass = lsDieIconClass;
        }

        this.state = {
            updated: false,
            appGlobals: {
                settings: {
                    uiTheme: uiTheme,
                    dieIconClass: dieIconClass,
                },
                currentPageTitle: "",
                siteAlerts: new Alerts( this ),
                showMobile: false,
                confirmDialogMessage: "",
                confirmDialogTitle: "",
                confirmDialogYesLabel: "",
                confirmDialogNoLabel: "",
                showConfirmDialog: false,
                confirmDialogConfirm: null,
                makeDocumentTitle: this.makeDocumentTitle,
                openConfirmDialog: this.openConfirmDialog,
                refreshGlobalState: this.refreshGlobalState,
                toggleMobile: this.toggleMobile,
                closeMobile: this.closeMobile,

                saveSettings: this.saveSettings,
            }
        }

    }

    saveSettings( settings: ISettings ): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.settings = settings;
        this.setState({
            appGlobals: appGlobals,
        });

        if( settings.uiTheme.trim() ) {
            document.body.className = settings.uiTheme;
        } else {
            document.body.className = '';
        }

        localStorage.setItem("uiTheme", settings.uiTheme);
        localStorage.setItem("dieIconClass", settings.dieIconClass);
    }

    toggleMobile(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = !appGlobals.showMobile;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    closeMobile(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = false;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    makeDocumentTitle( subTitle: string = "" ): void {
        let appGlobals = this.state.appGlobals;
        if( subTitle ) {
            document.title = subTitle + " | " + CONFIGSiteTitle;
            appGlobals.currentPageTitle = subTitle;
            this.setState({
                appGlobals: appGlobals,
            })
        } else {
            document.title = CONFIGSiteTitle;
            appGlobals.currentPageTitle = subTitle;
            this.setState({
                appGlobals: appGlobals,
            })
        }
    }

    refreshGlobalState(appGlobals: IAppGlobals | null = null): void {
        if( !appGlobals ) {
            this.setState({
                updated: true,
            });
        } else {
            this.setState({
                updated: true,
                appGlobals: appGlobals,
            });
        }
    }

    closeConfirmDialog(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showConfirmDialog = false;
        this.setState({
            appGlobals: appGlobals,
        })
    }

    confirmConfirmDialog(): void {
        if( this.state.appGlobals ) {
            if( this.state.appGlobals.confirmDialogConfirm ) {
                this.state.appGlobals.confirmDialogConfirm();
            }
            let appGlobals = this.state.appGlobals;
            appGlobals.showConfirmDialog = false;
            this.setState({
                appGlobals: appGlobals,
            })
        }
    }

    openConfirmDialog(
        confirmTitle: string,
        confirmMessage: string,
        confirmYesLabel: string,
        confirmNoLabel: string,
        confirmCallback: Function,
    ): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.confirmDialogMessage = confirmMessage;
        appGlobals.confirmDialogTitle = confirmTitle;
        appGlobals.confirmDialogYesLabel = confirmYesLabel;
        appGlobals.confirmDialogNoLabel = confirmNoLabel;
        appGlobals.showConfirmDialog = true;
        appGlobals.confirmDialogConfirm = confirmCallback;
        this.setState({
            appGlobals: appGlobals,
        })
    }

    render() {
        return (
            <Router>
            <Modal show={this.state.appGlobals.showConfirmDialog} onHide={this.closeConfirmDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>
                            {this.state.appGlobals.confirmDialogTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form">
                        <div>
                            <SanitizedHTML html={this.state.appGlobals.confirmDialogMessage} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={this.closeConfirmDialog}>
                        {this.state.appGlobals.confirmDialogNoLabel}
                    </Button>
                    <Button variant="primary" onClick={this.confirmConfirmDialog}>
                        {this.state.appGlobals.confirmDialogYesLabel}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`}>
                    <Home
                        appGlobals={this.state.appGlobals}
                    />
                </Route>

                <Route path={`${process.env.PUBLIC_URL}/initiative`}>
                    <Initiative
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/about`}>
                    <About
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/temp`}>
                    <Temp
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/dice`}>
                    <Dice
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/adversary-creator`}>
                    <AdversaryCreator
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/settings`}>
                    <Settings
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route>
                    <Error404
                        appGlobals={this.state.appGlobals}
                    />
                </Route>

            </Routes>
            </Router>
        );
    }
}

interface IAppRouterProps {

}

interface ISettings {
    uiTheme: string;
    dieIconClass: string;
}

interface IAppRouterState {
    appGlobals: IAppGlobals;
    updated: boolean;
}

export interface IAppGlobals {
    currentPageTitle: string;
    siteAlerts: Alerts;
    settings: ISettings;
    showMobile: boolean;
    confirmDialogMessage: string;
    confirmDialogTitle: string;
    confirmDialogYesLabel: string;
    confirmDialogNoLabel: string;
    showConfirmDialog: boolean;
    confirmDialogConfirm: Function | null;
    refreshGlobalState(appGlobals: IAppGlobals | null): void;

    makeDocumentTitle( subTitle: string ): void;

    toggleMobile(): void;
    closeMobile(): void;

    openConfirmDialog(
        confirmTitle: string,
        confirmMessage: string,
        confirmYesLabel: string,
        confirmNoLabel: string,
        confirmCallback: Function,
    ): void;

    saveSettings( settings: ISettings ): void;
}