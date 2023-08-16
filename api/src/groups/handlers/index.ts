
import { pool } from "../../database"
async function getAllGroups() {
    const query = "SELECT * FROM meeting.devgroups;"
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}
export { getAllGroups }
