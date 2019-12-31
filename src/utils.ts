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

    let sizeExtension = "." + extension
    let heightTag = "";
    if( size ) {
        heightTag = "width=\"" + size + "px\" height=\"" + size + "px\"";
    }

    let proficiency = "<img " + heightTag + " class=\"inline-die-png\" title=\"Proficiency Die\" alt=\"Proficiency Die\" src=\"./img/proficiency-die" + sizeExtension + "\" />";
    let ability = "<img " + heightTag + " class=\"inline-die-png\" title=\"Ability Die\" alt=\"Ability Die\" src=\"./img/ability-die" + sizeExtension + "\" />";
    let boost = "<img " + heightTag + " class=\"inline-die-png\" title=\"Boost Die\" alt=\"Boost Die\" src=\"./img/boost-die" + sizeExtension + "\" />";

    let setback = "<img " + heightTag + " class=\"inline-die-png\" title=\"Setback Die\" alt=\"Setback Die\" src=\"./img/setback-die" + sizeExtension + "\" />";
    let difficulty = "<img " + heightTag + " class=\"inline-die-png\" title=\"Difficulty Die\" alt=\"Difficulty Die\" src=\"./img/difficulty-die" + sizeExtension + "\" />";
    let challenge = "<img " + heightTag + " class=\"inline-die-png\" title=\"Challenge Die\" alt=\"Challenge Die\" src=\"./img/challenge-die" + sizeExtension + "\" />";

    let force = "<img " + heightTag + " class=\"inline-die-png\" title=\"Force Die\" alt=\"Force Die\" src=\"./img/force-die" + sizeExtension + "\" />";


    let success = "<img " + heightTag + " class=\"inline-die-png\" title=\"Success\" alt=\"Success\" src=\"./img/success" + sizeExtension + "\" />";
    let advantage = "<img " + heightTag + " class=\"inline-die-png\" title=\"Advantage\" alt=\"Advantage\"  src=\"./img/advantage" + sizeExtension + "\" />";

    let threat = "<img " + heightTag + " class=\"inline-die-png\" title=\"Threat\" alt=\"Threat\"  src=\"./img/threat" + sizeExtension + "\" />";
    let failure = "<img " + heightTag + " class=\"inline-die-png\" title=\"Failure\" alt=\"Failure\"  src=\"./img/failure" + sizeExtension + "\" />";

    let despair = "<img " + heightTag + " class=\"inline-die-png\" title=\"Despair\" alt=\"Despair\"  src=\"./img/despair" + sizeExtension + "\" />";
    let triumph = "<img " + heightTag + " class=\"inline-die-png\" title=\"Triumph\" alt=\"Triumph\"  src=\"./img/triumph" + sizeExtension + "\" />";

    if( starWarDice ) {
        success = "<img " + heightTag + " class=\"inline-die-png\" title=\"Success\" alt=\"Success\" src=\"./img/sw-success" + sizeExtension + "\" />";
        advantage = "<img " + heightTag + " class=\"inline-die-png\" title=\"Advantage\" alt=\"Advantage\"  src=\"./img/sw-advantage" + sizeExtension + "\" />";

        threat = "<img " + heightTag + " class=\"inline-die-png\" title=\"Threat\" alt=\"Threat\"  src=\"./img/sw-threat" + sizeExtension + "\" />";
        failure = "<img " + heightTag + " class=\"inline-die-png\" title=\"Failure\" alt=\"Failure\"  src=\"./img/sw-failure" + sizeExtension + "\" />";

        despair = "<img " + heightTag + " class=\"inline-die-png\" title=\"Despair\" alt=\"Despair\"  src=\"./img/sw-despair" + sizeExtension + "\" />";
        triumph = "<img " + heightTag + " class=\"inline-die-png\" title=\"Triumph\" alt=\"Triumph\"  src=\"./img/sw-triumph" + sizeExtension + "\" />";
    }

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

    incomingString = replaceAll( incomingString, "<P>", proficiency);
    incomingString = replaceAll( incomingString, "<A>", ability)
    incomingString = replaceAll( incomingString, "<B>", boost);

    incomingString = replaceAll( incomingString, "<S>", setback);
    incomingString = replaceAll( incomingString, "<D>", difficulty);
    incomingString = replaceAll( incomingString, "<C>", challenge);

    incomingString = replaceAll( incomingString, "<F>", force);

    incomingString = replaceAll( incomingString, "<SU>", success);
    incomingString = replaceAll( incomingString, "<AD>", advantage);

    incomingString = replaceAll( incomingString, "<TH>", threat);
    incomingString = replaceAll( incomingString, "<FA>", failure);

    incomingString = replaceAll( incomingString, "<DR>", despair);
    incomingString = replaceAll( incomingString, "<TR>", triumph);

    incomingString = replaceAll( incomingString, "<p>", proficiency);
    incomingString = replaceAll( incomingString, "<a>", ability)
    incomingString = replaceAll( incomingString, "<b>", boost);

    incomingString = replaceAll( incomingString, "<s>", setback);
    incomingString = replaceAll( incomingString, "<d>", difficulty);
    incomingString = replaceAll( incomingString, "<c>", challenge);

    incomingString = replaceAll( incomingString, "<f>", force);

    incomingString = replaceAll( incomingString, "<su>", success);
    incomingString = replaceAll( incomingString, "<ad>", advantage);

    incomingString = replaceAll( incomingString, "<th>", threat);
    incomingString = replaceAll( incomingString, "<fa>", failure);

    incomingString = replaceAll( incomingString, "<dr>", despair);
    incomingString = replaceAll( incomingString, "<tr>", triumph);

    return incomingString;
}

/*
Quick and dirty object copy to keep JS from referencing original object
*/
export function copyObject( obj: any ): any {
    return JSON.parse(JSON.stringify( obj ));
}