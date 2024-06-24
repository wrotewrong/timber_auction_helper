import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { importCatalogRequest } from '../../../redux/catalogRedux';
import {
  importOffersRequest,
  importCompaniesRequest,
} from '../../../redux/contractsRedux';

export const FileForm = (props) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.fileType === 'catalog') {
      dispatch(importCatalogRequest(file));
    } else if (props.fileType === 'offers') {
      dispatch(importOffersRequest(file));
    } else if (props.fileType === 'companies') {
      dispatch(importCompaniesRequest(file));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formAdd'>
          <Form.Label>Załącz plik excel</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
          ></Form.Control>
        </Form.Group>

        <Button type='submit'>Wyślij Dane</Button>
      </Form>
    </div>
  );
};
