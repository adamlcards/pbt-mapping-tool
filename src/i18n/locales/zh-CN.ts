import type { PartialStrings } from '../strings';

/**
 * Chinese (Simplified) (简体中文).
 *
 * Terminology to check first: the EEMM dimensions follow the mainland PBT/ACT
 * convention (情感 · 认知 · 注意 · 自我 · 动机 · 外显行为, over the 生物生理 and
 * 社会文化 levels), with `defusion` as 认知解离 and `self-as-context` as 以己为景 —
 * the latter is the term used in the mainland Hayes translations but is the one
 * a reviewer is most likely to want changed (观察性自我 / 背景自我 are the common
 * alternatives). The systems-dynamics pair takes the settled 《第五项修炼》
 * renderings: reinforcing = 增强回路, balancing = 调节回路. `functional assessment`
 * is 功能评估 and `three-term contingency` is 三项联系; `formulation` is rendered
 * 个案概念化, and the helping/not-helping distinction is 有帮助 / 无帮助 with the
 * analysis split labelled 适应良好 / 适应不良.
 */
export const zh_CN: PartialStrings = {
  meta: { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr' },

  app: {
    name: '基于过程的网络图绘制工具',
    short: 'PBT 绘图工具',
    networkTitleLabel: '网络标题',
    untitledNetwork: '未命名网络',
  },

  tool: {
    select: '选择',
    add: '添加节点',
    connect: '连接',
    delete: '删除',
    event: '事件／情境',
  },
  toolHint: {
    select: '点击选中，看它与哪些节点相连。拖动可移动位置。',
    add: '在画布上任意位置点击即可添加节点。',
    connect: '先点击施加影响的节点，再点击被它影响的节点。',
    delete: '点击节点或连接即可删除。',
    start: '先放上这件事所关于的事件或情境。在任意位置点击。',
    focused: '当前只显示网络的一部分。',
    showEverything: '重新显示全部',
    pendingSource: '起点：{label}。现在点击它所影响的节点。',
  },

  action: {
    undo: '撤销',
    redo: '重做',
    fit: '全览',
    organise: '整理',
    clear: '清空',
    grid: '网格',
    ratings: '评分',
    colourByValence: '助益',
    colourByDirection: '增减',
    hypothesis: '假设',
    kernel: '内核',
    analyse: '分析',
    snapshots: '时间点',
    import: '导入',
    export: '导出',
    share: '分享链接',
    help: '帮助',
    about: '关于',
    themeLight: '浅色',
    themeDark: '深色',
    templates: '模板',
    guided: '引导构建',
    cancel: '取消',
    save: '保存',
    add: '添加',
    update: '更新',
    close: '关闭',
    back: '上一步',
    next: '下一步',
    finish: '完成',
    restore: '恢复',
    tryAgain: '重试',
    copy: '复制链接',
    copied: '已复制',
    language: '语言',
  },

  tooltip: {
    undo: '撤销（Ctrl/Cmd+Z）',
    redo: '重做（Ctrl/Cmd+Y）',
    fit: '让全部内容适应屏幕（F）',
    organise: '把方框沿箭头方向对齐成行与列（O）',
    clear: '删除全部内容',
    grid: '显示网格，并让方框对齐网格（G）',
    ratings: '在每个方框上标出困扰程度（S）与频率（F）评分（M）',
    colourIsDirection:
      '箭头颜色当前表示增加（蓝色）与减少（橙色）。点击改为按这条连接是否有帮助来着色。',
    colourIsValence:
      '箭头颜色当前表示这条连接是否有帮助。点击改为按增加与减少来着色。',
    addEvent: '添加事件或情境',
    addProcess: '添加一个过程',
    hypothesis: '加入一个你正在考虑的做法，看看它会带来什么改变（H）',
    kernel: '治疗内核（开发中）',
    analyse: '中心性、反馈回路、路径与杠杆点',
    snapshots: '把当前这张图保存为一个时间点，之后可以对比',
    import: '载入已保存的文件',
    export: '保存为图片、PDF、JSON 或 CSV',
    share: '获取这张图的链接',
    help: '使用说明',
    templates: '从示例开始',
    guided: '分步构建',
    themeToLight: '切换到浅色主题',
    themeToDark: '切换到深色主题',
    language: '更改界面语言',
    toolWithKey: '{tool}（{key}）',
    deleteKeyHint: 'D，或用 Delete/Backspace 删除已选中的内容',
    closePanel: '关闭面板',
    closeDialog: '关闭对话框',
    closeGuide: '关闭引导',
  },

  privacy: {
    localOnly: '所有内容都留在本机',
    localOnlyLong:
      '你的图保存在这个浏览器里，不会发送到任何地方。关闭标签页是安全的。清除浏览器数据会把它删掉，所以想保留的内容请先导出。',
    studyMode: '研究模式',
    studyModeLong:
      '你正在参与一项研究。你的图，以及你构建它的先后顺序，都会保存到研究服务器。',
    autosaveUnavailable: '无法自动保存 — 请导出以保留你的工作',
    autosaveUnavailableLong:
      '这个浏览器不允许页面保存任何内容，通常发生在直接从磁盘打开 HTML 文件、或使用隐私窗口的时候。你的工作仍然是私密的，但关闭标签页后就会丢失。请用“导出”把它保留下来。',
  },

  panel: {
    analysis: '分析',
    snapshots: '时间点',
    listView: '列表视图',
  },

  nodeEditor: {
    newEvent: '新建事件或情境',
    newNode: '新建节点',
    edit: '编辑节点',
    name: '名称',
    namePlaceholder: '用来访者自己的话',
    category: '类别',
    ratingsDisclosure: '评分与备注（可选）',
    ratingsNote:
      '研究方案中用它来跨个体、跨时间比较网络。日常临床绘图并不需要。',
    severity: '困扰程度（0–10）',
    frequency: '出现频率（0–10）',
    notes: '备注',
    notRated: '未评分',
    severityShort: '困',
    frequencyShort: '频',
    rate: '评分',
    clearRating: '清除',
  },

  edgeEditor: {
    title: '它是怎样影响另一个的？',
    sentenceIncreases: '{source} 使 {target} 增加',
    sentenceDecreases: '{source} 使 {target} 减少',
    increasesIt: '使它增加',
    decreasesIt: '使它减少',
    altDirection: '这两者在反方向上也互相影响。',
    editAlt: '编辑 {source} → {target}',
    removeLink: '删除连接',
    addLink: '添加连接',
    helpingDisclosure: '这条连接有帮助吗？',
    helpingNote:
      '没有哪个过程本身就是有益或有害的，这取决于它连着什么——所以这个问题放在这里问，而不是在你给方框命名的时候问。只有标注了连接，分析面板才能说出哪种改变会带来好处，而不只是哪种改变传播得最广。如果用不到这一点，可以不管它。',
  },

  category: {
    uncategorised: {
      label: '未分类',
      prefix: '',
      hint: '尚未归类。还在思考的时候，先放着也没关系。',
    },
    affect: {
      label: '情感',
      prefix: '情感',
      hint: '情绪与感受。回避它们，或者愿意去体验它们。',
    },
    cognition: {
      label: '认知',
      prefix: '认知',
      hint: '想法、信念、规则、反刍、认知解离。',
    },
    attention: {
      label: '注意',
      prefix: '注意',
      hint: '什么被注意到了，什么没有。注意是灵活的还是狭窄的。',
    },
    self: {
      label: '自我',
      prefix: '自我',
      hint: '自我概念、身份认同、自我批评、以己为景。',
    },
    motivation: {
      label: '动机',
      prefix: '动机',
      hint: '价值、目标，这个人在朝什么靠近、又在远离什么。',
    },
    overtBehaviour: {
      label: '外显行为',
      prefix: '外显行为',
      hint: '可观察到的行动。这个人实际上做了什么。',
    },
    biophysiological: {
      label: '生物生理',
      prefix: '生物生理',
      hint: '睡眠、疼痛、疾病、药物、唤醒水平、生理状态。',
    },
    sociocultural: {
      label: '社会文化',
      prefix: '社会文化',
      hint: '人际关系、家庭、文化、社会支持或社会压力。',
    },
    context: {
      label: '情境／事件',
      prefix: '事件',
      hint: '一个情境或事件，而不是这个人所做的事。用圆角方框绘制。',
    },
  },
  categoryGroup: {
    dimension: '心理维度',
    level: '层面',
    other: '情境与未分类',
  },

  strength: {
    1: '轻微',
    2: '中等',
    3: '强烈',
  },

  valence: {
    neutral: '未判定',
    helpful: '有帮助',
    unhelpful: '无帮助',
  },

  trial: {
    proposed: '正在考虑',
    adopted: '试过，有帮助',
    ruledOut: '试过，没帮助',
    proposedHint:
      '还只是个想法。用虚线绘制，也不计入用来对照的基线。',
    adoptedHint: '奏效了。它会成为图的一部分，和其他内容一样绘制。',
    ruledOutHint: '没有奏效。保留但淡化显示，这样能看到已经试过什么。',
    dialogTitle: '这个后来怎么样了？',
    legend: '进展到哪一步了？',
    lastRecorded: '最近记录于 {when}',
    notATrial: '这根本不是一次尝试 — 把它变成图中普通的一部分',
  },

  analysis: {
    title: '分析',
    summary: '这个网络说明了什么',
    central: '连接最多的节点',
    loops: '反馈回路',
    leverage: '改变可能传播最远的地方',
    paths: '追踪一条路径',
    whatIf: '假如',
    empty: '添加节点和连接后即可看到分析。',

    stats: '{nodes} 个节点 · {edges} 条连接 · 密度 {density}',

    scopeAll: '全部连接',
    scopeUnhelpful: '适应不良',
    scopeHelpful: '适应良好',
    centralNote:
      '强度统计的是流入和流出的影响量。在挑选治疗靶点方面，它是证据支持最多的中心性指标，但中心节点并不自动就是该去推动的那一个。',
    scopeUnhelpfulNote:
      '只统计你标记为无帮助的箭头。在这里得分高的过程，正是把问题维系在一起的过程。',
    scopeHelpfulNote:
      '只统计你标记为有帮助的箭头。在这里得分高的，是这个人本来就具备的资源 — 往往值得在它上面继续扩展，而不是另外添一样新东西。',
    excludedNote_one:
      '有 {count} 条未判定的连接不计入这两个分组，因此它们相加不会等于合并后的数字。',
    excludedNote_other:
      '有 {count} 条未判定的连接不计入这两个分组，因此它们相加不会等于合并后的数字。',
    noneMarkedHelpful: '目前还没有任何连接被标记为有帮助。打开一条连接、设置它是否有帮助，这里就会有内容。',
    noneMarkedUnhelpful:
      '目前还没有任何连接被标记为无帮助。打开一条连接、设置它是否有帮助，这里就会有内容。',

    colNode: '节点',
    colIn: '流入',
    colOut: '流出',
    colStrength: '强度',
    colNetOutward: '净输出',
    chipEntryPoint: '入口',
    chipEndpoint: '终点',
    chipUnconnected: '未连接',
    chipNothingHelping: '无有益连接',
    chipNothingUnhelpful: '无有害连接',

    reinforcing: '增强回路',
    balancing: '调节回路',
    reinforcingHelp:
      '自我维持。回路上任何一处的增加，绕一圈回来会变成进一步的增加——这就是诱因过去之后问题仍然持续的原因。',
    balancingHelp: '自我校正。这个回路里有东西在往回推，通常意味着一个天然的刹车。',
    noLoops: '未找到回路。',
    manyLoops: '这个网络的回路很多，只列出其中最强的。',
    loopSteps_one: '{count} 步，增益 {gain}',
    loopSteps_other: '{count} 步，增益 {gain}',

    heuristicWarning:
      '这些数字描述的是你画出的图，而不是这个人本身。它们假设影响是线性且即时的，而事实并非如此。把它们当作思考的工具，绝不要当作预测。',
    colIfReduced: '若减弱它',
    colBenefit: '模型预估收益',
    colReach: '波及范围',
    wouldAlsoSuppress: '同时也会压低 {labels}',
    chipNoDampening: '无衰减',

    from: '从',
    to: '到',
    choose: '请选择…',
    noRoute: '两者之间没有通路。',
    routeStats_one: '{count} 条路径 · {up} 条增强 · {down} 条减弱 · 净效应 {net}',
    routeStats_other: '{count} 条路径 · {up} 条增强 · {down} 条减弱 · 净效应 {net}',
    pathSteps_one: '{count} 步，效应 {effect}',
    pathSteps_other: '{count} 步，效应 {effect}',
    increases: '增加',
    decreases: '减少',

    colNow: '当前',
    colWithThis: '加入后',
    rowReinforcing: '增强回路',
    rowBalancing: '调节回路',
    rowAmplification: '模型预估放大程度',
    newBrakes: '系统新增的刹车',
    badgeNewBalancing: '新增调节',
    howItActs: '每一轮循环中如何起作用',
    mechSelfCorrecting: '自我校正',
    mechSteadyPressure: '持续施压',
    mechPushedHarder: '被推得更强',
    mechUntouched: '未被触及',
    pressureOn: '作用于 {labels} · 需要持续维持',
    holdsOnItsOwn: '能够自行维持',
  },

  summary: {
    noNodes: '添加一些节点后即可看到分析。',
    noEdges: '目前还没有任何连接。添加连接，看看各部分之间如何互相影响。',
    mostConnected_one:
      '**{label}** 是这个网络中连接最多的部分（{inDegree} 条影响流入，{outDegree} 条流出）。中心节点往往是改变传播最广的地方，不过它们也可能最难直接撼动。',
    mostConnected_other:
      '**{label}** 是这个网络中连接最多的部分（{inDegree} 条影响流入，{outDegree} 条流出）。中心节点往往是改变传播最广的地方，不过它们也可能最难直接撼动。',
    reinforcing_one:
      '这里有 **{count} 个增强回路**。它们是自我维持的循环：即使最初引发它们的事情早已过去，它们仍会继续运转。',
    reinforcing_other:
      '这里有 **{count} 个增强回路**。它们是自我维持的循环：即使最初引发它们的事情早已过去，它们仍会继续运转。',
    tightestLoop: '其中最紧凑的是 {path}。',
    noReinforcing:
      '没有找到增强回路。值得问一问，这里有没有什么会反过来作用于自身——让问题持续下去的，往往正是反馈。',
    balancing_one:
      '找到 {count} 个调节回路。它们是自我校正的，往往标示出这个人对问题本来就有的某种天然刹车。',
    balancing_other:
      '找到 {count} 个调节回路。它们是自我校正的，往往标示出这个人对问题本来就有的某种天然刹车。',
    sources_one:
      '{labels} 影响着其他部分，但网络中没有任何东西反过来影响它。像这样的入口，有时是最容易着手的起点。',
    sources_other:
      '{labels} 影响着其他部分，但网络中没有任何东西反过来影响它们。像这样的入口，有时是最容易着手的起点。',
    leverage_one: '减弱 **{label}**，在模型中影响范围最广，可以波及 {reach} 个其他节点。',
    leverage_other: '减弱 **{label}**，在模型中影响范围最广，可以波及 {reach} 个其他节点。',
    leverageCaveat_one:
      '要注意，它同时也会压低 {labels}，而那与你标记为有帮助的连接相关。',
    leverageCaveat_other:
      '要注意，它同时也会压低 {labels}，而那些与你标记为有帮助的连接相关。',
    isolated_one: '{labels} 还没有和任何东西连接。',
    isolated_other: '{labels} 还没有和任何东西连接。',
    diverges:
      '这个网络的某些部分在建模时会无限放大，通常意味着存在没有衰减的强增强回路。杠杆点的数字只能当作参考。',
    caveat:
      '_这些数字描述的是你画出的图，而不是这个人本身。它们是一种结构化地审视你自己思路的方式，而不是对将会发生什么的预测。_',
  },

  guided: {
    ariaLabel: '引导式构建',
    stepOf: '第 {current} 步，共 {total} 步',
    done: '完成。准备好了就继续。',
    footer:
      '你可以随时退出引导，已经构建的内容都会保留。这些步骤是脚手架，不是必须填完的表格。',
    step1Title: '1. 从情境开始',
    step1Body:
      '用“事件／情境”按钮，添加这件事所关于的情境：发生了什么、在哪里、和谁在一起。它会是一个圆角方框，因为它不是这个人所做的事。\n\n从这里开始不是走过场。在功能评估里，同一个想法或同一个行动，在不同情境中含义并不相同——是情境让后面的一切变得可以解读。',
    step1Nudge: '先添加一个事件或情境方框。',
    step2Title: '2. 加上反应，以及随之发生的事',
    step2Body:
      '现在添加内部发生了什么（一个想法、感受或冲动），以及这个人做了什么、结果如何。按顺序把它们连起来，从情境开始往后走。\n\n这就是三项联系，功能评估据以建立的基本单位。其余的一切都由此生长出来。',
    step2NudgeNodes: '再添加两个方框：先是内在反应，然后是随之发生的事。',
    step2NudgeEdges: '现在把它们连起来：情境 → 内在反应 → 随之发生的事。',
    step3Title: '3. 看看它会不会绕回来',
    step3Body:
      '看看这条链的末端，问一问：它会不会反过来影响前面的某个环节？睡不好会引起担忧，而担忧也会让人睡不好。\n\n一个问题在最初的诱因早已消失之后仍然持续，答案通常就在反馈里。',
    step3Nudge: '目前还没有任何回路。后果会不会反过来影响前面的环节？',
    step4Title: '4. 加上还有什么牵涉其中',
    step4Body:
      '还有什么被卷了进来？凡是既受后果影响、又会反过来影响那个反应的东西，都为它加一个节点。\n\n放大因素在这里很重要。疲惫不只是又多了一个问题，它会让其他一切都显得更有威胁。',
    step4Nudge: '至少再添加一个元素。',
    step5Title: '5. 加上有帮助的东西',
    step5Body:
      '并不是所有东西都在让情况变糟。添加一个能减轻其中某个问题的东西，把它画成一条减少的连接，并把这条连接标记为“有帮助”。\n\n这往往是人们会跳过的部分，而干预通常就在这里。',
    step5NudgeDecrease: '添加一个能减轻其中某个问题的东西，画成一条减少的连接。',
    step5NudgeHelpful: '把那条连接标记为“有帮助”，让图上显示出什么在起作用。',
    step6Title: '6. 画出是什么挡在路上',
    step6Body:
      '现在是难的部分。是什么让那件有帮助的事没能发生？\n\n这就是为什么“多运动就好了”这类话听起来那么刺耳。这个人早就知道运动会有帮助。是系统里的某种东西在压制它，而在那个东西被看见之前，建议无处落脚。',
    step6Nudge: '添加一条压制那件有帮助的事的连接。',
  },

  snapshots: {
    intro: '把网络当前的样子保存下来，之后再回来重新画一次。不会覆盖任何内容。',
    labelPlaceholder: '标签，例如“初诊”或“第 6 次会谈”',
    labelAria: '这个时间点的标签',
    saveButton: '保存时间点',
    none: '还没有保存任何时间点。',
    meta: '{when} · {nodes} 个节点 · {edges} 条连接',
    deleteAria: '删除时间点 {label}',
    compare: '对比',
    earlier: '较早',
    later: '较晚',
    changes_one: '{count} 处变化',
    changes_other: '{count} 处变化',
    downloadComparison: '下载对比结果（CSV）',
  },

  structure: {
    empty: '这里还什么都没有。添加一个节点开始。',
    nodes: '节点（{count}）',
    connections: '连接（{count}）',
    noConnections: '暂时没有。',
    nodeMetaDistress: ' · 困扰 {value}',
    nodeMetaFrequency: ' · 频率 {value}',
    deleteNodeAria: '删除节点 {label}',
    deleteEdgeAria: '删除连接 {sentence}',
  },

  templates: {
    intro:
      '这些是起点，不是个案概念化。把标签换成来访者自己的话，删掉不合适的部分。一个不加质疑就照搬的模板，比空白画布更糟。',
    blankName: '空白画布',
    blankDescription: '从零开始。',
    abcName: '三项联系',
    abcDescription: '最基础的脚手架：情境、内在反应、后果。从这里往外展开。',
    worryName: '担忧与睡眠的循环',
    worryDescription: '一个完整的示例，适合用来说明增强回路是什么样子。',
    moodName: '情绪低落与退缩',
    moodDescription: '常见的行为激活模式。使用前先换成来访者自己的说法。',
    painName: '慢性疼痛与回避',
    painDescription: '恐惧-回避模式，以及通常维持着它的体能下降回路。',
  },

  templateNodes: {
    abcTrigger: '诱发事件或情境',
    abcThought: '想法或感受',
    abcAction: '我会做什么',

    worryCriticism: '在工作中被批评',
    worryJobSecurity: '担心保不住工作',
    worrySleep: '睡不好',
    worryFatigue: '疲惫',
    worryExercise: '运动',
    worryWithdrawal: '社交退缩',

    moodLow: '情绪低落',
    moodStayingHome: '待在家里',
    moodFewerThings: '对我重要的事越来越少',
    moodBurden: '我是个负担',
    moodContact: '和朋友的联系',
    moodNoticing: '留意到微小的好时刻',

    painPain: '疼痛',
    painFear: '怕会变得更严重',
    painAvoiding: '回避活动',
    painDeconditioning: '体能下降',
    painDoingAnyway: '仍然去做重要的事',
    painWillingness: '愿意去感受不适',
  },

  templateNote:
    '这是一个起点，不是个案概念化。请把标签换成来访者自己的话。',

  exportDialog: {
    intro:
      'CSV 格式可以直接载入 R 或 Python。邻接矩阵正是 qgraph、igraph 和 networkx 所期待的输入。',
    json: '网络（JSON）',
    edges: '边列表（CSV）',
    nodes: '节点列表（CSV）',
    matrix: '邻接矩阵（CSV）',
    report: '分析报告（Markdown）',
    events: '构建日志（CSV）',
    png: '图片（PNG）',
    svg: '矢量图（SVG）',
    print: '打印 / PDF',
  },

  share: {
    title: '分享链接',
    intro:
      '整个网络都编码在链接本身里。服务器上没有副本，承载你内容的那一段也从不随网络请求发送，因此任何地方都不会存储或记录它。拿到链接的人都可以打开，并编辑属于自己的副本。',
    building: '正在生成链接…',
    tooLong:
      '这个网络太大，放不进一条链接（{length} 个字符）。请导出为 JSON，改为发送文件。',
  },

  clearDialog: {
    title: '要清空这个网络吗？',
    body: '这会删除全部 {nodes} 个节点和 {edges} 条连接。你可以撤销，已保存的时间点也会保留。',
    confirm: '清空全部',
  },

  kernel: {
    title: '治疗内核',
    warning: '开发中。这个按钮后面暂时还没有内容。',
    p1: '计划是建立一套治疗内核的词汇表：治疗性改变的最小单位，用足够一致的语言表述，以便挂接到图上的各个过程。选中一个过程，就能看到已知有哪些内核作用于它。',
    p2: '难的地方在于，界定什么算作一个内核、又要拆分到多细——这一点目前还没有定论。',
    p3: '如果你对这个数据库该如何组织有想法，Kean 很想听听：',
  },

  help: {
    title: '使用说明',
    buildingHeading: '构建一张图',
    buildingEvent:
      '这件事所关于的情境。从这里开始；在空白画布上任意点击都会创建一个。它是圆角方框，因为它不是这个人所做的事。',
    buildingAdd: '一个过程：想法、感受、冲动或行动。方角方框，按其 EEMM 类别着色。',
    buildingConnect:
      '先点击施加影响的方框，再点击被它影响的方框。然后一次点击，就能选定它是让对方增加还是减少，以及幅度多大。',
    buildingDelete: '点击任意方框或箭头。或者选中之后按 Delete。',
    buildingDoubleClick: '双击方框即可编辑。任何模式下都可以拖动移动。',

    readingHeading: '读懂这张图',
    readingArrowheads:
      '**实心**箭头表示增加，**空心**箭头表示减少。线越粗、箭头越大，影响越强。不用数字，也不依赖颜色。',
    readingReciprocal: '两端都带箭头的线，表示两者互相影响。',
    readingShapes: '方角方框是过程，圆角方框是事件或情境。',
    readingColour:
      '箭头默认是黑色，除非你把某条连接标记为有帮助（绿色）或无帮助（红色）。大多数连接会保持黑色：这个标记是留给你检验某个新做法能否打破某个回路的时候用的。',
    readingColourMode:
      '“增减”按钮会把箭头颜色改为显示增加（蓝色）与减少（橙色），适合你想看清影响方向的时候。',

    keyboardHeading: '键盘',
    keyboardTools: '选择 · 事件／情境 · 添加节点 · 连接 · 删除',
    keyboardConnectFromSelection: '选中一个方框后按 C，下一次点击就会完成这条连接。',
    keyboardDelete: 'Delete 或 Backspace 删除已选中的内容。',
    keyboardEscape: 'Esc 取消当前操作。再按一次回到选择模式。',
    keyboardView: 'F 全览 · O 整理 · M 评分 · G 网格',
    keyboardEditing:
      'Ctrl/Cmd+Z 撤销 · Shift+点击 可多选 · Ctrl/Cmd+C 与 Ctrl/Cmd+V 复制粘贴 · Ctrl/Cmd+D 生成副本',

    organiseHeading: '整理',
    organiseBody:
      '把方框沿箭头方向对齐成行与列，主要情境放在最前端。它会分别试一次横向和纵向布局，保留更适合你屏幕的那一种。决定顺序时会忽略反馈回路，这样它们读起来仍然是回路，而不会打乱整个序列。',

    mouselessHeading: '不用鼠标时',
    mouselessBody:
      '列表视图把整张图显示为文本，你可以用 Tab 键在其中移动，并用键盘编辑。屏幕阅读器读到的也是它，因为画布对屏幕阅读器来说是不可见的。',
    openListView: '打开列表视图',

    cautionHeading: '关于分析的一点提醒',
    cautionBody:
      '中心性、回路和杠杆点描述的是被画出来的这张图，而不是这个人。它们假设影响是线性且即时的，而事实并非如此。它们是一种结构化地审视你自己思路的方式，其价值完全取决于它们所依据的那些评分。',
  },

  about: {
    title: '关于',
    intro:
      '一个免费的开源工具，用于绘制基于过程的网络：维持心理痛苦与心理健康的各个过程之间的功能关系。',
    groundingHeading: '理论基础',
    groundingBody:
      '本工具的类别划分，以及它看待过程的方式，来自 **Steven C. Hayes 与 Stefan G. Hofmann** 在基于过程的治疗中提出的扩展进化元模型（EEMM）：情感、认知、注意、自我、动机与外显行为，置于生物生理与社会文化两个层面之中，并且始终放在情境里理解。',
    inspiration: '在浏览器里做这件事的想法，来自 Joseph Ciarrochi 的',
    madeByHeading: '由谁制作',
    madeByBody:
      'Tan Kean Sian 构思了这个工具并主导了它的开发；全部代码由 Anthropic 的 AI 助手 Claude 编写。欢迎提出问题或改进建议：',
    dataHeading: '你的数据在哪里',
    dataBody:
      '在你的浏览器里，别无他处。没有账号，没有服务器，没有统计分析。清除浏览器数据会删掉你的图，所以想保留的内容请先导出。分享链接把整张图装在链接本身里，而不会上传到任何地方。',
    licence: '采用 MIT 许可证。欢迎贡献。',
  },

  error: {
    canvasTitle: '绘图画布无法启动',
    canvasHint:
      '这通常意味着这台机器上没有可用的图形加速。你的网络是安全的。打开列表视图，可以以文本方式阅读和编辑它；用导出可以把它取出来。',
    technicalDetail: '技术细节',
  },

  toast: {
    copied_one: '已复制 {count} 个方框。按 Ctrl/Cmd+V 粘贴。',
    copied_other: '已复制 {count} 个方框。按 Ctrl/Cmd+V 粘贴。',
    pasted_one: '已粘贴 {count} 个方框。',
    pasted_other: '已粘贴 {count} 个方框。',
    duplicated_one: '已生成 {count} 个方框的副本。',
    duplicated_other: '已生成 {count} 个方框的副本。',
    hypothesisOn: '假设模式已开启。现在添加的内容都算提议，用虚线绘制。',
    sharedOpened: '已打开一个分享来的网络。它没有覆盖你已保存的工作。',
    imported: '已导入。',
    importUnreadable: '无法读取该文件。',
    importNotJson: '该文件不是有效的 JSON。',
  },

  language: {
    title: '语言',
    note: '译文由社区贡献，仍在审校中。尤其是临床术语，在有些语言里可能尚未定型。',
    contribute: '发现译文有误？非常欢迎来信指正：',
    draft: '草稿',
  },

  a11y: {
    canvas: '网络画布。相同内容的键盘可访问版本在列表视图中。',
    toolbar: '工具',
    scopeTabs: '统计哪些连接',
  },
};
