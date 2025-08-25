import React from 'react';

type VisitingCardProps = {
  name: string;
  work: string;
  workColor?: string;
  email: string;
  telephone: string;
  location: string;
  image: string;
};

const VisitingCard: React.FC<VisitingCardProps> = ({
  name,
  work,
  workColor = 'text-blue-600',
  email,
  telephone,
  location,
  image,
}) => {
  return (
    <div className="w-80 bg-white rounded-xl shadow-md p-4 flex gap-4 items-start">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-800" data-testid="name">{name}</h3>
        <p className={`text-sm font-medium ${workColor}`} data-testid="work">{work}</p>
        <div className="mt-2 space-y-1 text-sm text-gray-700">
          <p data-testid="email">📧 {email}</p>
          <p>📞 {telephone}</p>
          <p>📍 {location}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard;
