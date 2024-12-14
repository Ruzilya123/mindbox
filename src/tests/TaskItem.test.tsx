import { render, screen, fireEvent } from '@testing-library/react';
import { TaskContext } from '../context';
import { TaskItem } from '../components/TaskItem';

test('should toggle task completion and delete task', () => {
    const mockTask = { id: '1', title: 'Test Task', completed: false, date: '2024-12-13' };
    const mockDispatch = jest.fn();

    render(
        <TaskContext.Provider value={{ tasks: [mockTask], dispatch: mockDispatch, filter: 'all' }}>
            <TaskItem {...mockTask} />
        </TaskContext.Provider>
    );

    // Проверяем, что задача отображается
    expect(screen.getByText('Test Task', { selector: "label" })).toBeInTheDocument();

    // Проверяем, что чекбокс отображается
    const checkbox = screen.getByRole('checkbox', { name: "Test Task" });
    expect(checkbox).not.toBeChecked();

    // Проверяем вызов dispatch при клике на чекбокс
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_TASK', payload: '1' });

    // Проверяем вызов dispatch при клике на кнопку удаления
    const deleteButton = screen.getByRole('button', { name: '✕' });
    fireEvent.click(deleteButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_TASK', payload: '1' });
});
