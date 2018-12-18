/**
 * 公告预览
 */
 <template>
	<div class="container-box">
		<div class="container-header notice-preview">
			<h2>{{titMsg}} <span>{{creator}}</span>  <span class="mini-span">{{createTime}}</span></h2>
			<ul class="header-btn-group">
		    	<li class="header-item" @click="back()"><Icon type="android-arrow-back"></Icon>返回</li>
			</ul>
		</div>
		<div class="container-body" v-html="content" style='wordWrap:break-word'>
			{{content}}
		</div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                titMsg: '',
                creator: '',
                createTime: '',
                content: '',
                id: ''
            }
        },
        created () {
            this.id = this.$route.query.id
            this.getId()
        },
        methods: {
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.$http.get({
                    url: 'guard-webManager/notice/preview.jhtml',
                    data: {id: _vm.id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res.data.content)
                            _vm.creator = res.data.content.creator
                            _vm.createTime = moment(res.data.content.createtime).format('YYYY-MM-DD')
                            _vm.titMsg = res.data.content.title
                            _vm.content = res.data.content.content
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
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>
<style type="text/css" scoped>
    .container-header.notice-preview h2 {
        color: #4985f4;
        font-size: 16px;
    }
    .container-header.notice-preview h2 span{
        font-size: 14px;
        color: #888;
        padding: 0 5px;
    }
    .container-header.notice-preview h2 .mini-span{
        font-size: 12px;
    }
</style>