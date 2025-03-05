import postgres from "postgres";

const sql = postgres({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: "require",
});

export default async function handler(req, res) {
  try {
    // Fetch all table names in the public schema
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

    // Initialize an object to hold tables and their rows
    const tablesAndRows = {};

    // Iterate over each table to fetch its rows
    for (const { table_name } of tables) {
      const rows = await sql.unsafe(`SELECT * FROM ${table_name};`);
      tablesAndRows[table_name] = rows;
    }

    res.status(200).json(tablesAndRows);
  } catch (error) {
    console.error("Error fetching tables and rows:", error);
    res.status(500).json({ error: "Failed to fetch tables and rows" });
  }
}
