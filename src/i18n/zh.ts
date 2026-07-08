export default {
  siteName: '浙江中学生哲学大会',
  siteNameLatin: 'Secondary School Philosophy Conference of Zhejiang',
  issueLabel: '第三届',

  nav: {
    home: '首页',
    currentIssue: '第三届大会',
    cfp: '征稿启事',
    program: '日程安排',
    committee: '组委会',
    policies: '会议政策',
    register: '注册报名',
    languageSwitch: 'EN',
  },

  actions: {
    register: '注册报名',
    registerNow: '立即报名',
    viewProgram: '查看日程',
    readCfp: '征稿启事',
    viewDetails: '查看详情',
  },

  home: {
    heroLead:
      '为对哲学充满热情的初高中学生提供开放的学术交流平台——学生论文讲演、嘉宾讲座、哲学黑客马拉松，一场思想碰撞与知识交流的盛会。让年轻的心灵在哲学的海洋中自由翱翔。',
    currentIssueCard:
      '由第三届浙江中学生哲学大会组委会、未竟计划主办。查看本届详情、征稿与报名。',
  },

  currentIssue: {
    heroLead:
      '本届大会继续聚焦浙江地区的高中生和初中生，以学生论文讲演、嘉宾讲座、哲学黑客马拉松三大板块，向所有与会者传播哲学知识，激发中学生的精神探索。',
    themeLabel: '本届主题',
    durationNote: '会期四天',
    fullListNote: '完整名单见组委会页面',
  },

  program: {
    lead: '四日议程由学生论文讲演、嘉宾讲座与哲学黑客马拉松三大板块组成。以下为暂定框架，具体嘉宾与场次以组委会正式通知为准。',
    provisionalNote: '议程为暂定框架，最终以大会现场公布为准。',
  },

  committee: {
    lead: '浙江中学生哲学大会由学生自发组织，历届均获得省内众多中学社团的联合支持。',
    partnershipTitle: '我们招募合作组织',
  },

  register: {
    lead: '大会在杭州举行，面向初高中学生开放报名，大学生与教师可以旁听身份参与。报名成功后，组委会将通过你留下的联系方式发送参会通知。',
    cfpNote: '想在大会上讲演论文？请先阅读征稿启事。',
    contactLabel: '组委会联络',
    fields: {
      name: '姓名',
      school: '学校',
      grade: '年级',
      contact: '联系方式（邮箱或微信）',
      attendance: '参会方式',
      role: '参会身份',
      notes: '备注（选填）',
    },
    placeholders: {
      name: '你的姓名',
      school: '就读学校全称',
      grade: '请选择年级',
      contact: '用于接收参会通知',
      notes: '想对组委会说的话、论文题目方向等',
    },
    options: {
      grades: ['初一', '初二', '初三', '高一', '高二', '高三'],
      attendanceOffline: '线下参会 · 杭州',
      attendanceOnline: '线上参会',
      roleAuditor: '旁听成员',
      roleSubmitter: '论文投稿人',
    },
    validationPrefix: '请填写：',
    submit: '提交报名',
    submitting: '提交中…',
    successTitle: '报名成功',
    successBody:
      '我们已收到你的报名信息。组委会将通过你留下的联系方式发送参会通知，请保持关注。',
    successVocativeFallback: '同学',
    fillAnother: '再填一份',
    failure: '提交失败，请稍后重试，或直接发送邮件报名。',
  },

  closing: {
    motto: '与我们一起，让思想发生',
    mottoLatin: 'Sapere aude — dare to know.',
    copyright: '© 2024–2026 SSPCZ 组委会',
  },

  scaffoldTitle: '出版平台 · 脚手架',
  scaffoldNote:
    '这是 ADR-001 Phase 1 的空壳脚手架页面，用于验证设计令牌、版式模式与质量门槛。正式内容在 Phase 2–3 迁移。',
} as const;
