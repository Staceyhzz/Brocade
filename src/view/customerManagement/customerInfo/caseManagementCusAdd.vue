/** 
 * 添加电子病例 
 */

<template>
  <div class="container-box case-management-cus-add">
    <div class="container-header">
      <h2>{{formShow.customerName}}的病例————{{formShow.caseNumber}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <ul class="nav-left">
        <li v-for="(item, index) in navList" :key='index' @click="chooseNav(item)" :class="navId === item.id ? 'active' : ''">{{item.name}}</li>
      </ul>
      <div class="main-right">
        <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" v-if='changeKey'>
          <Row type="flex" justify="start">
            <Col v-for='(item, index) in formList' :key='index' :span='item.col' class="form-item">
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 1'>
                <Input :placeholder="item.placeholder" :disabled='item.status === 0' v-model.trim="item.result"  :maxlength="item.maxlength" @on-blur="validRepeatInput(item.repeat, true, index)"></Input>
                <p v-show='item.repeat === 0 && item.repeatMsg' style="color: #FF6F76">数据已存在，请重新填写！</p>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 2'>
                <Input :placeholder="item.placeholder" :disabled='item.status === 0' :autosize="{minRows: 2,maxRows: 2}" type="textarea" v-model.trim="item.result" :maxlength="item.maxlength"  @on-blur="validRepeatInput(item.repeat, true, index)"></Input>
                <p v-show='item.repeat === 0 && item.repeatMsg' style="color: #FF6F76">数据已存在，请重新填写！</p>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 3'>
                <InputNumber :disabled='item.status === 0' v-model="item.result" :min='item.min' :max='item.max' @on-blur="validRepeatInput(item.repeat, false, index)"></InputNumber>
                <span>{{item.unit}}</span>
                <p v-show='item.repeat === 0 && item.repeatMsg' style="color: #FF6F76">数据已存在，请重新填写！</p>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 4'>
                <RadioGroup :vertical='item.vertical === 1 ? false : true' v-model="item.result">
                  <Radio :label="item1.id" v-for="(item1, index1) in item.labelList" :key="index1" :disabled='item1.status === 0'>{{item1.name}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 5'>
                <CheckboxGroup :vertical='item.vertical === 1 ? false : true' v-model="item.result">
                  <Checkbox :label="item1.id" v-for="(item1, index1) in item.labelList" :key="index1" :disabled='item1.status === 0'>{{item1.name}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 6'>
                <Select transfer :disabled='item.status === 0' v-model="item.result">
                  <Option v-for="(item1, index1) in item.labelList" :value="item1.id" :key="index1" :disabled='item1.status === 0'>{{ item1.name }}</Option>
                </Select>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 7'>
                <Cascader :data="item.treeList" :disabled='item.status === 0' transfer v-model="item.result" change-on-select></Cascader>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 8'>
                <DatePicker type="date" style="width: 100%" :disabled='item.status === 0' transfer v-model="item.result"></DatePicker>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 9'>
                <TimePicker type="time" style="width: 100%" :disabled='item.status === 0' transfer v-model="item.result"></TimePicker>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 10'>
                <Upload
                  ref="upload"
                  :before-upload="upLoadFile"
                  type="drag"
                  action="//"
                  @click.native="upLoadFileIndex(index)"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                  </div>
                </Upload>
                <div class="upload-list" v-for="(item1, index1) in item.result" :key='index1'>
                  <div class="text">
                    <p>{{item1.name}}</p>
                  </div>
                  <div class="upload-list-cover">
                    <Icon type="arrow-down-c" @click.native="downFIle(item1)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="fileRemove(index, index1)"></Icon>
                  </div>
                </div>
              </FormItem>
              <FormItem :label-width="1" v-if='item.type === 11'>
                <div class="line-com" :style="{'borderStyle': item.lineStyle, 'borderTopWidth': item.size + 'px'}"></div>
              </FormItem>
              <FormItem :label-width="1" v-if='item.type === 12'>
                <p class="des">{{item.name}}</p>
              </FormItem>
              <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 13'> 
                <Upload
                  ref="upload"
                  :before-upload="upLoadImg"
                  type="drag"
                  action="//"
                  @click.native="upLoadImgIndex(index)"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <div class="upload-list" v-for="(item1, index1) in item.result" :key='index1'>
                  <img :src="item1.url">
                  <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="imgRemove(index, index1)"></Icon>
                  </div>
                </div>
              </FormItem>
              <FormItem :label="item.name" v-if='item.type === 14'> 
                <Input readonly v-model="item.result"></Input>
              </FormItem>
              <FormItem :label="item.name" v-if='item.type === 15'>
                <Input readonly v-model="item.result"></Input>
              </FormItem>
              <FormItem :label="item.name" v-if='item.type === 16'>
                <Input readonly v-model="item.result"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="footer-btnGroup">
          <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad' :disabled='saveDIs'>{{$t('publicSet.save')}}</Button>
          <Button type="primary" icon="android-arrow-back" @click='cancel'>取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formShow: {},

        navList: [],
        navId: '',

        resultList: [],

        formList: [],
        formCusName: '',
        formCusMobile: '',
        formCusAddress: '',

        formValidate: {},

        saveLoad: false,
        saveDIs: false,
        changeKey: false,

        imgUpLoadIndex: 0,
        fileUpLoadIndex: 0,

      }
    },
    created() {
      this.getList();
    },
    methods: {
      //获取模板
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByCaseNumberSmartCaseTemplateResultMap.jhtml',
          data: {
            caseNumber: _vm.$route.query.no,
            userId: localStorage.getItem('userId'),
            hospitalId: localStorage.getItem('hospId')
          },
          success: function (res) {
            _vm.formShow = {
              customerId: sessionStorage.getItem('cusId'),
              customerName: sessionStorage.getItem('cusName'),
              hospitalId: localStorage.getItem('hospId'),
              createUserId: localStorage.getItem('userId'),
              caseNumber: res.data.content.caseNumberList.caseNumber,
              caseNumberId: res.data.content.caseNumberList.Id,
              caseId: res.data.content.caseNumberList.caseId,
              templateId: '',
              detailList: []
            };
            const formList = res.data.content.caseTemplateList || [];
            const resultList = res.data.content.caseTemplattResultList.detailList || [];
            _vm.navList = formList.filter(item => item.status === '1').map(item => {
              return {
                name: item.name,
                id: item.Id,
                number: item.number * 1,
                list: item.contentList
              };
            }).sort((x, y) => x.number - y.number) || [];
            _vm.resultList = resultList;
            _vm.chooseNav(_vm.navList[0], false);
            _vm.getCusList();
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //获取最新用户信息
      getCusList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/case/findByCustomerIdSmartCustomerMap.jhtml',
          data: {
            customerId: sessionStorage.getItem('cusId'),
            hospitalId: localStorage.getItem('hospId')
          },
          success: function (res) {
            if(res.data.code === 0) {
              _vm.formCusName = res.data.content.name || '';
              _vm.formCusMobile = res.data.content.mobile || '';
              _vm.formCusAddress = res.data.content.address || '';
              _vm.chooseNav(_vm.navList[0], false);
            }
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      //选择模板
      chooseNav(data, type=true) {
        if(!this.saveDIs && type) {
          this.$Modal.confirm({
            title: this.$t('publicSet.noticeTit'),
            content: `还未保存信息，是否切换表单？`,
            onOk: () => {
              this.getForm(data);
            }
          });
        } else {
          this.getForm(data);
        }
      },
      //生成表单
      getForm(data) {
        this.changeKey = false;
        this.$nextTick(() => {
          this.changeKey = true;
          this.navId = data.id;
          const resultList = this.resultList.filter(item => item.templateId === data.id);
          this.saveDIs = resultList.length > 0 ? true : false;
          this.formList = data.list.map(item1 => {
            let obj = {
              id: item1.Id,
              type: item1.type * 1,
              name: item1.name,
              content: item1.content,
              labelList: [],
              col: item1.layout * 1,
              lineStyle: item1.lineStyle,
              max: item1.max * 1,
              maxlength: item1.maxLength * 1,
              min: item1.min * 1,
              number: item1.number * 1,
              placeholder: item1.placeholder,
              repeat: item1.repeat * 1,
              repeatMsg: false,
              required: item1.required * 1,
              status: item1.status * 1,
              size: item1.size * 1,
              unit: item1.unit,
              vertical: item1.vertical * 1,
              result: '',
            };
            if(item1.type === '3') {
              obj.content = obj.content * 1;
            }
            if(item1.type === '4' || item1.type === '5' || item1.type === '6') {
              item1.labelList.map(item2 => {
                obj.labelList.push({
                  id: item2.Id,
                  contentId: item2.contentId,
                  name: item2.name,
                  number: item2.number * 1,
                  parentId: 0,
                  status: item2.status * 1
                });
              });
            }
            if(item1.type === '1' || item1.type === '2' || item1.type === '3') {
              obj.result = obj.content;
              if(obj.repeat === 0) {
                obj.repeatMsg = false;
              }
            }
            if(item1.type === '5' || item1.type === '13' || item1.type === '10') {
              obj.result = [];
            }
            if(item1.type === '7') {
              obj.result = [];
              const list = item1.labelList.map(item2 => {
                return {
                  value: item2.Id,
                  contentId: item2.contentId,
                  label: item2.name,
                  title: item2.name,
                  expand: true, 
                  parentId: item2.parentId,
                  children: []
                };
              });
              let list1 = list.filter(item2 => item2.parentId === '0') || [];
              list1.map(item2 => {
                item2.children = list.filter(item3 => item3.parentId === item2.value);
              });
              list1.map(item2 => {
                item2.children.map(item3 => {
                  item3.children = list.filter(item4 => item4.parentId === item3.value);
                });
              });
              obj.treeList = list1;
            }
            if(item1.type === '14') {
              obj.result = this.formCusName;
            }
            if(item1.type === '15') {
              obj.result = this.formCusMobile;
            }
            if(item1.type === '16') {
              obj.result = this.formCusAddress;
            }
            if(resultList.length > 0) {
              const indexR = resultList.findIndex(i => i.contentId === obj.id);
              obj.result = resultList[indexR].value;
              if(obj.type === 3) {
                obj.result = resultList[indexR].value * 1;
              }
              if(obj.type === 5 || obj.type === 7) {
                obj.result = resultList[indexR].value.split(',');
              }
              if(obj.type === 10 || obj.type === 13) {
                obj.result = JSON.parse(resultList[indexR].value);
              }
            }
            return obj;
          }).sort((x, y) => x.number - y.number);
        });
      },
      //图片上传
      upLoadImg(data) {
        let translateBase = 1048576;
        if (/\.(gif|jpg|jpeg|bmp|png)$/.test((data.name).toLowerCase())) {
          if (data.size < translateBase) {
            this.saveImg(data);
          } else {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: '图片最大为1mb'
            });
          }
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('avatarInfo.msg2')
          });
        }
        return false;
      },
      //记录不同图片上传索引值
      upLoadImgIndex(index) {
        this.imgUpLoadIndex = index;
      },
      //删除图片
      imgRemove(index1, index2) {
        this.formList[index1].result.splice(index2, 1);
      },
      //获取图片地址
      saveImg(data) {
        let _vm = this;
        let param = new FormData();
        param.append('files', data);
        _vm.$http.upload({
          url: 'guard-webManager/upload/uploadImage.jhtml',
          data: param,
          success: function(res){
            if(res.data.code === 0) {
              _vm.formList[_vm.imgUpLoadIndex].result.push({url: res.data.content});
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
            console.log(res)
          }
        });
      },
      //文件上传
      upLoadFile(data) {
        let translateBase = 1048576;
        if (data.size < translateBase) {
          this.saveFile(data, data.name);
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '文件最大为1mb'
          });
        }
        return false;
      },
      upLoadFileIndex(index) {
        this.fileUpLoadIndex = index;
      },
      fileRemove(index1, index2) {
        this.formList[index1].result.splice(index2, 1);
      },
      downFIle(data) {
        let eleLink = document.createElement('a');
        eleLink.download = data.name;
        eleLink.style.display = 'none';
        eleLink.href = data.url;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      },
      //crm刷新
      refreshCRM(type, index) {
        this.$Modal.confirm({
          title: this.$t('publicSet.noticeTit'),
          content: `请确认是否更新客户CRM信息，更新后无法撤消`,
          onOk: () => {
            if(type === 14) {
              this.formList[index].result = '111';
            }
            if(type === 15) {
              this.formList[index].result = '222';
            }
            if(type === 16) {
              this.formList[index].result = '333';
            }
          }
        });
      },
      //验证重复
      validRepeatInput(repeat, type, index) {
        if(repeat === 0 && !this.saveDIs) {
          if(type && this.formList[index].result) {
            this.validRepeat(this.formList[index], index);
          }
          if(!type && Number.isFinite(this.formList[index].result)) {
            this.validRepeat(this.formList[index], index);
          }
        }
      },
      validRepeat(data, index) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/case/findByRepeatSmartCaseTemplateResultDetailList.jhtml',
          data: {
            contentId: data.id,
            value: data.result,
            templateId: _vm.navId
          },
          success: function (res) {
            if(res.data.code === 0) {
              _vm.formList[index].repeatMsg = false;
            } else {
              _vm.formList[index].repeatMsg = true;
            }
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      saveFile(data, name) {
        let _vm = this;
        let param = new FormData();
        param.append('files', data);
        _vm.$http.upload({
          url: 'guard-webManager/upload/uplocadFiles.jhtml',
          data: param,
          success: function(res){
            if(res.data.code === 0) {
              _vm.formList[_vm.fileUpLoadIndex].result.push({
                url: res.data.content,
                name: name
              });
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
            console.log(res)
          }
        });
      },
      saveRule() {
        let bool = true;
        this.formList.map(item => {
          if(item.required === 1) {
            if(typeof item.result === 'string') {
              if(item.result === '') {
                bool = false;
              }
            } else {
              if(item.type === 3) {
                if(!Number.isFinite(item.result)) {
                  bool = false;
                }
              } else {
                if(item.result.length === 0) {
                  bool = false;
                }
              }
            }
          }
          if(item.repeat === 0 && item.repeatMsg) {
            bool = false;
          }
        });
        if(!bool) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: '请填写完整表单必填项'
          });
        }
        return bool;
      },
      save() {
        let _vm = this;
        if(_vm.saveRule()) {
          _vm.$Modal.confirm({
            title: _vm.$t('publicSet.noticeTit'),
            content: `请确认信息填写无误，数据保存后需要到病例管理处进行编辑或补充`,
            onOk: () => {
              _vm.saveLoad = true;
              _vm.formShow.templateId = _vm.navId;
              _vm.formShow.detailList = _vm.formList.map(item => {
                let obj = {
                  contentId: item.id,
                  value: item.result
                };
                if(item.type === 5 || item.type === 7) {
                  obj.value = item.result.join(',')
                }
                if(item.type === 8) {
                  obj.value = moment(item.result).format('YYYY-MM-DD');
                }
                if(item.type === 10 || item.type === 13) {
                  obj.value = JSON.stringify(item.result);
                }
                return obj;
              });
              _vm.$http.post({
                url: 'guard-webManager/case/addCaseTemplateResult.jhtml',
                data: {
                  templateResultMap: JSON.stringify(_vm.formShow)
                },
                success: function(res){
                  if(res.data.code === 0 ){
                    _vm.getList();
                    _vm.saveLoad = false;
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
          });
        }
      },
      cancel() {
        this.getList();
      },
      back() {
        this.$router.push('/indexCaseRecord');
      }
    }
  }

</script>

<style lang="less" scoped>
  .case-management-cus-add {
    height: ~'calc(100% - 42px)';
    .container-body {
      height: ~'calc(100% - 68px)';
      padding: 0;
      position: relative;
      background: #F2F4F8;
      box-shadow: none;
      border-radius: 0;
    }
    .nav-left {
      overflow-y: auto;
      overflow-x: hidden;
      position: absolute;
      left: 0;
      top: 0;
      width: 300px;
      max-height: 100%;
      padding: 30px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      li {
        padding: 8px 5px;
        font-size: 14px;
        line-height: 20px;
        border-radius: 3px;
        cursor: pointer;
        word-break: break-all;
        &.active, 
        &:hover {
          color: #4172f6;
          background: rgba(65, 114, 246, 0.07);
        }
      }
    }
    .main-right {
      overflow-y: auto;
      overflow-x: hidden;
      position: absolute;
      right: 0;
      top: 0;
      left: 330px;
      min-width: 400px;
      max-height: 100%;
      padding: 30px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
    }
    .line-com {
      border-top-width: 1px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-color: #d7dde4; 
    }
    .upload-list {
      .text {
        height: 100%;
        display: flex;
        align-items: center;
      }
      p {
        padding: 5px;
        font-size: 14px;
        line-height: 20px;
        word-break: break-all;
      }
    }
    .form-item {
      position: relative;
      padding: 10px 10px 0;
    }
  }
</style>

<style lang='less'>
  .case-management-cus-add .ivu-form-item {
    margin-bottom: 10px;
  }
</style>

