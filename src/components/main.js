import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedAdminRoute from "./protected.admin.route"
import ProtectedRoute from "./protected.expert.route"

import Landing from './landing';
import AdminLogin from './alogin';
import FAQ from './faq';
import ContactUs from './contactus';
import Registration from './reg';
import ChangePassword from './changep';
import ProductTable from './viewAllPests';
import RestaurantTable from './viewPlants';
import EditRestaurant from './editr';
import SendMessage from './message';
import AddImage from './addrimage';
import EditFood from './editfood';
import Reservations from './viewUsers';
import Orders from './viewExperts';
import ProductImage from './addpimage';
import Posts from './posts';
import WritePost from './writePost'
import Forum from './forum';
import EditUser from './editUser';
import SendNotification from './sendNotification';
import Library from './library';
import AddDisease from './addDisease';
import ViewDisease from './viewDiseases';
import Item from './item';
import Dashboard from './dashboard'
import AddPlant from './addPlant';
import AddPest from './addPest';




const Main = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/alogin" component={AdminLogin} />
    <Route path="/faq" component={FAQ} />
    <Route path="/contactus" component={ContactUs} />
    <ProtectedAdminRoute path="/reg" component={Registration} />
    <ProtectedRoute path="/addPest" component={AddPest} />
    <ProtectedRoute path="/addPlant" component={AddPlant} />
    <Route path="/changep" component={ChangePassword} />
    <ProtectedRoute path="/pests" component={ProductTable} />
    <ProtectedRoute path="/viewPlants" component={RestaurantTable} />
    <Route path="/message" component={SendMessage} />
    <Route path="/addrimage" component={AddImage} />
    <Route path="/editr/:id" component={EditRestaurant} />
    <Route path="/editfood/:id" component={EditFood} />
    <ProtectedAdminRoute path="/viewUsers" component={Reservations} />
    <ProtectedAdminRoute path="/viewExperts" component={Orders} />
    <Route path="/addpimage" component={ProductImage} />
    <Route path="/community" component={Posts} />
    <ProtectedRoute path="/write" component={WritePost} />
    <Route path="/forum" component={Forum} />
    <Route path="/post/:id" component={Posts} />
    <ProtectedAdminRoute path="/edit/:type/:id" component={EditUser} />
    <Route path="/sendNotification" component={SendNotification} />
    <ProtectedRoute path="/addDisease" component={AddDisease}/>
    <Route path="/library" component={Library}/>
    <ProtectedRoute path="/viewDiseases" component={ViewDisease}/>
    <ProtectedRoute path="/editDisease/:id" component={AddDisease}/>
    <Route path="/item/:type/:id" component={Item}/>
    <ProtectedRoute path="/dashboard" component={Dashboard}/>
    <ProtectedRoute path="/editPlant/:id" component={AddPlant}/>
    <ProtectedRoute path="/editPest/:id" component={AddPest}/>
  </Switch>
)

export default Main;