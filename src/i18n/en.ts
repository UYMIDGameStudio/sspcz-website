export default {
  siteName: 'Secondary School Philosophy Conference of Zhejiang',
  siteNameLatin: 'Secondary School Philosophy Conference of Zhejiang',
  issueLabel: 'Issue III',

  nav: {
    home: 'Home',
    currentIssue: 'The 3rd Session',
    cfp: 'Call for Papers',
    program: 'Program',
    committee: 'Committee',
    policies: 'Policies',
    register: 'Register',
    languageSwitch: '中文',
  },

  actions: {
    register: 'Register',
    registerNow: 'Register Now',
    viewProgram: 'View Program',
    readCfp: 'Call for Papers',
    viewDetails: 'Details',
  },

  home: {
    heroLead:
      'An open academic forum for middle and high school students passionate about philosophy — student paper presentations, guest lectures and a philosophy hackathon. A festival of ideas, where young minds roam free in the ocean of philosophy.',
    currentIssueCard:
      'Hosted by the 3rd SSPCZ Organizing Committee and the Weijing Initiative. Details, call for papers and registration.',
  },

  currentIssue: {
    heroLead:
      'This session again focuses on middle and high school students across Zhejiang. Through three pillars — student paper presentations, guest lectures and a philosophy hackathon — it brings philosophy to every participant and kindles the spirit of inquiry in young minds.',
    themeLabel: "This year's theme",
    durationNote: 'four days',
    fullListNote: 'Full list on the Committee page',
  },

  program: {
    lead: 'Four days of student paper presentations, guest lectures and the philosophy hackathon. The framework below is provisional; speakers and sessions will be confirmed by official notice from the committee.',
    provisionalNote:
      'Provisional framework; the final program will be announced on site.',
  },

  committee: {
    lead: 'The conference is organized by students, with joint support from many secondary school societies across Zhejiang in every session.',
    partnershipTitle: "We're looking for partners",
  },

  register: {
    lead: 'The conference takes place in Hangzhou. Registration is open to middle and high school students; university students and teachers may attend as auditors. After you register, the committee will send conference updates via the contact you leave.',
    cfpNote: 'Want to present a paper? Read the Call for Papers first.',
    contactLabel: 'Committee contact',
    fields: {
      name: 'Name',
      school: 'School',
      grade: 'Grade',
      contact: 'Contact (email or WeChat)',
      attendance: 'Attendance',
      role: 'Role',
      notes: 'Notes (optional)',
    },
    placeholders: {
      name: 'Your name',
      school: 'Full name of your school',
      grade: 'Choose your grade',
      contact: 'For conference updates',
      notes: 'Anything for the committee — paper topic, questions…',
    },
    options: {
      grades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
      attendanceOffline: 'In person · Hangzhou',
      attendanceOnline: 'Online',
      roleAuditor: 'Auditing member',
      roleSubmitter: 'Paper submitter',
    },
    validationPrefix: 'Please fill in: ',
    submit: 'Submit',
    submitting: 'Submitting…',
    successTitle: 'Registration received',
    successBody:
      'We have received your registration. The committee will contact you with conference updates — stay tuned.',
    successVocativeFallback: 'Friend',
    fillAnother: 'Fill in another',
    failure: 'Submission failed. Please try again later, or register by email.',
  },

  closing: {
    motto: 'Think with us — let ideas happen',
    mottoLatin: 'Sapere aude — dare to know.',
    copyright: '© 2024–2026 SSPCZ Organizing Committee',
  },

  scaffoldTitle: 'Publication Platform · Scaffold',
  scaffoldNote:
    'This is the empty Phase 1 scaffold of ADR-001, verifying design tokens, layout patterns and QA gates. Real content arrives in Phases 2–3.',
} as const;
