import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useKsForm } from '../../drivers/index';
import { Link } from 'react-router-dom';
import { pages } from "./../../links/pages";
import { Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, FormHelperText, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    loginBtn: {
        marginTop: 10,
        flexGrow: 1
    },
    hide: {
        display: "none",
    },
    textRed: {
        color: "red",
        fontSize: 16
    },
    textGreen: {
        color: "green",
        fontSize: 16
    },
    header: {
        textAlign: 'left',
        background: '#AFAFAF',
        color: '#fff'
    },
    card: {
        marginTop: 50,
        paddingBottom: 10
    },
    links: {
        margin: 10,
        fontSize: 14
    }
}));

const ForgotPassword = () => {
    const classes = useStyles();

    const [mstate, model] = useKsForm();
    const [login, setLoginResp] = useState({ error: null, message: "" });

    useEffect(() => {
        model.setAttribute({
            "username": ["required", "string", "email"],
        });
        model.setLabels({
            username: "Email"
        });
        model.notify();
        return () => mstate;
    }, []);

    const handleUpdate = (event) => {
        model.setValue(event.target.name, event.target.value);
        model.validate(event.target.name);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (model.validateAll()) {
            console.log(model.getJson());
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Forgot Password?" />
                        <CardContent>
                            <div>
                                <TextField
                                    fullWidth
                                    type="email"
                                    margin="normal"
                                    name="username"
                                    value={model.getValue("username")}
                                    label={model.getLabel("username")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("username")}
                                    helperText={model.getMessage("username")}
                                />
                            </div>
                            <FormHelperText className={
                                !login.flag ?
                                    classes.textRed : login.flag ?
                                        classes.textGreen : classes.hide}>
                                {login.message}</FormHelperText>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                                color="secondary"
                                className={classes.loginBtn}>
                                Submit
                            </Button>
                        </CardActions>
                        <Link
                            to={pages.LOGIN}
                            className={classes.links}>
                            Remembered password?
                        </Link>
                    </Card>
                </form>
            </Container>
        </div>
    );

}

export default ForgotPassword;