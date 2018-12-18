<template>
  <div id='editorImage'>
    <Button type="primary" icon="ios-cloud-upload" @click='upLoad'>图片上传</Button>
    <Modal v-model="modal" title="图片上传" @on-ok="ok" class-name="vertical-center-modal">
      <div class="editor-upload-list" v-for="(item, index) in showList" :key='index'>
        <img :src="item">
        <div class="editor-upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </div>
      <Upload ref="upload" :before-upload="handleBeforeUpload" type="drag" action="//" style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'editorImage',
    data() {
      return {
        modal: false,
        showList: [],
      };
    },
    methods: {
      upLoad() {
        this.modal = true;
      },
      ok() {
        this.$emit('successCBK', this.showList);
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      handleBeforeUpload(data) {
        this.saveFile(data);
        return false;
      },
      saveFile(data) {
        let param = new FormData();
        param.append('file', data);
        this.$axios.upload({
          url: 'guard-webManager/upload/richTextUpload.jhtml',
          data: param,
        }).then((res) => {
          this.showList.push(res.url);
          this.$Notice.success({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('publicSet.noticeSuccess')
          });
        });
      },
      handleRemove(index) {
        this.showList.splice(index, 1);
      },
    }
  };

</script>

<style scoped>
  .editor-upload-list {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin: 0 10px 20px;
  }

  .editor-upload-list img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .editor-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .editor-upload-list:hover .editor-upload-list-cover {
    display: block;
  }

  .editor-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

</style>
