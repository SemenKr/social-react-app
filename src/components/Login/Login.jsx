import React from "react";
import styles from './Login.module.scss'
import {Form, Field, FormSpy} from 'react-final-form';
// import createDecorator from 'final-form-focus';
import {Button, Container, Grid, TextField} from "@mui/material";


const required = values => (values ? undefined : "Required")
const LoginForm = (props) => {
    const onSubmit = (value) => {
        console.log(value);
    };

    return (
        <Container maxWidth="sm">
            <Form onSubmit={onSubmit}
                  subscription={{
                      submitting: true,
                  }}
                  // decorators={[createDecorator()]}
            >
                {({handleSubmit, values, submitting}) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
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
                                {/*<label htmlFor="fitstName">Имя</label>*/}
                                <TextField label="Имя" {...input} placeholder={placeholder} autoComplete="username"/>
                                {/*{meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}*/}
                                {/*<input {...input} placeholder={placeholder}/>*/}
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
                                <TextField label="Пароль" {...input} autoComplete="current-password"
                                           placeholder={placeholder}/>

                                {/*{meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}*/}
                                {/*<input {...input} autoComplete="current-password" placeholder={placeholder}/>*/}

                            </div>
                        )}</Field>
                        <Field name='Согласие'
                               validate={required}
                               component='input'
                               type='checkbox'
                        >{({input, meta, placeholder}) => (
                            <div className={styles.fieldWrapper}>
                                <label htmlFor="login-form-agree">Согласие</label>
                                {meta.error && meta.touched && <span className={styles.form__error}>{meta.error}</span>}
                                <input {...input} placeholder={placeholder} id="login-form-agree"/>
                            </div>
                        )}</Field>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <FormSpy subscription={{pristine: true}}>
                                    {props => (
                                        <Button
                                            variant="contained"
                                            type="button"
                                            disabled={props.pristine}
                                            onClick={() => props.form.reset()}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </FormSpy>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Form>
        </Container>
    )
}


const Login = () => {
    return (
        <>
            <h1>Вы не зарегестрированы</h1>
            {/*<LoginForm/>*/}
            <LoginForm/>
        </>

    )
};

export default Login;
