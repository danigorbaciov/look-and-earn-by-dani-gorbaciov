'use client';

const SOCIALS = [
  { name: 'Facebook', color: '#1877F2', icon: 'f' },
  { name: 'Instagram', color: '#E4405F', icon: 'ig' },
  { name: 'YouTube', color: '#FF0000', icon: 'yt' },
  { name: 'LinkedIn', color: '#0A66C2', icon: 'in' },
  { name: 'X', color: '#000', icon: 'x' },
];

export default function SocialBadges() {
  return (
    <div className="flex gap-4 mt-4 justify-center">
      {SOCIALS.map(s => (
        <div
          key={s.name}
          className="badge-social w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: s.color }}
          title={s.name}
        >
          {s.icon}
        </div>
      ))}
    </div>
  );
}
