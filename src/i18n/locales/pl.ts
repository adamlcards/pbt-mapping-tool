import type { PartialStrings } from '../strings';

/**
 * Polish (Polski).
 *
 * Terminology to check first: the EEMM dimensions follow the Polish
 * process-based/ACT literature — Afekt, Poznanie, Uwaga, Ja, Motywacja,
 * Zachowanie jawne (node prefix shortened to "Zachowanie" for space), with the
 * levels as Biofizjologiczny and Socjokulturowy; "defuzja", "ja jako kontekst"
 * and "gotowość" (willingness) are the ACT renderings. Systems terms use the
 * standard Polish systems-dynamics pair: reinforcing = "pętla wzmacniająca",
 * balancing = "pętla równoważąca", gain = "wzmocnienie", leverage =
 * "dźwignia". Other choices: three-term contingency = "trójczłonowa
 * kontyngencja", functional assessment = "analiza funkcjonalna", behavioural
 * activation = "aktywizacja behawioralna", fear-avoidance = "lęk i unikanie"
 * (English kept in brackets once), deconditioning = "utrata kondycji",
 * formulation = "konceptualizacja", centrality = "centralność", node strength
 * = "siła". "Treatment kernels" has no settled Polish term and is left as
 * "kernele terapeutyczne". The two ratings are named "dokuczliwość" and
 * "częstość", so their one-letter tags on the box are D and C (the S and F in
 * the ratings tooltip are keyboard keys and stay as they are). Address form is
 * consistent informal "ty", and gendered past-tense verbs aimed at the user
 * are avoided throughout ("narysowana mapa", not "mapa, którą narysowałeś").
 *
 * Plurals: Polish has three classes but the runtime has two, so `_other` never
 * lets the noun agree with the number. Wherever the count is the subject the
 * `_other` form is rephrased as a label — "kroków: {count}", "pola ({count})",
 * "Liczba pętli wzmacniających: {count}" — which reads correctly for 2–4 and
 * 5+ alike, while `_one` keeps the natural "{count} krok" wording.
 * summary.mostConnected is the one place where both forms are identical: the
 * form is chosen by {inDegree} but {outDegree} appears in the same sentence
 * and is independent of it, so neither count can be allowed to govern a noun.
 * Also note edgeEditor.sentenceIncreases/Decreases: a Polish direct object
 * would need the accusative, which a substituted label cannot take, so the
 * sentence is punctuated with a colon ("{source} zwiększa: {target}") to keep
 * the substituted label grammatical in the nominative.
 */
export const pl: PartialStrings = {
  meta: { code: 'pl', name: 'Polish', nativeName: 'Polski', dir: 'ltr' },

  app: {
    name: 'Narzędzie do mapowania sieci procesów',
    short: 'Narzędzie PBT',
    networkTitleLabel: 'Tytuł sieci',
    untitledNetwork: 'Sieć bez tytułu',
  },

  tool: {
    select: 'Zaznacz',
    add: 'Dodaj węzeł',
    connect: 'Połącz',
    delete: 'Usuń',
    event: 'Zdarzenie / kontekst',
  },

  toolHint: {
    select: 'Kliknij, aby zaznaczyć i zobaczyć powiązania. Przeciągnij, aby przesunąć.',
    add: 'Kliknij w dowolnym miejscu planszy, aby dodać węzeł.',
    connect: 'Kliknij węzeł, który wpływa, a potem ten, na który wpływa.',
    delete: 'Kliknij węzeł lub połączenie, aby je usunąć.',
    start: 'Zacznij od zdarzenia lub sytuacji, której to dotyczy. Kliknij w dowolnym miejscu.',
    focused: 'Widok zawężony do części sieci.',
    showEverything: 'Pokaż ponownie całość',
    pendingSource: 'Źródło: {label}. Teraz kliknij węzeł, na który wpływa.',
  },

  action: {
    undo: 'Cofnij',
    redo: 'Ponów',
    fit: 'Dopasuj',
    organise: 'Ułóż',
    clear: 'Wyczyść',
    grid: 'Siatka',
    ratings: 'Oceny',
    colourByValence: 'Pomaga',
    colourByDirection: 'Kierunek',
    hypothesis: 'Hipoteza',
    kernel: 'Kernele',
    analyse: 'Analiza',
    snapshots: 'Punkty czasowe',
    import: 'Importuj',
    export: 'Eksportuj',
    share: 'Udostępnij',
    help: 'Pomoc',
    about: 'O programie',
    themeLight: 'Jasny',
    themeDark: 'Ciemny',
    templates: 'Szablony',
    guided: 'Przewodnik',
    cancel: 'Anuluj',
    save: 'Zapisz',
    add: 'Dodaj',
    update: 'Aktualizuj',
    close: 'Zamknij',
    back: 'Wstecz',
    next: 'Dalej',
    finish: 'Zakończ',
    restore: 'Przywróć',
    tryAgain: 'Spróbuj ponownie',
    copy: 'Kopiuj link',
    copied: 'Skopiowano',
    language: 'Język',
  },

  tooltip: {
    undo: 'Cofnij (Ctrl/Cmd+Z)',
    redo: 'Ponów (Ctrl/Cmd+Y)',
    fit: 'Zmieść wszystko na ekranie (F)',
    organise: 'Ustaw pola w wiersze i kolumny zgodne z kierunkiem strzałek (O)',
    clear: 'Usuń wszystko',
    grid: 'Pokaż siatkę i przyciągaj do niej pola (G)',
    ratings: 'Pokaż na każdym polu oceny dokuczliwości (S) i częstości (F) (M)',
    colourIsDirection:
      'Kolor strzałek pokazuje teraz wzrost (niebieski) i spadek (pomarańczowy). Kliknij, aby zamiast tego kolorować według tego, czy połączenie pomaga.',
    colourIsValence:
      'Kolor strzałek pokazuje teraz, czy połączenie pomaga. Kliknij, aby zamiast tego kolorować według wzrostu i spadku.',
    addEvent: 'Dodaj zdarzenie lub kontekst',
    addProcess: 'Dodaj proces',
    hypothesis: 'Dodaj coś, co rozważasz, i zobacz, co by to zmieniło (H)',
    kernel: 'Kernele terapeutyczne (w przygotowaniu)',
    analyse: 'Centralność, pętle sprzężenia zwrotnego, ścieżki i dźwignie',
    snapshots: 'Zapisz tę mapę jako punkt czasowy i porównaj ją później',
    import: 'Wczytaj zapisany plik',
    export: 'Zapisz jako obraz, PDF, JSON lub CSV',
    share: 'Uzyskaj link do tej mapy',
    help: 'Jak z tego korzystać',
    templates: 'Zacznij od przykładu',
    guided: 'Budowanie krok po kroku',
    themeToLight: 'Przełącz na jasny motyw',
    themeToDark: 'Przełącz na ciemny motyw',
    language: 'Zmień język interfejsu',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D albo Delete/Backspace, aby usunąć to, co zaznaczone',
    closePanel: 'Zamknij panel',
    closeDialog: 'Zamknij okno',
    closeGuide: 'Zamknij przewodnik',
  },

  privacy: {
    localOnly: 'Wszystko zostaje na tym urządzeniu',
    localOnlyLong:
      'Twoja mapa jest zapisywana w tej przeglądarce i nigdzie nie jest wysyłana. Kartę można bezpiecznie zamknąć. Wyczyszczenie danych przeglądarki ją usunie, więc wyeksportuj wszystko, co chcesz zachować.',
    studyMode: 'Tryb badawczy',
    studyModeLong:
      'Bierzesz udział w badaniu naukowym. Twoja mapa i kolejność, w jakiej powstawała, są zapisywane na serwerze badania.',
    autosaveUnavailable: 'Autozapis niedostępny — wyeksportuj swoją pracę',
    autosaveUnavailableLong:
      'Ta przeglądarka nie pozwala stronie niczego zapisać. Zwykle dzieje się tak, gdy plik HTML jest otwierany wprost z dysku albo w oknie prywatnym. Twoja praca nadal pozostaje prywatna, ale zniknie po zamknięciu karty. Użyj Eksportuj, aby ją zachować.',
  },

  panel: {
    analysis: 'Analiza',
    snapshots: 'Punkty czasowe',
    listView: 'Widok listy',
  },

  nodeEditor: {
    newEvent: 'Nowe zdarzenie lub kontekst',
    newNode: 'Nowy węzeł',
    edit: 'Edytuj węzeł',
    name: 'Nazwa',
    namePlaceholder: 'Własnymi słowami osoby',
    category: 'Kategoria',
    ratingsDisclosure: 'Oceny i notatki (opcjonalne)',
    ratingsNote:
      'Używane w protokołach badawczych do porównywania sieci między osobami i w czasie. Niepotrzebne w codziennym mapowaniu klinicznym.',
    severity: 'Jak bardzo dokuczliwe (0–10)',
    frequency: 'Jak często (0–10)',
    notes: 'Notatki',
    notRated: 'Nie oceniono',
    severityShort: 'D',
    frequencyShort: 'C',
    rate: 'Oceń',
    clearRating: 'Wyczyść',
  },

  edgeEditor: {
    title: 'Jak to wpływa na tamto?',
    sentenceIncreases: '{source} zwiększa: {target}',
    sentenceDecreases: '{source} zmniejsza: {target}',
    increasesIt: 'Zwiększa',
    decreasesIt: 'Zmniejsza',
    altDirection: 'Te dwa elementy wpływają na siebie także w drugą stronę.',
    editAlt: 'Edytuj {source} → {target}',
    removeLink: 'Usuń połączenie',
    addLink: 'Dodaj połączenie',
    helpingDisclosure: 'Czy to połączenie pomaga?',
    helpingNote:
      'Żaden proces nie jest sam w sobie pomocny ani szkodliwy; zależy to od tego, z czym się łączy, i dlatego pytamy o to tutaj, a nie przy nazywaniu pola. Oznaczanie połączeń pozwala panelowi Analiza wskazać, która zmiana pomoże, a nie tylko która rozejdzie się najdalej. Zostaw to w spokoju, jeśli z tego nie korzystasz.',
  },

  category: {
    uncategorised: {
      label: 'Bez kategorii',
      prefix: '',
      hint: 'Jeszcze nie sklasyfikowane. Spokojnie można to tak zostawić, dopóki się zastanawiasz.',
    },
    affect: {
      label: 'Afekt',
      prefix: 'Afekt',
      hint: 'Emocje i uczucia. Unikanie ich albo gotowość, by ich doświadczać.',
    },
    cognition: {
      label: 'Poznanie',
      prefix: 'Poznanie',
      hint: 'Myśli, przekonania, reguły, ruminacje, defuzja.',
    },
    attention: {
      label: 'Uwaga',
      prefix: 'Uwaga',
      hint: 'To, co jest zauważane, i to, co nie. Uwaga elastyczna albo zawężona.',
    },
    self: {
      label: 'Ja',
      prefix: 'Ja',
      hint: 'Obraz siebie, tożsamość, samokrytycyzm, ja jako kontekst.',
    },
    motivation: {
      label: 'Motywacja',
      prefix: 'Motywacja',
      hint: 'Wartości, cele, to, ku czemu osoba zmierza i od czego się oddala.',
    },
    overtBehaviour: {
      label: 'Zachowanie jawne',
      prefix: 'Zachowanie',
      hint: 'Działanie obserwowalne. To, co osoba faktycznie robi.',
    },
    biophysiological: {
      label: 'Biofizjologiczny',
      prefix: 'Biofizjologia',
      hint: 'Sen, ból, choroba, leki, pobudzenie, fizjologia.',
    },
    sociocultural: {
      label: 'Socjokulturowy',
      prefix: 'Socjokultura',
      hint: 'Relacje, rodzina, kultura, wsparcie lub presja społeczna.',
    },
    context: {
      label: 'Kontekst / zdarzenie',
      prefix: 'Zdarzenie',
      hint: 'Sytuacja lub zdarzenie, a nie działanie osoby. Rysowane z zaokrąglonymi rogami.',
    },
  },

  categoryGroup: {
    dimension: 'Wymiary psychologiczne',
    level: 'Poziomy',
    other: 'Kontekst i bez kategorii',
  },

  strength: {
    1: 'Nieznacznie',
    2: 'Umiarkowanie',
    3: 'Silnie',
  },

  valence: {
    neutral: 'Nie oceniono',
    helpful: 'Pomaga',
    unhelpful: 'Nie pomaga',
  },

  trial: {
    proposed: 'Rozważane',
    adopted: 'Wypróbowane, pomogło',
    ruledOut: 'Wypróbowane, nie pomogło',
    proposedHint:
      'Na razie pomysł. Rysowane linią przerywaną i pomijane w punkcie odniesienia, do którego porównuje się zmianę.',
    adoptedHint: 'Zadziałało. Staje się częścią mapy i jest rysowane tak jak wszystko inne.',
    ruledOutHint: 'Nie zadziałało. Zostaje, ale wyblakłe, żeby było widać, co już wypróbowano.',
    dialogTitle: 'Co się z tym stało?',
    legend: 'Na jakim to jest etapie?',
    lastRecorded: 'Ostatni zapis {when}',
    notATrial: 'To wcale nie próba — zamień to w zwykły element mapy',
  },

  analysis: {
    title: 'Analiza',
    summary: 'Co pokazuje ta sieć',
    central: 'Najsilniej powiązane',
    loops: 'Pętle sprzężenia zwrotnego',
    leverage: 'Gdzie zmiana może sięgnąć najdalej',
    paths: 'Prześledź ścieżkę',
    whatIf: 'Co, jeśli',
    empty: 'Dodaj węzły i połączenia, aby zobaczyć analizę.',

    stats: 'węzły: {nodes} · połączenia: {edges} · gęstość {density}',

    scopeAll: 'Wszystkie połączenia',
    scopeUnhelpful: 'Nieadaptacyjne',
    scopeHelpful: 'Adaptacyjne',
    centralNote:
      'Siła liczy, ile wpływu do węzła wpływa i ile z niego wypływa. To miara centralności z najlepszym wsparciem przy wyborze celów oddziaływania, ale centralny węzeł nie jest automatycznie tym właściwym, na który warto naciskać.',
    scopeUnhelpfulNote:
      'Liczone są tylko strzałki oznaczone jako niepomocne. Wysoki wynik to proces, który spaja problem w całość.',
    scopeHelpfulNote:
      'Liczone są tylko strzałki oznaczone jako pomocne. Wysoki wynik to coś, co osoba już ma po swojej stronie — często warto na tym budować, zamiast dodawać coś nowego.',
    excludedNote_one:
      '{count} nieocenione połączenie jest pomijane w obu podziałach, więc nie zsumują się one do wartości łącznych.',
    excludedNote_other:
      'Nieocenione połączenia ({count}) są pomijane w obu podziałach, więc nie zsumują się one do wartości łącznych.',
    noneMarkedHelpful:
      'Nic nie jest jeszcze oznaczone jako pomocne. Otwórz połączenie i ustaw, czy pomaga, aby to wypełnić.',
    noneMarkedUnhelpful:
      'Nic nie jest jeszcze oznaczone jako niepomocne. Otwórz połączenie i ustaw, czy pomaga, aby to wypełnić.',

    colNode: 'Węzeł',
    colIn: 'Wejście',
    colOut: 'Wyjście',
    colStrength: 'Siła',
    colNetOutward: 'Bilans wyjścia',
    chipEntryPoint: 'punkt wejścia',
    chipEndpoint: 'punkt końcowy',
    chipUnconnected: 'bez połączeń',
    chipNothingHelping: 'nic pomocnego',
    chipNothingUnhelpful: 'nic niepomocnego',

    reinforcing: 'Wzmacniająca',
    balancing: 'Równoważąca',
    reinforcingHelp:
      'Samopodtrzymująca się. Wzrost w dowolnym miejscu pętli wraca do niego jako kolejny wzrost i dlatego problem trwa dalej, choć wyzwalacz dawno minął.',
    balancingHelp:
      'Samokorygująca się. Coś w tej pętli działa w przeciwną stronę, co zwykle oznacza naturalny hamulec.',
    noLoops: 'Nie znaleziono żadnej pętli.',
    manyLoops: 'Ta sieć ma wiele pętli. Wypisane są tylko najsilniejsze.',
    loopSteps_one: '{count} krok, wzmocnienie {gain}',
    loopSteps_other: 'kroków: {count}, wzmocnienie {gain}',

    heuristicWarning:
      'Te liczby opisują narysowaną mapę, a nie osobę. Zakładają, że wpływ jest liniowy i natychmiastowy, a taki nie jest. Służą do myślenia, nigdy jako prognoza.',
    colIfReduced: 'Gdyby to zmniejszyć',
    colBenefit: 'Modelowana korzyść',
    colReach: 'Zasięg',
    wouldAlsoSuppress: 'Osłabiłoby także: {labels}',
    chipNoDampening: 'brak tłumienia',

    from: 'Od',
    to: 'Do',
    choose: 'Wybierz…',
    noRoute: 'Brak drogi z jednego do drugiego.',
    routeStats_one: '{count} ścieżka · wzrostowych: {up} · spadkowych: {down} · netto {net}',
    routeStats_other: 'ścieżek: {count} · wzrostowych: {up} · spadkowych: {down} · netto {net}',
    pathSteps_one: '{count} krok, efekt {effect}',
    pathSteps_other: 'kroków: {count}, efekt {effect}',
    increases: 'zwiększa',
    decreases: 'zmniejsza',

    colNow: 'Teraz',
    colWithThis: 'Z tym',
    rowReinforcing: 'Pętle wzmacniające',
    rowBalancing: 'Pętle równoważące',
    rowAmplification: 'Modelowane wzmocnienie',
    newBrakes: 'Nowe hamulce w systemie',
    badgeNewBalancing: 'nowa równoważąca',
    howItActs: 'Jak działa w każdym cyklu',
    mechSelfCorrecting: 'samokorygujące się',
    mechSteadyPressure: 'stały nacisk',
    mechPushedHarder: 'mocniejszy nacisk',
    mechUntouched: 'nietknięte',
    pressureOn: 'nacisk na: {labels} · trzeba go podtrzymywać',
    holdsOnItsOwn: 'utrzymuje się samo',
  },

  summary: {
    noNodes: 'Dodaj kilka węzłów, aby zobaczyć analizę.',
    noEdges:
      'Nic nie jest jeszcze połączone. Dodaj połączenia, aby zobaczyć, jak poszczególne elementy wpływają na siebie.',
    mostConnected_one:
      '**{label}** to najsilniej powiązany element tej sieci (wpływy przychodzące: {inDegree}, wychodzące: {outDegree}). Węzły centralne to często miejsca, z których zmiana rozchodzi się najdalej, choć bywają też najtrudniejsze do bezpośredniego poruszenia.',
    mostConnected_other:
      '**{label}** to najsilniej powiązany element tej sieci (wpływy przychodzące: {inDegree}, wychodzące: {outDegree}). Węzły centralne to często miejsca, z których zmiana rozchodzi się najdalej, choć bywają też najtrudniejsze do bezpośredniego poruszenia.',
    reinforcing_one:
      'Jest tu **{count} pętla wzmacniająca**. To cykl samopodtrzymujący się: trwa dalej nawet wtedy, gdy to, co go uruchomiło, dawno minęło.',
    reinforcing_other:
      'Liczba **pętli wzmacniających** w tej sieci: {count}. To cykle samopodtrzymujące się: trwają dalej nawet wtedy, gdy to, co je uruchomiło, dawno minęło.',
    tightestLoop: ' Najciaśniejsza z nich to {path}.',
    noReinforcing:
      'Nie znaleziono pętli wzmacniających. Warto zapytać, czy cokolwiek tutaj nie wraca do siebie samego, bo to właśnie sprzężenie zwrotne często sprawia, że problem się utrzymuje.',
    balancing_one:
      'Znaleziono {count} pętlę równoważącą. Jest samokorygująca i często wskazuje miejsce, w którym osoba ma już jakiś naturalny hamulec dla problemu.',
    balancing_other:
      'Liczba znalezionych pętli równoważących: {count}. Są samokorygujące i często wskazują miejsca, w których osoba ma już jakiś naturalny hamulec dla problemu.',
    sources_one:
      '{labels} wpływa na inne elementy, ale nic w sieci nie wpływa zwrotnie w drugą stronę. Takie punkty wejścia bywają najbardziej podatnym miejscem, od którego można zacząć.',
    sources_other:
      '{labels} — te elementy wpływają na inne, ale nic w sieci nie wpływa na nie zwrotnie. Takie punkty wejścia bywają najbardziej podatnym miejscem, od którego można zacząć.',
    leverage_one:
      '**{label}**: zmniejszenie tego elementu daje najszerszy modelowany efekt — sięga {reach} innego węzła.',
    leverage_other:
      '**{label}**: zmniejszenie tego elementu daje najszerszy modelowany efekt — liczba objętych węzłów: {reach}.',
    leverageCaveat_one:
      ' Zwróć uwagę, że osłabiłoby to również: {labels} — element powiązany z połączeniami oznaczonymi jako pomocne.',
    leverageCaveat_other:
      ' Zwróć uwagę, że osłabiłoby to również: {labels} — elementy powiązane z połączeniami oznaczonymi jako pomocne.',
    isolated_one: '{labels} — ten element nie ma jeszcze żadnych połączeń.',
    isolated_other: '{labels} — te elementy nie mają jeszcze żadnych połączeń.',
    diverges:
      'Niektóre części tej sieci wzmacniają się w modelu bez ograniczeń, co zwykle oznacza silne pętle wzmacniające bez żadnego tłumienia. Traktuj wartości dźwigni wyłącznie orientacyjnie.',
    caveat:
      '_Te liczby opisują narysowaną mapę, a nie osobę. To uporządkowany sposób przyjrzenia się własnemu myśleniu, a nie prognoza tego, co się wydarzy._',
  },

  guided: {
    ariaLabel: 'Budowanie krok po kroku',
    stepOf: 'Krok {current} z {total}',
    done: 'Gotowe. Przejdź dalej, kiedy zechcesz.',
    footer:
      'Możesz opuścić przewodnik w dowolnym momencie i zachować wszystko, co do tej pory powstało. Kroki są rusztowaniem, a nie formularzem do wypełnienia.',
    step1Title: '1. Zacznij od kontekstu',
    step1Body:
      'Użyj przycisku Zdarzenie / kontekst i dodaj sytuację, której to dotyczy: co się stało, gdzie, z kim. Dostanie zaokrąglone pole, bo nie jest tym, co osoba robi.\n\nZaczynanie tutaj to nie formalność. W analizie funkcjonalnej ta sama myśl czy to samo działanie znaczą co innego w różnych sytuacjach, więc to kontekst sprawia, że wszystko, co po nim, daje się w ogóle zinterpretować.',
    step1Nudge: 'Zacznij od dodania pola ze zdarzeniem lub kontekstem.',
    step2Title: '2. Dodaj reakcję i to, co po niej następuje',
    step2Body:
      'Teraz dodaj to, co dzieje się wewnątrz (myśl, uczucie lub impuls), oraz to, co osoba robi albo co z tego wynika. Połącz je po kolei, począwszy od kontekstu.\n\nTo jest trójczłonowa kontyngencja, jednostka, z której buduje się analizę funkcjonalną. Wszystko inne z niej wyrasta.',
    step2NudgeNodes: 'Dodaj jeszcze dwa pola: reakcję wewnętrzną, a potem to, co się dzieje.',
    step2NudgeEdges: 'Teraz je połącz: kontekst → reakcja wewnętrzna → to, co się dzieje.',
    step3Title: '3. Sprawdź, czy to wraca do siebie',
    step3Body:
      'Spójrz na koniec swojego łańcucha i zapytaj: czy to zasila coś wcześniejszego? Zły sen wywołuje zamartwianie się, ale zamartwianie się także psuje sen.\n\nSprzężenie zwrotne jest zwykle odpowiedzią na pytanie, dlaczego problem trwa długo po tym, jak zniknęło to, co go uruchomiło.',
    step3Nudge: 'Na razie nic nie wraca. Czy konsekwencja zasila coś wcześniejszego?',
    step4Title: '4. Dodaj to, co jeszcze bierze w tym udział',
    step4Body:
      'Co jeszcze jest w to wciągnięte? Dodaj węzeł dla wszystkiego, na co wpływa konsekwencja, a co samo zasila z powrotem reakcję.\n\nWażne są tu wzmacniacze. Zmęczenie to nie kolejny problem obok innych — ono sprawia, że wszystko inne wydaje się groźniejsze.',
    step4Nudge: 'Dodaj co najmniej jeszcze jeden element.',
    step5Title: '5. Dodaj to, co pomaga',
    step5Body:
      'Nie wszystko pogarsza sprawę. Dodaj coś, co zmniejsza jeden z tych problemów, narysuj to jako połączenie zmniejszające i oznacz je jako Pomaga.\n\nTo jest ta część, którą najczęściej się pomija, a właśnie tam zwykle mieści się interwencja.',
    step5NudgeDecrease:
      'Dodaj coś, co zmniejsza jedną z tych rzeczy, i narysuj to jako połączenie zmniejszające.',
    step5NudgeHelpful: 'Oznacz to połączenie jako Pomaga, żeby mapa pokazywała, co działa.',
    step6Title: '6. Zmapuj to, co przeszkadza',
    step6Body:
      'Teraz trudna część. Co powstrzymuje to, co pomocne, przed zadziałaniem?\n\nDlatego rada „po prostu więcej się ruszaj” tak źle działa. Osoba już wie, że by jej to pomogło. Coś w systemie to tłumi i dopóki nie jest to widoczne, rada nie ma się gdzie zaczepić.',
    step6Nudge: 'Dodaj połączenie, które tłumi to, co pomaga.',
  },

  snapshots: {
    intro:
      'Zapisz sieć w obecnym kształcie, a potem wróć i narysuj ją później jeszcze raz. Nic nie zostaje nadpisane.',
    labelPlaceholder: 'Etykieta, np. Wizyta wstępna albo Sesja 6',
    labelAria: 'Etykieta tego punktu czasowego',
    saveButton: 'Zapisz punkt czasowy',
    none: 'Nie zapisano jeszcze żadnego punktu czasowego.',
    meta: '{when} · węzły: {nodes} · połączenia: {edges}',
    deleteAria: 'Usuń punkt czasowy {label}',
    compare: 'Porównaj',
    earlier: 'Wcześniejszy',
    later: 'Późniejszy',
    changes_one: '{count} zmiana',
    changes_other: 'zmian: {count}',
    downloadComparison: 'Pobierz porównanie (CSV)',
  },

  structure: {
    empty: 'Jeszcze nic tu nie ma. Dodaj węzeł, aby zacząć.',
    nodes: 'Węzły ({count})',
    connections: 'Połączenia ({count})',
    noConnections: 'Jeszcze żadnych.',
    nodeMetaDistress: ' · dokuczliwość {value}',
    nodeMetaFrequency: ' · częstość {value}',
    deleteNodeAria: 'Usuń węzeł {label}',
    deleteEdgeAria: 'Usuń połączenie {sentence}',
  },

  templates: {
    intro:
      'To punkty wyjścia, a nie konceptualizacje. Zastąp etykiety słowami samej osoby i usuń wszystko, co nie pasuje. Szablon, którego nikt nie zakwestionował, jest gorszy niż pusta plansza.',
    blankName: 'Pusta plansza',
    blankDescription: 'Zacznij od zera.',
    abcName: 'Trójczłonowa kontyngencja',
    abcDescription:
      'Wyjściowe rusztowanie: kontekst, reakcja wewnętrzna, konsekwencja. Rozbuduj mapę od tego miejsca.',
    worryName: 'Cykl zamartwiania się i snu',
    worryDescription: 'Przykład rozpisany do końca. Przydatny, żeby pokazać, jak wygląda pętla wzmacniająca.',
    moodName: 'Obniżony nastrój i wycofanie',
    moodDescription:
      'Częsty wzorzec znany z aktywizacji behawioralnej. Zanim go użyjesz, przełóż go na słowa samej osoby.',
    painName: 'Ból przewlekły i unikanie',
    painDescription:
      'Wzorzec lęku i unikania (fear-avoidance), wraz z pętlą utraty kondycji, która zwykle go podtrzymuje.',
  },

  templateNodes: {
    abcTrigger: 'Wyzwalacz lub sytuacja',
    abcThought: 'Myśl lub uczucie',
    abcAction: 'To, co robię',

    worryCriticism: 'Krytyka w pracy',
    worryJobSecurity: 'Obawa o utratę pracy',
    worrySleep: 'Trudności ze snem',
    worryFatigue: 'Zmęczenie',
    worryExercise: 'Aktywność fizyczna',
    worryWithdrawal: 'Wycofanie społeczne',

    moodLow: 'Obniżony nastrój',
    moodStayingHome: 'Siedzenie w domu',
    moodFewerThings: 'Mniej rzeczy, które są dla mnie ważne',
    moodBurden: 'Jestem ciężarem',
    moodContact: 'Kontakt z przyjaciółmi',
    moodNoticing: 'Zauważanie drobnych dobrych chwil',

    painPain: 'Ból',
    painFear: 'Lęk przed pogorszeniem',
    painAvoiding: 'Unikanie aktywności',
    painDeconditioning: 'Utrata kondycji',
    painDoingAnyway: 'Robienie tego, co ważne, mimo wszystko',
    painWillingness: 'Gotowość na dyskomfort',
  },

  templateNote:
    'To punkt wyjścia, a nie konceptualizacja. Zastąp etykiety słowami samej osoby.',

  exportDialog: {
    intro:
      'Formaty CSV wczytują się wprost do R lub Pythona. Macierz sąsiedztwa to postać, której na wejściu oczekują qgraph, igraph i networkx.',
    json: 'Sieć (JSON)',
    edges: 'Lista krawędzi (CSV)',
    nodes: 'Lista węzłów (CSV)',
    matrix: 'Macierz sąsiedztwa (CSV)',
    report: 'Raport z analizy (Markdown)',
    events: 'Dziennik budowania (CSV)',
    png: 'Obraz (PNG)',
    svg: 'Wektor (SVG)',
    print: 'Drukuj / PDF',
  },

  share: {
    title: 'Link do udostępnienia',
    intro:
      'Cała sieć jest zakodowana w samym linku. Nie ma kopii na serwerze, a fragment niosący twoją treść nigdy nie jest wysyłany w żądaniu sieciowym, więc nic nigdzie nie jest zapisywane ani logowane. Każdy, kto ma ten link, może otworzyć i edytować własną kopię.',
    building: 'Tworzenie linku…',
    tooLong:
      'Ta sieć jest za duża jak na link ({length} znaków). Wyeksportuj ją jako JSON i wyślij plik.',
  },

  clearDialog: {
    title: 'Wyczyścić tę sieć?',
    body:
      'Usunie to wszystkie węzły ({nodes}) i połączenia ({edges}). Można to cofnąć, a zapisane punkty czasowe zostaną zachowane.',
    confirm: 'Wyczyść wszystko',
  },

  kernel: {
    title: 'Kernele terapeutyczne',
    warning: 'W przygotowaniu. Za tym przyciskiem nic jeszcze nie ma.',
    p1: 'W planach jest słownik kerneli terapeutycznych: najmniejszych jednostek zmiany terapeutycznej, opisanych językiem na tyle spójnym, by dało się je przypiąć do procesów na mapie. Wybierasz proces i widzisz, o których kernelach wiadomo, że na niego działają.',
    p2: 'Najtrudniejsze jest rozstrzygnięcie, co liczy się jako jeden kernel i jak drobno je dzielić, a to nie jest jeszcze przesądzone.',
    p3: 'Jeśli masz pomysły na to, jak powinna być zorganizowana ta baza, Kean chętnie je pozna:',
  },

  help: {
    title: 'Jak z tego korzystać',
    buildingHeading: 'Budowanie mapy',
    buildingEvent:
      'sytuacja, której to dotyczy. Zacznij tutaj; na pustej planszy każde kliknięcie tworzy takie pole. Ma zaokrąglone rogi, bo nie jest tym, co osoba robi.',
    buildingAdd: 'proces: myśl, uczucie, impuls albo działanie. Kwadratowe pole, kolorowane według kategorii EEMM.',
    buildingConnect:
      'kliknij pole, które wpływa, a potem to, na które wpływa. Następnie wybierz jednym kliknięciem, czy je zwiększa, czy zmniejsza, i jak mocno.',
    buildingDelete: 'kliknij dowolne pole lub strzałkę. Albo zaznacz coś i naciśnij Delete.',
    buildingDoubleClick: 'Kliknij pole dwukrotnie, aby je edytować. Przeciągaj, aby przesuwać, w każdym trybie.',

    readingHeading: 'Czytanie obrazu',
    readingArrowheads:
      '**Wypełniony** grot oznacza wzrost, **pusty** — spadek. Grubsze linie z większymi grotami to silniejsze wpływy. Bez liczb i bez polegania na kolorze.',
    readingReciprocal: 'Linia z grotem po obu stronach oznacza, że te dwa elementy wpływają na siebie wzajemnie.',
    readingShapes: 'Kwadratowe pola to procesy, zaokrąglone to zdarzenia lub konteksty.',
    readingColour:
      'Strzałki są czarne, dopóki połączenie nie zostanie oznaczone jako pomocne (zielone) albo niepomocne (czerwone). Większość połączeń zostaje czarna: oznaczanie przydaje się wtedy, gdy sprawdzasz, czy coś nowego przerywa pętlę.',
    readingColourMode:
      'Przycisk Kierunek przełącza kolor strzałek tak, by pokazywał wzrost (niebieski) i spadek (pomarańczowy) — na chwile, gdy czytasz mapę pod kątem kierunku wpływu.',

    keyboardHeading: 'Klawiatura',
    keyboardTools: 'zaznacz · zdarzenie/kontekst · dodaj węzeł · połącz · usuń',
    keyboardConnectFromSelection: 'Zaznacz pole, naciśnij C, a kolejne kliknięcie dokończy połączenie.',
    keyboardDelete: 'Delete lub Backspace usuwa to, co zaznaczone.',
    keyboardEscape: 'Esc anuluje to, co właśnie robisz. Naciśnij go ponownie, aby wrócić do trybu Zaznacz.',
    keyboardView: 'F dopasuj widok · O ułóż · M oceny · G siatka',
    keyboardEditing:
      'Ctrl/Cmd+Z cofnij · Shift+kliknięcie zaznacza kilka naraz · Ctrl/Cmd+C i Ctrl/Cmd+V kopiuj i wklej · Ctrl/Cmd+D duplikuj',

    organiseHeading: 'Ułóż',
    organiseBody:
      'Ustawia pola w wierszach i kolumnach zgodnych z kierunkiem strzałek, z głównym kontekstem na czele. Próbuje układu w poziomie i w pionie, a zostawia ten, który lepiej mieści się na ekranie. Pętle sprzężenia zwrotnego są pomijane przy ustalaniu kolejności, dzięki czemu czyta się je jako pętle, zamiast rozsypywać sekwencję.',

    mouselessHeading: 'Bez myszy',
    mouselessBody:
      'Widok listy pokazuje całą mapę jako tekst, po którym poruszasz się tabulatorem i który edytujesz z klawiatury. To także to, co odczytuje czytnik ekranu, bo plansza jest dla niego niewidoczna.',
    openListView: 'Otwórz widok listy',

    cautionHeading: 'Uwaga na temat analizy',
    cautionBody:
      'Centralność, pętle i dźwignie opisują narysowaną mapę, a nie osobę. Zakładają, że wpływ jest liniowy i natychmiastowy, a taki nie jest. To uporządkowany sposób przepytywania własnego myślenia i są warte dokładnie tyle, ile oceny, z których powstały.',
  },

  about: {
    title: 'O programie',
    intro:
      'Bezpłatne narzędzie o otwartym kodzie do mapowania sieci procesów: funkcjonalnych zależności między procesami, które podtrzymują cierpienie psychiczne i dobrostan.',
    groundingHeading: 'Podstawy',
    groundingBody:
      'Kategorie i sposób, w jaki to narzędzie myśli o procesach, pochodzą z rozszerzonego ewolucyjnego metamodelu (EEMM) przedstawionego w pracach nad terapią opartą na procesach autorstwa **Stevena C. Hayesa i Stefana G. Hofmanna**: afekt, poznanie, uwaga, ja, motywacja i zachowanie jawne, osadzone na poziomie biofizjologicznym i socjokulturowym, zawsze czytane w kontekście.',
    inspiration: 'Pomysł, by zrobić to w przeglądarce, zainspirowała praca Josepha Ciarrochiego:',
    madeByHeading: 'Kto to zrobił',
    madeByBody:
      'Tan Kean Sian wymyślił to narzędzie i kierował jego powstawaniem; cały kod został napisany z Claude, asystentem AI od Anthropic. Pytania i propozycje ulepszeń są mile widziane pod adresem',
    dataHeading: 'Gdzie są twoje dane',
    dataBody:
      'W twojej przeglądarce i nigdzie indziej. Bez konta, bez serwera, bez analityki. Wyczyszczenie danych przeglądarki usuwa twoje mapy, więc wyeksportuj wszystko, co chcesz zachować. Linki do udostępniania niosą mapę w samym linku, zamiast wysyłać ją gdziekolwiek.',
    licence: 'Licencja MIT. Wkład mile widziany.',
  },

  error: {
    canvasTitle: 'Nie udało się uruchomić planszy do rysowania',
    canvasHint:
      'Zwykle oznacza to, że na tym komputerze nie jest dostępna akceleracja grafiki. Twoja sieć jest bezpieczna. Otwórz widok listy, aby czytać ją i edytować jako tekst, a Eksportuj, aby ją stamtąd wydobyć.',
    technicalDetail: 'Szczegóły techniczne',
  },

  toast: {
    copied_one: 'Skopiowano {count} pole. Ctrl/Cmd+V, aby wkleić.',
    copied_other: 'Skopiowano pola ({count}). Ctrl/Cmd+V, aby wkleić.',
    pasted_one: 'Wklejono {count} pole.',
    pasted_other: 'Wklejono pola ({count}).',
    duplicated_one: 'Zduplikowano {count} pole.',
    duplicated_other: 'Zduplikowano pola ({count}).',
    hypothesisOn:
      'Tryb hipotezy włączony. Wszystko, co teraz dodasz, jest propozycją i rysuje się linią przerywaną.',
    sharedOpened: 'Otwarto udostępnioną sieć. Nie nadpisała ona zapisanej pracy.',
    imported: 'Zaimportowano.',
    importUnreadable: 'Nie udało się odczytać tego pliku.',
    importNotJson: 'Ten plik nie jest poprawnym JSON-em.',
  },

  language: {
    title: 'Język',
    note: 'Tłumaczenia pochodzą od społeczności i są w trakcie weryfikacji. Zwłaszcza słownictwo kliniczne może nie być jeszcze ustalone w każdym języku.',
    contribute: 'Widzisz błąd w tłumaczeniu? Poprawki są bardzo mile widziane pod adresem',
    draft: 'wersja robocza',
  },

  a11y: {
    canvas: 'Plansza sieci. Dostępna z klawiatury wersja tej samej treści znajduje się w widoku listy.',
    toolbar: 'Narzędzia',
    scopeTabs: 'Które połączenia liczyć',
  },
};
