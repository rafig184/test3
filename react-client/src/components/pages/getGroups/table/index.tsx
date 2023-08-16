import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IGroup } from '../api';




export default function GroupsTable(props: { groups: Array<IGroup> }) {
    if (!props.groups || props.groups.length === 0) return null;


    return <div>
        <div>
            <DataTable style={{ marginTop: "2%" }} value={props.groups} tableStyle={{ minWidth: '20rem' }}>
                {Object.keys(props.groups[0]).map(key => {
                    return <Column key={Math.random() * 999} field={key} header={key} ></Column>
                })
                }
            </DataTable>
        </div>
    </div>
} 