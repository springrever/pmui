<template>
  <div class="app-container">

    <el-tag style="margin-bottom:20px;">
      <span>菜单管理</span>
    </el-tag>

    <tree-table :data="menus" :columns="columns" border>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button  @click="handleCreate" type="primary" size="mini" icon="el-icon-circle-plus">新增</el-button>
          <el-button  @click="handleUpdate(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" v-dragDialog>
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item prop="fun_code" label="菜单编码" >
          <el-input v-model="temp.fun_code"></el-input>
        </el-form-item>
        <el-form-item prop="fun_name" label="菜单名称" >
          <el-input v-model="temp.fun_name"></el-input>
        </el-form-item>
        <el-form-item label ='上级菜单'>
          <el-cascader
          :options="menuoptions"
          v-model="selectoptions"
          :change-on-select = "true"
          :props="props"
          :show-all-levels="false"
          @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item prop="funurl" label="菜单地址">
          <el-input v-model="temp.funurl"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="temp.fun_desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /**
   Auth: Lei.j1ang
   Created: 2018/1/19-14:54
   */
  import treeTable from '@/components/TreeTable'
  import { fetchMenus, insertfun, updatefun } from '@/api/permission'
  import dragDialog from '@/directive/el-dragDialog'
  import user from '@/store/modules/user'
  // import userinfo from '@/store/modules/user'
  import { project_taskQuery } from '@/api/project_task'

  export default {
    name: 'treeTableDemo',
    components: { treeTable },
    directives: {
      dragDialog
    },
    data() {
      return {
        menuoptions: [],
        selectoptions: [],
        props: { label: 'fun_name', value: 'cfunid' },
        columns: [
          {
            text: '菜单编码',
            value: 'fun_code'
          },
          {
            text: '菜单名称',
            value: 'fun_name'
          },
          {
            text: '菜单地址',
            value: 'funurl'
          },
          {
            text: '菜单描述',
            value: 'fun_desc'
          }
        ],
        rules: {
          fun_code: [{ required: true, message: '菜单编码必填', trigger: 'change' }],
          fun_name: [{ required: true, message: '菜单名称必填', trigger: 'change' }],
          funurl: [{ required: true, message: '菜单地址必填', trigger: 'change' }]
        },
        menus: [],
        dialogFormVisible: false,
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogStatus: '',
        temp: {
          fun_code: '',
          fun_name: '',
          funurl: '',
          fun_desc: '请输入……',
          parent_id: '',
          fun_level: ''
        }
      }
    },
    // created() {
    //   this.getMenus()
    // },
    mounted: function() {
      fetchMenus().then(response => {
        console.log('xxoo', response)
        this.menus = response.data.list
        this.menuoptions = this.menus
        console.log('m--->', JSON.stringify(this.menus))
        console.log('c--->', this.columns)
        // console.log('userinfo.state.deptidu----->', userinfo.state.deptid)
      })
    },
    methods: {
      findmenulist(temp) {
        console.log('object:' + temp)
        if (temp.parent != null && temp.fun_level > 1) {
          this.selectoptions.unshift(temp.parent.cfunid)
          console.log('array:' + this.selectoptions)
          this.findmenulist(temp.parent)
        }
      },
      fetchMenus() {
        fetchMenus().then(response => {
          this.menus = response.data.list
          this.menuoptions = this.menus
        })
      },
      resetTemp() {
        this.temp = {
          fun_code: '',
          fun_name: '',
          funurl: '',
          fun_desc: '请输入……'
        }
      },
      handleCreate() {
        this.selectoptions = []
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      createData: function() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.temp.parent_id = this.selectoptions[this.selectoptions.length - 1] == null ? 0 : this.selectoptions[this.selectoptions.length - 1]
            this.temp.fun_level = this.selectoptions.length + 1
            this.temp.createby = user.state.usercode
            insertfun(this.temp).then(response => {
              if (response.status === 200 && response.data.result === 'Success') {
                this.$notify({
                  title: '成功',
                  message: '新增成功',
                  type: 'success',
                  duration: 2000
                })
                this.fetchMenus()
              } else {
                this.$notify({
                  title: '失败',
                  message: '新增成功',
                  type: 'error',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleUpdate(row) {
        this.selectoptions = []
        this.temp = Object.assign({}, row) // copy obj
        this.findmenulist(this.temp)
        this.temp.parent = null
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.parent_id = this.selectoptions[this.selectoptions.length - 1] == null ? 0 : this.selectoptions[this.selectoptions.length - 1]
            this.temp.fun_level = this.selectoptions.length + 1
            this.temp.parent = undefined
            this.temp.children = undefined
            updatefun(this.temp).then(response => {
              console.log('response:' + response.data.result)
              if (response.status === 200 && response.data.result === 'Success') {
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                this.fetchMenus()
              } else {
                this.$notify({
                  title: '失败',
                  message: '更新失败',
                  type: 'error',
                  duration: 2000
                })
              }
              this.dialogFormVisible = false
            })
          }
        })
      },
      getPlan() {
        if (this.$route.params.id) {
          this.seachItems.items.project_id = this.$route.params.id
          project_taskQuery(this.seachItems).then(r => {
            this.tasks.data = r.data.list
          })
        }
      }
    }
  }
</script>
