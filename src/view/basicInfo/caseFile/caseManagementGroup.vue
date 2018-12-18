/**
* 病例类型管理
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>病例类型管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit(true)"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name',
            width: 60
          },
          {
            title: '禁用状态',
            width: 70,
            render: (h, params) => {
              const color = params.row.status === '1' 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === '1'
                ? '启用'
                : '禁用';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
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
                      this.toEdit(false, params.row)
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
        data: [],
      }
    },
    computed: {

    },
    watch: {

    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByAllSmartCaseList.jhtml',
          data: {
            hospitalId: localStorage.getItem('hospId')
          },
          success: function(res){
            _vm.data = res.data.content || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      toEdit(type, data) {
        const id = type ? 'add' : data.Id;
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/caseManagementGroup',
            text: '病例类型管理'
          },
          {
            url: '/caseManagementGroupEdit',
            text: '病例类型设计'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/caseManagementGroupEdit',
          query: {
            id: id
          }
        });
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>确定删除此病例管理类型</p>
          <p>病例管理类型信息：</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/case/deleteByCaseIdSmartCase.jhtml',
              data: {caseId: data.Id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
        });
      },
    }
  }
</script>



