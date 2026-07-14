'use client';

import { useState } from 'react';
import { submitWaitlist } from '../actions/waitlist';

export default function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
    
    const formData = new FormData(e.target);
    const result = await submitWaitlist(formData);
    
    if (result.error) {
      setIsError(true);
      setMessage(result.error);
    } else {
      setIsError(false);
      setMessage("Thanks for joining the climb! We'll be in touch.");
      e.target.reset(); // clear the input
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <input 
          type="text" 
          name="contact"
          placeholder="Enter your email or WhatsApp..." 
          required
          style={{ padding: '1.2rem', fontSize: '1rem', border: '2px solid var(--background)', backgroundColor: 'transparent', color: 'var(--background)', outline: 'none', width: '100%', fontWeight: '500' }} 
        />
        <button 
          type="submit"
          disabled={loading}
          className="btn btn-full hover-scale" 
          style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', padding: '1.2rem', fontSize: '1rem', border: 'none', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'JOINING...' : 'JOIN THE CLIMB'}
        </button>
      </form>
      
      {message && (
        <p style={{ marginTop: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.875rem', color: isError ? '#ff4d4d' : '#25D366' }}>
          {message}
        </p>
      )}
    </div>
  );
}
