/** 
 * 积分兑换券页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerPointCoupon')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('pointAdd.label1')">
          <span>{{content}}</span>
        </Form-item>
        <Form-item :label="$t('pointCoupon.label1')" prop="amount" style="width:400px;" required>
          <cmptInputNumber :max="content" :min="0" v-model="formValidate.amount" style="width:300px;" @on-change='setPrice'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('pointCoupon.label2')" prop="couponName" required class='treatAddObj'>
          <Input v-model="formValidate.couponName" readonly icon="ios-search" :placeholder="$t('pointCoupon.valid3')" @on-focus="show" style="width:300px"></Input>
        </Form-item>
        <Form-item :label="$t('pointCoupon.label3')" prop="couponAmount" style="width:400px;" required>
          <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.couponAmount" style="width:300px;" @on-change='setCoupon'></cmptInputNumber>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('pointCoupon.valid3')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePoint = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('pointCoupon.valid1')));
        } else {
          callback();
        }
      };
      const validatePoint1 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('pointCoupon.valid2')));
        } else {
          callback();
        }
      };
      const validateCou = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('pointCoupon.valid3')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        content: 0,
        formValidate: {
          customerId: '',
          amount: 0,
          couponCategoryId: '',
          couponName: '',
          couponAmount: 0,
        },
        modal: false,
        col: [
          {
            title: this.$t('labelPublic.bh'),
            width: 70,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 80,
            key: 'name'
          },
          {
            title: this.$t('pointCoupon.colTit'),
            width: 90,
            key: 'hospitalList',
            render: (h, params) => {
              const str = params.row.hospitalList.map(item => item.name).join('、');
              return h('span', str);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark'
          }
        ],
        data: [],
        ruleForm: {
          amount: [{
            validator: validatePoint,
            trigger: 'change'
          }],
          couponAmount: [{
            validator: validatePoint1,
            trigger: 'change'
          }],
          couponName: [{
            validator: validateCou,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/pointCoupon.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.content = Number.isFinite(res.data.content)
              ? parseFloat(res.data.content.toFixed(2))
              : 0;
						_vm.$store.dispatch('setPageLoading', 1)
						_vm.getList();
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取券列表
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/couponCategoryList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setPrice(val) {
        this.$nextTick(() => {
            this.formValidate.amount = parseFloat(val.toFixed(0));
        });
      },
      setCoupon(val) {
        this.$nextTick(() => {
            this.formValidate.couponAmount = parseFloat(val.toFixed(0));
        });
      },
      show() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.couponCategoryId = data.id;
        this.formValidate.couponName = data.name;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addPointCoupon.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  const breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/customer',
                      text: 'layoutNav.customerManage'
                    },
                    {
                      url: '/indexAccount',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexAccount');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
