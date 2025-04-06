'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';
import AuthorCard from '../../components/AuthorCard';

function AuthorsDisplay() {
  // TODO: Set a state for books
  const [authors, setAuthors] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the authors
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // TODO: make the call to the API to get all the authors on component render
  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
        ))}
      </div>
    </div>
  );
}

export default AuthorsDisplay;
