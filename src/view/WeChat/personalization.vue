/** * 个性化设置 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>个性化设置</h2>
		</div>
		<div class="container-body">
            <Form ref="formMes" :model="formMes" :rules="ruleForm" :label-width="120" label-position="left">
                <FormItem label="佣金名称" prop="yoj">
                    <Input v-model="formMes.value" placeholder="佣金" style="float:left;width: 90px;margin:0 40px 0 0;"></Input><p style="float:left;color:#aeaeae;">12字符长度限制</p>
                </FormItem>
                <FormItem label="医院照片" prop="logo">
                    <div class="upload-photo-item">
                        <Upload
                            ref="upload"
                            :before-upload="handleBeforeUpload"
                            type="drag"
                            action="//"
                            style="display: inline-block;width:90px;float:left;margin:0 40px 0 0;">
                            <div class="photo-content">
                                <div class="photo-icon"></div>
                                <p>上传照片</p>
                            </div>
                        </Upload>
                        <p style="float:left;color:#aeaeae;" class="photo-msg">推荐jpg.png尺寸640*640,不超过1M的图像</p>
                        <div class="photo-list" v-show='formMes.logo.length > 0'>
                            <img :src='formMes.logo'>
                            <div class="upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                            </div>
                        </div>
                    </div>
                </FormItem>
                <Button type="primary" @click="handleSubmit('formMes')">保存</Button>
            </Form>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      	return {
            formMes: {
                value: '',
                logo: '',
            },
            ruleForm: {

            }  
      	}
    },
    created() {
    
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        // 上传的接口
        handleBeforeUpload (data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    // this.saveFile(data)
                } else {
                    this.$Notice.error({
                        title: '系统提示！',
                        desc: '图片大小不能超过1M！'
                    })
                }
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '请选择jpg、png图片！'
                })
            }
            return false
        },
        // 删除图片
        handleRemove () {
            this.formMes.logo = ''
        },
    }
}

</script>
<style lang='less' scoped>
.container-body {

}
</style>