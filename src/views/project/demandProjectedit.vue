<template>
  <div class="app-container">
    <el-row >
      <el-col :span="12" style="padding-right: 15px;">
        <el-card :body-style="{'height': '230px'}" class="card1"  shadow="hover">
          <el-row>
            <el-col :span="8">
            <div class="title1">计划与进度</div>
            </el-col>
            <el-col :span="16">
              <div class="title2">
                <img class="icon2"  title="计划变更" src="../../assets/img/edit.png" />
              </div>
            </el-col>
          </el-row>
          <hr color="#EFEFEF" />
          <el-row>
            <el-col :span="12">
              <div class="div2">
                <el-row>
                  <el-col span="24">
                    当前里程碑
                  </el-col>
                  <el-col span="24">
                    <div style="margin-top: 8px;color: #FF6666;font-size: 20px">{{currenLandmark}}</div>
                  </el-col>
                </el-row>
                <hr color="B7B7B7"/>
                <el-row>
                  <el-col span="12">
                    <el-row>
                      <el-col span="24">
                        当前状态
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px">
                        <span style="background-color: #FF6666;color: white;font-size: 20px">计划{{projectPlanStatus}}</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col span="12">
                    <el-row>
                      <el-col span="11">
                        <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                      </el-col>
                      <el-col span="13">
                        <el-row>
                          <el-col span="24">
                            剩余时间
                          </el-col>
                          <el-col span="24">
                              <div style="text-align: center;margin-top: 5px;background-color: #FF6666;color: white;font-size: 20px">{{remainTime}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12" >
              <div style="margin-left: 10px" class="div2">
                <el-row>
                  <el-col span="7">
                    <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                  </el-col>
                  <el-col span="17">
                    <el-row>
                      <el-col span="24">
                        当前里程预计完成时间
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px;color: #FF6666;font-size: 20px">
                          {{landmarkEndtime}}
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 8px">
                  <el-col span="7">
                    <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                  </el-col>
                  <el-col span="17">
                    <el-row>
                      <el-col span="24">
                        项目预计完成时间
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px;color: #FF6666;font-size: 20px">
                          {{projectEndtime}}
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>

            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
      <el-card :body-style="{'height': '230px'}" class="card1" shadow="hover">
        <el-row >
          <el-col :span="8">
            <div class="title1_color_bulue">项目组成员</div>
          </el-col>
          <el-col :span="16">
            <div class="title2">
              <img class="icon2"  title="计划变更" src="../../assets/img/edit.png" />
            </div>
          </el-col>
        </el-row>
        <hr color="#EFEFEF" />
        <el-row>
          <el-col :span="5">
            <div class="div2">
              <el-row>
                <el-col span="24">
                  <div class="div3">15</div>
                </el-col>
                <el-col span="24">
                  <div style="margin-top: 15px;text-align: center">项目人数</div>
                </el-col>
              </el-row>

            </div>

          </el-col>
          <el-col :span="13">
            <div class="div2" style="margin-left: 8px">
              <el-row>
                <el-col span="9">
                  <el-row>
                    <el-col span="24">
                      <div class="div3">5</div>
                    </el-col>
                    <el-col span="24">
                      <el-row>
                        <el-col span="24">
                          <div style="margin-top: 15px;text-align: center">累计人天投入</div>
                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                </el-col>

                <el-col span="15">
                  <div  style="margin-top: 2%;margin-left: 10px">
                    <el-row>
                      <el-col span="24">
                        A已投入人天
                      </el-col>
                      <el-col style="margin-top: 3%" span="24">
                        <div style="color: white;background-color: #3798E3;text-align: center;font-size: 20px;width: 50%">0.00</div>
                      </el-col>
                      <el-col span="24" style="margin-top: 9%">
                        B已投入人天
                      </el-col>
                      <el-col span="24" style="margin-top: 3%">
                        <div style="color: white;background-color: #3798E3;text-align: center;font-size: 20px;width: 50%">0.00</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>

            </div>

          </el-col>
          <el-col :span="6">
            <div class="div2" style="margin-left: 8px">
              <el-row>
                <el-col span="24">
                  <div class="div3">0.00</div>
                </el-col>
                <el-col span="24">
                  <div style="margin-top: 15px;text-align: center">本月投入人天</div>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>
      </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="12" style="padding-right: 15px;">
        <el-card :body-style="{'height': '230px'}" class="card1"  shadow="hover">
          <el-row>
            <el-col :span="8">
              <div class="title1" style="color: #27D8B7">项目预算</div>
            </el-col>
            <el-col :span="16">
              <div class="title2">
                <img class="icon2"  title="计划变更" src="../../assets/img/edit.png" />
              </div>
            </el-col>
          </el-row>
          <hr color="#EFEFEF" />
          <el-row>
            <el-col :span="12">
              <div class="div2">
                <el-row>
                  <el-col span="24">
                    当前里程碑
                  </el-col>
                  <el-col span="24">
                    <div style="margin-top: 8px;color: #FF6666;font-size: 20px">需求调研</div>
                  </el-col>
                </el-row>
                <hr color="B7B7B7"/>
                <el-row>
                  <el-col span="12">
                    <el-row>
                      <el-col span="24">
                        当前状态
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px">
                          <span style="background-color: #FF6666;color: white;font-size: 20px">项目进行中</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col span="12">
                    <el-row>
                      <el-col span="11">
                        <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                      </el-col>
                      <el-col span="13">
                        <el-row>
                          <el-col span="24">
                            剩余时间
                          </el-col>
                          <el-col span="24">
                            <div style="text-align: center;margin-top: 5px;background-color: #FF6666;color: white;font-size: 20px">3</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>

                  </el-col>
                </el-row>

              </div>

            </el-col>
            <el-col :span="12" >
              <div style="margin-left: 10px" class="div2">
                <el-row>
                  <el-col span="7">
                    <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                  </el-col>
                  <el-col span="17">
                    <el-row>
                      <el-col span="24">
                        当前里程预计完成时间
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px;color: #FF6666;font-size: 20px">
                          2018-09-24
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 8px">
                  <el-col span="7">
                    <img  src="../../assets/img/yibiaopan_red.png" class="icon1"/>
                  </el-col>
                  <el-col span="17">
                    <el-row>
                      <el-col span="24">
                        项目预计完成时间
                      </el-col>
                      <el-col span="24">
                        <div style="margin-top: 5px;color: #FF6666;font-size: 20px">
                          2018-09-24
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>

            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import { milestoneList } from '@/api/projectBoard'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElRow },
    name: 'demandProjectedit',
    mounted() {
      /* */
    },
    data() {
      return {
        submitLoading: false,
        currenLandmark: '上线确认',
        projectPlanStatus: '未开始',
        remainTime: '0',
        projectEndtime: '2018-09-24',
        landmarkEndtime: '2018-09-24'
      }
    },
    activated: function() {
      var that = this
      if (that.$store.getters.onProject === 'null') {
        that.$store.commit('SET_SHOWPROJECT', false)
        that.$alert('当前未选择项目，请先到项目列表选择项目', '警告', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning',
          callback: action => {
            that.$router.replace({ name: 'demendProjectIndex', params: {
              type: 'demandProjectedit',
              from: 'demandProjectedit'
            }})
          }
        })
      } else {
        this.getProjectInfo()
      }
    },
    methods: {
      getProjectInfo() {
        var that = this
        milestoneList(that.$store.getters.onProject.project_id).then(function(r) {
          console.log('xoxo', r)
        })
      },
      changeEmergencyColor() {
        return '#FF4500'
      },
      submitData() {
        this.submitLoading = true
      },
      editData() {
        this.submitLoading = true
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
  .icon1 {
    width: 50px;
    height: 50px;
  }
  .icon1:hover{

  }
  .icon2 {
    width: 30px;
    height: 30px;
  }
  .icon2:hover{
    width: 32px;
    height: 32px;
  }
  .title1{
    color: #FF6666;
    font-weight: bold;
    height: 1.6rem;
  }
  .title1_color_bulue{
    color: #3798E3;
    font-weight: bold;
    height: 1.6rem;
  }
  .title2{
    margin-top: -10px;
    text-align: right;

  }
  .div2{
    color: #8A9291;
    margin:10px auto;
    padding: 10px;
    font-size: 0.75rem;
    background-color: #F5F5F5;
  }
  .div3{
    margin:0 auto;
    height: 80px;
    width: 80px;
    padding-top: 32px;
    text-align: center;
    color: #3798E3;
    font-weight: bold;
    border-radius: 100px;
    border: 2px solid #3798E3;
  }
  .div3:hover{
    font-size: 20px;
    padding-top: 29px;
  }
  .card-container{
    height: 35%;
  }
</style>
