import { FC, FormEvent, useState } from "react";
import { useTasks } from "../context";
import { TASKS_TYPES } from "../types";
import "../styles/AddTaskForm.css";

export const AddTaskForm: FC = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState<string | null>(null);
    const { dispatch } = useTasks();

    const defaultTask = {
        title,
        date,
        completed: false,
        id: "",
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch({ type: TASKS_TYPES.ADD_TASK, payload: defaultTask });
            setTitle("");
            setDate(null);
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="task-input"
            />
            <input
                type="date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                className="date-input"
            />
            <button type="submit" className="add-task-button">
                Add Task
            </button>
        </form>
    );
};
