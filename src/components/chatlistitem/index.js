import React, { useState, useEffect } from 'react'
import './styles.css'

export default ({ onClick, active, data }) => {
  const [time, settime] = useState('')

  useEffect(() => {
    if (data.lastmessagedate > 0) {
      let d = new Date(data.lastmessagedate.seconds * 1000)
      let hours = d.getHours()
      let minutes = d.getMinutes()
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      settime(`${hours}:${minutes}`)
    }
  }, [data])
  return (
    <div className={`chatlistitem ${active ? 'active' : ''}`} onClick={onClick}>
      <img className='chatlistitem--avatar' src={data.image} alt='' />
      <div className='chatlistitem--lines'>
        <div className='chatlistitem--line'>
          <div className='chatlistitem--name'>{data.title}</div>
          <div className='chatlistitem--date'>{time}</div>
        </div>
        <div className='chatlistitem--line'>
          <div className='chatlistitem--lastmsg'>
            <p>{data.lastmessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
