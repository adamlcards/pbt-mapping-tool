import type { PartialStrings } from '../strings';

/**
 * Japanese (日本語).
 *
 * Terminology to check first: the EEMM categories follow the settled Japanese
 * ACT/RFT vocabulary (感情・認知・注意・自己・動機づけ・顕在行動, with 生物生理 and
 * 社会文化 as the two レベル), and the ACT terms 脱フュージョン, 文脈としての自己,
 * 反すう and 三項随伴性 are used rather than literal renderings. The
 * systems-dynamics loop types are 自己強化ループ (reinforcing) and 均衡ループ
 * (balancing); 自己強化 is used in preference to bare 強化 so it is not misread as
 * operant reinforcement. The network is consistently called a マップ, never 地図.
 * "Helping / not helping" is 役立っている / 役立っていない, and the Analysis panel's
 * Adaptive / Maladaptive tabs are 適応的 / 不適応的. Counters: nodes 個,
 * connections 本, loops つ, routes 通り, changes 件.
 */
export const ja: PartialStrings = {
  meta: { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },

  app: {
    name: 'プロセスベース・ネットワークマッピングツール',
    short: 'PBTマッピングツール',
    networkTitleLabel: 'ネットワークのタイトル',
    untitledNetwork: '無題のネットワーク',
  },

  tool: {
    select: '選択',
    add: 'ノード追加',
    connect: '接続',
    delete: '削除',
    event: '出来事・文脈',
  },
  toolHint: {
    select: 'クリックすると選択され、何とつながっているかが分かります。ドラッグで移動します。',
    add: 'キャンバスのどこかをクリックすると、ノードを追加できます。',
    connect: '影響を与える側のノードをクリックし、次に影響を受ける側をクリックします。',
    delete: 'ノードかつながりをクリックすると削除されます。',
    start: 'この話の出発点となる出来事や状況から始めます。どこでもクリックしてください。',
    focused: 'ネットワークの一部に絞り込んでいます。',
    showEverything: 'すべてを再表示',
    pendingSource: '起点：{label}。次に、影響を受けるノードをクリックしてください。',
  },

  action: {
    undo: '元に戻す',
    redo: 'やり直す',
    fit: '全体表示',
    organise: '整列',
    clear: '全消去',
    grid: 'グリッド',
    ratings: '評価',
    colourByValence: '役立ち',
    colourByDirection: '増減',
    hypothesis: '仮説',
    kernel: 'カーネル',
    analyse: '分析',
    snapshots: '時点',
    import: '読み込み',
    export: '書き出し',
    share: 'リンク共有',
    help: 'ヘルプ',
    about: '概要',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    templates: 'テンプレート',
    guided: 'ガイド作成',
    cancel: 'キャンセル',
    save: '保存',
    add: '追加',
    update: '更新',
    close: '閉じる',
    back: '戻る',
    next: '次へ',
    finish: '完了',
    restore: '復元',
    tryAgain: '再試行',
    copy: 'リンクをコピー',
    copied: 'コピーしました',
    language: '言語',
  },

  tooltip: {
    undo: '元に戻す（Ctrl/Cmd+Z）',
    redo: 'やり直す（Ctrl/Cmd+Y）',
    fit: '全体を画面に収める（F）',
    organise: '矢印の向きに沿って、ボックスを行と列に整列させます（O）',
    clear: 'すべて削除します',
    grid: 'グリッドを表示し、ボックスを吸着させます（G）',
    ratings: '各ボックスに苦痛の程度（S）と頻度（F）の評価を表示します（M）',
    colourIsDirection:
      '現在、矢印の色は増加（青）と減少（オレンジ）を表しています。クリックすると、そのつながりが役立っているかどうかで色分けします。',
    colourIsValence:
      '現在、矢印の色はそのつながりが役立っているかどうかを表しています。クリックすると、増加と減少で色分けします。',
    addEvent: '出来事・文脈を追加',
    addProcess: 'プロセスを追加',
    hypothesis: '検討中のものを追加し、それによって何が変わるかを見ます（H）',
    kernel: '治療カーネル（開発中）',
    analyse: '中心性、フィードバックループ、経路、レバレッジ',
    snapshots: 'このマップを時点として保存し、後で比較します',
    import: '保存したファイルを読み込みます',
    export: '画像、PDF、JSON、CSV として保存します',
    share: 'このマップへのリンクを取得します',
    help: '使い方',
    templates: '例から始めます',
    guided: '手順に沿って作成します',
    themeToLight: 'ライトテーマに切り替えます',
    themeToDark: 'ダークテーマに切り替えます',
    language: 'インターフェースの言語を変更します',
    toolWithKey: '{tool}（{key}）',
    deleteKeyHint: 'D キー、または Delete / Backspace で選択中のものを削除します',
    closePanel: 'パネルを閉じる',
    closeDialog: 'ダイアログを閉じる',
    closeGuide: 'ガイドを閉じる',
  },

  privacy: {
    localOnly: 'すべてこの端末内にとどまります',
    localOnlyLong:
      'マップはこのブラウザ内に保存され、どこにも送信されません。タブを閉じても大丈夫です。ブラウザのデータを消去すると失われるので、残しておきたいものは書き出してください。',
    studyMode: '研究モード',
    studyModeLong:
      'あなたは研究に参加しています。マップと、それを組み立てた順序が研究サーバーに保存されます。',
    autosaveUnavailable: '自動保存を利用できません — 書き出して保存してください',
    autosaveUnavailableLong:
      'このブラウザはページによる保存を許可していません。HTML ファイルをディスクから直接開いた場合や、プライベートウィンドウで起こることがほとんどです。作業内容は引き続き非公開ですが、タブを閉じると失われます。残すには「書き出し」を使ってください。',
  },

  panel: {
    analysis: '分析',
    snapshots: '時点',
    listView: 'リスト表示',
  },

  nodeEditor: {
    newEvent: '新しい出来事・文脈',
    newNode: '新しいノード',
    edit: 'ノードを編集',
    name: '名前',
    namePlaceholder: '本人の言葉のままで',
    category: 'カテゴリ',
    ratingsDisclosure: '評価とメモ（任意）',
    ratingsNote:
      '研究プロトコルで、人や時期をまたいでネットワークを比較するために使います。日常の臨床マッピングでは必要ありません。',
    severity: '苦痛の程度（0–10）',
    frequency: '頻度（0–10）',
    notes: 'メモ',
    notRated: '未評価',
    severityShort: '苦',
    frequencyShort: '頻',
    rate: '評価する',
    clearRating: '消去',
  },

  edgeEditor: {
    title: 'これはあれにどう影響していますか？',
    sentenceIncreases: '{source} が {target} を増やす',
    sentenceDecreases: '{source} が {target} を減らす',
    increasesIt: '増やす',
    decreasesIt: '減らす',
    altDirection: 'この2つは、逆向きにも影響し合っています。',
    editAlt: '{source} → {target} を編集',
    removeLink: 'つながりを削除',
    addLink: 'つながりを追加',
    helpingDisclosure: 'このつながりは役立っていますか？',
    helpingNote:
      'それ自体で有益、あるいは有害なプロセスはありません。何とつながっているかで決まります。だからこそ、ボックスに名前をつけるときではなく、ここで尋ねています。つながりに印をつけておくと、分析パネルは「どの変化が最も広く波及するか」だけでなく「どの変化が役立つか」まで示せるようになります。使わないのであれば、そのままで構いません。',
  },

  category: {
    uncategorised: {
      label: '未分類',
      prefix: '',
      hint: 'まだ分類していません。考えている途中なら、そのままで構いません。',
    },
    affect: {
      label: '感情',
      prefix: '感情',
      hint: '情動や気持ち。それを避けているか、進んで感じようとしているか。',
    },
    cognition: {
      label: '認知',
      prefix: '認知',
      hint: '思考、信念、ルール、反すう、脱フュージョン。',
    },
    attention: {
      label: '注意',
      prefix: '注意',
      hint: '何に気づき、何に気づいていないか。柔軟な注意か、狭まった注意か。',
    },
    self: {
      label: '自己',
      prefix: '自己',
      hint: '自己概念、アイデンティティ、自己批判、文脈としての自己。',
    },
    motivation: {
      label: '動機づけ',
      prefix: '動機',
      hint: '価値、目標、その人が何に向かい、何から遠ざかっているか。',
    },
    overtBehaviour: {
      label: '顕在行動',
      prefix: '行動',
      hint: '観察できる行動。その人が実際にしていること。',
    },
    biophysiological: {
      label: '生物生理',
      prefix: '生理',
      hint: '睡眠、痛み、病気、服薬、覚醒度、生理的状態。',
    },
    sociocultural: {
      label: '社会文化',
      prefix: '社会',
      hint: '人間関係、家族、文化、社会的な支えや圧力。',
    },
    context: {
      label: '文脈・出来事',
      prefix: '出来事',
      hint: 'その人がすることではなく、状況や出来事。角の丸いボックスで描かれます。',
    },
  },
  categoryGroup: {
    dimension: '心理的次元',
    level: 'レベル',
    other: '文脈と未分類',
  },

  strength: {
    1: '少し',
    2: 'ある程度',
    3: 'かなり',
  },

  valence: {
    neutral: '判断なし',
    helpful: '役立っている',
    unhelpful: '役立っていない',
  },

  trial: {
    proposed: '検討中',
    adopted: '試して、役立った',
    ruledOut: '試したが、役立たなかった',
    proposedHint:
      'まだ案の段階です。破線で描かれ、比較の基準となるベースラインからは除かれます。',
    adoptedHint: 'うまくいきました。マップの一部となり、ほかと同じように描かれます。',
    ruledOutHint: 'うまくいきませんでした。薄く残るので、すでに試したことが分かります。',
    dialogTitle: 'これはどうなりましたか？',
    legend: 'これはどこまで進みましたか？',
    lastRecorded: '最終記録 {when}',
    notATrial: '試みではない — マップの通常の一部にする',
  },

  analysis: {
    title: '分析',
    summary: 'このネットワークが示していること',
    central: '最もつながりが多いもの',
    loops: 'フィードバックループ',
    leverage: '変化が最も広がりそうなところ',
    paths: '経路をたどる',
    whatIf: 'もしこうしたら',
    empty: 'ノードとつながりを追加すると、分析が表示されます。',

    stats: 'ノード {nodes} 個 · つながり {edges} 本 · 密度 {density}',

    scopeAll: 'すべてのつながり',
    scopeUnhelpful: '不適応的',
    scopeHelpful: '適応的',
    centralNote:
      '強度は、出入りする影響の大きさを合計したものです。治療標的を選ぶうえで最も支持されている中心性の指標ですが、中心にあるノードが自動的に働きかけるべきノードになるわけではありません。',
    scopeUnhelpfulNote:
      '「役立っていない」と印をつけた矢印だけを数えています。ここで高い値が出るものは、問題を支えているプロセスです。',
    scopeHelpfulNote:
      '「役立っている」と印をつけた矢印だけを数えています。ここで高い値が出るものは、その人がすでに持っている強みです。新しい何かを加えるより、これを伸ばすほうがよい場合が多くあります。',
    excludedNote_one:
      '判断していないつながりが {count} 本、どちらの内訳からも除かれているため、両者を足しても全体の数字にはなりません。',
    excludedNote_other:
      '判断していないつながりが {count} 本、どちらの内訳からも除かれているため、両者を足しても全体の数字にはなりません。',
    noneMarkedHelpful:
      'まだ「役立っている」と印をつけたものがありません。つながりを開いて、役立っているかどうかを設定すると表示されます。',
    noneMarkedUnhelpful:
      'まだ「役立っていない」と印をつけたものがありません。つながりを開いて、役立っているかどうかを設定すると表示されます。',

    colNode: 'ノード',
    colIn: '入',
    colOut: '出',
    colStrength: '強度',
    colNetOutward: '正味の出',
    chipEntryPoint: '入口',
    chipEndpoint: '終点',
    chipUnconnected: '未接続',
    chipNothingHelping: '役立つものなし',
    chipNothingUnhelpful: '役立たないものなし',

    reinforcing: '自己強化',
    balancing: '均衡',
    reinforcingHelp:
      '自己維持的です。ループのどこかで増加が起きると、一周して戻り、さらなる増加になります。きっかけが過ぎ去った後も問題が続くのは、このためです。',
    balancingHelp:
      '自己修正的です。このループのどこかが押し返しており、多くの場合それは自然なブレーキを意味します。',
    noLoops: 'ループは見つかりませんでした。',
    manyLoops: 'このネットワークには多くのループがあります。強いものだけを表示しています。',
    loopSteps_one: '{count} ステップ、ゲイン {gain}',
    loopSteps_other: '{count} ステップ、ゲイン {gain}',

    heuristicWarning:
      'これらの数値が表しているのは、あなたが描いたマップであって、その人ではありません。影響は直線的で即時的だと仮定していますが、実際にはそうではありません。考えるための材料として使い、予測としては決して扱わないでください。',
    colIfReduced: 'これを減らしたら',
    colBenefit: 'モデル上の効果',
    colReach: '波及範囲',
    wouldAlsoSuppress: '{labels} も抑えてしまいます',
    chipNoDampening: '減衰なし',

    from: '起点',
    to: '終点',
    choose: '選択…',
    noRoute: '一方から他方への経路はありません。',
    routeStats_one: '{count} 通り · 増加 {up} · 減少 {down} · 正味 {net}',
    routeStats_other: '{count} 通り · 増加 {up} · 減少 {down} · 正味 {net}',
    pathSteps_one: '{count} ステップ、効果 {effect}',
    pathSteps_other: '{count} ステップ、効果 {effect}',
    increases: '増やす',
    decreases: '減らす',

    colNow: '現在',
    colWithThis: 'これを加えたら',
    rowReinforcing: '自己強化ループ',
    rowBalancing: '均衡ループ',
    rowAmplification: 'モデル上の増幅',
    newBrakes: 'システムに加わる新しいブレーキ',
    badgeNewBalancing: '新しい均衡',
    howItActs: '1周ごとにどう働くか',
    mechSelfCorrecting: '自己修正的',
    mechSteadyPressure: '一定の圧力',
    mechPushedHarder: 'より強く押される',
    mechUntouched: '変化なし',
    pressureOn: '{labels} に対して · 続ける必要あり',
    holdsOnItsOwn: '自力で保たれる',
  },

  summary: {
    noNodes: 'ノードをいくつか追加すると、分析が表示されます。',
    noEdges:
      'まだ何もつながっていません。つながりを追加すると、各部分がどう影響し合っているかが見えてきます。',
    mostConnected_one:
      '**{label}** はこのネットワークで最もつながりが多い部分です（入ってくる影響 {inDegree}、出ていく影響 {outDegree}）。中心にあるノードは変化が最も広がりやすい場所であることが多い一方、直接動かすのが最も難しい場所でもあります。',
    mostConnected_other:
      '**{label}** はこのネットワークで最もつながりが多い部分です（入ってくる影響 {inDegree}、出ていく影響 {outDegree}）。中心にあるノードは変化が最も広がりやすい場所であることが多い一方、直接動かすのが最も難しい場所でもあります。',
    reinforcing_one:
      'ここには **自己強化ループが {count} つ** あります。これは自己維持的な循環で、始まりのきっかけが過ぎ去った後も回り続けます。',
    reinforcing_other:
      'ここには **自己強化ループが {count} つ** あります。これは自己維持的な循環で、始まりのきっかけが過ぎ去った後も回り続けます。',
    tightestLoop: '最も短いのは {path} です。',
    noReinforcing:
      '自己強化ループは見つかりませんでした。ここに自分自身へ戻ってくるものがないか、確かめてみる価値はあります。問題が続く理由は、多くの場合フィードバックにあるからです。',
    balancing_one:
      '均衡ループが {count} つ見つかりました。これは自己修正的で、その人がすでに問題に対する自然なブレーキを持っている場所を示していることがよくあります。',
    balancing_other:
      '均衡ループが {count} つ見つかりました。これは自己修正的で、その人がすでに問題に対する自然なブレーキを持っている場所を示していることがよくあります。',
    sources_one:
      '{labels} は他に影響を与えていますが、ネットワーク内のどれからも影響を受けていません。このような入口は、着手しやすい場所であることがあります。',
    sources_other:
      '{labels} は他に影響を与えていますが、ネットワーク内のどれからも影響を受けていません。このような入口は、着手しやすい場所であることがあります。',
    leverage_one:
      '**{label}** を減らすと、モデル上の効果が最も広く及び、ほかの {reach} 個のノードに届きます。',
    leverage_other:
      '**{label}** を減らすと、モデル上の効果が最も広く及び、ほかの {reach} 個のノードに届きます。',
    leverageCaveat_one:
      'ただし、{labels} も抑えてしまう点に注意してください。あなたが「役立っている」と印をつけたつながりに関わっています。',
    leverageCaveat_other:
      'ただし、{labels} も抑えてしまう点に注意してください。あなたが「役立っている」と印をつけたつながりに関わっています。',
    isolated_one: '{labels} はまだ何ともつながっていません。',
    isolated_other: '{labels} はまだ何ともつながっていません。',
    diverges:
      'このネットワークには、モデル上で限りなく増幅していく部分があります。多くの場合、減衰のない強い自己強化ループがあることを意味します。レバレッジの数値はあくまで目安として扱ってください。',
    caveat:
      '_これらの数値が表しているのは、あなたが描いたマップであって、その人ではありません。自分の考えを構造的に眺めるための手段であり、これから起きることの予測ではありません。_',
  },

  guided: {
    ariaLabel: 'ガイド作成',
    stepOf: 'ステップ {current} / {total}',
    done: '完了です。準備ができたら次へ進んでください。',
    footer:
      'ガイドはいつでも終了でき、作ったものはそのまま残ります。ここでの手順は足場であって、埋めるべき書式ではありません。',
    step1Title: '1. 文脈から始める',
    step1Body:
      '「出来事・文脈」ボタンを使って、この話の背景となる状況を追加します。何が、どこで、誰との間で起きたのか。その人がしていることではないので、角の丸いボックスになります。\n\nここから始めるのは形式的な手続きではありません。機能的アセスメントでは、同じ思考や行動でも状況が違えば意味が違ってきます。その後のすべてを解釈できるようにしてくれるのが、文脈なのです。',
    step1Nudge: 'まず、出来事・文脈のボックスを追加してください。',
    step2Title: '2. 反応と、その後に起きることを加える',
    step2Body:
      '次に、内側で起きること（思考、感情、衝動）と、その人がすること、あるいはその結果を追加します。文脈から順につないでいきます。\n\nこれが三項随伴性であり、機能的アセスメントを組み立てる単位です。ほかのすべては、ここから育っていきます。',
    step2NudgeNodes: 'ボックスをあと2つ追加してください。まず内的な反応、次に何が起きるか。',
    step2NudgeEdges: '次につなぎます。文脈 → 内的な反応 → 何が起きるか。',
    step3Title: '3. 元に戻ってこないか確かめる',
    step3Body:
      '連鎖の終わりを見て、こう尋ねてみてください。それは前のどれかに戻って影響していないか。睡眠不足は心配を生みますが、心配もまた睡眠不足を生みます。\n\n始まりのきっかけがとうに消えた後も問題が続く理由は、たいていフィードバックにあります。',
    step3Nudge: 'まだどこにも戻っていません。結果は、より前にあるものに影響していませんか。',
    step4Title: '4. ほかに関わっているものを加える',
    step4Body:
      'ほかに何が巻き込まれているでしょうか。結果から影響を受け、なおかつ反応に戻ってくるものがあれば、ノードとして追加します。\n\nここでは増幅させるものが重要です。疲労は単なるもう一つの問題ではなく、ほかのすべてをより脅威的に感じさせます。',
    step4Nudge: '少なくとも、もう1つ要素を追加してください。',
    step5Title: '5. 役立っているものを加える',
    step5Body:
      'すべてが事態を悪くするわけではありません。これらの問題のどれかを減らすものを追加し、減少のつながりとして描き、そのつながりに「役立っている」と印をつけてください。\n\nここは飛ばされがちな部分ですが、介入がふつう存在するのは、まさにここです。',
    step5NudgeDecrease: 'これらのどれかを減らすものを、減少のつながりとして追加してください。',
    step5NudgeHelpful:
      'そのつながりに「役立っている」と印をつけて、うまくいっているものがマップに表れるようにしてください。',
    step6Title: '6. 妨げているものを描く',
    step6Body:
      'ここからが難しいところです。役立つことが起きるのを、何が止めているのでしょうか。\n\n「とにかく運動を増やしましょう」がうまくいかないのは、このためです。本人はそれが役立つとすでに知っています。システムの何かがそれを抑え込んでおり、それが見えるようにならない限り、助言は行き場を持ちません。',
    step6Nudge: '役立つものを抑えているつながりを追加してください。',
  },

  snapshots: {
    intro:
      '今のネットワークを保存しておき、後日また描いてから戻ってくることができます。上書きされるものはありません。',
    labelPlaceholder: 'ラベル（例：初回面接、第6セッション）',
    labelAria: 'この時点のラベル',
    saveButton: '時点を保存',
    none: 'まだ保存された時点はありません。',
    meta: '{when} · ノード {nodes} 個 · つながり {edges} 本',
    deleteAria: '時点 {label} を削除',
    compare: '比較',
    earlier: '前',
    later: '後',
    changes_one: '{count} 件の変化',
    changes_other: '{count} 件の変化',
    downloadComparison: '比較をダウンロード（CSV）',
  },

  structure: {
    empty: 'まだ何もありません。ノードを追加して始めてください。',
    nodes: 'ノード（{count}）',
    connections: 'つながり（{count}）',
    noConnections: 'まだありません。',
    nodeMetaDistress: ' · 苦痛 {value}',
    nodeMetaFrequency: ' · 頻度 {value}',
    deleteNodeAria: 'ノード {label} を削除',
    deleteEdgeAria: 'つながり {sentence} を削除',
  },

  templates: {
    intro:
      'これらは出発点であって、ケースフォーミュレーションではありません。ラベルは本人の言葉に置き換え、当てはまらないものは削除してください。疑われないまま使われるテンプレートは、白紙のキャンバスより悪いものです。',
    blankName: '白紙のキャンバス',
    blankDescription: '何もない状態から始めます。',
    abcName: '三項随伴性',
    abcDescription:
      '出発点となる足場です。文脈、内的な反応、結果。ここから外へ広げていきます。',
    worryName: '心配と睡眠の悪循環',
    worryDescription: '記入例です。自己強化ループがどのようなものかを示すのに役立ちます。',
    moodName: '抑うつ気分と引きこもり',
    moodDescription:
      '行動活性化でよく見られるパターンです。使う前に、本人の言葉に置き換えてください。',
    painName: '慢性疼痛と回避',
    painDescription:
      '恐怖回避のパターンと、それを維持することの多いデコンディショニングのループです。',
  },

  templateNodes: {
    abcTrigger: 'きっかけ・状況',
    abcThought: '思考や感情',
    abcAction: '自分がすること',

    worryCriticism: '職場で注意された',
    worryJobSecurity: '仕事を失うのではという心配',
    worrySleep: '寝つけない',
    worryFatigue: '疲労',
    worryExercise: '運動',
    worryWithdrawal: '人づきあいを避ける',

    moodLow: '気分の落ち込み',
    moodStayingHome: '家にこもる',
    moodFewerThings: '大切なことをする機会が減る',
    moodBurden: '自分は迷惑な存在だ',
    moodContact: '友人との交流',
    moodNoticing: '小さな良い瞬間に気づく',

    painPain: '痛み',
    painFear: '悪化させるのではという恐れ',
    painAvoiding: '活動を避ける',
    painDeconditioning: 'デコンディショニング',
    painDoingAnyway: 'それでも大切なことをする',
    painWillingness: '不快感を進んで受け入れる',
  },

  templateNote:
    'これは出発点であって、ケースフォーミュレーションではありません。ラベルは本人の言葉に置き換えてください。',

  exportDialog: {
    intro:
      'CSV 形式は、そのまま R や Python に読み込めます。隣接行列は qgraph、igraph、networkx が入力として想定している形式です。',
    json: 'ネットワーク（JSON）',
    edges: 'エッジリスト（CSV）',
    nodes: 'ノードリスト（CSV）',
    matrix: '隣接行列（CSV）',
    report: '分析レポート（Markdown）',
    events: '作成ログ（CSV）',
    png: '画像（PNG）',
    svg: 'ベクター（SVG）',
    print: '印刷 / PDF',
  },

  share: {
    title: 'リンク共有',
    intro:
      'ネットワーク全体が、リンクそのものに符号化されています。サーバー上に控えはなく、内容を運ぶ部分はウェブ要求として送信されないため、どこにも保存も記録もされません。リンクを持つ人は誰でも開いて、自分の複製を編集できます。',
    building: 'リンクを作成しています…',
    tooLong:
      'このネットワークは大きすぎて、リンクにできません（{length} 文字）。JSON として書き出し、ファイルを送ってください。',
  },

  clearDialog: {
    title: 'このネットワークを消去しますか？',
    body: 'ノード {nodes} 個とつながり {edges} 本をすべて削除します。元に戻すことができ、保存した時点はそのまま残ります。',
    confirm: 'すべて消去',
  },

  kernel: {
    title: '治療カーネル',
    warning: '開発中です。このボタンの先には、まだ何もありません。',
    p1: '構想しているのは、治療カーネルの語彙です。治療的変化の最小単位を、マップ上のプロセスに結びつけられるだけ一貫した言葉で表します。プロセスを選ぶと、それに働きかけることが知られているカーネルが分かる、という形です。',
    p2: '難しいのは、何を1つのカーネルと数え、どこまで細かく分けるかを決めることで、これはまだ定まっていません。',
    p3: 'このデータベースをどう整理すべきかについてお考えがあれば、Kean がぜひ伺いたいとのことです：',
  },

  help: {
    title: '使い方',
    buildingHeading: 'マップを作る',
    buildingEvent:
      'この話の背景となる状況です。ここから始めます。空のキャンバスでは、どこをクリックしてもこれが作られます。その人がしていることではないので、角の丸いボックスになります。',
    buildingAdd:
      'プロセス、つまり思考、感情、衝動、行動です。四角いボックスで、EEMM のカテゴリごとに色分けされます。',
    buildingConnect:
      '影響を与える側のボックスをクリックし、次に影響を受ける側をクリックします。そのあと、増やすのか減らすのか、どの程度かを1クリックで選びます。',
    buildingDelete: 'ボックスか矢印をクリックします。または、選択して Delete キーを押します。',
    buildingDoubleClick:
      'ボックスをダブルクリックすると編集できます。どのモードでも、ドラッグで移動できます。',

    readingHeading: '図を読む',
    readingArrowheads:
      '**塗りつぶし**の矢先は増加、**白抜き**の矢先は減少を意味します。線が太く矢先が大きいほど、強い影響です。数字は使わず、色にも頼りません。',
    readingReciprocal: '両端に矢先のある線は、その2つが互いに影響し合っていることを表します。',
    readingShapes: '四角いボックスはプロセス、角の丸いボックスは出来事や文脈です。',
    readingColour:
      'つながりに「役立っている」（緑）または「役立っていない」（赤）と印をつけない限り、矢印は黒です。ほとんどのつながりは黒のままです。この印は、新しい何かがループを断ち切るかどうかを検討するときのためにあります。',
    readingColourMode:
      '「増減」ボタンを押すと、矢印の色は代わりに増加（青）と減少（オレンジ）を表すようになります。影響の向きこそ読み取りたい、というときに使います。',

    keyboardHeading: 'キーボード',
    keyboardTools: '選択 · 出来事・文脈 · ノード追加 · 接続 · 削除',
    keyboardConnectFromSelection:
      'ボックスを選んで C を押すと、次のクリックでつながりが完成します。',
    keyboardDelete: 'Delete または Backspace で、選択中のものを削除します。',
    keyboardEscape: 'Esc で操作を取り消します。もう一度押すと、選択モードに戻ります。',
    keyboardView: 'F 全体表示 · O 整列 · M 評価 · G グリッド',
    keyboardEditing:
      'Ctrl/Cmd+Z 元に戻す · Shift+クリック で複数選択 · Ctrl/Cmd+C と Ctrl/Cmd+V でコピーと貼り付け · Ctrl/Cmd+D 複製',

    organiseHeading: '整列',
    organiseBody:
      '矢印の向きに沿ってボックスを行と列に整え、中心となる文脈を先頭に置きます。横方向と縦方向の両方のレイアウトを試し、画面に収まりのよいほうを採用します。順序を決めるときフィードバックループは無視されるため、流れが乱れることなく、ループはループとして読めます。',

    mouselessHeading: 'マウスを使わずに',
    mouselessBody:
      'リスト表示では、マップ全体をテキストとして表示し、Tab で移動しながらキーボードで編集できます。キャンバスはスクリーンリーダーからは見えないため、読み上げられるのもこちらです。',
    openListView: 'リスト表示を開く',

    cautionHeading: '分析についての注意',
    cautionBody:
      '中心性、ループ、レバレッジが表しているのは、描かれたマップであって、その人ではありません。影響は直線的で即時的だと仮定していますが、実際にはそうではありません。これらは自分の考えを構造的に問い直すための手段であり、その値打ちは、元になった評価の確かさとちょうど同じだけです。',
  },

  about: {
    title: '概要',
    intro:
      'プロセスベースのネットワークを描くための、無料でオープンソースのツールです。心理的な苦しみと健やかさを維持しているプロセスどうしの、機能的な関係を扱います。',
    groundingHeading: '理論的な背景',
    groundingBody:
      'カテゴリと、このツールにおけるプロセスの捉え方は、**Steven C. Hayes と Stefan G. Hofmann** のプロセスベース療法の仕事で示された拡張進化メタモデル（EEMM）に基づいています。感情、認知、注意、自己、動機づけ、顕在行動が、生物生理と社会文化のレベルのなかに位置づけられ、つねに文脈のなかで読まれます。',
    inspiration: 'これをブラウザ上で行うという発想は、Joseph Ciarrochi 氏の次のものに着想を得ました：',
    madeByHeading: '制作者',
    madeByBody:
      'Tan Kean Sian がこのツールを構想し、開発を指揮しました。コードはすべて、Anthropic の AI アシスタントである Claude とともに書かれています。ご質問や改善のご提案は、こちらまでお寄せください：',
    dataHeading: 'データの保存場所',
    dataBody:
      'あなたのブラウザのなかだけです。アカウントも、サーバーも、アクセス解析もありません。ブラウザのデータを消去するとマップも消えるので、残しておきたいものは書き出してください。共有リンクは、どこかへアップロードするのではなく、リンクそのもののなかにマップを収めています。',
    licence: 'MIT ライセンスです。貢献を歓迎します。',
  },

  error: {
    canvasTitle: '描画キャンバスを開始できませんでした',
    canvasHint:
      'この端末でグラフィックアクセラレーションが利用できないことが原因である場合がほとんどです。ネットワークは無事です。リスト表示を開けばテキストとして読み書きでき、書き出しで取り出せます。',
    technicalDetail: '技術的な詳細',
  },

  toast: {
    copied_one: 'ボックスを {count} 個コピーしました。Ctrl/Cmd+V で貼り付けます。',
    copied_other: 'ボックスを {count} 個コピーしました。Ctrl/Cmd+V で貼り付けます。',
    pasted_one: 'ボックスを {count} 個貼り付けました。',
    pasted_other: 'ボックスを {count} 個貼り付けました。',
    duplicated_one: 'ボックスを {count} 個複製しました。',
    duplicated_other: 'ボックスを {count} 個複製しました。',
    hypothesisOn: '仮説モードが有効です。ここから追加するものは提案として、破線で描かれます。',
    sharedOpened: '共有されたネットワークを開きました。保存済みの作業は上書きされていません。',
    imported: '読み込みました。',
    importUnreadable: 'そのファイルを読み取れませんでした。',
    importNotJson: 'そのファイルは有効な JSON ではありません。',
  },

  language: {
    title: '言語',
    note: '翻訳は有志によるもので、現在確認中です。とくに臨床用語は、言語によってはまだ定まっていない場合があります。',
    contribute: '誤訳を見つけましたか？　修正のご連絡を歓迎します：',
    draft: '暫定',
  },

  a11y: {
    canvas: 'ネットワークのキャンバスです。同じ内容をキーボードで操作できる版が、リスト表示にあります。',
    toolbar: 'ツール',
    scopeTabs: '数えるつながりの範囲',
  },
};
