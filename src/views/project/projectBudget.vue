
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button-group style="margin-bottom: 6px">
        <el-button size="mini" :loading = "submitLoading" @click="editData()" type="danger" plain>修订<i class="el-icon-edit el-icon--right"></i></el-button>
        <el-button size="mini" :loading = "submitLoading" @click="submitData()" type="primary" plain>保存<i class="el-icon-check el-icon--right"></i></el-button>
        <el-button size="mini" :loading = "submitLoading" @click="update()" type="success" plain>通过<i class="el-icon-success el-icon--right"></i></el-button>
        <el-button size="mini" v-if="1 === 2" :loading = "submitLoading" @click="abandon()" type="warning" plain>弃审<i class="el-icon-warning el-icon--right"></i></el-button>
        <el-button size="mini" :loading = "submitLoading" @click="versionCheck()" type="info" plain>版本追溯<i class="el-icon-more el-icon--right"></i></el-button>
      </el-button-group>
      <el-card class="box-card">
        <el-form size="mini" ref="dataForm" :model="temp" label-position="left" label-width="80px"
                 style=' margin-left:50px;'>
           <!--头信息-->
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-left: -150px">
            <el-col :span="8">
              <el-form-item >
                <el-button
                  style="font-size: 18px;font-weight: inherit;border-color: #409EFF;background-color: #409EFF;color: #fff;border-radius: 10px;">项目简介</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-left: -150px;margin-top: -5px;">
            <el-col :span="24">
              <el-form-item >
                <div style="background-color: #D33237;height: 1px"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-top: -20px">
            <el-col :span="8">
              <el-form-item prop="demand_name"  label="项目名称" >
                <el-input :disabled="isTrue" style="width: 80%" v-model="temp.budgetName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="demand_name"  label="总金额" >
                <!--<el-input :disabled="isTrue" style="width: 80%" v-model="temp.amount"></el-input>-->
                <span style="color: #D33237">{{temp.amount|totalMoney(beans.dataList)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="demand_name"  label="审核状态" >
                <el-input :disabled="true" style="width: 80%" v-model="temp.ref2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="8">
              <el-form-item prop="demand_name"  label="创建人" >
                <el-input :disabled="true" style="width: 80%" v-model="temp.createName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="demand_name"  label="创建时间" >
                <el-input :disabled="true" style="width: 80%" v-model="temp.create_date"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="版本号" >
                <el-input :disabled="true" style="width: 80%" v-model="temp.version"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="16">
              <el-form-item label="项目描述" >
                <el-input :disabled="isTrue" type="textarea" v-model="temp.budgetDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--预算信息-->
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-left: -150px;margin-top: 35px">
            <el-col :span="8">
              <el-form-item >
                <el-button
                  style="font-size: 18px;font-weight: inherit;border-color: #409EFF;background-color: #409EFF;color: #fff;border-radius: 10px;">预算信息</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-left: -150px;margin-top: -5px;">
            <el-col :span="24">
              <el-form-item >
                <div style="background-color: #D33237;height: 1px"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-table  :key='tableKey'
                     :data="beans.dataList"
                     @header-click="addLineList"
                     element-loading-text="读取中……"
                     border
                     highlight-current-row
                     style="width: 100%;margin-top: -20px"
                     fit="true"
                     resizable="true">
            <el-table-column  align="center" label="预算类型" >
              <template
                slot-scope="scope">
                <el-select :disabled="isTrue" v-model="scope.row.budget_line_type" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="人员类型" >
              <template slot-scope="scope">
                <el-select :disabled="isTrue" v-model="scope.row.budget_line_name" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="项目人天" >
              <template slot-scope="scope">
                <el-input :disabled="isTrue" size="mini" style="width: 250px" v-model.number="scope.row.quantity"></el-input>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="人天单价" >
              <template slot-scope="scope">
                <el-input :disabled="isTrue" size="mini" style="width: 250px" v-model.number="scope.row.unitPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="总计金额">
              <template slot-scope="scope">
                <!--<el-input :disabled="isTrue" size="mini" style="width: 250px" v-model="scope.row.total"></el-input>-->
                {{scope.row.total | rowtotalFiler(scope.row.quantity, scope.row.unitPrice)}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="+" label-class-name="label2"  class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="deleteData(scope.$index, scope.row)">删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;margin-top: 25px">
            <el-col :span="6">
              <el-form-item  labelWidth="70px">
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  labelWidth="90px">
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="demand_name" label="合计金额(元)" labelWidth="100px">
                {{temp.amount | totalMoney(beans.dataList)}}
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
              <!--<el-form-item prop="demand_name"  label="状态" labelWidth="50px" >-->
                <!--<el-input :disabled="true" style="width: 80%" v-model="temp.budget_line_name"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
          <!--版本追溯-->
          <el-dialog
            title="版本信息"
            :visible.sync="dialogVisible"
            width="40%">
            <el-table  @row-click="versionChose"
                       :key='tableKey'
                       :data="beans.versionDta"
                       element-loading-text="读取中……"
                       border
                       highlight-current-row
                       style="width: 100%;margin-top: -20px"
                       fit="true"
                       resizable="true">
              <el-table-column   align="center" label="创建人">
                <template
                  slot-scope="scope">
                  <span>{{scope.row.createName}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="创建时间" >
                <template slot-scope="scope">
                  <span>{{scope.row.create_date}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="版本号" >
                <template slot-scope="scope">
                  <span>{{scope.row.version}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { ProjectBudgetInfo, budgetHeaderQuery, insertBudgetHeaderAndLine, updateByStatus } from '@/api/budgetHeader'
  import { budgetLineQuery } from '@/api/budgetLine'
  import user from '@/store/modules/user'
  import waves from '@/directive/waves' // 水波纹指令
  export default {
    components: {
      amount: {
      }
    },
    name: 'projectBudget',
    filters: {
      rowtotalFiler: function(value, agr0, agr1) {
        return agr0 * agr1
      },
      totalMoney: function(value, dataList) {
        var numer = 0
        dataList.forEach(function(value, index) {
          numer += value.quantity * value.unitPrice
        })
        return numer
      }
    },
    directives: {
      waves
    },
    data() {
      return {
        dialogVisible: false,
        isTrue: true,
        temp: {},
        options: [{
          value: 'person',
          label: '按人天'
        }, {
          value: 'resource',
          label: '按资源'
        }, {
          value: 'other',
          label: '其他'
        }],
        value: 'first',
        checked: '',
        submitLoading: false,
        beans: { dataList: [{ budget_line_type: 'person', budget_line_name: 'person', unitPrice: '', quantity: '', total: '' }], versionData: [] },
        isVersion: 'no'
      }
    },
    created() {
    },
    mounted() {
    },
    activated: function() {
      this.getProjectInfo()
    },
    methods: {
      getProjectInfo() {
        var that = this
        if (that.$store.getters.onProject === 'null') {
          that.$store.commit('SET_SHOWPROJECT', false)
          that.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            type: 'warning',
            callback: action => {
              that.$router.replace({ name: 'demendProjectIndex', params: {
                type: 'projectBudget',
                from: 'projectBudget'
              }})
            }
          })
        } else {
          this.getHeaderData(this.$store.getters.onProject.project_code)
        }
      },
      // 头信息
      getHeaderData(code) {
        ProjectBudgetInfo(code).then(r => {
          this.temp = r.data.model
          if (!this.temp) {
            this.isTrue = false
          } else {
            this.isTrue = true
            this.getLineData(this.temp)
          }
        })
      },
      // 子表信息
      getLineData(temp) {
        var searchitem = { page: {}, items: {}}
        searchitem.items.budget_header_id_eq = temp.budget_header_id
        budgetLineQuery(searchitem).then(r => {
          this.beans.dataList = r.data.list
        })
      },
      // 修订
      editData() {
        this.isVersion = 'yes'
        this.isTrue = false
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
      },
      // 保存 提交
      submitData() {
        this.isTrue = true
        this.submitLoading = true
        if (this.isVersion === 'yes') {
          var model = this.temp
          /* if (model.version) {
            model.version += 1
          } else {
            model.version = 1
          }*/
          model.create_by = user.state.usercode
          var count = 0
          this.beans.dataList.forEach(function(value, index) {
            count += value.quantity * value.unitPrice
          })
          model.amount = count
          var ump = []
          ump = this.beans.dataList
          for (const i in ump) {
            this.beans.dataList[i].total = ump[i].unitPrice * ump[i].quantity
          }
          insertBudgetHeaderAndLine({ model: model, budgetLines: this.beans.dataList }).then(r => {
            this.submitLoading = false
            if (r.data.status === 'success') {
              this.customAlert('成功', r.data.info, 'success')
            } else {
              this.customAlert('警告', r.data.info, 'warning')
            }
          }, r => {
            this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
            this.submitLoading = false
          })
        } else if (this.isVersion === 'no') {
          this.customAlert('警告', '当前内容无修改', 'warning')
          this.submitLoading = false
        }
        this.isVersion = 'no'
      },
      addData() {
        this.beans.dataList.push({
          budget_line_type: '', budget_line_name: '', unitPrice: '', quantity: '', total: ''
        })
      },
      deleteData(index, row) {
        this.beans.dataList.splice(index, 1)
      },
      // 版本追溯
      versionCheck() {
        this.submitLoading = true
        this.dialogVisible = true
        var searchItem = { page: {}, items: {}}
        searchItem.items.project_code_eq = this.$store.getters.onProject.project_code
        budgetHeaderQuery(searchItem).then(r => {
          // console.log('版本追溯', r)
          this.beans.versionDta = r.data.list
          this.submitLoading = false
        })
      },
      // 版本号对应数据
      versionChose(row, event) {
        this.dialogVisible = false
        var searchItem = { page: {}, items: {}}
        searchItem.items.project_code_eq = this.$store.getters.onProject.project_code
        searchItem.items.version_eq = row.version
        budgetHeaderQuery(searchItem).then(r => {
          this.temp = r.data.list[0]
          this.getLineData(this.temp)
        })
      },
      // 丢弃
      abandon() {
        this.isVersion = 'no'
        this.isTrue = false
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 100)
      },

      // 通过
      update() {
        var id = this.temp.budget_header_id
        updateByStatus(id).then(r => {
          this.getHeaderData(this.$store.getters.onProject.project_code)
          this.$notify({
            title: '消息',
            message: r.data.info,
            type: r.data.status,
            duration: 2000
          })
        })
      },
      addLineList(column, event) {
        if (column.label === '+') {
          this.addData()
        }
      },
      customAlert(tittle, msg, type) {
        this.$notify({
          title: tittle,
          message: msg,
          type: type,
          duration: 2000
        })
      }
    },
    watch: {
      '$store.getters.onProject': function(newVal, oldVal) {
        this.getProjectInfo()
      }
    }
  }
</script>

<style>
  .label2 {
    color: #409EFF;
    font-size: 25px;
    font-weight: bold;

  }
</style>
