import type { PartialStrings } from '../strings';

/**
 * Portuguese (Brazil) (Português (Brasil)).
 *
 * Terminology to check first: the EEMM dimensions follow the Brazilian PBT/ACT
 * convention (afeto, cognição, atenção, self, motivação, comportamento
 * manifesto; níveis biofisiológico e sociocultural), with `self` kept
 * untranslated as Brazilian ACT does and glossed once as "Self (eu)". The
 * systems-dynamics pair is "ciclo de reforço" / "ciclo de equilíbrio", under
 * "ciclos de retroalimentação"; "leverage" is "alavancagem". "Functional
 * assessment" is rendered "análise funcional", the term Brazilian clinicians
 * actually use, rather than the more literal "avaliação funcional". "Treatment
 * kernel" is kept as the borrowing "kernel", which has no settled Portuguese
 * equivalent. The toolbar toggle for helping/not-helping colouring is
 * "Utilidade" because "Ajuda" is already the Help button.
 */
export const pt_BR: PartialStrings = {
  meta: { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', dir: 'ltr' },

  app: {
    name: 'Ferramenta de Mapeamento de Redes Baseada em Processos',
    short: 'Mapeamento PBT',
    networkTitleLabel: 'Título da rede',
    untitledNetwork: 'Rede sem título',
  },

  tool: {
    select: 'Selecionar',
    add: 'Adicionar nó',
    connect: 'Conectar',
    delete: 'Excluir',
    event: 'Evento / contexto',
  },
  toolHint: {
    select: 'Clique para selecionar e ver a que ele se conecta. Arraste para mover.',
    add: 'Clique em qualquer ponto da tela para adicionar um nó.',
    connect: 'Clique no nó que influencia e depois naquele que é influenciado.',
    delete: 'Clique em um nó ou em uma conexão para remover.',
    start: 'Comece pelo evento ou pela situação de que se trata. Clique em qualquer lugar.',
    focused: 'Foco em uma parte da rede.',
    showEverything: 'Mostrar tudo de novo',
    pendingSource: 'Origem: {label}. Agora clique no nó que ele influencia.',
  },

  action: {
    undo: 'Desfazer',
    redo: 'Refazer',
    fit: 'Ajustar',
    organise: 'Organizar',
    clear: 'Limpar',
    grid: 'Grade',
    ratings: 'Escores',
    colourByValence: 'Utilidade',
    colourByDirection: 'Sobe/desce',
    hypothesis: 'Hipótese',
    kernel: 'Kernels',
    analyse: 'Análise',
    snapshots: 'Momentos',
    import: 'Importar',
    export: 'Exportar',
    share: 'Compartilhar',
    help: 'Ajuda',
    about: 'Sobre',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    templates: 'Modelos',
    guided: 'Modo guiado',
    cancel: 'Cancelar',
    save: 'Salvar',
    add: 'Adicionar',
    update: 'Atualizar',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Avançar',
    finish: 'Concluir',
    restore: 'Restaurar',
    tryAgain: 'Tentar de novo',
    copy: 'Copiar link',
    copied: 'Copiado',
    language: 'Idioma',
  },

  tooltip: {
    undo: 'Desfazer (Ctrl/Cmd+Z)',
    redo: 'Refazer (Ctrl/Cmd+Y)',
    fit: 'Ajustar tudo à tela (F)',
    organise: 'Alinhar as caixas em linhas e colunas que seguem as setas (O)',
    clear: 'Remover tudo',
    grid: 'Mostrar uma grade e alinhar as caixas a ela (G)',
    ratings: 'Mostrar em cada caixa os escores de sofrimento (S) e de frequência (F) (M)',
    colourIsDirection:
      'No momento a cor das setas mostra aumentos (azul) e reduções (laranja). Clique para colorir conforme a conexão ajuda ou não.',
    colourIsValence:
      'No momento a cor das setas mostra se a conexão ajuda. Clique para colorir por aumentos e reduções.',
    addEvent: 'Adicionar um evento ou contexto',
    addProcess: 'Adicionar um processo',
    hypothesis: 'Acrescente algo que você está considerando e veja o que mudaria (H)',
    kernel: 'Kernels de tratamento (em desenvolvimento)',
    analyse: 'Centralidade, ciclos de retroalimentação, caminhos e alavancagem',
    snapshots: 'Salvar este mapa como um momento e comparar depois',
    import: 'Carregar um arquivo salvo',
    export: 'Salvar como imagem, PDF, JSON ou CSV',
    share: 'Obter um link para este mapa',
    help: 'Como usar',
    templates: 'Começar por um exemplo',
    guided: 'Construção passo a passo',
    themeToLight: 'Mudar para o tema claro',
    themeToDark: 'Mudar para o tema escuro',
    language: 'Mudar o idioma da interface',
    toolWithKey: '{tool} (tecla {key})',
    deleteKeyHint: 'D, ou Delete/Backspace para remover o que está selecionado',
    closePanel: 'Fechar o painel',
    closeDialog: 'Fechar a janela',
    closeGuide: 'Fechar o guia',
  },

  privacy: {
    localOnly: 'Tudo fica neste dispositivo',
    localOnlyLong:
      'Seu mapa é salvo neste navegador e nunca é enviado a lugar nenhum. Pode fechar a aba sem risco. Limpar os dados do navegador vai apagá-lo, então exporte o que quiser guardar.',
    studyMode: 'Modo pesquisa',
    studyModeLong:
      'Você está participando de um estudo de pesquisa. Seu mapa e a ordem em que você o construiu são salvos no servidor do estudo.',
    autosaveUnavailable: 'Salvamento automático indisponível — exporte para não perder seu trabalho',
    autosaveUnavailableLong:
      'Este navegador não está deixando a página salvar nada, o que costuma acontecer quando um arquivo HTML é aberto direto do disco, ou em uma janela anônima. Seu trabalho continua privado, mas será perdido quando você fechar a aba. Use Exportar para guardá-lo.',
  },

  panel: {
    analysis: 'Análise',
    snapshots: 'Momentos',
    listView: 'Visão em lista',
  },

  nodeEditor: {
    newEvent: 'Novo evento ou contexto',
    newNode: 'Novo nó',
    edit: 'Editar nó',
    name: 'Nome',
    namePlaceholder: 'Nas palavras da própria pessoa',
    category: 'Categoria',
    ratingsDisclosure: 'Escores e anotações (opcional)',
    ratingsNote:
      'Usados em protocolos de pesquisa para comparar redes entre pessoas e ao longo do tempo. Não são necessários no mapeamento clínico do dia a dia.',
    severity: 'Quanto sofrimento causa (0–10)',
    frequency: 'Com que frequência (0–10)',
    notes: 'Anotações',
    notRated: 'Sem escore',
    severityShort: 'S',
    frequencyShort: 'F',
    rate: 'Avaliar',
    clearRating: 'Limpar',
  },

  edgeEditor: {
    title: 'Como um afeta o outro?',
    sentenceIncreases: '{source} aumenta {target}',
    sentenceDecreases: '{source} diminui {target}',
    increasesIt: 'Aumenta',
    decreasesIt: 'Diminui',
    altDirection: 'Esses dois também se influenciam no sentido contrário.',
    editAlt: 'Editar {source} → {target}',
    removeLink: 'Remover conexão',
    addLink: 'Adicionar conexão',
    helpingDisclosure: 'Esta conexão está ajudando?',
    helpingNote:
      'Nenhum processo é útil ou prejudicial por si só; depende daquilo a que ele se liga, e é por isso que a pergunta aparece aqui e não na hora de nomear a caixa. Marcar as conexões é o que permite ao painel de Análise dizer qual mudança ajudaria, e não apenas qual se espalharia mais longe. Deixe como está se você não for usar isso.',
  },

  category: {
    uncategorised: {
      label: 'Sem categoria',
      prefix: '',
      hint: 'Ainda não classificado. Tudo bem deixar assim enquanto você ainda está pensando.',
    },
    affect: {
      label: 'Afeto',
      prefix: 'Afeto',
      hint: 'Emoções e sentimentos. Evitá-los, ou ter disposição para senti-los.',
    },
    cognition: {
      label: 'Cognição',
      prefix: 'Cognição',
      hint: 'Pensamentos, crenças, regras, ruminação, desfusão.',
    },
    attention: {
      label: 'Atenção',
      prefix: 'Atenção',
      hint: 'O que está sendo notado e o que não está. Foco flexível ou estreito.',
    },
    self: {
      label: 'Self (eu)',
      prefix: 'Self',
      hint: 'Autoconceito, identidade, autocrítica, self como contexto.',
    },
    motivation: {
      label: 'Motivação',
      prefix: 'Motivação',
      hint: 'Valores, objetivos, aquilo de que a pessoa se aproxima ou se afasta.',
    },
    overtBehaviour: {
      label: 'Comportamento manifesto',
      prefix: 'Comportamento',
      hint: 'Ação observável. O que a pessoa de fato faz.',
    },
    biophysiological: {
      label: 'Biofisiológico',
      prefix: 'Biofisiológico',
      hint: 'Sono, dor, doença, medicação, ativação, fisiologia.',
    },
    sociocultural: {
      label: 'Sociocultural',
      prefix: 'Sociocultural',
      hint: 'Relações, família, cultura, apoio ou pressão social.',
    },
    context: {
      label: 'Contexto / evento',
      prefix: 'Evento',
      hint: 'Uma situação ou um evento, não algo que a pessoa faz. Desenhado com cantos arredondados.',
    },
  },
  categoryGroup: {
    dimension: 'Dimensões psicológicas',
    level: 'Níveis',
    other: 'Contexto e não classificados',
  },

  strength: {
    1: 'Um pouco',
    2: 'Moderadamente',
    3: 'Muito',
  },

  valence: {
    neutral: 'Não avaliado',
    helpful: 'Ajuda',
    unhelpful: 'Não ajuda',
  },

  trial: {
    proposed: 'Em consideração',
    adopted: 'Testado, e ajudou',
    ruledOut: 'Testado, não ajudou',
    proposedHint:
      'Ainda é uma ideia. Desenhado tracejado e deixado de fora da linha de base com que a comparação é feita.',
    adoptedHint: 'Funcionou. Passa a fazer parte do mapa e é desenhado como todo o resto.',
    ruledOutHint: 'Não funcionou. Continua no mapa, mas esmaecido, para você ver o que já foi tentado.',
    dialogTitle: 'O que aconteceu com isso?',
    legend: 'Em que ponto isso está?',
    lastRecorded: 'Registrado pela última vez {when}',
    notATrial: 'Não é um teste — torne isto uma parte comum do mapa',
  },

  analysis: {
    title: 'Análise',
    summary: 'O que esta rede mostra',
    central: 'Mais conectados',
    loops: 'Ciclos de retroalimentação',
    leverage: 'Onde a mudança pode se espalhar mais',
    paths: 'Traçar um caminho',
    whatIf: 'E se',
    empty: 'Adicione nós e conexões para ver uma análise.',

    stats: '{nodes} nós · {edges} conexões · densidade {density}',

    scopeAll: 'Todas as conexões',
    scopeUnhelpful: 'Desadaptativas',
    scopeHelpful: 'Adaptativas',
    centralNote:
      'A força soma quanta influência entra e quanta sai. É a medida de centralidade com mais respaldo para escolher alvos de tratamento, mas um nó central não é automaticamente o certo para se trabalhar.',
    scopeUnhelpfulNote:
      'Contando apenas as setas que você marcou como não ajudando. Uma pontuação alta aqui indica um processo que sustenta o problema.',
    scopeHelpfulNote:
      'Contando apenas as setas que você marcou como ajudando. Uma pontuação alta aqui é algo que a pessoa já tem a seu favor — muitas vezes vale mais ampliar isso do que acrescentar algo novo.',
    excludedNote_one:
      '{count} conexão sem avaliação fica de fora dos dois recortes, então eles não vão bater com os números do conjunto.',
    excludedNote_other:
      '{count} conexões sem avaliação ficam de fora dos dois recortes, então eles não vão bater com os números do conjunto.',
    noneMarkedHelpful:
      'Nada foi marcado como ajudando ainda. Abra uma conexão e defina se ela ajuda para preencher isto.',
    noneMarkedUnhelpful:
      'Nada foi marcado como não ajudando ainda. Abra uma conexão e defina se ela ajuda para preencher isto.',

    colNode: 'Nó',
    colIn: 'Entra',
    colOut: 'Sai',
    colStrength: 'Força',
    colNetOutward: 'Saldo de saída',
    chipEntryPoint: 'ponto de entrada',
    chipEndpoint: 'ponto final',
    chipUnconnected: 'sem conexões',
    chipNothingHelping: 'nada ajudando',
    chipNothingUnhelpful: 'nada atrapalhando',

    reinforcing: 'Reforço',
    balancing: 'Equilíbrio',
    reinforcingHelp:
      'Autossustentável. Um aumento em qualquer ponto do ciclo volta como um novo aumento, e é por isso que o problema continua depois que o gatilho já passou.',
    balancingHelp: 'Autocorretivo. Algo neste ciclo empurra de volta, o que em geral indica um freio natural.',
    noLoops: 'Nenhum ciclo encontrado.',
    manyLoops: 'Esta rede tem muitos ciclos. Só os mais fortes estão listados.',
    loopSteps_one: '{count} passo, ganho {gain}',
    loopSteps_other: '{count} passos, ganho {gain}',

    heuristicWarning:
      'Estes números descrevem o mapa que você desenhou, não a pessoa. Eles supõem que a influência é linear e imediata, o que não é o caso. Use-os para pensar, nunca como previsão.',
    colIfReduced: 'Se isto fosse reduzido',
    colBenefit: 'Benefício modelado',
    colReach: 'Alcance',
    wouldAlsoSuppress: 'Também suprimiria {labels}',
    chipNoDampening: 'sem amortecimento',

    from: 'De',
    to: 'Para',
    choose: 'Escolha…',
    noRoute: 'Nenhum caminho de um até o outro.',
    routeStats_one: '{count} caminho · {up} aumentando · {down} diminuindo · saldo {net}',
    routeStats_other: '{count} caminhos · {up} aumentando · {down} diminuindo · saldo {net}',
    pathSteps_one: '{count} passo, efeito {effect}',
    pathSteps_other: '{count} passos, efeito {effect}',
    increases: 'aumenta',
    decreases: 'diminui',

    colNow: 'Agora',
    colWithThis: 'Com isto',
    rowReinforcing: 'Ciclos de reforço',
    rowBalancing: 'Ciclos de equilíbrio',
    rowAmplification: 'Amplificação modelada',
    newBrakes: 'Novos freios no sistema',
    badgeNewBalancing: 'novo equilíbrio',
    howItActs: 'Como age a cada ciclo',
    mechSelfCorrecting: 'autocorretivo',
    mechSteadyPressure: 'pressão constante',
    mechPushedHarder: 'empurrado com mais força',
    mechUntouched: 'intocado',
    pressureOn: 'sobre {labels} · precisa ser mantida',
    holdsOnItsOwn: 'se sustenta sozinho',
  },

  summary: {
    noNodes: 'Adicione alguns nós para ver uma análise.',
    noEdges: 'Nada está conectado ainda. Adicione conexões para ver como as partes se influenciam.',
    mostConnected_one:
      '**{label}** é a parte mais conectada desta rede ({inDegree} influência chegando, {outDegree} saindo). Nós centrais costumam ser onde a mudança se espalha mais, embora também possam ser os mais difíceis de mudar diretamente.',
    mostConnected_other:
      '**{label}** é a parte mais conectada desta rede ({inDegree} influências chegando, {outDegree} saindo). Nós centrais costumam ser onde a mudança se espalha mais, embora também possam ser os mais difíceis de mudar diretamente.',
    reinforcing_one:
      'Há **{count} ciclo de reforço** aqui. São ciclos autossustentáveis: continuam mesmo depois que aquilo que os começou já passou.',
    reinforcing_other:
      'Há **{count} ciclos de reforço** aqui. São ciclos autossustentáveis: continuam mesmo depois que aquilo que os começou já passou.',
    tightestLoop: ' O mais curto é {path}.',
    noReinforcing:
      'Nenhum ciclo de reforço foi encontrado. Vale perguntar se algo aqui retroalimenta a si mesmo, porque a retroalimentação costuma ser o que faz um problema persistir.',
    balancing_one:
      '{count} ciclo de equilíbrio encontrado. São autocorretivos e muitas vezes marcam onde a pessoa já tem algum freio natural sobre o problema.',
    balancing_other:
      '{count} ciclos de equilíbrio encontrados. São autocorretivos e muitas vezes marcam onde a pessoa já tem algum freio natural sobre o problema.',
    sources_one:
      '{labels} influencia outros, mas nada na rede o influencia de volta. Pontos de entrada como esse às vezes são o lugar mais tratável para começar.',
    sources_other:
      '{labels} influenciam outros, mas nada na rede os influencia de volta. Pontos de entrada como esses às vezes são o lugar mais tratável para começar.',
    leverage_one: 'Reduzir **{label}** tem o efeito modelado mais amplo, alcançando {reach} outro nó.',
    leverage_other: 'Reduzir **{label}** tem o efeito modelado mais amplo, alcançando {reach} outros nós.',
    leverageCaveat_one:
      ' Note que isso também suprimiria {labels}, que está ligado a conexões que você marcou como ajudando.',
    leverageCaveat_other:
      ' Note que isso também suprimiria {labels}, que estão ligados a conexões que você marcou como ajudando.',
    isolated_one: '{labels} ainda não está conectado a nada.',
    isolated_other: '{labels} ainda não estão conectados a nada.',
    diverges:
      'Algumas partes desta rede amplificam sem limite quando modeladas, o que em geral significa ciclos de reforço fortes e sem amortecimento. Trate os números de alavancagem apenas como indicativos.',
    caveat:
      '_Estes números descrevem o mapa que você desenhou, não a pessoa. São uma forma estruturada de olhar para o seu próprio raciocínio, não uma previsão do que vai acontecer._',
  },

  guided: {
    ariaLabel: 'Construção guiada',
    stepOf: 'Passo {current} de {total}',
    done: 'Pronto. Siga em frente quando quiser.',
    footer:
      'Você pode sair do guia a qualquer momento e manter tudo o que construiu. Os passos são um apoio, não um formulário a preencher.',
    step1Title: '1. Comece pelo contexto',
    step1Body:
      'Use o botão Evento / contexto e acrescente a situação de que se trata: o que aconteceu, onde, com quem. Ela ganha uma caixa arredondada, porque não é algo que a pessoa está fazendo.\n\nComeçar por aqui não é formalidade. Em uma análise funcional, o mesmo pensamento ou a mesma ação significam coisas diferentes em situações diferentes, então é o contexto que torna interpretável tudo o que vem depois.',
    step1Nudge: 'Acrescente uma caixa de evento ou contexto para começar.',
    step2Title: '2. Acrescente a resposta e o que vem depois',
    step2Body:
      'Agora acrescente o que acontece por dentro (um pensamento, um sentimento ou um impulso) e o que a pessoa faz, ou o que resulta disso. Conecte-os em ordem, a partir do contexto.\n\nEssa é a contingência de três termos, a unidade a partir da qual uma análise funcional é construída. Todo o resto cresce a partir dela.',
    step2NudgeNodes: 'Acrescente mais duas caixas: a resposta interna e depois o que acontece.',
    step2NudgeEdges: 'Agora conecte-as: contexto → resposta interna → o que acontece.',
    step3Title: '3. Veja se aquilo volta em ciclo',
    step3Body:
      'Olhe para o fim da sua cadeia e pergunte: isso retroalimenta algo anterior? Dormir mal causa preocupação, mas a preocupação também faz dormir mal.\n\nA retroalimentação costuma ser a resposta para por que um problema persiste muito depois de aquilo que o começou ter passado.',
    step3Nudge: 'Nada volta em ciclo ainda. A consequência alimenta algo anterior?',
    step4Title: '4. Acrescente o que mais está envolvido',
    step4Body:
      'O que mais está enredado nisso? Acrescente um nó para qualquer coisa que seja afetada pela consequência e que também retroalimente a resposta.\n\nOs amplificadores importam aqui. O cansaço não é só mais um problema: ele faz todo o resto parecer mais ameaçador.',
    step4Nudge: 'Acrescente pelo menos mais um elemento.',
    step5Title: '5. Acrescente o que ajuda',
    step5Body:
      'Nem tudo piora as coisas. Acrescente algo que reduza um destes problemas, desenhe como uma conexão de diminuição e marque essa conexão como Ajuda.\n\nEssa costuma ser a parte que as pessoas pulam, e é onde a intervenção geralmente mora.',
    step5NudgeDecrease: 'Acrescente algo que reduza um destes, desenhado como uma conexão de diminuição.',
    step5NudgeHelpful: 'Marque essa conexão como Ajuda, para que o mapa mostre o que está funcionando.',
    step6Title: '6. Mapeie o que atrapalha',
    step6Body:
      'Agora a parte difícil. O que impede que aquilo que ajuda aconteça?\n\nÉ por isso que “é só fazer mais exercício” cai tão mal. A pessoa já sabe que ajudaria. Alguma coisa no sistema está suprimindo isso, e enquanto isso não estiver visível o conselho não tem para onde ir.',
    step6Nudge: 'Acrescente uma conexão que suprima aquilo que ajuda.',
  },

  snapshots: {
    intro:
      'Salve a rede como ela está agora e volte para desenhá-la de novo mais tarde. Nada é sobrescrito.',
    labelPlaceholder: 'Rótulo, por exemplo Avaliação inicial ou Sessão 6',
    labelAria: 'Rótulo deste momento',
    saveButton: 'Salvar momento',
    none: 'Nenhum momento salvo ainda.',
    meta: '{when} · {nodes} nós · {edges} conexões',
    deleteAria: 'Excluir o momento {label}',
    compare: 'Comparar',
    earlier: 'Anterior',
    later: 'Posterior',
    changes_one: '{count} mudança',
    changes_other: '{count} mudanças',
    downloadComparison: 'Baixar comparação (CSV)',
  },

  structure: {
    empty: 'Nada aqui ainda. Adicione um nó para começar.',
    nodes: 'Nós ({count})',
    connections: 'Conexões ({count})',
    noConnections: 'Nenhuma ainda.',
    nodeMetaDistress: ' · sofrimento {value}',
    nodeMetaFrequency: ' · frequência {value}',
    deleteNodeAria: 'Excluir o nó {label}',
    deleteEdgeAria: 'Excluir a conexão {sentence}',
  },

  templates: {
    intro:
      'Pontos de partida, não formulações. Substitua os rótulos pelas palavras da própria pessoa e apague o que não servir. Um modelo que passa sem ser questionado é pior do que uma tela em branco.',
    blankName: 'Tela em branco',
    blankDescription: 'Comece do zero.',
    abcName: 'Contingência de três termos',
    abcDescription:
      'O andaime inicial: contexto, resposta interna, consequência. Construa para fora a partir daqui.',
    worryName: 'Ciclo de preocupação e sono',
    worryDescription: 'Um exemplo trabalhado. Útil para mostrar como é um ciclo de reforço.',
    moodName: 'Humor deprimido e retraimento',
    moodDescription:
      'Um padrão comum de ativação comportamental. Coloque nas palavras da própria pessoa antes de usar.',
    painName: 'Dor crônica e esquiva',
    painDescription:
      'Um padrão de medo-evitação, com o ciclo de descondicionamento que costuma mantê-lo.',
  },

  templateNodes: {
    abcTrigger: 'Gatilho ou situação',
    abcThought: 'Pensamento ou sentimento',
    abcAction: 'O que eu faço',

    worryCriticism: 'Crítica no trabalho',
    worryJobSecurity: 'Preocupação com a estabilidade no emprego',
    worrySleep: 'Dificuldade para dormir',
    worryFatigue: 'Cansaço',
    worryExercise: 'Exercício físico',
    worryWithdrawal: 'Retraimento social',

    moodLow: 'Humor deprimido',
    moodStayingHome: 'Ficar em casa',
    moodFewerThings: 'Menos coisas que importam para mim',
    moodBurden: 'Sou um peso para os outros',
    moodContact: 'Contato com os amigos',
    moodNoticing: 'Perceber os pequenos bons momentos',

    painPain: 'Dor',
    painFear: 'Medo de piorar',
    painAvoiding: 'Evitar atividades',
    painDeconditioning: 'Descondicionamento',
    painDoingAnyway: 'Fazer o que importa mesmo assim',
    painWillingness: 'Disposição para sentir desconforto',
  },

  templateNote:
    'Isto é um ponto de partida, não uma formulação. Substitua os rótulos pelas palavras da própria pessoa.',

  exportDialog: {
    intro:
      'Os formatos CSV carregam direto no R ou no Python. A matriz de adjacência é o que qgraph, igraph e networkx esperam como entrada.',
    json: 'Rede (JSON)',
    edges: 'Lista de arestas (CSV)',
    nodes: 'Lista de nós (CSV)',
    matrix: 'Matriz de adjacência (CSV)',
    report: 'Relatório da análise (Markdown)',
    events: 'Registro de construção (CSV)',
    png: 'Imagem (PNG)',
    svg: 'Vetor (SVG)',
    print: 'Imprimir / PDF',
  },

  share: {
    title: 'Link de compartilhamento',
    intro:
      'A rede inteira está codificada no próprio link. Não existe cópia em servidor, e a parte que carrega o seu conteúdo nunca é enviada na requisição, então nada fica armazenado ou registrado em lugar nenhum. Qualquer pessoa com o link pode abrir e editar a própria cópia.',
    building: 'Gerando o link…',
    tooLong:
      'Esta rede é grande demais para um link ({length} caracteres). Exporte como JSON e envie o arquivo.',
  },

  clearDialog: {
    title: 'Limpar esta rede?',
    body: 'Isso remove todos os {nodes} nós e as {edges} conexões. Dá para desfazer, e os momentos salvos são mantidos.',
    confirm: 'Limpar tudo',
  },

  kernel: {
    title: 'Kernels de tratamento',
    warning: 'Em desenvolvimento. Ainda não há nada por trás deste botão.',
    p1: 'O plano é ter um vocabulário de kernels de tratamento: as menores unidades de mudança terapêutica, em uma linguagem consistente o bastante para se ligar aos processos de um mapa. Escolha um processo e veja quais kernels são conhecidos por agir sobre ele.',
    p2: 'A parte difícil é decidir o que conta como um kernel e o quão fino deve ser esse recorte, e isso ainda não está resolvido.',
    p3: 'Se você tiver ideias sobre como este banco de dados deveria ser organizado, Kean gostaria de ouvi-las:',
  },

  help: {
    title: 'Como usar',
    buildingHeading: 'Construindo um mapa',
    buildingEvent:
      'a situação de que se trata. Comece por aqui; em uma tela vazia, qualquer clique cria um. Ganha uma caixa arredondada, porque não é algo que a pessoa está fazendo.',
    buildingAdd:
      'um processo: um pensamento, um sentimento, um impulso ou uma ação. Caixa quadrada, colorida conforme a sua categoria do EEMM.',
    buildingConnect:
      'clique na caixa que influencia e depois naquela que é influenciada. Em seguida escolha, em um clique, se ela aumenta ou diminui a outra e o quanto.',
    buildingDelete: 'clique em qualquer caixa ou seta. Ou selecione algo e aperte Delete.',
    buildingDoubleClick: 'Dê um clique duplo em uma caixa para editá-la. Arraste para mover, em qualquer modo.',

    readingHeading: 'Lendo a figura',
    readingArrowheads:
      'Uma ponta de seta **preenchida** significa que aumenta; uma **vazada** significa que diminui. Linhas mais grossas, com pontas maiores, são influências mais fortes. Sem números e sem depender de cor.',
    readingReciprocal: 'Uma linha com ponta nas duas extremidades significa que os dois se influenciam.',
    readingShapes: 'Caixas quadradas são processos; caixas arredondadas são eventos ou contextos.',
    readingColour:
      'As setas são pretas, a não ser que você tenha marcado uma conexão como ajudando (verde) ou como não ajudando (vermelho). A maioria continua preta: a marcação existe para quando você está testando se algo novo quebra um ciclo.',
    readingColourMode:
      'O botão Sobe/desce troca a cor das setas para mostrar aumentos (azul) e reduções (laranja), para quando o que você quer ler é a direção da influência.',

    keyboardHeading: 'Teclado',
    keyboardTools: 'selecionar · evento/contexto · adicionar nó · conectar · excluir',
    keyboardConnectFromSelection: 'Selecione uma caixa, aperte C e o seu próximo clique fecha a conexão.',
    keyboardDelete: 'Delete ou Backspace remove o que está selecionado.',
    keyboardEscape: 'Esc cancela o que você está fazendo. Aperte de novo para voltar a Selecionar.',
    keyboardView: 'F ajustar à tela · O organizar · M escores · G grade',
    keyboardEditing:
      'Ctrl/Cmd+Z desfazer · Shift+clique para selecionar vários · Ctrl/Cmd+C e Ctrl/Cmd+V copiar e colar · Ctrl/Cmd+D duplicar',

    organiseHeading: 'Organizar',
    organiseBody:
      'Alinha as caixas em linhas e colunas que seguem as setas, com o contexto principal na ponta inicial. Testa o arranjo tanto na horizontal quanto na vertical e mantém o que couber melhor na sua tela. Os ciclos de retroalimentação são ignorados na hora de decidir a ordem, para que se leiam como ciclos em vez de embaralhar a sequência.',

    mouselessHeading: 'Sem mouse',
    mouselessBody:
      'A visão em lista mostra o mapa inteiro como texto, que você percorre com Tab e edita pelo teclado. É também o que um leitor de tela lê, já que uma tela de desenho é invisível para ele.',
    openListView: 'Abrir a visão em lista',

    cautionHeading: 'Uma ressalva sobre a análise',
    cautionBody:
      'Centralidade, ciclos e alavancagem descrevem o mapa que foi desenhado, não a pessoa. Eles supõem que a influência é linear e imediata, o que não é o caso. São uma forma estruturada de interrogar o seu próprio raciocínio, e valem exatamente o quanto valem os escores a partir dos quais foram calculados.',
  },

  about: {
    title: 'Sobre',
    intro:
      'Uma ferramenta gratuita e de código aberto para mapear redes baseadas em processos: as relações funcionais entre os processos que mantêm o sofrimento e o bem-estar psicológicos.',
    groundingHeading: 'Fundamentação',
    groundingBody:
      'As categorias e o modo como esta ferramenta pensa os processos vêm do Meta-Modelo Evolucionário Estendido (EEMM) formulado no trabalho de terapia baseada em processos de **Steven C. Hayes e Stefan G. Hofmann**: afeto, cognição, atenção, self, motivação e comportamento manifesto, situados nos níveis biofisiológico e sociocultural, e sempre lidos em contexto.',
    inspiration: 'A ideia de fazer isto no navegador foi inspirada pelo trabalho de Joseph Ciarrochi:',
    madeByHeading: 'Quem fez isto',
    madeByBody:
      'Tan Kean Sian concebeu esta ferramenta e dirigiu o seu desenvolvimento; todo o código foi escrito com o Claude, o assistente de IA da Anthropic. Dúvidas, ou sugestões para melhorá-la, são bem-vindas em',
    dataHeading: 'Onde ficam os seus dados',
    dataBody:
      'No seu navegador, e em nenhum outro lugar. Sem conta, sem servidor, sem análise de uso. Limpar os dados do navegador apaga os seus mapas, então exporte o que quiser guardar. Os links de compartilhamento levam o mapa dentro do próprio link, em vez de enviá-lo para algum lugar.',
    licence: 'Licenciado sob MIT. Contribuições são bem-vindas.',
  },

  error: {
    canvasTitle: 'A tela de desenho não pôde ser iniciada',
    canvasHint:
      'Isso normalmente significa que a aceleração gráfica não está disponível nesta máquina. Sua rede está segura. Abra a visão em lista para lê-la e editá-la como texto, e use Exportar para tirá-la daqui.',
    technicalDetail: 'Detalhe técnico',
  },

  toast: {
    copied_one: '{count} caixa copiada. Ctrl/Cmd+V para colar.',
    copied_other: '{count} caixas copiadas. Ctrl/Cmd+V para colar.',
    pasted_one: '{count} caixa colada.',
    pasted_other: '{count} caixas coladas.',
    duplicated_one: '{count} caixa duplicada.',
    duplicated_other: '{count} caixas duplicadas.',
    hypothesisOn: 'Modo hipótese ligado. Tudo o que você acrescentar agora é uma proposta, desenhada tracejada.',
    sharedOpened: 'Uma rede compartilhada foi aberta. Ela não sobrescreveu o seu trabalho salvo.',
    imported: 'Importado.',
    importUnreadable: 'Não foi possível ler esse arquivo.',
    importNotJson: 'Esse arquivo não é um JSON válido.',
  },

  language: {
    title: 'Idioma',
    note: 'As traduções são contribuições da comunidade e estão em revisão. O vocabulário clínico, em especial, pode ainda não estar consolidado em todos os idiomas.',
    contribute: 'Encontrou um erro de tradução? Correções são muito bem-vindas em',
    draft: 'rascunho',
  },

  a11y: {
    canvas: 'Tela da rede. Uma versão do mesmo conteúdo acessível por teclado está na visão em lista.',
    toolbar: 'Ferramentas',
    scopeTabs: 'Quais conexões contar',
  },
};
