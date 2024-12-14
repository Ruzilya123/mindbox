import { useState } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { TasksFilter } from '../components/TasksFilter';

const mockDispatch = jest.fn();

jest.mock('../context', () => ({
    useTasks: () => ({
        tasks: [],
        filter: null,
        dispatch: mockDispatch,
    }),
}));

test('should change filter and clear completed tasks', () => {
    const MockWrapper = () => {
        const [filter, setFilter] = useState('all');

        jest.spyOn(require('../context'), 'useTasks').mockImplementation(() => ({
            tasks: [],
            filter: filter,
            dispatch: (action: { type: string; payload: string }) => {
                if (action.type === 'SET_FILTER') {
                    setFilter(action.payload);
                }
                mockDispatch(action);
            },
        }));

        return <TasksFilter />;
    };

    render(<MockWrapper />);

    // Проверка начального фильтра "All"
    expect(screen.getByText(/all/i, { selector: 'button' })).toHaveClass('active');

    // Проверка фильтра "Active"
    fireEvent.click(screen.getByText(/active/i, { selector: 'button' }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', payload: 'active' });
    expect(screen.getByText(/active/i, { selector: 'button' })).toHaveClass('active');

    // Проверка фильтра "Completed"
    fireEvent.click(screen.getByText(/completed/i, { selector: 'button.filter-button' }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', payload: 'completed' });
    expect(screen.getByText(/completed/i, { selector: 'button.filter-button' })).toHaveClass('active');

    // Проверка очистки выполненных задач
    const clearButton = screen.getByText(/clear completed/i, { selector: 'button.clear-button' });
    fireEvent.click(clearButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_COMPLETED' });
});
