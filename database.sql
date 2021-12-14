-- create db sc_language_map
-- init tables
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" serial NOT NULL,
	"fullName" varchar(256),
	"pending" bool DEFAULT 'false',
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
('Sign Lanugage');

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
('BASL','Black Sign Language',333,333,7,'','Current','Amer1248');