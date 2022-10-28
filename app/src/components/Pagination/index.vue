<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="fasong(pageNo - 1)">上一页</button>
    <button
      v-if="startNumEndNum.start > 1"
      @click="fasong(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumEndNum.end"
      :key="index"
      v-if="page >= startNumEndNum.start"
      @click="fasong(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumEndNum.end < totalpage - 1">···</button>
    <button
      :class="{ active: pageNo == totalpage }"
      @click="fasong(totalpage)"
      v-if="startNumEndNum.end < totalpage"
    >
      {{ totalpage }}
    </button>
    <button :disabled="pageNo == totalpage" @click="fasong(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSide", "total", "continue"],
  computed: {
    totalpage() {
      return Math.ceil(this.total / this.pageSide);
    },
    startNumEndNum() {
      let start = 1,
        end = 1;
      if (this.continue > this.totalpage) {
        start = 1;
        end = this.totalpage;
      } else {
        start = this.pageNo - parseInt(this.continue / 2);
        end = this.pageNo + parseInt(this.continue / 2);
        if (start < 1) {
          start = 1;
          end = this.continue;
        }
        if (start > this.totalpage) {
          start = this.totalpage;
          end = this.totalpage - this.continue + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    fasong(pageNo) {
      this.$emit("getPageNo", pageNo);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      background-color: rgb(23, 248, 79);
    }
  }
}
</style>