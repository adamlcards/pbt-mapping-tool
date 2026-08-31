import type { PartialStrings } from '../strings';

/**
 * German (Deutsch).
 *
 * Terminology to check first: the edge direction increases/decreases is
 * rendered `erhöht`/`verringert`, deliberately NOT `verstärkt`, because
 * `verstärkend`/`ausgleichend` is reserved for the systems-dynamics loop
 * polarity (reinforcing/balancing) and the two would otherwise collide on the
 * same screen. EEMM categories follow the German PBT/ACT literature: Affekt,
 * Kognition, Aufmerksamkeit, Selbst, Motivation, offenes Verhalten, plus the
 * biophysiologische and soziokulturelle Ebenen; `overtBehaviour.prefix` is
 * shortened to `Verhalten` so it fits inside the box on the map. Other settled
 * choices: Dreifachkontingenz (three-term contingency), funktionale
 * Verhaltensanalyse (functional assessment), Zentralität, Hebelwirkung,
 * Rückkopplungsschleife, Defusion, Selbst-als-Kontext, Bereitschaft,
 * Verhaltensaktivierung, Dekonditionierung, Fallkonzeption (formulation).
 * Keyboard names are given as printed on a German keyboard (Entf, Umschalt);
 * the shortcut letters themselves are left as the physical keys.
 */
export const de: PartialStrings = {
  meta: { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },

  app: {
    name: 'Werkzeug für prozessbasiertes Netzwerk-Mapping',
    short: 'PBT-Mapping-Tool',
    networkTitleLabel: 'Titel des Netzwerks',
    untitledNetwork: 'Unbenanntes Netzwerk',
  },

  tool: {
    select: 'Auswählen',
    add: 'Knoten',
    connect: 'Verbinden',
    delete: 'Löschen',
    event: 'Ereignis / Kontext',
  },
  toolHint: {
    select: 'Klicken Sie, um etwas auszuwählen und zu sehen, womit es verbunden ist. Zum Verschieben ziehen.',
    add: 'Klicken Sie irgendwo auf die Fläche, um einen Knoten hinzuzufügen.',
    connect: 'Klicken Sie auf den beeinflussenden Knoten, dann auf den, den er beeinflusst.',
    delete: 'Klicken Sie zum Entfernen auf einen Knoten oder eine Verbindung.',
    start: 'Beginnen Sie mit dem Ereignis oder der Situation, um die es geht. Klicken Sie irgendwo hin.',
    focused: 'Fokus auf einem Teil des Netzwerks.',
    showEverything: 'Wieder alles anzeigen',
    pendingSource: 'Ausgangspunkt: {label}. Klicken Sie jetzt auf den Knoten, den er beeinflusst.',
  },

  action: {
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    fit: 'Einpassen',
    organise: 'Anordnen',
    clear: 'Leeren',
    grid: 'Raster',
    ratings: 'Bewertung',
    colourByValence: 'Hilfreich',
    colourByDirection: 'Auf/Ab',
    hypothesis: 'Hypothese',
    kernel: 'Kernel',
    analyse: 'Analyse',
    snapshots: 'Zeitpunkte',
    import: 'Importieren',
    export: 'Exportieren',
    share: 'Link teilen',
    help: 'Hilfe',
    about: 'Über',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    templates: 'Vorlagen',
    guided: 'Geführt',
    cancel: 'Abbrechen',
    save: 'Speichern',
    add: 'Hinzufügen',
    update: 'Aktualisieren',
    close: 'Schließen',
    back: 'Zurück',
    next: 'Weiter',
    finish: 'Fertig',
    restore: 'Wiederherstellen',
    tryAgain: 'Erneut versuchen',
    copy: 'Link kopieren',
    copied: 'Kopiert',
    language: 'Sprache',
  },

  tooltip: {
    undo: 'Rückgängig (Ctrl/Cmd+Z)',
    redo: 'Wiederholen (Ctrl/Cmd+Y)',
    fit: 'Alles auf den Bildschirm einpassen (F)',
    organise: 'Die Kästchen in Zeilen und Spalten ausrichten, die den Pfeilen folgen (O)',
    clear: 'Alles entfernen',
    grid: 'Ein Raster anzeigen und Kästchen daran ausrichten (G)',
    ratings: 'Werte für Belastung (B) und Häufigkeit (H) auf jedem Kästchen anzeigen (M)',
    colourIsDirection:
      'Die Pfeilfarbe zeigt derzeit Erhöhung (blau) und Verringerung (orange). Klicken Sie, um stattdessen danach einzufärben, ob die Verbindung hilfreich ist.',
    colourIsValence:
      'Die Pfeilfarbe zeigt derzeit, ob eine Verbindung hilfreich ist. Klicken Sie, um stattdessen nach Erhöhung und Verringerung einzufärben.',
    addEvent: 'Ein Ereignis oder einen Kontext hinzufügen',
    addProcess: 'Einen Prozess hinzufügen',
    hypothesis: 'Etwas hinzufügen, das Sie erwägen, und sehen, was sich dadurch ändern würde (H)',
    kernel: 'Behandlungs-Kernel (in Entwicklung)',
    analyse: 'Zentralität, Rückkopplungsschleifen, Pfade und Hebelwirkung',
    snapshots: 'Diese Karte als Zeitpunkt speichern und später vergleichen',
    import: 'Eine gespeicherte Datei laden',
    export: 'Als Bild, PDF, JSON oder CSV speichern',
    share: 'Einen Link zu dieser Karte erhalten',
    help: 'So verwenden Sie dieses Werkzeug',
    templates: 'Mit einem Beispiel beginnen',
    guided: 'Schritt für Schritt aufbauen',
    themeToLight: 'Zum hellen Design wechseln',
    themeToDark: 'Zum dunklen Design wechseln',
    language: 'Die Sprache der Oberfläche ändern',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D oder Entf/Backspace entfernt die Auswahl',
    closePanel: 'Bereich schließen',
    closeDialog: 'Dialog schließen',
    closeGuide: 'Anleitung schließen',
  },

  privacy: {
    localOnly: 'Alles bleibt auf diesem Gerät',
    localOnlyLong:
      'Ihre Karte wird in diesem Browser gespeichert und niemals irgendwohin gesendet. Sie können den Tab bedenkenlos schließen. Wenn Sie Ihre Browserdaten löschen, wird sie entfernt; exportieren Sie daher alles, was Sie behalten möchten.',
    studyMode: 'Studienmodus',
    studyModeLong:
      'Sie nehmen an einer Forschungsstudie teil. Ihre Karte und die Reihenfolge, in der Sie sie aufgebaut haben, werden auf dem Studienserver gespeichert.',
    autosaveUnavailable: 'Automatisches Speichern nicht verfügbar — exportieren Sie Ihre Arbeit',
    autosaveUnavailableLong:
      'Dieser Browser lässt die Seite nichts speichern. Das passiert meist, wenn eine HTML-Datei direkt von der Festplatte oder in einem privaten Fenster geöffnet wird. Ihre Arbeit bleibt privat, geht aber verloren, sobald Sie den Tab schließen. Nutzen Sie Exportieren, um sie zu behalten.',
  },

  panel: {
    analysis: 'Analyse',
    snapshots: 'Zeitpunkte',
    listView: 'Listenansicht',
  },

  nodeEditor: {
    newEvent: 'Neues Ereignis oder neuer Kontext',
    newNode: 'Neuer Knoten',
    edit: 'Knoten bearbeiten',
    name: 'Name',
    namePlaceholder: 'In den eigenen Worten der Person',
    category: 'Kategorie',
    ratingsDisclosure: 'Bewertungen und Notizen (optional)',
    ratingsNote:
      'Wird in Forschungsprotokollen verwendet, um Netzwerke zwischen Personen und über die Zeit hinweg zu vergleichen. Für das alltägliche klinische Mapping nicht erforderlich.',
    severity: 'Wie belastend (0–10)',
    frequency: 'Wie häufig (0–10)',
    notes: 'Notizen',
    notRated: 'Nicht bewertet',
    severityShort: 'B',
    frequencyShort: 'H',
    rate: 'Bewerten',
    clearRating: 'Löschen',
  },

  edgeEditor: {
    title: 'Wie wirkt sich das eine auf das andere aus?',
    sentenceIncreases: '{source} erhöht {target}',
    sentenceDecreases: '{source} verringert {target}',
    increasesIt: 'Erhöht es',
    decreasesIt: 'Verringert es',
    altDirection: 'Diese beiden beeinflussen sich auch in der anderen Richtung.',
    editAlt: '{source} → {target} bearbeiten',
    removeLink: 'Verbindung entfernen',
    addLink: 'Verbindung hinzufügen',
    helpingDisclosure: 'Ist diese Verbindung hilfreich?',
    helpingNote:
      'Kein Prozess ist für sich genommen hilfreich oder schädlich; es hängt davon ab, womit er verbunden ist — deshalb wird das hier gefragt und nicht beim Benennen des Kästchens. Erst durch das Markieren der Verbindungen kann der Analysebereich sagen, welche Veränderung helfen würde, und nicht nur, welche sich am weitesten ausbreiten würde. Lassen Sie es unangetastet, wenn Sie das nicht nutzen.',
  },

  category: {
    uncategorised: {
      label: 'Nicht kategorisiert',
      prefix: '',
      hint: 'Noch nicht zugeordnet. Kann ruhig so bleiben, solange Sie noch überlegen.',
    },
    affect: {
      label: 'Affekt',
      prefix: 'Affekt',
      hint: 'Emotionen und Gefühle. Sie zu vermeiden oder bereit zu sein, sie zu erleben.',
    },
    cognition: {
      label: 'Kognition',
      prefix: 'Kognition',
      hint: 'Gedanken, Überzeugungen, Regeln, Grübeln, Defusion.',
    },
    attention: {
      label: 'Aufmerksamkeit',
      prefix: 'Aufmerksamkeit',
      hint: 'Was wahrgenommen wird und was nicht. Flexibler oder enger Fokus.',
    },
    self: {
      label: 'Selbst',
      prefix: 'Selbst',
      hint: 'Selbstkonzept, Identität, Selbstkritik, Selbst-als-Kontext.',
    },
    motivation: {
      label: 'Motivation',
      prefix: 'Motivation',
      hint: 'Werte, Ziele, worauf die Person zugeht und wovon sie sich wegbewegt.',
    },
    overtBehaviour: {
      label: 'Offenes Verhalten',
      prefix: 'Verhalten',
      hint: 'Beobachtbares Handeln. Was die Person tatsächlich tut.',
    },
    biophysiological: {
      label: 'Biophysiologisch',
      prefix: 'Biophysiologisch',
      hint: 'Schlaf, Schmerz, Krankheit, Medikation, Erregung, Physiologie.',
    },
    sociocultural: {
      label: 'Soziokulturell',
      prefix: 'Soziokulturell',
      hint: 'Beziehungen, Familie, Kultur, soziale Unterstützung oder sozialer Druck.',
    },
    context: {
      label: 'Kontext / Ereignis',
      prefix: 'Ereignis',
      hint: 'Eine Situation oder ein Ereignis, nicht etwas, das die Person tut. Wird mit abgerundeten Ecken dargestellt.',
    },
  },
  categoryGroup: {
    dimension: 'Psychologische Dimensionen',
    level: 'Ebenen',
    other: 'Kontext und ohne Kategorie',
  },

  strength: {
    1: 'Etwas',
    2: 'Mäßig',
    3: 'Stark',
  },

  valence: {
    neutral: 'Nicht beurteilt',
    helpful: 'Hilfreich',
    unhelpful: 'Nicht hilfreich',
  },

  trial: {
    proposed: 'Wird erwogen',
    adopted: 'Ausprobiert, hat geholfen',
    ruledOut: 'Ausprobiert, hat nicht geholfen',
    proposedHint:
      'Noch eine Idee. Wird gestrichelt dargestellt und bleibt aus der Ausgangslage heraus, an der der Vergleich gemessen wird.',
    adoptedHint: 'Es hat funktioniert. Es wird Teil der Karte und wie alles andere dargestellt.',
    ruledOutHint:
      'Es hat nicht funktioniert. Bleibt erhalten, aber blass, damit Sie sehen, was schon ausprobiert wurde.',
    dialogTitle: 'Was ist damit passiert?',
    legend: 'Wo steht das gerade?',
    lastRecorded: 'Zuletzt erfasst {when}',
    notATrial: 'Gar kein Versuch — als gewöhnlichen Teil der Karte behandeln',
  },

  analysis: {
    title: 'Analyse',
    summary: 'Was dieses Netzwerk zeigt',
    central: 'Am stärksten verbunden',
    loops: 'Rückkopplungsschleifen',
    leverage: 'Wo Veränderung am weitesten wirken könnte',
    paths: 'Einen Pfad verfolgen',
    whatIf: 'Was wäre, wenn',
    empty: 'Fügen Sie Knoten und Verbindungen hinzu, um eine Analyse zu sehen.',

    stats: '{nodes} Knoten · {edges} Verbindungen · Dichte {density}',

    scopeAll: 'Alle Verbindungen',
    scopeUnhelpful: 'Maladaptiv',
    scopeHelpful: 'Adaptiv',
    centralNote:
      'Die Stärke zählt, wie viel Einfluss ein- und ausgeht. Sie ist das Zentralitätsmaß mit der besten Befundlage für die Auswahl von Behandlungszielen, aber ein zentraler Knoten ist nicht automatisch der richtige Ansatzpunkt.',
    scopeUnhelpfulNote:
      'Gezählt werden nur die Pfeile, die Sie als nicht hilfreich markiert haben. Ein hoher Wert steht hier für einen Prozess, der das Problem zusammenhält.',
    scopeHelpfulNote:
      'Gezählt werden nur die Pfeile, die Sie als hilfreich markiert haben. Ein hoher Wert steht hier für etwas, das der Person bereits zur Verfügung steht — oft lohnt es sich eher, darauf aufzubauen, als etwas Neues hinzuzufügen.',
    excludedNote_one:
      '{count} nicht beurteilte Verbindung bleibt in beiden Teilansichten unberücksichtigt, deshalb summieren sich die Teilwerte nicht zu den Gesamtwerten.',
    excludedNote_other:
      '{count} nicht beurteilte Verbindungen bleiben in beiden Teilansichten unberücksichtigt, deshalb summieren sich die Teilwerte nicht zu den Gesamtwerten.',
    noneMarkedHelpful:
      'Bisher ist nichts als hilfreich markiert. Öffnen Sie eine Verbindung und legen Sie fest, ob sie hilft, um diese Ansicht zu füllen.',
    noneMarkedUnhelpful:
      'Bisher ist nichts als nicht hilfreich markiert. Öffnen Sie eine Verbindung und legen Sie fest, ob sie hilft, um diese Ansicht zu füllen.',

    colNode: 'Knoten',
    colIn: 'Ein',
    colOut: 'Aus',
    colStrength: 'Stärke',
    colNetOutward: 'Netto ausgehend',
    chipEntryPoint: 'Einstiegspunkt',
    chipEndpoint: 'Endpunkt',
    chipUnconnected: 'unverbunden',
    chipNothingHelping: 'nichts Hilfreiches',
    chipNothingUnhelpful: 'nichts Hinderliches',

    reinforcing: 'Verstärkend',
    balancing: 'Ausgleichend',
    reinforcingHelp:
      'Selbsterhaltend. Eine Zunahme an irgendeiner Stelle der Schleife kommt als weitere Zunahme zurück — deshalb läuft das Problem weiter, auch wenn der Auslöser längst vorbei ist.',
    balancingHelp:
      'Selbstkorrigierend. Etwas in dieser Schleife wirkt dagegen, was meist eine natürliche Bremse bedeutet.',
    noLoops: 'Keine Schleifen gefunden.',
    manyLoops: 'Dieses Netzwerk hat viele Schleifen. Aufgeführt sind nur die stärksten.',
    loopSteps_one: '{count} Schritt, Verstärkung {gain}',
    loopSteps_other: '{count} Schritte, Verstärkung {gain}',

    heuristicWarning:
      'Diese Zahlen beschreiben die Karte, die Sie gezeichnet haben, nicht die Person. Sie setzen voraus, dass Einfluss linear und unmittelbar wirkt, was er nicht tut. Nutzen Sie sie zum Nachdenken, niemals als Vorhersage.',
    colIfReduced: 'Wenn dies verringert würde',
    colBenefit: 'Modellierter Nutzen',
    colReach: 'Reichweite',
    wouldAlsoSuppress: 'Würde auch {labels} unterdrücken',
    chipNoDampening: 'keine Dämpfung',

    from: 'Von',
    to: 'Nach',
    choose: 'Auswählen…',
    noRoute: 'Keine Route von einem zum anderen.',
    routeStats_one: '{count} Route · {up} erhöhend · {down} verringernd · netto {net}',
    routeStats_other: '{count} Routen · {up} erhöhend · {down} verringernd · netto {net}',
    pathSteps_one: '{count} Schritt, Effekt {effect}',
    pathSteps_other: '{count} Schritte, Effekt {effect}',
    increases: 'erhöht',
    decreases: 'verringert',

    colNow: 'Jetzt',
    colWithThis: 'Damit',
    rowReinforcing: 'Verstärkende Schleifen',
    rowBalancing: 'Ausgleichende Schleifen',
    rowAmplification: 'Modellierte Verstärkung',
    newBrakes: 'Neue Bremsen im System',
    badgeNewBalancing: 'neu ausgleichend',
    howItActs: 'Wie es in jedem Durchlauf wirkt',
    mechSelfCorrecting: 'selbstkorrigierend',
    mechSteadyPressure: 'gleichbleibender Druck',
    mechPushedHarder: 'wird stärker angetrieben',
    mechUntouched: 'unberührt',
    pressureOn: 'auf {labels} · muss aufrechterhalten werden',
    holdsOnItsOwn: 'hält von selbst',
  },

  summary: {
    noNodes: 'Fügen Sie einige Knoten hinzu, um eine Analyse zu sehen.',
    noEdges:
      'Bisher ist nichts verbunden. Fügen Sie Verbindungen hinzu, um zu sehen, wie sich die Teile gegenseitig beeinflussen.',
    mostConnected_one:
      '**{label}** ist der am stärksten verbundene Teil dieses Netzwerks ({inDegree} eingehender Einfluss, {outDegree} ausgehend). An zentralen Knoten breitet sich Veränderung oft am weitesten aus, sie sind aber häufig auch am schwersten direkt zu bewegen.',
    mostConnected_other:
      '**{label}** ist der am stärksten verbundene Teil dieses Netzwerks ({inDegree} eingehende Einflüsse, {outDegree} ausgehend). An zentralen Knoten breitet sich Veränderung oft am weitesten aus, sie sind aber häufig auch am schwersten direkt zu bewegen.',
    reinforcing_one:
      'Hier gibt es **{count} verstärkende Schleife**. Das sind selbsterhaltende Kreisläufe: Sie laufen weiter, auch wenn das, was sie ausgelöst hat, längst vorbei ist.',
    reinforcing_other:
      'Hier gibt es **{count} verstärkende Schleifen**. Das sind selbsterhaltende Kreisläufe: Sie laufen weiter, auch wenn das, was sie ausgelöst hat, längst vorbei ist.',
    tightestLoop: ' Die engste ist {path}.',
    noReinforcing:
      'Es wurden keine verstärkenden Schleifen gefunden. Es lohnt sich zu fragen, ob hier etwas auf sich selbst zurückwirkt, denn Rückkopplung ist oft der Grund, warum ein Problem bestehen bleibt.',
    balancing_one:
      '{count} ausgleichende Schleife gefunden. Diese sind selbstkorrigierend und markieren oft Stellen, an denen die Person bereits eine natürliche Bremse für das Problem hat.',
    balancing_other:
      '{count} ausgleichende Schleifen gefunden. Diese sind selbstkorrigierend und markieren oft Stellen, an denen die Person bereits eine natürliche Bremse für das Problem hat.',
    sources_one:
      '{labels} beeinflusst anderes, wird aber von nichts im Netzwerk zurückbeeinflusst. Solche Einstiegspunkte sind manchmal der am leichtesten zugängliche Anfang.',
    sources_other:
      '{labels} beeinflussen anderes, werden aber von nichts im Netzwerk zurückbeeinflusst. Solche Einstiegspunkte sind manchmal der am leichtesten zugängliche Anfang.',
    leverage_one:
      '**{label}** zu verringern hat im Modell die größte Wirkung und erreicht {reach} weiteren Knoten.',
    leverage_other:
      '**{label}** zu verringern hat im Modell die größte Wirkung und erreicht {reach} weitere Knoten.',
    leverageCaveat_one:
      ' Beachten Sie, dass dabei auch {labels} unterdrückt würde — dies hängt an Verbindungen, die Sie als hilfreich markiert haben.',
    leverageCaveat_other:
      ' Beachten Sie, dass dabei auch {labels} unterdrückt würden — diese hängen an Verbindungen, die Sie als hilfreich markiert haben.',
    isolated_one: '{labels} ist noch mit nichts verbunden.',
    isolated_other: '{labels} sind noch mit nichts verbunden.',
    diverges:
      'Einige Teile dieses Netzwerks verstärken sich im Modell unbegrenzt, was in der Regel auf starke verstärkende Schleifen ohne Dämpfung hindeutet. Betrachten Sie die Hebelwerte nur als Anhaltspunkt.',
    caveat:
      '_Diese Zahlen beschreiben die Karte, die Sie gezeichnet haben, nicht die Person. Sie sind eine strukturierte Art, das eigene Denken zu betrachten, keine Vorhersage dessen, was geschehen wird._',
  },

  guided: {
    ariaLabel: 'Geführter Aufbau',
    stepOf: 'Schritt {current} von {total}',
    done: 'Erledigt. Gehen Sie weiter, wenn Sie so weit sind.',
    footer:
      'Sie können die Anleitung jederzeit verlassen und behalten alles, was Sie aufgebaut haben. Die Schritte sind ein Gerüst, kein Formular zum Ausfüllen.',
    step1Title: '1. Mit dem Kontext beginnen',
    step1Body:
      'Nutzen Sie die Schaltfläche „Ereignis / Kontext“ und fügen Sie die Situation hinzu, um die es geht: was passiert ist, wo, mit wem. Sie erhält ein abgerundetes Kästchen, weil sie nichts ist, was die Person tut.\n\nHier zu beginnen ist keine Formsache. In einer funktionalen Verhaltensanalyse bedeutet derselbe Gedanke oder dieselbe Handlung in verschiedenen Situationen etwas anderes; der Kontext ist also das, was alles Weitere überhaupt interpretierbar macht.',
    step1Nudge: 'Fügen Sie zu Beginn ein Ereignis- oder Kontextkästchen hinzu.',
    step2Title: '2. Die Reaktion und was folgt hinzufügen',
    step2Body:
      'Fügen Sie jetzt hinzu, was innerlich geschieht (ein Gedanke, ein Gefühl oder ein Impuls) und was die Person tut oder was daraus folgt. Verbinden Sie sie der Reihe nach, vom Kontext ausgehend.\n\nDas ist die Dreifachkontingenz, die Einheit, aus der eine funktionale Verhaltensanalyse aufgebaut ist. Alles Übrige wächst daraus.',
    step2NudgeNodes: 'Fügen Sie zwei weitere Kästchen hinzu: die innere Reaktion, dann was daraufhin geschieht.',
    step2NudgeEdges: 'Verbinden Sie sie nun: Kontext → innere Reaktion → was geschieht.',
    step3Title: '3. Prüfen, ob es zurückwirkt',
    step3Body:
      'Sehen Sie sich das Ende Ihrer Kette an und fragen Sie: Wirkt das auf etwas Früheres zurück? Schlechter Schlaf erzeugt Sorgen, aber Sorgen erzeugen auch schlechten Schlaf.\n\nRückkopplung ist meist die Antwort darauf, warum ein Problem lange fortbesteht, nachdem das, was es ausgelöst hat, verschwunden ist.',
    step3Nudge: 'Bisher wirkt nichts zurück. Speist die Konsequenz etwas Früheres?',
    step4Title: '4. Hinzufügen, was sonst beteiligt ist',
    step4Body:
      'Was ist sonst noch darin verwickelt? Fügen Sie einen Knoten für alles hinzu, was von der Konsequenz betroffen ist und zugleich auf die Reaktion zurückwirkt.\n\nVerstärker sind hier wichtig. Erschöpfung ist nicht einfach ein weiteres Problem, sie lässt alles andere bedrohlicher wirken.',
    step4Nudge: 'Fügen Sie mindestens ein weiteres Element hinzu.',
    step5Title: '5. Hinzufügen, was hilft',
    step5Body:
      'Nicht alles macht die Sache schlimmer. Fügen Sie etwas hinzu, das eines dieser Probleme verringert, zeichnen Sie es als verringernde Verbindung und markieren Sie diese Verbindung als hilfreich.\n\nDas ist oft der Teil, den Menschen überspringen, und genau dort liegt meist die Intervention.',
    step5NudgeDecrease: 'Fügen Sie etwas hinzu, das eines davon verringert, gezeichnet als verringernde Verbindung.',
    step5NudgeHelpful: 'Markieren Sie diese Verbindung als hilfreich, damit die Karte zeigt, was funktioniert.',
    step6Title: '6. Abbilden, was im Weg steht',
    step6Body:
      'Jetzt der schwierige Teil. Was verhindert, dass das Hilfreiche geschieht?\n\nDeshalb kommt „Bewegen Sie sich einfach mehr“ so schlecht an. Die Person weiß bereits, dass es helfen würde. Etwas im System unterdrückt es, und solange das nicht sichtbar ist, läuft der Ratschlag ins Leere.',
    step6Nudge: 'Fügen Sie eine Verbindung hinzu, die das Hilfreiche unterdrückt.',
  },

  snapshots: {
    intro:
      'Speichern Sie das Netzwerk so, wie es jetzt ist, und zeichnen Sie es später erneut. Es wird nichts überschrieben.',
    labelPlaceholder: 'Bezeichnung, z. B. Erstgespräch oder Sitzung 6',
    labelAria: 'Bezeichnung für diesen Zeitpunkt',
    saveButton: 'Zeitpunkt speichern',
    none: 'Noch keine Zeitpunkte gespeichert.',
    meta: '{when} · {nodes} Knoten · {edges} Verbindungen',
    deleteAria: 'Zeitpunkt {label} löschen',
    compare: 'Vergleichen',
    earlier: 'Früher',
    later: 'Später',
    changes_one: '{count} Änderung',
    changes_other: '{count} Änderungen',
    downloadComparison: 'Vergleich herunterladen (CSV)',
  },

  structure: {
    empty: 'Hier ist noch nichts. Fügen Sie zu Beginn einen Knoten hinzu.',
    nodes: 'Knoten ({count})',
    connections: 'Verbindungen ({count})',
    noConnections: 'Noch keine.',
    nodeMetaDistress: ' · Belastung {value}',
    nodeMetaFrequency: ' · Häufigkeit {value}',
    deleteNodeAria: 'Knoten {label} löschen',
    deleteEdgeAria: 'Verbindung {sentence} löschen',
  },

  templates: {
    intro:
      'Ausgangspunkte, keine Fallkonzeptionen. Ersetzen Sie die Bezeichnungen durch die eigenen Worte der Person und löschen Sie alles, was nicht passt. Eine Vorlage, die nicht hinterfragt wird, ist schlechter als eine leere Fläche.',
    blankName: 'Leere Fläche',
    blankDescription: 'Bei null beginnen.',
    abcName: 'Dreifachkontingenz',
    abcDescription:
      'Das Grundgerüst: Kontext, innere Reaktion, Konsequenz. Von hier aus nach außen aufbauen.',
    worryName: 'Sorgen-Schlaf-Kreislauf',
    worryDescription:
      'Ein durchgearbeitetes Beispiel. Nützlich, um zu zeigen, wie eine verstärkende Schleife aussieht.',
    moodName: 'Niedergeschlagenheit und Rückzug',
    moodDescription:
      'Ein häufiges Muster aus der Verhaltensaktivierung. Übertragen Sie es in die eigenen Worte der Person, bevor Sie es verwenden.',
    painName: 'Chronischer Schmerz und Vermeidung',
    painDescription:
      'Ein Angst-Vermeidungs-Muster mit der Dekonditionierungsschleife, die es meist aufrechterhält.',
  },

  templateNodes: {
    abcTrigger: 'Auslöser oder Situation',
    abcThought: 'Gedanke oder Gefühl',
    abcAction: 'Was ich tue',

    worryCriticism: 'Kritik auf der Arbeit',
    worryJobSecurity: 'Sorge um den Arbeitsplatz',
    worrySleep: 'Schlafprobleme',
    worryFatigue: 'Erschöpfung',
    worryExercise: 'Bewegung',
    worryWithdrawal: 'Sozialer Rückzug',

    moodLow: 'Niedergeschlagenheit',
    moodStayingHome: 'Zu Hause bleiben',
    moodFewerThings: 'Weniger von dem, was mir wichtig ist',
    moodBurden: 'Ich bin eine Last',
    moodContact: 'Kontakt zu Freunden',
    moodNoticing: 'Kleine gute Momente bemerken',

    painPain: 'Schmerz',
    painFear: 'Angst, es zu verschlimmern',
    painAvoiding: 'Aktivität vermeiden',
    painDeconditioning: 'Dekonditionierung',
    painDoingAnyway: 'Trotzdem tun, was mir wichtig ist',
    painWillingness: 'Bereitschaft, Unbehagen zu spüren',
  },

  templateNote:
    'Das ist ein Ausgangspunkt, keine Fallkonzeption. Ersetzen Sie die Bezeichnungen durch die eigenen Worte der Person.',

  exportDialog: {
    intro:
      'Die CSV-Formate lassen sich direkt in R oder Python laden. Die Adjazenzmatrix ist das, was qgraph, igraph und networkx als Eingabe erwarten.',
    json: 'Netzwerk (JSON)',
    edges: 'Kantenliste (CSV)',
    nodes: 'Knotenliste (CSV)',
    matrix: 'Adjazenzmatrix (CSV)',
    report: 'Analysebericht (Markdown)',
    events: 'Aufbauprotokoll (CSV)',
    png: 'Bild (PNG)',
    svg: 'Vektor (SVG)',
    print: 'Drucken / PDF',
  },

  share: {
    title: 'Link teilen',
    intro:
      'Das gesamte Netzwerk ist im Link selbst codiert. Es gibt keine Kopie auf einem Server, und der Teil, der Ihre Inhalte trägt, wird nie mit der Web-Anfrage übertragen — es wird also nirgendwo etwas gespeichert oder protokolliert. Wer den Link hat, kann eine eigene Kopie öffnen und bearbeiten.',
    building: 'Link wird erstellt…',
    tooLong:
      'Dieses Netzwerk ist für einen Link zu groß ({length} Zeichen). Exportieren Sie es als JSON und senden Sie stattdessen die Datei.',
  },

  clearDialog: {
    title: 'Dieses Netzwerk leeren?',
    body: 'Damit werden alle {nodes} Knoten und {edges} Verbindungen entfernt. Sie können das rückgängig machen, und gespeicherte Zeitpunkte bleiben erhalten.',
    confirm: 'Alles leeren',
  },

  kernel: {
    title: 'Behandlungs-Kernel',
    warning: 'In Entwicklung. Hinter dieser Schaltfläche steckt noch nichts.',
    p1: 'Geplant ist ein Vokabular von Behandlungs-Kerneln: den kleinsten Einheiten therapeutischer Veränderung, in einer Sprache, die einheitlich genug ist, um sie an die Prozesse auf einer Karte zu binden. Wählen Sie einen Prozess aus und sehen Sie, welche Kernel bekanntermaßen auf ihn wirken.',
    p2: 'Der schwierige Teil ist die Entscheidung, was als ein einzelner Kernel gilt und wie fein sie aufzuteilen sind — das ist noch nicht geklärt.',
    p3: 'Wenn Sie Ideen dazu haben, wie diese Datenbank aufgebaut sein sollte, würde Kean sie gerne hören:',
  },

  help: {
    title: 'So verwenden Sie dieses Werkzeug',
    buildingHeading: 'Eine Karte aufbauen',
    buildingEvent:
      'die Situation, um die es geht. Beginnen Sie hier; auf einer leeren Fläche erzeugt jeder Klick eine solche. Sie erhält ein abgerundetes Kästchen, weil sie nichts ist, was die Person tut.',
    buildingAdd:
      'ein Prozess: ein Gedanke, ein Gefühl, ein Impuls oder eine Handlung. Eckiges Kästchen, eingefärbt nach seiner EEMM-Kategorie.',
    buildingConnect:
      'auf das beeinflussende Kästchen klicken, dann auf das beeinflusste. Wählen Sie anschließend mit einem Klick, ob es erhöht oder verringert und um wie viel.',
    buildingDelete:
      'auf ein beliebiges Kästchen oder einen Pfeil klicken. Oder etwas auswählen und Entf drücken.',
    buildingDoubleClick:
      'Doppelklicken Sie auf ein Kästchen, um es zu bearbeiten. Ziehen zum Verschieben funktioniert in jedem Modus.',

    readingHeading: 'Das Bild lesen',
    readingArrowheads:
      'Eine **gefüllte** Pfeilspitze bedeutet erhöht, eine **hohle** bedeutet verringert. Dickere Linien mit größeren Spitzen stehen für stärkeren Einfluss. Ohne Zahlen und ohne sich auf Farbe zu verlassen.',
    readingReciprocal:
      'Eine Linie mit Spitzen an beiden Enden bedeutet, dass sich die beiden gegenseitig beeinflussen.',
    readingShapes: 'Eckige Kästchen sind Prozesse, abgerundete Kästchen sind Ereignisse oder Kontexte.',
    readingColour:
      'Pfeile sind schwarz, sofern Sie eine Verbindung nicht als hilfreich (grün) oder nicht hilfreich (rot) markiert haben. Die meisten Verbindungen bleiben schwarz: Die Markierung ist für den Fall gedacht, dass Sie prüfen, ob etwas Neues eine Schleife durchbricht.',
    readingColourMode:
      'Die Schaltfläche „Auf/Ab“ stellt die Pfeilfarbe stattdessen auf Erhöhung (blau) und Verringerung (orange) um — für den Fall, dass es Ihnen um die Richtung des Einflusses geht.',

    keyboardHeading: 'Tastatur',
    keyboardTools: 'auswählen · Ereignis/Kontext · Knoten hinzufügen · verbinden · löschen',
    keyboardConnectFromSelection:
      'Wählen Sie ein Kästchen aus, drücken Sie C, und Ihr nächster Klick vollendet die Verbindung.',
    keyboardDelete: 'Entf oder Backspace entfernt die Auswahl.',
    keyboardEscape: 'Esc bricht ab, was Sie gerade tun. Noch einmal drücken, um zur Auswahl zurückzukehren.',
    keyboardView: 'F einpassen · O anordnen · M Bewertungen · G Raster',
    keyboardEditing:
      'Ctrl/Cmd+Z rückgängig · Umschalt+Klick zur Mehrfachauswahl · Ctrl/Cmd+C und Ctrl/Cmd+V kopieren und einfügen · Ctrl/Cmd+D duplizieren',

    organiseHeading: 'Anordnen',
    organiseBody:
      'Richtet die Kästchen in Zeilen und Spalten aus, die den Pfeilen folgen, mit dem Hauptkontext an der vorderen Kante. Es wird sowohl das quer- als auch das längsverlaufende Layout probiert und dasjenige behalten, das besser auf Ihren Bildschirm passt. Rückkopplungsschleifen werden bei der Bestimmung der Reihenfolge ignoriert, damit sie als Schleifen lesbar bleiben und die Abfolge nicht durcheinanderbringen.',

    mouselessHeading: 'Ohne Maus',
    mouselessBody:
      'Die Listenansicht zeigt die gesamte Karte als Text, durch den Sie sich mit Tab bewegen und den Sie über die Tastatur bearbeiten können. Sie ist auch das, was ein Screenreader vorliest, denn eine Zeichenfläche ist für ihn unsichtbar.',
    openListView: 'Listenansicht öffnen',

    cautionHeading: 'Ein Vorbehalt zur Analyse',
    cautionBody:
      'Zentralität, Schleifen und Hebelwirkung beschreiben die Karte, die gezeichnet wurde, nicht die Person. Sie setzen voraus, dass Einfluss linear und unmittelbar wirkt, was er nicht tut. Sie sind eine strukturierte Art, das eigene Denken zu befragen, und sie sind genau so viel wert wie die Bewertungen, aus denen sie gebildet wurden.',
  },

  about: {
    title: 'Über',
    intro:
      'Ein kostenloses Open-Source-Werkzeug zum Abbilden prozessbasierter Netzwerke: der funktionalen Beziehungen zwischen den Prozessen, die psychisches Leiden und Wohlbefinden aufrechterhalten.',
    groundingHeading: 'Fundierung',
    groundingBody:
      'Die Kategorien und die Art, wie dieses Werkzeug über Prozesse denkt, stammen aus dem Extended Evolutionary Meta-Model (EEMM), das in der prozessbasierten Therapiearbeit von **Steven C. Hayes und Stefan G. Hofmann** dargelegt wird: Affekt, Kognition, Aufmerksamkeit, Selbst, Motivation und offenes Verhalten, verortet auf der biophysiologischen und der soziokulturellen Ebene und immer im Kontext gelesen.',
    inspiration: 'Die Idee, das im Browser zu tun, wurde angeregt durch Joseph Ciarrochis',
    madeByHeading: 'Wer das gemacht hat',
    madeByBody:
      'Tan Kean Sian hat dieses Werkzeug konzipiert und seine Entwicklung geleitet; der gesamte Code wurde mit Claude geschrieben, dem KI-Assistenten von Anthropic. Fragen oder Vorschläge zur Verbesserung sind willkommen unter',
    dataHeading: 'Wo Ihre Daten liegen',
    dataBody:
      'In Ihrem Browser und sonst nirgendwo. Kein Konto, kein Server, keine Analyse-Tracker. Wenn Sie Ihre Browserdaten löschen, sind Ihre Karten weg — exportieren Sie also alles, was Sie behalten möchten. Teilen-Links tragen die Karte im Link selbst, statt sie irgendwohin hochzuladen.',
    licence: 'MIT-lizenziert. Beiträge sind willkommen.',
  },

  error: {
    canvasTitle: 'Die Zeichenfläche konnte nicht gestartet werden',
    canvasHint:
      'Das bedeutet meist, dass auf diesem Rechner keine Grafikbeschleunigung verfügbar ist. Ihr Netzwerk ist sicher. Öffnen Sie die Listenansicht, um es als Text zu lesen und zu bearbeiten, und Exportieren, um es herauszuholen.',
    technicalDetail: 'Technische Details',
  },

  toast: {
    copied_one: '{count} Kästchen kopiert. Ctrl/Cmd+V zum Einfügen.',
    copied_other: '{count} Kästchen kopiert. Ctrl/Cmd+V zum Einfügen.',
    pasted_one: '{count} Kästchen eingefügt.',
    pasted_other: '{count} Kästchen eingefügt.',
    duplicated_one: '{count} Kästchen dupliziert.',
    duplicated_other: '{count} Kästchen dupliziert.',
    hypothesisOn:
      'Hypothesenmodus an. Alles, was Sie jetzt hinzufügen, ist ein Vorschlag und wird gestrichelt dargestellt.',
    sharedOpened: 'Ein geteiltes Netzwerk wurde geöffnet. Ihre gespeicherte Arbeit wurde nicht überschrieben.',
    imported: 'Importiert.',
    importUnreadable: 'Diese Datei konnte nicht gelesen werden.',
    importNotJson: 'Diese Datei ist kein gültiges JSON.',
  },

  language: {
    title: 'Sprache',
    note: 'Die Übersetzungen stammen aus der Community und werden noch geprüft. Besonders das klinische Vokabular ist möglicherweise noch nicht in jeder Sprache festgelegt.',
    contribute: 'Eine falsche Übersetzung entdeckt? Korrekturen sind sehr willkommen unter',
    draft: 'Entwurf',
  },

  a11y: {
    canvas:
      'Netzwerk-Zeichenfläche. Eine über die Tastatur zugängliche Fassung derselben Inhalte finden Sie in der Listenansicht.',
    toolbar: 'Werkzeuge',
    scopeTabs: 'Welche Verbindungen gezählt werden',
  },
};
