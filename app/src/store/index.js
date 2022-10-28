import Home from "./Home"
import Search from "./Search"
import Detail from "./Detail"
import shopCart from "./shopCart"
import user from "./user"
import trade from "./trade"
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

export default new Vuex.Store({
modules:{
    Search,
    Home,
    Detail,
    shopCart,
    user,
    trade
}
})