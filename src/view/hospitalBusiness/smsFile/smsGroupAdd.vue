/** 
 * 添加短信发送任务 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('smsGroup.modalTit1')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formAdd" :rules="ruleForm" :model="formAdd" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop='name' required>
          <Input v-model.trim="formAdd.name" :placeholder="$t('placeholderPublic.input')" style="width:300px" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('smsGroupAdd.label1')" prop='type' required>
          <Radio-group v-model="formAdd.type" style="width:500px">
            <Form-item prop="groupId" style='marginBottom:20px'>
              <Radio :label="1">{{$t('smsGroupAdd.label2')}}</Radio>
              <Select v-model="formAdd.groupId" style="width:300px">
                <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="filterId">
              <Radio :label="2">{{$t('smsGroupAdd.label3')}}</Radio>
              <Select v-model="formAdd.filterId" style="width:300px">
                <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('smsGroupAdd.label4')" prop='templateId' required>
          <Select v-model="formAdd.templateId" style="width:300px" @on-change='setTem'>
            <Option v-for="item in templateList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('smsGroupAdd.label5')">
          <span>{{temContent}}</span>
        </Form-item>
        <Form-item :label="$t('smsGroupAdd.label6')">
          <span>{{temNum}}</span>
        </Form-item>
        <!-- <Form-item :label="$t('smsGroupAdd.label7')">
          <span>{{$t('smsGroupAdd.msg')}}</span>
        </Form-item> -->
        <Form-item :label="$t('smsGroupAdd.label8', [item])" :prop="'param' + item" v-for='(item, index) in paramsList' :key='index'>
          <Input v-model.trim="formAdd['param' + (index + 1)]" :placeholder="$t('placeholderPublic.input')" style="width:300px" :maxlength='1000'></Input>
          <span v-if='index === 0'>{{$t('smsGroupAdd.msg')}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateTem = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('smsGroupAdd.valid1')));
        } else {
          callback()
        }
      }
      const validateFil = (rule, value, callback) => {
        if (this.formAdd.type === 2) {
          if (value === '') {
            callback(new Error(this.$t('smsGroupAdd.valid2')));
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const validateCus = (rule, value, callback) => {
        if (this.formAdd.type === 1) {
          if (value === '') {
            callback(new Error(this.$t('smsGroupAdd.valid3')));
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback()
        }
      }
      return {
        saveLoad: false,
        formAdd: {
          name: '',
          type: 1,
          groupId: '',
          filterId: '',
          templateId: '',
          param1: '',
          param2: '',
          param3: '',
          param4: '',
          param5: '',
          param6: '',
          param7: '',
          param8: '',
          remark: '',
        },
        temContent: '',
        temNum: '',
        groupList: [],
        filterList: [],
        templateList: [],
        paramsList: [],
        ruleForm: {
          templateId: [{
            validator: validateTem,
            trigger: 'change'
          }],
          filterId: [{
            validator: validateFil,
            trigger: 'change'
          }],
          groupId: [{
            validator: validateCus,
            trigger: 'change'
          }],
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.$store.dispatch('setPageLoading', 1)
    },
    mounted() {
      this.getFilterList(localStorage.getItem('userId'))
      this.getGroupList(localStorage.getItem('userId'))
      this.getTemplateList()
    },
    methods: {
      getFilterList(id) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerFilterInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.filterList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      getGroupList(id) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerGroupInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.groupList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      getTemplateList() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/smsTemplateList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.templateList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      setTem(id) {
        const _index = this.templateList.findIndex((item) => item.id == id);
        this.paramsList = [];
        for (let i = 1; i <= 8; i++) {
          this.formAdd['param' + i] = '';
        }
        this.temContent = this.templateList[_index].content;
        this.temNum = this.templateList[_index].paramNum;
        for (let i = 1; i <= this.temNum; i++) {
          this.paramsList.push("${" + this.templateList[_index]['param' + i] + "}");
        }
      },
      save() {
        let _vm = this
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/smsGroup/add.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  let breadData = [{
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/smsGroup',
                      text: 'layoutNav.smsGroup'
                    },
                    {
                      url: '/smsGroupRecord',
                      text: _vm.formAdd.name
                    }
                  ]
                  _vm.$store.dispatch('setBreadData', breadData)
                  _vm.$router.push({
                    path: '/smsGroupRecord',
                    query: {
                      id: res.data.content
                    }
                  })
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
