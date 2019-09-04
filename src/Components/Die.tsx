import React from 'react';
import { IDieResult } from '../Classes/Dice';

export default class Die extends React.Component<IDieProps, {}> {


    render() {
        return (
            <span
                className={"die die-" + this.props.dieResult.type}
                title={this.props.dieResult.type}
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
                <span className="die-face">
                    {this.props.dieResult.triumphs === 1 ?
                    (
                        <span className="icon-single">t</span>
                    ) : (
                        <>
                            {this.props.dieResult.despairs === 1 ?
                            (
                              <span className="icon-single">d</span>
                            ) : (
                                <>
                                    {this.props.dieResult.successes === 1 ? (
                                        <>
                                        {this.props.dieResult.advantages === 1 ? (
                                            <>
                                                <span className="icon-1">s</span>
                                                <span className="icon-2">a</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">s</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.successes === 2 ? (
                                        <>
                                            <span className="icon-1">s</span>
                                            <span className="icon-2">s</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.advantages === 1 ? (
                                        <>
                                        {this.props.dieResult.successes === 1 ? (
                                            <>
                                                <span className="icon-1">s</span>
                                                <span className="icon-2">a</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">a</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.advantages === 2 ? (
                                        <>
                                            <span className="icon-1">a</span>
                                            <span className="icon-2">a</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.failures === 1 ? (
                                        <>
                                        {this.props.dieResult.threats === 1 ? (
                                            <>
                                                <span className="icon-1">f</span>
                                                <span className="icon-2">h</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">f</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.failures === 2 ? (
                                        <>
                                            <span className="icon-1">f</span>
                                            <span className="icon-2">f</span>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {this.props.dieResult.threats === 1 ? (
                                        <>
                                        {this.props.dieResult.failures === 1 ? (
                                            <>
                                                <span className="icon-1">f</span>
                                                <span className="icon-2">h</span>
                                            </>
                                        ) : (
                                            <span className="icon-single">h</span>
                                        )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.dieResult.threats === 2 ? (
                                        <>
                                            <span className="icon-1">h</span>
                                            <span className="icon-2">h</span>
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
    dieResult: IDieResult
}

