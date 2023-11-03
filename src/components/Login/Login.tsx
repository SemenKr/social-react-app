// Login.tsx
import  {FC} from "react";
import styles from './Login.module.scss'
import {Form, Field} from 'react-final-form';
import {Button, Checkbox, Container, Grid, TextField} from "@mui/material";
import {composeValidators, minLength, required} from "../utils/validators.ts";
import {connect} from "react-redux";
import {login, logout} from "../Redux/auth-reduce.ts";
import {Navigate} from "react-router";
import {FORM_ERROR} from "final-form";
import {AppStateType} from "../Redux/redux-store";


type LoginMapToStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type LoginMapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    logout: () => void
}
interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
    // Другие поля вашей формы
}


const LoginForm: FC<LoginMapToStateToPropsType & LoginMapDispatchToPropsType> = ({login, captchaUrl}) => {
    const onSubmit = async (values: FormData) => {
        try {
            await login(values.email, values.password, values.rememberMe, values.captcha);
        } catch (error) {
            return {[FORM_ERROR]: error.message};
        }
    };

    return (
        <Container maxWidth="sm">
            <Form onSubmit={onSubmit}>
                {({handleSubmit, submitting, pristine, form, submitError}) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Field<string>
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
                        <Field<string>
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
                        <Field<boolean>
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
                        {submitError && <span className={styles.form__summaryError}>{submitError}</span>}
                        {captchaUrl && <img src={captchaUrl} alt={"Captcha"}/>}
                        {captchaUrl &&
                            <Field<string>
                                name='captcha'
                                validate={composeValidators(required)}>
                                {({input, meta}) => (
                                    <div>
                                        <TextField
                                            label="captcha"
                                            {...input}
                                            error={meta.error && meta.touched}
                                            helperText={meta.touched && meta.error}
                                        />
                                    </div>
                                )}
                            </Field>}


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
                                        form.reset()
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

const Login: FC<LoginMapToStateToPropsType & LoginMapDispatchToPropsType> = ({isAuth, login, captchaUrl}) => {

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <>
            <h1>Вы не зарегистрированы</h1>
            <LoginForm login={login} isAuth={isAuth} logout={logout} captchaUrl={captchaUrl}/>
        </>
    )
}


const mapStateToProps = (state: AppStateType): LoginMapToStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login, logout})(Login);
