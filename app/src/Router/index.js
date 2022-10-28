import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes"
import store from "@/store"
import { concat } from "lodash";
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resole, reject) {
    if (resole && reject) {
        originPush.call(this, location, resole, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resole, reject) {
    if (resole && reject) {
        originReplace.call(this, location, resole, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
router.beforeEach(async (to, from, next) => {
    let name = store.state.user.userInfo.name
    let token = store.state.user.token
    if (token) {
        if (to.path == "/login"||to.path == "/Register") {
            next("/home")
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("userInfo");

                    next()
                } catch (error) {
                    await store.dispatch("userLogOut")
                    next("/login")
                }
            }
        }
    }

    else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next("/login?redirect=" + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }

    }

}
)
export default router