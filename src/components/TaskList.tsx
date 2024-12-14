import { FC } from "react";
import { useTasks } from "../context";
import { getUniqueDates } from "../utils";
import { TaskItem } from "./TaskItem";
import { Task } from "../types";
import "../styles/TaskList.css";

export const TaskList: FC = () => {
    const { tasks, filter } = useTasks();

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const tasksWithDate = filteredTasks.filter(task => task.date);
    const tasksWithoutDate = filteredTasks.filter(task => !task.date);

    const uniqueDates = getUniqueDates(tasksWithDate);

    return !tasks.length ? (
        <p className="empty">No tasks to show!</p>
    ) : (
        <div className="list">
            {tasksWithoutDate.length > 0 && (
                <div key="no-date" className="task-group">
                    {tasksWithoutDate.map((task) => (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            completed={task.completed}
                        />
                    ))}
                </div>
            )}

            {uniqueDates.map((date) => {
                const tasksForDate = tasksWithDate.filter((task) => task.date === date);
                return (
                    <details open key={date} className="task-group">
                        <summary className="group-date">{date}</summary>
                        <ul className="task-with-date">
                            {tasksForDate.map((task: Task) => (
                                <TaskItem
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    completed={task.completed}
                                />
                            ))}
                        </ul>
                    </details>
                );
            })}
        </div>
    );
};
