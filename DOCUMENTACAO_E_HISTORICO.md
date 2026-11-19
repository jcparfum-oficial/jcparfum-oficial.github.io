# 💎 JC PARFUM - Documentação Completa do Projeto & Histórico

Este documento reúne todas as informações, estratégias comerciais, precificação, credenciais e instruções técnicas alinhadas para o projeto da **JC Perfumes Árabes (JC Parfum)**.

---

## 📌 1. Dados do Cliente
* **Nome Comercial:** JC Perfumes Árabes / JC PARFUM (Imported · Premium)
* **Localização:** Macapá - Amapá (Atendimento local em Macapá, Santana e regiões próximas)
* **WhatsApp Comercial:** `+55 (96) 8119-7608`
* **Nicho de Mercado:** Perfumaria de luxo oriental (Dubai / Emirados Árabes) e importados franceses masculinos e femininos.
* **Identidade Visual:** Estilo *Dark Luxury* (Preto fosco, detalhes em ouro nobre, brasão clássico ornamentado).

---

## 💰 2. Estratégia Comercial & Precificação

### Quanto cobrar pelo projeto:
* **Valor Recomendado de Venda:** **R$ 750,00 a R$ 900,00** (Excelente para primeiro projeto e acessível para o lojista).
* **Condição de Pagamento:**
  * **50% de entrada (Sinal):** R$ 375,00 a R$ 450,00 para início e reserva da agenda.
  * **50% na entrega:** após colocar o site no ar e demonstrar funcionando no celular dele.

### Plano de Recorrência / Suporte Mensal (Opcional):
* **R$ 80,00 a R$ 120,00 / mês**:
  * Atualização de banners promocionais (Dia dos Namorados, Natal, Black Friday).
  * Cadastro de novos perfumes que chegarem de importação.
  * Suporte técnico e manutenção da hospedagem.

---

## 📲 3. Script de Abordagem para Fechar a Venda

Copie e envie para o WhatsApp do cliente (`96 8119-7608`) junto com o link demonstrativo:

> *"Fala, tudo bem? Acompanho a JC Perfumes Árabes aqui em Macapá e vi que você trabalha com perfumes de altíssimo padrão. Preparei uma prévia exclusiva de um catálogo online para seus clientes verem as fotos oficiais de estúdio, consultarem notas olfativas e já te chamarem no WhatsApp com o pedido pronto, facilitando suas vendas pelo Instagram e aqui na região.*
>
> *Dá uma olhada de como ficou no seu celular: [LINK_DO_SITE]*
>
> *Além disso, deixei um painel simples com senha para você mesmo atualizar preços e marcar o que está em estoque direto pelo celular, sem complicação. Se você curtir, consigo finalizar e colocar no ar no seu domínio próprio essa semana ainda!"*

---

## 🛠️ 4. Estrutura Técnica dos Arquivos

O projeto está todo dentro da pasta `jc-perfumes-arabes`:

```
jc-perfumes-arabes/
├── index.html                   # Vitrine pública para os clientes
├── admin.html                   # Painel com senha exclusivo do lojista
├── DOCUMENTACAO_E_HISTORICO.md # Este documento
└── assets/
    ├── css/
    │   └── style.css            # Estilo Dark Luxury (preto e dourado) responsivo
    ├── js/
    │   ├── products.js          # Base de dados dos perfumes e sincronização
    │   └── app.js               # Busca, filtros, modal e pedido no WhatsApp
    └── img/
        ├── logo.jpg             # Logo oficial da JC Parfum
        ├── real-musamam-white-intense.jpg
        ├── real-bareeq-al-dhahab.jpg
        ├── real-special-oud.jpg
        ├── real-luminous-vivid.jpg
        ├── real-avant-ruby.jpg
        ├── real-silver-scent.jpg
        └── real-hopeful.jpg
```

---

## 🔑 5. Acesso ao Painel do Lojista (`admin.html`)

O lojista tem acesso a um painel simples e intuitivo para não precisar de suporte técnico a todo momento:
* **URL:** `admin.html` (ou `seusite.com.br/admin.html`)
* **Usuário:** `jcparfum` *(ou `admin`)*
* **Senha Inicial:** `123456`

### O que o cliente consegue fazer:
1. Cadastrar novos perfumes (Nome, Marca, Categoria, Preço, Foto e Notas).
2. Alterar preços rapidamente em tempo real na tabela.
3. Ligar/desligar a chave **"Em Estoque"** (evita vender perfume esgotado).
4. Excluir perfumes descontinuados.

---

## 🧴 6. Perfumes Cadastrados Inicialmente

1. **Musamam White Intense (Lattafa)** – R$ 490,00 | Unissex | Frasco com cobra dourada.
2. **Bareeq Al Dhahab (Al Wataniah)** – R$ 360,00 | Masculino | Ouro de Dubai.
3. **Special Oud (Al Wataniah)** – R$ 350,00 | Unissex | Clássico oriental amadeirado.
4. **Luminous Vivid (Maison Alhambra)** – R$ 290,00 | Unissex | Radiante e sofisticado.
5. **Avant Ruby (Maison Alhambra)** – R$ 310,00 | Feminino | Frutas vermelhas e baunilha.
6. **Silver Scent Tradicional (Jacques Bogart)** – R$ 260,00 | Masculino | Clássico francês.
7. **Hopeful (Mega Collection)** – R$ 230,00 | Feminino | Floral suave e elegante.

---

## 🌐 7. Como Colocar o Site na Internet (R$ 0 de Custo de Servidor)

1. **Hospedagem Gratuita (Vercel ou Netlify):**
   * Acesse [Netlify Drop](https://app.netlify.com/drop).
   * Arraste a pasta `jc-perfumes-arabes` para dentro da tela do navegador.
   * Em 30 segundos o site já estará no ar com link seguro `https://...` e certificado SSL gratuito.
2. **Domínio Próprio (Pago pelo cliente se ele desejar):**
   * Registro no [Registro.br](https://registro.br) do endereço `jcperfumes.com.br` ou `jcparfum.com.br` por **R$ 40,00 / ano**.
   * Conecte o domínio à Vercel/Netlify nas configurações de DNS.
