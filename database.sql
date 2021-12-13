CREATE TABLE "public.user" (
	"id" serial NOT NULL,
	"username" serial(48) NOT NULL,
	"fullName" varchar(256),
	"pending" bool DEFAULT 'false',
	"clearance_level" int DEFAULT '0',
	"password" varchar(127),
	"email" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.languages" (
	"id" serial NOT NULL,
	"language" varchar(255),
	"glottocode" varchar(64),
	"global_speakers" int NOT NULL,
	"sc_speakers" int NOT NULL,
	"endonym" varchar(255) NOT NULL,
	"category_id" int NOT NULL,
	"description" varchar(2047),
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.sites" (
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

CREATE TABLE "public.categories" (
	"id" serial NOT NULL,
	"name" varchar(255),
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.regions" (
	"id" serial NOT NULL,
	"name" varchar(127) NOT NULL,
	CONSTRAINT "regions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.examples" (
	"id" serial NOT NULL,
	"link_text" varchar(255) NOT NULL,
	"hyperlink" serial(255) NOT NULL,
	"language_id" int NOT NULL,
	CONSTRAINT "examples_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "languages" ADD CONSTRAINT "languages_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE;

ALTER TABLE "sites" ADD CONSTRAINT "sites_fk0" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE;
ALTER TABLE "sites" ADD CONSTRAINT "sites_fk1" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE;

ALTER TABLE "examples" ADD CONSTRAINT "examples_fk0" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE;