<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="角色编码"
                v-model="beans.searchForm.items.role_code_lk">
      </el-input>
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="角色名称"
                v-model="beans.searchForm.items.role_name_lk">
      </el-input>
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        查询</el-button>
      <el-button size="mini"class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">
        新增</el-button>
    </div>

    <el-table :key='tableKey' :data="this.beans.dataList" v-loading="roleLoading" element-loading-text="读取中……"
              border fit highlight-current-row
              >
      <!--<el-table-column align="center" label="角色ID" width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.roleId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="角色编码" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.role_code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.role_name}}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column align="center" label="菜单管理" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openMean(scope.row)">菜单管理</el-button>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="创建人" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备 注" min-width="100" >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.role_memo" placement="top">
          <span>{{scope.row.role_memo | gsfiters}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="openMean(scope.row)">菜单管理</el-button>
          <el-button type="primary" size="mini" @click="openAuthority(scope.row)">权限管理</el-button>
          <el-button v-if="scope.row.status!='deleted' && 1==2" size="mini" type="danger" @click="handleDelete(scope.row,
          'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :current-page="beans.searchForm.page.nowPage"
                     :page-sizes="[10,20,30, 50]" :page-size="beans.searchForm.page.nowcont"
                     layout="total, sizes, prev, pager, next, jumper" :total="beans.searchForm.page.count">
      </el-pagination>
    </div>

    <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="90px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item prop="role_code" label="角色编码" >
        <el-input v-model="temp.role_code"></el-input>
      </el-form-item>
        <el-form-item prop="role_name" label="角色名称" >
          <el-input v-model="temp.role_name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="temp.role_memo">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog  v-dragDialog title="菜单管理" ref="menuDialog" :visible.sync="menuDialogVisible">
      <div>
        <el-tree ref="tree"
                 :data="MenuOptions"
                 :props="menuProps"
                 show-checkbox="true"
                 :check-strictly="false"
                 :check-on-click-node="false"
                 node-key="cfunid"
                 ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateMenu">确定</el-button>
        <el-button type="primary" @click="menuDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog  v-dragDialog title="权限管理" ref="menuDialog" :visible.sync="authorityDialogVisible">
      <div>
        <el-tree ref="treeAuthority"
                 :data="authorityTree"
                 :props="authorityProps"
                 show-checkbox="true"
                 :check-strictly="false"
                 :check-on-click-node="false"
                 node-key="id"
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateAuthority">确定</el-button>
        <el-button type="primary" @click="authorityDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchMenus } from '@/api/permission'
  import { roleQuery, roleInsert, roleUpdateBySelective } from '@/api/role'
  import { getSelectByRoleId, rolePowerUpdate } from '@/api/rolepower'
  import { getAuthoritys } from '@/api/authority'
  import { roleAuthorityQuery, roleAuthorityUpdate } from '@/api/roleAuthority'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import dragDialog from '@/directive/el-dragDialog'

  export default {
    components: { ElTransfer },
    name: 'roleTable',
    filters: {
      gsfiters: function(value) {
        if (value !== undefined && value.length > 7) {
          value = value.slice(0, 7) + '...'
        }
        return value
      }
    },
    directives: {
      waves,
      dragDialog
    },
    data() {
      return {
        authorityTree: {},
        defCheckeds: [],
        beans: { dataList: [] },
        MenuOptions: [],
        menuDialogVisible: false,
        authorityDialogVisible: false,
        menuProps: { label: 'fun_name', children: 'children' },
        authorityProps: { label: 'label', children: 'children' },
        tableKey: 0,
        roles: null,
        total: null,
        roleLoading: true,
        roleQuery: {
          page: 1,
          limit: 20,
          role_code: '',
          role_name: '',
          sort: '+id'
        },
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        temp: {
          roleId: undefined,
          role_code: '',
          role_name: '',
          createtime: new Date(),
          role_memo: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新增'
        },
        rules: {
          role_name: [{ required: true, message: '角色名称必填', trigger: 'change' }],
          role_code: [{ required: true, message: '角色编码必填', trigger: 'change' }]
        }
      }
    },
    created() {
      initPage(this.beans, roleQuery)
      this.getRoles(1)
      this.getMunusOpt()
      this.getAuthoritys()
    },
    methods: {
      getAuthoritys() {
        getAuthoritys().then(r => {
          console.log('---------->', r)
          this.authorityTree = r.data.list
        })
      },
      openAuthority(row) {
        var sz = []
        this.openRoleID = row.roleId
        var seachItems = { page: {}, items: {}}
        seachItems.items.role_id_eq = row.roleId
        roleAuthorityQuery(seachItems).then(r => {
          r.data.list.forEach(function(value, index) {
            sz.push(value.authority_id)
          })
          this.authorityDialogVisible = true
          this.$refs.treeAuthority.setCheckedKeys(sz, true)
        })
        this.authorityDialogVisible = true
      },
      openMean(row) {
        var sz = []
        this.openRoleID = row.roleId
        // rolePowerQuery({ items: { roleId_eq: row.roleId }, page: { 'nowPage': -1, 'nowcont': 1 }}).then(response => {
        getSelectByRoleId(row.roleId).then(response => {
          console.log(response.data.list)
          response.data.list.forEach(function(value, index) {
            sz.push(value.cfunid)
          })
          // this.defCheckeds = sz
          // alert(this.defCheckeds)
          console.log('---------->', sz)
          this.menuDialogVisible = true
          this.$refs.tree.setCheckedKeys(sz, true)
        })
        this.menuDialogVisible = true
      },
      getMunusOpt() {
        fetchMenus().then(response => {
          console.log('--------->', response.data.list)
          this.MenuOptions = response.data.list
        })
      },
      updateAuthority() {
        console.log(this.$refs.treeAuthority.getCheckedKeys())
        // console.log(this.MenuOptions[0].fun_name)
        var item = {}
        item.authoritys = this.$refs.treeAuthority.getCheckedKeys(true)
        console.log('---------->::::', item.authoritys)
        item.roleId = this.openRoleID
        roleAuthorityUpdate(item).then(r => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.$refs.treeAuthority.setCheckedKeys([], true)
          this.authorityDialogVisible = false
        })
      },
      updateMenu() {
        this.menuDialogVisible = false
        console.log(this.$refs.tree.getCheckedKeys())
        // console.log(this.MenuOptions[0].fun_name)
        var item = {}
        item.menus = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        console.log('---------->::::', item.menus)
        item.roleId = this.openRoleID
        rolePowerUpdate(item).then(r => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
        this.$refs.tree.setCheckedKeys([], true)
      },
      getRoles(index) {
        this.roleLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.roleLoading = false
      },
      handleFilter() {
        this.getRoles(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getRoles(1)
      },
      handleCurrentChange(val) {
        this.getRoles(val)
      },
      resetTemp() {
        this.temp = {
          roleId: undefined,
          role_code: '',
          role_name: '',
          createtime: new Date(),
          role_memo: '请输入……'
        }
      },
      handleCreate() {
      /*  this.resetTemp()
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        }) */
        this.temp = {}
        this.temp.createtime = new Date()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            roleInsert({ model: this.temp }).then((r) => {
              console.log('aaaaaaaaaaaaaa', this.temp)
              console.log(r)
              this.dialogFormVisible = false
              this.getRoles(1)
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            roleUpdateBySelective({ model: tempData }).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getRoles(1)
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.roles.indexOf(row)
        this.roles.splice(index, 1)
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
