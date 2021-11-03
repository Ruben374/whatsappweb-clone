import React from 'react'
import Logo from '../../assets/logo.jpg'
import './styles.css'

export default () => {
  return (
    <div className='chatintro'>
      <img src={Logo} alt='' />

      <h1>Matenha seu celular conectado</h1>
      <h2>
        {' '}
        O WhatsApp conecta ao seu telefone para sincronizar suas mensagens.Para
        reduzir o uso de dados, conecte o seu telefone a uma rede Wi-fi.
      </h2>
    </div>
  )
}
