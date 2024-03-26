import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function CreatePost() {
    const initialValues = {
        title: "",
        postText: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Preencha o Titulo!"),
        postText: Yup.string().required("Preencha a Nota!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
           navigate('/');
        });
    }

    const navigate = useNavigate();

  return (
    <div className='createPostPage'>
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
        <Form>
            <label>Titulo: </label>
            <ErrorMessage name='title' component="span"/>
            <Field id="inputCreatePost" name="title" placeholder="(Digite titulo...)"/>
            <ErrorMessage name='postText' component="span"/>
            <label>Anotação: </label>
            <Field id="inputCreatePost" name="postText" placeholder="(Digite sua nota...)"/>

             <button type='submit'> Criar Nota</button>
        </Form>
     </Formik>
    </div>
  )
}

export default CreatePost
