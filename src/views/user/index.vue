<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;height: 5px" class="filter-item" placeholder="用户编码"
                v-model="beans.searchForm.items.userCode_lk">
      </el-input>
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名称"
                v-model="beans.searchForm.items.username_lk">
      </el-input>
      <el-button class="filter-item" size="mini" type="primary"  v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;"  @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>
    </div>

    <el-table :key='tableKey' :data="beans.dataList" v-loading="userLoading" element-loading-text="读取中……" border
              highlight-current-row
              resizable="true">
      <!--<el-table-column sortable="beans.searchForm.items.cuserid_ord" align="center" label="用户ID" width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.cuserid}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="用户编码" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.userCode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.userName2}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" width="150">
        <template slot-scope="scope" v-model="selectoptions">
          <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column align="center" label="角色" width="150px">
        <template slot-scope="scope" v-model="roleValue">
          <el-button type="primary" @click="openRole(scope.row.userCode, scope.row.cuserid)">角色管理</el-button>
        </template>
      </el-table-column>-->
      <el-table-column width="150px" align="center" label="启用日期">
        <template slot-scope="scope">
          <span>{{scope.row.ableDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="失效日期">
        <template slot-scope="scope">
          <span>{{scope.row.disableDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备 注" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.userNote}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="是否锁定" align="center" v-model="value">
        <template slot-scope="scope">
          <!--<span><svg-icon v-if="scope.row.isLocked == 1" icon-class="lock" @click="handleLock(scope.row,false)"/>
                <svg-icon v-if="scope.row.isLocked == 0" icon-class="unlock" @click="handleLock(scope.row,true)"/>
          </span>-->
          <el-button v-if="scope.row.isLocked == 1" size="mini" type="success" @click="handleLock(scope.row,false)"><svg-icon v-if="scope.row.isLocked == 1" icon-class="lock"/>
          </el-button>
          <el-button v-if="scope.row.isLocked == 0" size="mini" @click="handleLock(scope.row,true)"><svg-icon v-if="scope.row.isLocked == 0" icon-class="unlock" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="openRole(scope.row.userCode, scope.row.cuserid)">角色管理</el-button>
          <el-button v-if="false" size="mini" type="danger"
                     @click="handleDelete(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="beans.searchForm.page.nowPage" :page-sizes="[5,20,30, 50]" :page-size="beans.searchForm.page.nowcont"
                     layout="total, sizes, prev, pager, next, jumper" :total="beans.searchForm.page.count">
      </el-pagination>
    </div>

    <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >
      <el-form  :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="90px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item prop="userCode" label="用户编码" >
          <el-input  v-model="temp.userCode"></el-input>
        </el-form-item>
        <el-form-item  prop="userName2" label="用户名称">
          <el-input v-model="temp.userName2"></el-input>
        </el-form-item>
        <el-form-item  prop="number" label="用户工号">
          <el-input v-model="temp.number"></el-input>
        </el-form-item>
        <el-form-item prop="selectoPtions" label="用户部门">
          <el-cascader
            :options="options_test"
            v-model="temp.selectoPtions"
            change-on-select="true"
            :props="props"
            :show-all-levels="false"
            @change="handleChange">
          </el-cascader>
        </el-form-item>

        <el-form-item v-if="dialogStatus=='create'" prop="userrole" label="用户角色">
          <el-select v-model="temp.userrole" clearable placeholder="请选择">
            <el-option
              v-for="item in user_role"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用日期" prop="ableDate">
          <el-date-picker v-model="temp.ableDate" type="datetime" placeholder="请选择一个启用日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="disableDate">
          <el-date-picker v-model="temp.disableDate" type="datetime" placeholder="请选择一个失效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否锁定" prop="title">
          <el-select v-model="temp.isLocked">
            <el-option v-for="items in select"
                       :key="items.key"
                       :label="items.label"
                       :value="items.value">

            </el-option>
          </el-select>
          <!--<el-input v-model="temp.isLocked"></el-input>-->
        </el-form-item>
        <el-form-item  prop="email" label="用户邮箱">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="temp.userNote">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2" >
      <el-form  ref="dataForm"  :model="temp" label-position="left" label-width="90px"
                style='width: 400px; margin-left:50px;'>
        <el-form-item prop="userCode" label="用户编码" >
          <el-input  v-model="temp.userCode"></el-input>
        </el-form-item>
        <el-form-item prop="userName2" label="用户名称">
          <el-input v-model="temp.userName2"></el-input>
        </el-form-item>
        <el-form-item  prop="number" label="用户工号">
          <el-input v-model="temp.number"></el-input>
        </el-form-item>
        <el-form-item prop="selectoPtions" label="用户部门">
          <el-cascader
            :options="options_test"
            v-model="temp.selectoPtions"
            change-on-select="true"
            :props="props"
            :show-all-levels="false"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="启用日期" prop="ableDate">
          <el-date-picker v-model="temp.ableDate" type="datetime" placeholder="请选择一个启用日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="disableDate">
          <el-date-picker v-model="temp.disableDate" type="datetime" placeholder="请选择一个失效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="email" label="用户邮箱">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="temp.userNote">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dragDialog ref="dialog" title="用户角色管理" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item>
          <el-transfer v-model="roleValue"
                       :data="roles"
                       :props="role_props"
                       :titles="roleTitle">

          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="roleConfirm">确定</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { userQuery, userInsert, insertUserRole, userUpdateBySelective, deleteBySelective, getRoleByUser } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import { roleQuery } from '@/api/role'
  import { finddeptnode } from '@/api/dept'
  import dragDialog from '@/directive/el-dragDialog'
  import user from '@/store/modules/user'

  export default {
    components: { ElTransfer },
    name: 'userTable',
    roleSelectFlag: true,
    directives: {
      waves,
      dragDialog
    },
    data() {
      return {
        roleTitle: ['未分配角色', '已分配角色'],
        roles: [],
        roleValue: [],
        isLocked: undefined,
        tableKey: 0,
        users: null,
        total: null,
        userLoading: true,
        beans: { dataList: [] },
        dpetList: [],
        value: undefined,
        select: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
        deptName: '',
        options_test: [],
        selectoptions: [],
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        temp: {
          cuserid: undefined,
          userName2: '',
          number: '',
          userCode: '',
          deptName: '',
          ableDate: new Date(),
          disableDate: undefined,
          isLocked: 0,
          userNote: '',
          userrole: '',
          selectoPtions: ''
        },
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogTableVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新增'
        },
        openUserID: '',
        rules: {
          userName2: [{ required: true, message: '用户名称必填', trigger: 'change' }],
          number: [{ required: true, message: '用户工号必填', trigger: 'change' }],
          userCode: [{ required: true, message: '用户编码必填', trigger: 'change' }],
          ableDate: [{ type: 'date', required: true, message: '', trigger: 'change' }],
          // userrole: [{ required: true, message: '用户角色必选', trigger: 'change' }],
          selectoPtions: [{ type: 'array', required: true, message: '用户部门必选', trigger: 'change' }],
          disableDate: [{ type: 'date', required: true, message: '失效日期必填', trigger: 'change' }],
          email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'change' }]
        },
        props: { label: 'deptName', value: 'deptId' },
        role_props: { label: 'role_name', key: 'roleId' },
        user_role: []
      }
    },
    created() {
      initPage(this.beans, userQuery)
      this.getUsers(1)
      this.getDepts()
      this.getRoles()
      this.initUserRole()
    },
    methods: {
      openRole(code, cid) {
        this.dialogTableVisible = true
        this.openUserID = cid
        getRoleByUser({ items: { user_code_eq: code }}).then(r => {
          var sz = []
          r.data.list.forEach(function(value, index) {
            console.log(value)
            sz.push(value.roleId)
          })
          this.roleValue = sz
        })
      },
      getRoles() {
        roleQuery({ items: {}, page: { 'nowPage': -1, 'nowcont': 1 }}).then(response => {
          console.log('------>', response.data.list)
          this.roles = response.data.list
        })
      },
      getDepts() {
        finddeptnode().then(response => {
          this.options_test = response.data.list
        })
      },
      getUsers(index) {
        this.userLoading = true
        this.beans.searchCurrent(index)
        console.log('thisBean--->', this.beans)
        this.userLoading = false
      },
      roleConfirm() {
        var str = {}
        str.rolevalue = this.roleValue
        str.CuserId = this.openUserID
        // console.log('aaaaaaaaaaaaa', this.roleValue)
        insertUserRole(str).then(res => {
          this.dialogFormVisible = false
          this.getUsers(1)
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.dialogTableVisible = false
        })
      },
      handleChange(value) {
        console.log('value', value)
        this.temp.deptId = value[value.length - 1]
      },
      handleFilter() {
        this.getUsers(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getUsers(1)
      },
      handleCurrentChange(val) {
        this.getUsers(val)
      },
      initUserRole() {
        var sz = []
        var seachItems = {}
        seachItems.items = {}
        seachItems.page = {}
        seachItems.items.role_code_in = ['USR', 'manager', 'Cons', 'PGR']
        roleQuery(seachItems).then(r => {
          r.data.list.forEach(function(value, index) {
            var d = {}
            d.label = value.role_name
            d.value = value.roleId
            sz.push(d)
          })
        })
        this.user_role = sz
      },
      handleLock(row, isLocked) {
        console.log(isLocked, row)
        this.isLocked = isLocked
        var model1 = {}
        model1.userCode = row.userCode
        model1.isLocked = row.isLocked
        if (isLocked) {
          model1.isLocked = 1
        } else {
          model1.isLocked = 0
        }
        userUpdateBySelective({ model: model1 }).then((r) => {
          // this.users.unshift(this.temp)CuserId
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
        row.isLocked = isLocked
      },
      resetTemp() {
        this.temp = {
          cuserid: undefined,
          username: '',
          userCode: '',
          deptName: '',
          ableDate: new Date(),
          disableDate: undefined,
          isLocked: 0,
          userNote: '',
          selectoptions: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        // user_role

        this.selectoptions = []
        this.roleValue = []
        this.roleSelectFlag = false
        this.dialogStatus = 'create'
        this.rules.userrole = [{ required: true, message: '用户角色必选', trigger: 'change' }]
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // console.log('temp->', this.temp)
            this.temp.userName = this.temp.userName2
            this.temp.createby = user.state.usercode
            var searchItems = { items: {}, page: {}}
            searchItems.items.userCode = this.temp.userCode
            userQuery(searchItems).then((r) => {
              if (r.data.list.length === 0) {
                userInsert({ model: this.temp }).then((r) => {
                  // this.users.unshift(this.temp)CuserId
                  var str = {}
                  var sz = []
                  sz.push(this.temp.userrole)
                  str.rolevalue = sz
                  // alert(this.temp.userrole)
                  if (r.data.CuserId) {
                    str.CuserId = r.data.CuserId
                    insertUserRole(str).then(res => {
                      this.dialogFormVisible = false
                      this.getUsers(1)
                      this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                      })
                    })
                  }
                })
              } else {
                this.$notify({
                  title: '警告',
                  message: '用户编码不能重复',
                  type: 'warning',
                  duration: 2000
                })
              }
            }, r => {
              this.$notify({
                title: '错误',
                message: '未知错误，请联系管理员',
                type: 'error',
                duration: 2000
              })
            })
            // console.log(this.temp.userName, this.temp.userName)
          }
        })
      },
      handleUpdate(row) {
        // console.log(this.options_test)
        if (row.isLocked) {
          this.$alert('已锁定，不能修改', '提示')
        } else {
          this.temp = Object.assign({}, row) // copy obj
          this.roleSelectFlag = true
          var deptArray = []
          deptArray.unshift(row.deptid)
          var nowdeptId = row.deptid
          for (var i = 0; i < 10; i++) {
            var p = findDepts(this.options_test, nowdeptId)
            if (p !== '0' && p !== '-1') {
              deptArray.unshift(p)
              nowdeptId = p
            } else if (p === '0') {
              i = 100
            }
          }
          this.temp.selectoPtions = deptArray
          getRoleByUser({ items: { user_code_eq: row.userCode }}).then(r => {
            var sz = []
            console.log('---->r', r)
            r.data.list.forEach(function(value, index) {
              console.log(value)
              sz.push(value.role_code)
            })
            this.temp.roleValue = sz
          })
          this.dialogStatus = 'update'
          // this.rules.userrole = [{ required: false, message: '用户角色必选', trigger: 'change' }]
          this.dialogFormVisible2 = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      },
      updateData() {
        console.log(this.rules)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.temp.userName = this.temp.userName2
            this.temp.roleValue = undefined
            this.temp.authorities = undefined
            userUpdateBySelective({ model: this.temp }).then((r) => {
              var str = {}
              str.rolevalue = this.temp.roleValue
              str.CuserId = r.data.CuserId
              this.dialogFormVisible2 = false
              this.getUsers(1)
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        if (this.isLocked) {
          this.$alert('已锁定，不能删除', '提示')
        } else {
          deleteBySelective({ items: { 'userCode_eq': row.userCode }})
          this.getUsers(1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }
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
  function findDepts(item, deptid) {
    var p = -1
    for (var i = 0; i < item.length; i++) {
      if (item[i].deptId === deptid) {
        p = item[i].parentID
        break
      } else if (item[i].children !== undefined) {
        var r = findDepts(item[i].children, deptid)
        console.log('==============2', r)
        if (r !== undefined && r !== -1) {
          p = r
          break
        }
      }
    }
    return p
  }
</script>
