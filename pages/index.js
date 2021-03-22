import React from 'react'
import Header from '../Components/Reusable/Header/Header'
import EditorNotes from '../Components/Reusable/EditorNotes/EditorNotes'

function index() {
  return (
    <div style={{height:'100vh'}}>
      <div >
      <Header />
      </div>
      <div style={{height:'80vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
        <h1>storybook.rudrajsohi.me</h1>
        <p>A blogs webiste project created on <strong style={{color:'tomato'}}>Next.js</strong> (React library)</p>
        <p>Backend server is made on <strong style={{color:'tomato'}}>Node.js express  </strong></p>
        <p><strong style={{color:'tomato'}}>Mongodb</strong> Database hosted on <strong style={{color:'tomato'}}>AWS (ec2) Ubuntu</strong></p>
        {/* <EditorNotes /> */}
      </div>
    </div>
  )
}

export default index
