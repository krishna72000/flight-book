import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PropTypes from 'prop-types';
import SearchFlight from './SearchFlight'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
const Flight = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    function a11yProps(index) {
        return {
            id: `scrollable-prevent-tab-${index}`,
            'aria-controls': `scrollable-prevent-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs"
                >
                    <Tab label="One Way" icon={<ArrowUpwardIcon />} {...a11yProps(0)} />
                    <Tab label="Two Ways" icon={<ImportExportIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SearchFlight isTwoWays={false} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SearchFlight isTwoWays={true} />
            </TabPanel>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default Flight;