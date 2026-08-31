import type { PartialStrings } from '../strings';

/**
 * Turkish (Türkçe).
 *
 * Terminology to check first: the EEMM dimensions follow Turkish PBT/ACT usage
 * — Duygulanım, Biliş, Dikkat, Benlik, Motivasyon, Açık davranış,
 * Biyofizyolojik, Sosyokültürel — with "bilişsel ayrışma" (defusion), "bağlam
 * olarak benlik" (self-as-context) and "istekli olmak" (willingness). The
 * systems-dynamics pair is "pekiştirici" / "dengeleyici" (the Senge rendering;
 * note "pekiştirme" also carries the operant sense in Turkish, so a reviewer
 * may prefer "güçlendirici"), with "merkezilik" for centrality and "kaldıraç"
 * for leverage. Other choices worth a look: "üç terimli bağıntı"
 * (three-term contingency), "işlevsel değerlendirme", "davranışsal aktivasyon",
 * "korku-kaçınma", "kondisyon kaybı" (deconditioning), and "Hizala" for
 * Organise (chosen over "Düzenle", which would collide with Edit). The
 * increases/decreases sentence is phrased as "{source} arttıkça {target}
 * artar/azalır" so that no case suffix ever lands on a substituted label. The
 * severity rating is "şiddet" rather than "sıkıntı" so its initial (Ş) stays
 * distinct from frequency's "sıklık" (S) in the on-node "Ş 8 · S 5" tags.
 * Address form is the consistent professional "siz"; buttons use the bare
 * imperative stem, prose uses -in.
 */
export const tr: PartialStrings = {
  meta: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },

  app: {
    name: 'Süreç Temelli Ağ Haritalama Aracı',
    short: 'PBT Haritalama Aracı',
    networkTitleLabel: 'Ağ başlığı',
    untitledNetwork: 'Adsız ağ',
  },

  tool: {
    select: 'Seç',
    add: 'Düğüm ekle',
    connect: 'Bağla',
    delete: 'Sil',
    event: 'Olay / bağlam',
  },

  toolHint: {
    select: 'Seçmek ve neye bağlandığını görmek için tıklayın. Taşımak için sürükleyin.',
    add: 'Düğüm eklemek için tuvalin herhangi bir yerine tıklayın.',
    connect: 'Önce etkileyen düğüme, sonra etkilenen düğüme tıklayın.',
    delete: 'Kaldırmak için bir düğüme ya da bağlantıya tıklayın.',
    start: 'Konunun ilgili olduğu olay ya da durumla başlayın. Herhangi bir yere tıklayın.',
    focused: 'Ağın bir bölümüne odaklanıldı.',
    showEverything: 'Yeniden hepsini göster',
    pendingSource: 'Kaynak: {label}. Şimdi etkilediği düğüme tıklayın.',
  },

  action: {
    undo: 'Geri al',
    redo: 'İleri al',
    fit: 'Sığdır',
    organise: 'Hizala',
    clear: 'Temizle',
    grid: 'Izgara',
    ratings: 'Puanlar',
    colourByValence: 'Yararlılık',
    colourByDirection: 'Artış/azalış',
    hypothesis: 'Hipotez',
    kernel: 'Çekirdek',
    analyse: 'Analiz',
    snapshots: 'Zaman noktaları',
    import: 'İçe aktar',
    export: 'Dışa aktar',
    share: 'Paylaş',
    help: 'Yardım',
    about: 'Hakkında',
    themeLight: 'Açık',
    themeDark: 'Koyu',
    templates: 'Şablonlar',
    guided: 'Rehber',
    cancel: 'İptal',
    save: 'Kaydet',
    add: 'Ekle',
    update: 'Güncelle',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    finish: 'Bitir',
    restore: 'Geri yükle',
    tryAgain: 'Yeniden dene',
    copy: 'Bağlantıyı kopyala',
    copied: 'Kopyalandı',
    language: 'Dil',
  },

  tooltip: {
    undo: 'Geri al (Ctrl/Cmd+Z)',
    redo: 'İleri al (Ctrl/Cmd+Y)',
    fit: 'Her şeyi ekrana sığdır (F)',
    organise: 'Kutuları okları izleyen satır ve sütunlara yerleştir (O)',
    clear: 'Her şeyi kaldır',
    grid: 'Izgarayı göster ve kutuları ona oturt (G)',
    ratings: 'Her kutunun üzerine şiddet (Ş) ve sıklık (S) puanlarını yaz (M)',
    colourIsDirection:
      'Ok rengi şu anda artışları (mavi) ve azalışları (turuncu) gösteriyor. Bunun yerine bağlantının yardımcı olup olmadığına göre renklendirmek için tıklayın.',
    colourIsValence:
      'Ok rengi şu anda bağlantının yardımcı olup olmadığını gösteriyor. Bunun yerine artış ve azalışlara göre renklendirmek için tıklayın.',
    addEvent: 'Bir olay ya da bağlam ekle',
    addProcess: 'Bir süreç ekle',
    hypothesis: 'Düşündüğünüz bir şeyi ekleyin ve neyi değiştireceğini görün (H)',
    kernel: 'Tedavi çekirdekleri (geliştiriliyor)',
    analyse: 'Merkezilik, geri besleme döngüleri, yollar ve kaldıraç noktaları',
    snapshots: 'Bu haritayı bir zaman noktası olarak kaydet, sonra karşılaştır',
    import: 'Kayıtlı bir dosyayı yükle',
    export: 'Görüntü, PDF, JSON veya CSV olarak kaydet',
    share: 'Bu haritaya bir bağlantı al',
    help: 'Bu araç nasıl kullanılır',
    templates: 'Bir örnekten başla',
    guided: 'Adım adım oluşturma',
    themeToLight: 'Açık temaya geç',
    themeToDark: 'Koyu temaya geç',
    language: 'Arayüz dilini değiştir',
    toolWithKey: '{tool} ({key} tuşu)',
    deleteKeyHint: 'D, ya da seçili olanı kaldırmak için Delete/Backspace',
    closePanel: 'Paneli kapat',
    closeDialog: 'Pencereyi kapat',
    closeGuide: 'Rehberi kapat',
  },

  privacy: {
    localOnly: 'Her şey bu cihazda kalır',
    localOnlyLong:
      'Haritanız bu tarayıcıda saklanır ve hiçbir yere gönderilmez. Sekmeyi kapatmak güvenlidir. Tarayıcı verilerinizi silmek haritayı da siler; saklamak istediğiniz her şeyi dışa aktarın.',
    studyMode: 'Araştırma modu',
    studyModeLong:
      'Bir araştırma çalışmasına katılıyorsunuz. Haritanız ve onu hangi sırayla kurduğunuz araştırma sunucusuna kaydediliyor.',
    autosaveUnavailable: 'Otomatik kayıt çalışmıyor — çalışmanızı korumak için dışa aktarın',
    autosaveUnavailableLong:
      'Bu tarayıcı sayfanın hiçbir şey kaydetmesine izin vermiyor; bu genellikle bir HTML dosyası doğrudan diskten açıldığında ya da gizli pencerede olur. Çalışmanız yine de size özel, ama sekmeyi kapattığınızda kaybolacak. Korumak için Dışa aktar’ı kullanın.',
  },

  panel: {
    analysis: 'Analiz',
    snapshots: 'Zaman noktaları',
    listView: 'Liste görünümü',
  },

  nodeEditor: {
    newEvent: 'Yeni olay veya bağlam',
    newNode: 'Yeni düğüm',
    edit: 'Düğümü düzenle',
    name: 'Ad',
    namePlaceholder: 'Kişinin kendi sözleriyle',
    category: 'Kategori',
    ratingsDisclosure: 'Puanlar ve notlar (isteğe bağlı)',
    ratingsNote:
      'Araştırma protokollerinde ağları kişiler arasında ve zaman içinde karşılaştırmak için kullanılır. Gündelik klinik haritalama için gerekli değildir.',
    severity: 'Ne kadar şiddetli (0–10)',
    frequency: 'Ne sıklıkta (0–10)',
    notes: 'Notlar',
    notRated: 'Puanlanmadı',
    severityShort: 'Ş',
    frequencyShort: 'S',
    rate: 'Puanla',
    clearRating: 'Temizle',
  },

  edgeEditor: {
    title: 'Bu şunu nasıl etkiliyor?',
    sentenceIncreases: '{source} arttıkça {target} artar',
    sentenceDecreases: '{source} arttıkça {target} azalır',
    increasesIt: 'Artırır',
    decreasesIt: 'Azaltır',
    altDirection: 'Bu ikisi ters yönde de birbirini etkiliyor.',
    editAlt: 'Düzenle: {source} → {target}',
    removeLink: 'Bağlantıyı kaldır',
    addLink: 'Bağlantı ekle',
    helpingDisclosure: 'Bu bağlantı yardımcı oluyor mu?',
    helpingNote:
      'Hiçbir süreç tek başına yararlı ya da zararlı değildir; neye bağlandığına göre değişir. Bu yüzden bu soru kutuya ad verirken değil burada sorulur. Bağlantıları işaretlemek, Analiz panelinin yalnızca hangi değişikliğin en uzağa yayılacağını değil hangisinin işe yarayacağını da söyleyebilmesini sağlar. Bunu kullanmıyorsanız olduğu gibi bırakın.',
  },

  category: {
    uncategorised: {
      label: 'Sınıflandırılmamış',
      prefix: '',
      hint: 'Henüz sınıflandırılmadı. Hâlâ düşünüyorsanız böyle bırakmakta sakınca yok.',
    },
    affect: {
      label: 'Duygulanım',
      prefix: 'Duygulanım',
      hint: 'Duygular ve hisler. Onlardan kaçınmak ya da onları yaşamaya istekli olmak.',
    },
    cognition: {
      label: 'Biliş',
      prefix: 'Biliş',
      hint: 'Düşünceler, inançlar, kurallar, ruminasyon, bilişsel ayrışma.',
    },
    attention: {
      label: 'Dikkat',
      prefix: 'Dikkat',
      hint: 'Nelerin fark edildiği, nelerin edilmediği. Esnek ya da daralmış odak.',
    },
    self: {
      label: 'Benlik',
      prefix: 'Benlik',
      hint: 'Benlik kavramı, kimlik, öz eleştiri, bağlam olarak benlik.',
    },
    motivation: {
      label: 'Motivasyon',
      prefix: 'Motivasyon',
      hint: 'Değerler, hedefler, kişinin neye doğru ya da neyden uzağa hareket ettiği.',
    },
    overtBehaviour: {
      label: 'Açık davranış',
      prefix: 'Açık davranış',
      hint: 'Gözlenebilir eylem. Kişinin gerçekte ne yaptığı.',
    },
    biophysiological: {
      label: 'Biyofizyolojik',
      prefix: 'Biyofizyolojik',
      hint: 'Uyku, ağrı, hastalık, ilaç, uyarılmışlık, fizyoloji.',
    },
    sociocultural: {
      label: 'Sosyokültürel',
      prefix: 'Sosyokültürel',
      hint: 'İlişkiler, aile, kültür, sosyal destek ya da baskı.',
    },
    context: {
      label: 'Bağlam / olay',
      prefix: 'Olay',
      hint: 'Kişinin yaptığı bir şey değil, bir durum ya da olay. Köşeleri yuvarlak çizilir.',
    },
  },

  categoryGroup: {
    dimension: 'Psikolojik boyutlar',
    level: 'Düzeyler',
    other: 'Bağlam ve sınıflandırılmamış',
  },

  strength: {
    1: 'Biraz',
    2: 'Orta düzeyde',
    3: 'Çok',
  },

  valence: {
    neutral: 'Değerlendirilmedi',
    helpful: 'Yardımcı oluyor',
    unhelpful: 'Yardımcı olmuyor',
  },

  trial: {
    proposed: 'Değerlendiriliyor',
    adopted: 'Denendi, işe yaradı',
    ruledOut: 'Denendi, işe yaramadı',
    proposedHint:
      'Henüz bir fikir. Kesik çizgiyle çizilir ve karşılaştırmanın ölçüt aldığı temel duruma katılmaz.',
    adoptedHint: 'İşe yaradı. Haritanın bir parçası olur ve diğer her şey gibi çizilir.',
    ruledOutHint: 'İşe yaramadı. Soluk biçimde tutulur, böylece nelerin denendiğini görebilirsiniz.',
    dialogTitle: 'Bununla ne oldu?',
    legend: 'Bu nereye geldi?',
    lastRecorded: 'Son kayıt: {when}',
    notATrial: 'Aslında bir deneme değil — haritanın sıradan bir parçası olsun',
  },

  analysis: {
    title: 'Analiz',
    summary: 'Bu ağ neyi gösteriyor',
    central: 'En bağlantılı',
    loops: 'Geri besleme döngüleri',
    leverage: 'Değişimin en geniş yayılabileceği yer',
    paths: 'Bir yolu izle',
    whatIf: 'Ya olursa',
    empty: 'Analiz görmek için düğüm ve bağlantı ekleyin.',

    stats: '{nodes} düğüm · {edges} bağlantı · yoğunluk {density}',

    scopeAll: 'Tüm bağlantılar',
    scopeUnhelpful: 'Uyumsuz',
    scopeHelpful: 'Uyumlu',
    centralNote:
      'Güç, içeri ve dışarı akan etkinin ne kadar olduğunu sayar. Tedavi hedefi seçmede en çok desteğe sahip merkezilik ölçüsüdür, ama merkezî bir düğüm otomatik olarak üzerine gidilmesi doğru olan düğüm değildir.',
    scopeUnhelpfulNote:
      'Yalnızca yardımcı olmuyor diye işaretlediğiniz oklar sayılıyor. Buradaki yüksek bir puan, sorunu bir arada tutan bir sürece işaret eder.',
    scopeHelpfulNote:
      'Yalnızca yardımcı oluyor diye işaretlediğiniz oklar sayılıyor. Buradaki yüksek bir puan, kişinin hâlihazırda elinde olan bir şeydir — çoğu zaman yeni bir şey eklemek yerine bunun üzerine inşa etmeye değer.',
    excludedNote_one:
      '{count} değerlendirilmemiş bağlantı her iki ayrımın da dışında tutuluyor; bu yüzden ikisi birleşik rakamları vermez.',
    excludedNote_other:
      '{count} değerlendirilmemiş bağlantı her iki ayrımın da dışında tutuluyor; bu yüzden ikisi birleşik rakamları vermez.',
    noneMarkedHelpful:
      'Henüz hiçbir şey yardımcı oluyor diye işaretlenmedi. Burayı doldurmak için bir bağlantıyı açın ve yardımcı olup olmadığını belirtin.',
    noneMarkedUnhelpful:
      'Henüz hiçbir şey yardımcı olmuyor diye işaretlenmedi. Burayı doldurmak için bir bağlantıyı açın ve yardımcı olup olmadığını belirtin.',

    colNode: 'Düğüm',
    colIn: 'Gelen',
    colOut: 'Giden',
    colStrength: 'Güç',
    colNetOutward: 'Net çıkış',
    chipEntryPoint: 'giriş noktası',
    chipEndpoint: 'uç nokta',
    chipUnconnected: 'bağlantısız',
    chipNothingHelping: 'yardımcı yok',
    chipNothingUnhelpful: 'yardımcı olmayan yok',

    reinforcing: 'Pekiştirici',
    balancing: 'Dengeleyici',
    reinforcingHelp:
      'Kendi kendini sürdürür. Döngünün herhangi bir yerindeki artış dönüp yeni bir artış olarak geri gelir; sorunun tetikleyici geçtikten sonra da sürmesinin nedeni budur.',
    balancingHelp:
      'Kendi kendini düzeltir. Bu döngüdeki bir şey geri iter; bu genellikle doğal bir fren demektir.',
    noLoops: 'Döngü bulunamadı.',
    manyLoops: 'Bu ağda çok sayıda döngü var. Yalnızca en güçlü olanlar listelendi.',
    loopSteps_one: '{count} adım, kazanç {gain}',
    loopSteps_other: '{count} adım, kazanç {gain}',

    heuristicWarning:
      'Bu rakamlar kişiyi değil, çizdiğiniz haritayı anlatır. Etkinin doğrusal ve anlık olduğunu varsayarlar; oysa değildir. Onları düşünmek için kullanın, asla bir kestirim olarak değil.',
    colIfReduced: 'Bu azaltılsaydı',
    colBenefit: 'Modellenen yarar',
    colReach: 'Erişim',
    wouldAlsoSuppress: 'Şunları da baskılar: {labels}',
    chipNoDampening: 'sönümleme yok',

    from: 'Nereden',
    to: 'Nereye',
    choose: 'Seçin…',
    noRoute: 'Biriyle diğeri arasında yol yok.',
    routeStats_one: '{count} yol · {up} artıran · {down} azaltan · net {net}',
    routeStats_other: '{count} yol · {up} artıran · {down} azaltan · net {net}',
    pathSteps_one: '{count} adım, etki {effect}',
    pathSteps_other: '{count} adım, etki {effect}',
    increases: 'artırır',
    decreases: 'azaltır',

    colNow: 'Şimdi',
    colWithThis: 'Bununla',
    rowReinforcing: 'Pekiştirici döngüler',
    rowBalancing: 'Dengeleyici döngüler',
    rowAmplification: 'Modellenen güçlenme',
    newBrakes: 'Sisteme gelen yeni frenler',
    badgeNewBalancing: 'yeni dengeleyici',
    howItActs: 'Her döngüde nasıl etki ediyor',
    mechSelfCorrecting: 'kendi kendini düzeltir',
    mechSteadyPressure: 'sürekli baskı',
    mechPushedHarder: 'daha güçlü itiliyor',
    mechUntouched: 'dokunulmadı',
    pressureOn: '{labels} üzerinde · sürdürülmesi gerekir',
    holdsOnItsOwn: 'kendi kendine tutar',
  },

  summary: {
    noNodes: 'Analiz görmek için birkaç düğüm ekleyin.',
    noEdges:
      'Henüz hiçbir şey bağlanmadı. Parçaların birbirini nasıl etkilediğini görmek için bağlantı ekleyin.',
    mostConnected_one:
      '**{label}**, bu ağın en çok bağlantısı olan parçası ({inDegree} gelen etki, {outDegree} giden etki). Değişim çoğu zaman en geniş biçimde merkezî düğümlerden yayılır, ama bunlar doğrudan değiştirilmesi en zor olanlar da olabilir.',
    mostConnected_other:
      '**{label}**, bu ağın en çok bağlantısı olan parçası ({inDegree} gelen etki, {outDegree} giden etki). Değişim çoğu zaman en geniş biçimde merkezî düğümlerden yayılır, ama bunlar doğrudan değiştirilmesi en zor olanlar da olabilir.',
    reinforcing_one:
      'Burada **{count} pekiştirici döngü** var. Bunlar kendi kendini sürdüren döngülerdir: onları başlatan şey geçtikten sonra bile sürerler.',
    reinforcing_other:
      'Burada **{count} pekiştirici döngü** var. Bunlar kendi kendini sürdüren döngülerdir: onları başlatan şey geçtikten sonra bile sürerler.',
    tightestLoop: ' En sıkı olanı şu: {path}.',
    noReinforcing:
      'Pekiştirici döngü bulunamadı. Buradaki herhangi bir şeyin kendine geri besleme yapıp yapmadığını sormaya değer; çünkü bir sorunun sürmesini çoğu zaman geri besleme sağlar.',
    balancing_one:
      '{count} dengeleyici döngü bulundu. Bunlar kendi kendini düzeltir ve çoğu zaman kişinin sorun üzerinde hâlihazırda sahip olduğu doğal bir freni gösterir.',
    balancing_other:
      '{count} dengeleyici döngü bulundu. Bunlar kendi kendini düzeltir ve çoğu zaman kişinin sorun üzerinde hâlihazırda sahip olduğu doğal bir freni gösterir.',
    sources_one:
      '{labels} başkalarını etkiliyor ama ağdaki hiçbir şey onu geri etkilemiyor. Bu tür giriş noktaları bazen başlamak için en elverişli yerlerdir.',
    sources_other:
      '{labels} başkalarını etkiliyor ama ağdaki hiçbir şey onları geri etkilemiyor. Bu tür giriş noktaları bazen başlamak için en elverişli yerlerdir.',
    leverage_one:
      '**{label}** azaltıldığında modellenen etki en geniş alana yayılıyor ve {reach} başka düğüme ulaşıyor.',
    leverage_other:
      '**{label}** azaltıldığında modellenen etki en geniş alana yayılıyor ve {reach} başka düğüme ulaşıyor.',
    leverageCaveat_one:
      ' Ancak şunu da baskılayacağını unutmayın: {labels} — bu, yardımcı olarak işaretlediğiniz bağlantılara bağlı.',
    leverageCaveat_other:
      ' Ancak şunları da baskılayacağını unutmayın: {labels} — bunlar, yardımcı olarak işaretlediğiniz bağlantılara bağlı.',
    isolated_one: '{labels} henüz hiçbir şeye bağlı değil.',
    isolated_other: '{labels} henüz hiçbir şeye bağlı değil.',
    diverges:
      'Bu ağın bazı bölümleri modellendiğinde sınırsız biçimde güçleniyor; bu genellikle sönümlemesi olmayan güçlü pekiştirici döngüler demektir. Kaldıraç rakamlarını yalnızca fikir verici sayın.',
    caveat:
      '_Bu rakamlar kişiyi değil, çizdiğiniz haritayı anlatır. Ne olacağının kestirimi değil, kendi düşüncenize bakmanın yapılandırılmış bir yoludur._',
  },

  guided: {
    ariaLabel: 'Rehberli oluşturma',
    stepOf: 'Adım {current} / {total}',
    done: 'Tamam. Hazır olduğunuzda devam edin.',
    footer:
      'Rehberden istediğiniz anda çıkabilir ve oluşturduğunuz her şeyi koruyabilirsiniz. Adımlar doldurulacak bir form değil, bir iskeledir.',
    step1Title: '1. Bağlamla başlayın',
    step1Body:
      'Olay / bağlam düğmesini kullanarak konunun ilgili olduğu durumu ekleyin: ne oldu, nerede, kiminle. Kişinin yaptığı bir şey olmadığı için köşeleri yuvarlak bir kutu alır.\n\nBuradan başlamak bir formalite değildir. İşlevsel değerlendirmede aynı düşünce ya da eylem farklı durumlarda farklı anlamlar taşır; dolayısıyla kendisinden sonra gelen her şeyi yorumlanabilir kılan şey bağlamdır.',
    step1Nudge: 'Başlamak için bir olay ya da bağlam kutusu ekleyin.',
    step2Title: '2. Tepkiyi ve ardından geleni ekleyin',
    step2Body:
      'Şimdi içeride olup biteni (bir düşünce, duygu ya da dürtü) ve kişinin ne yaptığını ya da ortaya ne çıktığını ekleyin. Bağlamdan başlayarak sırayla bağlayın.\n\nBu, işlevsel değerlendirmenin üzerine kurulduğu birim olan üç terimli bağıntıdır. Geri kalan her şey bunun üzerinden büyür.',
    step2NudgeNodes: 'İki kutu daha ekleyin: içsel tepki, sonra ne olduğu.',
    step2NudgeEdges: 'Şimdi bunları bağlayın: bağlam → içsel tepki → ne olduğu.',
    step3Title: '3. Geri döngü var mı, bakın',
    step3Body:
      'Zincirinizin sonuna bakın ve sorun: bu, daha önceki bir şeye geri besleme yapıyor mu? Kötü uyku endişeye yol açar, ama endişe de kötü uykuya yol açar.\n\nBir sorunun, onu başlatan şey çoktan geçmişken neden sürdüğünün yanıtı genellikle geri beslemedir.',
    step3Nudge: 'Henüz hiçbir şey geri dönmüyor. Sonuç, daha önceki bir şeyi besliyor mu?',
    step4Title: '4. Başka nelerin işin içinde olduğunu ekleyin',
    step4Body:
      'Buna başka neler karışıyor? Sonuçtan etkilenen ve aynı zamanda tepkiye geri besleme yapan her şey için bir düğüm ekleyin.\n\nBurada güçlendiriciler önemlidir. Yorgunluk yalnızca bir başka sorun değildir; diğer her şeyin daha tehditkâr hissettirmesine yol açar.',
    step4Nudge: 'En az bir öğe daha ekleyin.',
    step5Title: '5. Yardımcı olanı ekleyin',
    step5Body:
      'Her şey durumu kötüleştirmez. Bu sorunlardan birini azaltan bir şey ekleyin, onu azaltıcı bir bağlantı olarak çizin ve o bağlantıyı Yardımcı oluyor diye işaretleyin.\n\nBu, çoğu zaman insanların atladığı kısımdır ve müdahale genellikle tam burada bulunur.',
    step5NudgeDecrease: 'Bunlardan birini azaltan bir şey ekleyin ve azaltıcı bir bağlantı olarak çizin.',
    step5NudgeHelpful:
      'O bağlantıyı Yardımcı oluyor diye işaretleyin ki harita neyin işe yaradığını göstersin.',
    step6Title: '6. Önüne geçen şeyi haritalayın',
    step6Body:
      'Şimdi zor kısım. Yardımcı olan şeyin gerçekleşmesini ne engelliyor?\n\n“Biraz daha spor yapsan” tavsiyesinin bu kadar kötü karşılanmasının nedeni budur. Kişi bunun işe yarayacağını zaten biliyor. Sistemdeki bir şey onu bastırıyor ve bu görünür olmadıkça tavsiyenin gidecek bir yeri yok.',
    step6Nudge: 'Yardımcı olan şeyi bastıran bir bağlantı ekleyin.',
  },

  snapshots: {
    intro:
      'Ağı şu anki hâliyle kaydedin, sonra geri gelip yeniden çizin. Hiçbir şeyin üzerine yazılmaz.',
    labelPlaceholder: 'Etiket, örn. İlk görüşme ya da 6. seans',
    labelAria: 'Bu zaman noktası için etiket',
    saveButton: 'Zaman noktasını kaydet',
    none: 'Henüz kaydedilmiş zaman noktası yok.',
    meta: '{when} · {nodes} düğüm · {edges} bağlantı',
    deleteAria: 'Zaman noktasını sil: {label}',
    compare: 'Karşılaştır',
    earlier: 'Önceki',
    later: 'Sonraki',
    changes_one: '{count} değişiklik',
    changes_other: '{count} değişiklik',
    downloadComparison: 'Karşılaştırmayı indir (CSV)',
  },

  structure: {
    empty: 'Burada henüz bir şey yok. Başlamak için bir düğüm ekleyin.',
    nodes: 'Düğümler ({count})',
    connections: 'Bağlantılar ({count})',
    noConnections: 'Henüz yok.',
    nodeMetaDistress: ' · şiddet {value}',
    nodeMetaFrequency: ' · sıklık {value}',
    deleteNodeAria: 'Düğümü sil: {label}',
    deleteEdgeAria: 'Bağlantıyı sil: {sentence}',
  },

  templates: {
    intro:
      'Bunlar birer başlangıç noktasıdır, formülasyon değil. Etiketleri kişinin kendi sözleriyle değiştirin ve uymayan her şeyi silin. Sorgulanmadan kalan bir şablon boş bir tuvalden daha kötüdür.',
    blankName: 'Boş tuval',
    blankDescription: 'Sıfırdan başlayın.',
    abcName: 'Üç terimli bağıntı',
    abcDescription:
      'Başlangıç iskelesi: bağlam, içsel tepki, sonuç. Buradan dışa doğru kurun.',
    worryName: 'Endişe ve uyku döngüsü',
    worryDescription:
      'İşlenmiş bir örnek. Pekiştirici bir döngünün neye benzediğini göstermek için kullanışlı.',
    moodName: 'Düşük duygudurum ve geri çekilme',
    moodDescription:
      'Yaygın bir davranışsal aktivasyon örüntüsü. Kullanmadan önce kişinin kendi sözlerine çevirin.',
    painName: 'Kronik ağrı ve kaçınma',
    painDescription:
      'Bir korku-kaçınma örüntüsü ve onu genellikle sürdüren kondisyon kaybı döngüsü.',
  },

  templateNodes: {
    abcTrigger: 'Tetikleyici ya da durum',
    abcThought: 'Düşünce ya da duygu',
    abcAction: 'Ne yapıyorum',

    worryCriticism: 'İşte eleştirilmek',
    worryJobSecurity: 'İş güvencesi kaygısı',
    worrySleep: 'Uyku güçlüğü',
    worryFatigue: 'Yorgunluk',
    worryExercise: 'Egzersiz',
    worryWithdrawal: 'Sosyal geri çekilme',

    moodLow: 'Düşük duygudurum',
    moodStayingHome: 'Evden çıkmamak',
    moodFewerThings: 'Değer verdiğim şeylerin azalması',
    moodBurden: 'Yük oluyorum',
    moodContact: 'Arkadaşlarla görüşmek',
    moodNoticing: 'Küçük güzel anları fark etmek',

    painPain: 'Ağrı',
    painFear: 'Daha kötü yapma korkusu',
    painAvoiding: 'Aktiviteden kaçınmak',
    painDeconditioning: 'Kondisyon kaybı',
    painDoingAnyway: 'Yine de değerli olanı yapmak',
    painWillingness: 'Rahatsızlığı hissetmeye istekli olmak',
  },

  templateNote:
    'Bu bir başlangıç noktasıdır, formülasyon değil. Etiketleri kişinin kendi sözleriyle değiştirin.',

  exportDialog: {
    intro:
      'CSV biçimleri doğrudan R veya Python’a yüklenir. Komşuluk matrisi, qgraph, igraph ve networkx’in girdi olarak beklediği biçimdir.',
    json: 'Ağ (JSON)',
    edges: 'Kenar listesi (CSV)',
    nodes: 'Düğüm listesi (CSV)',
    matrix: 'Komşuluk matrisi (CSV)',
    report: 'Analiz raporu (Markdown)',
    events: 'Oluşturma günlüğü (CSV)',
    png: 'Görüntü (PNG)',
    svg: 'Vektör (SVG)',
    print: 'Yazdır / PDF',
  },

  share: {
    title: 'Bağlantıyı paylaş',
    intro:
      'Ağın tamamı bağlantının kendi içinde kodlanır. Sunucuda bir kopyası yoktur ve içeriğinizi taşıyan kısım web isteğinde hiç gönderilmez; dolayısıyla hiçbir yerde saklanmaz ya da günlüğe yazılmaz. Bağlantıya sahip olan herkes kendi kopyasını açıp düzenleyebilir.',
    building: 'Bağlantı hazırlanıyor…',
    tooLong:
      'Bu ağ bir bağlantı için fazla büyük ({length} karakter). JSON olarak dışa aktarıp dosyayı gönderin.',
  },

  clearDialog: {
    title: 'Bu ağ temizlensin mi?',
    body:
      'Bu işlem {nodes} düğümün ve {edges} bağlantının tümünü kaldırır. Geri alabilirsiniz ve kayıtlı zaman noktaları korunur.',
    confirm: 'Her şeyi temizle',
  },

  kernel: {
    title: 'Tedavi çekirdekleri',
    warning: 'Geliştiriliyor. Bu düğmenin arkasında henüz bir şey yok.',
    p1: 'Plan, bir tedavi çekirdekleri sözlüğü oluşturmak: terapötik değişimin en küçük birimleri, haritadaki süreçlere iliştirilebilecek kadar tutarlı bir dille. Bir süreç seçin ve hangi çekirdeklerin onun üzerinde etkili olduğunun bilindiğini görün.',
    p2: 'Zor kısım, neyin tek bir çekirdek sayılacağına ve bunların ne kadar ince ayrılacağına karar vermek; bu da henüz çözülmüş değil.',
    p3: 'Bu veritabanının nasıl düzenlenmesi gerektiğine dair fikirleriniz varsa Kean duymak ister:',
  },

  help: {
    title: 'Bu araç nasıl kullanılır',
    buildingHeading: 'Harita oluşturma',
    buildingEvent:
      'konunun ilgili olduğu durum. Buradan başlayın; boş bir tuvalde herhangi bir tıklama bunu oluşturur. Kişinin yaptığı bir şey olmadığı için köşeleri yuvarlak bir kutu alır.',
    buildingAdd:
      'bir süreç: bir düşünce, duygu, dürtü ya da eylem. Kare kutu, EEMM kategorisine göre renklendirilir.',
    buildingConnect:
      'önce etkileyen kutuya, sonra etkilenen kutuya tıklayın. Ardından tek tıklamayla artırıp mı azalttığını ve ne kadar olduğunu seçin.',
    buildingDelete: 'herhangi bir kutuya ya da oka tıklayın. Ya da bir şey seçip Delete tuşuna basın.',
    buildingDoubleClick: 'Bir kutuyu düzenlemek için çift tıklayın. Taşımak için her modda sürükleyebilirsiniz.',

    readingHeading: 'Resmi okuma',
    readingArrowheads:
      '**Dolu** bir ok ucu artırdığını, **içi boş** olanı azalttığını gösterir. Uçları daha büyük, daha kalın çizgiler daha güçlü etkilerdir. Sayı yok, renge bağımlılık yok.',
    readingReciprocal: 'İki ucunda da başlık olan bir çizgi, ikisinin birbirini etkilediği anlamına gelir.',
    readingShapes: 'Kare kutular süreçlerdir; köşeleri yuvarlak kutular olay ya da bağlamlardır.',
    readingColour:
      'Bir bağlantıyı yardımcı oluyor (yeşil) ya da yardımcı olmuyor (kırmızı) diye işaretlemediyseniz oklar siyahtır. Bağlantıların çoğu siyah kalır: bu işaretleme, yeni bir şeyin bir döngüyü kırıp kırmadığını sınadığınız durumlar içindir.',
    readingColourMode:
      'Artış/azalış düğmesi, etkinin yönünü okumak istediğinizde ok rengini bunun yerine artışları (mavi) ve azalışları (turuncu) gösterecek biçimde değiştirir.',

    keyboardHeading: 'Klavye',
    keyboardTools: 'seç · olay/bağlam · düğüm ekle · bağla · sil',
    keyboardConnectFromSelection: 'Bir kutu seçip C tuşuna basın; sonraki tıklamanız bağlantıyı tamamlar.',
    keyboardDelete: 'Delete ya da Backspace seçili olanı kaldırır.',
    keyboardEscape: 'Esc yaptığınız şeyi iptal eder. Seçime dönmek için bir kez daha basın.',
    keyboardView: 'F ekrana sığdır · O hizala · M puanlar · G ızgara',
    keyboardEditing:
      'Ctrl/Cmd+Z geri al · Shift+tıklama ile birden çok seçim · Ctrl/Cmd+C ve Ctrl/Cmd+V kopyala ve yapıştır · Ctrl/Cmd+D çoğalt',

    organiseHeading: 'Hizala',
    organiseBody:
      'Kutuları okları izleyen satır ve sütunlara yerleştirir; ana bağlam da en önde durur. Yerleşimi hem yatay hem dikey dener ve ekranınıza daha iyi sığanı tutar. Sıra belirlenirken geri besleme döngüleri yok sayılır, böylece diziyi karıştırmak yerine döngü olarak okunurlar.',

    mouselessHeading: 'Fare olmadan',
    mouselessBody:
      'Liste görünümü, haritanın tamamını Tab ile gezebileceğiniz ve klavyeden düzenleyebileceğiniz bir metin olarak gösterir. Bir tuval ekran okuyucuya görünmez olduğundan, ekran okuyucunun okuduğu da budur.',
    openListView: 'Liste görünümünü aç',

    cautionHeading: 'Analiz hakkında bir uyarı',
    cautionBody:
      'Merkezilik, döngüler ve kaldıraç, kişiyi değil çizilen haritayı anlatır. Etkinin doğrusal ve anlık olduğunu varsayarlar; oysa değildir. Kendi düşüncenizi sorgulamanın yapılandırılmış bir yoludur ve tam olarak üzerine kuruldukları puanlar kadar değerlidirler.',
  },

  about: {
    title: 'Hakkında',
    intro:
      'Süreç temelli ağları haritalamak için ücretsiz, açık kaynaklı bir araç: psikolojik acıyı ve iyi oluşu sürdüren süreçler arasındaki işlevsel ilişkiler.',
    groundingHeading: 'Dayanak',
    groundingBody:
      'Kategoriler ve bu aracın süreçleri ele alış biçimi, **Steven C. Hayes ve Stefan G. Hofmann**’ın süreç temelli terapi çalışmasında ortaya konan Genişletilmiş Evrimsel Meta-Model’den (EEMM) gelir: biyofizyolojik ve sosyokültürel düzeylere yerleşmiş, her zaman bağlam içinde okunan duygulanım, biliş, dikkat, benlik, motivasyon ve açık davranış.',
    inspiration: 'Bunu bir tarayıcıda yapma fikri Joseph Ciarrochi’nin şu çalışmasından esinlendi:',
    madeByHeading: 'Bunu kim yaptı',
    madeByBody:
      'Bu aracı Tan Kean Sian tasarladı ve geliştirilmesini yönetti; kodun tamamı Anthropic’in yapay zekâ asistanı Claude ile yazıldı. Sorularınızı ya da iyileştirme önerilerinizi memnuniyetle bekliyoruz:',
    dataHeading: 'Verileriniz nerede duruyor',
    dataBody:
      'Tarayıcınızda, başka hiçbir yerde. Hesap yok, sunucu yok, analitik yok. Tarayıcı verilerinizi silmek haritalarınızı da siler; saklamak istediğiniz her şeyi dışa aktarın. Paylaşım bağlantıları haritayı bir yere yüklemek yerine bağlantının kendi içinde taşır.',
    licence: 'MIT lisanslı. Katkılar memnuniyetle karşılanır.',
  },

  error: {
    canvasTitle: 'Çizim tuvali başlatılamadı',
    canvasHint:
      'Bu genellikle bu makinede grafik hızlandırmanın kullanılamadığı anlamına gelir. Ağınız güvende. Metin olarak okumak ve düzenlemek için Liste görünümünü, dışarı almak için Dışa aktar’ı kullanın.',
    technicalDetail: 'Teknik ayrıntı',
  },

  toast: {
    copied_one: '{count} kutu kopyalandı. Yapıştırmak için Ctrl/Cmd+V.',
    copied_other: '{count} kutu kopyalandı. Yapıştırmak için Ctrl/Cmd+V.',
    pasted_one: '{count} kutu yapıştırıldı.',
    pasted_other: '{count} kutu yapıştırıldı.',
    duplicated_one: '{count} kutu çoğaltıldı.',
    duplicated_other: '{count} kutu çoğaltıldı.',
    hypothesisOn: 'Hipotez açık. Şimdi eklediğiniz her şey bir öneridir ve kesik çizgiyle çizilir.',
    sharedOpened: 'Paylaşılan bir ağ açıldı. Kayıtlı çalışmanızın üzerine yazılmadı.',
    imported: 'İçe aktarıldı.',
    importUnreadable: 'Bu dosya okunamadı.',
    importNotJson: 'Bu dosya geçerli bir JSON değil.',
  },

  language: {
    title: 'Dil',
    note:
      'Çeviriler topluluk katkısıyla yapılıyor ve gözden geçiriliyor. Özellikle klinik terminoloji her dilde henüz oturmuş olmayabilir.',
    contribute: 'Bir çeviri hatası mı gördünüz? Düzeltmeleri memnuniyetle bekliyoruz:',
    draft: 'taslak',
  },

  a11y: {
    canvas: 'Ağ tuvali. Aynı içeriğin klavyeyle erişilebilen bir sürümü Liste görünümündedir.',
    toolbar: 'Araçlar',
    scopeTabs: 'Hangi bağlantıların sayılacağı',
  },
};
