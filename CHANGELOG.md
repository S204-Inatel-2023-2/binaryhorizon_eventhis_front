# Changelog Eventhis
## Versão 1.0 (React js + Next js)
- [v 1.0.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/3) (24/ago)
    - Criação da estrutura base do projeto Next.js.
    - Criação do Dockerfile e docker-compose.
    - Cadastro e login de usuários.
    - Armazenamento de dados localmente, via json.
    ---
- [v 1.0.1](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/4) (25/ago)
    - Atualização de versões das dependências.
    - Instalação do Bootstrap.

## Versão 2.0 (Ionic + Angular)
- [v 2.0.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/9) (10/set)
    - Alteração do framework para Ionic, visando cross platform app.
    - Criação das páginas iniciais de carregamento, login e registro.
    - Criação das páginas de início e comunidade.
    - Configuração dos arquivos dockerfile e docker-compose.
    - Registro e Login funcionando localmente, de maneira modular.

- [v 2.1.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/10) (10/set)
    - Integração com a API.
    - Criação da página de perfil, mostrando os dados do usuário.
    - Recebimento de um link no campo de foto, durante o registro, que é mostrado na página de perfil.
    - Correção do cabeçalho, contendo agora a barra de pesquisa.
    - Responsividade nos modais de login, registro e perfil.
    - Atualização de pacotes descontinuados.
    - Implementação de serviços de autenticação, comunicação e armazenamento local, para rota de dados entre back-end e front-end.
    - Implementação de serviços de autorização, para correta exibição de telas públicas e restritas.
    - Visualização da atualização de páginas implementada.

- [v 2.1.1](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/12) (15/set)
    - Correção dos formulários de registro e login.
    - Mudança da versão consumida da API para v2.
    - Criação da estrutura de rota e páginas filhas em profile, levando login e registro para sua rota.
    - Atualização de pacotes e bibliotecas descontinuadas.

- [v 2.2.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/16) (21/set)
    - Mudança estrutural de pastas (mudança de pasta raíz).

- [v 2.2.1](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/25) (23/set)
    - Correção de bugs de redirecionamento.
    - Implementação de plugins de PWA (Progressive Web Apps).
    - Instalação de pacotes de capacitor para Android.
    - Implementação de sistema de captura e envio de fotos.

- [v 2.2.2](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/29) (09/out)
    - Correção de bugs de acesso de dados do usuário.
    - Correção de temas.
    - Correção da barra de ferramentas (toolbar).
    - Derivação de código em componentes.
    - Página de eventos dinâmica, recebendo dados do back-end.
    - Página de criação de eventos criada e funcionando.
    - Implementação de página de maiores detalhes do evento.
    - Atualização de pacotes e bibliotecas descontinuadas.

- [v 2.3.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/37) (11/out)
    - Instalação de pacotes de capacitor para iOS.
    - Mudança de design da página de perfil.
    - Página de comunidade dinâmica, recebendo dados do back-end.
    - Visualização de perfil de outras pessoas.
    - Plugin do Swiper adicionado, para design de slides.

- [v 2.4.0](https://github.com/S204-Inatel-2023-2/binaryhorizon_eventhis_front/pull/38) (11/out)
    - Armazenamento de imagens de eventos e usuários em um bucket S3 da AWS.