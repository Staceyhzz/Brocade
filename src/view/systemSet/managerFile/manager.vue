/** 
 * 编辑权限 
 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.managerManage')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 100,
            align: 'center',
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
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
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toHosp(params.row.id, params.row.name)
                    }
                  }
                }, this.$t('publicSet.set'))
              ])
            }
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
        _vm.$http.get({
          url: 'guard-webManager/manager/hospitalList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data = res.data.content
              _vm.$store.dispatch('setPageLoading', 1);
            } else {
              console.log(res.data.desc)
              if (window.localStorage) {
                let lg = window.localStorage;
                _vm.toHosp(lg.hospId, lg.hospName)
              }
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //跳转分院 
      toHosp(id, name) {
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/manager',
            text: 'layoutNav.managerManage'
          },
          {
            url: '/managerHospital',
            text: name
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/managerHospital',
          query: {
            id: id,
            name: name,
          }
        })
      },
    }
  }

</script>
