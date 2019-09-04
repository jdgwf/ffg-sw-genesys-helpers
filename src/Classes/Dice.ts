export interface IDiceResults {
    rolls: IDieResult[];
    netSuccesses: number;
    netAdvantages: number;
    netFailures: number;
    netThreats: number;
    netTriumphs: number;
    netDespairs: number;
    netLightSide: number;
    netDarkSide: number;
    grossSuccesses: number;
    grossAdvantages: number;
    grossFailures: number;
    grossThreats: number;
    grossTriumphs: number;
    grossDespairs: number;
    grossLightSide: number;
    grossDarkSide: number;

    total: number;
}

export interface IDieResult {
    type: string;
    numSides: number;
    rawRoll: number;
    successes: number;
    advantages: number;
    failures: number;
    threats: number;
    triumphs: number;
    despairs: number;
    lightSide: number;
    darkSide: number;
}

export default class Dice {

    private _getRandomInt(numberOfSides: number): number {
        return Math.floor(Math.random() * Math.floor(numberOfSides));
    }

    public rollDie( numberOfSides: number = 6 ): number {
        return this._getRandomInt( numberOfSides) + 1;
    }

    public rollFGDice(
        ability: number = 0,
        proficiency: number = 0,
        boosts: number = 0,

        difficulty: number = 0,
        challlenge: number = 0,
        setback: number = 0,

        force: number = 0,
    ): IDiceResults {

        let netSuccesses: number = 0;
        let netAdvantages: number = 0;
        let netFailures: number = 0;
        let netThreats: number = 0;
        let netTriumphs: number = 0;
        let netDespairs: number = 0;
        let grossSuccesses: number = 0;
        let grossAdvantages: number = 0;
        let grossFailures: number = 0;
        let grossThreats: number = 0;
        let grossTriumphs: number = 0;
        let grossDespairs: number = 0;

        let netLightSide: number = 0;
        let grossLightSide: number = 0;

        let netDarkSide: number = 0;
        let grossDarkSide: number = 0;

        let rolls: IDieResult[] = [];

        // Ability Dice
        for( let dieCount = 0; dieCount < ability; dieCount++) {
            let roll = this.rollDie(8);
            let rawRoll = {
                type: "ability",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // one success
                    rawRoll.successes++;
                    break;
                }
                case 3: {
                    // one success
                    rawRoll.successes++;
                    break;
                }
                case 4: {
                    // two successes
                    rawRoll.successes++;
                    rawRoll.successes++;
                    break;
                }
                case 5: {
                    // one advantage
                    rawRoll.advantages++;
                    break;
                }
                case 6: {
                    // one advantage
                    rawRoll.advantages++;
                    break;
                }
                case 7: {
                    // one advantage, one success
                    rawRoll.advantages++;
                    rawRoll.successes++;
                    break;
                }
                case 8: {
                    // one advantages
                    rawRoll.advantages++;
                    rawRoll.advantages++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }

        // Difficulty Dice
        for( let dieCount = 0; dieCount < difficulty; dieCount++) {
            let roll = this.rollDie(8);
            let rawRoll = {
                type: "difficulty",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // one failure
                    rawRoll.failures++;
                    break;
                }
                case 3: {
                    // two failures
                    rawRoll.failures++;
                    rawRoll.failures++;
                    break;
                }
                case 4: {
                    // one theat
                    rawRoll.threats++;
                    break;
                }
                case 5: {
                    // one theat
                    rawRoll.threats++;
                    break;
                }
                case 6: {
                    // one theat
                    rawRoll.threats++;
                    break;
                }
                case 7: {
                    // two threats
                    rawRoll.threats++;
                    rawRoll.threats++;

                    break;
                }
                case 8: {
                    // one threat, one failure
                    rawRoll.threats++;
                    rawRoll.failures++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }

        // Boost Dice
        for( let dieCount = 0; dieCount < boosts; dieCount++) {
            let roll = this.rollDie(6);
            let rawRoll = {
                type: "boost",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // Do nothing, blank side
                    break;
                }
                case 3: {
                    // one success
                    rawRoll.successes++;
                    break;
                }
                case 4: {
                    // one success, one advantage
                    rawRoll.successes++;
                    rawRoll.advantages++;
                    break;
                }
                case 5: {
                    // two advantages
                    rawRoll.advantages++;
                    rawRoll.advantages++;
                    break;
                }
                case 6: {
                    // one advantage
                    rawRoll.advantages++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }

        // Setback Dice
        for( let dieCount = 0; dieCount < setback; dieCount++) {
            let roll = this.rollDie(6);
            let rawRoll = {
                type: "setback",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // Do nothing, blank side
                    break;
                }
                case 3: {
                    // one failure
                    rawRoll.failures++;
                    break;
                }
                case 4: {
                    // one failure
                    rawRoll.failures++;
                    break;
                }
                case 5: {
                    // one threat
                    rawRoll.threats++;
                    break;
                }
                case 6: {
                    // one threat
                    rawRoll.threats++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }

        // Proficiency Dice
        for( let dieCount = 0; dieCount < proficiency; dieCount++) {
            let roll = this.rollDie(12);
            let rawRoll = {
                type: "proficiency",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // one success
                    rawRoll.successes++;
                    break;
                }
                case 3: {
                    // one success
                    rawRoll.successes++;
                    break;
                }
                case 4: {
                    // two successes
                    rawRoll.successes++;
                    rawRoll.successes++;
                    break;
                }
                case 5: {
                    // two successes
                    rawRoll.successes++;
                    rawRoll.successes++;
                    break;
                }
                case 6: {
                    // one advantage
                    rawRoll.advantages++;
                    break;
                }
                case 7: {
                    // one advantage, one success
                    rawRoll.advantages++;
                    rawRoll.successes++;
                    break;
                }
                case 8: {
                    // one advantage, one success
                    rawRoll.advantages++;
                    rawRoll.successes++;

                    break;
                }
                case 9: {
                    // one advantage, one success
                    rawRoll.advantages++;
                    rawRoll.successes++;
                    break;
                }
                case 10: {
                    // two advantages
                    rawRoll.advantages++;
                    rawRoll.advantages++;
                    break;
                }
                case 11: {
                    // two advantages
                    rawRoll.advantages++;
                    rawRoll.advantages++;
                    break;
                }
                case 12: {
                    // one success and a triumph
                    rawRoll.successes++;
                    rawRoll.triumphs++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }


        // Challenge Dice
        for( let dieCount = 0; dieCount < challlenge; dieCount++) {
            let roll = this.rollDie(8);
            let rawRoll = {
                type: "challenge",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // Do nothing, blank side
                    break;
                }
                case 2: {
                    // one failure
                    rawRoll.failures++;
                    break;
                }
                case 3: {
                    // one failure
                    rawRoll.failures++;
                    break;
                }
                case 4: {
                    // two failures
                    rawRoll.failures++;
                    rawRoll.failures++;
                    break;
                }
                case 5: {
                    // two failures
                    rawRoll.failures++;
                    rawRoll.failures++;
                    break;
                }
                case 6: {
                    // one theat
                    rawRoll.threats++;
                    break;
                }
                case 7: {
                    // one theat
                    rawRoll.threats++;

                    break;
                }
                case 8: {
                    // one threat, one failure
                    rawRoll.threats++;
                    rawRoll.failures++;
                    break;
                }
                case 9: {
                    // one threat, one failure
                    rawRoll.threats++;
                    rawRoll.failures++;
                    break;
                }
                case 10: {
                    // two threats
                    rawRoll.threats++;
                    rawRoll.threats++;
                    break;
                }
                case 11: {
                    // two threats
                    rawRoll.threats++;
                    rawRoll.threats++;
                    break;
                }
                case 12: {
                    // one failure and a despair
                    rawRoll.failures++;
                    rawRoll.despairs++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }


        // Force Dice
        for( let dieCount = 0; dieCount < force; dieCount++) {
            let roll = this.rollDie(8);
            let rawRoll = {
                type: "force",
                numSides: 8,
                rawRoll: roll,
                successes: 0,
                advantages: 0,
                failures: 0,
                threats: 0,
                triumphs: 0,
                despairs: 0,
                lightSide: 0,
                darkSide: 0,
            }
            switch( roll ) {
                case 1: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 2: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 3: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 4: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 5: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 6: {
                    // one dark side
                    rawRoll.darkSide++;
                    break;
                }
                case 7: {
                    // two dark side
                    rawRoll.darkSide++;
                    rawRoll.darkSide++;

                    break;
                }
                case 8: {
                    // one light side
                    rawRoll.lightSide++;
                    break;
                }
                case 9: {
                    // one light side
                    rawRoll.lightSide++;
                    break;
                }
                case 10: {
                    // two light side
                    rawRoll.lightSide++;
                    rawRoll.lightSide++;
                    break;
                }
                case 11: {
                    // two light side
                    rawRoll.lightSide++;
                    rawRoll.lightSide++;
                    break;
                }
                case 12: {
                    // two light side
                    rawRoll.lightSide++;
                    rawRoll.lightSide++;
                    break;
                }
            }
            rolls.push( rawRoll );
        }

        // TODO Calculate gross values...
        for( let roll of rolls ) {
            netSuccesses += roll.successes;
            netAdvantages += roll.advantages;
            netFailures += roll.failures;
            netThreats += roll.threats;
            netDespairs += roll.despairs;
            netTriumphs += roll.triumphs;

            netLightSide += roll.lightSide;
            netDarkSide += roll.darkSide;
        }

        if( netSuccesses > netFailures ) {
            grossFailures = netSuccesses - netFailures;
        } else {
            grossSuccesses = netFailures - netSuccesses;
        }

        if( netThreats > netAdvantages ) {
            grossThreats = netThreats - netAdvantages;
        } else {
            grossAdvantages = netAdvantages - netThreats;
        }

        if( netDespairs > netTriumphs ) {
            grossDespairs = netDespairs - netTriumphs;
        } else {
            grossTriumphs = netTriumphs - netDespairs;
        }

        if( netDarkSide > netLightSide ) {
            grossDarkSide = netDarkSide - netLightSide;
        } else {
            grossLightSide = netLightSide - netDarkSide;
        }

        return {
            rolls: rolls,
            netSuccesses: netSuccesses,
            netAdvantages: netAdvantages,
            netFailures: netFailures,
            netThreats: netThreats,
            netTriumphs: netTriumphs,
            netDespairs: netDespairs,
            grossSuccesses: grossSuccesses,
            grossAdvantages: grossAdvantages,
            grossFailures: grossFailures,
            grossThreats: grossThreats,
            grossTriumphs: grossTriumphs,
            grossDespairs: grossDespairs,

            grossDarkSide: grossDarkSide,
            grossLightSide: grossLightSide,
            netLightSide: netLightSide,
            netDarkSide: netDarkSide,

            total: 0,
        }
    }
}