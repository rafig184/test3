import axios from "axios"

export interface IGroup {
    id: number,
    groupName: string
}


async function getGroupsService(): Promise<Array<IGroup>> {
    const { data, headers } = await axios.get(`http://localhost:4000/groups/`)
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)
    console.log(data);
    return data;
}





export { getGroupsService }