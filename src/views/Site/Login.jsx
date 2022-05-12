import { useEffect, useState } from 'react';
import getApiRequest from "../../drivers/apiCall"
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { pages } from "./../../links/pages";
import { useKsForm } from '../../drivers/index';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        marginTop: 30,
        padding: 20,
    },
    avatar: {
        margin: 5,
        backgroundColor: "#eee",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 5,
    },
    submit: {
        marginTop: 10,
        marginBottom: 20,
    },
    links: {
        fontSize: 14,
    }
}));

const Login = () => {
    const classes = useStyles();
    const [mstate, model] = useKsForm();
    const [login, setLoginResp] = useState({ error: null, message: "" });

    useEffect(() => {
        model.setAttribute({
            "email": ["required", "string", "email"],
            "password": ["required", { "rule": "string", "message": "{label} can only be string" }, { "rule": "length", "min": 5, "max": 20, "message": "{label} can be between 5 and 20 only" }],
            "rememberMe": ["number"]
        });
        model.setLabels({
            rememberMe: "Remember Me"
        });
        model.setValues({
            email: "sksharma72000@gmail.com",
            password: "krishna12345",
            rememberMe: 0
        });
        model.notify();
        return () => mstate;
    }, []);

    function handleUpdate(event) {
        model.setValue(event.target.name, event.target.value);
        model.validate(event.target.name);
    }

    function handleCheck() {
        if (model.getValue("rememberMe") == 1) {
            model.setValue("rememberMe", 0);
        } else {
            model.setValue("rememberMe", 1);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (model.validateAll()) {
            await getApiRequest({
                data: model.getJson(),
                url: "users",
                method: "get"
            }).then((res) => {
                var logData = {
                    flag: false
                }
                if (res.length > 0) {
                    logData.flag = true;
                    logData["email"] = res[0].email;
                    logData["token"] = res[0].token;
                    logData["id"] = res[0].id;
                }
                if (logData.flag) {
                    const userModel = {
                        isLogin: logData.flag,
                        info: {
                            name: logData.email,
                        },
                        id: logData.id,
                        token: logData.token
                    };
                    window.localStorage.setItem("userModel", JSON.stringify(userModel));
                    window.location.href = pages.HOME;
                } else {
                    setLoginResp({
                        error: false,
                        message: "email and password does not match"
                    });
                }
            }).catch((error) => {
                console.log(error);
                return null
            });

        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            type="email"
                            margin="normal"
                            name="email"
                            value={model.getValue("email")}
                            label={model.getLabel("email")}
                            onChange={handleUpdate}
                            onBlur={handleUpdate}
                            error={model.getError("email")}
                            helperText={model.getMessage("email")}
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            value={model.getValue("password")}
                            label={model.getLabel("password")}
                            onChange={handleUpdate}
                            onBlur={handleUpdate}
                            error={model.getError("password")}
                            helperText={model.getMessage("password")}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                value={model.getValue("rememberMe")}
                                color="primary"
                                onChange={handleCheck}
                            />}
                            label={model.getLabel("rememberMe")}
                        />
                        <FormHelperText
                            error={login.error}
                        >{login.message}</FormHelperText>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid item xs >
                                <Link
                                    to={pages.FORGOT_PASSWORD}
                                    className={classes.links}>Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link to={pages.SIGNUP} className={classes.links}>{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Card>
        </Container>
    );

}

export default Login;