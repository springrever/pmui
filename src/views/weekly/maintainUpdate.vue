<template>
    <div class="app-container">
      <el-button-group style="margin-bottom:6px;">
        <el-button size="mini" :loading="submitLoading" @click="closePage()" type="primary" plain>返回 <i class="el-icon-back el-icon--right"></i></el-button>
        <el-button size="mini" :loading="submitLoading" v-if="editstatus === '新增'" @click="createData('add')" type="success" plain>提交 <i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button size="mini" :loading="submitLoading" v-if="editstatus === '新增'" @click="createData('next')" type="success"  plain>提交并新增<i class="el-icon-share el-icon--right"></i></el-button>
        <el-button size="mini" :loading="submitLoading" v-if="editstatus === '修改'" @click="updateData()" type="success"  plain>更新 <i class="el-icon-share el-icon--right"></i></el-button>
      </el-button-group>

      <el-form :rules="rules" ref="dataForm" size="mini" :model="temp" label-position="left" label-width="140px"
               style=''>
        <el-card class="box-card" style="margin-bottom:20px;">
          <el-row type="flex" class="row-bg" :gutter="20" style="height: 40px">
              <el-col :span="10">
                <el-form-item label="责任人" prop="ref1">
                <el-select size="mini"  v-model="temp.ref1" filterable placeholder="请选择">
                  <el-option
                    v-for="item in useroptions"
                    :key="item.userCode"
                    :label="item.userName2"
                    :value="item.userCode">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="责任部门" prop="respons_dept" >
                <el-select  size="mini" v-model="temp.respons_dept" filterable placeholder="请选择">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="需求部门" prop="required_dept">
              <!--<el-input v-model="temp.required_dept"></el-input>-->
              <el-select size="mini" v-model="temp.required_dept" filterable placeholder="请选择">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" :gutter="20" style="">
            <el-col :span="10">
              <el-form-item style="width: 320px" label="需求提交人" prop="required_submitter">
            <!--<el-select size="mini" v-model="temp.required_submitter" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in useroptions"-->
                <!--:key="item.userCode"-->
                <!--:label="item.userName2"-->
                <!--:value="item.userCode">-->
              <!--</el-option>-->
            <!--</el-select>-->
                <el-input v-model="temp.required_submitter"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="处理日期" prop="deal_date">
                <el-date-picker
                 style="width: 185px"
                  v-model="temp.deal_date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item style="width: 320px" label="处理时间（小时）" prop="deal_time">
                <el-input size="mini" v-model="temp.deal_time"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" style="height: 40px;">
            <el-col :span="10">
              <el-form-item label="维护系统" prop="ref3">
                <el-select size="mini"  v-model="temp.ref3" filterable placeholder="请选择">
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
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" style="margin-bottom:20px;">

          <el-row type="flex" class="row-bg" :gutter="20" style="">
            <el-col :span="14">
               <el-form-item label="简述" prop="deal_desc">
            <el-input size="mini" type="textarea" :rows="2" v-model="temp.deal_desc"></el-input>
          </el-form-item >
            </el-col>
              <el-col :span="6">
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" :gutter="20">
            <el-col :span="14">
              <el-form-item  label="详细描述" prop="deal_detail_desc" >
            <el-input size="mini" type="textarea" :rows="2" v-model="temp.deal_detail_desc"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" :gutter="20" style="">
            <el-col :span="14">
          <el-form-item label="原因分析" prop="reason" >
            <el-input size="mini" type="textarea" :rows="2" v-model="temp.reason"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
              <el-row type="flex" class="row-bg" :gutter="20" style="">
                <el-col :span="14">
                </el-col>
              </el-row>
          <el-row type="flex" class="row-bg" :gutter="20" style="">
            <el-col :span="14">
                <el-form-item label="长期对策" prop="longterm_action" >
            <el-input size="mini" type="textarea" :rows="2" v-model="temp.longterm_action"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" :gutter="20" style="">
            <el-col :span="14">
              <el-form-item label="备注" prop="remark" >
            <el-input size="mini" type="textarea" :rows="2" v-model="temp.remark"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
</template>
<script>
  import { weeklyLineInsert, weeklyLineQuery, weeklyLineUpdateBySelective } from '@/api/weeklyLine'
  import waves from '@/directive/waves' // 水波纹指令
  import { userQuery } from '@/api/user'
  import { deptQuery } from '@/api/dept'
  import user from '@/store/modules/user'
  import { headerDictionaryQuery } from '@/api/headerDictionary'
  export default {
    name: 'HelloWorld',
    mounted: function() {
      this.getUserOptions()
      this.getDeptOptions()
      this.getDictionaries()
      this.fetchData()
      var tagsView = this.$store.state.tagsView.visitedViews
      this.nowTags = tagsView[tagsView.length - 1]
    },
    data() {
      var checkNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'))
        } else if (isNaN(value)) {
          callback(new Error('必须为数字'))
        } else {
          if (value % 0.5 === 0) {
            callback()
          } else {
            callback(new Error('必须为0.5的倍数'))
          }
        }
      }
      return {
        nowTags: {},
        temp: { ref1: '' },
        useroptions: [],
        submitLoading: false,
        deptOptions: [],
        editstatus: '新增',
        textMap: {
          update: '修改',
          create: '新增'
        },
        rules: {
          ref1: [{ required: true, message: '不能为空', trigger: 'blur' }],
          respons_dept: [{ required: true, message: '不能为空', trigger: 'blur' }],
          required_dept: [{ required: true, message: '不能为空', trigger: 'blur' }],
          required_submitter: [{ required: true, message: '不能为空', trigger: 'blur' }],
          deal_time: [{ validator: checkNumber, trigger: 'blur' }],
          deal_desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          deal_detail_desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
          reason: [{ required: true, message: '不能为空', trigger: 'blur' }],
          deal_date: [{ required: true, message: '不能为空', trigger: 'blur' }],
          ref3: [{ required: true, message: '不能为空', trigger: 'blur' }],
          longterm_action: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    components: {
    },
    directives: {
      waves
    },
    watch: { '$route': 'fetchData' },
    methods: {
      getDictionaries() {
        var seachItems = { page: {}, items: { 'fd_type': '应用系统' }}
        headerDictionaryQuery(seachItems).then(r => {
          this.dictOptions = r.data.list
          console.log('dictOptions', this.dictOptions)
        })
      },
      fetchData() {
        this.temp = this.editstatus = null
        this.$refs.dataForm.clearValidate()
        if (this.$route.params.id) {
          this.editstatus = '修改'
          var seachItems = { page: {}, items: { line_id_eq: this.$route.params.id }}
          weeklyLineQuery(seachItems).then(r => {
            r.data.list[0].deal_time = parseInt(r.data.list[0].deal_time)
            this.temp = r.data.list[0]
            // this.temp.ref1 = user.state.usercode
          })
        } else {
          this.editstatus = '新增'
          this.temp = { ref1: '' }
          this.temp.ref1 = user.state.usercode
        }
      },
      closePage() {
        this.$router.replace('/weekly/index2')
        this.closeSelectedTag(this.nowTags)
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
          this.temp.ref1 = user.state.usercode
        })
      },
      getDeptOptions() {
        var seachItems = { page: {}, items: {}}
        deptQuery(seachItems).then(r => {
          this.deptOptions = r.data.list
          console.log(this.deptOptions)
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.submitLoading = true
            weeklyLineUpdateBySelective({ model: this.temp }).then((r) => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.submitLoading = false
              this.closePage()
            }, r => {
              this.$notify({
                title: '错误',
                message: '出现未知错误请联系管理员',
                type: 'error',
                duration: 2000
              })
              this.submitLoading = false
            })
          }
        })
      },
      createData(type) {
        var that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('temp->', this.temp)
            this.temp.weekly_type = 'daliy'
            this.temp.create_by = user.state.usercode
            this.submitLoading = true
            weeklyLineInsert({ model: this.temp }).then((r) => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.submitLoading = false
              if (type === 'next') {
                this.temp.deal_desc = ''
                this.temp.deal_detail_desc = ''
                this.temp.reason = ''
                this.temp.longterm_action = ''
                this.temp.remark = ''
                if (this.temp.deal_date) {
                  this.temp.deal_date = null
                }
                this.temp.deal_time = null
                console.log('that', that)
                that.$refs.dataForm.clearValidate()
              } else {
                this.closePage()
              }
            }, r => {
              this.$notify({
                title: '错误',
                message: '出现未知错误请联系管理员',
                type: 'error',
                duration: 2000
              })
              this.submitLoading = false
            })
          }
        })
      }
    }
  }
</script>
