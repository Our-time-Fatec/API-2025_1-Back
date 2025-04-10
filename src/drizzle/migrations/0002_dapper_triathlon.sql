CREATE TABLE "stac_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_id" text NOT NULL,
	"collection" text NOT NULL,
	"datetime" timestamp NOT NULL,
	"bbox" jsonb NOT NULL,
	"geometry" jsonb NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
