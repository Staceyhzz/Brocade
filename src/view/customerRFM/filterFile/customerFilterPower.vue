/** * 设置权限 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>设置客户结果集权限</h2>
    </div>
    <div class="container-body">
      <Row :gutter="50">
        <Col span="3" offset="5">
        <span class='title'>医院</span>
        </Col>
        <Col span="16">
        <div>
          <Button type="primary" icon="plus-round" @click='showModal(1)'>增加</Button>
        </div>
        <div class="tagBox">
          <div class="tagItem" v-for='(item, index) in tagBox' :key='item.name' @click.capture='close(index, 1)'>
            <Tag type="border" closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        </Col>
      </Row>
      <Row :gutter="50">
        <Col span="3" offset="5">
        <span class='title'>部门</span>
        </Col>
        <Col span="16">
        <div>
          <Button type="primary" icon="plus-round" @click='showModal(2)'>增加</Button>
        </div>
        <div class="tagBox">
          <div class="tagItem" v-for='(item, index) in tagBox1' :key='item.name' @click.capture='close(index, 2)'>
            <Tag type="border" closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        </Col>
      </Row>
      <Row :gutter="50">
        <Col span="3" offset="5">
        <span class='title'>用户</span>
        </Col>
        <Col span="16">
        <div>
          <Button type="primary" icon="plus-round" @click='showModal(3)'>增加</Button>
        </div>
        <div class="tagBox">
          <div class="tagItem" v-for='(item, index) in tagBox2' :key='item.name' @click.capture='close(index, 3)'>
            <Tag type="border" closable color="blue">{{item.name}}</Tag>
          </div>
        </div>
        </Col>
      </Row>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>返回</Button>
      </div>
      <Modal title="选择医院" width='700' v-model="modal" :closable="false">
        <Table stripe :columns="col" :data="data" @on-row-click='addHosp' :height='350'></Table>
      </Modal>
      <Modal title="选择部门" width='700' v-model="modal1" :closable="false">
        <Table stripe :columns="col1" :data="data1" @on-row-click='addDept' :height='350'></Table>
      </Modal>
      <Modal title="选择用户" width='700' v-model="modal2" :closable="false" class-name="vertical-center-modal">
        <Form :label-width="50" inline ref='hospFormUser' :model='hospFormUser'>
          <Form-item label="账号" prop='account'>
            <Input v-model.trim="hospFormUser.account" placeholder="请输入账号" @on-enter="getUser"></Input>
          </Form-item>
          <Form-item label="姓名" prop='name'>
            <Input v-model.trim="hospFormUser.name" placeholder="请输入姓名" @on-enter="getUser"></Input>
          </Form-item>
          <ul class="header-btn-group not-float">
            <li class="header-item" @click="getUser">
              <Icon type="search"></Icon>查询</li>
            <li class="header-item" @click="handleReset('hospFormUser')">
              <Icon type="refresh"></Icon>重置</li>
          </ul>
        </Form>
        <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        modal1: false,
        modal2: false,
        saveLoad: false,
        hospFormUser: {
          hospitalId: '',
          account: '',
          name: '',
        },
        data: [],
        data1: [],
        userData: [],
        tagBox: [],
        tagBox1: [],
        tagBox2: [],
        col: [{
          title: '名称',
          key: 'name'
        }],
        col1: [{
            title: '名称',
            key: 'name'
          },
          {
            title: '所属医院',
            key: 'hospitalName',
          }
        ],
        userCol: [{
            title: '账号',
            key: 'account'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '医院',
            key: 'hospitalName'
          },
          {
            title: '部门',
            key: 'deptName'
          },
          {
            title: '性别',
            key: 'gender'
          },
        ],
      }
    },
    computed: {
      setHosp() {
        let _box = []
        this.tagBox.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
      setDept() {
        let _box = []
        this.tagBox1.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
      setUser() {
        let _box = []
        this.tagBox2.map(item => {
          _box.push(item.id)
        })
        return _box.join(',')
      },
    },
    created() {
      this.getId()
      this.hospFormUser.hospitalId = localStorage.getItem('hospId')
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList')
      this.getUser()
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerFilter/authorObject.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
						_vm.tagBox = res.data.content.hospitalIdList
						_vm.tagBox1 = res.data.content.deptIdList
						_vm.tagBox2 = res.data.content.userIdList
						_vm.$store.dispatch('setPageLoading', 1)
						_vm.data = res.data.content.hospitalList
						_vm.data1 = res.data.content.deptList
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //弹窗搜索
      getUser() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/userList.jhtml',
          data: _vm.hospFormUser,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.userData = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      chooseUser(data) {
        let _bool = true
        this.tagBox2.map(item => {
          if (item.id === data.id) {
            _bool = false
          }
        })
        if (_bool) {
          this.tagBox2.push(data)
        }
        this.modal2 = false
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.getUser()
      },
      //弹窗
      showModal(type) {
        if (type === 1) {
          this.modal = true
        } else if (type === 2) {
          this.modal1 = true
        } else {
          this.modal2 = true
        }
      },
      //取消
      close(index, type) {
        if (type === 1) {
          this.tagBox.splice(index, 1)
        } else if (type === 2) {
          this.tagBox1.splice(index, 1)
        } else {
          this.tagBox2.splice(index, 1)
        }
      },
      //医院
      addHosp(data) {
        let _bool = true
        this.tagBox.map(item => {
          if (item.id === data.id) {
            _bool = false
          }
        })
        if (_bool) {
          this.tagBox.push(data)
        }
        this.modal = false
      },
      //部门
      addDept(data) {
        let _bool = true
        this.tagBox1.map(item => {
          if (item.id === data.id) {
            _bool = false
          }
        })
        if (_bool) {
          this.tagBox1.push(data)
        }
        this.modal1 = false
      },
      save() {
        let _vm = this
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/customerFilter/updateAuthor.jhtml',
          data: {
            id: _vm.$route.query.id,
            hospitalIds: _vm.setHosp,
            deptIds: _vm.setDept,
            userIds: _vm.setUser,
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.$router.push('/customerFilter')
            } else {
              _vm.saveLoad = false
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      back() {
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
