import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';
import ShowItem from './ShowItem';

const ShowList = () => {
  const [shows, setShows] = useState<any[]>([]);
  console.log(shows);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const result = await axios.get(
          'https://api.tvmaze.com/search/shows?q=all'
        );

        setShows(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchShows();
  }, []);

  return (
    <ul className="grid grid-cols-4 gap-x-6 gap-y-8 my-10">
      {shows.map((item) => {
        const show = item.show;

        return (
          <ShowItem
            key={item.show.id}
            id={item.show.id}
            image={show.image?.original}
            name={show.name}
            rating={show.rating?.average}
            premiered={show.premiered}
            runtime={show.runtime}
            language={show.language}
            genres={show.genres.join(', ')}
            type={show.type}
          />
        );
      })}
    </ul>
  );
};

export default ShowList;
