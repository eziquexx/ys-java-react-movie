// 2. JSON 파일 읽어오기
//npm install axios
// 목록주소
// https://yts.mx/api/v2/list_movies.json
// https://yts-proxy.now.sh/list_movies.json
// 상세보기주소
// https://yts.mx/api/v2/movie_details.json?movie_id=11
// https://yts-proxy.now.sh/movie_detail.json?movie_id=11

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  // 상태변수를 설정
  const [isLoading, setIsLoading] = useState(true);
  const [loadCounter, setLoadCounter] = useState(0);
  const [movies, setMovies] = useState(null);

  // sync: 동기
  // async: 비동기
  // await 사용하여 axios.get 호출의 결과를 기다린다.
  // awiat 키워드는 비동기 작업의 결과를 기다리면서 코드의 가독성을 높이고, 예외 처리를 단순화하는데 사용된다.
  const fetchMovies = async () => {
    console.log('fetchMovies 호출')
    const response = await axios.get('https://yts-proxy.now.sh/list_movies.json');
    console.log(response.data.data.movies);
    setMovies(response.data.data.movies);
    setIsLoading(false);
  }

  function displayMovies() {

      return (
        <div>
          <h1>Movie List</h1>
          <ul>
            {
              movies.map((item) => {
                return <li key={item.id}>{item.title}</li>
              })
            }
          </ul>
        </div>
      );
  }


  useEffect(() => {
    console.log('useEffect 발생');
    fetchMovies();
   
  }, [loadCounter]);

  return (
    <div>
      {isLoading ? `Loading... ${loadCounter}` : displayMovies() }
    </div>
  );
}

export default App;