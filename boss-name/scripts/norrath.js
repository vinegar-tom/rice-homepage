const norrathObj = {
  "origin": ["#[#bossPronouns#]encounter#"],
  "encounter": ["#bossName# #drawVerb# #bossTheir# #bossWeapon#."],

  "bossPronouns": [
    "[bossThey:they][bossThem:them][bossTheir:their][bossTheirs:theirs][bossChild:kin]",
    "[bossThey:he][bossThem:him][bossTheir:his][bossTheirs:his][bossChild:son]",
    "[bossThey:she][bossThem:her][bossTheir:her][bossTheirs:hers][bossChild:daughter]"
  ],

  "bossName": [
    "#name# the #adjTwice.capitalizeAll#",
    "#adjTwice.capitalizeAll# #name#",
    "#name# the #nameAdj.capitalize#",
    "#nameAdj.capitalize# #name#",
    "#name#, #adjTwice.capitalizeAll#,",
    "#name#",
    "#name# #name#",
    "#name#, #bossChild# of #name#,"
  ],

  "name": [
    "#firstSyl##lastSyl#",
    "#firstSyl##midSyl##lastSyl#"
  ],

  "firstSyl": [
    "Ma","Ja","Ko","Di","Tro","Ab","Cre","Leth","Bri","Thro","Thruin","Or","Ga","Gri","Nen","Kin","Xo","Xor","En","Fe",
    "Har","Ju","Psy","Qi","Sau","Vi","Fro"
  ],
  "midSyl": [
    "sy","re","rag","gol","to","za","ra","d","t","l","el","'"
  ],
  "lastSyl": [
    "ek","rok","st","las","t","d","bor","mar","th","loth","rek","len","zl","ron","son","li","do"
  ],

  "nameAdj": [
    "wise","red","distant","strong","shimmering","tall","short","fat","malevolent","unsightly","flat","forged","black",
    "mystic","marked","marred","weak","wretched","chained","yellow","azure","white","winged","grieved","shadowed",
    "brutish","lost","wealthy","fierce","false","true","rich","reeking","holy","ordained","evil","spectral","swift",
    "special","lost","lofty","feathered","fruity","rough","scheming","free","enslaved","creeping","wheezing","wondrous",
    "wicked","shy","dry","joyful"
  ],
  "twice": [
    "twice","half","most","not"
  ],
  "adjTwice": ["#twice#-#nameAdj#"],


  "bossWeapon": [
    "#weaponQual# #weaponBase# of #weaponEnchAfter#",
    "#weaponBase# of #weaponEnchAfter#",
    "#weaponEnchBefore# #weaponBase#",
    "#weaponQual#, #weaponEnchBefore# #weaponBase#",
    "#weaponQual# #weaponBase#"
  ],

  "weaponBase": [
    "club","dagger","mace","spear","morningstar","sickle","staff","sword","battleaxe","falchion","flail","glaive",
    "greatsword","halberd","hatchet","lance","warhammer","longsword","maul","pick","scimitar","scythe","shortsword",
    "trident","whip","crossbow","longbow","javelin","sling","darts","dirk","scepter"
  ],

  "weaponEnchAfter": [
    "flames","fire","ice","freezing","jolts","lightning","shock","poison","poison cloud","disease","light","darkness"
  ],
  "weaponEnchBefore": [
    "glowing","shimmering","flaming","icy","poisonous","diseased"
  ],
  "weaponQual": [
    "indestructible","brittle","oiled","shiny","rusty","worn","ancient","notched","trusty"
  ],

  "drawVerb": [
    "draws","brandishes","fumbles with","flourishes","wields","raises","equips","produces","unsheathes"
  ]
}

let norrathGrammar = tracery.createGrammar(norrathObj);
norrathGrammar.addModifiers(baseEngModifiers);

const main = document.querySelector('main');
const bossPara = document.querySelector('.boss');
const button = document.querySelector('button');

function newBoss() {
  let boss = norrathGrammar.flatten('#origin#');
  bossPara.textContent = boss;
}

newBoss();
button.addEventListener('click', newBoss);
