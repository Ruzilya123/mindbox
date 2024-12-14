import { FilterReducerAction, FilterState, TASKS_TYPES } from "../types";

export const filterReducer = (state: FilterState, action: FilterReducerAction): FilterState => {
    switch (action.type) {
        case TASKS_TYPES.SET_FILTER:
            return action.payload;
        default:
            return state;
    }
};
