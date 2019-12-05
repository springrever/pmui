<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
    <el-button-group style="margin-bottom: 6px">
      <el-button size="mini" :loading = "submitLoading" @click="closePage()" type="primary" plain>返回 <i class="el-icon-back el-icon--right"></i></el-button>
      <el-button size="mini" v-if="editstatus === '新增'" :loading = "submitLoading" @click="createData('add')" type="success" plain>提交 <i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button size="mini" v-if="continuestatus === '继续'" :loading = "submitLoading" @click="createData('next')" type="success"  plain>提交并新增 <i class="el-icon-share el-icon--right"></i></el-button>
      <el-button size="mini" v-if="keepstatus === '保存'" :loading = "submitLoading" @click="keepData()" type="success"  plain>保存 <i class="el-icon-share el-icon--right"></i></el-button>
      <el-button size="mini" :disabled = "isMark" v-if="refreshstatus === '更新'" :loading = "submitLoading" @click="updateData()" type="success"  plain>更新 <i class="el-icon-share el-icon--right"></i></el-button>
      <el-button size="mini" v-if="backStatus === '退回'" :loading = "submitLoading" @click="backData()" type="danger"  plain>退回 <i class="el-icon-share el-icon--right"></i></el-button>
    </el-button-group>

        <el-form :rules="rules" size="mini" ref="dataForm" :model="temp" label-position="left" label-width="140px">
        <el-card class="box-card" style="margin-bottom: 25px">
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="10">
              <el-form-item label="需求部门" prop="required_dept">
                <el-select :disabled="mustShow" size="mini"  v-model="temp.required_dept" filterable placeholder="请选择">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col >
            <el-col :span="10">
              <el-form-item label="需求提交人" prop="required_submitter">
                <el-input :disabled="mustShow" style="width: 180px" v-model="temp.required_submitter"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="开发人员" prop="developer">
                <el-select  :disabled="mustShow" size="mini"  v-model="temp.developer" filterable placeholder="请选择">
                  <el-option
                    v-for="item in useroptions"
                    :key="item.userCode"
                    :label="item.userName2"
                    :value="item.userCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="10">
              <el-form-item label="开发状态"prop="status">
                <el-select :disabled="unmustShow" v-model="temp.status" placeholder="请选择">
                  <el-option
                    :change="checkStatus(temp.status)"
                    v-for="item in options"
                    :key="item.dictionaryCode"
                    :label="item.dictionaryName"
                    :value="item.dictionaryCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="开始时间" prop="start_time" >
                <el-date-picker
                  :disabled="mustShow"
                  style="width: 185px"
                  v-model="temp.start_time"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col >
            <el-col :span="10">
              <el-form-item label="预计结束时间" prop="expected_end_time">
                <el-date-picker
                  :disabled="mustShow"
                  style="width: 185px"
                  v-model="temp.expected_end_time"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="10">
              <el-form-item label="所属系统" prop="developer_module">
                <el-select :disabled="mustShow" size="mini"  v-model="temp.developer_module" filterable placeholder="请选择">
                  <el-option
                    v-for="item in dictOptions"
                    :key="item.fd_id"
                    :label="item.fd_name"
                    :value="item.fd_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col >
            <el-col :span="10">
              <el-form-item label="需求子部门" >
                <el-input :disabled="unmustShow"  style="width: 185px" v-model="temp.ref5" placeholder="选填"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="完成百分比" prop="percent_complete" >
                <el-input :disabled="unmustShow" style="width: 185px" v-model="temp.percent_complete" placeholder="10的倍数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="10">
              <el-form-item label="开发人天" prop="developing_day" >
                <el-input :disabled="unmustShow" style="width: 185px" v-model="temp.developing_day" placeholder="0.5的倍数"></el-input>
              </el-form-item>
            </el-col >
            <el-col :span="10">
              <el-form-item label="开发完成时间" prop="actual_finish_time">
                <el-date-picker
                  :disabled="isShow"
                  :change="changePM(temp.actual_finish_time)"
                  style="width: 185px"
                  v-model="temp.actual_finish_time"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上线时间" prop="">
                  <el-date-picker
                    :disabled="isShow"
                    style="width: 185px"
                    v-model="temp.ref_date1"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
            </el-col >
          </el-row>
        </el-card>
        <el-card calss="box-card">
          <el-row :gutter="20" type="flex" class="row-bg" style="">
            <el-col :span="15">
              <el-form-item label="开发内容详细描述" label-position="top" prop="developer_desc">
                <el-input
                  :disabled="mustShow"
                  type="textarea"
                  :row = '2'
                  placeholder = '请输入内容'
                  v-model="temp.developer_desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="">
            <el-col :span="15">
              <el-form-item label="变更记录" prop="change_record">
                <el-input
                  :disabled="unmustShow"
                  type="textarea"
                  :row = '2'
                  placeholder = '请输入内容'
                  v-model="temp.change_record"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="">
            <el-col :span="15">
              <el-form-item label="备注" prop="remark">
                <el-input
                  :disabled="unmustShow"
                  type="textarea"
                  :row = '2'
                  placeholder = '请输入内容'
                  v-model="temp.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
  </div>
</template>
<script>
  import { weeklyLineInsert, weeklyLineUpdateBySelective, weeklyLineQuery } from '@/api/weeklyLine'
  import waves from '@/directive/waves'
  import { userQuery } from '@/api/user'
  import { deptQuery } from '@/api/dept'
  import { dictionaryQuery } from '@/api/dictionary'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  import user from '@/store/modules/user'
  import ElCard from '../../../node_modules/element-ui/packages/card/src/main'
  export default{
    components: {
      ElCard
    },
    name: 'devtasks',
    directives: {
      waves
    },
    data() {
      var checkNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'))
        } else if (isNaN(value)) {
          callback(new Error('必须为数字'))
        } else {
          var isTen = value % 10
          if (isTen !== 0) {
            callback(new Error('必须为10的倍数'))
          } else {
            callback()
          }
        }
      }
      var checkNumber2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'))
        } else if (isNaN(value)) {
          callback(new Error('必须为数字'))
        } else {
          var isTen = value % 0.5
          if (isTen !== 0) {
            callback(new Error('必须为0.5的倍数'))
          } else {
            callback()
          }
        }
      }
      return {
        defuatstatus: '',
        userPower: {},
        userRole: {},
        isShow: false,
        mustShow: false,
        unmustShow: false,
        updateShow: false,
        msg: '开发任务',
        submitLoading: false,
        temp: { developer: '', percent_complete: '', status: '' },
        textMap: {
          update: '修改',
          create: '新增'
        },
        editstatus: '新增',
        keepstatus: '保存',
        continuestatus: '继续',
        refreshstatus: '',
        backStatus: '',
        isMark: false,
        useroptions: [],
        deptOptions: [],
        dictOptions: [],
        nowTags: {},
        rules: {
          required_dept: [{ required: true, message: '不能为空', trigger: 'blur' }],
          required_submitter: [{ required: true, message: '不能为空', trigger: 'blur' }],
          developer: [{ required: true, message: '不能为空', trigger: 'blur' }],
          developer_module: [{ required: true, message: '不能为空', trigger: 'blur' }],
          developer_desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          start_time: [{ required: true, message: '不能为空', trigger: 'blur' }],
          expected_end_time: [{ required: true, message: '不能为空', trigger: 'blur' }],
          developing_day: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkNumber2, trigger: 'blur' }],
          percent_complete: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkNumber, trigger: 'blur' }],
          // remark: [{ required: true, message: '不能为空', trigger: 'change' }],
          status: [{ required: true, message: '不能为空', trigger: 'blur' }]
          // change_record: [{ required: true, message: '不能为空', trigger: 'change' }]
        },
        options: []
      }
    },
    created() {
      this.getUserInfo()
    },
    mounted: function() {
      this.getUserOptions()
      this.getDeptOptions()
      this.getQueOptions()
      this.getDictionaries()
      var tagsView = this.$store.state.tagsView.visitedViews
      this.nowTags = tagsView[tagsView.length - 1]
    },
    activated: function() {
      var that = this
      var type = that.$route.params.type
      that.$refs.dataForm.clearValidate()
      if (type === '新增') {
        that.$refs.dataForm.clearValidate()
        that.mustShow = false
        that.unmustShow = false
        that.isShow = false
        that.updateShow = false
        that.editstatus = type
        that.keepstatus = '保存'
        that.continuestatus = '继续'
        that.refreshstatus = ''
        that.backStatus = ''
        that.temp = { developer: '' }
        that.temp.developer = user.state.usercode
      } else if (type === '修改') {
        that.$refs.dataForm.clearValidate()
        var seachItems = { page: {}, items: { line_id_eq: that.$route.params.id }}
        weeklyLineQuery(seachItems).then(r => {
          r.data.list[0].deal_time = parseInt(r.data.list[0].deal_time)
          that.temp = r.data.list[0]
          that.defuatstatus = that.temp.status
          // that.temp.developer = user.state.usercode
          that.keepstatus = ''
          that.continuestatus = ''
          that.refreshstatus = '更新'
          // 提交态且问题处理状态为完成，更新禁用
          if (!this.userRole['admin'] && !this.userRole['manager']) {
            if (that.temp.ref4 === 'submit' && that.temp.status === 'wt_end') {
              that.isMark = true
            } else {
              that.isMark = false
            }
          } else {
            that.isMark = false
          }
          // adimin  manager 退回功能
          if (this.userRole['admin'] || this.userRole['manager']) {
            if (that.temp.ref4 === 'submit') {
              that.backStatus = '退回'
            } else {
              that.backStatus = ''
            }
          } else {
            that.backStatus = ''
          }
          // 保存态添加提交功能
          if (that.temp.ref4 === 'save') {
            that.editstatus = '新增'
          } else {
            that.editstatus = ''
          }
          // 各种状态下 添加修改权限控制
          if (!this.userRole['admin'] && !this.userRole['manager']) {
            if (that.temp.ref4 === 'save') {
              that.mustShow = false
              that.unmustShow = false
              if (that.temp.status === 'wt_end') {
                that.isShow = false
              } else {
                that.isShow = true
              }
            } else {
              if (that.temp.status === 'wt_end') {
                that.mustShow = true
                that.unmustShow = true
                that.isShow = true
              } else {
                that.mustShow = true
                that.unmustShow = false
                that.isShow = true
              }
            }
          } else {
            that.mustShow = false
            that.unmustShow = false
            that.isShow = false
          }
        })
      }
    },
    deactivated: function() {
    },
    methods: {
      getUserInfo() {
        var userPower = {}
        var userRole = {}
        user.state.authoritys.forEach(function(value, index) {
          userPower[value] = true
        })
        user.state.roles.forEach(function(value, index) {
          userRole[value] = true
        })
        this.userPower = userPower
        this.userRole = userRole
      },
      checkStatus() {
        if (this.userRole['admin'] || this.userRole['manager']) {
          this.isShow = false
          return
        }
        if (this.temp.status === 'wt_build') {
          this.rules.actual_finish_time = [{ required: false, message: '不能为空', trigger: 'change' }]
          // this.rules.developing_day = [{ required: false, message: '不能为空', trigger: 'change' }]
          if (this.temp.actual_finish_time) {
            this.temp.actual_finish_time = null
          }
          if (this.temp.ref_date1) {
            this.temp.ref_date1 = null
          }
          if (this.temp.ref4 === 'submit') {
            this.isShow = true
          } else {
            if (this.temp.status === 'wt_build') {
              this.isShow = true
            } else {
              this.isShow = false
            }
          }
        } else {
          if (this.temp.ref4 === 'submit') {
            if (this.defuatstatus === 'wt_end') {
              this.isShow = true
            } else {
              this.isShow = false
            }
          } else {
            this.isShow = false
          }
          this.rules.actual_finish_time = [{ required: true, message: '不能为空', trigger: 'change' }]
          // this.rules.developing_day = [{ required: true, message: '不能为空', trigger: 'change' }]
        }
      },
      closePage() {
        this.$router.replace('/weekly/index')
        this.closeSelectedTag(this.nowTags)
      },
      changePM(r) {
        if (r) {
          this.temp.percent_complete = '100'
          this.temp.status = 'wt_end'
        }
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      getUserOptions() {
        var seachItems = { page: {}, items: {}}
        userQuery(seachItems).then(r => {
          this.useroptions = r.data.list
        })
      },
      getDeptOptions() {
        var seachItems = { page: {}, items: {}}
        deptQuery(seachItems).then(r => {
          this.deptOptions = r.data.list
          console.log('deptOptions', this.deptOptions)
        })
      },
      getDictionaries() {
        var seachItems = { page: {}, items: { 'fd_type': '应用系统' }}
        headerDictionaryQuery(seachItems).then(r => {
          this.dictOptions = r.data.list
          console.log('dictOptions', this.dictOptions)
        })
      },
      getQueOptions() {
        var seachItems = { page: {}, items: { 'dictionnaryType_eq': '问题状态', 'dictionaryCode_in': ['wt_end', 'wt_build'] }}
        dictionaryQuery(seachItems).then(r => {
          this.options = r.data.list
          console.log('options', this.options)
        })
      },
      updateData() {
        var oDate1 = new Date(this.temp.start_time)
        var oDate2 = new Date(this.temp.expected_end_time)
        var oDate3 = new Date(this.temp.actual_finish_time)
        if (oDate1.getTime() > oDate2.getTime()) {
          this.customAlert('警告', '开始时间不能大于结束时间', 'warning')
        } else {
          if (!oDate3.getTime()) {
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
                console.log('temp->', this.temp)
                this.submitLoading = true
                weeklyLineUpdateBySelective({ model: this.temp }).then((r) => {
                  this.customAlert('成功', '更新成功', 'success')
                  this.submitLoading = false
                  this.closePage()
                }, r => {
                  this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
                  this.submitLoading = false
                })
              }
            })
          } else {
            if (oDate3.getTime() < oDate1.getTime()) {
              this.customAlert('警告', '实际完成时间不能小于开始时间', 'warning')
            } else {
              this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                  console.log('temp->', this.temp)
                  this.submitLoading = true
                  weeklyLineUpdateBySelective({ model: this.temp }).then((r) => {
                    this.customAlert('成功', '更新成功', 'success')
                    this.submitLoading = false
                    this.closePage()
                  }, r => {
                    this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
                    this.submitLoading = false
                  })
                }
              })
            }
          }
        }
      },
      createData(type) {
        var oDate1 = new Date(this.temp.start_time)
        var oDate2 = new Date(this.temp.expected_end_time)
        var oDate3 = new Date(this.temp.actual_finish_time)
        if (oDate1.getTime() > oDate2.getTime()) {
          this.customAlert('警告', '开始时间不能大于结束时间', 'warning')
        } else {
          if (!oDate3.getTime()) {
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
                if (this.temp.status === 'wt_end') {
                  this.$confirm('提交之后数据将不可更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    if (this.temp.line_code) {
                      this.submitData()
                    } else {
                      this.dataInsert(type)
                    }
                  }).catch(() => {
                    /* this.$message({
                     type: 'info',
                     message: '已取消提交'
                     }) */
                  })
                } else {
                  if (this.temp.line_code) {
                    this.submitData()
                  } else {
                    this.dataInsert(type)
                  }
                }
              }
            })
          } else {
            if (oDate3.getTime() < oDate1.getTime()) {
              this.customAlert('警告', '实际完成时间不能小于开始时间', 'warning')
            } else {
              this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                  if (this.temp.status === 'wt_end') {
                    this.$confirm('提交之后数据将不可更改, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      if (this.temp.line_code) {
                        this.submitData()
                      } else {
                        this.dataInsert(type)
                      }
                    }).catch(() => {
                      /* this.$message({
                       type: 'info',
                       message: '已取消提交'
                       }) */
                    })
                  } else {
                    if (this.temp.line_code) {
                      this.submitData()
                    } else {
                      this.dataInsert(type)
                    }
                  }
                }
              })
            }
          }
        }
      },
      // 保存数据
      keepData() {
        this.temp.weekly_type = 'develop'
        this.temp.create_by = user.state.usercode
        this.temp.ref4 = 'save'
        var oDate1 = new Date(this.temp.start_time)
        var oDate2 = new Date(this.temp.expected_end_time)
        var oDate3 = new Date(this.temp.actual_finish_time)
        if (oDate1.getTime() > oDate2.getTime()) {
          this.customAlert('警告', '开始时间不能大于结束时间', 'warning')
        } else {
          if (!oDate3.getTime()) {
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
                this.submitLoading = true
                weeklyLineInsert({ model: this.temp }).then((r) => {
                  this.customAlert('成功', '保存成功', 'success')
                  this.submitLoading = false
                  this.closePage()
                }, r => {
                  this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
                  this.submitLoading = false
                })
              }
            })
          } else {
            if (oDate3.getTime() < oDate1.getTime()) {
              this.customAlert('警告', '实际完成时间不能小于开始时间', 'warning')
            } else {
              this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                  this.submitLoading = true
                  weeklyLineInsert({ model: this.temp }).then((r) => {
                    this.customAlert('成功', '保存成功', 'success')
                    this.submitLoading = false
                    this.closePage()
                  }, r => {
                    this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
                    this.submitLoading = false
                  })
                }
              })
            }
          }
        }
      },
      // 新建周报任务
      dataInsert(type) {
        this.temp.weekly_type = 'develop'
        this.temp.create_by = user.state.usercode
        this.submitLoading = true
        this.temp.ref4 = 'submit'
        weeklyLineInsert({ model: this.temp }).then((r) => {
          this.customAlert('成功', '创建成功', 'success')
          this.submitLoading = false
          if (type === 'next') {
            this.temp.developing_day = ''
            this.temp.expected_end_time = ''
            this.temp.start_time = ''
            this.temp.actual_finish_time = ''
            this.temp.developer_desc = ''
            this.temp.change_record = ''
            this.temp.remark = ''
            this.temp.ref_date1 = ''
            this.$refs.dataForm.clearValidate()
          } else {
            this.closePage()
          }
        }, r => {
          this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
          this.submitLoading = false
        })
      },
      submitData() {
        this.submitLoading = true
        this.temp.ref4 = 'submit'
        weeklyLineUpdateBySelective({ model: this.temp }).then((r) => {
          this.customAlert('成功', '提交成功', 'success')
          this.submitLoading = false
          this.closePage()
        }, r => {
          this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
          this.submitLoading = false
        })
      },
      backData() {
        this.temp.ref4 = 'save'
        this.submitLoading = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            weeklyLineUpdateBySelective({ model: this.temp }).then((r) => {
              this.customAlert('成功', '退回成功', 'success')
              this.submitLoading = false
              this.closePage()
            }, r => {
              this.customAlert('错误', '出现未知错误，请联系管理员', 'error')
              this.submitLoading = false
            })
          }
        })
      },
      customAlert(tittle, msg, type) {
        this.$notify({
          title: tittle,
          message: msg,
          type: type,
          duration: 2000
        })
      }
    }
  }
</script>
<style>

</style>
