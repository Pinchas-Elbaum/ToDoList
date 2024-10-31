import axios from 'axios'
import React, { useState } from 'react'

interface mission {
    _id?: string 
    name: string
    status: string
    priority: string
    description: string
}
const URL = "https://reactexambackend.onrender.com/missions/8707877"
const arr = await axios.get(URL).then(res => res.data)

const ToDoList = () => {
    const [todos, settodos] = useState<mission[]>(arr);
    const [inputName, setInputName] = useState<string>("");
    const [inputDiscription, setInputDiscription] = useState<string>("");
    const [progressSelect, setprogressSelect] = useState<string>("Pending");
    const [prioritySelect, setprioritySelect] = useState<string>("Low");

    const handleAddClick = () => {
        if (inputName === "" || inputDiscription === "") {
            alert("Please enter a name and description")
            return
        }
        const newTodo: mission = {
            name: inputName,
            status: progressSelect,
            priority: prioritySelect,
            description: inputDiscription
        }
        axios.post(URL, newTodo)
        settodos([...todos, newTodo])
        setInputName("")
        setInputDiscription("")
    }

    const handleDeleteClick = async (id: string | undefined ) => { 
        await axios.delete(`${URL}/${id}`)
        const newTodos = todos.filter((todo) => todo._id !== id)
        settodos(newTodos)
    }

    const handleProgressClick = async (id: string | undefined) => {
        const newTodos = todos.map((todo) => {
            if (todo._id === id) {
                todo.status === "Pending" ? todo.status = "In Progress" : todo.status = "Completed" 
                
            }
            return todo
        })
        settodos(newTodos)
        await axios.post(`${URL}/progress/${id}`)
        
    }

    return (
        <div className="main-container">
            <h1>Miliatry Mission Dashbord</h1>

            <input
                type="text"
                placeholder="Add a mission"
                value={inputName}
                onChange={(e) => setInputName(e.currentTarget.value)}
            />
            <select className='select' name="Progress" id="Progress" onChange={(e) => setprogressSelect(e.currentTarget.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select className='select' name="Priority" id="Prioerty" onChange={(e) => setprioritySelect(e.currentTarget.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input
                type="text"
                placeholder="discription"
                value={inputDiscription}
                onChange={(e) => setInputDiscription(e.currentTarget.value)}
            />
            <button className='addBtn' onClick={handleAddClick}>Add Mission</button>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li
                    ><div>
                        <h3>Name: {todo.name}</h3>
                        <p>status: {todo.status}</p>
                        <p>priority: {todo.priority}</p>
                        <p>discription: {todo.description}</p>

                    </div>
                        <button className='deleteBtn' onClick={(e) => { e.stopPropagation(); handleDeleteClick(todo._id); }}>
                            Delete
                        </button>

                        <button className='progressBtn' onClick={(e) => { e.stopPropagation(); handleProgressClick(todo._id); }}>
                            Progress
                        </button>
                    </li>
                ))}
            </ul>
        </div>)
}

export default ToDoList
