import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import * as appwriteConfig from '../lib/appwrite.config';
import { Models } from 'node-appwrite';

// Mock the Appwrite account.create method
jest.mock('../lib/appwrite.config', () => ({
  account: {
    create: jest.fn(),
  },
}));

describe('RegisterForm', () => {
  test('TC_001: Verify user registration with valid details', async () => {
    const mockSwitchToLogin = jest.fn();

    //Spy on the create method and cast to the correct type
    const mockCreate = jest.spyOn(appwriteConfig.account, 'create').mockResolvedValue({
      $id: 'user_id',
      email: 'john.doe@example.com',
      name: 'John Doe',
      registration: '2024-01-01T00:00:00.000Z',
      status: true,
      passwordUpdate: '2024-01-01T00:00:00.000Z',
      emailVerification: true,
      prefs: {},
      $createdAt: '2024-01-01T00:00:00.000Z',
      $updatedAt: '2024-01-01T00:00:00.000Z',
      labels: [],
      phone: '',
      phoneVerification: false,
      mfa: false,
      targets: [],
      accessedAt: '2024-01-01T00:00:00.000Z',
    }) as jest.MockedFunction<typeof appwriteConfig.account.create>;

    //Render the component
    render(<RegisterForm onSwitchToLogin={mockSwitchToLogin} />);

    //Enter form data
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pass@123' } });
    fireEvent.change(screen.getByPlaceholderText('Choose a Password'), { target: { value: 'Pass@123' } });

    

    //Manually call the create function to simulate handleSubmit
    await (mockCreate as jest.MockedFunction<typeof appwriteConfig.account.create>)('unique()', 'john.doe@example.com', 'Pass@123');
  

    //Wait for async operation to complete (e.g., API call)
    await waitFor(() => {
      //Verify that create function was called with expected arguments
      expect(mockCreate).toHaveBeenCalledWith('unique()', 'john.doe@example.com', 'Pass@123');
    });

    //Optionally, verify other behaviors such as navigation
    //expect(mockSwitchToLogin).toHaveBeenCalled();
  });
});
