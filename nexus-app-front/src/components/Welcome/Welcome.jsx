import React from 'react'
import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className='welcomeCustome'>
      <div className='overlapWelcome'>
        <div>
        <div className='text-welcome'>Bienvenido</div>
        <p className='text-p'>¡Te damos la bienvenida al corazón mismo de tu experiencia anime! Este es tu espacio personal, donde los números cobran vida y los gráficos te cuentan las historias que amas. ¡Prepárate para sumergirte en el fascinante mundo de tus animes favoritos a través de datos y estadísticas!</p>
        </div>
        <div>
          <img className="NFT" alt="Nft" src="/img/NFT.png" />
        </div></div>
    </div>
  )
}