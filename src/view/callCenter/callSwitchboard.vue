/**
 * 呼叫中心流程
 */

<template>
	<div class="container-box call-center">
		<div class="container-header">
            <h2>总机管理</h2>
        </div>
        <div class="container-body">
            <h3 class="call-tit">新建呼叫中心流程</h3>
            <div class="step">
                <Steps :current="0" size="small" class='step-box'>
                    <Step title="1.设置总机号码" icon='checkmark-circled'></Step>
                    <Step title="2.设置接听模式" icon='checkmark-circled'></Step>
                    <Step title="3.完成" icon='checkmark-circled'></Step>
                </Steps>
            </div>
            <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="120" label-position="left">
                <Row>
                    <Col :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
                        <Form-item label="总机号码" prop="switchNumber">
                            <Input v-model.trim="formAdd.switchNumber" :maxlength='20' placeholder='医院总机号码(必须带区号，首字符为0)'></Input>
                        </Form-item>
                        <!-- <Form-item label="分机号码" prop="number">
                            <Input v-model.trim="formAdd.number" :maxlength='20' placeholder='请填写分机号码'></Input>
                        </Form-item>
                        <Form-item label="认证密码" prop="password">
                            <Input v-model.trim="formAdd.password" :maxlength='20' type="password" placeholder='请填写密码'></Input>
                        </Form-item>
                        <Form-item label="用户私有数据" prop="d">
                            <Input v-model.trim="formAdd.d" :maxlength='20' placeholder='请填写用户私有数据'></Input>
                        </Form-item>
                        <Form-item label="呼叫请求鉴权服务器" prop="e">
                            <Input v-model.trim="formAdd.e" :maxlength='100' placeholder='请填写URL地址'></Input>
                        </Form-item> -->
                    </Col>
                    <Col span='10' offset='7'>
                        <Button type="primary" long @click='save'>下一步</Button>
                    </Col>
                </Row>
            </Form>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'view_callSwitchboard',
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入总机号码'))
                } else if(/^[0]\d{1,}$/.test(value)) {
                    callback() 
                } else {
                    callback(new Error('请输入正确格式，首字符为0，带区号'))
                }
            }
            return {
                saveLoad: false,
                formAdd: {
                    switchNumber: '',
                },
                ruleForm: {
                    switchNumber: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                }
            }
        },
        activated () {
            console.log(111111111)
            this.$store.dispatch('setPageLoading', 1)
        },
        beforeRouteEnter (to, from, next) {
            console.log(33333333333)
            next(vm => {
                if(from.path !== '/callPattern') {
                    vm.$refs.formAdd.resetFields()
                }
            })
        },
        methods: {
            save () {
                let _vm = this
                _vm.$refs['formAdd'].validate((valid) => { 
                    if (valid) {
                        let breadData = [
                            {
                                url: '/desktop',
                                text: '桌面'
                            },
                            {
                                url: '/callCenter',
                                text: '呼叫中心'
                            },
                            {
                                url: '/callPattern',
                                text: '设置接听模式'
                            },
                        ]
                        _vm.$store.dispatch('setBreadData', breadData)
                        _vm.$router.push({
                            path: '/callPattern',
                            query: {
                                id: _vm.formAdd.switchNumber
                            }
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .call-tit {
        margin: 10px 0 20px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #181818;
    }
    .step {
        margin: 0 12.5% 30px;
    }
</style>