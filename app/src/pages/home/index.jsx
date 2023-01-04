import React, { useEffect, useContext, useState } from 'react';

import { CustomThemeContext } from 'theme/index';

import Header from './header';
import Hero from './hero';
import Info from './info';
import Highlight from './highlight';
import Footer from './footer';

const Home = () => {
  const { setTheme } = useContext(CustomThemeContext);
  const [updated, setUpdated] = useState(false);
  let date = new Date();
  let rand = Math.floor(date.getMinutes() / 10) + 1;

  useEffect(() => {
    setTheme('home' + rand);
    setUpdated(true);
  }, []);

  if (updated)
    return (
      <>
        <Header />
        <Hero />
        <Info />
        <Highlight />
        <Footer />
      </>
    );
};

export default Home;
