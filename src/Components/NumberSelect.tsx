import React, { ReactElement } from 'react';
import './NumberSelect.scss';

export default class NumberSelect extends React.Component<INumberSelectProps, INumberSelectState> {

    className: string = "";
    max: number = 8;

    constructor(props: INumberSelectProps) {
        super(props);
        if( this.props.className ) {
            this.className = this.props.className;
        }
        if( this.props.max ) {
            this.max = this.props.max;
        }
    }

    render() {
        let numberSelectUI: ReactElement[] = [];

        for( let numberSelect = 0; numberSelect < this.max; numberSelect++) {
            numberSelectUI.push(
                <span
                    key={"ns" + numberSelect}
                onClick={() => this.props.onChange(this.props.index, numberSelect)}
                className={this.props.value === numberSelect ? "selected" : ""}
            >
                    {numberSelect}
                </span>
            )
        }

        return (
            <div className="number-select">
                {numberSelectUI}
            </div>
        )
    }
}


interface INumberSelectProps {
    value: number;
    onChange(
        indexNumber: number,
        newValue: number
    ): void;
    index: number;
    max?: number;
    className?: string;
  }

  interface INumberSelectState {
      updated: boolean;

  }