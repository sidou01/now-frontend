import React from "react"
import { useQuery } from "@apollo/react-hooks"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import gql from "graphql-tag"
import { navigate } from "@reach/router"

const GET_APPOINTMENTS = gql`
  query GET_APPOINTMENTS {
    fetchUserAppointments(first: 10) {
      id
      title
      service {
        id
        fullName
        email
        serviceType
      }
      start
      end
      duration
      createdTime
    }
  }
`
export default props => {
  const calendarComponentRef = React.createRef()
  const {
    loading,
    data: { fetchUserAppointments }
  } = useQuery(GET_APPOINTMENTS)

  const gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate("2000-01-01") // call a method on the Calendar object
  }

  // handleDateClick = arg => {
  //   if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
  //     this.setState({
  //       // add new event data
  //       calendarEvents: this.state.calendarEvents.concat({
  //         // creates a new array
  //         title: "New Event",
  //         start: arg.date,
  //         allDay: arg.allDay
  //       })
  //     })
  //   }
  // }
  if (loading) {
    return <h1>loading...</h1>
  }

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      ref={calendarComponentRef}
      weekends={false}
      events={fetchUserAppointments}
      eventClick={function(info) {
        console.log(info.event)
        navigate(`/service/${info.event.extendedProps.service.id}`)
      }}
    />
  )
}
