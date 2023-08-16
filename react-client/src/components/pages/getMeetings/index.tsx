import { useCallback, useEffect, useState } from "react"

import { WithLoading } from "../../ui-components/withLoading";
import { IMeeting, getMeetingsService, selectedMeetingService } from "./api";
import MeetingsTable from "./table";
import { Dropdown } from "primereact/dropdown";
import { getGroupsService } from "../getGroups/api";
import { Button } from "primereact/button";


export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Array<IMeeting>>([])
    const [isMeetingLoading, setIsMeetingLoading] = useState(false)
    const [groupNames, setGroupNames] = useState([]);
    const [groupName, setGroupName] = useState("");

    const handlerGroupNameCallback = useCallback((e: any) => {
        setGroupName(e.target.value)
        handleSelectedApi(e.target.value)
    }, [groupName])


    async function getMeetingsAction() {
        try {
            setIsMeetingLoading(true)
            const result = await getMeetingsService()
            setMeetings(result)
        } catch (error) {
            alert("error")
        } finally {
            setIsMeetingLoading(false)
        }
    }

    async function getGroupsNames() {
        const result = await getGroupsService()
        console.log(result);

        return result.map((e) => e.groupName);
    }

    async function fetchGroupsNames() {
        const names: any = await getGroupsNames();
        console.log(names);
        setGroupNames(names);
    }


    useEffect(() => {
        getMeetingsAction()
        fetchGroupsNames();
        return () => {
            console.log("Unmount!")
        }
    }, [])


    async function handleSelectedApi(selectedGroup: string) {
        try {
            const result = await selectedMeetingService(selectedGroup)
            setMeetings(result)
        } catch (error) {
            alert("error")
        }
    }

    return <div >
        <h1>Meetings</h1>
        <WithLoading isLoading={isMeetingLoading}>
            <Dropdown
                value={groupName}
                onChange={handlerGroupNameCallback}
                options={groupNames.map((e) => ({ label: e, value: e }))}
                optionLabel="label"
                editable
                placeholder="Select Group"
                className="w-full md:w-14rem"
            />
            <Button label="All" onClick={getMeetingsAction} />
            <MeetingsTable key={Math.random() * 999} meetings={meetings} />
        </WithLoading>
    </div>
}


