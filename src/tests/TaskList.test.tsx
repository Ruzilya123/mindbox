import { render, screen } from '@testing-library/react';
import { TaskContext } from '../context';
import { TaskList } from '../components/TaskList';

test('should render filtered tasks', () => {
    const mockTasks = [
        { id: '1', title: 'Task 1', completed: true, date: '2024-12-12' },
        { id: '2', title: 'Task 2', completed: false, date: '2024-12-13' },
        { id: '3', title: 'Task 3', completed: false, date: '2024-12-12' },
    ];

    render(
        <TaskContext.Provider value={{ tasks: mockTasks, filter: 'all', dispatch: jest.fn() }}>
            <TaskList />
        </TaskContext.Provider>
    );

    // Проверка отображения задач в списке
    expect(screen.getByText('Task 1', { selector: "label" })).toBeInTheDocument();
    expect(screen.getByText('Task 2', { selector: "label" })).toBeInTheDocument();
    expect(screen.getByText('Task 3', { selector: "label" })).toBeInTheDocument();
});
