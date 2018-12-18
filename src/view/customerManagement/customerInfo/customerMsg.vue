/** 
 * 客户概况页面 
 */
<template>
  <div class="customer-box customer-msg">
    <Row :gutter="32">
      <Col :sm="24" :md="8">
        <div class="container-left">
          <p class="edit">
            <span @click="editCusInfo">
              <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
            </span>
          </p>
          <img :src="cusInfoLeft.cusImgUrl" alt="" class="cusImg">
          <h2>
            {{cusInfoLeft.name}}
            <Tooltip placement="top">
              <span :class="[cusInfoRight.weChat ? 'bind' : '']">
                <Icon type="chatbubbles"></Icon>
              </span>
              <div slot="content">
                <p v-if='!cusInfoRight.weChat'>{{$t('customerMsg.label1')}}</p>
                <p v-if='cusInfoRight.weChat'>{{$t('customerMsg.label2')}}{{cusInfoRight.weChat}}</p>
                <p v-if='cusInfoRight.weChat'>{{$t('customerMsg.label3')}}{{cusInfoRight.weChatBindTime}}</p>
              </div>
            </Tooltip>
          </h2>
          <p class="age"> 
            <span>{{cusInfoLeft.age}}</span>
            <span>{{cusInfoLeft.genderText}}</span>
            <span>{{cusInfoLeft.birthday}}</span>
          </p>
          <div class="line"></div>
          <h3>{{$t('customerMsg.label4', [])}}</h3>
          <p class="label">
            {{$t('customerMsg.label5')}}
            <!-- <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editPower(4)"></Button> -->
            <Button type="ghost" icon="email" size="small" :loading='powerLoad' @click="editPower(6)"></Button>
            <Button type="ghost" icon="ios-telephone" size="small" :loading='powerLoad' @click="callCus"></Button>
          </p>
          <!-- <p class="msg">{{cusInfoLeft.mobile}}</p> -->
          <div class="phone-box">
            <p class="phone" @click="editPhone" v-show='editPhoneKey'>{{cusInfoLeft.mobile}}</p>
            <Input v-model.trim="mobile" placeholder="请输入联系方式" :maxlength='20' v-show='!editPhoneKey' size="small" icon='close-round' @on-blur='closePhone' @on-click='closePhone' @on-enter='savePhone' ref='phone'></Input>
          </div>
          <p class="label tit">
            {{$t('customerMsg.label6')}}
            <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editPower(5)"></Button>
          </p>
          <p class="msg">{{cusInfoLeft.mobile2}}</p>
          <p class="msg">{{cusInfoLeft.mobile3}}</p>
          <p class="msg">{{cusInfoLeft.mobile4}}</p>
          <p class="msg">{{cusInfoLeft.mobile5}}</p>
          <p class="label tit">{{$t('customerMsg.label7')}}</p>
          <p class="msg">{{cusInfoLeft.provinceName + cusInfoLeft.cityName + cusInfoLeft.districtName + cusInfoLeft.addressLang}}</p>
          <div class="line"></div>
          <p class="label">{{$t('customerMsg.label8')}}</p>
          <p class="msg">{{cusInfoLeft.fnLang}}</p>
          <p class="label tit">{{$t('customerMsg.label9')}}</p>
          <p class="msg">{{cusInfoLeft.remarkLang}}</p>
        </div>
      </Col>
      <Col :sm="24" :md="16">
        <div class="container-right">
          <Row type="flex" justify="start" :gutter="32">
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label12')}}</h3>
              <p class="msg">
                <span>{{$t('customerMsg.label13')}}</span>
                {{cusInfoRight.createUserHospitalName}} 
                {{cusInfoRight.createUserDeptName}} 
                {{cusInfoRight.createUserName}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label14')}}</span>
                {{cusInfoRight.promoterName}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label15')}}</span>
                {{cusInfoRight.storeNameLang}}
                <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editPower(3)"></Button>
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label16')}}</span>
                {{cusInfoRight.channelNameLang}}
                <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editPower(1)"></Button>
              </p>
              <p class="msg tit">
                <span>{{$t('customer.label31')}}</span>
                {{cusInfoRight.distributionUserName}}
              </p>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label17')}}</h3>
              <img :src="cusInfoRight.vipUrl" alt="" class="vip">
              <p class="msg">{{cusInfoRight.vipName}}</p>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label18')}}</h3>
              <p class="msg">
                <span>{{$t('labelPublic.kfry')}}</span>
                {{cusInfoRight.exploitUserName}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label19')}}</span>
                {{cusInfoRight.managerUserName}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label20')}}</span>
                {{cusInfoRight.symptomName}}
                <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editPower(2)"></Button>
              </p>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label21')}}</h3>
              <div class="tag-box">
                <Tag color="blue" v-if="cusInfoRight.firstVisitTime">{{$t('customerMsg.label22')}}</Tag>
                <Tag color="red" v-else>{{$t('customerMsg.label23')}}</Tag>
                <Tag color="blue" v-if="cusInfoRight.firstDealTime">{{$t('customerMsg.label24')}}</Tag>
                <Tag color="red" v-else>{{$t('customerMsg.label25')}}</Tag>
                <Tag color="red" v-if="cusInfoRight.complainNum > 0">{{$t('customerMsg.label26')}}</Tag>
                <Tag color="red" v-if="cusInfoRight.blackNum > 0">{{$t('customerMsg.label27')}}</Tag>
                <Tag color="blue" v-if="cusInfoRight.weChat !== ''">{{$t('customerMsg.label28')}}</Tag>
              </div>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label29')}}</h3>
              <p class="msg">
                <span>{{$t('customerMsg.label30')}}</span>
                {{cusInfoRight.firstVisit}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label31')}}</span>
                {{cusInfoRight.firstVisitHosp}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label32')}}</span>
                {{cusInfoRight.lastConsultTime}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label33')}}</span>
                {{cusInfoRight.lastVisitTime}}
              </p>
              <p class="msg tit">
                <span>{{$t('customerMsg.label34')}}</span>
                {{cusInfoRight.createTime}}
              </p>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>{{$t('customerMsg.label20')}}</h3>
              <div class="tag-box">
                <Tag :color="item.status === 1 ? 'red' : 'blue'" v-for='(item, index) in symptomList' :key='index'>{{item.name}}</Tag>
              </div>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>
                {{$t('customerMsg.label35')}}
                <Button type="ghost" icon="edit" size="small" :loading='powerLoad' @click="editCustom"></Button>
              </h3>
              <p class="msg">
                <span>{{cusInfoRight.customTit1}}</span>
                {{cusInfoRight.customConLang1}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit2}}</span>
                {{cusInfoRight.customConLang2}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit3}}</span>
                {{cusInfoRight.customConLang3}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit4}}</span>
                {{cusInfoRight.customConLang4}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit5}}</span>
                {{cusInfoRight.customConLang5}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit6}}</span>
                {{cusInfoRight.customConLang6}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit7}}</span>
                {{cusInfoRight.customConLang7}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit8}}</span>
                {{cusInfoRight.customConLang8}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit9}}</span>
                {{cusInfoRight.customConLang9}}
              </p>
              <p class="msg tit">
                <span>{{cusInfoRight.customTit10}}</span>
                {{cusInfoRight.customConLang10}}
              </p>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="12" class="item">
              <h3>
                {{$t('customerMsg.label36')}}
                <Button type="ghost" icon="ios-pricetags" size="small" @click="toTagView(true)"></Button>
              </h3>
              <div class="tag-box did">
                <Tag color="blue" v-for='(item, index) in tagList' :key='index'>{{item.tagName}}</Tag>
              </div>
              <h3>
                {{$t('customerMsg.label37')}}
                <Button type="ghost" icon="ios-pricetags" size="small" @click="toTagView(false)"></Button>
              </h3>
              <div class="tag-box">
                <Tag color="blue" v-for='(item, index) in groupList' :key='index'>{{item.groupName}}</Tag>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Modal :title="$t('customerMsg.modalTit1')" v-model="cusInfoEditModal" :closable="false" @on-ok="okCusEdit" :loading="cusInfoEditLoad" class-name="vertical-center-modal">
      <Form ref="cusInfoEditLeft" :model="cusInfoEditLeft" :label-width="80" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('labelPublic.xm')" prop="name" required>
          <Input v-model.trim="cusInfoEditLeft.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.xb')" prop='gender' required>
          <Select v-model="cusInfoEditLeft.gender" style="width:200px">
            <Option :value="1">{{$t('publicSet.man')}}</Option>
            <Option :value="2">{{$t('publicSet.woman')}}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('customerMsg.label10')" prop="districtId" required>
          <Select v-model="cusInfoEditLeft.provinceID" style="width:200px" @on-change='getCity'>
            <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Select v-model="cusInfoEditLeft.cityID" style="width:200px" @on-change='getDistrict'>
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Select v-model="cusInfoEditLeft.districtId" style="width:200px">
            <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('customerMsg.label7')" prop="address">
          <Input v-model.trim="cusInfoEditLeft.address" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.nl')" prop="age">
          <cmptInputNumber :max="1000" :min="0" v-model="cusInfoEditLeft.age" :precision='0' style="width: 200px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('customerMsg.label11')" prop='birthday'>
          <Date-picker :transfer='true' :value="cusInfoEditLeft.birthday" type="date" placement="bottom-start" format="MM-dd" :placeholder="$t('customerMsg.placeholder1')" style="width: 200px"
            @on-change='setBirthday'></Date-picker>
        </Form-item>
        <Form-item :label="$t('customerMsg.label8')" prop="fn">
          <Input v-model.trim="cusInfoEditLeft.fn" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="cusInfoEditLeft.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='200'></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal :title="$t('customerMsg.modalTit2')" v-model="customEditModal" :closable="false" @on-ok="okCustom" :loading="customEditLoad" class-name="vertical-center-modal">
      <Form ref="customEdit" :model="customEdit" :label-width="100" label-position="right">
        <Form-item :label="cusInfoRight.customTit1">
          <Input v-model.trim="customEdit.custom1" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit2">
          <Input v-model.trim="customEdit.custom2" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit3">
          <Input v-model.trim="customEdit.custom3" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit4">
          <Input v-model.trim="customEdit.custom4" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit5">
          <Input v-model.trim="customEdit.custom5" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit6">
          <Input v-model.trim="customEdit.custom6" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit7">
          <Input v-model.trim="customEdit.custom7" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit8">
          <Input v-model.trim="customEdit.custom8" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit9">
          <Input v-model.trim="customEdit.custom9" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="cusInfoRight.customTit10">
          <Input v-model.trim="customEdit.custom10" :maxlength='20'></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal :title="powerTit" v-model="modalPower" :closable="false" @on-ok="okPower" @on-cancel="cancelPower" :loading="loadingPower"
      class-name="vertical-center-modal">
      <Form ref="formPower" :model="formPower" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('customerMsg.label16')" prop="channelId" required v-if='powerKey === 1'>
          <input-remote
            :list='channelList' 
            :asyncKey='channelAsyncKey' 
            @on-change-word='changeWordChannel' 
            @on-clean='cleanChannel'
            idProp='id' 
            nameProp='name' 
            :clearable='true'
            :inputVal='formPower.channelName'
            :inputId='formPower.channelId'
            v-model="formPower.channelId"
            :placeholder="$t('placeholderPublic.filter')">
            <template slot="title">
              <p style="width: 100%">{{$t('labelPublic.mc')}}</p>
            </template>
            <template scope="label">
              <p style="width: 100%">{{label.data.name}}</p>
            </template>
          </input-remote>
        </Form-item>
        <Form-item :label="$t('customerMsg.label20')" prop="symptomId" required v-show='powerKey === 2'>
          <Select v-model="formPower.symptomId">
            <Option v-for="item in symptomTypeList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('customerMsg.label15')" prop="storeId" required v-if='powerKey === 3'>
          <input-remote
            :list='storeList' 
            :asyncKey='storeAsyncKey' 
            @on-change-word='changeWordStore' 
            @on-clean='cleanStore'
            idProp='id' 
            nameProp='name' 
            :clearable='true'
            size='large'
            :inputVal='formPower.storeName'
            :inputId='formPower.storeId'
            v-model="formPower.storeId"
            :placeholder="$t('placeholderPublic.filter')">
            <template slot="title">
              <p style="width: 40%">{{$t('labelPublic.mc')}}</p>
              <p style="width: 20%">{{$t('customerMsg.label44')}}</p>
              <p style="width: 20%">{{$t('customerMsg.label45')}}</p>
              <p style="width: 20%">{{$t('customerMsg.label46')}}</p>
            </template>
            <template scope="label">
              <p style="width: 40%">{{label.data.name}}</p>
              <p style="width: 20%">{{label.data.categoryName}}</p>
              <p style="width: 20%">{{label.data.linkman}}</p>
              <p style="width: 20%">{{label.data.address}}</p>
            </template>
          </input-remote>
        </Form-item>
        <Form-item :label="$t('customerMsg.label4')" prop="mobile" required v-show='powerKey === 4'>
          <Input v-model.trim="formPower.mobile" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('customerMsg.label4', [2])" prop="mobile2" v-show='powerKey === 5'>
          <Input v-model.trim="formPower.mobile2" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('customerMsg.label4', [3])" prop="mobile3" v-show='powerKey === 5'>
          <Input v-model.trim="formPower.mobile3" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('customerMsg.label4', [4])" prop="mobile4" v-show='powerKey === 5'>
          <Input v-model.trim="formPower.mobile4" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('customerMsg.label4', [5])" prop="mobile5" v-show='powerKey === 5'>
          <Input v-model.trim="formPower.mobile5" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal :title="$t('customerMsg.modalTit3')" width='700' v-model="modalMessage" @on-ok="okMessage" :loading="loadingMessage" @on-cancel="cancelMessage"
      :closable="false" :okText="$t('customerMsg.btn')" class-name="vertical-center-modal">
      <Form ref="formMessage" :model="formMessage" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('customerMsg.label38')" prop='templateId' required>
          <Select v-model="formMessage.templateId" style="width:300px" @on-change='setTem'>
            <Option v-for="item in templateList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('customerMsg.label39')">
          <span>{{temContent}}</span>
        </Form-item>
        <Form-item :label="$t('customerMsg.label40')">
          <span>{{temNum}}</span>
        </Form-item>
        <!-- <Form-item :label="$t('customerMsg.label41')">
          <span>{{$t('customerMsg.label42')}}</span>
        </Form-item> -->
        <Form-item :label="$t('customerMsg.label43', [item])" :prop="'param' + item" v-for='(item, index) in paramsList' :key='index'>
          <Input v-model.trim="formMessage['param' + (index + 1)]" :placeholder="$t('placeholderPublic.input')"  style="width:300px" :maxlength='1000'></Input>
          <span v-if='index === 0'>{{$t('customerMsg.label42')}}</span>
        </Form-item>
      </Form>
    </Modal>
  </div>  
</template>

<script>
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote},
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('customerMsg.valid1')));
        } else {
          callback();
        }
      };
      const validateArea = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('customerMsg.valid2')));
        }
      };
      const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'));
        } else {
          callback();
        }
      };
      const validateTem = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('customerMsg.valid3')));
        } else {
          callback();
        }
      };
      return {
        cusId: '',

        //左侧个人简介
        cusInfoLeft: {
          id: '',
          name: '',
          gender: '',
          provinceID: '',
          cityID: '',
          districtId: '',
          age: '',
          birthday: '',
          fn: '',
          fnLang: '',
          address: '',
          addressLang: '',
          remark: '',
          remarkLang: '',
          genderText: '',
          cityName: '',
          provinceName: '',
          districtName: '',
          cusImgUrl: '',
          mobile: '',
          mobile2: '',
          mobile3: '',
          mobile4: '',
          mobile5: '',
        },
        cusInfoEditLeft: {},
        cusInfoEditModal: false,
        cusInfoEditLoad: true,
        selectCKey: false,
        selectDKey: false,
        provinceList: [],
        cityList: [],
        districtList: [],

        //左侧修改号码
        editPhoneKey: true,
        editPhonePower: false,
        mobile: '',

        //右侧详细信息
        cusInfoRight: {
          //获客渠道
          createUserHospitalName: '',
          createUserDeptName: '',
          createUserName: '',
          promoterName: '',
          storeName: '',
          storeNameLang: '',
          storeId: '',
          channelName: '',
          channelNameLang: '',
          channelId: '',
          distributionUserName: '',
          distributionUserNameLang: '',
          //客户特征
          firstVisitTime: '',
          firstDealTime: '',
          complainNum: 0,
          blackNum: 0,
          weChat: '',
          weChatBindTime: '',
          //会员信息
          vipUrl: '',
          vipName: '',
          //客服信息
          exploitUserName: '',
          managerUserName: '',
          symptomName: '',
          symptomId: '',
          //服务信息
          firstVisit: '',
          firstVisitHosp: '',
          lastConsultTime: '',
          lastVisitTime: '',
          createTime: '',
          //扩展信息
          customTit1: '',
          customTit2: '',
          customTit3: '',
          customTit4: '',
          customTit5: '',
          customTit6: '',
          customTit7: '',
          customTit8: '',
          customTit9: '',
          customTit10: '',
          customCon1: '',
          customCon2: '',
          customCon3: '',
          customCon4: '',
          customCon5: '',
          customCon6: '',
          customCon7: '',
          customCon8: '',
          customCon9: '',
          customCon10: '',
          customConLang1: '',
          customConLang2: '',
          customConLang3: '',
          customConLang4: '',
          customConLang5: '',
          customConLang6: '',
          customConLang7: '',
          customConLang8: '',
          customConLang9: '',
          customConLang10: '',
        },
        //标签
        tagList: [],
        //分组
        groupList: [],
        //咨询项目
        symptomList: [],

        //编辑自定义
        customEdit: {},
        customEditModal: false,
        customEditLoad: true,

        //编辑小图标
        powerLoad: false,
        modalPower: false,
        loadingPower: true,
        powerKey: '',
        powerTit: '',
        powerList: [
          {
            key: 1,
            tit: this.$t('customerMsg.modalTit4'),
            editUrl: 'guard-webManager/customerRecord/updateChannel.jhtml',
            saveUrl: 'guard-webManager/customerRecord/updateChannelEdit.jhtml'
          },
          {
            key: 2,
            tit: this.$t('customerMsg.modalTit5'),
            editUrl: 'guard-webManager/customerRecord/updateSymptom.jhtml',
            saveUrl: 'guard-webManager/customerRecord/updateSymptomEdit.jhtml'
          },
          {
            key: 3,
            tit: this.$t('customerMsg.modalTit6'),
            editUrl: 'guard-webManager/customerRecord/updateStore.jhtml',
            saveUrl: 'guard-webManager/customerRecord/updateStoreEdit.jhtml'
          },
          {
            key: 4,
            tit: '修改联系方式',
            editUrl: 'guard-webManager/customerRecord/updateMobile.jhtml',
            saveUrl: 'guard-webManager/customerRecord/updateMobileEdit.jhtml'
          },
          {
            key: 5,
            tit: this.$t('customerMsg.modalTit7'),
            editUrl: 'guard-webManager/customerRecord/updateMobileOther.jhtml',
            saveUrl: 'guard-webManager/customerRecord/updateMobileOtherEdit.jhtml'
          },
          {
            key: 6,
            tit: '',
            editUrl: 'guard-webManager/customerRecord/getAddSms.jhtml',
            saveUrl: ''
          }
        ],
        formPower: {},

        //渠道快捷搜索
        storeAllList: [],
        storeList: [],
        storeAsyncKey: true,
        storeIndex: 0,

        //来源快捷搜索
        channelAllList: [],
        channelList: [],
        channelAsyncKey: true,
        channelIndex: 0,

        //发送短信
        modalMessage: false,
        loadingMessage: true,
        formMessage: {
          customerId: sessionStorage.getItem('cusId'),
          templateId: '',
          param1: '',
          param2: '',
          param3: '',
          param4: '',
          param5: '',
          param6: '',
          param7: '',
          param8: '',
        },
        templateList: [],
        paramsList: [],
        temContent: '',
        temNum: '',

        ruleForm: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          districtId: [{
            validator: validateArea,
            trigger: 'change'
          }],
          mobile: [{
            validator: validateMobile,
            trigger: 'blur'
          }],
          templateId: [{
            validator: validateTem,
            trigger: 'change'
          }],
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path == '/customerIndex') {
          vm.$store.dispatch('setPageLoading', 1);
        }
      })
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL;
      },
      symptomTypeList() {
        return this.$store.getters.getSelectAllSymptomInfoList;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'customerIndex' || val === 'customerMsg') {
          this.getCusInfo();
        }
      },
    },
    mounted() {
      this.cusId = sessionStorage.getItem('cusId');
      this.getCusInfo();
      this.getProvince();
      this.getEditPhone();
      this.getStore();
      this.getChannel();
      this.$store.dispatch('setSelectAllSymptomInfoList');
    },
    methods: {
      //获取个人信息
      getCusInfo() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/customerInfo.jhtml',
          data: {
            id: _vm.cusId
          },
          success: function (res) {
            const obj = res.data.content || {};
            const cusInfo = obj.Customer || {};
            const firstVisit = obj.firstVisit || {};

            //左侧信息
            const _cusInfoLeft = {
              id: cusInfo.id || '',
              name: cusInfo.name || '',
              gender: cusInfo.gender || 1,
              provinceID: cusInfo.provinceID || '',
              cityID: cusInfo.cityID || '',
              districtId: cusInfo.districtID || '',
              age: obj.Age * 1 || null,
              birthday: obj.BirthDay || '',
              fn: cusInfo.fn || '',
              fnLang: cusInfo.fn || '',
              address: cusInfo.address || '',
              addressLang: cusInfo.address || '',
              remark: cusInfo.remark || '',
              remarkLang: cusInfo.remark || '',
              cusImgUrl: cusInfo.imageUrl
                ? _vm.baseImgURL + cusInfo.imageUrl
                : require('assets/img/default-avatar.png'),
              genderText: cusInfo.gender === 2
                ? _vm.$t('publicSet.woman')
                : _vm.$t('publicSet.man'),
              cityName: cusInfo.cityName || '',
              provinceName: cusInfo.provinceName || '',
              districtName: cusInfo.districtName || '',
              mobile: obj.mobile || '',
              mobile2: obj.mobile2 || '',
              mobile3: obj.mobile3 || '',
              mobile4: obj.mobile4 || '',
              mobile5: obj.mobile5 || ''
            };

            //右侧信息
            const _cusInfoRight = {
              //获客渠道
              createUserHospitalName: cusInfo.createUserHospitalName || '',
              createUserDeptName: cusInfo.createUserDeptName || '',
              createUserName: cusInfo.createUserName || '',
              promoterName: cusInfo.promoterName || '',
              storeName: cusInfo.storeName || '',
              storeNameLang: cusInfo.storeName || '',
              storeId: cusInfo.storeID|| '',
              channelName: cusInfo.channelName || '',
              channelNameLang: cusInfo.channelName || '',
              channelId: cusInfo.channelID || '',
              distributionUserName: cusInfo.distributionUserName || '',
              distributionUserNameLang: cusInfo.distributionUserName || '',
              //客户特征
              firstVisitTime: cusInfo.firstVisitTime || '',
              firstDealTime: cusInfo.firstDealTime || '',
              complainNum: cusInfo.complainNum || 0,
              blackNum: cusInfo.blackNum || 0,
              weChat: cusInfo.weChat || '',
              weChatBindTime: cusInfo.wechatBindTime || '',
              //会员信息
              vipUrl: obj.memberImage
                ? _vm.baseImgURL + obj.memberImage
                : require('assets/img/default-avatar.png'),
              vipName: cusInfo.memberCategoryName || '',
              //客服信息
              exploitUserName: obj.currentExploitUser || '',
              managerUserName: obj.currentManagerUser || '',
              symptomName: cusInfo.symptomName || '',
              symptomId: cusInfo.symptomID || '',
              //服务信息
              firstVisit: firstVisit.createTime || '',
              firstVisitHosp: firstVisit.hospitalName || '',
              lastConsultTime: cusInfo.lastConsultTime || '',
              lastVisitTime: cusInfo.lastVisitTime || '',
              createTime: cusInfo.createTime || '',
              //扩展信息
              customTit1: obj.custom1 || '自定义1',
              customTit2: obj.custom2 || '自定义2',
              customTit3: obj.custom3 || '自定义3',
              customTit4: obj.custom4 || '自定义4',
              customTit5: obj.custom5 || '自定义5',
              customTit6: obj.custom6 || '自定义6',
              customTit7: obj.custom7 || '自定义7',
              customTit8: obj.custom8 || '自定义8',
              customTit9: obj.custom9 || '自定义9',
              customTit10: obj.custom10 || '自定义10',
              customCon1: cusInfo.custom1 || '',
              customCon2: cusInfo.custom2 || '',
              customCon3: cusInfo.custom3 || '',
              customCon4: cusInfo.custom4 || '',
              customCon5: cusInfo.custom5 || '',
              customCon6: cusInfo.custom6 || '',
              customCon7: cusInfo.custom7 || '',
              customCon8: cusInfo.custom8 || '',
              customCon9: cusInfo.custom9 || '',
              customCon10: cusInfo.custom10 || '',
              customConLang1: cusInfo.custom1 || '',
              customConLang2: cusInfo.custom2 || '',
              customConLang3: cusInfo.custom3 || '',
              customConLang4: cusInfo.custom4 || '',
              customConLang5: cusInfo.custom5 || '',
              customConLang6: cusInfo.custom6 || '',
              customConLang7: cusInfo.custom7 || '',
              customConLang8: cusInfo.custom8 || '',
              customConLang9: cusInfo.custom9 || '',
              customConLang10: cusInfo.custom10 || '',
            };

            //标签
            const _tagList = cusInfo.tagList || [];
            //分组
            const _groupList = obj.groupList || [];
            //咨询项目
            const _symptomList = obj.SymptomList || [];

            if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
              _vm.cusInfoLeft = _cusInfoLeft;
              _vm.cusInfoRight = _cusInfoRight
              _vm.tagList = _tagList;
              _vm.groupList = _groupList;
              _vm.symptomList = _symptomList;
            } else {
              _vm.requestList([_cusInfoLeft], ['fnLang', 'addressLang', 'remarkLang', 'cityName', 'provinceName', 'districtName']).then(res => _vm.cusInfoLeft = res[0]);
              _vm.requestList([_cusInfoRight], ['storeNameLang', 'channelNameLang', 'distributionUserNameLang', 'vipName', 'customTit1',  'customTit2', 'customTit3', 'customTit4', 'customTit5', 'customTit6', 'customTit7',  'customTit8', 'customTit9', 'customTit10', 'customConLang1', 'customConLang2', 'customConLang3', 'customConLang4', 'customConLang5', 'customConLang6', 'customConLang7', 'customConLang8', 'customConLang9', 'customConLang10']).then(res => _vm.cusInfoRight = res[0]);
              _vm.requestList(_tagList, ['tagName']).then(res => _vm.tagList = res);
              _vm.requestList(_groupList, ['groupName']).then(res => _vm.groupList = res);
              _vm.requestList(_symptomList, ['name']).then(res => _vm.symptomList = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //判断是否有修改电话权限
      getEditPhone() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/updateMobile.jhtml',
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.editPhonePower = true;
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      editPhone() {
        if(this.editPhonePower) {
          this.mobile = this.cusInfoLeft.mobile;
          this.editPhoneKey = false;
          this.$nextTick(() => {
            this.$refs.phone.focus();
          });
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('customerMsg.msg1')
          });
        }
      },
      savePhone() {
        let _vm = this;
        if(_vm.mobile !== _vm.cusInfoLeft.mobile && _vm.mobile.length > 0) {
          _vm.$http.post({
            url: 'guard-webManager/customerRecord/updateMobileEdit.jhtml',
            data: {
              mobile: _vm.mobile,
              customerId: _vm.cusId
            },
            success: function (res) {
              if (res.data.code === 0) {
                _vm.$Notice.success({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: _vm.$t('publicSet.noticeSuccess')
                });
                _vm.cusInfoLeft.mobile = _vm.mobile;
                _vm.editPhoneKey = true;
              } else {
                if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                } else {
                  _vm.getLang.word(res.data.desc, (data) => {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: data[0].dst
                    });
                  });
                }
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        } else {
          _vm.editPhoneKey = true;
        }
      },
      closePhone() {
        this.editPhoneKey = true;
      },
      //获取省份
      getProvince() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/provinceInfo.jhtml',
          data: {
            name: null
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.provinceList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取城市
      getCity(id) {
        let _vm = this;
        if(_vm.selectCKey) {
          _vm.cusInfoEditLeft.cityID = '';
          _vm.cusInfoEditLeft.districtId = '';
          _vm.districtList = [];
        }
        _vm.$http.get({
          url: 'guard-webManager/select/cityList.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.cityList = res.data.content || [];
              _vm.selectCKey = true;
              _vm.selectDKey = true;
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取区
      getDistrict(id) {
        if (typeof id === 'number') {
          let _vm = this;
          if(_vm.selectDKey) {
            _vm.cusInfoEditLeft.districtId = '';
          }
          _vm.$http.get({
            url: 'guard-webManager/select/districtList.jhtml',
            data: {
              id: id
            },
            success: function (res) {
              if (res.data.code === 0) {
                _vm.districtList = res.data.content || [];
                _vm.selectDKey = true;
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      //编辑左侧跟人信息
      editCusInfo() {
        this.$refs.cusInfoEditLeft.resetFields();
        this.cusInfoEditLeft = {...this.cusInfoLeft};
        this.selectDKey = false;
        this.selectCKey = false;
        this.cusInfoEditModal = true;
      },
      setBirthday(date) {
        this.cusInfoEditLeft.birthday = date;
      },
      okCusEdit() {
        let _vm = this;
        _vm.$refs.cusInfoEditLeft.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/updateEdit.jhtml',
              data: _vm.cusInfoEditLeft,
              success: function (res) {
                if (res.data.code === 0) {
                  sessionStorage.setItem('cusName', _vm.cusInfoEditLeft.name)
                  let _data = _vm.$store.getters.getBreadData;
                  _data[2].text = _vm.cusInfoEditLeft.name;
                  _vm.$store.dispatch('setBreadData', _data);
                  _vm.$store.dispatch('setCustomerDataName', _vm.cusInfoEditLeft.name);
                  document.title = _vm.cusInfoEditLeft.name;
                  _vm.getCusInfo(_vm.cusId);
                  _vm.cusInfoEditModal = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.cusInfoEditLoad = false;
                  _vm.$nextTick(() => {
                    _vm.cusInfoEditLoad = true;
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          } else {
            _vm.cusInfoEditLoad = false;
            _vm.$nextTick(() => {
              _vm.cusInfoEditLoad = true;
            });
          }
        });
      },
      //拨打电话
      callCus() {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('customerMsg.msg2')}</p>
                    <p>${_vm.$t('customerMsg.msg3')}</p>
                    <p>${_vm.$t('labelPublic.mc')} ${_vm.cusInfoLeft.name}</p>
                    <p>${_vm.$t('customerMsg.label4', [])} ${_vm.cusInfoLeft.mobile}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/callCenter/callBack.jhtml',
              data: {
                customerID: _vm.cusId
              },
              success: function (res) {
                if (res.data.code === 0) {
                  console.log(res)
                } else {
                  if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                }
              },
              error: function (res) {
                console.log(res)
              }
            });
          }
        });
      },
      //查看标签详情
      toTagView(type) {
        const text = type
          ? this.$t('customerMsg.tit1')
          : this.$t('customerMsg.tit2');
        const url = type
          ? '/tagInfo'
          : '/groupInfo';
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusInfoLeft.name
          },
          {
            url: url,
            text: text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push(url);
      },
      //编辑扩展自定义信息
      editCustom() {
        for(let i = 1; i <= 10; i++) {
          this.customEdit['custom' + i] = this.cusInfoRight['customCon' + i];
        }
        this.customEditModal = true;
      },
      okCustom() {
        let _vm = this;
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/updateCustomEdit.jhtml',
          data: {
            id: _vm.cusId,
            ..._vm.customEdit
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.getCusInfo(_vm.cusId);
              _vm.customEditModal = false;
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //有权限的编辑按钮
      editPower(key) {
        let _vm = this;
        const obj = _vm.powerList.find(item => item.key === key);
        const url = obj.editUrl;
        _vm.powerTit = obj.tit;
        _vm.powerLoad = true;
        _vm.$http.get({
          url: url,
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
            if (res.data.code === 0) {
              if (key === 6) {
                console.log(res)
                _vm.$refs.formMessage.resetFields();
                _vm.temNum = '';
                _vm.temContent = '';
                _vm.templateList = res.data.content || [];
                _vm.modalMessage = true;
              } else {
                _vm.$refs.formPower.resetFields();
                _vm.formPower = {
                  customerId: _vm.cusId,
                  channelId: _vm.cusInfoRight.channelId || '',
                  channelName: _vm.cusInfoRight.channelName,
                  symptomId: _vm.cusInfoRight.symptomId,
                  storeId: _vm.cusInfoRight.storeId || '',
                  storeName: _vm.cusInfoRight.storeName,
                  mobile: _vm.cusInfoLeft.mobile,
                  mobile2: _vm.cusInfoLeft.mobile2,
                  mobile3: _vm.cusInfoLeft.mobile3,
                  mobile4: _vm.cusInfoLeft.mobile4,
                  mobile5: _vm.cusInfoLeft.mobile5,
                };
                console.log(_vm.formPower)
                _vm.powerKey = key;
                _vm.modalPower = true;
              }
            } else {
              if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                _vm.$Notice.error({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: res.data.desc
                });
              } else {
                _vm.getLang.word(res.data.desc, (data) => {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: data[0].dst
                  });
                });
              }
              _vm.powerKey = key;
              _vm.powerLoad = false;
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      //渠道快捷搜索
      getStore() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalStoreList.jhtml',
          data: {
            name: ''
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.storeAllList = res.data.content.map(item => {
                return {
                  name: item.name,
                  pinYin: item.pinYin,
                  firstPinYin: item.firstPinYin,
                  id: item.id,
                  categoryName: item.categoryName,
                  linkman: item.linkman,
                  address: item.address
                };
              }) || [];
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changeWordStore(val) {
        this.storeAsyncKey = true;
        this.storeIndex++;
        const _index = this.storeIndex;
        setTimeout(() => {
          if(_index === this.storeIndex) {
            this.storeList = this.storeAllList.filter(item => {
              if(item.name.toLowerCase().includes(val.toLowerCase()) || item.pinYin.toLowerCase().includes(val.toLowerCase()) || item.firstPinYin.toLowerCase().includes(val.toLowerCase())) {
                return item;
              }
            });
            this.storeAsyncKey = false;
          }
        }, 200);
      },
      cleanStore() {
        this.formPower.storeId = '';
        this.formPower.storeName = '';
      },
      //渠道快捷搜索
      getChannel() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/channelAvailableInfo.jhtml',
          data: {
            name: ''
          },
          success: function (res) {
            if (res.data.code === 0) {
              const list = res.data.content.map(item => {
                return {
                  name: item.name,
                  pinYin: item.pinYin,
                  firstPinYin: item.firstPinYin,
                  id: item.id,
                  status: item.status
                };
              }) || [];
              _vm.channelAllList = list.filter(item => item.status === 1);
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changeWordChannel(val) {
        this.channelAsyncKey = true;
        this.channelIndex++;
        const _index = this.channelIndex;
        setTimeout(() => {
          if(_index === this.channelIndex) {
            this.channelList = this.channelAllList.filter(item => {
              if(item.name.toLowerCase().includes(val.toLowerCase()) || item.pinYin.toLowerCase().includes(val.toLowerCase()) || item.firstPinYin.toLowerCase().includes(val.toLowerCase())) {
                return item;
              }
            });
            this.channelAsyncKey = false;
          }
        }, 200);
      },
      cleanChannel() {
        this.formPower.channelName = '';
        this.formPower.channelId = '';
      },
      okPower() {
        let _vm = this;
        const url = _vm.powerList.find(item => item.key === _vm.powerKey).saveUrl;
        if(_vm.powerKey === 1 || _vm.powerKey === 3) {
          // if(_vm.formPower.channelId && _vm.formPower.storeId) {
          //   _vm.$Notice.error({
          //     title: _vm.$t('publicSet.noticeTit'),
          //     desc: '渠道与来源只能设置一个'
          //   });
          //   _vm.modalPower = false;
          //   _vm.powerKey = '';
          //   _vm.powerLoad = false;
          //   return;
          // }
          if(!_vm.formPower.channelId && !_vm.formPower.storeId) {
            _vm.$Notice.error({
              title: _vm.$t('publicSet.noticeTit'),
              desc: '渠道与来源至少设置一个'
            });
            _vm.modalPower = false;
            _vm.powerKey = '';
            _vm.powerLoad = false;
            return;
          }
        }
        _vm.$refs.formPower.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: url,
              data: _vm.formPower,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getCusInfo(_vm.cusId);
                  _vm.modalPower = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.powerLoad = false;
                  _vm.powerKey = '';
                } else {
                  if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.loadingPower = false;
                  _vm.$nextTick(() => {
                    _vm.loadingPower = true;
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loadingPower = false;
            _vm.$nextTick(() => {
              _vm.loadingPower = true;
            });
          }
        });
      },
      cancelPower() {
        console.log('oo')
        this.powerLoad = false;
        this.powerKey = '';
        this.modalPower = false;
      },
      // 发送短信
      setTem(id) {
        const _index = this.templateList.findIndex((item) => item.id == id);
        this.paramsList = [];
        for (let i = 1; i <= 8; i++) {
          this.formMessage['param' + i] = '';
        }
        if(id) {
          this.temContent = this.templateList[_index].content;
          this.temNum = this.templateList[_index].paramNum;
          for (let i = 1; i <= this.temNum; i++) {
            this.paramsList.push("${" + this.templateList[_index]['param' + i] + "}");
          }
        }
      },
      cancelMessage() {
        this.powerLoad = false;
      },
      okMessage() {
        let _vm = this;
        _vm.$refs.formMessage.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addSms.jhtml',
              data: _vm.formMessage,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.modalMessage = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
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
                      url: '/indexSms',
                      text: sessionStorage.getItem('cusName')
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexSms');
                } else {
                  if(_vm.langRouterKey !== 'customerIndex' && _vm.langRouterKey !== 'customerMsg') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                  _vm.loadingMessage = false;
                  _vm.$nextTick(() => {
                    _vm.loadingMessage = true;
                  })
                };
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loadingMessage = false;
            _vm.$nextTick(() => {
              _vm.loadingMessage = true;
            });
          }
        });
      },
    }
  };
</script>

<style scoped lang='less'>
  .customer-msg {
    padding-top: 15px;
    .container-right, 
    .container-left {
      padding: 30px;
      border: 1px solid #dedede;
      border-radius: 5px;
    }
    .line {
      border: 1px dashed #DEDEDE;
      margin: 20px 0;
    }
    h3 {
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      color: #181818;
    }
    .msg, 
    .label {
      font-size: 12px;
      line-height: 17px;
    }
    .label {
      color: #797979;
      margin-bottom: 4px;
      button {
        margin: 0 3px;
        color: #181818;
      }
    }
    .msg {
      color: #181818;
      word-break: break-all;
    }
    .tit {
      margin-top: 10px;
    }
    .container-left {
      margin-bottom: 20px;
      .edit {
        height: 17px;
        font-size: 12px;
        line-height: 17px;
        text-align: right;
        color: #181818;
        span {
          cursor: pointer;
        }
        i {
          padding-right: 5px;
        }
      }
      .cusImg {
        display: block;
        overflow: hidden;
        width: 90px;
        height: 90px;
        margin: 0 auto 20px;
        border-radius: 50%;
      }
      h2 {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #2A2A2A;
        span {
          margin-left: 10px;
          color: #797979;
        }
        .bind {
          color: #3399ff;
        }
      }
      .age {
        padding-bottom: 22px;
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        color: #2A2A2A;
        span {
          padding: 0 4px;
        }
      }
      .phone {
        display: inline-block;
        font-size: 12px;
        line-height: 17px;
        color: #181818;
        border-bottom: 1px dashed #181818;
      }
    }
    .container-right {
      .vip {
        display: block;
        width: 64px;
        height: 64px;
        margin-bottom: 4px;
      }
      .item {
        margin-bottom: 20px;
      }
      button {
        margin: 0 3px;
      }
      .label {
        span {
          color: #181818;
          padding-left: 15px;
        }
      }
      .msg {
        span {
          color: #797979;
          padding-right: 15px;
        }
      }
      .did {
        margin-bottom: 60px;
      }
    }
  }
</style>
