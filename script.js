// Para editar o cardápio, basta alterar os dados abaixo.
// "imagem" é o caminho da foto (pasta imagens). Se não existir, aparece um desenho.
// "destaque" é opcional e mostra uma etiqueta no item.
const cardapio = {
  "Palha Italiana": [
    {
      nome: "Ninho com Oreo Gourmet",
      imagem: "imagens/ninho-oreo-gourmet.jpeg",
      descricao: "O queridinho da casa, deliciosa palha italiana de ninho com generosos pedaços de oreo, todo coberto por uma casquinha de chocolate maravilhosa! Para adoçar o seu dia <3",
      preco: 18.75,
      destaque: "O queridinho da casa"
    },
    {
      nome: "Ninho com Oreo",
      imagem: "imagens/ninho-oreo.png",
      descricao: "Deliciosa palha italiana de ninho com oreo feito com carinho e cheio de sabor!",
      preco: 16.50
    },
    {
      nome: "Tradicional",
      imagem: "imagens/tradicional.jpeg",
      descricao: "Palha italiana de brigadeiro e coberta com cacau em pó, pra quem adora o gostinho tradicional de chocolate!",
      preco: 16.00
    },
    {
      nome: "Ninho",
      imagem: "imagens/ninho.jpeg",
      descricao: "Palha italiana de ninho feita com pedaços de bolacha passatempo para se deliciar!",
      preco: 16.50
    }
  ],
  "Torta doce": [
    {
      nome: "Torta doce de limão",
      imagem: "imagens/torta-limao.jpeg",
      descricao: "Uma saborosa torta doce para quem gosta de doces de limão.",
      preco: 20.00
    },
    {
      nome: "Torta doce de chocolate",
      imagem: "imagens/torta-chocolate.png",
      descricao: "Nossa torta doce favorita! Feita com cacau e raspas de chocolate no topo, com a cremosidade do creme de leite e doçura do leite condensado.",
      preco: 20.00,
      destaque: "Nossa favorita"
    }
  ],
  "Brigadeiros": [
    {
      nome: "Gourmet",
      imagem: "imagens/brigadeiro-gourmet.jpg",
      descricao: "Delicioso brigadeiro tradicional coberto por granulado gourmet, acompanha 5 unidades.",
      preco: 20.00
    }
  ]
};

const abas = document.getElementById("abas");
const lista = document.getElementById("lista");
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

const ICONE = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="12" fill="#B3124F"/><path d="M20 32 8 22v20zM44 32l12-10v20z" fill="#B3124F"/></svg>';

function criarFoto(item) {
  const foto = criar("div", "foto");
  const img = document.createElement("img");
  img.src = item.imagem;
  img.alt = item.nome;
  img.loading = "lazy";
  img.addEventListener("error", () => {
    img.remove();
    foto.classList.add("sem-foto");
    foto.innerHTML = ICONE;
  });
  foto.append(img);
  return foto;
}

function mostrar(categoria) {
  abas.querySelectorAll(".aba").forEach(b =>
    b.setAttribute("aria-selected", String(b.dataset.categoria === categoria))
  );

  lista.replaceChildren();
  lista.className = "lista-nova";

  cardapio[categoria].forEach(item => {
    const art = criar("article", "item");
    const corpo = criar("div", "corpo");
    const titulo = criar("div", "linha-titulo");
    titulo.append(
      criar("h2", "nome", item.nome),
      criar("span", "pontilhado"),
      criar("span", "preco", moeda.format(item.preco))
    );
    corpo.append(titulo, criar("p", "desc", item.descricao));
    if (item.destaque) corpo.append(criar("span", "destaque", item.destaque));
    art.append(criarFoto(item), corpo);
    lista.append(art);
  });
}

Object.keys(cardapio).forEach((categoria, i) => {
  const b = criar("button", "aba", categoria);
  b.type = "button";
  b.role = "tab";
  b.dataset.categoria = categoria;
  b.addEventListener("click", () => mostrar(categoria));
  abas.append(b);
});

mostrar(Object.keys(cardapio)[0]);
document.getElementById("ano").textContent = new Date().getFullYear();
