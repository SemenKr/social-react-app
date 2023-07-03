// Login.js
import React from "react";
import styles from './Login.module.scss'
import {Form, Field} from 'react-final-form';
import {Button, Checkbox, Container, Grid, TextField} from "@mui/material";
import {composeValidators, minLength, required} from "../utils/validators";
import {connect} from "react-redux";
import {login, logout} from "../Redux/auth-reduce";
import {Navigate} from "react-router";

const LoginForm = (props) => {
    const onSubmit = (values) => {
        console.log(values);
        props.login(values.email, values.password, values.rememberMe);
    };

    return (
        <Container maxWidth="sm">
            <Form onSubmit={onSubmit}>
                {({handleSubmit, submitting, pristine}) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Field
                            name='email'
                            validate={composeValidators(required, minLength(5))}
                        >
                            {({input, meta}) => (
                                <div>
                                    <TextField
                                        label="Имя"
                                        {...input}
                                        autoComplete="username"
                                        error={meta.error && meta.touched}
                                        helperText={meta.touched && meta.error}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field
                            name='password'
                            validate={composeValidators(required, minLength(5))}
                        >
                            {({input, meta}) => (
                                <div>
                                    <TextField
                                        label="Пароль"
                                        {...input}
                                        type='password'
                                        autoComplete="current-password"
                                        error={meta.error && meta.touched}
                                        helperText={meta.touched && meta.error}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field
                            name='agreement'
                            type='checkbox'
                            validate={required}
                        >
                            {({input, meta}) => (
                                <div>
                                    {meta.touched && meta.error && (
                                        <span className={styles.form__error}>{meta.error}</span>
                                    )}
                                    <Checkbox
                                        {...input}
                                        checked={input.value}
                                        onChange={input.onChange}
                                    />
                                    <label htmlFor="login-form-agree">Согласие</label>
                                </div>
                            )}
                        </Field>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitting || pristine}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    type="button"
                                    disabled={pristine}
                                    onClick={() => {
                                        // Сбросить значения полей
                                    }}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Form>
        </Container>
    );
}

const Login = (props) => {

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <>
            <h1>Вы не зарегистрированы</h1>
            <LoginForm login={props.login}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login, logout})(Login);
