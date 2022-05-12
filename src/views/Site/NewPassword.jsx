import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 800,
        margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
    },
    hide: {
        display: "none",
    },
    textRed: {
        color: red[500],
        fontSize: 16
    },
    textGreen: {
        color: green[500],
        fontSize: 16
    },
    header: {
        textAlign: 'left',
        background: '#AFAFAF',
        color: '#fff'
    },
    card: {
        marginTop: theme.spacing(5)
    }
});

const NewPassword = () => {
    const classes = useStyles();
    const [model, setModel] = useState(new Model());
    const [loginInfo, setInfo] = useState({
        loginMessage: "",
        loginStatus: 0
    });
    model.setAttributes({
        "username": ["required", "string"],
    });
    model.setLabels({
        username: "New Password"
    });

    handleUpdate = (event) => {
        model.setValue(event.target.name, event.target.value);
        model.validatePartial(event.target.name);
        setModel({
            model
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        model.validate();
        if (model.errorFlag) {
            setModel({
                model
            });
        } else {
        }
    }

    return (
        <div>
            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Enter new password" />
                    <CardContent>
                        <div>
                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                name="username"
                                value={model.getValue("username")}
                                label={model.getLabel("username")}
                                onChange={handleUpdate}
                                onBlur={handleUpdate}
                                error={model.getError("username")}
                                helperText={model.getErrorMessage("username")}
                            />
                        </div>
                        <FormHelperText className={
                            loginInfo.loginStatus === 0 ?
                                classes.textRed : loginInfo.loginStatus === 1 ?
                                    classes.textGreen : classes.hide}>
                            {loginInfo.loginMessage}</FormHelperText>
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
                </Card>
            </form>
        </div>
    );

}

export default NewPassword;