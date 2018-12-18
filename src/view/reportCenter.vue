/** * 报表中心页面 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>数据报表中心</h2>
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
            type: 'index',
            width: 60
          },
          {
            title: '名称',
            key: 'name',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toView(params.row)
                  }
                }
              }, params.row.name)
            }
          },
          {
            title: '编号',
            key: 'no'
          },
          {
            title: '标签',
            key: 'tags'
          },
          {
            title: '描述',
            key: 'content'
          }
        ],
        data: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/report/reportList.jhtml',
          success: function (res) {
						_vm.data = res.data.content
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      toView(data) {
        let _url = data.url;
        let _text = data.name;
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/reportCenter',
            text: '报表中心'
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url
        })
      },
    }
  }

</script>
