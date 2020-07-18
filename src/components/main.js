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
import SendMessage from './message';
import Reservations from './viewUsers';
import Orders from './viewExperts';
import Posts from './posts';
import WritePost from './writePost'
import Forum from './forum';
import EditUser from './editUser';
import Library from './library';
import AddDisease from './addDisease';
import ViewDisease from './viewDiseases';
import Item from './item';
import Dashboard from './dashboard'
import AddPlant from './addPlant';
import AddPest from './addPest';
import ViewPlant from './viewPlants';
import PDFShow from './pdf';




const Main = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/alogin" component={AdminLogin} />
    <Route path="/faq" component={FAQ} />
    <Route path="/PDFShow" component={PDFShow} />
    <Route path="/contactus" component={ContactUs} />
    <ProtectedAdminRoute path="/reg" component={Registration} />
    <ProtectedRoute path="/addPest" component={AddPest} />
    <ProtectedRoute path="/addPlant" component={AddPlant} />
    <Route path="/changep" component={ChangePassword} />
    <ProtectedRoute path="/pests" component={ProductTable} />
    <ProtectedRoute path="/viewPlants" component={ViewPlant} />
    <Route path="/message" component={SendMessage} />
    <ProtectedAdminRoute path="/viewUsers" component={Reservations} />
    <ProtectedAdminRoute path="/viewExperts" component={Orders} />
    <Route path="/community" component={Posts} />
    <ProtectedRoute path="/write" component={WritePost} />
    <Route path="/forum" component={Forum} />
    <Route path="/post/:id" component={Posts} />
    <ProtectedAdminRoute path="/edit/:type/:id" component={EditUser} />
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