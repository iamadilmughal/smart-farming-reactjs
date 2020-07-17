import React, { Component } from "react";
import {DataTable, TableHeader, Textfield} from 'react-mdl';
//import './rtable.css';



class restable extends Component {

  render() {

    return (
      

      <div className="wrapper">
        <Textfield
    onChange={() => {}}
    label="Search"
    placeholder="Search by Name"
    expandable
    expandableIcon="search"
/>

        <h1> Restaurant Details</h1>
          <DataTable
    shadow={0}
    rows={[
        {restaurantName: 'Fijis', location: 'Park Road',openingTime: '10:00',closingTime:'23:00',contact:'0300121212' },
        {restaurantName: '160 Degrees', location: 'F-7',openingTime: '09:00',closingTime:'23:00',contact:'030572121' }
    ]}
>
    <TableHeader name="restaurantName" tooltip="Name of the restaurant">Restaurant Name</TableHeader>
    <TableHeader name="location" tooltip="Address of the restaurant">Location</TableHeader>
    <TableHeader name="openingTime" tooltip="Opening hours of the restaurant">Opening Time</TableHeader>
    <TableHeader name="closingTime" tooltip="A short description about the food item">Closing Time</TableHeader>
    <TableHeader name="contact" tooltip="Mobile number of the restaurant">Contact Number</TableHeader>
    
</DataTable>

       
      </div>
    );
  }
}

export default restable;