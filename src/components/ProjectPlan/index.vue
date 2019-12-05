<template>
  <el-dialog top="30px" label-position="left"
             :show-close="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :title="title"
             :visible.sync="dialogFormVisible" width="600px">
    <el-card class="box-card">
      <el-form ref="form" size="mini" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="任务名称" prop="text">
          <el-input v-model="form.text" style="width: 400px" :disabled="ISREVISE === 'CHANGE'"></el-input>
        </el-form-item>
        <el-form-item label="计划状态" prop="ref1">
          <!--<el-input v-model="form.ref1" style="width: 400px"></el-input>-->
          <el-select v-model="form.ref1" placeholder="请选择" @change="changeSelect(form.ref1)" style="width: 400px">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划进度" prop="text">
          <el-input v-model="form.progress" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="计划日期" prop="">
          <el-date-picker
            :disabled="ISREVISE === 'CHANGE'"
            @change="dateChage"
            value-format="yyyy-MM-dd"
            style="width: 400px"
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际日期" prop="">
          <el-date-picker
            :disabled="IFUPDATE"
            @change="dateChage2"
            value-format="yyyy-MM-dd"
            style="width: 400px"
            v-model="dateValue2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="持续天数">
          <el-input disabled="true" v-model="form.duration" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button size="mini" :loading="loding" v-if="type==='create'" type="primary" @click="onSubmit">立即创建
          </el-button>
          <el-button size="mini" :loading="loding" v-if="type==='update'" type="primary" @click="onUpdate">更新
          </el-button>
          <el-button size="mini" :loading="loding" @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-dialog>
</template>
<script>
  import user from '@/store/modules/user'
  import { project_taskInsert, project_taskUpdateBySelective, selectDuration } from '@/api/project_task'

  export default {
    name: 'ProjectPlanDialog',
    props: ['restData', 'returnByChild'],
    mounted: function() {
    },
    methods: {
      // 打开弹窗
      openDialog(type, data, ISREVISE, index) {
        this.index = index
        this.ISREVISE = ISREVISE
        if (type === 'create') {
          this.form = { duration: '', ref1: '' }
          this.dateValue = ''
          this.dateValue2 = ''
          this.title = '新增计划'
          this.IFUPDATE = false
        } else {
          this.title = '修改计划'
          this.IFUPDATE = false
          this.form.text = data.text
          this.form.duration = data.duration
          this.form.ref1 = data.ref1
          this.form.progress = data.progress
          this.dateValue = []
          this.dateValue2 = []
          if (data.start_date) {
            this.dateValue[0] = data.start_date
          }
          if (data.end_date) {
            this.dateValue[1] = data.end_date
          }
          if (data.actual_data_start) {
            this.dateValue2[0] = data.actual_data_start
          }
          if (data.actual_data_end) {
            this.dateValue2[1] = data.actual_data_end
          }
          if (data.parent === '0') {
            this.IFUPDATE = true
            this.options = [
              { key: '未开始', label: '未开始' },
              { key: '进行中', label: '进行中' }
            ]
          } else {
            this.options = [
              { key: '未开始', label: '未开始' },
              { key: '进行中', label: '进行中' },
              { key: '已完成', label: '已完成' }
            ]
          }
          // var endDate = this.timestampToTime(new Date(data.start_date).getTime() + (data.duration * (3600 * 24 * 1000)))
          // this.dateValue[1] = endDate
        }
        this.type = type
        this.data = data
        this.dialogFormVisible = true
      },
      dateChage(dataArray) {
        var that = this
        var searchItems = {}
        searchItems.start_date = dataArray[0]
        searchItems.end_date = dataArray[1]
        selectDuration(searchItems).then(function(r) {
          that.form.duration = r.data.model
        })
        /* if (dataArray && dataArray[0]) {
          var d1 = new Date(dataArray[0])
          var d2 = new Date(dataArray[1])
          this.form.duration = parseInt(d2 - d1) / 1000 / 3600 / 24
        }*/
      },
      dateChage2(dataArray) {
        this.dateValue2 = dataArray
      },
      changeSelect(e) {
        if (e === '已完成') {
          this.form.progress = '100%'
        }
      },
      onSubmit() { // 提交
        var that = this
        that.$refs['form'].validate((valid) => {
          if (valid) {
            if (!this.dateValue || !this.dateValue[0]) {
              that.$notify({
                title: '提示',
                message: '请选择计划日期',
                type: 'warning',
                duration: 2000
              })
              return false
            } else {
              if (that.form.ref1 === '已完成') {
                if (!this.dateValue2 || !this.dateValue2[0]) {
                  that.$notify({
                    title: '提示',
                    message: '请选择实际日期',
                    type: 'warning',
                    duration: 2000
                  })
                  return false
                }
              }
              that.loding = true
              if (that.ISREVISE === 'YES') {
                var datas = {}
                datas.start_date = this.dateValue[0]
                datas.end_date = this.dateValue[1]
                if (that.dateValue2) {
                  datas.actual_data_start = that.dateValue2[0]
                  datas.actual_data_end = that.dateValue2[1]
                } else {
                  datas.actual_data_start = null
                  datas.actual_data_end = null
                }
                datas.text = that.form.text
                datas.duration = that.form.duration
                datas.ref1 = that.form.ref1
                datas.progress = that.form.progress
                datas.create_by = user.state.usercode
                datas.parent = that.data.id
                datas.number = that.data.number + '.'
                datas.project_id = that.data.project_id
                that.$props.returnByChild(datas, that.type, that.index, function() {
                  that.loding = false
                  that.dialogFormVisible = false
                })
              } else {
                var subForm = Object.assign({}, this.form)
                subForm.start_date = this.dateValue[0]
                subForm.end_date = this.dateValue[1]
                if (that.dateValue2) {
                  subForm.actual_data_start = that.dateValue2[0]
                  subForm.actual_data_end = that.dateValue2[1]
                } else {
                  subForm.actual_data_start = null
                  subForm.actual_data_end = null
                }
                subForm.parent = this.data.id
                subForm.project_id = this.data.project_id
                this.loding = true
                project_taskInsert({ model: subForm }).then(r => {
                  this.$notify({
                    title: '消息',
                    message: '新增成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$props.restData()
                  this.loding = false
                  this.dialogFormVisible = false
                }, r => {
                  this.loding = false
                })
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-' // 此时为四位数字表示 getYear()的话为两位数字表示
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' // 当前月份(0-11,0代表1月)
        var D = date.getDate() + ' ' // 当前日(1-31)
        /* var h = date.getHours() + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +':';
        var s = date.getSeconds() + ':'
        var ms = date.getMilliseconds() // 毫秒值 */
        return Y + M + D // 此处可以自定义需要的显示类型
      },
      onUpdate() {
        var that = this
        that.$refs['form'].validate((valid) => {
          if (valid) {
            if (!this.dateValue || !this.dateValue[0]) {
              that.$notify({
                title: '提示',
                message: '请选择计划日期',
                type: 'warning',
                duration: 2000
              })
              return false
            } else {
              if (that.form.ref1 === '已完成') {
                if (!this.dateValue2 || !this.dateValue2[0]) {
                  that.$notify({
                    title: '提示',
                    message: '请选择实际日期',
                    type: 'warning',
                    duration: 2000
                  })
                  return false
                }
              }
              if (that.ISREVISE === 'YES') {
                var datas = Object.assign({}, that.data)
                datas.start_date = that.dateValue[0]
                datas.end_date = that.dateValue[1]
                if (that.dateValue2) {
                  datas.actual_data_start = that.dateValue2[0]
                  datas.actual_data_end = that.dateValue2[1]
                } else {
                  datas.actual_data_start = null
                  datas.actual_data_end = null
                }
                datas.text = that.form.text
                datas.duration = that.form.duration
                datas.ref1 = that.form.ref1
                datas.progress = that.form.progress
                datas.update_by = user.state.usercode
                that.$props.returnByChild(datas, that.type, '', function() {
                  that.dialogFormVisible = false
                })
              } else {
                var subForm = Object.assign({}, that.form)
                subForm.start_date = that.dateValue[0]
                subForm.end_date = that.dateValue[1]
                if (that.dateValue2) {
                  subForm.actual_data_start = that.dateValue2[0]
                  subForm.actual_data_end = that.dateValue2[1]
                } else {
                  subForm.actual_data_start = null
                  subForm.actual_data_end = null
                }
                subForm.project_id = that.data.project_id
                subForm.task_id = that.data.task_id
                subForm.update_by = user.state.usercode
                project_taskUpdateBySelective({ model: subForm }).then(r => {
                  this.$notify({
                    title: '消息',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$props.restData()
                  this.loding = false
                  this.dialogFormVisible = false
                }, r => {
                  this.loding = false
                })
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        title: '',
        type: '',
        loding: false,
        form: { duration: '', ref1: '' },
        dateValue: '',
        dateValue2: '',
        data: {},
        rules: {
          text: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          ref1: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          progress: [
            { required: true, message: '必填', trigger: 'blur' }
          ]
        },
        options: [
          { key: '未开始', label: '未开始' },
          { key: '进行中', label: '进行中' },
          { key: '已完成', label: '已完成' }
        ],
        ISREVISE: 'NO',
        index: 0,
        IFUPDATE: false
      }
    }
  }
  /* var requiredate = (rule, value, callback) => {
   console.log(value)
   if (!value && !value[0]) {
   return callback(new Error(''))
   }
   setTimeout(() => {
   if (value[0] && value[0]) {
   callback(new Error('请输入时间'))
   } else {
   callback()
   }
   }, 1000)
   } */
</script>
<style scoped>
  .box-card {
    margin-top: -20px;
  }
</style>
