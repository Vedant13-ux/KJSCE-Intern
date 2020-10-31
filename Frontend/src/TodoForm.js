import React, {Component} from 'react';
import './TodoForm.css';

class TodoFrom extends Component {
    constructor(props){
        super(props);
        this.state={
            inputValue:''
        };
        
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        this.props.addTodo(this.state.inputValue);
    }
    render(){
        return (
            <div>
                <input 
                    name="inputValue"
                    type="text" 
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>Add Todo</button>
            </div>
        )
    }
}
export default TodoFrom;