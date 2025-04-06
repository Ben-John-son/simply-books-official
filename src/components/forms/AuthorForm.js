'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
// import { getBooks } from '../../api/bookData';
import { createAuthor, updateAuthor } from '../../api/authorData';
// import { propTypes } from 'react-bootstrap/esm/Image';

const initialState = {
  first_name: '',
  last_name: '',
  image: '',
  favorite: false,
  email: '',
};

function AuthorForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   getBooks(user.uid).then(setBooks);

  //   if (obj.firebaseKey) setFormInput(obj);
  // }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>
      {/* IMAGE INPUT  */}

      {/* PRICE INPUT  */}

      {/* AUTHOR SELECT  */}
      {/* <FloatingLabel controlId="floatingSelect" label="Author">
        <Form.Select aria-label="Author" name="author_id" onChange={handleChange} className="mb-3" value={formInput.author_id || ''} required>
          <option value="">Select an Author</option>
          {authors.map((author) => (
            <option key={author.firebaseKey} value={author.firebaseKey}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel> */}

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="email" value={formInput.email} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default AuthorForm;
