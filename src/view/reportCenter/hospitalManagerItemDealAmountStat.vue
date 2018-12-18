<!-- hospitalManagerItemDealAmountStat -->
<!-- 医院咨询师成交统计 -->
/**
 * 医院咨询师成交统计
 */

<template>
    <div class="container-box hospMIDAS" ref="containerBox">
        <div class="container-header">
            <h2>医院咨询师成交统计</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            
            <table class="hospMIDAS-table tableEdit">
                <thead>
                    <tr class="table-item">
                        <th>咨询师</th>
                        <th>意向分类</th>
                        <th>消费意向</th>
                        <th>现金总额</th>
                        <th>刷卡总额</th>
                        <th>现金刷卡总额</th>
                        <th>预收款使用总额</th>
                        <th>劵使用总额</th>
                        <th>成交金额总额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-item" v-for="item in tabelData">
                        <td :rowspan="item._span" :class="{hidden: item._dis}">{{item.managerUserName}}</td>
                        <td :rowspan="item._span_2" :class="{hidden: item._dis_2}">{{item.itemGroupName}}</td>
                        <td>{{item.itemName}}</td>
                        <td>{{item.cashAmount}}</td>
                        <td>{{item.cardAmount}}</td>
                        <td>{{item.cashCardAmount}}</td>
                        <td>{{item.depositAmount}}</td>
                        <td>{{item.couponAmount}}</td>
                        <td>{{item.dealAmount}}</td>
                    </tr>
                    <tr class="table-item">
                        <td>{{total.managerUserName}}</td>
                        <td>{{total.itemGroupName}}</td>
                        <td>{{total.itemName}}</td>
                        <td>{{total.cashAmount}}</td>
                        <td>{{total.cardAmount}}</td>
                        <td>{{total.cashCardAmount}}</td>
                        <td>{{total.depositAmount}}</td>
                        <td>{{total.couponAmount}}</td>
                        <td>{{total.dealAmount}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                message: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD')
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                
                total: {},
                itemGroupList: [],
                tabelData: [],
                userItemStatList: [],
                dealUserItemStatList: [],
                userList: [],
                userGroupStatList: [],
                userStatList: []
            }
        },
        computed: {
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalManagerItemDealAmountStat.jhtml'
            }
        },
        created () {
            this.getList(this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalManagerItemDealAmountStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            //总合计
                            _vm.total = res.data.content.Total
                            //意向分类列表
                            _vm.itemGroupList = res.data.content.ItemGroupList
                            //消费意向 对应的收款（包括不同的咨询师）
                            _vm.userItemStatList = res.data.content.UserItemStatList
                            //咨询师的列表
                            _vm.userList = res.data.content.UserList
                            //意向分类的的合计 （包括不同的人）
                            _vm.userGroupStatList = res.data.content.UserGroupStatList

                            //每个咨询师的合计
                            _vm.userStatList = res.data.content.UserStatList

                            //整理

                            for(let c=0;c<_vm.userGroupStatList.length;c++){
                                _vm.userGroupStatList[c].itemName = '合计'
                            }


                            //存放最终数据的数组arr
                            var arr = []
                            // 人员 -- 数量
                            let len_2 = _vm.userList.length
                            // 消费意向收款  -- 数量 12
                            let len_3 = _vm.userItemStatList.length
                            // 意向分类的合计 -- 数量 9
                            let len_4 =  _vm.userGroupStatList.length


                            //合并数组得到新数组
                            for (let m=0; m<len_2;m++){
                                let sameUserItemArr = []

                                _vm.dealUserItemStatList = []
                                let userName = _vm.userList[m].name
                                //先按名字把item分别取出来再排列
                                for(let n=0; n<len_3; n++){
                                    if(_vm.userItemStatList[n].managerUserName == userName){ 
                                        sameUserItemArr.push(_vm.userItemStatList[n])
                                    }
                                }
                                let sameUserLen = sameUserItemArr.length // 12 每个人都有12条数据

                                //将报表组的每组的合计加入到userGroupStatList  每个人都有9条 9*n
                                for(let a=0;a<len_4;a++){
                                    if(_vm.userList[m].name == _vm.userGroupStatList[a].managerUserName){
                                        for(let b=0;b<sameUserLen;b++){
                                            if(_vm.userGroupStatList[a].itemGroupID == sameUserItemArr[b].itemGroupID && _vm.userGroupStatList[a].managerUserName == sameUserItemArr[b].managerUserName){
                                                _vm.dealUserItemStatList.push(sameUserItemArr[b])
                                            }

                                        }
                                        _vm.dealUserItemStatList.push(_vm.userGroupStatList[a])
                                    }
                                }

                                //将每个咨询师的合计加入到数组中
                                for(let o=0;o<_vm.userStatList.length;o++){
                                    _vm.userStatList[o].itemName = '合计'
                                    _vm.userStatList[o].itemGroupName = '合计'
                                    if(_vm.userList[m].name == _vm.userStatList[o].managerUserName) {
                                        _vm.dealUserItemStatList.push(_vm.userStatList[o])
                                    }
                                }

                                Array.prototype.push.apply(arr, _vm.dealUserItemStatList); 
                            }
                            let len = _vm.itemGroupList.length
                            let arrLen = arr.length
                            for(let i = 0;i < arrLen; i++){
                                for(let l=0;l<len;l++){
                                    if(arr[i].itemGroupID == _vm.itemGroupList[l].id){
                                        arr[i].itemGroupName = _vm.itemGroupList[l].name
                                    }
                                }
                            }
                            _vm.tabelData = _vm.combineCell('managerUserName', 'itemGroupName', arr)
                            console.log(_vm.tabelData)
                            _vm.$store.dispatch('setPageLoading', 1);
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList( this.formSearch)
                }
            },
            combineCell (key_1, key_2, list) {
                var k = 0;
                var n = 0;
                while (k < list.length) {
                    list[k]['_span'] = 1;
                    list[k]['_dis'] = false;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if(list[k][key_1] == list[i][key_1]) {
                            list[k]['_span']++;
                            list[k]['_dis'] = false;
                            list[i]['_span'] = 1;
                            list[i]['_dis'] = true;
                        }else{
                            break;
                        }
                    }
                    k = i;
                }
                while (n < list.length) {
                    list[n]['_span_2'] = 1;
                    list[n]['_dis_2'] = false;
                    for (var i = n + 1; i <= list.length - 1; i++) {
                        if(list[n][key_2] == list[i][key_2]) {
                            list[n]['_span_2']++;
                            list[n]['_dis_2'] = false;
                            list[i]['_span_2'] = 1;
                            list[i]['_dis_2'] = true;
                        }else{
                            break;
                        }
                    }
                    n = i;
                }
                return list;
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
<style type="text/css" scoped>
    .hospMIDAS .hospMIDAS-table {
        width: 100%
    }
    .hospMIDAS .hospMIDAS-table thead tr{
        border-right: 1px solid #d7dde4;
    }
    .hospMIDAS .hospMIDAS-table tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .hospMIDAS-table td, 
    .hospMIDAS-table th {
        height: 32px;
        padding: 0 18px;
        text-align: center;
    }
    #app .tableEdit.hospMIDAS-table td,#app .tableEdit.hospMIDAS-table th{
        border-bottom: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
    }
    .hidden {
        display: none;
    }
</style>

