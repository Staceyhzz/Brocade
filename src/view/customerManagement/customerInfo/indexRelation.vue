/** 
 * 客户间关系页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexRelation.tit1')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexRelation.tit2')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
    components: {
      resizeCus
    },
    data() {
      return {
        cusName: '',
        cusId: '',
        data: [],
        data1: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('relationAdd.label1'),
            key: 'relationName'
          },
          {
            title: this.$t('indexRelation.colTit1'),
            render: (h, params) => {
              const name = params.row.customerid === this.cusId * 1
                ? params.row.customerName2
                : params.row.customerName;
              const id = params.row.customerid === this.cusId * 1
                ? params.row.customerid2
                : params.row.customerid;
              return h(resizeCus, {
                props: {
                  name: name,
                  id: id,
                  idKey: false,
                  openKey: false,
                },
                on: {
                  'click': () => {
                    this.toLook(name, id);
                  }
                }
              });
            }
          },
          {
            title: this.$t('indexRelation.colTit2'),
            key: 'createtime'
          },
          {
            title: this.$t('indexRelation.colTit3'),
            render: (h, params) => {
              const str = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', str);
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
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
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        col1: [
          {
            title: this.$t('indexRelation.colTit4'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.xm'),
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: '',
                  idKey: false,
                  openKey: false,
                },
                on: {
                  'click': () => {
                    this.toLook(params.row.name, params.row.customerid);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.gkbh'),
            key: 'customerid'
          },
          {
            title: this.$t('labelPublic.gkxm'),
            key: 'customerName'
          }
        ],
      }
    },
    computed: {
      otherTabUrl() {
        return this.$store.getters.getOpenOtherTabUrl;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexRelation') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.cusId = sessionStorage.getItem('cusId');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getRelation.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						const _data = res.data.content.relationList || [];
						const _obj = res.data.content.promoter || {};
            if(_obj.id) {
              _vm.data1 = [_obj];
            }
            if(_vm.langRouterKey !== 'indexRelation') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['relationName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //查看关系客户
      toLook(name, id) {
        sessionStorage.setItem("cusNameBlank", name);
        sessionStorage.setItem("cusIdBlank", id);
        window.open(this.otherTabUrl);
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexRelation.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/delRelation.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.cusId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexRelation') {
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
              error: function (res) {
                console.log(res);
              }
            });
          },
        });
      },
    }
  }

</script>
