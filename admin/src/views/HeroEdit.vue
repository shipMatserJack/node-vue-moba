<template>
  <div class="heroEdit">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
       <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple >
          <el-option v-for="item of categories" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>
     <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple >
          <el-option v-for="item of items" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple >
          <el-option v-for="item of items" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="model.teamTips"></el-input>
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
      default: ""
    }
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name: "",
        title: "",
        avatar: "",
        categories: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
        partners: []
      }
    };
  },

  created() {
    console.log(this.id);
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },

  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    /**
     * @desc 根据ID获取分类详情
     */
    async fetch() {
      const { data } = await this.$http.get(`rest/heros/${this.id}`);
      // **先将this.modle赋值给空对象，再将data值加入
      this.model = Object.assign({}, this.model, data); // this.modle = {...this.model, ...data}
    },

    /**
     * 获取类型
     */
    async fetchCategories() {
      const { data } = await this.$http.get(`rest/categories`);
      this.categories = data;
    },

    async fetchItems() {
      const { data } = await this.$http.get(`rest/items`);
      this.items = data;
    },

    async beforeAvatarUpload() {},

    /**
     * @desc
     */
    async afterUpload(res) {
      console.log(res);
      this.model.avatar = res.url;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
