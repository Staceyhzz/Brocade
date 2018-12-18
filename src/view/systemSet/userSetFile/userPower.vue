/**
* 设置客户权限/回访权限页面
*/

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{titName}}</h2>
    </div>
    <div class="container-body">
      <Row :gutter="50">
        <Col span="3" offset="5">
          <span class='title'>{{$t('labelPublic.yy')}}</span>
        </Col>
        <Col span="16">
          <div><Button type="primary"  icon="plus-round" @click='showModal(1)'>{{$t('publicSet.add')}}</Button></div>
          <div class="tagBox">
            <div class="tagItem" v-for='(item, index) in tagBox' :key='item.name' @click.capture='close(index, 1)'>
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Col>
      </Row>
      <Row :gutter="50">
        <Col span="3" offset="5">
          <span class='title'>{{$t('labelPublic.bm')}}</span>
        </Col>
        <Col span="16">
          <div><Button type="primary"  icon="plus-round" @click='showModal(2)'>{{$t('publicSet.add')}}</Button></div>
          <div class="tagBox">
            <div class="tagItem" v-for='(item, index) in tagBox1' :key='item.name' @click.capture='close(index, 2)'>
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Col>
      </Row>
      <Row :gutter="50">
        <Col span="3" offset="5">
          <span class='title'>{{$t('labelPublic.yh')}}</span>
        </Col>
        <Col span="16">
          <div><Button type="primary"  icon="plus-round" @click='showModal(3)'>{{$t('publicSet.add')}}</Button></div>
          <div class="tagBox">
            <div class="tagItem" v-for='(item, index) in tagBox2' :key='item.name' @click.capture='close(index, 3)'>
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Col>
      </Row>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark"  @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('userPower.msg1')"
        width='700'
        v-model="modal"
        :closable="false">
        <Table stripe :columns="col" :data="data" @on-row-click='addHosp' :height='350'></Table>
      </Modal>
      <Modal
        :title="$t('userPower.msg2')"
        width='700'
        v-model="modal1"
        :closable="false">
        <Table stripe :columns="col1" :data="data1" @on-row-click='addDept' :height='350'></Table>
      </Modal>
      <cmptChooseUserSinger :dimension='key' :openKey='modal2' :placeHolder="$t('userPower.msg3')" @setUserData='addUser'></cmptChooseUserSinger>
    </div>
  </div>
</template>

<script>
  import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
    components: {cmptChooseUserSinger},
    data () {
      return {
        titName: '',
        _url: '',
        key: true,
        modal: false,
        modal1: false,
        modal2: false,
        saveLoad: false,
        data: [],
        data1: [],
        userData: [],
        tagBox: [],
        tagBox1: [],
        tagBox2: [],
        col: [
          {
            title: this.$t('labelPublic.yy'),
            key: 'name'
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.yy'),
            key: 'hospitalName',
          }
        ],
      }
    },
    computed: {
      setHosp () {
        let _box = []
        this.tagBox.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
      setDept () {
        let _box = []
        this.tagBox1.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
      setUser () {
        let _box = []
        this.tagBox2.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
    },
    created () {
      this.getId()
      this.key = this.getHeadquarters();
    },
    methods: {
      getId () {
        let _vm = this
        let _url = ''
        if(_vm.$route.query.type == 1) {
          _url = 'guard-webManager/user/getUserGroup.jhtml'
          _vm.titName = _vm.$t('user.btn3');
        } else if(_vm.$route.query.type == 2) {
          _url = 'guard-webManager/user/getCallBack.jhtml'
          _vm.titName = _vm.$t('user.btn4');
        }
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: _url,
          data: {
            id: _vm.$route.query.id
          },
          success: function(res){
            console.log(res)
            _vm.tagBox = res.data.content.hospitalIdList
            _vm.tagBox1 = res.data.content.deptIdList
            _vm.tagBox2 = res.data.content.userIdList
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.data = res.data.content.hospitalList
            _vm.data1 = res.data.content.deptList;
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //弹窗
      showModal (type) {
        if(type === 1) {
          this.modal = true
        } else if(type === 2) {
          this.modal1 = true
        } else {
          this.modal2 = !this.modal2;
        }
      },
      //取消
      close (index, type) {
        if(type === 1) {
          this.tagBox.splice(index, 1)
        } else if(type === 2) {
          this.tagBox1.splice(index, 1)
        } else {
          this.tagBox2.splice(index, 1)
        }
      },
      //医院
      addHosp (data) {
        const index = this.tagBox.findIndex(item => item.id === data.id);
        if(index < 0) {
          this.tagBox.push(data);
        }
        this.modal = false
      },
      //部门
      addDept (data) {
        const index = this.tagBox1.findIndex(item => item.id === data.id);
        if(index < 0) {
          this.tagBox1.push(data);
        }
        this.modal1 = false;

      },
      //用户
      addUser (data) {
        const index = this.tagBox2.findIndex(item => item.id === data.id);
        if(index < 0) {
          this.tagBox2.push(data);
        }
      },
      save () {
        let _vm = this
        let _url = ''
        if(_vm.$route.query.type == 1) {
          _url = 'guard-webManager/user/updateUserEdit.jhtml'
        } else if(_vm.$route.query.type == 2) {
          _url = 'guard-webManager/user/updateCallBack.jhtml'
        }
        _vm.saveLoad = true
        _vm.$http.post({
          url: _url,
          data: {
            id: _vm.$route.query.id,
            hospitalIds: _vm.setHosp,
            deptIds: _vm.setDept,
            userIds: _vm.setUser,
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.$router.push('/user');
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.saveLoad = false
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        })            
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>
  .userPower .title {
    float: right;
    font-size: 13px;
    line-height: 32px;
  }
  .userPower .tagBox {
    padding: 10px 0;
  }
  .userPower .tagItem {
    display: inline-block;
    margin: 5px 5px;
  }
</style>