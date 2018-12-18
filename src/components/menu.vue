<template>
  <div :class="['layout-nav',  menuType ? '' : 'layout-nav-hidden']">
    <!-- 导航栏展开 -->
    <div class="layout-nav-menu" v-if='menuType'>
      <div class="nav-menu-tit">
        <h1>
          <p @click='toView(2)'>锦医卫HRP</p>
          <span @click="changeMenuType"></span>
        </h1>
        <h2>【{{hospName}}】</h2>
        <h3>{{userName}}</h3>
        <ul>
          <li title="修改密码">
            <span @click='toView(1)'>
              <Icon type="information-circled" :size='18'></Icon>
            </span>
          </li>
          <li title="查看消息" class="un-mes">
            <span @click='toView(3)'>
              <Icon type="email" :size='22'></Icon>
              <em v-if='unMesNum > 0'></em>
            </span>
          </li>
          <li title="获取帮助">
            <span @click='help'>
              <Icon type="help-circled" :size='18'></Icon>
            </span>
          </li>
          <li title="退出登入">
            <span @click="logOut">
              <Icon type="log-out" :size='17'></Icon>
            </span>
          </li>
        </ul>
      </div>
      <ul class="nav-tree-menu">
        <li v-for='(item, index) in navList' :key='index' :class="[openKey === item.id ? 'open' : '']">
          <div class="tree-tit" @click="changeMenuList(item)">
            <em v-show='openKey === item.id'></em>
            <p :class="item.imgClass">{{$t('layoutNav.' + item.id)}}</p>
          </div>
          <collapse-transition>
            <ol v-show='openKey === item.id'>
              <!-- <li v-for="(item1, index1) in item.child" :key="index1" @click="linkToRouter(item1)" :class="[linkToKey === item1.id ? 'active' : '']">{{$t('layoutNav.' + item1.id)}}</li> -->
              <li v-for="(item1, index1) in item.child" :key="index1" @click="linkToRouter(item1)" :class="[linkToKey === item1.id ? 'active' : '']">
                <span v-if="item1.id === 'todayCusIndex'">今日顾客(内测版)</span>
                <router-link :to="item1.url" v-else>{{$t('layoutNav.' + item1.id)}}</router-link>
              </li>
            </ol>
          </collapse-transition>
        </li>
      </ul>
    </div>
    <!-- 导航栏缩小 -->
    <div class="layout-nav-list" v-else>
      <div class="nav-list-tit">
        <div @click="changeMenuType" class="btn"></div>
        <div class="message">
          <Poptip placement="right" width="160" trigger="hover">
            <span></span>
            <ul slot="content">
              <li @click='toView(1)'><Icon type="information-circled"></Icon>修改密码</li>
              <li @click='toView(3)'><Icon type="email"></Icon>查看消息</li>
              <li @click='toView(2)'><Icon type="ios-people"></Icon>关于软件</li>
              <li @click='help'><Icon type="help-circled"></Icon>获取帮助</li>
              <li @click='logOut'><Icon type="log-out"></Icon>退出</li>
            </ul>
          </Poptip>
        </div>
      </div>
      <div class="nav-list-box" ref='treeList'>
        <ul class="nav-tree-list">
          <li v-for='(item, index) in navList' :key='index' :class="[openKey === item.id ? 'open' : '', item.imgClass]" @click="changeTreePic($event, item)">
            <em v-show="openKey === item.id"></em>
          </li>
        </ul>
      </div>
      <div class="nav-list-menu" v-if="treeMenuKey && openKey && openKey !== 'desk'" :style="treeMenuStyle">
        <ul>
          <!-- <li v-for='(item, index) in treeList' :key='index' @click="linkToRouter(item)" :class="[linkToKey === item.id ? 'active' : '']">{{$t('layoutNav.' + item.id)}}</li> -->
          <li v-for='(item, index) in treeList' :key='index' @click="linkToRouter(item)" :class="[linkToKey === item.id ? 'active' : '']">
            <span v-if="item.id === 'todayCusIndex'">今日顾客(内测版)</span>
            <router-link :to="item.url" v-else>{{$t('layoutNav.' + item.id)}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import collapseTransition from 'utils/transitionDom.js';
  export default {
    components: {collapseTransition},
    name: 'menuNav',
    props: {
      menuType: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hospName: localStorage.getItem('hospName'),
        userName: localStorage.getItem('userAccount'),
        navLink: [],
        treeList: [],
        openKey: '',
        linkToKey: '',
        treeMenuKey: false,
        treeMenuHeight: 0,
        treeMenuTop: 0,
      }
    },
    computed: {
      unMesNum () {
        return this.$store.getters.getUnReadMessageNum;
      },
      navList () {
        const desk = this.navLink[0] || {};
        const list = this.navLink.filter(item => item.child.length > 0) || [];
        return [desk, ...list];
      },
      treeMenuStyle () {
        const style = {
          top: this.treeMenuTop + 340 < this.treeMenuHeight
            ? this.treeMenuTop + 'px'
            : this.treeMenuTop - 140 + 'px'
        }
        return style;
      },
    },
    created () {
      this.navLink = JSON.parse(localStorage.getItem('navLink')) || [];
      this.initMenu();
      console.log(this.navLink);
      console.log(this.$route);
    },
    mounted () {
      this.$store.dispatch('setUnReadMessageNum');
    },
    methods: {
      initMenu () {
        const router = this.$route.path;
        if(router === '/desktop') {
          this.openKey = 'desk';
        } else {
          this.navList.forEach(item => {
            const index = item.child.findIndex(r => r.url === router);
            if(index >= 0) {
              this.openKey = item.id;
              this.linkToKey = item.child[index].id;
            }
          });
        }
      },
      changeMenuType () {
        if(!this.menuType) {
          this.initMenu();
        }
        this.$emit('on-change-type');
        this.treeMenuKey = false;
      },
      changeMenuList (data) {
        if(data.id === 'desk') {
          const breadData = [
            {
              url: '/desktop',
              text: 'layoutNav.desk'
            }
          ];
          this.$store.dispatch('setBreadData', breadData);
          this.$router.push(data.url);
          this.openKey = data.id;
        } else {
          if(this.openKey === data.id) {
            this.openKey = '';
          } else {
            this.openKey = data.id;
          }
        }
      },
      changeTreePic (event, data) {
        console.log(event.currentTarget.getBoundingClientRect().top)
        console.log(this.$refs.treeList.offsetHeight)
        console.log(data)
        this.treeMenuHeight = this.$refs.treeList.offsetHeight;
        this.treeMenuTop = event.currentTarget.getBoundingClientRect().top;
        this.treeList = data.child;
        this.changeMenuList(data);
        this.treeMenuKey = true;
      },
      linkToRouter (data) {
        if(data.id === 'todayCusIndex') {
          window.open('/new/#/todayCusIndex?type=blank');
        } else {
          this.linkToKey = data.id;
          const breadData = [
            {
              url: '/desktop',
              text: 'layoutNav.desk'
            },
            {
              url: data.url,
              text: 'layoutNav.' + data.id
            }
          ];
          this.$store.dispatch('setBreadData', breadData);
          // this.$router.push(data.url);
        }
      },
      toView (type) {
        let _text = '';
        let _url = '';
        if(type === 1) {
          _text = 'otherRouter.modifyPassword';
          _url = '/modifyPassword';
        } else if(type === 3) {
          _text = 'otherRouter.inbox';
          _url = '/inbox';
        } else {
          _text = 'otherRouter.about';
          _url = '/about';
        }
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push(_url);
      },
      help () {
        // const url = `https://static.meiqia.com/dist/standalone.html?_=t&eid=19657&metadata={"name":"${localStorage.getItem('userAccount')}","医院":"${localStorage.getItem('hospName')}"}`;
        const url = `https://cschat-ccs.aliyun.com/pcportal.htm?tntInstId=_0Y0Ruvw&scene=SCE00000449`;
        window.open(url);
      },
      logOut () {
        this.$router.push('/login');
      },
    }
  }

</script>

<style scoped lang='less'>
  .nav-tree-menu ol li span {
    display: block;
    padding: 12px 0 12px 80px;
    font-size: 13px;
    line-height: 16px;
    color: #181818;
    cursor: pointer;
    &:hover {
      color: #4172f6;
      background-color: rgba(65, 114, 246, 0.07);
    }
  } 
  .nav-list-menu li span {
    display: block;
    width: 150px;
    padding: 12px 5px 12px 30px;
    font-size: 13px;
    line-height: 16px;
    color: #181818;
    cursor: pointer;
    &:hover {
      color: #4172f6;
      background-color: rgba(65, 114, 246, 0.07);
    }
  }
</style>