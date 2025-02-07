import React from 'react'

export default function Main() {

  const handleClick = () => {
    console.log('Button Clicked');
  };

  return (
    <button onClick={handleClick}>Main</button>
  )
}
