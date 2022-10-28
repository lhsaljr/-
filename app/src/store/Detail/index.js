import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUID} from "@/utils/uuid_token"
const state={
    GoodsInfo:{},
    uuid_token:getUUID()
};
const mutations={
    GETGOODSINFO(state,GoodsInfo){
        state.GoodsInfo=GoodsInfo
    }
}
const actions={
    async getGoodsInfo(context,skuid){
       let result=await reqGoodsInfo(skuid) 
       if(result.code==200){
           context.commit("GETGOODSINFO",result.data)
       }
    } ,
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart({skuId,skuNum})
       if(result.code==200){
           return "我爱ljr"
       }else{
           return Promise.reject(new Error("faile"))
       }

    }
}
const getters={
    categoryView(state){
        return state.GoodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.GoodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.GoodsInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}