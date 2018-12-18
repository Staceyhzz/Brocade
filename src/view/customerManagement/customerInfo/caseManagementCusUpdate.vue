/** 
 * 编辑电子病例 
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
      <div class="left-box">
        <ul class="nav-left">
          <li v-for="(item, index) in navList" :key='index' @click="chooseNav(item)" :class="navId === item.id ? 'active' : ''">{{item.name}}</li>
        </ul>
        <div class="change-record">
          <p @click="showRecord" :class="recordKey ? 'active' : ''">变更记录</p>
        </div>
      </div>
      <div class="right-box">
        <div class="main-right" v-show='!recordKey'>
          <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" v-if='changeKey'>
            <Row type="flex" justify="start">
              <Col v-for='(item, index) in formList' :key='index' :span='item.col' class="form-item">
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 1'>
                  <Input :placeholder="item.placeholder" :disabled='item.status === 0' v-model.trim="item.result"  @on-blur="validRepeatInput(item.repeat, true, index)" :maxlength="item.maxlength"></Input>
                  <p v-show='item.repeat === 0 && item.repeatMsg' style="color: #FF6F76">数据已存在，请重新填写！</p>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 2'>
                  <Input :placeholder="item.placeholder" :disabled='item.status === 0' :autosize="{minRows: 2,maxRows: 2}" type="textarea" v-model.trim="item.result" :maxlength="item.maxlength"  @on-blur="validRepeatInput(item.repeat, true, index)"></Input>
                  <p v-show='item.repeat === 0 && item.repeatMsg' style="color: #FF6F76">数据已存在，请重新填写！</p>
                </FormItem>
                <FormItem :label="item.name" :required='item.required === 1' v-if='item.type === 3'>
                  <InputNumber :disabled='item.status === 0' v-model="item.result" :min='item.min' :max='item.max'  @on-blur="validRepeatInput(item.repeat, false, index)"></InputNumber>
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
                  <p class="crm-msg" v-show="formCusNameKey"><Icon type="information-circled"></Icon>CRM系统字段变更为："{{formCusName}}"，是否需要更新？<span @click="changeCRM(14, index)">更新</span><span  @click="cancelCRM(14)">取消</span></p>
                </FormItem>
                <FormItem :label="item.name" v-if='item.type === 15'>
                  <Input readonly v-model="item.result"></Input>
                  <p class="crm-msg" v-show="formCusMobileKey"><Icon type="information-circled"></Icon>CRM系统字段变更为："{{formCusMobile}}"，是否需要更新？<span @click="changeCRM(15, index)">更新</span><span @click="cancelCRM(15)">取消</span></p>
                </FormItem>
                <FormItem :label="item.name" v-if='item.type === 16'>
                  <Input readonly v-model="item.result"></Input>
                  <p class="crm-msg" v-show="formCusAddressKey"><Icon type="information-circled"></Icon>CRM系统字段变更为："{{formCusAddress}}"，是否需要更新？<span @click="changeCRM(16, index)">更新</span><span  @click="cancelCRM(16)">取消</span></p>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="footer-btnGroup">
            <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='cancel'>取消</Button>
          </div>
        </div>
        <div class="change-record-list" v-show='recordKey'>
          <Table stripe :columns="col" :data="data"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime';
  export default {
    components: {resizeTime},
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
        formCusNameKey: false,
        formCusMobileKey: false,
        formCusAddressKey: false,

        formValidate: {},

        saveLoad: false,
        changeKey: false,

        imgUpLoadIndex: 0,
        fileUpLoadIndex: 0,

        recordKey: false,
        data: [],
        col: [
          {
            title: '病历号',
            width: 80,
            key: 'caseNumber'
          },
          {
            title: '病例类型',
            width: 60,
            key: 'caseName'
          },
          {
            title: '变更表单',
            width: 60,
            key: 'templateName'
          },
          {
            title: '变更时间',
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: '变更人',
            width: 60,
            key: 'userName'
          },
          {
            title: '变更字段',
            width: 60,
            key: 'field'
          },
          {
            title: '变更前',
            width: 80,
            key: 'front'
          },
          {
            title: '变更后',
            width: 80,
            key: 'back'
          }
        ]

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
              resultId: res.data.content.caseTemplattResultList.Id,
              templateId: '',
              detailList: [],
              logDetailList: [],
            };
            _vm.data = res.data.content.caseLogList || [];
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
        if(!this.saveDIs && type && !this.recordKey) {
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
        this.recordKey = false;
        this.changeKey = false;
        this.$nextTick(() => {
          this.changeKey = true;
          this.navId = data.id;
          const resultList = this.resultList.filter(item => item.templateId === data.id);
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
              if(obj.type === 14) {
                if(resultList[indexR].value !== this.formCusName) {
                  this.formCusNameKey = true;
                } else {
                  this.formCusNameKey = false;
                }
              }
              if(obj.type === 15) {
                if(resultList[indexR].value !== this.formCusMobile) {
                  this.formCusMobileKey = true;
                } else {
                  this.formCusMobileKey = false;
                }
              }
              if(obj.type === 16) {
                if(resultList[indexR].value !== this.formCusAddress) {
                  this.formCusAddressKey = true;
                } else {
                  this.formCusAddressKey = false;
                }
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
      //crm刷新
      changeCRM(type, index) {
        if(type === 14) {
          this.formList[index].result = this.formCusName;
          this.formCusNameKey = false;
        }
        if(type === 15) {
          this.formList[index].result = this.formCusMobile;
          this.formCusMobileKey = false;
        }
        if(type === 16) {
          this.formList[index].result = this.formCusAddress;
          this.formCusAddressKey = false;
        }
      },
      //crm取消更新
      cancelCRM(type) {
        if(type === 14) {
          this.formCusNameKey = false;
        }
        if(type === 15) {
          this.formCusMobileKey = false;
        }
        if(type === 16) {
          this.formCusAddressKey = false;
        }
      },
      showRecord() {
        this.recordKey = true;
        this.navId = '';
      },
      //验证重复
      validRepeatInput(repeat, type, index) {
        if(repeat === 0) {
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
          _vm.saveLoad = true;
          _vm.formShow.templateId = _vm.navId;
          _vm.formShow.detailList = _vm.formList.map(item => {
            let obj = {
              contentId: item.id,
              value: item.result
            };
            //数字
            if(item.type === 3) {
              obj.value = item.result + '';
            }
            //多选
            if(item.type === 5 || item.type === 7) {
              obj.value = item.result.join(',')
            }
            //日期
            if(item.type === 8) {
              obj.value = moment(item.result).format('YYYY-MM-DD');
            }
            //上传
            if(item.type === 10 || item.type === 13) {
              obj.value = JSON.stringify(item.result);
            }
            return obj;
          });
          _vm.formShow.logDetailList = _vm.saveChange(_vm.formShow.detailList);
          _vm.$http.post({
            url: 'guard-webManager/case/updateByResultIdSmartCaseTemplateResult.jhtml',
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
      },
      saveChange(data) {
        const resultList = this.resultList.filter(item => item.templateId === this.navId);
        let changeList = [];
        if(resultList.length) {
          resultList.map(item => {
            const indexR = data.findIndex(i => i.contentId === item.contentId && i.value !== item.value);
            if(indexR >= 0) {
              const indexT = this.formList.findIndex(i => i.id === item.contentId);
              const indexD = data.findIndex(i => i.contentId === item.contentId);
              let obj = {
                customerId: sessionStorage.getItem('cusId'),
                userId: localStorage.getItem('userId'),
                hospitalId: localStorage.getItem('hospId'),
                templateId: this.navId,
                contentId: item.contentId,
                type: this.formList[indexT].type,
                field: this.formList[indexT].name,
                front: item.value,
                back: data[indexD].value
              };
              //单选
              if(obj.type === 4 || obj.type === 6) {
                const label1 = this.formList[indexT].labelList.find(i => i.id === obj.front).name;
                const label2 = this.formList[indexT].labelList.find(i => i.id === obj.back).name;
                obj.front = label1;
                obj.back = label2;
              }
              //多选
              if(obj.type === 5) {
                const frontList = obj.front.split(',');
                let frontBox = [];
                frontList.map(item1 => {
                  const name = this.formList[indexT].labelList.find(i => i.id === item1).name;
                  frontBox.push(name);
                });
                const backList = obj.back.split(',');
                let backBox = [];
                backList.map(item1 => {
                  const name = this.formList[indexT].labelList.find(i => i.id === item1).name;
                  backBox.push(name);
                });
                obj.front = frontBox.join('、');
                obj.back = backBox.join('、');
              }
              //级联
              if(obj.type === 7) {
                const indexNav = this.navList.findIndex(i => i.id === this.navId);
                const indexList = this.navList[indexNav].list.findIndex(i => i.Id === item.contentId);
                const frontList = obj.front.split(',');
                let frontBox = [];
                frontList.map(item1 => {
                  const name = this.navList[indexNav].list[indexList].labelList.find(i => i.Id === item1).name;
                  frontBox.push(name);
                });
                const backList = obj.back.split(',');
                let backBox = [];
                backList.map(item1 => {
                  const name = this.navList[indexNav].list[indexList].labelList.find(i => i.Id === item1).name;
                  backBox.push(name);
                });
                obj.front = frontBox.join('/');
                obj.back = backBox.join('/');
              }
              //附件
              if(obj.type === 10) {
                const frontList = JSON.parse(obj.front);
                let frontBox = [];
                frontList.map(item1 => {
                  frontBox.push(item1.name);
                });
                const backList = JSON.parse(obj.back);
                let backBox = [];
                backList.map(item1 => {
                  backBox.push(item1.name);
                });
                obj.front = frontBox.join('、');
                obj.back = backBox.join('、');
              }
              //图片
              if(obj.type === 13) {
                const frontList = JSON.parse(obj.front);
                let frontBox = [];
                frontList.map(item1 => {
                  frontBox.push(item1.url);
                });
                const backList = JSON.parse(obj.back);
                let backBox = [];
                backList.map(item1 => {
                  backBox.push(item1.url);
                });
                obj.front = frontBox.join('、');
                obj.back = backBox.join('、');
              }
              changeList.push(obj);
            }
          });
        } else {
          data.map(item => {
            const indexT = this.formList.findIndex(i => i.id === item.contentId);
            let obj = {
              customerId: sessionStorage.getItem('cusId'),
              userId: localStorage.getItem('userId'),
              hospitalId: localStorage.getItem('hospId'),
              templateId: this.navId,
              contentId: item.contentId,
              type: this.formList[indexT].type,
              field: this.formList[indexT].name,
              front: '',
              back: item.value
            };
            //单选
            if(obj.type === 4 || obj.type === 6) {
              const label2 = this.formList[indexT].labelList.find(i => i.id === obj.back).name;
              obj.back = label2;
            }
            //多选
            if(obj.type === 5) {
              const backList = obj.back.split(',');
              let backBox = [];
              backList.map(item1 => {
                const name = this.formList[indexT].labelList.find(i => i.id === item1).name;
                backBox.push(name);
              });
              obj.back = backBox.join('、');
            }
            //级联
            if(obj.type === 7) {
              const indexNav = this.navList.findIndex(i => i.id === this.navId);
              const indexList = this.navList[indexNav].list.findIndex(i => i.Id === item.contentId);
              const backList = obj.back.split(',');
              let backBox = [];
              backList.map(item1 => {
                const name = this.navList[indexNav].list[indexList].labelList.find(i => i.Id === item1).name;
                backBox.push(name);
              });
              obj.back = backBox.join('/');
            }
            //附件
            if(obj.type === 10) {
              const backList = JSON.parse(obj.back);
              let backBox = [];
              backList.map(item1 => {
                backBox.push(item1.name);
              });
              obj.back = backBox.join('、');
            }
            //图片
            if(obj.type === 13) {
              const backList = JSON.parse(obj.back);
              let backBox = [];
              backList.map(item1 => {
                backBox.push(item1.url);
              });
              obj.back = backBox.join('、');
            }
            changeList.push(obj);
          });
        }
        return changeList;
        console.log(changeList);
      },
      cancel() {
        this.getList();
      },
      back() {
        this.$router.back(-1);
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
    .left-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 300px;
      height: 100%;
      .change-record {
        padding: 30px 20px;
        margin-top: 30px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
        p {
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
    }
    .nav-left {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: ~'calc(100% - 126px)';
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
    .right-box {
      position: absolute;
      right: 0;
      top: 0;
      left: 330px;
      min-width: 400px;
      height: 100%;
      .change-record-list {
        padding: 30px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      }
    }
    .main-right {
      overflow-y: auto;
      overflow-x: hidden;
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
      padding-top: 10px 10px 0;
    }
    .crm-msg {
      font-size: 12px;
      line-height: 14px;
      padding: 5px 0;
      i {
        padding-right: 10px;
      }
      span {
        padding: 0 5px;
        margin: 0 5px;
        color: #4172f6;
        cursor: pointer;
      }
    }
  }
</style>

