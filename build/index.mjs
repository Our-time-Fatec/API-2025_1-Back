var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import { fastify } from "fastify";

// src/settings/env.ts
import { z } from "zod";
var envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  WEB_URL: z.string().url(),
  IA_URL: z.string().url(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
  CLOUD_FRONT_CDN: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  DEBUG_LEVEL: z.coerce.boolean().optional().default(false)
});
var env = envSchema.parse(process.env);

// src/config/base-config.ts
var portSettings = {
  PORT: env.PORT,
  BASE_URL: `http://localhost:${env.PORT}`,
  WEB_URL: env.WEB_URL
};
var version = "0.0.1";

// src/config/plugins.ts
import { fastifyCors } from "@fastify/cors";
import multipart from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";

// src/themes/style.ts
var style = `
@media (prefers-color-scheme: dark) {
  /* primary colors */

  .swagger-ui .topbar .download-url-wrapper .select-label select {
    border: 2px solid var(--swagger-color);
  }

  .swagger-ui .info .title small.version-stamp {
    background-color: var(--swagger-color);
  }

  .swagger-ui .info a {
    color: var(--link-color);
  }

  .swagger-ui .response-control-media-type--accept-controller select {
    border-color: var(--accept-header-color);
  }

  .swagger-ui .response-control-media-type__accept-message {
    color: var(--accept-header-color);
  }

  .swagger-ui .btn.authorize {
    color: var(--post-method-color);
  }

  .swagger-ui .btn.authorize {
    border-color: var(--post-method-color);
  }

  .swagger-ui .btn.authorize svg {
    fill: var(--post-method-color);
  }

  /* methods colors */
  /* http post */

  .swagger-ui .opblock.opblock-post .opblock-summary-method {
    background: var(--post-method-color);
  }

  .swagger-ui .opblock.opblock-post .opblock-summary {
    border-color: var(--post-method-color);
  }

  .swagger-ui .opblock.opblock-post {
    background: var(--post-method-background-color);
    border-color: var(--post-method-color);
  }

  .swagger-ui
    .opblock.opblock-post
    .tab-header
    .tab-item.active
    h4
    span::after {
    background: var(--post-method-color);
  }

  /* http get */

  .swagger-ui .opblock.opblock-get .opblock-summary-method {
    background: var(--get-method-color);
  }

  .swagger-ui .opblock.opblock-get .opblock-summary {
    border-color: var(--get-method-color);
  }

  .swagger-ui .opblock.opblock-get {
    background: var(--get-method-background-color);
    border-color: var(--get-method-color);
  }

  .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span::after {
    background: var(--get-method-color);
  }

  /* http head */

  .swagger-ui .opblock.opblock-head .opblock-summary-method {
    background: var(--head-method-color);
  }

  .swagger-ui .opblock.opblock-head .opblock-summary {
    border-color: var(--head-method-color);
  }

  .swagger-ui .opblock.opblock-head {
    background: var(--head-method-background-color);
    border-color: var(--head-method-color);
  }

  .swagger-ui
    .opblock.opblock-head
    .tab-header
    .tab-item.active
    h4
    span::after {
    background: var(--head-method-color);
  }

  /* http put */

  .swagger-ui .opblock.opblock-put .opblock-summary-method {
    background: var(--put-method-color);
  }

  .swagger-ui .opblock.opblock-put .opblock-summary {
    border-color: var(--put-method-color);
  }

  .swagger-ui .opblock.opblock-put {
    background: var(--put-method-background-color);
    border-color: var(--put-method-color);
  }

  .swagger-ui .opblock.opblock-put .tab-header .tab-item.active h4 span::after {
    background: var(--put-method-color);
  }

  /* http delete */

  .swagger-ui .opblock.opblock-delete .opblock-summary-method {
    background: var(--delete-method-color);
  }

  .swagger-ui .opblock.opblock-delete .opblock-summary {
    border-color: var(--delete-method-color);
  }

  .swagger-ui .opblock.opblock-delete {
    background: var(--delete-method-background-color);
    border-color: var(--delete-method-color);
  }

  .swagger-ui
    .opblock.opblock-delete
    .tab-header
    .tab-item.active
    h4
    span::after {
    background: var(--delete-method-color);
  }

  /* http options */

  .swagger-ui .opblock.opblock-options .opblock-summary-method {
    background: var(--options-method-color);
  }

  .swagger-ui .opblock.opblock-options .opblock-summary {
    border-color: var(--options-method-color);
  }

  .swagger-ui .opblock.opblock-options {
    background: var(--options-method-background-color);
    border-color: var(--options-method-color);
  }

  .swagger-ui
    .opblock.opblock-options
    .tab-header
    .tab-item.active
    h4
    span::after {
    background: var(--options-method-color);
  }

  /* http patch */

  .swagger-ui .opblock.opblock-patch .opblock-summary-method {
    background: var(--patch-method-color);
  }

  .swagger-ui .opblock.opblock-patchs .opblock-summary {
    border-color: var(--patch-method-color);
  }

  .swagger-ui .opblock.opblock-patch {
    background: var(--patch-method-background-color);
    border-color: var(--patch-method-color);
  }

  .swagger-ui
    .opblock.opblock-patch
    .tab-header
    .tab-item.active
    h4
    span::after {
    background: var(--patch-method-color);
  }

  /* blocks */
  body {
    background-color: var(--all-bg-color);
    color: white;
  }

  .swagger-ui .topbar {
    background-color: var(--header-bg-color);
  }

  .swagger-ui .scheme-container {
    background: var(--secondary-bg-color);
  }

  .swagger-ui section.models .model-container {
    background: var(--secondary-bg-color);
    border-radius: var(--innner-block-border-radius);
  }

  .swagger-ui select {
    background: var(--selecter-bg-color);
    border-radius: var(--block-border-radius);
    color: var(--primary-text-color);
  }

  .swagger-ui section.models {
    border: 1px solid var(--block-border-color);
    background-color: var(--block-bg-color);
  }

  .swagger-ui .opblock .opblock-section-header {
    background: var(--secondary-bg-color);
  }

  .swagger-ui .body-param__example {
    background-color: var(--block-bg-color) !important;
    border-radius: var(--block-border-radius) !important;
  }

  .swagger-ui .example {
    background-color: var(--block-bg-color) !important;
    border-radius: var(--block-border-radius) !important;
  }

  .swagger-ui .copy-to-clipboard {
    background: rgba(255, 255, 255, var(--icons-opacity));
    border-radius: var(--block-border-radius);
  }

  .swagger-ui .opblock .opblock-summary-method {
    border-radius: var(--innner-block-border-radius);
  }

  .swagger-ui input[type="email"],
  .swagger-ui input[type="file"],
  .swagger-ui input[type="password"],
  .swagger-ui input[type="search"],
  .swagger-ui input[type="text"],
  .swagger-ui textarea {
    background: var(--secondary-bg-color);
    border: 1px solid var(--block-border-color);
    border-radius: var(--block-border-radius);
    color: var(--primary-text-color);
    outline: none;
  }

  .swagger-ui .dialog-ux .modal-ux-header {
    border-bottom: 1px solid var(--block-border-color);
  }

  .swagger-ui .btn {
    border: 2px solid var(--block-border-color);
    border-radius: var(--block-border-radius);
    color: var(--primary-text-color);
  }

  .swagger-ui .dialog-ux .modal-ux {
    background: var(--block-bg-color);
    border: 1px solid var(--block-border-color);
    border-radius: var(--block-border-radius);
  }

  .swagger-ui .auth-btn-wrapper {
    justify-content: left;
  }

  .swagger-ui .opblock-tag {
    border-bottom: 1px solid var(--block-border-color);
  }

  .swagger-ui section.models.is-open h4 {
    border-bottom: 1px solid var(--block-border-color);
  }

  .swagger-ui .opblock {
    border-radius: var(--block-border-radius);
  }

  .swagger-ui section.models {
    border-radius: var(--block-border-radius);
  }

  /* button white outline fix */

  .swagger-ui .model-box-control:focus,
  .swagger-ui .models-control:focus,
  .swagger-ui .opblock-summary-control:focus {
    outline: none;
  }

  /* icons */

  .swagger-ui .model-toggle::after {
    opacity: var(--icons-opacity);
    filter: var(--black-icons-filter);
  }

  .swagger-ui svg:not(:root) {
    fill: var(--primary-icon-color);
  }

  .swagger-ui .opblock-summary-control svg:not(:root) {
    opacity: var(--secondary-icon-opacity);
  }

  /* text */

  .swagger-ui {
    color: var(--primary-text-color);
  }

  .swagger-ui .info .title {
    color: var(--primary-text-color);
  }

  .swagger-ui a.nostyle {
    color: var(--primary-text-color);
  }

  .swagger-ui .model-title {
    color: var(--primary-text-color);
  }

  .swagger-ui .models-control {
    color: var(--primary-text-color);
  }

  .swagger-ui .dialog-ux .modal-ux-header h3 {
    color: var(--primary-text-color);
  }

  .swagger-ui .dialog-ux .modal-ux-content h4 {
    color: var(--primary-text-color);
  }

  .swagger-ui .dialog-ux .modal-ux-content p {
    color: var(--secondary-text-color);
  }

  .swagger-ui label {
    color: var(--primary-text-color);
  }

  .swagger-ui .opblock .opblock-section-header h4 {
    color: var(--primary-text-color);
  }

  .swagger-ui .tab li button.tablinks {
    color: var(--primary-text-color);
  }

  .swagger-ui .opblock-description-wrapper p,
  .swagger-ui .opblock-external-docs-wrapper p,
  .swagger-ui .opblock-title_normal p {
    color: var(--primary-text-color);
  }

  .swagger-ui table thead tr td,
  .swagger-ui table thead tr th {
    border-bottom: 1px solid var(--block-border-color);
    color: var(--primary-text-color);
  }

  .swagger-ui .response-col_status {
    color: var(--primary-text-color);
  }

  .swagger-ui .response-col_links {
    color: var(--secondary-text-color);
  }

  .swagger-ui .parameter__name {
    color: var(--primary-text-color);
  }

  .swagger-ui .parameter__type {
    color: var(--secondary-text-color);
  }

  .swagger-ui .prop-format {
    color: var(--secondary-text-color);
  }

  .swagger-ui .opblock-tag {
    color: var(--primary-text-color);
  }

  .swagger-ui .opblock .opblock-summary-operation-id,
  .swagger-ui .opblock .opblock-summary-path,
  .swagger-ui .opblock .opblock-summary-path__deprecated {
    color: var(--primary-text-color);
  }

  .swagger-ui .opblock .opblock-summary-description {
    color: var(--secondary-text-color);
  }

  .swagger-ui .info li,
  .swagger-ui .info p,
  .swagger-ui .info table {
    color: var(--secondary-text-color);
  }

  .swagger-ui .model {
    color: var(--secondary-text-color);
  }
}

:root {
  /* primary colors */
  --swagger-color: #86ff54;
  --link-color: #86e1f4;
  --accept-header-color: #34a05e;

  /* methods colors */
  --post-method-color: #5bdc3e;
  --post-method-background-color: rgba(0, 0, 0, 0);
  --get-method-color: #51e3cb;
  --get-method-background-color: rgba(0, 0, 0, 0);
  --head-method-color: #f87fbd;
  --head-method-background-color: rgba(0, 0, 0, 0);
  --put-method-color: #e0a44e;
  --put-method-background-color: rgba(0, 0, 0, 0);
  --delete-method-color: #9680ff;
  --delete-method-background-color: rgba(0, 0, 0, 0);
  --options-method-color: rgb(64, 145, 225);
  --options-method-background-color: rgba(0, 0, 0, 0);
  --patch-method-color: rgb(229, 178, 38);
  --patch-method-background-color: rgba(0, 0, 0, 0);

  /* background */
  --all-bg-color: #282a36;
  --secondary-bg-color: #282a35;
  --header-bg-color: #3a3d4c;
  --block-bg-color: #414450;
  --selecter-bg-color: #3a3d4c;

  /* text */
  --primary-text-color: rgba(255, 255, 255, 1);
  --secondary-text-color: rgba(193, 192, 192, 1);

  /* border */
  --block-border-color: rgba(255, 255, 255, 0.08);
  --block-border-radius: 12px;
  --innner-block-border-radius: 8px;

  /* icons */
  --primary-icon-color: #ffffff;
  --icons-opacity: 0;
  --secondary-icon-opacity: 0.6;
  --black-icons-filter: invert(1);
}

`;

// src/config/logs.ts
import pc from "picocolors";
async function logs(app2) {
  let startTime;
  app2.addHook("onRequest", (request, reply, done2) => {
    startTime = Date.now();
    done2();
  });
  app2.addHook("onResponse", (request, reply, done2) => {
    const responseTime = Date.now() - startTime;
    const statusCode = reply.statusCode;
    let statusColor = pc.green;
    switch (true) {
      case (statusCode >= 300 /* MULTIPLE_CHOICES */ && statusCode < 400 /* BAD_REQUEST */):
        statusColor = pc.yellow;
        break;
      case statusCode >= 400 /* BAD_REQUEST */:
        statusColor = pc.red;
        break;
    }
    if (!request.url.includes("/docs") && !request.url.includes("/favicon.ico")) {
      console.info(
        pc.yellow("Response: ") + statusColor(
          `${request.method} ${request.url} - ${statusCode} - ${responseTime}ms`
        )
      );
    }
    done2();
  });
}

// src/config/plugins.ts
function registerPlugins(app2) {
  app2.register(fastifyCors, {
    origin: [portSettings.BASE_URL, portSettings.WEB_URL]
  });
  app2.register(multipart);
  app2.register(fastifySwagger, {
    openapi: {
      info: {
        title: "ProcessBurn API",
        version
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [{ bearerAuth: [] }]
    },
    transform: jsonSchemaTransform
  });
  app2.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    theme: {
      css: [{ filename: "theme.css", content: style }]
    }
  });
  logs(app2);
  app2.setSerializerCompiler(serializerCompiler);
  app2.setValidatorCompiler(validatorCompiler);
}

// src/controllers/AuthController.ts
import jwt from "jsonwebtoken";
var AuthController = class {
  JWT_EXPIRES_IN = 24 * 60 * 60;
  REFRESH_EXPIRES_IN = 30 * 24 * 60 * 60;
  JWT_SECRET = env.JWT_SECRET;
  REFRESH_SECRET = env.JWT_REFRESH_SECRET;
  verifyToken(token) {
    return jwt.verify(token, this.JWT_SECRET);
  }
  verifyRefreshToken(token) {
    return jwt.verify(token, this.REFRESH_SECRET);
  }
  generateToken(id, email) {
    return jwt.sign({ id, email }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN
    });
  }
  generateRefreshToken(id, email) {
    return jwt.sign({ id, email }, this.REFRESH_SECRET, {
      expiresIn: this.REFRESH_EXPIRES_IN
    });
  }
};

// src/middleware/authMiddleware.ts
var authMiddleware = async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ message: "Token n\xE3o fornecido" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return reply.status(401).send({ message: "Token mal formatado" });
  }
  try {
    const authInstance = new AuthController();
    const decoded = authInstance.verifyToken(token);
    if (request.method === "GET") {
      request.query = {
        ...typeof request.query === "object" ? request.query : {},
        id: decoded.id,
        token
      };
    } else {
      request.body = {
        ...typeof request.body === "object" ? request.body : {},
        id: decoded.id,
        token
      };
    }
  } catch (err) {
    return reply.status(403).send({ message: "Token inv\xE1lido ou expirado" });
  }
};

// src/utils/registerPrefix.ts
var registerPrefix = (routes8, prefix) => {
  return async (app2) => {
    for (const { route, private: isPrivate } of routes8) {
      app2.register(
        async (subApp) => {
          if (isPrivate) {
            subApp.addHook("preHandler", authMiddleware);
          }
          await route(subApp, {});
        },
        { prefix }
      );
    }
  };
};

// src/routes/analytics/get-all-data-analytics-route.ts
import { z as z7 } from "zod";

// src/controllers/AnalyticsController.ts
import { and, avg, count, eq as eq2, max, min, sql, sum } from "drizzle-orm";
import z6 from "zod";

// src/constants/areas.ts
var CLASSE_LABELS = {
  "0": "Vegeta\xE7\xE3o",
  "1": "\xC1rea Queimada",
  "2": "Solo Exposto",
  "3": "\xC1gua / Outros"
};

// src/drizzle/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// src/drizzle/schemas/analytics.ts
var analytics_exports = {};
__export(analytics_exports, {
  analytics: () => analytics,
  areaStats: () => areaStats,
  areaSummary: () => areaSummary,
  ndviStats: () => ndviStats
});
import {
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  timestamp
} from "drizzle-orm/pg-core";
var analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  bbox_real: jsonb("bbox_real").notNull(),
  created_at: timestamp("created_at").defaultNow()
});
var ndviStats = pgTable("ndvi_stats", {
  id: serial("id").primaryKey(),
  analyticsId: integer("analytics_id").references(() => analytics.id).notNull(),
  min: real("min").notNull(),
  max: real("max").notNull(),
  mean: real("mean").notNull(),
  std: real("std").notNull(),
  pct_acima_0_5: real("pct_acima_0_5").notNull(),
  histogram: jsonb("histogram").notNull()
  // [{ range: [min, max], count }]
});
var areaStats = pgTable("area_stats", {
  id: serial("id").primaryKey(),
  analyticsId: integer("analytics_id").references(() => analytics.id).notNull(),
  total_area_m2: real("total_area_m2").notNull(),
  total_area_ha: real("total_area_ha").notNull(),
  por_classe: jsonb("por_classe").notNull()
  // { classe1: { pixels, area_m2, ... }, ... }
});
var areaSummary = pgTable("area_summary", {
  id: serial("id").primaryKey(),
  analyticsId: integer("analytics_id").references(() => analytics.id).notNull(),
  total_area_km2: real("total_area_km2").notNull(),
  burned_area_km2: real("burned_area_km2").notNull(),
  burned_percent: real("burned_percent").notNull()
});

// src/drizzle/schemas/scar.ts
import { integer as integer3, pgTable as pgTable4, text as text3, timestamp as timestamp4, uuid as uuid2 } from "drizzle-orm/pg-core";

// src/drizzle/schemas/stac.ts
import { jsonb as jsonb2, pgTable as pgTable2, text as text2, timestamp as timestamp2, uuid } from "drizzle-orm/pg-core";
var stacImages = pgTable2("stac_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: text2("item_id").notNull(),
  collection: text2("collection").notNull(),
  startDate: timestamp2("start_date").notNull(),
  endDate: timestamp2("end_date").notNull().defaultNow(),
  bbox: jsonb2("bbox").notNull(),
  geometry: jsonb2("geometry").notNull(),
  band_15: text2("band_15").notNull(),
  band_16: text2("band_16").notNull(),
  createdAt: timestamp2("created_at").defaultNow()
});

// src/drizzle/schemas/types/scar-types.ts
import { pgEnum } from "drizzle-orm/pg-core";

// src/constants/scar-status.ts
import z2 from "zod";
var scarStatus = [
  "pending",
  "processing",
  "completed",
  "failed"
];
var scarStatusEnum = z2.enum(scarStatus);

// src/drizzle/schemas/types/scar-types.ts
var scarStatusEnum2 = pgEnum("scar_status", scarStatus);

// src/drizzle/schemas/uploads.ts
import {
  pgTable as pgTable3,
  serial as serial2,
  timestamp as timestamp3,
  varchar
} from "drizzle-orm/pg-core";
var uploads = pgTable3("uploads", {
  id: serial2("id").primaryKey(),
  url: varchar("url").notNull(),
  originalFileName: varchar("original_filename").notNull(),
  createdAt: timestamp3("created_at").defaultNow(),
  removedAt: timestamp3("removed_at")
});

// src/drizzle/schemas/scar.ts
var scarImage = pgTable4("scar_images", {
  id: uuid2("id").defaultRandom().primaryKey(),
  stacId: uuid2("stac_id").references(() => stacImages.id).notNull(),
  uploadId: integer3("upload_id").references(() => uploads.id),
  analyticsId: integer3("analytics_id").references(() => analytics.id),
  jobId: text3("job_id").notNull(),
  status: scarStatusEnum2("status").notNull().default("processing"),
  createdAt: timestamp4("created_at").notNull().defaultNow()
});

// src/drizzle/schemas/user.ts
import {
  pgTable as pgTable5,
  serial as serial3,
  timestamp as timestamp5,
  varchar as varchar2
} from "drizzle-orm/pg-core";
var users = pgTable5("users", {
  id: serial3("id").primaryKey(),
  name: varchar2("name", { length: 60 }).notNull(),
  email: varchar2("email").notNull().unique(),
  password: varchar2("password", { length: 100 }).notNull(),
  createdAt: timestamp5("created_at").notNull().defaultNow(),
  updatedAt: timestamp5("updated_at"),
  removedAt: timestamp5("removed_at")
});

// src/drizzle/client.ts
var pg = postgres(env.POSTGRES_URL, {});
var db = drizzle(pg, {
  schema: {
    users,
    uploads,
    stacImages,
    scarImage,
    analytics: analytics_exports
  }
});
var dbMock = drizzle.mock({
  schema: { users, uploads, stacImages, scarImage, analytics: analytics_exports }
});

// src/errors/custom/CustomError.ts
var CustomError = class extends Error {
  statusCode;
  code;
  constructor(message, statusCode = 500, code = "INTERNAL_SERVER_ERROR") {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/model/AnalyticsModel.ts
import { eq } from "drizzle-orm";

// src/utils/UtilClass.ts
import {
  area,
  bbox,
  booleanPointInPolygon,
  centroid,
  length,
  point,
  polygon
} from "@turf/turf";

// src/routes/cicatriz/schema/schemas.ts
import z3 from "zod";
var geometrySchema = z3.object({
  type: z3.string(),
  coordinates: z3.array(z3.array(z3.tuple([z3.number(), z3.number()])))
});
var cicatrizSchema = z3.object({
  id: z3.string(),
  jobId: z3.string(),
  stacId: z3.string().nullable(),
  uploadId: z3.number().nullable(),
  createdAt: z3.date().nullable(),
  status: z3.enum(scarStatus),
  url: z3.string().url().nullable(),
  collection: z3.string().nullable(),
  startDate: z3.date().nullable(),
  endDate: z3.date().nullable(),
  bbox: z3.preprocess((val) => {
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        return parsed;
      } catch {
        return val;
      }
    }
    return val;
  }, z3.array(z3.number())),
  geometry: z3.unknown().transform((val) => {
    return geometrySchema.parse(val);
  })
});
var cicatrizesSchema = z3.array(cicatrizSchema);
var allCicatriz = z3.array(
  cicatrizSchema.pick({
    id: true,
    jobId: true,
    stacId: true,
    uploadId: true,
    createdAt: true,
    status: true,
    url: true
  })
);
var allCicatrizSchema = z3.object({
  data: allCicatriz,
  count: z3.number()
});
var cicatrizBboxResponseSchema = z3.object({
  data: cicatrizesSchema,
  count: z3.number()
});
var summary = z3.object({
  type: z3.enum(["Polygon", "MultiPolygon"]),
  ringCount: z3.number(),
  vertexCount: z3.number()
});
var analyticsCicatrizSchema = cicatrizSchema.extend({
  area: z3.string(),
  perimeter: z3.string(),
  centroid: z3.tuple([z3.number(), z3.number()]),
  geometry: summary
});

// src/settings/logger.ts
import pc2 from "picocolors";
function log(...params) {
  return console.log(...params);
}
function success(...params) {
  return log(pc2.green("\u2713"), ...params);
}
function warn(...params) {
  return console.warn(pc2.yellow("\u25B2"), ...params);
}
function info(...params) {
  return console.info(pc2.blue("\u2139"), ...params);
}
function error(...params) {
  return console.error(pc2.red("\u2716\uFE0E"), ...params);
}
function debug(...params) {
  if (env.DEBUG_LEVEL) {
    return console.debug(pc2.magenta("\u{1F41E}"), ...params);
  }
}
function table(data) {
  return console.table(data);
}
function task(...params) {
  return log(pc2.cyan("\u{1F6E0}"), ...params);
}
function pending(...params) {
  return log(pc2.gray("\u23F3"), ...params);
}
function done(...params) {
  return log(pc2.greenBright("\u2705"), ...params);
}
var logger = {
  log,
  success,
  warn,
  info,
  debug,
  error,
  table,
  task,
  pending,
  done
};

// src/utils/UtilClass.ts
var UtilClass = class {
  separarData(caminho) {
    const partes = caminho.split("/", 2);
    logger.log("partes", partes);
    return {
      startDate: partes[0] || "",
      endDate: partes[1] || ""
    };
  }
  generatePolygon(geometry) {
    const result = this.parseGeometry(geometry);
    const poly = polygon(result.coordinates);
    return poly;
  }
  parseGeometry(geometry) {
    const result = geometrySchema.parse(geometry);
    return result;
  }
  analyzePolygon(coords) {
    const poly = polygon(coords);
    return {
      areaKm2: +(area(poly) / 1e6).toFixed(2),
      perimeterKm: +length(poly, { units: "kilometers" }).toFixed(2),
      bbox: bbox(poly),
      centroid: centroid(poly).geometry.coordinates,
      contains: (lng, lat) => booleanPointInPolygon(point([lng, lat]), poly)
    };
  }
  getGeoJsonBoundsSummary(input) {
    const type = input.geometry.type;
    if (type === "Polygon") {
      const coords = input.geometry.coordinates;
      const ringCount = coords.length;
      const vertexCount = coords.reduce((sum2, ring) => sum2 + ring.length, 0);
      return {
        type,
        bbox: bbox(input),
        ringCount,
        vertexCount
      };
    }
    if (type === "MultiPolygon") {
      const coords = input.geometry.coordinates;
      let ringCount = 0;
      let vertexCount = 0;
      for (const polygon2 of coords) {
        ringCount += polygon2.length;
        vertexCount += polygon2.reduce((sum2, ring) => sum2 + ring.length, 0);
      }
      return {
        type,
        bbox: bbox(input),
        ringCount,
        vertexCount
      };
    }
    throw new Error("Unsupported geometry type");
  }
  fullProcess(geometry) {
    const result = this.parseGeometry(geometry);
    const poly = polygon(result.coordinates);
    const analytics2 = this.analyzePolygon(result.coordinates);
    const summary2 = this.getGeoJsonBoundsSummary(poly);
    return {
      areaKm2: analytics2.areaKm2,
      perimeterKm: analytics2.perimeterKm,
      bbox: summary2.bbox,
      centroid: analytics2.centroid,
      contains: analytics2.contains,
      type: summary2.type,
      ringCount: summary2.ringCount,
      vertexCount: summary2.vertexCount
    };
  }
};

// src/utils/catchError.ts
async function catchError(promise, customError) {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    const error2 = err instanceof CustomError ? err : customError ? Object.assign(customError, { message: String(err) }) : new CustomError(String(err));
    return [error2, null];
  }
}

// src/utils/retry.ts
async function retryWithCatch(fn, options = {}) {
  const { retries = 3, delay = 1e3, backoff = 1, customError } = options;
  let attempt = 0;
  let currentDelay = delay;
  while (attempt < retries) {
    const [err, result] = await catchError(fn(), customError);
    if (!err) {
      return [null, result];
    }
    attempt++;
    if (attempt >= retries) {
      return [err, null];
    }
    await new Promise((res) => setTimeout(res, currentDelay));
    currentDelay *= backoff;
  }
  return [new CustomError("Unexpected retry failure"), null];
}

// src/model/AnalyticsModel.ts
var AnalyticsModel = class extends UtilClass {
  async saveBboxAnalytics({ bbox_real }) {
    const [error2, data] = await retryWithCatch(
      () => db.insert(analytics).values({ bbox_real }).returning()
    );
    if (error2) {
      throw new CustomError(
        "Erro ao salvar os dados de analytics",
        503,
        "ERROR_SAVING_ANALYTICS"
      );
    }
    return data[0].id;
  }
  async saveNvdiStatsAnalytics({
    ndvi_stats,
    analyticsId
  }) {
    const { min: min2, max: max2, mean, std, histogram, pct_acima_0_5 } = ndvi_stats;
    const [error2, data] = await retryWithCatch(
      () => db.insert(ndviStats).values({
        analyticsId,
        min: min2,
        max: max2,
        mean,
        histogram,
        pct_acima_0_5,
        std
      }).returning()
    );
    if (error2) {
      throw new CustomError(
        "Erro ao salvar os dados de NVDI de analytics",
        503,
        "ERROR_SAVING_NVDI_ANALYTICS"
      );
    }
    return data[0];
  }
  async saveAreaStatsAnalytics({
    analyticsId,
    area_stats
  }) {
    const { total_area_m2, total_area_ha, por_classe } = area_stats;
    const [error2, data] = await retryWithCatch(
      () => db.insert(areaStats).values({
        analyticsId,
        total_area_m2,
        total_area_ha,
        por_classe
      }).returning()
    );
    if (error2) {
      throw new CustomError(
        "Erro ao salvar os dados de status de \xE1rea de analytics",
        503,
        "ERROR_SAVING_AREA_STATS_ANALYTICS"
      );
    }
    return data[0];
  }
  async saveAreaSummaryAnalytics({
    analyticsId,
    summary: summary2
  }) {
    const { total_area_km2, burned_area_km2, burned_percent } = summary2;
    const [error2, data] = await retryWithCatch(
      () => db.insert(areaSummary).values({
        analyticsId,
        total_area_km2,
        burned_area_km2,
        burned_percent
      }).returning()
    );
    if (error2) {
      throw new CustomError(
        "Erro ao salvar os dados de resumo de \xE1rea de analytics",
        503,
        "ERROR_SAVING_AREA_SUMMARY_ANALYTICS"
      );
    }
    return data[0];
  }
  async saveAnalytics({
    area_stats,
    bbox_real,
    ndvi_stats
  }) {
    const [bboxError, analyticsId] = await catchError(
      this.saveBboxAnalytics({ bbox_real })
    );
    if (bboxError) {
      throw new CustomError(
        bboxError.message,
        bboxError.statusCode,
        bboxError.code
      );
    }
    const [nvdiError] = await catchError(
      this.saveNvdiStatsAnalytics({ ndvi_stats, analyticsId })
    );
    if (nvdiError) {
      throw new CustomError(
        nvdiError.message,
        nvdiError.statusCode,
        nvdiError.code
      );
    }
    const [areaError] = await catchError(
      this.saveAreaStatsAnalytics({ area_stats, analyticsId })
    );
    if (areaError) {
      throw new CustomError(
        areaError.message,
        areaError.statusCode,
        areaError.code
      );
    }
    const [summaryError] = await catchError(
      this.saveAreaSummaryAnalytics({
        summary: area_stats.summary,
        analyticsId
      })
    );
    if (summaryError) {
      throw new CustomError(
        summaryError.message,
        summaryError.statusCode,
        summaryError.code
      );
    }
    return {
      id: analyticsId,
      areaStats: area_stats,
      nvdiStats: ndvi_stats,
      areaSummary: area_stats.summary
    };
  }
  async updateScar({ analyticsId, jobId }) {
    const [error2, data] = await retryWithCatch(
      () => db.update(scarImage).set({ analyticsId }).where(eq(scarImage.jobId, jobId)).returning()
    );
    if (error2) {
      throw new CustomError(
        "Erro ao salvar os dados de analytics em referencia",
        503,
        "ERROR_SAVING_ANALYTICS_SCAR"
      );
    }
    if (data.length === 0) {
      throw new CustomError(
        "N\xE3o foi poss\xEDvel encontrar a cicatriz com o jobId informado",
        404,
        "ERROR_NOT_FOUND_SCAR"
      );
    }
    return data[0].id;
  }
};

// src/routes/analytics/schemas/index.ts
import z5 from "zod";

// src/schemas/iaSchema.ts
import { z as z4 } from "zod";
var HistogramSchema = z4.object({
  range: z4.array(z4.number()).length(2),
  // assumindo que "range" é sempre um par [min, max]
  count: z4.number()
});
var NdviStatsSchema = z4.object({
  min: z4.number(),
  max: z4.number(),
  mean: z4.number(),
  std: z4.number(),
  pct_acima_0_5: z4.number(),
  histogram: z4.array(HistogramSchema)
});
var PorClasseSchema = z4.object({
  pixels: z4.number(),
  area_m2: z4.number(),
  area_ha: z4.number(),
  area_km2: z4.number()
});
var SummarySchema = z4.object({
  total_area_km2: z4.number(),
  burned_area_km2: z4.number(),
  burned_percent: z4.number()
});
var AreaStatsSchema = z4.object({
  total_area_m2: z4.number(),
  total_area_ha: z4.number(),
  por_classe: z4.record(PorClasseSchema),
  summary: SummarySchema
});
var NVDIResultSchema = z4.object({
  bbox_real: z4.array(z4.number()),
  ndvi_stats: NdviStatsSchema,
  area_stats: AreaStatsSchema
});

// src/routes/analytics/schemas/index.ts
var PorClasseResponseSchema = PorClasseSchema.extend({
  label: z5.string(),
  classe: z5.string()
});
var AreaStatsSchemaResponse = z5.object({
  scarId: z5.string(),
  analyticsId: z5.number().nullable(),
  totalAreaM2: z5.number(),
  totalAreaHa: z5.number(),
  areaStatsId: z5.number(),
  classes: z5.array(PorClasseResponseSchema)
});
var NvdiStatsSchemaResponse = NdviStatsSchema.extend({
  scarId: z5.string(),
  analyticsId: z5.number().nullable(),
  nvdiId: z5.number()
});
var NvdiSummarySchemaResponse = NvdiStatsSchemaResponse.omit({
  histogram: true,
  pct_acima_0_5: true
}).extend({
  pctAcima05: z5.number()
});
var AreaSummarySchemaResponse = z5.object({
  scarId: z5.string(),
  analyticsId: z5.number().nullable(),
  summaryId: z5.number(),
  totalAreaKm2: z5.number(),
  burnedAreaKm2: z5.number(),
  burnedPercent: z5.number()
});
var AllDataAnalyticsSchemaResponse = z5.object({
  id: z5.string(),
  analyticsId: z5.number(),
  stacId: z5.string(),
  uploadId: z5.number().nullable(),
  areaStats: z5.object({
    id: z5.number(),
    analyticsId: z5.number(),
    total_area_m2: z5.number(),
    total_area_ha: z5.number(),
    por_classe: z5.unknown()
  }),
  ndviStats: z5.object({
    id: z5.number(),
    analyticsId: z5.number(),
    min: z5.number(),
    max: z5.number(),
    mean: z5.number(),
    std: z5.number(),
    pct_acima_0_5: z5.number(),
    histogram: z5.unknown()
  }),
  areaSummary: z5.object({
    id: z5.number(),
    analyticsId: z5.number(),
    total_area_km2: z5.number(),
    burned_area_km2: z5.number(),
    burned_percent: z5.number()
  })
});
var GeometryResponseSchema = z5.object({
  areaKm2: z5.number(),
  perimeterKm: z5.number(),
  bbox: z5.tuple([z5.number(), z5.number(), z5.number(), z5.number()]),
  centroid: z5.tuple([z5.number(), z5.number()]),
  ringCount: z5.number(),
  type: z5.enum(["Polygon", "MultiPolygon"]),
  vertexCount: z5.number()
});
var AnalyticsResponseSchema = z5.object({
  id: z5.number(),
  scarId: z5.string(),
  bboxReal: z5.tuple([z5.number(), z5.number(), z5.number(), z5.number()]),
  createdAt: z5.date().nullable()
});
var AnalyticsResponseSchemaArray = z5.array(AnalyticsResponseSchema);
var LatLngSchema = z5.object({
  id: z5.number(),
  bbox_real: z5.array(z5.number()),
  created_at: z5.date().nullable()
});
var AverageSchema = z5.object({
  averages: z5.array(
    z5.object({
      range: z5.tuple([z5.number(), z5.number()]),
      averageCount: z5.number()
    })
  )
});
var OverviewSchema = z5.object({
  totalAreas: z5.number(),
  totalAreaKm2: z5.string().nullable(),
  totalBurnedKm2: z5.string().nullable(),
  avgNdvi: z5.string().nullable(),
  minDate: z5.date().nullable(),
  maxDate: z5.date().nullable()
});

// src/controllers/AnalyticsController.ts
var AnalyticsController = class extends UtilClass {
  analyticsModel;
  constructor() {
    super();
    this.analyticsModel = new AnalyticsModel();
  }
  async saveAnalytics({
    area_stats,
    bbox_real,
    ndvi_stats,
    jobId
  }) {
    const [analyticsError, data] = await catchError(
      this.analyticsModel.saveAnalytics({ area_stats, bbox_real, ndvi_stats })
    );
    if (analyticsError) {
      throw new CustomError(
        analyticsError.message,
        analyticsError.statusCode,
        analyticsError.code
      );
    }
    const analyticsId = data.id;
    const [err] = await retryWithCatch(
      () => this.analyticsModel.updateScar({ analyticsId, jobId })
    );
    if (err) {
      throw new CustomError(err.message, err.statusCode, err.code);
    }
    return {
      id: analyticsId,
      bbox_real,
      area_stats,
      ndvi_stats
    };
  }
  async getAreaStats({ scarId }) {
    const query = db.select({
      scarId: scarImage.id,
      analyticsId: analytics.id,
      areaStatsId: areaStats.id,
      totalAreaM2: areaStats.total_area_m2,
      totalAreaHa: areaStats.total_area_ha,
      porClasse: areaStats.por_classe
    }).from(scarImage).leftJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(areaStats, eq2(areaStats.analyticsId, analytics.id)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar estat\xEDsticas de \xE1rea",
        503,
        "ERROR_GET_AREA_STATS"
      );
    }
    const { porClasse, ...rest } = data[0];
    const parsedPorClasse = z6.record(PorClasseSchema).parse(porClasse);
    const classes = Object.entries(parsedPorClasse).map(
      ([classe, valores]) => ({
        classe,
        label: CLASSE_LABELS[classe] ?? "Desconhecido",
        ...valores
      })
    );
    return {
      classes,
      ...rest
    };
  }
  async getNvdiStats({ scarId }) {
    const query = db.select({
      scarId: scarImage.id,
      analyticsId: analytics.id,
      nvdi: ndviStats
    }).from(scarImage).leftJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar estat\xEDsticas de NDVI",
        503,
        "ERROR_GET_NDVI_STATS"
      );
    }
    const { id, analyticsId, ...nvdi } = data[0].nvdi;
    const parsedData = NdviStatsSchema.parse(nvdi);
    return {
      scarId: data[0].scarId,
      analyticsId: data[0].analyticsId,
      nvdiId: id,
      ...parsedData
    };
  }
  async getNvdiSummaryStats({ scarId }) {
    const query = db.select({
      scarId: scarImage.id,
      analyticsId: analytics.id,
      nvdiId: ndviStats.id,
      min: ndviStats.min,
      max: ndviStats.max,
      mean: ndviStats.mean,
      pctAcima05: ndviStats.pct_acima_0_5,
      std: ndviStats.std
    }).from(scarImage).leftJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar estat\xEDsticas de NDVI",
        503,
        "ERROR_GET_NDVI_STATS"
      );
    }
    return data[0];
  }
  async getAreaSummary({ scarId }) {
    const query = db.select({
      scarId: scarImage.id,
      analyticsId: analytics.id,
      summaryId: areaSummary.id,
      totalAreaKm2: areaSummary.total_area_km2,
      burnedAreaKm2: areaSummary.burned_area_km2,
      burnedPercent: areaSummary.burned_percent
    }).from(scarImage).leftJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(areaSummary, eq2(areaSummary.analyticsId, analytics.id)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar resumo de \xE1rea queimada",
        503,
        "ERROR_GET_AREA_SUMMARY"
      );
    }
    return data[0];
  }
  async getAllDataAnalytics({ scarId }) {
    const query = db.select({
      id: scarImage.id,
      analyticsId: analytics.id,
      stacId: scarImage.stacId,
      uploadId: scarImage.uploadId,
      areaStats,
      ndviStats,
      areaSummary
    }).from(scarImage).innerJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(areaStats, eq2(areaStats.analyticsId, analytics.id)).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id)).innerJoin(areaSummary, eq2(areaSummary.analyticsId, analytics.id)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar todos os dados de analytics",
        503,
        "ERROR_GET_ALL_DATA_ANALYTICS"
      );
    }
    return data[0];
  }
  async getAllLatestAnalytics() {
    const query = db.select({
      id: scarImage.id,
      analyticsId: analytics.id,
      stacId: scarImage.stacId,
      uploadId: scarImage.uploadId,
      areaStats,
      ndviStats,
      areaSummary
    }).from(scarImage).innerJoin(analytics, eq2(analytics.id, scarImage.analyticsId)).innerJoin(areaStats, eq2(areaStats.analyticsId, analytics.id)).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id)).innerJoin(areaSummary, eq2(areaSummary.analyticsId, analytics.id)).limit(5);
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar todos os dados de analytics",
        503,
        "ERROR_GET_ALL_DATA_ANALYTICS"
      );
    }
    return data;
  }
  async getAllAnalytics({
    startDate,
    endDate,
    limit,
    offset
  }) {
    const conditions = [];
    const query = db.select({
      id: analytics.id,
      scarId: scarImage.id,
      bboxReal: analytics.bbox_real,
      createdAt: analytics.created_at
    }).from(analytics).innerJoin(scarImage, eq2(scarImage.analyticsId, analytics.id)).leftJoin(stacImages, eq2(stacImages.id, scarImage.stacId));
    if (startDate) {
      conditions.push(eq2(stacImages.startDate, startDate));
    }
    if (endDate) {
      conditions.push(eq2(stacImages.endDate, endDate));
    }
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }
    if (limit) {
      query.limit(limit);
    }
    if (offset) {
      query.offset(offset);
    }
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Error ao buscar todos os dados de analytics",
        503,
        "ERROR_GET_ALL_ANALYTICS"
      );
    }
    const response = AnalyticsResponseSchemaArray.safeParse(data);
    if (!response.success) {
      throw new CustomError(
        "Erro ao validar os dados de analytics",
        503,
        "ERROR_VALIDATING_ANALYTICS"
      );
    }
    return response.data;
  }
  async searchLatLng({ lat, lng, page }) {
    const query = db.select().from(analytics).limit(10).offset((page - 1) * 10);
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        "Erro ao buscar os dados de analytics",
        503,
        "ERROR_GET_ANALYTICS"
      );
    }
    const result = data.filter((item) => {
      try {
        const poly = this.generatePolygon(item.bbox_real);
        return this.analyzePolygon(poly.geometry.coordinates).contains(lng, lat);
      } catch {
        return false;
      }
    });
    const parsedResult = result.map((item) => {
      const result2 = LatLngSchema.safeParse(item);
      if (!result2.success) {
        throw new CustomError(
          "Erro ao validar os dados de analytics",
          503,
          "ERROR_VALIDATING_ANALYTICS"
        );
      }
      return result2.data;
    });
    return parsedResult;
  }
  async generateGeometry({ scarId }) {
    const query = db.select({
      bbox: analytics.bbox_real,
      geometry: stacImages.geometry
    }).from(analytics).leftJoin(scarImage, eq2(scarImage.analyticsId, analytics.id)).innerJoin(stacImages, eq2(stacImages.id, scarImage.stacId)).where(eq2(scarImage.id, scarId));
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        "Erro ao buscar os dados de analytics",
        503,
        "ERROR_GET_ANALYTICS"
      );
    }
    if (data.length === 0) {
      throw new CustomError(
        "Nenhum dado encontrado para o ID fornecido",
        404,
        "DATA_NOT_FOUND"
      );
    }
    const poly = this.generatePolygon(data[0].geometry);
    const { areaKm2, bbox: bbox2, centroid: centroid2, perimeterKm } = this.analyzePolygon(
      poly.geometry.coordinates
    );
    const { ringCount, type, vertexCount } = this.getGeoJsonBoundsSummary(poly);
    return {
      areaKm2,
      perimeterKm,
      bbox: bbox2,
      centroid: centroid2,
      ringCount,
      type,
      vertexCount
    };
  }
  async getStatsOverview() {
    const query = db.select({
      totalAreas: count(analytics.id),
      totalAreaKm2: sum(areaSummary.total_area_km2),
      totalBurnedKm2: sum(areaSummary.burned_area_km2),
      avgNdvi: avg(ndviStats.mean),
      minDate: min(analytics.created_at),
      maxDate: max(analytics.created_at)
    }).from(analytics).innerJoin(areaSummary, eq2(areaSummary.analyticsId, analytics.id)).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id));
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError("Erro ao buscar overview", 503, "ERROR_OVERVIEW");
    }
    return data[0];
  }
  async getStatsPerMonth() {
    const monthExpr = sql`date_trunc('month', ${analytics.created_at})`;
    const query = db.select({
      month: monthExpr.as("month"),
      total: count(analytics.id),
      avgNdvi: avg(ndviStats.mean),
      burnedKm2: sum(areaSummary.burned_area_km2)
    }).from(analytics).innerJoin(ndviStats, eq2(ndviStats.analyticsId, analytics.id)).innerJoin(areaSummary, eq2(areaSummary.analyticsId, analytics.id)).groupBy(monthExpr).orderBy(monthExpr);
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Erro ao buscar estat\xEDsticas mensais",
        503,
        "ERROR_STATS_PER_MONTH"
      );
    }
    return data;
  }
  async getAllPolygonsAsGeoJSON() {
    const query = db.select({
      id: analytics.id,
      bbox: analytics.bbox_real
    }).from(analytics);
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError("Erro ao gerar GeoJSON", 503, "ERROR_GEOJSON");
    }
    const features = data.map((item) => {
      const polygon2 = this.generatePolygon(item.bbox);
      return {
        type: "Feature",
        properties: { id: item.id },
        geometry: polygon2.geometry
      };
    });
    return {
      type: "FeatureCollection",
      features
    };
  }
  async getHistogramsAverage() {
    const query = db.select({
      histogram: ndviStats.histogram
    }).from(ndviStats);
    const [error2, data] = await retryWithCatch(() => query);
    if (error2) {
      throw new CustomError(
        "Erro ao buscar m\xE9dia dos histogramas",
        503,
        "ERROR_HISTOGRAM_AVERAGE"
      );
    }
    if (!data.length) return { averages: [] };
    const rangeMap = /* @__PURE__ */ new Map();
    for (const row of data) {
      const parsedHistogram = z6.array(HistogramSchema).parse(row.histogram);
      for (const bin of parsedHistogram) {
        const key = JSON.stringify(bin.range);
        const entry = rangeMap.get(key) ?? { count: 0, total: 0 };
        entry.count += bin.count;
        entry.total += 1;
        rangeMap.set(key, entry);
      }
    }
    const averages = Array.from(rangeMap.entries()).map(
      ([range, { count: count2, total }]) => ({
        range: JSON.parse(range),
        averageCount: count2 / total
      })
    );
    averages.sort((a, b) => a.range[0] - b.range[0]);
    return { averages };
  }
};

// src/routes/analytics/get-all-data-analytics-route.ts
var getAllDataAnalyticsRoute = async (app2) => {
  app2.get(
    "/:scarId/all",
    {
      schema: {
        summary: "Busca os dados completos de uma cicatriz",
        params: z7.object({
          scarId: z7.string()
        }),
        tags: ["Analytics"],
        operationId: "getAllDataAnalytics",
        response: {
          200: AllDataAnalyticsSchemaResponse,
          400: z7.object({
            message: z7.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getAllDataAnalytics({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-analytics.ts
import { z as z8 } from "zod";
var getAnalytics = async (app2) => {
  app2.get(
    "",
    {
      schema: {
        summary: "Busca por todas as estat\xEDsticas",
        querystring: z8.object({
          limit: z8.coerce.number().optional(),
          offset: z8.coerce.number().optional(),
          startDate: z8.coerce.date().optional(),
          endDate: z8.coerce.date().optional()
        }),
        tags: ["Analytics"],
        operationId: "getAnalytics",
        response: {
          200: z8.array(AnalyticsResponseSchema),
          400: z8.object({
            message: z8.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { limit, offset, startDate, endDate } = request.query;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getAllAnalytics({
          limit,
          offset,
          startDate,
          endDate
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-area-stats-route.ts
import { z as z9 } from "zod";
var getAreaStatsRoute = async (app2) => {
  app2.get(
    "/:scarId/area-stats",
    {
      schema: {
        summary: "Busca os dados do status da \xE1rea de uma cicatriz",
        params: z9.object({
          scarId: z9.string()
        }),
        tags: ["Analytics"],
        operationId: "getAreaStats",
        response: {
          200: AreaStatsSchemaResponse,
          400: z9.object({
            message: z9.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getAreaStats({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-area-summary-route.ts
import { z as z10 } from "zod";
var getAreaSummaryRoute = async (app2) => {
  app2.get(
    "/:scarId/area-summary",
    {
      schema: {
        summary: "Busca os dados do resumo do status da area de uma cicatriz",
        params: z10.object({
          scarId: z10.string()
        }),
        tags: ["Analytics"],
        operationId: "getAreaSummary",
        response: {
          200: AreaSummarySchemaResponse,
          400: z10.object({
            message: z10.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getAreaSummary({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-geometry-route.ts
import { z as z11 } from "zod";
var getGeometryRoute = async (app2) => {
  app2.get(
    "/:scarId/geometry",
    {
      schema: {
        summary: "Gera a geometria de uma cicatriz",
        params: z11.object({
          scarId: z11.string()
        }),
        tags: ["Analytics"],
        operationId: "getGeometry",
        response: {
          200: GeometryResponseSchema,
          400: z11.object({
            message: z11.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.generateGeometry({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-histogram-history-route.ts
import { z as z12 } from "zod";
var getHistogramAverageHistoryRoute = async (app2) => {
  app2.get(
    "/histogram-average",
    {
      schema: {
        summary: "Busca os dados do histograma m\xE9dio de uma cicatriz",
        tags: ["Analytics"],
        operationId: "getHistogramAverageHistory",
        response: {
          200: AverageSchema,
          400: z12.object({
            message: z12.string()
          })
        }
      }
    },
    async (request, reply) => {
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getHistogramsAverage()
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-last-analytics-route.ts
import { z as z13 } from "zod";
var getLastAnalyticsRoute = async (app2) => {
  app2.get(
    "/last",
    {
      schema: {
        summary: "Busca os dados das \xFAltimas 5 analytics",
        tags: ["Analytics"],
        operationId: "getAllDataAnalytics",
        response: {
          200: z13.array(AllDataAnalyticsSchemaResponse),
          400: z13.object({
            message: z13.string()
          })
        }
      }
    },
    async (request, reply) => {
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getAllLatestAnalytics()
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-nvdi-stats-route.ts
import { z as z14 } from "zod";
var getNvdiStatsRoute = async (app2) => {
  app2.get(
    "/:scarId/nvdi-stats",
    {
      schema: {
        summary: "Busca os dados do status do nvdi completo de uma cicatriz",
        params: z14.object({
          scarId: z14.string()
        }),
        tags: ["Analytics"],
        operationId: "getNvdiStats",
        response: {
          200: NvdiStatsSchemaResponse,
          400: z14.object({
            message: z14.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getNvdiStats({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-nvdi-summary-route.ts
import { z as z15 } from "zod";
var getNvdiSummaryRoute = async (app2) => {
  app2.get(
    "/:scarId/nvdi-summary",
    {
      schema: {
        summary: "Busca os dados do status do nvdi de uma cicatriz",
        params: z15.object({
          scarId: z15.string()
        }),
        tags: ["Analytics"],
        operationId: "getNvdiSummary",
        response: {
          200: NvdiSummarySchemaResponse,
          400: z15.object({
            message: z15.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { scarId } = request.params;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getNvdiSummaryStats({
          scarId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/get-overview-route.ts
import { z as z16 } from "zod";
var getStatsOverviewRoute = async (app2) => {
  app2.get(
    "/overview",
    {
      schema: {
        summary: "Busca a m\xE9dia dos dados de analytics salvos",
        tags: ["Analytics"],
        operationId: "getStatsOverview",
        response: {
          200: OverviewSchema,
          400: z16.object({
            message: z16.string()
          })
        }
      }
    },
    async (request, reply) => {
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.getStatsOverview()
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/save-analytics-route.ts
import { z as z17 } from "zod";
var saveAnalyticsRoute = async (app2) => {
  app2.post(
    "/save-analytics",
    {
      schema: {
        summary: "Salva os dados de analytics de uma cicatriz",
        body: NVDIResultSchema,
        querystring: z17.object({
          jobId: z17.string()
        }),
        tags: ["Analytics"],
        operationId: "saveAnalytics",
        description: "Salva os dados de analytics de uma cicatriz",
        response: {
          200: z17.object({
            message: z17.string()
          }),
          400: z17.object({
            message: z17.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { bbox_real, area_stats, ndvi_stats } = request.body;
      const { jobId } = request.query;
      const analyticsController = new AnalyticsController();
      const [error2] = await catchError(
        analyticsController.saveAnalytics({
          area_stats,
          bbox_real,
          ndvi_stats,
          jobId
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send({ message: "Analytics salva" });
    }
  );
};

// src/routes/analytics/search-lat-lng-route.ts
import { z as z18 } from "zod";
var searchLatLngRoute = async (app2) => {
  app2.get(
    "/search-lat-lng",
    {
      schema: {
        summary: "Busca por cicatrizes em uma \xE1rea geogr\xE1fica",
        querystring: z18.object({
          lat: z18.coerce.number(),
          lng: z18.coerce.number(),
          page: z18.coerce.number().optional()
        }),
        tags: ["Analytics"],
        operationId: "searchLatLng",
        response: {
          200: z18.array(LatLngSchema),
          400: z18.object({
            message: z18.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { lat, lng, page = 1 } = request.query;
      const analyticsController = new AnalyticsController();
      const [error2, data] = await catchError(
        analyticsController.searchLatLng({
          lat,
          lng,
          page
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({ message: error2.message });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/analytics/index.ts
var routes = [
  { route: saveAnalyticsRoute, private: true },
  { route: getNvdiSummaryRoute, private: true },
  { route: getNvdiStatsRoute, private: true },
  { route: getAreaStatsRoute, private: true },
  { route: getAreaSummaryRoute, private: true },
  { route: getAllDataAnalyticsRoute, private: true },
  { route: getGeometryRoute, private: true },
  { route: getAnalytics, private: true },
  { route: searchLatLngRoute, private: true },
  { route: getHistogramAverageHistoryRoute, private: true },
  { route: getStatsOverviewRoute, private: true },
  { route: getLastAnalyticsRoute, private: true }
];
var analyticsPrefix = "/analytics";
var analyticsRoutes = registerPrefix(routes, analyticsPrefix);

// src/routes/aws/upload.ts
import z19 from "zod";

// src/aws/uploadToS3.ts
import path from "node:path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// src/aws/s3.ts
import { S3Client } from "@aws-sdk/client-s3";
var s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

// src/aws/uploadToS3.ts
async function uploadToS3({
  fileBuffer,
  fileName,
  folder,
  mimeType
}) {
  const bucketName = env.S3_BUCKET_NAME;
  const fileExtension = path.extname(fileName);
  const newFileName = `${uuidv4()}${fileExtension}`;
  const cdnUrl = env.CLOUD_FRONT_CDN;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${folder}/${newFileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "private"
  });
  await s3.send(command);
  return {
    url: `${cdnUrl}/${folder}/${newFileName}`,
    originalFileName: fileName
  };
}

// src/routes/aws/upload.ts
var uploadRoute = async (app2) => {
  app2.post(
    "",
    {
      schema: {
        summary: "Upload de arquivo para S3",
        tags: ["Upload"],
        operationId: "uploadFile",
        consumes: ["multipart/form-data"],
        response: {
          [200 /* OK */]: z19.object({
            url: z19.string().url(),
            originalFileName: z19.string()
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z19.object({
            message: z19.string()
          })
        }
      }
    },
    async (request, reply) => {
      const req = request;
      const data = await req.file();
      if (!data) {
        return reply.status(400).send({ message: "Nenhum arquivo enviado" });
      }
      const chunks = [];
      for await (const chunk of data.file) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);
      const folder = "uploads";
      const [error2, uploadResult] = await catchError(
        uploadToS3({
          fileBuffer: buffer,
          fileName: data.filename,
          mimeType: data.mimetype,
          folder
        })
      );
      if (error2) {
        return reply.status(500 /* INTERNAL_SERVER_ERROR */).send({
          message: error2.message
        });
      }
      try {
        await db.insert(uploads).values({
          url: uploadResult.url,
          originalFileName: uploadResult.originalFileName
        });
        return reply.status(200 /* OK */).send(uploadResult);
      } catch (dbError) {
        return reply.status(500 /* INTERNAL_SERVER_ERROR */).send({
          message: "Erro ao salvar no banco de dados"
        });
      }
    }
  );
};

// src/routes/aws/index.ts
var routes2 = [{ route: uploadRoute, private: true }];
var uploadPrefix = "/upload";
var uploadRoutes = registerPrefix(routes2, uploadPrefix);

// src/routes/cicatriz/analytics-cicatriz-route.ts
import { z as z20 } from "zod";

// src/controllers/CicatrizController.ts
import { and as and2, desc, eq as eq4, gte, lte, or, sql as sql2 } from "drizzle-orm";

// src/constants/STAC_URL.ts
var STAC_URL = "https://data.inpe.br/bdc/stac/v1/search";

// src/model/IAModel.ts
import { eq as eq3 } from "drizzle-orm";

// src/client/http.ts
async function getBody(c) {
  return c.json();
}
async function http(path3, options = {}) {
  const request = new Request(path3, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers || {}
    }
  });
  const response = await fetch(request);
  if (!response.ok) {
    const errorBody = await response.text();
    const errorData = errorBody ? JSON.parse(errorBody) : { message: "Erro desconhecido" };
    throw new Error(errorData.message || `Erro HTTP ${response.status}`);
  }
  const data = await getBody(response);
  return data;
}

// src/model/IAModel.ts
var IAModel = class {
  isValidScarStatus = (status) => scarStatus.includes(status);
  async startProcess(props) {
    const { id, band15_url, band16_url, bbox: bbox2, JWT } = props;
    const [err, data] = await retryWithCatch(
      () => http(`${env.IA_URL}/ndvi/v3`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          band15_url,
          band16_url,
          bbox: bbox2,
          JWT
        })
      })
    );
    if (err) {
      throw new CustomError(
        "Erro ao iniciar o processo",
        424,
        "PROCESS_START_ERROR"
      );
    }
    if (!this.isValidScarStatus(data.status)) {
      throw new CustomError(
        "Status do processo inv\xE1lido",
        400,
        "INVALID_PROCESS_STATUS"
      );
    }
    const [scarError] = await catchError(
      db.insert(scarImage).values({ stacId: id, status: data.status, jobId: data.jobId })
    );
    if (scarError) {
      throw new CustomError(
        "Erro ao salvar o processo",
        503,
        "PROCESS_SAVE_ERROR"
      );
    }
    return data;
  }
  async checkAIStatus() {
    const [err, data] = await catchError(
      http(`${env.IA_URL}/check`)
    );
    if (err) {
      throw new CustomError(
        "Erro ao verificar o status do servi\xE7o de IA",
        424,
        "AI_SERVICE_CHECK_ERROR"
      );
    }
    return data;
  }
  async getProcess(jobId) {
    const [err, data] = await catchError(
      http(`${env.IA_URL}/status/${jobId}`)
    );
    if (err) {
      throw new CustomError(
        "Erro ao conferir o status do processo",
        424,
        "PROCESS_FETCH_ERROR"
      );
    }
    return data;
  }
  async finalizeProcess({
    jobId,
    uploadId,
    status
  }) {
    if (!this.isValidScarStatus(status)) {
      throw new CustomError(
        "Status do processo inv\xE1lido",
        400,
        "INVALID_PROCESS_STATUS"
      );
    }
    const [err] = await retryWithCatch(
      () => db.update(scarImage).set({ uploadId, status }).where(eq3(scarImage.jobId, jobId))
    );
    if (err) {
      throw new CustomError(
        "Erro ao finalizar o processo",
        503,
        "PROCESS_FINALIZE_ERROR"
      );
    }
  }
};
var iaModel = new IAModel();

// src/model/StacModel.ts
import fs from "node:fs";
import axios from "axios";
var StacModel = class extends UtilClass {
  async httpService(url, body) {
    const { collections, bbox: bbox2, datetime, limit } = body;
    const response = await http(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collections,
        bbox: bbox2,
        datetime,
        limit: limit || 10
      })
    });
    return response;
  }
  getFeature(stac) {
    return stac.features[0];
  }
  getImageUrl(item) {
    const assets = item.assets;
    let imageUrl = assets.thumbnail?.href || assets.visual?.href;
    if (!imageUrl) {
      throw new CustomError(
        "Nenhuma imagem com asset visual ou thumbnail dispon\xEDvel.",
        404,
        "NO_IMAGE"
      );
    }
    imageUrl = imageUrl.replace(/^\/vsicurl\//, "");
    return imageUrl;
  }
  getBands(item) {
    const assets = item.assets;
    const BAND15_URL = assets.BAND15?.href;
    const BAND16_URL = assets.BAND16?.href;
    if (!BAND15_URL || !BAND16_URL) {
      throw new CustomError(
        "Nenhuma imagem com asset BAND15 ou BAND16 dispon\xEDvel.",
        404,
        "NO_BAND"
      );
    }
    return {
      BAND_15: BAND15_URL,
      BAND_16: BAND16_URL
    };
  }
  async imageDownload(imageUrl, localPath) {
    const [axiosError, imageResponse] = await catchError(
      axios.get(imageUrl, {
        responseType: "stream"
      })
    );
    if (axiosError) {
      const { statusCode, message } = axiosError;
      throw new CustomError(
        `Erro ao baixar a imagem. Erro: ${message}`,
        statusCode,
        "ERROR_DOWNLOADING_IMAGE"
      );
    }
    const writer = fs.createWriteStream(localPath);
    const [errorStream] = await catchError(
      new Promise((resolve, reject) => {
        imageResponse.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      })
    );
    if (errorStream) {
      const { statusCode, message } = errorStream;
      throw new CustomError(
        `Erro ao baixar a imagem. Erro: ${message}`,
        statusCode,
        "ERROR_DOWNLOADING_IMAGE"
      );
    }
    return localPath;
  }
  async saveImage(item, band_15, band_16, datetime) {
    const { startDate, endDate } = this.separarData(datetime);
    const [dbError, dbData] = await catchError(
      db.insert(stacImages).values({
        itemId: item.id,
        collection: item.collection,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        bbox: item.bbox,
        geometry: item.geometry,
        band_15,
        band_16
      }).returning()
    );
    if (dbError) {
      const { message } = dbError;
      throw new CustomError(
        `Erro ao salvar a imagem no banco de dados. Erro: ${message}`,
        503,
        "ERROR_SAVING_IMAGE"
      );
    }
    const imageData = dbData[0];
    return imageData;
  }
};
var stacModel = new StacModel();

// src/controllers/UploadController.ts
var UploadController = class {
  async processUpload(data) {
    if (!data) {
      throw new CustomError("Nenhum arquivo enviado", 400, "FILE_NOT_FOUND");
    }
    const chunks = [];
    for await (const chunk of data.file) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const folder = "uploads";
    const [uploadError, uploadResult] = await retryWithCatch(
      () => uploadToS3({
        fileBuffer: buffer,
        fileName: data.filename,
        mimeType: data.mimetype,
        folder
      }),
      { delay: 5e3, backoff: 2 }
    );
    if (uploadError) {
      throw new CustomError(
        "Erro ao fazer upload do arquivo",
        503 /* SERVICE_UNAVAILABLE */,
        "UPLOAD_ERROR"
      );
    }
    const [dbError, dbData] = await retryWithCatch(
      () => db.insert(uploads).values({
        url: uploadResult.url,
        originalFileName: uploadResult.originalFileName
      }).returning()
    );
    if (dbError) {
      throw new CustomError(
        "Erro ao salvar imagem no banco de dados",
        503 /* SERVICE_UNAVAILABLE */,
        "DB_ERROR"
      );
    }
    return { ...uploadResult, id: dbData[0].id };
  }
};
var uploadController = new UploadController();

// src/controllers/CicatrizController.ts
var CicatrizController = class extends UtilClass {
  async createCicatriz({
    bbox: bbox2,
    collections,
    datetime,
    limit,
    ignore_existing,
    JWT
  }) {
    const { endDate, startDate } = this.separarData(datetime);
    const [, found] = await catchError(
      this.getCicatrizByBbox({
        bbox: bbox2,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      })
    );
    if (found) {
      if (found.count > 0 && !ignore_existing) {
        throw new CustomError(
          "J\xE1 existe um processo cicatriz para essa \xE1rea. Verifique essas propriedades na tela de cadastrados",
          409,
          "PROCESS_ALREADY_EXISTS"
        );
      }
    }
    const [error2, data] = await retryWithCatch(
      () => stacModel.httpService(STAC_URL, {
        collections,
        bbox: bbox2,
        datetime,
        limit
      })
    );
    if (error2) {
      throw new CustomError(
        `Erro ao buscar dados STAC. Erro: ${error2.message}`,
        error2.statusCode,
        "STAC_FETCH_ERROR"
      );
    }
    const [iaError] = await catchError(iaModel.checkAIStatus());
    if (iaError) {
      throw new CustomError(iaError.message, iaError.statusCode, iaError.code);
    }
    const feature = stacModel.getFeature(data);
    const { BAND_15, BAND_16 } = stacModel.getBands(feature);
    const [dbErr, dbData] = await catchError(
      stacModel.saveImage(feature, BAND_15, BAND_16, datetime)
    );
    if (dbErr) {
      throw new CustomError(
        `${dbErr.message}`,
        dbErr.statusCode,
        "SAVE_IMAGE_ERROR"
      );
    }
    const { id } = dbData;
    const [processErr, processData] = await catchError(
      iaModel.startProcess({
        id,
        band15_url: BAND_15,
        band16_url: BAND_16,
        bbox: feature.bbox,
        JWT
      })
    );
    if (processErr) {
      throw new CustomError(
        `Erro ao iniciar o processo. ${processErr.message}`,
        processErr.statusCode,
        processErr.code
      );
    }
    return processData;
  }
  async finalizeCicatriz({ data, jobId, status }) {
    const [not_found, found] = await catchError(
      db.select().from(scarImage).where(eq4(scarImage.jobId, jobId))
    );
    if (not_found) {
      throw new CustomError(
        `Erro ao buscar o processo. Erro: ${not_found.message}`,
        not_found.statusCode,
        "PROCESS_NOT_FOUND"
      );
    }
    if (found.length === 0) {
      throw new CustomError("Processo n\xE3o encontrado", 404, "PROCESS_NOT_FOUND");
    }
    const [uploadError, uploadResponse] = await retryWithCatch(
      () => uploadController.processUpload(data)
    );
    if (uploadError) {
      throw new CustomError(
        `Erro ao fazer upload do arquivo. Erro: ${uploadError.message}`,
        uploadError.statusCode,
        "UPLOAD_ERROR"
      );
    }
    const { id: uploadId } = uploadResponse;
    const [processError] = await catchError(
      iaModel.finalizeProcess({ jobId, status, uploadId })
    );
    if (processError) {
      throw new CustomError(
        `Erro ao finalizar o processo. Erro: ${processError.message}`,
        processError.statusCode,
        "PROCESS_FINALIZE_ERROR"
      );
    }
  }
  async getStatusCicatriz({ jobId }) {
    const [error2, data] = await catchError(
      db.select({ status: scarImage.status, jobId: scarImage.jobId }).from(scarImage).where(eq4(scarImage.jobId, jobId)).limit(1)
    );
    if (error2) {
      throw new CustomError(
        `Erro ao buscar o status do processo. Erro: ${error2.message}`,
        503,
        "PROCESS_STATUS_ERROR"
      );
    }
    if (data.length === 0) {
      throw new CustomError("Processo n\xE3o encontrado", 404, "PROCESS_NOT_FOUND");
    }
    return data[0];
  }
  async getAllCicatriz({
    offset,
    limit = 10,
    endDate,
    startDate
  }) {
    const conditions = [];
    const query = db.select({
      id: scarImage.id,
      jobId: scarImage.jobId,
      stacId: stacImages.id,
      uploadId: uploads.id,
      createdAt: stacImages.createdAt,
      status: scarImage.status,
      url: uploads.url
    }).from(scarImage).leftJoin(stacImages, eq4(scarImage.stacId, stacImages.id)).leftJoin(uploads, eq4(scarImage.uploadId, uploads.id)).orderBy(desc(scarImage.createdAt));
    if (offset) {
      query.offset(offset);
    }
    if (limit) {
      query.limit(limit);
    }
    if (startDate) {
      conditions.push(gte(stacImages.startDate, startDate));
    }
    if (endDate) {
      conditions.push(lte(stacImages.endDate, endDate));
    }
    if (conditions.length > 0) {
      query.where(and2(...conditions));
    }
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        `Erro ao buscar os processos. Erro: ${error2.message}`,
        503,
        "PROCESS_FETCH_ERROR"
      );
    }
    return { data, count: data.length };
  }
  async getCicatrizById({ id }) {
    const query = db.select({
      id: scarImage.id,
      jobId: scarImage.jobId,
      stacId: stacImages.id,
      uploadId: uploads.id,
      createdAt: scarImage.createdAt,
      status: scarImage.status,
      url: uploads.url,
      collection: stacImages.collection,
      startDate: stacImages.startDate,
      endDate: stacImages.endDate,
      bbox: stacImages.bbox,
      geometry: stacImages.geometry
    }).from(scarImage).where(and2(eq4(scarImage.id, id), eq4(scarImage.status, "completed"))).leftJoin(stacImages, eq4(scarImage.stacId, stacImages.id)).leftJoin(uploads, eq4(scarImage.uploadId, uploads.id));
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        `Erro ao buscar o processo. Erro: ${error2.message}`,
        503,
        "PROCESS_FETCH_ERROR"
      );
    }
    return data[0];
  }
  async getCicatrizDetails({ id }) {
    const query = db.select({
      id: scarImage.id,
      jobId: scarImage.jobId,
      stacId: stacImages.id,
      uploadId: uploads.id,
      createdAt: scarImage.createdAt,
      status: scarImage.status,
      url: uploads.url,
      collection: stacImages.collection,
      startDate: stacImages.startDate,
      endDate: stacImages.endDate,
      bbox: stacImages.bbox,
      geometry: stacImages.geometry
    }).from(scarImage).where(and2(eq4(scarImage.id, id), eq4(scarImage.status, "completed"))).leftJoin(stacImages, eq4(scarImage.stacId, stacImages.id)).leftJoin(uploads, eq4(scarImage.uploadId, uploads.id));
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        `Erro ao buscar o processo. Erro: ${error2.message}`,
        503,
        "PROCESS_FETCH_ERROR"
      );
    }
    if (data.length === 0) {
      throw new CustomError("Processo n\xE3o encontrado", 404, "PROCESS_NOT_FOUND");
    }
    const cicatriz = data[0];
    const { geometry, bbox: _, ...rest } = cicatriz;
    const polygon2 = this.generatePolygon(geometry);
    const { areaKm2, bbox: bbox2, centroid: centroid2, perimeterKm } = this.analyzePolygon(
      polygon2.geometry.coordinates
    );
    const { bbox: __, ...res } = this.getGeoJsonBoundsSummary(polygon2);
    const analytics2 = {
      ...rest,
      area: `${areaKm2}km\xB2`,
      bbox: bbox2,
      perimeter: `${perimeterKm}km`,
      centroid: centroid2,
      geometry: res
    };
    return analytics2;
  }
  async getCicatrizByBbox({
    bbox: bbox2,
    limit,
    offset,
    startDate,
    endDate
  }) {
    const [minX, minY, maxX, maxY] = bbox2;
    const conditions = [
      or(eq4(scarImage.status, "completed"), eq4(scarImage.status, "failed")),
      sql2`
      (stac_images.bbox->>0)::float <= ${maxX} AND
      (stac_images.bbox->>2)::float >= ${minX} AND
      (stac_images.bbox->>1)::float <= ${maxY} AND
      (stac_images.bbox->>3)::float >= ${minY}
    `
    ];
    const query = db.select({
      id: scarImage.id,
      jobId: scarImage.jobId,
      stacId: stacImages.id,
      uploadId: uploads.id,
      createdAt: scarImage.createdAt,
      status: scarImage.status,
      url: uploads.url,
      collection: stacImages.collection,
      startDate: stacImages.startDate,
      endDate: stacImages.endDate,
      bbox: stacImages.bbox,
      geometry: stacImages.geometry
    }).from(scarImage).leftJoin(stacImages, eq4(scarImage.stacId, stacImages.id)).leftJoin(uploads, eq4(scarImage.uploadId, uploads.id)).orderBy(desc(scarImage.createdAt));
    if (startDate) {
      conditions.push(gte(stacImages.startDate, startDate));
    }
    if (endDate) {
      conditions.push(lte(stacImages.endDate, endDate));
    }
    query.where(and2(...conditions));
    if (offset) {
      query.offset(offset);
    }
    if (limit) {
      query.limit(limit);
    }
    const [error2, data] = await catchError(query);
    if (error2) {
      throw new CustomError(
        `Erro ao buscar os processos. Erro: ${error2.message}`,
        503,
        "PROCESS_FETCH_ERROR"
      );
    }
    if (data.length === 0) {
      throw new CustomError("Nenhum processo encontrado", 204, "NOT_FOUND");
    }
    return { data, count: data.length };
  }
};

// src/routes/cicatriz/analytics-cicatriz-route.ts
var paramsSchema = z20.object({
  id: z20.string()
});
var analyticsCicatrizRoute = async (app2) => {
  app2.get(
    "/analytics/:id",
    {
      schema: {
        params: paramsSchema,
        summary: "Gerar analytics de cicatriz por id",
        tags: ["Cicatriz"],
        operationId: "analyticsCicatriz",
        response: {
          200: analyticsCicatrizSchema,
          400: z20.object({
            message: z20.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.getCicatrizDetails({
          id
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/cicatriz/create-cicatriz-route.ts
import { z as z21 } from "zod";
var bodySchema = z21.object({
  collections: z21.array(z21.string()),
  bbox: z21.array(z21.number()).length(4),
  datetime: z21.string(),
  limit: z21.number().optional(),
  ignore_existing: z21.boolean().optional()
});
var createCicatrizRoute = async (app2) => {
  app2.post(
    "/create",
    {
      schema: {
        body: bodySchema,
        summary: "Criar processamento de cicatriz",
        tags: ["Cicatriz"],
        operationId: "stacSearch",
        response: {
          200: z21.object({
            jobId: z21.string(),
            status: z21.string(),
            message: z21.string()
          }),
          400: z21.object({
            message: z21.string()
          })
        }
      }
    },
    async (request, reply) => {
      const {
        collections,
        bbox: bbox2,
        datetime,
        limit,
        ignore_existing,
        token: JWT
      } = request.body;
      if (!JWT) {
        return reply.status(401 /* UNAUTHORIZED */).send({
          message: "JWT n\xE3o fornecido"
        });
      }
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.createCicatriz({
          collections,
          bbox: bbox2,
          datetime,
          limit,
          JWT,
          ignore_existing
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(201 /* CREATED */).send(data);
    }
  );
};

// src/routes/cicatriz/finalize-cicatriz-route.ts
import z22 from "zod";
var finalizeCicatrizRoute = async (app2) => {
  app2.post(
    "/finalize",
    {
      schema: {
        summary: "Finaliza o processamento de uma cicatriz",
        tags: ["Cicatriz"],
        operationId: "finalizeCicatriz",
        consumes: ["multipart/form-data"],
        querystring: z22.object({
          jobId: z22.string(),
          status: z22.enum(scarStatus)
        }),
        response: {
          [200 /* OK */]: z22.object({
            message: z22.string()
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z22.object({
            message: z22.string()
          })
        }
      }
    },
    async (request, reply) => {
      const req = request;
      const { jobId, status } = request.query;
      const data = await req.file();
      const cicatrizController = new CicatrizController();
      const [error2] = await catchError(
        cicatrizController.finalizeCicatriz({ data, jobId, status })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send({
        message: "Upload realizado com sucesso"
      });
    }
  );
};

// src/routes/cicatriz/search-all-cicatriz.ts
import { z as z23 } from "zod";
var querySchema = z23.object({
  startDate: z23.coerce.date().optional(),
  endDate: z23.coerce.date().optional(),
  limit: z23.coerce.number().optional(),
  offset: z23.coerce.number().optional()
});
var searchAllCicatrizRoute = async (app2) => {
  app2.get(
    "/all",
    {
      schema: {
        querystring: querySchema,
        summary: "Pesquisar todas as imagens de cicatriz",
        tags: ["Cicatriz"],
        operationId: "allCicatriz",
        response: {
          201: allCicatrizSchema,
          400: z23.object({
            message: z23.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { startDate, endDate, limit, offset } = request.query;
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.getAllCicatriz({
          startDate,
          endDate,
          limit,
          offset
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/cicatriz/search-bbox-route.ts
import { z as z24 } from "zod";
var querySchema2 = z24.object({
  bbox: z24.array(z24.coerce.number()).length(4),
  startDate: z24.coerce.date().optional(),
  endDate: z24.coerce.date().optional(),
  limit: z24.coerce.number().optional(),
  offset: z24.coerce.number().optional()
});
var searchCicatrizByBboxRoute = async (app2) => {
  app2.get(
    "/bbox",
    {
      schema: {
        querystring: querySchema2,
        summary: "Pesquisar imagens de queimada por bbox",
        tags: ["Cicatriz"],
        operationId: "bboxCicatriz",
        response: {
          201: cicatrizBboxResponseSchema,
          400: z24.object({
            message: z24.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { bbox: bbox2, startDate, endDate, limit, offset } = request.query;
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.getCicatrizByBbox({
          bbox: bbox2,
          startDate,
          endDate,
          limit,
          offset
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/cicatriz/search-id-route.ts
import { z as z25 } from "zod";
var paramsSchema2 = z25.object({
  id: z25.string()
});
var searchCicatrizByIdRoute = async (app2) => {
  app2.get(
    "/:id",
    {
      schema: {
        params: paramsSchema2,
        summary: "Pesquisar imagens de queimada por id",
        tags: ["Cicatriz"],
        operationId: "searchCicatrizById",
        response: {
          201: cicatrizSchema,
          400: z25.object({
            message: z25.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.getCicatrizById({
          id
        })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send(data);
    }
  );
};

// src/routes/cicatriz/status-route.ts
import { z as z26 } from "zod";
var statusCicatrizRoute = async (app2) => {
  app2.get(
    "/check/:jobId",
    {
      schema: {
        summary: "Checa o status do processamento de uma cicatriz",
        params: z26.object({
          jobId: z26.string()
        }),
        tags: ["Cicatriz"],
        operationId: "scarCheck",
        response: {
          200: z26.object({
            status: z26.enum(scarStatus),
            jobId: z26.string()
          }),
          400: z26.object({
            message: z26.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { jobId } = request.params;
      const cicatrizController = new CicatrizController();
      const [error2, data] = await catchError(
        cicatrizController.getStatusCicatriz({ jobId })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(201 /* CREATED */).send(data);
    }
  );
};

// src/routes/cicatriz/test-route.ts
import { z as z27 } from "zod";
var testRoute = async (app2) => {
  app2.post(
    "/test",
    {
      schema: {
        summary: "Checa o status do processamento de uma cicatriz",
        body: NVDIResultSchema,
        querystring: z27.object({
          jobId: z27.string()
        }),
        tags: ["Cicatriz"],
        operationId: "test",
        response: {
          200: z27.object({
            message: z27.string()
          }),
          400: z27.object({
            message: z27.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { bbox_real, area_stats, ndvi_stats } = request.body;
      const { jobId } = request.query;
      logger.info("bbox_real", bbox_real);
      logger.info("area_stats", area_stats);
      logger.info("ndvi_stats", ndvi_stats);
      logger.info("jobId", jobId);
      return reply.status(200 /* OK */).send({ message: "status ok" });
    }
  );
};

// src/routes/cicatriz/index.ts
var routes3 = [
  { route: searchCicatrizByBboxRoute, private: true },
  { route: statusCicatrizRoute, private: true },
  { route: createCicatrizRoute, private: true },
  { route: finalizeCicatrizRoute, private: true },
  { route: searchAllCicatrizRoute, private: true },
  { route: searchCicatrizByIdRoute, private: true },
  { route: analyticsCicatrizRoute, private: true },
  { route: testRoute, private: false }
];
var cicatrizRoute = "/cicatriz";
var cicatrizRoutes = registerPrefix(routes3, cicatrizRoute);

// src/routes/example/hello-world.ts
import z28 from "zod";

// src/controllers/ExampleController.ts
var ExampleController = class {
  constructor(error2) {
    this.error = error2;
  }
  async getHelloWorld() {
    if (this.error) {
      throw new CustomError("Erro de exemplo", 500, "EXAMPLE_ERROR");
    }
    return "Hello, world!";
  }
};

// src/routes/example/hello-world.ts
var helloWorldRoute = async (app2) => {
  app2.get(
    "/hello-world",
    {
      schema: {
        summary: "Example route",
        tags: ["Example"],
        operationId: "helloWorld",
        // body: z.object({}),
        // params: z.object({}),
        // body: z.object({
        //   name: z.string(),
        // }),
        response: {
          [200 /* OK */]: z28.object({
            message: z28.string()
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z28.object({
            message: z28.string()
          })
        }
      }
    },
    async (request, reply) => {
      const exampleController = new ExampleController(false);
      const [error2, data] = await catchError(exampleController.getHelloWorld());
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send({
        message: data
      });
    }
  );
};

// src/routes/example/index.ts
var routes4 = [{ route: helloWorldRoute, private: false }];
var exampleRoute = "/api";
var exampleRoutes = registerPrefix(routes4, exampleRoute);

// src/routes/stac/search.ts
import fs2 from "node:fs";
import path2 from "node:path";
import axios2 from "axios";
import { z as z29 } from "zod";

// src/utils/path.ts
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var getDirname = () => {
  if (typeof __dirname !== "undefined") {
    return __dirname;
  }
  return dirname(fileURLToPath(import.meta.url));
};

// src/routes/stac/search.ts
var bodySchema2 = z29.object({
  collections: z29.array(z29.string()),
  bbox: z29.array(z29.number()).length(4),
  datetime: z29.string(),
  limit: z29.number().optional()
});
var stacSearchRoute = async (app2) => {
  app2.post(
    "/search",
    {
      schema: {
        body: bodySchema2,
        summary: "Pesquisar imagens STAC",
        tags: ["STAC"],
        operationId: "stacSearch",
        response: {
          200: z29.object({
            message: z29.string(),
            imagePath: z29.string()
          }),
          400: z29.object({
            message: z29.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { collections, bbox: bbox2, datetime, limit } = request.body;
      const stacUrl = "https://data.inpe.br/bdc/stac/v1/search";
      const [fetchError, data] = await catchError(
        http(stacUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            collections,
            bbox: bbox2,
            datetime,
            limit: limit || 10
          })
        })
      );
      if (fetchError) {
        const { statusCode, message, stack } = fetchError;
        logger.error("Erro ao buscar dados STAC:", stack);
        return reply.code(statusCode).send({
          message: `Erro ao buscar dados STAC. Erro: ${message}`
        });
      }
      logger.success(data);
      const features = data.features;
      if (!features || features.length === 0) {
        logger.warn("Nenhum dado encontrado. Contexto:", data.context);
        return reply.code(404).send({
          message: "Nenhuma imagem encontrada para os crit\xE9rios especificados."
        });
      }
      const item = features[0];
      logger.info("Item encontrado:", item);
      const assets = item.assets;
      const availableAssets = Object.keys(assets);
      logger.success("Assets dispon\xEDveis:", availableAssets);
      let imageUrl = assets.thumbnail?.href || assets.visual?.href;
      if (!imageUrl) {
        return reply.code(404).send({
          message: "Nenhuma imagem com asset visual ou thumbnail dispon\xEDvel."
        });
      }
      logger.info(assets);
      imageUrl = imageUrl.replace(/^\/vsicurl\//, "");
      logger.info("Baixando imagem de:", imageUrl);
      const fileName = path2.basename(imageUrl);
      const __dirname2 = getDirname();
      const imagesDir = path2.join(__dirname2, "..", "images");
      if (!fs2.existsSync(imagesDir)) {
        fs2.mkdirSync(imagesDir);
      }
      const localPath = path2.join(imagesDir, fileName);
      const [axiosError, imageResponse] = await catchError(
        axios2.get(imageUrl, {
          responseType: "stream"
        })
      );
      if (axiosError) {
        const { statusCode, message } = axiosError;
        return reply.code(statusCode).send({
          message: `Erro ao baixar a imagem. Erro: ${message}`
        });
      }
      const writer = fs2.createWriteStream(localPath);
      const [errorStream] = await catchError(
        new Promise((resolve, reject) => {
          imageResponse.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        })
      );
      if (errorStream) {
        const { statusCode, message } = errorStream;
        logger.error("Erro ao baixar a imagem:", errorStream);
        return reply.code(statusCode).send({
          message: `Erro ao baixar a imagem. Erro: ${message}`
        });
      }
      return reply.send({
        message: "Imagem baixada e salva com sucesso.",
        imagePath: localPath
      });
    }
  );
};

// src/routes/stac/index.ts
var routes5 = [{ route: stacSearchRoute, private: true }];
var burnPrefix = "/stac";
var burnRoutes = registerPrefix(routes5, burnPrefix);

// src/routes/user/login-route.ts
import z31 from "zod";

// src/controllers/UserController.ts
import * as SQL from "drizzle-orm";

// src/controllers/CryptoController.ts
import bcrypt from "bcryptjs";
var CryptoController = class {
  saltRounds;
  constructor() {
    this.saltRounds = 7;
  }
  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }
  async verifyPasswordMatch(password, hash) {
    return await bcrypt.compare(password, hash);
  }
  async verifyPassword(password, hash) {
    const isValidPassword = await this.verifyPasswordMatch(password, hash);
    return isValidPassword;
  }
};

// src/controllers/UserController.ts
var UserController = class {
  async login({ email, password }) {
    const cryptoInstance = new CryptoController();
    const authInstance = new AuthController();
    const result = await db.select().from(users).where(SQL.eq(users.email, email));
    if (result.length === 0) {
      throw new CustomError("Usu\xE1rio n\xE3o encontrado", 404, "NOT_FOUND_USER");
    }
    const user = result[0];
    const [error2, data] = await catchError(
      cryptoInstance.verifyPassword(password, user.password)
    );
    if (error2) {
      throw new CustomError(
        "Erro ao verificar senha",
        500,
        "ERROR_VERIFY_PASSWORD"
      );
    }
    if (!data) {
      throw new CustomError("Senha inv\xE1lida", 401, "INVALID_PASSWORD");
    }
    if (user.removedAt) {
      const existentUser = await db.update(users).set({ removedAt: null }).where(SQL.eq(users.id, user.id)).returning();
      const token2 = authInstance.generateToken(
        existentUser[0].id,
        existentUser[0].email
      );
      const refreshToken2 = authInstance.generateRefreshToken(
        existentUser[0].id,
        existentUser[0].email
      );
      return {
        id: existentUser[0].id,
        name: existentUser[0].name,
        email: existentUser[0].email,
        token: token2,
        refreshToken: refreshToken2
      };
    }
    const token = authInstance.generateToken(user.id, user.email);
    const refreshToken = authInstance.generateRefreshToken(user.id, user.email);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refreshToken
    };
  }
  async register({ name, email, password }) {
    const cryptoInstance = new CryptoController();
    const authInstance = new AuthController();
    const hashedPassword = await cryptoInstance.hashPassword(password);
    const result = await db.insert(users).values({
      name,
      email,
      password: hashedPassword
    }).returning();
    const token = authInstance.generateToken(result[0].id, result[0].email);
    const refreshToken = authInstance.generateRefreshToken(
      result[0].id,
      result[0].email
    );
    return {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      token,
      refreshToken
    };
  }
  async updateUser({ id, name, email, password }) {
    const cryptoInstance = new CryptoController();
    if (!id) {
      throw new CustomError(
        "ID do usu\xE1rio n\xE3o informado",
        400,
        "BAD_REQUEST_ID_USER"
      );
    }
    const user = await db.select().from(users).where(SQL.eq(users.id, id));
    if (user.length === 0) {
      throw new CustomError("Usu\xE1rio n\xE3o encontrado", 404, "NOT_FOUND_USER");
    }
    const hashedPassword = password ? await cryptoInstance.hashPassword(password) : user[0].password;
    const result = await db.update(users).set({
      name: name || user[0].name,
      email: email || user[0].email,
      password: hashedPassword
    }).where(SQL.eq(users.id, id)).returning();
    return {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      createdAt: result[0].createdAt
    };
  }
};

// src/routes/user/schema/zod.ts
import { z as z30 } from "zod";
var userSchema = z30.object({
  id: z30.number(),
  name: z30.string().min(3).max(60),
  email: z30.string().email(),
  token: z30.string(),
  refreshToken: z30.string()
});
var updateUserSchema = userSchema.omit({
  token: true,
  refreshToken: true
}).extend({ password: z30.string().optional() }).partial();
var responseUpdateUserSchema = userSchema.omit({
  token: true,
  refreshToken: true
}).extend({ createdAt: z30.date() });
var loginSchema = userSchema.pick({ email: true }).extend({
  password: z30.string().min(6).max(60)
});
var registerSchema = userSchema.omit({
  token: true,
  refreshToken: true,
  id: true
}).extend({
  password: z30.string().min(6).max(60)
});

// src/routes/user/login-route.ts
var loginUserRoute = async (app2) => {
  app2.post(
    "/login",
    {
      schema: {
        summary: "Login an user",
        tags: ["User"],
        operationId: "login",
        body: loginSchema,
        response: {
          [200 /* OK */]: userSchema,
          [500 /* INTERNAL_SERVER_ERROR */]: z31.object({
            message: z31.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const userController = new UserController();
      const [error2, data] = await catchError(
        userController.login({ email, password })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/register-route.ts
import z32 from "zod";
var registerUserRoute = async (app2) => {
  app2.post(
    "/register",
    {
      schema: {
        summary: "Register an user",
        tags: ["User"],
        operationId: "registerUser",
        body: registerSchema,
        response: {
          [200 /* OK */]: userSchema,
          [500 /* INTERNAL_SERVER_ERROR */]: z32.object({
            message: z32.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password, name } = request.body;
      const userController = new UserController();
      const [error2, data] = await catchError(
        userController.register({ email, password, name })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/update-user-route.ts
import z33 from "zod";
var updateUserRoute = async (app2) => {
  app2.patch(
    "/edit",
    {
      schema: {
        summary: "Update an user",
        tags: ["User"],
        operationId: "updateUser",
        body: updateUserSchema,
        response: {
          [200 /* OK */]: responseUpdateUserSchema,
          [500 /* INTERNAL_SERVER_ERROR */]: z33.object({
            message: z33.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id, email, password, name } = request.body;
      const userController = new UserController();
      const [error2, data] = await catchError(
        userController.updateUser({ id, email, password, name })
      );
      if (error2) {
        return reply.status(error2.statusCode).send({
          message: error2.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/index.ts
var routes6 = [
  { route: loginUserRoute, private: false },
  { route: registerUserRoute, private: false },
  { route: updateUserRoute, private: true }
];
var userRoute = "/users";
var userRoutes = registerPrefix(routes6, userRoute);

// src/routes/index.ts
var routes7 = [];
routes7.push(exampleRoutes);
routes7.push(uploadRoutes);
routes7.push(userRoutes);
routes7.push(burnRoutes);
routes7.push(cicatrizRoutes);
routes7.push(analyticsRoutes);

// src/config/routes.ts
function registerRoutes(app2) {
  for (const route of routes7) {
    app2.register(route);
  }
  app2.setNotFoundHandler((req, res) => {
    res.status(404).send({
      message: "P\xE1gina n\xE3o encontrada. Verifique a URL e tente novamente."
    });
  });
}

// src/index.ts
var app = fastify().withTypeProvider();
registerPlugins(app);
registerRoutes(app);
app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${portSettings.PORT}`);
  console.log(`See the documentation on ${portSettings.BASE_URL}/docs`);
});
