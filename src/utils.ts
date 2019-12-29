export function replaceAll(
    incoming: string,
    findString: string,
    replaceWith: string,
): string {
    let processedString = incoming;
    while( processedString.indexOf(findString) > -1 ) {
        processedString = processedString.replace( findString, replaceWith);
    }
    return processedString;
}

export function replaceDieTags(
    incomingString: string,
    starWarDice: boolean = false,
    extension: string = "png",
    size: string = "",
) {

    // let sizeExtension = "";
    // if( size ) {
    //     sizeExtension = "-" + size + "." + extension;
    // } else {
    let sizeExtension = "." + extension
    let heightTag = "";
    if( size ) {
        heightTag = "width=\"" + size + "px\" height=\"" + size + "px\"";
    }
    // }

    let proficiency = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/proficiency-die" + sizeExtension + "\" />";
    let ability = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/ability-die" + sizeExtension + "\" />";
    let boost = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/boost-die" + sizeExtension + "\" />";

    let setback = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/setback-die" + sizeExtension + "\" />";
    let difficulty = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/difficulty-die" + sizeExtension + "\" />";
    let challenge = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/challenge-die" + sizeExtension + "\" />";

    let force = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/force-die" + sizeExtension + "\" />";

    let success = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/success" + sizeExtension + "\" />";
    let advantage = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/advantage" + sizeExtension + "\" />";

    let threat = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/threat" + sizeExtension + "\" />";
    let failure = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/failure" + sizeExtension + "\" />";

    let despair = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/despair" + sizeExtension + "\" />";
    let triumph = "<img " + heightTag + " class=\"inline-die-png\" src=\"./img/triumph" + sizeExtension + "\" />";

    incomingString = replaceAll( incomingString, "[proficiency]", proficiency);
    incomingString = replaceAll( incomingString, "[ability]", ability)
    incomingString = replaceAll( incomingString, "[boost]", boost);

    incomingString = replaceAll( incomingString, "[setback]", setback);
    incomingString = replaceAll( incomingString, "[difficulty]", difficulty);
    incomingString = replaceAll( incomingString, "[challenge]", challenge);

    incomingString = replaceAll( incomingString, "[force]", force);

    incomingString = replaceAll( incomingString, "[success]", success);
    incomingString = replaceAll( incomingString, "[advantage]", advantage);

    incomingString = replaceAll( incomingString, "[threat]", threat);
    incomingString = replaceAll( incomingString, "[failure]", failure);

    incomingString = replaceAll( incomingString, "[despair]", despair);
    incomingString = replaceAll( incomingString, "[triumph]", triumph);

    return incomingString;
}