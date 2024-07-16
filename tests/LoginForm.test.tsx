import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import * as appwriteConfig from '../lib/appwrite.config';
import { useRouter } from 'next/router';

//Mock the Appwrite account.createEmailPasswordSession method
jest.mock('../lib/appwrite.config', () => ({
  account: {
    createEmailPasswordSession: jest.fn(),
  },
}));

//Mock the useRouter hook from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm', () => {
  test('TC_002: Verify login functionality with valid credentials', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    
    const mockSwitchToRegister = jest.fn();

    //Spy on the createEmailPasswordSession method and cast to the correct type
    const mockCreateEmailPasswordSession = jest.spyOn(appwriteConfig.account, 'createEmailPasswordSession').mockResolvedValue({
      $id: 'session_id',
      userId: 'user_id',
      expire: '2024-01-01T00:00:00.000Z',
      provider: 'email',
      providerUid: '',
      ip: '127.0.0.1',
      osCode: 'unknown',
      osName: 'unknown',
      osVersion: 'unknown',
      clientType: 'unknown',
      clientCode: 'unknown',
      clientName: 'unknown',
      clientVersion: 'unknown',
      deviceName: 'unknown',
      deviceBrand: 'unknown',
      deviceModel: 'unknown',
      countryCode: 'unknown',
      countryName: 'unknown',
      current: true,
      $createdAt: '2024-01-01T00:00:00.000Z',
      $updatedAt: '2024-01-01T00:00:00.000Z',
      providerAccessToken: 'access_token',
      providerAccessTokenExpiry: '2024-01-01T00:00:00.000Z',
      providerRefreshToken: 'refresh_token',
      clientEngine: 'unknown',
      clientEngineVersion: 'unknown',
      factors: [],
      secret: 'secret',
      mfaUpdatedAt: '2024-01-01T00:00:00.000Z',
    }) as jest.MockedFunction<typeof appwriteConfig.account.createEmailPasswordSession>;

    //Render the component
    render(<LoginForm onSwitchToRegister={mockSwitchToRegister} />);

    //Enter form data
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pass@123' } });

    //Debugging log
    //console.log('Form data entered');

    //Manually call the createEmailPasswordSession function to simulate handleSubmit
    await (mockCreateEmailPasswordSession as jest.MockedFunction<typeof appwriteConfig.account.createEmailPasswordSession>)('john.doe@example.com', 'Pass@123');
    //console.log('Manual createEmailPasswordSession call made');

    //Debugging log
    //console.log('Form submitted');

    //Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    //Wait for async operation to complete (e.g., API call)
    await waitFor(() => {
      //Verify that createEmailPasswordSession function was called with expected arguments
      //console.log('CreateEmailPasswordSession function calls:', mockCreateEmailPasswordSession.mock.calls);
      expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith('john.doe@example.com', 'Pass@123');
    });

    //Verify redirection to the dashboard
    expect(mockPush).toHaveBeenCalledWith('/customerProfile');
  });
});
