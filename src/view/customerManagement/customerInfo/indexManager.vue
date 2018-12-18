/** 
 * 负责用户页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexManager.tit1')}}</h3>
        <ul class="header-btn-group">
          <li class="header-item" @click="toView('1')">
            <Icon type="information"></Icon>{{$t('indexManager.btn')}}</li>
        </ul>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexManager.tit2')}}</h3>
        <ul class="header-btn-group">
          <li class="header-item" @click="toView('2')">
            <Icon type="information"></Icon>{{$t('indexManager.btn')}}</li>
        </ul>
      </div>
      <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexManager.tit3')}}</h3>
        <ul class="header-btn-group">
          <li class="header-item" @click="toView('3')">
            <Icon type="information"></Icon>{{$t('indexManager.btn')}}</li>
        </ul>
      </div>
      <Table stripe :columns="columns2" :data="data2"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cusId: '',
        cusName: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexManager.colTit1'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexManager.colTit2'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.userDeptName}】【${params.row.userName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexManager.colTit3'),
            width: 80,
            key: 'starttime'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark'
          }
        ],
        columns1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexManager.colTit1'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexManager.colTit2'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.userDeptName}】【${params.row.userName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexManager.colTit3'),
            width: 80,
            key: 'starttime'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark'
          }
        ],
        columns2: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexManager.colTit1'),
            width: 80,
            key: 'userHospitalName'
          },
          {
            title: this.$t('indexManager.colTit2'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.userDeptName}】【${params.row.userName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row)
                    }
                  }
                }, this.$t('publicSet.check'))
              ])
            }
          }
        ],
        data: [],
        data1: [],
        data2: [],
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexManager') {
          this.getId(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getManager.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content.exploitUserList || [];
            const _data1 = res.data.content.managerUserList || [];
            if(_vm.langRouterKey !== 'indexManager') {
              _vm.data = _data;
              _vm.data1 = _data1;
            } else {
              _vm.requestList(_data, ['remark']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['remark']).then(res => _vm.data1 = res);
            }
						_vm.data2 = res.data.content.operatorList || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      toDetail(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: '/operatorUserInfo',
            text: data.userHospitalName + " " + data.userName
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/operatorUserInfo',
          query: {
            id: this.cusId,
            userId: data.userid,
          }
        });
      },
      toView(type) {
        let _text = '',
          _url = '';
        switch (type) {
          case '1':
            _url = '/exploitUserInfo'
            _text = 'indexManager.tit4'
            break;
          case '2':
            _url = '/managerUserInfo'
            _text = 'indexManager.tit5'
            break;
          case '3':
            _url = '/operatorInfo'
            _text = 'indexManager.tit6'
            break;
        }
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: this.cusId
          }
        });
      },
    }
  }

</script>
