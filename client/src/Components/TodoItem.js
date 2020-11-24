import React, {useState,useContext,useEffect} from 'react';

import TodoService from '../Services/TodoService';
import { AuthContext } from '../Context/AuthContext';
import Message from './Message';
import {Link} from 'react-router-dom';
import axios from 'axios';







const TodoItem=(props)=>{


    const [todo,setTodo]=useState({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:""});
    const [todos,setTodos]=useState([]);
    const [message,setMessage] = useState(null);
    const authContext =useContext(AuthContext);
    const [token,setToken]=useState('')


    const getTodos=async(token)=>{
        const res= await axios.get('/todo',{
            headers:{Authorization:token}
        })
        setTodos(res.data)
    }
  
    useEffect(()=>{
        TodoService.getTodos().then(data =>{
            setTodos(data.todos);
        });

    },[]);

    const deleteTodo=async (id) =>{
        await axios.delete(`http://localhost:5000/todos/${id}`);
        
        
     };


    const onSubmit=e=>{
        e.preventDefault();
        TodoService.postTodo(todo).then(data =>{
            const {message} = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(getData =>{
                    setTodos(getData.todos);
                    setMessage(message);

                });
            }
            else if(message.msgBody ==="UnAuthorized"){
                setMessage(message);
                authContext.setUser({username:"",role:""});
                authContext.setIsAuthenticated(false);

            }
            else{
                setMessage(message);
            }

        });
    }

    const onChange=e =>{
        const{name,value}=e.target;
        setTodo({...todo,[name]:value})
    }

    const resetForm =()=>{
        setTodo({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:""});
    }


    return(
        <table className="table">
        <thead className="thead-light">
        <tr>
            <td>{props.todo.name}</td>
            <td>{props.todo.email}</td>
            <td>{props.todo.client}</td>
           <td> {props.todo.members}</td>
          <td> {props.todo.startdate}</td>
         <td> {props.todo.enddate}</td>
         <td>{props.todo.progress}</td> 
        
         
        </tr>
        </thead>
            </table>
        
        

    )

}
export default TodoItem;