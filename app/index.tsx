
import React from 'react'
//import '../global.css'
import FrontPage from './FrontPage'
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import ParentHome from './ParentHome';
import DocHome from './DocHome';
import VacDetails from './VacDetails';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import KidProf from './KidProf';
import BMICalculator from './BMI';
import ChildHome from './ChildHome';
import KidProfDoc from './KidProfDoc';
import Announcement from './Announcement';
import KidAllergy from './KidAllergy';
import VaccineSchedule from './VaccineShedule';
import KidAllergyDoc from './KidAllergyDoc';
import VaccineScheduleDoc from './VaccineSheduleDoc';



const Stack = createStackNavigator();

const index = () => {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="/" component={FrontPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="parentHome" component={ParentHome} />
      <Stack.Screen name="docHome" component={DocHome} />
      <Stack.Screen name="ChangeP" component={ChangePassword} />
      <Stack.Screen name="vacDetails" component={VacDetails} />
      <Stack.Screen name="FPassword" component={ForgotPassword}/>
      <Stack.Screen name='KidProf' component={KidProf}/>
      <Stack.Screen name='BMI' component={BMICalculator}/>
      <Stack.Screen name='ChildHome' component={ChildHome}/>
      <Stack.Screen name="KidProfDoc" component={KidProfDoc} />
      <Stack.Screen name='Announcements' component={Announcement} />
      <Stack.Screen name='KidAllergy' component={KidAllergy}/>
      <Stack.Screen name='VacShedule' component={VaccineSchedule}/>
      <Stack.Screen name="KidAllergyDoc" component={KidAllergyDoc}/>
      <Stack.Screen name='VacSheduleDoc' component={VaccineScheduleDoc}/>
    </Stack.Navigator>
 
  )
}

export default index