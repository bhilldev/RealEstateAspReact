import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/House";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})


const initialFieldValues = {
    street: '',
    city: '',
    state: '',
    zip: '',
    squareFeet: '',
    numBedrooms: '',
    numBaths: '',
    shortDescription: '',
    price: ''
}

const HouseForm = ({ classes, ...props }) => {
    //toast msg.
    const { addToast } = useToasts()


    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('street' in fieldValues)
            temp.street = fieldValues.street ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('state' in fieldValues)
            temp.state = fieldValues.state ? "" : "This field is required."
        if ('zip' in fieldValues)
            temp.zip = fieldValues.zip ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
   
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)


    const handleSubmit = e => {
        e.preventDefault()
        console.log("handle submit called")
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0) {                
                props.createHouse(values, onSuccess)
            }
            else {                                   
                props.updateHouse(props.currentId, values, onSuccess)
            }
        }
    }

    useEffect(() => {
        console.log("useEffect " + props.currentId)
        if (props.currentId != 0) {
            setValues({
                ...props.HouseList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="street"
                        variant="outlined"
                        label="Street"
                        value={values.street}
                        onChange={handleInputChange}
                        {...(errors.street && { error: true, helperText: errors.street })}
                    />
                    <TextField
                        name="city"
                        variant="outlined"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                        {...(errors.city && { error: true, helperText: errors.city })}
                    />                    

                    <TextField
                        name="state"
                        variant="outlined"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        {...(errors.state && { error: true, helperText: errors.state })}
                    />
                    
                    
                    <TextField
                        name="zip"
                        variant="outlined"
                        label="Zip"
                        value={values.zip}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        name="squareFeet"
                        variant="outlined"
                        label="squarefeet"
                        value={values.squareFeet}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="numBedrooms"
                        variant="outlined"
                        label="numberofbedrooms"
                        value={values.numBedrooms}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="price"
                        variant="outlined"
                        label="Price"
                        value={values.price}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>                    
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    HouseList: state.House.list
})

const mapActionToProps = {
    createHouse: actions.create,
    updateHouse: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(HouseForm));