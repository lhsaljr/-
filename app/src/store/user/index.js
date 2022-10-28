
import { reqGetCode ,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from "@/api"
import {setToken,getToken,removeItem} from "@/utils/token"
const state = {
    code:'',
    token:getToken(),
    userInfo:{} 
};
const mutations = {
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token

    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    clearAll(state){
        state.userInfo={}
        state.token=""
        removeItem()
    }
}
const actions = {
   async getCode({commit},phone){
        let result=await reqGetCode(phone)
        if(result.code==200){
            commit("GETCODE",result.data)
            return "OK"
        }else{
            return Promise.reject(new Error("false"))
        }
    },
   async userRegister({commit},user)
    {
        let result=await reqUserRegister(user)
        if(result.code==200){
            return "OK"
        }else{
            return Promise.reject(new Error("false"))
        }

    },
    async userLogin({commit},user)
    {
        let result=await reqUserLogin(user)
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            setToken(result.data.token)
            return "OK"
        }else{
            return Promise.reject(new Error("false"))
        }

    },
    async userInfo({commit}) {
        let result=await reqUserInfo()

        if(result.code==200){
            commit("GETUSERINFO",result.data)
            return "OK"
        }else{
            return Promise.reject(new Error("false"))
        }

    },
    async userLogOut({commit})
    {
        let result=await reqLogOut()

        if(result.code==200){
            commit("clearAll")
            return "OK"
        }else{
            return Promise.reject(new Error("false"))
        }

    },
    }

   
const getters = {
    

}
export default {
    state,
    mutations,
    actions,
    getters
}