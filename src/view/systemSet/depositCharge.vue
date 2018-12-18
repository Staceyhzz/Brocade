/**
* 预收款项目管理
*/

<template>
  <div class="container-box">
    <div class="container-header">
    <h2>{{$t('layoutNav.depositChargeManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {resizeRemark},
    data () {
      return {
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 50
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            key: 'status',
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              },text)
            }
          },
          {
            title: this.$t('depositCharge.colTit1'),
            width: 80,
            key: 'hospitalList'
          },
          {
            title: this.$t('labelPublic.price'),
            width: 60,
            align: 'right',
            key: 'price',
            render: (h, params) => {
              if(params.row.price || params.row.price === 0) {
                return h('span', params.row.price.toFixed(2))
              }
            }
          },
          {
            title: this.$t('depositCharge.colTit2'),
            width: 80,
            key: 'scopelimit',
            render: (h, params) => {
              if(params.row.scopelimit === 1) {
                return h('span', this.$t('depositCharge.tit3'));
              }
              if(params.row.scopelimit === 2) {
                return h('span', this.$t('depositCharge.tit1') + params.row.chargeCategoryList);
              }
              if(params.row.scopelimit === 3) {
                return h('span', this.$t('depositCharge.tit2') + params.row.chargeList);
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            render: (h, params) => {
              if(params.row.remark) {
                return h(resizeRemark, {
                  props: {
                    remark: params.row.remark
                  }
                });
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                ])
            }
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
        if(val === 'depositCharge') {
          this.getList();
        }
      },
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        var _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/depositCharge/list.jhtml',
          success: function(res){
            const _data = res.data.content.map(item => {
              let obj = {
                ...item
              };
              obj.hospitalList = obj.hospitalList.map(item => item.name).join('、') || '';
              if(obj.scopelimit === 1) {
                obj.chargeCategoryList = '';
                obj.chargeList = '';
              }
              if(obj.scopelimit === 2) {
                obj.chargeCategoryList = obj.chargeCategoryList.map(item => item.name).join('、') || '';
                obj.chargeList = '';
              }
              if(obj.scopelimit === 3) {
                obj.chargeCategoryList = '';
                obj.chargeList = obj.chargeList.map(item => item.name).join('、') || '';
              }
              return obj;
            }) || [];
            console.log(_data)
            const _col = _vm.tableCount(_data, ['price']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'depositCharge') {
              _vm.data = _data;
            } else {
              const props = ['chargeList', 'remark', 'chargeCategoryList', 'name'];
              _vm.requestList(_data, props).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      toEdit (data) {
        let breadText = ''
        let id = ''
        if(typeof data == 'object') {
          breadText = 'depositCharge.modalTit2';
          id = data.id
        } else {
          breadText = 'depositCharge.modalTit1';
          id = data
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/depositCharge',
            text: 'layoutNav.depositChargeManage'
          },
          {
            url: '/depositChargeEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/depositChargeEdit',
          query: {
            id: id
          }
        })
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('depositCharge.msg1')}</p>
          <p>${_vm.$t('depositCharge.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/depositCharge/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'depositCharge') {
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
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
    }
  }
</script>