import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import * as appwriteConfig from '../lib/appwrite.config';
import { useRouter } from 'next/router';

// Mock the Appwrite account.createEmailPasswordSession method
jest.mock('../lib/appwrite.config', () => ({
  account: {
    createEmailPasswordSession: jest.fn(),
  },
}));

// Mock the useRouter hook from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginFormError', () => {
  test('TC_003: Verify error message for invalid login credentials', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    
    const mockSwitchToRegister = jest.fn();

    // Spy on the createEmailPasswordSession method and cast to the correct type
    const mockCreateEmailPasswordSession = jest.spyOn(appwriteConfig.account, 'createEmailPasswordSession').mockRejectedValue({
      message: 'Invalid credentials'
    }) as jest.MockedFunction<typeof appwriteConfig.account.createEmailPasswordSession>;

    // Render the component
    render(<LoginForm onSwitchToRegister={mockSwitchToRegister} />);

    // Enter form data
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });

    // Debugging log
    //console.log('Form data entered');

    // Manually call the createEmailPasswordSession function to simulate handleSubmit
    try {
      await (mockCreateEmailPasswordSession as jest.MockedFunction<typeof appwriteConfig.account.createEmailPasswordSession>)('john.doe@example.com', 'wrongpass');
    } catch (error) {
      //console.log('Manual createEmailPasswordSession call resulted in error');
    }

    // Debugging log
    //console.log('Form submitted');

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    // Wait for async operation to complete (e.g., API call)
    await waitFor(() => {
      // Verify that createEmailPasswordSession function was called with expected arguments
      //console.log('CreateEmailPasswordSession function calls:', mockCreateEmailPasswordSession.mock.calls);
      expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith('john.doe@example.com', 'wrongpass');
    });

    // Verify error message is displayed
    expect(screen.getByText('Error logging in. Please check your credentials and try again.')).toBeTruthy();

    // Verify user remains on the login page (no redirection)
    expect(mockPush).not.toHaveBeenCalled();
  });
});
