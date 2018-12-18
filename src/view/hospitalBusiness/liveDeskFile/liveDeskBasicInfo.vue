/** 
 * 添加咨询页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskBasicInfo.tit1')}}</h3>
      </div>
      <Row class='mes'>
        <Col :md="12" :lg="8" class='mes-item'>{{formShow.name}}</Col>
        <Col :md="12" :lg="8" class='mes-item'>
					<span>{{formShow.provinceName}}</span>
					<span>{{formShow.cityName}}</span>
					<span>{{formShow.districtName}}</span>
        </Col>
        <Col :md="12" :lg="8" class='mes-item'>
					<span>{{formShow.gender === 1 ? $t('publicSet.man') : $t('publicSet.woman')}}</span>
					<span v-if='formShow.Age'>{{formShow.Age}}{{$t('liveDesk.label1')}}</span>
					<span v-if='formShow.BirthDay'>{{$t('liveDeskBasicInfo.label1')}}{{formShow.BirthDay}}</span>
        </Col>
        <Col :md="24" :lg="12" class='mes-item'>{{$t('liveDeskBasicInfo.label2')}}
					<span v-if='formShow.mobile'>{{formShow.mobile}}</span>
					<span v-if='formShow.mobile2'>{{formShow.mobile2}}</span>
					<span v-if='formShow.mobile3'>{{formShow.mobile3}}</span>
					<span v-if='formShow.mobile4'>{{formShow.mobile4}}</span>
					<span v-if='formShow.mobile5'>{{formShow.mobile5}}</span>
        </Col>
        <Col :md="24" :lg="12" class='mes-item'>{{$t('liveDeskBasicInfo.label3')}}{{formShow.address}}</Col>
        <Col :md="24" :lg="24" class='mes-item'>{{$t('liveDeskBasicInfo.label4')}}{{formShow.remark}}</Col>
      </Row>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskBasicInfo.tit2')}}</h3>
      </div>
      <div class="crm">
        <span>{{$t('labelPublic.gkbh')}}{{formShow.id}}</span>
        <span>{{$t('liveDeskBasicInfo.label5')}}{{formShow.fn}}</span>
      </div>
      <div>
        <Tag color="blue" v-if="typeof formShow.firstVisitTime === 'string'">{{$t('liveDeskBasicInfo.tag1')}}</Tag>
        <Tag color="blue" v-else>{{$t('liveDeskBasicInfo.tag2')}}</Tag>
        <Tag color="blue" v-if="typeof formShow.firstDealTime === 'string'">{{$t('liveDeskBasicInfo.tag3')}}</Tag>
        <Tag color="blue" v-else>{{$t('liveDeskBasicInfo.tag4')}}</Tag>
        <Tag color="blue" v-if="formShow.complainNum > 0">{{$t('liveDeskBasicInfo.tag5')}}</Tag>
        <Tag color="blue" v-if="formShow.blackNum > 0">{{$t('liveDeskBasicInfo.tag6')}}</Tag>
        <Tag color="blue" v-if="formShow.weChat">{{$t('liveDeskBasicInfo.tag7')}}</Tag>
      </div>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskBasicInfo.tit3')}}
				</h3>
      </div>
      <Timeline>
        <Timeline-item v-for='(item, index) in data' :key='index'>
          <div class="anchor">
            <h2>{{item.type === 1 ? $t('liveDeskBasicInfo.label6') : item.type === 2 ? $t('liveDeskBasicInfo.label7') : $t('liveDeskBasicInfo.label8')}}</h2>
            <h4>{{item.createTime}}</h4>
            <p>{{$t('liveDeskBasicInfo.label10')}}{{item.content}}</p>
            <div>
              <span style='float:left'>{{item.symptom}}</span>
              <span style='float:right'>{{item.createUserName}}</span>
            </div>
          </div>
        </Timeline-item>
        <Timeline-item>{{$t('liveDeskBasicInfo.label9')}}</Timeline-item>
      </Timeline>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formShow: {},
        data: [],
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'liveDeskBasicInfo') {
          this.getList();
        }
      },
    },
    created() {
      console.log(123)
      if (sessionStorage.getItem('liveId')) {
        this.getList()
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log(321)
      if (sessionStorage.getItem('liveId')) {
        this.getList()
      }
      next()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/liveDesk/customerInfo.jhtml',
          data: {
            id: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            console.log(res)
            let obj = res.data.content.customer || {};
            obj.Age = res.data.content.Age || null
            obj.mobile = res.data.content.mobile || ''
            obj.mobile2 = res.data.content.mobile2 || ''
            obj.mobile3 = res.data.content.mobile3 || ''
            obj.mobile4 = res.data.content.mobile4 || ''
            obj.mobile5 = res.data.content.mobile5 || ''
            obj.BirthDay = res.data.content.BirthDay || null
            const _data = res.data.content.list || [];
            if(_vm.langRouterKey !== 'liveDeskBasicInfo') {
              _vm.data = _data;
              _vm.formShow = {...obj};
            } else {
              _vm.requestList([obj], ['provinceName', 'cityName', 'districtName', 'address', 'remark']).then(res => _vm.formShow = res[0]);
              _vm.requestList(_data, ['content', 'symptom']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
    }
  }

</script>

<style scoped>
  .mes .mes-item {
    font-size: 13px;
    min-height: 30px;
    margin-bottom: 15px;
  }

  .mes .mes-item span {
    margin-right: 15px;
  }

  .customer-item .crm span {
    font-size: 13px;
    margin-right: 50px;
  }

  .anchor h2 {
    font-weight: normal;
  }

  .anchor h4 {
    display: inline-block;
    font-weight: normal;
    height: 26px;
    line-height: 24px;
    margin: 10px 0;
    padding: 0 8px;
    border: 1px solid #e3e8ee;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 14px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
  }

  .anchor p {
    font-size: 13px;
    line-height: 20px;
    padding: 0 22px;
    min-height: 20px;
  }

  .anchor div {
    overflow: hidden;
    padding: 10px 22px 0;
    font-size: 13px;
  }

</style>
