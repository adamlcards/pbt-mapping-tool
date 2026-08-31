import type { PartialStrings } from '../strings';

/**
 * Korean (한국어).
 *
 * Terminology to check first. The EEMM categories follow standard Korean
 * psychology usage — 정서 / 인지 / 주의 / 자기 / 동기 / 외현 행동, with the two
 * levels as 생물생리 and 사회문화; the systems terms are 강화 루프 and 균형 루프.
 * Two word-order compromises are worth a look: `edgeEditor.sentence*` is
 * rendered as `{source} → {target} 증가` because Korean is verb-final and any
 * full sentence would need a 이/가 or 을/를 particle the runtime cannot choose;
 * and `analysis.increases` / `decreases` are the bare nouns 증가 / 감소 because
 * the same two strings serve both a standalone badge and a fixed
 * source-verb-target sentence in List view. "Deconditioning" is rendered
 * clinically as 신체 기능 저하 rather than the literal 탈조건화, since in the
 * fear-avoidance model it means physical decline.
 */
export const ko: PartialStrings = {
  meta: { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr' },

  app: {
    name: '과정 기반 네트워크 매핑 도구',
    short: 'PBT 매핑 도구',
    networkTitleLabel: '네트워크 제목',
    untitledNetwork: '제목 없는 네트워크',
  },

  tool: {
    select: '선택',
    add: '노드 추가',
    connect: '연결',
    delete: '삭제',
    event: '사건/맥락',
  },

  toolHint: {
    select: '클릭하면 선택되고 무엇과 이어져 있는지 보입니다. 끌어서 옮기세요.',
    add: '캔버스의 아무 곳이나 클릭해 노드를 추가하세요.',
    connect: '영향을 주는 노드를 먼저 클릭하고, 영향을 받는 노드를 클릭하세요.',
    delete: '노드나 연결을 클릭하면 지워집니다.',
    start: '무엇에 관한 이야기인지, 그 사건이나 상황부터 시작하세요. 아무 곳이나 클릭하면 됩니다.',
    focused: '네트워크의 일부만 보고 있습니다.',
    showEverything: '다시 전체 보기',
    pendingSource: '출발 노드: {label}. 이제 영향을 받는 노드를 클릭하세요.',
  },

  action: {
    undo: '되돌리기',
    redo: '다시 실행',
    fit: '화면 맞춤',
    organise: '정렬',
    clear: '지우기',
    grid: '격자',
    ratings: '평정',
    colourByValence: '도움',
    colourByDirection: '증감',
    hypothesis: '가설',
    kernel: '커널',
    analyse: '분석',
    snapshots: '시점',
    import: '가져오기',
    export: '내보내기',
    share: '링크 공유',
    help: '도움말',
    about: '정보',
    themeLight: '밝게',
    themeDark: '어둡게',
    templates: '템플릿',
    guided: '단계별 작성',
    cancel: '취소',
    save: '저장',
    add: '추가',
    update: '수정',
    close: '닫기',
    back: '이전',
    next: '다음',
    finish: '완료',
    restore: '복원',
    tryAgain: '다시 시도',
    copy: '링크 복사',
    copied: '복사됨',
    language: '언어',
  },

  tooltip: {
    undo: '되돌리기 (Ctrl/Cmd+Z)',
    redo: '다시 실행 (Ctrl/Cmd+Y)',
    fit: '전체를 화면에 맞추기 (F)',
    organise: '화살표 흐름을 따라 상자를 행과 열로 정돈 (O)',
    clear: '전부 지우기',
    grid: '격자를 표시하고 상자를 격자에 맞추기 (G)',
    ratings: '각 상자에 심각도(S)와 빈도(F) 평정 표시 (M)',
    colourIsDirection:
      '지금은 화살표 색이 증가(파랑)와 감소(주황)를 나타냅니다. 클릭하면 연결이 도움이 되는지에 따라 색을 칠합니다.',
    colourIsValence:
      '지금은 화살표 색이 연결이 도움이 되는지를 나타냅니다. 클릭하면 증가와 감소에 따라 색을 칠합니다.',
    addEvent: '사건이나 맥락 추가',
    addProcess: '과정 추가',
    hypothesis: '고려 중인 것을 넣어 보고 무엇이 달라지는지 확인 (H)',
    kernel: '치료 커널 (개발 중)',
    analyse: '중심성, 피드백 루프, 경로, 지렛대',
    snapshots: '지금 맵을 시점으로 저장해 두고 나중에 비교하기',
    import: '저장해 둔 파일 불러오기',
    export: '이미지, PDF, JSON 또는 CSV로 저장',
    share: '이 맵으로 가는 링크 받기',
    help: '사용 방법',
    templates: '예시에서 시작하기',
    guided: '단계별로 만들기',
    themeToLight: '밝은 테마로 전환',
    themeToDark: '어두운 테마로 전환',
    language: '인터페이스 언어 바꾸기',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, 또는 Delete/Backspace로 선택한 것을 지웁니다',
    closePanel: '패널 닫기',
    closeDialog: '대화상자 닫기',
    closeGuide: '가이드 닫기',
  },

  privacy: {
    localOnly: '모든 것이 이 기기 안에만 있습니다',
    localOnlyLong:
      '맵은 이 브라우저에 저장되며 어디로도 전송되지 않습니다. 탭을 닫아도 안전합니다. 브라우저 데이터를 지우면 맵도 함께 사라지니, 남기고 싶은 것은 내보내 두세요.',
    studyMode: '연구 모드',
    studyModeLong:
      '연구에 참여하고 계십니다. 만든 맵과 만들어 간 순서가 연구 서버에 저장됩니다.',
    autosaveUnavailable: '자동 저장 불가 — 내보내기로 작업을 남기세요',
    autosaveUnavailableLong:
      '이 브라우저가 페이지의 저장을 허용하지 않고 있습니다. 보통 HTML 파일을 디스크에서 바로 열었거나 시크릿 창을 쓸 때 그렇습니다. 작업은 여전히 비공개이지만 탭을 닫으면 사라집니다. 내보내기로 남겨 두세요.',
  },

  panel: {
    analysis: '분석',
    snapshots: '시점',
    listView: '목록 보기',
  },

  nodeEditor: {
    newEvent: '새 사건 또는 맥락',
    newNode: '새 노드',
    edit: '노드 편집',
    name: '이름',
    namePlaceholder: '내담자가 쓴 말 그대로',
    category: '범주',
    ratingsDisclosure: '평정과 메모 (선택)',
    ratingsNote:
      '사람 사이와 시점 사이의 네트워크를 비교하는 연구 프로토콜에서 씁니다. 일상적인 임상 매핑에는 필요하지 않습니다.',
    severity: '얼마나 괴로운지 (0–10)',
    frequency: '얼마나 자주 있는지 (0–10)',
    notes: '메모',
    notRated: '평정 없음',
    severityShort: '심',
    frequencyShort: '빈',
    rate: '평정',
    clearRating: '지우기',
  },

  edgeEditor: {
    title: '이것이 저것에 어떻게 작용하나요?',
    sentenceIncreases: '{source} → {target} 증가',
    sentenceDecreases: '{source} → {target} 감소',
    increasesIt: '늘린다',
    decreasesIt: '줄인다',
    altDirection: '이 둘은 반대 방향으로도 서로 영향을 줍니다.',
    editAlt: '{source} → {target} 편집',
    removeLink: '연결 삭제',
    addLink: '연결 추가',
    helpingDisclosure: '이 연결은 도움이 되나요?',
    helpingNote:
      '어떤 과정도 그 자체로 도움이 되거나 해롭지는 않습니다. 무엇과 이어지는지에 달려 있고, 그래서 상자에 이름을 붙일 때가 아니라 여기에서 묻습니다. 연결을 표시해 두어야 분석 패널이 어떤 변화가 가장 멀리 퍼지는지뿐 아니라 어떤 변화가 도움이 될지까지 말해 줄 수 있습니다. 그 기능을 쓰지 않는다면 그냥 두어도 됩니다.',
  },

  category: {
    uncategorised: {
      label: '미분류',
      prefix: '',
      hint: '아직 분류하지 않았습니다. 생각이 정리되는 중이라면 그대로 두어도 됩니다.',
    },
    affect: {
      label: '정서',
      prefix: '정서',
      hint: '감정과 기분. 그것을 회피하는지, 기꺼이 경험하는지.',
    },
    cognition: {
      label: '인지',
      prefix: '인지',
      hint: '생각, 신념, 규칙, 반추, 탈융합.',
    },
    attention: {
      label: '주의',
      prefix: '주의',
      hint: '무엇을 알아차리고 무엇을 놓치는지. 유연한 주의인지 좁아진 주의인지.',
    },
    self: {
      label: '자기',
      prefix: '자기',
      hint: '자기개념, 정체성, 자기비판, 맥락으로서의 자기.',
    },
    motivation: {
      label: '동기',
      prefix: '동기',
      hint: '가치, 목표, 그 사람이 다가가는 것과 멀어지는 것.',
    },
    overtBehaviour: {
      label: '외현 행동',
      prefix: '외현행동',
      hint: '겉으로 드러나는 행동. 그 사람이 실제로 하는 것.',
    },
    biophysiological: {
      label: '생물생리',
      prefix: '생물생리',
      hint: '수면, 통증, 질병, 약물, 각성, 생리 상태.',
    },
    sociocultural: {
      label: '사회문화',
      prefix: '사회문화',
      hint: '관계, 가족, 문화, 사회적 지지나 압력.',
    },
    context: {
      label: '맥락 / 사건',
      prefix: '사건',
      hint: '그 사람이 하는 일이 아니라 상황이나 사건. 모서리가 둥근 상자로 그립니다.',
    },
  },
  categoryGroup: {
    dimension: '심리적 차원',
    level: '수준',
    other: '맥락과 미분류',
  },

  strength: {
    1: '조금',
    2: '어느 정도',
    3: '많이',
  },

  valence: {
    neutral: '판단 안 함',
    helpful: '도움이 됨',
    unhelpful: '도움이 안 됨',
  },

  trial: {
    proposed: '고려 중',
    adopted: '해 봤고 도움이 됨',
    ruledOut: '해 봤지만 도움이 안 됨',
    proposedHint:
      '아직 아이디어입니다. 점선으로 그려지고, 비교의 기준이 되는 기저선에서는 빠집니다.',
    adoptedHint: '효과가 있었습니다. 맵의 일부가 되어 다른 것들과 똑같이 그려집니다.',
    ruledOutHint: '효과가 없었습니다. 흐리게 남겨 두어 무엇을 이미 해 봤는지 볼 수 있습니다.',
    dialogTitle: '이건 어떻게 됐나요?',
    legend: '지금 어디까지 왔나요?',
    lastRecorded: '마지막 기록 {when}',
    notATrial: '시도가 아님 — 맵의 평범한 일부로 되돌리기',
  },

  analysis: {
    title: '분석',
    summary: '이 네트워크가 보여 주는 것',
    central: '가장 많이 연결된 것',
    loops: '피드백 루프',
    leverage: '변화가 가장 멀리 퍼질 곳',
    paths: '경로 따라가기',
    whatIf: '만약에',
    empty: '노드와 연결을 추가하면 분석이 나타납니다.',

    stats: '노드 {nodes}개 · 연결 {edges}개 · 밀도 {density}',

    scopeAll: '전체 연결',
    scopeUnhelpful: '부적응적',
    scopeHelpful: '적응적',
    centralNote:
      '강도는 드나드는 영향의 양을 셉니다. 치료 표적을 고르는 데 근거가 가장 많은 중심성 지표이지만, 중심에 있다고 해서 곧 손을 대야 할 곳인 것은 아닙니다.',
    scopeUnhelpfulNote:
      '도움이 안 된다고 표시한 화살표만 셉니다. 여기에서 점수가 높다면 문제를 붙들고 있는 과정입니다.',
    scopeHelpfulNote:
      '도움이 된다고 표시한 화살표만 셉니다. 여기에서 점수가 높다면 그 사람이 이미 가지고 있는 힘입니다. 새로운 것을 더하기보다 이것을 키우는 편이 나을 때가 많습니다.',
    excludedNote_one:
      '판단하지 않은 연결 {count}개는 양쪽 어디에도 들어가지 않아서, 둘을 더해도 전체 수치와 맞지 않습니다.',
    excludedNote_other:
      '판단하지 않은 연결 {count}개는 양쪽 어디에도 들어가지 않아서, 둘을 더해도 전체 수치와 맞지 않습니다.',
    noneMarkedHelpful:
      '아직 도움이 된다고 표시한 것이 없습니다. 연결을 열어 도움이 되는지 정하면 여기가 채워집니다.',
    noneMarkedUnhelpful:
      '아직 도움이 안 된다고 표시한 것이 없습니다. 연결을 열어 도움이 되는지 정하면 여기가 채워집니다.',

    colNode: '노드',
    colIn: '들어옴',
    colOut: '나감',
    colStrength: '강도',
    colNetOutward: '순 유출',
    chipEntryPoint: '진입점',
    chipEndpoint: '종착점',
    chipUnconnected: '연결 없음',
    chipNothingHelping: '도움 되는 연결 없음',
    chipNothingUnhelpful: '도움 안 되는 연결 없음',

    reinforcing: '강화',
    balancing: '균형',
    reinforcingHelp:
      '스스로 유지됩니다. 루프 안 어디에서든 무언가 늘어나면 한 바퀴 돌아 더 큰 증가로 되돌아옵니다. 촉발한 일이 지나간 뒤에도 문제가 계속되는 이유가 여기에 있습니다.',
    balancingHelp:
      '스스로 교정합니다. 이 루프 안의 무언가가 되밀어 내며, 대개 자연스러운 제동 장치를 뜻합니다.',
    noLoops: '루프를 찾지 못했습니다.',
    manyLoops: '이 네트워크에는 루프가 많습니다. 가장 강한 것만 보여 줍니다.',
    loopSteps_one: '{count}단계, 이득 {gain}',
    loopSteps_other: '{count}단계, 이득 {gain}',

    heuristicWarning:
      '이 수치는 사람이 아니라 그린 맵을 설명합니다. 영향이 선형이고 즉각적이라고 가정하지만 실제로는 그렇지 않습니다. 생각을 위한 도구로 쓰되 예측으로 삼지는 마세요.',
    colIfReduced: '이것을 줄인다면',
    colBenefit: '모델상 이득',
    colReach: '도달 범위',
    wouldAlsoSuppress: '{labels}도 함께 억제됩니다',
    chipNoDampening: '감쇠 없음',

    from: '출발',
    to: '도착',
    choose: '고르세요…',
    noRoute: '한쪽에서 다른 쪽으로 가는 경로가 없습니다.',
    routeStats_one: '경로 {count}개 · 증가 {up} · 감소 {down} · 순효과 {net}',
    routeStats_other: '경로 {count}개 · 증가 {up} · 감소 {down} · 순효과 {net}',
    pathSteps_one: '{count}단계, 효과 {effect}',
    pathSteps_other: '{count}단계, 효과 {effect}',
    increases: '증가',
    decreases: '감소',

    colNow: '지금',
    colWithThis: '이것을 더하면',
    rowReinforcing: '강화 루프',
    rowBalancing: '균형 루프',
    rowAmplification: '모델상 증폭',
    newBrakes: '체계에 새로 생기는 제동',
    badgeNewBalancing: '새 균형 루프',
    howItActs: '한 바퀴마다 어떻게 작용하는지',
    mechSelfCorrecting: '스스로 교정함',
    mechSteadyPressure: '꾸준한 압력',
    mechPushedHarder: '더 세게 밀림',
    mechUntouched: '건드리지 않음',
    pressureOn: '{labels}에 압력 · 계속 유지해야 함',
    holdsOnItsOwn: '스스로 유지됨',
  },

  summary: {
    noNodes: '노드를 몇 개 추가하면 분석이 나타납니다.',
    noEdges:
      '아직 아무것도 이어지지 않았습니다. 연결을 추가하면 각 부분이 서로 어떻게 영향을 주는지 볼 수 있습니다.',
    mostConnected_one:
      '이 네트워크에서 가장 많이 연결된 부분은 **{label}** (들어오는 영향 {inDegree}, 나가는 영향 {outDegree}). 중심에 있는 노드는 변화가 가장 멀리 퍼지는 곳인 경우가 많지만, 직접 움직이기가 가장 어려운 곳이기도 합니다.',
    mostConnected_other:
      '이 네트워크에서 가장 많이 연결된 부분은 **{label}** (들어오는 영향 {inDegree}, 나가는 영향 {outDegree}). 중심에 있는 노드는 변화가 가장 멀리 퍼지는 곳인 경우가 많지만, 직접 움직이기가 가장 어려운 곳이기도 합니다.',
    reinforcing_one:
      '여기에는 **강화 루프가 {count}개** 있습니다. 스스로 유지되는 순환이어서, 처음 시작시킨 것이 지나간 뒤에도 계속 돌아갑니다.',
    reinforcing_other:
      '여기에는 **강화 루프가 {count}개** 있습니다. 스스로 유지되는 순환이어서, 처음 시작시킨 것이 지나간 뒤에도 계속 돌아갑니다.',
    tightestLoop: ' 가장 짧은 것은 {path}.',
    noReinforcing:
      '강화 루프를 찾지 못했습니다. 여기에서 무언가가 자기 자신으로 되먹임되는지 물어볼 만합니다. 문제를 지속시키는 것은 대개 피드백이기 때문입니다.',
    balancing_one:
      '균형 루프를 {count}개 찾았습니다. 스스로 교정하는 루프로, 그 사람에게 이미 문제를 눌러 주는 자연스러운 제동 장치가 있다는 표시인 경우가 많습니다.',
    balancing_other:
      '균형 루프를 {count}개 찾았습니다. 스스로 교정하는 루프로, 그 사람에게 이미 문제를 눌러 주는 자연스러운 제동 장치가 있다는 표시인 경우가 많습니다.',
    sources_one:
      '{labels}: 다른 것에 영향을 주지만 네트워크 안의 무엇도 되돌려 영향을 주지 않습니다. 이런 진입점이 손대기 가장 수월한 출발점일 때가 있습니다.',
    sources_other:
      '{labels}: 다른 것에 영향을 주지만 네트워크 안의 무엇도 되돌려 영향을 주지 않습니다. 이런 진입점이 손대기 가장 수월한 출발점일 때가 있습니다.',
    leverage_one:
      '모델상 효과가 가장 넓은 것은 **{label}** 줄이기이고, 다른 노드 {reach}개까지 미칩니다.',
    leverage_other:
      '모델상 효과가 가장 넓은 것은 **{label}** 줄이기이고, 다른 노드 {reach}개까지 미칩니다.',
    leverageCaveat_one:
      ' 다만 {labels}도 함께 억제됩니다. 도움이 된다고 표시한 연결에 걸려 있기 때문입니다.',
    leverageCaveat_other:
      ' 다만 {labels}도 함께 억제됩니다. 도움이 된다고 표시한 연결에 걸려 있기 때문입니다.',
    isolated_one: '{labels}: 아직 아무것과도 이어져 있지 않습니다.',
    isolated_other: '{labels}: 아직 아무것과도 이어져 있지 않습니다.',
    diverges:
      '모델을 돌리면 이 네트워크의 일부가 끝없이 증폭됩니다. 대개 감쇠가 없는 강한 강화 루프가 있다는 뜻입니다. 지렛대 수치는 참고용으로만 보세요.',
    caveat:
      '_이 수치는 사람이 아니라 그린 맵을 설명합니다. 자기 생각을 구조적으로 들여다보는 방법이지, 앞으로 무슨 일이 일어날지에 대한 예측이 아닙니다._',
  },

  guided: {
    ariaLabel: '단계별 작성',
    stepOf: '{total}단계 중 {current}단계',
    done: '다 됐습니다. 준비되면 다음으로 넘어가세요.',
    footer:
      '언제든 가이드를 닫아도 지금까지 만든 것은 그대로 남습니다. 이 단계들은 채워야 할 양식이 아니라 발판입니다.',
    step1Title: '1. 맥락에서 시작하기',
    step1Body:
      '사건/맥락 버튼을 눌러 이것이 무엇에 관한 이야기인지 넣으세요. 무슨 일이 있었고, 어디에서, 누구와 있었는지. 그 사람이 하는 행동이 아니기 때문에 모서리가 둥근 상자가 됩니다.\n\n여기에서 시작하는 것은 형식이 아닙니다. 기능 평가에서는 같은 생각이나 행동도 상황이 달라지면 다른 것을 뜻합니다. 그래서 맥락이 있어야 그 뒤의 모든 것을 해석할 수 있습니다.',
    step1Nudge: '먼저 사건이나 맥락 상자를 추가하세요.',
    step2Title: '2. 반응과 그 뒤에 오는 것 넣기',
    step2Body:
      '이제 안에서 일어나는 것(생각, 감정, 충동)과 그 사람이 하는 행동 또는 그 결과를 넣으세요. 맥락에서부터 순서대로 이어 주세요.\n\n이것이 삼항 유관, 곧 기능 평가를 이루는 기본 단위입니다. 나머지는 모두 여기에서 자라납니다.',
    step2NudgeNodes: '상자를 두 개 더 추가하세요. 내적 반응, 그다음 일어나는 일.',
    step2NudgeEdges: '이제 이어 주세요. 맥락 → 내적 반응 → 일어나는 일.',
    step3Title: '3. 되돌아오는지 살펴보기',
    step3Body:
      '사슬의 끝을 보고 물어보세요. 그것이 앞쪽의 무언가로 되먹임되나요? 잠을 못 자면 걱정이 늘고, 걱정이 늘면 다시 잠을 못 잡니다.\n\n피드백은 처음 시작시킨 것이 사라진 뒤에도 문제가 오래 지속되는 이유인 경우가 많습니다.',
    step3Nudge: '아직 되돌아오는 연결이 없습니다. 그 결과가 앞쪽의 무언가로 이어지지는 않나요?',
    step4Title: '4. 함께 얽힌 것 넣기',
    step4Body:
      '여기에 또 무엇이 얽혀 있나요? 결과의 영향을 받으면서 다시 반응으로 되먹임되는 것이 있다면 노드로 넣으세요.\n\n증폭시키는 것이 특히 중요합니다. 피로는 그저 또 하나의 문제가 아니라, 나머지 모든 것을 더 위협적으로 느끼게 만듭니다.',
    step4Nudge: '요소를 하나 이상 더 추가하세요.',
    step5Title: '5. 도움이 되는 것 넣기',
    step5Body:
      '모든 것이 상황을 나쁘게만 만들지는 않습니다. 이 문제들 가운데 하나를 줄여 주는 것을 넣고, 감소 연결로 그린 다음, 그 연결을 도움이 됨으로 표시하세요.\n\n사람들이 자주 건너뛰는 부분이지만, 개입이 자리 잡는 곳은 대개 여기입니다.',
    step5NudgeDecrease: '이 가운데 하나를 줄여 주는 것을 넣고 감소 연결로 그리세요.',
    step5NudgeHelpful: '그 연결을 도움이 됨으로 표시해, 무엇이 작동하고 있는지 맵에 드러내세요.',
    step6Title: '6. 가로막는 것 그리기',
    step6Body:
      '이제 어려운 부분입니다. 도움이 되는 그것을 하지 못하게 막는 것은 무엇인가요?\n\n“운동을 더 하세요” 같은 말이 그토록 공허하게 들리는 이유가 여기에 있습니다. 도움이 된다는 것은 그 사람도 이미 압니다. 체계 안의 무언가가 그것을 누르고 있고, 그것이 보이기 전까지 조언은 갈 곳이 없습니다.',
    step6Nudge: '도움이 되는 것을 억누르는 연결을 추가하세요.',
  },

  snapshots: {
    intro:
      '지금 상태의 네트워크를 저장해 두고, 나중에 다시 와서 새로 그리세요. 무엇도 덮어쓰지 않습니다.',
    labelPlaceholder: '이름, 예를 들어 초기 면담이나 6회기',
    labelAria: '이 시점의 이름',
    saveButton: '시점 저장',
    none: '아직 저장한 시점이 없습니다.',
    meta: '{when} · 노드 {nodes}개 · 연결 {edges}개',
    deleteAria: '시점 {label} 삭제',
    compare: '비교',
    earlier: '이전',
    later: '이후',
    changes_one: '변화 {count}개',
    changes_other: '변화 {count}개',
    downloadComparison: '비교 결과 내려받기 (CSV)',
  },

  structure: {
    empty: '아직 아무것도 없습니다. 노드를 추가해 시작하세요.',
    nodes: '노드 ({count})',
    connections: '연결 ({count})',
    noConnections: '아직 없습니다.',
    nodeMetaDistress: ' · 고통 {value}',
    nodeMetaFrequency: ' · 빈도 {value}',
    deleteNodeAria: '노드 {label} 삭제',
    deleteEdgeAria: '연결 {sentence} 삭제',
  },

  templates: {
    intro:
      '사례개념화가 아니라 출발점입니다. 이름표를 내담자가 쓴 말로 바꾸고, 맞지 않는 것은 지우세요. 의심 없이 그대로 쓰는 템플릿은 빈 캔버스보다 나쁩니다.',
    blankName: '빈 캔버스',
    blankDescription: '아무것도 없는 상태에서 시작합니다.',
    abcName: '삼항 유관',
    abcDescription: '기본 발판입니다. 맥락, 내적 반응, 결과. 여기에서 바깥으로 넓혀 가세요.',
    worryName: '걱정과 수면의 순환',
    worryDescription: '만들어 둔 예시입니다. 강화 루프가 어떻게 생겼는지 보여 줄 때 씁니다.',
    moodName: '우울한 기분과 위축',
    moodDescription: '흔한 행동 활성화 패턴입니다. 쓰기 전에 내담자가 쓴 말로 바꾸세요.',
    painName: '만성 통증과 회피',
    painDescription: '공포-회피 패턴과, 그것을 대개 유지시키는 신체 기능 저하 루프입니다.',
  },

  templateNodes: {
    abcTrigger: '촉발 사건이나 상황',
    abcThought: '생각이나 감정',
    abcAction: '내가 하는 행동',

    worryCriticism: '직장에서 들은 지적',
    worryJobSecurity: '일자리를 잃을까 하는 걱정',
    worrySleep: '잠들기 어려움',
    worryFatigue: '피로',
    worryExercise: '운동',
    worryWithdrawal: '사람들과 멀어짐',

    moodLow: '우울한 기분',
    moodStayingHome: '집에만 있기',
    moodFewerThings: '나에게 의미 있는 일이 줄어듦',
    moodBurden: '나는 짐이다',
    moodContact: '친구들과의 연락',
    moodNoticing: '작고 좋은 순간을 알아차리기',

    painPain: '통증',
    painFear: '더 나빠질까 봐 두려움',
    painAvoiding: '활동을 피함',
    painDeconditioning: '신체 기능 저하',
    painDoingAnyway: '그래도 중요한 일 하기',
    painWillingness: '불편함을 기꺼이 느끼기',
  },

  templateNote:
    '이것은 사례개념화가 아니라 출발점입니다. 이름표를 내담자가 쓴 말로 바꾸세요.',

  exportDialog: {
    intro:
      'CSV 형식은 R이나 Python에서 바로 불러올 수 있습니다. 인접 행렬은 qgraph, igraph, networkx가 입력으로 기대하는 형식입니다.',
    json: '네트워크 (JSON)',
    edges: '엣지 목록 (CSV)',
    nodes: '노드 목록 (CSV)',
    matrix: '인접 행렬 (CSV)',
    report: '분석 보고서 (Markdown)',
    events: '작성 기록 (CSV)',
    png: '이미지 (PNG)',
    svg: '벡터 (SVG)',
    print: '인쇄 / PDF',
  },

  share: {
    title: '링크 공유',
    intro:
      '네트워크 전체가 링크 자체에 담깁니다. 서버에 사본이 남지 않고, 내용이 담긴 부분은 웹 요청으로 전송되지 않기 때문에 어디에도 저장되거나 기록되지 않습니다. 링크가 있는 사람은 누구나 열어서 자기 사본을 편집할 수 있습니다.',
    building: '링크를 만드는 중…',
    tooLong:
      '이 네트워크는 링크에 담기에 너무 큽니다 ({length}자). JSON으로 내보내 파일로 보내세요.',
  },

  clearDialog: {
    title: '이 네트워크를 지울까요?',
    body: '노드 {nodes}개와 연결 {edges}개가 모두 지워집니다. 되돌릴 수 있고, 저장해 둔 시점은 그대로 남습니다.',
    confirm: '전부 지우기',
  },

  kernel: {
    title: '치료 커널',
    warning: '개발 중입니다. 이 버튼 뒤에는 아직 아무것도 없습니다.',
    p1: '치료 커널의 어휘집을 만들려고 합니다. 치료적 변화의 가장 작은 단위를, 맵 위의 과정에 붙일 수 있을 만큼 일관된 말로 정리하는 것입니다. 과정을 하나 고르면 그것에 작용한다고 알려진 커널을 볼 수 있게 됩니다.',
    p2: '어려운 부분은 무엇을 하나의 커널로 볼지, 얼마나 잘게 나눌지 정하는 일이고, 아직 정해지지 않았습니다.',
    p3: '이 데이터베이스를 어떻게 정리하면 좋을지 의견이 있다면 Kean에게 들려주세요:',
  },

  help: {
    title: '사용 방법',
    buildingHeading: '맵 만들기',
    buildingEvent:
      '이것이 무엇에 관한 이야기인지, 그 상황. 여기에서 시작하세요. 빈 캔버스에서는 아무 곳이나 클릭하면 만들어집니다. 그 사람이 하는 행동이 아니기 때문에 모서리가 둥근 상자가 됩니다.',
    buildingAdd: '과정 하나. 생각, 감정, 충동, 행동. 네모난 상자이고 EEMM 범주에 따라 색이 붙습니다.',
    buildingConnect:
      '영향을 주는 상자를 클릭한 다음 영향을 받는 상자를 클릭하세요. 그러고 나서 한 번의 클릭으로 늘리는지 줄이는지, 얼마나 그런지를 고릅니다.',
    buildingDelete: '아무 상자나 화살표를 클릭하세요. 또는 선택한 뒤 Delete를 누르세요.',
    buildingDoubleClick: '상자를 두 번 클릭하면 편집합니다. 어떤 모드에서든 끌어서 옮길 수 있습니다.',

    readingHeading: '그림 읽기',
    readingArrowheads:
      '**속이 찬** 화살촉은 증가, **속이 빈** 화살촉은 감소를 뜻합니다. 선이 굵고 화살촉이 클수록 영향이 셉니다. 숫자도 없고 색에 기대지도 않습니다.',
    readingReciprocal: '양쪽 끝에 화살촉이 있는 선은 둘이 서로 영향을 준다는 뜻입니다.',
    readingShapes: '네모난 상자는 과정이고, 모서리가 둥근 상자는 사건이나 맥락입니다.',
    readingColour:
      '연결을 도움이 됨(초록)이나 도움이 안 됨(빨강)으로 표시하지 않는 한 화살표는 검은색입니다. 대부분은 검은색으로 둡니다. 이 표시는 새로 넣은 무언가가 루프를 끊는지 확인할 때 쓰는 것입니다.',
    readingColourMode:
      '증감 버튼을 누르면 화살표 색이 대신 증가(파랑)와 감소(주황)를 나타냅니다. 영향의 방향을 보려고 할 때 쓰세요.',

    keyboardHeading: '키보드',
    keyboardTools: '선택 · 사건/맥락 · 노드 추가 · 연결 · 삭제',
    keyboardConnectFromSelection: '상자를 선택하고 C를 누르면 다음 클릭으로 연결이 완성됩니다.',
    keyboardDelete: 'Delete나 Backspace로 선택한 것을 지웁니다.',
    keyboardEscape: 'Esc는 하던 것을 취소합니다. 한 번 더 누르면 선택 모드로 돌아갑니다.',
    keyboardView: 'F 화면 맞춤 · O 정렬 · M 평정 · G 격자',
    keyboardEditing:
      'Ctrl/Cmd+Z 되돌리기 · Shift+클릭으로 여러 개 선택 · Ctrl/Cmd+C와 Ctrl/Cmd+V 복사·붙여넣기 · Ctrl/Cmd+D 복제',

    organiseHeading: '정렬',
    organiseBody:
      '화살표의 흐름을 따라 상자를 행과 열로 정돈하고, 중심이 되는 맥락을 맨 앞에 둡니다. 가로와 세로로 모두 배치해 보고 화면에 더 잘 맞는 쪽을 남깁니다. 순서를 정할 때 피드백 루프는 빼고 보기 때문에, 흐름이 뒤엉키지 않고 루프는 루프로 읽힙니다.',

    mouselessHeading: '마우스 없이 쓰기',
    mouselessBody:
      '목록 보기는 맵 전체를 텍스트로 보여 줍니다. Tab으로 옮겨 다니고 키보드로 편집할 수 있습니다. 캔버스는 스크린 리더에 보이지 않기 때문에, 스크린 리더가 읽는 것도 이 목록입니다.',
    openListView: '목록 보기 열기',

    cautionHeading: '분석에 대한 주의',
    cautionBody:
      '중심성, 루프, 지렛대는 사람이 아니라 그려진 맵을 설명합니다. 영향이 선형이고 즉각적이라고 가정하지만 실제로는 그렇지 않습니다. 자기 생각을 구조적으로 따져 보는 방법이며, 바탕이 된 평정만큼의 값어치를 지닙니다.',
  },

  about: {
    title: '정보',
    intro:
      '심리적 고통과 안녕을 유지시키는 과정들 사이의 기능적 관계, 곧 과정 기반 네트워크를 그리기 위한 무료 오픈소스 도구입니다.',
    groundingHeading: '이론적 바탕',
    groundingBody:
      '이 도구의 범주와 과정을 보는 방식은 **Steven C. Hayes와 Stefan G. Hofmann**의 과정 기반 치료 작업에서 제시된 확장 진화 메타모델(EEMM)에서 왔습니다. 정서, 인지, 주의, 자기, 동기, 외현 행동이 생물생리적 수준과 사회문화적 수준 위에 놓이고, 언제나 맥락 속에서 읽힙니다.',
    inspiration: '이것을 브라우저에서 해 보자는 생각은 Joseph Ciarrochi의 다음 작업에서 얻었습니다:',
    madeByHeading: '만든 사람',
    madeByBody:
      'Tan Kean Sian이 이 도구를 구상하고 개발을 이끌었으며, 코드는 모두 Anthropic의 AI 어시스턴트 Claude와 함께 썼습니다. 질문이나 개선 제안은 언제든 환영합니다:',
    dataHeading: '데이터가 있는 곳',
    dataBody:
      '당신의 브라우저 안, 그리고 그 밖 어디에도 없습니다. 계정도 서버도 분석 추적도 없습니다. 브라우저 데이터를 지우면 맵도 지워지니 남기고 싶은 것은 내보내 두세요. 공유 링크는 맵을 어딘가에 올리는 것이 아니라 링크 안에 담아 나릅니다.',
    licence: 'MIT 라이선스입니다. 기여를 환영합니다.',
  },

  error: {
    canvasTitle: '그리기 캔버스를 시작하지 못했습니다',
    canvasHint:
      '보통 이 컴퓨터에서 그래픽 가속을 쓸 수 없을 때 생깁니다. 네트워크는 안전합니다. 목록 보기를 열면 텍스트로 읽고 편집할 수 있고, 내보내기로 밖으로 꺼낼 수 있습니다.',
    technicalDetail: '기술적 세부 정보',
  },

  toast: {
    copied_one: '상자 {count}개를 복사했습니다. Ctrl/Cmd+V로 붙여넣으세요.',
    copied_other: '상자 {count}개를 복사했습니다. Ctrl/Cmd+V로 붙여넣으세요.',
    pasted_one: '상자 {count}개를 붙여넣었습니다.',
    pasted_other: '상자 {count}개를 붙여넣었습니다.',
    duplicated_one: '상자 {count}개를 복제했습니다.',
    duplicated_other: '상자 {count}개를 복제했습니다.',
    hypothesisOn: '가설 모드가 켜졌습니다. 지금부터 넣는 것은 제안으로 보고 점선으로 그립니다.',
    sharedOpened: '공유된 네트워크를 열었습니다. 저장해 둔 작업은 덮어쓰지 않았습니다.',
    imported: '가져왔습니다.',
    importUnreadable: '그 파일을 읽을 수 없습니다.',
    importNotJson: '그 파일은 올바른 JSON이 아닙니다.',
  },

  language: {
    title: '언어',
    note: '번역은 커뮤니티가 기여한 것이며 아직 검토 중입니다. 특히 임상 용어는 언어에 따라 확정되지 않았을 수 있습니다.',
    contribute: '잘못된 번역을 발견하셨나요? 수정 제안은 언제든 환영합니다:',
    draft: '초안',
  },

  a11y: {
    canvas: '네트워크 캔버스. 같은 내용을 키보드로 다룰 수 있는 형태는 목록 보기에 있습니다.',
    toolbar: '도구',
    scopeTabs: '어떤 연결을 셀지',
  },
};
