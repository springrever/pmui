<template>
  <div>
<el-dialog
  title="项目模板"
  :visible.sync="dialogVisible"
  width="30%"
>
  <el-form ref="form"  :rules="rules" :model="form" label-width="80px" size="mini">
    <el-form-item v-if ="form.template_id == null " label="模板编号" prop="user_name">
      <el-input v-model="form.template_code"></el-input>
    </el-form-item>
    <el-form-item v-if ="form.template_id != null " label="模板编号" prop="user_name">
      <el-input disabled="true" v-model="form.template_code"></el-input>
    </el-form-item>
    <el-form-item label="模板名称" prop="user_age">
      <el-input v-model.number="form.template_name"></el-input>
    </el-form-item>
    <el-form-item prop="remarks" label="备注:">
      <el-input v-model="form.template_instructions"
                :disabled="IFNEW"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="submit()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import { insertTemplate } from '@/api/template'
export default {
  name: 'projectVueDialog',
  props: ['restData'],
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        template_code: [
          { required: true, message: '请输入模板编号', trigger: 'blur' }
        ],
        template_name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog(d) {
      this.dialogVisible = true
      if (d) {
        this.form = Object.assign({}, d)
        this.title = '修改'
      } else {
        this.title = '新增'
      }
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          insertTemplate({ model: this.form }).then(r => {
            this.$notify({
              type: r.data.status,
              title: '提示',
              message: r.data.info,
              duration: 1000
            })
            this.dialogVisible = false
            this.$props.restData(1)
          })
        }
      })
    }
  }
}
</script>

