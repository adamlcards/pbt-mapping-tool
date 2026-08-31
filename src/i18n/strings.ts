/**
 * Every piece of user-facing text in the tool, in English.
 *
 * This is the source of truth for translation. A locale is this object with the
 * values replaced; the keys never change. Nothing outside this file should
 * contain a sentence a user reads — if you find yourself typing prose into a
 * component, it belongs here first.
 *
 * **On placeholders.** `{name}` marks a value substituted at runtime by `fmt`.
 * Translators must keep every placeholder that appears in the English, spelled
 * identically, but are free to move them: word order differs between languages
 * and a translation that preserves English order is usually the wrong one.
 *
 * **On plurals.** Where a count changes the wording, the English gives both
 * forms as separate keys (`…_one` / `…_other`) rather than embedding a bare
 * `s`. Languages with three or more plural classes are handled by translating
 * the two we have as best fits and flagging it in the proofreading document —
 * a full CLDR plural engine is not worth the weight for a tool this size, and
 * getting Polish and Russian exactly right matters less than getting the
 * clinical vocabulary right.
 *
 * **On the clinical vocabulary.** The EEMM category names, the strength levels
 * and the helping/not-helping distinction are technical terms from
 * process-based therapy, not ordinary words. Where an established translation
 * exists in that language's PBT/ACT literature, it wins over a literal one.
 * This is the part of the file that most needs a specialist proofreader.
 *
 * No i18n library, deliberately. A locale is a plain object; adding one means
 * copying this file, translating the values, and registering it in `locales.ts`.
 */

export const en = {
  meta: {
    /** BCP-47 code. Not translated. */
    code: 'en',
    /** The language's name in English, for the picker's secondary line. */
    name: 'English',
    /** The language's name in itself. This is what the picker shows. */
    nativeName: 'English',
    /** 'ltr' or 'rtl'. Not translated — set it correctly for the language. */
    dir: 'ltr',
  },

  app: {
    name: 'Process-Based Network Mapping Tool',
    short: 'PBT Mapping Tool',
    networkTitleLabel: 'Network title',
    untitledNetwork: 'Untitled network',
  },

  /** The four drawing modes, on the centre of the toolbar. */
  tool: {
    select: 'Select',
    add: 'Add node',
    connect: 'Connect',
    delete: 'Delete',
    event: 'Event / context',
  },
  /** The line under the toolbar that says what the current mode does. */
  toolHint: {
    select: 'Click to select and see what it connects to. Drag to move.',
    add: 'Click anywhere on the canvas to add a node.',
    connect: 'Click the influencing node, then the one it influences.',
    delete: 'Click a node or connection to remove it.',
    start: 'Start with the event or situation this is about. Click anywhere.',
    focused: 'Focused on part of the network.',
    showEverything: 'Show everything again',
    pendingSource: 'Source: {label}. Now click the node it influences.',
  },

  /** Button labels. Short: these sit in a crowded toolbar. */
  action: {
    undo: 'Undo',
    redo: 'Redo',
    fit: 'Fit view',
    organise: 'Organise',
    clear: 'Clear',
    grid: 'Grid',
    ratings: 'Ratings',
    colourByValence: 'Helping',
    colourByDirection: 'Up/down',
    hypothesis: 'Hypothesis',
    kernel: 'Kernel',
    analyse: 'Analysis',
    snapshots: 'Timepoints',
    import: 'Import',
    export: 'Export',
    share: 'Share link',
    help: 'Help',
    about: 'About',
    themeLight: 'Light',
    themeDark: 'Dark',
    templates: 'Templates',
    guided: 'Guided build',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    update: 'Update',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    restore: 'Restore',
    tryAgain: 'Try again',
    copy: 'Copy link',
    copied: 'Copied',
    language: 'Language',
  },

  /** Hover tooltips. These are where the keyboard shortcuts get learned. */
  tooltip: {
    undo: 'Undo (Ctrl/Cmd+Z)',
    redo: 'Redo (Ctrl/Cmd+Y)',
    fit: 'Fit everything on screen (F)',
    organise: 'Snap the boxes into rows and columns that follow the arrows (O)',
    clear: 'Remove everything',
    grid: 'Show a grid and snap boxes to it (G)',
    ratings: 'Print severity (S) and frequency (F) ratings on each box (M)',
    colourIsDirection:
      'Arrow colour currently shows increases (blue) and decreases (orange). Click to colour by whether the link helps instead.',
    colourIsValence:
      'Arrow colour currently shows whether a link helps. Click to colour by increases and decreases instead.',
    addEvent: 'Add an event or context',
    addProcess: 'Add a process',
    hypothesis: 'Add something you are considering and see what it would change (H)',
    kernel: 'Treatment kernels (in development)',
    analyse: 'Centrality, feedback loops, pathways and leverage',
    snapshots: 'Save this map as a timepoint and compare later',
    import: 'Load a saved file',
    export: 'Save as image, PDF, JSON or CSV',
    share: 'Get a link to this map',
    help: 'How to use this',
    templates: 'Start from an example',
    guided: 'Step-by-step build',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    language: 'Change the language of the interface',
    /** Appended to each tool button, e.g. "Select (S)". */
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, or Delete/Backspace to remove what is selected',
    closePanel: 'Close panel',
    closeDialog: 'Close dialog',
    closeGuide: 'Close guide',
  },

  /** The badge in the top right that says where the data is. */
  privacy: {
    localOnly: 'Everything stays on this device',
    localOnlyLong:
      'Your map is saved in this browser and is never sent anywhere. Closing the tab is safe. Clearing your browser data will remove it, so export anything you want to keep.',
    studyMode: 'Study mode',
    studyModeLong:
      'You are taking part in a research study. Your map and the order you built it in are saved to the study server.',
    autosaveUnavailable: 'Autosave unavailable — export to keep your work',
    autosaveUnavailableLong:
      'This browser is not letting the page save anything, which usually happens when an HTML file is opened directly from disk, or in a private window. Your work is still private, but it will be lost when you close the tab. Use Export to keep it.',
  },

  /** Side panel headings. */
  panel: {
    analysis: 'Analysis',
    snapshots: 'Timepoints',
    listView: 'List view',
  },

  /** The dialog for creating and editing a box. */
  nodeEditor: {
    newEvent: 'New event or context',
    newNode: 'New node',
    edit: 'Edit node',
    name: 'Name',
    namePlaceholder: "In the person's own words",
    category: 'Category',
    ratingsDisclosure: 'Ratings and notes (optional)',
    ratingsNote:
      'Used in research protocols to compare networks across people and across time. Not needed for everyday clinical mapping.',
    severity: 'How distressing (0–10)',
    frequency: 'How often (0–10)',
    notes: 'Notes',
    notRated: 'Not rated',
    /**
     * The one-letter tags printed on the box when ratings are shown, as in
     * "S 8 · F 5". Abbreviations of the two rating names, so they should be the
     * initial of whatever those are called in your language — not kept as S/F.
     * One character if the script allows it; two at most, or the box grows.
     */
    severityShort: 'S',
    frequencyShort: 'F',
    rate: 'Rate',
    clearRating: 'Clear',
  },

  /** The dialog for creating and editing an arrow. */
  edgeEditor: {
    title: 'How does this affect that?',
    /** Read back as a sentence, which is what stops arrows being drawn backwards. */
    sentenceIncreases: '{source} increases {target}',
    sentenceDecreases: '{source} decreases {target}',
    increasesIt: 'Increases it',
    decreasesIt: 'Decreases it',
    altDirection: 'These two also influence each other the other way.',
    editAlt: 'Edit {source} → {target}',
    removeLink: 'Remove link',
    addLink: 'Add link',
    helpingDisclosure: 'Is this link helping?',
    helpingNote:
      'No process is helpful or harmful on its own; it depends what it connects to, which is why this is asked here and not when you name the box. Marking links is what lets the Analysis panel say which change would help rather than only which change would spread furthest. Leave it alone if you are not using that.',
  },

  /**
   * EEMM category names and the one-line explanation shown under the picker.
   * `prefix` is printed in bold on the box itself, so it must stay short.
   * These are technical terms — follow the published PBT translation if there
   * is one in your language.
   */
  category: {
    uncategorised: {
      label: 'Uncategorised',
      prefix: '',
      hint: 'Not yet classified. Fine to leave while you are still thinking.',
    },
    affect: {
      label: 'Affect',
      prefix: 'Affect',
      hint: 'Emotions and feelings. Avoiding them, or being willing to have them.',
    },
    cognition: {
      label: 'Cognition',
      prefix: 'Cognition',
      hint: 'Thoughts, beliefs, rules, rumination, defusion.',
    },
    attention: {
      label: 'Attention',
      prefix: 'Attention',
      hint: 'What is being noticed, and what is not. Flexible or narrow focus.',
    },
    self: {
      label: 'Self',
      prefix: 'Self',
      hint: 'Self-concept, identity, self-criticism, self-as-context.',
    },
    motivation: {
      label: 'Motivation',
      prefix: 'Motivation',
      hint: 'Values, goals, what the person is moving toward or away from.',
    },
    overtBehaviour: {
      label: 'Overt behaviour',
      prefix: 'Overt behaviour',
      hint: 'Observable action. What the person actually does.',
    },
    biophysiological: {
      label: 'Biophysiological',
      prefix: 'Biophysiological',
      hint: 'Sleep, pain, illness, medication, arousal, physiology.',
    },
    sociocultural: {
      label: 'Sociocultural',
      prefix: 'Sociocultural',
      hint: 'Relationships, family, culture, social support or pressure.',
    },
    context: {
      label: 'Context / event',
      prefix: 'Event',
      hint: 'A situation or event, not something the person does. Drawn with rounded corners.',
    },
  },
  categoryGroup: {
    dimension: 'Psychological dimensions',
    level: 'Levels',
    other: 'Context and unclassified',
  },

  /** How strong an influence is. Three levels, deliberately. */
  strength: {
    1: 'A little',
    2: 'Moderately',
    3: 'A lot',
  },

  /** Whether a link is helping the person. */
  valence: {
    neutral: 'Not judged',
    helpful: 'Helping',
    unhelpful: 'Not helping',
  },

  /** Recording what happened when something was tried. */
  trial: {
    proposed: 'Being considered',
    adopted: 'Tried, and it helped',
    ruledOut: 'Tried, it did not help',
    proposedHint:
      'Still an idea. Drawn dashed, and left out of the baseline the comparison measures against.',
    adoptedHint: 'It worked. It becomes part of the map and is drawn like everything else.',
    ruledOutHint: 'It did not work. Kept but faded, so you can see what has already been tried.',
    dialogTitle: 'What happened with this?',
    legend: 'Where has this got to?',
    lastRecorded: 'Last recorded {when}',
    notATrial: 'Not a trial at all — make it an ordinary part of the map',
  },

  /** The Analysis panel. */
  analysis: {
    title: 'Analysis',
    summary: 'What this network shows',
    central: 'Most connected',
    loops: 'Feedback loops',
    leverage: 'Where change might spread furthest',
    paths: 'Trace a pathway',
    whatIf: 'What if',
    empty: 'Add nodes and connections to see an analysis.',

    /** The line of counts at the top of the summary. */
    stats: '{nodes} nodes · {edges} connections · density {density}',

    /** Sub-tabs inside "Most connected". */
    scopeAll: 'All connections',
    scopeUnhelpful: 'Maladaptive',
    scopeHelpful: 'Adaptive',
    centralNote:
      'Strength counts how much influence flows in and out. It is the centrality measure with the most support for picking treatment targets, but a central node is not automatically the right one to push on.',
    scopeUnhelpfulNote:
      'Counting only the arrows you marked as not helping. A high score here is a process holding the problem together.',
    scopeHelpfulNote:
      'Counting only the arrows you marked as helping. A high score here is something the person already has going for them — often worth building on rather than adding something new.',
    excludedNote_one:
      '{count} unjudged connection is excluded from both splits, so they will not add up to the combined figures.',
    excludedNote_other:
      '{count} unjudged connections are excluded from both splits, so they will not add up to the combined figures.',
    noneMarkedHelpful: 'Nothing is marked as helping yet. Open a connection and set whether it helps to fill this in.',
    noneMarkedUnhelpful:
      'Nothing is marked as not helping yet. Open a connection and set whether it helps to fill this in.',

    colNode: 'Node',
    colIn: 'In',
    colOut: 'Out',
    colStrength: 'Strength',
    colNetOutward: 'Net outward',
    chipEntryPoint: 'entry point',
    chipEndpoint: 'endpoint',
    chipUnconnected: 'unconnected',
    chipNothingHelping: 'nothing helping',
    chipNothingUnhelpful: 'nothing unhelpful',

    reinforcing: 'Reinforcing',
    balancing: 'Balancing',
    reinforcingHelp:
      'Self-sustaining. An increase anywhere in the loop comes back around as a further increase, which is why the problem keeps going after the trigger has passed.',
    balancingHelp: 'Self-correcting. Something in this loop pushes back, which usually means a natural brake.',
    noLoops: 'No loops found.',
    manyLoops: 'This network has many loops. Only the strongest are listed.',
    loopSteps_one: '{count} step, gain {gain}',
    loopSteps_other: '{count} steps, gain {gain}',

    heuristicWarning:
      'These figures describe the map you drew, not the person. They assume influence is linear and immediate, which it is not. Use them to think with, never as a prediction.',
    colIfReduced: 'If this were reduced',
    colBenefit: 'Modelled benefit',
    colReach: 'Reach',
    wouldAlsoSuppress: 'Would also suppress {labels}',
    chipNoDampening: 'no dampening',

    from: 'From',
    to: 'To',
    choose: 'Choose…',
    noRoute: 'No route from one to the other.',
    routeStats_one: '{count} route · {up} increasing · {down} decreasing · net {net}',
    routeStats_other: '{count} routes · {up} increasing · {down} decreasing · net {net}',
    pathSteps_one: '{count} step, effect {effect}',
    pathSteps_other: '{count} steps, effect {effect}',
    increases: 'increases',
    decreases: 'decreases',

    colNow: 'Now',
    colWithThis: 'With this',
    rowReinforcing: 'Reinforcing loops',
    rowBalancing: 'Balancing loops',
    rowAmplification: 'Modelled amplification',
    newBrakes: 'New brakes on the system',
    badgeNewBalancing: 'new balancing',
    howItActs: 'How it acts on each cycle',
    mechSelfCorrecting: 'self-correcting',
    mechSteadyPressure: 'steady pressure',
    mechPushedHarder: 'pushed harder',
    mechUntouched: 'untouched',
    pressureOn: 'on {labels} · needs keeping up',
    holdsOnItsOwn: 'holds on its own',
  },

  /**
   * The written summary of the network. Each of these is a whole sentence
   * assembled at runtime, so the placeholders carry real values.
   */
  summary: {
    noNodes: 'Add some nodes to see an analysis.',
    noEdges: 'Nothing is connected yet. Add connections to see how the parts influence each other.',
    mostConnected_one:
      '**{label}** is the most connected part of this network ({inDegree} influence coming in, {outDegree} going out). Central nodes are often where change spreads furthest, though they can also be the hardest to shift directly.',
    mostConnected_other:
      '**{label}** is the most connected part of this network ({inDegree} influences coming in, {outDegree} going out). Central nodes are often where change spreads furthest, though they can also be the hardest to shift directly.',
    reinforcing_one:
      'There is **{count} reinforcing loop** here. These are self-sustaining cycles: they keep going even after whatever started them has passed.',
    reinforcing_other:
      'There are **{count} reinforcing loops** here. These are self-sustaining cycles: they keep going even after whatever started them has passed.',
    tightestLoop: ' The tightest is {path}.',
    noReinforcing:
      'No reinforcing loops were found. Worth asking whether anything here feeds back on itself, because feedback is often what makes a problem persist.',
    balancing_one:
      '{count} balancing loop found. These are self-correcting and often mark where the person already has some natural brake on the problem.',
    balancing_other:
      '{count} balancing loops found. These are self-correcting and often mark where the person already has some natural brake on the problem.',
    sources_one:
      '{labels} influences others but nothing in the network influences it back. Entry points like this are sometimes the most tractable place to start.',
    sources_other:
      '{labels} influence others but nothing in the network influences them back. Entry points like this are sometimes the most tractable place to start.',
    leverage_one: 'Reducing **{label}** has the widest modelled effect, reaching {reach} other node.',
    leverage_other: 'Reducing **{label}** has the widest modelled effect, reaching {reach} other nodes.',
    leverageCaveat_one:
      ' Note that it would also suppress {labels}, which is tied to links you marked as helping.',
    leverageCaveat_other:
      ' Note that it would also suppress {labels}, which are tied to links you marked as helping.',
    isolated_one: '{labels} is not connected to anything yet.',
    isolated_other: '{labels} are not connected to anything yet.',
    diverges:
      'Some parts of this network amplify without limit when modelled, which usually means strong reinforcing loops with no dampening. Treat the leverage figures as indicative only.',
    caveat:
      '_These figures describe the map you drew, not the person. They are a structured way to look at your own thinking, not a prediction of what will happen._',
  },

  /** The step-by-step build guide. */
  guided: {
    ariaLabel: 'Guided build',
    stepOf: 'Step {current} of {total}',
    done: 'Done. Move on when you are ready.',
    footer:
      'You can leave the guide at any point and keep everything you have built. The steps are a scaffold, not a form to complete.',
    step1Title: '1. Start with the context',
    step1Body:
      'Use the Event / context button and add the situation this is about: what happened, where, with whom. It gets a rounded box, because it is not something the person is doing.\n\nStarting here is not a formality. In a functional assessment the same thought or action means different things in different situations, so the context is what makes everything after it interpretable.',
    step1Nudge: 'Add an event or context box to begin.',
    step2Title: '2. Add the response and what follows',
    step2Body:
      'Now add what happens inside (a thought, feeling or urge) and what the person does or what results. Connect them in order, from the context onwards.\n\nThat is the three-term contingency, the unit a functional assessment is built from. Everything else grows out of it.',
    step2NudgeNodes: 'Add two more boxes: the internal response, then what happens.',
    step2NudgeEdges: 'Now connect them: context → internal response → what happens.',
    step3Title: '3. Check whether it loops back',
    step3Body:
      'Look at the end of your chain and ask: does that feed back into anything earlier? Poor sleep causes worry, but worry also causes poor sleep.\n\nFeedback is usually the answer to why a problem persists long after whatever started it has gone.',
    step3Nudge: 'Nothing loops back yet. Does the consequence feed anything earlier?',
    step4Title: '4. Add what else is involved',
    step4Body:
      'What else is caught up in this? Add a node for anything affected by the consequence that also feeds back into the response.\n\nAmplifiers matter here. Fatigue is not just another problem, it makes everything else feel more threatening.',
    step4Nudge: 'Add at least one more element.',
    step5Title: '5. Add what helps',
    step5Body:
      'Not everything makes things worse. Add something that reduces one of these problems, draw it as a decreasing link, and mark that link as Helping.\n\nThis is often the part people skip, and it is where the intervention usually lives.',
    step5NudgeDecrease: 'Add something that reduces one of these, drawn as a decreasing link.',
    step5NudgeHelpful: 'Mark that link as Helping, so the map shows what is working.',
    step6Title: '6. Map what gets in the way',
    step6Body:
      'Now the hard part. What stops the helpful thing from happening?\n\nThis is why "just exercise more" lands so badly. The person already knows it would help. Something in the system is suppressing it, and until that is visible the advice has nowhere to go.',
    step6Nudge: 'Add a link that suppresses the thing that helps.',
  },

  /** Saving the map at a point in time, and comparing two of them. */
  snapshots: {
    intro: 'Save the network as it stands now, then come back and draw it again later. Nothing is overwritten.',
    labelPlaceholder: 'Label, e.g. Intake or Session 6',
    labelAria: 'Label for this timepoint',
    saveButton: 'Save timepoint',
    none: 'No timepoints saved yet.',
    meta: '{when} · {nodes} nodes · {edges} connections',
    deleteAria: 'Delete timepoint {label}',
    compare: 'Compare',
    earlier: 'Earlier',
    later: 'Later',
    changes_one: '{count} change',
    changes_other: '{count} changes',
    downloadComparison: 'Download comparison (CSV)',
  },

  /** The keyboard-accessible list of everything on the map. */
  structure: {
    empty: 'Nothing here yet. Add a node to begin.',
    nodes: 'Nodes ({count})',
    connections: 'Connections ({count})',
    noConnections: 'None yet.',
    nodeMetaDistress: ' · distress {value}',
    nodeMetaFrequency: ' · frequency {value}',
    deleteNodeAria: 'Delete node {label}',
    deleteEdgeAria: 'Delete connection {sentence}',
  },

  /** Starting maps. Names are shown in a list with the description underneath. */
  templates: {
    intro:
      "Starting points, not formulations. Replace the labels with the person's own words, and delete anything that does not fit. A template that goes unchallenged is worse than a blank canvas.",
    blankName: 'Blank canvas',
    blankDescription: 'Start from nothing.',
    abcName: 'Three-term contingency',
    abcDescription: 'The starting scaffold: context, internal response, consequence. Build outward from here.',
    worryName: 'Worry and sleep cycle',
    worryDescription: 'A worked example. Useful for showing what a reinforcing loop looks like.',
    moodName: 'Low mood and withdrawal',
    moodDescription: "A common behavioural activation pattern. Put it in the person's own words before using it.",
    painName: 'Chronic pain and avoidance',
    painDescription: 'A fear-avoidance pattern, with the deconditioning loop that usually maintains it.',
  },

  /**
   * The box labels inside each template.
   *
   * Worth translating rather than leaving in English: a template is a starting
   * point someone edits in the room, and one written in a language the client
   * does not speak is a template nobody uses. These are everyday clinical
   * phrasings, not technical terms — say them the way a clinician in your
   * language actually would, rather than translating word for word.
   */
  templateNodes: {
    abcTrigger: 'Trigger or situation',
    abcThought: 'Thought or feeling',
    abcAction: 'What I do',

    worryCriticism: 'Criticism at work',
    worryJobSecurity: 'Worry about job security',
    worrySleep: 'Difficulty sleeping',
    worryFatigue: 'Fatigue',
    worryExercise: 'Exercise',
    worryWithdrawal: 'Social withdrawal',

    moodLow: 'Low mood',
    moodStayingHome: 'Staying home',
    moodFewerThings: 'Fewer things that matter to me',
    moodBurden: 'I am a burden',
    moodContact: 'Contact with friends',
    moodNoticing: 'Noticing small good moments',

    painPain: 'Pain',
    painFear: 'Fear of making it worse',
    painAvoiding: 'Avoiding activity',
    painDeconditioning: 'Deconditioning',
    painDoingAnyway: 'Doing what matters anyway',
    painWillingness: 'Willingness to feel discomfort',
  },

  /** Appended to a template's description when it is loaded. */
  templateNote:
    "This is a starting point, not a formulation. Replace the labels with the person's own words.",

  /** Getting the map out of the tool. */
  exportDialog: {
    intro:
      'The CSV formats load straight into R or Python. The adjacency matrix is what qgraph, igraph and networkx expect as input.',
    json: 'Network (JSON)',
    edges: 'Edge list (CSV)',
    nodes: 'Node list (CSV)',
    matrix: 'Adjacency matrix (CSV)',
    report: 'Analysis report (Markdown)',
    events: 'Build log (CSV)',
    png: 'Image (PNG)',
    svg: 'Vector (SVG)',
    print: 'Print / PDF',
  },

  share: {
    title: 'Share link',
    intro:
      'The whole network is encoded in the link itself. There is no server copy, and the part carrying your content is never sent in the web request, so nothing is stored or logged anywhere. Anyone with the link can open and edit their own copy.',
    building: 'Building the link…',
    tooLong:
      'This network is too large for a link ({length} characters). Export it as JSON and send the file instead.',
  },

  clearDialog: {
    title: 'Clear this network?',
    body: 'This removes all {nodes} nodes and {edges} connections. You can undo it, and any saved timepoints are kept.',
    confirm: 'Clear everything',
  },

  kernel: {
    title: 'Treatment kernels',
    warning: 'In development. Nothing behind this button yet.',
    p1: 'The plan is a vocabulary of treatment kernels: the smallest units of therapeutic change, in language consistent enough to attach to the processes on a map. Pick a process, and see which kernels are known to act on it.',
    p2: 'The hard part is deciding what counts as one kernel and how finely to split them, and that is not settled yet.',
    p3: 'If you have ideas about how this database should be organised, Kean would like to hear them:',
  },

  /** The Help dialog. Long-form, and the most read text in the tool. */
  help: {
    title: 'How to use this',
    buildingHeading: 'Building a map',
    buildingEvent:
      'the situation this is about. Start here; on an empty canvas any click creates one. It gets a rounded box, because it is not something the person is doing.',
    buildingAdd: 'a process: a thought, feeling, urge, or action. Square box, coloured by its EEMM category.',
    buildingConnect:
      'click the influencing box, then the one it influences. Then pick, in one click, whether it increases or decreases it and by how much.',
    buildingDelete: 'click any box or arrow. Or select something and press Delete.',
    buildingDoubleClick: 'Double-click a box to edit it. Drag to move, in any mode.',

    readingHeading: 'Reading the picture',
    readingArrowheads:
      'A **filled** arrowhead means increases; a **hollow** one means decreases. Thicker lines with bigger heads are stronger influences. No numbers, and no reliance on colour.',
    readingReciprocal: 'A line with a head at both ends means the two influence each other.',
    readingShapes: 'Square boxes are processes; rounded boxes are events or contexts.',
    readingColour:
      'Arrows are black unless you have marked a link as helping (green) or not helping (red). Most links stay black: the marking is there for when you are testing whether something new breaks a loop.',
    readingColourMode:
      'The Up/down button switches arrow colour to show increases (blue) and decreases (orange) instead, for when the direction of influence is what you are reading for.',

    keyboardHeading: 'Keyboard',
    keyboardTools: 'select · event/context · add node · connect · delete',
    keyboardConnectFromSelection: 'Select a box then press C and your next click finishes the link.',
    keyboardDelete: 'Delete or Backspace removes what is selected.',
    keyboardEscape: 'Esc cancels what you are doing. Press it again to return to Select.',
    keyboardView: 'F fit view · O organise · M ratings · G grid',
    keyboardEditing:
      'Ctrl/Cmd+Z undo · Shift+click to select several · Ctrl/Cmd+C and Ctrl/Cmd+V copy and paste · Ctrl/Cmd+D duplicate',

    organiseHeading: 'Organise',
    organiseBody:
      'Snaps the boxes into rows and columns that follow the arrows, with the main context at the leading edge. It tries the layout both across and down and keeps whichever fits your screen better. Feedback loops are ignored when deciding the order, so they read as loops rather than scrambling the sequence.',

    mouselessHeading: 'Without a mouse',
    mouselessBody:
      'List view shows the whole map as text you can move through with Tab and edit from the keyboard. It is also what a screen reader reads, since a canvas is invisible to one.',
    openListView: 'Open list view',

    cautionHeading: 'A caution about the analysis',
    cautionBody:
      'Centrality, loops and leverage describe the map that was drawn, not the person. They assume influence is linear and immediate, which it is not. They are a structured way to interrogate your own thinking, and they are worth exactly as much as the ratings they were built from.',
  },

  about: {
    title: 'About',
    intro:
      'A free, open-source tool for mapping process-based networks: the functional relationships between the processes that maintain psychological suffering and wellbeing.',
    groundingHeading: 'Grounding',
    groundingBody:
      'The categories and the way this tool thinks about processes come from the Extended Evolutionary Meta-Model set out in the process-based therapy work of **Steven C. Hayes and Stefan G. Hofmann**: affect, cognition, attention, self, motivation and overt behaviour, situated in biophysiological and sociocultural levels, and always read in context.',
    inspiration: 'The idea of doing this in a browser was inspired by Joseph Ciarrochi’s',
    madeByHeading: 'Who made this',
    madeByBody:
      "Tan Kean Sian conceived this tool and directed its development; all the code was written with Claude, Anthropic's AI assistant. Questions, or suggestions for improving it, are welcome at",
    dataHeading: 'Where your data lives',
    dataBody:
      'In your browser, and nowhere else. No account, no server, no analytics. Clearing your browser data deletes your maps, so export anything you want to keep. Share links carry the map inside the link itself rather than uploading it anywhere.',
    licence: 'MIT licensed. Contributions welcome.',
  },

  /** Shown when the canvas fails to start. */
  error: {
    canvasTitle: 'The drawing canvas could not start',
    canvasHint:
      'This usually means graphics acceleration is unavailable on this machine. Your network is safe. Open List view to read and edit it as text, and Export to get it out.',
    technicalDetail: 'Technical detail',
  },

  /** Brief messages that appear at the bottom of the screen and fade. */
  toast: {
    copied_one: 'Copied {count} box. Ctrl/Cmd+V to paste.',
    copied_other: 'Copied {count} boxes. Ctrl/Cmd+V to paste.',
    pasted_one: 'Pasted {count} box.',
    pasted_other: 'Pasted {count} boxes.',
    duplicated_one: 'Duplicated {count} box.',
    duplicated_other: 'Duplicated {count} boxes.',
    hypothesisOn: 'Hypothesis on. Anything you add now is a proposal, drawn dashed.',
    sharedOpened: 'Opened a shared network. It has not overwritten your saved work.',
    imported: 'Imported.',
    importUnreadable: 'Could not read that file.',
    importNotJson: 'That file is not valid JSON.',
  },

  /** The language picker itself. */
  language: {
    title: 'Language',
    note: 'Translations are community-contributed and under review. The clinical vocabulary in particular may not yet be settled in every language.',
    contribute: 'Spotted a mistranslation? Corrections are very welcome at',
    /** Marks a language whose clinical vocabulary has not yet been signed off. */
    draft: 'draft',
  },

  /** Canvas accessibility description. */
  a11y: {
    canvas: 'Network canvas. A keyboard-accessible version of the same content is in List view.',
    toolbar: 'Tools',
    scopeTabs: 'Which connections to count',
  },
};

export type Strings = typeof en;

/**
 * A locale under construction may legitimately be missing keys; the loader
 * fills them from English rather than showing a blank button.
 */
export type PartialStrings = {
  [K in keyof Strings]?: Strings[K] extends Record<string, unknown> ? Partial<Strings[K]> : Strings[K];
};

/**
 * Substitute `{name}` placeholders.
 *
 * A missing value leaves the placeholder visibly in place rather than printing
 * "undefined" — an obviously broken string gets reported, a plausible-looking
 * wrong one does not.
 */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

/** Pick the singular or plural form, then substitute. */
export function plural(
  forms: { one: string; other: string },
  count: number,
  values: Record<string, string | number> = {},
): string {
  return fmt(count === 1 ? forms.one : forms.other, { count, ...values });
}

let current: Strings = en;

/** For non-React code (exporters, analysis summaries) that cannot use a hook. */
export function t(): Strings {
  return current;
}

/** Called by the locale registry. Components re-render via `useStrings`. */
export function setActiveStrings(strings: Strings): void {
  current = strings;
}
