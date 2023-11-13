import React from 'react'
import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className='welcomeCustome'>
      <div className='overlapWelcome'>
        <div>
        <div className='text-welcome'>Bienvenido, Juan Camilo</div>
        <p className='text-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Architecto dolore dolorem rerum nesciunt aperiam, nostrum quidem labore tempore expedita error 
        odit libero ex. Aperiam, in voluptas similique autem veniam eum!</p>
        </div>
        <div>
          <img className="NFT" alt="Nft" src="/img/NFT.png" />
        </div></div>
    </div>
  )
}