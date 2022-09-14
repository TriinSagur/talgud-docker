import Vue from 'vue'
import VueRouter from 'vue-router'
import AvalehtView from "@/views/AvalehtView";
import ToimunudTalgudView from "@/views/ToimunudTalgudView";
import TulevasedTalgudView from "@/views/TulevasedTalgudView";
import TalgudLisainfoView from "@/views/TalgudLisainfoView";
import UuedTalgudView from "@/views/UuedTalgudView";
import MinuTalgudView from "@/views/MinuTalgudView";
import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import PlanningView from "@/views/PlanningView";
import TalgudLisainfoLogInView from "@/views/TalgudLisainfoLogInView";
import ContactView from "@/views/ContactView";
import EditContactView from "@/views/EditContactView";
import UserPlanningView from "@/views/UserPlanningView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'avalehtRoute',
        component: AvalehtView
    },
    {
        path: '/toimunud',
        name: 'toimunudRoute',
        component: ToimunudTalgudView
    },
    {
        path: '/tulevased',
        name: 'tulevasedRoute',
        component: TulevasedTalgudView
    },
    {
        path: '/lisainfo',
        name: 'lisainfoRoute',
        component: TalgudLisainfoView
    },
    {
        path: '/lisainfoLogIn',
        name: 'lisainfoLogInRoute',
        component: TalgudLisainfoLogInView
    },
    {
        path: '/planning',
        name: 'planningRoute',
        component: PlanningView
    },
    {
        path: '/userPlanning',
        name: 'userPlanningRoute',
        component: UserPlanningView
    },
    {
        path: '/lisa',
        name: 'lisaRoute',
        component: UuedTalgudView
    },
    {
        path: '/minu',
        name: 'minuRoute',
        component: MinuTalgudView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/registration',
        name: 'registrationRoute',
        component: RegistrationView
    },
    {
        path: '/contact',
        name: 'contactRoute',
        component: ContactView
    },
    {
        path: '/editcontact',
        name: 'contactRoute',
        component: EditContactView
    },
]

const router = new VueRouter({
    routes
})

export default router
