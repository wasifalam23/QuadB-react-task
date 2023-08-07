import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  image: string;
  name: string;
  rating: number;
  premiered: string;
  runtime: string;
  language: string;
  genres: string;
  type: string;
}

const ShowItem: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const readSummaryHandler = () => {
    navigate(`/summary/${props.name}`);
  };

  return (
    <li className="bg-orange-50">
      <div>
        <img className="w-full h-96" src={props.image} alt={props.name} />

        <div className="px-3 pb-4 mt-2 text-sm text-gray-700 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg text-teal-700 font-medium">{props.name}</h3>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className=" font-medium">
                {props.rating ? props.rating : 'N/A'}
              </span>
            </div>
          </div>
          <p>Premiered: {props.premiered}</p>
          <p>Runtime: {props.runtime} minutes</p>
          <p>Language: {props.language}</p>
          <p>Genres: {props.genres}</p>
          <p>Type: {props.type}</p>
          <button
            onClick={readSummaryHandler}
            className="self-end mt-2 hover:underline text-teal-600"
          >
            Show Summary
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShowItem;
