<template>
  <div class="categoryEdit">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option 
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="model.body"></el-input>
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
     categories: []
    }
  },

  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },

  methods: {
    async save() {
      let res
      if(this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      }else {
        res = await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'  
      })
    },

    /**
     * @desc 根据ID获取分类详情
     */
    async fetch() {
      const { data } = await this.$http.get(`rest/articles/${this.id}`)
      this.model = data
    },

    /**
     * @desc 获取分类列表
     */
    async fetchCategories() {
      const { data } = await this.$http.get(`rest/categories`)
      this.categories = data
    }
  }
}
</script>>
