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
            name: "[ability]",
            alt1: "<A>",
        },
        {
            name: "[proficiency]",
            alt1: "<P>",
        },
        {
            name: "[boost]",
            alt1: "<B>",
        },
        {
            name: "[difficulty]",
            alt1: "<D>",
        },
        {
            name: "[challenge]",
            alt1: "<C>",
        },
        {
            name: "[setback]",
            alt1: "<S>",
        },
        {
            name: "[force]",
            alt1: "<F>",
        },

    ]

    dieFaceCodes: IDieCodes[] = [
        {
            name: "[advantage]",
            alt1: "<AD>",
        },
        {
            name: "[threat]",
            alt1: "<TH>",
        },
        {
            name: "[triumph]",
            alt1: "<TR>",
        },
        {
            name: "[despair]",
            alt1: "<DR>",
        },
        {
            name: "[success]",
            alt1: "<SU>",
        },
        {
            name: "[setback]",
            alt1: "<S>",
        },
        {
            name: "[failure]",
            alt1: "<FA>",
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
      />&nbsp;{shortcode.name}/{shortcode.alt1}
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
        />&nbsp;{shortcode.name}/{shortcode.alt1}
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