/**
 * 市场工作台
 */
<template>
	<div class="container-box">
		<div class="container-header">
			<h2>市场工作台</h2>
		</div>
		<div class="container-body">
			<Tabs :animated='false'>
		        <Tab-pane label="客户识别">
				    <Form inline ref='formSearch' :model='formSearch'>
                        <Form-item prop='query'>
                            <Input :maxlength='15' v-model.trim="formSearch.query" placeholder="请输入客户编号 / 手机号 / 电话号码 / 预约号 / 姓名" style="width: 350px" @on-enter="getSearch(formSearch)"></Input>
                            <Input v-show='fixSub'></Input>
                        </Form-item>
                        <ul class="header-btn-group not-float">
                            <li class="header-item" @click="getSearch(formSearch)"><Icon type="search"></Icon>查询</li>
                            <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                        </ul>
                    </Form>
                     <Alert v-if='key'>
                        提示信息
                        <div slot="desc" v-if='data.length == 0'>
                            <p>没有找到符合条件的客户资料。</p>
                            <Button type="primary"  @click='toNew'>添加新客户</Button>
                        </div>
                        <div slot="desc" v-else>
                            <p>找到 {{data.length}} 条符合条件的客户资料</p>
                        </div>
                    </Alert>
                    <Table stripe :columns="columns" :data="data" v-show="data.length > 0"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日新登记客户" >
		        	<Table stripe :columns="columns1" :data="data1"></Table>
		        </Tab-pane>
		        <Tab-pane label="今日新增预约">
		        	<Table stripe :columns="columns2" :data="data2"></Table>
		        </Tab-pane>
		    </Tabs>

			
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                fixSub: false,
                key: false,
                formSearch: {
                    query: ''
                },
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户',
                        key: 'name',
                        render: (h, params) => {
                            return h('p', {
                                on: {
                                    click: () => {
                                        this.toCusIndex(params.row.id, params.row.name)
                                    }
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: 'orange'
                                }
                            }, [
                                h('Icon', {
                                    props: {
                                        type: "person"
                                    }
                                }),
                                h('span', params.row.name + '(' + params.row.id + ')')
                            ])
                        }
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '会员',
                        key: 'memberCategoryName'
                    },
                    {
                        title: '来源',
                        key: 'channelName'
                    },
                    {
                        title: '渠道',
                        key: 'storeName'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    }
                ],
                data: [
                   
                ],
                columns1: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户',
                        key: 'name',
                        width: 100,
                        render: (h, params) => {
                            return h('p', {
                                on: {
                                    click: () => {
                                        this.toCusIndex(params.row.id, params.row.name)
                                    }
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: 'orange'
                                }
                            }, [
                                h('Icon', {
                                    props: {
                                        type: "person"
                                    }
                                }),
                                h('span', params.row.name + '(' + params.row.id + ')')
                            ])
                        }
                    },
                     {   
                        title: '性别',
                        width: 60,
                        key:  'gender',
                        render: (h, params) => {
                            const text = params.row.gender == '1'  ? '男':'女'
                            return h('span',text)
                        }
                    },
                     {   
                        title: '登记时间',
                        width: 60,
                        key: 'createTime'
                    },
                     {   
                        title: '来源',
                        width: 60,
                        key: 'channelName'
                    },
                     {   
                        title: '推荐渠道',
                        width: 60,
                        key: 'storeName'
                    },
                     {   
                        title: '咨询项目',
                        width: 60,
                        key: 'symptomName'
                    },
                     {   
                        title: '咨询内容',
                        width: 60,
                        key: 'consultContent'
                    }

                ],
                data1: [
                   
                ],
                columns2: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '客户',
                        key: 'name',
                        width: 100,
                        render: (h, params) => {
                            return h('p', {
                                on: {
                                    click: () => {
                                        this.toCusIndex(params.row.customerID, params.row.customerName)
                                    }
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: 'orange'
                                }
                            }, [
                                h('Icon', {
                                    props: {
                                        type: "person"
                                    }
                                }),
                                h('span', params.row.customerName + '(' + params.row.customerID + ')')
                            ])
                        }
                    },
                     {   
                        title: '登记时间',
                        width: 60,
                        key: 'createTime'
                    },
                     {   
                        title: '预约医院',
                        width: 60,
                        key: 'hospitalName'
                    },
                     {   
                        title: '预约日期',
                        width: 60,
                        key: 'date'
                    },
                     {   
                        title: '预约时间',
                        width: 60,
                        key: 'time'
                    },
                     {   
                        title: '预约类型',
                        width: 60,
                        key: 'type'
                    },
                    {   
                        title: '内容',
                        width: 60,
                        render: (h, params) => {
                            return h('div', {
                                domProps: {
                                    innerHTML: params.row.content
                                }
                            })
                        }
                    }

                ],
                data2: [
                   
                ]
            }
        },
        created () {
        	this.$store.dispatch('setPageLoading', 1)
           	this.getList()
        },
        methods: {
         getList () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/marketDesk/index.jhtml',
                    success: function(res){
                        if(res.data.code == 0){
                            console.log(res)
                            _vm.data1 = res.data.content.customerList
                            _vm.data2 = res.data.content.appointmentList
                           
                            //_vm.RegisterEnable = res.data.content.RegisterEnable
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
         //查询客户
            getSearch (form) {
                var _vm = this
                if(form.query.length == 0) {
                    _vm.key = false
                } else {
                    _vm.$http.get({
                        url: 'guard-webManager/frontDesk/query.jhtml',
                        data: form,
                        success: function(res){
                            if(res.data.code == 0){
                                console.log(res.data.content)
                                _vm.data = res.data.content
                                _vm.key = true
                            } else {
                                console.log(res.data.desc)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            //跳转客户详情
            toCusIndex (id, name) {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/customerIndex',
                        text: name
                    }
                ]
                sessionStorage.setItem("cusName", name)
                sessionStorage.setItem("cusId", id)
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/customerIndex',
                    query: {
                        id: id
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.data = []
                this.key = false
            },
              //添加客户
            toNew () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/marketDesk',
                        text: '市场工作台'
                    },
                    {
                        url: '/marketAddNew',
                        text: '登记新客户'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/marketAddNew',
                    query: {
                        mobile: this.formSearch.query
                    }
                })
            }
        }
    }
</script>