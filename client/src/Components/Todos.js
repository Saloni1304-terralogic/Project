import React, {useState,useContext,useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import { AuthContext } from '../Context/AuthContext';
import Message from './Message';






const Todos = props =>{
    const [todo,setTodo]=useState({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:""});
    const [todos,setTodos]=useState([]);
    const [message,setMessage] = useState(null);
    const authContext =useContext(AuthContext);
  
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
        setTodo({name:"",email:"",client:"",members:"",startdate:"",enddate:"",progress:""});
    }

    

    return(
        <div>
            <br/>
            <form className="form" onSubmit={onSubmit}>
                
                <input type="text" name="name" value={todo.name} onChange={onChange} className="form-control"
                placeholder="please enter project name"/>

                
                <input type="text" name="email" value={todo.email} onChange={onChange} className="form-control"
                placeholder="please enter description"/>

                <input type="text" name="client" value={todo.client} onChange={onChange} className="form-control"
                placeholder="please enter client"/>

                <input type="text" name="members" value={todo.members} onChange={onChange} className="form-control"
                placeholder="please enter members"/>

                <input type="date" name="startdate" value={todo.startdate} onChange={onChange} className="form-control"
                placeholder="please enter startdate"/>

                <input type="date" name="enddate" value={todo.enddate} onChange={onChange} className="form-control"
                placeholder="please enter endate"/>

                <input type="text" name="progress" value={todo.progress} onChange={onChange} className="form-control"
                placeholder="please enter status"/>

                <input type="text" name="group" value={todo.group} onChange={onChange} className="form-control"
                placeholder="please enter group"/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

            </form>
            {message ? <Message message={message}/>:null}
        </div>
    );

}
export default Todos;