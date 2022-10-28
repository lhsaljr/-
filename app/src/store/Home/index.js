import {reqCategoryList,reqGetbannerList,reqFloorList} from "@/api";
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
       
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    REQFLOORLIST(state,floorList){
        state.floorList=floorList  
    }
}
const actions={
    async categoryList(context)
    {
        let result= await reqCategoryList()
       if(result.code==200){
        context.commit("CATEGORYLIST",result.data)
        
       }
    },
    async getBannerList(context){
        let result=await reqGetbannerList()
        if(result.code==200){
            context.commit('GETBANNERLIST',result.data)
        }
    },
    async reqFloorList(context){
        let result=await reqFloorList()
        if(result.code==200){
            context.commit("REQFLOORLIST",result.data)
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}