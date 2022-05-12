import React, { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import Button from '@material-ui/core/Button';
import { useKsForm } from '../../drivers/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import { makeStyles } from '@material-ui/styles';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import TodayIcon from '@material-ui/icons/Today';
import { FormControl, FormHelperText, Input, InputAdornment } from "@material-ui/core";
import SectorSearch from "./SectorSearch";
import getApiRequest from "../../drivers/apiCall"

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 30,
        marginBottom: 30,
        marginLeft: "-50",
        marginRight: "-50",
        padding: 15,
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

const SearchFlight = ({ isTwoWays }) => {
    const classes = useStyles();
    const [sectorSearch, setSectorSearch] = useState({ open: false, sectorTitle: "Search Departure" });
    const [mstate, model] = useKsForm();
    const [sectorList, setSectorList] = useState([]);
    useEffect(() => {
        model.setAttribute({
            "flightFrom": ["required", "string"],
            "flightTo": ["required", "string"],
            "takeDate": ["required"],
            "takeObj": ["required"],
            "backDate": ["required"],
            "backObj": ["required"],
        });
        model.setLabels({
            flightFrom: "From",
            flightTo: "To",
            takeDate: "Departure Date",
            backDate: "Return Date",
        });
        model.setValues({
            takeDate: null,
            takeObj: null,
            backDate: null,
            backObj: null
        });
        model.notify();
        return () => mstate;
    }, []);

    useEffect(() => {
        loadSector();
    }, [])


    async function loadSector() {
        await getApiRequest({
            url: "sector",
            method: "get"
        }).then((sectorData) => {
            if (sectorData.flag) {
                setSectorList(sectorData.data);
            }
        }).catch((error) => {
            console.log(error);
            return null
        });
    }

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
    const onTakeChange = (date) => {
        if (typeof date === "object") {
            model.setValue("takeDate", getFullDate(date));
            model.setValue("takeObj", date);
        } else {
            model.setValue("takeDate", "");
            model.setValue("takeObj", null);
        }
        model.validate("takeDate");
    };

    const onBackChange = (date) => {
        if (typeof date === "object") {
            model.setValue("backDate", getFullDate(date));
            model.setValue("backObj", date);
        } else {
            model.setValue("backDate", "");
            model.setValue("backObj", null);
        }
        model.validate("backDate");
    };



    function handleUpdate(event) {
        model.setValue(event.target.name, event.target.value);
        model.validate(event.target.name);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(model.getJson());
        if (model.validateAll()) {

        } else {

        }
    }
    const sectorFocus = (titl) => {
        setSectorSearch({ open: true, sectorTitle: titl });
    }
    const closeSectorSearch = () => {
        setSectorSearch({ ...sectorSearch, open: false });
        console.log(sectorSearch);
    }
    return (
        <>
            <Card className={classes.card}>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <Input
                                        startAdornment={<InputAdornment position="start"><FlightTakeoffIcon /></InputAdornment>}
                                        fullWidth
                                        id="flightFrom"
                                        name="flightFrom"
                                        value={model.getValue("flightFrom")}
                                        placeholder={model.getLabel("flightFrom")}
                                        onChange={handleUpdate}
                                        onClick={() => (sectorFocus("Search Departure"))}
                                        error={model.getError("flightFrom")}
                                        helperText={model.getMessage("flightFrom")}
                                    />
                                    <FormHelperText
                                        error={model.getError("flightFrom")}
                                    >{model.getMessage("flightFrom")}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <Input
                                        startAdornment={<InputAdornment position="start"><FlightLandIcon /></InputAdornment>}
                                        fullWidth
                                        id="flightTo"
                                        name="flightTo"
                                        value={model.getValue("flightTo")}
                                        placeholder={model.getLabel("flightTo")}
                                        onChange={handleUpdate}
                                        onClick={() => sectorFocus("Search Destination")}
                                    />
                                    <FormHelperText
                                        error={model.getError("flightTo")}
                                    >{model.getMessage("flightTo")}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={isTwoWays ? 6 : 12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        renderInput={(params) =>
                                            <FormControl fullWidth className={classes.margin}>
                                                <Input
                                                    {...params}
                                                    startAdornment={<InputAdornment position="start"><TodayIcon /></InputAdornment>}
                                                    fullWidth
                                                    value={model.getValue("takeDate")}
                                                    placeholder={model.getLabel("takeDate")}
                                                    onChange={handleUpdate}
                                                    error={model.getError("takeDate")}
                                                    helperText={model.getMessage("takeDate")}
                                                />
                                                <FormHelperText
                                                    error={model.getError("takeDate")}
                                                >{model.getMessage("takeDate")}</FormHelperText>
                                            </FormControl>
                                        }
                                        name="takeDate"
                                        inputFormat={'yyyy-MM-dd'}
                                        minDate={new Date()}
                                        value={model.getValue("takeObj")}
                                        onChange={(index) => onTakeChange(index)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {isTwoWays ? (
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDatePicker
                                            renderInput={(params) =>
                                                <FormControl fullWidth className={classes.margin}>
                                                    <Input
                                                        {...params}
                                                        startAdornment={<InputAdornment position="start"><TodayIcon /></InputAdornment>}
                                                        fullWidth
                                                        value={model.getValue("backDate")}
                                                        placeholder={model.getLabel("backDate")}
                                                        onChange={handleUpdate}
                                                        error={model.getError("backDate")}
                                                        helperText={model.getMessage("backDate")}
                                                    />
                                                    <FormHelperText
                                                        error={model.getError("backDate")}
                                                    >{model.getMessage("backDate")}</FormHelperText>
                                                </FormControl>
                                            }
                                            name="backDate"
                                            inputFormat={'yyyy-MM-dd'}
                                            minDate={new Date()}
                                            value={model.getValue("backObj")}
                                            onChange={(index) => onBackChange(index)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            ) : (<></>)}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Search Flight
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Card>
            <SectorSearch
                sectorState={sectorSearch}
                handleClose={closeSectorSearch}
                sectorList={sectorList}
            />
        </>
    );


}

export default SearchFlight;