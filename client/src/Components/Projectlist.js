import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';

import { AuthContext } from '../Context/AuthContext';
import Message from './Message';
import TodoProjectlist from './TodoProjectlist';
import {Link} from 'react-router-dom';

const Projectlist = props =>{
    const [todo,setTodo]=useState({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:""});
    const [todos,setTodos]=useState([]);
    const [message,setMessage] = useState(null);
    const authContext =useContext(AuthContext);
    const [token,setToken]=useState('')
  
    useEffect(()=>{
        TodoService.getTodos().then(data =>{
            setTodos(data.todos);
        });

    },[]);


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
        setTodo({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:"",group:""});
    }


    
    


    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <table class="table">
                    <thead class="thead dark">
                        <tr>
                            <th scope="col">PROJECT</th>
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col">CLIENT</th>
                            <th scope="col">GROUP</th>
                            
                            <th scope="col">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                        {
                    todos.map(todo => (
                        <tr key={todo._id}>
                            <td>{todo.name}</td>
                            <td>{todo.email}</td>
                            <td>{todo.client}</td>
                            <td>{todo.group}</td>
                            
                            <td><Link class="btn-btn danger" >delete</Link>
                </td>
                            
                                </tr>
                        
                    ))}
                


                        </tbody>
                        </table>
                    
               
                
            
    
    
                        
    
                    
                </div>
            </div>
        </div>
    )

                };

export default Projectlist;