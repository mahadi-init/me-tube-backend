import { SQL } from "bun";
import secrets from "../lib/secret";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { type DB } from "./kysely-types";
import { Pool } from "pg";

// bun connection
export const bun = new SQL(secrets.postgres);

// kysely connection
export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: secrets.postgres,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
