import { render, screen, fireEvent } from '@testing-library/react';
import { TaskContext } from '../context';
import { AddTaskForm } from '../components/AddTaskForm';
import { FilterState, TASKS_TYPES } from "../types";

const mockDispatch = jest.fn();

const mockContextValue = {
    tasks: [],
    dispatch: mockDispatch,
    filter: 'all' as FilterState,
};

test('should add a task and clear input fields', () => {
    render(
        <TaskContext.Provider value={mockContextValue}>
            <AddTaskForm />
        </TaskContext.Provider>
    );

    // Вводим задачу
    const input = screen.getByPlaceholderText("Add a task", { trim: false }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Task' } });

    // Проверяем, что значение обновилось
    expect(input.value).toBe('New Task');

    // Нажимаем на кнопку добавления задачи
    fireEvent.click(screen.getByText("Add Task", { selector: "button" }));

    // Проверяем, что задача была добавлена через dispatch
    expect(mockDispatch).toHaveBeenCalledWith({
        type: TASKS_TYPES.ADD_TASK,
        payload: { title: 'New Task', date: null, completed: false, id: "" },
    });

    // Проверяем, что поля ввода очищаются
    expect(input.value).toBe('');
});
