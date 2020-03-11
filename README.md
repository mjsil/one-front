**Versão do React:** 16.12.0

Nesse diretório, executar:

### `yarn start / npm start`

Executa o app em modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para ver o app no navegador.

## `Estrutura dos diretórios`

### components ###

Componentes de páginas específicas e elementos de interface do usuário. Não manipula
estados.

### pages ###

Conjunto de todas as telas que irão fazer manipulações de estados e processos de autenticação.

#### Auth #### 

Tela inicial. Responsável por renderizar e validar o form de acesso ao usuário. 

#### Console/Layout ####

Página que define a estrutura do conteúdo do console (appbar, drawer e content).

#### Console/Layout/Content ####

Switch de rotas de todos os componentes que estão em /console e, que serão exibidos como conteúdo principal. Além disso, organiza o display de elementos de interface do usuário.

#### Console/Layout/(*) ####

Conjunto de conteúdos que serão exibidos em Layout/content quando determinada rota é alcançada.

### services ###

Realiza processos de validação e autenticação JWT.
