// import Home from "@/pages/Home"
// import Search from "@/pages/Search"
// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
// import Paysuccess from "@/pages/PaySuccess"
// import center from "@/pages/Center"
// import myorder from "@/pages/Center/myorder"
// import grouporder from "@/pages/Center/grouporder"
export default [
    {
        name: "center",
        path: "/center",
        component:()=>import("@/pages/Center"),
        meta: { show: true },
        children: [
            {
                
                path: "myorder",
                component: ()=>import("@/pages/Center/myorder"),

            },
            {
                
                path: "grouporder",
                component:()=>import("@/pages/Center/grouporder"),

            },
            {
                
                path: "/center",
                redirect:'/center/myorder',

            }

        ]
    },
    {
        name: "paysuccess",
        path: "/paysuccess",
        component:()=>import("@/pages/PaySuccess") ,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/pay')!= -1){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: "Pay",
        path: "/Pay",
        component: ()=>import("@/pages/Pay"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=="/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: "trade",
        path: "/trade",
        component: ()=>import("@/pages/Trade"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=="/shopcart"||from.path=="/login"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: "shopcart",
        path: "/shopcart",
        component:()=>import("@/pages/ShopCart"),
        meta: { show: true }
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component:()=>import("@/pages/AddCartSuccess"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/detail')!= -1){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/detail/:skuid?",
        component:  ()=>import('@/pages/Detail'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/search')!= -1){
                next()
            }else{
                next(false)
            }
        }
    
    },
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta: { show: true }
    },
    {
        path: "/login",
        component:()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
                
        path: "/",
        redirect:'/home',

    }
]
