const { createApp } = Vue;

// src/app.js
export default {
  data() {
    return {
      isDarkMode: true,
      user: {
        name: 'Ediberto Santana', 
        role: 'Desenvolvedor Full-Stack', 
        bio: 'Especialista em ecossistema Python e Vue.js focado em performance.' 
      },
      menuLinks: [
        { text: 'Sobre', url: '#sobre' },
        { text: 'Projetos', url: '#projetos' },
        { text: 'Contato', url: '#contato' }
      ],
      projetos: [],
      showWhatsappAlert: false,
      contato: {
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      },
      projetosData: [
        {
          id: 1,
          titulo: 'OOH Campaign Manager', 
          descricao: 'Dashboard para controle de anúncios externos com métricas em tempo real.', 
          imagem: './assets/img/ooh.png',
          techs: ['Python', 'FastAPI', 'Vue.js', 'Postgres']
        },
        {
          id: 2,
          titulo: 'Task Kanban', 
          descricao: 'Aplicação de produtividade com colunas arrastáveis e persistência em banco.', 
          imagem: './assets/img/kanban.png',
          techs: ['Flask', 'JavaScript', 'Bootstrap']
        }
      ],
      techStack: [
        {
          titulo: 'Backend',
          icone: 'fab fa-python',
          descricao: 'Python, Flask, FastAPI e integração com Redis/Celery.',
          velocidade: '0.5',
          tags: ['Python', 'Flask', 'SQL', 'Redis']
        },
        {
          titulo: 'Frontend',
          icone: 'fab fa-vuejs',
          descricao: 'Interfaces modernas com Vue.js, JavaScript e Bootstrap.',
          velocidade: '1.2',
          tags: ['Vue 3', 'JS', 'CSS3', 'Bootstrap']
        },
        {
          titulo: 'Infra & TI',
          icone: 'fas fa-server',
          descricao: 'Experiência técnica operacional e suporte em mídia OOH.',
          velocidade: '0.8',
          tags: ['Hardware', 'Redes', 'Infra']
        }
      ]
    }
  },

  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
    },
    applyTheme() {
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    },
    initParallax() {
      
      if (typeof Rellax !== 'undefined') {
        new Rellax('.rellax', {
          center: true,
          breakpoints: [576, 768, 1201]
        });
      }
    },
    fecharWhatsapp() {
        this.showWhatsappAlert = false;
        // Grava o tempo atual + 15 minutos
        const expiraEm = Date.now() + (1 * 1 * 1000);
        localStorage.setItem('whatsapp-hide-until', expiraEm);
        console.log("[WhatsApp] Usuário fechou o alerta. Bloqueado por 15 minutos.");
    },   
    enviarMensagem() {
        console.log("Formulário enviado:", this.contato);
        alert(`Obrigado, ${this.contato.nome}! Sua mensagem foi enviada.`);
        this.contato = { nome: '', email: '', assunto: '', mensagem: '' };
    }
  },

  mounted() {
    
    this.$nextTick(() => {
      setTimeout(() => {
        this.initParallax();
      }, 200);
    });

    // 2. Aplica tema salvo pelo usuário
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
    this.applyTheme();

    
    setTimeout(() => {
      this.projetos = this.projetosData;
    }, 100);

    // 4. Lógica Inteligente do WhatsApp (15 min de espera se fechado)
   const gerenciarAlerta = () => {
        const esconderAte = localStorage.getItem('whatsapp-hide-until');
        const agora = Date.now();

        // 1. VERIFICAÇÃO CRUCIAL: Se ainda não deu o tempo de 15min, encerra a função aqui.
        if (esconderAte && agora < parseInt(esconderAte)) {
            const minutosRestantes = Math.round((parseInt(esconderAte) - agora) / 15000);
            console.log(`[WhatsApp] Alerta bloqueado por mais ${minutosRestantes} minutos.`);
            return; 
        }

        // 2. Se passou da trava, exibe o alerta
        console.log("[WhatsApp] Tempo de espera expirou. Exibindo alerta...");
        this.showWhatsappAlert = true;

        // 3. Remove automaticamente após 20 segundos
        setTimeout(() => {
            this.showWhatsappAlert = false;
        }, 20000);
    };

    // Tenta mostrar o alerta pela primeira vez após 5 segundos da página aberta
    setTimeout(gerenciarAlerta, 5000);
  }
}