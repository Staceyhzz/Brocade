/** 
 * 批量设置回访页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('callbackDesk.btn2')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formAdd" :rules="ruleForm" :model="formAdd" label-position="right">
        <Form-item :label="$t('callbackDesk.label2')" prop='categoryId' required>
          <Select v-model="formAdd.categoryId" style="width:300px">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label1')" prop='taskTime' required>
          <Date-picker :transfer='true' type="date" :placeholder="$t('callbackDeskInfo.placeholder1')" style="width: 300px" @on-change='setTime' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label7')" prop='name' required>
          <Input v-model.trim="formAdd.name" :placeholder="$t('placeholderPublic.input')" style="width:300px" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('callbackTaskBulk.label1')" prop="type" class='radioModal' required>
          <Radio-group v-model="formAdd.type" @on-change='setType'>
            <Form-item prop="groupId">
              <Radio label="1">{{$t('callbackTaskBulk.label2')}}</Radio>
              <Select v-model="formAdd.groupId" style="width:300px">
                <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="filterId" style='margin-top:15px;'>
              <Radio label="2">{{$t('callbackTaskBulk.label3')}}</Radio>
              <Select v-model="formAdd.filterId" style="width:300px">
                <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('callbackTaskBulk.label4')" prop='userType' required>
          <Radio-group v-model="formAdd.userType" @on-change='setUserType' style="width:500px">
            <Form-item prop="userName">
              <Radio label="1">{{$t('callbackTaskBulk.label5')}}</Radio>
							<Input v-model="formAdd.userName" readonly icon="ios-search" :placeholder="$t('callbackTaskBulk.placeholder')" @on-focus="addUser" style="width:300px"></Input>
            </Form-item>
            <Form-item>
              <Radio label="2" style='margin-top:15px;'>{{$t('callbackTaskBulk.label6')}}</Radio>
            </Form-item>
            <Form-item>
              <Radio label="3" style='margin-top:15px;'>{{$t('callbackTaskBulk.label7')}}</Radio>
            </Form-item>
          </Radio-group>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
		<cmptChooseUserSinger :placeHolder="$t('callbackTaskBulk.placeholder')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackDeskInfo.valid1')));
        } else {
          callback();
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackDeskInfo.valid2')));
        } else {
          callback();
        }
      };
      const validateTypeChange = (rule, value, callback) => {
        if (this.formAdd.userType == '1') {
          if (value === '') {
            callback(new Error(this.$t('callbackDeskInfo.valid2')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      const validateGroup = (rule, value, callback) => {
        if (this.formAdd.type == '1') {
          if (value === '') {
            callback(new Error(this.$t('callbackDeskInfo.valid2')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      const validateFilter = (rule, value, callback) => {
        if (this.formAdd.type == '2') {
          if (value === '') {
            callback(new Error(this.$t('callbackDeskInfo.valid2')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
				saveLoad: false,
				userOpenKey: false,
        formAdd: {
          type: '1',
          groupId: '',
          filterId: '',
          taskTime: '',
          categoryId: '',
          name: '',
          userType: '1',
          userId: '',
          userName: '',
        },
        groupList: [],
        filterList: [],
        categoryList: [],
        ruleForm: {
          name: [{
            validator: validateText,
            trigger: 'blur'
          }],
          taskTime: [{
            validator: validateText,
            trigger: 'change'
          }],
          categoryId: [{
            validator: validateChange,
            trigger: 'change'
          }],
          userName: [{
            validator: validateTypeChange,
            trigger: 'change'
          }],
          groupId: [{
            validator: validateGroup,
            trigger: 'change'
          }],
          filterId: [{
            validator: validateFilter,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.$store.dispatch('setPageLoading', 1)
    },
    mounted() {
      if (window.localStorage) {
        var lg = window.localStorage;
      }
      this.getGroup(lg.userId)
      this.getFilterList(lg.userId)
      this.getCategory()
    },
    methods: {
      //获取用户组
      getGroup(id) {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerGroupInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.groupList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取结果集下拉列表
      getFilterList(id) {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerFilterInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.filterList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取回访类型
      getCategory() {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/callbackCategoryInfo.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              try {
                _vm.categoryList = res.data.content
              } catch (error) {
                _vm.categoryList = []
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      addUser() {
				this.userOpenKey = !this.userOpenKey;
			},
      chooseUser(data) {
        this.formAdd.userName = data.name;
        this.formAdd.userId = data.id;
      },
      setTime(date) {
        this.formAdd.taskTime = date
      },
      setType(val) {
        if (val == '1') {
          this.formAdd.filterId = ''
        } else {
          this.formAdd.groupId = ''
        }
      },
      setUserType(val) {
        if (val != '1') {
          this.formAdd.userId = ''
          this.formAdd.userName = ''
        }
      },
      save() {
        var _vm = this;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/callbackDesk/callbackTaskBulkEdit.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
									_vm.$router.push('/callbackDesk')
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
