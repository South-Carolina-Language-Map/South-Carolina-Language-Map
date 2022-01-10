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
	"link_text" varchar(255) NOT NULL,
	"hyperlink" varchar(255) NOT NULL,
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
INSERT INTO languages (language, endonym, global_speakers, sc_speakers, category_id, description, status, glottocode)
VALUES('Cherokee','Cherokeee',2000,0,1,'','Current', 'Cher1273'),
('Catawba','Catawba',0,0,1,'','Historic', 'NA'),
('Yuchi','Yuchi',1,0,1,'','Current','NA'),
('Yamasee','Yamasee',0,0,1,'','Historic','NA'),
('Algonquin','Algonquin',2500,0,1,'','0','NA'),
('Muskogeon','Muskogeon',333,333,1,'','Historic','NA'),
('Ladino','Ladino',null,null,2,'','Historic','Ladi1251'),
('Spanish (Continental)','Espanol',333,333,2,'','Current', 'Cast1244'),
('French (including Patois, Cajun)','Francaise',300000000,19110,2,'','Historic', 'Stan1290'),
('German','Deutsch',130000000,15195,2,'','Current','Stan1295'),
('Italian','Italiana',85000000,3091,2,'','Current', 'Ital1282'),
('Greek','Greek',13000000,0,2,'','Current','Mode1248'),
('Ukrainian','Ukrainian',35000000,333,2,'','Current', 'Ukra1253'),
('Russian','Russian',155000000,1618,2,'','Current','Russ1263'),
('“Chinese”','“Chinese” (actually many languages)',1300000000,5648,3,'','Current', 'Mand1415'),
('Hmong','Hmong',2700000,3772,3,'','Current','Firs1234'),
('Japanese','Japanese',120000000,2807,3,'','Current','Nucl1643'),
('Korean','Korean',75000000,3924,3,'','Current','Kore1280'),
('Vietnamese','Vietnamese',70000000,333,3,'','Current','Viet1252'),
('Tagalog','Tagalog',74000000,4496,3,'','Current','NA'),
('Gujarathi','Gujarathi',46000000,2101,3,'','Current','Guaja1252'),
('Arabic','Arabic',466000000,2440,4,'','Current','NA'),
('Hebrew','Hebrew',9000000,333,4,'','Liturgical','NA'),
('Spanish (Americas)','Espanol',333,110000,5,'','Current','Cast1244'),
('Spanglish','Spanglish',333,333,5,'','Current','NA'),
('AAVE','Black English',333,333,6,'','Current','NA'),
('Appalachian','Appalachian',333,333,6,'','Current','NA'),
('Charleston Dialect','“Charlestonian”',333,333,6,'','Current','NA'),
('Gullah','Gullah',5000,333,6,'','Current','Gull1241'),
('ASL','American Sign Language',500000,333,7,'','Current','Amer1248'),
('BASL','Black American Sign Language',200000,40000,7,'Black American Sign Language (BASL) or Black Sign Variation (BSV) is a dialect of American Sign Language (ASL) used most commonly by deaf African Americans in the United States. The divergence from ASL was influenced largely by the segregation of schools in the American South. Like other schools at the time, schools for the deaf were segregated based upon race, creating two language communities among deaf signers: white deaf signers at white schools and black deaf signers at black schools. Today, BASL is still used by signers in the South despite public schools having been legally desegregated since 1954. [Wikipedia]','Current','Amer1248');

--Fill Examples Table
INSERT INTO examples ("link_text", "hyperlink", "language_id")
VALUES ('Interview on the history of BASL', 'youtu.be/vkJpg4H5mXQ?t=385', 31);

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
('355 Cedar Springs Road, Spartanburg, SC 29302',4,'South Carolina School for the Deaf and Blind',31,-81.881309,34.910471);