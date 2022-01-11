-- create db sc_language_map
-- init tables
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(127) NOT NULL UNIQUE,
	"fullName" varchar(256),
	"pending" bool DEFAULT 'true',
	"clearance_level" int DEFAULT '0',
	"password" varchar(127),
	"email" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "languages" (
	"id" serial NOT NULL,
	"language" varchar(255),
	"glottocode" varchar(64),
	"global_speakers" int,
	"sc_speakers" int,
	"endonym" varchar(255) NOT NULL,
	"category_id" int NOT NULL,
	"description" varchar(2047),
	"status" varchar(127),
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sites" (
	"id" serial NOT NULL,
	"latitude" DECIMAL,
	"longitude" DECIMAL,
	"language_id" int,
	"site_name" varchar(255) NOT NULL,
	"region_id" int NOT NULL,
	"address" varchar(1023),
	CONSTRAINT "sites_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" varchar(255),
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "regions" (
	"id" serial NOT NULL,
	"name" varchar(127) NOT NULL,
	CONSTRAINT "regions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "examples" (
	"id" serial NOT NULL,
	"link_text" varchar(255),
	"hyperlink" varchar(255),
	"language_id" int NOT NULL,
	CONSTRAINT "examples_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

--Declare Foreign Keys
ALTER TABLE "languages" ADD CONSTRAINT "languages_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE;
ALTER TABLE "sites" ADD CONSTRAINT "sites_fk0" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE;
ALTER TABLE "sites" ADD CONSTRAINT "sites_fk1" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE;
ALTER TABLE "examples" ADD CONSTRAINT "examples_fk0" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE;

--Fill Categories Table
INSERT INTO categories ("name")
VALUES('Native American'),
('European'),
('Asian'),
('Middle East'),
('Latino'),
('Varieties of English'),
('Sign Language');

--Fill Regions Table
INSERT INTO regions ("name")
VALUES ('Lowcountry'),
('Midlands'),
('Pee Dee'),
('Upstate');

--Fill Language Table
INSERT INTO "languages" 
("language", endonym, global_speakers, sc_speakers, category_id, description, status, glottocode)
VALUES
('Cherokee','Cherokeee',2000,0,1,'Cherokee is an Iroquoian language, and the only Southern Iroquoian language spoken today. Linguists believe that the Cherokee people migrated to the southeast from the Great Lakes region about three thousand years ago, bringing with them their language.','Current', 'Cher1273'),
('Catawba','Catawba',0,0,1,'Catawba (/kəˈtɔːbə/) is one of two Eastern Siouan languages of the eastern US, which together with the Western Siouan languages formed the Siouan language family. The last native, fluent speaker of Catawba was Samuel Taylor Blue, who died in 1959.','Historic', 'NA'),
('Yuchi','Yuchi',1,0,1,'Yuchi is an agglutinative language, in which words are pieced together from pre-existing morphemes to make entirely new words.','Current','NA'),
('Yamasee','Yamasee',0,0,1,'The Yamasee Indians were a Muskogean tribe of Georgia and South Carolina, relatives of the Miccosukee tribe. Their language was closely related to Muskogean languages like Miccosukee and Apalachee, and may have been an Apalachee dialect. ... Most Yamasee descendants still live among the Seminole and Creek tribes today.','Historic','NA'),
('Algonquin','Algonquin',2500,0,1,'Algonquin is either a distinct Algonquian language closely related to the Ojibwe language or a particularly divergent Ojibwe dialect. It is spoken, alongside French and to some extent English, by the Algonquin First Nations of Quebec and Ontario.','0','NA'),
('Muskogeon','Muskogeon',333,333,1,'The Muskogean languages are a family of languages indigenous to the southeastern United States. Members of the family include Chickasaw, Choctaw, Alabama, Koasati, Apalachee, Hitchiti-Mikasuki, and Muskogee (Creek).','Historic','NA'),
('Ladino','Ladino',null,null,2,'Ladino language, also called Judeo-Spanish, Judesmo, or Sephardi, Romance language spoken by Sephardic Jews living mostly in Israel, the Balkans, North Africa, Greece, and Turkey. ... Ladino preserves many words and grammatical usages that have been lost in modern Spanish.','Historic','Ladi1251'),
('Spanish (Continental)','Espanol',333,333,2,'castellano is a Romance language of the Indo-European language family that evolved from colloquial spoken Latin in the Iberian Peninsula. Today, it is a global language with nearly 500 million native speakers, mainly in the Americas and Spain.','Current', 'Cast1244'),
('French (including Patois, Cajun)','Francaise',300000000,19110,2,'French is a Romance language (meaning that it is descended primarily from Vulgar Latin) that evolved out of the Gallo-Romance dialects spoken in northern France. The languages early forms "include Old" French "and" Middle French.','Historic', 'Stan1290'),
('German','Deutsch',130000000,15195,2,'German "language", German Deutsch, official "language of both" Germany "and" Austria and one of the official languages of Switzerland. German belongs to the West Germanic group of the Indo-European language family, along with English, Frisian, and Dutch ','Current','Stan1295'),
('Italian','Italiana',85000000,3091,2,'Italian language, Italian Italiano, Romance language spoken by some 66,000,000 persons, the vast majority of whom live in Italy (including Sicily and Sardinia). It is the official language of Italy, San Marino, and (together with Latin) Vatican City.','Current', 'Ital1282'),
('Greek','Greek',13000000,0,2,'Greek language, Indo-European language spoken primarily in Greece. It has a long and well-documented history—the longest of any Indo-European language—spanning 34 centuries. ... The pronunciation of Ancient Greek vowels is indicated by the transliteration used by the Romans.','Current','Mode1248'),
('Ukrainian','Ukrainian',35000000,333,2,'Ukrainian (native name: украї́нська мо́ва, romanized: ukrainska mova, IPA: [ʊkrɐˈjinʲsʲkɐ ˈmɔwɐ]), historically also called Ruthenian, is an East Slavic language of the Indo-European language family, and is one of the Slavic languages, which are part of a larger Balto-Slavic branch.','Current', 'Ukra1253'),
('Russian','Russian',155000000,1618,2,'The Russian language is the principal state and cultural language of Russia. Russian is the primary language of the majority of people in Russia. It is also used as a second language in other former republics of the Soviet Union. It belongs to the eastern branch of the Slavic family of languages.','Current','Russ1263'),
('“Chinese”','“Chinese” (actually many languages)',1300000000,5648,3,'The Chinese language is the worlds most widely spoken language. The Chinese language is fascinating and unique. Unlike most other languages, the Chinese language both has a written form and several spoken forms. The main spoken form, used officially in China, is called Mandarin.','Current', 'Mand1415'),
('Hmong','Hmong',2700000,3772,3,'Hmong is a tonal language, in a similar way to Chinese, Thai, Vietnamese and Laothian. There are eight tones (though some say there are seven). There is a high tone, low tone, and even a low falling tone.','Current','Firs1234'),
('Japanese','Japanese',120000000,2807,3,'Japanese is an agglutinative, mora-timed language with relatively simple phonotactics, a pure vowel system, phonemic vowel and consonant length, and a lexically significant pitch-accent.','Current','Nucl1643'),
('Korean','Korean',75000000,3924,3,'The Korean language is part of a northern Asian language known as Altaic, that includes Turkish, Mongolian and Japanese, suggesting early Northern migrations and trade. Korean was also heavily influenced by Chinese, but have adopted its own writing system in the 16th century.','Current','Kore1280'),
('Vietnamese','Vietnamese',70000000,333,3,'Vietnamese is a tonal language with a large number of vowels. There are no consonant clusters. The syllable structure is generally Consonant-Vowel-Consonant with no consonant clusters, there is a good deal of variation in the sound system across different dialects.','Current','Viet1252'),
('Tagalog','Tagalog',74000000,4496,3,'Tagalog is an Austronesian language spoken as a first language by the ethnic Tagalog people, who make up a quarter of the population of the Philippines, and as a second language by the majority.Its standardized form, officially named Filipino, is the national language of the Philippines, and is one of two official languages, alongside English.','Current','NA'),
('Gujarathi','Gujarathi',46000000,2101,3,'Gujarati is an Indo-Aryan language native to the Indian state of Gujarat and spoken predominantly by the Gujarati people. Gujarati is part of the greater Indo-European language family.','Current','Guaja1252'),
('Arabic','Arabic',466000000,2440,4,'Arabic language, Semitic language spoken in a large area including North Africa, most of the Arabian Peninsula, and other parts of the Middle East. ... Classical Arabic, in which most pre-modern literary works were composed, closely approaches that language.','Current','NA'),
('Hebrew','Hebrew',9000000,333,4,'Hebrew is the official language of the State of Israel. It is a Semitic language spoken by the Jewish people and one of the worlds oldest living languages. Originally the Hebrew language was not written with vowels to indicate how a word should be pronounced.','Liturgical','NA'),
('Spanish (Americas)','Espanol',333,110000,5,'','Current','Cast1244'),
('Spanglish','Spanglish',333,333,5,'Spanglish (a portmanteau of the words "Spanish" and "English") is any language variety (such as a contact dialect, hybrid language, pidgin, or creole language) that results from conversationally combining Spanish and English.','Current','NA'),
('AAVE','Black English',333,333,6,'AAVE is a dialect of English like any other, but suffers extreme stigma due to the history of race in America. It has a systematic, coherent, rule-bound grammar. It has some super cool grammatical features that allow it to communicate complex ideas in fewer words than other dialects of English.','Current','NA'),
('Appalachian','Appalachian',333,333,6,'','Current','NA'),
('Charleston Dialect','“Charlestonian”',333,333,6,'Gullah is a creole language spoken by the Gullah people (also called "Geechees" within the community), an African-American population living in coastal regions of South Carolina and Georgia as well as extreme northeastern Florida and the extreme southeast of North Carolina.','Current','NA'),
('Gullah','Gullah',5000,333,6,'Gullah is a creole language spoken by the Gullah people (also called "Geechees" within the community), an African-American population living in coastal regions of South Carolina and Georgia as well as extreme northeastern Florida and the extreme southeast of North Carolina.','Current','Gull1241'),
('ASL','American Sign Language',500000,333,7,'American Sign Language (ASL) is a visual language. With signing, the brain processes linguistic information through the eyes. The shape, placement, and movement of the hands, as well as facial expressions and body movements, all play important parts in conveying information.','Current','Amer1248'),
('BASL','Black Sign Language',333,333,7,'Black American Sign Language (BASL) or Black Sign Variation (BSV) is a dialect of American Sign Language (ASL) used most commonly by deaf Black Americans in the United States. The divergence from ASL was influenced largely by the segregation of schools in the South','Current','Amer1248');

--Fill Examples Table
INSERT INTO examples ("link_text", "hyperlink", "language_id")
VALUES ('Interview on the history of BASL', 'youtu.be/vkJpg4H5mXQ?t=385', 31),
('Interview on the Cheorkee language', 'https://www.youtube.com/watch?v=saSSlSQwlwg', 1),
('Examples of Hmong Languange', 'https://www.youtube.com/watch?v=_Odb1g4Nc1Q', 16),
('Listen to spanglish', 'https://www.youtube.com/watch?v=RVnJ4odvlHc', 25),
('Ukrainian example', 'https://www.youtube.com/watch?v=RVnJ4odvlHc', 13),
('The Japanese Language', 'https://www.youtube.com/watch?v=_Odb1g4Nc1Q', 17),
('Listen to Tagalog', 'https://www.youtube.com/watch?v=RVnJ4odvlHc', 20),
('Interview on the history of Arabic', 'youtu.be/vkJpg4H5mXQ?t=385', 22),
('Listen to Greek', 'https://www.youtube.com/watch?v=RVnJ4odvlHc', 12),
('10 Phrases in Mandarin Chinese', 'https://www.youtube.com/watch?v=S0ssoXyQ7Ek&ab_channel=edX', 15),
('Interview on ASL', 'https://www.youtube.com/watch?v=saSSlSQwlwg', 30),
('Examples of AAVE', 'https://www.youtube.com/watch?v=_Odb1g4Nc1Q', 26),
('Listen to Algonquin', 'https://www.youtube.com/watch?v=RVnJ4odvlHc', 5);





INSERT INTO sites (address, region_id, site_name, language_id, longitude, latitude)
VALUES('3688 Warrior Creek Church Road,Gray Court, SC 29645',4,'Warrior Creek Tribal Grounds',1,-82.031686,34.580612),
('996 Avenue of Nations',4,'Catawba Nation Cultural Center',2,-80.883596,34.904709),
('4542 Silver Bluff Rd, Jackson, SC 29831',2,'Audubon’s Silver Bluff Center and Sanctuary',3,-81.846087,33.324609),
('20 Bridge Street, P.O. Box 386, Bluffton, SC 29910',1,'Bluffton Visitor’s Center',4,-80.858886,32.232333),
('200 Knights Hill Road Camden, SC 29020',2,'Camden (horse) Race Track (near former Cofitachequi)',6,-80.624509,34.27561),
('90 Hasell St. Charleston, SC 29401',1,'Kahal Kadosh Beth Elohim Synagogue',7,-79.932725,32.782257),
('Parris Island, Beaufort, SC 29902',1,'Fort Santa Elena (At Parris Island)',8,-80.725429,32.380694),
('136 Church Street Charleston, SC 29401',1,'French Huguenot Church',9,-79.929152,32.77821),
('1130 Saint Peter''s Rd., Lexington, SC 29072',2,'Saint Peter’s Lutheran Church',10,-81.303104,34.005342),
('182 Rainbow Lake Rd, Boiling Springs, SC 29316',4,'Boiling Springs Community Park',13,-81.982045,35.053724),
('697 Asheville Highway, Spartanburg, SC 29303',4,'St. Nicholas Greek Orthodox Church',12,-81.944875,34.96415),
('8014 N Kings Hwy B, Myrtle Beach, SC 29572',3,'Restaurant',15,-78.8146,33.74962),
('209-201 Boundary Dr, Spartanburg, SC 29303',4,'Calvary Hmong Alliance Church',16,-81.9263,34.97142),
('1540D Wade Hampton Blvd, Greenville, SC 29609',4,'Restaurant',19,-82.368367,34.873192),
('225 S Pleasantburg Dr, Greenville, SC 29607',4,'Hispanic Alliance',24,-82.362515,34.838207),
('601 New St, Beaufort, SC 29902',1,'First African Baptist Church',26,-80.66868,32.434582),
('138 Hagood Mill Rd. Pickens, SC 29671',4,'Hagood Mill',27,-82.722829,34.924995),
('51 Meeting St, Charleston, SC 29401',1,'Nathaniel Russell House',28,-79.931051,32.773964),
('355 Cedar Springs Road, Spartanburg, SC 29302',4,'South Carolina School for the Deaf and Blind',30,-81.881309,34.910471),
('355 Cedar Springs Road, Spartanburg, SC 29302',4,'South Carolina School for the Deaf and Blind',31,-81.880309,34.910471);