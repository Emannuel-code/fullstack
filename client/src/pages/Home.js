import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [listOfPosts, setListOfPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((response) => {
      setListOfPost(response.data);
    });
  }, []);

  return (
    <div className="box mt-4">
      <div className="collum">
        {listOfPosts.map((value, key) => (
          <div key={key} className="col-md-4 mb-4">
            <div
              className="card custom-card" 
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              <div className="card-body">
                <h5 className="card-title custom-title">{value.title}</h5> 
                <p className="card-text custom-text">{value.postText}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
