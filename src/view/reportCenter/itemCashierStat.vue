<!-- 集团项目营收情况统计 -->
/**
 *集团项目营收情况统计
 */

<template>
    <div class="container-box ICS" ref="containerBox">
        <div class="container-header">
            <h2>集团项目营收情况统计</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
                <Form-item label="划扣日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert> -->
            
            <table class="ICS-table tableEdit">
                 <thead>
                    <tr class="table-item">
                        <th>意向分类</th>
                        <th>消费意向</th>
                        <th>营业收入</th>
                        <th>现金总额</th>
                        <th>刷卡总额</th>
                        <th>预收款总额</th>
                        <th>券总额</th>
                        <th>欠款总额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-item" v-for="item in data">
                        <td :rowspan="item._span" :class="{hidden: item._dis}"><b>{{item.itemGroupName}}</b></td>
                        <td>{{item.itemName}}</td>
                        <td>{{item.cashCardAmount}}</td>
                        <td>{{item.cashAmount}}</td>
                        <td>{{item.cardAmount}}</td>
                        <td>{{item.depositAmount}}</td>
                        <td>{{item.couponAmount}}</td>
                        <td>{{item.debtAmount}}</td>
                    </tr>
                    <tr class="table-item">
                        <td><b>{{total.itemGroupName}}</b></td>
                        <td>{{total.itemName}}</td>
                        <td>{{total.cashCardAmount}}</td>
                        <td>{{total.cashAmount}}</td>
                        <td>{{total.cardAmount}}</td>
                        <td>{{total.depositAmount}}</td>
                        <td>{{total.couponAmount}}</td>
                        <td>{{total.debtAmount}}</td>
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
                managerUserName: '',
                chargeName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: ''
                },
                dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                itemGroupList: [],
                data: [],
                total: {}
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/itemCashierStat.jhtml'
            }
        },
        created () {
            this.getList(this.formSearch)
        },
        mounted () {
             this.$store.dispatch('setSelectAllHospList', {})
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/itemCashierStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.itemGroupList = res.data.content.ItemGroupList
                            _vm.data = _vm.combineCell('itemGroupName', res.data.content.List)
                            _vm.total =  res.data.content.Total
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
            setDate_1 (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox_1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(this.formSearch)
                }
            },
            combineCell (key, list) {
                var k = 0;
                while (k < list.length) {
                    list[k]['_span'] = 1;
                    list[k]['_dis'] = false;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if(list[k][key] == list[i][key]) {
                            list[k]['_span']++;
                            list[k]['_dis'] = false;
                            list[i]['_span'] = 1;
                            list[i]['_dis'] = true;
                        } else {
                            break;
                        }
                    }
                    k = i;
                }
                console.log(list[0])
                return list;
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
<style type="text/css" scoped>
    .ICS .ICS-table {
        width: 100%
    }
    .ICS .ICS-table thead tr{
        border-right: 1px solid #d7dde4;
    }
    .ICS .ICS-table tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .ICS-table td, 
    .ICS-table th {
        height: 32px;
        padding: 0 18px;
        text-align: center;
    }
    #app .tableEdit.ICS-table td{
        border-bottom: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
    }
    .hidden {
        display: none;
    }
</style>
