import React from 'react';
import { IDieResult } from '../Classes/Dice';
import { IAppGlobals } from '../AppRouter';

export default class Die extends React.Component<IDieProps, {}> {

    className: string = "";

    constructor(props: IDieProps) {
        super(props);
        if( this.props.className ) {
            this.className = this.props.className;
        }
    }

    render() {
        let success = "s";
        let advantage = "a";
        let triumph = "t";

        let failure = "f";
        let threat= "h";
        let despair = "d";

        if( this.props.appGlobals.settings.dieIconClass === "starwars") {
            success = "s";
            advantage = "a";
            triumph = "x";

            failure = "f";
            threat= "t";
            despair = "y";
        }

        return (
            <span
                className={"die die-" + this.props.dieResult.type + " " + this.className}
                title={this.props.dieResult.title}
            >
                <span className="die-bg">
                    {this.props.dieResult.type === "setback" ? (
                        <span className="setback">b</span>
                    ) : (
                        <></>
                    )}
                    {this.props.dieResult.type === "boost" ? (
                        <span className="boost">b</span>
                    ) : (
                        <></>
                    )}
                    {this.props.dieResult.type === "difficulty" ? (
                        <span className="difficulty">d</span>
                    ) : (
                        <></>
                    )}
                    {this.props.dieResult.type === "ability" ? (
                        <span className="ability">d</span>
                    ) : (
                        <></>
                    )}
                    {this.props.dieResult.type === "challenge" ? (
                        <span className="challenge">c</span>
                    ) : (
                        <></>
                    )}
                    {this.props.dieResult.type === "proficiency" ? (
                        <span className="proficiency">c</span>
                    ) : (
                        <></>
                    )}
                </span>
                <span className={"die-face " + this.props.appGlobals.settings.dieIconClass }>
                    {this.props.dieResult.triumphs === 1 ?
                    (
                        <span className="icon-single">{triumph}</span>
                    ) : (
                        <>
                            {this.props.dieResult.despairs === 1 ?
                            (
                              <span className="icon-single">{despair}</span>
                            ) : (
                                <>
                                    {this.props.dieResult.successes === 1 ? (
                                        <>
                                        {this.props.dieResult.advantages === 1 ? (
                                            <>
                                                <span className="icon-1">{success}</span>
                                                <span className="icon-2">{advantage}</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">{success}</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.successes === 2 ? (
                                        <>
                                            <span className="icon-1">{success}</span>
                                            <span className="icon-2">{success}</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.advantages === 1 ? (
                                        <>
                                        {this.props.dieResult.successes === 1 ? (
                                            <>
                                                <span className="icon-1">{success}</span>
                                                <span className="icon-2">{advantage}</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">{advantage}</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.advantages === 2 ? (
                                        <>
                                            <span className="icon-1">{advantage}</span>
                                            <span className="icon-2">{advantage}</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.failures === 1 ? (
                                        <>
                                        {this.props.dieResult.threats === 1 ? (
                                            <>
                                                <span className="icon-1">{failure}</span>
                                                <span className="icon-2">{threat}</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">{failure}</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.failures === 2 ? (
                                        <>
                                            <span className="icon-1">{failure}</span>
                                            <span className="icon-2">{failure}</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.threats === 1 ? (
                                        <>
                                        {this.props.dieResult.failures === 1 ? (
                                            <>
                                                <span className="icon-1">{failure}</span>
                                                <span className="icon-2">{threat}</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">{threat}</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.threats === 2 ? (
                                        <>
                                            <span className="icon-1">{threat}</span>
                                            <span className="icon-2">{threat}</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </>
                    )}

                </span>
            </span>
        )
    }
}


interface IDieProps {
    appGlobals: IAppGlobals;
    dieResult: IDieResult;
    className?: string;
}

