import { backendLink } from '@/constants/constants';

export const uploadProfile = async (formData) => {
  try {
    const response = await fetch(`${backendLink}/api/profile`, {
      method: 'POST',
      body: formData,
    });

    const ok = response.ok;

    if (!ok) {
      throw new Error('Error uploading profile');
    }
    return ok;
  } catch (error) {
    console.error('Error uploading profile:', error);
    throw error;
  }
};

export const fetchProfile = async (userId: string) => {
  try {
    const response = await fetch(`${backendLink}/api/profile/${userId}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};