<template>
    <div class="range-RMF">
        <div class="range-wrap" ref='range' :style='rangeWrapBg' @click.self="sliderClick">
            <div class="range-bar" :style="firstBarStyle" @click.self="sliderClick"></div>
            <div class="range-bar" :style="secondBarStyle" @click.self="sliderClick"></div>
            <div
                class="range-button-wrap"
                :style="{left: firstPosition + '%'}"
                @mousedown="onFirstButtonDown">
                <Tooltip placement="top" :content="currentValue[0] + unit" always ref='tooltip'> 
                    <div :class="['range-button', firstDragging ? 'range-button-move' : '']"></div>
                </Tooltip>
            </div>
            <div
                class="range-button-wrap"
                :style="{left: secondPosition + '%'}"
                @mousedown="onSecondButtonDown">
                <Tooltip placement="top" :content="currentValue[1] + unit" always ref='tooltip2'>
                    <div :class="['range-button', secondDragging ? 'range-button-move' : '']"></div>
                </Tooltip>
            </div>
            <div class="range-start">{{min + unit}}</div>
            <div class="range-end">{{max + unit}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'rangeRmf',
        props: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            value: Array,
            bgColor: Array,
            unit: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                currentValue: this.value,
                firstPosition: (this.value[0] - this.min) / (this.max - this.min) * 100,
                secondPosition: (this.value[1] - this.min) / (this.max - this.min) * 100,
                firstDragging: false,
                secondDragging: false,
                startX: 0,
                currentX: 0,
                startPos: 0,
                newPos: null,
                oldSecondValue: this.value[1],
                oldFirstValue: this.value[0]
            }
        },
        watch: {
            value (val) {
                this.currentValue = val
                this.$nextTick(() => {
                    this.$refs.tooltip.updatePopper()
                    this.$refs.tooltip2.updatePopper()
                })
                this.updateValue(val)
            },
        },
        computed: {
            sliderWidth () {
                return parseInt(this.getStyle(this.$refs.range, 'width'), 10)
            },
            rangeWrapBg () {
                let style = {
                    backgroundColor: this.bgColor[2]
                }
                return style
            },
            firstBarStyle () {
                let style = {
                    width: (this.currentValue[0] - this.min) / (this.max - this.min) * 100 + '%',
                    left: 0,
                    backgroundColor: this.bgColor[0]
                }
                return style
            },
            secondBarStyle () {
                let style = {
                    width: (this.currentValue[1] - this.currentValue[0]) / (this.max - this.min) * 100 + '%',
                    left: (this.currentValue[0] - this.min) / (this.max - this.min) * 100 + '%',
                    backgroundColor: this.bgColor[1]
                }
                return style
            }
        },
        methods: {
            updateValue (val, init = false) {
                let value = [...val]
                if (init) {
                    if (value[0] > value[1]) {
                        value = [this.min, this.max]
                    }
                } else {
                    if (value[0] > value[1]) {
                        value[0] = value[1]
                    }
                }
                if (value[0] < this.min) {
                    value[0] = this.min
                }
                if (value[0] > this.max) {
                    value[0] = this.max
                }
                if (value[1] < this.min) {
                    value[1] = this.min
                }
                if (value[1] > this.max) {
                    value[1] = this.max
                }
                if (this.value[0] === value[0] && this.value[1] === value[1]) {
                    this.setFirstPosition(this.currentValue[0])
                    this.setSecondPosition(this.currentValue[1])
                    return
                }

                this.currentValue = value
                this.setFirstPosition(this.currentValue[0])
                this.setSecondPosition(this.currentValue[1])
            },
            getStyle (element, styleName) {
                return document.defaultView.getComputedStyle(element, '')[styleName]
            },
            sliderClick (event) {
                const currentX = event.clientX
                console.log(event)
                console.log(this.$refs.range.getBoundingClientRect().left)
                const sliderOffsetLeft = this.$refs.range.getBoundingClientRect().left
                const newPos = (currentX - sliderOffsetLeft) / this.sliderWidth * 100
                let type = ''
                if (newPos <= this.firstPosition) {
                    type = 'First'
                } else if (newPos >= this.secondPosition) {
                    type = 'Second'
                } else {
                    if ((newPos - this.firstPosition) <= (this.secondPosition - newPos)) {
                        type = 'First'
                    } else {
                        type = 'Second'
                    }
                }
                this[`change${type}Position`](newPos)
            },
            //first-btn
            onFirstButtonDown (event) {
                console.log(event)
                event.preventDefault()
                this.onFirstDragStart(event)
                document.addEventListener('mousemove', this.onFirstDragging)
                document.addEventListener('mouseup', this.onFirstDragEnd)
            },
            onFirstDragStart (event) {
                this.firstDragging = false
                this.startX = event.clientX
                this.startPos = parseInt(this.firstPosition, 10)
            },
            onFirstDragEnd () {
                if (this.firstDragging) {
                    this.firstDragging = false
                    this.changeFirstPosition(this.newPos)
                }
                document.removeEventListener('mousemove', this.onFirstDragging)
                document.removeEventListener('mouseup', this.onFirstDragEnd)
            },
            onFirstDragging (event) {
                this.firstDragging = true
                if (this.firstDragging) {
                    this.currentX = event.clientX
                    const diff = (this.currentX - this.startX) / this.sliderWidth * 100
                    this.newPos = this.startPos + diff
                    this.changeFirstPosition(this.newPos)
                }
            },
            changeFirstPosition (newPos) {
                let bool = true
                if (newPos < 0) {
                    newPos = 0
                } else if (newPos > this.secondPosition || this.currentValue[0] + 1 > this.currentValue[1]) {
                    // newPos = this.secondPosition
                    bool = false
                }
                const lengthPerStep = 100 / (this.max - this.min)
                const steps = Math.round(newPos / lengthPerStep)
                if(bool) {
                    this.currentValue = [Math.round(steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min), this.currentValue[1]]
                } else {
                    this.currentValue = [this.currentValue[1] - 1, this.currentValue[1]]
                }
                this.setFirstPosition(this.currentValue[0])
                if(!this.firstDragging) {
                    if(this.oldFirstValue !== this.currentValue[0]) {
                        this.$emit('on-change', this.currentValue)
                        this.oldFirstValue = this.currentValue[0]
                    }
                }
            },
            setFirstPosition (val) {
                this.firstPosition = (val - this.min) / (this.max - this.min) * 100
            },
            //second-btn
            onSecondButtonDown (event) {
                console.log(event)
                event.preventDefault()
                this.onSecondDragStart(event)
                document.addEventListener('mousemove', this.onSecondDragging)
                document.addEventListener('mouseup', this.onSecondDragEnd)
            },
            onSecondDragStart (event) {
                this.secondDragging = false
                this.startX = event.clientX
                this.startPos = parseInt(this.secondPosition, 10)
            },
            onSecondDragging (event) {
                this.secondDragging = true
                if (this.secondDragging) {
                    this.currentX = event.clientX
                    const diff = (this.currentX - this.startX) / this.sliderWidth * 100
                    this.newPos = this.startPos + diff
                    this.changeSecondPosition(this.newPos)
                }
            },
            onSecondDragEnd () {
                if (this.secondDragging) {
                    this.secondDragging = false
                    this.changeSecondPosition(this.newPos)
                }
                document.removeEventListener('mousemove', this.onSecondDragging)
                document.removeEventListener('mouseup', this.onSecondDragEnd)
            },
            changeSecondPosition (newPos) {
                let bool = true
                if (newPos > 100) {
                    newPos = 100
                } else if (newPos < this.firstPosition  || this.currentValue[0] + 1 > this.currentValue[1]) {
                    bool = false
                    // newPos = this.firstPosition
                }
                const lengthPerStep = 100 / (this.max - this.min)
                const steps = Math.round(newPos / lengthPerStep)
                if(bool) {
                    this.currentValue = [this.currentValue[0], Math.round(steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min)]
                } else {
                    this.currentValue = [this.currentValue[0], this.currentValue[0] + 1]
                }
                this.setSecondPosition(this.currentValue[1])
                if(!this.secondDragging) {
                    if(this.oldSecondValue !== this.currentValue[1]) {
                        this.$emit('on-change', this.currentValue)
                        this.oldSecondValue = this.currentValue[1]
                    }
                }
            },
            setSecondPosition (val) {
                this.secondPosition = (val - this.min) / (this.max - this.min) * 100
            }
        }
    }
</script>
<style scoped lang="less">
    .range-RMF {
        .range-wrap {
            position: relative;
            vertical-align: middle;
            width: 100%;
            height: 4px;
            margin: 20px 0;
            border-radius: 3px;
            cursor: pointer;
        }
        .range-button-wrap {
            position: absolute;
            top: -5px;
            width: 18px;
            height: 18px;
            text-align: center;
            background-color: transparent;
            transform: translateX(-50%); 
        }
        .range-button {
            width: 12px;
            height: 12px;
            border: 2px solid #797979;
            border-radius: 50%;
            background-color: #fff;
            &:hover {
                border-color: #797979;
                transform: scale(1.5);
            }
        }
        .range-button-move {
            border-color: #797979;
            transform: scale(1.5);
        }
        .range-bar {
            position: absolute;
            height: 4px;
            border-radius: 3px;
        }
        .range-start {
            position: absolute;
            left: 0;
            bottom: 10px;
            font-size: 12px;
            line-height: 16px;
        }
        .range-end {
            position: absolute;
            right: 0;
            bottom: 10px;
            font-size: 12px;
            line-height: 16px;
        }
    }
</style>