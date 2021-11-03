import React from 'react'
import './styles.css'

export default ({data,user}) => {
  return (
    <div className='messageline'
    style={{justifyContent:user.id=== data.author?'flex-end':'flex-start'}}
    >
      <div className='messageitem' 
       style={{backgroundColor:user.id=== data.author?'#DCF8C6':'#FFF'}}
      >
        <div className='messagetext'>{data.body}</div>
        <div className='messagedate'>19:00</div>
      </div>
    </div>
  )
}
