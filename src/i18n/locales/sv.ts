import type { PartialStrings } from '../strings';

/**
 * Swedish (Svenska).
 *
 * Terminology to check first: the EEMM dimensions follow the Swedish ACT/RFT
 * literature — Affekt, Kognition, Uppmärksamhet, Själv, Motivation, Öppet
 * beteende — over the biofysiologisk and sociokulturell levels, with
 * "defusion", "själv som kontext" and "villighet" (willingness) as the settled
 * ACT renderings, and "tretermskontingens" / "funktionell analys" for the
 * behaviour-analytic pair. Systems terms use the standard Swedish
 * systems-dynamics vocabulary: reinforcing = "förstärkande", balancing =
 * "balanserande", loop = "slinga" (feedback loops = "återkopplingsslingor"),
 * gain = "förstärkning", leverage = "hävstång", density = "täthet",
 * centrality = "centralitet". "Vidmakthåller" is used for what maintains a
 * problem, matching Swedish CBT usage. Elsewhere: "Timepoints" is
 * "Tidpunkter"; edges are consistently "kopplingar" (both English
 * "connection" and "link"), with "länk" reserved for the share URL;
 * chronic pain is "långvarig smärta". The two rating tags printed on the node
 * stay "S" and "F", but as Swedish initials, not English ones: the ratings are
 * named "svårighetsgrad" and "frekvens" throughout. The toolbar mode "Add
 * node" is shortened to "Ny nod" for space. Address form is consistent "du".
 */
export const sv: PartialStrings = {
  meta: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', dir: 'ltr' },

  app: {
    name: 'Verktyg för processbaserad nätverkskartläggning',
    short: 'PBT-kartverktyg',
    networkTitleLabel: 'Nätverkets titel',
    untitledNetwork: 'Namnlöst nätverk',
  },

  tool: {
    select: 'Välj',
    add: 'Ny nod',
    connect: 'Koppla',
    delete: 'Ta bort',
    event: 'Händelse / kontext',
  },

  toolHint: {
    select: 'Klicka för att markera och se vad noden är kopplad till. Dra för att flytta.',
    add: 'Klicka var som helst på ritytan för att lägga till en nod.',
    connect: 'Klicka på noden som påverkar, sedan på den som påverkas.',
    delete: 'Klicka på en nod eller koppling för att ta bort den.',
    start: 'Börja med händelsen eller situationen det handlar om. Klicka var som helst.',
    focused: 'Fokuserar på en del av nätverket.',
    showEverything: 'Visa allt igen',
    pendingSource: 'Källa: {label}. Klicka nu på noden som påverkas.',
  },

  action: {
    undo: 'Ångra',
    redo: 'Gör om',
    fit: 'Anpassa',
    organise: 'Ordna',
    clear: 'Rensa',
    grid: 'Rutnät',
    ratings: 'Skattningar',
    colourByValence: 'Hjälper',
    colourByDirection: 'Upp/ner',
    hypothesis: 'Hypotes',
    kernel: 'Kärnor',
    analyse: 'Analys',
    snapshots: 'Tidpunkter',
    import: 'Importera',
    export: 'Exportera',
    share: 'Dela länk',
    help: 'Hjälp',
    about: 'Om',
    themeLight: 'Ljust',
    themeDark: 'Mörkt',
    templates: 'Mallar',
    guided: 'Guidning',
    cancel: 'Avbryt',
    save: 'Spara',
    add: 'Lägg till',
    update: 'Uppdatera',
    close: 'Stäng',
    back: 'Tillbaka',
    next: 'Nästa',
    finish: 'Klar',
    restore: 'Återställ',
    tryAgain: 'Försök igen',
    copy: 'Kopiera länk',
    copied: 'Kopierad',
    language: 'Språk',
  },

  tooltip: {
    undo: 'Ångra (Ctrl/Cmd+Z)',
    redo: 'Gör om (Ctrl/Cmd+Y)',
    fit: 'Anpassa så att allt syns (F)',
    organise: 'Placera rutorna i rader och kolumner som följer pilarna (O)',
    clear: 'Ta bort allt',
    grid: 'Visa ett rutnät och fäst rutorna mot det (G)',
    ratings: 'Visa skattningar av svårighetsgrad (S) och frekvens (F) på varje ruta (M)',
    colourIsDirection:
      'Pilarnas färg visar just nu ökning (blå) och minskning (orange). Klicka för att i stället färglägga efter om kopplingen hjälper.',
    colourIsValence:
      'Pilarnas färg visar just nu om en koppling hjälper. Klicka för att i stället färglägga efter ökning och minskning.',
    addEvent: 'Lägg till en händelse eller kontext',
    addProcess: 'Lägg till en process',
    hypothesis: 'Lägg till något du överväger och se vad det skulle förändra (H)',
    kernel: 'Behandlingskärnor (under utveckling)',
    analyse: 'Centralitet, återkopplingsslingor, vägar och hävstång',
    snapshots: 'Spara kartan som en tidpunkt och jämför senare',
    import: 'Öppna en sparad fil',
    export: 'Spara som bild, PDF, JSON eller CSV',
    share: 'Hämta en länk till den här kartan',
    help: 'Så använder du verktyget',
    templates: 'Utgå från ett exempel',
    guided: 'Bygg upp kartan steg för steg',
    themeToLight: 'Byt till ljust tema',
    themeToDark: 'Byt till mörkt tema',
    language: 'Byt språk i gränssnittet',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, eller Delete/Backspace för att ta bort det som är markerat',
    closePanel: 'Stäng panelen',
    closeDialog: 'Stäng dialogrutan',
    closeGuide: 'Stäng guiden',
  },

  privacy: {
    localOnly: 'Allt stannar på den här enheten',
    localOnlyLong:
      'Din karta sparas i den här webbläsaren och skickas aldrig någonstans. Det är säkert att stänga fliken. Om du rensar webbläsardata försvinner den, så exportera det du vill behålla.',
    studyMode: 'Studieläge',
    studyModeLong:
      'Du deltar i en forskningsstudie. Din karta och den ordning du byggde den i sparas på studiens server.',
    autosaveUnavailable: 'Autosparning fungerar inte — exportera för att behålla ditt arbete',
    autosaveUnavailableLong:
      'Webbläsaren låter inte sidan spara någonting, vilket oftast händer när en HTML-fil öppnas direkt från disk eller i ett privat fönster. Ditt arbete är fortfarande privat, men det försvinner när du stänger fliken. Använd Exportera för att behålla det.',
  },

  panel: {
    analysis: 'Analys',
    snapshots: 'Tidpunkter',
    listView: 'Listvy',
  },

  nodeEditor: {
    newEvent: 'Ny händelse eller kontext',
    newNode: 'Ny nod',
    edit: 'Redigera nod',
    name: 'Namn',
    namePlaceholder: 'Med personens egna ord',
    category: 'Kategori',
    ratingsDisclosure: 'Skattningar och anteckningar (valfritt)',
    ratingsNote:
      'Används i forskningsprotokoll för att jämföra nätverk mellan personer och över tid. Behövs inte för vanlig klinisk kartläggning.',
    severity: 'Hur besvärande (0–10)',
    frequency: 'Hur ofta (0–10)',
    notes: 'Anteckningar',
    notRated: 'Inte skattad',
    severityShort: 'S',
    frequencyShort: 'F',
    rate: 'Skatta',
    clearRating: 'Rensa',
  },

  edgeEditor: {
    title: 'Hur påverkar det ena det andra?',
    sentenceIncreases: '{source} ökar {target}',
    sentenceDecreases: '{source} minskar {target}',
    increasesIt: 'Ökar den',
    decreasesIt: 'Minskar den',
    altDirection: 'De här två påverkar varandra även åt andra hållet.',
    editAlt: 'Redigera {source} → {target}',
    removeLink: 'Ta bort koppling',
    addLink: 'Lägg till koppling',
    helpingDisclosure: 'Hjälper den här kopplingen?',
    helpingNote:
      'Ingen process är hjälpsam eller skadlig i sig; det beror på vad den är kopplad till, och därför ställs frågan här och inte när du namnger rutan. Att märka kopplingar är det som gör att Analys-panelen kan säga vilken förändring som skulle hjälpa, i stället för bara vilken som skulle sprida sig längst. Låt det vara om du inte använder det.',
  },

  category: {
    uncategorised: {
      label: 'Okategoriserad',
      prefix: '',
      hint: 'Ännu inte klassificerad. Det går bra att låta den vara medan du fortfarande tänker.',
    },
    affect: {
      label: 'Affekt',
      prefix: 'Affekt',
      hint: 'Emotioner och känslor. Att undvika dem, eller att vara villig att ha dem.',
    },
    cognition: {
      label: 'Kognition',
      prefix: 'Kognition',
      hint: 'Tankar, föreställningar, regler, ruminering, defusion.',
    },
    attention: {
      label: 'Uppmärksamhet',
      prefix: 'Uppmärksamhet',
      hint: 'Vad som uppmärksammas, och vad som inte gör det. Flexibelt eller smalt fokus.',
    },
    self: {
      label: 'Själv',
      prefix: 'Själv',
      hint: 'Självbild, identitet, självkritik, själv som kontext.',
    },
    motivation: {
      label: 'Motivation',
      prefix: 'Motivation',
      hint: 'Värderingar, mål, vad personen rör sig mot eller bort från.',
    },
    overtBehaviour: {
      label: 'Öppet beteende',
      prefix: 'Öppet beteende',
      hint: 'Observerbar handling. Vad personen faktiskt gör.',
    },
    biophysiological: {
      label: 'Biofysiologisk',
      prefix: 'Biofysiologisk',
      hint: 'Sömn, smärta, sjukdom, medicinering, anspänning, fysiologi.',
    },
    sociocultural: {
      label: 'Sociokulturell',
      prefix: 'Sociokulturell',
      hint: 'Relationer, familj, kultur, socialt stöd eller socialt tryck.',
    },
    context: {
      label: 'Kontext / händelse',
      prefix: 'Händelse',
      hint: 'En situation eller händelse, inte något personen gör. Ritas med rundade hörn.',
    },
  },

  categoryGroup: {
    dimension: 'Psykologiska dimensioner',
    level: 'Nivåer',
    other: 'Kontext och oklassificerat',
  },

  strength: {
    1: 'Lite',
    2: 'Måttligt',
    3: 'Mycket',
  },

  valence: {
    neutral: 'Inte bedömd',
    helpful: 'Hjälper',
    unhelpful: 'Hjälper inte',
  },

  trial: {
    proposed: 'Övervägs',
    adopted: 'Prövat, och det hjälpte',
    ruledOut: 'Prövat, det hjälpte inte',
    proposedHint:
      'Fortfarande bara en idé. Ritas streckad och räknas inte in i den baslinje som jämförelsen mäts mot.',
    adoptedHint: 'Det fungerade. Den blir en del av kartan och ritas som allt annat.',
    ruledOutHint: 'Det fungerade inte. Behålls men tonas ned, så att du ser vad som redan har prövats.',
    dialogTitle: 'Vad hände med det här?',
    legend: 'Hur långt har det här kommit?',
    lastRecorded: 'Senast noterat {when}',
    notATrial: 'Ingen prövning alls — gör den till en vanlig del av kartan',
  },

  analysis: {
    title: 'Analys',
    summary: 'Vad nätverket visar',
    central: 'Mest kopplade',
    loops: 'Återkopplingsslingor',
    leverage: 'Var förändring kan sprida sig längst',
    paths: 'Följ en väg',
    whatIf: 'Tänk om',
    empty: 'Lägg till noder och kopplingar för att se en analys.',

    stats: '{nodes} noder · {edges} kopplingar · täthet {density}',

    scopeAll: 'Alla kopplingar',
    scopeUnhelpful: 'Maladaptiva',
    scopeHelpful: 'Adaptiva',
    centralNote:
      'Styrka räknar hur mycket inflytande som flödar in och ut. Det är det centralitetsmått som har starkast stöd för att välja behandlingsmål, men en central nod är inte automatiskt den rätta att påverka.',
    scopeUnhelpfulNote:
      'Räknar bara de pilar du har märkt som att de inte hjälper. Ett högt värde här är en process som håller ihop problemet.',
    scopeHelpfulNote:
      'Räknar bara de pilar du har märkt som hjälpande. Ett högt värde här är något personen redan har med sig — ofta värt att bygga vidare på i stället för att lägga till något nytt.',
    excludedNote_one:
      '{count} obedömd koppling räknas inte in i någon av delarna, så de summerar inte till de sammanlagda siffrorna.',
    excludedNote_other:
      '{count} obedömda kopplingar räknas inte in i någon av delarna, så de summerar inte till de sammanlagda siffrorna.',
    noneMarkedHelpful:
      'Inget är ännu märkt som hjälpande. Öppna en koppling och ange om den hjälper för att fylla i det här.',
    noneMarkedUnhelpful:
      'Inget är ännu märkt som att det inte hjälper. Öppna en koppling och ange om den hjälper för att fylla i det här.',

    colNode: 'Nod',
    colIn: 'In',
    colOut: 'Ut',
    colStrength: 'Styrka',
    colNetOutward: 'Netto ut',
    chipEntryPoint: 'ingång',
    chipEndpoint: 'slutpunkt',
    chipUnconnected: 'okopplad',
    chipNothingHelping: 'inget hjälpande',
    chipNothingUnhelpful: 'inget ohjälpsamt',

    reinforcing: 'Förstärkande',
    balancing: 'Balanserande',
    reinforcingHelp:
      'Självunderhållande. En ökning var som helst i slingan kommer tillbaka som en ytterligare ökning, och det är därför problemet fortsätter efter att utlösaren är borta.',
    balancingHelp:
      'Självkorrigerande. Något i den här slingan trycker tillbaka, vilket oftast betyder en naturlig broms.',
    noLoops: 'Inga slingor hittades.',
    manyLoops: 'Det här nätverket har många slingor. Bara de starkaste listas.',
    loopSteps_one: '{count} steg, förstärkning {gain}',
    loopSteps_other: '{count} steg, förstärkning {gain}',

    heuristicWarning:
      'De här siffrorna beskriver kartan du ritade, inte personen. De förutsätter att inflytande är linjärt och omedelbart, vilket det inte är. Använd dem för att tänka med, aldrig som en förutsägelse.',
    colIfReduced: 'Om denna minskade',
    colBenefit: 'Modellerad nytta',
    colReach: 'Räckvidd',
    wouldAlsoSuppress: 'Skulle också dämpa {labels}',
    chipNoDampening: 'ingen dämpning',

    from: 'Från',
    to: 'Till',
    choose: 'Välj…',
    noRoute: 'Ingen väg från den ena till den andra.',
    routeStats_one: '{count} väg · {up} ökande · {down} minskande · netto {net}',
    routeStats_other: '{count} vägar · {up} ökande · {down} minskande · netto {net}',
    pathSteps_one: '{count} steg, effekt {effect}',
    pathSteps_other: '{count} steg, effekt {effect}',
    increases: 'ökar',
    decreases: 'minskar',

    colNow: 'Nu',
    colWithThis: 'Med detta',
    rowReinforcing: 'Förstärkande slingor',
    rowBalancing: 'Balanserande slingor',
    rowAmplification: 'Modellerad förstärkning',
    newBrakes: 'Nya bromsar på systemet',
    badgeNewBalancing: 'ny balanserande',
    howItActs: 'Hur den verkar i varje varv',
    mechSelfCorrecting: 'självkorrigerande',
    mechSteadyPressure: 'jämnt tryck',
    mechPushedHarder: 'trycks hårdare',
    mechUntouched: 'oberörd',
    pressureOn: 'på {labels} · behöver upprätthållas',
    holdsOnItsOwn: 'håller av sig själv',
  },

  summary: {
    noNodes: 'Lägg till några noder för att se en analys.',
    noEdges: 'Inget är kopplat ännu. Lägg till kopplingar för att se hur delarna påverkar varandra.',
    mostConnected_one:
      '**{label}** är den mest kopplade delen av det här nätverket ({inDegree} koppling in, {outDegree} ut). Centrala noder är ofta där förändring sprider sig längst, men de kan också vara svårast att rubba direkt.',
    mostConnected_other:
      '**{label}** är den mest kopplade delen av det här nätverket ({inDegree} kopplingar in, {outDegree} ut). Centrala noder är ofta där förändring sprider sig längst, men de kan också vara svårast att rubba direkt.',
    reinforcing_one:
      'Det finns **{count} förstärkande slinga** här. Det är en självunderhållande cykel: den fortsätter även efter att det som satte igång den är borta.',
    reinforcing_other:
      'Det finns **{count} förstärkande slingor** här. Det är självunderhållande cykler: de fortsätter även efter att det som satte igång dem är borta.',
    tightestLoop: ' Den tätaste är {path}.',
    noReinforcing:
      'Inga förstärkande slingor hittades. Värt att fråga om något här återkopplar till sig självt, eftersom återkoppling ofta är det som får ett problem att bestå.',
    balancing_one:
      '{count} balanserande slinga hittades. Den är självkorrigerande och markerar ofta att personen redan har en naturlig broms på problemet.',
    balancing_other:
      '{count} balanserande slingor hittades. De är självkorrigerande och markerar ofta att personen redan har någon naturlig broms på problemet.',
    sources_one:
      '{labels} påverkar andra, men inget i nätverket påverkar den tillbaka. Sådana ingångar är ibland det mest hanterbara stället att börja på.',
    sources_other:
      '{labels} påverkar andra, men inget i nätverket påverkar dem tillbaka. Sådana ingångar är ibland det mest hanterbara stället att börja på.',
    leverage_one: 'Att minska **{label}** har den bredaste modellerade effekten och når {reach} annan nod.',
    leverage_other: 'Att minska **{label}** har den bredaste modellerade effekten och når {reach} andra noder.',
    leverageCaveat_one:
      ' Observera att det också skulle dämpa {labels}, som hänger ihop med en koppling du har märkt som hjälpande.',
    leverageCaveat_other:
      ' Observera att det också skulle dämpa {labels}, som hänger ihop med kopplingar du har märkt som hjälpande.',
    isolated_one: '{labels} är inte kopplad till något ännu.',
    isolated_other: '{labels} är inte kopplade till något ännu.',
    diverges:
      'Vissa delar av det här nätverket förstärks utan gräns när de modelleras, vilket oftast betyder starka förstärkande slingor utan dämpning. Se hävstångssiffrorna som enbart vägledande.',
    caveat:
      '_De här siffrorna beskriver kartan du ritade, inte personen. De är ett strukturerat sätt att granska ditt eget tänkande, inte en förutsägelse om vad som kommer att hända._',
  },

  guided: {
    ariaLabel: 'Guidad uppbyggnad',
    stepOf: 'Steg {current} av {total}',
    done: 'Klart. Gå vidare när du är redo.',
    footer:
      'Du kan lämna guiden när som helst och behålla allt du har byggt. Stegen är ett stöd, inte ett formulär som ska fyllas i.',
    step1Title: '1. Börja med kontexten',
    step1Body:
      'Använd knappen Händelse / kontext och lägg till situationen det handlar om: vad som hände, var och med vem. Den får en rund ruta, eftersom den inte är något personen gör.\n\nAtt börja här är ingen formalitet. I en funktionell analys betyder samma tanke eller handling olika saker i olika situationer, och det är kontexten som gör allt därefter tolkningsbart.',
    step1Nudge: 'Lägg till en ruta för händelse eller kontext för att börja.',
    step2Title: '2. Lägg till responsen och det som följer',
    step2Body:
      'Lägg nu till vad som händer inuti (en tanke, känsla eller impuls) och vad personen gör eller vad som blir följden. Koppla ihop dem i ordning, från kontexten och framåt.\n\nDet är tretermskontingensen, den enhet en funktionell analys byggs av. Allt annat växer ur den.',
    step2NudgeNodes: 'Lägg till två rutor till: den inre responsen, sedan vad som händer.',
    step2NudgeEdges: 'Koppla nu ihop dem: kontext → inre respons → vad som händer.',
    step3Title: '3. Kontrollera om det återkopplar',
    step3Body:
      'Titta på slutet av din kedja och fråga: matar det tillbaka in i något tidigare? Dålig sömn skapar oro, men oro skapar också dålig sömn.\n\nÅterkoppling är oftast svaret på varför ett problem består långt efter att det som startade det är borta.',
    step3Nudge: 'Inget återkopplar ännu. Matar konsekvensen in i något tidigare?',
    step4Title: '4. Lägg till vad mer som är inblandat',
    step4Body:
      'Vad mer dras in i det här? Lägg till en nod för allt som påverkas av konsekvensen och som också återkopplar till responsen.\n\nFörstärkare spelar roll här. Trötthet är inte bara ännu ett problem, den får allt annat att kännas mer hotfullt.',
    step4Nudge: 'Lägg till minst en del till.',
    step5Title: '5. Lägg till det som hjälper',
    step5Body:
      'Allt gör inte saker värre. Lägg till något som minskar ett av de här problemen, rita det som en minskande koppling och märk kopplingen som Hjälper.\n\nDet här är ofta den del som hoppas över, och det är där interventionen oftast finns.',
    step5NudgeDecrease: 'Lägg till något som minskar ett av dem, ritat som en minskande koppling.',
    step5NudgeHelpful: 'Märk kopplingen som Hjälper, så att kartan visar vad som fungerar.',
    step6Title: '6. Kartlägg vad som står i vägen',
    step6Body:
      'Nu den svåra delen. Vad hindrar det som hjälper från att hända?\n\nDet är därför ”träna bara mer” landar så illa. Personen vet redan att det skulle hjälpa. Något i systemet dämpar det, och tills det syns har rådet ingenstans att ta vägen.',
    step6Nudge: 'Lägg till en koppling som dämpar det som hjälper.',
  },

  snapshots: {
    intro:
      'Spara nätverket som det ser ut nu, och kom tillbaka och rita det igen senare. Ingenting skrivs över.',
    labelPlaceholder: 'Etikett, t.ex. Bedömning eller Session 6',
    labelAria: 'Etikett för den här tidpunkten',
    saveButton: 'Spara tidpunkt',
    none: 'Inga tidpunkter sparade ännu.',
    meta: '{when} · {nodes} noder · {edges} kopplingar',
    deleteAria: 'Ta bort tidpunkten {label}',
    compare: 'Jämför',
    earlier: 'Tidigare',
    later: 'Senare',
    changes_one: '{count} förändring',
    changes_other: '{count} förändringar',
    downloadComparison: 'Ladda ner jämförelse (CSV)',
  },

  structure: {
    empty: 'Inget här ännu. Lägg till en nod för att börja.',
    nodes: 'Noder ({count})',
    connections: 'Kopplingar ({count})',
    noConnections: 'Inga ännu.',
    nodeMetaDistress: ' · svårighet {value}',
    nodeMetaFrequency: ' · frekvens {value}',
    deleteNodeAria: 'Ta bort noden {label}',
    deleteEdgeAria: 'Ta bort kopplingen {sentence}',
  },

  templates: {
    intro:
      'Utgångspunkter, inte fallformuleringar. Byt ut etiketterna mot personens egna ord och ta bort allt som inte stämmer. En mall som aldrig ifrågasätts är sämre än en tom rityta.',
    blankName: 'Tom rityta',
    blankDescription: 'Börja från ingenting.',
    abcName: 'Tretermskontingens',
    abcDescription: 'Grundställningen: kontext, inre respons, konsekvens. Bygg vidare härifrån.',
    worryName: 'Oro- och sömncykel',
    worryDescription:
      'Ett genomarbetat exempel. Användbart för att visa hur en förstärkande slinga ser ut.',
    moodName: 'Nedstämdhet och tillbakadragande',
    moodDescription:
      'Ett vanligt mönster inom beteendeaktivering. Sätt det i personens egna ord innan du använder det.',
    painName: 'Långvarig smärta och undvikande',
    painDescription:
      'Ett rädsla-undvikandemönster, med den dekonditioneringsslinga som oftast vidmakthåller det.',
  },

  templateNodes: {
    abcTrigger: 'Utlösare eller situation',
    abcThought: 'Tanke eller känsla',
    abcAction: 'Vad jag gör',

    worryCriticism: 'Kritik på jobbet',
    worryJobSecurity: 'Oro för att förlora jobbet',
    worrySleep: 'Svårt att sova',
    worryFatigue: 'Trötthet',
    worryExercise: 'Träning',
    worryWithdrawal: 'Socialt tillbakadragande',

    moodLow: 'Nedstämdhet',
    moodStayingHome: 'Stannar hemma',
    moodFewerThings: 'Färre saker som betyder något för mig',
    moodBurden: 'Jag är en belastning',
    moodContact: 'Kontakt med vänner',
    moodNoticing: 'Lägger märke till små bra stunder',

    painPain: 'Smärta',
    painFear: 'Rädsla för att göra det värre',
    painAvoiding: 'Undviker aktivitet',
    painDeconditioning: 'Dekonditionering',
    painDoingAnyway: 'Gör det som betyder något ändå',
    painWillingness: 'Villighet att känna obehag',
  },

  templateNote:
    'Det här är en utgångspunkt, inte en fallformulering. Byt ut etiketterna mot personens egna ord.',

  exportDialog: {
    intro:
      'CSV-formaten läses rakt in i R eller Python. Adjacensmatrisen är det som qgraph, igraph och networkx förväntar sig som indata.',
    json: 'Nätverk (JSON)',
    edges: 'Kantlista (CSV)',
    nodes: 'Nodlista (CSV)',
    matrix: 'Adjacensmatris (CSV)',
    report: 'Analysrapport (Markdown)',
    events: 'Uppbyggnadslogg (CSV)',
    png: 'Bild (PNG)',
    svg: 'Vektor (SVG)',
    print: 'Skriv ut / PDF',
  },

  share: {
    title: 'Dela länk',
    intro:
      'Hela nätverket är kodat i själva länken. Det finns ingen kopia på någon server, och den del som bär ditt innehåll skickas aldrig med i webbförfrågan, så ingenting lagras eller loggas någonstans. Alla som har länken kan öppna och redigera sin egen kopia.',
    building: 'Bygger länken…',
    tooLong:
      'Det här nätverket är för stort för en länk ({length} tecken). Exportera det som JSON och skicka filen i stället.',
  },

  clearDialog: {
    title: 'Rensa det här nätverket?',
    body: 'Det tar bort alla {nodes} noder och {edges} kopplingar. Du kan ångra det, och sparade tidpunkter behålls.',
    confirm: 'Rensa allt',
  },

  kernel: {
    title: 'Behandlingskärnor',
    warning: 'Under utveckling. Det finns ännu ingenting bakom den här knappen.',
    p1: 'Planen är ett vokabulär av behandlingskärnor: de minsta enheterna av terapeutisk förändring, i ett språk som är konsekvent nog för att fästas vid processerna på en karta. Välj en process och se vilka kärnor som är kända för att verka på den.',
    p2: 'Det svåra är att avgöra vad som räknas som en kärna och hur fint de ska delas upp, och det är inte avgjort ännu.',
    p3: 'Om du har idéer om hur den här databasen bör organiseras vill Kean gärna höra dem:',
  },

  help: {
    title: 'Så använder du verktyget',
    buildingHeading: 'Bygga en karta',
    buildingEvent:
      'situationen det handlar om. Börja här; på en tom rityta skapar varje klick en sådan. Den får en rund ruta, eftersom den inte är något personen gör.',
    buildingAdd: 'en process: en tanke, känsla, impuls eller handling. Fyrkantig ruta, färgad efter sin EEMM-kategori.',
    buildingConnect:
      'klicka på rutan som påverkar, sedan på den som påverkas. Välj sedan, med ett klick, om den ökar eller minskar den och hur mycket.',
    buildingDelete: 'klicka på valfri ruta eller pil. Eller markera något och tryck Delete.',
    buildingDoubleClick: 'Dubbelklicka på en ruta för att redigera den. Dra för att flytta, i alla lägen.',

    readingHeading: 'Läsa bilden',
    readingArrowheads:
      'En **fylld** pilspets betyder ökar; en **ofylld** betyder minskar. Tjockare linjer med större spetsar är starkare inflytande. Inga siffror, och inget beroende av färg.',
    readingReciprocal: 'En linje med spets i båda ändar betyder att de två påverkar varandra.',
    readingShapes: 'Fyrkantiga rutor är processer; runda rutor är händelser eller kontexter.',
    readingColour:
      'Pilar är svarta om du inte har märkt en koppling som hjälpande (grön) eller som att den inte hjälper (röd). De flesta kopplingar förblir svarta: märkningen finns till för när du prövar om något nytt bryter en slinga.',
    readingColourMode:
      'Knappen Upp/ner byter pilarnas färg till att i stället visa ökning (blå) och minskning (orange), för när det är påverkans riktning du läser efter.',

    keyboardHeading: 'Tangentbord',
    keyboardTools: 'välj · händelse/kontext · ny nod · koppla · ta bort',
    keyboardConnectFromSelection: 'Markera en ruta och tryck C, så avslutar nästa klick kopplingen.',
    keyboardDelete: 'Delete eller Backspace tar bort det som är markerat.',
    keyboardEscape: 'Esc avbryter det du håller på med. Tryck igen för att återgå till Välj.',
    keyboardView: 'F anpassa vyn · O ordna · M skattningar · G rutnät',
    keyboardEditing:
      'Ctrl/Cmd+Z ångra · Skift+klick för att markera flera · Ctrl/Cmd+C och Ctrl/Cmd+V kopiera och klistra in · Ctrl/Cmd+D duplicera',

    organiseHeading: 'Ordna',
    organiseBody:
      'Placerar rutorna i rader och kolumner som följer pilarna, med den huvudsakliga kontexten längst fram. Layouten prövas både på bredden och på höjden, och den som passar din skärm bäst behålls. Återkopplingsslingor ignoreras när ordningen bestäms, så att de läses som slingor i stället för att röra ihop sekvensen.',

    mouselessHeading: 'Utan mus',
    mouselessBody:
      'Listvyn visar hela kartan som text som du kan gå igenom med Tabb och redigera från tangentbordet. Det är också det en skärmläsare läser upp, eftersom en rityta är osynlig för den.',
    openListView: 'Öppna listvyn',

    cautionHeading: 'En varning om analysen',
    cautionBody:
      'Centralitet, slingor och hävstång beskriver kartan som ritades, inte personen. De förutsätter att inflytande är linjärt och omedelbart, vilket det inte är. De är ett strukturerat sätt att granska ditt eget tänkande, och de är värda exakt lika mycket som de skattningar de byggdes av.',
  },

  about: {
    title: 'Om',
    intro:
      'Ett fritt verktyg med öppen källkod för att kartlägga processbaserade nätverk: de funktionella sambanden mellan de processer som vidmakthåller psykiskt lidande och välbefinnande.',
    groundingHeading: 'Teoretisk grund',
    groundingBody:
      'Kategorierna, och sättet det här verktyget tänker om processer, kommer från den utvidgade evolutionära metamodellen (EEMM) som lagts fram i det processbaserade terapiarbetet av **Steven C. Hayes och Stefan G. Hofmann**: affekt, kognition, uppmärksamhet, själv, motivation och öppet beteende, placerade på en biofysiologisk och en sociokulturell nivå, och alltid lästa i sin kontext.',
    inspiration: 'Idén att göra det här i en webbläsare inspirerades av Joseph Ciarrochis',
    madeByHeading: 'Vem som har gjort det här',
    madeByBody:
      'Tan Kean Sian tänkte ut det här verktyget och ledde utvecklingen; all kod skrevs tillsammans med Claude, Anthropics AI-assistent. Frågor, eller förslag på förbättringar, är välkomna på',
    dataHeading: 'Var dina data finns',
    dataBody:
      'I din webbläsare, och ingen annanstans. Inget konto, ingen server, ingen analysspårning. Om du rensar webbläsardata raderas dina kartor, så exportera det du vill behålla. Delningslänkar bär kartan inuti själva länken i stället för att ladda upp den någonstans.',
    licence: 'MIT-licensierat. Bidrag är välkomna.',
  },

  error: {
    canvasTitle: 'Ritytan kunde inte startas',
    canvasHint:
      'Det beror oftast på att grafikacceleration inte är tillgänglig på den här datorn. Ditt nätverk är oskadat. Öppna Listvy för att läsa och redigera det som text, och Exportera för att få ut det.',
    technicalDetail: 'Teknisk information',
  },

  toast: {
    copied_one: 'Kopierade {count} ruta. Ctrl/Cmd+V för att klistra in.',
    copied_other: 'Kopierade {count} rutor. Ctrl/Cmd+V för att klistra in.',
    pasted_one: 'Klistrade in {count} ruta.',
    pasted_other: 'Klistrade in {count} rutor.',
    duplicated_one: 'Duplicerade {count} ruta.',
    duplicated_other: 'Duplicerade {count} rutor.',
    hypothesisOn: 'Hypotesläge på. Allt du lägger till nu är ett förslag och ritas streckat.',
    sharedOpened: 'Ett delat nätverk öppnades. Det har inte skrivit över ditt sparade arbete.',
    imported: 'Importerat.',
    importUnreadable: 'Kunde inte läsa den filen.',
    importNotJson: 'Den filen är inte giltig JSON.',
  },

  language: {
    title: 'Språk',
    note: 'Översättningarna är bidrag från användare och granskas fortfarande. Särskilt den kliniska terminologin kan ännu vara oklar på vissa språk.',
    contribute: 'Har du hittat en felöversättning? Rättelser är mycket välkomna på',
    draft: 'utkast',
  },

  a11y: {
    canvas: 'Nätverksrityta. En tangentbordstillgänglig version av samma innehåll finns i Listvy.',
    toolbar: 'Verktyg',
    scopeTabs: 'Vilka kopplingar som ska räknas',
  },
};
