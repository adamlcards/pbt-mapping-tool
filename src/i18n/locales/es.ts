import type { PartialStrings } from '../strings';

/**
 * Spanish (Español).
 *
 * Terminology to check first: the EEMM dimensions follow the Spanish
 * process-based/ACT literature — Afecto, Cognición, Atención, Yo, Motivación,
 * Conducta manifiesta (node prefix shortened to "Conducta" for space),
 * Biofisiológico, Sociocultural — with "defusión", "yo como contexto" and
 * "disposición" (willingness) as the ACT renderings. Systems terms follow the
 * standard Spanish systems-dynamics pair: reinforcing = "reforzador",
 * balancing = "compensador", leverage = "apalancamiento". "Timepoints" is
 * rendered "Momentos" throughout (the toolbar cannot take "puntos
 * temporales"); "link" is "vínculo" and "connection" is "conexión"; the
 * Delete/Backspace keys are given their Spanish keycap names, "Supr" and
 * "Retroceso". Address form is consistent "tú".
 */
export const es: PartialStrings = {
  meta: { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },

  app: {
    name: 'Herramienta de mapeo de redes basadas en procesos',
    short: 'Herramienta de mapeo PBT',
    networkTitleLabel: 'Título de la red',
    untitledNetwork: 'Red sin título',
  },

  tool: {
    select: 'Seleccionar',
    add: 'Añadir nodo',
    connect: 'Conectar',
    delete: 'Eliminar',
    event: 'Evento / contexto',
  },

  toolHint: {
    select: 'Haz clic para seleccionar y ver con qué se conecta. Arrastra para mover.',
    add: 'Haz clic en cualquier punto del lienzo para añadir un nodo.',
    connect: 'Haz clic en el nodo que influye y luego en el que recibe la influencia.',
    delete: 'Haz clic en un nodo o una conexión para eliminarlo.',
    start: 'Empieza por el evento o la situación de la que trata esto. Haz clic donde quieras.',
    focused: 'Enfocado en una parte de la red.',
    showEverything: 'Volver a mostrarlo todo',
    pendingSource: 'Origen: {label}. Ahora haz clic en el nodo al que influye.',
  },

  action: {
    undo: 'Deshacer',
    redo: 'Rehacer',
    fit: 'Ajustar vista',
    organise: 'Organizar',
    clear: 'Vaciar',
    grid: 'Cuadrícula',
    ratings: 'Puntuaciones',
    colourByValence: 'Ayuda',
    colourByDirection: 'Sube/baja',
    hypothesis: 'Hipótesis',
    kernel: 'Kernels',
    analyse: 'Análisis',
    snapshots: 'Momentos',
    import: 'Importar',
    export: 'Exportar',
    share: 'Compartir',
    help: 'Ayuda',
    about: 'Acerca de',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    templates: 'Plantillas',
    guided: 'Guía paso a paso',
    cancel: 'Cancelar',
    save: 'Guardar',
    add: 'Añadir',
    update: 'Actualizar',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Terminar',
    restore: 'Restaurar',
    tryAgain: 'Reintentar',
    copy: 'Copiar enlace',
    copied: 'Copiado',
    language: 'Idioma',
  },

  tooltip: {
    undo: 'Deshacer (Ctrl/Cmd+Z)',
    redo: 'Rehacer (Ctrl/Cmd+Y)',
    fit: 'Ajustar todo a la pantalla (F)',
    organise: 'Alinear las cajas en filas y columnas que sigan las flechas (O)',
    clear: 'Eliminarlo todo',
    grid: 'Mostrar una cuadrícula y ajustar las cajas a ella (G)',
    ratings: 'Mostrar en cada caja las puntuaciones de gravedad (G) y frecuencia (F) (M)',
    colourIsDirection:
      'Ahora el color de las flechas indica los aumentos (azul) y las reducciones (naranja). Haz clic para colorearlas según si el vínculo ayuda.',
    colourIsValence:
      'Ahora el color de las flechas indica si un vínculo ayuda. Haz clic para colorearlas según los aumentos y las reducciones.',
    addEvent: 'Añadir un evento o contexto',
    addProcess: 'Añadir un proceso',
    hypothesis: 'Añade algo que estés considerando y observa qué cambiaría (H)',
    kernel: 'Kernels de tratamiento (en desarrollo)',
    analyse: 'Centralidad, bucles de retroalimentación, trayectorias y apalancamiento',
    snapshots: 'Guarda este mapa como un momento y compáralo más adelante',
    import: 'Cargar un archivo guardado',
    export: 'Guardar como imagen, PDF, JSON o CSV',
    share: 'Obtener un enlace a este mapa',
    help: 'Cómo se usa',
    templates: 'Empezar a partir de un ejemplo',
    guided: 'Construcción paso a paso',
    themeToLight: 'Cambiar al tema claro',
    themeToDark: 'Cambiar al tema oscuro',
    language: 'Cambiar el idioma de la interfaz',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, o Supr/Retroceso para eliminar lo seleccionado',
    closePanel: 'Cerrar el panel',
    closeDialog: 'Cerrar el diálogo',
    closeGuide: 'Cerrar la guía',
  },

  privacy: {
    localOnly: 'Todo se queda en este dispositivo',
    localOnlyLong:
      'Tu mapa se guarda en este navegador y no se envía a ninguna parte. Puedes cerrar la pestaña sin problema. Si borras los datos del navegador, el mapa desaparecerá, así que exporta lo que quieras conservar.',
    studyMode: 'Modo estudio',
    studyModeLong:
      'Estás participando en un estudio de investigación. Tu mapa y el orden en que lo has construido se guardan en el servidor del estudio.',
    autosaveUnavailable: 'Guardado automático no disponible — exporta para conservar tu trabajo',
    autosaveUnavailableLong:
      'Este navegador no está dejando que la página guarde nada, algo que suele ocurrir cuando se abre un archivo HTML directamente desde el disco, o en una ventana privada. Tu trabajo sigue siendo privado, pero se perderá al cerrar la pestaña. Usa Exportar para conservarlo.',
  },

  panel: {
    analysis: 'Análisis',
    snapshots: 'Momentos',
    listView: 'Vista de lista',
  },

  nodeEditor: {
    newEvent: 'Nuevo evento o contexto',
    newNode: 'Nuevo nodo',
    edit: 'Editar nodo',
    name: 'Nombre',
    namePlaceholder: 'Con las palabras de la propia persona',
    category: 'Categoría',
    ratingsDisclosure: 'Puntuaciones y notas (opcional)',
    ratingsNote:
      'Se usan en protocolos de investigación para comparar redes entre personas y a lo largo del tiempo. No hacen falta para el mapeo clínico del día a día.',
    severity: 'Cuánto malestar genera (0–10)',
    frequency: 'Con qué frecuencia (0–10)',
    notes: 'Notas',
    notRated: 'Sin puntuar',
    severityShort: 'G',
    frequencyShort: 'F',
    rate: 'Puntuar',
    clearRating: 'Borrar',
  },

  edgeEditor: {
    title: '¿Cómo influye esto en aquello?',
    sentenceIncreases: '{source} aumenta {target}',
    sentenceDecreases: '{source} reduce {target}',
    increasesIt: 'Lo aumenta',
    decreasesIt: 'Lo reduce',
    altDirection: 'Estos dos también se influyen en el sentido contrario.',
    editAlt: 'Editar {source} → {target}',
    removeLink: 'Eliminar vínculo',
    addLink: 'Añadir vínculo',
    helpingDisclosure: '¿Este vínculo ayuda?',
    helpingNote:
      'Ningún proceso es útil o dañino por sí mismo; depende de aquello con lo que se conecte, y por eso esto se pregunta aquí y no cuando pones nombre a la caja. Marcar los vínculos es lo que permite al panel de Análisis decir qué cambio ayudaría, y no solo cuál se extendería más lejos. Déjalo como está si no vas a usar eso.',
  },

  category: {
    uncategorised: {
      label: 'Sin categoría',
      prefix: '',
      hint: 'Todavía sin clasificar. No pasa nada por dejarlo así mientras lo piensas.',
    },
    affect: {
      label: 'Afecto',
      prefix: 'Afecto',
      hint: 'Emociones y sentimientos. Evitarlos, o estar dispuesto a tenerlos.',
    },
    cognition: {
      label: 'Cognición',
      prefix: 'Cognición',
      hint: 'Pensamientos, creencias, reglas, rumiación, defusión.',
    },
    attention: {
      label: 'Atención',
      prefix: 'Atención',
      hint: 'Lo que se está notando y lo que no. Foco flexible o estrecho.',
    },
    self: {
      label: 'Yo',
      prefix: 'Yo',
      hint: 'Autoconcepto, identidad, autocrítica, yo como contexto.',
    },
    motivation: {
      label: 'Motivación',
      prefix: 'Motivación',
      hint: 'Valores, metas, aquello hacia lo que la persona se acerca o de lo que se aleja.',
    },
    overtBehaviour: {
      label: 'Conducta manifiesta',
      prefix: 'Conducta',
      hint: 'Acción observable. Lo que la persona hace realmente.',
    },
    biophysiological: {
      label: 'Biofisiológico',
      prefix: 'Biofisiológico',
      hint: 'Sueño, dolor, enfermedad, medicación, activación, fisiología.',
    },
    sociocultural: {
      label: 'Sociocultural',
      prefix: 'Sociocultural',
      hint: 'Relaciones, familia, cultura, apoyo o presión social.',
    },
    context: {
      label: 'Contexto / evento',
      prefix: 'Evento',
      hint: 'Una situación o un evento, no algo que hace la persona. Se dibuja con las esquinas redondeadas.',
    },
  },

  categoryGroup: {
    dimension: 'Dimensiones psicológicas',
    level: 'Niveles',
    other: 'Contexto y sin clasificar',
  },

  strength: {
    1: 'Un poco',
    2: 'Moderadamente',
    3: 'Mucho',
  },

  valence: {
    neutral: 'Sin valorar',
    helpful: 'Ayuda',
    unhelpful: 'No ayuda',
  },

  trial: {
    proposed: 'En consideración',
    adopted: 'Probado, y ayudó',
    ruledOut: 'Probado, no ayudó',
    proposedHint:
      'Todavía es una idea. Se dibuja con línea discontinua y queda fuera de la línea de base con la que se compara.',
    adoptedHint: 'Funcionó. Pasa a formar parte del mapa y se dibuja como todo lo demás.',
    ruledOutHint: 'No funcionó. Se conserva, pero atenuado, para que puedas ver qué se ha probado ya.',
    dialogTitle: '¿Qué pasó con esto?',
    legend: '¿En qué punto está esto?',
    lastRecorded: 'Registrado por última vez {when}',
    notATrial: 'No es ninguna prueba — convertirlo en una parte normal del mapa',
  },

  analysis: {
    title: 'Análisis',
    summary: 'Qué muestra esta red',
    central: 'Más conectados',
    loops: 'Bucles de retroalimentación',
    leverage: 'Dónde puede extenderse más el cambio',
    paths: 'Trazar una trayectoria',
    whatIf: 'Qué pasaría si',
    empty: 'Añade nodos y conexiones para ver un análisis.',

    stats: '{nodes} nodos · {edges} conexiones · densidad {density}',

    scopeAll: 'Todas las conexiones',
    scopeUnhelpful: 'Desadaptativas',
    scopeHelpful: 'Adaptativas',
    centralNote:
      'La fuerza cuenta cuánta influencia entra y sale. Es la medida de centralidad con más respaldo para elegir objetivos de tratamiento, pero un nodo central no es automáticamente el más adecuado sobre el que intervenir.',
    scopeUnhelpfulNote:
      'Cuenta solo las flechas que has marcado como que no ayudan. Una puntuación alta aquí es un proceso que mantiene el problema en pie.',
    scopeHelpfulNote:
      'Cuenta solo las flechas que has marcado como que ayudan. Una puntuación alta aquí es algo que la persona ya tiene a su favor: suele merecer más la pena apoyarse en ello que añadir algo nuevo.',
    excludedNote_one:
      '{count} conexión sin valorar queda excluida de ambas divisiones, así que estas no sumarán las cifras del conjunto.',
    excludedNote_other:
      '{count} conexiones sin valorar quedan excluidas de ambas divisiones, así que estas no sumarán las cifras del conjunto.',
    noneMarkedHelpful:
      'Todavía no hay nada marcado como que ayuda. Abre una conexión e indica si ayuda para rellenar esto.',
    noneMarkedUnhelpful:
      'Todavía no hay nada marcado como que no ayuda. Abre una conexión e indica si ayuda para rellenar esto.',

    colNode: 'Nodo',
    colIn: 'Entrada',
    colOut: 'Salida',
    colStrength: 'Fuerza',
    colNetOutward: 'Salida neta',
    chipEntryPoint: 'punto de entrada',
    chipEndpoint: 'punto final',
    chipUnconnected: 'sin conexiones',
    chipNothingHelping: 'nada que ayude',
    chipNothingUnhelpful: 'nada que no ayude',

    reinforcing: 'Reforzador',
    balancing: 'Compensador',
    reinforcingHelp:
      'Se sostiene solo. Un aumento en cualquier punto del bucle vuelve convertido en un aumento todavía mayor, y por eso el problema sigue en marcha después de que el desencadenante haya pasado.',
    balancingHelp:
      'Se corrige solo. Algo de este bucle empuja en sentido contrario, lo que suele indicar un freno natural.',
    noLoops: 'No se ha encontrado ningún bucle.',
    manyLoops: 'Esta red tiene muchos bucles. Solo se enumeran los más fuertes.',
    loopSteps_one: '{count} paso, ganancia {gain}',
    loopSteps_other: '{count} pasos, ganancia {gain}',

    heuristicWarning:
      'Estas cifras describen el mapa que has dibujado, no a la persona. Dan por supuesto que la influencia es lineal e inmediata, y no lo es. Úsalas para pensar, nunca como una predicción.',
    colIfReduced: 'Si esto se redujera',
    colBenefit: 'Beneficio modelado',
    colReach: 'Alcance',
    wouldAlsoSuppress: 'También suprimiría {labels}',
    chipNoDampening: 'sin amortiguación',

    from: 'Desde',
    to: 'Hasta',
    choose: 'Elegir…',
    noRoute: 'No hay ninguna ruta de uno al otro.',
    routeStats_one: '{count} ruta · {up} de aumento · {down} de reducción · neto {net}',
    routeStats_other: '{count} rutas · {up} de aumento · {down} de reducción · neto {net}',
    pathSteps_one: '{count} paso, efecto {effect}',
    pathSteps_other: '{count} pasos, efecto {effect}',
    increases: 'aumenta',
    decreases: 'reduce',

    colNow: 'Ahora',
    colWithThis: 'Con esto',
    rowReinforcing: 'Bucles reforzadores',
    rowBalancing: 'Bucles compensadores',
    rowAmplification: 'Amplificación modelada',
    newBrakes: 'Nuevos frenos en el sistema',
    badgeNewBalancing: 'nuevo compensador',
    howItActs: 'Cómo actúa en cada ciclo',
    mechSelfCorrecting: 'se corrige solo',
    mechSteadyPressure: 'presión constante',
    mechPushedHarder: 'se empuja con más fuerza',
    mechUntouched: 'sin tocar',
    pressureOn: 'sobre {labels} · hay que mantenerla',
    holdsOnItsOwn: 'se sostiene solo',
  },

  summary: {
    noNodes: 'Añade algunos nodos para ver un análisis.',
    noEdges:
      'Todavía no hay nada conectado. Añade conexiones para ver cómo se influyen las partes entre sí.',
    mostConnected_one:
      '**{label}** es la parte más conectada de esta red ({inDegree} influencia de entrada, {outDegree} de salida). Los nodos centrales suelen ser el punto donde el cambio se extiende más lejos, aunque también pueden ser los más difíciles de mover directamente.',
    mostConnected_other:
      '**{label}** es la parte más conectada de esta red ({inDegree} influencias de entrada, {outDegree} de salida). Los nodos centrales suelen ser el punto donde el cambio se extiende más lejos, aunque también pueden ser los más difíciles de mover directamente.',
    reinforcing_one:
      'Aquí hay **{count} bucle reforzador**. Son ciclos que se sostienen solos: siguen funcionando incluso después de que haya pasado lo que los puso en marcha.',
    reinforcing_other:
      'Aquí hay **{count} bucles reforzadores**. Son ciclos que se sostienen solos: siguen funcionando incluso después de que haya pasado lo que los puso en marcha.',
    tightestLoop: ' El más corto es {path}.',
    noReinforcing:
      'No se ha encontrado ningún bucle reforzador. Merece la pena preguntarse si algo de aquí se retroalimenta, porque la retroalimentación suele ser lo que hace que un problema persista.',
    balancing_one:
      'Se ha encontrado {count} bucle compensador. Se corrigen solos y a menudo señalan dónde la persona ya tiene algún freno natural sobre el problema.',
    balancing_other:
      'Se han encontrado {count} bucles compensadores. Se corrigen solos y a menudo señalan dónde la persona ya tiene algún freno natural sobre el problema.',
    sources_one:
      '{labels} influye en otros, pero nada de la red influye en él. Los puntos de entrada como este son a veces el sitio más manejable por donde empezar.',
    sources_other:
      '{labels} influyen en otros, pero nada de la red influye en ellos. Los puntos de entrada como estos son a veces el sitio más manejable por donde empezar.',
    leverage_one: 'Reducir **{label}** tiene el efecto modelado más amplio: alcanza a {reach} nodo más.',
    leverage_other: 'Reducir **{label}** tiene el efecto modelado más amplio: alcanza a {reach} nodos más.',
    leverageCaveat_one:
      ' Ten en cuenta que también suprimiría {labels}, que está ligado a vínculos que has marcado como que ayudan.',
    leverageCaveat_other:
      ' Ten en cuenta que también suprimiría {labels}, que están ligados a vínculos que has marcado como que ayudan.',
    isolated_one: '{labels} todavía no está conectado con nada.',
    isolated_other: '{labels} todavía no están conectados con nada.',
    diverges:
      'Algunas partes de esta red se amplifican sin límite al modelarlas, lo que suele significar bucles reforzadores fuertes sin ninguna amortiguación. Toma las cifras de apalancamiento solo como indicativas.',
    caveat:
      '_Estas cifras describen el mapa que has dibujado, no a la persona. Son una forma estructurada de mirar tu propio razonamiento, no una predicción de lo que va a pasar._',
  },

  guided: {
    ariaLabel: 'Construcción guiada',
    stepOf: 'Paso {current} de {total}',
    done: 'Hecho. Sigue adelante cuando quieras.',
    footer:
      'Puedes salir de la guía en cualquier momento y conservar todo lo que hayas construido. Los pasos son un andamiaje, no un formulario que haya que completar.',
    step1Title: '1. Empieza por el contexto',
    step1Body:
      'Usa el botón Evento / contexto y añade la situación de la que trata esto: qué pasó, dónde y con quién. Se dibuja con una caja de esquinas redondeadas, porque no es algo que la persona esté haciendo.\n\nEmpezar aquí no es un formalismo. En un análisis funcional, el mismo pensamiento o la misma acción significan cosas distintas en situaciones distintas, así que el contexto es lo que hace interpretable todo lo que viene después.',
    step1Nudge: 'Añade una caja de evento o contexto para empezar.',
    step2Title: '2. Añade la respuesta y lo que viene después',
    step2Body:
      'Ahora añade lo que ocurre por dentro (un pensamiento, una emoción o un impulso) y lo que la persona hace o lo que resulta de ello. Conéctalos en orden, a partir del contexto.\n\nEso es la contingencia de tres términos, la unidad con la que se construye un análisis funcional. Todo lo demás crece a partir de ahí.',
    step2NudgeNodes: 'Añade dos cajas más: la respuesta interna y después lo que ocurre.',
    step2NudgeEdges: 'Ahora conéctalas: contexto → respuesta interna → lo que ocurre.',
    step3Title: '3. Comprueba si vuelve sobre sí mismo',
    step3Body:
      'Mira el final de tu cadena y pregúntate: ¿eso retroalimenta algo anterior? Dormir mal genera preocupación, pero la preocupación también hace dormir mal.\n\nLa retroalimentación suele ser la respuesta a por qué un problema persiste mucho después de que haya desaparecido lo que lo puso en marcha.',
    step3Nudge: 'Todavía no hay ningún bucle. ¿La consecuencia alimenta algo anterior?',
    step4Title: '4. Añade qué más está implicado',
    step4Body:
      '¿Qué más queda atrapado en esto? Añade un nodo para cualquier cosa afectada por la consecuencia que además retroalimente la respuesta.\n\nAquí importan los amplificadores. La fatiga no es solo otro problema más: hace que todo lo demás resulte más amenazante.',
    step4Nudge: 'Añade al menos un elemento más.',
    step5Title: '5. Añade lo que ayuda',
    step5Body:
      'No todo empeora las cosas. Añade algo que reduzca uno de estos problemas, dibújalo como un vínculo de reducción y marca ese vínculo como que Ayuda.\n\nEsta suele ser la parte que la gente se salta, y es donde normalmente vive la intervención.',
    step5NudgeDecrease: 'Añade algo que reduzca uno de estos, dibujado como un vínculo de reducción.',
    step5NudgeHelpful: 'Marca ese vínculo como que Ayuda, para que el mapa muestre lo que está funcionando.',
    step6Title: '6. Mapea lo que se interpone',
    step6Body:
      'Ahora la parte difícil. ¿Qué impide que ocurra aquello que ayuda?\n\nPor esto sienta tan mal el "haz más ejercicio y ya". La persona ya sabe que le vendría bien. Algo del sistema lo está suprimiendo, y hasta que eso no se ve, el consejo no tiene adónde ir.',
    step6Nudge: 'Añade un vínculo que suprima aquello que ayuda.',
  },

  snapshots: {
    intro:
      'Guarda la red tal como está ahora y vuelve más adelante para dibujarla otra vez. No se sobrescribe nada.',
    labelPlaceholder: 'Etiqueta, p. ej. Evaluación inicial o Sesión 6',
    labelAria: 'Etiqueta para este momento',
    saveButton: 'Guardar momento',
    none: 'Todavía no hay ningún momento guardado.',
    meta: '{when} · {nodes} nodos · {edges} conexiones',
    deleteAria: 'Eliminar el momento {label}',
    compare: 'Comparar',
    earlier: 'Antes',
    later: 'Después',
    changes_one: '{count} cambio',
    changes_other: '{count} cambios',
    downloadComparison: 'Descargar la comparación (CSV)',
  },

  structure: {
    empty: 'Todavía no hay nada aquí. Añade un nodo para empezar.',
    nodes: 'Nodos ({count})',
    connections: 'Conexiones ({count})',
    noConnections: 'Todavía ninguna.',
    nodeMetaDistress: ' · malestar {value}',
    nodeMetaFrequency: ' · frecuencia {value}',
    deleteNodeAria: 'Eliminar el nodo {label}',
    deleteEdgeAria: 'Eliminar la conexión {sentence}',
  },

  templates: {
    intro:
      'Puntos de partida, no formulaciones. Sustituye las etiquetas por las palabras de la propia persona y borra lo que no encaje. Una plantilla que no se cuestiona es peor que un lienzo en blanco.',
    blankName: 'Lienzo en blanco',
    blankDescription: 'Empezar desde cero.',
    abcName: 'Contingencia de tres términos',
    abcDescription:
      'El andamiaje inicial: contexto, respuesta interna, consecuencia. A partir de aquí se construye hacia fuera.',
    worryName: 'Ciclo de preocupación y sueño',
    worryDescription: 'Un ejemplo resuelto. Útil para mostrar qué aspecto tiene un bucle reforzador.',
    moodName: 'Ánimo bajo y retraimiento',
    moodDescription:
      'Un patrón habitual de activación conductual. Ponlo con las palabras de la propia persona antes de usarlo.',
    painName: 'Dolor crónico y evitación',
    painDescription:
      'Un patrón de miedo-evitación, con el bucle de desacondicionamiento que suele mantenerlo.',
  },

  templateNodes: {
    abcTrigger: 'Desencadenante o situación',
    abcThought: 'Pensamiento o emoción',
    abcAction: 'Lo que hago',

    worryCriticism: 'Críticas en el trabajo',
    worryJobSecurity: 'Preocupación por perder el trabajo',
    worrySleep: 'Dificultad para dormir',
    worryFatigue: 'Fatiga',
    worryExercise: 'Ejercicio',
    worryWithdrawal: 'Retraimiento social',

    moodLow: 'Ánimo bajo',
    moodStayingHome: 'Quedarme en casa',
    moodFewerThings: 'Menos cosas que me importan',
    moodBurden: 'Soy una carga',
    moodContact: 'Contacto con los amigos',
    moodNoticing: 'Darme cuenta de los pequeños momentos buenos',

    painPain: 'Dolor',
    painFear: 'Miedo a empeorarlo',
    painAvoiding: 'Evitar la actividad',
    painDeconditioning: 'Desacondicionamiento',
    painDoingAnyway: 'Hacer igualmente lo que me importa',
    painWillingness: 'Disposición a sentir malestar',
  },

  templateNote:
    'Esto es un punto de partida, no una formulación. Sustituye las etiquetas por las palabras de la propia persona.',

  exportDialog: {
    intro:
      'Los formatos CSV se cargan directamente en R o Python. La matriz de adyacencia es lo que qgraph, igraph y networkx esperan como entrada.',
    json: 'Red (JSON)',
    edges: 'Lista de vínculos (CSV)',
    nodes: 'Lista de nodos (CSV)',
    matrix: 'Matriz de adyacencia (CSV)',
    report: 'Informe de análisis (Markdown)',
    events: 'Registro de construcción (CSV)',
    png: 'Imagen (PNG)',
    svg: 'Vectorial (SVG)',
    print: 'Imprimir / PDF',
  },

  share: {
    title: 'Enlace para compartir',
    intro:
      'Toda la red va codificada en el propio enlace. No hay ninguna copia en un servidor, y la parte que lleva tu contenido no se envía nunca en la petición web, así que no se guarda ni se registra en ninguna parte. Cualquiera que tenga el enlace puede abrir y editar su propia copia.',
    building: 'Construyendo el enlace…',
    tooLong:
      'Esta red es demasiado grande para un enlace ({length} caracteres). Expórtala como JSON y envía el archivo.',
  },

  clearDialog: {
    title: '¿Vaciar esta red?',
    body: 'Se eliminarán los {nodes} nodos y las {edges} conexiones. Puedes deshacerlo, y los momentos guardados se conservan.',
    confirm: 'Vaciarlo todo',
  },

  kernel: {
    title: 'Kernels de tratamiento',
    warning: 'En desarrollo. Detrás de este botón todavía no hay nada.',
    p1: 'El plan es disponer de un vocabulario de kernels de tratamiento: las unidades más pequeñas de cambio terapéutico, en un lenguaje lo bastante consistente como para poder engancharlas a los procesos de un mapa. Eliges un proceso y ves qué kernels actúan sobre él según lo que se sabe.',
    p2: 'Lo difícil es decidir qué cuenta como un kernel y con qué grano hay que separarlos, y eso todavía no está resuelto.',
    p3: 'Si tienes ideas sobre cómo debería organizarse esta base de datos, a Kean le gustaría conocerlas:',
  },

  help: {
    title: 'Cómo se usa',
    buildingHeading: 'Construir un mapa',
    buildingEvent:
      'la situación de la que trata esto. Empieza aquí; en un lienzo vacío, cualquier clic crea una. Se dibuja con una caja de esquinas redondeadas, porque no es algo que la persona esté haciendo.',
    buildingAdd:
      'un proceso: un pensamiento, una emoción, un impulso o una acción. Caja cuadrada, coloreada según su categoría del EEMM.',
    buildingConnect:
      'haz clic en la caja que influye y después en la que recibe la influencia. Luego elige, con un solo clic, si la aumenta o la reduce y en qué medida.',
    buildingDelete: 'haz clic en cualquier caja o flecha. O selecciona algo y pulsa Supr.',
    buildingDoubleClick: 'Haz doble clic en una caja para editarla. Arrastra para moverla, en cualquier modo.',

    readingHeading: 'Leer el dibujo',
    readingArrowheads:
      'Una punta de flecha **rellena** significa que aumenta; una **hueca**, que reduce. Las líneas más gruesas y con puntas más grandes son influencias más fuertes. Sin números y sin depender del color.',
    readingReciprocal: 'Una línea con punta en los dos extremos significa que ambos se influyen mutuamente.',
    readingShapes: 'Las cajas cuadradas son procesos; las de esquinas redondeadas son eventos o contextos.',
    readingColour:
      'Las flechas son negras salvo que hayas marcado un vínculo como que ayuda (verde) o como que no ayuda (rojo). La mayoría de los vínculos se quedan en negro: la marca está para cuando compruebas si algo nuevo rompe un bucle.',
    readingColourMode:
      'El botón Sube/baja cambia el color de las flechas para mostrar los aumentos (azul) y las reducciones (naranja), para cuando lo que quieres leer es la dirección de la influencia.',

    keyboardHeading: 'Teclado',
    keyboardTools: 'seleccionar · evento/contexto · añadir nodo · conectar · eliminar',
    keyboardConnectFromSelection: 'Selecciona una caja, pulsa C y tu siguiente clic completa el vínculo.',
    keyboardDelete: 'Supr o Retroceso eliminan lo seleccionado.',
    keyboardEscape: 'Esc cancela lo que estés haciendo. Púlsalo otra vez para volver a Seleccionar.',
    keyboardView: 'F ajustar vista · O organizar · M puntuaciones · G cuadrícula',
    keyboardEditing:
      'Ctrl/Cmd+Z deshacer · Mayús+clic para seleccionar varios · Ctrl/Cmd+C y Ctrl/Cmd+V copiar y pegar · Ctrl/Cmd+D duplicar',

    organiseHeading: 'Organizar',
    organiseBody:
      'Alinea las cajas en filas y columnas que siguen las flechas, con el contexto principal en el borde de partida. Prueba la disposición en horizontal y en vertical y se queda con la que encaje mejor en tu pantalla. Los bucles de retroalimentación se ignoran al decidir el orden, para que se lean como bucles en lugar de descolocar la secuencia.',

    mouselessHeading: 'Sin ratón',
    mouselessBody:
      'La vista de lista muestra todo el mapa como texto por el que puedes moverte con el tabulador y que puedes editar desde el teclado. Es también lo que lee un lector de pantalla, ya que un lienzo es invisible para él.',
    openListView: 'Abrir la vista de lista',

    cautionHeading: 'Una advertencia sobre el análisis',
    cautionBody:
      'La centralidad, los bucles y el apalancamiento describen el mapa que se dibujó, no a la persona. Dan por supuesto que la influencia es lineal e inmediata, y no lo es. Son una forma estructurada de interrogar tu propio razonamiento, y valen exactamente lo mismo que las puntuaciones con las que se construyeron.',
  },

  about: {
    title: 'Acerca de',
    intro:
      'Una herramienta gratuita y de código abierto para mapear redes basadas en procesos: las relaciones funcionales entre los procesos que mantienen el sufrimiento psicológico y el bienestar.',
    groundingHeading: 'Fundamentos',
    groundingBody:
      'Las categorías y la manera en que esta herramienta entiende los procesos proceden del Metamodelo Evolutivo Extendido (EEMM) expuesto en el trabajo sobre terapia basada en procesos de **Steven C. Hayes y Stefan G. Hofmann**: afecto, cognición, atención, yo, motivación y conducta manifiesta, situados en los niveles biofisiológico y sociocultural, y leídos siempre en contexto.',
    inspiration: 'La idea de hacer esto en un navegador se inspiró en el trabajo de Joseph Ciarrochi:',
    madeByHeading: 'Quién la ha hecho',
    madeByBody:
      'Tan Kean Sian concibió esta herramienta y dirigió su desarrollo; todo el código se escribió con Claude, el asistente de IA de Anthropic. Las preguntas, o las sugerencias para mejorarla, son bienvenidas en',
    dataHeading: 'Dónde están tus datos',
    dataBody:
      'En tu navegador, y en ningún otro sitio. Sin cuenta, sin servidor, sin analíticas. Si borras los datos del navegador, se borran tus mapas, así que exporta lo que quieras conservar. Los enlaces para compartir llevan el mapa dentro del propio enlace en lugar de subirlo a ninguna parte.',
    licence: 'Con licencia MIT. Las contribuciones son bienvenidas.',
  },

  error: {
    canvasTitle: 'El lienzo de dibujo no ha podido iniciarse',
    canvasHint:
      'Esto suele significar que la aceleración gráfica no está disponible en este equipo. Tu red está a salvo. Abre la vista de lista para leerla y editarla como texto, y Exportar para sacarla de aquí.',
    technicalDetail: 'Detalle técnico',
  },

  toast: {
    copied_one: 'Se ha copiado {count} caja. Ctrl/Cmd+V para pegar.',
    copied_other: 'Se han copiado {count} cajas. Ctrl/Cmd+V para pegar.',
    pasted_one: 'Se ha pegado {count} caja.',
    pasted_other: 'Se han pegado {count} cajas.',
    duplicated_one: 'Se ha duplicado {count} caja.',
    duplicated_other: 'Se han duplicado {count} cajas.',
    hypothesisOn:
      'Hipótesis activada. Todo lo que añadas ahora es una propuesta y se dibuja con línea discontinua.',
    sharedOpened: 'Se ha abierto una red compartida. No ha sobrescrito tu trabajo guardado.',
    imported: 'Importado.',
    importUnreadable: 'No se ha podido leer ese archivo.',
    importNotJson: 'Ese archivo no es JSON válido.',
  },

  language: {
    title: 'Idioma',
    note: 'Las traducciones son aportaciones de la comunidad y están en revisión. El vocabulario clínico, en particular, puede no estar todavía asentado en todos los idiomas.',
    contribute: '¿Has visto un error de traducción? Las correcciones son muy bienvenidas en',
    draft: 'borrador',
  },

  a11y: {
    canvas: 'Lienzo de la red. En la vista de lista hay una versión del mismo contenido accesible por teclado.',
    toolbar: 'Herramientas',
    scopeTabs: 'Qué conexiones contar',
  },
};
