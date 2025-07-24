# Sistema de Controle de Estoque

Um sistema completo de controle de estoque desenvolvido com Django, apresentando um design personalizado, funcionalidades CRUD completas e recursos interativos.

## ✨ Funcionalidades

* Dashboard com resumo do estoque (total de produtos, itens, etc.)
* CRUD completo (Criar, Ler, Atualizar, Deletar) para produtos.
* Página de detalhes para cada produto com descrição formatada.
* Sistema de autenticação completo com páginas de login e cadastro personalizadas.
* Busca de produtos em tempo real (AJAX).
* Upload de imagens para produtos.
* Mensagens de feedback para o usuário (sucesso, erro, etc.).
* Funcionalidade de "Desfazer" deleção.
* **Easter Eggs:** Um terminal interativo e um jogo da cobrinha escondidos na página de créditos!

## 🛠️ Tecnologias Utilizadas

* **Backend:** Python, Django
* **Frontend:** HTML5, CSS3 (com Flexbox/Grid), JavaScript (Vanilla JS)
* **Banco de Dados:** MySQL
* **Bibliotecas Django:** `django-ckeditor`, `python-decouple`, `Pillow`

## 🚀 Como Executar Localmente

1.  Clone o repositório: `git clone https://github.com/Zaiknown/stock_design`
2.  Crie e ative o ambiente virtual: `python -m venv venv` e `source venv/bin/activate`
3.  Instale as dependências: `pip install -r requirements.txt` *(você precisa criar este arquivo!)*
4.  Configure as variáveis de ambiente: copie o `env.example` para `.env` e preencha com suas credenciais.
5.  Aplique as migrações: `python manage.py migrate`
6.  Crie um superusuário: `python manage.py createsuperuser`
7.  Execute o servidor: `python manage.py runserver`