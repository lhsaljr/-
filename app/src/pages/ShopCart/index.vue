<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              v-model="cart.isChecked"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(-1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="number"
              class="text"
              :value="cart.skuNum"
              @change="handler($event.target.value * 1 - cart.skuNum, cart)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler(1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteItem(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="allChecked($event)"
        />
        <span>全选/全不选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedCart($event)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalprice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle.js";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      totalprice: 0,
    };
  },
  watch: {
    cartList: {
      deep: true,
      handler(newvalue, oldvalue) {
        let sum = 0;
        this.cartInfoList
          .filter((item) => item.isChecked == 1)
          .forEach((element) => {
            sum += element.skuNum * element.skuPrice;
          });
        this.totalprice = sum;
      },
    },
  },
  mounted() {
    this.getdata();
  },
  methods: {
    deleteCheckedCart() {
      try {
        this.$store.dispatch("deleteCheckedCart");
        this.getdata();
      } catch (error) {
        alert(error.message);
      }
    },
   async allChecked(event) {
      // this.cartInfoList.forEach(item=>{
      //   try {
      //   let isChecked=event.target.checked?'1':'0'
      //   this.$store.dispatch("updateCheckedById",{skuId:item.skuId,isChecked:isChecked})

      // } catch (error) {
      //   alert(error.message)
      // }
      //   this.getdata();
      // })
      try {
        let isChecked = event.target.checked?"1":"0";
        await this.$store.dispatch("allChecked",isChecked);
          this.getdata();
      } catch (error) {
        alert(error.message);
      }
    },
    updateChecked(cart, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked: isChecked,
        });
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteItem(skuId) {
      try {
        await this.$store.dispatch("deleteCartById", skuId);
        this.getdata();
      } catch (error) {
        alert(error.message);
      }
    },
    getdata() {
      return this.$store.dispatch("getCartList");
    },
    handler: throttle(async function (num, cart) {
      try {
        if ((cart.skuNum == 1 && num == -1) || num <= -cart.skuNum) num = 0;
        if (parseFloat(num) > parseInt(num)) num = parseInt(num);
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: num,
        });
        this.getdata();
      } catch (error) {
        alert("出错了");
      }
    }, 1050),
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },

    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.text::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.text[type="number"] {
  -moz-appearance: textfield;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>