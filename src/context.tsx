import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import {
    FilterReducerAction,
    TASKS_TYPES,
    TaskReducerAction,
    TaskState,
    TaskContextType
} from "./types";
import { tasksReducer } from "./reducers/taskReducer";
import { filterReducer } from "./reducers/filterReducer";

interface TaskProviderProps {
    children: ReactNode;
}

const initialState: TaskContextType = {
    tasks: TaskState,
    dispatch: () => {},
    filter: "all"
};

export const TaskContext = createContext<TaskContextType>(initialState);

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const initializeTasks = () => initialState.tasks;
    const initializeFilter = () => initialState.filter;
    const [tasks, tasksDispatch] = useReducer(tasksReducer, initialState.tasks, initializeTasks);
    const [filter, filterDispatch] = useReducer(filterReducer, initialState.filter, initializeFilter);

    // Объединённый dispatch
    const dispatch = (action: TaskReducerAction | FilterReducerAction) => {
        if (action.type === TASKS_TYPES.SET_FILTER) {
            filterDispatch(action);
        } else {
            tasksDispatch(action);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, filter, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};

