import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import CloseIcon from '@material-ui/icons/Close'
import SendIcon from '@material-ui/icons/Send'
import MicIcon from '@material-ui/icons/Mic'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EmojiPicker from 'emoji-picker-react'
import MessageItem from '../MessageItem'
import './styles.css'
import Api from '../../api'

export default ({ user, data }) => {
  let recognition = null
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }

  const [emojiopen, setemojiopen] = useState(false)
  const [text, settext] = useState('')
  const [listening, setlistening] = useState(false)
  const [list, setlist] = useState([])
  const [users, setusers] = useState([])
  const body = useRef()
  useEffect(() => {
    setlist([])
    let unsub = Api.onchatcontent(data.chatId, setlist,setusers)
    return unsub
  }, [data.chatId])
  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])

  const handleEmojiClick = (e, emojiObject) => {
    settext(text + emojiObject.emoji)
  }

  const handleOpenEmoji = () => {
    setemojiopen(true)
  }
  const handleCloseEmoji = () => {
    setemojiopen(false)
  }

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setlistening(true)
      }
      recognition.onend = () => {
        setlistening(false)
      }
      recognition.onresult = e => {
        settext(e.results[0][0].transcript)
      }
      recognition.start()
    }
  }
  const handleinputkeyup = e => {
    if (e.keyCode === 13) {
      handleSendClick()
    }
  }
  const handleSendClick = () => {
    if (text !== '') {
      Api.sendmessage(data, user.id, 'text', text,users)
      settext('')
      setemojiopen(false)
    }
  }

  return (
    <div className='chatwindow'>
      <div className='chatwindow--header'>
        <div className='chatwindow--headerinfo'>
          <img className='chatwindow--avatar' src={data.image} />
          <div className='chatwindow--name'>{data.title}</div>
        </div>
        <div className='chatwindow--headerbuttons'>
          <div className='chatwindow--btn'>
            <SearchIcon style={{ color: '#919191' }} />
          </div>
          <div className='chatwindow--btn'>
            <AttachFileIcon style={{ color: '#919191' }} />
          </div>
          <div className='chatwindow--btn'>
            <MoreVertIcon style={{ color: '#919191' }} />
          </div>
        </div>
      </div>
      <div className='chatwindow--body' ref={body}>
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div
        className='chatwindow--emojiarea'
        style={{ height: emojiopen ? '200px' : '0' }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>
      <div className='chatwindow--footer'>
        <div className='chatwindow--pre'>
          <div
            className='chatwindow--btn'
            onClick={handleCloseEmoji}
            style={{ width: emojiopen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: '#919191' }} />
          </div>
          <div className='chatwindow--btn' onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              style={{ color: emojiopen ? '#009688' : '#919191' }}
            />
          </div>
        </div>
        <div className='chatwindow--inputarea'>
          <input
            type='text'
            className='chatwindow--input'
            placeholder='Degite uma mensagem'
            value={text}
            onChange={e => settext(e.target.value)}
            onKeyUp={handleinputkeyup}
          ></input>
        </div>
        <div className='chatwindow--pos'>
          {text !== '' && (
            <div className='chatwindow--btn' onClick={handleSendClick}>
              <SendIcon style={{ color: '#919191' }} />
            </div>
          )}
          {text === '' && (
            <div className='chatwindow--btn' onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
