import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

// Models
import { User } from './js/user.class';

const Ejer = () => {


    let user = new User();

    const initialValues = {
        user1:[{
        username: '',
        email: '',
        password: '',
        confirm: '', // to confirm password

    }]
    
    }

    const registerSchema = Yup.object().shape(
        {
            username: Yup.string()
                .min(6, 'Username too short')
                .max(15, 'Username too long')
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password too short')
                .required('Password is required'),
            confirm: Yup.string()
                .when("password", {
                    is: value => (value && value.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        '¡Passwords must match!'
                    )
                }).required('You must confirm the password')
        }
    )

    const submit = (values) => {
        alert('Register user')
    }

    return (
        <div>
            <h4>Register Formik</h4>
            <Formik
                initialValues = {initialValues}
                // *** Yup Validation Schema ***
                validationSchema = {registerSchema}
                // ** onSubmit Event
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2))
                }}
            >

            {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        
                        <Form>
                        <FieldArray name='username'>
                        {({remove, push }) => (
                        <div>
                        {values.user1.length > 0 &&
                       values.user1.map((user1, index) => (
                          <div>
                            <label htmlFor="username">Username</label>
                            <Field id="username"type="text" name="username" placeholder="Your username" />
                            
                            {/* Username Errors */}
                            {
                                errors.username && touched.username &&values.username&& 
                                (
                                    <ErrorMessage name="username" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="email">Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && values.email&&
                                (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                placeholder="password"
                                type='password'
                            />
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && values.password&&
                                (
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="confirm">Password</label>
                            <Field
                                id="confirm"
                                name="confirm"
                                placeholder="confirm passsword"
                                type='password'
                            />
                            {/* Confirm Password Errors */}
                            {
                                errors.confirm && touched.confirm && values.confirm&&
                                (
                                    <ErrorMessage name="confirm" component='div'></ErrorMessage>
                                )
                            }
                         <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          eliminate user
                        </button>
                       </div>
                      </div>
                        ))}
                            <button
                             type="button"
                             className="secondary"
                             onClick={() => push({ username: '', email: '',password:'',confirm:'' })}>
                             Add User
                           </button>
                           <button type="submit">Register Account</button>
                            </div>
                            
                        )}
                        </FieldArray>
                           
                            {isSubmitting ? (<p>Sending your credentials...</p>): null}

                        </Form>
                    )
            }

            </Formik>
        </div>
    );
}

export default Ejer;
