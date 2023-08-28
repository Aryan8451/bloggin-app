const express = require('express');
const jwt= require('jsonwebtoken')
const cors = require("cors");
const mongoose  = require("mongoose");
const User =require("./models/User")
const PostM= require("./models/Post")
const bcrypt = require('bcrypt');
const cookieParser=require('cookie-parser')
const multer =require('multer')
const fs = require('fs')
const uploadMiddleware = multer({ dest: 'uploads/' })

const secretKey= 'asjhafdiuadkjfkiudhfsdf43rrwe434'

const salt = bcrypt.genSaltSync(10);


const app = express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser())
mongoose.connect("mongodb+srv://aryangoud120:H2hU7aBxX3Qq7BqD@cluster0.0bdi2rt.mongodb.net/"
)//
app.use('/uploads',express.static(__dirname+'/uploads'))
//for register posting endpoint

app.post('/register', async (req, res) => {
   
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({ username, password:bcrypt.hashSync(password,salt) });

    res.json(userDoc);
    
  } catch (error) {
    
    res.status(400).json(error)
  }
});

//for login posting endpoint
app.post('/login', async (req,res)=>{
const{username,password}= req.body;
const userDoc= await User.findOne({username})
if (!userDoc) {
  // User not found in the database
  return res.status(404).json({ error: 'User not found' });
}
const passOK = bcrypt.compareSync(password, userDoc.password);
if( passOK){
  //logged in with jsonwebtoke
  jwt.sign({username,id:userDoc._id},secretKey,{},(err,token)=>{
if(err) {
  throw err}
  else{
    res.cookie('token',token).json({
      id:userDoc._id,
      username,
    })
  }

  })
  //res.json()

}else{
  res.status(400).json('wrong credential')
}
})
app.get('/profile',(req,res)=>{
  const{token}= req.cookies;
  jwt.verify(token,secretKey,{},(err,info)=>{
    if(err)throw err
    res.json(info)
  })
  res.json(req.cookies)
})

app.post('/logout',(req,res)=>{
  res.cookie('token',' ').json('ok');
})
try {
  app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
 
  const{originalname,path}=req.file
  const parts = originalname.split('.');
  const ext=parts[parts.length-1]
  const newPath=(path+"."+ext)
  fs.renameSync(path,newPath)
  const{token}= req.cookies;
  jwt.verify(token,secretKey,{},async(err,info)=>{
    if(err)throw err

 const{title,summary,content}=req.body
  const postDoc=await PostM.create({
  title,
  summary,
  content,
  cover:newPath,
  author:info.id
 })
  res.json(postDoc)
  })
})
} catch (error) {
  console.log(error)
}
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      // File was uploaded, process and set the new path
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) throw err;

      const { id, title, summary, content } = req.body;
      const postDoc = await PostM.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }

      // Update the postDoc properties and save the changes
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      if (newPath) {
        postDoc.cover = newPath;
      }
      await postDoc.save(); // Save the updated document

      res.json(postDoc);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


 

app.get('/post',async (req,res)=>{
  const post = await PostM.find().populate('author',['username']).sort({createdAt:-1}).limit(20)
res.json(post)
})

app.get('/post/:id',async(req,res)=>{
  const{id}=req.params
  const postDoc=await PostM.findById(id).populate('author',['username'])
  res.json(postDoc)
})


app.listen(4000)

//2:08
