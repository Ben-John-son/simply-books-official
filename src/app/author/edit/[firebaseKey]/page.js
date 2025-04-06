'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleAuthor } from '../../../../api/authorData';
import AuthorForm from '../../../../components/forms/AuthorForm';

export default function EditAuthor({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return <AuthorForm obj={editItem} />;
}

EditAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
