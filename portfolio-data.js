window.portfolioData = {
  highlights: [
    { id: "highlight-01", title: "Midnight Drive", category: "Vídeo / Automotivo", kind: "video", image: "https://images.unsplash.com/photo-1629019625736-89ff131a723c?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-02", title: "Casa Brutalista", category: "Design / Arquitetura", kind: "still", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-03", title: "Backstage", category: "Conteúdo / Música", kind: "video", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-04", title: "Pulse Festival", category: "Evento / Aftermovie", kind: "video", image: "https://images.unsplash.com/photo-1570489679487-936e2897d793?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-05", title: "New Uniform", category: "Foto / Editorial", kind: "still", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-06", title: "Frame by Frame", category: "Motion / Digital", kind: "video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-07", title: "Studio Notes", category: "Projeto / Marca", kind: "still", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-08", title: "City After Dark", category: "Vídeo / Lifestyle", kind: "video", image: "https://images.unsplash.com/photo-1490274494753-fd4f84681e7c?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-09", title: "Objects 01", category: "Design / Peça", kind: "still", image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-10", title: "The Crowd", category: "Conteúdo / Evento", kind: "video", image: "https://images.unsplash.com/photo-1580751314005-bfd5224adfdc?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-11", title: "Collection 25", category: "Foto / Moda", kind: "still", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=82" },
    { id: "highlight-12", title: "Focus Pull", category: "Vídeo / Comercial", kind: "video", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1100&q=82" }
  ],
  services: [
    { id: "service-01", title: "Edição de vídeo", description: "Montagem, ritmo, cor, som e finalização para diferentes formatos." },
    { id: "service-02", title: "Direção criativa", description: "Conceito, linguagem visual e acompanhamento do projeto do início ao fim." },
    { id: "service-03", title: "Design & motion", description: "Peças digitais, identidade visual e animações que fortalecem a mensagem." },
    { id: "service-04", title: "Conteúdo digital", description: "Conteúdo para marcas, eventos e redes sociais com intenção e consistência." }
  ],
  projects: [
    {
      id: "only-cars-club", title: "Only Cars Club", category: "Branding / Automotivo", year: "2026", logoImage: "only-logo.webp", logoAlt: "Only Cars Club", logoClass: "only",
      chapters: [
        { title: "O universo do Only", label: "Visão geral", scene: "overview", mark: "Only", description: "Uma visão geral do projeto, da comunidade e da linguagem criada para conectar cultura automotiva, evento e produto." },
        { title: "Uma marca que evoluiu", label: "Rebranding", scene: "branding", mark: "Rebrand", description: "Evolução do posicionamento, do símbolo e da assinatura para construir uma presença mais forte e reconhecível." },
        { title: "Sistema visual", label: "Identidade visual", scene: "identity", mark: "ID visual", description: "Cores, tipografia, grafismos e regras que mantêm a marca consistente em diferentes formatos e pontos de contato." },
        { title: "Personagem e atitude", label: "Mascote 3D", scene: "mascot", mark: "Mascote", description: "Desenvolvimento do personagem, suas poses, expressões e aplicações como uma extensão da personalidade do Only." },
        { title: "Movimento e atmosfera", label: "Vídeo", scene: "video", mark: "Play", description: "Conteúdos audiovisuais que traduzem energia, velocidade e o clima dos encontros do Only." },
        { title: "A marca no mundo real", label: "Aplicações", scene: "applications", mark: "Aplicações", description: "Evento, social, roupas, copos, adesivos e outras peças que expandem a identidade para além da tela." }
      ]
    },
    {
      id: "fundacao-bradesco", title: "Fundação Bradesco", category: "Editorial / Institucional", year: "2025", logoText: "fundação|bradesco", logoClass: "foundation", placeholder: true,
      chapters: [
        { title: "Contexto do projeto", label: "Visão geral", scene: "overview", mark: "FB", description: "Conteúdo e imagens provisórios para demonstrar como um segundo case funciona dentro da mesma experiência." },
        { title: "Clareza institucional", label: "Identidade", scene: "identity", mark: "Sistema", description: "Exemplo de capítulo para apresentar linguagem visual, hierarquia e consistência de comunicação." },
        { title: "Publicações e materiais", label: "Editorial", scene: "editorial", mark: "Editorial", description: "Espaço provisório para revistas, livros, relatórios, peças digitais e demais aplicações editoriais." }
      ]
    },
    {
      id: "projeto-xyz", title: "Projeto XYZ", category: "Branding / Digital", year: "2025", logoText: "XYZ|studio", logoClass: "xyz", placeholder: true,
      chapters: [
        { title: "Uma ideia em construção", label: "Visão geral", scene: "overview", mark: "XYZ", description: "Projeto provisório usado para validar a vitrine de logos e o visualizador interno de cases." },
        { title: "Linguagem da marca", label: "Branding", scene: "branding", mark: "Brand", description: "Exemplo de apresentação do conceito, assinatura, tipografia e elementos principais da marca." },
        { title: "Presença digital", label: "Aplicações", scene: "applications", mark: "Digital", description: "Exemplo de capítulo para peças sociais, interfaces e campanhas digitais." }
      ]
    }
  ]
};
