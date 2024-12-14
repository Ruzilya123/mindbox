import { TASKS_TYPES, TaskReducerAction, TaskState } from "../types";

export function tasksReducer(state = TaskState, action: TaskReducerAction) {
    switch (action.type) {
        case TASKS_TYPES.ADD_TASK:
            return [...state, {
                id: Date.now().toString(),
                title: action.payload.title,
                completed: false,
                date: action.payload.date || null,
            }];
        case TASKS_TYPES.DELETE_TASK:
            return state.filter((task) => task.id !== action.payload);
        case TASKS_TYPES.TOGGLE_TASK:
            return state.map((task) =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case TASKS_TYPES.CLEAR_COMPLETED:
            return state.filter((task) => !task.completed);
        default:
            return state;
    }
}
