const express = require('express');
const app = express();
const PORT = 4001;
// const User = require('./user');
const Blog = require('./blog');
const mongoose = require("./connection");
app.use(express.json());


//-------------------------
//Posting Data into DataBase
//-------------------------
// app.post('/blogs',(req,res)=>{

  //-------one way to post Data-----------
  // const blog = new Blog(req.body);
  // blog.save().then((blog)=>{
  //   res.status(200).send(blog);
  // }).catch((err)=>{
  //   res.status(400).send(err);
  // })

  //-------another way to post Data---------
  // Blog.create(req.body).then((blog)=>{
  //   res.status(200).send(blog);
  // }).catch((error)=>{
  //   console.log(error);
  // })

  //------to send multiple responses---------
  // Blog.insertMany(req.body).then((blog)=>{
  //   res.status(200).send(blog);
  // }).catch((error)=>{
  //   console.log(error);
  // })

// })

//POST using Async and await
app.post('/blogs', async (req,res)=>{
  const blog = new Blog(req.body);
  try{
    await blog.save();
    res.status(201).send(blog);
  } catch(err){
    res.status(404).send(err);
  }
  });


//-------------------------
//retrieving Data from the DataBase
//-------------------------
// app.get('/blogs',(req, res)=>{
//   Blog.find({}).then((blogs)=>{
//     res.send(blogs);
//   }).catch((error)=>{
//     send.status(500).send(error);
//   })
// })
//-------GET using async await
app.get('/blogs', async (req, res)=>{
  try{
    const blogs = await Blog.find({})
    res.status(201).send(blogs);
  } catch(err){
    res.status(500).send(err);
  }
})

//------retrieving single data from DataBase using params and findById-----
app.get('/blogs/:id',(req, res)=>{
  Blog.findById(req.params.id).then((blog)=>{
    if(!blog){
      return res.status(404).send({"message": "blog not found"});
    }
    res.send(blog);
  }).catch((error)=>{
    res.status(500).send(error);
  })
})
//------retrieving single data from DataBase=> another way uing findOne-----
// app.get('/blogs/:id',(req, res)=>{
//   Blog.findOne({_id: req.params.id}).then((blog)=>{
//     if(!blog){
//       return res.status(404).send({"message": "blog not found"});
//     }
//     res.send(blog);
//   }).catch((error)=>{
//     res.status(500).send(error);
//   })
// })



//-------------------------
//updating Data in DataBase
//-------------------------
//-------updaing using async await------
app.patch('/blogs/:id', async (req,res)=>{
    try{
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true});
      res.status(201).send(blog);
    } catch(err){
      res.status(500).send(err);
    }
});
// app.patch('/blogs/:id',(req,res)=>{
//   Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((blog)=>{
//     if(!blog){
//       return res.status(404).send();
//     }
//     res.send(blog);
//   }).catch((error)=>{
//     res.status(500).send(error);
//   })
//--------second method to update the record-----------
//   Blog.updateOne({ _id: req.params.id}, req.body).then((blog)=>{
//       res.status(200).send(blog);
// }).catch(error => res.status(500).send(error));
// })


//-------------------------
//Deletng from DataBase
//-------------------------
//deleting using async await
app.delete('/blogs/:id', async (req,res)=>{
    try{
      const blog = await Blog.findByIdAndDelete(req.params.id)
      res.status(201).send(blog);
    } catch(err){
      res.status(500).send(err);
    }
})


// app.delete('/blogs/:id',(req,res)=>{
//   Blog.findByIdAndDelete(req.params.id).then((blog)=>{
//     if(!blog){
//       return res.status(404).send();
//     }
//     res.send(blog);
//   }).catch((error)=>{
//     res.status(500).send(error);
//   })
// })

app.listen(PORT, 'localhost', ()=>{
  console.log("server started at localhost:"+PORT);
})


