
import { pool } from "../../database"
async function getAllMeetings() {
    const query = `SELECT 
    meeting.meetings.id,
    meeting.devgroups.groupName AS GroupName,
    meeting.meetings.startDate,
    meeting.meetings.endDate,
    meeting.meetings.meetingInfo,
    meeting.meetings.meetingRoom
FROM
    meeting.meetings
        JOIN
    meeting.devgroups ON meeting.meetings.groupId = meeting.devgroups.id
ORDER BY meeting.meetings.id ASC;`
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}
export { getAllMeetings }
