// QUICKCLIP: React Frontend Starter (simplified)

import React, { useState } from 'react';
import axios from 'axios';

export default function QuickClipApp() {
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('');
  const [clips, setClips] = useState([]);

  const handleSubmit = async () => {
    setStatus('Uploading...');
    try {
      const res = await axios.post('https://your-api.com/api/clip', {
        url: videoUrl
      });
      setClips(res.data.clips);
      setStatus('Done!');
    } catch (err) {
      console.error(err);
      setStatus('Error creating clips');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">QuickClip</h1>
      <p className="mb-4">Paste a Twitch, YouTube, or WorldStar URL to auto-generate clips.</p>
      <input
        type="text"
        className="w-full p-2 text-black"
        placeholder="Enter video URL..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-500"
      >
        Create Clips
      </button>
      <p className="mt-4">{status}</p>

      <div className="mt-8 grid gap-4">
        {clips.map((clip, i) => (
          <video key={i} src={clip.url} controls className="w-full rounded" />
        ))}
      </div>
    </div>
  );
}
