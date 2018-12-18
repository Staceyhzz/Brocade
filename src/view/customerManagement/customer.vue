/** * 客户管理 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.customer')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>{{$t('publicSet.exportData')}}</li>
      </ul>
    </div>
    <div class="container-body customer">
      <form :action="exportURL" method="get" ref="formSubmit" v-show="false">
        <input :name="key" :value="value" v-for='(value, key) in formSearch' :key="key">
        <input name="adminToken" :value="adminToken">
      </form>
      <div class="tit">
				<h3>{{$t('customer.tit1')}}</h3>
        <div class="custom-search" v-clickoutside="closeSearch">
          <div class="btn" @click='toggleSearch'>
            <Icon type="android-more-horizontal"></Icon>
          </div>
          <div class="search-list" v-show='customSearchKey'>
            <h4>{{$t('customer.tit2')}}</h4>
            <div class="search-box">
              <Row type="flex" justify="start" :gutter="24">
                <Col span="8" v-for="(item, index) in customSearchList" :key="index">
                  <div :class="['search-item', item.key ? 'active' : '']" @click="changeSearchType(index)">
                    {{$t(item.lang)}}
                    <span v-show="item.key">
                      <Icon type="checkmark-round"></Icon>
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
			</div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' :rules="ruleForm">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('id')">
            <Form-item :label="$t('labelPublic.gkbh')" prop='id'>
              <Input v-model.trim="formSearch.id" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, 10, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('name')">
            <Form-item :label="$t('labelPublic.gkxm')" prop='name'>
              <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('mobile')">
            <Form-item :label="$t('customer.label1')" prop='mobile'>
              <Input v-model.trim="formSearch.mobile" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('fn')">
            <Form-item :label="$t('customer.label2')" prop='fn'>
              <Input v-model.trim="formSearch.fn" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('gender')">
            <Form-item :label="$t('labelPublic.xb')" prop='gender'>
              <Select v-model="formSearch.gender" clearable>
                <Option :value="1">{{$t('publicSet.man')}}</Option>
                <Option :value="2">{{$t('publicSet.woman')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('channelId')">
            <Form-item :label="$t('labelPublic.jtly')" prop='channelId'>
              <cmptRemoteFilterChannel :_placeHolder="$t('placeholderPublic.filter')" @setChannelName='setChannelName' ref='remoteChannel'></cmptRemoteFilterChannel>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('mainSymptomId')">
            <Form-item :label="$t('customer.label3')" prop='mainSymptomId'>
              <Select v-model="formSearch.mainSymptomId" clearable>
                <Option v-for="item in symptomList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('symptomId')">
            <Form-item :label="$t('customer.label4')" prop='symptomId'>
              <Select v-model="formSearch.symptomId" clearable>
                <Option v-for="item in symptomList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('memberCategoryId')">
            <Form-item :label="$t('labelPublic.hy')" prop='memberCategoryId'>
              <Select v-model="formSearch.memberCategoryId" clearable>
                <Option v-for="item in menberList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('exploitUserId')">
            <Form-item :label="$t('labelPublic.kfry')" prop='exploitUserId'>
              <cmptInputOpen :value='exploitUserName' :placeholder="$t('placeholderPublic.kfry')" @on-open='showUser(true)' @on-clear='clearUser(true)'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('managerUserId')">
            <Form-item :label="$t('labelPublic.zxry')" prop='managerUserId'>
              <cmptInputOpen :value='managerUserName' :placeholder="$t('placeholderPublic.zxry')"  @on-open='showUser(false)' @on-clear='clearUser(false)'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('firstVisitStart')">
            <Form-item :label="$t('customer.label5')" prop='firstDate'>
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" :options='options' @on-change='firstTime' ref='firstDate'
                style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('lastVisitStart')">
            <Form-item :label="$t('customer.label6')" prop='lastDate'>
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" :options='options' @on-change='lastTime' ref='lastDate'
                style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('createStart')">
            <Form-item :label="$t('customer.label7')" prop='createDate'>
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" :options='options' @on-change='createTime' ref='createDate'
                style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('lastConsultStart')">
            <Form-item :label="$t('customer.label8')" prop='consultDate'>
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" :options='options' @on-change='consultTime' ref='consultDate'
                style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('visitStatus')">
            <Form-item :label="$t('customer.label9')" prop='visitStatus'>
              <Select v-model="formSearch.visitStatus" clearable>
                <Option :value="1">{{$t('customer.label10')}}</Option>
                <Option :value="0">{{$t('customer.label11')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('dealStatus')">
            <Form-item :label="$t('customer.label12')" prop='dealStatus'>
              <Select v-model="formSearch.dealStatus" clearable>
                <Option :value="1">{{$t('customer.label13')}}</Option>
                <Option :value="0">{{$t('customer.label14')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('wechatStatus')">
            <Form-item :label="$t('customer.label15')" prop='wechatStatus'>
              <Select v-model="formSearch.wechatStatus" clearable>
                <Option :value="1">{{$t('customer.label16')}}</Option>
                <Option :value="0">{{$t('customer.label17')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('cashCardTotalStart')">
            <Form-item :label="$t('customer.label18')" prop='cashCardTotalStart'>
              <Input v-model.trim="formSearch.cashCardTotalStart" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('cashCardTotalEnd')">
            <Form-item :label="$t('customer.label30')" prop='cashCardTotalEnd'>
              <Input v-model.trim="formSearch.cashCardTotalEnd" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('customerGroupId')">
            <Form-item :label="$t('customer.label19')" prop='customerGroupId'>
              <Select v-model="formSearch.customerGroupId" clearable>
                <Option v-for="item in custGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('customerFilterId')">
            <Form-item :label="$t('customer.label20')" prop='customerFilterId'>
              <Select v-model="formSearch.customerFilterId" clearable>
                <Option v-for="item in custFilterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('tagId')">
            <Form-item :label="$t('customer.label21')" prop='tagId'>
              <cmptInputOpen :value='tagName' :placeholder="$t('customer.placeholder1')" @on-open='showTag' @on-clear='clearTag'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('storeId')">
            <Form-item :label="$t('labelPublic.jtqd')" prop='storeId'>
              <cmptRemoteFilterStore :_placeHolder="$t('placeholderPublic.filter')" @setStoreName="setStore" ref='remoteStore'></cmptRemoteFilterStore>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('appointmentStart')">
            <Form-item :label="$t('customer.label22')" prop='appointmentDate'>
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" @on-change='appointmentTime' ref='appointmentDate' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('customType')">
            <Form-item :label="$t('customer.label23')" prop='customType'>
              <Select v-model="formSearch.customType" clearable>
                <Option v-for="item in cusTypeList" :value="item.code" :key="item.id">{{ item.value }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('customType')">
            <Form-item :label="$t('customer.label24')" prop='customContent'>
              <Input v-model="formSearch.customContent" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)" @on-change='setCustomType'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('visitHospitalId')">
            <Form-item :label="$t('customer.label25')" prop='visitHospitalId'>
              <Select v-model="formSearch.visitHospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('appointmentHospitalId')">
            <Form-item :label="$t('customer.label26')" prop='appointmentHospitalId'>
              <Select v-model="formSearch.appointmentHospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-show="showSearchForm('distributionUserID')">
            <Form-item :label="$t('customer.label31')" prop='distributionUserID'>
              <input-remote
                :list='parentList' 
                :asyncKey='asyncKeyParent' 
                @on-change-word='changeParent'
                idProp='id' 
                nameProp='name' 
                :clearable='true'
                @on-clean='cleanParent'
                ref='parent'
                size='300px'
                v-model="formSearch.distributionUserID">
                <template slot="title">
                  <p style="width: 60%">{{$t('labelPublic.mc')}}</p>
                  <p style="width: 40%">手机号</p>
                </template>
                <template scope="label">
                  <p style="width: 60%">{{label.data.name}}</p>
                  <p style="width: 40%">{{label.data.mobile}}</p>
                </template>
              </input-remote>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList('1', '10', formSearch)">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <Table stripe :columns="tableCol" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <cmptCustomerTagChoose :openKey='tagKey' @on-change='changeTag' :activate='tagActivate'></cmptCustomerTagChoose>
    <cmptChooseUserSinger :placeHolder="userPlaceHolder" @setUserData="setUser" :openKey='userOpenKey' :activate='userActivate'></cmptChooseUserSinger>
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  import clickoutside from 'utils/clickoutside.js';
  import resizeCus from 'components/tableResizeCus.vue';
  import cmptCustomerTagChoose from 'components/customerTagChoose.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    name: 'view_customer',
    directives: {clickoutside},
    components: {
      cmptCustomerTagChoose,
      resizeTime,
      resizeCus,
      inputRemote
    },
    data() {
      const validateList = (rule, value, callback) => {
        if (this.formSearch.customContent !== '' && value === '') {
          callback(new Error(this.$t('customer.valid1')));
        } else {
          callback()
        }
      }
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error(this.$t('customer.valid2')));
        } else {
          callback()
        }
      }
      return {
        customSearchKey: false,
        customSearchList: [
          {
            id: 'id',
            lang: 'labelPublic.gkbh',
            key: true,
            name: '顾客编号'
          },
          {
            id: 'name',
            lang: 'labelPublic.gkxm',
            key: true,
            name: '顾客姓名'
          },
          {
            id: 'mobile',
            lang: 'customer.label1',
            key: false,
            name: '手机/电话'
          },
          {
            id: 'fn',
            lang: 'customer.label2',
            key: false,
            name: '档案号'
          },
          {
            id: 'gender',
            lang: 'labelPublic.xb',
            key: false,
            name: '性别'
          },
          {
            id: 'birthYear',
            lang: 'labelPublic.nl',
            key: false,
            name: '年龄'
          },
          {
            id: 'channelId',
            lang: 'labelPublic.jtly',
            key: true,
            name: '来源'
          },
          {
            id: 'mainSymptomId',
            lang: 'customer.label3',
            key: true,
            name: '主咨询项目'
          },
          {
            id: 'symptomId',
            lang: 'customer.label4',
            key: false,
            name: '咨询项目'
          },
          {
            id: 'memberCategoryId',
            lang: 'labelPublic.hy',
            key: false,
            name: '会员'
          },
          {
            id: 'exploitUserId',
            lang: 'labelPublic.kfry',
            key: true,
            name: '开发人员'
          },
          {
            id: 'managerUserId',
            lang: 'labelPublic.zxry',
            key: true,
            name: '咨询人员'
          },
          {
            id: 'firstVisitStart',
            lang: 'customer.label5',
            key: false,
            name: '初诊日期'
          },
          {
            id: 'firstVisitHospitalName',
            lang: 'customer.label27',
            key: false,
            name: '初诊医院'
          },
          {
            id: 'lastVisitStart',
            lang: 'customer.label6',
            key: false,
            name: '最后光临'
          },
          {
            id: 'createStart',
            lang: 'customer.label7',
            key: false,
            name: '登记日期'
          },
          {
            id: 'createUserHospitalName',
            lang: 'customer.label28',
            key: false,
            name: '登记医院'
          },
          {
            id: 'createUserName',
            lang: 'customer.label29',
            key: false,
            name: '登记人员'
          },
          {
            id: 'lastConsultStart',
            lang: 'customer.label8',
            key: false,
            name: '最后咨询'
          },
          {
            id: 'visitStatus',
            lang: 'customer.label9',
            key: true,
            name: '上门状态'
          },
          {
            id: 'dealStatus',
            lang: 'customer.label12',
            key: true,
            name: '成交状态'
          },
          {
            id: 'wechatStatus',
            lang: 'customer.label15',
            key: false,
            name: '微信状态'
          },
          {
            id: 'cashCardTotalStart',
            lang: 'customer.label18',
            key: false,
            name: '净收总额(min)'
          },
          {
            id: 'cashCardTotalEnd',
            lang: 'customer.label30',
            key: false,
            name: '净收总额(max)'
          },
          {
            id: 'customerGroupId',
            lang: 'customer.label19',
            key: false,
            name: '客户组'
          },
          {
            id: 'customerFilterId',
            lang: 'customer.label20',
            key: true,
            name: '结果集'
          },
          {
            id: 'tagId',
            lang: 'customer.label21',
            key: false,
            name: '标签'
          },
          {
            id: 'storeId',
            lang: 'labelPublic.jtqd',
            key: false,
            name: '推荐渠道'
          },
          {
            id: 'appointmentStart',
            lang: 'customer.label22',
            key: false,
            name: '预约日期'
          },
          {
            id: 'customType',
            lang: 'customer.label23',
            key: false,
            name: '自定义字段'
          },
          {
            id: 'visitHospitalId',
            lang: 'customer.label25',
            key: false,
            name: '到诊医院'
          },
          {
            id: 'appointmentHospitalId',
            lang: 'customer.label26',
            key: false,
            name: '预约医院'
          },
          {
            id: 'distributionUserID',
            lang: 'customer.label31',
            key: false,
            name: '分销渠道'
          }
        ],

        columns: [
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.gkxm'),
						width: 60,
            key: 'name',
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id,
                  idKey: false
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 50,
            key: 'gender',
            render: (h, params) => {
              const text = params.row.gender === 1 
                ? this.$t('publicSet.man') 
                : this.$t('publicSet.woman');
              return h('span', text)
            }
          },
          {
            title: this.$t('labelPublic.nl'),
            width: 50,
            key: 'birthYear',
            render: (h, params) => {
              if (Number.isFinite(params.row.birthYear) && params.row.birthYear) {
                const date = new Date();
                const year = date.getFullYear();
                return h('span', year - params.row.birthYear);
              }
            }
          },
          {
            title: this.$t('labelPublic.hy'),
            width: 60,
            key: 'memberCategoryId',
            render: (h, params) => {
              return h('span', params.row.memberCategoryName);
            }
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelId',
            render: (h, params) => {
              return h('span', params.row.channelName);
            }
          },
          {
            title: this.$t('customer.label4'),
            width: 60,
            key: 'symptomId',
            render: (h, params) => {
              return h('span', params.row.symptomName);
            }
          },
          {
            title: this.$t('labelPublic.kfry'),
            width: 60,
            key: 'exploitUserId',
            render: (h, params) => {
              return h('span', params.row.exploitUserName);
            }
          },
          {
            title: this.$t('labelPublic.zxry'),
            width: 60,
            key: 'managerUserId',
            render: (h, params) => {
              return h('span', params.row.managerUserName);
            }
          },
          {
            title: this.$t('customer.label9'),
            width: 50,
            key: 'visitStatus',
            render: (h, params) => {
              const color = params.row.firstVisitTime 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.firstVisitTime 
                ? this.$t('customer.label10')
                : this.$t('customer.label11');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('customer.label12'),
            width: 50,
            key: 'dealStatus',
            render: (h, params) => {
              const color = params.row.firstDealTime 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.firstDealTime 
                ? this.$t('customer.label13')
                : this.$t('customer.label14');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('customer.label5'),
            width: 80,
            key: 'firstVisitStart',
            render: (h, params) => {
              if (params.row.firstVisitTime) {
                return h('span', params.row.firstVisitTime.split(' ')[0]);
              }
            }
          },
          {
            title: this.$t('customer.label27'),
            width: 60,
            key: 'firstVisitHospitalName'
          },
          {
            title: this.$t('customer.label6'),
            width: 80,
            key: 'lastVisitStart',
            render: (h, params) => {
              if (params.row.lastVisitTime) {
                return h('span', params.row.lastVisitTime.split(' ')[0]);
              }
            }
          },
          {
            title: this.$t('customer.label22'),
            width: 80,
            key: 'appointmentStart',
            render: (h, params) => {
              if (params.row.appointmentDate) {
                return h('span', params.row.appointmentDate.split(' ')[0]);
              }
            }
          },
          {
            title: this.$t('customer.label26'),
            width: 60,
            key: 'appointmentHospitalId',
            render: (h, params) => {
              return h('span', params.row.appointmentHospitalName);
            }
          },
          {
            title: this.$t('customer.label7'),
            width: 80,
            key: 'createStart',
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
            title: this.$t('customer.label28'),
            width: 60,
            key: 'createUserHospitalName'
          },
          {
            title: this.$t('customer.label29'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('labelPublic.jtqd'),
            width: 60,
            key: 'storeId',
            render: (h, params) => {
              return h('span', params.row.storeName);
            }
          },
          {
            title: this.$t('customer.label31'),
            width: 60,
            key: 'distributionUserID',
            render: (h, params) => {
              return h('span', params.row.distributionUserName);
            }
          }
        ],
        data: [],
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        userActivate: false,
        userType: true,
        userOpenKey: false,
        exploitUserName: '',
        managerUserName: '',

        tagName: '',
        tagKey: false,
        tagActivate: false,

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

        formSearch: {
          id: '',
          name: '',
          mobile: '',
          fn: '',
          gender: '',
          channelId: '',
          mainSymptomId: '',
          symptomId: '',
          memberCategoryId: '',
          exploitUserId: '',
          managerUserId: '',
          firstVisitStart: '',
          firstVisitEnd: '',
          lastVisitStart: '',
          lastVisitEnd: '',
          createStart: '',
          createEnd: '',
          lastConsultStart: '',
          lastConsultEnd: '',
          visitStatus: '',
          dealStatus: '',
          wechatStatus: '',
          cashCardTotalStart: '',
          cashCardTotalEnd: '',
          customerGroupId: '',
          customerFilterId: '',
          tagId: '',
          storeId: '',
          appointmentStart: '',
          appointmentEnd: '',
          appointmentHospitalId: '',
          visitHospitalId: '',
          customType: '',
          customContent: '',
          distributionUserID: '',
        },
        ruleForm: {
          customType: [{
            validator: validateList,
            trigger: 'change'
          }],
          id: [{
            validator: validateId,
            trigger: 'blur'
          }],
        },

        custGroupList: [],
        custFilterList: [],
        cusTypeList: [],

        options: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },

        firstDate: [],
        lastDate: [],
        createDate: [],
        consultDate: [],
        appointmentDate: [],

        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
      }
    },
    computed: {
      exportURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/customerManagementDetails.jhtml'
      },
      symptomList() {
        return this.$store.getters.getSelectAllSymptomInfoList;
      },
      menberList() {
        return this.$store.getters.getSelectMemberList;
      },
      hospList() {
        return this.$store.getters.getSelectRealHospList;
      },
      userPlaceHolder() {
        return this.userType
          ? this.$t('placeholderPublic.kfry')
          : this.$t('placeholderPublic.zxry');
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
      tableCol() {
        const list = this.customSearchList.filter(item => item.key);
        let box = [];
        const first = {
          title: this.$t('labelPublic.xh'),
          width: 60,
          render: (h, params) => {
            const _index = (this.pageNumber - 1) * 10
            return h('span', params.index + 1 + _index)
          }
        }
        this.columns.forEach(item => {
          const index = list.findIndex(l => l.id === item.key);
          if(index >= 0) {
            box.push(item);
          }
        });
        return [first, ...box];
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'customer') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    activated() {
      console.log(111111111)
      if (typeof localStorage.getItem('customSearchList') === 'string') {
        const list = JSON.parse(localStorage.getItem('customSearchList'));
        list.map(item => {
          const index = this.customSearchList.findIndex(i => i.id === item.id);
          if(index >= 0 && item.key) {
            this.customSearchList[index].key = true;
          }
        });

      }
      this.getList(this.pageNumber, 10, this.formSearch);
      this.$store.dispatch('setSelectAllSymptomInfoList');
      this.$store.dispatch('setSelectMemberList');
      this.$store.dispatch('setSelectRealHospList');
      this.getCustGroupList(localStorage.getItem('userId'));
      this.getCustFilterList(localStorage.getItem('userId'))
      this.getCusType();
    },
    deactivated () {
      this.userActivate = !this.userActivate;
      this.tagActivate = !this.tagActivate;
    },
    methods: {
      toggleSearch() {
        this.customSearchKey = !this.customSearchKey;
      },
      closeSearch() {
        this.customSearchKey = false;
      },
      changeSearchType(index) {
        this.customSearchList[index].key = !this.customSearchList[index].key;
        if(!this.customSearchList[index].key) {
          if(this.formSearch[this.customSearchList[index].id]) {
            this.formSearch[this.customSearchList[index].id] = '';
          }
          if(this.customSearchList[index].id === 'firstVisitStart') {
            this.formSearch.firstVisitEnd = '';
          }
          if(this.customSearchList[index].id === 'lastVisitStart') {
            this.formSearch.lastVisitEnd = '';
          }
          if(this.customSearchList[index].id === 'createStart') {
            this.formSearch.createEnd = '';
          }
          if(this.customSearchList[index].id === 'lastConsultStart') {
            this.formSearch.lastConsultEnd = '';
          }
          if(this.customSearchList[index].id === 'appointmentStart') {
            this.formSearch.appointmentEnd = '';
          }
          if(this.customSearchList[index].id === 'customType') {
            this.formSearch.customContent = '';
          }
        }
        const str = JSON.stringify(this.customSearchList);
        localStorage.setItem('customSearchList', str);
      },
      showSearchForm(id) {
        const index = this.customSearchList.findIndex(item => item.id === id);
        if(index >= 0) {
          return this.customSearchList[index].key;
        } else {
          return false;
        }
      },
      //获取分页
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$store.dispatch('setPageLoading', -1);
            form['pageNumber'] = pageNumber
            form['pageSize'] = pageSize
            _vm.$http.getPage({
              url: 'guard-webManager/customer/list.jhtml',
              data: form,
              success: function (res) {
                _vm.total = res.data.content.total || 0;
                _vm.pageNumber = res.data.content.pageNumber || 1;
                _vm.totalPages = res.data.content.totalPages || 1;
                const _data = res.data.content.content || [];
                if(_vm.langRouterKey !== 'customer') {
                  _vm.data = _data;
                } else {
                  const list = ['memberCategoryName', 'channelName', 'symptomName', 'storeName']
                  _vm.requestList(_data, list).then(res => _vm.data = res);
                }
                _vm.$store.dispatch('setPageLoading', 1);
              },
              error: function (res) {
                console.log(res);
              }
            })
          }
        })
      },
      //获取自定义字段
      getCusType() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/customerCustomInfo.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.cusTypeList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setCustomType() {
        if (this.formSearch.customContent != '') {
          this.$refs.formSearch.validateField('customType')
        }
      },
      //获取客户组下拉列表
      getCustGroupList(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerGroupInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.custGroupList = res.data.content || [];
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
      getCustFilterList(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/userCustomerFilterInfo.jhtml',
          data: {
            userId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.custFilterList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //上级渠道商
      changeParent(val) {
        let _vm = this;
        _vm.asyncKeyParent = true;
        _vm.searchParentIndex++;
        const _index = _vm.searchParentIndex;
        _vm.$http.get({
          url: 'guard-webManager/distributionUser/finddistributionUserList.jhtml',
          data: {
            name: val
          },
          success: function(res){
            if(res.data.code === 0) {
              if(_index === _vm.searchParentIndex) {
                _vm.parentList = res.data.content.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    mobile: item.mobile
                  };
                }) || [];
                _vm.asyncKeyParent = false;
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      cleanParent() {
        this.formSearch.distributionUserID = '';
      },
      //获取弹窗用户选择列表
      showUser(type) {
        this.userType = type;
        this.userOpenKey = !this.userOpenKey;
      },
      setUser(data) {
        if(this.userType) {
          this.exploitUserName = data.name;
          this.formSearch.exploitUserId = data.id;
        } else {
          this.managerUserName = data.name;
          this.formSearch.managerUserId = data.id;
        }
      },
      clearUser(type) {
        if(this.userType) {
          this.exploitUserName = '';
          this.formSearch.exploitUserId = '';
        } else {
          this.managerUserName = '';
          this.formSearch.managerUserId = '';
        }
      },
      //渠道来源快捷搜索
      setStore(data) {
        this.formSearch.storeId = data.id;
      },
      setChannelName(data) {
        this.formSearch.channelId = data.id;
      },
      //获取弹窗标签选择列表
      showTag() {
        this.tagKey = !this.tagKey;
      },
      changeTag(data) {
        this.formSearch.tagId = data[0].id;
        this.tagName = data[0].name;
      },
      clearTag() {
        this.formSearch.tagId = '';
        this.tagName = '';
      },
      //初诊日期获取
      firstTime(date) {
        this.formSearch.firstVisitStart = date[0]
        this.formSearch.firstVisitEnd = date[1]
      },
      //最后光临日期获取
      lastTime(date) {
        this.formSearch.lastVisitStart = date[0]
        this.formSearch.lastVisitEnd = date[1]
      },
      //登记日期获取
      createTime(date) {
        this.formSearch.createStart = date[0]
        this.formSearch.createEnd = date[1]
      },
      //最后咨询日期获取
      consultTime(date) {
        this.formSearch.lastConsultStart = date[0]
        this.formSearch.lastConsultEnd = date[1]
      },
      //预约日期获取
      appointmentTime(date) {
        console.log('ddd')
        this.formSearch.appointmentStart = date[0]
        this.formSearch.appointmentEnd = date[1]
      },
      //分页
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      //重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.exploitUserName = '';
        this.managerUserName = '';
        this.tagName = '';
        this.$refs['firstDate'].handleClear();
        this.$refs['lastDate'].handleClear();
        this.$refs['createDate'].handleClear();
        this.$refs['consultDate'].handleClear();
        this.$refs['appointmentDate'].handleClear();
        this.$refs['remoteChannel'].clean();
        this.$refs['remoteStore'].clean();
        this.$refs.parent.clearQuery();
        this.getList('1', '10', this.formSearch);
      },
      toCusIndex(data) {
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
            url: '/customerIndex',
            text: data.name
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: data.id
          }
        });
        sessionStorage.setItem("cusName", data.name);
        sessionStorage.setItem("cusId", data.id);
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      }
    }
  }

</script>

<style scoped lang='less'>
  .customer {
    .tit {
			height: 42px;
			padding-bottom: 20px;
			h3 {
				float: left;
				font-size: 16px;
				font-weight: normal;
				line-height: 22px;
				color: #181818;
			}
			.custom-search {
        float: right;
        position: relative;
      }
      .btn {
				width: 22px;
				height: 22px;
				font-size: 22px;
				line-height: 22px;
				text-align: center;
				color: #181818;
				cursor: pointer;
      }
    }
    .search-list {
      position: absolute;
      top: 5px;
      right: 30px;
      width: 500px;
      padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      z-index: 940;
      h4 {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }
    .search-box {
      padding: 0 8px;
    }
    .search-item {
      position: relative;
      height: 100%;
      padding: 8px 30px 8px 15px;
      border-radius: 3px;
      cursor: pointer;
      &.active, 
      &:hover {
        background-color: rgba(65, 114, 246, 0.07);
      }
      span {
        position: absolute;
        top: 50%;
        right: 5px;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        line-height: 16px;
        color: #2a2a2a;
      }
    }
  }
</style>

