import React, { useState, useEffect } from 'react'
import './styles.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export default ({ user, chatlist,show, setshow }) => {
  const [list, setlist] = useState([
    {
      id: 123,
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      nome: 'Ruben André'
    },
    {
      id: 123,
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      nome: 'Ruben André'
    },
    {
      id: 123,
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      nome: 'Ruben André'
    },
    {
      id: 123,
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      nome: 'Ruben André'
    }
  ])
  const handleClose =()=>{
      setshow(false)
  }
  return (
    <div className='newchat'  style={{left:show?0:-415}}>
      <div className='newchat--head'>
        <div className='newchat--backbutton' onClick={handleClose}>
          <ArrowBackIcon style={{ color: '#FFFF' }} />
        </div>
        <div className='newchat--headtitle'>Nova Conversa</div>
      </div>

      <div className='newchat--list'>
        {list.map((item, key) => (
          <div className='newchat--item' key={key}>
            <img className='newchat--itemavatar' src={item.avatar} alt='' />
            <div classNmae='newchat--itemname'>{item.nome}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
