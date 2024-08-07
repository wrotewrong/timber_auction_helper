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
    if (props.fileType === 'catalog' && file?.name === 'productsDataMDB.xlsx') {
      dispatch(importCatalogRequest(file));
    } else if (
      props.fileType === 'offers' &&
      file?.name === 'offersDataMDB.xlsx'
    ) {
      dispatch(importOffersRequest(file));
    } else if (
      props.fileType === 'companies' &&
      file?.name === 'companiesDataMDB.xlsx'
    ) {
      dispatch(importCompaniesRequest(file));
    }
  };

  return (
    <Form onSubmit={handleSubmit} bg='success'>
      <Form.Group controlId='formAdd'>
        <Form.Control
          className='border border-success'
          type='file'
          accept='.xlsx'
          onChange={(e) => setFile(e.target.files[0])}
        ></Form.Control>
      </Form.Group>

      <Button variant='outline-success' className='mt-3' type='submit'>
        Wyślij plik
      </Button>
    </Form>
  );
};
