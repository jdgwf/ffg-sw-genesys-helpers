import React from 'react';

export default class NumericalDropDown extends React.Component<INumericalDropDownProps, INumericalDropDownState> {

    start = 1;
    stop = 5;
    constructor(props: INumericalDropDownProps) {
      super(props);


      if( typeof( this.props.start ) !== "undefined") {
        this.start = this.props.start;
      }

      if( typeof( this.props.stop ) !== "undefined") {
        this.stop = this.props.stop;
      }

      this.state = {
        updated: false,
      };
      this.updateItem = this.updateItem.bind(this);
    }

    updateItem( event: React.FormEvent<HTMLSelectElement>) {
      this.props.onChange(
        +event.currentTarget.value,
        this.props.attribute
      );
    }

    render() {
        let options: React.ReactFragment[] = [];

        for( let counter = this.start; counter < this.stop; counter++ ) {
          options.push(
            <option value={counter}>{counter}</option>
          )
        }
        return (
        <select
          value={this.props.value}
          onChange={this.updateItem}
        >
          {options}
        </select>
        )
    }
}


interface INumericalDropDownProps {
    value: number;
    onChange( newValue: number, attribute: string ): void;
    attribute: string;
    start?: number;
    stop?: number;
  }

  interface INumericalDropDownState {
      updated: boolean;
  }