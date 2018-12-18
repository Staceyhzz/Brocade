/**
 * 编辑效果追踪
 */
<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexEffectrRackingtext.tit3')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('effectTrackingAdd.label1')">
          {{titName}}
        </Form-item>
        <Form-item :label="$t('effectTrackingAdd.label2')" prop="createTime">
          <Date-picker :transfer='true' type="date" style="width: 300px" :clearable='false' @on-change='setTime' :value='timeVal'></Date-picker>
        </Form-item>
        <div v-for='(item, index) in formList' :key='index' class="form-item">
          <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 1'>
            <Input :placeholder="$t('placeholderPublic.input')" v-model.trim="item.result" style="width: 300px"></Input>
          </FormItem>
          <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 2'>
            <InputNumber v-model="item.result"></InputNumber>
            <span>{{item.unitName}}</span>
          </FormItem> 
          <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 3'>
            <RadioGroup v-model="item.result">
              <Radio :label="item1.id" v-for='(item1, index1) in item.labelList' :key='index1' :value='item1.id' :disabled='item1.status === 0'>{{item1.labelName}}</Radio>
            </RadioGroup>
          </FormItem> 
          <FormItem :label="item.contentName" :required='item.required === 1' v-if='item.type === 4'>
            <CheckboxGroup v-model="item.checkBox">
              <Checkbox :label="item1.id" v-for='(item1, index1) in item.labelList' :key='index1' :value='item1.id' :disabled='item1.status === 0'>{{item1.labelName}}</Checkbox>
            </CheckboxGroup>
          </FormItem> 
          <FormItem :label="item.contentName" v-if='item.type === 5' :required='item.required === 1'>
            <div class="upload-list" v-for="(item1, index1) in showList" :key='index1'>
              <img :src="item1.url">
              <div class="upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item1)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index1, item1)"></Icon>
              </div>
            </div>
            <Upload
              ref="upload"
              :before-upload="handleBeforeUpload"
              type="drag"
              action="//"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem> 
          <FormItem :label="item.contentName" v-if='item.type === 6' :required='item.required === 1'>
            <Input readonly icon="ios-search" :placeholder="$t('effectTrackingAdd.input')" @on-focus='addCharge(index)' v-model="item.chargeName" style="width: 300px"></Input>
          </FormItem> 
        </div>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal :title="$t('photoAdd.msg1')" v-model="visible">
      <img :src="modalUrl" v-if="visible" style="maxWidth: 100%">
    </Modal>
    <cmptChargeChoose :placeHolder="$t('effectTrackingAdd.input')" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
  </div>
</template>
<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {
      cmptChargeChoose
    },
    data () {
      return {
        cusName: '',
        titName: '',
        hospName: '',
        hospId: '',
        timeVal: '',
        saveLoad: false,

        chargeIndex: '',
        chargeOpenKey: false,

        formValidate: {
          customerId: '',
          createTime: '',
        },

        formList: [],
        unitList: [],

        showList: [],
        imgList: [],
        visible: false,
        modalUrl: '',
      }
    },
    created () {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerManagement/updateJurisdiction',
          data: {
            authType: 'updateEffectrRacking',
            createTime: _vm.$route.query.createTime
          },
          success: function (res) {
            _vm.getList();
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerManagement/findByResultIdEffectrRackingResultDetail.jhtml',
          data: {
            resultId: _vm.$route.query.id,
            templateId: _vm.$route.query.templateId,
            status: 1
          },
          success: function (res) {
            if(res.data.code === 0) {
              const temObj = res.data.content.resultList[0] || {};
              const resultList = temObj.ResultDetail || [];
              const formList = res.data.content.templateList || [];
              _vm.titName = temObj.templateName || '';
              _vm.hospName = temObj.hospitalName || '';
              _vm.hospId = temObj.hospitalId || '';
              _vm.formValidate.createTime = temObj.createTime || '';
              _vm.timeVal = temObj.createTime
                ? temObj.createTime.split(' ')[0]
                : '';
              _vm.formList = formList.map(item => {
                const index = resultList.findIndex(r => r.contentId === item.contentId);
                if(index >= 0) {
                  item.relevanceId = resultList[index].relevanceId;
                  item.resultName = resultList[index].resultName;
                  item.relevanceResult = resultList[index].relevanceResult;
                  item.resultDetailId = resultList[index].id;
                } else {
                  item.resultDetailId = 0;
                }
                if(item.type === 1) {
                  item.result = index >= 0
                    ? resultList[index].resultName
                    : '';
                }
                if(item.type === 2) {
                  item.result = index >= 0
                    ? resultList[index].resultName * 1
                    : 0;
                  item.unitName = index >= 0
                    ? resultList[index].relevanceResult
                    : '';
                }
                if(item.type === 3) {
                  item.result = index >= 0
                    ? resultList[index].resultName * 1
                    : '';
                }
                if(item.type === 4) {
                  item.result = index >= 0
                    ? resultList[index].resultName
                    : '';
                  item.checkBox = index >= 0
                    ? resultList[index].resultName.split(',').map(r => r * 1)
                    : [];
                }
                if(item.type === 5) {
                  item.result = '';
                  const img = resultList.filter(r => r.contentId === item.contentId);
                  img.map(i => {
                    _vm.showList.push({
                      id: i.id,
                      url: i.resultName
                    });
                    _vm.imgList.push({
                      id: i.id,
                      url: i.resultName
                    });
                  });
                }
                if(item.type === 6) {
                  item.result = index >= 0
                    ? resultList[index].resultId
                    : '';
                  item.chargeName = index >= 0
                    ? resultList[index].resultName
                    : '';
                }
                return item;
              });
						  _vm.$store.dispatch('setPageLoading', 1);
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      addCharge(index) {
        this.chargeIndex = index;
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      setCharge(data) {
        this.formList[this.chargeIndex].chargeName = data.name;
        this.formList[this.chargeIndex].result = data.id;
      },
      setTime(date) {
        this.formValidate.createTime = date + ' ' + moment().format('hh:mm:ss');
      },
      saveRule() {
        this.formList.map(item => {
          if(item.type === 4) {
            item.result = item.checkBox.join(',');
          }
          if(item.type === 5) {
            item.result = '';
            if(item.required === 1 && this.imgList.length > 0) {
              item.result = 1;
            }
          }
          if(item.type === 2) {
            if(!Number.isFinite(item.result)) {
              item.result = 0;
            }
          }
        });
        const list = this.formList.filter(item => item.required === 1 && item.result === '');
        if(list.length > 0) {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('effectTrackingAdd.valid')
          });
          return false;
        }
        else {
          return true;
        }
      },
      handleView (data) {
        this.modalUrl = data.url;
        this.visible = true;
      },
      handleRemove (index, data) {
        let _vm = this;
        if(data.id) {
          _vm.$http.post({
            url: 'guard-webManager/customerManagement/deleteByIdSmartEffectrRackingResultDetail.jhtml',
            data: {
              resultDetailId: data.id
            },
            success: function (res) {
              _vm.showList.splice(index, 1);
              _vm.imgList.splice(index, 1);
            },
            error: function (res) {
              console.log(res)
            }
          })
        } else {
          _vm.showList.splice(index, 1);
          _vm.imgList.splice(index, 1);
        }
      },
      handleBeforeUpload (data) {
        let translateBase = 10485760;
        if(/\.(gif|jpg|jpeg|bmp|png|)$/.test((data.name).toLowerCase())) {
          if(data.size < translateBase) {
            this.imgList.push({
              id: 0,
              url: data
            });
            this.showList.push({
              id: 0,
              url: this.getObjectURL(data)
            });
          } else {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('photoAdd.valid3')
            });
          }
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('photoAdd.valid4')
          });
        }
        return false;
      },
      getObjectURL (file) {
        let url = null;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },

      save () {
        let _vm = this;
        if(_vm.saveRule()) {
          let param = new FormData();
          _vm.saveLoad = true;
          const list = _vm.formList.map(item => {
            let resultId = item.resultId;
            let resultText = item.result + '';
            let relevanceResult = item.relevanceResult;
            if(item.type === 2) {
              resultId = item.company * 1;
              relevanceResult = item.unitName;
            }
            if(item.type === 6) {
              resultId = item.result
                ? item.result
                : 0;
              resultText = item.chargeName;
            }
            return {
              type: item.type,
              contentId: item.contentId,
              relevanceId: resultId,
              resultName: resultText,
              relevanceResult: relevanceResult,
              resultDetailId: item.resultDetailId
            };
          });
          _vm.imgList.map((item, index) => {
            if(!item.id) {
              param.append('file', item.url);
              param.append('chunks', index);
            }
          });
          param.append('customerId', _vm.formValidate.customerId);
          param.append('createTime', _vm.formValidate.createTime);
          param.append('customerName', _vm.cusName);
          param.append('hospitalId', _vm.hospId);
          param.append('hospitalName', _vm.hospName);
          param.append('resultId', _vm.$route.query.id);
          param.append('templateId', _vm.$route.query.templateId);
          param.append('templateName', _vm.titName);
          param.append('content', JSON.stringify(list));
          _vm.$http.upload({
            url: 'guard-webManager/customerManagement/updateByIdSmartEffectrRackingResult.jhtml',
            data: param,
            success: function(res){
              if(res.data.code === 0) {
                const breadData = [
                  {
                    url: '/desktop',
                    text: 'layoutNav.desk'
                  },
                  {
                    url: '/customer',
                    text: 'layoutNav.customerManage'
                  },
                  {
                    url: '/indexEffectrRackingtext',
                    text: _vm.cusName
                  }
                ];
                _vm.$store.dispatch('setBreadData', breadData);
                _vm.$router.push({
                  path: '/indexEffectrRackingtext',
                  query: {
                    templateId: _vm.$route.query.templateId
                  }
                });
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.content
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
              console.log(res)
            }
          }) 
        }
      },
      back () {
        this.$router.push({
          path: '/indexEffectrRackingtext',
          query: {
            templateId: this.$route.query.templateId
          }
        });
      }
    },
  }
</script>

