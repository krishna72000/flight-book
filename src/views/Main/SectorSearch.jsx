import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
// import SearchBar from '@material-ui/core/SearchBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',

    },
    title: {
        marginLeft: 20,
        flex: 1,
    },
    listItem: {
        marginTop: 50
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SectorSearch({ sectorState, handleClose, sectorList }) {
    const classes = useStyles();
    const { open, sectorTitle } = sectorState;
    const [searched, setSearched] = useState("");
    const [tmpRow, setRows] = useState(sectorList);

    const requestSearch = (searchedVal) => {
        const filteredRows = sectorList.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase()) || row.code.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {sectorTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.listItem}>
                    {/* <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    /> */}
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        </div>
    );
}
