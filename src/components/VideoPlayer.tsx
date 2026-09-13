'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  video: { id: string; title: string; src: string; points: number };
  onVerified: (viewId: string) => void;
}

export default function VideoPlayer({ video, onVerified }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watched, setWatched] = useState(0);
  const [verified, setVerified] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setWatched(v.currentTime);
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  const handleEnded = () => {
    if (watched > 10) setQuiz(true); // require at least 10s watch
  };

  const checkQuiz = () => {
    if (answer.toLowerCase().includes('ai')) {
      setVerified(true);
      onVerified(video.id);
      setQuiz(false);
    } else {
      alert('Try again');
    }
  };

  return (
    <div className="video-container bg-black">
      <video
        ref={videoRef}
        src={video.src}
        controls
        onEnded={handleEnded}
        className="w-full h-full object-cover"
        poster="https://picsum.photos/seed/lookearn/1280/720"
      />
      {quiz && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8">
          <h3 className="text-xl mb-4">Quick check: What powers these videos?</h3>
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="bg-gray-800 p-2 rounded mb-4 w-full max-w-xs"
            placeholder="Type your answer..."
          />
          <button onClick={checkQuiz} className="bg-green-500 px-6 py-2 rounded">Verify</button>
        </div>
      )}
      {verified && <div className="absolute top-4 right-4 bg-green-500 px-3 py-1 rounded">+1 Point</div>}
    </div>
  );
}
