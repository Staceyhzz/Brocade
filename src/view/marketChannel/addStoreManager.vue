/**
 * 添加负责人
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>添加负责人</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" :model="formValidate" ref='formValidate' :rules="ruleForm">
                <Form-item label="用户" prop='userid'>
                    {{name}}
                </Form-item>
                <Form-item label="渠道" prop='storeId' required>
                    <cmptRemoteFilterStore :_style="{width:'300px'}" _placeHolder="选择渠道" @setStoreName="setStore"></cmptRemoteFilterStore>
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
                    callback(new Error('请选择信息'));
                } else {
                    callback();
                }
            }
            return {
                name: '',
                formValidate: {
                    userId:'',
                    storeId: ''
                },
                ruleForm: {
                    storeId: [
                        { validator: validateList, trigger: 'change' }
                    ],
                },
                saveLoad: false
            }
        },
        created () {
            this.name = this.$route.query.name
            this.$store.dispatch('setPageLoading', 1)
        },
        methods: {
            save () {
                let _this = this
                _this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        _this.saveLoad = true
                        _this.$http.post({
                            url: 'guard-webManager/storeManager/add.jhtml',
                            data: {
                                userId: _this.$route.query.id,
                                storeId: _this.formValidate.storeId
                            },
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _this.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                    _this.$router.push({
                                        path: '/storeManagerList',
                                        query: {
                                            id: _this.$route.query.id
                                        }
                                    })
                                } else {
                                    _this.saveLoad = false
                                    _this.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                }
                            },
                            error: function(res) {
                                console.log(res)
                            }
                        })
                    } else{
                        _this.saveLoad = false
                    }
                })
                
            },
            back () {
                this.$router.back(-1)
            },
            setStore (data) {
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