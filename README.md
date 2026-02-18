Olá! Este é o repositório da interface web do sistema de controle de estoque e produção, desafio FullStack Jr da Projedata. O foco principal deste projeto foi criar uma experiência de usuário fluida, priorizando a visualização clara dos produtos que trazem maior retorno financeiro para a indústria.

## TÉCNOLOGIAS UTILIZADAS
- React.js (via Vite)
- JavaScript
- Axios
- CSS
- Jest

## ARQUITETURA DO PROJETO
A aplicação foi estruturada de forma modular para facilitar a manutenção e escalabilidade:
- Pages: Telas principais
- Components: Elementos reutilizáveis
- Routes: Para setar rotas
- API: Confuguração de API e Services
- Test: configuração de testes

## Responsividade e UI/UX
A aplicação foi pensada no modelo Mobile-First

Todo o layout foi construído utilizando CSS puro.

Validações de formulários e retornos da API são comunicados via alertas, garantindo que o usuário saiba exatamente o resultado de suas ações.

## FUNCIONALIDADES IMPLEMENTADAS 
- Gestão de Estoque: CRUD completo das matérias-primas com controle de estoque.
- Engenharia de Produto: Interface para associar matérias-primas a produtos, incluindo quantidade necessária para produção.
- Sugestão de Produção: Listagem de quais produtos podem ser fabricados com o estoque atual, priorizando maior valor do produto e exibindo lucro total estimado.

## TESTES
Foram feitos testes unitários para os componentes presentes no projeto.
