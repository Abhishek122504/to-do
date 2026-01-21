import React, { useEffect, useState } from 'react'

import './todo.css'

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const SavetoLS = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    useEffect(() => {
        let todoString = localStorage.getItem("todos");
        if (todoString) {
            let savedTodos = JSON.parse(localStorage.getItem("todos"));
            setTodos(savedTodos);
        }
    }, [])


    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    const handleAdd = (e) => {
        if (todo.trim() !== "") {
            setTodos([...todos, { todo, isCompleted: false }]);
            setTodo("");
            SavetoLS();
        }
    }

    const handleEdit = (index) => {
        var todoText = todos[index].todo;
        var updatedTask = prompt("Karle Update", todoText);
        if (updatedTask && updatedTask.trim() !== "") {
            const update = [...todos];
            update[index].todo = updatedTask;
            setTodos(update);
        }
        SavetoLS();
    }
    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
        SavetoLS();
    }

    const handleCheckbox = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        SavetoLS();
    }

    return (
        <>
            <div className="containerT">
                <div className="wrap-Todo">
                    <div className="takeTask">
                        <input type="text" onChange={handleChange} value={todo} className="form-control" id="exampleFormControlInput1" placeholder="Enter your task" />
                        <button type="button" onClick={handleAdd} className="btn btn-primary">Add</button>
                    </div>
                    <div className="showTodos">
                        {todos.map((item, index) => {
                            return (<div key={index} className="todo">
                                <div className="wrap-check">
                                    <input type="checkbox" onChange={() => handleCheckbox(index)} id="checkbox" checked={item.isCompleted ? "checked" : ""} />
                                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                                </div>
                                <div className="buttons">
                                    <button type="button" onClick={() => handleEdit(index)} className="btn btn-dark">Edit
                                    </button>
                                    <button type="button" onClick={() => handleDelete(index)} className="btn btn-dark">Delete

                                    </button>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
