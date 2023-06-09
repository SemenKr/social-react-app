import React from "react";
import styles from './Login.module.scss'
import {Form, Field, FormSpy} from 'react-final-form';
import createDecorator from 'final-form-focus';


const required = values => (values ? undefined : "Required")
const LoginForm = (props) => {
    const onSubmit = (value) => {
        console.log(value);
    };

    return (
        <Form onSubmit={onSubmit}
              subscription={{
                  submitting: true,
              }}
              decorators={[createDecorator()]}
        >
            {({handleSubmit, values, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <Field name='Имя'
                           placeholder='Имя'
                           validate={required}
                           component='input'
                           subscription={{
                               value: true,
                               active: true,
                               touched: true,
                               error: true,
                           }}
                    >{({input, meta, placeholder}) => (
                        <div className={`${styles.fieldWrapper} ${meta.active ? styles.active : ''}`}>
                            <label htmlFor="fitstName">Имя</label>
                            {meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}
                            <input {...input} placeholder={placeholder}/>
                        </div>
                    )}</Field>
                    <Field name='Пароль'
                           placeholder='Пароль'
                           validate={required}
                           component='input'
                           type='password'
                           subscription={{
                               value: true,
                               active: true,
                               touched: true,
                               error: true,
                           }}
                    >{({input, meta, placeholder}) => (
                        <div className={`${styles.fieldWrapper} ${meta.active ? styles.active : ''}`}>
                            <label htmlFor="password">Пароль</label>
                            {meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}
                            <input {...input} autoComplete="current-password" placeholder={placeholder}/>

                        </div>
                    )}</Field>
                    {/*<Field name="myField">*/}
                    {/*    {props => (*/}
                    {/*        <div>*/}
                    {/*            <TextField*/}
                    {/*                name={props.input.name}*/}
                    {/*                value={props.input.value}*/}
                    {/*                onChange={props.input.onChange}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</Field>*/}
                    <Field name='Согласие'
                           validate={required}
                           component='input'
                           type='checkbox'
                    >{({input, meta, placeholder}) => (
                        <div className={styles.fieldWrapper}>
                            <label htmlFor="">Согласие</label>
                            {meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}
                            <input {...input} placeholder={placeholder}/>
                        </div>
                    )}</Field>
                    <button type="submit" disabled={submitting}>Login</button>
                    <FormSpy subscription={{ pristine: true }}>
                        {props => (
                            <button
                                type="button"
                                disabled={props.pristine}
                                onClick={() => props.form.reset()}
                            >
                                Reset
                            </button>
                        )}
                    </FormSpy>
                </form>
            )}
        </Form>
    )
}


const Login = () => {
    return (
        <>
            <h1>Вы не зарегестрированы</h1>
            <LoginForm/>
        </>

    )
};

export default Login;
