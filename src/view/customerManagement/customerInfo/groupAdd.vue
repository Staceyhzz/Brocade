/** 
 * 添加顾客分组页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerGroup')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data" @on-selection-change='set'></Table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        saveLoad: false,
        cusName: '',
        formValidate: {
          customerId: '',
          groupList: '',
        },
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('groupAdd.colTit'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          }
        ],
        data: []
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'groupAdd') {
          this.getId();
        }
      },
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/groupAdd.jhtml',
          data: {
            customerId: _vm.formValidate.customerId
          },
          success: function (res) {
            const _data = res.data.content.GroupList || [];
            if(_vm.langRouterKey !== 'groupAdd') {
              console.log(_data)
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['name', 'remark']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      set(data) {
        this.formValidate.groupList = data.map(item => item.id).join(',');
      },
      save() {
        let _vm = this;
        _vm.saveLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/addGroup.jhtml',
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
                  url: '/customerMsg',
                  text: _vm.cusName
                }
              ];
              _vm.$store.dispatch('setBreadData', breadData);
              if(_vm.langRouterKey !== 'groupAdd') {
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.content
                });
                _vm.$router.push('/customerMsg');
              } else {
                _vm.getLang.word(res.data.content, (data) => {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: data[0].dst
                  });
                  _vm.$router.push('/customerMsg');
                });
              }
            } else {
              if(_vm.langRouterKey !== 'groupAdd') {
                _vm.$Notice.error({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.desc
                });
              } else {
                _vm.getLang.word(res.data.desc, (data) => {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: data[0].dst
                  });
                });
              }
              _vm.saveLoad = false
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
