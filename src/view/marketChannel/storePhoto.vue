/**
 * 设置头像页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>设置渠道商图片</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
                <Form-item label="选择头像" required  prop='uploadList'>
                    <div class="upload-list" v-for="(item, index) in showList" :key='item'>
                        <img :src="item">
                        <div class="upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                        </div>
                    </div>
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
        <Modal title="查看图片" v-model="visible">
            <img :src="modalUrl" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            const validateImg = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择图片'));
                } else {
                    callback();
                }
            };
            return {
                saveLoad: false,
                visible: false,
                modalUrl: '',
                showList: [],
                uploadList: [],
                formValidate: {
                    uploadList: [],
                },
                ruleForm: {
                    uploadList: [
                        { validator: validateImg, trigger: 'change' }
                    ]
                }
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        methods: {
            // 上传之前
            handleBeforeUpload (data) {
                console.log(data)
                let translateBase = 10485760
                if(/\.(gif|jpg|jpeg|bmp|png)$/.test((data.name).toLowerCase())) {
                    if(data.size < translateBase) {
                        this.formValidate.uploadList.splice(0, 1, data)
                        this.showList.splice(0, 1, this.getObjectURL(data))
                    } else {
                        this.$Notice.error({
                            title: '系统提示！',
                            desc: '头像大小不能超过10M！'
                        })
                    }
                } else {
                    this.$Notice.error({
                        title: '系统提示！',
                        desc: '请选择gif、jpg、jpeg、bmp、png图片！'
                    })
                }
                return false
            },
            //弹窗展示
            handleView (data) {
                this.modalUrl = data
                this.visible = true
            },
            // 删除
            handleRemove (index) {
                this.showList.splice(0)
                this.formValidate.uploadList.splice(0)
            },
            //展示小图片
            getObjectURL (file) {
                let url = null
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file)
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
            },
            save () {
                let _vm = this,
                    param = new FormData() //创建form对象
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        _vm.saveLoad = true
                        param.append('file', _vm.formValidate.uploadList[0])
                        param.append('chunks', '0')
                        param.append('storeID', sessionStorage.getItem('storeId'))
                        _vm.$http.upload({
                            url: 'guard-webManager/store/updateStoreImage.jhtml',
                            data: param,
                            success: function(res){
                                console.log(res)
                                if(res.data.code == 0) {
                                    _vm.$router.push('/storeRecord')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '添加成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                    _vm.saveLoad = false
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
            }
        }
    }
</script>



