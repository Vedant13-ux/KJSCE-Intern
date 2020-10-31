import React from 'react';

const TodoItem= ({name,completed,onDelete,onToggle})=>{
    return (
        <li style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
            <span onClick={onToggle}>{name}</span> 
            <span onClick={onDelete}> X</span>
        </li>
    )
}

export default TodoItem;