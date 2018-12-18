/** * 素材管理 */
<template>
<div class="container-box">
    <div class="container-header">
    <h2>素材管理</h2>
    </div>
    <div class="container-mer">
        <div class="button" style="width:100%;">
            <span style="float:left;width:100%;">你可以在这里添加、删除或者修改你的图文素材</span>
            <button @click="addpic">＋添加图文信息</button>
            <router-link to="/wechatpublicnumber">
                <button style="width:70px;">返回</button>
            </router-link>
        </div>
        <div class="lent" style="float:left;">
            <ul>
                <li v-for="(rbq, index) in rbqs" :key="index">
                    <h4>{{ rbq.title }}</h4>
                    <h4>{{ rbq.author }}</h4>
                    <img :src="rbq.thumb_url" alt="">
                    <h4 style="margin-top:10px;">{{ rbq.digest }}</h4>
                    <Button @click="edit(index)" type="primary">编辑</Button>
                    <Button @click="remove(index)" type="error">删除</Button>
                </li>
            </ul>
        </div>
    </div>
    <Modal width="60%" title="添加素材" v-model="modal10" @on-ok="saveFile" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="42">
            <FormItem label="" prop="title">
                <Input v-model="formValidate.title" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="" prop="name">
                <Input v-model="formValidate.name" placeholder="作者（选填）"></Input>
            </FormItem>
            <FormItem label="" prop="uploadList">
                <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:90px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">推荐jpg.png尺寸640*640,不超过1M的图像</p>
                </div>
                <div class="upload-list" v-for="(item, index) in shertList" :key='item'>
                    <img :src="item">
                    <div class="upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                    </div>
                </div>
            </FormItem>
            <FormItem label="" prop="abstract">
                <Input v-model="formValidate.abstract" placeholder="摘要（选填，该摘要只在发送图文消息为单条时显示）"></Input>
            </FormItem>
            <FormItem label="正文" prop="content">
                <cmptUeditor :value='formValidate.content' @setUedContent='setContent'></cmptUeditor>
            </FormItem>
            <FormItem label="" prop="Connect">
                <Input v-model="formValidate.Connect" placeholder="原方连接（选填）"></Input>
            </FormItem>
        </Form>
    </Modal>
    <!-- 编辑 -->
    <Modal width="60%" title="添加素材" v-model="modal22" @on-ok="sent" class-name="vertical-center-modal">
        <Form ref="formrund" :model="formrund" :rules="ruleValidate" :label-width="42">
            <FormItem label="" prop="id">
                <Input v-model="formrund.id" placeholder="编号"></Input>
            </FormItem>
            <FormItem label="" prop="title">
                <Input v-model="formrund.title" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="" prop="name">
                <Input v-model="formrund.name" placeholder="作者（选填）"></Input>
            </FormItem>
            <FormItem label="" prop="uploadList">
                <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUploadd"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:90px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">推荐jpg.png尺寸640*640,不超过1M的图像</p>
                </div>
                <div  class="upload-list">
                    <img :src="formrund.logo" alt="">
                    <div class="upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handlemove"></Icon>
                    </div>
                </div>
                <div class="upload-list" v-for="(item, index) in shentList" :key='item'>
                    <img :src="item">
                    <div class="upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                    </div>
                </div>
            </FormItem>
            <FormItem label="" prop="abstract">
                <Input v-model="formrund.abstract" placeholder="摘要（选填，该摘要只在发送图文消息为单条时显示）"></Input>
            </FormItem>
            <FormItem label="正文" prop="content">
                <cmptUeditor :value='formrund.content' @setUedContent='setContent'></cmptUeditor>
            </FormItem>
            <FormItem label="" prop="Connect">
                <Input v-model="formrund.Connect" placeholder="原方连接（选填）"></Input>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>

<script>
export default {
    data() {
      	return {
            orderid: '',
            rbqs: [],
            url: [], // 原文连接
            content: [], // 内容
            digest: [], // 摘要
            img: [], // 图片
            mediaid: [], // 文章ID
            title: [], // 标题
            author: [], // 作者
            modal22: false,
            shertList: [],
            shentList: [],
            appid: '',
            modal10: false,
            formValidate: {
                title: '',
                name: '',
                abstract: '',
                content: '',
                Connect: '',
                uploadList: []
            },
            formrund: {
                logo: [],
                medid: '',
                title: '',
                name: '',
                abstract: '',
                content: '',
                Connect: '',
                uploadList: []
            },
            ruleValidate: {},
      	}
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
        console.log(this.$route.query.id)
        this.appid = this.$route.query.id;
        this.material()
    },
    watch: {
        '$route'(to,from){
            this.appid = this.$route.query.id;
            this.material()
        }
    },
    methods: {
        // 列表
        material() {
            console.log('素材管理APPID')
            console.log(this.appid)
            var self = this
            self.$http.get({
                url: '/guard-webManager/WxNewsMaterial/list.jhtml',
                data: {
                    appid : self.appid,
                },
                success: function(res){
                    console.log('素材管理列表')
                    console.log(JSON.parse(res.data.content).item.map(item => item.content.news_item[0]))
                    self.rbqs = JSON.parse(res.data.content).item.map(item => item.content.news_item[0])
                    self.mediaid = JSON.parse(res.data.content).item.map(item => item.media_id)
                    self.title = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].title)
                    self.author = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].author)
                    self.img = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].thumb_url.substring(126, -8))
                    console.log(JSON.parse(res.data.content).item.map(item => item.content.news_item[0].thumb_url.substring(126, -8)))
                    self.digest = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].digest)
                    self.content = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].content)
                    self.url = JSON.parse(res.data.content).item.map(item => item.content.news_item[0].content_source_url)
                    console.log(JSON.parse(res.data.content).item.map(item => item.content.news_item[0])) 
                    console.log(JSON.parse(res.data.content).item.map(item => item.media_id))   
                },
            }) 
        },
        // 添加
        addpic() {
            this.formValidate.title = ''
            this.formValidate.name = ''
            this.formValidate.abstract = ''
            this.formValidate.content = ''
            this.formValidate.Connect = ''
            this.shertList.splice(0);
            this.modal10 = true
        },
        // 删除
        remove(index) {
            var self = this
            self.$http.post({
                url: '/guard-webManager/WxNewsMaterial/delete.jhtml',
                data: {
                    appid : self.appid,
                    mediaid : self.mediaid[index]
                },
                success: function(res){
                    self.$Message.success('删除成功');
                    self.material()
                },
            }) 
        },
        setContent (data) {
            this.formValidate.content = data
        },
        //展示小图片
        getObjectURL(file) {
            let url = null
            if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file)
            } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file)
            }
            return url
        },
        // 上传之前
        handleBeforeUpload(data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.formValidate.uploadList.splice(0, 1, data);
                    this.shertList.splice(0, 1, this.getObjectURL(data));
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
        // 上传
        saveFile () {
            var self = this,
            param = new FormData()
            if(self.formValidate.title == '') {
                this.$Message.error('请填写完整表单!');
                return false
            }
            if(self.formValidate.name == '') {
                this.$Message.error('请填写完整表单!');
                return false
            }
            if(self.formValidate.abstract == '') {
                this.$Message.error('请填写完整表单!');
                return false
            }
            if(self.formValidate.content == '') {
                this.$Message.error('请填写完整表单!');
                return false
            }
            if(self.formValidate.Connect == '') {
                this.$Message.error('请填写完整表单!');
                return false
            }
            if(self.formValidate.uploadList == '') {
                  this.$Message.error('请填写完整表单!');
                return false
            }
			if(self.formValidate.uploadList.length === 0) {
			} else {
				param.append('pic', self.formValidate.uploadList[0])
			}
            param.append('appid', self.appid)
            param.append('title', self.formValidate.title)
            param.append('author', self.formValidate.name)
            param.append('digest', self.formValidate.abstract)
            param.append('content', self.formValidate.content)
            param.append('content_source_url', self.formValidate.Connect)
            param.append('token', self.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxNewsMaterial/add.jhtml',
                data: param,
                success: function(res){ 
					console.log(res)
					self.material()
                    if(res.code === 0) {
                        self.formValidate = res.content || ''
                    } else {
						self.$Message.success('添加成功');
                    }
                },
            })  
        },
        // 编辑
        edit(index) {
            console.log(index)
            this.modal22 = true
            this.formrund.id = this.mediaid[index]
            this.formrund.title = this.title[index]
            this.formrund.name = this.author[index]
            this.formrund.logo = this.img[index]
            this.formrund.abstract = this.digest[index]
            this.formrund.content = this.content[index]
            this.formrund.Connect = this.url[index]
            console.log('asdasdasdasdas')
            console.log(this.formrund.id)
        },
        // 每次更改的时候必须在上传一次图片、后台接口设定
        sent() {
            var self = this,
            param = new FormData()
			if(self.formrund.uploadList.length === 0) {
				// console.log('A')
				// console.log(self.formrund.uploadList.length === 0)
				// console.log('b')
				// param.append('pic', null)
				// console.log(param.append('pic', null))	
			} else {
				param.append('pic', self.formrund.uploadList[0])
				// console.log('AAAVBBBBBB')
				// console.log(param.append('pic', self.formrund.uploadList[0]))
			}
			// param.append('pic', self.formrund.uploadList[0])
            param.append('appid', self.appid)
            param.append('mediaid',self.formrund.id)
            param.append('title', self.formrund.title)
            param.append('author', self.formrund.name)
            param.append('digest', self.formrund.abstract)
            param.append('content', self.formrund.content)
            param.append('content_source_url', self.formrund.Connect)
            param.append('token', self.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxNewsMaterial/update.jhtml',
                data: param,
                success: function(res){ 
					console.log(res)
                    if(res.code === 0) {
                        self.formrund = res.content || ''
                    } else {
                        self.material()
						self.$Message.success('添加成功');
                    }
                },
            })  
        },
        // 上传之前
        handleBeforeUploadd(data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.formrund.uploadList.splice(0, 1, data);
                    this.shentList.splice(0, 1, this.getObjectURL(data));
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
        handleRemove(index) {
            this.shertList.splice(0);
            this.shentList.splice(0);
        },
        handlemove() {
            this.formrund.logo = ''
        }
    }
}

</script>
<style lang='less'>
.edui-default .edui-editor-iframeholder {
    width: 100% !important;
}
.edui-default .edui-editor {
    width: 100% !important;
}
#edui129_iframeholder {
    width: 100% !important;
}
.container-mer {
    float: left;
    width: 100%;
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 7px 14px 0 rgba(42, 42, 68, 0.1);
	a {
		color: blue;
    }
    .button {
        button {
            width: 100px;
            height: 40px;
            margin: 30px 20px 0 0;
            cursor: pointer;
            color: white;
            outline: none;
            border: #169bd5;
            border-radius: 5px;
            background: #169bd5;
        }
        button:active {
            background: #1291c9;
        }
    }
    .lent li {
        float: left;
        width: 250px;
        // height: 300px;
        padding: 20px;
        margin-top: 20px;
        margin-left: 20px;
        background: #f2f4f8;
        img {
            width: 200px;
        }
        button {
            margin-top: 10px;
        }
        h4 {
            margin-bottom: 5px; 
        }
    }
}

</style>