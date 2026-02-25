const { createApp } = Vue

createApp({
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
        // 1. Deixamos a lista que o HTML usa vazia para a animação disparar
        projetos: [],

        showWhatsappAlert: false, // Começa escondido
        
        // 2. Criamos a 'projetosData' com seus projetos reais
        projetosData: [
            {
                id: 1,
                titulo: 'OOH Campaign Manager',
                descricao: 'Dashboard para controle de anúncios externos com métricas em tempo real.',
                imagem: './img/projeto-ooh.jpg',
                techs: ['Python', 'FastAPI', 'Vue.js', 'Postgres']
            },
            {
                id: 2,
                titulo: 'Task Kanban',
                descricao: 'Aplicação de produtividade com colunas arrastáveis e persistência em banco.',
                imagem: './img/kanban.jpg',
                techs: ['Flask', 'JavaScript', 'Bootstrap']
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
        }
    },

    mounted() {
        // Aplica o tema
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
        }
        this.applyTheme();

        // 3. Agora o Vue encontra 'this.projetosData' e joga para 'this.projetos'
        setTimeout(() => {
            this.projetos = this.projetosData;
        }, 100);
        // Função para controlar o ciclo de exibição
        const gerenciarAlerta = () => {
            // 1. Mostra o alerta
            this.showWhatsappAlert = true;

            // 2. Após 1 minuto (60.000ms), esconde o alerta
            setTimeout(() => {
                this.showWhatsappAlert = false;

                // 3. Após mais 1 minuto escondido, chama a função novamente (Loop)
                setTimeout(gerenciarAlerta, 20000); 
                
            }, 20000); 
        };

        // Inicia o ciclo após os primeiros 5 segundos da página aberta
        setTimeout(gerenciarAlerta, 5000);
    }
}).mount('#app')