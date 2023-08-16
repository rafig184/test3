import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IMeeting } from '../api';




export default function MeetingsTable(props: { meetings: Array<IMeeting> }) {
    if (!props.meetings || props.meetings.length === 0) return null;
    console.log(props.meetings);


    return <div>
        <div>
            <DataTable style={{ marginTop: "2%" }} value={props.meetings} tableStyle={{ minWidth: '50rem' }}>
                {Object.keys(props.meetings[0]).map(key => {
                    return <Column key={Math.random() * 999} field={key} header={key} ></Column>
                })
                }
            </DataTable>
        </div>
    </div>
} 