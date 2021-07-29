import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';

const getFormatDate = (date) => {
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let nDate = (date.getDate() - 1).toString();
  if (month < 10) {
    month = '0' + month;
  }
  if (nDate < 10) {
    nDate = '0' + nDate;
  }
  return year + month + nDate;
};
const KEY_ID = '2e46568045dda0e8785b8bf3e3b5f18b';
const targetDt = getFormatDate(new Date());

function GetMovie() {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY_ID}&targetDt=${targetDt}`,
        );
        const data = response.data.boxOfficeResult.dailyBoxOfficeList;
        data.forEach((movie) => getMovieInfo(movie.movieNm));
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  const getMovieInfo = async (movie) => {
    const ID_KEY = 'wAnWY1Io25fSGFCYfbGK';
    const SECRET_KEY = 'meK_dyoyDq';
    try {
      const response = await axios.get('/v1/search/movie.json', {
        params: { query: movie, display: 1 },
        headers: {
          'X-Naver-Client-Id': ID_KEY,
          'X-Naver-Client-Secret': SECRET_KEY,
        },
      });
      let { userRating, director, actor, image, pubDate } =
        response.data.items[0];

      director = director.replace(/\|/g, ', ');
      director = director.slice(0, -2);
      actor = actor.replace(/\|/g, ', ');
      actor = actor.slice(0, -2);

      const movieInfo = {
        title: movie,
        rating: userRating,
        director,
        actor,
        image,
        pubDate,
      };
      setMovieList((movieList) => movieList.concat(movieInfo));
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieList) {
    return null;
  }

  return (
    <div className="movie-container">
      {movieList.map((movie, idx) => (
        <Movie key={idx} movie={movie} />
      ))}
    </div>
  );
}

export default GetMovie;
