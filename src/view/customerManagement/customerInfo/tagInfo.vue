/**
* 标签详细页面
*/

<template>
	<div class="container-box userPower">
		<div class="container-header">
			<h2>{{$t('customerMsg.tit1')}}</h2>
			<ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
		</div>
		<div class="container-body">
			<Table stripe :columns="columns" :data="data"></Table>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				cusId: '',
				cusName: '',
				columns: [
					{   
						title: this.$t('labelPublic.xh'),
						type: 'index',
						width: 60
					},
					{
						title: this.$t('tagAdd.label1'),
						key: 'tagName'
					},
					{
						title: this.$t('tagInfo.colTit1'),
						render: (h, params) => {
							const str = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
							return h('span', str);
						}
					},
					{
						title: this.$t('tagInfo.colTit2'),
						key: 'createTime'
					},
					{
						title: this.$t('publicSet.tableAction'),
						key: 'action',
						width: 100,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small',
										icon: 'ios-trash-outline'
									},
									on: {
										click: () => {
											this.remove(params.row)
										}
									}
								}, this.$t('publicSet.del'))
							])
						}
					}
				],
				data: []
			}
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'tagInfo') {
          this.getList();
        }
      },
    },
		created () {
			this.cusId = sessionStorage.getItem('cusId');
			this.cusName = sessionStorage.getItem('cusName');
			this.getList();
		},
		methods: {
			getList () {
				let _vm = this;
				_vm.$store.dispatch('setPageLoading', -1);
				_vm.$http.getPage({
					url: 'guard-webManager/customerRecord/tagInfo.jhtml',
					data: {customerId: _vm.cusId},
					success: function(res){
						const _data = res.data.content.TagList || [];
						if(_vm.langRouterKey !== 'tagInfo') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['tagName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
					},
					error: function(res){
						console.log(res);
					}
				});
			},
			//取消
			remove (data) {
				let _vm = this;
				_vm.$Modal.confirm({
					title: _vm.$t('publicSet.noticeTit'),
					content: _vm.$t('tagInfo.msg'),
					onOk: () => {
						_vm.$http.post({
							url: 'guard-webManager/customerRecord/tagDelete.jhtml',
							data: {id: data.id},
							success: function(res){
								if(res.data.code == 0) {
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
									});
									_vm.getList();
								} else {
									if(_vm.langRouterKey !== 'tagInfo') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
								}
							},
							error: function(res){
								console.log(res);
							}
						});
					},
					onCancel: () => {
						
					}
				});
			},
			back() {
				this.$router.push('/customerMsg')
			},
		}
	}
</script>





