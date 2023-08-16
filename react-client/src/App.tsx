import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import GroupsPage from "./components/pages/getGroups"
import MeetingsPage from "./components/pages/getMeetings"
import AddMeetinglPage from "./components/pages/addMeeting"




interface IRoute {
  path: string,
  key: string,
  component: any,
  label?: string
}

const routes: Array<IRoute> = [
  {
    path: "/groups",
    component: <GroupsPage />,
    key: "groups",
    label: "All Groups |"
  },
  {
    path: "/meetings",
    component: <MeetingsPage />,
    key: "meetings",
    label: "All Meetings |"
  },
  {
    path: "/add-meeting",
    component: <AddMeetinglPage />,
    key: "add-meeting",
    label: "Add Meeting"
  },

]


function App() {


  return (
    <div>

      <div style={{ marginTop: "50px" }}>
        {routes.filter(r => r.label).map((route: IRoute) => {
          return <Link key={route.label} to={route.path} > {route.label} </Link>
        })}
        <Routes>
          {routes.map((route: IRoute) => {
            return <Route path={route.path} key={route.key} element={route.component} />
          })}
        </Routes>
      </div>
    </div>

  )
}

export default App
