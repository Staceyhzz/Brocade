/**
 * 渠道微信引导
 */

<template>
  <div class="container-box user distributor-help" ref="containerBox">
    <div class="container-header">
      <h2>渠道微信引导</h2>
    </div>
    <div class="container-body">
      <h3>请您登陆微信公众号后台-菜单设置，将下列URL填写到菜单里即可。</h3>
      <p class="url"><span>首页：</span>{{homeUrl}}</p>
      <p class="url"><span>佣金：</span>{{moneyUrl}}</p>
      <p class="url"><span>虚拟币：</span>{{codeUrl}}</p>
      <p class="url"><span>支付码：</span>{{payUrl}}</p>
      <p class="url"><span>推荐码：</span>{{cusUrl}}</p>
      <Button type="primary" class="btn" @click="edit">修改url</Button>
      <h3>微信后台菜单配置教程</h3>
      <img :src="help" alt="" class="help">
    </div>
    <Modal
      title="修改url"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
        <Form ref="formEdit" :model="formEdit" :rules="ruleForm" :label-width="100" label-position="right" @submit.native.prevent>
          <Form-item label="url前缀" prop="url" required>
            <Input v-model.trim="formEdit.url" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入url'));
        }
        const reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(value)) {
          callback(new Error('请输入正确url'));
        }
        callback();
      };
      return {
        help: require('assets/img/weixin_help.png'),
        homeUrl: '',
        moneyUrl: '',
        codeUrl: '',
        payUrl: '',
        cusUrl: '',

        modal: false,
        loading: true,
        formEdit: {
          url: ''
        },
        ruleForm: {
          url: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取分页
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/distributionSet/getOptinUrl.jhtml',
          success: function(res){
            _vm.homeUrl = res.data.content.distributionHomeUrl || '';
            _vm.moneyUrl = res.data.content.distributionCommissionDetailsUrl || '';
            _vm.cusUrl = res.data.content.distributionReferralcodeUrl || '';
            _vm.codeUrl = res.data.content.distributionVirtualcurrencyDetailsUrl || '';
            _vm.payUrl = res.data.content.distributionPaymentcodeUrl || '';
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      edit() {
        this.$refs.formEdit.resetFields();
        this.modal = true;
      },
      ok () {
        let _vm = this;
        _vm.$refs.formEdit.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionSet/updateOptionUrl.jhtml',
              data: _vm.formEdit,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList();
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  })
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .distributor-help {
    min-width: 1320px;
    h3 {
      font-size: 16px;
      font-weight: normal;
      line-height: 40px;
    }
    .help {
      display: block;
      width: 1234px;
      height: 684px;
    }
    .url {
      font-size: 14px;
      line-height: 30px;
      span {
        display: inline-block;
        width: 60px;
      }
    }
    .btn {
      margin: 20px 0;
      min-width: 100px;
    }
  }
</style>

