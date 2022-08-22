import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: '/home',
        name:"Home",
        component: ()=>import("../views/home/index.vue")
    },
    {
        path: '/about',
        component: ()=>import("../views/about/index.vue")
    }
]
const router = new VueRouter({
    routes
})

export default router