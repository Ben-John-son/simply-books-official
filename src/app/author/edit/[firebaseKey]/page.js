'use client';

import React, { useEffect, useState } from 'react';
import { getSingleAuthor } from '@/api/authorData';
import AuthorForm from '@/components/forms/AuthorForm';
import PropTypes from 'prop-types';

export default function EditAuthor({ params }) {
  const [editItem, setEditItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { firebaseKey } = params;

  useEffect(() => {
    if (firebaseKey) {
      getSingleAuthor(firebaseKey)
        .then((data) => {
          setEditItem(data);
          setIsLoading(false);
        })
        .catch((er) => {
          setError('Failed to load author data.');
          setIsLoading(false);
          console.log(er);
        });
    }
  }, [firebaseKey]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <AuthorForm obj={editItem} />;
}

EditAuthor.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
