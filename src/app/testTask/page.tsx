'use client';

import React, { useState } from 'react';
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x1997b5350e2e64bf5ad350c123c00d57f0c0a4a2d82d5d8bc294c7ccc49983d5')

const CreateTaskPage = () => {
  const [address, setAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [spaceId, setSpaceId] = useState('');
  const [eventTypeId, setEventTypeId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignMessage = async () => {
    try {
      const userAddress = '0x9A54798A6d0b5172d06d782Ee74024b2091be58D'
      const message = `Verify address: ${userAddress}`;
      const userSignature = await account.signMessage({ message: message})

      setAddress(userAddress);
      setSignature(userSignature);
      setError('');
    } catch (err) {
      setError('Error signing message');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !signature) {
      setError('Please sign the message first');
      return;
    }

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        signature,
        spaceId,
        eventTypeId,
        name,
        description,
        status,
        startDate,
        endDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess(`Task created: ${data.name}`);
      setError('');
    } else {
      const errorData = await response.json();
      setError(`Error: ${errorData.error}`);
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={handleSignMessage}>Sign Message</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Space ID</label>
          <input
            type="text"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Type ID</label>
          <input
            type="text"
            value={eventTypeId}
            onChange={(e) => setEventTypeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
