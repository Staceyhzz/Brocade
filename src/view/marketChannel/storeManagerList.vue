/** * 负责渠道的列表 */

<template>
  <div class="container-box depositChargeEdit">
    <div class="container-header">
      <h2>{{userInfo.name}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [{
            title: '序号',
            width: 60,
            type: 'index'

          },
          {
            title: '渠道',
            key: 'storeName'
          },
          {
            title: '联系人',
            key: 'linkman'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
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
                }, '删除'),
              ])
            }
          }
        ],
        userInfo: {},
        userId: '',
        htmlTit: '',
        data: []
      }
    },
    created() {
      if (typeof this.$route.query.id == 'string') {
        this.userId = this.$route.query.id
      } else {
        var lg = window.sessionStorage;
        this.userId = JSON.parse(lg.query34).id
      }
      this.getList(this.userId)
    },
    methods: {
      getList(id) {
        let _this = this
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/storeManager/managerList.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
						_this.$store.dispatch('setPageLoading', 1)
						_this.data = res.data.content.List
						_this.userInfo = res.data.content.User;
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      remove(data) {
        let _this = this
        _this.$http.post({
          url: 'guard-webManager/storeManager/delete.jhtml',
          data: {
            id: data.id
          },
          success: function (res) {
            if (res.data.code == 0) {
              _this.$Notice.success({
                title: '系统提示！',
                desc: '删除成功 '
              });
              _this.getList(_this.userId)
            } else {
              _this.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      add() {
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/storeManager',
            text: '渠道负责人管理'
          },
          {
            url: '/storeManagerList',
            text: this.userInfo.name
          },
          {
            url: '/addStoreManager',
            text: '添加负责人'
          },
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: 'addStoreManager',
          query: {
            id: this.userId,
            name: this.userInfo.name
          }

        })
      }
    }
  }

</script>

<style>
  .depositChargeEdit .radioModal .ivu-radio-wrapper {
    display: block;
  }

</style>
