import axios from "axios"

export interface IMeeting {
    // id: number,
    groupName: string,
    startDate: string,
    endDate: string,
    meetingInfo: string,
    meetingRoom: string
}


async function getMeetingsService(): Promise<Array<IMeeting>> {
    const { data, headers } = await axios.get(`http://localhost:4000/meetings`)
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}

async function selectedMeetingService(value: string): Promise<Array<IMeeting>> {
    const { data, headers } = await axios.get(`http://localhost:4000/meetings/search?q=${value}`)
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)

    const meeting: Array<IMeeting> = data.map(m => {

        return {
            id: m.id,
            groupName: m.groupName,
            startDate: m.startDate,
            endDate: m.endDate,
            meetingInfo: m.meetingInfo,
            meetingRoom: m.meetingRoom,
        }
    })
    return meeting;
}




export { getMeetingsService, selectedMeetingService }