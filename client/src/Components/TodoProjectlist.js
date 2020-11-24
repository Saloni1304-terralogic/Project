import React from 'react';
import {Link} from 'react-router-dom';
const TodoProjectlist=(props)=>{
    return(
        <table className="table">
        <thead className="thead-light">
        <tr>
            <td style={{width:'45%'}}>{props.todo.name}</td>
            <td>{props.todo.email}</td>
            <td>{props.todo.client}</td>
            <td>{props.todo.group}</td>
            
            <td><Link class="btn-btn danger" >delete</Link>
                </td>

            </tr>
          
            </thead>
            </table>
        

        )
    
    }
    export default TodoProjectlist;