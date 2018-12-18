/**
 * 条件查找结果页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>条件查找结果</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :rules="ruleForm" :model="formAdd" label-position="right">
                <Form-item label="查询结果">
                    <p>共找到{{num}}人</p>
                    <Table stripe :columns="col" :data="data" height="500"></Table>
                </Form-item>
                <Form-item label="保存结果" prop='result' required>
                    <Radio-group v-model="formAdd.result" style="width:500px">
                        <Form-item prop="filterId">
                            <Radio :label="1">覆盖现有结果集</Radio>
                            <Select v-model="formAdd.filterId" style="width:300px">
                                <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop='name'>
                            <Radio :label="2" style='margin-top:15px;'>保存到新结果集</Radio>
                            <Input v-model.trim="formAdd.name" placeholder="请输入名称" style="width:300px"></Input>
                        </Form-item>
                    </Radio-group>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateFil= (rule, value, callback) => {
                if(this.formAdd.result == 1) {
                    if (value === '') {
                        callback(new Error('请选择结果集'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const validateName= (rule, value, callback) => {
                if(this.formAdd.result == 2) {
                    if (value === '') {
                        callback(new Error('请输入名称'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                type: '',
                num: '',
                formSearch: {},
                saveLoad: false,
                formAdd: {
                    ids: '',
                    sql: '',
                    result: 1,
                    filterId: '',
                    name: '',
                },
                col: [
                    {
                        title: '客户编号',
                        key: 'id'
                    },
                ],
                data: [],
                filterList: [],
                ruleForm: {
                    filterId: [
                        { validator: validateFil, trigger: 'change' }
                    ],
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            this.formSearch = JSON.parse(sessionStorage.getItem('filterSearch'))
            this.type = this.$route.query.type
            this.getSearch()
        },
        mounted () {
            this.getFilterList(localStorage.getItem('userId'))
        },
        methods: {
            //获取查询结果
            getSearch () {
                let _vm = this,
                    _url = '',
                    _obj = {}
                _vm.data = []
                switch (_vm.type) {
                    case '1':
                        _url = 'guard-webManager/customerFilter/basicEdit.jhtml'
                        break;
                    case '2':
                        _url = 'guard-webManager/customerFilter/accountEdit.jhtml'
                        break;
                    case '3':
                        _url = 'guard-webManager/customerFilter/visitEdit.jhtml'
                        break;
                    case '4':
                        _url = 'guard-webManager/customerFilter/orderEdit.jhtml'
                        break;
                    case '5':
                        _url = 'guard-webManager/customerFilter/consultEdit.jhtml'
                        break;
                    case '6':
                        _url = 'guard-webManager/customerFilter/operationEdit.jhtml'
                        break;
                    case '7':
                        _url = 'guard-webManager/customerFilter/memberEdit.jhtml'
                        break;
                    case '8':
                        _url = 'guard-webManager/customerFilter/failtureEdit.jhtml'
                        break;
                    case '9':
                        _url = 'guard-webManager/customerFilter/tagEdit.jhtml'
                        break;
                    case '10':
                        _url = 'guard-webManager/customerFilter/callbackEdit.jhtml'
                        break;
                    case '11':
                        _url = 'guard-webManager/customerFilter/notCallbackEdit.jhtml'
                        break;
                    case '12':
                        _url = 'guard-webManager/customerFilter/lastdealTime.jhtml'
                        break;
                }
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: _url,
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0){
                            console.log(res)
                            _vm.num = res.data.content.num
                            for(let i = 0; i < res.data.content.IDList.length; i++) {
                                _obj.id = res.data.content.IDList[i]
                                _vm.data.push(_obj)
                                _obj = {}
                            }
                            _vm.formAdd.ids = res.data.content.iDs
                            _vm.formAdd.sql = res.data.content.sql
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
            //获取结果集下拉列表
            getFilterList (id) {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/userCustomerFilterInfo.jhtml',
                    data: {userId: id},
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.filterList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            save () {
                let _vm = this
                _vm.$refs['formAdd'].validate((valid) => {
                    if(valid) {
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: 'guard-webManager/customerFilter/save.jhtml',
                            data: _vm.formAdd,
                            success: function(res){
                                console.log(res)
                                if(res.data.code == 0) {
                                    _vm.$router.push('/customerFilter')
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                    _vm.saveLoad = false
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    }
                })
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>


