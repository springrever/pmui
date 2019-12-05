
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="seachItems.def1_eq"
        size="mini"
        placeholder="父级">
        <el-option
          v-for="item in hdictionList"
          :key="item.fd_id"
          :label="item.fd_name"
          :value="item.fd_id">
        </el-option>
      </el-select>

      <el-select
        v-model="seachItems.dictionnaryType_eq"
        size="mini"
        placeholder="类型">
        <el-option
          v-for="item in dicTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <!--<el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="类型"-->
                <!--v-model="beans.searchForm.items.dictionnaryType_lk">-->
      <!--</el-input>-->
      <el-input size="mini" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="编码"
                v-model="beans.searchForm.items.dictionaryCode_lk">
      </el-input>
      <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">新增
      </el-button>
      <el-table :key='tableKey' :data="beans.dataList" v-loading="dictionaryLoading" element-loading-text="读取中……" border
                highlight-current-row
                 resizable="true">
        <el-table-column  align="center" label="父级" >
          <template slot-scope="scope">
            <span>{{scope.row.fd_name}}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="类型" >
          <template slot-scope="scope">
            <span>{{scope.row.dictionnaryType}}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="编码" >
          <template slot-scope="scope">
            <span>{{scope.row.dictionaryCode}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="名称" >
          <template slot-scope="scope">
            <span>{{scope.row.dictionaryName}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="创建时间" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | fmtDateFil}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="是否锁定" align="center" v-model="value">
          <template slot-scope="scope">
          <span><svg-icon v-if="scope.row.isLocked == 1" icon-class="lock"/>
                <svg-icon v-if="scope.row.isLocked == 0" icon-class="unlock"/>
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button v-if="scope.row.isLocked == 1" size="mini" type="success" @click="handleLock(scope.row,false)">已锁定
            </el-button>
            <el-button v-if="scope.row.isLocked == 0" size="mini" @click="handleLock(scope.row,true)">未锁定
            </el-button>
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

      <el-dialog v-dragDialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="90px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item prop="def1" label="父级">
          <el-select
            style="width: 200px"
            v-model="temp.def1"
            filterable
            default-first-option
            placeholder="选择父级">
            <el-option
              v-for="item in hdictionList"
              :key="item.fd_id"
              :label="item.fd_name"
              :value="item.fd_id">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item prop="dictionnaryType" label="类型">
            <!--<el-input v-model="temp.dictionnaryType"></el-input>-->
            <el-select
              style="width: 200px"
              v-model="temp.dictionnaryType"
              filterable
              allow-create
              default-first-option
              placeholder="可创建新条目">
              <el-option
                v-for="item in dicTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="dictionaryCode" label="编码">
            <el-input style="width: 200px" v-model="temp.dictionaryCode"></el-input>
          </el-form-item>
          <el-form-item prop="dictionaryName" label="名称">
            <el-input style="width: 200px" v-model="temp.dictionaryName"></el-input>
          </el-form-item>
          <el-form-item label="是否锁定" prop="title" >
            <el-select style="width: 200px" v-model="temp.isLocked">
              <el-option v-for="items in select"
                         :key="items.key"
                         :label="items.label"
                         :value="items.value">
              </el-option>
            </el-select>
            <!--<el-input v-model="temp.isLocked"></el-input>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :loading = "submitLoading" @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" :loading = "submitLoading" type="primary" @click="createData">新增</el-button>
          <el-button v-else type="primary" :loading = "submitLoading" @click="updateData">确认</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import { getDicTypes, dictionaryQuery, dictionaryInsert, deleteBySelective, dictionaryUpdateBySelective } from '@/api/dictionary'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, initPage } from '@/utils/index'
  import ElTransfer from 'element-ui/packages/transfer/src/main'
  import dragDialog from '@/directive/el-dragDialog'
  import user from '@/store/modules/user'
  export default {
    components: { ElTransfer },
    name: 'dictionaryTable',
    filters: {
      fmtDateFil: function(value) {
        return fmtDate(value)
      }
    },
    directives: {
      waves,
      dragDialog
    },
    data() {
      return {
        hdictionList: [],
        seachItems: {},
        dicTypeList: [],
        submitLoading: false,
        temp: { dictionnaryType: '' },
        isLocked: undefined,
        tableKey: 0,
        dictionary: null,
        total: null,
        select: [{ value: '1', label: '是' }, { value: '0', label: '否' }],
        dictionaryLoading: true,
        beans: { dataList: [] },
        value: undefined,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新增'
        },
        opendictionaryID: '',
        rules: {
          dictionaryCode: [{ required: true, message: '编码必填', trigger: 'change' }],
          dictionnaryType: [{ required: true, message: '类型必填', trigger: 'change' }],
          dictionaryName: [{ required: true, message: '名称必填', trigger: 'change' }],
          def1: [{ required: true, message: '父级必填', trigger: 'change' }]
        }
      }
    },
    created() {
      initPage(this.beans, dictionaryQuery)
      this.getDictionary(1)
      this.getDicType()
      this.getHdictionList()
    },
    methods: {
      getHdictionList() {
        var seachItems = {
          items: {},
          page: {}
        }
        headerDictionaryQuery(seachItems).then(r => {
          this.hdictionList = r.data.list
          this.hdictionList.unshift({})
          // console.log('this.hdictionList:', this.hdictionList)
        })
      },
      getDicType() {
        // dicTypeList
        var sz = [{
          value: '',
          label: ''
        }]
        getDicTypes().then(r => {
          r.data.list.forEach(function(value, index) {
            sz.push({
              value: value,
              label: value
            })
          })
        })
        this.dicTypeList = sz
      },
      getDictionary(index) {
        this.dictionaryLoading = true
        this.beans.searchCurrent(index)
        this.beans.searchForm.items = Object.assign(this.beans.searchForm.items, this.seachItems)
        console.log('thisBean--->', this.beans)
        this.dictionaryLoading = false
      },
      handleChange(value) {
        console.log('value', value)
        this.temp.deptId = value[value.length - 1]
      },
      handleFilter() {
        this.getDictionary(1)
      },
      handleSizeChange(val) {
        this.beans.setPagecount(val)
        this.getDictionary(1)
      },
      handleCurrentChange(val) {
        this.getDictionary(val)
      },
      handleLock(row, isLocked) {
        this.isLocked = isLocked
        var model1 = {}
        model1.dictionaryCode = row.dictionaryCode
        model1.isLocked = row.isLocked
        model1.dictionaryId = row.dictionaryId
        if (isLocked) {
          model1.isLocked = '1'
        } else {
          model1.isLocked = '0'
        }
        dictionaryUpdateBySelective({ model: model1 }).then((r) => {
          if (row.isLocked === '0') {
            row.isLocked = '1'
          } else {
            row.isLocked = '0'
          }

          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      resetTemp() {
        this.temp = {
          isLocked: '0'
        }
      },
      handleCreate() {
        // this.temp = {}
        this.resetTemp()
        this.roleSelectFlag = false
        this.dialogStatus = 'create'
        // this.temp.isLocked = 0
        this.dialogFormVisible = true
        if (this.seachItems.dictionnaryType_eq) {
          this.temp.dictionnaryType = this.seachItems.dictionnaryType_eq
        }
        if (this.seachItems.def1_eq) {
          this.temp.def1 = this.seachItems.def1_eq
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.temp.createUserId = user.state.usercode
            this.submitLoading = true
            dictionaryInsert({ model: this.temp }).then((r) => {
              this.dialogFormVisible = false
              this.getDictionary(1)
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.submitLoading = false
            }, r => {
              this.$notify({
                title: '错误',
                message: '请联系管理员',
                type: 'error',
                duration: 2000
              })
              this.submitLoading = false
            })
          }
        })
      },
      handleUpdate(row) {
        // console.log(this.options_test)
        if (row.isLocked === '1') {
          this.$alert('已锁定，不能修改', '提示')
        } else {
          this.temp = Object.assign({}, row) // copy obj
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.submitLoading = true
            dictionaryUpdateBySelective({ model: this.temp }).then((r) => {
              this.dialogFormVisible = false
              this.getDictionary(1)
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.submitLoading = false
            }, r => {
              this.$notify({
                title: '错误',
                message: '请联系管理员',
                type: 'error',
                duration: 2000
              })
              this.submitLoading = false
            })
          }
        })
      },
      handleDelete(row) {
        // alert(this.isLocked)
        if (this.isLocked) {
          this.$alert('已锁定，不能删除', '提示')
        } else {
          deleteBySelective({ items: { 'dictionaryCode_eq': row.dictionaryCode }})
          this.getDictionary(1)
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
  function fmtDate(obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
  }
</script>
