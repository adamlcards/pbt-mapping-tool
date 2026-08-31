import type { PartialStrings } from '../strings';

/**
 * Dutch (Nederlands).
 *
 * Terminology to check first. EEMM categories follow the Dutch PBT/ACT
 * literature: affect, cognitie, aandacht, zelf, motivatie, overt gedrag,
 * biofysiologisch, sociocultureel, context. Network vocabulary follows the
 * Dutch network-psychopathology usage: knoop (node), verbinding (edge),
 * dichtheid (density), centraliteit, sterkte (strength centrality). Loops are
 * "versterkende" and "balancerende" lussen, with "feedbacklus" for the tab —
 * "terugkoppelingslus" was too long for the panel. "Treatment kernel" has no
 * settled Dutch term, so the loanword is kept ("behandelkernels"); "hefboom /
 * hefboomwerking" renders leverage, "functieanalyse" functional assessment,
 * "drietermscontingentie" the three-term contingency, "vreesvermijding" (after
 * Vlaeyen) fear-avoidance, "deconditionering", "gedragsactivatie", "defusie",
 * "zelf-als-context", "bereidheid" (willingness), "casusconceptualisatie" for
 * clinical formulation, and "lijdensdruk" for the distress rating. The user is
 * addressed as "je" throughout, the register of Dutch professional software.
 * `tooltip.toolWithKey` reads "{tool} (toets {key})" — the extra word keeps it
 * idiomatic Dutch without touching the key letters.
 */
export const nl: PartialStrings = {
  meta: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr' },

  app: {
    name: 'Tool voor procesgebaseerde netwerkmapping',
    short: 'PBT-mappingtool',
    networkTitleLabel: 'Titel van het netwerk',
    untitledNetwork: 'Naamloos netwerk',
  },

  tool: {
    select: 'Selecteren',
    add: 'Toevoegen',
    connect: 'Verbinden',
    delete: 'Verwijderen',
    event: 'Gebeurtenis',
  },

  toolHint: {
    select: 'Klik om te selecteren en te zien waarmee iets verbonden is. Sleep om te verplaatsen.',
    add: 'Klik ergens op het canvas om een knoop toe te voegen.',
    connect: 'Klik eerst op de knoop die invloed uitoefent, dan op de knoop die beïnvloed wordt.',
    delete: 'Klik op een knoop of verbinding om die te verwijderen.',
    start: 'Begin met de gebeurtenis of situatie waar het om gaat. Klik ergens.',
    focused: 'Gericht op een deel van het netwerk.',
    showEverything: 'Alles weer tonen',
    pendingSource: 'Bron: {label}. Klik nu op de knoop die beïnvloed wordt.',
  },

  action: {
    undo: 'Ongedaan',
    redo: 'Opnieuw',
    fit: 'Inpassen',
    organise: 'Ordenen',
    clear: 'Wissen',
    grid: 'Raster',
    ratings: 'Scores',
    colourByValence: 'Helpend',
    colourByDirection: 'Op/neer',
    hypothesis: 'Hypothese',
    kernel: 'Kernels',
    analyse: 'Analyse',
    snapshots: 'Meetmomenten',
    import: 'Importeren',
    export: 'Exporteren',
    share: 'Link delen',
    help: 'Hulp',
    about: 'Over',
    themeLight: 'Licht',
    themeDark: 'Donker',
    templates: 'Sjablonen',
    guided: 'Stapsgewijs',
    cancel: 'Annuleren',
    save: 'Opslaan',
    add: 'Toevoegen',
    update: 'Bijwerken',
    close: 'Sluiten',
    back: 'Terug',
    next: 'Volgende',
    finish: 'Klaar',
    restore: 'Herstellen',
    tryAgain: 'Opnieuw proberen',
    copy: 'Link kopiëren',
    copied: 'Gekopieerd',
    language: 'Taal',
  },

  tooltip: {
    undo: 'Ongedaan maken (Ctrl/Cmd+Z)',
    redo: 'Opnieuw uitvoeren (Ctrl/Cmd+Y)',
    fit: 'Alles passend op het scherm (F)',
    organise: 'Zet de vakken in rijen en kolommen die de pijlen volgen (O)',
    clear: 'Alles verwijderen',
    grid: 'Toon een raster en zet vakken daaraan vast (G)',
    ratings: 'Zet de scores voor lijdensdruk (L) en frequentie (F) op elk vak (M)',
    colourIsDirection:
      'De pijlkleur toont nu toenames (blauw) en afnames (oranje). Klik om in plaats daarvan te kleuren naar of de verbinding helpt.',
    colourIsValence:
      'De pijlkleur toont nu of een verbinding helpt. Klik om in plaats daarvan te kleuren naar toenames en afnames.',
    addEvent: 'Een gebeurtenis of context toevoegen',
    addProcess: 'Een proces toevoegen',
    hypothesis: 'Voeg iets toe dat je overweegt en zie wat het zou veranderen (H)',
    kernel: 'Behandelkernels (in ontwikkeling)',
    analyse: 'Centraliteit, feedbacklussen, paden en hefboomwerking',
    snapshots: 'Deze kaart als meetmoment opslaan en later vergelijken',
    import: 'Een opgeslagen bestand laden',
    export: 'Opslaan als afbeelding, PDF, JSON of CSV',
    share: 'Een link naar deze kaart maken',
    help: 'Hoe je dit gebruikt',
    templates: 'Begin met een voorbeeld',
    guided: 'Stap voor stap opbouwen',
    themeToLight: 'Overschakelen naar het lichte thema',
    themeToDark: 'Overschakelen naar het donkere thema',
    language: 'De taal van de interface wijzigen',
    toolWithKey: '{tool} (toets {key})',
    deleteKeyHint: 'D, of Delete/Backspace om te verwijderen wat geselecteerd is',
    closePanel: 'Paneel sluiten',
    closeDialog: 'Dialoogvenster sluiten',
    closeGuide: 'Gids sluiten',
  },

  privacy: {
    localOnly: 'Alles blijft op dit apparaat',
    localOnlyLong:
      'Je kaart wordt in deze browser opgeslagen en wordt nooit ergens naartoe gestuurd. Het tabblad sluiten is veilig. Als je je browsergegevens wist, verdwijnt hij, dus exporteer wat je wilt bewaren.',
    studyMode: 'Onderzoeksmodus',
    studyModeLong:
      'Je neemt deel aan een wetenschappelijk onderzoek. Je kaart en de volgorde waarin je hem hebt opgebouwd worden op de onderzoeksserver opgeslagen.',
    autosaveUnavailable: 'Automatisch opslaan werkt niet — exporteer om je werk te bewaren',
    autosaveUnavailableLong:
      'Deze browser laat de pagina niets opslaan, wat meestal gebeurt als een HTML-bestand rechtstreeks van schijf wordt geopend, of in een privévenster. Je werk blijft privé, maar het gaat verloren zodra je het tabblad sluit. Gebruik Exporteren om het te bewaren.',
  },

  panel: {
    analysis: 'Analyse',
    snapshots: 'Meetmomenten',
    listView: 'Lijstweergave',
  },

  nodeEditor: {
    newEvent: 'Nieuwe gebeurtenis of context',
    newNode: 'Nieuwe knoop',
    edit: 'Knoop bewerken',
    name: 'Naam',
    namePlaceholder: 'In de eigen woorden van de persoon',
    category: 'Categorie',
    ratingsDisclosure: 'Scores en notities (optioneel)',
    ratingsNote:
      'Wordt in onderzoeksprotocollen gebruikt om netwerken tussen personen en over de tijd te vergelijken. Niet nodig om in de praktijk klinisch in kaart te brengen.',
    severity: 'Hoeveel lijdensdruk (0–10)',
    frequency: 'Hoe vaak (0–10)',
    notes: 'Notities',
    notRated: 'Niet gescoord',
    severityShort: 'L',
    frequencyShort: 'F',
    rate: 'Scoren',
    clearRating: 'Wissen',
  },

  edgeEditor: {
    title: 'Hoe beïnvloedt dit dat?',
    sentenceIncreases: '{source} verhoogt {target}',
    sentenceDecreases: '{source} verlaagt {target}',
    increasesIt: 'Verhoogt het',
    decreasesIt: 'Verlaagt het',
    altDirection: 'Deze twee beïnvloeden elkaar ook de andere kant op.',
    editAlt: '{source} → {target} bewerken',
    removeLink: 'Verbinding verwijderen',
    addLink: 'Verbinding toevoegen',
    helpingDisclosure: 'Helpt deze verbinding?',
    helpingNote:
      'Geen enkel proces is op zichzelf helpend of schadelijk; dat hangt af van waarmee het verbonden is, en daarom wordt het hier gevraagd en niet wanneer je het vak een naam geeft. Door verbindingen te markeren kan het analysepaneel zeggen welke verandering zou helpen, en niet alleen welke verandering het verst doorwerkt. Laat het staan als je daar geen gebruik van maakt.',
  },

  category: {
    uncategorised: {
      label: 'Niet ingedeeld',
      prefix: '',
      hint: 'Nog niet ingedeeld. Prima om zo te laten terwijl je nog nadenkt.',
    },
    affect: {
      label: 'Affect',
      prefix: 'Affect',
      hint: 'Emoties en gevoelens. Ze vermijden, of bereid zijn ze te hebben.',
    },
    cognition: {
      label: 'Cognitie',
      prefix: 'Cognitie',
      hint: 'Gedachten, overtuigingen, regels, rumineren, defusie.',
    },
    attention: {
      label: 'Aandacht',
      prefix: 'Aandacht',
      hint: 'Wat wel en niet wordt opgemerkt. Flexibele of vernauwde focus.',
    },
    self: {
      label: 'Zelf',
      prefix: 'Zelf',
      hint: 'Zelfbeeld, identiteit, zelfkritiek, zelf-als-context.',
    },
    motivation: {
      label: 'Motivatie',
      prefix: 'Motivatie',
      hint: 'Waarden, doelen, waar de persoon naartoe of vandaan beweegt.',
    },
    overtBehaviour: {
      label: 'Overt gedrag',
      prefix: 'Overt gedrag',
      hint: 'Waarneembaar handelen. Wat de persoon feitelijk doet.',
    },
    biophysiological: {
      label: 'Biofysiologisch',
      prefix: 'Biofysiologisch',
      hint: 'Slaap, pijn, ziekte, medicatie, arousal, fysiologie.',
    },
    sociocultural: {
      label: 'Sociocultureel',
      prefix: 'Sociocultureel',
      hint: 'Relaties, gezin, cultuur, sociale steun of druk.',
    },
    context: {
      label: 'Context / gebeurtenis',
      prefix: 'Gebeurtenis',
      hint: 'Een situatie of gebeurtenis, niet iets wat de persoon doet. Getekend met ronde hoeken.',
    },
  },
  categoryGroup: {
    dimension: 'Psychologische dimensies',
    level: 'Niveaus',
    other: 'Context en niet ingedeeld',
  },

  strength: {
    1: 'Een beetje',
    2: 'Matig',
    3: 'Sterk',
  },

  valence: {
    neutral: 'Niet beoordeeld',
    helpful: 'Helpend',
    unhelpful: 'Niet helpend',
  },

  trial: {
    proposed: 'Wordt overwogen',
    adopted: 'Geprobeerd, en het hielp',
    ruledOut: 'Geprobeerd, het hielp niet',
    proposedHint:
      'Nog een idee. Wordt gestippeld getekend en blijft buiten de uitgangssituatie waartegen de vergelijking meet.',
    adoptedHint: 'Het werkte. Het wordt onderdeel van de kaart en wordt getekend zoals al het andere.',
    ruledOutHint: 'Het werkte niet. Blijft staan maar vervaagd, zodat je ziet wat al geprobeerd is.',
    dialogTitle: 'Wat is hiermee gebeurd?',
    legend: 'Waar staat dit nu?',
    lastRecorded: 'Laatst vastgelegd {when}',
    notATrial: 'Helemaal geen proef — maak er een gewoon onderdeel van de kaart van',
  },

  analysis: {
    title: 'Analyse',
    summary: 'Wat dit netwerk laat zien',
    central: 'Meest verbonden',
    loops: 'Feedbacklussen',
    leverage: 'Waar verandering het verst kan doorwerken',
    paths: 'Een pad volgen',
    whatIf: 'Wat als',
    empty: 'Voeg knopen en verbindingen toe om een analyse te zien.',

    stats: '{nodes} knopen · {edges} verbindingen · dichtheid {density}',

    scopeAll: 'Alle verbindingen',
    scopeUnhelpful: 'Maladaptief',
    scopeHelpful: 'Adaptief',
    centralNote:
      'Sterkte telt hoeveel invloed er in en uit stroomt. Het is de centraliteitsmaat met de meeste steun voor het kiezen van behandeldoelen, maar een centrale knoop is niet vanzelf de juiste om aan te duwen.',
    scopeUnhelpfulNote:
      'Alleen de pijlen die je als niet-helpend hebt gemarkeerd tellen mee. Een hoge score hier is een proces dat het probleem in stand houdt.',
    scopeHelpfulNote:
      'Alleen de pijlen die je als helpend hebt gemarkeerd tellen mee. Een hoge score hier is iets wat de persoon al in huis heeft — vaak beter om op voort te bouwen dan om er iets nieuws bij te halen.',
    excludedNote_one:
      '{count} niet-beoordeelde verbinding valt buiten beide uitsplitsingen, dus die tellen niet op tot de gecombineerde cijfers.',
    excludedNote_other:
      '{count} niet-beoordeelde verbindingen vallen buiten beide uitsplitsingen, dus die tellen niet op tot de gecombineerde cijfers.',
    noneMarkedHelpful:
      'Er is nog niets als helpend gemarkeerd. Open een verbinding en geef aan of die helpt om dit te vullen.',
    noneMarkedUnhelpful:
      'Er is nog niets als niet-helpend gemarkeerd. Open een verbinding en geef aan of die helpt om dit te vullen.',

    colNode: 'Knoop',
    colIn: 'In',
    colOut: 'Uit',
    colStrength: 'Sterkte',
    colNetOutward: 'Netto uitgaand',
    chipEntryPoint: 'ingangspunt',
    chipEndpoint: 'eindpunt',
    chipUnconnected: 'onverbonden',
    chipNothingHelping: 'geen helpende',
    chipNothingUnhelpful: 'geen niet-helpende',

    reinforcing: 'Versterkend',
    balancing: 'Balancerend',
    reinforcingHelp:
      'Houdt zichzelf in stand. Een toename ergens in de lus komt rond als een verdere toename, en daarom loopt het probleem door nadat de aanleiding voorbij is.',
    balancingHelp: 'Corrigeert zichzelf. Iets in deze lus duwt terug, wat meestal een natuurlijke rem betekent.',
    noLoops: 'Geen lussen gevonden.',
    manyLoops: 'Dit netwerk heeft veel lussen. Alleen de sterkste staan hier.',
    loopSteps_one: '{count} stap, versterking {gain}',
    loopSteps_other: '{count} stappen, versterking {gain}',

    heuristicWarning:
      'Deze cijfers beschrijven de kaart die je hebt getekend, niet de persoon. Ze veronderstellen dat invloed lineair en onmiddellijk is, en dat is niet zo. Gebruik ze om mee te denken, nooit als voorspelling.',
    colIfReduced: 'Als dit zou afnemen',
    colBenefit: 'Gemodelleerde winst',
    colReach: 'Bereik',
    wouldAlsoSuppress: 'Onderdrukt dan ook {labels}',
    chipNoDampening: 'geen demping',

    from: 'Van',
    to: 'Naar',
    choose: 'Kies…',
    noRoute: 'Geen route van de een naar de ander.',
    routeStats_one: '{count} route · {up} toenemend · {down} afnemend · netto {net}',
    routeStats_other: '{count} routes · {up} toenemend · {down} afnemend · netto {net}',
    pathSteps_one: '{count} stap, effect {effect}',
    pathSteps_other: '{count} stappen, effect {effect}',
    increases: 'verhoogt',
    decreases: 'verlaagt',

    colNow: 'Nu',
    colWithThis: 'Met dit erbij',
    rowReinforcing: 'Versterkende lussen',
    rowBalancing: 'Balancerende lussen',
    rowAmplification: 'Gemodelleerde versterking',
    newBrakes: 'Nieuwe remmen op het systeem',
    badgeNewBalancing: 'nieuw balancerend',
    howItActs: 'Hoe het per cyclus werkt',
    mechSelfCorrecting: 'zelfcorrigerend',
    mechSteadyPressure: 'constante druk',
    mechPushedHarder: 'harder geduwd',
    mechUntouched: 'onaangeroerd',
    pressureOn: 'op {labels} · moet volgehouden worden',
    holdsOnItsOwn: 'houdt zichzelf in stand',
  },

  summary: {
    noNodes: 'Voeg een paar knopen toe om een analyse te zien.',
    noEdges:
      'Er is nog niets verbonden. Voeg verbindingen toe om te zien hoe de onderdelen elkaar beïnvloeden.',
    mostConnected_one:
      '**{label}** is het sterkst verbonden onderdeel van dit netwerk ({inDegree} invloed komt binnen, {outDegree} gaat eruit). Bij centrale knopen werkt verandering vaak het verst door, al zijn ze soms ook het lastigst om direct te veranderen.',
    mostConnected_other:
      '**{label}** is het sterkst verbonden onderdeel van dit netwerk ({inDegree} invloeden komen binnen, {outDegree} gaan eruit). Bij centrale knopen werkt verandering vaak het verst door, al zijn ze soms ook het lastigst om direct te veranderen.',
    reinforcing_one:
      'Er is hier **{count} versterkende lus**. Dat zijn cycli die zichzelf in stand houden: ze lopen door, ook nadat wat ze in gang zette allang voorbij is.',
    reinforcing_other:
      'Er zijn hier **{count} versterkende lussen**. Dat zijn cycli die zichzelf in stand houden: ze lopen door, ook nadat wat ze in gang zette allang voorbij is.',
    tightestLoop: ' De strakste is {path}.',
    noReinforcing:
      'Er zijn geen versterkende lussen gevonden. De moeite waard om na te gaan of hier iets op zichzelf terugkoppelt, want terugkoppeling is vaak wat een probleem laat voortduren.',
    balancing_one:
      '{count} balancerende lus gevonden. Die corrigeren zichzelf en markeren vaak waar de persoon al een natuurlijke rem op het probleem heeft.',
    balancing_other:
      '{count} balancerende lussen gevonden. Die corrigeren zichzelf en markeren vaak waar de persoon al een natuurlijke rem op het probleem heeft.',
    sources_one:
      '{labels} beïnvloedt andere onderdelen, maar niets in het netwerk beïnvloedt het terug. Zulke ingangspunten zijn soms de best hanteerbare plek om te beginnen.',
    sources_other:
      '{labels} beïnvloeden andere onderdelen, maar niets in het netwerk beïnvloedt ze terug. Zulke ingangspunten zijn soms de best hanteerbare plek om te beginnen.',
    leverage_one:
      'Het verminderen van **{label}** heeft het breedste gemodelleerde effect en bereikt {reach} andere knoop.',
    leverage_other:
      'Het verminderen van **{label}** heeft het breedste gemodelleerde effect en bereikt {reach} andere knopen.',
    leverageCaveat_one:
      ' Let op: het zou ook {labels} onderdrukken, dat vastzit aan verbindingen die je als helpend hebt gemarkeerd.',
    leverageCaveat_other:
      ' Let op: het zou ook {labels} onderdrukken, die vastzitten aan verbindingen die je als helpend hebt gemarkeerd.',
    isolated_one: '{labels} is nog nergens mee verbonden.',
    isolated_other: '{labels} zijn nog nergens mee verbonden.',
    diverges:
      'Sommige delen van dit netwerk versterken in het model zonder grens, wat meestal duidt op sterke versterkende lussen zonder demping. Beschouw de hefboomcijfers alleen als indicatief.',
    caveat:
      '_Deze cijfers beschrijven de kaart die je hebt getekend, niet de persoon. Ze zijn een gestructureerde manier om naar je eigen denken te kijken, geen voorspelling van wat er gaat gebeuren._',
  },

  guided: {
    ariaLabel: 'Stapsgewijs opbouwen',
    stepOf: 'Stap {current} van {total}',
    done: 'Klaar. Ga verder wanneer je zover bent.',
    footer:
      'Je kunt de gids op elk moment verlaten en alles wat je hebt opgebouwd blijft behouden. De stappen zijn een steiger, geen formulier dat je moet invullen.',
    step1Title: '1. Begin met de context',
    step1Body:
      'Gebruik de knop Gebeurtenis en voeg de situatie toe waar het om gaat: wat er gebeurde, waar, met wie. Die krijgt een vak met ronde hoeken, omdat het niet iets is wat de persoon doet.\n\nHier beginnen is geen formaliteit. In een functieanalyse betekent dezelfde gedachte of handeling iets anders in een andere situatie; de context maakt alles wat erna komt pas interpreteerbaar.',
    step1Nudge: 'Voeg een vak voor een gebeurtenis of context toe om te beginnen.',
    step2Title: '2. Voeg de reactie toe en wat daarop volgt',
    step2Body:
      'Voeg nu toe wat er vanbinnen gebeurt (een gedachte, gevoel of drang) en wat de persoon doet of wat daaruit volgt. Verbind ze op volgorde, vanaf de context.\n\nDat is de drietermscontingentie, de eenheid waaruit een functieanalyse is opgebouwd. Al het andere groeit daaruit.',
    step2NudgeNodes: 'Voeg nog twee vakken toe: de innerlijke reactie en daarna wat er gebeurt.',
    step2NudgeEdges: 'Verbind ze nu: context → innerlijke reactie → wat er gebeurt.',
    step3Title: '3. Kijk of het terugkoppelt',
    step3Body:
      'Kijk naar het einde van je keten en vraag je af: voedt dat iets wat eerder komt? Slecht slapen veroorzaakt piekeren, maar piekeren veroorzaakt ook slecht slapen.\n\nTerugkoppeling is meestal het antwoord op de vraag waarom een probleem blijft bestaan, lang nadat wat het in gang zette verdwenen is.',
    step3Nudge: 'Er koppelt nog niets terug. Voedt het gevolg iets wat eerder komt?',
    step4Title: '4. Voeg toe wat er nog meer meespeelt',
    step4Body:
      'Wat speelt hier nog meer in mee? Voeg een knoop toe voor alles wat door het gevolg wordt geraakt en zelf ook terugwerkt op de reactie.\n\nVersterkers doen er hier toe. Vermoeidheid is niet zomaar nog een probleem; het laat al het andere bedreigender aanvoelen.',
    step4Nudge: 'Voeg minstens nog één element toe.',
    step5Title: '5. Voeg toe wat helpt',
    step5Body:
      'Niet alles maakt het erger. Voeg iets toe dat een van deze problemen vermindert, teken het als een verlagende verbinding en markeer die verbinding als Helpend.\n\nDit is vaak het stuk dat mensen overslaan, en juist hier zit meestal de interventie.',
    step5NudgeDecrease: 'Voeg iets toe dat een hiervan vermindert, getekend als een verlagende verbinding.',
    step5NudgeHelpful: 'Markeer die verbinding als Helpend, zodat de kaart laat zien wat werkt.',
    step6Title: '6. Breng in kaart wat in de weg zit',
    step6Body:
      'Nu het lastige deel. Wat houdt tegen dat het helpende gebeurt?\n\nDaarom komt "ga gewoon meer bewegen" zo slecht aan. De persoon weet allang dat het zou helpen. Iets in het systeem onderdrukt het, en zolang dat niet zichtbaar is, kan het advies nergens heen.',
    step6Nudge: 'Voeg een verbinding toe die het helpende onderdrukt.',
  },

  snapshots: {
    intro:
      'Sla het netwerk op zoals het er nu bij staat, kom later terug en teken het opnieuw. Er wordt niets overschreven.',
    labelPlaceholder: 'Label, bijv. Intake of Sessie 6',
    labelAria: 'Label voor dit meetmoment',
    saveButton: 'Meetmoment opslaan',
    none: 'Nog geen meetmomenten opgeslagen.',
    meta: '{when} · {nodes} knopen · {edges} verbindingen',
    deleteAria: 'Meetmoment {label} verwijderen',
    compare: 'Vergelijken',
    earlier: 'Eerder moment',
    later: 'Later moment',
    changes_one: '{count} wijziging',
    changes_other: '{count} wijzigingen',
    downloadComparison: 'Vergelijking downloaden (CSV)',
  },

  structure: {
    empty: 'Hier staat nog niets. Voeg een knoop toe om te beginnen.',
    nodes: 'Knopen ({count})',
    connections: 'Verbindingen ({count})',
    noConnections: 'Nog geen.',
    nodeMetaDistress: ' · lijdensdruk {value}',
    nodeMetaFrequency: ' · frequentie {value}',
    deleteNodeAria: 'Knoop {label} verwijderen',
    deleteEdgeAria: 'Verbinding {sentence} verwijderen',
  },

  templates: {
    intro:
      'Startpunten, geen casusconceptualisaties. Vervang de labels door de eigen woorden van de persoon en verwijder alles wat niet past. Een sjabloon dat niet ter discussie wordt gesteld, is slechter dan een leeg canvas.',
    blankName: 'Leeg canvas',
    blankDescription: 'Begin bij nul.',
    abcName: 'Drietermscontingentie',
    abcDescription:
      'De basissteiger: context, innerlijke reactie, gevolg. Bouw van hieruit verder naar buiten.',
    worryName: 'Cyclus van piekeren en slaap',
    worryDescription:
      'Een uitgewerkt voorbeeld. Handig om te laten zien hoe een versterkende lus eruitziet.',
    moodName: 'Sombere stemming en terugtrekken',
    moodDescription:
      'Een veelvoorkomend patroon uit de gedragsactivatie. Zet het in de eigen woorden van de persoon voordat je het gebruikt.',
    painName: 'Chronische pijn en vermijding',
    painDescription:
      'Een vreesvermijdingspatroon, met de deconditioneringslus die het meestal in stand houdt.',
  },

  templateNodes: {
    abcTrigger: 'Aanleiding of situatie',
    abcThought: 'Gedachte of gevoel',
    abcAction: 'Wat ik doe',

    worryCriticism: 'Kritiek op mijn werk',
    worryJobSecurity: 'Piekeren over baanzekerheid',
    worrySleep: 'Moeite met slapen',
    worryFatigue: 'Vermoeidheid',
    worryExercise: 'Bewegen',
    worryWithdrawal: 'Sociaal terugtrekken',

    moodLow: 'Sombere stemming',
    moodStayingHome: 'Thuisblijven',
    moodFewerThings: 'Minder dingen die voor mij belangrijk zijn',
    moodBurden: 'Ik ben een last',
    moodContact: 'Contact met vrienden',
    moodNoticing: 'Kleine goede momenten opmerken',

    painPain: 'Pijn',
    painFear: 'Angst om het erger te maken',
    painAvoiding: 'Activiteit vermijden',
    painDeconditioning: 'Deconditionering',
    painDoingAnyway: 'Toch doen wat belangrijk is',
    painWillingness: 'Bereidheid om ongemak te voelen',
  },

  templateNote:
    'Dit is een startpunt, geen casusconceptualisatie. Vervang de labels door de eigen woorden van de persoon.',

  exportDialog: {
    intro:
      'De CSV-formaten laden rechtstreeks in R of Python. De adjacentiematrix is wat qgraph, igraph en networkx als invoer verwachten.',
    json: 'Netwerk (JSON)',
    edges: 'Verbindingenlijst (CSV)',
    nodes: 'Knopenlijst (CSV)',
    matrix: 'Adjacentiematrix (CSV)',
    report: 'Analyserapport (Markdown)',
    events: 'Opbouwlog (CSV)',
    png: 'Afbeelding (PNG)',
    svg: 'Vectorbestand (SVG)',
    print: 'Afdrukken / PDF',
  },

  share: {
    title: 'Link delen',
    intro:
      'Het hele netwerk zit gecodeerd in de link zelf. Er is geen kopie op een server, en het deel dat je inhoud draagt wordt nooit meegestuurd in het webverzoek, dus nergens wordt iets opgeslagen of gelogd. Iedereen met de link kan een eigen kopie openen en bewerken.',
    building: 'De link wordt gemaakt…',
    tooLong:
      'Dit netwerk is te groot voor een link ({length} tekens). Exporteer het als JSON en stuur het bestand.',
  },

  clearDialog: {
    title: 'Dit netwerk wissen?',
    body: 'Dit verwijdert alle {nodes} knopen en {edges} verbindingen. Je kunt het ongedaan maken, en opgeslagen meetmomenten blijven bewaard.',
    confirm: 'Alles wissen',
  },

  kernel: {
    title: 'Behandelkernels',
    warning: 'In ontwikkeling. Achter deze knop zit nog niets.',
    p1: 'Het plan is een vocabulaire van behandelkernels: de kleinste eenheden van therapeutische verandering, in taal die consistent genoeg is om aan de processen op een kaart te koppelen. Kies een proces en zie welke kernels er bekend op aangrijpen.',
    p2: 'Het lastige is te bepalen wat als één kernel telt en hoe fijn je ze opsplitst, en dat ligt nog niet vast.',
    p3: 'Heb je ideeën over hoe deze database ingericht zou moeten worden? Kean hoort ze graag:',
  },

  help: {
    title: 'Hoe je dit gebruikt',
    buildingHeading: 'Een kaart bouwen',
    buildingEvent:
      'de situatie waar het om gaat. Begin hier; op een leeg canvas maakt elke klik er een. Die krijgt een vak met ronde hoeken, omdat het niet iets is wat de persoon doet.',
    buildingAdd:
      'een proces: een gedachte, gevoel, drang of handeling. Vierkant vak, gekleurd naar de EEMM-categorie.',
    buildingConnect:
      'klik op het vak dat invloed uitoefent, daarna op het vak dat beïnvloed wordt. Kies vervolgens in één klik of het verhoogt of verlaagt, en hoeveel.',
    buildingDelete: 'klik op een vak of pijl. Of selecteer iets en druk op Delete.',
    buildingDoubleClick: 'Dubbelklik op een vak om het te bewerken. Slepen om te verplaatsen kan in elke modus.',

    readingHeading: 'De tekening lezen',
    readingArrowheads:
      'Een **gevulde** pijlpunt betekent verhogen, een **open** pijlpunt verlagen. Dikkere lijnen met grotere punten zijn sterkere invloeden. Geen getallen, en niets dat op kleur leunt.',
    readingReciprocal: 'Een lijn met aan beide uiteinden een punt betekent dat de twee elkaar beïnvloeden.',
    readingShapes: 'Vierkante vakken zijn processen; vakken met ronde hoeken zijn gebeurtenissen of contexten.',
    readingColour:
      'Pijlen zijn zwart, tenzij je een verbinding als helpend (groen) of niet-helpend (rood) hebt gemarkeerd. De meeste verbindingen blijven zwart: die markering is er voor wanneer je toetst of iets nieuws een lus doorbreekt.',
    readingColourMode:
      'De knop Op/neer laat de pijlkleur in plaats daarvan toenames (blauw) en afnames (oranje) tonen, voor als het je om de richting van de invloed gaat.',

    keyboardHeading: 'Toetsenbord',
    keyboardTools: 'selecteren · gebeurtenis/context · knoop toevoegen · verbinden · verwijderen',
    keyboardConnectFromSelection: 'Selecteer een vak, druk op C en je volgende klik maakt de verbinding af.',
    keyboardDelete: 'Delete of Backspace verwijdert wat geselecteerd is.',
    keyboardEscape: 'Esc annuleert waar je mee bezig bent. Nog een keer drukken brengt je terug naar Selecteren.',
    keyboardView: 'F passend maken · O ordenen · M scores · G raster',
    keyboardEditing:
      'Ctrl/Cmd+Z ongedaan maken · Shift+klik om er meerdere te selecteren · Ctrl/Cmd+C en Ctrl/Cmd+V kopiëren en plakken · Ctrl/Cmd+D dupliceren',

    organiseHeading: 'Ordenen',
    organiseBody:
      'Zet de vakken in rijen en kolommen die de pijlen volgen, met de belangrijkste context vooraan. De indeling wordt zowel in de breedte als in de hoogte geprobeerd en de versie die het beste op je scherm past blijft staan. Feedbacklussen tellen niet mee bij het bepalen van de volgorde, zodat ze als lus te lezen zijn in plaats van de volgorde in de war te schoppen.',

    mouselessHeading: 'Zonder muis',
    mouselessBody:
      'De lijstweergave toont de hele kaart als tekst waar je met Tab doorheen loopt en die je met het toetsenbord bewerkt. Het is ook wat een schermlezer voorleest, want een canvas is voor een schermlezer onzichtbaar.',
    openListView: 'Lijstweergave openen',

    cautionHeading: 'Een waarschuwing over de analyse',
    cautionBody:
      'Centraliteit, lussen en hefboomwerking beschrijven de kaart die getekend is, niet de persoon. Ze veronderstellen dat invloed lineair en onmiddellijk is, en dat is niet zo. Ze zijn een gestructureerde manier om je eigen denken te bevragen, en ze zijn precies zoveel waard als de scores waarop ze gebouwd zijn.',
  },

  about: {
    title: 'Over',
    intro:
      'Een gratis, open source tool om procesgebaseerde netwerken in kaart te brengen: de functionele relaties tussen de processen die psychisch lijden en welbevinden in stand houden.',
    groundingHeading: 'Grondslag',
    groundingBody:
      'De categorieën en de manier waarop deze tool over processen denkt komen uit het Extended Evolutionary Meta-Model (EEMM), uiteengezet in het procesgebaseerde therapiewerk van **Steven C. Hayes en Stefan G. Hofmann**: affect, cognitie, aandacht, zelf, motivatie en overt gedrag, geplaatst binnen biofysiologische en socioculturele niveaus, en altijd gelezen in context.',
    inspiration: 'Het idee om dit in een browser te doen is geïnspireerd op Joseph Ciarrochi’s',
    madeByHeading: 'Wie dit gemaakt heeft',
    madeByBody:
      'Tan Kean Sian bedacht deze tool en gaf leiding aan de ontwikkeling; alle code is geschreven met Claude, de AI-assistent van Anthropic. Vragen of suggesties ter verbetering zijn welkom op',
    dataHeading: 'Waar je gegevens staan',
    dataBody:
      'In je browser, en nergens anders. Geen account, geen server, geen analytics. Als je je browsergegevens wist, verdwijnen je kaarten, dus exporteer wat je wilt bewaren. Deellinks dragen de kaart in de link zelf, in plaats van hem ergens te uploaden.',
    licence: 'MIT-licentie. Bijdragen zijn welkom.',
  },

  error: {
    canvasTitle: 'Het tekencanvas kon niet starten',
    canvasHint:
      'Meestal betekent dit dat grafische versnelling op deze machine niet beschikbaar is. Je netwerk is veilig. Open de lijstweergave om het als tekst te lezen en te bewerken, en Exporteren om het eruit te halen.',
    technicalDetail: 'Technische details',
  },

  toast: {
    copied_one: '{count} vak gekopieerd. Ctrl/Cmd+V om te plakken.',
    copied_other: '{count} vakken gekopieerd. Ctrl/Cmd+V om te plakken.',
    pasted_one: '{count} vak geplakt.',
    pasted_other: '{count} vakken geplakt.',
    duplicated_one: '{count} vak gedupliceerd.',
    duplicated_other: '{count} vakken gedupliceerd.',
    hypothesisOn: 'Hypothesemodus aan. Alles wat je nu toevoegt is een voorstel en wordt gestippeld getekend.',
    sharedOpened: 'Een gedeeld netwerk geopend. Je opgeslagen werk is niet overschreven.',
    imported: 'Geïmporteerd.',
    importUnreadable: 'Dat bestand kon niet gelezen worden.',
    importNotJson: 'Dat bestand is geen geldige JSON.',
  },

  language: {
    title: 'Taal',
    note: 'Vertalingen komen uit de community en worden nog nagekeken. Vooral het klinische vocabulaire ligt nog niet in elke taal vast.',
    contribute: 'Een verkeerde vertaling gezien? Correcties zijn zeer welkom op',
    draft: 'concept',
  },

  a11y: {
    canvas: 'Netwerkcanvas. Een toetsenbordtoegankelijke versie van dezelfde inhoud staat in de lijstweergave.',
    toolbar: 'Gereedschappen',
    scopeTabs: 'Welke verbindingen meetellen',
  },
};
