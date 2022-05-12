import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
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
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';



const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        marginTop: 30,
        marginBottom: 30,
        padding: 15,
    },
    avatar: {
        margin: 5,
        backgroundColor: "#eee",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 15,
    },
    submit: {
        marginTop: 10,
        marginBottom: 20,
    },
    links: {
        marginTop: 25,
        fontSize: 14,
    }
}));

const Signup = () => {
    const classes = useStyles();
    const [signupInfo, setInfo] = useState({
        signupMessage: "",
        signupStatus: 0
    });
    const [mstate, model] = useKsForm();


    useEffect(() => {


        model.setAttribute({
            "fname": ["required", "string", { "rule": "length", "min": 5, "max": 50, "message": "{label} can be between 5 and 50 only" }],
            "lname": ["required", "string", { "rule": "length", "min": 5, "max": 50, "message": "{label} can be between 5 and 50 only" }],
            "email": ["required", "string", "email"],
            "phone": ["required", { "rule": "pattern", "pattern": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im }],
            "password": ["required", "string", { "rule": "length", "min": 5, "max": 20, "message": "{label} can be between 5 and 20 only" }],
            "cpassword": ["required", { "rule": "match", "match": "password" }],
            "dob": ["required"],
            "dobObj": ["required"],
            "agree": [{
                rule: "required",
                message: "You must agree to terms and condition"
            }]
        });
        model.setLabels({
            fname: "First Name",
            lname: "Last Name",
            dob: "Date of Birth",
            cpassword: "Confirm password",
            agree: "I accept to all terms and conditions"
        });
        model.setValues({
            dob: null,
            dobObj: null
        });

        model.notify();
        return () => mstate;
    }, []);
    const padStart = (pad, str) => {
        return (pad + str).slice(-pad.length);
    }
    const getFullDate = (cd) => {
        let month = parseInt(cd.getMonth()) + 1;
        let date = cd.getDate();
        month = padStart("00", month);
        date = padStart("00", date);
        return cd.getFullYear() + "-" + month + "-" + date;
    }
    const onDateChange = (date) => {
        if (typeof date === "object") {
            model.setValue("dob", getFullDate(date));
            model.setValue("dobObj", date);
        } else {
            model.setValue("dob", "");
            model.setValue("dobObj", null);
        }
        model.validate("dob");
    };

    function handleUpdate(event) {
        model.setValue(event.target.name, event.target.value);
        model.validate(event.target.name);
    }
    function handleCheck(event) {
        if (model.getValue("agree") == 1) {
            model.setValue("agree", "");
        } else {
            model.setValue("agree", 1);
        }

    }
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(model.getJson());
        if (model.validateAll()) {

        } else {

        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Card className={classes.card}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="fname"
                                    variant="outlined"
                                    id="firstName"
                                    name="fname"
                                    value={model.getValue("fname")}
                                    label={model.getLabel("fname")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("fname")}
                                    helperText={model.getMessage("fname")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="lastName"
                                    autoComplete="lname"
                                    name="lname"
                                    value={model.getValue("lname")}
                                    label={model.getLabel("lname")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("lname")}
                                    helperText={model.getMessage("lname")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    value={model.getValue("phone")}
                                    label={model.getLabel("phone")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("phone")}
                                    helperText={model.getMessage("phone")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    autoComplete="email"
                                    name="email"
                                    value={model.getValue("email")}
                                    label={model.getLabel("email")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("email")}
                                    helperText={model.getMessage("email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={model.getValue("password")}
                                    label={model.getLabel("password")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("password")}
                                    helperText={model.getMessage("password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    autoComplete="confirm-password"
                                    value={model.getValue("cpassword")}
                                    label={model.getLabel("cpassword")}
                                    onChange={handleUpdate}
                                    onBlur={handleUpdate}
                                    error={model.getError("cpassword")}
                                    helperText={model.getMessage("cpassword")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        variant="outlined"
                                        // disableFuture
                                        renderInput={(params) => <TextField
                                            {...params}
                                            fullWidth
                                            error={model.getError("dob")}
                                            helperText={model.getMessage("dob")}
                                        />}
                                        name="dob"
                                        inputFormat={'yyyy-MM-dd'}
                                        minDate={new Date()}
                                        value={model.getValue("dobObj")}
                                        label={model.getLabel("dob")}
                                        onBlur={(index) => onDateChange(index)}
                                        onChange={(index) => onDateChange(index)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        name="agree"
                                        value={model.getValue("agree")}
                                        onChange={handleCheck}
                                        color="primary"
                                    />}
                                    label={model.getLabel("agree")}
                                />
                                <FormHelperText
                                    error={model.getError("agree")}
                                >{model.getMessage("agree")}</FormHelperText>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link className={classes.links} to={pages.LOGIN} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Card>
        </Container>
    );
}

export default Signup;