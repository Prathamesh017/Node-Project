import express, { json, response } from "express";
import fetch from "node-fetch";
const app=express();


// geting todos
const getTodos=async()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/todos');
    const data=await response.json();
    return data;
    
}
// get particular users
const getUser=async(id)=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data=await response.json();
    return data;

}

// sending everything except userId
app.get("/todos",async(req,res)=>{
    const data=await getTodos();
    data.forEach(element => {
               delete element["userId"];
    });
    res.send(data);
    
})

// mergeing user with  todos
app.get("/users/:id",async(req,res)=>{
const {id}=req.params;
const todos=await getTodos();
const user=await getUser(id);
const selectedTodos=todos.filter((todo)=>{
  return todo.userId===parseInt(id,10);
})
res.send({...user,"todos":selectedTodos});


})


app.listen(3000,()=>{
    console.log("Server is Listening")
})