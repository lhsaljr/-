<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch("reqFloorList");

    // this.getUserInfo();
  },
  computed: {
    ...mapState({ floorList: (state) => state.Home.floorList }),
  },
  methods: {
    // async getUserInfo() {
    //   try {
    //     await this.$store.dispatch("userInfo");
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // },
  },
};
</script>

<style>
</style>