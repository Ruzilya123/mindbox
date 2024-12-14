import { FC } from "react";
import { TaskProvider } from "./context";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { TasksFilter } from "./components/TasksFilter";
import "./App.css";

export const App: FC = () => {
    return (
        <TaskProvider>
            <div className="app-container">
                <h1 className="app-title">todos</h1>
                <AddTaskForm />
                <TasksFilter />
                <TaskList />
            </div>
        </TaskProvider>
    );
};
