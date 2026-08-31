import type { PartialStrings } from '../strings';

/**
 * French (Français).
 *
 * Terminology a reviewer should check first. The EEMM dimensions follow the
 * usual French PBT/ACT renderings — affect, cognition, attention, soi,
 * motivation, comportement manifeste — inside the niveaux biophysiologique and
 * socioculturel; the node prefix for overt behaviour is shortened to
 * « Comportement » because « Comportement manifeste » does not fit in a box.
 * Systems-dynamics loops are « boucle renforçante » / « boucle équilibrante »
 * (rather than positive/negative), centrality is « centralité », leverage
 * « levier », the three-term contingency « contingence à trois termes », and
 * functional assessment « analyse fonctionnelle ». The helping / not-helping
 * distinction is « aidant » / « non aidant », the adaptive–maladaptive split
 * « adaptées » / « inadaptées », ratings are « cotations », and willingness is
 * rendered as « accepter de ressentir l’inconfort ». "Timepoint" is « point de
 * suivi » rather than the research term « temps de mesure », which reads oddly
 * on a toolbar button — worth a second opinion if the tool is used for Study 7.
 * Address is vouvoiement with imperative verbs throughout.
 *
 * Affect, Cognition, Attention and Motivation are spelled the same in French as
 * in English; the locale checker flags them as untranslated and that is correct
 * but expected. So is `tooltip.toolWithKey`, which is a bare format template.
 */
export const fr: PartialStrings = {
  meta: { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },

  app: {
    name: 'Outil de cartographie des réseaux de processus',
    short: 'Cartographie PBT',
    networkTitleLabel: 'Titre du réseau',
    untitledNetwork: 'Réseau sans titre',
  },

  tool: {
    select: 'Sélection',
    add: 'Ajouter',
    connect: 'Relier',
    delete: 'Supprimer',
    event: 'Événement / contexte',
  },
  toolHint: {
    select: 'Cliquez pour sélectionner et voir ce qui s’y rattache. Faites glisser pour déplacer.',
    add: 'Cliquez n’importe où dans la zone de dessin pour ajouter un nœud.',
    connect: 'Cliquez sur le nœud qui influence, puis sur celui qu’il influence.',
    delete: 'Cliquez sur un nœud ou une connexion à supprimer.',
    start: 'Commencez par l’événement ou la situation dont il s’agit. Cliquez n’importe où.',
    focused: 'Vue centrée sur une partie du réseau.',
    showEverything: 'Tout réafficher',
    pendingSource: 'Source : {label}. Cliquez maintenant sur le nœud qu’il influence.',
  },

  action: {
    undo: 'Annuler',
    redo: 'Rétablir',
    fit: 'Ajuster',
    organise: 'Organiser',
    clear: 'Effacer',
    grid: 'Grille',
    ratings: 'Cotations',
    colourByValence: 'Aidant',
    colourByDirection: 'Sens',
    hypothesis: 'Hypothèse',
    kernel: 'Noyau',
    analyse: 'Analyse',
    snapshots: 'Suivi',
    import: 'Importer',
    export: 'Exporter',
    share: 'Partager',
    help: 'Aide',
    about: 'À propos',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    templates: 'Modèles',
    guided: 'Pas à pas',
    cancel: 'Annuler',
    save: 'Enregistrer',
    add: 'Ajouter',
    update: 'Mettre à jour',
    close: 'Fermer',
    back: 'Retour',
    next: 'Suivant',
    finish: 'Terminer',
    restore: 'Restaurer',
    tryAgain: 'Réessayer',
    copy: 'Copier le lien',
    copied: 'Copié',
    language: 'Langue',
  },

  tooltip: {
    undo: 'Annuler (Ctrl/Cmd+Z)',
    redo: 'Rétablir (Ctrl/Cmd+Y)',
    fit: 'Tout afficher à l’écran (F)',
    organise: 'Aligner les cases en lignes et en colonnes qui suivent les flèches (O)',
    clear: 'Tout supprimer',
    grid: 'Afficher une grille et y aligner les cases (G)',
    ratings: 'Afficher les cotations de détresse (D) et de fréquence (F) sur chaque case (M)',
    colourIsDirection:
      'La couleur des flèches montre actuellement les augmentations (bleu) et les diminutions (orange). Cliquez pour colorer plutôt selon le caractère aidant du lien.',
    colourIsValence:
      'La couleur des flèches montre actuellement si un lien est aidant. Cliquez pour colorer plutôt selon les augmentations et les diminutions.',
    addEvent: 'Ajouter un événement ou un contexte',
    addProcess: 'Ajouter un processus',
    hypothesis: 'Ajouter une piste que vous envisagez et voir ce qu’elle changerait (H)',
    kernel: 'Noyaux thérapeutiques (en développement)',
    analyse: 'Centralité, boucles de rétroaction, trajectoires et leviers',
    snapshots: 'Enregistrer cette carte comme point de suivi et la comparer plus tard',
    import: 'Ouvrir un fichier enregistré',
    export: 'Enregistrer en image, PDF, JSON ou CSV',
    share: 'Obtenir un lien vers cette carte',
    help: 'Comment utiliser cet outil',
    templates: 'Partir d’un exemple',
    guided: 'Construction pas à pas',
    themeToLight: 'Passer au thème clair',
    themeToDark: 'Passer au thème sombre',
    language: 'Changer la langue de l’interface',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, ou Suppr/Retour arrière pour supprimer la sélection',
    closePanel: 'Fermer le panneau',
    closeDialog: 'Fermer la boîte de dialogue',
    closeGuide: 'Fermer le guide',
  },

  privacy: {
    localOnly: 'Tout reste sur cet appareil',
    localOnlyLong:
      'Votre carte est enregistrée dans ce navigateur et n’est jamais envoyée nulle part. Vous pouvez fermer l’onglet sans risque. Effacer les données de votre navigateur la supprimera : exportez ce que vous voulez conserver.',
    studyMode: 'Mode étude',
    studyModeLong:
      'Vous participez à une étude de recherche. Votre carte et l’ordre dans lequel vous l’avez construite sont enregistrés sur le serveur de l’étude.',
    autosaveUnavailable: 'Enregistrement automatique indisponible — exportez votre travail',
    autosaveUnavailableLong:
      'Ce navigateur n’autorise pas la page à enregistrer quoi que ce soit, ce qui arrive le plus souvent quand un fichier HTML est ouvert directement depuis le disque, ou en navigation privée. Votre travail reste privé, mais il sera perdu à la fermeture de l’onglet. Utilisez Exporter pour le conserver.',
  },

  panel: {
    analysis: 'Analyse',
    snapshots: 'Points de suivi',
    listView: 'Vue en liste',
  },

  nodeEditor: {
    newEvent: 'Nouvel événement ou contexte',
    newNode: 'Nouveau nœud',
    edit: 'Modifier le nœud',
    name: 'Nom',
    namePlaceholder: 'Dans les mots de la personne',
    category: 'Catégorie',
    ratingsDisclosure: 'Cotations et remarques (facultatif)',
    ratingsNote:
      'Utilisées dans les protocoles de recherche pour comparer les réseaux entre personnes et dans le temps. Inutiles pour la cartographie clinique courante.',
    severity: 'Détresse ressentie (0–10)',
    frequency: 'Fréquence (0–10)',
    notes: 'Remarques',
    notRated: 'Non coté',
    severityShort: 'D',
    frequencyShort: 'F',
    rate: 'Coter',
    clearRating: 'Effacer',
  },

  edgeEditor: {
    title: 'Comment ceci agit-il sur cela ?',
    sentenceIncreases: '{source} augmente {target}',
    sentenceDecreases: '{source} diminue {target}',
    increasesIt: 'Augmente',
    decreasesIt: 'Diminue',
    altDirection: 'Ces deux éléments s’influencent aussi dans l’autre sens.',
    editAlt: 'Modifier {source} → {target}',
    removeLink: 'Supprimer le lien',
    addLink: 'Ajouter un lien',
    helpingDisclosure: 'Ce lien est-il aidant ?',
    helpingNote:
      'Aucun processus n’est aidant ou nuisible en soi ; cela dépend de ce à quoi il se rattache, et c’est pourquoi la question se pose ici et non au moment de nommer la case. C’est ce marquage qui permet au panneau Analyse d’indiquer quel changement serait bénéfique, et pas seulement lequel se diffuserait le plus loin. Laissez-le de côté si vous ne vous en servez pas.',
  },

  category: {
    uncategorised: {
      label: 'Non catégorisé',
      prefix: '',
      hint: 'Pas encore classé. Vous pouvez le laisser ainsi tant que la réflexion se poursuit.',
    },
    affect: {
      label: 'Affect',
      prefix: 'Affect',
      hint: 'Émotions et ressentis. Les éviter, ou accepter de les éprouver.',
    },
    cognition: {
      label: 'Cognition',
      prefix: 'Cognition',
      hint: 'Pensées, croyances, règles, ruminations, défusion.',
    },
    attention: {
      label: 'Attention',
      prefix: 'Attention',
      hint: 'Ce qui est remarqué, et ce qui ne l’est pas. Attention souple ou trop étroite.',
    },
    self: {
      label: 'Soi',
      prefix: 'Soi',
      hint: 'Concept de soi, identité, autocritique, soi comme contexte.',
    },
    motivation: {
      label: 'Motivation',
      prefix: 'Motivation',
      hint: 'Valeurs, buts, ce vers quoi la personne va et ce qu’elle fuit.',
    },
    overtBehaviour: {
      label: 'Comportement manifeste',
      prefix: 'Comportement',
      hint: 'Action observable. Ce que la personne fait réellement.',
    },
    biophysiological: {
      label: 'Biophysiologique',
      prefix: 'Biophysiologique',
      hint: 'Sommeil, douleur, maladie, médicaments, activation, physiologie.',
    },
    sociocultural: {
      label: 'Socioculturel',
      prefix: 'Socioculturel',
      hint: 'Relations, famille, culture, soutien ou pression sociale.',
    },
    context: {
      label: 'Contexte / événement',
      prefix: 'Événement',
      hint: 'Une situation ou un événement, et non une action de la personne. Dessiné avec des coins arrondis.',
    },
  },
  categoryGroup: {
    dimension: 'Dimensions psychologiques',
    level: 'Niveaux',
    other: 'Contexte et non classé',
  },

  strength: {
    1: 'Un peu',
    2: 'Modérément',
    3: 'Beaucoup',
  },

  valence: {
    neutral: 'Non évalué',
    helpful: 'Aidant',
    unhelpful: 'Non aidant',
  },

  trial: {
    proposed: 'À l’étude',
    adopted: 'Essayé, ça a aidé',
    ruledOut: 'Essayé, ça n’a pas aidé',
    proposedHint:
      'Encore une idée. Dessiné en pointillés, et laissé hors de la référence à laquelle la comparaison se mesure.',
    adoptedHint: 'Ça a marché. L’élément fait désormais partie de la carte et se dessine comme les autres.',
    ruledOutHint: 'Ça n’a pas marché. Conservé mais estompé, pour garder trace de ce qui a déjà été essayé.',
    dialogTitle: 'Qu’est-ce que ça a donné ?',
    legend: 'Où en est-on ?',
    lastRecorded: 'Dernier enregistrement le {when}',
    notATrial: 'Pas un essai du tout — en faire un élément ordinaire de la carte',
  },

  analysis: {
    title: 'Analyse',
    summary: 'Ce que montre ce réseau',
    central: 'Les plus connectés',
    loops: 'Boucles de rétroaction',
    leverage: 'Où le changement se diffuserait le plus',
    paths: 'Suivre une trajectoire',
    whatIf: 'Et si',
    empty: 'Ajoutez des nœuds et des connexions pour voir une analyse.',

    stats: '{nodes} nœuds · {edges} connexions · densité {density}',

    scopeAll: 'Toutes les connexions',
    scopeUnhelpful: 'Inadaptées',
    scopeHelpful: 'Adaptées',
    centralNote:
      'La force totalise l’influence qui entre et qui sort. C’est la mesure de centralité la mieux étayée pour choisir des cibles de traitement, mais un nœud central n’est pas pour autant le bon endroit où agir.',
    scopeUnhelpfulNote:
      'Seules les flèches que vous avez marquées comme non aidantes sont comptées. Un score élevé ici signale un processus qui maintient le problème en place.',
    scopeHelpfulNote:
      'Seules les flèches que vous avez marquées comme aidantes sont comptées. Un score élevé ici est une ressource dont la personne dispose déjà — souvent plus utile à développer que d’ajouter quelque chose de nouveau.',
    excludedNote_one:
      '{count} connexion non évaluée est exclue des deux sous-ensembles : leur somme ne correspondra donc pas aux chiffres d’ensemble.',
    excludedNote_other:
      '{count} connexions non évaluées sont exclues des deux sous-ensembles : leur somme ne correspondra donc pas aux chiffres d’ensemble.',
    noneMarkedHelpful:
      'Rien n’est encore marqué comme aidant. Ouvrez une connexion et indiquez si elle aide pour remplir cette vue.',
    noneMarkedUnhelpful:
      'Rien n’est encore marqué comme non aidant. Ouvrez une connexion et indiquez si elle aide pour remplir cette vue.',

    colNode: 'Nœud',
    colIn: 'Entrant',
    colOut: 'Sortant',
    colStrength: 'Force',
    colNetOutward: 'Solde sortant',
    chipEntryPoint: 'point d’entrée',
    chipEndpoint: 'point d’arrivée',
    chipUnconnected: 'isolé',
    chipNothingHelping: 'rien d’aidant',
    chipNothingUnhelpful: 'rien de nuisible',

    reinforcing: 'Renforçante',
    balancing: 'Équilibrante',
    reinforcingHelp:
      'Auto-entretenue. Une augmentation en un point de la boucle revient sous forme d’augmentation supplémentaire : c’est pourquoi le problème se poursuit une fois le déclencheur passé.',
    balancingHelp:
      'Auto-correctrice. Quelque chose dans cette boucle résiste, ce qui signale en général un frein naturel.',
    noLoops: 'Aucune boucle trouvée.',
    manyLoops: 'Ce réseau comporte de nombreuses boucles. Seules les plus fortes sont listées.',
    loopSteps_one: '{count} étape, gain {gain}',
    loopSteps_other: '{count} étapes, gain {gain}',

    heuristicWarning:
      'Ces chiffres décrivent la carte que vous avez dessinée, pas la personne. Ils supposent que l’influence est linéaire et immédiate, ce qu’elle n’est pas. Servez-vous-en pour réfléchir, jamais comme d’une prédiction.',
    colIfReduced: 'Si ceci diminuait',
    colBenefit: 'Bénéfice modélisé',
    colReach: 'Portée',
    wouldAlsoSuppress: 'Freinerait aussi {labels}',
    chipNoDampening: 'sans amortissement',

    from: 'De',
    to: 'Vers',
    choose: 'Choisir…',
    noRoute: 'Aucun trajet de l’un vers l’autre.',
    routeStats_one: '{count} trajet · {up} en hausse · {down} en baisse · net {net}',
    routeStats_other: '{count} trajets · {up} en hausse · {down} en baisse · net {net}',
    pathSteps_one: '{count} étape, effet {effect}',
    pathSteps_other: '{count} étapes, effet {effect}',
    increases: 'augmente',
    decreases: 'diminue',

    colNow: 'Actuellement',
    colWithThis: 'Avec ceci',
    rowReinforcing: 'Boucles renforçantes',
    rowBalancing: 'Boucles équilibrantes',
    rowAmplification: 'Amplification modélisée',
    newBrakes: 'Nouveaux freins sur le système',
    badgeNewBalancing: 'nouvelle équilibrante',
    howItActs: 'Comment cela agit à chaque cycle',
    mechSelfCorrecting: 'auto-correcteur',
    mechSteadyPressure: 'pression constante',
    mechPushedHarder: 'poussé plus fort',
    mechUntouched: 'intact',
    pressureOn: 'sur {labels} · à maintenir',
    holdsOnItsOwn: 'tient tout seul',
  },

  summary: {
    noNodes: 'Ajoutez quelques nœuds pour voir une analyse.',
    noEdges:
      'Rien n’est encore relié. Ajoutez des connexions pour voir comment les éléments s’influencent les uns les autres.',
    mostConnected_one:
      '**{label}** est l’élément le plus connecté de ce réseau ({inDegree} influence entrante, {outDegree} sortante). C’est souvent depuis les nœuds centraux que le changement se diffuse le plus loin, même s’ils sont aussi parfois les plus difficiles à faire bouger directement.',
    mostConnected_other:
      '**{label}** est l’élément le plus connecté de ce réseau ({inDegree} influences entrantes, {outDegree} sortantes). C’est souvent depuis les nœuds centraux que le changement se diffuse le plus loin, même s’ils sont aussi parfois les plus difficiles à faire bouger directement.',
    reinforcing_one:
      'On trouve ici **{count} boucle renforçante**. Ce sont des cycles auto-entretenus : ils se poursuivent même une fois disparu ce qui les a déclenchés.',
    reinforcing_other:
      'On trouve ici **{count} boucles renforçantes**. Ce sont des cycles auto-entretenus : ils se poursuivent même une fois disparu ce qui les a déclenchés.',
    tightestLoop: ' La plus courte est {path}.',
    noReinforcing:
      'Aucune boucle renforçante n’a été trouvée. Il vaut la peine de se demander si quelque chose ici se rétroalimente, car c’est souvent la rétroaction qui fait persister un problème.',
    balancing_one:
      '{count} boucle équilibrante trouvée. Elle est auto-correctrice et signale souvent un frein naturel que la personne exerce déjà sur le problème.',
    balancing_other:
      '{count} boucles équilibrantes trouvées. Elles sont auto-correctrices et signalent souvent un frein naturel que la personne exerce déjà sur le problème.',
    sources_one:
      '{labels} influence d’autres éléments, mais rien dans le réseau ne l’influence en retour. Les points d’entrée de ce type sont parfois l’endroit le plus accessible par où commencer.',
    sources_other:
      '{labels} influencent d’autres éléments, mais rien dans le réseau ne les influence en retour. Les points d’entrée de ce type sont parfois l’endroit le plus accessible par où commencer.',
    leverage_one: 'Réduire **{label}** a l’effet modélisé le plus large, en atteignant {reach} autre nœud.',
    leverage_other: 'Réduire **{label}** a l’effet modélisé le plus large, en atteignant {reach} autres nœuds.',
    leverageCaveat_one:
      ' À noter : cela freinerait aussi {labels}, qui tient à des liens que vous avez marqués comme aidants.',
    leverageCaveat_other:
      ' À noter : cela freinerait aussi {labels}, qui tiennent à des liens que vous avez marqués comme aidants.',
    isolated_one: '{labels} n’est encore relié à rien.',
    isolated_other: '{labels} ne sont encore reliés à rien.',
    diverges:
      'Certaines parties de ce réseau s’amplifient sans limite dans la modélisation, ce qui traduit en général des boucles renforçantes fortes et sans amortissement. Ne prenez les chiffres de levier qu’à titre indicatif.',
    caveat:
      '_Ces chiffres décrivent la carte que vous avez dessinée, pas la personne. C’est une façon structurée d’examiner votre propre raisonnement, pas une prédiction de ce qui va arriver._',
  },

  guided: {
    ariaLabel: 'Construction guidée',
    stepOf: 'Étape {current} sur {total}',
    done: 'C’est fait. Passez à la suite quand vous le souhaitez.',
    footer:
      'Vous pouvez quitter le guide à tout moment en conservant tout ce que vous avez construit. Les étapes sont un appui, pas un formulaire à remplir.',
    step1Title: '1. Commencer par le contexte',
    step1Body:
      'Utilisez le bouton Événement / contexte et ajoutez la situation dont il s’agit : ce qui s’est passé, où, avec qui. Elle prend une case aux coins arrondis, parce qu’il ne s’agit pas de quelque chose que la personne fait.\n\nCommencer ici n’est pas une formalité. Dans une analyse fonctionnelle, une même pensée ou une même action n’a pas le même sens selon la situation : c’est le contexte qui rend interprétable tout ce qui suit.',
    step1Nudge: 'Ajoutez une case événement ou contexte pour commencer.',
    step2Title: '2. Ajouter la réponse et ce qui suit',
    step2Body:
      'Ajoutez maintenant ce qui se passe à l’intérieur (une pensée, une émotion, une envie), puis ce que la personne fait ou ce qui en résulte. Reliez-les dans l’ordre, à partir du contexte.\n\nC’est la contingence à trois termes, l’unité à partir de laquelle se construit une analyse fonctionnelle. Tout le reste en découle.',
    step2NudgeNodes: 'Ajoutez deux autres cases : la réponse interne, puis ce qui arrive.',
    step2NudgeEdges: 'Reliez-les maintenant : contexte → réponse interne → ce qui arrive.',
    step3Title: '3. Vérifier si la boucle se referme',
    step3Body:
      'Regardez la fin de votre chaîne et demandez-vous : est-ce que cela alimente quelque chose en amont ? Mal dormir engendre des soucis, mais les soucis font aussi mal dormir.\n\nLa rétroaction est le plus souvent la réponse à la question de savoir pourquoi un problème persiste longtemps après la disparition de ce qui l’a déclenché.',
    step3Nudge: 'Rien ne revient encore en arrière. La conséquence alimente-t-elle quelque chose en amont ?',
    step4Title: '4. Ajouter ce qui entre aussi en jeu',
    step4Body:
      'Qu’est-ce qui est pris là-dedans, en plus ? Ajoutez un nœud pour tout ce qui est touché par la conséquence et qui alimente aussi la réponse en retour.\n\nLes amplificateurs comptent ici. La fatigue n’est pas seulement un problème de plus : elle rend tout le reste plus menaçant.',
    step4Nudge: 'Ajoutez au moins un élément de plus.',
    step5Title: '5. Ajouter ce qui aide',
    step5Body:
      'Tout ne fait pas qu’aggraver les choses. Ajoutez quelque chose qui réduit l’un de ces problèmes, tracez-le comme un lien qui diminue, et marquez ce lien comme Aidant.\n\nC’est souvent la partie que l’on saute, et c’est là que se loge en général l’intervention.',
    step5NudgeDecrease: 'Ajoutez quelque chose qui réduit l’un de ces éléments, tracé comme un lien qui diminue.',
    step5NudgeHelpful: 'Marquez ce lien comme Aidant, pour que la carte montre ce qui fonctionne.',
    step6Title: '6. Cartographier ce qui fait obstacle',
    step6Body:
      'Le plus difficile, maintenant. Qu’est-ce qui empêche la chose aidante de se produire ?\n\nC’est pour cela que « faites plus d’exercice » tombe si mal. La personne sait déjà que cela l’aiderait. Quelque chose dans le système l’en empêche, et tant que ce n’est pas visible, le conseil n’a nulle part où aller.',
    step6Nudge: 'Ajoutez un lien qui freine ce qui aide.',
  },

  snapshots: {
    intro:
      'Enregistrez le réseau tel qu’il est aujourd’hui, puis revenez le dessiner à nouveau plus tard. Rien n’est écrasé.',
    labelPlaceholder: 'Libellé, par ex. Bilan initial ou Séance 6',
    labelAria: 'Libellé de ce point de suivi',
    saveButton: 'Enregistrer ce point de suivi',
    none: 'Aucun point de suivi enregistré pour l’instant.',
    meta: '{when} · {nodes} nœuds · {edges} connexions',
    deleteAria: 'Supprimer le point de suivi {label}',
    compare: 'Comparer',
    earlier: 'Avant',
    later: 'Après',
    changes_one: '{count} changement',
    changes_other: '{count} changements',
    downloadComparison: 'Télécharger la comparaison (CSV)',
  },

  structure: {
    empty: 'Rien pour l’instant. Ajoutez un nœud pour commencer.',
    nodes: 'Nœuds ({count})',
    connections: 'Connexions ({count})',
    noConnections: 'Aucune pour l’instant.',
    nodeMetaDistress: ' · détresse {value}',
    nodeMetaFrequency: ' · fréquence {value}',
    deleteNodeAria: 'Supprimer le nœud {label}',
    deleteEdgeAria: 'Supprimer la connexion {sentence}',
  },

  templates: {
    intro:
      'Des points de départ, pas des formulations. Remplacez les libellés par les mots de la personne et supprimez ce qui ne correspond pas. Un modèle que l’on ne remet pas en question est pire qu’une page blanche.',
    blankName: 'Page blanche',
    blankDescription: 'Partir de rien.',
    abcName: 'Contingence à trois termes',
    abcDescription: 'L’appui de départ : contexte, réponse interne, conséquence. Développez à partir de là.',
    worryName: 'Cycle soucis et sommeil',
    worryDescription: 'Un exemple travaillé. Utile pour montrer à quoi ressemble une boucle renforçante.',
    moodName: 'Humeur basse et retrait',
    moodDescription:
      'Un schéma classique d’activation comportementale. Reformulez-le avec les mots de la personne avant de vous en servir.',
    painName: 'Douleur chronique et évitement',
    painDescription:
      'Un schéma de peur-évitement, avec la boucle de déconditionnement qui l’entretient le plus souvent.',
  },

  templateNodes: {
    abcTrigger: 'Déclencheur ou situation',
    abcThought: 'Pensée ou émotion',
    abcAction: 'Ce que je fais',

    worryCriticism: 'Critique au travail',
    worryJobSecurity: 'Inquiétude pour mon emploi',
    worrySleep: 'Difficultés à dormir',
    worryFatigue: 'Fatigue',
    worryExercise: 'Activité physique',
    worryWithdrawal: 'Retrait social',

    moodLow: 'Humeur basse',
    moodStayingHome: 'Rester chez moi',
    moodFewerThings: 'Moins de choses qui comptent pour moi',
    moodBurden: 'Je suis un fardeau',
    moodContact: 'Contacts avec mes amis',
    moodNoticing: 'Remarquer les petits bons moments',

    painPain: 'Douleur',
    painFear: 'Peur d’aggraver les choses',
    painAvoiding: 'Éviter l’activité',
    painDeconditioning: 'Déconditionnement',
    painDoingAnyway: 'Faire malgré tout ce qui compte',
    painWillingness: 'Accepter de ressentir l’inconfort',
  },

  templateNote:
    'C’est un point de départ, pas une formulation. Remplacez les libellés par les mots de la personne.',

  exportDialog: {
    intro:
      'Les formats CSV se chargent directement dans R ou Python. La matrice d’adjacence est ce que qgraph, igraph et networkx attendent en entrée.',
    json: 'Réseau (JSON)',
    edges: 'Liste des liens (CSV)',
    nodes: 'Liste des nœuds (CSV)',
    matrix: 'Matrice d’adjacence (CSV)',
    report: 'Rapport d’analyse (Markdown)',
    events: 'Journal de construction (CSV)',
    png: 'Image matricielle (PNG)',
    svg: 'Image vectorielle (SVG)',
    print: 'Imprimer / PDF',
  },

  share: {
    title: 'Lien de partage',
    intro:
      'Le réseau tout entier est encodé dans le lien lui-même. Il n’en existe aucune copie sur un serveur, et la partie qui porte votre contenu n’est jamais transmise dans la requête web : rien n’est donc stocké ni journalisé où que ce soit. Toute personne disposant du lien peut ouvrir et modifier sa propre copie.',
    building: 'Construction du lien…',
    tooLong:
      'Ce réseau est trop volumineux pour un lien ({length} caractères). Exportez-le en JSON et envoyez plutôt le fichier.',
  },

  clearDialog: {
    title: 'Effacer ce réseau ?',
    body: 'Cela supprime les {nodes} nœuds et les {edges} connexions. L’action reste annulable, et les points de suivi enregistrés sont conservés.',
    confirm: 'Tout effacer',
  },

  kernel: {
    title: 'Noyaux thérapeutiques',
    warning: 'En développement. Ce bouton ne mène encore à rien.',
    p1: 'Le projet est un vocabulaire de noyaux thérapeutiques : les plus petites unités de changement thérapeutique, dans un langage assez cohérent pour se rattacher aux processus d’une carte. Choisissez un processus, et voyez quels noyaux sont connus pour agir dessus.',
    p2: 'Le plus difficile est de décider ce qui compte comme un seul noyau et jusqu’où les découper ; ce n’est pas encore tranché.',
    p3: 'Si vous avez des idées sur la façon d’organiser cette base, Kean serait heureux de les entendre :',
  },

  help: {
    title: 'Comment utiliser cet outil',
    buildingHeading: 'Construire une carte',
    buildingEvent:
      'la situation dont il s’agit. Commencez ici ; sur une zone de dessin vide, n’importe quel clic en crée une. Elle prend une case aux coins arrondis, parce qu’il ne s’agit pas de quelque chose que la personne fait.',
    buildingAdd: 'un processus : une pensée, une émotion, une envie ou une action. Case carrée, colorée selon sa catégorie EEMM.',
    buildingConnect:
      'cliquez sur la case qui influence, puis sur celle qu’elle influence. Indiquez ensuite, en un clic, si elle l’augmente ou la diminue, et dans quelle mesure.',
    buildingDelete: 'cliquez sur n’importe quelle case ou flèche. Ou sélectionnez un élément et appuyez sur Suppr.',
    buildingDoubleClick: 'Double-cliquez sur une case pour la modifier. Faites glisser pour déplacer, dans tous les modes.',

    readingHeading: 'Lire l’image',
    readingArrowheads:
      'Une pointe de flèche **pleine** signifie augmente ; une pointe **creuse** signifie diminue. Les traits plus épais, à plus grosse pointe, sont des influences plus fortes. Aucun chiffre, et aucune dépendance à la couleur.',
    readingReciprocal: 'Un trait avec une pointe à chaque extrémité signifie que les deux s’influencent mutuellement.',
    readingShapes: 'Les cases carrées sont des processus ; les cases arrondies sont des événements ou des contextes.',
    readingColour:
      'Les flèches sont noires, sauf si vous avez marqué un lien comme aidant (vert) ou non aidant (rouge). La plupart des liens restent noirs : le marquage sert quand vous testez si quelque chose de nouveau casse une boucle.',
    readingColourMode:
      'Le bouton Sens fait plutôt afficher par la couleur les augmentations (bleu) et les diminutions (orange), pour les moments où c’est le sens de l’influence que vous cherchez à lire.',

    keyboardHeading: 'Clavier',
    keyboardTools: 'sélectionner · événement/contexte · ajouter un nœud · relier · supprimer',
    keyboardConnectFromSelection: 'Sélectionnez une case puis appuyez sur C : votre clic suivant termine le lien.',
    keyboardDelete: 'Suppr ou Retour arrière supprime la sélection.',
    keyboardEscape: 'Échap annule ce que vous êtes en train de faire. Appuyez à nouveau pour revenir à Sélection.',
    keyboardView: 'F ajuster la vue · O organiser · M cotations · G grille',
    keyboardEditing:
      'Ctrl/Cmd+Z annuler · Maj+clic pour sélectionner plusieurs éléments · Ctrl/Cmd+C et Ctrl/Cmd+V copier et coller · Ctrl/Cmd+D dupliquer',

    organiseHeading: 'Organiser',
    organiseBody:
      'Aligne les cases en lignes et en colonnes qui suivent les flèches, avec le contexte principal en tête. L’outil essaie la disposition en largeur et en hauteur, et garde celle qui tient le mieux sur votre écran. Les boucles de rétroaction sont ignorées pour déterminer l’ordre, afin qu’elles se lisent comme des boucles au lieu de brouiller la séquence.',

    mouselessHeading: 'Sans souris',
    mouselessBody:
      'La vue en liste présente toute la carte sous forme de texte, que vous pouvez parcourir avec Tab et modifier au clavier. C’est aussi ce que lit un lecteur d’écran, puisqu’une zone de dessin lui est invisible.',
    openListView: 'Ouvrir la vue en liste',

    cautionHeading: 'Une mise en garde sur l’analyse',
    cautionBody:
      'La centralité, les boucles et les leviers décrivent la carte qui a été dessinée, pas la personne. Ils supposent que l’influence est linéaire et immédiate, ce qu’elle n’est pas. C’est une façon structurée d’interroger votre propre raisonnement, et cela vaut exactement autant que les cotations à partir desquelles c’est calculé.',
  },

  about: {
    title: 'À propos',
    intro:
      'Un outil gratuit et libre pour cartographier les réseaux basés sur les processus : les relations fonctionnelles entre les processus qui entretiennent la souffrance psychologique et le bien-être.',
    groundingHeading: 'Fondements',
    groundingBody:
      'Les catégories et la façon dont cet outil conçoit les processus viennent du modèle méta-évolutionnaire étendu (EEMM) exposé dans les travaux de thérapie basée sur les processus de **Steven C. Hayes et Stefan G. Hofmann** : affect, cognition, attention, soi, motivation et comportement manifeste, situés aux niveaux biophysiologique et socioculturel, et toujours lus en contexte.',
    inspiration: 'L’idée de faire cela dans un navigateur est inspirée du site de Joseph Ciarrochi,',
    madeByHeading: 'Qui a fait cet outil',
    madeByBody:
      'Tan Kean Sian a conçu cet outil et dirigé son développement ; tout le code a été écrit avec Claude, l’assistant IA d’Anthropic. Vos questions, ou vos suggestions pour l’améliorer, sont les bienvenues à',
    dataHeading: 'Où se trouvent vos données',
    dataBody:
      'Dans votre navigateur, et nulle part ailleurs. Pas de compte, pas de serveur, pas de mesure d’audience. Effacer les données de votre navigateur supprime vos cartes : exportez ce que vous voulez conserver. Les liens de partage portent la carte à l’intérieur du lien lui-même au lieu de la déposer quelque part.',
    licence: 'Sous licence MIT. Les contributions sont bienvenues.',
  },

  error: {
    canvasTitle: 'La zone de dessin n’a pas pu démarrer',
    canvasHint:
      'Cela signifie en général que l’accélération graphique n’est pas disponible sur cette machine. Votre réseau n’est pas perdu. Ouvrez la vue en liste pour le lire et le modifier sous forme de texte, et Exporter pour le récupérer.',
    technicalDetail: 'Détail technique',
  },

  toast: {
    copied_one: '{count} case copiée. Ctrl/Cmd+V pour coller.',
    copied_other: '{count} cases copiées. Ctrl/Cmd+V pour coller.',
    pasted_one: '{count} case collée.',
    pasted_other: '{count} cases collées.',
    duplicated_one: '{count} case dupliquée.',
    duplicated_other: '{count} cases dupliquées.',
    hypothesisOn: 'Mode hypothèse activé. Tout ce que vous ajoutez maintenant est une proposition, dessinée en pointillés.',
    sharedOpened: 'Un réseau partagé a été ouvert. Il n’a pas écrasé votre travail enregistré.',
    imported: 'Importé.',
    importUnreadable: 'Impossible de lire ce fichier.',
    importNotJson: 'Ce fichier n’est pas du JSON valide.',
  },

  language: {
    title: 'Langue',
    note: 'Les traductions sont proposées par la communauté et en cours de relecture. Le vocabulaire clinique, en particulier, n’est pas encore stabilisé dans toutes les langues.',
    contribute: 'Vous avez repéré une erreur de traduction ? Les corrections sont très bienvenues à',
    draft: 'brouillon',
  },

  a11y: {
    canvas: 'Zone de dessin du réseau. Une version accessible au clavier du même contenu se trouve dans la vue en liste.',
    toolbar: 'Outils',
    scopeTabs: 'Connexions à prendre en compte',
  },
};
