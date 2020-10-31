import React, {Component} from 'react';
import TodoItem from './TodoItem';
// import PropTypes from 'prop-types';
import './TodoList.css';
import TodoForm from  './TodoForm';
const API_URL='/api/todos';

class TodoList extends Component{

  constructor(props){
    super(props);
    this.state={
      todos:[]
    }
    this.addTodo=this.addTodo.bind(this)
  }

  componentWillMount(){
      this.loadTodos();
    }
  loadTodos(){
    fetch('http://localhost:8000/api/todos',{mode:"no-cors"})
    .then((resp)=>resp.json())
    .then((todos)=>{
      console.log(todos);
    })
    .catch(err=>console.log(err));
    
  }

  addTodo(val){
    fetch(API_URL,{
        method:'POST',
        headers:new Headers({
          'Content-Type':'application/json',
        }),
        body:JSON.stringify({name:val})
      })
      .then((resp=>resp.json()))
      .then((data)=>{
        this.setState({todos:[...this.state.todos, data]});
      })
  }
  deleteTodo(id){
    const delURI=API_URL+id;
    fetch(delURI,{
      method:'DELETE',
    })
    .then(()=>{
      const todos=this.state.todos.filter((todo)=>{
        return todo._id!==id;
      });
      this.setState({todos})
    })
  }
  toggleTodo(todo){
    const toggleURI=API_URL+todo._id;
    fetch(toggleURI,{
      method:'PUT',
      headers:new Headers({
        'Content-Type':'application/json',
        body:JSON.stringify({completed:!todo.completed})
      })

    })
    .then((updatedTodo)=>{
      const todos=this.state.todos.map((todo)=>{
        return todo._id===updatedTodo.__id ? {...todo,completed:!todo.completed} : todo;
      });
      this.setState({todos})
    })
  }
  render(){
    const todos=this.state.todos.map((todo)=>(
      <TodoItem onDelete={this.deleteTodo.bind(this,todo._id)} key={todo._id} {...todo} onToggle={this.toggleTodo.bind(this,todo)}/>
    ));
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {todos}
        </ul>
        <TodoForm addTodo={this.addTodo} />
      </div>
    )
  }
}

export default TodoList;