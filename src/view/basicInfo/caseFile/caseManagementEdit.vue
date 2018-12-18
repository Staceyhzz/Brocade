/**
* 病例表单设计
*/

<template>
  <div class="container-box case-management-edit">
    <div class="container-header">
      <h2>病例表单设计</h2>
    </div>
    <div class="container-body">
      <div class="components">
        <h3 class="com-title">表单元件</h3>
        <div class="item-tit">通用字段</div>
        <ul>
          <draggable v-model="list1" :options="{sort:false, group:{name:'people', pull:'clone', put:false}}">
            <li v-for="(item, index) in list1" :key="index" @dblclick="addClickList(item)">
              <Tag type="dot" class="item-tag">{{item.name}}</Tag> 
            </li>
          </draggable>
        </ul>
        <div class="item-tit">CRM字段</div>
        <ul>
          <draggable v-model="list2" :options="{sort:false, group:{name:'people', pull:'clone', put:false}}">
            <li v-for="(item, index) in list2" :key="index" @dblclick="addClickListCRM(item)">
              <Tag type="dot" class="item-tag">{{item.name}}</Tag>
            </li>
          </draggable>
        </ul>
      </div>
      <div class="main">
        <div class="title">
          <p v-show='!formTitleKey && !formTitle' @click="changeFormTitle(true)">点击填写模板名称</p>
          <p v-show='!formTitleKey && formTitle' @click="changeFormTitle(true)">{{formTitle}}</p>
          <Input v-model.trim="formTitle" v-show='formTitleKey' @on-blur='changeFormTitle(false)' ref='titleText' :maxlength="20"></Input>
          <div class="form-status" v-if="!key">
            表单模板状态
            <RadioGroup v-model="formStatus">
              <Radio :label="1">启用</Radio>
              <Radio :label="0">禁用</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="show-first" v-if="formList.length === 0">
          <h3>点击或拖动左侧组件创建表单!</h3>
          <p>此处为创建自定义表单的预览界面</p>
        </div>
        <Form :label-width="100" label-position="left" class="form-box">
          <Row type="flex" justify="start">
            <draggable v-model="formList" :options="{animation: 150, sort:true, group:'people'}" @add='addIntoList' class="drag-list">
              <Col v-for='(item, index) in formList' :key='index' :class="['form-item', chooseId === item.timeId ? 'choose-item' : '']" :span='item.col' @click.native="chooseForm(item)">
                <span class="btn-del" v-show='chooseId === item.timeId' @click="removeFrom(item)"><Icon type="close-round"></Icon></span>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 1'>
                  <Input :placeholder="item.placeholder" :disabled='item.status === 0' :value="item.content"  :maxlength="item.maxlength" readonly></Input>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 2'>
                  <Input :placeholder="item.placeholder" :disabled='item.status === 0' :autosize="{minRows: 2,maxRows: 2}" type="textarea" :value="item.content" readonly :maxlength="item.maxlength"></Input>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 3'>
                  <InputNumber :disabled='item.status === 0' readonly :value="item.content"></InputNumber>
                  <span>{{item.unit}}</span>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 4'>
                  <RadioGroup :vertical='item.vertical === 1 ? false : true'>
                    <Radio :label="item1.id" v-for="(item1, index1) in item.labelList" :key="index1" :disabled='item1.status === 0'>{{item1.name}}</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 5'>
                  <CheckboxGroup :vertical='item.vertical === 1 ? false : true'>
                    <Checkbox :label="item1.id" v-for="(item1, index1) in item.labelList" :key="index1" :disabled='item1.status === 0'>{{item1.name}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 6'>
                  <Select transfer :disabled='item.status === 0'>
                    <Option v-for="(item1, index1) in item.labelList" :value="item1.id" :key="index1" :disabled='item1.status === 0'>{{ item1.name }}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 7'>
                  <Cascader :data="item.treeList" :disabled='item.status === 0' transfer></Cascader>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 8'>
                  <DatePicker type="date" style="width: 100%" :disabled='item.status === 0' transfer></DatePicker>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 9'>
                  <TimePicker type="time" style="width: 100%" :disabled='item.status === 0' transfer></TimePicker>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 10'>
                  <div class="upload">
                    <Icon type="ios-cloud-upload-outline"></Icon>
                  </div>
                </FormItem>
                <FormItem :label-width="1" v-if='item.type === 11'>
                  <div class="line-com" :style="{'borderStyle': item.lineStyle, 'borderTopWidth': item.size + 'px'}"></div>
                </FormItem>
                <FormItem :label-width="1" v-if='item.type === 12'>
                  <p class="des">{{item.name}}</p>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 13'> 
                  <div class="add-photo">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 14'> 
                  <Input readonly></Input>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 15'> 
                  <Input readonly></Input>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 16'> 
                  <Input readonly></Input>
                </FormItem>
              </Col>
            </draggable>
          </Row>
        </Form>
        <div class="footer-btnGroup">
          <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
          <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
        </div>
      </div>
      <div class="edit-com" v-if="chooseId">
        <h3 class="com-title">编辑元件</h3>
        <Form ref="formEdit" :model="formEdit" class="form-edit" label-position="left" :label-width="60">
          <div class="item-tit">基础设置</div>
          <FormItem label="标题" prop="name" v-if='formEdit.editProp.titTxt'>
            <Input v-model.trim="formEdit.name" :maxlength='20'></Input>
          </FormItem>
          <FormItem label="描述语内容" prop="name" :label-width="100"  v-if='formEdit.editProp.conRemark'>
            <Input v-model.trim="formEdit.name" :autosize="{minRows: 2,maxRows: 5}" type="textarea" :maxlength="100"></Input>
          </FormItem>
          <FormItem label="内容" prop="content" v-if='formEdit.editProp.conTxt'>
            <Input v-model.trim="formEdit.content" :maxlength="formEdit.maxlength"></Input>
          </FormItem>
          <FormItem label="内容" prop="content" v-if='formEdit.editProp.conNum'>
            <InputNumber v-model="formEdit.content"></InputNumber>
          </FormItem>
          <FormItem label="提示" prop="placeholder" v-if='formEdit.editProp.plaTxt'>
            <Input v-model.trim="formEdit.placeholder"></Input>
          </FormItem>
          <FormItem label="单位" prop="unit" v-if='formEdit.editProp.unit'>
            <Input v-model.trim="formEdit.unit"></Input>
          </FormItem>
          <FormItem label="分隔符样式" prop="lineStyle" :label-width="100" v-if='formEdit.editProp.lineStyle'>
            <Select v-model="formEdit.lineStyle" transfer>
              <Option value="solid">实线</Option>
              <Option value="dashed">虚线</Option>
              <Option value="dotted">点线</Option>
            </Select>
          </FormItem>
          <FormItem label="分隔符大小" prop="size" :label-width="100" v-if='formEdit.editProp.lineSize'>
            <InputNumber v-model="formEdit.size" :min='1'></InputNumber> px
          </FormItem>
          <div class="edit-form-label" v-if='formEdit.editProp.singleLabel'>
            <div class="title">
              选项
              <span @click="addEditLabel"><Icon type="plus-round"></Icon></span>
            </div>
            <div class="edit-label-item" v-for='(item, index) in formEdit.labelList' :key="index">
              <span class="del" @click="delEditLabel(index)"><Icon type="android-remove"></Icon></span>
              <Input v-model.trim="item.name" :maxlength='20'></Input>
              <div class="btn-list">
                <span v-if='item.status === 1' @click="editChangeStatus(index, 0)">禁用</span>
                <span v-else @click="editChangeStatus(index, 1)">启用</span>
              </div>
            </div>
          </div>
          <div class="edit-form-tree" v-if='formEdit.editProp.checkLabel'>
            <Tree :data="treeList" :render="treeRender"></Tree>
          </div>
          <div class="item-tit" v-if='formEdit.editProp.titValid'>校验</div>
          <FormItem prop="required" :label-width="1" v-if='formEdit.editProp.required'>
            <Checkbox v-model="formEdit.required" :true-value='1' :false-value='0'>是否必填</Checkbox>
          </FormItem>
          <FormItem prop="status" :label-width="1" v-if='formEdit.editProp.disabled'>
            <Checkbox v-model="formEdit.status" :true-value='0' :false-value='1'>是否禁用</Checkbox>
          </FormItem>
          <FormItem prop="repeat" :label-width="1" v-if='formEdit.editProp.repeat'>
            <Checkbox v-model="formEdit.repeat" :true-value='0' :false-value='1'>不能和已有数据重复</Checkbox>
          </FormItem>
          <FormItem label="允许最大填写字符字数" prop="maxlength" :label-width="150" v-if='formEdit.editProp.maxLength'>
            <InputNumber v-model="formEdit.maxlength" :min='1'></InputNumber>
          </FormItem>
          <FormItem label="最小值" prop="min" v-if='formEdit.editProp.minNum'>
            <InputNumber v-model="formEdit.min" :min='-1000000' :max='1000000'></InputNumber>
          </FormItem>
          <FormItem label="最大值" prop="max" v-if='formEdit.editProp.maxNum'>
            <InputNumber v-model="formEdit.max" :min='-1000000' :max='1000000'></InputNumber>
          </FormItem>
          <div class="item-tit">布局</div>
          <FormItem label="宽度占整行的" prop="col" :label-width="100">
            <Select v-model="formEdit.col" transfer>
              <Option :value="24">独占一行</Option>
              <Option :value="12">1/2</Option>
              <Option :value="8">1/3</Option>
            </Select>
          </FormItem>
          <FormItem label="选项排列方式" prop="vertical" :label-width="100" v-if='formEdit.editProp.vertical'>
            <Select v-model="formEdit.vertical" transfer>
              <Option :value="1">横向排列</Option>
              <Option :value="0">纵向排列</Option>
            </Select>
          </FormItem>
          <div class="item-tit" v-if='formEdit.editProp.crmTit'>数据来源</div>
          <FormItem :label-width="1" v-if='formEdit.editProp.crmMsg'>
            <p v-if='formEdit.type === 14'>顾客在本系统的姓名，在创建顾客病历时会自动填写该顾客的名称。</p>
            <p v-if='formEdit.type === 15'>顾客在本系统的手机号，在创建顾客病历时会自动填充该顾客的手机号。</p>
            <p v-if='formEdit.type === 16'>顾客在本系统的地址，在创建顾客病历时会自动填写该顾客的地址。</p>
          </FormItem>
          <FormItem :label-width="1" v-if='formEdit.editProp.crmTit'>
            <p>系统客户信息修改后，已生成的病历不会跟着改变。</p>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  export default {
    components: {draggable},
    data () {
      return {
        saveLoad: false,
        
        list1: [
          {
            type: 1,
            name: '单行文本',
            content: '',
            placeholder: '请输入',
            required: 1,
            status: 1,
            repeat: 1,
            maxlength: 20,
            col: 24,
            timeId: '0'
          },
          {
            type: 2,
            name: '多行文本',
            content: '',
            placeholder: '请输入',
            required: 1,
            status: 1,
            repeat: 1,
            maxlength: 20,
            col: 24,
            timeId: '0'
          },
          {
            type: 3,
            name: '数字输入框',
            content: null,
            required: 1,
            status: 1,
            repeat: 1,
            max: 1000000,
            min: 0,
            unit: '',
            col: 24,
            timeId: '0'
          },
          {
            type: 4,
            name: '单项选择',
            labelList: [
              {id: 1, name: '选项A', status: 1},
              {id: 2, name: '选项B', status: 1},
              {id: 3, name: '选项C', status: 1}
            ],
            required: 1,
            repeat: 0,
            vertical: 1,
            col: 24,
            timeId: '0'
          },
          {
            type: 5,
            name: '多项选择',
            labelList: [
              {id: 1, name: '选项A', status: 1},
              {id: 2, name: '选项B', status: 1},
              {id: 3, name: '选项C', status: 1}
            ],
            required: 1,
            repeat: 0,
            vertical: 1,
            col: 24,
            timeId: '0'
          },
          {
            type: 6,
            name: '下拉选择',
            labelList: [
              {id: 1, name: '选项A', status: 1},
              {id: 2, name: '选项B', status: 1},
              {id: 3, name: '选项C', status: 1}
            ],
            required: 1,
            status: 1,
            repeat: 0,
            col: 24,
            timeId: '0'
          },
          {
            type: 7,
            name: '多级下拉',
            treeList: [
              {
                value: 1,
                parentId: 0,
                label: '一级选项',
                title: '一级选项',
                expand: true, 
                children: [
                  {
                    value: 2,
                    parentId: 1,
                    title: '二级选项',
                    expand: true, 
                    label: '二级选项',
                    children: [
                      {
                        value: 3,
                        parentId: 2,
                        title: '三级选项',
                        expand: true, 
                        label: '三级选项',
                      }
                    ]
                  }
                ]
              }
            ],
            required: 1,
            repeat: 0,
            status: 1,
            col: 24,
            timeId: '0'
          },
          {
            type: 8,
            name: '日期',
            required: 1,
            status: 1,
            repeat: 0,
            col: 24,
            timeId: '0'
          },
          {
            type: 9,
            name: '时间',
            required: 1,
            status: 1,
            repeat: 0,
            col: 24,
            timeId: '0'
          },
          {
            type: 10,
            name: '附件',
            required: 1,
            col: 24,
            timeId: '0'
          },
          {
            type: 11,
            name: '分隔符',
            col: 24,
            timeId: '0',
            size: 1,
            lineStyle: 'solid'
          },
          {
            type: 12,
            name: '描述语',
            col: 24,
            timeId: '0',
          },
          {
            type: 13,
            name: '照片上传',
            required: 1,
            col: 24,
            timeId: '0'
          },
        ],
        list2: [
          {
            type: 14,
            name: '姓名',
            required: 0,
            col: 24,
            timeId: '0'
          },
          {
            type: 15,
            name: '手机号',
            required: 0,
            col: 24,
            timeId: '0'
          },
          {
            type: 16,
            name: '地址',
            required: 0,
            col: 24,
            timeId: '0'
          }
        ],

        formTitleKey: false,
        formTitle: '点击填写模板名称',
        key: true,
        formUse: 0,
        formStatus: 1,

        chooseId: '',

        formList: [],

        formEdit: {},

        buttonProps: {
          type: 'ghost',
          size: 'small',
        },
        treeList: [
          {
            title: '多级下拉',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', data.title),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-plus-empty',
                      type: 'primary'
                    }),
                    style: {
                      width: '52px'
                    },
                    on: {
                      click: () => { this.appendCas(data, true); }
                    }
                  })
                ])
              ]);
            },
            children: []
          }
        ],
      }
    },
    computed: {

    },
    watch: {

    },
    created () {
      if(this.$route.query.id === 'add') {
        this.key = true;
        this.$store.dispatch('setPageLoading', 1);
      } else {
        this.key = false;
        this.getList();
      }
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByIdSmartCaseTemplateMap.jhtml',
          data: {
            hospitalId: localStorage.getItem('hospId'),
            templateId: _vm.$route.query.id
          },
          success: function(res){
            _vm.formTitle = res.data.content.name || '点击填写模板名称';
            _vm.formUse = res.data.content.use || 0;
            _vm.formStatus = res.data.content.status * 1;
            _vm.formList = res.data.content.contentList.map(item => {
              let obj = {
                Id: item.Id,
                templateId: item.templateId,
                timeId: item.Id,
                type: item.type * 1,
                name: item.name,
                content: item.content,
                labelList: [],
                col: item.layout * 1,
                lineStyle: item.lineStyle,
                max: item.max * 1,
                maxlength: item.maxLength * 1,
                min: item.min * 1,
                number: item.number * 1,
                placeholder: item.placeholder,
                repeat: item.repeat * 1,
                required: item.required * 1,
                status: item.status * 1,
                size: item.size * 1,
                unit: item.unit,
                vertical: item.vertical * 1
              };
              if(item.type === '3') {
                obj.content = obj.content * 1;
              }
              if(item.type === '4' || item.type === '5' || item.type === '6') {
                item.labelList.map(item1 => {
                  obj.labelList.push({
                    id: item1.Id,
                    contentId: item1.contentId,
                    name: item1.name,
                    number: item1.number * 1,
                    parentId: 0,
                    status: item1.status * 1
                  });
                });
              }
              if(item.type === '7') {
                const list = item.labelList.map(item1 => {
                  return {
                    value: item1.Id,
                    contentId: item1.contentId,
                    label: item1.name,
                    title: item1.name,
                    expand: true, 
                    parentId: item1.parentId,
                    children: []
                  };
                });
                let list1 = list.filter(item1 => item1.parentId === '0') || [];
                list1.map(item1 => {
                  item1.children = list.filter(item2 => item2.parentId === item1.value);
                });
                list1.map(item1 => {
                  item1.children.map(item2 => {
                    item2.children = list.filter(item3 => item3.parentId === item2.value);
                  });
                });
                obj.treeList = list1;
              }
              return obj;
            }).sort((x, y) => x.number - y.number) || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //修改模板标题
      changeFormTitle(bool) {
        this.formTitleKey = !this.formTitleKey;
        if(bool) {
          this.$nextTick(() => {
            this.$refs.titleText.focus();
          });
        }
      },
      //推拽元件
      addIntoList() {
        const list1 = this.formList.filter(item => item.type === 14);
        if(list1.length > 1) {
          const index1 = this.formList.findIndex(item => item.type === 14 && item.timeId === '0');
          this.formList.splice(index1, 1);
        }
        const list2 = this.formList.filter(item => item.type === 15);
        if(list2.length > 1) {
          const index1 = this.formList.findIndex(item => item.type === 15 && item.timeId === '0');
          this.formList.splice(index1, 1);
        }
        const list3 = this.formList.filter(item => item.type === 16);
        if(list3.length > 1) {
          const index1 = this.formList.findIndex(item => item.type === 16 && item.timeId === '0');
          this.formList.splice(index1, 1);
        }
        let data = JSON.parse(JSON.stringify(this.formList));
        this.formList = data;
        const index = this.formList.findIndex(item => item.timeId === '0');
        if(index >= 0) {
          this.formList[index].timeId = moment().format('x');
        }
        console.log(this.formList);
      },
      //双击元件
      addClickList(data) {
        console.log(data);
        let obj = Object.assign({}, data);
        obj.timeId = moment().format('x');
        this.formList.push(obj);
      },
      addClickListCRM(data) {
        const index = this.formList.findIndex(item => item.type === data.type);
        if(index < 0) {
          let obj = Object.assign({}, data);
          obj.timeId = moment().format('x');
          this.formList.push(obj);
        }
      },
      //选中元件
      chooseForm(data) {
        console.log(data);
        this.chooseId = data.timeId;
        data.editProp = this.makeEditList(data.type);
        this.formEdit = data
        if(data.type === 7) {
          this.editCas();
        }
      },
      //生成编辑属性
      makeEditList(type) {
        switch(type) {
          case 1:
            return {
              titTxt: true,
              conTxt: true,
              conNum: false,
              conRemark: false,
              plaTxt: true,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: true,
              maxLength: true,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false,
            };
            break;
          case 2:
            return {
              titTxt: true,
              conTxt: true,
              conNum: false,
              conRemark: false,
              plaTxt: true,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: true,
              maxLength: true,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 3:
            return {
              titTxt: true,
              conTxt: false,
              conNum: true,
              conRemark: false,
              plaTxt: false,
              unit: true,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: true,
              maxLength: false,
              maxNum: true,
              minNum: true,
              titValid: true,
              vertical: false
            };
            break;
          case 4:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: true,
              checkLabel: false,
              required: true,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: true
            };
            break;
          case 5:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: true,
              checkLabel: false,
              required: true,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 6:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: true,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 7:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: true,
              required: true,
              disabled: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 8:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 9:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 10:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 11:
            return {
              titTxt: false,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: true,
              lineSize: true,
              singleLabel: false,
              checkLabel: false,
              required: false,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: false,
              vertical: false
            };
            break;
          case 12:
            return {
              titTxt: false,
              conTxt: false,
              conNum: false,
              conRemark: true,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: false,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: false,
              vertical: false
            };
            break;
          case 13:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: true,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: true,
              vertical: false
            };
            break;
          case 14:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: false,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: false,
              vertical: false,
              crmTit: true,
              crmMsg: true,
            };
            break;
          case 15:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: false,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: false,
              vertical: false,
              crmTit: true,
              crmMsg: true,
            };
            break;
          case 16:
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              conRemark: false,
              plaTxt: false,
              unit: false,
              lineStyle: false,
              lineSize: false,
              singleLabel: false,
              checkLabel: false,
              required: false,
              disabled: false,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
              titValid: false,
              vertical: false,
              crmTit: true,
              crmMsg: true,
            };
            break;
        };
      },
      //移除元件
      removeFrom(data) {
        const index = this.formList.findIndex(item => item.timeId === data.timeId);
        if(index >= 0) {
          this.chooseId = '';
          this.formList.splice(index, 1);
        }
      },
      //添加子选项
      addEditLabel() {
        this.formEdit.labelList.push({
          id: moment().format('x'),
          name: '子选项',
          status: 1
        });
      },
      //删除子选项
      delEditLabel(index) {
        if(this.formEdit.labelList.length > 1) {
          this.formEdit.labelList.splice(index, 1);
        }
      },
      //改变子选项状态
      editChangeStatus(index, status) {
        this.formEdit.labelList[index].status = status;
      },
      //编辑级联下拉
      editCas() {
        this.treeList[0].children = this.formEdit.treeList;
      },
      //树形结构
      treeRender(h, { root, node, data }) {
        let inputVal = data.title;
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }}, [
          h('Input', {
            style: {
              display: 'inline-block',
              width: '140px'
            },
            props: {
              value: data.title
            },
            on: {
              input: (val) => {
                inputVal = val;
              },
              'on-blur': () => {
                data.title = inputVal;
                data.label = inputVal;
              }
            }
          }),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }}, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  const value = typeof data.__value  === 'string' ? data.__value : '';
                  const length = value.split(',').length;
                  if(length < 3) {
                    this.appendCas(data, false);
                  }
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              }),
              on: {
                click: () => {
                  if(this.treeList[0].children.length > 1 || data.parentId !== 0) {
                    this.remove(root, node, data);
                  }
                }
              }
            })
          ])
        ]);
      },
      //添加树形子项
      appendCas(data, bool) {
        const children = data.children || [];
        const obj = {
          label: '子选项',
          title: '子选项', 
          expand: true,
          value: moment().format('x'),
          parentId: bool ? 0 : data.value
        };
        children.push(obj);
        this.$set(data, 'children', children);
      },
      //删除树形子项
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
      },
      saveRules() {
        if(this.formList.length === 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请选择表单元件'
          });
          return false;
        }
        if(this.formTitle === '') {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请选择表单模板标题'
          });
          return false;
        }
        const noNameList = this.formList.filter(item => item.name === '');
        if(noNameList.length > 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请填写元件标题'
          });
          return false;
        }
        let noNameLabelBool = true;
        this.formList.map(item => {
          if(item.type === 4 || item.type === 5 || item.type === 6) {
            item.labelList.map(item1 => {
              if(item1.name === '') {
                noNameLabelBool = false;
              }
            });
          }
        });
        if(!noNameLabelBool) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请填写元件选项标题'
          });
          return false;
        }
        let treeLabelList = [];
        this.formList.map(item => {
          if(item.type === 7) {
            item.treeList.map(item1 => {
              treeLabelList.push({
                name: item1.title
              });
              if(item1.children && item1.children.length) {
                item1.children.map(item2 => {
                  treeLabelList.push({
                    name: item2.title
                  });
                  if(item2.children && item2.children.length) {
                    item2.children.map(item3 => {
                      treeLabelList.push({
                        name: item3.title
                      });
                    });
                  }
                });
              }
            });
          }
        });
        const noNameTreeList = treeLabelList.filter(item => item.name === '');
        if(noNameTreeList.length > 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请填写元件选项标题'
          });
          return false;
        }
        return true;
      },
      save() {
        let _vm = this;
        if(_vm.saveRules()) {
          _vm.saveLoad = true;
          let list = [];
          _vm.formList.map((item, index) => {
            let data = {
              Id: item.Id || 0,
              templateId: item.templateId || 0,
              type: item.type,
              name: item.name || '',
              content: Number.isFinite(item.content) ? item.content : item.type === 3 ? 0 : item.content || '',
              placeholder: item.placeholder || '',
              required: item.required ? 1 : 0,
              status: item.status ? 1 : 0,
              repeat: item.repeat ? 1 : 0,
              maxLength: Number.isFinite(item.maxlength) ? item.maxlength : 20,
              layout: item.col || 24,
              vertical: item.vertical ? 1 : 0,
              unit: item.unit || '',
              min: Number.isFinite(item.min) ? item.min : 0,
              max: Number.isFinite(item.max) ? item.max : 1000000,
              labelList: [],
              size: Number.isFinite(item.size) ? item.size : 1,
              lineStyle: item.lineStyle || 'solid',
              number: index + 1
            };
            if(item.type === 4 || item.type === 5 || item.type === 6) {
              item.labelList.map((item1, index1) => {
                data.labelList.push({
                  id: item1.id,
                  contentId: item1.contentId || 0,
                  name: item1.name,
                  status: item1.status,
                  parentId: 0,
                  number: index1 + 1
                });
              });
            }
            if(item.type === 7) {
              item.treeList.map(item1 => {
                data.labelList.push({
                  Id: item1.value,
                  contentId: item1.contentId || 0,
                  name: item1.title,
                  parentId: item1.parentId,
                  number: 0
                });
                if(item1.children && item1.children.length) {
                  item1.children.map(item2 => {
                    data.labelList.push({
                      Id: item2.value,
                      name: item2.title,
                      parentId: item2.parentId,
                      number: 0
                    });
                    if(item2.children && item2.children.length) {
                      item2.children.map(item3 => {
                        data.labelList.push({
                          Id: item3.value,
                          name: item3.title,
                          parentId: item3.parentId,
                          number: 0
                        });
                      });
                    }
                  });
                }
              });
            }
            list.push(data);
          });
          const caseTemplateList = {
            name: _vm.formTitle,
            Id: _vm.$route.query.id,
            use: _vm.formUse,
            status: _vm.formStatus,
            contentList: list
          };
          const url = _vm.key ? 'guard-webManager/case/addCaseTemplate.jhtml' : 'guard-webManager/case/updateByTemplateIdSmartCaseTemplate.jhtml';
          _vm.$http.post({
            url: url,
            data: {
              caseTemplateList: JSON.stringify(caseTemplateList)
            },
            success: function(res){
              if(res.data.code === 0 ){
                _vm.$router.push('/caseManagement');
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: _vm.$t('publicSet.noticeSuccess')
                });
              } else {
                _vm.$Notice.error({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.desc
                });
                _vm.saveLoad = false;
              }
            },
            error: function(res){
              console.log(res);
            }
          });
        }
      },
      back() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang='less' scoped>
  .case-management-edit {
    min-width: 1000px;
    height: ~'calc(100% - 42px)';
    .container-body {
      position: relative;
      height: ~'calc(100% - 68px)';
      padding: 10px 330px;
      background-color: #f2f4f8;
      box-shadow: none;
    }
    .components {
      position: absolute;
      overflow-x: hidden;
      overflow-y: auto;
      left: 0;
      top: 10px;
      width: 300px;
      max-height: 100%;
      padding: 30px 0;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      .item-tit {
        padding: 10px 30px;
        margin: 10px 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #181818;
        box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1), inset 0 1px 0 0 rgba(65, 65, 65, 0.1);
      }
      ul{
        overflow: hidden;
        padding: 10px 15px 0;
      }
      li {
        float: left;
        width: 50%;
        padding: 0 15px;
        margin-bottom: 10px;
      }
      .item-tag {
        min-width: 110px;
      }
    }
    .main {
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      max-height: 100%;
      padding: 30px 0;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      .show-first {
        position: absolute;
        left: 50%;
        top: 150px;
        width: 350px;
        padding: 30px;
        margin-left: -175px;
        background-color: #f2f4f8;
        border-radius: 5px;
        h3 {
          margin-bottom: 20px;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
          color: #181818;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: #181818;
        }
      }
      .form-box {
        padding: 20px 20px 0;
      }
      .drag-list {
        width: 100%;
        min-height: 200px;
      }
      .title {
        position: relative;
        padding: 13px 30px 35px;
        box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
        p {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1;
          color: #181818;
        }
        .form-status {
          position: absolute;
          left: 30px;
          bottom: 10px;
        }
      }
      .form-item {
        position: relative;
        padding: 10px 10px 0;
        &.choose-item {
          background: rgba(65, 114, 246, 0.07);
        }
      }
      .btn-del {
        position: absolute;
        right: -5px;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
      }
      .upload {
        height: 32px;
        border: 1px solid #d7dde4;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
      }
      .add-photo {
        width: 58px;
        height: 58px;
        border: 1px dashed #d7dde4;
        text-align: center;
        line-height: 58px;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
      }
      .line-com {
        min-height: 32px;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-color: #d7dde4; 
      }
      .des {
        min-height: 32px;
        font-size: 12px;
        line-height: 1;
        color: #181818;
        word-break: break-all;
      }
    }
    .edit-com {
      position: absolute;
      overflow-x: hidden;
      overflow-y: auto;
      right: 0;
      top: 10px;
      width: 300px;
      max-height: 100%;
      padding: 30px 0;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      .item-tit {
        padding: 10px 30px;
        margin: 10px -30px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #181818;
        box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1), inset 0 1px 0 0 rgba(65, 65, 65, 0.1);
      }
      .form-edit {
        padding: 0 30px;
      }
    }
    .edit-form-label {
      padding-top: 10px;
      .title {
        overflow: hidden;
        text-align: center;
        span {
          float: left;
          padding: 0 5px;
          cursor: pointer;
        }
      }
      .edit-label-item {
        position: relative;
        padding: 5px 40px;
        .del {
          position: absolute;
          left: 0;
          top: 50%;
          width: 20px;
          height: 20px;
          margin-top: -10px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        }
        .edit-cas {
          position: absolute;
          right: 0;
          top: 50%;
          width: 20px;
          height: 20px;
          margin-top: -10px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        }
        .btn-list {
          position: absolute;
          right: 0;
          top: 50%;
          height: 20px;
          line-height: 20px;
          margin-top: -10px;
          cursor: pointer;
        }
      }
    }
    .edit-form-tree {
      margin: 0 -30px 0 -25px;
    }
    .com-title {
      padding: 0 30px;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      color: #181818;
    }
    .ee {
      height: 200px;
    }
  }
</style>

<style lang='less'>
  .case-management-edit .ivu-form-item {
    margin-bottom: 10px;
  }
</style>





