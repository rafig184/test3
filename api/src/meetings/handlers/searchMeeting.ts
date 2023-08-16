
import { log } from "winston";
import { pool } from "../../database"



async function getMeetingSearch(groupName: any) {
    console.log("meeting id : ", groupName);

    if (!groupName) throw new Error("Mising search input")
    const query = `SELECT 
    meeting.meetings.id,
    meeting.devgroups.groupName,
    meeting.meetings.startDate,
    meeting.meetings.endDate,
    meeting.meetings.meetingInfo,
    meeting.meetings.meetingRoom
FROM
    meeting.meetings
        JOIN
    meeting.devgroups ON meeting.meetings.groupId = meeting.devgroups.id 
    where devgroups.groupName like ?
ORDER BY meeting.meetings.id ASC;`
    const results = await pool.execute(query, [`%${groupName}%`]);
    const [data] = results;
    console.log(data);

    return data;
}
export { getMeetingSearch }
