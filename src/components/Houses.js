import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/House";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import HouseForm from "./HouseForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem",
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }
})



const Houses = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllHouses()
    }, [])//componentDidMount
    
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteHouse(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
            console.log(id);
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <HouseForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Key</TableCell>
                                    <TableCell>Street</TableCell>
                                    <TableCell>Zip</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.HouseList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.houseID}</TableCell>
                                            <TableCell>{record.street}</TableCell>
                                            <TableCell>{record.zip}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => {  setCurrentId(record.houseID) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.houseID)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>                                            
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
                                                            
    );
}



const mapStateToProps = state => ({
    HouseList: state.House.list
})

const mapActionToProps = {
    fetchAllHouses: actions.fetchAll,
    deleteHouse: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Houses));