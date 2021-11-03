import React, { useState, useEffect } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import Chatlistitem from './components/chatlistitem'
import Chatintro from './components/chatintro'
import Chatwindow from './components/chatwindow'
import Login from './components/login'
import Newchat from './components/newchat'

import SearchIcon from '@material-ui/icons/Search'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './App.css'

export default () => {
  const [chatlist, setchatlist] = useState([
    {
      chatid: 1,
      title: 'fulano de tal',
      image: 'https://www.w3schools.com/howto/img_avatar2.png'
    },
    {
      chatid: 2,
      title: 'fulano de tal',
      image: 'https://www.w3schools.com/howto/img_avatar2.png'
    },
    {
      chatid: 3,
      title: 'fulano de tal',
      image: 'https://www.w3schools.com/howto/img_avatar2.png'
    },
    {
      chatid: 4,
      title: 'fulano de tal',
      image: 'https://www.w3schools.com/howto/img_avatar2.png'
    }
  ])
  const [activechat, setactivechat] = useState({})
  const [user, setuser] = useState(null)
  const [shownewchat, setshownewchat] = useState(false)

  const handlenewchat = () => {
    setshownewchat(true)
  }
  const handlelogindata = async u => {
    let newuser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    setuser(newuser)
  }

  if (user === null) {
    return <Login onReceive={handlelogindata}/>
  }

  return (
    <div className='app--window'>
      <div className='sidebar'>
        <Newchat
          chatlist={chatlist}
          user={user}
          show={shownewchat}
          setshow={setshownewchat}
        />
        <header>
          <img className='header--avatar' src={user.avatar} alt='avatar' />
          <div className='header--buttons'>
            <div className='header--btn'>
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div className='header--btn' onClick={handlenewchat}>
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className='header--btn'>
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>

        <div className='search'>
          <div className='search--input'>
            <SearchIcon fontSize='small' style={{ color: '#919191' }} />
            <input
              type='search'
              placeholder='Procurar ou começar uma nova conversa'
            />
          </div>
        </div>
        <div className='chatlist'>
          {chatlist.map((item, key) => (
            <Chatlistitem
              data={item}
              key={key}
              onClick={() => setactivechat(chatlist[key])}
              active={activechat.chatid === chatlist[key].chatid}
            />
          ))}
        </div>
      </div>

      <div className='content--area'>
        {activechat.chatid !== undefined && <Chatwindow user={user} />}
        {activechat.chatid === undefined && <Chatintro />}
      </div>
    </div>
  )
}
