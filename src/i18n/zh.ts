export default {
  siteName: '浙江中学生哲学大会',
  siteNameLatin: 'Secondary School Philosophy Conference of Zhejiang',
  meta: {
    home: '浙江中学生哲学大会——面向初高中学生的哲学学术共同体：学生论文讲演、嘉宾讲座与哲学黑客马拉松。',
    cfp: '浙江中学生哲学大会征稿启事：面向中学生征集哲学论文。',
    program: '浙江中学生哲学大会日程：学生论文讲演、嘉宾讲座与哲学黑客马拉松。',
    committee: '浙江中学生哲学大会组委会：主办、协办、学术支持与联合支持社团。',
    policies: '浙江中学生哲学大会论文审核政策与学术不端处理办法。',
    register: '注册报名参加浙江中学生哲学大会。',
    resources: '浙江中学生哲学大会资源库：论文格式模板、审核政策与本届学术解释等常设文档与影像。',
  },

  nav: {
    home: '关于大会',
    archive: '历届档案',
    currentIssue: '本届',
    cfp: '征稿启事',
    program: '日程安排',
    committee: '组委会',
    policies: '会议政策',
    resources: '资源库',
    submit: '投稿',
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
    coverKicker: 'Secondary School Philosophy Conference of Zhejiang',
    tagline: '面向初高中学生的哲学学术共同体',
    currentTitle: '当前会议',
    archiveTitle: '会议档案',
    currentMark: '进行中',
  },

  currentIssue: {
    heroLead:
      '本届大会继续聚焦浙江地区的高中生和初中生，以学生论文讲演、嘉宾讲座、哲学黑客马拉松三大板块，向所有与会者传播哲学知识，激发中学生的精神探索。',
    themeLabel: '本届主题',
    daysUnit: '天',
    fullListNote: '完整名单见组委会页面',
    pillarsTitle: '三大板块',
    participantsTitle: '与会者类别',
    organizersTitle: '主办与支持',
    morePending: '（更多待定）',
    letterTitle: '组委寄语',
    facts: { period: '会期', location: '地点', audience: '对象', auditors: '旁听' },
  },

  program: {
    lead: '四日议程由学生论文讲演、嘉宾讲座与哲学黑客马拉松三大板块组成。以下为暂定框架，具体嘉宾与场次以组委会正式通知为准。',
    provisionalNote: '议程为暂定框架，最终以大会现场公布为准。',
  },

  about: {
    metaDescription: '关于浙江中学生哲学大会：大会宗旨、历届档案与往届嘉宾学者。',
    missionTitle: '大会宗旨',
  },

  archive: {
    metaDescription: '浙江中学生哲学大会历届档案：各届主题、年份与主办方一览。',
    lead: '浙江中学生哲学大会自 2022 年创办以来的历届档案。每届大会作为一份可长期查阅的出版物存档，主题、年份与组织沿革一并保留。',
    upcoming: '筹备中',
  },

  cfpMeta: {
    open: '投稿开通',
    deadline: '投稿截止',
    presentations: '大会讲演',
    guidanceLead: '本届「变与不变」学术解释与哲学黑客松概念说明，详见',
  },

  cfp: {
    scopeTitle: '对象与主题',
    timelineTitle: '时间与投稿',
    submitLead: '投稿与合作请联络组委会邮箱 ',
    registerFirst: '先去报名',
  },

  committee: {
    lead: '浙江中学生哲学大会由学生自发组织，历届均获得省内众多中学社团的联合支持。',
    structureTitle: '本届组织架构',
    pastTitle: '历届组织',
    speakersTitle: '往届嘉宾学者',
    partnershipTitle: '我们招募合作组织',
    labels: {
      hosts: '主办',
      coOrganizers: '协办',
      academicSupport: '学术支持',
      secretariat: '秘书处',
      teams: '工作组',
      societies: '联合社团支持',
      supporters: '联合支持',
    },
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
    /* 以下报名流程键为表单后端预留（ADR-001 §6，后端未决）。 */
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

  resources: {
    title: '资源库',
    lead: '面向作者与与会者的常设机构资源——论文格式模板、审核政策与本届学术解释，以及历届影像。文档不隶属于单届大会，长期沉淀为学术共同体的知识资产。',
    documentsTitle: '常设文档',
    exhibitionTitle: '影像陈列',
    empty: '暂无内容。',
    doc: {
      preview: '预览',
      download: '下载',
      openLink: '打开链接',
      version: '版本',
      updated: '更新于',
    },
    typeLabels: {
      pdf: 'PDF',
      docx: 'DOCX',
      md: '文档',
      link: '链接',
    },
    exhibition: {
      credit: '供图',
      typeLabels: {
        image: '图像',
        video: '影像',
        slide: '演示',
      },
    },
  },

  closing: {
    motto: '与我们一起，让思想发生',
    mottoLatin: 'Sapere aude — dare to know.',
    copyright: '© 2022–2026 SSPCZ 组委会',
  },

} as const;
