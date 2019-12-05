<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route.path': function(newVal, oldVal) {
      if (newVal.indexOf('/project/') !== -1) {
        if (this.$store.getters.onProject === 'null') {
          this.$store.commit('SET_SHOWPROJECT', false)
        } else {
          this.$store.commit('SET_SHOWPROJECT', true)
        }
      } else {
        this.$store.commit('SET_SHOWPROJECT', false)
      }
    }
  }
}
</script>
<style>
  .contenmenuBut{
    cursor:default;
    line-height: 25px;
    padding: 0 18px;
    font-size: 12px;
    color: #6f7180;
    /*border-radius: 4px;*/
    background-color: white;

    /*border: 1px solid red; rgba(64,158,255,.2) */
  }

  .contenmenuBut.display{
    color: #888888;
    pointer-events: none;
    box-shadow: none;
    opacity: .65;
    cursor: not-allowed;
  }

  .contenmenuBut:hover{
    background-color: rgba(64,158,255,.1);
    color: #409eff;
  }

  .contenmenu{
    padding-top: 8px;
    padding-bottom: 4px;
    border-radius: 4px;
    background-color: white;
    width: 0; /*设置为0 隐藏自定义菜单*/
    overflow: hidden; /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888,1px 0 1px #ccc;
    position: absolute; /*自定义菜单相对与body元素进行定位*/
    z-index:9999999;
    box-shadow: 2px 2px 3px 0 rgba(0,0,0,.3);
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #dde9fc;
  }

  .el-table td{
    border-color: #d3dce6;
    padding: 2px;
    margin: 2px;
    height: 20px;
  }
  .el-table th{
    height: 25px;
    padding: 3px;
    margin: 3px;
  }
  .el-input.is-disabled .el-input__inner {
    color: peru;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    color: peru;
  }
  input::-webkit-input-placeholder {
   /* placeholder颜色  */
  color: #77a9bf !important;
  }

  -moz-placeholder
  { /* 火狐浏览器 */
   color: #77a9bf !important;
  }
  -ms-input-placeholder
  { /* IE 10+ */
    color: #77a9bf !important;
   }

  .el-table {
    /*height: 69vh;*/
    margin-top: 10px;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    min-height: 400px;

  }
  .pagination-container {
    margin-top: 2px;
  }
</style>
