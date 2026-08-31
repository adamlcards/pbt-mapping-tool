import type { PartialStrings } from '../strings';

/**
 * Italian (Italiano).
 *
 * The EEMM dimensions follow the Italian PBT/ACT literature: affettività,
 * cognizione, attenzione, sé, motivazione, comportamento manifesto,
 * biofisiologico, socioculturale. Loops are `circuiti` — `rinforzanti` and
 * `bilancianti` (systems-dynamics usage); a `timepoint` is a `rilevazione`
 * (repeated-measures register); `helping` / `not helping` are the plain
 * `aiuta` / `non aiuta`, with `adattivo` / `disadattivo` on the Analysis tabs
 * where the English says Adaptive / Maladaptive. `Treatment kernels` is
 * rendered `nuclei di trattamento` rather than left in English — worth a
 * second opinion. The user is addressed informally (tu + imperative), the
 * convention in Italian professional software.
 */
export const it: PartialStrings = {
  meta: { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr' },

  app: {
    name: 'Strumento di mappatura delle reti di processi',
    short: 'Strumento di mappatura PBT',
    networkTitleLabel: 'Titolo della rete',
    untitledNetwork: 'Rete senza titolo',
  },

  tool: {
    select: 'Seleziona',
    add: 'Aggiungi nodo',
    connect: 'Collega',
    delete: 'Elimina',
    event: 'Evento / contesto',
  },
  toolHint: {
    select: 'Fai clic per selezionare e vedere a che cosa è collegato. Trascina per spostare.',
    add: 'Fai clic in un punto qualsiasi dell’area di disegno per aggiungere un nodo.',
    connect: 'Fai clic sul nodo che influenza, poi su quello influenzato.',
    delete: 'Fai clic su un nodo o su un collegamento per rimuoverlo.',
    start: 'Parti dall’evento o dalla situazione di cui si tratta. Fai clic ovunque.',
    focused: 'Vista limitata a una parte della rete.',
    showEverything: 'Mostra di nuovo tutto',
    pendingSource: 'Origine: {label}. Ora fai clic sul nodo che influenza.',
  },

  action: {
    undo: 'Annulla',
    redo: 'Ripeti',
    fit: 'Adatta',
    organise: 'Organizza',
    clear: 'Svuota',
    grid: 'Griglia',
    ratings: 'Punteggi',
    colourByValence: 'Aiuta',
    colourByDirection: 'Su/giù',
    hypothesis: 'Ipotesi',
    kernel: 'Nuclei',
    analyse: 'Analisi',
    snapshots: 'Rilevazioni',
    import: 'Importa',
    export: 'Esporta',
    share: 'Condividi',
    help: 'Guida',
    about: 'Informazioni',
    themeLight: 'Chiaro',
    themeDark: 'Scuro',
    templates: 'Modelli',
    guided: 'Passo passo',
    cancel: 'Annulla',
    save: 'Salva',
    add: 'Aggiungi',
    update: 'Aggiorna',
    close: 'Chiudi',
    back: 'Indietro',
    next: 'Avanti',
    finish: 'Fine',
    restore: 'Ripristina',
    tryAgain: 'Riprova',
    copy: 'Copia link',
    copied: 'Copiato',
    language: 'Lingua',
  },

  tooltip: {
    undo: 'Annulla (Ctrl/Cmd+Z)',
    redo: 'Ripeti (Ctrl/Cmd+Y)',
    fit: 'Adatta tutto allo schermo (F)',
    organise: 'Allinea i riquadri in righe e colonne che seguono le frecce (O)',
    clear: 'Rimuovi tutto',
    grid: 'Mostra una griglia e allinea i riquadri a essa (G)',
    ratings: 'Stampa su ogni riquadro i punteggi di disagio (D) e frequenza (F) (M)',
    colourIsDirection:
      'Al momento il colore delle frecce mostra gli aumenti (blu) e le diminuzioni (arancione). Fai clic per colorare invece in base al fatto che il collegamento aiuti.',
    colourIsValence:
      'Al momento il colore delle frecce mostra se un collegamento aiuta. Fai clic per colorare invece in base ad aumenti e diminuzioni.',
    addEvent: 'Aggiungi un evento o un contesto',
    addProcess: 'Aggiungi un processo',
    hypothesis: 'Aggiungi qualcosa che stai valutando e vedi che cosa cambierebbe (H)',
    kernel: 'Nuclei di trattamento (in sviluppo)',
    analyse: 'Centralità, circuiti di retroazione, percorsi e leve',
    snapshots: 'Salva questa mappa come rilevazione e confrontala più avanti',
    import: 'Carica un file salvato',
    export: 'Salva come immagine, PDF, JSON o CSV',
    share: 'Ottieni un link a questa mappa',
    help: 'Come si usa',
    templates: 'Parti da un esempio',
    guided: 'Costruzione passo passo',
    themeToLight: 'Passa al tema chiaro',
    themeToDark: 'Passa al tema scuro',
    language: 'Cambia la lingua dell’interfaccia',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, oppure Canc/Backspace per rimuovere ciò che è selezionato',
    closePanel: 'Chiudi il pannello',
    closeDialog: 'Chiudi la finestra',
    closeGuide: 'Chiudi la guida',
  },

  privacy: {
    localOnly: 'Tutto resta su questo dispositivo',
    localOnlyLong:
      'La tua mappa è salvata in questo browser e non viene mai inviata da nessuna parte. Puoi chiudere la scheda senza rischi. Se cancelli i dati del browser la mappa sparisce, quindi esporta ciò che vuoi conservare.',
    studyMode: 'Modalità studio',
    studyModeLong:
      'Stai partecipando a uno studio di ricerca. La tua mappa e l’ordine in cui l’hai costruita vengono salvati sul server dello studio.',
    autosaveUnavailable: 'Salvataggio automatico non disponibile — esporta per conservare il lavoro',
    autosaveUnavailableLong:
      'Questo browser non permette alla pagina di salvare nulla: di solito succede quando un file HTML viene aperto direttamente dal disco, oppure in una finestra di navigazione anonima. Il tuo lavoro resta privato, ma andrà perso quando chiudi la scheda. Usa Esporta per conservarlo.',
  },

  panel: {
    analysis: 'Analisi',
    snapshots: 'Rilevazioni',
    listView: 'Vista elenco',
  },

  nodeEditor: {
    newEvent: 'Nuovo evento o contesto',
    newNode: 'Nuovo nodo',
    edit: 'Modifica nodo',
    name: 'Nome',
    namePlaceholder: 'Con le parole della persona',
    category: 'Categoria',
    ratingsDisclosure: 'Punteggi e note (facoltativi)',
    ratingsNote:
      'Servono nei protocolli di ricerca per confrontare le reti tra persone e nel tempo. Non sono necessari per la mappatura clinica di tutti i giorni.',
    severity: 'Quanto disturba (0–10)',
    frequency: 'Quanto spesso (0–10)',
    notes: 'Note',
    notRated: 'Senza punteggio',
    /** D = disturba / disagio, F = frequenza. */
    severityShort: 'D',
    frequencyShort: 'F',
    rate: 'Valuta',
    clearRating: 'Cancella',
  },

  edgeEditor: {
    title: 'In che modo questo influisce su quello?',
    sentenceIncreases: '{source} aumenta {target}',
    sentenceDecreases: '{source} riduce {target}',
    increasesIt: 'Lo aumenta',
    decreasesIt: 'Lo riduce',
    altDirection: 'Questi due si influenzano anche nella direzione opposta.',
    editAlt: 'Modifica {source} → {target}',
    removeLink: 'Rimuovi il collegamento',
    addLink: 'Aggiungi il collegamento',
    helpingDisclosure: 'Questo collegamento aiuta?',
    helpingNote:
      'Nessun processo è utile o dannoso di per sé: dipende da ciò a cui è collegato, ed è per questo che la domanda compare qui e non quando dai un nome al riquadro. Contrassegnare i collegamenti è ciò che permette al pannello Analisi di dire quale cambiamento aiuterebbe, e non solo quale si propagherebbe più lontano. Lascia stare se non ti serve.',
  },

  category: {
    uncategorised: {
      label: 'Senza categoria',
      prefix: '',
      hint: 'Non ancora classificato. Puoi lasciarlo così finché ci stai ancora pensando.',
    },
    affect: {
      label: 'Affettività',
      prefix: 'Affettività',
      hint: 'Emozioni e sentimenti. Evitarli, oppure essere disponibili a provarli.',
    },
    cognition: {
      label: 'Cognizione',
      prefix: 'Cognizione',
      hint: 'Pensieri, credenze, regole, ruminazione, defusione.',
    },
    attention: {
      label: 'Attenzione',
      prefix: 'Attenzione',
      hint: 'Ciò che viene notato e ciò che non lo è. Attenzione flessibile o ristretta.',
    },
    self: {
      label: 'Sé',
      prefix: 'Sé',
      hint: 'Concetto di sé, identità, autocritica, sé come contesto.',
    },
    motivation: {
      label: 'Motivazione',
      prefix: 'Motivazione',
      hint: 'Valori, obiettivi, ciò verso cui la persona si muove o da cui si allontana.',
    },
    overtBehaviour: {
      label: 'Comportamento manifesto',
      prefix: 'Comportamento',
      hint: 'Azione osservabile. Ciò che la persona fa concretamente.',
    },
    biophysiological: {
      label: 'Biofisiologico',
      prefix: 'Biofisiologico',
      hint: 'Sonno, dolore, malattia, farmaci, attivazione, fisiologia.',
    },
    sociocultural: {
      label: 'Socioculturale',
      prefix: 'Socioculturale',
      hint: 'Relazioni, famiglia, cultura, supporto o pressione sociale.',
    },
    context: {
      label: 'Contesto / evento',
      prefix: 'Evento',
      hint: 'Una situazione o un evento, non qualcosa che la persona fa. Disegnato con angoli arrotondati.',
    },
  },
  categoryGroup: {
    dimension: 'Dimensioni psicologiche',
    level: 'Livelli',
    other: 'Contesto e non classificati',
  },

  strength: {
    1: 'Poco',
    2: 'Moderatamente',
    3: 'Molto',
  },

  valence: {
    neutral: 'Non valutato',
    helpful: 'Aiuta',
    unhelpful: 'Non aiuta',
  },

  trial: {
    proposed: 'In valutazione',
    adopted: 'Provato, ha aiutato',
    ruledOut: 'Provato, non ha aiutato',
    proposedHint:
      'Per ora è solo un’idea. Viene disegnato tratteggiato e resta fuori dalla linea di base su cui si misura il confronto.',
    adoptedHint: 'Ha funzionato. Entra a far parte della mappa ed è disegnato come tutto il resto.',
    ruledOutHint:
      'Non ha funzionato. Viene mantenuto ma sbiadito, così puoi vedere che cosa è già stato provato.',
    dialogTitle: 'Che cosa è successo con questo?',
    legend: 'A che punto è?',
    lastRecorded: 'Ultima registrazione {when}',
    notATrial: 'Non è affatto una prova — rendilo una parte ordinaria della mappa',
  },

  analysis: {
    title: 'Analisi',
    summary: 'Che cosa mostra questa rete',
    central: 'Più connessi',
    loops: 'Circuiti di retroazione',
    leverage: 'Dove il cambiamento potrebbe propagarsi di più',
    paths: 'Traccia un percorso',
    whatIf: 'E se…',
    empty: 'Aggiungi nodi e collegamenti per vedere un’analisi.',

    stats: '{nodes} nodi · {edges} collegamenti · densità {density}',

    scopeAll: 'Tutti i collegamenti',
    scopeUnhelpful: 'Disadattivi',
    scopeHelpful: 'Adattivi',
    centralNote:
      'La forza conta quanta influenza entra ed esce. È la misura di centralità con più supporto per la scelta dei bersagli di trattamento, ma un nodo centrale non è automaticamente quello giusto su cui intervenire.',
    scopeUnhelpfulNote:
      'Conta solo le frecce che hai contrassegnato come «non aiuta». Un punteggio alto qui indica un processo che tiene insieme il problema.',
    scopeHelpfulNote:
      'Conta solo le frecce che hai contrassegnato come «aiuta». Un punteggio alto qui è qualcosa su cui la persona può già contare: spesso vale la pena costruirci sopra invece di aggiungere qualcosa di nuovo.',
    excludedNote_one:
      '{count} collegamento non valutato è escluso da entrambe le suddivisioni, quindi la loro somma non corrisponderà ai valori complessivi.',
    excludedNote_other:
      '{count} collegamenti non valutati sono esclusi da entrambe le suddivisioni, quindi la loro somma non corrisponderà ai valori complessivi.',
    noneMarkedHelpful:
      'Non c’è ancora nulla contrassegnato come «aiuta». Apri un collegamento e indica se aiuta per riempire questa parte.',
    noneMarkedUnhelpful:
      'Non c’è ancora nulla contrassegnato come «non aiuta». Apri un collegamento e indica se aiuta per riempire questa parte.',

    colNode: 'Nodo',
    colIn: 'Entrata',
    colOut: 'Uscita',
    colStrength: 'Forza',
    colNetOutward: 'Saldo in uscita',
    chipEntryPoint: 'punto di ingresso',
    chipEndpoint: 'punto di arrivo',
    chipUnconnected: 'non collegato',
    chipNothingHelping: 'niente che aiuta',
    chipNothingUnhelpful: 'niente di disadattivo',

    reinforcing: 'Rinforzanti',
    balancing: 'Bilancianti',
    reinforcingHelp:
      'Auto-sostenente. Un aumento in un punto qualsiasi del circuito torna indietro come ulteriore aumento: è per questo che il problema continua anche dopo che il fattore scatenante è passato.',
    balancingHelp:
      'Auto-correttivo. Qualcosa in questo circuito spinge in senso contrario, il che di solito significa un freno naturale.',
    noLoops: 'Nessun circuito trovato.',
    manyLoops: 'Questa rete ha molti circuiti. Sono elencati solo i più forti.',
    loopSteps_one: '{count} passaggio, guadagno {gain}',
    loopSteps_other: '{count} passaggi, guadagno {gain}',

    heuristicWarning:
      'Questi numeri descrivono la mappa che hai disegnato, non la persona. Presuppongono che l’influenza sia lineare e immediata, cosa che non è. Servono per ragionare, mai come previsione.',
    colIfReduced: 'Se questo si riducesse',
    colBenefit: 'Beneficio modellizzato',
    colReach: 'Portata',
    wouldAlsoSuppress: 'Ridurrebbe anche {labels}',
    chipNoDampening: 'nessuno smorzamento',

    from: 'Da',
    to: 'A',
    choose: 'Scegli…',
    noRoute: 'Nessun percorso dall’uno all’altro.',
    routeStats_one: '{count} percorso · {up} in aumento · {down} in diminuzione · saldo {net}',
    routeStats_other: '{count} percorsi · {up} in aumento · {down} in diminuzione · saldo {net}',
    pathSteps_one: '{count} passaggio, effetto {effect}',
    pathSteps_other: '{count} passaggi, effetto {effect}',
    increases: 'aumenta',
    decreases: 'riduce',

    colNow: 'Ora',
    colWithThis: 'Con questo',
    rowReinforcing: 'Circuiti rinforzanti',
    rowBalancing: 'Circuiti bilancianti',
    rowAmplification: 'Amplificazione modellizzata',
    newBrakes: 'Nuovi freni sul sistema',
    badgeNewBalancing: 'nuovo bilanciante',
    howItActs: 'Come agisce a ogni ciclo',
    mechSelfCorrecting: 'auto-correttivo',
    mechSteadyPressure: 'pressione costante',
    mechPushedHarder: 'spinta più forte',
    mechUntouched: 'non toccato',
    pressureOn: 'su {labels} · va mantenuta',
    holdsOnItsOwn: 'si regge da solo',
  },

  summary: {
    noNodes: 'Aggiungi qualche nodo per vedere un’analisi.',
    noEdges:
      'Non c’è ancora nulla di collegato. Aggiungi collegamenti per vedere come le parti si influenzano a vicenda.',
    mostConnected_one:
      '**{label}** è la parte più connessa di questa rete ({inDegree} influenza in entrata, {outDegree} in uscita). I nodi centrali sono spesso il punto da cui il cambiamento si propaga più lontano, anche se possono essere i più difficili da spostare direttamente.',
    mostConnected_other:
      '**{label}** è la parte più connessa di questa rete ({inDegree} influenze in entrata, {outDegree} in uscita). I nodi centrali sono spesso il punto da cui il cambiamento si propaga più lontano, anche se possono essere i più difficili da spostare direttamente.',
    reinforcing_one:
      'Qui c’è **{count} circuito rinforzante**. Sono cicli che si auto-sostengono: continuano anche dopo che ciò che li ha avviati è passato.',
    reinforcing_other:
      'Qui ci sono **{count} circuiti rinforzanti**. Sono cicli che si auto-sostengono: continuano anche dopo che ciò che li ha avviati è passato.',
    tightestLoop: ' Il più stretto è {path}.',
    noReinforcing:
      'Non è stato trovato nessun circuito rinforzante. Vale la pena chiedersi se qui qualcosa si alimenti da sé, perché è spesso la retroazione a rendere persistente un problema.',
    balancing_one:
      'Trovato {count} circuito bilanciante. Si auto-correggono e spesso segnalano dove la persona ha già un freno naturale sul problema.',
    balancing_other:
      'Trovati {count} circuiti bilancianti. Si auto-correggono e spesso segnalano dove la persona ha già un freno naturale sul problema.',
    sources_one:
      '{labels} influenza gli altri, ma nulla nella rete lo influenza a sua volta. Punti di ingresso come questo sono a volte il posto più praticabile da cui partire.',
    sources_other:
      '{labels} influenzano gli altri, ma nulla nella rete li influenza a sua volta. Punti di ingresso come questi sono a volte il posto più praticabile da cui partire.',
    leverage_one:
      'Ridurre **{label}** ha l’effetto modellizzato più ampio e raggiunge {reach} altro nodo.',
    leverage_other:
      'Ridurre **{label}** ha l’effetto modellizzato più ampio e raggiunge {reach} altri nodi.',
    leverageCaveat_one:
      ' Nota però che ridurrebbe anche {labels}, che è legato a collegamenti che hai contrassegnato come utili.',
    leverageCaveat_other:
      ' Nota però che ridurrebbe anche {labels}, che sono legati a collegamenti che hai contrassegnato come utili.',
    isolated_one: '{labels} non è ancora collegato a nulla.',
    isolated_other: '{labels} non sono ancora collegati a nulla.',
    diverges:
      'Alcune parti di questa rete, una volta modellizzate, si amplificano senza limite: di solito significa circuiti rinforzanti forti e senza smorzamento. Considera i valori di leva solo come indicativi.',
    caveat:
      '_Questi numeri descrivono la mappa che hai disegnato, non la persona. Sono un modo strutturato di guardare al tuo stesso ragionamento, non una previsione di ciò che accadrà._',
  },

  guided: {
    ariaLabel: 'Costruzione guidata',
    stepOf: 'Passo {current} di {total}',
    done: 'Fatto. Vai avanti quando vuoi.',
    footer:
      'Puoi uscire dalla guida in qualsiasi momento e conservare tutto ciò che hai costruito. I passi sono un’impalcatura, non un modulo da compilare.',
    step1Title: '1. Parti dal contesto',
    step1Body:
      'Usa il pulsante Evento / contesto e aggiungi la situazione di cui si tratta: che cosa è successo, dove, con chi. Ottiene un riquadro con angoli arrotondati, perché non è qualcosa che la persona sta facendo.\n\nPartire da qui non è una formalità. In una valutazione funzionale lo stesso pensiero o la stessa azione significano cose diverse in situazioni diverse: è il contesto a rendere interpretabile tutto ciò che viene dopo.',
    step1Nudge: 'Aggiungi un riquadro evento o contesto per iniziare.',
    step2Title: '2. Aggiungi la risposta e ciò che segue',
    step2Body:
      'Ora aggiungi ciò che succede dentro (un pensiero, un’emozione o un impulso) e ciò che la persona fa o ciò che ne risulta. Collegali in ordine, a partire dal contesto.\n\nQuesta è la contingenza a tre termini, l’unità su cui si costruisce una valutazione funzionale. Tutto il resto cresce da lì.',
    step2NudgeNodes: 'Aggiungi altri due riquadri: la risposta interna, poi ciò che succede.',
    step2NudgeEdges: 'Ora collegali: contesto → risposta interna → ciò che succede.',
    step3Title: '3. Controlla se torna indietro',
    step3Body:
      'Guarda la fine della tua catena e chiediti: alimenta qualcosa che viene prima? Dormire male provoca preoccupazione, ma la preoccupazione provoca anche il dormire male.\n\nLa retroazione è di solito la risposta al perché un problema persiste a lungo dopo che ciò che lo ha avviato è sparito.',
    step3Nudge: 'Non torna ancora indietro nulla. La conseguenza alimenta qualcosa che viene prima?',
    step4Title: '4. Aggiungi che cos’altro è coinvolto',
    step4Body:
      'Che cos’altro è preso dentro tutto questo? Aggiungi un nodo per qualsiasi cosa sia influenzata dalla conseguenza e che a sua volta alimenti la risposta.\n\nQui contano gli amplificatori. La stanchezza non è solo un altro problema: fa sembrare più minaccioso tutto il resto.',
    step4Nudge: 'Aggiungi almeno un altro elemento.',
    step5Title: '5. Aggiungi ciò che aiuta',
    step5Body:
      'Non tutto peggiora le cose. Aggiungi qualcosa che riduca uno di questi problemi, disegnalo come collegamento in diminuzione e contrassegna quel collegamento come Aiuta.\n\nÈ spesso la parte che si salta, ed è dove di solito si trova l’intervento.',
    step5NudgeDecrease:
      'Aggiungi qualcosa che riduca uno di questi, disegnato come collegamento in diminuzione.',
    step5NudgeHelpful:
      'Contrassegna quel collegamento come Aiuta, così la mappa mostra ciò che funziona.',
    step6Title: '6. Mappa ciò che ostacola',
    step6Body:
      'Ora la parte difficile. Che cosa impedisce a ciò che aiuta di accadere?\n\nÈ per questo che «basta che ti muovi di più» cade così male. La persona sa già che aiuterebbe. Qualcosa nel sistema lo sta sopprimendo e, finché non è visibile, il consiglio non ha dove andare.',
    step6Nudge: 'Aggiungi un collegamento che sopprime ciò che aiuta.',
  },

  snapshots: {
    intro:
      'Salva la rete così com’è ora, poi torna e disegnala di nuovo più avanti. Non viene sovrascritto nulla.',
    labelPlaceholder: 'Etichetta, es. Primo colloquio o Seduta 6',
    labelAria: 'Etichetta per questa rilevazione',
    saveButton: 'Salva rilevazione',
    none: 'Nessuna rilevazione salvata.',
    meta: '{when} · {nodes} nodi · {edges} collegamenti',
    deleteAria: 'Elimina la rilevazione {label}',
    compare: 'Confronta',
    earlier: 'Prima',
    later: 'Dopo',
    changes_one: '{count} differenza',
    changes_other: '{count} differenze',
    downloadComparison: 'Scarica il confronto (CSV)',
  },

  structure: {
    empty: 'Qui non c’è ancora nulla. Aggiungi un nodo per iniziare.',
    nodes: 'Nodi ({count})',
    connections: 'Collegamenti ({count})',
    noConnections: 'Ancora nessuno.',
    nodeMetaDistress: ' · disagio {value}',
    nodeMetaFrequency: ' · frequenza {value}',
    deleteNodeAria: 'Elimina il nodo {label}',
    deleteEdgeAria: 'Elimina il collegamento {sentence}',
  },

  templates: {
    intro:
      'Punti di partenza, non formulazioni. Sostituisci le etichette con le parole della persona ed elimina ciò che non calza. Un modello che non viene messo in discussione è peggio di un foglio bianco.',
    blankName: 'Foglio bianco',
    blankDescription: 'Parti da zero.',
    abcName: 'Contingenza a tre termini',
    abcDescription:
      'L’impalcatura di partenza: contesto, risposta interna, conseguenza. Da qui si costruisce verso l’esterno.',
    worryName: 'Ciclo preoccupazione-sonno',
    worryDescription:
      'Un esempio svolto. Utile per mostrare che aspetto ha un circuito rinforzante.',
    moodName: 'Umore basso e ritiro',
    moodDescription:
      'Uno schema classico da attivazione comportamentale. Riscrivilo con le parole della persona prima di usarlo.',
    painName: 'Dolore cronico ed evitamento',
    painDescription:
      'Uno schema paura-evitamento, con il circuito di decondizionamento che di solito lo mantiene.',
  },

  templateNodes: {
    abcTrigger: 'Fattore scatenante o situazione',
    abcThought: 'Pensiero o emozione',
    abcAction: 'Che cosa faccio',

    worryCriticism: 'Critiche al lavoro',
    worryJobSecurity: 'Preoccupazione per il posto di lavoro',
    worrySleep: 'Difficoltà a dormire',
    worryFatigue: 'Stanchezza',
    worryExercise: 'Attività fisica',
    worryWithdrawal: 'Ritiro sociale',

    moodLow: 'Umore basso',
    moodStayingHome: 'Restare a casa',
    moodFewerThings: 'Meno cose che contano per me',
    moodBurden: 'Sono un peso',
    moodContact: 'Contatti con gli amici',
    moodNoticing: 'Notare i piccoli momenti belli',

    painPain: 'Dolore',
    painFear: 'Paura di peggiorare le cose',
    painAvoiding: 'Evitare l’attività',
    painDeconditioning: 'Decondizionamento',
    painDoingAnyway: 'Fare comunque ciò che conta',
    painWillingness: 'Disponibilità a provare il disagio',
  },

  templateNote:
    'Questo è un punto di partenza, non una formulazione. Sostituisci le etichette con le parole della persona.',

  exportDialog: {
    intro:
      'I formati CSV si caricano direttamente in R o Python. La matrice di adiacenza è ciò che qgraph, igraph e networkx si aspettano in ingresso.',
    json: 'Rete (JSON)',
    edges: 'Lista degli archi (CSV)',
    nodes: 'Lista dei nodi (CSV)',
    matrix: 'Matrice di adiacenza (CSV)',
    report: 'Report di analisi (Markdown)',
    events: 'Registro di costruzione (CSV)',
    png: 'Immagine (PNG)',
    svg: 'Vettoriale (SVG)',
    print: 'Stampa / PDF',
  },

  share: {
    title: 'Link di condivisione',
    intro:
      'L’intera rete è codificata nel link stesso. Non esiste alcuna copia sul server e la parte che contiene i tuoi contenuti non viene mai inviata nella richiesta web, quindi non viene memorizzata né registrata da nessuna parte. Chiunque abbia il link può aprirne e modificarne una copia propria.',
    building: 'Creazione del link…',
    tooLong:
      'Questa rete è troppo grande per un link ({length} caratteri). Esportala come JSON e invia il file.',
  },

  clearDialog: {
    title: 'Svuotare questa rete?',
    body: 'Questo rimuove tutti i {nodes} nodi e i {edges} collegamenti. Puoi annullare l’operazione e le rilevazioni salvate vengono mantenute.',
    confirm: 'Svuota tutto',
  },

  kernel: {
    title: 'Nuclei di trattamento',
    warning: 'In sviluppo. Dietro questo pulsante non c’è ancora nulla.',
    p1: 'Il piano è un vocabolario di nuclei di trattamento: le unità minime di cambiamento terapeutico, in un linguaggio abbastanza coerente da poterle agganciare ai processi di una mappa. Scegli un processo e vedi quali nuclei sono noti per agire su di esso.',
    p2: 'La parte difficile è decidere che cosa conti come un singolo nucleo e quanto finemente suddividerli, e la questione non è ancora risolta.',
    p3: 'Se hai idee su come organizzare questo database, Kean è interessato a sentirle:',
  },

  help: {
    title: 'Come si usa',
    buildingHeading: 'Costruire una mappa',
    buildingEvent:
      'la situazione di cui si tratta. Parti da qui; su un’area vuota qualsiasi clic ne crea uno. Ottiene un riquadro con angoli arrotondati, perché non è qualcosa che la persona sta facendo.',
    buildingAdd:
      'un processo: un pensiero, un’emozione, un impulso o un’azione. Riquadro squadrato, colorato in base alla sua categoria EEMM.',
    buildingConnect:
      'fai clic sul riquadro che influenza, poi su quello influenzato. Poi scegli, con un solo clic, se lo aumenta o lo riduce e di quanto.',
    buildingDelete:
      'fai clic su un riquadro o su una freccia qualsiasi. Oppure seleziona qualcosa e premi Canc.',
    buildingDoubleClick:
      'Fai doppio clic su un riquadro per modificarlo. Trascina per spostarlo, in qualsiasi modalità.',

    readingHeading: 'Leggere il disegno',
    readingArrowheads:
      'Una punta di freccia **piena** significa che aumenta; una **vuota** che riduce. Linee più spesse con punte più grandi indicano influenze più forti. Nessun numero e nessuna dipendenza dal colore.',
    readingReciprocal:
      'Una linea con una punta a entrambe le estremità significa che i due si influenzano a vicenda.',
    readingShapes: 'I riquadri squadrati sono processi; quelli arrotondati sono eventi o contesti.',
    readingColour:
      'Le frecce sono nere, a meno che tu non abbia contrassegnato un collegamento come utile (verde) o non utile (rosso). La maggior parte dei collegamenti resta nera: il contrassegno serve per quando stai verificando se qualcosa di nuovo rompe un circuito.',
    readingColourMode:
      'Il pulsante Su/giù cambia il colore delle frecce per mostrare invece gli aumenti (blu) e le diminuzioni (arancione), per quando è la direzione dell’influenza che ti interessa leggere.',

    keyboardHeading: 'Tastiera',
    keyboardTools: 'seleziona · evento/contesto · aggiungi nodo · collega · elimina',
    keyboardConnectFromSelection:
      'Seleziona un riquadro, premi C e il clic successivo completa il collegamento.',
    keyboardDelete: 'Canc o Backspace rimuovono ciò che è selezionato.',
    keyboardEscape: 'Esc annulla ciò che stai facendo. Premilo di nuovo per tornare a Seleziona.',
    keyboardView: 'F adatta la vista · O organizza · M punteggi · G griglia',
    keyboardEditing:
      'Ctrl/Cmd+Z annulla · Shift+clic per selezionare più elementi · Ctrl/Cmd+C e Ctrl/Cmd+V copia e incolla · Ctrl/Cmd+D duplica',

    organiseHeading: 'Organizza',
    organiseBody:
      'Allinea i riquadri in righe e colonne che seguono le frecce, con il contesto principale sul bordo iniziale. Prova la disposizione sia in orizzontale sia in verticale e tiene quella che si adatta meglio al tuo schermo. I circuiti di retroazione vengono ignorati nel decidere l’ordine, così si leggono come circuiti invece di scombinare la sequenza.',

    mouselessHeading: 'Senza mouse',
    mouselessBody:
      'La vista elenco mostra l’intera mappa come testo che puoi percorrere con Tab e modificare da tastiera. È anche ciò che legge uno screen reader, dato che un’area di disegno per lui è invisibile.',
    openListView: 'Apri la vista elenco',

    cautionHeading: 'Un’avvertenza sull’analisi',
    cautionBody:
      'Centralità, circuiti e leve descrivono la mappa che è stata disegnata, non la persona. Presuppongono che l’influenza sia lineare e immediata, cosa che non è. Sono un modo strutturato di interrogare il tuo stesso ragionamento e valgono esattamente quanto i punteggi da cui sono stati costruiti.',
  },

  about: {
    title: 'Informazioni',
    intro:
      'Uno strumento libero e open source per mappare le reti basate sui processi: le relazioni funzionali tra i processi che mantengono la sofferenza e il benessere psicologici.',
    groundingHeading: 'Fondamenti',
    groundingBody:
      'Le categorie e il modo in cui questo strumento pensa ai processi vengono dal Meta-Modello Evoluzionistico Esteso (EEMM) delineato nel lavoro sulla terapia basata sui processi di **Steven C. Hayes e Stefan G. Hofmann**: affettività, cognizione, attenzione, sé, motivazione e comportamento manifesto, situati nei livelli biofisiologico e socioculturale, e sempre letti nel contesto.',
    inspiration: 'L’idea di farlo in un browser si ispira allo strumento di Joseph Ciarrochi,',
    madeByHeading: 'Chi lo ha realizzato',
    madeByBody:
      'Tan Kean Sian ha ideato questo strumento e ne ha diretto lo sviluppo; tutto il codice è stato scritto con Claude, l’assistente AI di Anthropic. Domande, o suggerimenti per migliorarlo, sono benvenuti a',
    dataHeading: 'Dove stanno i tuoi dati',
    dataBody:
      'Nel tuo browser, e da nessun’altra parte. Nessun account, nessun server, nessuna analisi del traffico. Se cancelli i dati del browser le tue mappe spariscono, quindi esporta ciò che vuoi conservare. I link di condivisione portano la mappa dentro il link stesso, senza caricarla da nessuna parte.',
    licence: 'Licenza MIT. I contributi sono benvenuti.',
  },

  error: {
    canvasTitle: 'Non è stato possibile avviare l’area di disegno',
    canvasHint:
      'Di solito significa che l’accelerazione grafica non è disponibile su questa macchina. La tua rete è al sicuro. Apri la vista elenco per leggerla e modificarla come testo, ed Esporta per portarla fuori.',
    technicalDetail: 'Dettagli tecnici',
  },

  toast: {
    copied_one: 'Copiato {count} riquadro. Ctrl/Cmd+V per incollare.',
    copied_other: 'Copiati {count} riquadri. Ctrl/Cmd+V per incollare.',
    pasted_one: 'Incollato {count} riquadro.',
    pasted_other: 'Incollati {count} riquadri.',
    duplicated_one: 'Duplicato {count} riquadro.',
    duplicated_other: 'Duplicati {count} riquadri.',
    hypothesisOn: 'Ipotesi attiva. Tutto ciò che aggiungi ora è una proposta, disegnata tratteggiata.',
    sharedOpened: 'È stata aperta una rete condivisa. Non ha sovrascritto il lavoro che avevi salvato.',
    imported: 'Importato.',
    importUnreadable: 'Non è stato possibile leggere quel file.',
    importNotJson: 'Quel file non è JSON valido.',
  },

  language: {
    title: 'Lingua',
    note: 'Le traduzioni sono contributi della comunità e sono in revisione. In particolare il vocabolario clinico potrebbe non essere ancora consolidato in tutte le lingue.',
    contribute: 'Hai notato un errore di traduzione? Le correzioni sono molto gradite a',
    draft: 'bozza',
  },

  a11y: {
    canvas:
      'Area di disegno della rete. Una versione accessibile da tastiera degli stessi contenuti si trova nella vista elenco.',
    toolbar: 'Strumenti',
    scopeTabs: 'Quali collegamenti contare',
  },
};
