<template>
  <div class="app-container">
    <div class="filter-container">
    <el-tag style="margin-bottom:20px;">
      <span>部门管理</span>
    </el-tag>

    <tree-table :data="depts" :columns="columns" border>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button  @click="handleCreate" size="mini" type="primary" icon="el-icon-circle-plus">新增</el-button>
          <el-button  @click="handleUpdate(scope.row)" size="mini" type="primary" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>
    </tree-table>
    </div>


    <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm"  :model="dept" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item prop="deptCode" label="部门名称">
          <el-input v-model="dept.deptName"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="部门编码" >
          <el-input v-model="dept.deptCode"></el-input>
        </el-form-item>
        <el-form-item  prop="deptShortName" label="部门简称">
          <el-input v-model="dept.deptShortName"></el-input>
        </el-form-item>
        <el-form-item label="父级部门">
            <el-cascader
              :disabled = "dept.CascaderFlag"
              :clearable = "true"
              :options="depts"
              v-model="dept.selectoptions"
              :props="props"
              :show-all-levels="false"
              @change="handleChange"
              change-on-select="true">
            </el-cascader>
        </el-form-item>
        <el-form-item label="部门备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="dept.deptNote"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2">
      <el-form  ref="dataForm"  :model="dept" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item  label="部门名称">
          <el-input v-model="dept.deptCode"></el-input>
        </el-form-item>
        <el-form-item  label="部门编码" >
          <el-input v-model="dept.deptName"></el-input>
        </el-form-item>
        <el-form-item   label="部门简称">
          <el-input v-model="dept.deptShortName"></el-input>
        </el-form-item>
        <el-form-item label="父级部门">
          <el-cascader
            :disabled = "dept.CascaderFlag"
            :filterable="true"
            :clearable = "true"
            :options="depts"
            v-model="dept.selectoptions"
            :props="props"
            :show-all-levels="false"
            @change="handleChange"
            change-on-select="true">
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入..." v-model="dept.deptNote"></el-input>
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
  // import { fetchDepts } from '@/api/permission'
  import { finddeptnode, deptInsert, deptUpdateBySelective, deptQuery } from '@/api/dept'
  import dragDialog from '@/directive/el-dragDialog'
  import { findDepts } from '@/utils/index'

  export default {
    name: 'DeptTreeTable',
    components: { treeTable },
    data() {
      return {
        seledept: [],
        roleValue: ['1'],
        role_props: { label: 'roleValue', key: 'role' },
        columns: [
          {
            text: '部门编码',
            value: 'deptCode'
          },
          {
            text: '部门名称',
            value: 'deptName'
          },
          {
            text: '部门简称',
            value: 'deptShortName'
          },
          {
            text: '备注',
            value: 'deptNote'
          }
        ],
        depts: [],
        selectoptions: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        textMap: {
          update: '修改',
          create: '新增'
        },
        dialogStatus: '',
        dept: {
          createtime: new Date(),
          ts: new Date()
        },
        props: { label: 'deptName', value: 'deptId' },
        rules: {
          deptCode: [{ required: true, message: '部门名称必填', trigger: 'change' }],
          deptName: [{ required: true, message: '部门编码必填', trigger: 'change' }],
          deptShortName: [{ required: true, message: '部门简称必填', trigger: 'change' }]
          // selectoptions: [{ required: true, message: '', trigger: 'change' }],
          // deptNote: [{ type: 'array', required: true, message: '部门备注必填', trigger: 'change' }],
        }
      }
    },
    created() {
      this.getDepts()
    },
    directives: {
      dragDialog
    },
    methods: {
      getDepts() {
        finddeptnode().then(response => {
          this.depts = response.data.list
          console.log('dept:', response.data.list)
        })
      },
      resetTemp() {
        this.temp = {
          deptCode: undefined,
          deptName: '',
          deptShortName: '',
          deptNote: '',
          createtime: new Date()
        }
      },

      handleCreate() {
        this.resetTemp()
        this.depts.CascaderFlag = true
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleChange(value) {
        console.log('value', this.selectoptions)
        this.dept.parentID = value[value.length - 1]
        this.dept.deptLevel = value.length + 1
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var searchItems = { page: {}, items: {}}
            searchItems.items.deptName_eq = this.dept.deptName
            searchItems.items.a_or = 1
            searchItems.items.deptCode_eq = this.dept.deptCode
            deptQuery(searchItems).then((r) => {
              if (r.data.list.length === 0) {
                deptInsert({ model: this.dept }).then((r) => {
                  console.log('aaaaaaaaaaaaaaaaaaaa', this.dept)
                  this.dialogFormVisible = false
                  this.getDepts()
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                })
              } else {
                this.$notify({
                  title: '警告',
                  message: '部门名称或者部门Code重复',
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
          }
        })
      },
      handleUpdate(row) {
        if (row.children === undefined) {
          row.CascaderFlag = false
        } else {
          row.CascaderFlag = true
        }
        this.dept = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dept.selectoptions = findDepts(this.depts, row.parentID)
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dept.children = undefined
            this.dept.parent = undefined
            console.log('this.dept', this.dept)
            deptUpdateBySelective({ model: this.dept }).then((r) => {
              this.getDepts()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      }

    }
  }
</script>
