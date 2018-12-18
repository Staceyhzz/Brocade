/** 
 * 查看问卷页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{name}}</h2>
    </div>
    <div class="container-body">
      <div v-for='(item, index) in data' :key='index' class="survey-box">
        <div class="survey-item">{{index + 1}}、{{titleText(item.type)}}</div>
        <div v-html='item.content' class="survey-item">{{item.content}}</div>
        <div v-if='item.type !== 3' class="survey-item">
          <p v-for='(item1, index1) in item.list' :key="index1">
            {{$t('surveyAdd.label8', [item1.id])}}{{item1.name}}
          </p>
        </div>
        <div class="survey-item result">{{$t('surveyView.label')}}{{item.answer}}</div>
      </div>
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
        cusName: '',
        name: '',
        data: [],
      }
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.getId()
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getSurveyView.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const _obj = res.data.content.customerSurvey || {};
            const _data = res.data.content.titleList.map(item => {
              const index = _obj.DetailList.findIndex(l => l.titleid === item.id);
              let list = [];
              for(let i = 1; i < 7; i++) {
                if(typeof item['option' + i] === 'string' && item['option' + i]) {
                  list.push({
                    id: String.fromCharCode(64 + i),
                    name: item['option' + i]
                  })
                }
              }
              return {
                ...item,
                list: list,
                answer: _obj.DetailList[index].answer
              }
            }) || [];
						_vm.name = _obj.surveyName;
						_vm.data = _data;
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      titleText(val) {
        if(val === 1) {
          return this.$t('surveyAdd.label5');
        } else if(val === 2) {
          return this.$t('surveyAdd.label6');
        } else {
          return this.$t('surveyAdd.label7');
        }
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>

<style scoped>
  .container-body .survey-box {
    padding: 15px 15px;
    box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
  }

  .container-body .survey-item {
    padding: 3px 0;
    font-size: 13px;
  }

  .container-body .survey-item.result {
    color: #f2784b;
  }

</style>
