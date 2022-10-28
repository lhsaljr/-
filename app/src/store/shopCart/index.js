import { reqDeleteCartById, reqCartList, reqUpdateCheckedById } from "@/api"
const state = {
    cartlist: []
};
const mutations = {
    GETCARTLIST(state, data) {
        state.cartlist = data
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }

    },
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("false"))
        }
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("false"))
        }

    },
    deleteCheckedCart({ dispatch, getters }) {
        let AllPromise = []
        getters.cartList.cartInfoList.forEach(item => {

            let promise = item.isChecked == 1 && dispatch("deleteCartById", item.skuId)
            AllPromise.push(promise)


        }

        )
        return Promise.all(AllPromise)
    },

    allChecked({ dispatch, getters }, isChecked) {
        let AllPromise = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked: isChecked })
            AllPromise.push(promise)


        }

        )
        return Promise.all(AllPromise)
    }

}
const getters = {
    cartList(state) {
        return state.cartlist[0] || {}
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}