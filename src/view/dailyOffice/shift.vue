/** * 全院排班表 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>全院排班表</h2>
      <ul class="header-btn-group">
        <li class="float-left">
          <Select v-model="formSearch.hospitalId" style="width:200px" :disabled='!key' @on-change='changeHosp'>
            <Option v-for="item in hospList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </li>
        <li class="header-item" @click="selectDate('before')">
          <Icon type="arrow-up-a"></Icon>前一周</li>
        <li class="header-item" @click="selectDate('now')">
          <Icon type="navicon-round"></Icon>
          </Icon>本周</li>
        <li class="header-item" @click="selectDate('after')">
          <Icon type="arrow-down-a"></Icon>
          </Icon>后一周</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  moment.updateLocale('en', {
    weekdays: [
      '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ]
  });
  export default {
    data() {
      return {
        key: true,
        startTime: moment(moment(moment().startOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
        endTime: moment(moment(moment().endOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
        formSearch: {
          startTime: '',
          endTime: '',
          hospitalId: '',
        },
        col: [{
            title: '部门',
            key: 'deptName'
          },
          {
            title: '用户',
            key: 'name'
          },
        ],
        data: [],
        timeBox: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
      },
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList');
    },
    created() {
      if (window.localStorage) {
        var lg = window.localStorage;
        this.formSearch.hospitalId = lg.hospId * 1
      }
      if (lg.hospId == 1) {
        this.key = true
      } else {
        this.key = false
      }
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.timeBox = []
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/shift/list.jhtml',
          data: _vm.formSearch,
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1)
						for (let i = 0; i < 7; i++) {
							_vm.timeBox.push(moment(res.data.content.StartTime).add(i, 'd').format('YYYY-MM-DD'))
						}
						_vm.setColumns()
						_vm.data = res.data.content.UserList;
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changeHosp() {
        this.getList()
      },
      setColumns() {
        this.col.splice(2)
        this.timeBox.map(item => {
          const _obj = {
            col: {
              title: moment(item).format('YYYY-MM-DD (dddd)'),
              key: item,
              render: (h, params) => {
                const _day = item + ' 00:00:00'
                return h('div', {
                  style: {
                    height: '60px',
                  },
                }, params.row.shiftList.map(item1 => {
                  if (moment(_day).isSame(item1.shiftdate)) {
                    return h('p', {
                      style: {
                        lineHeight: '60px',
                        textAlign: 'center'
                      },
                    }, item1.categoryName)
                  }
                }))
              }
            }
          }
          this.col.push(_obj.col)
        })
      },
      selectDate(type) {
        if (type == 'now') {
          this.formSearch.startTime = this.startTime
          this.formSearch.endTime = this.endTime
        } else if (type == 'after') {
          this.formSearch.startTime = moment(this.timeBox[0]).add(7, 'd').format('YYYY-MM-DD')
          this.formSearch.endTime = moment(this.timeBox[6]).add(7, 'd').format('YYYY-MM-DD')
        } else {
          this.formSearch.startTime = moment(this.timeBox[0]).subtract(7, 'd').format('YYYY-MM-DD')
          this.formSearch.endTime = moment(this.timeBox[6]).subtract(7, 'd').format('YYYY-MM-DD')
        }
        this.getList()
      },
    }
  }

</script>
