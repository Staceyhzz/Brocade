/**
 * 渠道商图谱
 */

<template>
  <div class="container-box user distributor" ref="containerBox">
    <div class="container-header">
      <h2>渠道商图谱</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <div class='report-chart-container'>
        <div class="report-chart" ref='echarts'></div>
      </div>
      <!-- <Tree :data="list"></Tree> -->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import walden from 'utils/walden.js';
  export default {
    data () {
      return {
        list: [],

        chart: null,
        timer: null,
        chartOption: {
          tooltip : {
            trigger: 'item'
          },
          series: [
            {
              type: 'tree',
              data: [],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                }
              },
              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        }
      }
    },
    computed: {
      viewResize () {
				return this.$store.getters.getViewResize;
			},
    },
    watch: {
			viewResize (val) {
				this.init();
			},
		},
    created() {
      this.getList();
    },
    mounted() {
      let _vm = this;
      _vm.initChart();
      window.addEventListener('resize', _vm.init);
    },
    beforeDestroy () {
			let _vm = this;
      _vm.chart.dispose();
      _vm.chart = null;
      window.removeEventListener('resize', _vm.init);
			_vm.timer = null;
		},
    methods: {
      // 获取分页
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/distributionUser/storeTreeList.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function(res){
            const obj = res.data.content || {};
            _vm.list = [obj];
            _vm.setChart();
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      initChart () {
        this.chart = echarts.init(this.$refs.echarts, walden.theme);
        // this.chart.setOption(this.chartOption);
      },
      setChart () {
        this.chart.setOption({
          tooltip : {
            trigger: 'item'
          },
          series: [
            {
              type: 'tree',
              data: this.list,
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                }
              },
              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },
              animationDuration: 550,
              animationDurationUpdate: 750,
              expandAndCollapse: true,
            }
          ]
        });
        this.$nextTick(() => {
          this.init();
        });
      },
      init () {
				if(this.chart) {  
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.chart.resize();
          }, 200);
        }
			},
      back () {
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang="less">
  .distributor .report-chart-container .report-chart {
    width: 100%;
    height: 100%;
  }
</style>

