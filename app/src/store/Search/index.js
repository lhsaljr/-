import {reqGetSearchInfo} from "@/api"
const state={
    searchlist:{}
};
const mutations={
    GETSEARCHLIST(state,searchlist){
        state.searchlist=searchlist
    }
}
const actions={
   async getSearchList({commit},params={}){
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
        
    }
}
const getters={
    goodsList(state){
        return state.searchlist.goodsList||[]
    },
    trademarkList(state){
        return state.searchlist.trademarkList||[]
    },
    attrsList(state){
        return state.searchlist.attrsList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}