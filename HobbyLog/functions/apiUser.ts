import { backendLink } from '@/constants/constants'; 

export const uploadProfile = async (profileData) => {
  try {
    const formData = new FormData();
    formData.append('username', profileData.username);
    formData.append('hobbies', profileData.hobbies);
    formData.append('bio', profileData.bio);

    if (profileData.profileImage) {
      const uriParts = profileData.profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profileImage', {
        uri: profileData.profileImage,
        name: photo.${fileType},
        type: image/${fileType},
      });
    }

    const response = await fetch(`${backendLink}/api/profile`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading profile');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading profile:', error);
    throw error;
  }
};

export const fetchProfile = async (username) => {
  try {
    const response = await fetch(`${backendLink}/api/profile/${username}`);

    if (!response.ok) {
      throw new Error('Error fetching profile');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};