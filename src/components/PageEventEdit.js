import React, { useState, useEffect } from 'react'
import Service from '../service'
import  Calendar from './calendar';



const PageEventEdit = (props) => {
  const [ eventData, setEventData ] = useState({
    _id: '',
    title: '',
    start: '',
    end: '',
    info: ''
  })
  const {selectedEventID,store} = props;
  const [back, setBack] = useState(false);
  


  useEffect(()=>{
    /* fetch(`/api/events/${match.params.id}`)
      .then(res => res.json())
      .then(data => setEventData({
        _id: data._id || '',
        title: data.title || '',
        start: data.start || '',
        end: data.end || '',
        info: data.info || ''
      }))
      .catch(err => console.log(err)) */
      const fetch = async () => {
        console.log("inside pageEventEdit")
        const service = new Service();
        service.get(`api/event/${selectedEventID}`)
            .then((res) => setEventData({
              _id: res.data._id,
              title: res.data.title ,
              start: res.data.start ,
              end: res.data.end ,
              info: res.data.info
            })).catch(err => console.log(err))
      }
      fetch();
  },[]);

  const onChange = (e) => {
    e.persist();
    setEventData({...eventData, [e.target.name]: e.target.value});
  }

  const onDelete = () => {

  }
  const onUpdate = () => {
    const service = new Service();
    service.post(`api/event/${selectedEventID}`,eventData)
          .then((res) => {
            setBack(true);
            console.log(res.data.title);
          })
          .catch(
            err => {console.log(err);setBack(false)}
          )
  }
  const onCancel = () => {
    setBack(true);
  }
  return (
    <div>
      {!back
    ?<div className='c-page-container'>
      <form onSubmit={onUpdate}>
        <legend>Event Details</legend>
        <div className="form-group ">
          <label className="control-label " htmlFor="title">
            Title
          </label>
          <input className="form-control" name="title" type="text" value={eventData.title} onChange={onChange}/>
        </div>
        <div className="form-group ">
          <label className="control-label " htmlFor="start">
            Start Date
          </label>
          <input className="form-control" name="start" type="text" value={eventData.start} onChange={onChange}/>
        </div>
        <div className="form-group ">
          <label className="control-label " htmlFor="end">
            End Date
          </label>
          <input className="form-control" name="end" type="text" value={eventData.end} onChange={onChange}/>
          <small className="hint">* End date is exclusive in the date range.</small>
        </div>
        <div className="form-group ">
          <label className="control-label " htmlFor="info">
            Details
          </label>
          <textarea className="form-control" cols={40} name="info" rows={5} value={eventData.info} onChange={onChange}/>
        </div>
        <div className="form-group">
          <div>
            <button className="btn btn-secondary" disabled>Cancel</button>{' '}
            <button className="btn btn-danger">Delete</button>{' '}
            <button className="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
    : <Calendar store = {store}/>
      }
    </div>
  )
}

export default PageEventEdit
