import React from 'react'
import Notes from './Notes'



export default function Home(props) {

  return (

    <div className='container my-4'>
      <Notes showAlert={props.showAlert} />
    </div>

  )
}
