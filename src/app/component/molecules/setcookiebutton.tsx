import Cookies from 'js-cookie';
import React from 'react';

const SetCookieButton: React.FC = () => {
  const handleSetCookie = (): void => {
    Cookies.set('username', 'budi', { expires: 7 });
  };

  return (
    <button onClick={handleSetCookie}>
      Set Cookie
    </button>
  );
};

export default SetCookieButton;
