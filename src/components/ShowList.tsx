import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowItem from './ShowItem';
import { toast } from 'react-hot-toast';

const ShowList = () => {
  const [shows, setShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      const loadingToast = toast.loading('Loading shows...');
      try {
        const result = await axios.get(
          'https://api.tvmaze.com/search/shows?q=all'
        );

        setShows(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        toast.dismiss(loadingToast);
      }
    };

    fetchShows();
  }, []);

  return (
    <ul className="grid grid-cols-4 gap-x-6 gap-y-8 my-14 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
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
