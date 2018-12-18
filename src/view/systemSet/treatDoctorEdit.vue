/** 
 * 批量添加设置页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('treatDoctor.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('treatDoctor.label1')" prop="userIds" required>
          <Row>
            <Col span="20">
            <Table stripe :columns="col" :data="formValidate.userIds"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
            <Button type="primary" icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
            <Button type="primary" icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
        <Form-item :label="$t('treatDoctor.label2')" required prop="startTime">
          <Time-picker :value='dateVal' format="HH:mm" type="timerange" placement="bottom-start" :placeholder="$t('treatDoctor.valid1')" @on-change='saveTime'></Time-picker>
        </Form-item>
        <Form-item :label="$t('treatDoctor.label3')" prop="num" required>
					<cmptInputNumber :max="1000000" :min="1" v-model="formValidate.num" @on-change='setNum' style='width: 187px'></cmptInputNumber>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
			<cmptChooseUserCheckBox :_placeHolder="$t('treatDoctor.valid2')" @ok="ok" :_modal='userOpenKey' :defaultUser='false'></cmptChooseUserCheckBox>
    </div>
  </div>
</template>

<script>
	import cmptChooseUserCheckBox from 'components/chooseUserCheckBox.vue';
  export default {
		components: {cmptChooseUserCheckBox},
    data() {
      const validateList = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error(this.$t('treatDoctor.valid2')));
        } else {
          callback();
        }
			};
			const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('treatDoctor.valid1')));
        } else {
          callback();
        }
      };
      return {
				userOpenKey: false,
        saveLoad: false,
        col: [
					{
            title: this.$t('labelPublic.zh'),
            key: 'account'
          },
          {
            title: this.$t('labelPublic.xm'),
            key: 'name'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            align: 'center',
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
        dateVal: [],
        formValidate: {
          num: 1,
          endTime: '',
          startTime: '',
          userIds: []
        },
        ruleForm: {
          userIds: [{
            validator: validateList,
            trigger: 'change'
					}],
					startTime: [{
            validator: validateTime,
            trigger: 'change'
					}]
        },
      }
    },
    created() {
      this.$store.dispatch('setPageLoading', 1);
    },
    methods: {
      add() {
        this.userOpenKey = !this.userOpenKey;
      },
      clean() {
        this.formValidate.userIds.splice(0);
      },
      remove(index) {
        this.formValidate.userIds.splice(index, 1);
      },
      saveTime(time) {
        this.formValidate.startTime = time[0];
        this.formValidate.endTime = time[1];
			},
			setNum (val) {
        this.$nextTick(() => {
          this.formValidate.num = parseInt(val);
        })
      },
      ok(data) {
				data.map(item => {
					const index = this.formValidate.userIds.findIndex(user => user.id === item.id);
					if(index < 0) {
						this.formValidate.userIds.push(item);
					}
				});
				this.$refs.formValidate.validateField('userIds');
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: '/guard-webManager/treatDoctor/batchAdd.jhtml',
              data: {
                userIds: _vm.formValidate.userIds.map(item => item.id).join(','),
                startTime: _vm.formValidate.startTime,
                endTime: _vm.formValidate.endTime,
                num: _vm.formValidate.num
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$router.push('/treatDoctor')
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
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
