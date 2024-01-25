import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted!');

    return () => {
      console.log('Home component unmounted!');
    };
  }, []);

  return (
    <div>
      <h1>Welcome to BuilderIo!</h1>

    </div>
  );
};

export default Home;
