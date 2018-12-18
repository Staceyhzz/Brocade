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
            	<Form-item label="可使用医院" prop="hospitalIds" required v-if="isGroupHospital">
                    <Select v-model="hospBox" style="width:300px" @on-change='hospTags' :clearable='true' ref='select' placeholder='请选择，可多选'>
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <div class="tagbox">
                        <div class="tagItem" v-for='(item, index) in tagBox' :key='item.name' @click.capture='tagClose(index)'>
                            <Tag type="border" closable color="blue">{{item.name}}</Tag>
                        </div>
                    </div>
                </Form-item>
                <Form-item label="标题" prop="title" required>
                    <Input type="text" placeholder="标题" v-model.trim="formValidate.title" :maxlength="20"></Input>
                </Form-item>
                <Form-item label="发布人" prop="creator" required>
                    <Input type="text" placeholder="发布人" v-model.trim="formValidate.creator" :maxlength="20"></Input>
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
                } else {
                    callback();
                }
            };
            const validateCreator = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入发布人'));
                } else {
                    callback();
                }
            };
            const validateHosp = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择医院'));
                } else {
                    callback();
                }
            };
            return {
                saveLoad: false,
                key: true,
                titMsg: '',
                detailList: [],
                formValidate: {
                    hospitalIds: [],
                    title: '',
                    creator: '',
                    content: '',
                    detailListStr: ''
                },
                ruleForm: {
                    title: [
                        { validator: validateTitle, trigger: 'blur' }
                    ],
                    creator: [
                       { validator: validateCreator, trigger: 'blur' }
                    ],
                    content: [
                        { validator: validateText, trigger: 'blur' }
                    ],
                    hospitalIds: [
                        { validator: validateHosp, trigger: 'blur' }
                    ],
                },
                tagBox: [],
                hospBox: '',
                isGroupHospital: false,
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            }
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {})
        },
        created () {
            this.formValidate.id = this.$route.query.id
            if(this.$route.query.type == '1') {
                this.titMsg = '修改公告'
                this.getId()
            } else {
                this.titMsg = '添加公告'
                this.key = false
                this.$store.dispatch('setPageLoading', 1)
            }
            this.judgeGroupHospital()
        },
        methods: {
            setContent (data) {
                this.formValidate.content = data
            },
            judgeGroupHospital () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/notice/isGroupHospital.jhtml',
                    success:  function(res) {
                        if(res.data.code == 0){
                            _vm.isGroupHospital =  res.data.content
                        } else{
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res) {
                        console.log(res)
                    }
                })
            },
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.$http.get({
                    url: 'guard-webManager/notice/getUpdate.jhtml',
                    data: {id: _vm.formValidate.id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res.data.content)
                            _vm.formValidate.title = res.data.content.title
                            _vm.formValidate.content = res.data.content.content
                            _vm.formValidate.creator = res.data.content.creator
                            _vm.tagBox = res.data.content.hospitalList
                            for(let i=0;i<_vm.tagBox.length;i++){
                                _vm.tagBox[i]['id'] = _vm.tagBox[i]['hospitalid']
                                _vm.tagBox[i]['name'] = _vm.tagBox[i]['hospitalName']
                                _vm.formValidate.hospitalIds.push(_vm.tagBox[i]['id'])
                                _vm.detailList.push({HospitalID: _vm.tagBox[i]['id']})
                            }
                            _vm.formValidate.detailListStr = JSON.stringify( _vm.detailList )
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
            //医院多选标签
            hospTags (id) {
                var _vm = this;
                var bool = 0
                for(var index of _vm.formValidate.hospitalIds) {
                    console.log(index)
                    if(id == index) {
                        bool = 1
                        console.log(bool)
                    }
                }
                if(bool == 0 && typeof id != 'string') {
                    for(let i in _vm.hospList) {
                        if(_vm.hospList[i].id == id) {
                            _vm.tagBox.push(_vm.hospList[i])
                        }
                    }
                    _vm.formValidate.hospitalIds.push(id)
                    _vm.detailList.push({HospitalID: id})
                }
               
                if(_vm.formValidate.hospitalIds.length > 0) {
                    _vm.formValidate.detailListStr = JSON.stringify( _vm.detailList )
                } else{
                    _vm.formValidate.detailListStr = ''
                }
            },
            // 删除医院标签
            tagClose (index) {
                this.tagBox.splice(index, 1)
                this.formValidate.hospitalIds.splice(index, 1)
                this.$refs['select'].clearSingleSelect()
            },
            save () {
                let _vm = this,
                    _url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            _url = 'guard-webManager/notice/update.jhtml'
                        } else {
                            _url = 'guard-webManager/notice/add.jhtml'
                        }
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: _url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/notice')
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