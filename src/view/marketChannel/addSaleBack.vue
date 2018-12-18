/**
 * 添加回款
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>添加回款</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" :model="formValidate" ref='formValidate' :rules="ruleForm">
                <Form-item label="渠道" prop='storeId'>
                    <cmptRemoteFilterStore :_style="{width:'162px'}" _placeHolder="选择渠道" @setStoreName="setStore"></cmptRemoteFilterStore>
                </Form-item>
                <Form-item label="回款日期" prop='date'>
                    <Date-picker :transfer='true' width="180" type="date" placeholder="请选择日期" :value="formValidate.date" @on-change='getDate' ref="getDate"></Date-picker>
                </Form-item>
                <Form-item label="回款金额" prop='amount'>
                    <Input v-model="formValidate.amount" type="text" placeholder="请输入回款金额"></Input>
                </Form-item>
                <Form-item label="备注" prop='remark'>
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </Form-item>
            </Form>
            <div class="button-box">
                <Button type="primary"  icon="checkmark-round" :loading='saveLoad' @click="save" class="save-button">保存</Button>
                <Button type="warning"  icon="reply" @click="back">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择负责人'));
                } else {
                    callback();
                }
            }
            const validateDate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择回款日期'));
                } else {
                    callback();
                }
            }
            const validateAmount = (rule, value, callback) => {
                if (value === '') {
                    console.log(value)
                    callback(new Error('请选择回款金额'));
                } else {
                    callback();
                }
            }
            return {
                formValidate: {
                    userId:'',
                    date: '',
                    amount: '',
                    remark: '',
                    storeId:''
                },
                ruleForm: {
                    storeId: [
                        {required: true, validator: validateList, trigger: 'change' }
                    ],
                    date: [
                        {required: true, validator: validateDate, trigger: 'blur' }
                    ],
                    amount: [
                        {required: true, validator: validateAmount, trigger: 'blur'}
                    ]
                },
                saveLoad: false
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        methods: {
            getDate (date) {
                this.formValidate.date = date
            },
            save () {
                let _this = this
                console.log(_this.formValidate)
                 _this.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        _this.saveLoad = true
                        _this.$http.post({
                            url: 'guard-webManager/saleBack/add.jhtml',
                            data: {
                                storeId: _this.formValidate.storeId,
                                createDate: _this.formValidate.date,
                                amount: _this.formValidate.amount,
                                remark: _this.formValidate.remark
                            },
                            success: function(res){
                                if(res.data.code == 0){
                                    _this.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                    _this.$router.push({
                                        path: '/saleBack'
                                    })
                                } else {
                                    _this.saveLoad = false
                                    _this.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    }
                })
                
            },
            back () {
                this.$router.back(-1)
            },
            setStore (data) {
                console.log(data)
                this.formValidate.storeId = data.id
            }
        }
    }

</script>

<style>
    .depositChargeEdit .radioModal .ivu-radio-wrapper {
        display: block;
    }
    .button-box{
        border-top: 1px solid  #dedede;
        padding: 20px 0;
        text-align: center;
    }
    .button-box .save-button {
        margin-right: 20px;
    }
</style>