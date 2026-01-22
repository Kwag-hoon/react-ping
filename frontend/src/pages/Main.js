import React from 'react';

function Main() {
  return (
    <main>

      <img src={`${process.env.PUBLIC_URL}/images/hero.png`} alt="메인 히어로" />

    </main>
  );
}

export default Main;