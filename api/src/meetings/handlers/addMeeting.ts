
import { pool } from "../../database"



async function addMeeting(newMeeting: any) {
    const { groupName, startDate, endDate, meetingInfo, meetingRoom } = newMeeting;

    const query = `INSERT INTO meeting.meetings (groupId, startDate, endDate, meetingInfo, meetingRoom)
    SELECT devgroups.id AS groupId, ? , ? , ? ,?
    FROM devgroups
    WHERE devgroups.groupName = ?`
    const results = await pool.execute(query, [startDate, endDate, meetingInfo, meetingRoom, groupName]);
    const [data] = results;

    return data;
}
export { addMeeting }


