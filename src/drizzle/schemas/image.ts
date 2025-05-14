import { pgTable, serial, varchar, timestamp, doublePrecision } from "drizzle-orm/pg-core";

export const image = pgTable("image", {
  id: serial("id").primaryKey(),        // Primary key
  sensor: varchar("sensor", { length: 100 }).notNull(), // Sensor name
  dataCaptura: timestamp("dataCaptura", {withTimezone:true}).notNull(), // Capture date
  resolucao: varchar("resolucao", { length: 20 }), // Resolution
  latitude: doublePrecision("latitude"), // Latitude
  longitude: doublePrecision("longitude"), // Longitude
  urlImage: varchar("urlImage", { length: 500 }).notNull() // Image URL
})