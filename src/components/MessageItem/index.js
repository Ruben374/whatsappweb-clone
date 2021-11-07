import React, { useState, useEffect } from 'react'
import './styles.css'

export default ({ data, user }) => {
  const [time, settime] = useState('')
  useEffect(() => {
    if (data.date > 0) {
      let d = new Date(data.date.seconds * 1000)
      let hours = d.getHours()
      let minutes = d.getMinutes()
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      settime(`${hours}:${minutes}`)
    }
  }, [data])

  return (
    <div
      className='messageline'
      style={{
        justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
      }}
    >
      <div
        className='messageitem'
        style={{
          backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF'
        }}
      >
        <div className='messagetext'>{data.body}</div>
        <div className='messagedate'>{time}</div>
      </div>
    </div>
  )
}
