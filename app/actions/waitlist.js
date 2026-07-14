'use server';

import { subscribeToWaitlist } from '../lib/shopify';

export async function submitWaitlist(formData) {
  const contact = formData.get('contact');
  if (!contact) return { error: 'Contact info is required.' };
  
  try {
    const res = await subscribeToWaitlist(contact);
    if (res?.customerUserErrors?.length > 0) {
      // Return the specific error from Shopify (e.g. "Email has already been taken")
      return { error: res.customerUserErrors[0].message };
    }
    return { success: true };
  } catch (err) {
    return { error: 'Failed to join waitlist. Please try again.' };
  }
}
