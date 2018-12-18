<template>
  <Table stripe :columns="col" :data="row"></Table>
</template>
<script>
  export default {
    props: {
      row: Array
		},
    data() {
      return {
        col: [
					{
						title: this.$t('cashierDesk.colTit14'),
						width: 80,
            render: (h, params) => {
							if(params.row.createtime) {
								const _text = params.row.createtime.split(' ')[0];
								return h('span', _text);
							}
            }
          },
          {
            title: this.$t('repayment.colTit6'),
						width: 60,
            key: 'createUserName',
          },
          {
            title: this.$t('cashierDesk.label4'),
						width: 60,
						key: 'cash',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.cash)) {
								return h('span', params.row.cash.toFixed(2))
							}
            }
          },
          {
            title: this.$t('cashierDesk.label5'),
						width: 60,
						key: 'card',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.card)) {
								return h('span', params.row.card.toFixed(2));
							}
            }
          },
          {
            title: this.$t('cashierDesk.colTit17'),
						width: 60,
            render: (h, params) => {
              const _text = []
              if (typeof params.row.cardCategory1Name === 'string') {
                _text.push(params.row.cardCategory1Name)
              }
              if (typeof params.row.cardCategory2Name === 'string') {
                _text.push(params.row.cardCategory2Name)
              }
              if (typeof params.row.cardCategory3Name === 'string') {
                _text.push(params.row.cardCategory3Name)
              }
              if (typeof params.row.cardCategory4Name === 'string') {
                _text.push(params.row.cardCategory4Name)
              }
              if (typeof params.row.cardCategory5Name === 'string') {
                _text.push(params.row.cardCategory5Name)
              }
              return h('ul', _text.map(item => {
                return h('li', item)
              }))
            }
          },
          {
            title: this.$t('cashierDesk.label9'),
						width: 60,
						key: 'deposit',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.deposit)) {
								return h('span', params.row.deposit.toFixed(2));
							}
            }
          },
          {
            title: this.$t('cashierDesk.label10'),
						width: 60,
						key: 'coupon',
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.coupon)) {
								return h('span', params.row.coupon.toFixed(2));
							}
            }
          },
          {
            title: this.$t('labelPublic.ms'),
						width: 60,
            key: 'remark',
          }
				],
      }
		},
		mounted() {
			const _col = this.tableCount(this.row, ['deposit', 'cash', 'card', 'coupon']);
			_col.map(item => {
				const index = this.col.findIndex(col => col.key === item.key);
				console.log(item)
				if(index >= 0) {
					this.col[index].width = item.width;
				}
			});
		},
  };

</script>
