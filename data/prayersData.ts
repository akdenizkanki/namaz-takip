export interface ReligiousText {
  title: string;
  content: string;
  category: 'SURE' | 'DUA';
}

export const religiousTexts: ReligiousText[] = [
  // NAMAZ SURELERİ
  {
    title: "Ayet-el Kûrsi",
    category: "SURE",
    content: "Allâhu lâ ilâhe illâ huve’l-hayyu’l-kayyûm. Lâ te’huzuhû sinetun ve lâ nevm. Lehû mâ fi’s-semâvâti ve mâ fi’l-ardı men zellezî yeşfe’u ‘ındehû illâ bi iznih. Ya’lemu mâ beyne eydîhim ve mâ halfehum ve lâ yuhîtûne bi şey’in min ‘ılmihî illâ bimâ şâe vesi’a kursiyyuhu’s-semâvâti ve’larda ve lâ yeûduhû hıfzuhumâ ve huve’l-‘aliyyu’l-‘azîm."
  },
  {
    title: "Fatiha Sûresi",
    category: "SURE",
    content: "1- Bismillâhi’r-Rahmâni’r-Rahîm.\n2- Elhamdulillâhi Rabbi’l-âlemîn.\n3- Er-Rahmâni’r-Rahîm.\n4- Mâliki yevmi’d-dîn.\n5- İyyâke na’budu ve iyyâke neste’în.\n6- İhdine’s-sırâta’l-mustakîm.\n7- Sırâta’l-lezîne en’amte aleyhim. Ğayri’l-meğdûbi aleyhim ve le’d-dâllîn."
  },
  {
    title: "Fil Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Elemtera keyfe fe’ale Rabbuke bi-ashâbi’l-fîl.\n2- Elem yec’al keydehum fî tadlîl.\n3- Ve ersele ’aleyhim tayran ebâbîl.\n4- Termîhim bi-hicâratin min siccîl.\n5- Fece’alehum ke’asfin me’kûl."
  },
  {
    title: "Kureyş Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Li îlâfi kurayş.\n2- Îlâfihim rihlete’ş-şitâi ve’s-sayf.\n3- Felya’budû Rabbe hâze’l-beyt.\n4- Ellezî et’amehum min cû’in ve âmenehum min havf."
  },
  {
    title: "Mâun Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Eraeytellezî yukezzibu bi’d-dîn.\n2- Fezâlike’l-lezî yedu’ul-yetîm.\n3- Ve lâ yehuddu alâ ta’âmi’l-miskîn.\n4- Feveylun lil-musallîn.\n5- Ellezînehum an salâtihim sâhûn.\n6- Ellezînehum yurâûn.\n7- Ve yemne’ûne’l-mâ’ûn."
  },
  {
    title: "Kevser Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- İnnâ a’taynâke’l-kevser.\n2- Fesalli li-Rabbike ve’nhar.\n3- İnne şâni’eke huve’l-ebter"
  },
  {
    title: "Kâfirûn Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Gul yâ eyyuhe’l-kâfirûn.\n2- Lâ a’budu mâ ta’budûn.\n3- Ve lâ entum âbidûne mâ a’bud.\n4- Velâ ene âbidun mâ abettum.\n5- Velâ entum âbidûne mâ a’bud.\n6- Lekum dînukum veliye dîn."
  },
  {
    title: "Nasr Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- İzâ câe nasrullâhi ve’l-fethu.\n2- Ve raeyte’n-nâse yedhulûne fî dînillâhi efvâcâ.\n3- Fe sebbih bi-hamdi Rabbike vestağfirhu innehû kâne tevvâbâ."
  },
  {
    title: "Tebbet Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Tebbet yedâ ebî lehebin ve tebb.\n2- Mâ ağnâ ‘anhu mâluhû ve mâ keseb.\n3- Seyaslâ nâran zâte leheb.\n4- Vemraetuhû hammâlete’l-hatab.\n5- Fî cîdihâ hablun min mesed."
  },
  {
    title: "İhlas Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Gul huvallâhu ehad.\n2- Allâhu’s-samed.\n3- Lem yelid ve lem yûled.\n4- Ve lem yekun lehû kufuven ahad."
  },
  {
    title: "Felak Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Gul e’ûzu bi-Rabbi’l-felak.\n2- Min şerri mâ halak.\n3- Ve min şerri ğâsikın izâ vekab.\n4- Ve min şerri’n-neffâsâti fi’l-ukad.\n5- Ve min şerri hâsidin izâ hased."
  },
  {
    title: "Nas Sûresi",
    category: "SURE",
    content: "Bismillâhi’r-Rahmâni’r-Rahîm.\n1- Gul e’ûzu bi-Rabbi’n-nâs.\n2- Meliki’n-nâs.\n3- İlâhi’n-nâs.\n4- Min şerri’l-vesvâsi’l-hânnâs.\n5- Ellezî yuvesvisu fî sudûri’n-nâs.\n6- Mine’l-cinneti ve’n-nâs."
  },
  
  // NAMAZ DUALARI
  {
    title: "Sübhaneke Duası",
    category: "DUA",
    content: "Subhânekellâhumme ve bi hamdik ve tebârakesmuk ve teâlâ cedduk (ve celle senâuk*) ve lâ ilâhe ğayruk.\n* (vecelle senâuk kısmı sadece cenaze namazında okunur.)"
  },
  {
    title: "Ettehiyyâtu Duası",
    category: "DUA",
    content: "Ettehiyyâtu lillâhi vessalevâtu vettayibât. Esselâmu aleyke eyyuhen-Nebiyyu ve rahmetullahi ve berakâtuhu. Esselâmu aleynâ ve alâ ibâdillâhis-Sâlihîn. Eşhedu en lâ ilâhe illallâh ve eşhedu enne Muhammeden abduhû ve Rasuluh."
  },
  {
    title: "Allâhumme Salli Duası",
    category: "DUA",
    content: "Allâhumme salli alâ Muhammedin ve alâ âli Muhammed. Kemâ salleyte alâ İbrahime ve alâ âli İbrahim. İnneke hamidun mecîd."
  },
  {
    title: "Allâhumme Barik Duası",
    category: "DUA",
    content: "Allâhumme barik alâ Muhammedin ve alâ âli Muhammed. Kemâ barekte alâ İbrahîme ve alâ âli İbrahim. İnneke hamidun mecîd"
  },
  {
    title: "Rabbenâ âtina Duası",
    category: "DUA",
    content: "Rabbenâ âtina fid'dunyâ haseneten ve fil'âhirati haseneten ve kınâ azâbennâr."
  },
  {
    title: "Rabbenâğfirlî Duası",
    category: "DUA",
    content: "Rabbenâğfirlî ve li-vâlideyye ve lil-Mu'minine yevme yekûmu'l hisâb."
  },
  {
    title: "Kunut Duası - 1",
    category: "DUA",
    content: "Allâhumme innâ nesteînuke ve nestağfiruke ve nestehdik. Ve nu'minu bike ve netûbu ileyk. Ve netevekkelu aleyke ve nusni aleykel-hayra kullehu neşkuruke ve lâ nekfuruke ve nahleu ve netruku men yefcuruk"
  },
  {
    title: "Kunut Duası - 2",
    category: "DUA",
    content: "Allâhumme iyyâke na'budu ve leke nusalli ve nescudu ve ileyke nes'a ve nahfidu nercû rahmeteke ve nahşâ azâbeke inne azâbeke bilkuffâri mulhık"
  }
];
