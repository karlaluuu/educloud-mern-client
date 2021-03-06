import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import Service from '../service'
import PageEvent from './PageEvent'
import PageEventEdit from './PageEventEdit'

const localizer = momentLocalizer(moment)

const EventCalendar = (props) => {
  const [ events, setEvents ] = useState([])
  const [ selectedEventID, setSelectedEventID ] = useState('')
  const [open, setOpen] = useState(0)
  const [date, setDate] = useState({start: new Date(), end: new Date()})
  const {store} = props
  const [auth, setAuth] = useState(false);
  //const apiUrl = "http://localhost:3001/api/events";
  useEffect(()=>{
    //fetch('/api/events')
      //.then(res => res.json())
      //.then(data => setEvents(data))
    const fetch = async () => {
      var user = store.getCurrentUser();
      if(user){
            setAuth(true);
          var userId = user._id;
          const service = new Service();
          service.get(`api/events/${userId}`).then((response) => {
            console.log(response.data);
          setEvents(response.data)
          
          }).catch(err => {
            console.log("ERROR IN fetch() : " + err)
        })
      } else {
        setAuth(false);
      }
        
      
    };
    fetch();
    }, []);

  const handleEventSelect = (event, e) => {
    //props.history.push(`/event/${event._id}`)
    setSelectedEventID(event._id)
    setOpen(2);
  }

  const handleSelect = ({start,end}) => { 
    setDate({start: start, end: end});
    console.log('In handleSelect start : ' + date.start + ' end : ' + date.end);
    setOpen(1);
  }
  const mapToRBCFormat = e => Object.assign({}, e, {
    start: new Date(e.start),
    end: new Date(e.end)
})

  
  return (
    
    <div>
      {
        (open === 0 && auth) &&
        <div className='c-bigcalendar-container'>
          <Calendar
            selectable
            localizer={localizer}
            events={events.map(mapToRBCFormat )}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={handleEventSelect}
            onSelectSlot={handleSelect}
            startAccessor="start"
            endAccessor="end"
          />     
        </div>
      }
      {
        (open === 1 && auth) &&
        <PageEvent store={store}/>
      }
       {
        (open === 2 && auth) &&
        <PageEventEdit selectedEventID = {selectedEventID}  store = {store}/>
      }
      {
        (!auth) &&
          null
      }
    </div>
    
  )
}

export default EventCalendar
