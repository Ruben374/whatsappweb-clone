import React, { useState, useEffect } from 'react'
import './styles.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Api from '../../api'

export default ({ user, chatlist, show, setshow }) => {
  useEffect(() => {
    const getlist = async () => {
      if (user !== null) {
        let results = await Api.getcontactlist(user.id)
        setlist(results)
      }
    }
    getlist()
  }, [user])

  const [list, setlist] = useState([])
  const handleClose = () => {
    setshow(false)
  }
    const addnewchat =async (user2) => {
      await Api.addnewchat(user,user2);
      handleClose();
   
  }
  return (
    <div className='newchat' style={{ left: show ? 0 : -415 }}>
      <div className='newchat--head'>
        <div className='newchat--backbutton' onClick={handleClose}>
          <ArrowBackIcon style={{ color: '#FFFF' }} />
        </div>
        <div className='newchat--headtitle'>Nova Conversa</div>
      </div>

      <div className='newchat--list'>
        {list.map((item, key) => (
          <div className='newchat--item' key={key} onClick={()=>addnewchat(item)}>
            <img className='newchat--itemavatar' src={item.avatar} alt='' />
            <div classNmae='newchat--itemname'>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
