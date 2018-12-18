<template>
    <span>
        {{content}}
    </span>
</template>

<script>
    export default {
        name: 'liveCountTime',
        props: {
            _startTime: String,
            _index: Number,
        },
        data() {
            return {
                content: '',
                timer: null,
            }
        },
        beforeDestroy () {
            window.clearInterval(this.timer)
        },
        mounted () {
            this.countTime()
        },
        methods: {
            countTime () {
                let _vm = this,
                    _start = new Date(_vm._startTime.replace(/-/, "/")).getTime(),
                    _end = new Date().getTime(),
                    _dist = _end - _start < 0 ? 0 : _end - _start
                _vm.timer = setInterval(() => {
                    _dist = _dist + 1000
                    let _hour = Math.floor((_dist / 3600000) % 24), 
                        _min = Math.floor((_dist / 60000) % 60),
                        _sec = Math.floor((_dist / 1000) % 60)
                    _hour = _hour < 10 ? '0' + _hour : _hour
                    _min  = _min  < 10 ? '0' + _min  : _min 
                    _sec = _sec < 10 ? '0' + _sec : _sec
                    _vm.content = `${_vm.$t('liveDesk.colTit14')}：${_hour}:${_min}:${_sec}`
                    console.log(_vm._startTime)
                    console.log(_vm._index)
                }, 1000)

            },
        }
    }
</script>