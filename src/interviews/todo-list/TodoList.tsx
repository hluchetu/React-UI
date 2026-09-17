import { useState } from "react"
import type { SubmitEvent } from "react";
import "./TodoList.css";

type Task = {
  id: string;
  task: string;
  completed:boolean
}


export const TodoList = () => {
  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = input.trim()
    if (!text) return

    const todoTask = {
      id: crypto.randomUUID(),
      task: text,
      completed:false
    }

    setTasks((previous) => [...previous, todoTask])
    setInput("")
  }

  const handleToggle = (id: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
       : task
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks(previous => (
      previous.filter(task => (
        task.id !== id
      ))
    ))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-id">Task</label>
        <input
          id="input-id"
          type="text"
          placeholder="Enter todo"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <p>{tasks.length} tasks</p>
      {tasks.length === 0 && <p>No tasks yet. Add your first task.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span className={task.completed ? "completed" : undefined}>
                {task.task}
              </span>
            </label>
            <button
              type="button"
              onClick={() => handleDelete(task.id)}
              aria-label={`Delete ${task.task}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
