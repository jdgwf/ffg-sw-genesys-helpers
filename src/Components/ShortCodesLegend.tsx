import React from 'react';

import { replaceDieTags } from '../utils';
import SanitizedHTML from './SanitizedHTML';


interface IDieCodes {
    name: string;
    alt1: string;
}
export default class ShortCodesLegend extends React.Component<IShortCodesLegendProps, IShortCodesLegendState> {

    dieCodes: IDieCodes[] = [
        {
            alt1: "[ability]",
            name: "<A>",
        },
        {
            alt1: "[proficiency]",
            name: "<P>",
        },
        {
            alt1: "[boost]",
            name: "<B>",
        },
        {
            alt1: "[difficulty]",
            name: "<D>",
        },
        {
            alt1: "[challenge]",
            name: "<C>",
        },
        {
            alt1: "[setback]",
            name: "<S>",
        },
        {
            alt1: "[force]",
            name: "<F>",
        },

    ]

    dieFaceCodes: IDieCodes[] = [
        {
            alt1: "[advantage]",
            name: "<AD>",
        },
        {
            alt1: "[threat]",
            name: "<TH>",
        },
        {
            alt1: "[triumph]",
            name: "<TR>",
        },
        {
            alt1: "[despair]",
            name: "<DR>",
        },
        {
            alt1: "[success]",
            name: "<SU>",
        },
        {
            alt1: "[failure]",
            name: "<FA>",
        },

    ]

    render() {
        return (
        <div>
Shortcodes:
        <div className="shortcode-legend small-text">
{this.dieCodes.map( (shortcode, shortcodeIndex) => {
  return (
    <div key={shortcodeIndex}>
      <SanitizedHTML
        raw={true}
        html={replaceDieTags(shortcode.name)}
      />&nbsp;{shortcode.name}
    </div>
  )
})}
             </div>
             <div className="shortcode-legend small-text">
{this.dieFaceCodes.map( (shortcode, shortcodeIndex) => {
  return (
    <div key={shortcodeIndex}>
      <SanitizedHTML
        raw={true}
        html={replaceDieTags(shortcode.name)}
        />&nbsp;{shortcode.name}
    </div>
  )
})}
             </div>
        </div>
        )
    }
}

interface IShortCodesLegendProps {

  }

  interface IShortCodesLegendState {
  }