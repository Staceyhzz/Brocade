/**
* 标签组管理
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.tagGroupManage')}}</h2>
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
            title: this.$t('labelPublic.ms'),
            key: 'remark',
            width: 100
          },
          {
            title: this.$t('tagGroup.tag'),
            width: 100,
            key: 'list',
            render: (h,params) => {
              const list = params.row.list.split(',') || [];
              return h('div', {
                style: {
                  padding: '4px 0'
                }
              }, list.map(item => {
                return h('p', {
                  style: {
                    padding: "2px 0"
                  }
                }, item)
              }))
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
        if(val === 'tagGroup') {
          this.getList();
        }
      },
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/tagGroup/list.jhtml',
          success: function(res){
            let _data = res.data.content.map(item => {
              return {
                id: item.id,
                name: item.name,
                remark: item.remark,
                list: item.detailList.map(list => list.tagName).join(',') || ''
              }
            }) || [];
            if(_vm.langRouterKey !== 'tagGroup') {
              _vm.data = _data;
            } else {
              const props = ['name', 'list', 'remark'];
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
          breadText = 'tagGroup.modalTit2';
          id = data.id
        } else {
          breadText = 'tagGroup.modalTit1';
          id = data
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/tagGroup',
            text: 'layoutNav.tagGroupManage'
          },
          {
            url: '/tagGroupEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/tagGroupEdit',
          query: {
            id: id
          }
        })
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('tagGroup.msg1')}</p>
          <p>${_vm.$t('tagGroup.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/tagGroup/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'tagGroup') {
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