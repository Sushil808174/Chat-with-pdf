import React from 'react';

const SearchResults = ({ results, onQuestion }) => {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          {result}
          <button onClick={() => onQuestion(result)}>Ask Question</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
