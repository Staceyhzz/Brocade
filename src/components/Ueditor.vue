<template>
  <div>
    <!--下面通过传递进来的id完成初始化-->
    <script :id="randomId"  type="text/plain"></script>
  </div>
</template>

<script>

  //主体文件引入
  import '../../static/ueditor/ueditor.config.js'
  import '../../static/ueditor/ueditor.all.js'
  import '../../static/ueditor/lang/zh-cn/zh-cn.js'
  //主体文件引入


  export default {
    props: {
      //配置可以传递进来
      ueditorConfig:{},
      value: String,
      index: Number,
    },
    data () {
      return {
        //每个编辑器生成不同的id,以防止冲突
        randomId: 'editor_' + (Math.random() * 100000000000000000),
        //编辑器实例
        instance: null,
        //阻止重复双向
        key: true,
      };
    },
    watch: {
      value (val) {
        //拟双向
        if(this.key) {
          this.instance.setContent(this.value)
          this.key = false
          console.log(this.key)
        }
      },
    },
    //此时--el挂载到实例上去了,可以初始化对应的编辑器了
    mounted () {
      this.initEditor()
    },
    beforeDestroy () {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.instance !== null && this.instance.destroy) {
        this.instance.destroy();
      }
    },
    methods: {
      initEditor () {
        //dom元素已经挂载上去了
          this.$nextTick(() => {
            this.instance = UE.getEditor(this.randomId, this.ueditorConfig)
            // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            // editorReady (instance) {
            //     instance.setContent(this.formValidate.content)

            //     instance.addListener('contentChange', () => {
            //         this.formValidate.content = instance.getContent()
            //     })
            // },
            this.instance.addListener('ready', () => {
              // this.$emit('ready', this.instance);
              // 初始化赋值内容
              if(this.value.length > 0) {
                this.key = false
              }
              this.instance.setContent(this.value)
              console.log(123)
            });
            // this.instance.setContent(this.value)
            console.log(this.index)
            console.log(this.value + '--------------')
            //提交内容
            this.instance.addListener('contentChange', () => {
              console.log(this.instance.getContent())
              this.$emit('setUedContent', this.instance.getContent(), this.index)
            })
          });
        }
    }
  };
</script>