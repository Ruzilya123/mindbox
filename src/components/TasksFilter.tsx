import { FC } from "react";
import { useTasks } from "../context";
import { TASKS_TYPES } from "../types";
import "../styles/TasksFilter.css";

export const TasksFilter: FC = () => {
    const { tasks, filter, dispatch } = useTasks();

    const handleClearCompleted = () => {
        dispatch({type: TASKS_TYPES.CLEAR_COMPLETED});
    };

    const activeCount = tasks.filter((task) => !task.completed).length;

    return (
        <div className="tasks-filter">
            <span>{activeCount} items left</span>
            <div className="filter-buttons">
                <button
                    className={`filter-button ${filter === "all" ? "active" : ""}`}
                    onClick={() => dispatch({type: TASKS_TYPES.SET_FILTER, payload: "all"})}
                >
                    All
                </button>
                <button
                    className={`filter-button ${filter === "active" ? "active" : ""}`}
                    onClick={() => dispatch({type: TASKS_TYPES.SET_FILTER, payload: "active"})}
                >
                    Active
                </button>
                <button
                    className={`filter-button ${filter === "completed" ? "active" : ""}`}
                    onClick={() => dispatch({type: TASKS_TYPES.SET_FILTER, payload: "completed"})}
                >
                    Completed
                </button>
            </div>
            <button className="clear-button" onClick={handleClearCompleted}>
                Clear completed
            </button>
        </div>
    );
};
