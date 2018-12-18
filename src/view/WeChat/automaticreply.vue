/** * 自动回复 */
import treatmentxqVue from '../../../../operate/src/components/order/treatmentmanagement/treatmentxq.vue';
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>自动回复</h2>
		</div>
		<div class="container-body">
            <div style="float:left;width:100%;margin-bottom:30px;">
                <router-link to="/wechatpublicnumber">
                    <button>返回</button>
                </router-link>
            </div>
            <div class="reply-one">
                <div style="float:left;width:100%;padding:40px;border-bottom:1px solid #eaebed;">
                    <span>被关注后自动回复</span>
                    <span style="margin-top:20px;">当你的公众号被关注后自动回复一条信息给你的订阅用户</span>
                </div>
                <div style="float:left;width:90%;margin:20px 0 0 40px;padding:20px;background:#f9fafc;border:1px solid #eaebed;">
                    <textarea style="resize:none" v-model="formValidate.work"></textarea>
                </div>
                <button @click="modal9 = true" style="width:85px;margin: 30px 0 0 40px;"><Icon type="ios-plus-empty" size="30"></Icon><span style="float:right;width:30px;margin:5px 18px 0 0;font-size:14px;">修改</span></button>
            </div>
            <div class="reply-two">
                <div style="float:left;width:100%;padding:40px;">
                    <span style="float:left;width:100%;margin:0 0 20px 0;">添加关键词自动回复规则</span>
                    <span>当订阅用户的行为符合关键词自动回复规则的时候，就会收到自动回复的消息</span>
                </div>
                <button @click="addto" style="width:160px;margin: 30px 0 0 40px;"><Icon type="ios-plus-empty" size="30"></Icon><span style="float:right;width:90px;margin:6px 18px 0 0;">添加关键词规则</span></button>
            </div>
			<div class="reply-three">
				<Table stripe :columns="col" :data="data"></Table>
			</div>
		</div>
        <!-- 修改关注回复 -->
        <Modal title="修改关注回复" v-model="modal9" @on-ok="save" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate">
                <Tabs>
                    <TabPane label="文字" icon="edit">
                        <FormItem prop="mail">
                            <Input style="margin-top:30px;" v-model="formValidate.work" placeholder="请输入文字内容"></Input>
                        </FormItem>
                        <span style="color:red;cursor: pointer;" @click="handleReset"><Icon type="trash-a"></Icon>删除</span>
                    </TabPane>
                    <TabPane label="图片" icon="image" prop='uploadList'>
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
                        <div class="upload-list" v-for="(item, index) in shertList" :key='item'>
                            <img :src="item">
                            <div class="upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                            </div>
                        </div>
                    </TabPane>
                    <!-- asdasd -->
                    <TabPane label="图文" icon="images">
                        <div class="lent" style="float:left;">
                            <ul>
                                <li v-for="(rbq, index) in rbqs" :key="index" @click="selectStyle (rbq, index) " :class="{'active':rbq.active,'unactive':!rbq.active}" >
                                    <h4>{{ rbq.title }}</h4>
                                    <h4>{{ rbq.author }}</h4>
                                    <img :src="rbq.thumb_url" alt="">
                                    <h4 style="margin-top:10px;">{{ rbq.digest }}</h4>
                                    <span class="icon" v-show="rbq.active"><Icon color="green" type="checkmark-round"></Icon></span>
                                </li>
                            </ul>
                        </div>
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
        <Modal title="添加关键词自动回复规则" v-model="modal10" @on-ok="saveFile" class-name="vertical-center-modal">
            <Form ref="formunder" :model="formunder">
                <span>添加关键词自动回复规则</span>
                <FormItem prop="rule">
                    <Input v-model="formunder.rule" :maxlength='8' placeholder="请填写规则名称" style="float:left;width:140px;margin-top:10px;"></Input>
                    <p style="float:left;margin: 10px 0 0 30px;color:#969faa;">· 不超过8个字符</p>
                </FormItem>
                <div style="width:100%;">
                    <span style="float:left;width:100%;margin-bottom:10px;">关键词</span>
                    <!-- <Input v-model="value" placeholder="请输入..." style="width: 375px" @on-enter="handleAdd"></Input> -->
                    <!-- <Button icon="ios-plus-empty" type="dashed" @click="handleAdd">添加关键词</Button> -->
                    <!-- <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag> -->
                    <!-- <Button @click="change">数组转化字符串</Button>
                    <Button @click="change1">字符串转化数组</Button> -->
                    <Input v-model="formunder.value" placeholder="请输入..." style="width: 375px"></Input>
                </div>
                <Tabs>
                    <TabPane label="文字" icon="edit">
                        <FormItem prop="mail">
                            <Input style="margin-top:30px;" v-model="formunder.work" placeholder="请输入文字内容"></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane label="图片" icon="image">
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
                        <div class="upload-list" v-for="(item, index) in showList" :key='item'>
                            <img :src="item">
                            <div class="upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="图文" icon="images">
                        <div class="lent" style="float:left;">
                            <ul>
                                <li v-for="(rbq, index) in rbqs" :key="index">
                                    <h4>{{ rbq.title }}</h4>
                                    <h4>{{ rbq.author }}</h4>
                                    <img :src="rbq.thumb_url" alt="">
                                    <h4 style="margin-top:10px;">{{ rbq.digest }}</h4>
                                </li>
                            </ul>
                        </div>
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
		<!-- 修改 -->
		<Modal
			title="修改关键词自动回复"
			v-model="edat"
			@on-ok="enter"
			class-name="vertical-center-modal">
            <Form ref="formend" :model="formend">
                <span>修改关键词自动回复规则</span>
                <FormItem prop="rule">
                    <Input v-model="formend.rule" :maxlength='8' placeholder="请填写规则名称" style="float:left;width:140px;margin-top:10px;"></Input>
                    <p style="float:left;margin: 10px 0 0 30px;color:#969faa;">· 不超过8个字符</p>
                </FormItem>
                <div style="width:100%;">
                    <span style="float:left;width:100%;margin-bottom:10px;">关键词</span>
                    <!-- <Input v-model="value" placeholder="请输入..." style="width: 375px" @on-enter="handleAdd"></Input> -->
                    <!-- <Button icon="ios-plus-empty" type="dashed" @click="handleAdd">添加关键词</Button> -->
                    <!-- <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag> -->
                    <!-- <Button @click="change">数组转化字符串</Button>
                    <Button @click="change1">字符串转化数组</Button> -->
                    <Input v-model="formend.wend" placeholder="请输入..." style="width: 375px"></Input>
                </div>
                <Tabs>
                    <TabPane label="文字" icon="edit">
                        <FormItem prop="mail">
                            <Input style="margin-top:30px;" v-model="formend.worder" placeholder="请输入文字内容"></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane label="图片" icon="image">
                        <div class="upload-photo-item">
                            <Upload
                                ref="upload"
                                :before-upload="handleBeforeUploaddd"
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
                        <div class="upload-list" v-for="(item, index) in shoptList" :key='item'>
                            <img :src="item">
                            <div class="upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="图文" icon="images">
                        <div class="lent" style="float:left;">
                            <ul>
                                <li v-for="(rbq, index) in rbqs" :key="index">
                                    <h4>{{ rbq.title }}</h4>
                                    <h4>{{ rbq.author }}</h4>
                                    <img :src="rbq.thumb_url" alt="">
                                    <h4 style="margin-top:10px;">{{ rbq.digest }}</h4>
                                </li>
                            </ul>
                        </div>
                    </TabPane>
                </Tabs>
            </Form>
		</Modal>
	</div>
</template>

<script>
import Vue from 'vue' 
import { sep } from 'path';
export default {
    data() {
      	return {
            keywond:[],
            mendid: [],
            mediaid: [],
            rbqs: [],
            shoptList: [],
			listid: null,
			edat: false,
            shertList: [],
            replyid: null,
            payAmountArr: [],
            shentList: [],
            showList: [],
            appid: '',
            count:[], 
            modal9: false,
            modal10: false,
            formValidate: {
                id: '',
                work: '',
                logo: '',
                img: '',
                went: '',
                uploadList: [],
            },
            formunder: {
                rule: '',
                value:'', 
                work: '',
                logo: '',
                img: '',
                uploadList: [],
			},
			formend: {
                rule: '',
                wend:'', 
                worder: '',
                logo: '',
                img: '',
                went: '',
                uploadList: [],
			},
			col: [
				{
					title: '规则名称',
					key: 'rule'
				},
				{
					title: '文字',
					key: 'reply'
				},
				{
					title: '图片',
					key: 'asdas',
					render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.row.url
                                },  
                                style: {
                                    float: 'left',
                                    width: '48px',
                                    height: '48px',
                                }
                            }),
                        ]);
                    }
				},
				{
                    title: '操作',
                    key: 'action',
                    width: 185,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
                                    }
                                }
							}, '删除'),
							h('Button', {
                                props: {
                                    type: 'primary',
									size: 'small',
								},
								style: {
									margin: '0 0 0 10px' 
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
                                    }
                                }
							}, '编辑')
                        ]);
                    }
                }
			],
			data: []
      	}
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
        console.log('APPID')
        console.log(this.$route.query.id)
        this.appid = this.$route.query.id;
        console.log('APPID2')
        console.log(this.appid)
        this.listwx()
        this.materia()
    },
    watch: {
        '$route'(to,from){
            this.appid = this.$route.query.id;
            this.listwx()
            this.materia()
        }        
    },
    methods: {
        selectStyle (rbq, index) {
           this.mendid = this.mediaid[index]
　　　　　　this.$nextTick(function () {
　　　　　　　　this.rbqs.forEach(function (rbq) {
　　　　　　　　　　Vue.set(rbq,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(rbq,'active',true);
　　　　　　});
　　　　},
        // 获取素材列表
        materia() {
            var self = this
            self.$http.get({
                url: '/guard-webManager/WxNewsMaterial/list.jhtml',
                data: {
                    appid : self.appid,
                },
                success: function(res){
                    self.rbqs = JSON.parse(res.data.content).item.map(item => item.content.news_item)
                    self.mediaid = JSON.parse(res.data.content).item.map(item => item.media_id)
                    console.log(JSON.parse(res.data.content).item.map(item => item.media_id))
                },
            }) 
        },
        // 获取列表
        listwx() {
            console.log('APPID66')
            console.log(this.appid)
            var self = this
            console.log("APPID55")
            console.log(self.appid)
            self.$http.get({
                url: '/guard-webManager/WxReply/findWxReplyFollowByAppid.jhtml',
                data: {
                    appid : self.appid,
                },
                success: function(res){
                    console.log('获取列表111')
                    console.log(res)

                    console.log("APPID3")
                    console.log(self.appid)
                    const data = res.data.content[0] || [];
                    self.formValidate.work = data.type === 2
                        ? data.url
                        : data.reply;
                        self.replyid = data.ID;
                    self.data = res.data.content
                },
            })  
        },
        // 上传之前
        handleBeforeUploadd(data) {
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
        save () {
			var self = this,
			param = new FormData()
			console.log('avbc')
			console.log(self.formValidate.work)
			if(self.formValidate.uploadList.length === 0) {
				// console.log('A')
				// console.log(self.formValidate.uploadList.length === 0)
				// console.log('b')
				// param.append('pic', null)
				// console.log(param.append('pic', null))	
			} else {
				param.append('pic', self.formValidate.uploadList[0])
				// console.log('AAAVBBBBBB')
				// console.log(param.append('pic', self.formValidate.uploadList[0]))
			}
			// param.append('pic', self.formValidate.uploadList[0])
            param.append('appid', self.appid)
			param.append('id', self.replyid)
			param.append('reply', self.formValidate.work )
            param.append('token', self.$token.readToken('adminToken'))
            if(self.mendid.length === 0) {
				param.append('mediaid', null)
			} else {
				param.append('mediaid', self.mendid)
			}
			// param.append('mediaid', this.mendid)
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxReply/updateEdit.jhtml',
				data: param,
                success: function(res){
                    if(res.code === 0) {
                        self.formValidate = res.data.content || ''
                    } else {
                        self.listwx()
                        self.$Message.success('修改成功');
                    }
                },
			})  
		},
		// 删除关注回复
		handleReset() {
			var self = this
            self.$http.post({
                url: '/guard-webManager/WxReply/delete.jhtml',
                data: {
                    id : self.replyid
                },
                success: function(res){
                    self.$Message.success('删除成功');
                    self.listwx()
                },
            })  
		},
        // 删除关键词自动回复
        remove(data) {
			console.log('asdasdasd')
			console.log(data)
            var self = this
            self.$http.post({
                url: '/guard-webManager/WxReply/deleteKey.jhtml',
                data: {
                    ID : data.ID
                },
                success: function(res){
                    self.$Message.success('删除成功');
                    self.listwx()
                },
            })  
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        // handleAdd () {
        //     if (this.value!=="") {
        //         this.count.push(this.value);
        //         this.value=""
        //     } else {
        //         this.$Message.info('不能为空');
        //     }
        // },
        // handleClose2 (event, name) {
        //     const index = this.count.indexOf(name);
        //     this.count.splice(index, 1);
        // },
        // change(){
        //     console.log(this.count.join(","));
            
        // },
        // change1(){
        //     let string=this.count.join(",")
        //     console.log(string)
        //     console.log(typeof(string))
        //     let arry=string.split(",")
        //     console.log(typeof(arry))
        //     console.log(arry)
        //     console.log(typeof(this.count))
        // },
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
        // 上传
        saveFile () {
            var self = this,
            param = new FormData()
			console.log('avbc')
			console.log(self.formunder.work)
			if(self.formunder.uploadList.length === 0) {
				// console.log('A')
				// console.log(self.formunder.uploadList.length === 0)
				// console.log('b')
				// param.append('pic', null)
				// console.log(param.append('pic', null))	
			} else {
				param.append('pic', self.formunder.uploadList[0])
				// console.log('AAAVBBBBBB')
				// console.log(param.append('pic', self.formunder.uploadList[0]))
			}
			// param.append('pic', self.formunder.uploadList[0])
            param.append('appid', self.appid)
            param.append('rule', self.formunder.rule)
            param.append('keyword', self.formunder.value)
            param.append('reply', self.formunder.work)
            param.append('token', self.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxReply/addKey.jhtml',
                data: param,
                success: function(res){ 
					console.log(res)
					self.listwx()
                    if(res.code === 0) {
                        self.formunder = res.content || ''
                    } else {
						self.$Message.success('添加成功');
                    }
                },
            })  
		},
		// 上传之前
        handleBeforeUpload (data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
					this.formunder.uploadList.splice(0, 1, data);
                    this.showList.splice(0, 1, this.getObjectURL(data));
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
		// 编辑
		edit(data) {
			console.log('56546854524153')
			console.log(data)
			this.edat = true
			this.listid = data.ID	
			this.formend.rule = data.rule
			this.formend.wend = data.keyword
            this.formend.worder = data.reply
		},
        // 编辑
        // 不能修改第一个关键词
		enter() {
            var self = this,
            param = new FormData()
			if(self.formend.uploadList.length === 0) {
				// console.log('A')
				// console.log(self.formend.uploadList.length === 0)
				// console.log('b')
				// param.append('pic', null)
				// console.log(param.append('pic', null))	
			} else {
				param.append('pic', self.formend.uploadList[0])
				// console.log('AAAVBBBBBB')
				// console.log(param.append('pic', self.formend.uploadList[0]))
			}
			// param.append('pic', self.formend.uploadList[0])
			param.append('id', self.listid)
            param.append('appid', self.appid)
            param.append('rule', self.formend.rule)
            param.append('keyword', self.formend.wend)
            param.append('reply', self.formend.worder)
            param.append('token', self.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxReply/updateKeyEdit.jhtml',
                data: param,
                success: function(res){ 
					console.log(res)
					self.listwx()
                    if(res.code === 0) {
                        self.formend = res.content || ''
                    } else {
						self.$Message.success('添加成功');
                    }
                },
            })  
        },
        handleBeforeUploaddd(data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.formend.uploadList.splice(0, 1, data);
                    this.shoptList.splice(0, 1, this.getObjectURL(data));
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
        // 删除
        handleRemove(index) {
            this.showList.splice(0);
            this.shertList.splice(0);
            this.shoptList.splice(0);
        },
        addto() {
            this.modal10 = true
            this.formunder.rule = ''
            this.formunder.value = ''
            this.formunder.work = ''
            this.showList.splice(0);
        }
    }
}

</script>
<style lang='less' scoped>
.container-body {
    width:100%;
    float: left;
	a {
		color: blue;
	}
	h3 {
		margin-top: 50px;
	}
	button {
        float: left;
		width: 100px;
		height: 40px;
		// margin-top: 30px;
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
    .reply-one {
        float: left;
        width: 774px;
        height: 400px;
        margin-right: 50px;
        box-shadow: 1px 7px 14px 0 rgba(42, 42, 68, 0.1);
        span {
            float: left;
            width: 100%;
        }
        textarea {
            width: 100%;
            height: 50px;
            outline: none;
            border: none;
            background: #f9fafc;
        }
    }
    .reply-two {
        float: left;
        width: 750px;
        height: 250px;
        box-shadow: 1px 7px 14px 0 rgba(42, 42, 68, 0.1);
    }
    .reply-three {
        float: left;
        width: 100%;
        margin-top: 30px;
    }
}
.lent li {
    float: left;
    width: 150px;
    padding: 20px;
    margin-top: 20px;
    margin-left: 20px;
    background: #f2f4f8;
    img {
        width: 100px;
    }
    span {
        float: right;
    }
}
.active {
    border: 1px solid #bbbbbc;
}
.unactive {
    color: #000;
}
</style>