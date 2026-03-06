# DESAFIO QA – BEEDOO 2026

## 📌 1. Objetivo da aplicação

A aplicação tem como objetivo permitir a gestão de cursos em uma plataforma educacional, possibilitando que usuários cadastrem, visualizem e gerenciem cursos disponíveis no sistema.

A plataforma parece ser utilizada para:

* Cadastro de novos cursos
* Visualização de cursos cadastrados
* Organização de conteúdo educacional
* Consulta de cursos disponíveis

---

# 🔎 2. Exploração da aplicação

Após explorar a aplicação, foram identificados os seguintes fluxos principais:

## 📚 Cadastro de Curso

Permite ao usuário criar um novo curso informando dados como:

* Nome do curso
* Descrição
* Categoria
* Instrutor
* Carga horária

---

## 📄 Listagem de Cursos

O sistema apresenta uma listagem com os cursos cadastrados permitindo:

* Visualizar cursos existentes
* Navegar pelos cursos cadastrados

---

## 🔍 Busca ou Filtragem

O usuário pode buscar cursos por:

* Nome
* Categoria
* Palavra-chave

---

# ⚠️ 3. Pontos Críticos para Testes

Os pontos mais críticos identificados são:

### Cadastro de Cursos

* Entrada de dados do usuário
* Possibilidade de dados inválidos

### Validação de Campos

* Nome do curso vazio
* Descrição inválida
* Categoria não selecionada

### Listagem de Cursos

* Cursos duplicados
* Falha ao carregar lista
* Exibição incorreta de dados

### Persistência de Dados

Verificar se os cursos cadastrados são realmente salvos e exibidos na listagem.

---

# 🧪 4. Cenários de Teste

## Cenário 1 – Cadastro de Curso com Sucesso

DADO que o usuário acessa a tela de cadastro de curso

QUANDO ele preenche todos os campos obrigatórios corretamente

E clica no botão salvar

ENTÃO o sistema deve cadastrar o curso com sucesso

E o curso deve aparecer na listagem de cursos

---

## Cenário 2 – Cadastro com Campo Obrigatório Vazio

DADO que o usuário acessa a tela de cadastro

QUANDO tenta cadastrar um curso sem preencher o nome

ENTÃO o sistema deve exibir uma mensagem de erro

E impedir o cadastro

---

## Cenário 3 – Cadastro com Dados Inválidos

DADO que o usuário acessa a tela de cadastro

QUANDO preenche o campo carga horária com texto

ENTÃO o sistema deve impedir o cadastro

E exibir mensagem de validação

---

## Cenário 4 – Listagem de Cursos

DADO que existem cursos cadastrados

QUANDO o usuário acessa a página de cursos

ENTÃO o sistema deve exibir todos os cursos cadastrados

---

# ❌ Cenários Negativos

* Cadastro com todos os campos vazios
* Inserção de caracteres especiais
* Inserção de texto extremamente longo
* Cadastro duplicado

---

# 🐞 5. Registro de Bugs

Os bugs encontrados estão documentados no arquivo:

```
/bugs/registro-de-bugs.md
```

---

# 📊 Casos de Teste

Os cenários detalhados estão documentados na planilha:

```
Google Sheets (Casos de Teste)
(https://docs.google.com/spreadsheets/d/14TMcoub9lTts0xJcgaBQgqPH6wxfzKCMFl0rSccYeWQ/edit?usp=sharing)
```

---

# 📸 Evidências de Teste

As evidências da execução dos testes podem ser encontradas em:

```
Google Drive
(https://drive.google.com/drive/folders/194-ewGg8OxsLDWGAzRz09BE3mxaQbtfP?usp=drive_link)
```

# 🧪 Estratégia de Teste

Foram utilizados:

* testes manuais
* testes exploratórios
* cenários positivos
* cenários negativos
* validação de campos

---

# 🚀 Conclusão

A aplicação possui funcionalidades básicas de gestão de cursos, porém apresenta oportunidades de melhoria relacionadas a:

* validação de dados
* tratamento de erros
* melhoria na experiência do usuário

A criação de cenários estruturados permite identificar falhas e melhorar a qualidade do sistema.
