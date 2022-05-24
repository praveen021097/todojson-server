import React from "react";
import { useEffect,useState } from 'react';
export const Todo = ()=>{
const [newTodo, setNewTodo] =useState("");
const [todos, setTodos]=useState([]);

useEffect(()=>{
    fetch(" http://localhost:8080/todos?_limit=2&_page=1").then((r)=>r.json()).then((d)=>{
        setTodos(d)
    })
},[])

const saveInfo =()=>{
        fetch("http://localhost:8080/todos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"task":newTodo,"isCompleted":false})
        }).then((r)=>{
            r.json()
        }).then((d)=>{
            setTodos([...todos,d])
            setNewTodo("")
        })
}

console.log("new data:",todos)
    return (<div>
        <h1>TODO</h1>
        <div>
            <input type="text" onInput={(e)=>{
                setNewTodo(e.target.value)
            }}/>
            <button onClick={()=>{
                {saveInfo()}
            }}>addtodo</button>
        </div>
        {todos.map((todo)=>{
            return <div key={todo.id}>{todo.task}</div>
        })}
    </div>)
}