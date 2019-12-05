<template>
    <div class="app-container">
      <div style="float: left ; margin-right: 10px;width: 67%;">


          <div style="padding: 10px 10px;">
            <el-card style="width: 115%">
              <el-tabs  :tab-position="tabPosition" style="height: 250px;overflow-y:auto;overflow-x:hidden">

                <el-tab-pane  :label="'我提交的 ('+ dataList1.length +')'" >
                  <el-table :border="true"   :data="dataList1" @row-dblclick="submitClick" height="186"
                            style="width: 100%;overflow-x:hidden;margin-top: 0px" >


                  <el-table-column  class="width150" label="ID" width="120">
                    <template slot-scope="scope" :onclick="dia">
                      <span>{{ scope.row.bugcode }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="widthdesc" label="摘要" width="120" :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.questionDes }}</span>
                    </template>
                  </el-table-column>


                  <el-table-column class="width75" label="类型"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.bugtypeName }}</span>
                    </template>
                  </el-table-column>


                  <el-table-column class="width75" label="平台"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.systemName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width75" label="模块"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.moudleName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="状态"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.currentStateName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="处理人" :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.currentPersonName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="持续天数"  :show-overflow-tooltip="true" >
                    <template slot-scope="scope">
                      <span>{{ scope.row.submitTime | datefiler1}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="计划日期"   :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.planResolutionTime }}</span>
                    </template>
                  </el-table-column>

                  <!--<el-table-column label=""  width="50%" :show-overflow-tooltip="true"></el-table-column>-->
                </el-table>

                </el-tab-pane>

                <el-tab-pane :label="'我处理的 ('+ dataList2.length +')'">
                  <el-table border="true"  :data="dataList2" style="width: 100%;overflow-x:hidden;margin-top: 0px" @row-dblclick="submitClick" height="186">
                  <el-table-column class="width150" label="ID"   width="120">
                    <template slot-scope="scope">
                      <span>{{ scope.row.bugcode }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width150" label="摘要"  width="120" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.questionDes }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width75" label="类型"  :show-overflow-tooltip="true" width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row.bugtypeName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width75" label="平台" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.systemName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width75" label="模块" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.moudleName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.currentStateName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="处理人"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.currentPersonName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="持续天数" width="90" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.roamTime | datefiler1 }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class="width80" label="计划日期" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span>{{ scope.row.planResolutionTime }}</span>
                    </template>
                  </el-table-column>

                  <!--<el-table-column label=""  width="50%" :show-overflow-tooltip="true"></el-table-column>-->
                </el-table></el-tab-pane>
              </el-tabs>
            </el-card>

          </div>
          <!--<div style="padding: 20px 20px;">-->
          <!--</div>-->
          <div style="padding: 10px 10px;">
         <el-card style="width: 115%">
           <el-tabs  :tab-position="tabPosition2" style="height: 300px;">
             <el-tab-pane label="问题管理 (0)" >
               <el-table >
                 <el-table-column label="平台" ></el-table-column>

                 <el-table-column label="项目名称" ></el-table-column>

                 <el-table-column label="项目阶段" ></el-table-column>

                 <el-table-column label="计划交付日期" ></el-table-column>

                 <el-table-column label="备用字段" ></el-table-column>
               </el-table>
             </el-tab-pane>

             <el-tab-pane label="问题预警 (0)">
               <el-table >
                 <el-table-column label="平台" ></el-table-column>

                 <el-table-column label="项目名称" ></el-table-column>

                 <el-table-column label="项目阶段" ></el-table-column>

                 <el-table-column label="计划交付日期" ></el-table-column>

                 <el-table-column label="备用字段" ></el-table-column>
               </el-table>
             </el-tab-pane>
           </el-tabs>
         </el-card>
       </div>
     </div>
      <div >
        <div style="position:absolute;width: 20%; height: 10%;z-index:100;right:2%;top:110px;">
          <el-form>
            <el-card>
              <el-form-item label="日期">
                <Calendar
                  :sundayStart="true"
                  v-on:choseDay="clickDay"
                  v-on:changeMonth="changeDate"
                ></Calendar>
              </el-form-item>
            </el-card>
          </el-form>
        </div>
      </div>
      <customdialog ref="myChild"
                    :fileList = 'fileList'
                    :QuestionDealList = 'QuestionDealList'
                    :getIssues = 'getIssues'
                    v-on:childByValue="childByValue"></customdialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Calendar from 'vue-calendar-component'
import user from '@/store/modules/user'
// import { initPage } from '@/utils/index'
import { bugDetailQuery, bugDetailQuery2 } from '@/api/bugDetail'
import { troubleshootQuery } from '@/api/troubleshoot'
import customdialog from '../customDialog/CustomDialog'
export default {
  data() {
    return {
      isShow: false,
      itemData: [],
      fileList: [],
      QuestionDealList: [],
      userRoles: [],
      tabPosition: 'top',
      tabPosition2: 'left',
      date: '2017-09-11',
      dataList1: [],
      dataList2: [],
      minDate: '2000-09-11',
      maxDate: '2020-09-11',
      showDatePicker: false,
      selectedDate: '点击选择日期',
      tableData3: [{
        date: '2016-05-03qqqqq',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      filters: {
        column: {
          create_start_date: '',
          create_end_date: ''
        }
      }
    }
  },
  filters: {
    gsfiters: function(value) {
      if (value !== undefined && value.length > 10) {
        value = value.slice(0, 10) + '...'
      }
      return value
    },
    datefiler1: function(value) {
      var r
      if (value !== undefined && value.length > 0) {
        var now = new Date().getTime()
        var end = new Date(value).getTime()
        console.log(now)
        console.log(end)
        console.log(now - end)
        r = (now - end) / 86400000
        r = r.toFixed(1)
      } else {
        r = '0'
      }

      return r
    }
  },
  created() {
    // initPage(this.beans, dictionaryQuery)
    var userRoles = {}
    user.state.roles.forEach(function(value, index) {
      userRoles[value] = true
    })
    this.userRoles = userRoles
    console.log('---->', this.userRoles)
    this.getMySubmit()
    this.getMyDeal()
  },
  components: {
    Calendar,
    customdialog
  },
  name: 'dashboard',
  methods: {
    getIssues() {
      this.getMySubmit()
      this.getMyDeal()
    },
    submitClick(row, event) {
      var that = this
      that.fileList = []
      var seachItem = {
        page: {},
        items: { 'bugcode_eq': row.bugcode }
      }
      bugDetailQuery(seachItem).then(r => {
        that.itemData = r.data.list[0]
        that.$refs.myChild.doubleclick(that.itemData)
        that.isShow = true
        that.$refs.myChild.propsDialogFormVisible(that.isShow)
        // 查询追后一次流转纪录
        var jsons = {}
        jsons.items = {}
        jsons.page = { nowPage: -1, nowcont: 1 }
        jsons.items.bug_code_eq = that.itemData.bugcode
        troubleshootQuery(jsons).then(r => {
          that.QuestionDealList = r.data.list
        })
      })
    },
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      this.isShow = childValue
    },
    getMySubmit() {
      var seach = {}
      seach.page = {}
      seach.items = {}
      // if (!this.userRoles['admin']) {
      seach.items.createUserId_eq = user.state.usercode
      seach.items.currentState_neq = 'wt_uncommit'
      //  }
      bugDetailQuery(seach).then(r => {
        this.dataList1 = r.data.list
      })
    },
    getMyDeal() {
      var seach = {}
      seach.page = {}
      seach.items = {}
      //  if (!this.userRoles['admin']) {
      seach.items.currentPerson_eq = user.state.usercode
      seach.items.a_or = 1
      seach.items.itResponsible_eq = user.state.usercode
      //  }
      // seach.items.currentState_eq = 'wt_commit'
      bugDetailQuery2(seach).then(r => {
        console.log('dataList2----->', r)
        this.dataList2 = r.data.list
      })
    },
    clickDay(data) {
      console.log(data) // 选中某天
    },
    changeDate(data) {
      console.log(data) // 左右点击切换月份
    },
    clickToday(data) {
      console.log(data) // 跳到了本月
    },
    getDictionary(index) {
      this.dictionaryLoading = true
      this.beans.searchCurrent(index)
      console.log('thisBean--->', this.beans)
      this.dictionaryLoading = false
    }
  },
  computed: {
    ...mapGetters([
      'usercode',
      'roles'
    ])
  }
}

</script>

<style>
  .widthdesc{
    width: 200px;
  }

  </style>


