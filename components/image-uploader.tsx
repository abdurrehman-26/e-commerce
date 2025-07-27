'use client';

import axios from 'axios';
import { signData } from '@/types';
import { InputWithLabel } from './Input-with-label';
import { API_SERVER } from '@/constants';

type Props = {
  onUpload: (images: string[]) => void;
};

export const ImageUpload: React.FC<Props> = ({ onUpload }) => {

  const handleUpload = async (file: File): Promise<string | null> => {
  try {
    const signres = await fetch(
      `${API_SERVER}/api/v1/cloudinary/signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
      }
    );
    const signData: signData = await signres.json();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signData.apiKey);
    formData.append('timestamp', signData.timestamp);
    formData.append('signature', signData.signature);
    formData.append('folder', signData.folder);

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dxpjusmf7/auto/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return res.data.secure_url;
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const uploads = await Promise.all(
    Array.from(files).map((file) => handleUpload(file))
  );

  // Filter out failed uploads (if handleUpload returns null or undefined on failure)
  onUpload(uploads.filter((url): url is string => typeof url === 'string'));
};


  return (
    <div className="space-y-4">
      <InputWithLabel label='Product images' multiple type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};
