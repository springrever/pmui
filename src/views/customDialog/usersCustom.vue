<template>
  <el-dialog v-dragDialog title="" :visible.sync="dialogFormVisible" width="600px">
    <el-table
      :data="dataList"
      height="300"
      border
      style="width: 601px"
      @row-dblclick="distriClick">
      <el-table-column
        :default-sort = "{prop: 'userCode', order: 'descending'}"
        prop="userCode"
        label="用户编号"
        sortable
        width="200px">
      </el-table-column>
      <el-table-column
        prop="userName2"
        label="姓名"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门"
        width="200px"
        :filters="deptsFilters"
        :filter-method="filterHandler"
        >
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
  import dragDialog from '@/directive/el-dragDialog'
  import ElDialog from '../../../node_modules/element-ui/packages/dialog/src/component'
  import { userQuery } from '@/api/user'
  /**
   *  使用方法
   *  import usersCustom from '../customDialog/usersCustom' 导入组件
   *  this.$refs.myUsersDialog.propsDialogFormVisible(true) 打卡弹窗
   *  this.$refs.myUsersDialog.findUsers() 调用查询方法
   *  this.$refs.myUsersDialog.setSeachItems(seachItems) 设置查询条件
   */
  export default {
    name: 'usersCustom',
    components: { ElDialog },
    directives: {
      dragDialog
    },
    mounted: function() {
    },
    data() {
      return {
        dialogFormVisible: false,
        dataList: [],
        seachItems: { page: {}, items: {}},
        deptsFilters: []
      }
    },
    methods: {
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      setSeachItems(Items) {
        this.seachItems = Items
      },
      findUsers() {
        userQuery(this.seachItems).then(r => {
          this.dataList = r.data.list
          this.pushDeptfilters(this.dataList)
        })
      },
      pushDeptfilters(data) {
        var sz = []
        var deptsFilters = []
        data.forEach(function(value, index) {
          if (sz.indexOf(value.deptName) === -1) {
            sz.push(value.deptName)
            deptsFilters.push({ text: value.deptName, value: value.deptName })
          }
        })
        this.deptsFilters = deptsFilters
      },
      propsDialogFormVisible(e) {
        this.dialogFormVisible = e
      },
      distriClick() {}
    }
  }
</script>
