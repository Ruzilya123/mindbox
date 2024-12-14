import {Dispatch} from "react";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    date?: string | null;
}
export const TaskState: Task[] = [];

export type FilterState = "all" | "active" | "completed";

export enum TASKS_TYPES {
    ADD_TASK = "ADD_TASK",
    TOGGLE_TASK = "TOGGLE_TASK",
    DELETE_TASK = "DELETE_TASK",
    CLEAR_COMPLETED = "CLEAR_COMPLETED",
    SET_FILTER = "SET_FILTER",
}

export type FilterReducerAction = { type: TASKS_TYPES.SET_FILTER, payload: FilterState };

export type TaskReducerAction =
    | { type: TASKS_TYPES.ADD_TASK, payload: Task }
    | { type: TASKS_TYPES.DELETE_TASK, payload: Task["id"] }
    | { type: TASKS_TYPES.TOGGLE_TASK, payload: Task["id"] }
    | { type: TASKS_TYPES.CLEAR_COMPLETED };

export interface TaskContextType {
    filter: FilterState;
    dispatch: Dispatch<TaskReducerAction | FilterReducerAction>;
    tasks: Task[];
}
