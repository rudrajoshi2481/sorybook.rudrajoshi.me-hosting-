import React from 'react'
import Header from '../Components/Reusable/Header/Header'
import EditorNotes from '../Components/Reusable/EditorNotes/EditorNotes'

function index() {
  return (
    <div style={{height:'100vh'}}>
      <div >
      <Header />
      </div>
      <div style={{height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}} >
        <h1>Home Page </h1>
        {/* <EditorNotes /> */}
      </div>
    </div>
  )
}

export default index
