import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

function CreatePost() {
    const initialValues = {
        title: "",
        postText: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Preencha o Título!"),
        postText: Yup.string().required("Preencha a Nota!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
           navigate('/');
        });
    };

    const navigate = useNavigate();

    return (
        <div className='create mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h2>Criar Nota</h2>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
                        <Form>
                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>Título</label>
                                <Field id='title' name='title' className='form-control' placeholder='Digite o título...' />
                                <ErrorMessage name='title' component='div' className='text-danger' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='postText' className='form-label'>Anotação</label>
                                <Field id='postText' name='postText' as='textarea' className='form-control' rows='4' placeholder='Digite sua anotação...' />
                                <ErrorMessage name='postText' component='div' className='text-danger' />
                            </div>
                            <button type='submit' className='btn btn-primary'>Criar Nota</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
