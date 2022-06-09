import React from 'react';
import { Link } from 'react-router-dom';

function ResultPage() {
  return (
    <div className="container mx-auto">
      <ul>
        <li>
          <Link to="/cabinet/personal-data">My profile</Link>
        </li>
        <li>
          <Link to="/">Main page</Link>
        </li>
      </ul>
    </div>
  );
}

export default ResultPage;
