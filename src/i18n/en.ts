export default {
  siteName: 'Secondary School Philosophy Conference of Zhejiang',
  siteNameLatin: 'Secondary School Philosophy Conference of Zhejiang',
  meta: {
    home: 'The Secondary School Philosophy Conference of Zhejiang — a philosophical academic community for secondary school students: paper presentations, guest lectures and a philosophy hackathon.',
    cfp: 'Call for papers of the SSPCZ: philosophy papers by secondary school students.',
    program: 'Program of the SSPCZ: student paper presentations, guest lectures and the philosophy hackathon.',
    committee: 'Organizing committee of the SSPCZ: hosts, co-organizers, academic support and supporting societies.',
    policies: 'Paper review policy and academic integrity rules of the SSPCZ.',
    register: 'Register for the Secondary School Philosophy Conference of Zhejiang.',
    resources: 'SSPCZ resource hub: permanent documents and media — paper guidelines, templates, review policies and code of conduct.',
  },

  nav: {
    home: 'About',
    archive: 'Archive',
    currentIssue: 'This Session',
    cfp: 'Call for Papers',
    program: 'Program',
    committee: 'Committee',
    policies: 'Policies',
    resources: 'Resources',
    submit: 'Submit Paper',
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
    coverKicker: 'SSPCZ · Since 2024',
    tagline: 'A philosophical academic community for secondary school students',
    currentTitle: 'Current Conference',
    archiveTitle: 'Archive',
    currentMark: 'Current',
  },

  currentIssue: {
    heroLead:
      'This session again focuses on middle and high school students across Zhejiang. Through three pillars — student paper presentations, guest lectures and a philosophy hackathon — it brings philosophy to every participant and kindles the spirit of inquiry in young minds.',
    themeLabel: "This year's theme",
    durationNote: 'four days',
    fullListNote: 'Full list on the Committee page',
    pillarsTitle: 'Three Pillars',
    participantsTitle: 'Who Attends',
    organizersTitle: 'Hosts & Support',
    pastSessionsTitle: 'Past Sessions',
    morePending: '(more to be announced)',
  },

  program: {
    lead: 'Four days of student paper presentations, guest lectures and the philosophy hackathon. The framework below is provisional; speakers and sessions will be confirmed by official notice from the committee.',
    provisionalNote:
      'Provisional framework; the final program will be announced on site.',
  },

  about: {
    metaDescription:
      'About the SSPCZ: our mission, the archive of past editions, and past guest speakers.',
    missionTitle: 'Mission',
  },

  archive: {
    metaDescription: 'Archive of the SSPCZ: theme, year and hosts of every edition.',
    lead: 'The archive of the Secondary School Philosophy Conference of Zhejiang since its founding in 2024. Each edition is preserved as a permanently readable publication, with its theme, year and organizational lineage intact.',
    upcoming: 'In preparation',
  },

  cfpMeta: {
    open: 'Submissions open',
    deadline: 'Submissions close',
    presentations: 'Presentations',
    guidanceLead: 'This session’s theme explanation and hackathon concept notes are in the',
  },

  committee: {
    lead: 'The conference is organized by students, with joint support from many secondary school societies across Zhejiang in every session.',
    structureTitle: 'Structure of this Session',
    pastTitle: 'Past Sessions',
    speakersTitle: 'Past Guest Speakers',
    partnershipTitle: "We're looking for partners",
    labels: {
      hosts: 'Host',
      coOrganizers: 'Co-organizer',
      academicSupport: 'Academic support',
      secretariat: 'Secretariat',
      teams: 'Teams',
      societies: 'Supporting societies',
      supporters: 'Supporters',
    },
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

  resources: {
    title: 'Resources',
    lead: 'Permanent institutional resources for authors and participants — paper guidelines, templates, review policies and codes of conduct, alongside media from past sessions. These assets belong to the academic community across editions, not to any single conference.',
    documentsTitle: 'Documents',
    exhibitionTitle: 'Exhibition',
    empty: 'Nothing here yet.',
    doc: {
      preview: 'Preview',
      download: 'Download',
      openLink: 'Open link',
      version: 'Version',
      updated: 'Updated',
      previewUnavailable: 'Inline preview is unavailable for this document — please download it.',
    },
    typeLabels: {
      pdf: 'PDF',
      docx: 'DOCX',
      md: 'Document',
      link: 'Link',
    },
    exhibition: {
      credit: 'Credit',
      typeLabels: {
        image: 'Image',
        video: 'Video',
        slide: 'Slides',
      },
    },
  },

  closing: {
    motto: 'Think with us — let ideas happen',
    mottoLatin: 'Sapere aude — dare to know.',
    copyright: '© 2024–2026 SSPCZ Organizing Committee',
  },

} as const;
