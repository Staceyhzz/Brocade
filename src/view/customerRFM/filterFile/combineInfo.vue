/**
 * 合并结果集页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>合并结果集</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :rules="ruleForm" :model="formAdd" label-position="right">
                <Form-item label="结果集1" prop='filter1' required>
                    <Select v-model="formAdd.filter1" style="width:300px">
                        <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="结果集2" prop='filter2' required>
                    <Select v-model="formAdd.filter2" style="width:300px">
                        <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="合并类型" prop="type" class='radioModal' required>
                    <Radio-group v-model="formAdd.type">
                        <Form-item>
                            <Radio :label="1">同时在结果集1和结果集2</Radio>
                        </Form-item>
                        <Form-item>
                            <Radio :label="2">在结果集1或结果集2</Radio>
                        </Form-item>
                            <Radio :label="3">在结果集1但不在结果集2</Radio>
                        </Radio-group>
                    </Radio-group>
                </Form-item>
                <Form-item label="保存结果" prop='result' required>
                    <Radio-group v-model="formAdd.result" style="width:500px">
                        <Form-item prop="filter3">
                            <Radio :label="1">覆盖现有结果集</Radio>
                            <Select v-model="formAdd.filter3" style="width:300px">
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
            const validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择结果集'));
                } else {
                    callback();
                }
            };
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
                saveLoad: false,
                formAdd: {
                    filter1: '',
                    filter2: '',
                    type: 1,
                    result: 1,
                    filter3: '',
                    name: '',
                },
                groupList: [],
                filterList: [],
                categoryList: [],
                ruleForm: {
                    filter1: [
                        { validator: validateType, trigger: 'change' }
                    ],
                    filter2: [
                        { validator: validateType, trigger: 'change' }
                    ],
                    filter3: [
                        { validator: validateFil, trigger: 'change' }
                    ],
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.getFilterList(localStorage.getItem('userId'))
        },
        methods: {
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
                            url: 'guard-webManager/customerFilter/combineEdit.jhtml',
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


