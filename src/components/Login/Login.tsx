//
import React from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
import {Navigate} from "react-router";
import {ErrorMessageWrapper, validateEmailField} from "../utils/validators";
import {login} from "../Redux/auth-reduce";


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(15, 'Must be shorter than 15 characters')
        .required('Required 2')
})


export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector(
        (state: AppStateType) => state.auth.captchaUrl)

    const isAuth = useSelector(
        (state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()


    if (isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div className={""}>
            <h2> Login page </h2>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    general: '',
                    captcha: ''
                }}
                validate={validateEmailField}
                validationSchema={validationSchema}

                onSubmit={(
                    values,
                    bagWithMethods) => {

                    let {setStatus, setFieldValue, setSubmitting} = bagWithMethods

                    dispatch(login(
                        values,
                        setStatus,
                        setFieldValue,
                        setSubmitting))
                }}
            >
                {(propsF) => {
                    let {status, values, isSubmitting} = propsF
                    //console.log( status );
                    //console.log( values.general );
                    //console.log( propsF.isSubmitting );

                    return (
                        <Form>
                            <div>

                                {values.general &&
                                    <div>
                                        _.{values.general} - with setFieldValue
                                    </div>}

                                {status &&
                                    <div className={""}>
                                        ..{status}
                                    </div>}

                                {status && captchaUrl &&
                                    <div>

                                        <div>
                                            <img src={captchaUrl} alt={status} />
                                        </div>

                                        <div>
                                            <Field
                                                name={'captcha'}
                                                type={'text'} />
                                        </div>

                                    </div>
                                }

                                <div>
                                    <Field
                                        name={'email'}
                                        type={'text'}
                                        placeholder={'email'} />
                                </div>
                                <ErrorMessage name='email'>
                                    {ErrorMessageWrapper}
                                </ErrorMessage>

                                <div className={""}>
                                    <Field
                                        name={'password'}
                                        type={'password'}
                                        placeholder={'password'} />
                                </div>
                                <ErrorMessage name='password'>
                                    {ErrorMessageWrapper}
                                </ErrorMessage>

                                <div className={""}>
                                    <Field
                                        type={'checkbox'}
                                        name={'rememberMe'}
                                        id='rememberMe' />
                                    <label htmlFor={'rememberMe'}> remember me </label>
                                </div>

                                <button type={'submit'}
                                        disabled={isSubmitting}
                                        className={""}
                                >{isSubmitting ? 'Please wait...' : 'Submit'}</button>
                                <br /><br />

                            </div>
                        </Form>
                    )
                }
                }
            </Formik>

        </div>
    )
}


//region Description
// так пишем если ошибку вывести без красного шрифта
// <ErrorMessage name="email" component="div" />

// lel = {errors, touched, isValid, dirty, status} = props;
//endregion

