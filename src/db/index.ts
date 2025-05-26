import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const db = drizzle(process.env.DATABASE_URL!);
