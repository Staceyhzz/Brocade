/** * 处理 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>{{ name }}</h2>
		</div>
		<div class="container-body">
            <table border="1">
                <div class="color">
                    <tr>
                        <th>序号</th>
                        <td>
                            <!-- <input v-model="tabledata.id" type="text"> -->
                            <span>{{tabledata.id}}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>提交时间</th>
                        <td>
                            <!-- <input v-model="tabledata.tjtime" type="text"> -->
                            <span>{{tabledata.tjtime}}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>提现金额</th>
                        <td>
                            <!-- ￥<input v-model="tabledata.tjmoney" type="text"> -->
                            <span>{{tabledata.tjmoney}}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>
                            <!-- <input v-model="tabledata.username" type="text"> -->
                            <span>{{tabledata.username}}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>手机号码</th>
                        <td>
                            <!-- <input v-model="tabledata.telephone" type="text"> -->
                            <span>{{tabledata.telephone}}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>佣金余额</th>
                        <td>
                            <!-- <input v-model="tabledata.yjmoney" type="text"> -->
                            ￥<span>{{tabledata.yjmoney}}</span>
                        </td>
                    </tr>
                </div>
            </table>
            <!-- <table style="margin-top:30px;" border="1">
                <tr>
                    <th>申请提现余额</th>
                    <td>
                        ￥<input v-model="tabledata.forward" type="text">
                    </td>
                </tr>
                <tr>
                    <th>用户佣金余额</th>
                    <td>
                        ￥<input v-model="tabledata.usermoney" type="text">
                    </td>
                </tr>
                <tr>
                    <th>实际结算金额</th>
                    <td>
                        ￥<Input placeholder="1000.00" v-model="tabledata.Actual" style="width:150px;"></Input>
                        <span style="color:red;" class="err-plchod">{{errname}}</span>
                    </td>
                </tr>
                <tr>
                    <th style="height:100px;">支付凭证</th>
                    <td>
                        <div class="upload-photo-item">
                            <img style="float:left;width:80px;height:80px;" :src="image" alt="">
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
                    </td>
                </tr>
            </table> -->
            <table style="margin-top:30px;" border="1">
                <tr>
                    <th>操作人</th>
                    <td>
                        <!-- <input v-model="tabledata.czuser" type="text"> -->
                        <span>{{tabledata.czuser}}</span>
                    </td>
                </tr>
                <tr>
                    <th>操作时间</th>
                    <td>
                        <!-- <input v-model="tabledata.cztime" type="text"> -->
                        <span>{{tabledata.cztime}}</span>
                    </td>
                </tr>
            </table>
            <button @click="handleSubmit(1)">确认</button>
            <button @click="handleSubmit(0)">拒绝</button>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      	return {
            errname: '',
            image: '',
            name: '',
            paidzf: [
                {
                    id: 0,
                    name: '待支付确认',
                },
                {
                    id: 1,
                    name: '支付',
                },
                {
                    id: 2,
                    name: '已取消',
                },
                {
                    id: 3,
                    name: '已关闭',
                },
                {
                    id: 4,
                    name: '可使用',
                },
                {
                    id: 5,
                    name: '治疗完成',
                },
                {
                    id: 8,
                    name: '退款中',
                },
                {
                    id: 9,
                    name: '退款成功',
                }
            ],
            shertList: [],
            orderid: '',
            tabledata: {
                id: '',
                tjtime: '',
                tjmoney: '',
                username: '',
                telephone: '',
                yjmoney: '',
                forward: '',
                usermoney: '',
                Actual: '',
                czuser: localStorage.getItem('userAccount'),
                cztime: '',
                uploadList: []
            }
      	}
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
        console.log(this.$route.query.id)
        this.orderid = this.$route.query.id;
        // this.handleSubmit()
        this.ordertent()
    },
    watch: {
        '$route'(to,from){
            this.orderid = this.$route.query.id;
        }
    },
    methods: {
        // 获取数据
        ordertent() {
            var self = this
            self.$http.get({
                url: '/guard-webManager/Comission/idlist.jhtml',
                data: {
                    ID : self.orderid
                },
                success(res){
                    // 客户信息
                    self.tabledata.id = res.data.content[0].id
                    self.tabledata.tjtime = res.data.content[0].createTime
                    self.tabledata.username = res.data.content[0].promoterName
                    self.tabledata.tjmoney = res.data.content[0].amount
                    self.tabledata.telephone = res.data.content[0].mobile
                    self.tabledata.yjmoney = res.data.content[0].balance
                    self.tabledata.forward = res.data.content[0].amount
                    self.tabledata.usermoney = res.data.content[0].balance
                    // self.tabledata.czuser = res.data.content[0].createUserName
                    self.tabledata.cztime = res.data.content[0].createTime
                    self.image = res.data.content[0].imageurl
                    self.tabledata.Actual = res.data.content[0].passMoney
              
                    console.log('获取数据')
                    console.log(self.image)
                    console.log(res)
                    self.paidzf = res.data.content[0].paidStatus
                    // if (self.paidzf == 1) {
                    //     self.name = '待支付' 
                    // } else if (self.paidzf == 2) {
                    //     self.name = '已取消'
                    // } else if (self.paidzf == 3) {
                    //     self.name = '已关闭'
                    // } else if (self.paidzf == 4) {
                    //     self.name = '可使用'
                    // } else if (self.paidzf == 5) {
                    //     self.name = '治疗完成'
                    // } else if (self.paidzf == 8) {
                    //     self.name = '退款中'
                    // } else if (self.paidzf == 9) {
                    //     self.name = '退款成功'
                    // }
                },
            }) 
        },
        // 上传
        handleSubmit(status) {
            if(this.tabledata.Actual == '' || this.tabledata.Actual > this.tabledata.usermoney){    
               this.errname = "金额不足、提现失败";
            }
            else{
                this.errname = ''
                var self = this,
                param = new FormData()
                console.log('avbc') 
                param.append('ID', self.orderid)
                param.append('token', self.$token.readToken('adminToken'))
                param.append('status', status)
                self.$http.upload({
                    url: '/guard-webManager/Comission/affirmpay.jhtml',
                    data: param,
                    success: function(res){ 
                        console.log(res)
                        if(res.code === 0) {
                            self.tabledata = res.content || ''
                        } else {
                            self.$Message.success('操作成功');
                        }
                        self.$router.go(-1);
                    },
                })  
            }
        },
        // 上传之前
        handleBeforeUploadd(data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.tabledata.uploadList.splice(0, 1, data);
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
        // 删除
        handleRemove(index) {
            this.shertList.splice(0);
        },
    }
}

</script>
<style lang='less' scoped>
.container-body {
    table {
        border-color: #c9c9c9;
    }
    input {
        outline: none;
        border: none;
    }
    th {
        width: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
    }
    td {
        width: 400px;
        font-size: 14px;
        padding: 0 0 0 20px;
    }
    .color th {
        background: #f2f2f2;
    }
    button {
        width: 120px;
        height: 40px;
        margin-top: 30px;
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
</style>