import { useEffect, useState } from "react"
import { IGroup, getGroupsService } from "./api";
import GroupsTable from "./table";
import { WithLoading } from "../../ui-components/withLoading";


export default function GroupsPage() {
    const [groups, setGroups] = useState<Array<IGroup>>([])
    const [isGroupsLoading, setIsGroupsLoading] = useState(false)


    async function getGroupsAction() {
        try {
            setIsGroupsLoading(true)
            const result = await getGroupsService()
            setGroups(result)
        } catch (error) {
            alert("error")
        } finally {
            setIsGroupsLoading(false)
        }
    }

    useEffect(() => {
        getGroupsAction()
        return () => {
            console.log("Unmount!")
        }
    }, [])


    return <div >
        <h1>Groups</h1>
        <WithLoading isLoading={isGroupsLoading}>
            <GroupsTable key={Math.random() * 999} groups={groups} />
        </WithLoading>
    </div>
}


