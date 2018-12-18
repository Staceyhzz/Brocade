/**
* 医院下拉部门弹窗选择组件
*/
<template>
  <div id="hospChooseDept" :style="_style">
    <Input v-model="_deptName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="showDept"></Input>
    <Modal
      :title="_placeHolder"
      width='700'
      v-model="modal"
      :closable="false"
      class-name="vertical-center-modal">
      <Form :label-width="50" inline ref='hospFormDept' :model='hospFormDept'>
        <Form-item label="医院" prop='hospitalId' v-if='_type'>
          <Select v-model="hospFormDept.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="名称" prop='name'>
          <Input v-model.trim="hospFormDept.name" placeholder="请输入姓名" @on-enter="getDept"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getDept"><Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('hospFormDept')"><Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'hospChooseUser',
    props: {
      _placeHolder: String,
      _deptName: String,
      _style: Object,
      _type: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        modal: false,
        hospFormDept: {
          hospitalId: '',
          name: '',
        },
        userCol: [
          {
            title: '医院',
            key: 'hospitalName'
          },
          {
            title: '部门',
            key: 'name'
          },
        ],
        userData: [],
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
    },
    created () {
      if(!this._type) {
        this.hospFormDept.hospitalId = localStorage.getItem('hospId');
      } else {
        this.hospFormDept.hospitalId = '';
      }
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.getDept();
    },
    methods: {
      //弹窗搜索
      getDept () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/deptList.jhtml',
          data: _vm.hospFormDept,
          success: function(res){
            if(res.data.code === 0 ) {
              _vm.userData = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      showDept () {
        this.modal = true
      }, 
      chooseUser (data) {
        let _data = {
          id: data.id,
          name: data.name,
        }
        this.$emit('setDeptName', _data)
        this.modal = false
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        if(!this._type) {
          this.hospFormDept.hospitalId = localStorage.getItem('hospId')
        } else {
          this.hospFormDept.hospitalId = ''
        }
        this.getDept()
      }
    }
  }
</script>