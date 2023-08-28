import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Editor'

const EditPost = () => {
    const{id}=useParams()
    const[title,setTitle]=useState('')
    const[summary,setSummary]=useState('')
    const[content,setContent]=useState('')
    const[file,setFiles]=useState('')
    const[redirect,setRedirect]=useState(false)

useEffect(()=>{
  
    fetch('http://localhost:4000/post/'+id).then(response=>response.json().then(postInfo=>{
      setTitle(postInfo.title)
      setContent(postInfo.content)
      setSummary(postInfo.summary)
     
    
    }))
 

},[])


async function updatepost(ev){
ev.preventDefault()
const data = new FormData()
data.set('title',title)
data.set('summary',summary)
data.set('content',content)
data.set('id',id)

if(file?.[0]){
  data.set('file',file?.[0])
}
const response = await fetch('http://localhost:4000/post',{
  method:'PUT',
  body:data,
  credentials:'include',

})
if(response.ok)
setRedirect(true)
}

    if(redirect){
       return <Navigate to={'/post/'+id}/>
      }
  return (

    <>
    <form enctype="multipart/form-data" onSubmit={updatepost}>
      <input type="title" placeholder={'Title'}
       value={title} 
       onChange={e=>setTitle(e.target.value)} />
      <input type='summary' placeholder='summary ' value={summary} 
       onChange={e=>setSummary(e.target.value)}/>
      <input type="file"  onChange={e=>setFiles(e.target.files)} />
      <Editor value={content } onChange={setContent}  />
      <button  style={{width:"15%","background-color":"#1e1eea",color:"white",border:"none",margin:"10px"}}>update Post</button>
    </form>
  </>
  )
}

export default EditPost