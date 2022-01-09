import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AdminLanguage() {
  return (
    <div className="container">
      <div>
        <p>This is the admin language tab!</p>
      </div>
    </div>
  );
}

export default AdminLanguage;
