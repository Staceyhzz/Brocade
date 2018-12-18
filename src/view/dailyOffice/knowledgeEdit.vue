/**
 * 添加/修改知识
 */
<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
            	<Form-item label="知识分类" prop="categoryId" required style="width:400px">
	               <Select v-model="formValidate.categoryId" placeholder="请选择知识分类" clearable>
	                    <Option v-for="item in knowCategoryData" :value="item.id" :key="item.id">{{item.name}}</Option>
	                </Select>
	            </Form-item>
	            <Form-item label="标题" prop="title" required style="width:400px">
	                <Input v-model.trim="formValidate.title" placeholder="请输入名称" :maxlength="20"></Input>
	            </Form-item>
                <Form-item label="内容" prop='content' required>
                    <cmptUeditor :value='formValidate.content' @setUedContent='setContent'></cmptUeditor>
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
            const validateText = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else {
                    callback();
                }
            };
            const validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入标题'));
                }else {
                    callback();
                }
            };
            const validateCateGoryId = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择知识分类'));
                } else {
                    callback();
                }
            };
            return {
            	knowCategoryData: [],
                saveLoad: false,
                key: true,
                titMsg: '',
                formValidate: {
                    id: '',
                    title: '',
                    categoryId: '',
                    content: ''
                },
                ruleForm: {
                    categoryId: [
                        { validator: validateCateGoryId, trigger: 'blur' }
                    ],
                    title: [
                       { validator: validateTitle, trigger: 'blur' }
                    ],
                    content: [
                        { validator: validateText, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.formValidate.id = this.$route.query.id
            if(this.$route.query.type == '1') {
                this.titMsg = '修改知识'
                this.getId()
            } else {
                this.titMsg = '添加知识'
                this.key = false
                this.$store.dispatch('setPageLoading', 1)
            }
            this.getKnowCategoryList()
        },
        methods: {
        	 getKnowCategoryList () {
                let _this = this
                _this.$http.get({
                    url: 'guard-webManager/select/knowledgeCategoryInfo.jhtml',
                    data: {},
                    success: function(res){
                        if(res.data.code == 0 ){
                            _this.knowCategoryData = res.data.content
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            setContent (data) {
                this.formValidate.content = data
            },
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.$http.get({
                    url: 'guard-webManager/knowledge/getUpdate.jhtml',
                    data: {id: _vm.formValidate.id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res.data.content)
                            _vm.formValidate.categoryId = res.data.content.categoryid
                            _vm.formValidate.title = res.data.content.title
                            _vm.formValidate.content = res.data.content.content
                            _vm.$store.dispatch('setPageLoading', 1);
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            save () {
                let _vm = this,
                    _url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            _url = 'guard-webManager/knowledge/update.jhtml'
                        } else {
                            _url = 'guard-webManager/knowledge/add.jhtml'
                        }
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: _url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/knowledge')
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                    _vm.saveLoad = false
                                }
                            },
                            error: function(res){
                                console.log(res)
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