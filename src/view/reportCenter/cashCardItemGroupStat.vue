<!-- cashCardItemGroupStat -->
<!-- 集团各科目收款方式统计 -->

/**
 * 集团各科目收款方式统计
 */

<template>
    <div class="container-box CCIGS" ref="containerBox">
        <div class="container-header">
            <h2>集团各科目收款方式统计</h2>
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
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
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

            <table class="CCIGS-table tableEdit">
            	<thead>
            		<tr class="table-item">
            			<th>营收项目</th>
            			<th>收款方式</th>
            			<th>收款</th>
            			<th>退款</th>
            			<th>合计</th>
            		</tr>
            	</thead>
            	<tbody>
            		<tr class="table-item" v-for="item in data">
            			<td :rowspan="item._span" :class="{hidden: item._dis}">{{item.itemGroupName}}</td>
            			<td>{{item.categoryName}}</td>
            			<td>{{item.inAmount}}</td>
            			<td>{{item.outAmount}}</td>
            			<td>{{item.amount}}</td>
            		</tr>
            		<tr class="table-item" v-for="item in totalData">
            			<td :rowspan="item._span" :class="{hidden: item._dis}">{{item.itemGroupName}}</td>
            			<td>{{item.categoryName}}</td>
            			<td>{{item.inAmount}}</td>
            			<td>{{item.outAmount}}</td>
            			<td>{{item.amount}}</td>
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
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                
                data: [],
                totalData: []
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/cashCardItemGroupStat.jhtml'
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
                    url: 'guard-webManager/report/cashCardItemGroupStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                           	_vm.data = _vm.combineCell('itemGroupName', res.data.content.List)
                            _vm.totalData = _vm.combineCell('itemGroupName', res.data.content.TotalList)
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
	.CCIGS .CCIGS-table {
		width: 100%
	}
	.CCIGS .CCIGS-table thead tr{
		border-right: 1px solid #d7dde4;
	}
	.CCIGS .CCIGS-table tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .CCIGS-table td, 
    .CCIGS-table th {
        height: 32px;
        padding: 0 18px;
        text-align: center;
    }
    #app .tableEdit.CCIGS-table td,#app .tableEdit.CCIGS-table th{
    	border-bottom: 1px solid #d7dde4;
    	border-right: 1px solid #d7dde4;
    }
	.hidden {
        display: none;
    }
</style>
