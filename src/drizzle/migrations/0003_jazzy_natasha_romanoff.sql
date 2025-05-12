CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(60) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"removed_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
