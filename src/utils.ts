import { Task } from "./types";

// Функция для получения уникальных дат задач
export const getUniqueDates = (tasks: Task[]): string[] => {
    return [
        ...new Set(
            tasks
                .map((task) => task.date)
                .filter((date): date is string => date != null)
        ),
    ];
};
