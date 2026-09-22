# Tags do site da Mira Vest

Cópia do CSS e do JS que ficam nas **Tags** do painel da Convertr.

## Por que isso existe

O painel da Convertr não guarda histórico. Se uma edição quebrar o site, não tem
como voltar: só refazendo de memória. Aqui cada mudança fica com data, autor e o
que mudou, e dá pra voltar em qualquer versão.

## A regra que não se quebra

**Este repositório é o original. O painel é só onde a coisa entra no ar.**

Ordem certa:

1. Edita o arquivo aqui
2. Copia o conteúdo inteiro
3. Cola na tag correspondente do painel e salva
4. Confere no site

Se alguém editar direto no painel e não trazer pra cá, os dois se separam e o
histórico vira mentira. Quando isso acontecer, copia do painel pra cá antes de
mexer em qualquer coisa.

## O que é cada arquivo

| Arquivo | Onde fica no painel | O que faz |
|---|---|---|
| `00_tag_geral.css` | a tag grande de CSS do site | tudo: fontes, header, vitrines, barra do topo, barra do cupom |
| `02_cabecalho_vitrines.css` | tag de CSS com `/* CABECALHO */` | o bloco "JÁ DISPONÍVEL / Primavera / Verão" e a grade das vitrines |
| `03_tag_nova_colecao.css` | campo CSS da tag "Pré-lançamento V27" | fundo escuro e letra clara do selo nos produtos |
| `04_barra_carregando.js` | **tag de JS**, fim do body | a barrinha de carregamento no topo (o CSS dela está no 00) |

A barra de apelos (três avisos parados) vive **dentro** do `00_tag_geral.css`,
não é tag separada. Procure o comentário `BARRA DE APELOS` lá dentro.

> **Conflito conhecido:** `00_tag_geral.css` e `02_cabecalho_vitrines.css` mexem
> os dois em `.multi-sliders__1`. Um manda em flex com três colunas, o outro em
> grade. Hoje vence o que a Convertr carrega por último. Vale unificar quando
> sobrar tempo.


## A barra de carregamento (04_barra_carregando.js)

**Por que existe.** Medido em 22/09/2026: um clique interno leva de 3,8 a 5,9
segundos até a URL mudar, e nesse tempo nada acontece na tela. O Nuxt tem uma
barra nativa e ela não está no ar (`.nuxt-progress` não existe na página). A
cliente clica, o site parece morto, ela clica de novo ou desiste. A lentidão é
do servidor da Convertr; isto só avisa que está vindo.

**Como colar.** Tag de tipo JavaScript, ativa, mesma posição e páginas da tag
do "F5 volta pro topo", que funciona e serve de gabarito. O conteúdo é o
arquivo inteiro, cru.

**Três coisas que NÃO podem estar no que você cola:**

1. `<script>` e `</script>`. A Convertr põe sozinha. Se colar, quebra.
2. Sinal de menor-que em qualquer lugar. O injetor corta o código ali.
3. **Comentários.** Nem `/* */`. Em 22/09 o comentário do topo vazou para
   dentro de um seletor da própria Convertr e derrubou o `querySelectorAll`
   dela: `["tagger"], /*[data-hid]' is not a valid selector`. Por isso este
   arquivo não tem nenhum comentário, e a explicação vive aqui no README.

**O CSS da barra** fica no `00_tag_geral.css`, procure por `mv-carregando`.
Sem ele a barra existe mas é invisível.

## Cuidados com o injetor da Convertr

- Só comentário `/* assim */`. Comentário de barra dupla quebra, porque o
  injetor achata tudo numa linha só.
- Em JS, o injetor corta no primeiro `<`. Não pode ter `<` solto no código.
  O `04_barra_carregando.js` foi escrito sem nenhum: toda comparação está
  ao contrário, com maior-que. Conferido: zero ocorrências no arquivo.
- O painel aceita o arquivo inteiro colado de uma vez.
