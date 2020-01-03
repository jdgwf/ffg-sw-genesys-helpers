import React from 'react';

export default class WoundDots extends React.Component<IWoundDotsProps, IWoundDotsState> {

    render() {
      let totalDotsArray: string[] = [];
      for( let counter = 0; counter <  this.props.number; counter++ ) {
        totalDotsArray.push("O")
      };
        return (
        <>
          {totalDotsArray.map( (dotText: string, indexNumber: number) => {
            return (
              <span key={indexNumber}>{dotText}&nbsp;</span>
            )
          })}
        </>
        )
    }
}

interface IWoundDotsProps {
  number: number;
}

interface IWoundDotsState {

}