/** 
 * 添加电子病历页面 
 */

<template>
  <div class="container-box medPrint">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerMedicalRecord')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item :label="$t('medicalRecordAdd.label1')">
          <span>{{name}}</span>
        </Form-item>
        <Form-item :label="$t('medicalRecordAdd.label2')" prop="no">
          <Input v-model.trim="formValidate.no" :placeholder="$t('placeholderPublic.input')" style='width: 300px' :maxlength='20'></Input>
          <span class='mes'>{{$t('medicalRecordAdd.label3')}}</span>
        </Form-item>
        <Form-item :label="$t('medicalRecordAdd.label4')" prop="location">
          <Input v-model.trim="formValidate.location" :placeholder="$t('placeholderPublic.input')" style='width: 300px' :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
        </Form-item>
      </Form>
      <table class="tableEdit">
        <thead>
          <tr>
            <th>{{$t('medicalRecordAdd.label5')}}</th>
            <th>{{$t('medicalRecordAdd.label6')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-item" v-for='(item, index) in data' :key='index'>
            <td class="medItem">{{item.title}}</td>
            <td v-if='item.type === 1' class="uedItem">
              <Input v-model="data[index].content" :placeholder="$t('placeholderPublic.input')"></Input>
            </td>
            <td v-else class="uedItem">
              <cmptUeditor :value='item.content' :index='index' @setUedContent='setContent'></cmptUeditor>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        saveLoad: false,
        cusName: '',
        name: '',
        data: [],
        formValidate: {
          customerId: '',
          medicalRecordId: '',
          no: '',
          location: '',
          remark: '',
          detailListStr: '',
        },
      }
    },
    created() {
      this.formValidate.medicalRecordId = this.$route.query.id;
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      setContent(data, index) {
        this.data[index].content = data;
      },
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/medicalRecordAdd.jhtml',
          data: _vm.formValidate,
          success: function (res) {
						_vm.name = res.data.content.MedicalRecord.name || '';
						_vm.data = res.data.content.TitleList || [];
						_vm.formValidate.no = res.data.content.no || '';
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      save() {
        let _vm = this;
        _vm.saveLoad = true;
        const list = _vm.data.map(item => {
          return {
            medicalRecordDetailId: item.id,
            content: item.content
          };
        });
        _vm.formValidate.detailListStr = JSON.stringify(list);
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/addMedicalRecord.jhtml',
          data: _vm.formValidate,
          success: function (res) {
            if (res.data.code === 0) {
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
                  url: '/indexMedicalRecord',
                  text: _vm.cusName
                }
              ];
              _vm.$store.dispatch('setBreadData', breadData);
              _vm.$router.push('/indexMedicalRecord');
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.content
              });
            } else {
              _vm.saveLoad = false;
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
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

</style>
