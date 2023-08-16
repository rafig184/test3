import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { useState, useCallback, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { IMeeting, getMeetingsService } from "../getMeetings/api";
import { getGroupsService } from "../getGroups/api";
import { InputText } from "primereact/inputtext";


const AddMeetinglPage = () => {
    const [groupName, setGroupName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [meetingInfo, setMeetingInfo] = useState("");
    const [meetingRoom, setMeetingRoom] = useState("");
    // const [dayDifference, setDaysDifference] = useState(0);
    const [groupsNames, setGroupsNames] = useState([])


    const meetingRooms = ["blue room", "green room", "yellow room", "red room"]

    const handlerGroupNameCallback = useCallback((e: any) => {
        setGroupName(e.target.value)
        console.log(e.target.value);
    }, [groupName])

    const handlerStartDateCallback = useCallback((e: any) => {
        setStartDate(e.target.value)
        console.log(new Date(e.target.value));
    }, [startDate])

    const handlerEndDateCallback = useCallback((e: any) => {
        setEndDate(e.target.value)
        console.log(e.target.value);
    }, [endDate])

    const handlerMeetingInfoCallback = useCallback((e: any) => {
        setMeetingInfo(e.target.value)
        console.log(e.target.value);
    }, [meetingInfo])

    const handlerMeetingRoomCallback = useCallback((e: any) => {
        setMeetingRoom(e.target.value)
        console.log(e.target.value);
    }, [meetingRoom])


    async function addMeetingService() {
        const meetingPayload: IMeeting = {
            groupName,
            startDate,
            endDate,
            meetingInfo,
            meetingRoom
        }
        console.log(meetingPayload);

        try {
            const allMeetings = await getMeetingsService();

            const overlappingMeetings = allMeetings.find(meeting =>
                meeting.groupName === groupName &&
                new Date(startDate) >= new Date(meeting.startDate) && new Date(startDate) <= new Date(meeting.endDate) ||
                new Date(endDate) >= new Date(meeting.startDate) && new Date(endDate) <= new Date(meeting.endDate) ||
                new Date(startDate) <= new Date(meeting.startDate) && new Date(endDate) >= new Date(meeting.endDate)
            );

            if (overlappingMeetings) {
                alert("Selected meeting is not available for the chosen date range.");
                return;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const result = await axios.post("http://localhost:4000/meetings/new-meeting", meetingPayload)
            alert(result.data.message);
            setGroupName("")
            setStartDate("")
            setEndDate("")
            setMeetingInfo("")
            setMeetingRoom("")
        } catch (err) {
            alert("Something went wrong!")
            console.log(err);
        }
    }

    async function getGroupsName() {
        const result = await getGroupsService()
        console.log(result);
        return result.map((e) => e.groupName);
    }
    useEffect(() => {
        async function fetchGroupsNames() {
            const groups: any = await getGroupsName();
            console.log(groups);
            setGroupsNames(groups);
        }
        fetchGroupsNames();

    }, []);


    return (
        <form >
            <span></span>
            <h2>Add new Meeting</h2>
            <div>
                <div>
                    <label htmlFor="text">Group : </label>
                </div>
                <div>
                    <Dropdown
                        value={groupName}
                        onChange={handlerGroupNameCallback}
                        options={groupsNames.map((e) => ({ label: e, value: e }))}
                        optionLabel="label"
                        editable
                        placeholder="Select a Group"
                        className="w-full md:w-14rem"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="text">From: </label>
                </div>
                <Calendar value={startDate} onChange={handlerStartDateCallback} showTime hourFormat="24" />

            </div>
            <div>
                <div>
                    <label htmlFor="text">To: </label>
                </div>
                <Calendar value={endDate} onChange={handlerEndDateCallback} showTime hourFormat="24" />
            </div>
            <div>
                <div>
                    <label htmlFor="text">Meeting Info: </label>
                </div>
                <InputText value={meetingInfo} onChange={handlerMeetingInfoCallback} required />
            </div>
            <div>
                <div>
                    <label htmlFor="text">Meeting Room: </label>
                </div>
                <Dropdown
                    value={meetingRoom}
                    onChange={handlerMeetingRoomCallback}
                    options={meetingRooms.map((e) => ({ label: e, value: e }))}
                    optionLabel="label"
                    editable
                    placeholder="Select a Room"
                    className="w-full md:w-14rem"
                />
            </div>
            <button style={{ marginTop: "5%", backgroundColor: "yellow" }} type="button" onClick={addMeetingService}>Add Meeting</button>
        </form>
    )

}


export default AddMeetinglPage



