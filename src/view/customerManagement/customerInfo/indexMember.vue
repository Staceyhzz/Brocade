/** 
 * 会员权益页面 
 */

<template>
  <div class="customer-box">
    <Alert type="success" style='marginTop: 10px;'>{{memberStr}}</Alert>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexMember.tit1')}}</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexMember.tit2')}}</h3>
      </div>
      <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cusName: '',
        cusId: '',
        memberStr: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexMember.colTit1'),
            key: 'categoryName'
          },
          {
            title: this.$t('indexMember.colTit2'),
            key: 'createtime'
          },
          {
            title: this.$t('indexMember.colTit3'),
            key: 'createUserName',
            render: (h, params) => {
              const str = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', str);
            }
          },
          {
            title: this.$t('indexMember.colTit4'),
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
            title: this.$t('equityAdd.label'),
            key: 'equityName'
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'equityContent'
          },
          {
            title: this.$t('indexMember.colTit2'),
            key: 'createtime'
          },
          {
            title: this.$t('indexMember.colTit3'),
            key: 'createUserName',
            render: (h, params) => {
              const str = `【${params.row.createUserHospitalName}】【${params.row.createUserName}】`;
              return h('span', str);
            }
          },
          {
            title: this.$t('indexMember.colTit4'),
            key: 'remark'
          },
        ],
        data: [],
        data1: []
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexMember') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getMember.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _memberStr = res.data.content.memberStr || '';
						const _data = res.data.content.memberList || [];
						const _data1 = res.data.content.equityList || [];
            if(_vm.langRouterKey !== 'indexMember') {
              _vm.memberStr = _memberStr;
              _vm.data = _data;
              _vm.data1 = _data1;
            } else {
              _vm.requestList([res.data.content], ['memberStr']).then(res => _vm.memberStr = res[0].memberStr);
              _vm.requestList(_data, ['categoryName', 'remark']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['equityName', 'equityContent', 'remark']).then(res => _vm.data1 = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
    }
  }

</script>
