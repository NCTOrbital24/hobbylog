import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HobbyCard from '../HobbyCard/HobbyCard';
import { Hobby } from '../../functions/HobbyConstructor';
import { useRouter } from 'expo-router';

// Mock useRouter
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('HobbyCard', () => {
  const mockNavigate = jest.fn();
  const mockHobby = {
    _id: '1',
    name: 'Test Hobby',
    description: 'This is a test hobby.',
    goals: [
      {
        _id: 'goal1',
        name: 'Goal 1',
        description: 'Description for goal 1',
        deadline: new Date(),
        completed: false,
        exp: 50,
      },
    ],
    tasks: [
      {
        _id: 'task1',
        name: 'Task 1',
        description: 'Description for task 1',
        frequency: 'daily',
        lastDueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        exp: 30,
      },
    ],
  };

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders hobby name and description correctly', () => {
    const { getByText } = render(<HobbyCard hobby={mockHobby} />);
    expect(getByText('Test Hobby')).toBeTruthy();
    expect(getByText('This is a test hobby.')).toBeTruthy();
  });

  it('navigates to edit hobby screen on press', () => {
    const { getByText } = render(<HobbyCard hobby={mockHobby} />);
    fireEvent.press(getByText('Test Hobby'));
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: 'EditHobbyScreen',
      params: { hobbyId: '1' },
    });
  });
});
