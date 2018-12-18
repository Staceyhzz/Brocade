/** 
 * 项目赔款表格扩展组件 
 */
<template>
  <Table stripe :columns="col" :data="rowData"></Table>
</template>
<script>
  export default {
    props: {
      rowData: Array,
    },
    data() {
      return {
        col: [
					{
            title: this.$t('backOperationOrderAdd.colTit9'),
            key: 'createTime',
          },
          {
            title: this.$t('backOperationOrderAdd.colTit10'),
            key: 'createUserName',
          },
          {
            title: this.$t('backOperationOrderAdd.colTit11'),
            key: 'num',
          },
          {
            title: this.$t('backOperationOrderAdd.colTit12'),
            render: (h, params) => {
              return h('ul', params.row.operatorList.map(item => {
								const _text = !item.positionName
								 ? `【${item.userDeptName}】【${item.userName}】`
								 : `【${item.userDeptName}】【${item.userName}】【${item.positionName}】`;
								return h('li', _text);
              }))
            }
          },
          {
            title: this.$t('backOperationOrderAdd.colTit13'),
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.amount,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
										params.row.amount = parseFloat(val.toFixed(2));
										// this.rowData[params.index] = params.row;
									},
									'on-blur': () => {
										this.$emit('on-change', params.index, params.row);
									}
                }
              })
            }
          }
        ],
      }
    },
  };

</script>
