import React from 'react'
import './styles.css'
import Api from '../../api'

export default ({onReceive}) => {
  const handlefacebooklogin = async () => {
    let result = await Api.fbPopup()
    if (result) { 
        onReceive(result.user)
    } else {
      alert('Erro!')
    }
  }
  return (
    <div className='login'>
   
      <button onClick={handlefacebooklogin}>logar com facebook</button>
    </div>
  )
}
