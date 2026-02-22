export type Lang = "en" | "pt";

export const translations = {
  en: {
    // Navbar
    beta: "Beta",
    signIn: "Sign in",
    viewGithub: "View GitHub Profile",
    signOut: "Sign out",

    // Dashboard header
    welcomeBack: (name: string) => `Welcome back, ${name} 👋`,
    dashboardTitle: "Your Dashboard",
    dashboardSub: "Analyze jobs, track applications, and generate cover letters with AI.",

    // GitHub card
    repos: "Repos",
    followers: "Followers",
    following: "Following",

    // Stats
    totalApplications: "Total Applications",
    avgMatchScore: "Avg Match Score",
    interviews: "Interviews",

    // How it works
    howItWorksTitle: "How to use HireMe AI",
    steps: [
      {
        title: "Find a job on LinkedIn or Indeed",
        desc: "Open any job posting, select all the description text and copy it. The more text, the better the analysis.",
        tip: "💡 Tip: Copy the full post — requirements, responsibilities, benefits — everything.",
      },
      {
        title: 'Fill in the form and click "Analyze Job"',
        desc: "Enter the job title, company name, and paste the full description. Click Analyze Job and wait ~5 seconds.",
        tip: "💡 The description needs at least 100 characters for accurate analysis.",
      },
      {
        title: "Read your match score and save",
        desc: "The AI returns a score from 0–100 showing how well your skills match the job. Click Save Application to track it.",
        tip: "💡 Scores above 60% = strong candidate. Below 40% = skill gap to work on.",
      },
      {
        title: "Generate a tailored cover letter",
        desc: "Click Generate Cover Letter for an AI-written cover letter personalized to that specific job and company.",
        tip: "💡 Each cover letter is unique — don't reuse the same one for every application.",
      },
    ],

    // Analyze form
    jobTitlePlaceholder: "Job title (e.g. Senior React Developer)",
    companyPlaceholder: "Company name",
    descriptionPlaceholder: "Paste the full job description here (requirements, responsibilities, etc.)…",
    analyzeBtn: "Analyze Job",
    analyzingBtn: "Analyzing…",
    descTooShort: "⚠️ Paste the full job description for accurate results",
    descGood: "✓ Good — description is long enough",
    descHint: "Paste the complete job description from LinkedIn/Indeed",
    minChars: "min chars",
    matchScore: "Match Score",
    saveApplication: "Save Application",
    saving: "Saving…",
    saved: "Saved ✓",
    generateCoverLetter: "Generate Cover Letter",
    generating: "Generating…",
    fillTitleCompany: "⚠️ Fill in job title and company above to save or generate a cover letter.",

    // Applications section
    analyzeSection: "Analyze a Job",
    applicationsSection: "Your Applications",
    exportCsv: "Export CSV",
    noApplications: "No applications yet.",
    noApplicationsSub: "Analyze a job description above to get started.",

    // Landing nav
    getStartedFree: "Get Started Free",
    seeDemo: "See Demo",

    // Hero
    heroTagline: "Powered by OpenAI",
    heroTitle1: "Stop Guessing.",
    heroTitle2: "Start Getting Hired.",
    heroDesc: "HireMe AI analyzes job descriptions against your skills, gives you a real match score, and writes tailored cover letters in seconds.",

    // Stats
    statTime: "Average analysis time",
    statPowered: "Powered by OpenAI",
    statFree: "Free to use",

    // Features section
    featuresTitle: "Everything your job search needs",
    featuresSub: "Stop juggling spreadsheets. Let AI do the heavy lifting.",

    // Feature cards
    feat1Title: "Smart Skill Matching",
    feat1Desc: "AI analyzes job descriptions and calculates how well your skills match — instantly.",
    feat2Title: "Cover Letter Generator",
    feat2Desc: "Generate tailored, compelling cover letters that reference specific role requirements.",
    feat3Title: "Application Dashboard",
    feat3Desc: "Track every application from saved → applied → interviewing → offered in one place.",
    feat4Title: "AI-Powered Insights",
    feat4Desc: "Get actionable suggestions on skills to learn and how to strengthen your profile.",

    // How it works (landing)
    howTitle: "Up and running in 60 seconds",
    step1Title: "Sign in with GitHub",
    step1Desc: "One click. No forms. No credit card.",
    step2Title: "Paste a job description",
    step2Desc: "Copy from LinkedIn, Indeed, or any job board.",
    step3Title: "Get your match score + cover letter",
    step3Desc: "AI returns a 0–100 match score, extracted skills, and a tailored cover letter.",

    // CTA
    ctaTitle: "Ready to land your next role?",
    ctaSub: "Join developers using HireMe AI to apply smarter, not harder.",

    // Footer
    footerText: "Built with Next.js · Prisma · OpenAI · Neon · MIT License ·",
    viewSource: "View Source",
  },

  pt: {
    // Navbar
    beta: "Beta",
    signIn: "Entrar",
    viewGithub: "Ver Perfil no GitHub",
    signOut: "Sair",

    // Dashboard header
    welcomeBack: (name: string) => `Bem-vindo de volta, ${name} 👋`,
    dashboardTitle: "Seu Painel",
    dashboardSub: "Analise vagas, acompanhe candidaturas e gere cartas de apresentação com IA.",

    // GitHub card
    repos: "Repos",
    followers: "Seguidores",
    following: "Seguindo",

    // Stats
    totalApplications: "Total de Candidaturas",
    avgMatchScore: "Score Médio",
    interviews: "Entrevistas",

    // How it works
    howItWorksTitle: "Como usar o HireMe AI",
    steps: [
      {
        title: "Encontre uma vaga no LinkedIn ou Indeed",
        desc: "Abra qualquer vaga, selecione todo o texto da descrição e copie (Ctrl+A, Ctrl+C). Quanto mais texto, melhor a análise.",
        tip: "💡 Dica: Copie tudo — requisitos, responsabilidades, benefícios.",
      },
      {
        title: 'Preencha o formulário e clique em "Analisar Vaga"',
        desc: "Informe o título, empresa e cole a descrição completa. Clique em Analisar e aguarde ~5 segundos.",
        tip: "💡 A descrição precisa de pelo menos 100 caracteres para uma análise precisa.",
      },
      {
        title: "Veja seu score e salve a candidatura",
        desc: "A IA retorna um score de 0–100 mostrando o quanto suas habilidades combinam com a vaga. Clique em Salvar para acompanhar.",
        tip: "💡 Score acima de 60% = candidato forte. Abaixo de 40% = lacuna a desenvolver.",
      },
      {
        title: "Gere uma carta de apresentação personalizada",
        desc: "Clique em Gerar Carta para uma carta escrita pela IA, personalizada para aquela vaga e empresa específicas.",
        tip: "💡 Cada carta é única — não reutilize a mesma para toda candidatura.",
      },
    ],

    // Analyze form
    jobTitlePlaceholder: "Título da vaga (ex: Desenvolvedor React Júnior)",
    companyPlaceholder: "Nome da empresa",
    descriptionPlaceholder: "Cole aqui a descrição completa da vaga (requisitos, responsabilidades, etc.)…",
    analyzeBtn: "Analisar Vaga",
    analyzingBtn: "Analisando…",
    descTooShort: "⚠️ Cole a descrição completa para resultados precisos",
    descGood: "✓ Ótimo — descrição suficientemente longa",
    descHint: "Cole a descrição completa da vaga do LinkedIn/Indeed",
    minChars: "mín. chars",
    matchScore: "Score de Match",
    saveApplication: "Salvar Candidatura",
    saving: "Salvando…",
    saved: "Salvo ✓",
    generateCoverLetter: "Gerar Carta de Apresentação",
    generating: "Gerando…",
    fillTitleCompany: "⚠️ Preencha o título e a empresa acima para salvar ou gerar uma carta.",

    // Applications section
    analyzeSection: "Analisar uma Vaga",
    applicationsSection: "Suas Candidaturas",
    exportCsv: "Exportar CSV",
    noApplications: "Nenhuma candidatura ainda.",
    noApplicationsSub: "Analise uma vaga acima para começar.",

    // Landing nav
    getStartedFree: "Começar Grátis",
    seeDemo: "Ver Demo",

    // Hero
    heroTagline: "Desenvolvido com OpenAI",
    heroTitle1: "Chega de Adivinhar.",
    heroTitle2: "Comece a Ser Contratado.",
    heroDesc: "O HireMe AI analisa vagas com base nas suas habilidades, gera um score real de compatibilidade e escreve cartas de apresentação personalizadas em segundos.",

    // Stats
    statTime: "Tempo médio de análise",
    statPowered: "Desenvolvido com OpenAI",
    statFree: "Gratuito",

    // Features section
    featuresTitle: "Tudo que sua busca de emprego precisa",
    featuresSub: "Pare de controlar tudo em planilhas. Deixe a IA fazer o trabalho pesado.",

    // Feature cards
    feat1Title: "Match Inteligente de Habilidades",
    feat1Desc: "A IA analisa as descrições de vagas e calcula em tempo real o quanto suas habilidades se encaixam.",
    feat2Title: "Gerador de Carta de Apresentação",
    feat2Desc: "Gere cartas persuasivas e personalizadas que mencionam requisitos específicos da vaga.",
    feat3Title: "Painel de Candidaturas",
    feat3Desc: "Acompanhe cada candidatura de salva → enviada → entrevista → oferta em um só lugar.",
    feat4Title: "Insights com IA",
    feat4Desc: "Receba sugestões práticas de habilidades a desenvolver e como fortalecer seu perfil.",

    // How it works (landing)
    howTitle: "Funcionando em 60 segundos",
    step1Title: "Entre com o GitHub",
    step1Desc: "Um clique. Sem formulários. Sem cartão de crédito.",
    step2Title: "Cole uma descrição de vaga",
    step2Desc: "Copie do LinkedIn, Indeed ou qualquer site de vagas.",
    step3Title: "Receba seu score + carta de apresentação",
    step3Desc: "A IA retorna um score de 0 a 100, habilidades extraídas e uma carta personalizada.",

    // CTA
    ctaTitle: "Pronto para conseguir sua próxima vaga?",
    ctaSub: "Junte-se a desenvolvedores que usam o HireMe AI para candidatar-se com mais inteligência.",

    // Footer
    footerText: "Desenvolvido com Next.js · Prisma · OpenAI · Neon · Licença MIT ·",
    viewSource: "Ver Código",
  },
} as const;

export type Translations = {
  [K in keyof typeof translations.en]: (typeof translations.en)[K] extends (name: string) => string
    ? (name: string) => string
    : string | readonly { title: string; desc: string; tip: string }[];
};
