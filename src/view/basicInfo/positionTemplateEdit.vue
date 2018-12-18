/**
 * 部位模板编辑管理
 */

<template>
  <div class="container-box position-template">
    <div class="container-header">
      <h2>{{$t('positionTemplate.tit3')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Row :gutter="32">
        <Col :sm="24" :md="12">
          <div class="container-left">
            <div class="item-title">{{$t('positionTemplateEdit.tit1')}}</div>
            <Form :label-width="100" ref="formList" :model="formList" label-position="left">
              <FormItem :label="$t('positionTemplateEdit.label1')" prop="name" >
                <span>{{formList.name}}</span>
              </FormItem>
              <div class="line">
                {{$t('positionTemplateEdit.tit4')}}
                <span v-if='formList.list.length === 0'>{{$t('positionTemplateEdit.msg1')}}</span>
                <span v-else>{{$t('positionTemplateEdit.msg2')}}</span>
              </div>
              <!-- 表单示例 -->
              <div class="examples"  v-if='formList.list.length === 0'>
                <FormItem :label="$t('positionTemplateEdit.label2')" required>
                  <Input :placeholder="$t('placeholderPublic.input')" readonly></Input>
                </FormItem>
                <FormItem :label="$t('positionTemplateEdit.label3')" required>
                  <InputNumber></InputNumber>
                  <span>cm</span>
                </FormItem>
                <FormItem :label="$t('positionTemplateEdit.label4')" required>
                  <RadioGroup>
                    <Radio :label="0">{{$t('positionTemplateEdit.label5')}}</Radio>
                    <Radio :label="1">{{$t('positionTemplateEdit.label6')}}</Radio>
                    <Radio :label="2">{{$t('positionTemplateEdit.label7')}}</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem :label="$t('positionTemplateEdit.label8')" required>
                  <CheckboxGroup>
                    <Checkbox :label="0">{{$t('positionTemplateEdit.label9')}}</Checkbox>
                    <Checkbox :label="1">{{$t('positionTemplateEdit.label10')}}</Checkbox>
                    <Checkbox :label="2">{{$t('positionTemplateEdit.label11')}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </div>
              <!-- 已添加表单 -->
              <draggable v-model="formList.list" :options="{animation: 150, disabled: dragKey}" @update='sortNum'>
                <div v-for='(item, index) in formList.list' :key='index' class="form-item">
                  <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 1'>
                    <Input :placeholder="$t('placeholderPublic.input')" :disabled='item.status === 0'></Input>
                  </FormItem>
                  <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 2'>
                    <InputNumber :disabled='item.status === 0'></InputNumber>
                    <span>{{item.unitName}}</span>
                  </FormItem> 
                  <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 3'>
                    <RadioGroup>
                      <Radio :label="index1" v-for='(item1, index1) in item.labelList' :key='index1' :disabled='item.status === 0 || item1.status === 0'>{{item1.labelName}}</Radio>
                    </RadioGroup>
                  </FormItem> 
                  <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 4'>
                    <CheckboxGroup>
                      <Checkbox :label="index1" v-for='(item1, index1) in item.labelList' :key='index1' :disabled='item.status === 0 || item1.status === 0'>{{item1.labelName}}</Checkbox>
                    </CheckboxGroup>
                  </FormItem> 
                  <FormItem :label="item.contentName" v-if='item.type === 5' :required='item.required === 1'>
                    <div :class="['add-photo', item.status === 0 ? 'photo-disable' : '']">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </FormItem> 
                  <FormItem :label="item.contentName" v-if='item.type === 6' :required='item.required === 1'>
                    <Input readonly icon="ios-search" :placeholder="$t('positionTemplateEdit.valid4')" :disabled='item.status === 0'></Input>
                  </FormItem> 
                  <div class="label-btn">
                    <span @click="editForm(item, index)"><Icon type="edit"></Icon></span>
                    <span @click="delForm(item, index)"><Icon type="trash-a"></Icon></span>
                  </div>
                </div>
              </draggable>
            </Form>
          </div>
        </Col>
        <Col :sm="24" :md="12">
          <!-- 编辑表单元件 -->
          <div class="container-left" v-if='formEditKey'>
            <div class="item-title">{{$t('positionTemplateEdit.tit2')}}</div>
            <Form :label-width="100" ref="formEdit" :model="formEdit" label-position="left">
              <FormItem :label="$t('positionTemplateEdit.label12')" prop="contentName" required  v-if='formEditKey !== 5 && formEditKey !== 6'> 
                <Input v-model.trim="formEdit.contentName" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
              </FormItem>
              <FormItem :label="$t('positionTemplateEdit.menu5')" v-if='formEditKey === 5'> 
                <div class="add-photo">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </FormItem>
              <FormItem :label="$t('positionTemplateEdit.menu6')" v-if='formEditKey === 6'> 
                <Input readonly icon="ios-search" :placeholder="$t('positionTemplateEdit.valid4')"></Input>
              </FormItem>
              <FormItem :label="$t('positionTemplateEdit.label13')" prop="status" required>
                <RadioGroup v-model="formEdit.status">
                  <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
                  <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem :label="$t('positionTemplateEdit.label14')" prop="required" required>
                <RadioGroup v-model="formEdit.required">
                  <Radio :label="0">{{$t('positionTemplateEdit.label15')}}</Radio>
                  <Radio :label="1">{{$t('positionTemplateEdit.label16')}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem :label="$t('positionTemplateEdit.label17')" prop="company" required v-if='formEditKey === 2'>
                <Select v-model="formEdit.company" transfer :placeholder="$t('positionTemplateEdit.valid2')">
                  <Option v-for="item in addUnitList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <div class="label-edit-box" v-if='formEditKey === 3 || formEditKey === 4'>
                <div v-for='(item, index) in formEdit.labelList' :key="index" class="label-edit-item">
                  <FormItem :label="$t('positionTemplateEdit.label18', [index + 1])" required>
                    <Input v-model.trim="formEdit.labelList[index].labelName" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
                  </FormItem>
                  <div class="edit-label-btn">
                    <span @click="editLabelDel(index)" v-if='item.addKey'>{{$t('publicSet.del')}}</span>
                    <span @click="editChangeStatus(index, formEdit.labelList[index].status)" v-if='!item.addKey'>{{ changeLabelStatusText(formEdit.labelList[index].status)}}</span>
                  </div>
                </div>
                <div class="label-edit-add" @click="editLabelAdd">
                  {{$t('positionTemplateEdit.btn2')}}
                </div>
              </div>
            </Form>
            <div class="add-form">
              <Button type="primary" @click="saveEdit">{{$t('publicSet.save')}}</Button>
              <Button type="primary" @click="cancelEdit">{{$t('publicSet.cancel')}}</Button>
            </div>
          </div>
          <!-- 添加表单元件 -->
          <div class="container-right" v-else>
            <div class="item-title">{{$t('positionTemplateEdit.tit3')}}</div>
            <Tabs :animated='false'>
              <TabPane :label="$t('positionTemplateEdit.menu1')">
                <div class="tab-input">
                  <Input v-model.trim="addText" :placeholder="$t('positionTemplateEdit.valid1')" :maxlength="20"></Input>
                </div>
                <div class="add-form">
                  <Button type="primary" @click="addForm(1)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
              <TabPane :label="$t('positionTemplateEdit.menu2')">
                <div class="tab-input">
                  <Input v-model.trim="addNum" :placeholder="$t('positionTemplateEdit.valid1')" :maxlength="20"></Input>
                </div>
                <div class="tab-input">
                  <Select v-model="addNumUnit" transfer :placeholder="$t('positionTemplateEdit.valid2')">
                    <Option v-for="item in addUnitList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="add-form">
                  <Button type="primary"  @click="addForm(2)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
              <TabPane :label="$t('positionTemplateEdit.menu3')">
                <div class="tab-input">
                  <Input v-model.trim="addRadio" :placeholder="$t('positionTemplateEdit.valid1')" :maxlength="20"></Input>
                </div>
                <div class="tab-input">
                  <div class="choose-item" v-for="(item, index) in addRadioList" :key='index'>
                    <span class="radio"></span>
                    {{item.labelName}}
                    <span class="label-del" @click="delLabel(true, index)">{{$t('publicSet.del')}}</span>
                  </div>
                </div>
                <div class="tab-input">
                  <Input v-model.trim="addRadioLabel" :placeholder="$t('positionTemplateEdit.valid3')" :maxlength="20" style="width: 200px;"></Input>
                  <span class="label-add" @click="addLebel(true)">{{$t('positionTemplateEdit.btn2')}}</span>
                </div>
                <div class="add-form">
                  <Button type="primary"  @click="addForm(3)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
              <TabPane :label="$t('positionTemplateEdit.menu4')">
                <div class="tab-input">
                  <Input v-model.trim="addCheck" :placeholder="$t('positionTemplateEdit.valid1')" :maxlength="20"></Input>
                </div>
                <div class="tab-input">
                  <div class="choose-item" v-for="(item, index) in addCheckList" :key='index'>
                    <span class="check"></span>
                    {{item.labelName}}
                    <span class="label-del" @click="delLabel(false, index)">{{$t('publicSet.del')}}</span>
                  </div>
                </div>
                <div class="tab-input">
                  <Input v-model.trim="addCheckLabel" :placeholder="$t('positionTemplateEdit.valid3')" :maxlength="20" style="width: 200px;"></Input>
                  <span class="label-add" @click="addLebel(false)">{{$t('positionTemplateEdit.btn2')}}</span>
                </div>
                <div class="add-form">
                  <Button type="primary"  @click="addForm(4)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
              <TabPane :label="$t('positionTemplateEdit.menu5')">
                <div class="add-photo">
                  <Icon type="camera" size="20"></Icon>
                </div>
                <div class="add-form">
                  <Button type="primary"  @click="addForm(5)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
              <TabPane :label="$t('positionTemplateEdit.menu6')">
                <div class="tab-input">
                  <Input readonly icon="ios-search" :placeholder="$t('positionTemplateEdit.valid4')"></Input>
                </div>
                <div class="add-form">
                  <Button type="primary"  @click="addForm(6)">{{$t('positionTemplateEdit.btn1')}}</Button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  export default {
    components: {draggable},
    data () {
      return {
        formList: {
          name: '',
          list: []
        },

        dragKey: false,
        dragMsg: false,

        addText: '',
        addNum: '',
        addNumUnit: '',
        addUnitList: [],
        addRadio: '',
        addRadioLabel: '',
        addRadioList: [],
        addCheck: '',
        addCheckLabel: '',
        addCheckList: [],

        formEdit: {},
        formEditKey: '',
        formEditIndex: '',
      }
    },
    filters: {
      statusText(val) {
        if(val === 1) {
          return '禁用';
        } else {
          return '启用';
        }
      },
    },
    computed: {

    },
    created () {
      this.formList.name = this.$route.query.name;
      this.getUnitList();
    },
    mounted () {
      this.getFormList();
    },
    methods: {
      //获取模板表单
      getFormList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerManagement/findByIdSmarteffectrrackingtemplatetitle.jhtml',
          data: {
            Id: _vm.$route.query.id,
            status: 2
          },
          success: function(res){
            const _data = res.data.content.content.filter(item => item.type !== 0) || [];
            _vm.formList.list = _data.map(item => {
              if(item.type === 2) {
                const index = _vm.addUnitList.findIndex(u => u.id === item.company * 1);
                item.unitName = index >= 0
                  ? _vm.addUnitList[index].name
                  : '';
                item.company = item.company * 1;
              }
              if(item.type === 3 || item.type === 4) {
                item.labelList.map(l => {
                  l.addKey = false;
                });
              }
              return item;
            }) || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取单位
      getUnitList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerManagement/findByCodeSmartSelectr.jhtml',
          data: {code: 1},
          success: function(res){
            if(res.data.code === 0) {
              _vm.addUnitList = res.data.content.content || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },

      //排序
      sortNum() {
        let _vm = this;
        const data = _vm.formList.list.map((item, index) => {
          return {
            orderBy: index + 1,
            contentId: item.contentId
          };
        });
        _vm.dragKey = true;
        _vm.$http.post({
          url: 'guard-webManager/customerManagement/updateSortNumber.jhtml',
          data: {
            content: JSON.stringify(data)
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.dragKey = false;
              if(!_vm.dragMsg) {
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: _vm.$t('publicSet.noticeSuccess')
                });
                _vm.dragMsg = false;
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },

      //删除表单元件
      delForm(data, index) {
        let _vm = this;
        _vm.$http.post({
          url: 'guard-webManager/customerManagement/deleteByIdSmarteffectrrackingtitleAndcontent.jhtml',
          data: {
            parentId: data.parentId,
            contentId: data.contentId,
            type: data.type
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.formEditKey = '';
              _vm.formList.list.splice(index, 1);
              _vm.dragMsg = true;
              _vm.sortNum();
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //添加表单元件
      addForm(type) {
        let _vm = this;
        //验证添加表单是否正确
        if(!_vm.addFormRule(type)) {
          return;
        }
        let addObj = {
          parentId: '',
          parentName: '',
          templateId: _vm.$route.query.id,
          type: type,
          company: '',
          contentId: '',
          contentName: '',
          status: 1,
          required: 1,
          orderBy: _vm.formList.list.length + 1,
          content: '',
          labelList: []
        };
        let url = '';
        if(type === 1) {
          addObj.parentName = '文本';
          addObj.contentName = this.addText;
          this.addText = '';
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContent.jhtml';
        }
        if(type === 2) {
          addObj.parentName = '数字';
          addObj.contentName = this.addNum;
          addObj.company = this.addNumUnit;
          this.addNum = '';
          this.addNumUnit = '';
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContent.jhtml';
        }
        if(type === 3) {
          addObj.content = JSON.stringify(this.addRadioList);
          addObj.labelList = JSON.parse(JSON.stringify(this.addRadioList));
          addObj.parentName = '单项选折';
          addObj.contentName = this.addRadio;
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContentAndSingleAndMany.jhtml';
          this.addRadio = '';
          this.addRadioLabel = '';
          this.addRadioList = [];
        }
        if(type === 4) {
          addObj.content = JSON.stringify(this.addCheckList);
          addObj.labelList = JSON.parse(JSON.stringify(this.addCheckList));
          addObj.parentName = '多项选折';
          addObj.contentName = this.addCheck;
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContentAndSingleAndMany.jhtml';
          this.addCheck = '';
          this.addCheckLabel = '';
          this.addCheckList = [];
        }
        if(type === 5) {
          addObj.parentName = '上传照片';
          addObj.contentName = '上传照片';
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContent.jhtml';
        }
        if(type === 6) {
          addObj.parentName = '项目关联';
          addObj.contentName = '项目关联';
          url = 'guard-webManager/customerManagement/addSmarteffectrrackingtexttitleAndContent.jhtml';
        }
        _vm.$http.post({
          url: url,
          data: addObj,
          success: function(res){
            if(res.data.code === 0) {
              _vm.getFormList();
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //表单元件规则
      addFormRule(type) {
        if(type === 5) {
          const imgList = this.formList.list.findIndex(item => item.type === 5);
          if(imgList >= 0) {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('positionTemplateEdit.valid5')
            });
            return false;
          }
        }
        if(type === 6) {
          const chargeList = this.formList.list.findIndex(item => item.type === 6);
          if(chargeList >= 0) {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('positionTemplateEdit.valid6')
            });
            return false;
          }
        }
        //判断元件个数是否超过10个
        const formTypeList = this.formList.list.filter(item => item.type === type);
        if(formTypeList.length > 9) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('positionTemplateEdit.valid7')
          });
          return false;
        }
        //分别对元件验证
        const ruleKey = [
          {
            id: 1,
            key: 'addText'
          },
          {
            id: 2,
            key: 'addNum'
          },
          {
            id: 3,
            key: 'addRadio'
          },
          {
            id: 4,
            key: 'addCheck'
          }
        ];
        const index = ruleKey.findIndex(item => item.id === type);
        if(index < 0) {
          return true;
        }
        if(this[ruleKey[index].key] === '') {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('positionTemplateEdit.valid1')
          });
          return false;
        }
        if(type === 2 && this.addNumUnit === '') {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('positionTemplateEdit.valid2')
          });
          return false;
        }
        if(type === 3 && this.addRadioList.length === 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('positionTemplateEdit.valid3')
          });
          return false;
        }
        if(type === 4 && this.addCheckList.length === 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('positionTemplateEdit.valid3')
          });
          return false;
        }
        return true;
      },
      //添加元件时，添加单、多选项
      addLebel(type) {
        if(type) {
          //判断是否单选选项内容为空
          if(this.addRadioLabel === '') {
            return;
          }
          if(this.addRadioList.length > 9) {
            return;
          }
          this.addRadioList.push({
            labelName: this.addRadioLabel,
            status: 1
          });
          this.addRadioLabel = '';
        } else {
          //判断是否多选选项内容为空
          if(this.addCheckLabel === '') {
            return;
          }
          if(this.addCheckList.length > 9) {
            return;
          }
          this.addCheckList.push({
            labelName: this.addCheckLabel,
            status: 1
          });
          this.addCheckLabel = '';
        }
      },
      delLabel(type, index) {
        if(type) {
          this.addRadioList.splice(index, 1);
        } else {
          this.addCheckList.splice(index, 1);
        }
      },

      //编辑元件
      editForm(data, index) {
        this.formEdit = Object.assign({}, data);
        if(data.type === 3 || data.type === 4) {
          this.formEdit.labelList = JSON.parse(JSON.stringify(data.labelList));
        }
        this.formEditKey = data.type;
        this.formEditIndex = index;
      },
      editLabelAdd() {
        if(this.formEdit.labelList.length > 9) {
          return;
        }
        this.formEdit.labelList.push({
          labelName: this.addRadioLabel,
          status: 1,
          id: 0,
          addKey: true
        });
      },
      //改变选择状态
      editChangeStatus(index, status) {
        if(this.formEdit.required === 1 && status === 1) {
          const list = this.formEdit.labelList.filter(item => item.status === 1);
          if(list.length < 2) {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('positionTemplateEdit.valid9')
            });
            return;
          }
        }
        const num = status === 1
          ? 0
          : 1;
        this.formEdit.labelList[index].status = num;
      },
      changeLabelStatusText(status) {
        if(status === 0) {
          return this.$t('publicSet.enable');
        } else {
          return this.$t('publicSet.disable');
        }
      },
      editLabelDel(index) {
        this.formEdit.labelList.splice(index, 1);
      },
      saveEdit() {
        let _vm = this;
        let url = '';
        if(_vm.formEdit.contentName === '') {
          _vm.$Notice.error({
            title: _vm.$t('publicSet.noticeTit'),
            desc: _vm.$t('positionTemplateEdit.valid1')
          });
          return;
        }
        if(_vm.formEditKey === 3 || _vm.formEditKey === 4) {
          const index = _vm.formEdit.labelList.findIndex(item => item.labelName === '');
          if(index >= 0) {
            _vm.$Notice.error({
              title: _vm.$t('publicSet.noticeTit'),
              desc: _vm.$t('positionTemplateEdit.valid8')
            });
            return;
          }
          if(_vm.formEdit.required === 1) {
            const list = _vm.formEdit.labelList.filter(item => item.status === 1);
            if(list.length === 0) {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('positionTemplateEdit.valid9')
              });
              return;
            }
          }
        }
        if(_vm.formEditKey === 3 || _vm.formEditKey === 4) {
          url = 'guard-webManager/customerManagement/updateSmarteffectrrackingtexttitleAndContentAndSingleAndMany.jhtml'
          const list = _vm.formEdit.labelList.map(item => {
            return {
              labelName: item.labelName,
              id: item.id || 0,
              status: item.status
            };
          });
          _vm.formEdit.content = JSON.stringify(list);
        } else {
          url = 'guard-webManager/customerManagement/updateSmarteffectrrackingtexttitleAndContent.jhtml'
        }
        _vm.$http.post({
          url: url,
          data: _vm.formEdit,
          success: function(res){
            if(res.data.code === 0) {
              _vm.getFormList();
              _vm.formEditKey = '';
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      cancelEdit() {
        this.formEditKey = '';
      },
      back () {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang='less'>
  .position-template {
    .container-body {
      background-color: #F2F4F8;
      box-shadow: none;
    }
    .container-right, 
    .container-left {
      position: relative;
      padding: 50px 30px 30px;
      border-radius: 5px;
      margin-bottom: 30px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42, 42, 68, 0.1);
    }
    .item-title {
      position: absolute;
      left: -16px;
      top: 10px;
      border-color: rgb(38, 30, 182);
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
      background-color: #4172F6;
      margin: 5px 0 15px 2px;
      font-size: 14px;
      color: #fff;
      border-radius: 0 4px 4px 0;
      display: inline-block;
      padding: 7px 11px 7px 16px;
      line-height: 1;
      &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        border-top: 0 solid transparent;
        border-right-width: 1em;
        border-right-color: inherit;
        border-right-style: solid;
        border-bottom: 1em solid transparent;
        border-left: 0 solid transparent;
        width: 0;
        height: 0;
      }
    }
    .line {
      padding-top: 20px;
      border-top: 1px dashed #dedede;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 20px;
      span {
        padding-left: 20px;
        font-size: 12px;
        color: #797979;
      }
    }
    .examples {
      padding: 10px;
      border: 1px dashed #dedede;
      border-radius: 4px;
      label {
        color: #797979 !important;
      }
    }
    .add-form {
      margin-top: 20px;
      text-align: center;
      button {
        min-width: 70px;
        margin: 0 10px;
      }
    }
    .tab-input {
      max-width: 300px;
      padding: 10px 0;
      margin: 0 auto;
    }
    .choose-item {
      position: relative;
      padding: 0 60px 0 30px;
      margin: 10px 0;
    }
    .radio {
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 14px;
      margin-top: -7px;
      background-color: #fff;
      border: 1px solid #d7dde4;
      border-radius: 50%;
    }
    .check {
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 14px;
      margin-top: -7px;
      border: 1px solid #d7dde4;
      border-radius: 2px;
      background-color: #fff;
    }
    .label-del {
      position: absolute;
      right: 0;
      top: 50%;
      height: 14px;
      margin-top: -7px;
      font-size: 12px;
      line-height: 14px;
      color: #4172F6;
      cursor: pointer;
    }
    .label-add {
      display: inline-block;
      width: 90px;
      text-align: right;
      color: #4172F6;
      cursor: pointer;
    }
    .form-item {
      position: relative;
      padding-right: 60px;
    }
    .label-btn {
      position: absolute;
      right: 0;
      top: 50%;
      height: 20px;
      margin-top: -10px;
      font-size: 14px;
      line-height: 20px;
      span {
        padding: 0 5px;
        cursor: pointer;
      }
    }
    .label-edit-box {
      padding: 15px;
      border: 1px dashed #dedede;
      border-radius: 4px;
    }
    .label-edit-item {
      position: relative;
      padding-right: 60px;
    }
    .label-edit-add {
      width: 100px;
      height: 16px;
      margin: 0 auto;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #4172F6;
      cursor: pointer;
    }
    .edit-label-btn {
      position: absolute;
      right: 0;
      top: 16px;
      height: 14px;
      margin-top: -7px;
      font-size: 12px;
      line-height: 14px;
      color: #4172F6;
      cursor: pointer;
    }
    .add-photo {
      width: 58px;
      height: 58px;
      border: 1px dashed #d7dde4;
      margin: 0 auto;
      text-align: center;
      line-height: 58px;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
    }
    .photo-disable {
      background-color: #f3f3f3;
    }
    .container-left {
      .add-photo {
        margin: 0;
      }
    }
  }
</style>

<style lang='less'>
  .position-template .examples .ivu-form-item-label {
    color: #797979 !important;
    &::before {
      color: #797979 !important;
    }
  }
</style>  

