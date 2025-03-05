import postgres from "postgres";

const sql = postgres(process.env.NEON_DATABASE_URL, { ssl: "require" });

export default async function handler(req, res) {
  try {
    const data = await sql`SELECT * FROM your_table_name;`;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
