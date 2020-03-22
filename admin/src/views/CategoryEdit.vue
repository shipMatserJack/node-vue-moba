<template>
  <div class="categoryEdit">
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option 
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
     model: {},
     parents: []
    }
  },

  created() {
    this.fetchParents()
    this.id && this.fetch()
  },

  methods: {
    async save() {
      let res
      if(this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      }else {
        res = await this.$http.post('rest/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'  
      })
    },

    /**
     * @desc 根据ID获取分类详情
     */
    async fetch() {
      const { data } = await this.$http.get(`rest/categories/${this.id}`)
      this.model = data
    },

    /**
     * @desc 获取分类列表
     */
    async fetchParents() {
      const { data } = await this.$http.get(`rest/categories`)
      this.parents = data
    }
  }
}
</script>>
