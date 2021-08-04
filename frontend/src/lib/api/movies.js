import client from './client';

export const readMovie = (id) => client.get(`/api/movies/${id}`);
export const listMovies = () => client.get('/api/movies');

export const getMovies = () => {
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

  return client.get(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY_ID}&targetDt=${targetDt}`,
  );
};

export const getMovieInfo = (movie) => {
  const ID_KEY = 'wAnWY1Io25fSGFCYfbGK';
  const SECRET_KEY = 'meK_dyoyDq';

  return client.get('/v1/search/movie.json', {
    params: { query: movie, display: 1 },
    headers: {
      'X-Naver-Client-Id': ID_KEY,
      'X-Naver-Client-Secret': SECRET_KEY,
    },
  });
};

export const getComments = (title) => {
  client.get(`/api/movies/${title}`);
};
