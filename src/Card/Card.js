import React from 'react'

const Card = (props) => {
    const {imgsrc} = props
  return (
    <div className='imgframe'>
        <img  src={imgsrc} alt=''></img>
    </div>
  )
}

export default Card
