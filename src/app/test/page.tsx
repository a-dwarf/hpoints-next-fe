'use client';

import React, { useState } from 'react';
import { verifyMessage } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x1997b5350e2e64bf5ad350c123c00d57f0c0a4a2d82d5d8bc294c7ccc49983d5')

// 0x9A54798A6d0b5172d06d782Ee74024b2091be58D
// 0x1997b5350e2e64bf5ad350c123c00d57f0c0a4a2d82d5d8bc294c7ccc49983d5

const CreateSpacePage = () => {
  const [address, setAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignMessage = async () => {
    try {
      const userAddress = '0x9A54798A6d0b5172d06d782Ee74024b2091be58D'
      const message = `Verify address: ${userAddress}`;
      const userSignature = await account.signMessage({ message: message})
      console.log('userAddress:',userAddress,"\nmessage:",message,"\nuserSignature:",userSignature)

      const valid = await verifyMessage({ 
        address: account.address,
        message: message,
        signature: userSignature,
      })
      console.log(valid)

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

    const response = await fetch('/api/spaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        signature,
        name,
        avatar,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess(`Space created: ${data.name}`);
      setError('');
    } else {
      const errorData = await response.json();
      setError(`Error: ${errorData.error}`);
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Create New Space</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button className="btn btn-outline btn-primary" onClick={handleSignMessage}>Sign Message</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar URL</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-outline btn-primary" type="submit">Create Space</button>
      </form>
    </div>
  );
};

export default CreateSpacePage;
