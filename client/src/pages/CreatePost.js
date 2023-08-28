import React, { useState } from 'react'

import  'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
import Editor from '../Editor'

const CreatePost = () => {
  const[title,setTitle]=useState('')
  const[summary,setSummary]=useState('')
  const[content,setContent]=useState('')
  const[file,setFiles]=useState('')
  const[redirect,setRedirect]=useState(false)
   async function createNewpost(ev){
    ev.preventDefault()
    const data = new FormData();
    data.set('title',title)
    data.set('summary',summary)
    data.set('content',content)
    data.set('file',file[0])
    
    const response = await fetch('http://localhost:4000/post',{
      method:"POST",
      body: data,
    credentials:'include',
    
    })
    if(response.ok){
      setRedirect(true)
      
    }
  }
  

  if(redirect)
  {
    return <Navigate to={'/'}/>
  }
  return (
  <>
    <form enctype="multipart/form-data" onSubmit={createNewpost}>
      <input type="title" placeholder={'Title'}
       value={title} 
       onChange={e=>setTitle(e.target.value)} />
      <input type='summary' placeholder='summary ' value={summary} 
       onChange={e=>setSummary(e.target.value)}/>
      <input type="file"  onChange={e=>setFiles(e.target.files)} />
   <Editor onChange={setContent} value={content}/>
      <button  style={{width:"15%","background-color":"#1e1eea",color:"white",border:"none",margin:"10px"}}>Create Post</button>
    </form>
  </>
 
  )
  }
export default CreatePost
