<template>
  <transition name="fade">
    <div :class="['appointment-hover', typeClass]" :style="{top: topStyle}" v-show='key'>
      <ul>
        <li @click='toCus' class="cus">
          <span>{{$t('labelPublic.xm')}}</span>
          <p>{{data.customerName}} ({{data.customerID}})</p>
        </li>
        <li>
          <span>{{$t('appointmentHover.label1')}}</span>
          <p>{{data.customerMobile}}</p>
        </li>
        <li>
          <span>{{$t('labelPublic.zt')}}</span>
          <p class="status">{{typeText}}</p>
        </li>
        <li>
          <span>{{$t('appointmentHover.label2')}}</span>
          <p>{{appointmentType}}</p>
        </li>
        <li v-if="type === 'treat'">
          <span>{{$t('appointmentHover.label3')}}</span>
          <p>{{data.onlineType}}</p>
        </li>
        <li v-if="type === 'consult'">
          <span>{{$t('appointmentHover.label4')}}</span>
          <p>{{data.code}}</p>
        </li>
        <li>
          <span>{{$t('appointmentHover.label5')}}</span>
          <p>{{data.casesNo}}</p>
        </li>
        <li>
          <span>{{$t('appointmentHover.label6')}}</span>
          <p>{{data.appointmentStartTime}} - {{data.appointmentEndTime}}</p>
        </li>
        <li>
          <span>{{$t('appointmentHover.label7')}}</span>
          <p>{{data.userName}}</p>
        </li>
        <li v-if="type === 'surgery'">
          <span>{{$t('appointmentHover.label8')}}</span>
          <p>{{data.anesthesiatype === 1 ? $t('appointmentHover.label9') : $t('appointmentHover.label10')}}</p>
        </li>
        <li v-if="type !== 'consult'">
          <span>{{$t('appointmentHover.label11')}}</span>
          <p>
            <em v-for='item in chargeList' :key='item'>{{item}}</em>
          </p>
        </li>
        <li class="remark">
          <span>{{$t('labelPublic.ms')}}</span>
          <p>{{data.remark}}</p>
        </li>
      </ul>
      <div class="btn">
        <span @click='close'>{{$t('appointmentHover.btn')}}</span>
        <span class='edit' v-if="data.status !== -1 && type === 'treat' && data.status === 0 && !data.onlineKey" @click='toTreatEdit'>{{$t('publicSet.edit')}}</span>
        <span class='edit' v-if="type === 'surgery' && data.status === 0" @click='toSurgeryEdit'>{{$t('publicSet.edit')}}</span>
        <span class='edit' v-if="type === 'consult' && data.status === 0" @click='toConsultEdit'>{{$t('publicSet.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'appointmentHover',
    props: {
      data: Object,
      openKey: Boolean,
      type: String,
      way: String,
      topStyle: String
    },
    data () {
      return {
        key: false,
      }
    },
    watch: {
      openKey (val) {
        this.key = !this.key
      }
    },
    computed: {
      appointmentType () {
        if(this.type === 'treat') {
          return this.$t('appointmentToday.menu3')
        } else if(this.type === 'surgery') {
          return this.$t('appointmentToday.menu4')
        } else if(this.type === 'consult') {
          return this.$t('appointmentToday.menu2')
        }
      },
      typeClass () {
        if(this.data.status === -1) {
          return 'cancel'
        } else if(this.data.status === 1) {
          return 'yes'
        } else {
          return 'wait'
        }
      },
      typeText () {
        if(this.data.status === -1) {
          return '已取消'
        } else if(this.data.status === 1) {
          return this.$t('appointmentToday.btn2')
        } else {
          return this.$t('appointmentToday.btn3')
        }
      },
      otherTabUrl () {
        return this.$store.getters.getOpenOtherTabUrl
      },
      chargeList () {
        if(this.data.chargeText) {
          const list = this.data.chargeText.split(',') || [];
          return list;
        } else {
          return [];
        }
      },
    },
    methods: {
      close (e) {
        e.stopPropagation()
        this.$emit('closeHover')
      },
      toCus () {
        sessionStorage.setItem("cusNameBlank", this.data.customerName)
        sessionStorage.setItem("cusIdBlank", this.data.customerID)
        window.open(this.otherTabUrl)
      },
      toTreatEdit () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentTreat',
            text: 'appointmentToday.menu3'
          },
          {
            url: '/treatSchedulerUpdate',
            text: 'treatSchedulerAdd.tit2'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/treatSchedulerUpdate',
          query: {
            id: this.data.id,
            type: this.way,
          }
        })
      },
      toSurgeryEdit () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentSurgery',
            text: 'appointmentToday.menu4'
          },
          {
            url: '/appointmentSurgeryUpdate',
            text: 'treatSchedulerAdd.tit4'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/appointmentSurgeryUpdate',
          query: {
            id: this.data.id,
            type: this.way,
          }
        })
      },
      toConsultEdit () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentConsult',
            text: 'appointmentToday.menu2'
          },
          {
            url: '/appointmentConsultUpdate',
            text: 'appointmentConsultUpdate.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/appointmentConsultUpdate',
          query: {
            id: this.data.id,
            type: this.way,
          }
        })
      }
    }
  }

</script>

<style scoped lang='less'>
  .appointment-hover {
    position: absolute;
    overflow: hidden;
    left: ~'calc(100% + 10px)';
    width: 240px;
    padding: 12px 10px;
    background: #FFFFFF;
    box-shadow: 0 7px 14px 0 rgba(42,42,68,0.10);
    border-radius: 3px;
    z-index: 20;
  }
  .yes {
    border-top: 2px solid #4172F6;
  }
  .yes .cus p, 
  .yes .status {
    color: #4172F6;
  }
  .wait {
    border-top: 2px solid #FF6F76;
  }
  .wait .cus p, 
  .wait .status {
    color: #FF6F76;
  }
  .cancel {
    border-top: 2px solid #3D3D3D;
  }
  .cancel .cus p, 
  .cancel .status {
    color: #3D3D3D;
  }
  .appointment-hover li {
    overflow: hidden;
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.9);
  }
  .appointment-hover li span {
    display: inline-block;
    width: 50px;
    // height: 20px;
    line-height: 20px;
    margin-right: 15px;
    // text-align: justify;
    vertical-align: top;
    // -moz-text-align-last: justify;
    // -webkit-text-align-last: justify;
  }
  .appointment-hover li p {
    display: inline-block;
    width: 150px;
    line-height: 20px;
  }
  .appointment-hover li em {
    display: inline-block;
    vertical-align: middle;
    min-width: 64px;
    min-height: 22px;
    padding: 5px;
    margin: 0 5px 5px 0;
    font-size: 12px;
    font-style: normal;
    line-height: 1.2;
    text-align: center;
    color: #181818;
    background: rgba(169,169,169,0.50);
    border-radius: 2px;
  }
  .appointment-hover .remark p{
    max-height: 150px;
    overflow: auto;
  }
  .btn {
    padding-left: 70px;
  }
  .btn span {
    display: inline-block;
    width: 66px;
    height: 28px;
    font-size: 12px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  .btn .edit {
    margin-left: 10px;
  }
  .yes .btn span {
    border: 1px solid #4172F6;
    color: #4172F6;
  }
  .yes .btn .edit {
    color: #fff;
    background-color: #4172F6;
  }
  .wait .btn span {
    border: 1px solid #FF6F76;
    color: #FF6F76;
  }
  .wait .btn .edit {
    color: #fff;
    background-color: #FF6F76;
  }
  .cancel .btn span {
    border: 1px solid #3D3D3D;
    color: #3D3D3D;
  }
  .cancel .btn .edit {
    color: #fff;
    background-color: #3D3D3D;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .cus {
    cursor: pointer;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0){
    .appointment-hover li span:after{
      // content: ".";
      // display: inline-block;
      // width: 100%;
      // overflow: hidden;
      // height: 0;
    }
  }
</style>