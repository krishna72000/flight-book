import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { pages } from "./../../links/pages";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 10,
        margin: 'auto',
        minHeight: 10,
        textAlign: "center",
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 60,
        margin: 7
    },
    links: {
        textDecoration: "none",
    }
}));
const Home = () => {
    const classes = useStyles();

    const menuItems = [
        {
            id: 1,
            name: "Flight",
            icon: "travel.png",
            link: pages.FLIGHTS
        },
        {
            id: 2,
            name: "My Tickets",
            icon: "ticket.png",
            link: pages.TICKETS
        },
        {
            id: 3,
            name: "Profile",
            icon: "user.png",
            link: pages.TICKETS
        },
    ];
    const renderList = menuItems.map(({ id, name, icon, link }) => {
        return (
            <Grid item md={3} sm={4} xs={4} key={id}>
                <Link to={link} className={classes.links}>
                    <Paper className={classes.paper}>
                        <img className={classes.image} src={`assets/image/` + icon} />
                        <Typography  >{name}</Typography>
                    </Paper>
                </Link>
            </Grid>
        );
    });
    return (
        <Grid container direction="row" alignItems="center" spacing={3}>
            {renderList}
        </Grid>
    );
}

export default Home;