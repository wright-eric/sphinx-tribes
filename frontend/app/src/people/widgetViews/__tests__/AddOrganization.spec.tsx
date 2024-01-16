import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mainStore } from 'store/main';
import AddOrganization from '../organization/AddOrganization';
const mockCloseHandler = jest.fn();
const mockGetUserOrganizations = jest.fn();
const mockOwnerPubKey = 'somePublicKey';

describe('AddOrganization Component Tests', () => {
  test('Organization Name text field appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByPlaceholderText('My Organization...')).toBeInTheDocument();
  });

  test('Website text field appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByPlaceholderText('Website URL...')).toBeInTheDocument();
  });

  test('Github repo text field appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByPlaceholderText('Github link...')).toBeInTheDocument();
  });

  test('Logo button appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByText('LOGO')).toBeInTheDocument();
  });

  test('Description box appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByPlaceholderText('Description Text...')).toBeInTheDocument();
  });

  test('Add Org button appears', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );
    expect(screen.getByText('Add Organization')).toBeInTheDocument();
  });

  test('Org Name character limit restriction works', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );

    const orgNameInput = screen.getByPlaceholderText(/My Organization.../i);
    fireEvent.change(orgNameInput, { target: { value: '123456789012345678901' } });

    expect(orgNameInput).toHaveStyle('border-color: #FF8F80');
    expect(screen.getByText('Name is too long.')).toBeInTheDocument();
  });

  test('Org Description character limit restriction works', () => {
    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );

    const descriptionInput = screen.getByPlaceholderText(/Description Text.../i);
    fireEvent.change(descriptionInput, {
      target: {
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur'
      }
    });

    expect(descriptionInput).toHaveStyle({
      borderColor: '#FF8F80'
    });
    expect(screen.getByText('Description is too long.')).toBeInTheDocument();
  });

  test('Clicking on Add Org button triggers an action', async () => {
    const mockCloseHandler = jest.fn();
    const mockGetUserOrganizations = jest.fn();
    const mockOwnerPubKey = 'somePublicKey';
    jest.spyOn(mainStore, 'addOrganization').mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({})
      })
    );

    render(
      <AddOrganization
        closeHandler={mockCloseHandler}
        getUserOrganizations={mockGetUserOrganizations}
        owner_pubkey={mockOwnerPubKey}
      />
    );

    const addButton = screen.getByText('Add Organization');
    expect(addButton).toBeInTheDocument();
    const orgNameInput = screen.getByPlaceholderText(/My Organization.../i);
    fireEvent.change(orgNameInput, { target: { value: 'My Org' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockCloseHandler).toHaveBeenCalled();
      expect(mockGetUserOrganizations).toHaveBeenCalled();
    });
  });
});
