<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <!-- <upload-image color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></upload-image> -->
      <edit-form @on-change="changeItem"></edit-form>
    </div>
  </div>
</template>

<script>
// import uploadImage from './components/UploadImage';
import editForm from './components/EditForm';
import plugins from './plugins';
import toolbar from './toolbar';

export default {
  name: 'tinymce',
  components: { editForm },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    };
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        language: 'zh',
        selector: `#${this.tinymceId}`,
        font_formats: 'arial=arial,helvetica,sans-serif;宋体=宋体,SimSun;楷体=楷体,楷体_GB2312,SimKai;微软雅黑=微软雅黑,Microsoft YaHei;黑体=黑体,SimHei;隶书=隶书,SimLi',
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 36px',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('on-change', editor.getContent());
          });
          console.log('//////////////////////');
          //绑定点击函数
          let iframe = document.getElementsByTagName("iframe")[0].contentWindow; 
          let sde = iframe.document.getElementById("tinymce");
          $(sde).on('click', '.sed-form-ctrl', function() {
            console.log($(this));
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state;
          });
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
        console.log(123);
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    changeItem(data) {
      const _this = this;
      // window.tinymce.get(_this.tinymceId).insertContent(`<span class="sed-form-ctrl" data-form-ctrl-type="${data.type}" data-sde-ctrl-id="${data.id}" data-ctrl-afterContent="${data.name}" contenteditable='false'>&nbsp;1111</span>`);

      let str = '';
      for(let i=0; i<data.list.length; i++) {
        str += `<label><input type='radio' value='${data.list[i].value}'>${data.list[i].label}</label>`;
      }

      window.tinymce.get(_this.tinymceId).insertContent(`<span class="sed-form-ctrl" data-form-ctrl-type="${data.type}" data-sde-ctrl-id="${data.id}" contenteditable='false'>阿斯达${str}</span>`);

      // window.tinymce.get(_this.tinymceId).insertContent(`<input class="sed-form-ctrl" data-form-ctrl-type="${data.type}" data-sde-ctrl-id="${data.id}" disabled value='${data.name}'></input>`);
    }
    // imageSuccessCBK(arr) {
    //   const _this = this;
    //   arr.forEach(v => {
    //     window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v}" >`);
    //   });
    // }
  },
  destroyed() {
    this.destroyTinymce();
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
