/** 
 * 修改活动 
 */

<template>
  <div class="container-box activityEdit">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" :model="formValidate" ref='formValidate' :rules="ruleForm">
        <Form-item :label="$t('labelPublic.mc')" prop='name' required style="width: 600px">
          <Input type="text" :placeholder="$t('placeholderPublic.input')" v-model.trim="formValidate.name" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('activity.label')" prop='startTime' required>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 500px" @on-change='setTime' :value='dateBox'
            :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark" style="width: 600px">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('activityEdit.label')" prop='detailListStr' required>
          <Row>
            <Col span="20">
            	<Table stripe :columns="columns" :data="data"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
							<Button type="primary" icon="plus-round" @click="addCharge">{{$t('publicSet.add')}}</Button>
							<Button type="primary" icon="close" @click="clear">{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="button-box">
        <Button type="primary" icon="checkmark-round" :loading='saveLoad' @click="save" class="save-button">{{$t('publicSet.save')}}</Button>
        <Button type="warning" icon="reply" @click="back">{{$t('publicSet.back')}}</Button>
      </div>
      <cmptChargeChoose :placeHolder="$t('activityEdit.valid')" @on-change="chooseCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
    </div>
  </div>
</template>

<script>
	import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
		components: {cmptChargeChoose},
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        if (this.data.length === 0) {
          callback(new Error(this.$t('activityEdit.valid')));
        } else {
          callback();
        }
      }
      return {
				chargeOpenKey: false,
        titMsg: '',
        key: true,
        columns: [
					{
            title: this.$t('labelPublic.bh'),
            key: 'chargeid',
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'chargeName',
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: '150',
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
                      this.remove(params.index)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
        formValidate: {
          id: '',
          name: '',
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          remark: '',
          detailListStr: ''
        },
        ruleForm: {
          name: [{
            validator: validateName,
            trigger: 'change'
          }],
          detailListStr: [{
            validator: validateList,
            trigger: 'change'
          }],
        },
        saveLoad: false,
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      }
    },
    created() {
      this.formValidate.id = this.$route.query.id;
      if (this.$route.query.type === '1') {
        this.titMsg = this.$t('activity.tit2')
        this.getId()
      } else {
        this.titMsg = this.$t('activity.tit1')
        this.key = false
        this.$store.dispatch('setPageLoading', 1)
      }
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/activity/getDetail.jhtml',
          data: {
            id: _vm.formValidate.id
          },
          success: function (res) {
            const _obj = res.data.content || {};
            _vm.dateBox = [moment(_obj.starttime).format('YYYY-MM-DD'), moment(_obj.endtime).format('YYYY-MM-DD')]
            _vm.formValidate.startTime = moment(_obj.starttime).format('YYYY-MM-DD')
            _vm.formValidate.endTime = moment(_obj.endtime).format('YYYY-MM-DD')
            _vm.formValidate.name = _obj.name
            _vm.formValidate.remark = _obj.remark
            _vm.data = _obj.chargeDetailList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      addCharge() {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      clear() {
        this.data.splice(0);
      },
      chooseCharge(data) {
				const index = this.data.findIndex(item => item.chargeid === data.id);
				if(index < 0) {
					this.data.push({
						chargeid: data.id,
						chargeName: data.name
					});
					this.$refs.formValidate.validateField('detailListStr');
				}
      },
      remove(index) {
        this.data.splice(index, 1)
			},
			setTime(date) {
        this.formValidate.startTime = date[0]
        this.formValidate.endTime = date[1]
      },
      save() {
        let _vm = this,
          _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.key) {
              _url = 'guard-webManager/activity/update.jhtml'
            } else {
              _url = 'guard-webManager/activity/add.jhtml'
            }
            _vm.saveLoad = true
            _vm.formValidate.detailListStr = JSON.stringify(_vm.data)
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
									_vm.$router.push('/activity')
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res)
              }
            });
          }
        })

      },
      back() {
        this.$router.back(-1)
      },
    }
  }

</script>

<style>
  .activityEdit .radioModal .ivu-radio-wrapper {
    display: block;
  }

  .button-box {
    border-top: 1px solid #dedede;
    padding: 20px 0;
    text-align: center;
  }

  .button-box .save-button {
    margin-right: 20px;
  }

</style>
