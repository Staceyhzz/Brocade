export default {
  /**
   * 来源管理页面
   */
  channel: {
    modalTit1: 'Add source',
    modalTit2: 'Modifying the source',
    msg1: 'Determine the source of the deletion?',
    msg2: 'Source information:',
  },


  /**
   * 症状管理页面
   */
  symptom: {
    modalTit1: 'Add symptoms',
    modalTit2: 'Amend the symptoms',
    msg1: 'Deleting symptoms?',
    msg2: 'Symptom information:',
  },


  /**
   * 回访类型管理页面
   */
  callbackCategory: {
    modalTit1: 'Add return visit type',
    modalTit2: 'Modifying the type of return visit',
    msg1: 'Do you decide to delete the type of return visit?',
    msg2: 'Return visit type information:',
  },


  /**
   * 回访组管理页面
   */
  callbackSet: {
    modalTit1: 'Add a return visit group',
    modalTit2: 'Amending the return visit group',
    msg1: 'Deleting the return visit group?',
    msg2: 'Return visit group information:',
  },
  /**
   * 回访组管理编辑页面
   */
  callbackSetEdit: {
    label1: 'detailed',
    label2: 'Type of return visit',
    label3: 'Number of days',
    modalTit: 'Increase the return visit information',
    valid1: 'Please choose a return visit to the project',
    valid2: 'Please choose the type of return visit',
  },


  /**
   * 未成交类型管理页面
   */
  failtureCategory: {
    modalTit1: 'Add undone type',
    modalTit2: 'Amend the non transaction type',
    msg1: 'Do you decide to delete the non transaction type?',
    msg2: 'Non transaction type information:',
  },


  /**
   * 投诉类型管理页面
   */
  complainCategory: {
    modalTit1: 'Add complaint type',
    modalTit2: 'Modifying the type of complaint',
    msg1: 'Do you decide to delete the type of complaint?',
    msg2: 'Complaint type information:',
  },


  /**
   * 标签管理页面
   */
  tag: {
    modalTit1: 'Add tag',
    modalTit2: 'Modify the tag',
    msg1: 'Deleting tag?',
    msg2: 'Tag information:',
  },


  /**
   * 标签组管理页面
   */
  tagGroup: {
    tag: 'tag',
    modalTit1: 'Add tag group',
    modalTit2: 'Modify the tag group',
    msg1: 'Deleting tag group?',
    msg2: 'Tag group information:',
  },
  /**
   * 标签组编辑页面
   */
  tagGroupEdit: {
    label: 'list',
    modalTit: 'Choose tags',
    valid: 'Please choose tags!',
  },


  /**
   * 单位管理页面
   */
  unit: {
    modalTit1: 'Add unit',
    modalTit2: 'Modify the unit',
    msg1: 'Determine the deleting unit?',
    msg2: 'Unit information:',
  },


  /**
   * 支付方式管理页面
   */
  cardCategory: {
    modalTit1: 'Add payment method',
    modalTit2: 'Modification of payment method',
    msg1: 'Determine the way to delete payment?',
    msg2: 'Means of payment information:',
  },


  /**
   * 工具管理页面
   */
  tool: {
    colTit: 'code',
    valid: 'Please enter the code',
    modalTit1: 'Add tool',
    modalTit2: 'Modifying tool',
    msg1: 'Determine the delete tool?',
    msg2: 'Tool information:',
  },


  /**
   * 关系类型管理页面
   */
  relation: {
    modalTit1: 'Add relation type',
    modalTit2: 'Modifying relation type',
    msg1: 'Determine the deleting relationship type?',
    msg2: 'Relationship type information:',
  },


  /**
   * 问卷模板管理页面
   */
  survey: {
    btn: 'design',
    modalTit1: 'Adding a questionnaire template',
    modalTit2: 'Modifying the questionnaire template',
    msg1: 'Determine the deletion of the questionnaire template?',
    msg2: 'Questionnaire template information:',
  },
  /**
   * 问卷模板编辑页面
   */
  surveyEdit: {
    colTit1: 'questions',
    colTit2: 'subject',
    colTit3: 'order of adjustment',
    msg1: 'add choice questions',
    msg2: "editor's choice",
    msg3: 'fill in the blanks',
    msg4: "editors' fill in the blanks",
    modalMsg: 'Deletions: ',
    radio: 'radio',
    multiselect: 'multiselect',
    completion: 'completion',
  },
  /**
   * 选择题编辑页面
   */
  surveyRtfChoice: {
    label1: 'type',
    label2: 'content',
    label: 'option{0}',
    valid1: 'Please select the type',
    valid2: 'Please fill in the contents',
  },


  /**
   * 病例模板页面
   */
  medicalRecord: {
    btn: 'design',
    modalTit1: 'Addition of case template',
    modalTit2: 'Modification of case template',
    msg1: 'Determine the deletion of the modified case?',
    msg2: 'Amend the case information:',
    msg3: 'print settings',
  },
  /**
   * 病例模板设计页面
   */
  medicalRecordEdit: {
    colTit1: 'subject',
    colTit2: 'order of adjustment',
    msg1: 'add item',
    msg2: 'editing project',
    msg3: 'add complex projects',
    msg4: 'editing complex projects',
    msg5: 'It is determined to delete this topic:',
  },
  /**
   * 病例模板添加复杂项目页面
   */
  medicalRecordRtf: {
    label: 'content',
    valid: 'Please fill in the contents',
  },
  /**
   * 病例模板打印设置页面
   */
  medicalRecordPrint: {
    label1: 'width',
    label2: 'typeface',
    label3: 'size',
    label4: 'type',
    label5: 'template',
    msg1: 'Edit width',
    msg2: 'Edit font',
    msg3: 'Edit template',
  },
  /**
   * 病例模板打印模板编辑页面
   */
  medicalRecordUpdate: {
    msg: 'Parameter Description: hospital Name: $HospitalName customer number: $CustomerID customer name: $CustomerName gender: $Gender age: $Age medical record number: $No date creation date：$CreateDate create users: $CreateUserName title number: $T1$(The first question is T1，second questions is T2，and so on)',
  },


  /**
   * 部位模板管理
   */
  positionTemplate: {
    btn: 'design form',
    tit1: 'add tracking template',
    tit2: 'edit tracking template',
    tit3: 'design tracking template form',
    msg1: 'determine to delete this tracking template? ',
    msg2: 'tracking template information:'
  },
  /**
   * 模板表单管理
   */
  positionTemplateEdit: {
    btn1: 'insert',
    btn2: 'Add options',
    tit1: 'Tracking template',
    tit2: 'form editor',
    tit3: 'form element',
    tit4: 'form design',
    msg1: 'please insert the required form elements in this area. The example is as follows:',
    msg2: 'can drag this area form to sort',
    menu1: 'text',
    menu2: 'number',
    menu3: 'single choice',
    menu4: 'multiple choice',
    menu5: 'upload photos',
    menu6: 'project association',
    valid1: 'please enter the form title',
    valid2: 'please select the digital form unit',
    valid3: 'please enter form options',
    valid4: 'please select the associated project',
    valid5: 'photo upload has been added! ',
    valid6: 'project association has been added! ',
    valid7: 'this type of element is more than 10! ',
    valid8: 'Please add the option name!',
    valid9: 'Cannot all disable options',
    label1: 'site name',
    label2: 'note (text)',
    label3: 'height (value)',
    label4: 'satisfaction (Dan Xuan)',
    label5: 'is very satisfied',
    label6: 'satisfaction',
    label7: 'dissatisfied',
    label8: 'user feel (multi selection)',
    label9: 'praise, thanks',
    label10: 'likes and recommends others',
    label11: 'complain, not',
    label12: 'form title',
    label13: 'form state',
    label14: 'Whether is required',
    label15: 'non - required',
    label16: 'must fill',
    label17: 'digital unit',
    label18: 'option {0}',
  },


  /**
   * 岗位分工管理页面
   */
  position: {
    modalTit1: 'Adding job division',
    modalTit2: 'Revision of job division',
    msg1: 'Deleting the division of labor in the post?',
    msg2: 'Job division information:',
  },
};