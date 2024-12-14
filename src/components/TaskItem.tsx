import { memo } from "react";
import { useTasks } from "../context";
import { TASKS_TYPES } from "../types";
import "../styles/TaskItem.css";

interface TaskItemProps {
    id: string;
    title: string;
    completed: boolean;
    date?: string | null;
}

export const TaskItem = memo(({ id, title, completed, date }: TaskItemProps) => {
    const { dispatch } = useTasks();

    const handleToggle = () => {
        dispatch({type: TASKS_TYPES.TOGGLE_TASK, payload: id});
    };

    const handleDelete = () => {
        dispatch({type: TASKS_TYPES.DELETE_TASK, payload: id});
    };

    return (
        <div className={`task-item ${completed ? "completed" : ""}`}>
            <input
                id={`task-${id}`}
                type="checkbox"
                className="task-item-checkbox"
                checked={completed}
                onChange={handleToggle}
            />
            <label htmlFor={`task-${id}`} className="task-item-title">
                {title}
            </label>
            <button
                className="task-item-delete"
                onClick={handleDelete}
            >
                ✕
            </button>
            {date && <span className="task-date">{date}</span>}
        </div>
    );
});
