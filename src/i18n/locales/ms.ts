import type { PartialStrings } from '../strings';

/**
 * Malay (Bahasa Melayu).
 *
 * Terminology to check first. The EEMM dimensions use the DBP-standard loans a
 * Malaysian clinician already reads — afek, kognisi, perhatian, diri, motivasi,
 * tingkah laku nyata, biofisiologi, sosiobudaya — with `overtBehaviour.prefix`
 * shortened to "Tingkah laku" so it fits on the node. Systems vocabulary is
 * rendered natively: reinforcing/balancing loops are "gelung pengukuh" and
 * "gelung pengimbang", centrality is "kesentralan", leverage is "leveraj",
 * gain is "gandaan". Three ACT/behaviour-analytic terms are the ones with the
 * least settled Malay: "defusi" (defusion), "diri-sebagai-konteks"
 * (self-as-context) and "kesanggupan" (willingness) — Malaysian practitioners
 * often say these in English, so a native reviewer should confirm the loans
 * read as intended. "Treatment kernel" is rendered "teras rawatan" and glossed
 * once in the kernel dialog, since no Malay term is established. "Deconditioning"
 * is given descriptively as "kemerosotan kecergasan" / "Kecergasan menurun",
 * because the client-facing template node has to be plain.
 */
export const ms: PartialStrings = {
  meta: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr' },

  app: {
    name: 'Alat Pemetaan Rangkaian Berasaskan Proses',
    short: 'Alat Pemetaan PBT',
    networkTitleLabel: 'Tajuk rangkaian',
    untitledNetwork: 'Rangkaian tanpa tajuk',
  },

  tool: {
    select: 'Pilih',
    add: 'Tambah nod',
    connect: 'Sambung',
    delete: 'Padam',
    event: 'Peristiwa / konteks',
  },

  toolHint: {
    select: 'Klik untuk memilih dan melihat sambungannya. Seret untuk mengalihkan.',
    add: 'Klik di mana-mana pada kanvas untuk menambah nod.',
    connect: 'Klik nod yang mempengaruhi, kemudian nod yang dipengaruhinya.',
    delete: 'Klik nod atau sambungan untuk membuangnya.',
    start: 'Mulakan dengan peristiwa atau situasi yang menjadi fokus. Klik di mana-mana.',
    focused: 'Tertumpu pada sebahagian rangkaian.',
    showEverything: 'Tunjukkan semula semuanya',
    pendingSource: 'Sumber: {label}. Kini klik nod yang dipengaruhinya.',
  },

  action: {
    undo: 'Buat asal',
    redo: 'Buat semula',
    fit: 'Muat skrin',
    organise: 'Susun',
    clear: 'Kosongkan',
    grid: 'Petak',
    ratings: 'Penilaian',
    colourByValence: 'Membantu',
    colourByDirection: 'Naik/turun',
    hypothesis: 'Hipotesis',
    kernel: 'Teras',
    analyse: 'Analisis',
    snapshots: 'Titik masa',
    import: 'Muat masuk',
    export: 'Eksport',
    share: 'Kongsi pautan',
    help: 'Bantuan',
    about: 'Tentang',
    themeLight: 'Cerah',
    themeDark: 'Gelap',
    templates: 'Templat',
    guided: 'Bina berpandu',
    cancel: 'Batal',
    save: 'Simpan',
    add: 'Tambah',
    update: 'Kemas kini',
    close: 'Tutup',
    back: 'Kembali',
    next: 'Seterusnya',
    finish: 'Selesai',
    restore: 'Pulihkan',
    tryAgain: 'Cuba lagi',
    copy: 'Salin pautan',
    copied: 'Telah disalin',
    language: 'Bahasa',
  },

  tooltip: {
    undo: 'Buat asal (Ctrl/Cmd+Z)',
    redo: 'Buat semula (Ctrl/Cmd+Y)',
    fit: 'Muatkan semuanya pada skrin (F)',
    organise: 'Lekapkan kotak ke dalam baris dan lajur yang mengikut anak panah (O)',
    clear: 'Buang semuanya',
    grid: 'Tunjukkan petak grid dan lekapkan kotak padanya (G)',
    ratings: 'Cetak penilaian gangguan (S) dan kekerapan (F) pada setiap kotak (M)',
    colourIsDirection:
      'Warna anak panah kini menunjukkan peningkatan (biru) dan penurunan (jingga). Klik untuk mewarnakannya mengikut sama ada sambungan itu membantu.',
    colourIsValence:
      'Warna anak panah kini menunjukkan sama ada sesuatu sambungan itu membantu. Klik untuk mewarnakannya mengikut peningkatan dan penurunan.',
    addEvent: 'Tambah peristiwa atau konteks',
    addProcess: 'Tambah satu proses',
    hypothesis: 'Tambah sesuatu yang sedang anda pertimbangkan dan lihat apa yang akan berubah (H)',
    kernel: 'Teras rawatan (dalam pembangunan)',
    analyse: 'Kesentralan, gelung maklum balas, laluan dan leveraj',
    snapshots: 'Simpan peta ini sebagai titik masa dan bandingkan kemudian',
    import: 'Muatkan fail yang telah disimpan',
    export: 'Simpan sebagai imej, PDF, JSON atau CSV',
    share: 'Dapatkan pautan ke peta ini',
    help: 'Cara menggunakannya',
    templates: 'Mulakan daripada satu contoh',
    guided: 'Binaan langkah demi langkah',
    themeToLight: 'Tukar kepada tema cerah',
    themeToDark: 'Tukar kepada tema gelap',
    language: 'Tukar bahasa antara muka',
    toolWithKey: '{tool} ({key})',
    deleteKeyHint: 'D, atau Delete/Backspace untuk membuang apa yang dipilih',
    closePanel: 'Tutup panel',
    closeDialog: 'Tutup dialog',
    closeGuide: 'Tutup panduan',
  },

  privacy: {
    localOnly: 'Semuanya kekal pada peranti ini',
    localOnlyLong:
      'Peta anda disimpan dalam pelayar ini dan tidak pernah dihantar ke mana-mana. Menutup tab adalah selamat. Membersihkan data pelayar akan memadamkannya, jadi eksportkan apa sahaja yang ingin anda simpan.',
    studyMode: 'Mod kajian',
    studyModeLong:
      'Anda sedang mengambil bahagian dalam satu kajian penyelidikan. Peta anda dan urutan pembinaannya disimpan ke pelayan kajian.',
    autosaveUnavailable: 'Simpan automatik tidak tersedia — eksportkan untuk menyimpan kerja anda',
    autosaveUnavailableLong:
      'Pelayar ini tidak membenarkan halaman menyimpan apa-apa, yang biasanya berlaku apabila fail HTML dibuka terus daripada cakera, atau dalam tetingkap peribadi. Kerja anda tetap peribadi, tetapi ia akan hilang apabila anda menutup tab. Gunakan Eksport untuk menyimpannya.',
  },

  panel: {
    analysis: 'Analisis',
    snapshots: 'Titik masa',
    listView: 'Paparan senarai',
  },

  nodeEditor: {
    newEvent: 'Peristiwa atau konteks baharu',
    newNode: 'Nod baharu',
    edit: 'Sunting nod',
    name: 'Nama',
    namePlaceholder: 'Dalam perkataan orang itu sendiri',
    category: 'Kategori',
    ratingsDisclosure: 'Penilaian dan nota (pilihan)',
    ratingsNote:
      'Digunakan dalam protokol penyelidikan untuk membandingkan rangkaian antara individu dan merentas masa. Tidak diperlukan untuk pemetaan klinikal harian.',
    severity: 'Sejauh mana ia mengganggu (0–10)',
    frequency: 'Berapa kerap (0–10)',
    notes: 'Nota',
    notRated: 'Belum dinilai',
    // Initials of "gangguan" (distress) and "kekerapan" (frequency), matching
    // the wording used in `severity`, `frequency` and the list view.
    severityShort: 'G',
    frequencyShort: 'K',
    rate: 'Nilai',
    clearRating: 'Kosongkan',
  },

  edgeEditor: {
    title: 'Bagaimana yang ini mempengaruhi yang itu?',
    sentenceIncreases: '{source} meningkatkan {target}',
    sentenceDecreases: '{source} menurunkan {target}',
    increasesIt: 'Meningkatkannya',
    decreasesIt: 'Menurunkannya',
    altDirection: 'Kedua-duanya juga saling mempengaruhi pada arah yang bertentangan.',
    editAlt: 'Sunting {source} → {target}',
    removeLink: 'Buang sambungan',
    addLink: 'Tambah sambungan',
    helpingDisclosure: 'Adakah sambungan ini membantu?',
    helpingNote:
      'Tiada proses yang membantu atau memudaratkan dengan sendirinya; ia bergantung pada apa yang disambungkannya, dan itulah sebabnya soalan ini ditanya di sini dan bukan semasa anda menamakan kotak. Menandakan sambungan inilah yang membolehkan panel Analisis menyatakan perubahan mana yang akan membantu, bukan sekadar perubahan mana yang akan merebak paling jauh. Biarkan sahaja jika anda tidak menggunakannya.',
  },

  category: {
    uncategorised: {
      label: 'Tanpa kategori',
      prefix: '',
      hint: 'Belum dikelaskan. Tidak mengapa dibiarkan sementara anda masih berfikir.',
    },
    affect: {
      label: 'Afek',
      prefix: 'Afek',
      hint: 'Emosi dan perasaan. Mengelaknya, atau sanggup mengalaminya.',
    },
    cognition: {
      label: 'Kognisi',
      prefix: 'Kognisi',
      hint: 'Fikiran, kepercayaan, peraturan, ruminasi, defusi.',
    },
    attention: {
      label: 'Perhatian',
      prefix: 'Perhatian',
      hint: 'Apa yang disedari, dan apa yang tidak. Fokus yang fleksibel atau sempit.',
    },
    self: {
      label: 'Diri',
      prefix: 'Diri',
      hint: 'Konsep kendiri, identiti, kritikan terhadap diri, diri-sebagai-konteks.',
    },
    motivation: {
      label: 'Motivasi',
      prefix: 'Motivasi',
      hint: 'Nilai, matlamat, apa yang didekati atau dijauhi oleh orang itu.',
    },
    overtBehaviour: {
      label: 'Tingkah laku nyata',
      prefix: 'Tingkah laku',
      hint: 'Tindakan yang boleh diperhatikan. Apa yang sebenarnya dilakukan oleh orang itu.',
    },
    biophysiological: {
      label: 'Biofisiologi',
      prefix: 'Biofisiologi',
      hint: 'Tidur, kesakitan, penyakit, ubat, keterangsangan, fisiologi.',
    },
    sociocultural: {
      label: 'Sosiobudaya',
      prefix: 'Sosiobudaya',
      hint: 'Hubungan, keluarga, budaya, sokongan atau tekanan sosial.',
    },
    context: {
      label: 'Konteks / peristiwa',
      prefix: 'Peristiwa',
      hint: 'Situasi atau peristiwa, bukan sesuatu yang dilakukan oleh orang itu. Dilukis dengan bucu bulat.',
    },
  },
  categoryGroup: {
    dimension: 'Dimensi psikologi',
    level: 'Aras',
    other: 'Konteks dan tidak dikelaskan',
  },

  strength: {
    1: 'Sedikit',
    2: 'Sederhana',
    3: 'Banyak',
  },

  valence: {
    neutral: 'Belum ditentukan',
    helpful: 'Membantu',
    unhelpful: 'Tidak membantu',
  },

  trial: {
    proposed: 'Sedang dipertimbangkan',
    adopted: 'Dicuba, dan ia membantu',
    ruledOut: 'Dicuba, ia tidak membantu',
    proposedHint:
      'Masih idea. Dilukis putus-putus, dan ditinggalkan daripada garis dasar yang menjadi asas perbandingan.',
    adoptedHint: 'Ia berkesan. Ia menjadi sebahagian daripada peta dan dilukis seperti yang lain.',
    ruledOutHint: 'Ia tidak berkesan. Dikekalkan tetapi dipudarkan, supaya anda dapat melihat apa yang telah dicuba.',
    dialogTitle: 'Apa yang berlaku dengan ini?',
    legend: 'Sudah sampai ke mana ini?',
    lastRecorded: 'Direkodkan kali terakhir {when}',
    notATrial: 'Bukan percubaan langsung — jadikannya sebahagian biasa daripada peta',
  },

  analysis: {
    title: 'Analisis',
    summary: 'Apa yang ditunjukkan oleh rangkaian ini',
    central: 'Paling banyak sambungan',
    loops: 'Gelung maklum balas',
    leverage: 'Di mana perubahan mungkin merebak paling jauh',
    paths: 'Jejaki satu laluan',
    whatIf: 'Bagaimana jika',
    empty: 'Tambah nod dan sambungan untuk melihat analisis.',

    stats: '{nodes} nod · {edges} sambungan · ketumpatan {density}',

    scopeAll: 'Semua sambungan',
    scopeUnhelpful: 'Maladaptif',
    scopeHelpful: 'Adaptif',
    centralNote:
      'Kekuatan mengira berapa banyak pengaruh yang mengalir masuk dan keluar. Inilah ukuran kesentralan yang paling banyak sokongan untuk memilih sasaran rawatan, tetapi nod yang sentral bukan secara automatik nod yang betul untuk didesak.',
    scopeUnhelpfulNote:
      'Hanya mengira anak panah yang anda tandakan sebagai tidak membantu. Skor yang tinggi di sini ialah proses yang mengekalkan masalah itu.',
    scopeHelpfulNote:
      'Hanya mengira anak panah yang anda tandakan sebagai membantu. Skor yang tinggi di sini ialah sesuatu yang sudah pun menyebelahi orang itu — selalunya berbaloi dikembangkan berbanding menambah sesuatu yang baharu.',
    excludedNote_one:
      '{count} sambungan yang belum ditentukan dikecualikan daripada kedua-dua pecahan, jadi jumlahnya tidak akan sepadan dengan angka gabungan.',
    excludedNote_other:
      '{count} sambungan yang belum ditentukan dikecualikan daripada kedua-dua pecahan, jadi jumlahnya tidak akan sepadan dengan angka gabungan.',
    noneMarkedHelpful:
      'Belum ada apa-apa yang ditandakan sebagai membantu. Buka satu sambungan dan tetapkan sama ada ia membantu untuk mengisi bahagian ini.',
    noneMarkedUnhelpful:
      'Belum ada apa-apa yang ditandakan sebagai tidak membantu. Buka satu sambungan dan tetapkan sama ada ia membantu untuk mengisi bahagian ini.',

    colNode: 'Nod',
    colIn: 'Masuk',
    colOut: 'Keluar',
    colStrength: 'Kekuatan',
    colNetOutward: 'Bersih ke luar',
    chipEntryPoint: 'titik masuk',
    chipEndpoint: 'titik akhir',
    chipUnconnected: 'tiada sambungan',
    chipNothingHelping: 'tiada yang membantu',
    chipNothingUnhelpful: 'tiada yang tidak membantu',

    reinforcing: 'Pengukuh',
    balancing: 'Pengimbang',
    reinforcingHelp:
      'Menyara diri sendiri. Peningkatan di mana-mana dalam gelung ini kembali semula sebagai peningkatan yang lebih lanjut, dan itulah sebabnya masalah itu terus berlarutan selepas pencetusnya berlalu.',
    balancingHelp:
      'Membetulkan diri sendiri. Ada sesuatu dalam gelung ini yang menolak balik, dan itu biasanya bermakna terdapat brek semula jadi.',
    noLoops: 'Tiada gelung ditemui.',
    manyLoops: 'Rangkaian ini mempunyai banyak gelung. Hanya yang paling kuat disenaraikan.',
    loopSteps_one: '{count} langkah, gandaan {gain}',
    loopSteps_other: '{count} langkah, gandaan {gain}',

    heuristicWarning:
      'Angka ini menerangkan peta yang anda lukis, bukan orang itu. Ia menganggap pengaruh bersifat linear dan serta-merta, sedangkan ia bukan begitu. Gunakannya sebagai alat berfikir, jangan sesekali sebagai ramalan.',
    colIfReduced: 'Jika ini dikurangkan',
    colBenefit: 'Manfaat dimodelkan',
    colReach: 'Jangkauan',
    wouldAlsoSuppress: 'Turut menekan {labels}',
    chipNoDampening: 'tiada redaman',

    from: 'Dari',
    to: 'Ke',
    choose: 'Pilih…',
    noRoute: 'Tiada laluan dari satu ke yang lain.',
    routeStats_one: '{count} laluan · {up} meningkat · {down} menurun · bersih {net}',
    routeStats_other: '{count} laluan · {up} meningkat · {down} menurun · bersih {net}',
    pathSteps_one: '{count} langkah, kesan {effect}',
    pathSteps_other: '{count} langkah, kesan {effect}',
    increases: 'meningkatkan',
    decreases: 'menurunkan',

    colNow: 'Sekarang',
    colWithThis: 'Dengan ini',
    rowReinforcing: 'Gelung pengukuh',
    rowBalancing: 'Gelung pengimbang',
    rowAmplification: 'Amplifikasi dimodelkan',
    newBrakes: 'Brek baharu pada sistem',
    badgeNewBalancing: 'pengimbang baharu',
    howItActs: 'Bagaimana ia bertindak pada setiap kitaran',
    mechSelfCorrecting: 'membetulkan diri',
    mechSteadyPressure: 'tekanan berterusan',
    mechPushedHarder: 'didesak lebih kuat',
    mechUntouched: 'tidak tersentuh',
    pressureOn: 'pada {labels} · perlu dikekalkan',
    holdsOnItsOwn: 'kekal dengan sendirinya',
  },

  summary: {
    noNodes: 'Tambah beberapa nod untuk melihat analisis.',
    noEdges:
      'Belum ada apa-apa yang disambungkan. Tambah sambungan untuk melihat bagaimana bahagian-bahagiannya saling mempengaruhi.',
    mostConnected_one:
      '**{label}** ialah bahagian yang paling banyak sambungan dalam rangkaian ini ({inDegree} pengaruh masuk, {outDegree} keluar). Nod yang sentral selalunya tempat perubahan merebak paling jauh, walaupun ia juga boleh menjadi yang paling sukar diubah secara langsung.',
    mostConnected_other:
      '**{label}** ialah bahagian yang paling banyak sambungan dalam rangkaian ini ({inDegree} pengaruh masuk, {outDegree} keluar). Nod yang sentral selalunya tempat perubahan merebak paling jauh, walaupun ia juga boleh menjadi yang paling sukar diubah secara langsung.',
    reinforcing_one:
      'Terdapat **{count} gelung pengukuh** di sini. Ini ialah kitaran yang menyara diri sendiri: ia terus berjalan walaupun selepas apa yang memulakannya sudah berlalu.',
    reinforcing_other:
      'Terdapat **{count} gelung pengukuh** di sini. Ini ialah kitaran yang menyara diri sendiri: ia terus berjalan walaupun selepas apa yang memulakannya sudah berlalu.',
    tightestLoop: ' Yang paling ketat ialah {path}.',
    noReinforcing:
      'Tiada gelung pengukuh ditemui. Berbaloi ditanya sama ada ada apa-apa di sini yang menyuap kembali kepada dirinya sendiri, kerana maklum balas selalunya yang menyebabkan sesuatu masalah berterusan.',
    balancing_one:
      '{count} gelung pengimbang ditemui. Ini membetulkan diri sendiri dan selalunya menandakan tempat orang itu sudah pun mempunyai brek semula jadi terhadap masalah tersebut.',
    balancing_other:
      '{count} gelung pengimbang ditemui. Ini membetulkan diri sendiri dan selalunya menandakan tempat orang itu sudah pun mempunyai brek semula jadi terhadap masalah tersebut.',
    sources_one:
      '{labels} mempengaruhi yang lain tetapi tiada apa-apa dalam rangkaian ini yang mempengaruhinya kembali. Titik masuk seperti ini kadangkala tempat yang paling mudah untuk dimulakan.',
    sources_other:
      '{labels} mempengaruhi yang lain tetapi tiada apa-apa dalam rangkaian ini yang mempengaruhinya kembali. Titik masuk seperti ini kadangkala tempat yang paling mudah untuk dimulakan.',
    leverage_one:
      'Mengurangkan **{label}** mempunyai kesan dimodelkan yang paling luas, menjangkau {reach} nod lain.',
    leverage_other:
      'Mengurangkan **{label}** mempunyai kesan dimodelkan yang paling luas, menjangkau {reach} nod lain.',
    leverageCaveat_one:
      ' Perhatikan bahawa ia juga akan menekan {labels}, yang terikat pada sambungan yang anda tandakan sebagai membantu.',
    leverageCaveat_other:
      ' Perhatikan bahawa ia juga akan menekan {labels}, yang terikat pada sambungan yang anda tandakan sebagai membantu.',
    isolated_one: '{labels} belum disambungkan kepada apa-apa lagi.',
    isolated_other: '{labels} belum disambungkan kepada apa-apa lagi.',
    diverges:
      'Sebahagian daripada rangkaian ini menguat tanpa had apabila dimodelkan, yang biasanya bermakna terdapat gelung pengukuh yang kuat tanpa redaman. Anggap angka leveraj itu sebagai petunjuk sahaja.',
    caveat:
      '_Angka ini menerangkan peta yang anda lukis, bukan orang itu. Ia satu cara berstruktur untuk meneliti pemikiran anda sendiri, bukan ramalan tentang apa yang akan berlaku._',
  },

  guided: {
    ariaLabel: 'Bina berpandu',
    stepOf: 'Langkah {current} daripada {total}',
    done: 'Selesai. Teruskan apabila anda bersedia.',
    footer:
      'Anda boleh meninggalkan panduan ini pada bila-bila masa dan mengekalkan semua yang telah anda bina. Langkah-langkah ini ialah perancah, bukan borang yang perlu dilengkapkan.',
    step1Title: '1. Mulakan dengan konteks',
    step1Body:
      'Gunakan butang Peristiwa / konteks dan tambah situasi yang menjadi fokus: apa yang berlaku, di mana, dengan siapa. Ia mendapat kotak bucu bulat, kerana ia bukan sesuatu yang dilakukan oleh orang itu.\n\nBermula di sini bukan sekadar formaliti. Dalam penilaian fungsi, fikiran atau tindakan yang sama membawa makna berbeza dalam situasi yang berbeza, jadi konteks itulah yang menjadikan segala yang menyusul boleh ditafsirkan.',
    step1Nudge: 'Tambah kotak peristiwa atau konteks untuk bermula.',
    step2Title: '2. Tambah tindak balas dan apa yang menyusul',
    step2Body:
      'Kini tambah apa yang berlaku di dalam diri (fikiran, perasaan atau desakan) dan apa yang dilakukan oleh orang itu atau apa yang terhasil. Sambungkannya mengikut urutan, bermula daripada konteks.\n\nItulah kontingensi tiga terma, unit asas yang membentuk penilaian fungsi. Segala yang lain tumbuh daripadanya.',
    step2NudgeNodes: 'Tambah dua kotak lagi: tindak balas dalaman, kemudian apa yang berlaku.',
    step2NudgeEdges: 'Kini sambungkannya: konteks → tindak balas dalaman → apa yang berlaku.',
    step3Title: '3. Periksa sama ada ia berpusing kembali',
    step3Body:
      'Lihat hujung rantaian anda dan tanya: adakah ia menyuap kembali kepada apa-apa yang lebih awal? Tidur yang tidak lena menyebabkan kerisauan, tetapi kerisauan juga menyebabkan tidur yang tidak lena.\n\nMaklum balas selalunya jawapan kepada mengapa sesuatu masalah berterusan lama selepas apa yang memulakannya sudah hilang.',
    step3Nudge: 'Belum ada apa-apa yang berpusing kembali. Adakah akibat itu menyuap apa-apa yang lebih awal?',
    step4Title: '4. Tambah apa lagi yang terlibat',
    step4Body:
      'Apa lagi yang terheret dalam hal ini? Tambah satu nod untuk apa-apa yang terkesan oleh akibat itu dan yang turut menyuap kembali kepada tindak balas tersebut.\n\nPenguat penting di sini. Keletihan bukan sekadar satu lagi masalah; ia menjadikan segala yang lain terasa lebih mengancam.',
    step4Nudge: 'Tambah sekurang-kurangnya satu elemen lagi.',
    step5Title: '5. Tambah apa yang membantu',
    step5Body:
      'Bukan semuanya memburukkan keadaan. Tambah sesuatu yang mengurangkan salah satu daripada masalah ini, lukiskannya sebagai sambungan yang menurunkan, dan tandakan sambungan itu sebagai Membantu.\n\nInilah bahagian yang sering dilangkau orang, dan di sinilah biasanya letaknya intervensi.',
    step5NudgeDecrease: 'Tambah sesuatu yang mengurangkan salah satu daripadanya, dilukis sebagai sambungan yang menurunkan.',
    step5NudgeHelpful: 'Tandakan sambungan itu sebagai Membantu, supaya peta menunjukkan apa yang berkesan.',
    step6Title: '6. Petakan apa yang menghalang',
    step6Body:
      'Kini bahagian yang sukar. Apa yang menghalang perkara yang membantu itu daripada berlaku?\n\nInilah sebabnya nasihat "bersenamlah lebih banyak" terasa begitu tidak kena. Orang itu sudah pun tahu ia akan membantu. Ada sesuatu dalam sistem yang menekannya, dan selagi itu tidak kelihatan, nasihat itu tiada tempat untuk pergi.',
    step6Nudge: 'Tambah sambungan yang menekan perkara yang membantu itu.',
  },

  snapshots: {
    intro:
      'Simpan rangkaian sebagaimana keadaannya sekarang, kemudian kembali dan lukiskannya semula nanti. Tiada apa-apa yang ditulis ganti.',
    labelPlaceholder: 'Label, cth. Saringan awal atau Sesi 6',
    labelAria: 'Label untuk titik masa ini',
    saveButton: 'Simpan titik masa',
    none: 'Belum ada titik masa yang disimpan.',
    meta: '{when} · {nodes} nod · {edges} sambungan',
    deleteAria: 'Padam titik masa {label}',
    compare: 'Bandingkan',
    earlier: 'Lebih awal',
    later: 'Lebih lewat',
    changes_one: '{count} perubahan',
    changes_other: '{count} perubahan',
    downloadComparison: 'Muat turun perbandingan (CSV)',
  },

  structure: {
    empty: 'Belum ada apa-apa di sini. Tambah satu nod untuk bermula.',
    nodes: 'Nod ({count})',
    connections: 'Sambungan ({count})',
    noConnections: 'Belum ada.',
    nodeMetaDistress: ' · gangguan {value}',
    nodeMetaFrequency: ' · kekerapan {value}',
    deleteNodeAria: 'Padam nod {label}',
    deleteEdgeAria: 'Padam sambungan {sentence}',
  },

  templates: {
    intro:
      'Titik permulaan, bukan formulasi. Gantikan label dengan perkataan orang itu sendiri, dan padamkan apa-apa yang tidak sesuai. Templat yang diterima tanpa dipersoal lebih buruk daripada kanvas kosong.',
    blankName: 'Kanvas kosong',
    blankDescription: 'Mula daripada kosong.',
    abcName: 'Kontingensi tiga terma',
    abcDescription: 'Perancah permulaan: konteks, tindak balas dalaman, akibat. Bina keluar dari sini.',
    worryName: 'Kitaran kerisauan dan tidur',
    worryDescription: 'Satu contoh yang telah dikerjakan. Berguna untuk menunjukkan rupa sebuah gelung pengukuh.',
    moodName: 'Mood rendah dan penarikan diri',
    moodDescription:
      'Corak pengaktifan tingkah laku yang lazim. Nyatakannya dalam perkataan orang itu sendiri sebelum menggunakannya.',
    painName: 'Kesakitan kronik dan pengelakan',
    painDescription:
      'Corak ketakutan-pengelakan, berserta gelung kemerosotan kecergasan yang biasanya mengekalkannya.',
  },

  templateNodes: {
    abcTrigger: 'Pencetus atau situasi',
    abcThought: 'Fikiran atau perasaan',
    abcAction: 'Apa yang saya buat',

    worryCriticism: 'Kritikan di tempat kerja',
    worryJobSecurity: 'Risau tentang jaminan pekerjaan',
    worrySleep: 'Sukar tidur',
    worryFatigue: 'Keletihan',
    worryExercise: 'Senaman',
    worryWithdrawal: 'Menjauhi pergaulan',

    moodLow: 'Mood rendah',
    moodStayingHome: 'Duduk di rumah',
    moodFewerThings: 'Makin kurang perkara yang bermakna bagi saya',
    moodBurden: 'Saya membebankan orang',
    moodContact: 'Berhubung dengan kawan',
    moodNoticing: 'Menyedari saat-saat baik yang kecil',

    painPain: 'Kesakitan',
    painFear: 'Takut ia bertambah teruk',
    painAvoiding: 'Mengelak aktiviti',
    painDeconditioning: 'Kecergasan menurun',
    painDoingAnyway: 'Tetap melakukan perkara yang bermakna',
    painWillingness: 'Kesanggupan merasai ketidakselesaan',
  },

  templateNote:
    'Ini titik permulaan, bukan formulasi. Gantikan label dengan perkataan orang itu sendiri.',

  exportDialog: {
    intro:
      'Format CSV boleh terus dimuatkan ke dalam R atau Python. Matriks bersebelahan ialah input yang dijangka oleh qgraph, igraph dan networkx.',
    json: 'Rangkaian (JSON)',
    edges: 'Senarai sambungan (CSV)',
    nodes: 'Senarai nod (CSV)',
    matrix: 'Matriks bersebelahan (CSV)',
    report: 'Laporan analisis (Markdown)',
    events: 'Log pembinaan (CSV)',
    png: 'Imej (PNG)',
    svg: 'Vektor (SVG)',
    print: 'Cetak / PDF',
  },

  share: {
    title: 'Pautan kongsi',
    intro:
      'Seluruh rangkaian dikodkan di dalam pautan itu sendiri. Tiada salinan di pelayan, dan bahagian yang membawa kandungan anda tidak pernah dihantar dalam permintaan web, jadi tiada apa-apa yang disimpan atau dilog di mana-mana. Sesiapa yang mempunyai pautan ini boleh membuka dan menyunting salinan mereka sendiri.',
    building: 'Membina pautan…',
    tooLong:
      'Rangkaian ini terlalu besar untuk sebuah pautan ({length} aksara). Eksportkannya sebagai JSON dan hantar failnya.',
  },

  clearDialog: {
    title: 'Kosongkan rangkaian ini?',
    body: 'Ini membuang kesemua {nodes} nod dan {edges} sambungan. Anda boleh membuat asal, dan mana-mana titik masa yang telah disimpan akan dikekalkan.',
    confirm: 'Kosongkan semuanya',
  },

  kernel: {
    title: 'Teras rawatan',
    warning: 'Dalam pembangunan. Belum ada apa-apa di sebalik butang ini.',
    p1: 'Rancangannya ialah satu perbendaharaan kata teras rawatan (treatment kernels): unit perubahan terapeutik yang paling kecil, dalam bahasa yang cukup konsisten untuk dilekatkan pada proses di atas peta. Pilih satu proses, dan lihat teras mana yang diketahui bertindak ke atasnya.',
    p2: 'Bahagian yang sukar ialah menentukan apa yang dikira sebagai satu teras dan sehalus mana ia patut dipecahkan, dan itu masih belum diputuskan.',
    p3: 'Jika anda mempunyai idea tentang bagaimana pangkalan data ini patut disusun, Kean ingin mendengarnya:',
  },

  help: {
    title: 'Cara menggunakannya',
    buildingHeading: 'Membina peta',
    buildingEvent:
      'situasi yang menjadi fokus. Mulakan di sini; pada kanvas kosong, mana-mana klik akan menciptanya. Ia mendapat kotak bucu bulat, kerana ia bukan sesuatu yang dilakukan oleh orang itu.',
    buildingAdd: 'sebuah proses: fikiran, perasaan, desakan atau tindakan. Kotak segi empat, diwarnakan mengikut kategori EEMM-nya.',
    buildingConnect:
      'klik kotak yang mempengaruhi, kemudian kotak yang dipengaruhinya. Kemudian pilih, dengan satu klik, sama ada ia meningkatkan atau menurunkannya dan sebanyak mana.',
    buildingDelete: 'klik mana-mana kotak atau anak panah. Atau pilih sesuatu dan tekan Delete.',
    buildingDoubleClick: 'Klik dua kali pada kotak untuk menyuntingnya. Seret untuk mengalihkannya, dalam mana-mana mod.',

    readingHeading: 'Membaca gambar rajah',
    readingArrowheads:
      'Mata anak panah yang **padat** bermaksud meningkat; yang **berongga** bermaksud menurun. Garisan yang lebih tebal dengan mata yang lebih besar ialah pengaruh yang lebih kuat. Tiada nombor, dan tiada pergantungan pada warna.',
    readingReciprocal: 'Garisan yang bermata di kedua-dua hujung bermaksud kedua-duanya saling mempengaruhi.',
    readingShapes: 'Kotak segi empat ialah proses; kotak bucu bulat ialah peristiwa atau konteks.',
    readingColour:
      'Anak panah berwarna hitam melainkan anda telah menandakan sesuatu sambungan sebagai membantu (hijau) atau tidak membantu (merah). Kebanyakan sambungan kekal hitam: penandaan itu ada untuk ketika anda menguji sama ada sesuatu yang baharu memecahkan sesuatu gelung.',
    readingColourMode:
      'Butang Naik/turun menukar warna anak panah supaya menunjukkan peningkatan (biru) dan penurunan (jingga), untuk ketika arah pengaruh itulah yang anda mahu baca.',

    keyboardHeading: 'Papan kekunci',
    keyboardTools: 'pilih · peristiwa/konteks · tambah nod · sambung · padam',
    keyboardConnectFromSelection: 'Pilih satu kotak kemudian tekan C dan klik anda yang seterusnya akan melengkapkan sambungan.',
    keyboardDelete: 'Delete atau Backspace membuang apa yang dipilih.',
    keyboardEscape: 'Esc membatalkan apa yang sedang anda lakukan. Tekan sekali lagi untuk kembali kepada Pilih.',
    keyboardView: 'F muat skrin · O susun · M penilaian · G petak',
    keyboardEditing:
      'Ctrl/Cmd+Z buat asal · Shift+klik untuk memilih beberapa · Ctrl/Cmd+C dan Ctrl/Cmd+V salin dan tampal · Ctrl/Cmd+D gandakan',

    organiseHeading: 'Susun',
    organiseBody:
      'Melekapkan kotak ke dalam baris dan lajur yang mengikut anak panah, dengan konteks utama di bahagian hadapan. Ia mencuba susun atur secara melintang dan menegak lalu mengekalkan yang lebih muat pada skrin anda. Gelung maklum balas diabaikan semasa menentukan urutan, supaya ia terbaca sebagai gelung dan bukannya mengacaukan turutan.',

    mouselessHeading: 'Tanpa tetikus',
    mouselessBody:
      'Paparan senarai menunjukkan keseluruhan peta sebagai teks yang boleh anda lalui dengan Tab dan sunting daripada papan kekunci. Itu juga yang dibaca oleh pembaca skrin, memandangkan kanvas tidak kelihatan kepadanya.',
    openListView: 'Buka paparan senarai',

    cautionHeading: 'Satu peringatan tentang analisis',
    cautionBody:
      'Kesentralan, gelung dan leveraj menerangkan peta yang dilukis, bukan orang itu. Ia menganggap pengaruh bersifat linear dan serta-merta, sedangkan ia bukan begitu. Ia satu cara berstruktur untuk menyoal pemikiran anda sendiri, dan nilainya tepat sebanyak nilai penilaian yang membentuknya.',
  },

  about: {
    title: 'Tentang',
    intro:
      'Sebuah alat percuma dan sumber terbuka untuk memetakan rangkaian berasaskan proses: hubungan berfungsi antara proses-proses yang mengekalkan penderitaan dan kesejahteraan psikologi.',
    groundingHeading: 'Asas',
    groundingBody:
      'Kategori dan cara alat ini memikirkan proses berasal daripada Extended Evolutionary Meta-Model (EEMM) yang digariskan dalam kerja terapi berasaskan proses oleh **Steven C. Hayes dan Stefan G. Hofmann**: afek, kognisi, perhatian, diri, motivasi dan tingkah laku nyata, yang terletak dalam aras biofisiologi dan sosiobudaya, serta sentiasa dibaca dalam konteks.',
    inspiration: 'Idea untuk melakukan ini dalam pelayar diilhamkan oleh karya Joseph Ciarrochi,',
    madeByHeading: 'Siapa yang membuatnya',
    madeByBody:
      'Tan Kean Sian mencetuskan idea alat ini dan mengarahkan pembangunannya; kesemua kodnya ditulis bersama Claude, pembantu AI Anthropic. Soalan, atau cadangan untuk menambah baiknya, dialu-alukan di',
    dataHeading: 'Di mana data anda berada',
    dataBody:
      'Dalam pelayar anda, dan tiada tempat lain. Tiada akaun, tiada pelayan, tiada analitis. Membersihkan data pelayar akan memadamkan peta anda, jadi eksportkan apa sahaja yang ingin anda simpan. Pautan kongsi membawa peta di dalam pautan itu sendiri dan bukannya memuat naiknya ke mana-mana.',
    licence: 'Dilesenkan di bawah MIT. Sumbangan dialu-alukan.',
  },

  error: {
    canvasTitle: 'Kanvas lukisan tidak dapat dimulakan',
    canvasHint:
      'Ini biasanya bermakna pemecutan grafik tidak tersedia pada mesin ini. Rangkaian anda selamat. Buka Paparan senarai untuk membaca dan menyuntingnya sebagai teks, dan Eksport untuk mengeluarkannya.',
    technicalDetail: 'Butiran teknikal',
  },

  toast: {
    copied_one: '{count} kotak disalin. Ctrl/Cmd+V untuk menampal.',
    copied_other: '{count} kotak disalin. Ctrl/Cmd+V untuk menampal.',
    pasted_one: '{count} kotak ditampal.',
    pasted_other: '{count} kotak ditampal.',
    duplicated_one: '{count} kotak digandakan.',
    duplicated_other: '{count} kotak digandakan.',
    hypothesisOn: 'Mod hipotesis dihidupkan. Apa sahaja yang anda tambah sekarang ialah cadangan, dilukis putus-putus.',
    sharedOpened: 'Membuka rangkaian yang dikongsi. Ia tidak menulis ganti kerja anda yang tersimpan.',
    imported: 'Telah dimuat masuk.',
    importUnreadable: 'Tidak dapat membaca fail itu.',
    importNotJson: 'Fail itu bukan JSON yang sah.',
  },

  language: {
    title: 'Bahasa',
    note: 'Terjemahan disumbangkan oleh komuniti dan sedang dalam semakan. Perbendaharaan kata klinikal khususnya mungkin belum mantap dalam setiap bahasa.',
    contribute: 'Ternampak terjemahan yang salah? Pembetulan amat dialu-alukan di',
    draft: 'draf',
  },

  a11y: {
    canvas: 'Kanvas rangkaian. Versi kandungan yang sama yang boleh diakses papan kekunci ada dalam Paparan senarai.',
    toolbar: 'Alat',
    scopeTabs: 'Sambungan mana yang hendak dikira',
  },
};
