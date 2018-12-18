/**
 关系图谱
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>关系图谱</h2>
        </div>
        <div class="container-body">
            <div id='jOrgChart'>
                <cmptTree :data='data' v-show='key'></cmptTree>
            </div>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import cmptTree from 'components/tree.vue'
    import '../../../static/jOrgChart/jquery.jOrgChart.js'
    export default {
        components: {cmptTree},
        data () {
            return {
                key: false,
                data: [],
            }
        },
        created () {
            this.getId()
        },
        mounted () {
        },
        methods: {
           getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: '/guard-webManager/promoter/storeTreeList.jhtml',
                    data: {ID: _vm.$route.query.id},
                    
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log('输出')
                            console.log(res)
                            let showlist = $("<ul id='org' style='display:none'></ul>")
                            let _obj = res.data.content || {},
                                _data = []
                            _data.push(_obj)
                            _vm.data.push(_obj)
                            _vm.$nextTick(() => {
                                $("#org").jOrgChart( {
                                    chartElement : '#jOrgChart',//指定在某个dom生成jorgchart
                                    dragAndDrop : false //设置是否可拖动
                                })
                                $('#jOrgChart a').click(function(event) {   
                                    event.stopPropagation()
                                    console.log($(event.target).attr('id'))
                                    let _id = $(event.target).attr('id')
                                    if(_id != 0) {
                                        let breadData = [
                                            {
                                                url: '/desktop',
                                                text: '桌面'
                                            },
                                            {
                                                url: '/promoteCustomer',
                                                text: '渠道管理'
                                            },
                                            {
                                                url: '/storeRecord',
                                                text: '渠道档案'
                                            }
                                        ]
                                        _vm.$store.dispatch('setBreadData', breadData);
                                        sessionStorage.setItem('storeId', _id)
                                        _vm.$router.push('/storeRecord')
                                    }
                                })
                            })
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            back () {
                this.$router.back(-1)
            },
        }
    }
</script>

<style>
    #jOrgChart a {
        text-decoration: none;
        color: #fff;
        font-size: 12px;
        height: 30px;
        cursor: pointer;
    }
    .jOrgChart .node {
        width: 120px;
        height: 50px;
        line-height: 50px;
        border-radius: 4px;
        margin: 0 8px;
    }
    .jOrgChart .line {
      height                : 20px;
      width                 : 4px;
    }

    .jOrgChart .down {
      background-color      : #3399ff;    
      margin                : 0px auto;
    }

    .jOrgChart .top {
      border-top          : 3px solid #3399ff;
    }

    .jOrgChart .left {
      border-right          : 2px solid #3399ff;
    }

    .jOrgChart .right {
      border-left           : 2px solid #3399ff;
    }

    /* node cell */
    .jOrgChart td {
      text-align            : center;
      vertical-align        : top;
      padding               : 0;
    }

    /* The node */
    .jOrgChart .node {
      background-color      : #3399ff;
      display               : inline-block;
      width                 : 96px;
      height                : 60px;
      z-index               : 10;
      margin               : 0 2px;
    }

    /* jQuery drag 'n drop */

    .drag-active {
      border-style          : dotted !important;
    }

    .drop-hover {
      border-style          : solid !important;
      border-color          : #E05E00 !important;
    }
</style>



