import { makeStyles } from '@material-ui/styles';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    }
}));


export default function AppBody({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.container}>
                {children}
            </div>

        </div>
    );
}
