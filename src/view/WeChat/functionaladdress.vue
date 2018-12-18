/** * 链接地址 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>链接地址</h2>
		</div>
        
		<div class="Member">
			<h2>基础设置</h2>
            <div style="float:left;height:100%;padding: 20px 150px 40px 150px;">     
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="City" prop="city">
                    <Select v-model="formValidate.city" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="Hobby" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                        </Form>
            </div>
		</div>
        <div class="Member">
			<h2>提成比例设置</h2>
            <div style="float:left;height:100%;padding: 20px 150px 40px 150px;">
                <ul>
                    <li>
                        推荐人注册
                    </li>
                    <li>
                        2
                    </li>
                    <li>
                        3
                    </li>
                </ul>
            </div>
		</div>
        <div class="Member">
			<h2>会费模式</h2>
            <div style="float:left;height:100%;padding: 20px 150px 40px 150px;">
                <ul>
                    <li>
                        l
                    </li>
                    <li>
                        2
                    </li>
                    <li>
                        3
                    </li>
                </ul>
            </div>
		</div>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
        </Form>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }

</script>
<style lang='less' scoped>
.container-box {
    
    .Member {
        float: left;
        width: 100%;
        margin-top: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background-color: white;
        li {
            float: left;
            width: 100%;
        }
        h2 {
            width: 100%;
            height: 40px;
            font-size: 18px;
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #cccccc;
        }
        button {
            width: 140px;
            height: 40px;
            margin-top: 30px;
            cursor: pointer;
            color: white;
            outline: none;
            border: #169bd5;
            border-radius: 5px;
            background: #169bd5;
        }
    }
}
</style>