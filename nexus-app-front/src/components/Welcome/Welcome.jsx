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


{/* <div className="custom-margin-small custom-margin-medium custom-margin-large custom-margin-top custom-padding custom-bg-white custom-bg-dark rounded-custom">
        <div className="overlap-welcome">
          <div className="text-welcome">Bienvenido, Juan Camilo</div>
          <p className="p">
            Looks like you are not verified yet. Verify yourself to use the full potential of Xtrader.
          </p>
          <img className="NFT" alt="Nft" src="/img/NFT.png" />
        </div>
    </div> */}
