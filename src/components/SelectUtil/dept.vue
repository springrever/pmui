<template>
  <div>
    <el-cascader
      style="width: 350px"
      :disabled = "disabledFlag"
      :clearable = "true"
      :options="depts"
       v-model="deptValueArray"
      :props="props"
      :show-all-levels="false"
      @change="handleChange"
      change-on-select="true">
    </el-cascader>
  </div>
</template>
<script>
  import { findDepts } from '@/utils/index'
  import { finddeptnode } from '@/api/dept'
  export default {
    name: 'HelloWorld',
    created: function() {
      this.getDepts()
    },
    watch: {
      value: {
        handler(newVal, oldVal) {
          this.deptValueArray = findDepts(this.depts, newVal[0])
        },
        deep: true
      }
    },
    computed: {
    },
    mounted: function() {
    },
    props: {
      value: {
        default: []
      }
    },
    methods: {
      handleChange() {
        this.$emit('input', this.deptValueArray)
      },
      getDepts() {
        finddeptnode().then(response => {
          this.depts = response.data.list
        })
      },
      valueUpdate(row) {
        return findDepts(this.depts, row.parentID)
      }
    },
    data() {
      return {
        disabledFlag: false,
        depts: [],
        model: '',
        deptValueArray: [],
        props: { label: 'deptName', value: 'deptId' }
      }
    }
  }
</script>
