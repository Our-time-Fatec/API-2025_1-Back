import { pgTable, text, timestamp, uuid, jsonb} from "drizzle-orm/pg-core";

export const stacImages = pgTable("stac_images", {
    id: uuid("id").defaultRandom().primaryKey(),
    itemId: text("item_id").notNull(),
    collection: text("collection").notNull(),
    datetime: timestamp("datetime").notNull(),
    bbox: jsonb("bbox").notNull(),
    geometry: jsonb("geometry").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    localPath: text("local_path"),
});