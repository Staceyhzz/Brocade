/** * 客户个人资料主结构模板 */

<template>
  <div class="container-box customer-index">
    <div class="container-header">
      <h2>【{{ cusTitle }}】</h2>
			<div class="cus-nav">
				<ul class="common">
					<li :class="['more', showMoreNavKey ? 'show' : '']" @click="showMoreNav"><Icon type="arrow-down-b"></Icon>{{$t('customerIndex.more')}}</li>
					<li v-for='item in commomList' :key='item.id' @click='toNav(item)'>{{$t('cusNavList.' + item.id)}}</li>
				</ul>
				<collapse-transition>
					<div class="nav-list" v-show='showMoreNavKey'>
						<Row type="flex" justify="start">
							<Col :xs='8' :sm='6' :md="4" :lg="3" v-for='item in navList' :key='item.id' class="item">
								<p>{{$t(item.name)}}</p>
								<ul>
									<li v-for='list in item.list' :key='list.id' @click='toNav(list)'>
                    {{$t('cusNavList.' + list.id)}} 
                    <span v-if='list.isFavourate === 1 && editNavKey'><Icon type="checkmark-round"></Icon></span>
                  </li>
								</ul>
							</Col>
              <Col :xs='8' :sm='6' :md="4" :lg="3" class="item">
								<p>{{$t('cusNavList.common')}}</p>
                <div class="btn">
                  <span v-if='!editNavKey' @click="editNav"><Icon type="ios-gear"></Icon></span>
                  <span v-if='editNavKey' @click="saveNav"><Icon type="checkmark-round"></Icon></span>
                  <span v-if='editNavKey' @click="cancel"><Icon type="close-round"></Icon></span>
                </div>
								<ul>
									<li v-for='item in commomList' :key='item.id' @click='toNav(item)'>{{$t('cusNavList.' + item.id)}}</li>
								</ul>
							</Col>
						</Row>
					</div>
				</collapse-transition>
			</div>
    </div>
    <div class="container-body">
			<div class="cus-menu">
				<span class='more' @click="showMoreMenu">
					<Icon type="android-more-horizontal"></Icon>
				</span>
				<div class="box" :style='menuStyle'>
					<Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
						<Menu-item v-for='(item, index) in menuData' :key='index' :name='item.url'>{{$t('cusMenuTabs.' + item.id)}}</Menu-item>
					</Menu>
				</div>
			</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
	import collapseTransition from 'utils/transitionDom.js';
  export default {
		components: {collapseTransition},
    data() {
      return {
				cusId: '',
				showMoreMenuKey: false,
				showMoreNavKey: false,
        menuRouteUrl: '',
        menuData: [{
          id: 'customerMsg',
          url: '/customerMsg'
        }, ],
        editNavKey: false,
        navData: [],
      }
    },
    computed: {
      cusTitle() {
        return this.$store.getters.getCustomerDataName
			},
			menuStyle() {
				const style = {
					maxHeight: this.showMoreMenuKey 
						? '700px'
						: '62px'
				}
				return style;
      },
      commomList() {
        return this.navData.filter(item => item.isFavourate === 1);
      },
      navList() {
        let data = [
					{
						id: 1,
						name: 'cusNavList.other',
						list: []
					},
					{
						id: 2,
						name: 'cusNavList.channel',
						list: []
					},
					{
						id: 3,
						name: 'cusNavList.member',
						list: []
					},
					{
						id: 4,
						name: 'cusNavList.admin',
						list: []
					},
					{
						id: 5,
						name: 'cusNavList.medical',
						list: []
					},
					{
						id: 6,
						name: 'cusNavList.service',
						list: []
					},
					{
						id: 7,
						name: 'cusNavList.finance',
						list: []
					}
        ];
        data.map(item => {
          item.list = this.navData.filter(nav => nav.group === item.id);
        });
        return data;
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        console.log('==-==')
        if (to.path === '/customerIndex') {
          console.log('---=---')
          vm.menuRouteUrl = '/customerMsg'
          const breadData = [{
              url: '/desktop',
              text: 'layoutNav.desk'
            },
            {
              url: '/customer',
              text: 'layoutNav.customerManage'
            },
            {
              url: '/customerMsg',
              text: vm.cusTitle
            }
          ];
          vm.$store.dispatch('setBreadData', breadData);
        } else {
          vm.menuRouteUrl = to.path;
        }
      })
    },
    beforeRouteUpdate(to, from, next) {
      if(to.path === '/customerIndex') {
        this.menuRouteUrl = '/customerMsg';
      } else {
        this.menuRouteUrl = to.path;
      }
      this.$store.dispatch('setPageLoading', 1);
      next();
    },
    created() {
      this.initNav()
      console.log(this.$route.query.type)
      if (this.$route.query.type === 'blank') {
        this.openOtherTab();
      }
      if (window.sessionStorage) {
        var lg = window.sessionStorage
        this.cusId = lg.cusId
      }
      this.$store.dispatch('setCustomerDataName', sessionStorage.getItem('cusName'));
      document.title = sessionStorage.getItem('cusName');
    },
    methods: {
			showMoreMenu() {
				this.showMoreMenuKey = !this.showMoreMenuKey;
			},
			showMoreNav() {
				this.showMoreNavKey = !this.showMoreNavKey;
			},
      closeMoreNav() {
        this.showMoreNavKey = false;
      },
      initNav() {
        let _cusMenu = JSON.parse(localStorage.getItem('cusMenu')),
          _cusNav = JSON.parse(localStorage.getItem('cusNav'));
        this.navData = _cusNav
        console.table(_cusNav)
				_cusMenu.map(item => {
					this.menuData.push({
						id: item.id,
						url: item.url
					});
        });
      },
      editNav() {
        this.editNavKey = true;
      },
      cancel() {
        this.editNavKey = false;
        this.navData = JSON.parse(localStorage.getItem('cusNav'));
      },
      saveNav() {
        let _vm = this;
        const list = _vm.navData.filter(item => item.isFavourate === 1);
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/updateFavourateMenu.jhtml',
          data: {
            menuList: list.map(item => item.id).join(',')
          },
          success: function(res){
            if(res.data.code === 0){
              localStorage.setItem('cusNav', JSON.stringify(_vm.navData));
              _vm.editNavKey = false;
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      openOtherTab() {
        const _blankName = sessionStorage.getItem('cusNameBlank');
        const  _blankId = sessionStorage.getItem('cusIdBlank');
        const  _data = this.$store.getters.getBreadData;
        sessionStorage.setItem('cusId', _blankId);
        sessionStorage.setItem('cusName', _blankName);
        console.log(this.$store.getters.getBreadData);
        document.title = _blankName;
        if (_data.length === 0) {
          console.log('===========')
          const _breadData = [{
              url: '/desktop',
              text: 'layoutNav.desk'
            },
            {
              url: '/customer',
              text: 'layoutNav.customerManage'
            },
            {
              url: '/customerIndex',
              text: _blankName
            }
          ];
          this.$store.dispatch('setBreadData', _breadData);
        }
      },
      toMenu(url) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: url,
            text: this.cusTitle
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push(url);
      },
      toNav(data) {
        if(this.editNavKey) {
          const index = this.navData.findIndex(item => item.id === data.id);
          this.navData[index].isFavourate = data.isFavourate
            ? 0
            : 1;
        } else {
          const breadData = [
            {
              url: '/desktop',
              text: 'layoutNav.desk'
            },
            {
              url: '/customerMsg',
              text: this.cusTitle
            },
            {
              url: data.url,
              text: 'cusNavList.' + data.id
            },
          ];
          this.$store.dispatch('setBreadData', breadData);
          this.$router.push(data.url);
        }
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>

<style lang='less' scoped>
	.customer-index {
		.container-header {
			position: relative;
			overflow: visible;
			&:after {
				content:".";
				clear:both;
				display:block;
				height:0;
				overflow:hidden;
				visibility:hidden;
			}
		}
		.cus-nav {
			float: right;
			width: 60%;
			.common {
        overflow: hidden;
        margin-bottom: -5px;
				li {
					float: right;
					min-width: 66px;
					height: 28px;
					padding: 0 8px;
					border: 1px solid #4172F6;
					margin: 0 0 5px 10px;
					font-size: 12px;
					line-height: 26px;
					text-align: center;
					color: #fff;
					background-color: #4172F6;
					border-radius: 3px;
					cursor: pointer;
				}
				.more {
					color: #4172F6;
					background-color: rgba(65,114,246, 0.2);
					i {
						margin-right: 5px;
						transition:transform 0.2s ease-in;
					}
				}
				.show i {
					transform: rotate(180deg);
				}
			}
			.nav-list {
				position: absolute;
				left: 0;
				top: 100%;
				width: 100%;
				background: #fff;
				border-radius: 4px;
				box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
				z-index: 949;
				.item {
					padding: 10px 15px 0;
					box-shadow: 1px 0 0 0 #dedede inset;
				}
				p {
					margin-bottom: 10px;
					font-size: 12px;
					line-height: 17px;
					font-weight: bold;
					color: #181818;
				}
				li {
          position: relative;
          padding-right: 5px;
					margin-bottom: 10px;
					font-size: 12px;
					line-height: 17px;
					color: #2a2a2a;
          cursor: pointer;
          span {
            transform: translateY(-50%);
            position: absolute;
            right: -7px;
            top: 50%;
            color: #4172F6;
          }
        }
        .btn {
          margin: -5px 0 5px;
          font-size: 18px;
          text-align: right;
          span {
            margin-left: 10px;
            cursor: pointer;
          }
        }
			}
		}
		.cus-menu {
			position: relative;
			span {
				position: absolute;
				right: -20px;
				top: 21px;
				width: 20px;
				height: 20px;
				font-size: 16px;
				line-height: 20px;
				cursor: pointer;
			}
			.box {
				position: relative;
				overflow: hidden;
				transition: all 0.2s ease-in-out;
				&:after {
					content: '';
					display: block;
					width: 100%;
					height: 1px;
					background: #d7dde4;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
		}
	}
</style>

