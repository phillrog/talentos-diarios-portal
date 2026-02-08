🚀 Talentos Diários Portal
==========================

![td_p2](https://github.com/user-attachments/assets/9dd00c05-1343-4664-a785-8bab1ff1eaf6)


Uma plataforma de talentos **#OpenToWork**, projetada para recrutadores identificarem candidatos qualificados disponíveis no mercado. O portal é atualizado diariamente via automação, conforme cadastro feito pelos candidatos em [Registro de candidato](https://registrar-talentos-diarios.streamlit.app/).

📋 O que o projeto faz?
-----------------------

-   **Notificações Push:** Recrutadores recebem alertas via OneSignal sempre que a lista é atualizada.

-   **Interface de Alta Performance:** Listagem rápida, responsiva e com busca em tempo real.

-   **Acesso Direto:** Links diretos para perfis e download de catálogo em PDF.

-   **Exibição Justa:** Sistema de ordenação aleatória (Shuffle) a cada acesso para dar visibilidade igual a todos os candidatos.

* * * * *

🛠️ Tecnologias & Bibliotecas
-----------------------------

### **Frontend (Core)**

-   **React + Vite:** Framework de alto desempenho para uma experiência de usuário fluida.

-   **TypeScript:** Garantia de tipos e segurança no desenvolvimento.

-   **Tailwind CSS:** Estilização utilitária para um design moderno, escuro (Dark Mode) e responsivo.

### **Integrações & UI**

-   **OneSignal (`react-onesignal`):** Gerenciamento completo de notificações push nativas no navegador.

-   **ReactBits:** Componentes de UI animados e interativos para um visual diferenciado.

-   **Lucide React:** Conjunto de ícones leves e consistentes.

-   **Framer Motion:** Animações de interface e transições suaves.

### **Backend & Automação**

-   **Vercel:** Hospedagem de alta disponibilidade com deploy contínuo.

* * * * *

⚙️ Variáveis de Ambiente
------------------------

O projeto utiliza as seguintes variáveis para configuração:

Bash

```
VITE_ONESIGNAL_APP_ID=seu_id_aqui
VITE_USE_MOCK_CANDIDATOS=false # Define se usa dados locais ou API

```

* * * * *

🚀 Como rodar localmente
------------------------

    Bash

    ```
    npm run dev

    ```

* * * * *

🤖 Automação de Dados
---------------------

A atualização acontece via GitHub Actions seguindo o fluxo:

1.  Executa o script Python para minerar/limpar dados.

2.  Atualiza os arquivos `candidatos.json`, feed.xml e `talentos_diarios.pdf` no repositório https://github.com/phillrog/talentos-diarios.

3.  Dispara uma chamada via `curl` para a API REST do OneSignal, notificando os usuários inscritos.

⚠️ Disclaimer
Este projeto é uma iniciativa de estudo e portfólio. 
O cadastro e a exibição na vitrine visam complementar sua visibilidade, 
não garantindo contratações ou propostas.




