/**
 * 系统设置
 */
<template>
  <div class="container-box option">
    <div class="container-header">
      <h2>{{$t('layoutNav.optionManage')}}</h2>
    </div>
    <div class="container-body">
      <table class="tableEdit">
        <tbody>
          <tr class="table-item">
            <td>{{$t('option.tit1')}}</td>
            <td>
              <table class="tableEdit">
                <tbody>
                  <tr>
                    <td>{{$t('option.label1', [1])}}</td>
                    <td v-if='langKey'>{{formShow.custom1}}</td>
                    <td v-else>{{formShowLang.custom1}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [2])}}</td>
                    <td v-if='langKey'>{{formShow.custom2}}</td>
                    <td v-else>{{formShowLang.custom2}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [3])}}</td>
                    <td v-if='langKey'>{{formShow.custom3}}</td>
                    <td v-else>{{formShowLang.custom3}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [4])}}</td>
                    <td v-if='langKey'>{{formShow.custom4}}</td>
                    <td v-else>{{formShowLang.custom4}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [5])}}</td>
                    <td v-if='langKey'>{{formShow.custom5}}</td>
                    <td v-else>{{formShowLang.custom5}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [6])}}</td>
                    <td v-if='langKey'>{{formShow.custom6}}</td>
                    <td v-else>{{formShowLang.custom6}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [7])}}</td>
                    <td v-if='langKey'>{{formShow.custom7}}</td>
                    <td v-else>{{formShowLang.custom7}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [8])}}</td>
                    <td v-if='langKey'>{{formShow.custom8}}</td>
                    <td v-else>{{formShowLang.custom8}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [9])}}</td>
                    <td v-if='langKey'>{{formShow.custom9}}</td>
                    <td v-else>{{formShowLang.custom9}}</td>
                  </tr>
                  <tr>
                    <td>{{$t('option.label1', [10])}}</td>
                    <td v-if='langKey'>{{formShow.custom10}}</td>
                    <td v-else>{{formShowLang.custom10}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(0)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit2')}}</td>
            <td v-if='langKey'>{{formShow.ConsultContentTemplate}}</td>
            <td v-else>{{formShowLang.ConsultContentTemplate}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(1)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit3')}}</td>
            <td>
              <p>{{$t('option.label3_1')}}{{formShow.AppointmentStart}} - {{formShow.AppointmentEnd}}</p>
              <p>{{$t('option.label3_2')}}{{formShow.AppointmentInterval}}</p>
              <p>{{$t('option.label3_3')}}{{formShow.appointmentMaxTime}}</p>
              <p>{{$t('option.label3_4')}}{{formShow.appointmentMinTime}}</p>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editApp(2)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit4')}}</td>
            <td>
              <p>{{$t('option.label3_1')}}{{formShow.surgeryStart}} - {{formShow.surgeryEnd}}</p>
              <p>{{$t('option.label3_2')}}{{formShow.surgeryInterval}}</p>
              <p>{{$t('option.label3_3')}}{{formShow.surgeryMaxTime}}</p>
              <p>{{$t('option.label3_4')}}{{formShow.surgeryMinTime}}</p>
            </td>
            <td class="action">
            <i-button type="primary" size="small" @click="editApp(3)">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit5')}}</td>
            <td>
              <p>{{$t('option.label3_1')}}{{formShow.consultStart}} - {{formShow.consultEnd}}</p>
              <p>{{$t('option.label3_2')}}{{formShow.consultInterval}}</p>
              <p>{{$t('option.label3_3')}}{{formShow.consultMaxTime}}</p>
              <p>{{$t('option.label3_4')}}{{formShow.consultMinTime}}</p>
            </td>
            <td class="action">
            <i-button type="primary" size="small" @click="editApp(4)">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit6')}}</td>
            <td>{{formShow.allowDebtText}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(5)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit7')}}</td>
            <td>{{formShow.PointPerYuan}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(6)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit8')}}</td>
            <td>{{formShow.ContactPrivacyText}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(7)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit9')}}</td>
            <td>{{$t('option.label9_1')}}{{formShow.RegisterText}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(8)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit10')}}</td>
            <td>
              <p>{{$t('option.label10_1')}}{{formShow.PromoterStatusText}}</p>
              <p>{{$t('option.label10_2')}}{{formShow.PromoterNotCustomerText}}</p>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(9)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit11')}}</td>
            <td>
              <p v-if='formShow.PromoteCouponStatus === 0'>{{$t('option.label11_1')}}{{$t('option.close')}}</p>
              <p v-if='formShow.PromoteCouponStatus === 1 && langKey'>{{$t('option.label11_2')}}{{formShow.PromoteCouponCategory}}</p>
              <p v-if='formShow.PromoteCouponStatus === 1 && !langKey'>{{$t('option.label11_2')}}{{formShowLang.PromoteCouponCategory}}</p>
              <p v-if='formShow.PromoteCouponStatus === 1'>{{$t('option.label11_3')}}{{formShow.PromoteCouponAmount}}</p>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(10)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit12')}}</td>
            <td>{{formShow.ValidDays}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(11)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit13')}}</td>
            <td>{{formShow.PromoteDiscount}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(12)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit14')}}</td>
            <td>
              <p>{{$t('option.label14_1')}}{{formShow.PromoteCommissionStatusText}}</p>
              <p>{{$t('option.label14_2')}}{{formShow.PromoteCommissionLevel}}</p>
              <p>{{$t('option.label14_3')}}{{formShow.PromoteCommissionRate}}</p>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(13)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit15')}}</td>
            <td>
              <table class="tableEdit">
                <thead>
                  <tr>
                    <th>{{$t('option.label15_1')}}</th>
                    <th>{{$t('option.label15_2')}})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='item in formShow.PromoteLevelList' :key='item.level'>
                    <td>{{item.level}}</td>
                    <td>{{item.rate}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editLevel(14)">
                <Icon type="edit"></Icon>{{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit16')}}</td>
            <td>{{formShow.OverMaxRate}}</td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(15)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
          <tr class="table-item">
            <td>{{$t('option.tit17')}}</td>
            <td>
              <p>{{$t('option.label17_1')}}{{formShow.serverOption}}</p>
              <p>{{$t('option.label17_2')}}{{formShow.keyOption}}</p>
              <p>{{$t('option.label17_3')}}**********</p>
            </td>
            <td class="action">
              <i-button type="primary" size="small" @click="editSimple(16)">
                <Icon type="edit"></Icon>
                {{$t('publicSet.edit')}}
              </i-button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        :title="$t('option.modalTit1')"
        v-model="modalEditSimple"
        :closable="false"
        @on-ok="okSimple"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formEditSimple" :model="formEditSimple" :rules="ruleForm" :label-width="120" label-position="right">
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [1])" prop='custom1'>
            <Input v-model.trim="formEditSimple.custom1" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [2])" prop='custom2'>
            <Input v-model.trim="formEditSimple.custom2" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [3])" prop='custom3'>
            <Input v-model.trim="formEditSimple.custom3" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [4])" prop='custom4'>
            <Input v-model.trim="formEditSimple.custom4" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [5])" prop='custom5'>
            <Input v-model.trim="formEditSimple.custom5" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [6])" prop='custom6'>
            <Input v-model.trim="formEditSimple.custom6" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [7])" prop='custom7'>
            <Input v-model.trim="formEditSimple.custom7" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [8])" prop='custom8'>
            <Input v-model.trim="formEditSimple.custom8" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [9])" prop='custom9'>
            <Input v-model.trim="formEditSimple.custom9" :maxlength='20'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 0" :label="$t('option.label1', [10])" prop='custom10'>
            <Input v-model.trim="formEditSimple.custom10" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('option.tit2')" prop='ConsultContentTemplate' v-if="simpleType === 1">
            <Input v-model.trim="formEditSimple.ConsultContentTemplate" type="textarea" :autosize="{minRows: 6}"></Input>
          </Form-item>
          <Form-item v-if="simpleType === 5" :label="$t('option.tit6')" prop='AllowDebt'>
            <Radio-group v-model="formEditSimple.AllowDebt">
              <Radio :label="1">{{$t('option.label6_1')}}</Radio>
              <Radio :label="0">{{$t('option.label6_2')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 6" :label="$t('option.label7')" prop='PointPerYuan' :label-width="200">
            <cmptInputNumber :min="0" :max='1000000' v-model="formEditSimple.PointPerYuan" @on-change='setPointPerYuan'></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 7" :label="$t('option.label8_1')" prop='ContactPrivacy'>
            <Radio-group v-model="formEditSimple.ContactPrivacy">
              <Radio :label="1">{{$t('option.label8_2')}}</Radio>
              <Radio :label="0">{{$t('option.label8_3')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 8" :label="$t('option.label9_1')" prop='RegisterEnable' required>
            <Radio-group v-model="formEditSimple.RegisterEnable">
              <Radio :label="1">{{$t('option.open')}}</Radio>
              <Radio :label="0">{{$t('option.close')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 8" :label="$t('option.label9_2')" prop='chargeId' required>
            <Input v-model="formEditSimple.chargeName" readonly icon="ios-search" :placeholder="$t('placeholderPublic.sfxm')" @on-focus='addCharge'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 9" :label="$t('option.label10_1')" :label-width="200" prop='PromoterStatus'>
            <Radio-group v-model="formEditSimple.PromoterStatus">
              <Radio :label="1">{{$t('option.open')}}</Radio>
              <Radio :label="0">{{$t('option.close')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 9" :label="$t('option.label10_2')" :label-width="200" prop='PromoterNotCustomer'>
            <Radio-group v-model="formEditSimple.PromoterNotCustomer">
              <Radio :label="1">{{$t('option.open')}}</Radio>
              <Radio :label="0">{{$t('option.close')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 10" :label="$t('option.label11_1')" prop='PromoteCouponStatus' required>
            <Radio-group v-model="formEditSimple.PromoteCouponStatus">
              <Radio :label="1">{{$t('option.open')}}</Radio>
              <Radio :label="0">{{$t('option.close')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 10" :label="$t('option.label11_2')" prop='couponCategoryId' required>
            <Input v-model="formEditSimple.couponCategoryName" readonly icon="ios-search" :placeholder="$t('option.placeholder11')" @on-focus='showCoupon'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 10" :label="$t('option.label11_3')" prop='couponAmount' required>
            <cmptInputNumber :min="0" :max='1000000' v-model="formEditSimple.couponAmount"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 11" :label="$t('option.label12')" prop='ValidDays'>
            <cmptInputNumber :min="0" :max='1000000' v-model="formEditSimple.ValidDays"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 12" :label="$t('option.label13')" prop='PromoteDiscount'>
            <cmptInputNumber :min="0" :max='100' v-model="formEditSimple.PromoteDiscount"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 13" :label="$t('option.label14_1')" prop='PromoteCommissionStatus'>
            <Radio-group v-model="formEditSimple.PromoteCommissionStatus">
              <Radio :label="1">{{$t('option.open')}}</Radio>
              <Radio :label="0">{{$t('option.close')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item v-if="simpleType === 13" :label="$t('option.label14_2')" prop='PromoteCommissionLevel'>
            <cmptInputNumber :min="0" :max='1000000' v-model="formEditSimple.PromoteCommissionLevel"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 13" :label="$t('option.label14_3')" prop='PromoteCommissionRate'>
            <cmptInputNumber :min="0" :max='1000000' v-model="formEditSimple.PromoteCommissionRate"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 15" :label="$t('option.label16')" prop='OverMaxRate'>
            <cmptInputNumber :min="0" :max='100' v-model="formEditSimple.OverMaxRate"></cmptInputNumber>
          </Form-item>
          <Form-item v-if="simpleType === 16" :label="$t('option.label17_1')" prop='serverOption' required>
            <Input v-model.trim="formEditSimple.serverOption" :maxlength='50'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 16" :label="$t('option.label17_2')" prop='keyOption' required>
            <Input v-model.trim="formEditSimple.keyOption" :maxlength='50'></Input>
          </Form-item>
          <Form-item v-if="simpleType === 16" :label="$t('option.label17_3')" prop='apiSecret' required>
            <Input v-model.trim="formEditSimple.apiSecret" :maxlength='50'></Input>
          </Form-item>
        </Form>
      </Modal>
      <Modal
          :title="$t('option.modalTit1')"
          v-model="modalAppointment"
          :closable="false"
          @on-ok="okApp"
          :loading="loading"
          class-name="vertical-center-modal">
          <Form ref="formAppointment" :model="formAppointment" :rules="ruleForm" :label-width="120" label-position="right">
            <Form-item :label="$t('option.label3_1')" required>
              <Time-picker :value='timeBox' format="HH:mm" type="timerange" placement="bottom-end" @on-change='setTime' :clearable='false'></Time-picker>
            </Form-item>
            <Form-item :label="$t('option.label3_2')" required prop='interval'>
              <cmptInputNumber :min="15" :max='1440' v-model="formAppointment.interval"></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('option.label3_3')" required prop='maxTime'>
              <cmptInputNumber :min="15" :max='1440' v-model="formAppointment.maxTime"></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('option.label3_4')" required prop='minTime'>
              <cmptInputNumber :min="15" :max='1440' v-model="formAppointment.minTime"></cmptInputNumber>
            </Form-item>
          </Form>
      </Modal>
      <cmptChargeChoose :placeHolder="$t('option.label9_2')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
      <Modal
        :title="$t('option.placeholder11')"
        v-model="modalCoupon"
        width='700'
        :closable="false"
        class-name="vertical-center-modal">
         <Table height="350" stripe :columns="colCoupon" :data="dataCoupon" @on-row-click='chooseCoupon'>
         </Table>
      </Modal>
      <Modal
          :title="$t('option.modalTit1')"
          v-model="modalLevel"
          :closable="false"
          @on-ok="okLevel"
          :loading="loading"
          class-name="vertical-center-modal">
          <Form ref="formLevel" :model="formLevel" :rules="ruleForm" :label-width="1" label-position="right">
          <Table stripe :columns="colLevel" :data="formLevel.PromoteLevelList"></Table>
          <Button type="primary" icon="plus-round" style='margin-top:10px;' @click='addLevel'>{{$t('publicSet.add')}}</Button>
          </Form>
      </Modal>
      <Modal
        :title="$t('option.modalTit15')"
        v-model="modalLevel2"
        :closable="false"
        @on-ok="saveLevel"
        class-name="vertical-center-modal">
          <Form ref="formLevel" :model="formLevel" :label-width="120" label-position="right">
            <Form-item :label="$t('option.label15_1')" prop='level'>
              <cmptInputNumber :min="1" :max='1000000' v-model="formLevel.level"></cmptInputNumber>
            </Form-item>
            <Form-item :label="$t('option.label15_2')" prop='rate'>
              <cmptInputNumber :min="0" :max='100' v-model="formLevel.rate"></cmptInputNumber>
            </Form-item>
          </Form>
      </Modal>
    </div>
  </div>
</template>
<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {cmptChargeChoose},
    data () {
      // const validateText = (rule, value, callback) => {
      //   console.log(value)
      //   if (value) {
      //     callback();
      //   } else {
      //     callback(new Error('请输入内容'));
      //   }
      // };
      const validateTime = (rule, value, callback) => {
        console.log(value)
        if (value < this.formAppointment.maxTime) {
          callback();
        } else {
          callback(new Error(this.$t('option.valid1')));
        }
      };
      const validateCharge = (rule, value, callback) => {
        console.log(value)
        if(this.formEditSimple.RegisterEnable === 0) {
          callback();
        }
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('option.valid2')));
        }
      };
      const validateCoupon = (rule, value, callback) => {
        console.log(value)
        if(this.formEditSimple.PromoteCouponStatus === 0) {
          callback();
        }
        if (value) {
          callback();
        } else {
          callback(new Error(this.$t('option.placeholder11')));
        }
      };
      return {
        loading: true,
        formShow: {},
        //翻译
        langKey: true,
        formShowLang: {},
        //简单编辑
        simpleType: null,
        modalEditSimple: false,
        formEditSimple: {},
        //预约编辑
        modalAppointment: false,
        formAppointment: {},
        timeBox: [],
        simpleUrl: [
          'guard-webManager/option/updateCustom.jhtml',
          'guard-webManager/option/updateConsultContentTemplate.jhtml',
          'guard-webManager/option/updateAppointmentTimeEdit.jhtml',
          'guard-webManager/option/updateSurgeryTimeEdit.jhtml',
          'guard-webManager/option/updateConsultTimeEdit.jhtml',
          'guard-webManager/option/updateAllowDebt.jhtml',
          'guard-webManager/option/updatePoint.jhtml',
          'guard-webManager/option/updateContactPrivacy.jhtml',
          'guard-webManager/option/updateRegisterEdit.jhtml',
          'guard-webManager/option/updatePromoterEdit.jhtml',
          'guard-webManager/option/updatePromoteCouponEdit.jhtml',
          'guard-webManager/option/updatePromoteValidDaysEdit.jhtml',
          'guard-webManager/option/updatePromoteDiscountEdit.jhtml',
          'guard-webManager/option/updatePromoteCommission.jhtml',
          'guard-webManager/option/updatePromoteLevelEdit.jhtml',
          'guard-webManager/option/updateOverMaxRateEdit.jhtml',
          'guard-webManager/option/updateSms.jhtml',
        ],
        //收费项目
        chargeOpenKey: false,
        //券
        modalCoupon: false,
        colCoupon: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('option.colTit11'),
            key: 'hospitalList',
            render: (h, params) => {
              const data = params.row.hospitalList.map(item => item.name) || [];
              return h('span', data.join('、'));
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark'
          }
        ],
        dataCoupon: [],
        //级别提点
        modalLevel: false,
        modalLevel2: false,
        formLevel: {},
        colLevel: [
          {
            title: this.$t('option.label15_1'),
            key: 'level'
          },
          {
            title: this.$t('option.label15_2'),
            key: 'rate'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.removeLevel(params.index)
                    }
                  }
                }, this.$t('publicSet.del'))
                ])
            }
          }
        ],
        //规则
        ruleForm: {
          minTime: [
            { validator: validateTime, trigger: 'change' }
          ],
          chargeId: [
            { validator: validateCharge, trigger: 'change' }
          ],
          couponCategoryId: [
            { validator: validateCoupon, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'option') {
          this.getList();
        }
      },
    },
    created () {
      this.getList();
    },
    mounted () {
      this.getCouponList();
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/option/list.jhtml',
          success: function(res){
            let obj = res.data.content || {};
            _vm.formShow = {
              custom1: obj.Custom1 || '',
              custom2: obj.Custom2 || '',
              custom3: obj.Custom3 || '',
              custom4: obj.Custom4 || '',
              custom5: obj.Custom5 || '',
              custom6: obj.Custom6 || '',
              custom7: obj.Custom7 || '',
              custom8: obj.Custom8 || '',
              custom9: obj.Custom9 || '',
              custom10: obj.Custom10 || '',
              ConsultContentTemplate: obj.ConsultContentTemplate || '',
              //治疗预约
              AppointmentStart: obj.AppointmentStart
                ? obj.AppointmentStart.split(' ')[1]
                : '09:00:00',
              AppointmentEnd: obj.AppointmentEnd
                ? obj.AppointmentEnd.split(' ')[1]
                : '21:00:00',
              AppointmentInterval: obj.AppointmentInterval * 1
                ? obj.AppointmentInterval * 1
                : 60,
              appointmentMaxTime: obj.appointmentMaxTime * 1
                ? obj.appointmentMaxTime * 1
                : 60,
              appointmentMinTime: obj.appointmentMinTime * 1
                ? obj.appointmentMinTime * 1
                : 15,
              //手术预约
              surgeryStart: obj.surgeryStart
                ? obj.surgeryStart.split(' ')[1]
                : '09:00:00',
              surgeryEnd: obj.surgeryEnd
                ? obj.surgeryEnd.split(' ')[1]
                : '21:00:00',
              surgeryInterval: obj.surgeryInterval * 1
                ? obj.surgeryInterval * 1
                : 60,
              surgeryMaxTime: obj.surgeryMaxTime * 1
                ? obj.surgeryMaxTime * 1
                : 60,
              surgeryMinTime: obj.surgeryMinTime * 1
                ? obj.surgeryMinTime * 1
                : 15,
              //咨询预约
              consultStart: obj.consultStart
                ? obj.consultStart.split(' ')[1]
                : '09:00:00',
              consultEnd: obj.consultEnd
                ? obj.consultEnd.split(' ')[1]
                : '21:00:00',
              consultInterval: obj.consultInterval * 1
                ? obj.consultInterval * 1
                : 60,
              consultMaxTime: obj.consultMaxTime * 1
                ? obj.consultMaxTime * 1
                : 60,
              consultMinTime: obj.consultMinTime * 1
                ? obj.consultMinTime * 1
                : 15,
              //允许欠款
              AllowDebt: obj.AllowDebt === '1'
                ? 1
                : 0,
              allowDebtText: obj.AllowDebt === '1'
                ? _vm.$t('option.label6_1')
                : _vm.$t('option.label6_2'),
              //积分比例
              PointPerYuan: Number.isFinite(obj.PointPerYuan * 1)
                ? (obj.PointPerYuan * 1).toFixed(2) * 1
                : 0,
              //隐私保护
              ContactPrivacy: obj.ContactPrivacy === '1'
                ? 1
                : 0,
              ContactPrivacyText: obj.ContactPrivacy === '1'
                ? _vm.$t('option.label8_2')
                : _vm.$t('option.label8_3'),
              //挂号
              RegisterEnable: obj.RegisterEnable === '1'
                ? 1
                : 0,
              RegisterText: obj.RegisterEnable === '1'
                ? _vm.$t('option.open')
                : _vm.$t('option.close'),
              //推荐人注册
              PromoterStatus: obj.PromoterStatus === '1'
                ? 1
                : 0,
              PromoterStatusText: obj.PromoterStatus === '1'
                ? _vm.$t('option.open')
                : _vm.$t('option.close'),
              PromoterNotCustomer: obj.PromoterNotCustomer === '1'
                ? 1
                : 0,
              PromoterNotCustomerText: obj.PromoterNotCustomer === '1'
                ? _vm.$t('option.open')
                : _vm.$t('option.close'),
              //被推荐用户送券
              PromoteCouponStatus: obj.PromoteCouponStatus === '1'
                ? 1
                : 0,
              PromoteCouponAmount: obj.PromoteCouponAmount || '',
              PromoteCouponCategory: obj.PromoteCouponCategory || '',
              //推荐时限
              ValidDays: obj.ValidDays
                ? obj.ValidDays * 1
                : 0,
              //不提点折扣小于
              PromoteDiscount: obj.PromoteDiscount
                ? parseFloat((obj.PromoteDiscount * 100).toFixed(2))
                : 0,
              //提出佣金
              PromoteCommissionLevel: obj.PromoteCommissionLevel
                ? obj.PromoteCommissionLevel * 1
                : 0,
              PromoteCommissionRate: obj.PromoteCommissionRate
                ? obj.PromoteCommissionRate * 1
                : 0,
              PromoteCommissionStatus: obj.PromoteCommissionStatus === '1'
                ? 1
                : 0,
              PromoteCommissionStatusText: obj.PromoteCommissionStatus === '1'
                ? _vm.$t('option.open')
                : _vm.$t('option.close'),
              //级别提点
              PromoteLevelList: obj.PromoteLevelList.map(item => {
                item.rate = parseFloat((item.rate * 100).toFixed(2));
                return item;
              }) || [],
              //超出最大提成
              OverMaxRate: obj.OverMaxRate
                ? obj.OverMaxRate * 1
                : 0,
              //短信
              keyOption: obj.keyOption || '',
              serverOption: obj.serverOption || ''
            };
            if(_vm.langRouterKey === 'option') {
              _vm.formShowLang = {
                custom1: _vm.formShow.custom1,
                custom2: _vm.formShow.custom2,
                custom3: _vm.formShow.custom3,
                custom4: _vm.formShow.custom4,
                custom5: _vm.formShow.custom5,
                custom6: _vm.formShow.custom6,
                custom7: _vm.formShow.custom7,
                custom8: _vm.formShow.custom8,
                custom9: _vm.formShow.custom9,
                custom10: _vm.formShow.custom10,
                ConsultContentTemplate: _vm.formShow.ConsultContentTemplate,
                PromoteCouponCategory: _vm.formShow.PromoteCouponCategory
              };
              const props = Object.keys(_vm.formShowLang);
              _vm.requestList([_vm.formShowLang], props).then(res => _vm.formShowLang = res[0]);
              _vm.langKey = false;
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setTime (date) {
        if(this.simpleType === 2) {
          this.formAppointment.hour = date[0].split(':')[0];
          this.formAppointment.minute = date[0].split(':')[1];
          this.formAppointment.hour2 = date[1].split(':')[0];
          this.formAppointment.minute2 = date[1].split(':')[1];
        } else {
          this.formAppointment.startTime = date[0] + ':00';
          this.formAppointment.endTime = date[1] + ':00';
        }
      },
      editSimple (type) {
        console.log(this.formEditSimple)
        this.simpleType = type;
        this.$refs.formEditSimple.resetFields();
        switch (type) {
          case 0:
            const {custom1, custom2, custom3, custom4, custom5, custom6, custom7, custom8, custom9, custom10} = this.formShow;
            this.formEditSimple = {custom1, custom2, custom3, custom4, custom5, custom6, custom7, custom8, custom9, custom10};
            break;
          case 1:
            this.formEditSimple = {
              ConsultContentTemplate: this.formShow.ConsultContentTemplate
            };
            break;
          case 5:
            this.formEditSimple = {
              AllowDebt: this.formShow.AllowDebt
            };
            break;
          case 6:
            this.formEditSimple = {
              PointPerYuan: this.formShow.PointPerYuan
            };
            break;
          case 7:
            this.formEditSimple = {
              ContactPrivacy: this.formShow.ContactPrivacy
            };
            break;
          case 8:
            this.formEditSimple = {
              RegisterEnable: this.formShow.RegisterEnable,
              chargeId: '',
              chargeName: ''
            };
            this.getRegister();
            break;
          case 9:
            this.formEditSimple = {
              PromoterStatus: this.formShow.PromoterStatus,
              PromoterNotCustomer: this.formShow.PromoterNotCustomer
            };
            break;
          case 10:
            this.formEditSimple = {
              PromoteCouponStatus: this.formShow.PromoteCouponStatus,
              couponCategoryId: '',
              couponCategoryName: '',
              couponAmount: 0
            };
            this.getCouponMes();
            break;
          case 11:
            this.formEditSimple = {
              ValidDays: this.formShow.ValidDays
            };
            break;
          case 12:
            this.formEditSimple = {
              PromoteDiscount: this.formShow.PromoteDiscount
            };
            break;
          case 13:
            this.formEditSimple = {
              PromoteCommissionLevel: this.formShow.PromoteCommissionLevel,
              PromoteCommissionRate: this.formShow.PromoteCommissionRate,
              PromoteCommissionStatus: this.formShow.PromoteCommissionStatus
            };
            break;
          case 15:
            this.formEditSimple = {
              OverMaxRate: this.formShow.OverMaxRate
            };
            break;
          case 16:
            this.formEditSimple = {
              serverOption: this.formShow.serverOption,
              keyOption: this.formShow.keyOption,
              apiSecret: ''
            };
            break;
        };
        this.modalEditSimple = true;
      },
      editApp (type) {
        this.simpleType = type;
        this.$refs.formAppointment.resetFields();
        switch (type) {
          case 2:
            this.formAppointment = {
              hour: this.formShow.AppointmentStart.split(':')[0],
              minute: this.formShow.AppointmentStart.split(':')[1],
              hour2: this.formShow.AppointmentEnd.split(':')[0],
              minute2: this.formShow.AppointmentEnd.split(':')[1],
              interval: this.formShow.AppointmentInterval,
              maxTime: this.formShow.appointmentMaxTime,
              minTime: this.formShow.appointmentMinTime
            };
            this.timeBox = [this.formShow.AppointmentStart, this.formShow.AppointmentEnd];
            break;
          case 3:
            this.formAppointment = {
              startTime: this.formShow.surgeryStart,
              endTime: this.formShow.surgeryEnd,
              interval: this.formShow.surgeryInterval,
              maxTime: this.formShow.surgeryMaxTime,
              minTime: this.formShow.surgeryMinTime
            };
            this.timeBox = [this.formShow.surgeryStart, this.formShow.surgeryEnd];
            break;
          case 4:
            this.formAppointment = {
              startTime: this.formShow.consultStart,
              endTime: this.formShow.consultEnd,
              interval: this.formShow.consultInterval,
              maxTime: this.formShow.consultMaxTime,
              minTime: this.formShow.consultMinTime
            };
            this.timeBox = [this.formShow.consultStart, this.formShow.consultEnd];
            break;
        };
        this.modalAppointment = true;
      },
      setPointPerYuan(val) {
        this.$nextTick(() => {
          this.formEditSimple.PointPerYuan = parseFloat((val).toFixed(2));
        });
      },
      okSimple () {
        let _vm = this;
        let _data = {};
        let _url = _vm.simpleUrl[_vm.simpleType];
        _vm.$refs.formEditSimple.validate((valid) => {
          if (valid) {
            switch (_vm.simpleType) {
              case 0:
                _data = _vm.formEditSimple;
                break;
              case 1: 
                _data = {
                  content: _vm.formEditSimple.ConsultContentTemplate
                };
                break;
              case 5:
                _data = {
                  type: _vm.formEditSimple.AllowDebt
                };
                break;
              case 6:
                _data = {
                  amount: _vm.formEditSimple.PointPerYuan
                };
                break;
              case 7:
                _data = {
                  type: _vm.formEditSimple.ContactPrivacy
                };
                break;
              case 8:
                _data = {
                  status: _vm.formEditSimple.RegisterEnable,
                  chargeId: _vm.formEditSimple.chargeId
                };
                break;
              case 9:
                _data = {
                  promoterOpen: _vm.formEditSimple.PromoterStatus,
                  promoterNotCustomer: _vm.formEditSimple.PromoterNotCustomer
                };
                break;
              case 10:
                _data = {
                  promoteGiveCoupon: _vm.formEditSimple.PromoteCouponStatus,
                  couponCategoryId: _vm.formEditSimple.couponCategoryId,
                  amount: _vm.formEditSimple.couponAmount
                };
                break;
              case 11:
                _data = {
                  days: _vm.formEditSimple.ValidDays
                };
                break;
              case 12:
                _data = {
                  amount: (_vm.formEditSimple.PromoteDiscount / 100).toFixed(2)
                };
                break;
              case 13:
                _data = {
                  promoteCommissionOpen: _vm.formEditSimple.PromoteCommissionStatus,
                  level: _vm.formEditSimple.PromoteCommissionLevel,
                  rate: _vm.formEditSimple.PromoteCommissionRate
                };
                break;
              case 15:
                _data = {
                  amount: _vm.formEditSimple.OverMaxRate
                };
                break;
              case 16:
                _data = {
                  apiSecret: _vm.formEditSimple.apiSecret,
                  apiID: _vm.formEditSimple.keyOption,
                  serverUrl: _vm.formEditSimple.serverOption
                };
                break;
            }
            _vm.$http.post({
              url: _url,
              data: _data,
              success: function(res){
                if(res.data.code === 0){
                  _vm.getList()
                  _vm.modalEditSimple = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'option') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
      okApp () {
        let _vm = this;
        let _url = _vm.simpleUrl[_vm.simpleType];
        _vm.$refs.formAppointment.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: _url,
              data: _vm.formAppointment,
              success: function(res){
                if(res.data.code === 0){
                  _vm.getList()
                  _vm.modalAppointment = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'option') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
      getRegister () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/option/updateRegister.jhtml',
          success: function(res){
            if(res.data.code === 0 ) {
              if(res.data.content.Status === '1') {
                _vm.formEditSimple.chargeId = res.data.content.ChargeID || '';
                _vm.formEditSimple.chargeName = res.data.content.ChargeName || '';
              } else {
                _vm.formEditSimple.chargeId = '';
                _vm.formEditSimple.chargeName = '';
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      addCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      chooseCharge (data) {
        this.formEditSimple.chargeName = data.name;
        this.formEditSimple.chargeId = data.id;
      },
      getCouponList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/couponCategoryList.jhtml',
          success: function(res){
            if(res.data.code === 0 ){
              _vm.dataCoupon = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getCouponMes () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/option/updatePromoteCoupon.jhtml',
          success: function(res){
            if(res.data.code === 0 ){
              if(res.data.content.PromoteGiveCoupon === '1') {
                _vm.formEditSimple.couponCategoryId = res.data.content.PromoteCouponCategory || '';
                _vm.formEditSimple.couponCategoryName = res.data.content.PromoteCouponCategoryName || '';
                _vm.formEditSimple.couponAmount = res.data.content.PromoteCouponAmount * 1 || 0;
              } else {
                _vm.formEditSimple.couponCategoryId = '';
                _vm.formEditSimple.couponCategoryName = '';
                _vm.formEditSimple.couponAmount = 0;
              }
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      showCoupon () {
        this.modalCoupon = true;
      },
      chooseCoupon (data) {
        this.formEditSimple.couponCategoryName = data.name;
        this.formEditSimple.couponCategoryId = data.id;
        this.modalCoupon = false;
      },
      editLevel (type) {
        this.simpleType = type;
        this.formLevel = {
          level: 1,
          rate: 0,
          PromoteLevelList: [...this.formShow.PromoteLevelList]
        };
        this.modalLevel = true;
      },
      addLevel () {
        this.formLevel.level = 1;
        this.formLevel.rate = 0;
        this.modalLevel2 = true;
      },
      removeLevel (index) {
        this.formLevel.PromoteLevelList.splice(index, 1);
      },
      saveLevel () {
        this.formLevel.PromoteLevelList.push({
          level: this.formLevel.level,
          rate: this.formLevel.rate
        });
      },
      okLevel () {
        let _vm = this;
        let _url = _vm.simpleUrl[_vm.simpleType];
        _vm.$refs.formLevel.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: _url,
              data: {
                detailListStr: JSON.stringify(_vm.formLevel.PromoteLevelList.map(item => {
                      return {
                        level: item.level,
                        rate: item.rate / 100
                      }
                    }))
              },
              success: function(res){
                if(res.data.code === 0){
                  _vm.getList()
                  _vm.modalLevel = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'option') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
    }
  }
</script>
<style scoped>
  .option .table-item td:first-child {
    background: rgba(73,133,243,0.05);
    width: 200px;
  }
  .option .table-item .action {
    width: 100px;
    text-align: center;
  }
  .option .tableEdit th {
    border-right: 1px solid rgba(65, 65, 65, 0.3); 
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
  }
</style>






