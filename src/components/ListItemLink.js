import React from "react";


import { Link } from 'react-router-dom'


import {

    Button,

} from "@material-ui/core";


export default function ListItemLink(props) {
    const renderLink = itemProps => { console.log(itemProps); return <Link to={props.to} {...itemProps} /> };
    const {  text } = props;
    //const className = props.className;
    const variant = props.variant;
    return (
        <Button style={{marginTop:-55,backgroundColor:'#00D2D3'}}
            variant={variant ? variant : "contained"}
           // className={className}
            component={renderLink}

            //startIcon={icon}

        >
            {text}
        </Button>
    );
}


//The way to use it is below

//<ListItemLink to={{ pathname: "/AddPatient", passed: { name: "Umair Awan" } }} variant="contained" text="Add Patient" icon={<AddIcon />} classes={classes} className={classes.AddPatient} doctor="Umair Doctor" />

//Then in AddPatient you can use following line to access name passed.

//JSON.parse(props.location.passed.name)
