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
import Api from './api'
import './App.css'

export default () => {
  const [chatlist, setchatlist] = useState([])
  const [activechat, setactivechat] = useState({})
  const [user,setuser] = useState(null)
  const [shownewchat, setshownewchat] = useState(false)
  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onchatlist(user.id, setchatlist)
      return unsub
    }
  }, [user])

  const handlenewchat = () => {
    setshownewchat(true)
  }
  const handlelogindata = async u => {
    let newuser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    await Api.adduser(newuser)
    setuser(newuser)
  }

  if (user === null) {
    return <Login onReceive={handlelogindata} />
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
              key={key}
              data={item}
              active={activechat.chatId === chatlist[key].chatId}
              onClick={() => setactivechat(chatlist[key])}
            />
          ))}
        </div>
      </div>

      <div className='content--area'>
        {activechat.chatId !== undefined && (
          <Chatwindow user={user} data={activechat} />
        )}
        {activechat.chatId === undefined && <Chatintro />}
      </div>
    </div>
  )
}
