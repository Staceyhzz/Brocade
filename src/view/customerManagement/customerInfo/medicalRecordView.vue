/** 
  * 查看电子病历页面 
  */

<template>
  <div class="container-box medPrint">
    <div class="container-header">
      <h2>{{name}}</h2>
    </div>
    <div class="container-body">
      <div class="medTitle">
        <p>{{$t('indexMedicalRecord.colTit1')}}：{{time}}</p>
        <p>{{$t('indexMedicalRecord.colTit2')}}：【{{hospName}}】 【{{createName}}】</p>
      </div>
      <p class="msg">{{$t('selectMedicalRecord.msg')}}</p>
      <table class="tableEdit">
        <tbody>
          <tr class="table-item" v-for='(item, index) in data' :key='index'>
            <td class="medItem">{{item.title}}</td>
            <td class="uedItem" v-html='item.content'>
              {{item.content}}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        hospName: '',
        createName: '',
        time: '',
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
        if(val === 'medicalRecordView') {
          this.getId();
        }
      },
    },
    created() {
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getMedicalRecordView.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
						const _obj = res.data.content.customerMedicalRecord || {};
            const _data = res.data.content.titleList.map(item => {
              const index = _obj.detailList.findIndex(m => m.medicalrecorddetailid === item.id);
              return {
                ...item,
                content: _obj.detailList[index].content
              };
            }) || [];
						_vm.name = _obj.medicalRecordName || '';
						_vm.hospName = _obj.createUserHospitalName || '';
						_vm.createName = _obj.createUserName || '';
            _vm.time = _obj.createtime || '';
            if(_vm.langRouterKey !== 'medicalRecordView') {
              _vm.data = _data;
            } else {
              const _list = _data.map(item => {
                item.content = item.content
                  ? item.content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, '')
                  : '';
                return item;
              });
              _vm.requestList(_list, ['title', 'content']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>

<style scoped>
  .medPrint .tableEdit thead th {
    height: 40px;
  }

  .medPrint .tableEdit th {
    border-right: 1px solid rgba(65, 65, 65, 0.3);
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
  }

  .medPrint .medItem {
    width: 20%;
    text-align: center;
  }

  .medPrint .uedItem {
    width: 80%;
  }

  .medPrint .medTitle {
    padding: 15px 15px;
    margin-bottom: 20px;
    box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
  }
  .medPrint .msg {
    margin-bottom: 20px;
  }

</style>
