<!-- 医院项目消费情况统计 -->
<!-- hospitalItemOrderAmountStat -->
/**
 * 医院项目消费情况统计
 */

<template>
    <div class="container-box hospIAS" ref="containerBox">
        <div class="container-header">
            <h2>医院项目消费情况统计</h2>
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

            <table class="hospIAS-table tableEdit">
            	<thead>
            		<tr class="table-item">
            			<th>意向分类</th>
            			<th>消费意向</th>
            			<th>消费总额</th>
            			<th>占比</th>
            			<th>劵额</th>
            			<th>非劵总额 </th>
            			<th>占比</th>
            		</tr>
            	</thead>
            	<tbody>
            		<tr class="table-item" v-for="item in data">
            			<td :rowspan="item._span" :class="{hidden: item._dis}">{{item.itemGroupName}}</td>
            			<td>{{item.itemName}}</td>
            			<td>{{item.totalAmount.toFixed(2)}}</td>
            			<td v-if="item.totalPercent == 0">0.00%</td>
            			<td v-else>{{(item.totalPercent*10000/100).toFixed(2)+"%"}}</td>
            			<td>{{item.couponAmount.toFixed(2)}}</td>
            			<td>{{item.noCouponTotalAmount.toFixed(2)}}</td>
        				<td v-if="item.totalPercent == 0">0.00%</td>
            			<td v-else>{{(item.noCouponTotalPercent*10000/100).toFixed(2)+"%"}}</td>
            		</tr>
            		<tr class="table-item" style="color:#3598de; font-weight: bold">
            			<td style="color:#000;">{{totalData.itemGroupName}}</td>
            			<td style="color:#000;">{{totalData.itemName}}</td>
            			<td>{{totalData.totalAmount.toFixed(2)}}</td>
            			<td v-if="totalData.totalPercent == 0">0.00%</td>
            			<td v-else>{{(totalData.totalPercent*10000/100).toFixed(2)+"%"}}</td>
            			<td>{{totalData.couponAmount.toFixed(2)}}</td>
            			<td>{{totalData.noCouponTotalAmount.toFixed(2)}}</td>
        				<td v-if="totalData.totalPercent == 0">0.00%</td>
            			<td v-else>{{(totalData.noCouponTotalPercent*10000/100).toFixed(2)+"%"}}</td>
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
                    endTime: moment().format('YYYY-MM-DD')
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                
                data: [],
                totalData: {}
            }
        },
        computed: {
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalItemOrderAmountStat.jhtml'
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
                    url: 'guard-webManager/report/hospitalItemOrderAmountStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            let _data = res.data.content.List || [],
                                _obj = res.data.content.Null || {}
                            if(_obj.itemGroupName) {
                                _data.push(_obj)
                            }
                            _vm.data = _vm.combineCell('itemGroupName', _data)
                            _vm.totalData = res.data.content.Total
                            console.log(_vm.totalData)
                            _vm.$store.dispatch('setPageLoading', 1)
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
	.hospIAS .hospIAS-table {
		width: 100%
	}
	.hospIAS .hospIAS-table thead tr{
		border-right: 1px solid #d7dde4;
	}
	.hospIAS .hospIAS-table tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .hospIAS-table td, 
    .hospIAS-table th {
        height: 32px;
        padding: 0 18px;
        text-align: center;
    }
    #app .tableEdit.hospIAS-table td,
    #app .tableEdit.hospIAS-table th{
    	border-bottom: 1px solid #d7dde4;
    	border-right: 1px solid #d7dde4;
    }
	.hidden {
        display: none;
    }
</style>
