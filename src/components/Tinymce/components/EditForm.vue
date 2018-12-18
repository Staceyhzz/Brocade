<template>
  <div id='editorForm'>
    <Button type="primary" icon="ios-cloud-upload" @click='addForm' size='small'>表单控件</Button>
    <Modal 
      v-model="modal" 
      title="表单控件" 
      @on-ok="ok" 
      width='880px'
      class-name="sde-form-modal">
      <div class="sde-edit-box">
        <div class="sde-left">
          <h3>通用字段</h3>
          <ul>
            <li v-for="item in formItem" :key="item.type" @click="changeItem(item)" :class="{'active': itemType === item.type}">{{item.name}}</li>
          </ul>
        </div>
        <Form ref="formEdit" :model="formEdit" class="sde-right" label-position="left" :label-width="60">
          <h3>基础设置</h3>
          <Row type="flex" justify="start">
            <Col span='12' v-if='formEdit.edit.titTxt'>
              <FormItem label="标题" class="form-item">
                <Input v-model.trim="formEdit.prop.label" :maxlength='20'></Input>
              </FormItem>
            </Col>
            <Col span='12' v-if='formEdit.edit.conTxt'>
              <FormItem label="内容" class="form-item">
                <Input v-model.trim="formEdit.prop.content" :maxlength='50'></Input>
              </FormItem>
            </Col>
            <Col span='12' v-if='formEdit.edit.conNum'>
              <FormItem label="内容" class="form-item">
                <InputNumber v-model="formEdit.prop.content"></InputNumber>
              </FormItem>
            </Col>
            <Col span='12'>
              <FormItem label="控件宽度" class="form-item" v-if='formEdit.edit.conTxt'>
                <InputNumber v-model="formEdit.prop.width"></InputNumber>
              </FormItem>
            </Col>
          </Row>
          <div class="edit-form-label" v-if='formEdit.edit.labelList'>
            <div class="title">
              选项
              <span @click="addEditLabel"><Icon type="plus-round"></Icon></span>
            </div>
            <div class="edit-label-item" v-for='(item, index) in formEdit.list' :key="index">
              <span class="del" @click="delEditLabel(index)"><Icon type="android-remove"></Icon></span>
              <Input v-model.trim="item.name" :maxlength='20'></Input>
              <!-- <div class="btn-list">
                <span v-if='item.status === 1' @click="editChangeStatus(index, 0)">禁用</span>
                <span v-else @click="editChangeStatus(index, 1)">启用</span>
              </div> -->
            </div>
          </div>
          <div class="edit-form-tree" v-if='formEdit.edit.treeList'>
            <Tree :data="treeList" :render="treeRender"></Tree>
          </div>
          <h3>校验</h3>
          <Row type="flex" justify="start">
            <Col span='12' v-if='formEdit.edit.maxLength'>
              <FormItem label="允许最大填写字符字数" :label-width="150" class="form-item">
                <InputNumber v-model="formEdit.prop.maxlength" :min='1'></InputNumber>
              </FormItem>
            </Col>
            <Col span='12' v-if='formEdit.edit.minNum'>
              <FormItem label="最小值" class="form-item">
                <InputNumber v-model="formEdit.prop.min" :min='-1000000' :max='1000000'></InputNumber>
              </FormItem>
            </Col>
            <Col span='12' v-if='formEdit.edit.maxNum'>
              <FormItem label="最大值" class="form-item">
                <InputNumber v-model="formEdit.prop.max" :min='-1000000' :max='1000000'></InputNumber>
              </FormItem>
            </Col>
            <Col span='12' v-if='formEdit.edit.required'>
              <FormItem :label-width="1" class="form-item">
                <Checkbox v-model="formEdit.prop.required" true-value='1' false-value='0'>是否必填</Checkbox>
              </FormItem>
            </Col>
            <!-- <Col span='12'>
              <FormItem prop="status" :label-width="1" class="form-item">
                <Checkbox v-model="formEdit.status" :true-value='0' :false-value='1'>是否禁用</Checkbox>
              </FormItem>
            </Col> -->
            <Col span='12' v-if='formEdit.edit.repeat'>
              <FormItem :label-width="1" class="form-item">
                <Checkbox v-model="formEdit.prop.repeat" true-value='1' false-value='0'>不能和已有数据重复</Checkbox>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'editorForm',
    data() {
      return {
        modal: false,

        formItem: [
          {
            type: 'text',
            name: '文本框',
            prop: {
              label: '',
              content: '',
              maxlength: 50,
              required: '0',
              disabled: '0',
              repeat: '0',
              width: null
            }
          },
          {
            type: 'number',
            name: '数字框',
            prop: {
              label: '',
              content: null,
              max: 1000000,
              min: 0,
              required: '0',
              disabled: '0',
              repeat: '0'
            }
          },
          {
            type: 'radio',
            name: '单项选择',
            prop: {
              label: '',
              content: '',
              disabled: '0',
              required: '0'
            },
            list: [
              {name: '子选项', id: '1'},
              {name: '子选项', id: '2'}
            ]
          },
          {
            type: 'tree',
            name: '多级下拉',
            prop: {
              label: '',
              content: '',
              disabled: '0',
              required: '0'
            },
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
          },
        ],

        itemType: 'text',

        formEdit: {
          edit: {},
          prop: {}
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
      };
    },
    methods: {
      addForm() {
        this.changeItem(this.formItem[0]);
        this.modal = true;
      },
      changeItem(data) {
        this.itemType = data.type;
        this.formEdit = Object.assign({}, data);
        this.formEdit.edit = this.makeEditList(data.type);
      },
      //生成编辑属性
      makeEditList(type) {
        switch(type) {
          case 'text':
            return {
              titTxt: true,
              conTxt: true,
              conNum: false,
              labelList: false,
              treeList: false,
              required: true,
              repeat: true,
              maxLength: true,
              maxNum: false,
              minNum: false,
            };
            break;
          case 'number':
            return {
              titTxt: true,
              conTxt: false,
              conNum: true,
              labelList: false,
              treeList: false,
              required: true,
              repeat: true,
              maxLength: false,
              maxNum: true,
              minNum: true,
            };
            break;
          case 'radio':
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              labelList: true,
              treeList: false,
              required: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
            };
            break;
          case 'tree':
            return {
              titTxt: true,
              conTxt: false,
              conNum: false,
              labelList: false,
              treeList: true,
              required: true,
              repeat: false,
              maxLength: false,
              maxNum: false,
              minNum: false,
            };
            break;
        };
      },
      ok() {
        this.$emit('on-change', {
          type: 'radio',
          id: 't' + new Date().getTime(),
          name: '单选占位符',
          list: [
            {value: '1', label: '111'},
            {value: '2', label: '222'}
          ]
        });
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
      addEditLabel() {},
    }
  };

</script>

<style lang="less" scoped>
  .sde-edit-box {
    position: relative;
    padding-left: 200px;
    min-height: 400px;
    .sde-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 200px;
      box-shadow: inset -1px 0 0 0 #e3e8ee;
      h3 {
        padding: 10px 40px;
        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
        color: #181818;
        box-shadow: inset 0 -1px 0 0 #e3e8ee;
      }
      ul {
        margin: 10px 0;
      }
      li {
        padding: 7px 40px;
        font-size: 14px;
        line-height: 20px;
        color: #181818;
        cursor: pointer;
        &.active,
        &:hover {
          background: rgba(65,114,246,.07);
        }
      }
    }
    .sde-right {
      padding-bottom: 1px;
      h3 {
        padding: 10px 40px;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
        color: #181818;
        box-shadow: inset 0 -1px 0 0 #e3e8ee;
      }
      .form-item {
        padding-left: 40px;
        width: 300px;
      }
      .edit-form-label {
        padding-top: 20px;
        margin: 0 0 20px 40px;
        .title {
          overflow: hidden;
          font-size: 14px;
          span {
            float: left;
            padding: 0 5px;
            margin-right: 30px;
            cursor: pointer;
          }
        }
        .edit-label-item {
          position: relative;
          padding: 5px 40px;
          width: 300px;
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
        padding: 0 60px 0 40px;
        margin-bottom: 20px;
      }
    }
  }
</style>

<style lang="less">
  .sde-form-modal {
    .ivu-modal-body {
      padding: 0;
    }
  }
</style>


