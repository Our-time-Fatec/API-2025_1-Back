// src/index.ts
import { fastify } from "fastify";

// src/settings/env.ts
import { z } from "zod";
var envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  WEB_URL: z.string().url(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
  CLOUD_FRONT_CDN: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string()
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

// src/config/logger.ts
import pc from "picocolors";
async function logger(app2) {
  let startTime;
  app2.addHook("onRequest", (request, reply, done) => {
    startTime = Date.now();
    done();
  });
  app2.addHook("onResponse", (request, reply, done) => {
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
    done();
  });
}

// src/config/plugins.ts
import multipart from "@fastify/multipart";
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
  logger(app2);
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
        id: decoded.id
      };
    } else {
      request.body = {
        ...typeof request.body === "object" ? request.body : {},
        id: decoded.id
      };
    }
  } catch (err) {
    return reply.status(403).send({ message: "Token inv\xE1lido ou expirado" });
  }
};

// src/utils/registerPrefix.ts
var registerPrefix = (routes6, prefix) => {
  return async (app2) => {
    for (const { route, private: isPrivate } of routes6) {
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

// src/routes/aws/upload.ts
import z2 from "zod";

// src/drizzle/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// src/drizzle/schemas/processImage.ts
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
var processImage = pgTable("process_image", {
  id: serial("id").primaryKey(),
  fileLink: varchar("file_link").notNull(),
  referencesId: integer("references_id"),
  createdAt: timestamp("created_at").defaultNow(),
  removedAt: timestamp("removed_at")
});

// src/drizzle/schemas/uploads.ts
import {
  pgTable as pgTable2,
  serial as serial2,
  timestamp as timestamp2,
  varchar as varchar2
} from "drizzle-orm/pg-core";
var uploads = pgTable2("uploads", {
  id: serial2("id").primaryKey(),
  url: varchar2("url").notNull(),
  originalFileName: varchar2("original_filename").notNull(),
  createdAt: timestamp2("created_at").defaultNow(),
  removedAt: timestamp2("removed_at")
});

// src/drizzle/client.ts
var pg = postgres(env.POSTGRES_URL, {});
var db = drizzle(pg, {
  schema: {
    processImage,
    uploads
  }
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

// src/utils/catchError.ts
async function catchError(promise, customError) {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    const error = err instanceof CustomError ? err : customError ? Object.assign(customError, { message: String(err) }) : new CustomError(String(err));
    return [error, null];
  }
}

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
          [200 /* OK */]: z2.object({
            url: z2.string().url(),
            originalFileName: z2.string()
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z2.object({
            message: z2.string()
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
      const [error, uploadResult] = await catchError(
        uploadToS3({
          fileBuffer: buffer,
          fileName: data.filename,
          mimeType: data.mimetype,
          folder
        })
      );
      if (error) {
        return reply.status(500 /* INTERNAL_SERVER_ERROR */).send({
          message: error.message
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
var routes = [{ route: uploadRoute, private: true }];
var uploadPrefix = "/upload";
var uploadRoutes = registerPrefix(routes, uploadPrefix);

// src/routes/example/hello-world.ts
import z3 from "zod";

// src/controllers/ExampleController.ts
var ExampleController = class {
  constructor(error) {
    this.error = error;
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
          [200 /* OK */]: z3.object({
            message: z3.string()
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z3.object({
            message: z3.string()
          })
        }
      }
    },
    async (request, reply) => {
      const exampleController = new ExampleController(false);
      const [error, data] = await catchError(exampleController.getHelloWorld());
      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message
        });
      }
      return reply.status(200 /* OK */).send({
        message: data
      });
    }
  );
};

// src/routes/example/index.ts
var routes2 = [{ route: helloWorldRoute, private: false }];
var exampleRoute = "/api";
var exampleRoutes = registerPrefix(routes2, exampleRoute);

// src/routes/queimada/queimadas-route.ts
import z4 from "zod";

// src/controllers/QueimadaController.ts
var MOCK_QUEIMADA = [
  { id: "1", date: /* @__PURE__ */ new Date("2025-01-01"), bbox: [-46.2, -23.6, -43.9, -21.9] }
];
var QueimadaController = class {
  async getQueimadas({ date }) {
    const queimadas = MOCK_QUEIMADA;
    if (!date) return queimadas;
    const filtered = queimadas.filter((q) => q.date.getTime() === date.getTime());
    if (filtered.length === 0) {
      throw new CustomError("Nenhum dado encontrado", 404);
    }
    return filtered;
  }
};

// src/routes/queimada/queimadas-route.ts
var getQueimadaRoute = async (app2) => {
  app2.get(
    "",
    {
      schema: {
        summary: "Lista de queimadas registradas, geral ou por data.",
        tags: ["Queimadas"],
        operationId: "getQueimadas",
        querystring: z4.object({
          date: z4.coerce.date().optional()
        }),
        response: {
          [200 /* OK */]: z4.object({
            queimadas: z4.array(
              z4.object({
                id: z4.string(),
                date: z4.date(),
                bbox: z4.array(z4.number())
              })
            )
          }),
          [500 /* INTERNAL_SERVER_ERROR */]: z4.object({
            message: z4.string()
          })
        }
      }
    },
    async (request, reply) => {
      const controller = new QueimadaController();
      const { date } = request.query;
      const [error, data] = await catchError(controller.getQueimadas({ date }));
      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message
        });
      }
      return reply.status(200 /* OK */).send({
        queimadas: data
      });
    }
  );
};

// src/routes/queimada/index.ts
var routes3 = [{ route: getQueimadaRoute, private: false }];
var queimadaRoute = "/queimadas";
var queimadaRoutes = registerPrefix(routes3, queimadaRoute);

// src/routes/user/login-route.ts
import z6 from "zod";

// src/controllers/UserController.ts
import * as SQL from "drizzle-orm";

// src/drizzle/schemas/user.ts
import {
  pgTable as pgTable3,
  serial as serial3,
  timestamp as timestamp3,
  varchar as varchar3
} from "drizzle-orm/pg-core";
var users = pgTable3("users", {
  id: serial3("id").primaryKey(),
  name: varchar3("name", { length: 60 }).notNull(),
  email: varchar3("email").notNull().unique(),
  password: varchar3("password", { length: 100 }).notNull(),
  createdAt: timestamp3("created_at").notNull().defaultNow(),
  updatedAt: timestamp3("updated_at"),
  removedAt: timestamp3("removed_at")
});

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
    if (!isValidPassword) {
      throw new Error("Senha inv\xE1lida");
    }
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
    const [error, _] = await catchError(
      cryptoInstance.verifyPassword(password, user.password)
    );
    if (error) {
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
import { z as z5 } from "zod";
var userSchema = z5.object({
  id: z5.number(),
  name: z5.string().min(3).max(60),
  email: z5.string().email(),
  token: z5.string(),
  refreshToken: z5.string()
});
var updateUserSchema = userSchema.omit({
  token: true,
  refreshToken: true
}).extend({ password: z5.string().optional() }).partial();
var responseUpdateUserSchema = userSchema.omit({
  token: true,
  refreshToken: true
}).extend({ createdAt: z5.date() });
var loginSchema = userSchema.pick({ email: true }).extend({
  password: z5.string().min(6).max(60)
});
var registerSchema = userSchema.omit({
  token: true,
  refreshToken: true,
  id: true
}).extend({
  password: z5.string().min(6).max(60)
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
          [500 /* INTERNAL_SERVER_ERROR */]: z6.object({
            message: z6.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const userController = new UserController();
      const [error, data] = await catchError(
        userController.login({ email, password })
      );
      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/register-route.ts
import z7 from "zod";
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
          [500 /* INTERNAL_SERVER_ERROR */]: z7.object({
            message: z7.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password, name } = request.body;
      const userController = new UserController();
      const [error, data] = await catchError(
        userController.register({ email, password, name })
      );
      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/update-user-route.ts
import z8 from "zod";
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
          [500 /* INTERNAL_SERVER_ERROR */]: z8.object({
            message: z8.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id, email, password, name } = request.body;
      const userController = new UserController();
      const [error, data] = await catchError(
        userController.updateUser({ id, email, password, name })
      );
      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message
        });
      }
      return reply.status(200 /* OK */).send({
        ...data
      });
    }
  );
};

// src/routes/user/index.ts
var routes4 = [
  { route: loginUserRoute, private: false },
  { route: registerUserRoute, private: false },
  { route: updateUserRoute, private: true }
];
var userRoute = "/users";
var userRoutes = registerPrefix(routes4, userRoute);

// src/routes/index.ts
var routes5 = [];
routes5.push(exampleRoutes);
routes5.push(uploadRoutes);
routes5.push(userRoutes);
routes5.push(queimadaRoutes);

// src/config/routes.ts
function registerRoutes(app2) {
  for (const route of routes5) {
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
