export type BotConstants = {
	// RegExp
	allowRegExp: RegExp;
	cslRegExp: RegExp;
	destroyRegExp: RegExp;
	disallowRegExp: RegExp;
	getRegExp: RegExp;
	platformRegExp: RegExp;
	psRegExp: RegExp;
	scrubRegExp: RegExp;
	xbRegExp: RegExp;

	// embed color
	embedColor: string;

	// spacer
	spacer: string;

	// channel names
	channelNames: Array<string>;
};

// tslint:disable-next-line:variable-name
const Constants: BotConstants = <any> {};

// RegExp
Constants.allowRegExp = new RegExp('\.allow\\s|\.a\\s', 'i');
Constants.cslRegExp = new RegExp('[^\,\\s][^\,]*[^\,\\s]*', 'ig');
Constants.destroyRegExp = new RegExp('\.dr\\s', 'i');
Constants.disallowRegExp = new RegExp('\.disallow\\s|\.d\\s', 'i');
Constants.getRegExp = new RegExp('\.gr\\s', 'i');
Constants.platformRegExp = new RegExp('(\\bpc\\b)|(\\bpsn\\b)|(\\bps\\b)|(\\bxbl\\b)|(\\bxbox\\b)', 'i');
Constants.psRegExp = new RegExp('([A-Za-z0-9\-\_]{3,16})', 'i');
Constants.scrubRegExp = new RegExp('(?:-s)', 'ig');
Constants.xbRegExp = new RegExp('(?:.me set xbl|.me set xbox)\\s([A-Za-z0-9\-\_\\s]{1,15})', 'i');

// embed color
Constants.embedColor = '0xff8c00';

// spacer
Constants.spacer = '<:spacer:309335739882274827>';

// channel names
Constants.channelNames = [
	'Adonna',
	'Agah',
	'Agema',
	'Ahamkara',
	'Aiat',
	'Aksis',
	'Aksor',
	'AlakHul',
	'Alzok',
	'Amytis',
	'Andal',
	'Aral',
	'Arath',
	'ArchonSlayer',
	'Atheon',
	'Aurash',
	'Auryx',
	'Azzir',
	'Bamberga',
	'Baxx',
	'Bekhterev',
	'Beltrik',
	'Bracus',
	'Bracuses',
	'Brask',
	'Brevin',
	'Bryl',
	'Caedometric',
	'Carybdis',
	'Cayde',
	'Chioma',
	'Chiomas',
	'Citan',
	'Colovance',
	'Crota',
	'Cryptarch',
	'Crytparch',
	'Dakaua',
	'Darkblade',
	'Deathsinger',
	'Dictata',
	'Draksis',
	'Dredgen',
	'Drevis',
	'Droysen',
	'DuaneMcniadh',
	'Efrideet',
	'Eliksni',
	'Eriana',
	'Everis',
	'Exo',
	'Feizel',
	'Felwinter',
	'Fenchurch',
	'Finnala',
	'Gensym',
	'Gheleon',
	'Gilmanovich',
	'Gjallarhorn',
	'GodWave',
	'Golgoroth',
	'Gornuk',
	'Gravekeeper',
	'Grayor',
	'Gulrot',
	'Halak',
	'Hassa',
	'Hawkmoon',
	'Hezen',
	'Hideo',
	'Hildean',
	'Hildian',
	'Hildians',
	'Hohmann',
	'Holborn',
	'Holliday',
	'HopeEater',
	'Hygiea',
	'Ikora',
	'Illyn',
	'Irxis',
	'Ivonovich',
	'Jagi',
	'Jalaal',
	'Jaren',
	'Jolder',
	'Jolyon',
	'Jovians',
	'Kabr',
	'Kagoor',
	'Kaharn',
	'Kaliks',
	'Keksis',
	'Kells',
	'Kellship',
	'Khvostov',
	'Korus',
	'Kovik',
	'Kraghoor',
	'Kranox',
	'Kressler',
	'Krughor',
	'Lakpha',
	'Lanshu',
	'Levante',
	'Lissyl',
	'Lokaar',
	'Loken',
	'Lomar',
	'Lonwabo',
	'Malahayati',
	'Malok',
	'Malphur',
	'Maraid',
	'Mecher',
	'Mengoor',
	'Micha',
	'Mihaylova',
	'Minotaurs',
	'Modris',
	'Mormu',
	'Nanotech',
	'Nascia',
	'Nicha',
	'Ning',
	'Nolg',
	'Novarro',
	'Omnigul',
	'Oort',
	'Orbiks',
	'Oryx',
	'Pahanin',
	'Palamon',
	'PallasBane',
	'Parixas',
	'Paskin',
	'Peekis',
	'Phogoth',
	'Pinar',
	'Pirsis',
	'Praedyth',
	'Praxic',
	'Psion',
	'Qiao',
	'Qodron',
	'Queenbreakers',
	'Qugu',
	'Quria',
	'Racin',
	'Radegast',
	'Rafriit',
	'Rahool',
	'Redjack',
	'Reefborn',
	'Rezyl',
	'Rience',
	'Riksis',
	'Roni',
	'SABER',
	'Sardok',
	'Sardon',
	'Sathona',
	'Saviks',
	'Sayeth',
	'Sedia',
	'Segoth',
	'Sekrion',
	'Sepiks',
	'Shaxx',
	'Shirazi',
	'Shuro',
	'Shvubi',
	'Silimar',
	'Simiks',
	'Skolas',
	'Skoriks',
	'Skorri',
	'Skriviks',
	'Skyburners',
	'Solkis',
	'Starcutters',
	'Sundaresh',
	'Suros',
	'Swiftling',
	'Sylok',
	'Taeko',
	'Taishibethi',
	'Taniks',
	'Taox',
	'Tarlowe',
	'Teben',
	'Techeun',
	'Techeuns',
	'Telthor',
	'Tescan',
	'Thalnok',
	'Theosyion',
	'Thuria',
	'Tinette',
	'Tover',
	'Trenn',
	'Tubach',
	'Tuyet',
	'Uldren',
	'Urrox',
	'Urzok',
	'Uzoma',
	'Valus',
	'Variks',
	'Vekis',
	'Veliniks',
	'Velor',
	'Venj',
	'Vestan',
	'Vestian',
	'Virixas',
	'Vorlog',
	'Vosik',
	'Warmind',
	'Warminds',
	'Warpriest',
	'Warsat',
	'Weksis',
	'Wintership',
	'WorldRender',
	'Wormfood',
	'Xivu',
	'Xol',
	'Xyor',
	'Yavek',
	'Zarin',
	'Zhalo',
	'Zire',
	'Zydron',
	'Zyre',
	'Zyrok'
];

export default Constants;
