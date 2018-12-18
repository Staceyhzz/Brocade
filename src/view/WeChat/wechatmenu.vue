/** * 微信菜单 */
<template>
	<div class="container-box">
        <div class="container-header">
		    <h2>微信菜单</h2>
		</div>
        <div class="container-body">
        <div class="content" style="width:900px;margin:0 auto;">
            <div id="app-menu">
                <!-- 预览窗 -->
                <div class="weixin-preview">
                    <div class="weixin-hd">
                        <div class="weixin-title">{{weixinTitle}}</div>
                    </div>
                    <div class="weixin-bd">
                        <ul class="weixin-menu" id="weixin-menu" >
                            <li v-for="(btn,i) in menu.button" class="menu-item" :class="{current:selectedMenuIndex===i&&selectedMenuLevel()==1}" @click="selectedMenu(i,$event)">
                                <div class="menu-item-title">
                                    <i class="icon_menu_dot"></i>
                                    <span>{{ btn.name }}</span>
                                </div>
                                <ul class="weixin-sub-menu" v-show="selectedMenuIndex===i">
                                    <li v-for="(sub,i2) in btn.sub_button" class="menu-sub-item" :class="{current:selectedSubMenuIndex===i2&&selectedMenuLevel()==2}"  @click.stop="selectedSubMenu(i2,$event)">
                                        <div class="menu-item-title">
                                            <span>{{sub.name}}</span>
                                        </div>
                                    </li>
                                    <li v-if="btn.sub_button.length<5" class="menu-sub-item" @click.stop="addMenu(2)">
                                        <div class="menu-item-title">
                                            <i class="icon14_menu_add"></i>
                                        </div>
                                    </li>
                                    <i class="menu-arrow arrow_out"></i>
                                    <i class="menu-arrow arrow_in"></i>
                                </ul>
                            </li>
                            <li class="menu-item" v-if="menu.button.length<3" @click="addMenu(1)"> <i class="icon14_menu_add"></i></li>
                        </ul>
                    </div>
                </div>
                <!-- 主菜单 -->
                <div class="weixin-menu-detail" v-if="selectedMenuLevel()==1">
                    <div class="menu-input-group" style="border-bottom: 2px #e8e8e8 solid;">
                        <div class="menu-name">{{menu.button[selectedMenuIndex].name}}</div>
                        <div class="menu-del" @click="delMenu">删除菜单</div>
                    </div>
                    <div class="menu-input-group">
                        <div class="menu-label">菜单名称</div>
                        <div class="menu-input">
                            <input type="text" name="name" placeholder="请输入菜单名称" class="menu-input-text" v-model="menu.button[selectedMenuIndex].name" @input="checkMenuName(menu.button[selectedMenuIndex].name)">
                            <p class="menu-tips" style="color:#e15f63" v-show="menuNameBounds">字数超过上限</p>
                            <p class="menu-tips">字数不超过4个汉字或8个字母</p>
                        </div>
                    </div>
                    <template v-if="menu.button[selectedMenuIndex].sub_button.length==0">
                        <div class="menu-input-group">
                            <div class="menu-label">菜单内容</div>
                            <div class="menu-input">
                                <select v-model="menu.button[selectedMenuIndex].type" name="type" class="menu-input-text">
                                    <option value="view">跳转网页</option>
                                    <option value="click">发送消息</option>
                                </select>
                            </div>
                        </div>
                        <div class="menu-content" v-if="selectedMenuType()==1">
                            <div class="menu-input-group">
                                <p class="menu-tips">订阅者点击该子菜单会跳到以下链接</p>
                                <div class="menu-label">页面地址</div>
                                <div class="menu-input">
                                    <input type="text" placeholder="" class="menu-input-text" v-model="menu.button[selectedMenuIndex].url">
                                </div>
                                <div style="float:left;width:100%;margin-top:20px;">
                                    <!-- <Button type="primary" style="float:left;margin-right:5px;" @click="setNewsUrl()">绑定会员</Button> -->
                                    <Button type="primary" style="float:left;margin-right:5px;" @click="setNewsUr2()">佣金查询</Button>
                                    <!-- <Button type="primary" style="float:left;margin-right:5px;" @click="setNewsUr3()">消费记录</Button> -->
                                    <Button type="primary" style="float:left;margin-right:5px;" @click="setNewsUr4()">推荐记录</Button>
                                    <Button type="primary" style="float:left;margin-right:5px;" @click="setNewsUr5()">推荐顾客</Button>
                                    <Button type="primary" style="float:left;" @click="setNewsUr6()">首页</Button>
                                </div>
                            </div>
                        </div>
                        <div class="menu-content" v-else-if="selectedMenuType()==8">
                            <Tabs>
                                <TabPane label="文字" icon="compose">
                                    <div class="row">
                                        <label class="col-sm-6 control-label" style="text-align: left;">订阅者会看到以下文字信息:
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label" style="text-align: left;">文字信息:</label>
                                        <div class="col-sm-5">
                                            <input  type="text" placeholder="" class="form-control" v-model="formwx.work">
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane label="图片" icon="image">
                                    <div class="menu-msg-panel">
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
                                    </div>
                                </TabPane>
                                <TabPane label="图文消息" icon="chatboxes">
                                    <div class="menu-input-group">
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
                                    </div>
                                </TabPane>
                            </Tabs>
                            <button @click="saveFile">确定发送信息</button>
                            <button @click="keyend">赋值key</button>
                        </div>
                    </template>
                </div>
                <!-- 子菜单 -->
                <div class="weixin-menu-detail" v-if="selectedMenuLevel()==2">
                    <div class="menu-input-group" style="border-bottom: 2px #e8e8e8 solid;">
                        <div class="menu-name">{{menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].name}}</div>
                        <div class="menu-del" @click="delMenu">删除子菜单</div>
                    </div>
                    <div class="menu-input-group">
                        <div class="menu-label">子菜单名称</div>
                        <div class="menu-input">
                            <input type="text" placeholder="请输入子菜单名称" class="menu-input-text" v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].name" @input="checkMenuName(menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].name)">
                            <p class="menu-tips" style="color:#e15f63" v-show="menuNameBounds">字数超过上限</p>
                            <p class="menu-tips">字数不超过8个汉字或16个字母</p>
                        </div>
                    </div>
                    <div class="menu-input-group">
                        <div class="menu-label">子菜单内容</div>
                        <div class="menu-input">
                            <select v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].type" name="type" class="menu-input-text">
                                <option value="view">跳转网页</option>
                                <option value="click">自定义点击事件</option>
                            </select>
                        </div>
                    </div>
                    <div class="menu-content" v-if="selectedMenuType()==1">
                        <div class="menu-input-group">
                            <p class="menu-tips">订阅者点击该子菜单会跳到以下链接</p>
                            <div class="menu-label">页面地址</div>
                            <div class="menu-input">
                                <input type="text" placeholder="" class="menu-input-text" v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].url">
                            </div>
                            <div style="float:left;width:100%;margin-top:20px;">
                                <!-- <Button type="info" style="float:left;margin-right:5px;" @click="setNewsUrl()">绑定会员</Button> -->
                                <Button type="info" style="float:left;margin-right:5px;" @click="setNewsUr2()">佣金查询</Button>
                                <!-- <Button type="info" style="float:left;margin-right:5px;" @click="setNewsUr3()">消费记录</Button> -->
                                <Button type="info" style="float:left;margin-right:5px;" @click="setNewsUr4()">推荐记录</Button>
                                <Button type="info" style="float:left;margin-right:5px;" @click="setNewsUr5()">推荐顾客</Button>
                                <Button type="info" style="float:left;" @click="setNewsUr6()">首页</Button>
                            </div>
                        </div>
                    </div>
                    <div class="menu-msg-content" v-else-if="selectedMenuType()==2">
                        <div class="menu-msg-head"><i class="icon_msg_sender"></i>图文</div>
                        <div class="menu-msg-panel">
                            <div class="menu-msg-select" v-if="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].media_id==''||menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].media_id==undefined" @click="selectMaterialId">
                                <i class="icon36_common add_gray"></i>
                                <strong>从素材库中选择</strong>
                            </div>
                        </div>
                    </div>
                    <div class="menu-content" v-else-if="selectedMenuType()==3">
                        <Tabs>
                            <TabPane label="文字" icon="compose">
                                <div class="row">
                                    <label class="col-sm-6 control-label" style="text-align: left;">订阅者会看到以下文字信息:
                                    </label>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label" style="text-align: left;">文字信息:</label>
                                    <div class="col-sm-5">
                                        <input  type="text" placeholder="" class="form-control" v-model="formwx.work">
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane label="图片" icon="image">
                                <div class="menu-msg-panel">
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
                                </div>
                            </TabPane>
                            <TabPane label="图文消息" icon="chatboxes">
                                <div class="menu-input-group">
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
                                </div>
                            </TabPane>
                        </Tabs>
                        <button @click="saveFile">确定发送信息</button>
                        <button @click="keyend">赋值key</button>
                    </div>
                    <div class="menu-content" v-else-if="selectedMenuType()==4">
                        <div class="menu-input-group">
                            <p class="menu-tips">订阅者点击该子菜单会跳到以下小程序</p>
                            <div class="menu-label">小程序APPID</div>
                            <div class="menu-input">
                                <input type="text" placeholder="小程序的appid（仅认证公众号可配置）" class="menu-input-text" v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].appid">
                            </div>
                        </div>
                        <div class="menu-input-group">
                            <div class="menu-label">小程序路径</div>
                            <div class="menu-input">
                                <input type="text" placeholder="小程序的页面路径 pages/Index/index" class="menu-input-text" v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].pagepath">
                            </div>
                        </div>
                        <div class="menu-input-group">
                            <div class="menu-label">备用网页</div>
                            <div class="menu-input">
                                <input type="text" placeholder="" class="menu-input-text" v-model="menu.button[selectedMenuIndex].sub_button[selectedSubMenuIndex].url">
                                <p class="menu-tips">旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weixin-btn-group">
                <button @click="save" type="button" class="btn btn-info1">保存</button>
                <router-link to="/wechatpublicnumber">
                    <button style="color:black;" type="button" class="btn btn-info1">返回</button>
                </router-link>
            </div>
        </div>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            PromoteBindingMembersUrl1: '',
            PromoteCommissionInquiryUrl2: '',
            PromoteRecordsOfConsumptionUrl3: '',
            PromoteRecommendedRecordsUrl4: '',
            PromoteRecommendingCustomersUrl5: '',
            PromoteRefereeRegistrationUrl6: '',
            ment: '',
            shertList: [],
            formwx: {
                work: '',
                uploadList: [],
            },
            rbqs: [],
            el: '#app-menu',
            weixinTitle: '公众号菜单',
            menu: {'button': []},//当前菜单
            selectedMenuIndex:'',//当前选中菜单索引
            selectedSubMenuIndex:'',//当前选中子菜单索引
            menuNameBounds:false,//菜单长度是否过长
            material:{
                title:'',
                url:'',
                thumb_url:''
            }
        }
    },
    mounted:function(){
        this.getMenu()
    },
    created() {
        console.log('APPID')
        console.log(this.$route.query.id)
        this.appid = this.$route.query.id;
        console.log('APPID2')
        console.log(this.appid)
        this.getMenu()
        this.urldata()
        this.materia()
    },
    watch: {
        '$route'(to,from){
            this.appid = this.$route.query.id;
            this.getMenu()
            this.materia()
        }        
    },
    methods:{
        //设置选择的图文链接
		setNewsUrl:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteBindingMembersUrl1)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteBindingMembersUrl1)
			}
			// layer.close(layer.index);
        },
        //设置选择的图文链接
		setNewsUr2:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteCommissionInquiryUrl2)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteCommissionInquiryUrl2)
			}
			// layer.close(layer.index);
        },
        //设置选择的图文链接
		setNewsUr3:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteRecordsOfConsumptionUrl3)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteRecordsOfConsumptionUrl3)
			}
			// layer.close(layer.index);
        },
        //设置选择的图文链接
		setNewsUr4:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteRecommendedRecordsUrl4)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteRecommendedRecordsUrl4)
			}
			// layer.close(layer.index);
        },
        //设置选择的图文链接
		setNewsUr5:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteRecommendingCustomersUrl5)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteRecommendingCustomersUrl5)
			}
			// layer.close(layer.index);
        },
        //设置选择的图文链接
		setNewsUr6:function(){
			if(this.selectedMenuLevel()==1){
				Vue.set(this.menu.button[this.selectedMenuIndex],'url',this.PromoteRefereeRegistrationUrl6)
			}else if(this.selectedMenuLevel()==2){
				Vue.set(this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex],'url',this.PromoteRefereeRegistrationUrl6)
			}
			// layer.close(layer.index);
		},
        urldata() {
            var self = this
			self.$http.get({
				url: '/guard-webManager/wxOption/optionlist.jhtml',
				data: {
                    appid : self.appid
				},
				success: function (res) {
                    console.log('url地址')
                    console.log(res)
                    self.PromoteBindingMembersUrl1 = res.data.content.PromoteBindingMembersUrl1
                    self.PromoteCommissionInquiryUrl2 = res.data.content.PromoteCommissionInquiryUrl2 
                    self.PromoteRecordsOfConsumptionUrl3 = res.data.content.PromoteRecordsOfConsumptionUrl3
                    self.PromoteRecommendedRecordsUrl4  = res.data.content.PromoteRecommendedRecordsUrl4
                    self.PromoteRecommendingCustomersUrl5 = res.data.content.PromoteRecommendingCustomersUrl5
                    self.PromoteRefereeRegistrationUrl6 = res.data.content.PromoteRefereeRegistrationUrl6
                    self.$store.dispatch('setPageLoading', 1);
				}
			})	
        },
        //选中主菜单
        selectedMenu:function(i,event){
            this.selectedSubMenuIndex=''
            this.selectedMenuIndex=i
            var selectedMenu=this.menu.button[this.selectedMenuIndex]
            //清空选中media_id 防止再次请求
			if(selectedMenu.media_id!=undefined&&selectedMenu.media_id!=''&&this.selectedMenuType()==2){
                this.getMaterial(selectedMenu.media_id)
            }
            //检查名称长度
            this.checkMenuName(selectedMenu.name)
        },
        //选中子菜单
        selectedSubMenu:function(i,event){
            this.selectedSubMenuIndex=i
            var selectedSubMenu=this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex]
            if(selectedSubMenu.media_id!=undefined&&selectedSubMenu!=''&&this.selectedMenuType()==2){
                this.getMaterial(selectedSubMenu.media_id)
            }
            this.checkMenuName(selectedSubMenu.name)
        },
        //选中菜单级别
		selectedMenuLevel: function () {
            if (this.selectedMenuIndex !== '' && this.selectedSubMenuIndex === '') {
                //主菜单
                return 1;
            }else if (this.selectedMenuIndex !== '' && this.selectedSubMenuIndex !== '') {
                //子菜单
                return 2;
            }else {
                //未选中任何菜单
                return 0;
            }
        },
        //获取菜单类型 1. view网页类型，2. media_id类型和view_limited类型 3. click点击类型，4.miniprogram表示小程序类型
        selectedMenuType: function () {
            if (this.selectedMenuLevel() == 1&&this.menu.button[this.selectedMenuIndex].sub_button.length==0) {
                //主菜单
                switch (this.menu.button[this.selectedMenuIndex].type) {
                    case 'view':return 1;
                    case 'view_limited':return 2;
                    case 'view2':return 3;
                    case 'view3':return 4;
                    case 'view4':return 5;
                    case 'view5':return 6;
                    case 'view6':return 7;
                    case 'click':return 8;
                }
            } else if (this.selectedMenuLevel() == 2) {
                //子菜单
                switch (this.menu.button[this.selectedMenuIndex].sub_button[this.selectedSubMenuIndex].type) {
                    case 'view':return 1;
                    case 'view1':return 2;
                    case 'view_limited':return 22;
                    case 'click':return 3;
                    case 'scancode_push':return 3;
                    case 'scancode_waitmsg':return 3;
                    case 'pic_sysphoto':return 3;
                    case 'pic_photo_or_album':return 3;
                    case 'pic_weixin':return 3;
                    case 'location_select':return 3;
                    case 'miniprogram':return 4;
                }
            } else {
                return 1;
            }
        },
        //添加菜单
		addMenu:function(level){
			if(level==1&&this.menu.button.length<3){
				this.menu.button.push({
					"type": "view",
					"name": "菜单名称",
					"sub_button": [],
                    "key": '',
                    choice : true,
				})
                this.selectedMenuIndex=this.menu.button.length-1
                this.selectedSubMenuIndex=''
			}
			if(level==2&&this.menu.button[this.selectedMenuIndex].sub_button.length<5){
				this.menu.button[this.selectedMenuIndex].sub_button.push({
					"type": "view",
					"name": "子菜单名称",     
                    "key": '',
                    choice : true,
				})
				this.selectedSubMenuIndex=this.menu.button[this.selectedMenuIndex].sub_button.length-1
			}
		},
        //删除菜单
		delMenu:function(){
			if(this.selectedMenuLevel()==1&&confirm('删除后菜单下设置的内容将被删除')){
				if(this.selectedMenuIndex===0){
					this.menu.button.splice(this.selectedMenuIndex, 1);
					this.selectedMenuIndex = 0;
				}else{
					this.menu.button.splice(this.selectedMenuIndex, 1);
					this.selectedMenuIndex -=1;
				}
				if(this.menu.button.length==0){
                    this.selectedMenuIndex = ''
                }
			}else if(this.selectedMenuLevel()==2){
                if(this.selectedSubMenuIndex===0){
                    this.menu.button[this.selectedMenuIndex].sub_button.splice(this.selectedSubMenuIndex, 1);
                    this.selectedSubMenuIndex = 0;
                }else{
                    this.menu.button[this.selectedMenuIndex].sub_button.splice(this.selectedSubMenuIndex, 1);
                    this.selectedSubMenuIndex -= 1;
                }
                if(this.menu.button[this.selectedMenuIndex].sub_button.length==0){
                    this.selectedSubMenuIndex = ''
                }
			}
		},
        //检查菜单名称长度
		checkMenuName:function(val){
			if(this.selectedMenuLevel()==1&&this.getMenuNameLen(val)<=8){
                this.menuNameBounds=false
			}else if(this.selectedMenuLevel()==2&&this.getMenuNameLen(val)<=16){
                this.menuNameBounds=false
			}else{
			    this.menuNameBounds=true
            }
		},
        //获取菜单名称长度
        getMenuNameLen: function (val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i);
                a.match(/[^\x00-\xff]/ig) != null?len += 2:len += 1;
            }
            return len;
        },
        keyend() {
            console.log('赋值KEY')
            console.log(this.ment)
            this.menu.button.map(item => { 
                item.sub_button.map(item => {
                    if(item.choice) {
                        item.choice = false;
                        item.key = this.ment;
                    }
                })
            })

        },
        // 拿对应media_id下标值
        selectStyle (rbq, index) {
           this.mendid = this.mediaid[index]
　　　　　　this.$nextTick(function () {
　　　　　　　　this.rbqs.forEach(function (rbq) {
　　　　　　　　　　Vue.set(rbq,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(rbq,'active',true);
　　　　　　});
　　　　},
        // 获取菜单
        getMenu() {
            // console.log('获取菜单')
            // console.log(this.menuObj.button)
            var self = this
            self.$store.dispatch('setPageLoading', -1)
            console.log('appid44444415241')
            console.log(self.appid)
            self.$http.get({
                url: '/guard-webManager/WxMenu/list.jhtml',
                data: {
                    appid : self.appid
                },
                success: function(res) {
                    // self.menu = (res.data.content)[0].menu
                    self.menu = JSON.parse(res.data.content)[0].menu
                    console.log('菜单222')
                    console.log(res)
                    console.log((res.data.content)[0].menu)
                    console.log(JSON.parse(res.data.content)[0].menu)
                    self.$store.dispatch('setPageLoading', 1)     
                }
            })

        },
        // 获取素材列表
        materia() {
            var self = this
            self.$store.dispatch('setPageLoading', -1)
            self.$http.get({
                url: '/guard-webManager/WxNewsMaterial/list.jhtml',
                data: {
                    appid : self.appid,
                },
                success: function(res){
                    self.rbqs = JSON.parse(res.data.content).item.map(item => item.content.news_item[0])
                    self.mediaid = JSON.parse(res.data.content).item.map(item => item.media_id)
                    self.$store.dispatch('setPageLoading', 1)
                },
            }) 
        },
        selectNewsUrl() {
            this.tanchuceng = true
        },
        //  保存
        save() {
            // console.log(this.menuObj.button)
            let bool = true;
            // this.menu.button.map(item => {
            //     if(item.sub_button.length === 0) {
            //         console.log(item.url)
            //         if(!item.url) {
            //             bool = false;
            //         }
            //     } else {
            //         item.sub_button.map(item1 => {
            //             if(!item1.url) {
            //                 bool = false;
            //             }
            //         })
            //     }
            // });
            // if(!bool) {
            //     alert('请输入一级菜单内容、或者删除')
            // } else {
                var self = this
                self.$http.post({
                    url: '/guard-webManager/WxMenu/menu.jhtml',
                    data: {
                        appid : self.appid,
                        menu : JSON.stringify(self.menu)
                    },
                    success: function (res) {
                        
                        console.log('保存111')
                        console.log(res)
                        if (res.data.code == 0) {
                            alert('保存成功')
                        } else{
                            alert('保存失败')
                        }
                    },
                    error:function(){
                        alert('保存失败')
                    }
                    
                })
            // }
        },

        // 上传之前
        handleBeforeUploadd(data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.formwx.uploadList.splice(0, 1, data);
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
        // // 上传
        saveFile () {
			var self = this,
			param = new FormData()
			if(self.formwx.uploadList.length === 0) {
			} else {
				param.append('pic', self.formwx.uploadList[0])
			}
            param.append('appid', self.appid)
            param.append('content', self.formwx.work)
            param.append('token', self.$token.readToken('adminToken'))
            if(self.mendid.length === 0) {
				param.append('mediaid', null)
			} else {
				param.append('mediaid', self.mendid)
			}
			// param.append('mediaid', null)
            param.append('fileType', 'image')
            self.$http.upload({
                url: '/guard-webManager/WxMenu/key.jhtml',
				data: param,
                success: function(res){
                    console.log(res)
                    self.ment = res.data.content
                    console.log('拿key')
                    console.log(self.ment)
                    if(res.code == 0) {
                        self.formwx = res.data.content || ''
                    } else {
                        self.$Message.success('发送成功');
                    }
                },
			})  
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
        // 删除图片
        handleRemove(index) {
            this.shertList.splice(0);
        },
    }
}
</script>

<style lang='less' scoped>
ul{
	padding:0;
}
li{
	list-style:none;
}
#app-menu{
	overflow: hidden;
	width:950px;
}
.weixin-preview{
	position: relative;
    width: 320px;
    height: 540px;
	float: left;
	margin-right:10px;
    border: 1px solid #e7e7eb;
}
.weixin-preview a{
	text-decoration: none;
	color: #616161;
}
.weixin-preview .weixin-hd{
	color: #fff;
    text-align: center;
	position: relative;
	top:0px;
	left:0px;
    width: 320px;
	height:64px;
	background: transparent url(/static/img/menu_head.png) no-repeat 0 0;
	background-position: 0 0;
}
.weixin-preview .weixin-hd .weixin-title{
	color:#fff;
	font-size:15px;
	width:100%;
	text-align: center;
	position:absolute;
	top: 33px;
    left: 0px;
}

.weixin-preview .weixin-bd{
	
}
.weixin-preview .weixin-menu{
	position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e7e7e7;
    background: transparent url(/static/img/menu_foot.png) no-repeat 0 0;
    background-position: 0 0;
    background-repeat: no-repeat;
    padding-left: 43px;
	margin-bottom:0px;
}
/*一级*/
.weixin-preview .weixin-menu .menu-item{
	position: relative;
    float: left;
    line-height: 50px;
	height:50px;
    text-align: center;
	width:33.33%;
	border-left: 1px solid #e7e7e7;
	cursor: pointer;
	color:#616161;
}
.weixin-preview .weixin-menu .menu-item:first-child{
	/*border-left-width:0px;*/
}

/*二级*/
.weixin-preview .weixin-sub-menu{
	position: absolute;
	bottom: 60px;
	left: 0;
	right: 0;
	border-top: 1px solid #d0d0d0;
	margin-bottom:0px;
	background: #fafafa;
	display: block;
	padding:0;
}
.weixin-preview .weixin-sub-menu .menu-sub-item{
	line-height: 50px;
	height:50px;
	text-align: center;
	width:100%;
	border: 1px solid #d0d0d0;
	border-top-width: 0px;
	cursor: pointer;
	position: relative;
	color:#616161;
}
.weixin-preview .menu-arrow{
	position: absolute;
	left: 50%;
	margin-left: -6px;
}
.weixin-preview .arrow_in{
	bottom: -4px;
	display: inline-block;
	width: 0px;
	height: 0px;
	border-width: 6px 6px 0px;
	border-style: solid dashed dashed;
	border-color: #fafafa  transparent transparent;
}
.weixin-preview .arrow_out{
	bottom: -5px;
	display: inline-block;
	width: 0px;
	height: 0px;
	border-width: 6px 6px 0px;
	border-style: solid dashed dashed;
	border-color: #d0d0d0 transparent transparent;
}

.weixin-preview .menu-item .menu-item-title,.weixin-preview .menu-sub-item .menu-item-title{
	width:100%;
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	box-sizing: border-box;
}


.weixin-preview .menu-item.current,.weixin-preview .menu-sub-item.current{
	border: 1px solid #44b549;
	background: #fff;
	color:#44b549;
}
.weixin-preview .weixin-sub-menu.show{
	display:block;
}
.weixin-preview .icon_menu_dot{
	background: url(/static/img/index_z354723.png) 0px -36px no-repeat;
	width: 7px;
	height: 7px;
	vertical-align: middle;
	display: inline-block;
	margin-right: 2px;
	margin-top: -2px;
}
.weixin-preview .icon14_menu_add{
	background: url(/static/img/index_z354723.png) 0px 0px no-repeat;
	width: 14px;
	height: 14px;
	vertical-align: middle;
	display: inline-block;
	margin-top: -2px;
}
.weixin-preview li:hover .icon14_menu_add{
	background: url(/static/img/index_z354723.png) 0px -18px no-repeat;
}

.weixin-preview .menu-item:hover{
	color: #000;
}
.weixin-preview .menu-sub-item:hover{
	background: #eee;
}

.weixin-preview li.current:hover{
	background: #fff;
	color: #44b549;
}

/*菜单内容*/
.weixin-menu-detail{
	width: 600px;
	padding: 0px 20px 5px;
	background-color: #f4f5f9;
	border: 1px solid #e7e7eb;
	float: left;
	min-height: 540px;
}
.weixin-menu-detail .menu-name{
	float: left;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
}
.weixin-menu-detail .menu-del{
	float: right;
    height: 40px;
    line-height: 40px;
    color: #459ae9;
	cursor:pointer;
}
.weixin-menu-detail .menu-input-group{
	width:540px;
	margin:10px 0 30px 0;
	overflow: hidden;
}
.weixin-menu-detail .menu-label{
	float: left;
	height: 30px;
	line-height: 30px;
	width:80px;
	text-align: right;
}
.weixin-menu-detail .menu-input{
	float:left;
	width: 380px
}
.weixin-menu-detail .menu-input-text{
	border: 0px;
	outline: 0px;
	background: #fff;
	width: 300px;
	padding: 5px 0px 5px 0px;
	margin-left: 10px;
	text-indent: 10px;
	height: 35px;
}
.weixin-menu-detail .menu-tips{
	color: #8d8d8d;
	padding-top: 4px;
	margin:0;
}
.weixin-menu-detail .menu-tips.cursor{
	color: #459ae9;
    cursor: pointer;
}

.weixin-menu-detail .menu-input .menu-tips{
	margin:0 0 0 10px;
}
.weixin-menu-detail .menu-content{
	padding: 16px 20px;
	border: 1px solid #e7e7eb;
	background-color: #fff;
}
.weixin-menu-detail .menu-content .menu-input-group{
	margin: 0px 0 10px 0;
}
.weixin-menu-detail .menu-content .menu-label{
	text-align: left;
	// width:100px;
}
.weixin-menu-detail .menu-content .menu-input-text{
	border: 1px solid #e7e7eb;
}
.weixin-menu-detail .menu-content .menu-tips{
	padding-bottom: 10px;
}

.weixin-menu-detail .menu-msg-content{
	padding: 0;
	border: 1px solid #e7e7eb;
	background-color: #fff;
}
.weixin-menu-detail .menu-msg-content .menu-msg-head{
	overflow: hidden;
	border-bottom: 1px solid #e7e7eb;
	line-height: 38px;
	height: 38px;
	padding: 0 20px;
}
.weixin-menu-detail .menu-msg-content .menu-msg-panel{
	padding: 30px 50px;
}
.weixin-menu-detail .menu-msg-content .menu-msg-select{
	padding: 40px 20px;
	border: 2px dotted #d9dadc;
	text-align: center;
}
.weixin-menu-detail .menu-msg-content .menu-msg-select:hover{
	border-color: #b3b3b3;
}
.weixin-menu-detail .menu-msg-content strong{
	display: block;
	padding-top: 3px;
	font-weight: 400;
	font-style: normal;
}
.weixin-menu-detail .menu-msg-content .menu-msg-title{
	float: left;
	width: 310px;
	height: 30px;
	line-height: 30px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.icon36_common{
	width: 36px;
	height: 36px;
	vertical-align: middle;
	display: inline-block;
}
.icon36_common.add_gray{
	// background: url(../images/base_z381ecd.png) 0 -2548px no-repeat;
}
.icon_msg_sender{
	margin-right: 3px;
	margin-top: -2px;
	width: 20px;
	height: 20px;
	vertical-align: middle;
	display: inline-block;
	// background: url(../images/msg_tab_z25df2d.png) 0 -270px no-repeat;
}

.weixin-btn-group{
	text-align: center;
	// width:950px;
	margin:30px 0px;
	overflow: hidden;
}
.weixin-btn-group .btn{
	width: 100px;
	border-radius: 0px;
}

#material-list{
	padding:20px;
	overflow-y:scroll;
	height: 558px;
}
#news-list{
	padding:20px;
	overflow-y:scroll;
	height: 558px;
}
#material-list table{
	width:100%;
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