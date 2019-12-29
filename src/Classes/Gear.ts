import { replaceAll } from "../utils";

export class Gear {

    name: string = "";
    type: string = "equipment";
    qualities: string[] = [];
    skill: string = "";
    damage: string = "";
    critical: string = "";
    range: string = "";

    defense: string = "";
    soak: string = "";

    constructor( lineItem: string = "" ) {
        if( lineItem ) {
            this._parseLine( lineItem );
        }
    }

    private _parseLine( lineItem: string ) {

        if( lineItem.toLowerCase().indexOf( "damage ") > -1 ) {
            this.type = "weapon";
            let parenSplit = lineItem.split("(");
            this.name = parenSplit[0].trim();
            if( parenSplit.length > 1 ) {
                let semiSplit = parenSplit[1].replace(").", "").replace(")", "").split(";");
                for( let item of semiSplit) {
                    item = item.trim();
                    console.log("parse item", item)
                    if(
                        item.toLowerCase().indexOf("melee") === 0
                            ||
                        item.toLowerCase().indexOf("ranged") === 0
                    ) {
                        this.skill = item;
                    } else if (
                        item.toLowerCase().indexOf("damage ") === 0
                    ){
                        this.damage = item.replace("Damage", "").trim();
                    } else if (
                        item.toLowerCase().indexOf("critical ") === 0
                    ){
                        this.critical = item.replace("Critical", "").trim();
                    } else if (
                        item.toLowerCase().indexOf("range ") === 0
                    ){
                        this.range = item.replace("Range", "").trim();
                        this.range = replaceAll(this.range, "[", "")
                        this.range = replaceAll(this.range, "]", "")
                    } else if (
                        item.toLowerCase().indexOf(",") > -1
                    ){
                        this.qualities = item.split(",");
                    }

                }
            }
        } else if(
            lineItem.toLowerCase().indexOf( " soak") > -1
                &&
            lineItem.toLowerCase().indexOf( " defense") > -1
        ) {
            this.type = "armor";
            let parenSplit = lineItem.split("(");
            this.name = parenSplit[0].trim();
            if( parenSplit.length > 1 ) {
                let commaSplit = parenSplit[1].replace(").", "").replace(")", "").split(",");
                for( let item of commaSplit) {
                    item = item.trim();
                    if (
                        item.toLowerCase().indexOf("soak") > -1
                    ){
                        this.soak = item.replace("soak", "").trim();
                    } else if (
                        item.toLowerCase().indexOf("defense") > -1
                    ){
                        this.defense = item.replace("defense", "").trim();
                    }
                }
            }
        } else {
            this.type = "equipment";
            let parenSplit = lineItem.split("(");
            this.name = parenSplit[0].trim();
        }

        console.log("this", this);
    }
    exportString(): string {
        let exportString = this.name;

        if( this.type === "weapon" ) {
            exportString += " (";

            exportString += this.skill + ";"

            exportString += "Damage " + this.damage + ";"

            exportString += " Range ["+ this.range + "]"

            if( this.qualities.length > 0 )
                exportString += ";" + this.qualities.join( ", ")

            exportString += ")";
        } else if( this.type === "armor" ) {
            exportString += " (";
            if( +this.defense !== 0 ) {
                exportString += this.defense + " defense, "
            }
            if( +this.soak !== 0 ) {
                exportString += this.soak + " soak, "
            }
            exportString += ")";
            exportString = exportString.replace(", )", ")")
        }

        return exportString;
    }

}