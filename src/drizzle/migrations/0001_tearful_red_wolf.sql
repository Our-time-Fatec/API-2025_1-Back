CREATE TABLE "image" (
	"id" serial PRIMARY KEY NOT NULL,
	"sensor" varchar(100) NOT NULL,
	"dataCaptura" timestamp with time zone NOT NULL,
	"resolucao" varchar(20),
	"latitude" double precision,
	"longitude" double precision,
	"urlImage" varchar(500) NOT NULL
);
