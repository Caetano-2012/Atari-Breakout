<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=0:000000,100:0a0a0a&height=20&section=header"/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00ffff,50:0080ff,100:00ffff&height=240&section=header&text=BREAKOUT&fontSize=80&fontColor=000&fontAlignY=42&animation=twinkling&desc=Destrua%20os%20tijolos.%20Domine%20o%20placar.%20Não%20perca%20a%20bola.&descAlignY=65&descSize=16&fontAlign=50&descAlign=50"/>

<br/>

![JavaScript](https://img.shields.io/badge/JavaScript-000000?style=for-the-badge&logo=javascript&logoColor=00ffff)
![p5.js](https://img.shields.io/badge/p5.js-000000?style=for-the-badge&logo=p5dotjs&logoColor=00ffff)
![HTML5](https://img.shields.io/badge/HTML5-000000?style=for-the-badge&logo=html5&logoColor=00ffff)
![Status](https://img.shields.io/badge/▶_PLAYABLE-000000?style=for-the-badge&logoColor=00ffff&color=000000&labelColor=000000)
![Score](https://img.shields.io/badge/TOP_SCORE-∞-000000?style=for-the-badge&logoColor=00ffff)

</div>

<br/>


---

## SOBRE O PROJETO

Recriação do clássico arcade **Breakout** do Atari (1976), construída do zero com **JavaScript puro** e **p5.js** para renderização no canvas.

O projeto foi desenvolvido como exercício prático para consolidar conceitos fundamentais de programação orientada a eventos e lógica de jogos. O resultado é um jogo funcional e fluído com mecânicas fiéis ao original: bola que acelera progressivamente conforme destrói tijolos, paddle controlado pelo mouse com resposta angular, tijolos coloridos que descem lentamente aumentando a pressão, e sistema de vidas com placar integrado.

<br/>

---

## TECNOLOGIAS

<div align="center">

| | Tecnologia | Versão | Função |
|:---:|:---:|:---:|:---|
| ◈ | JavaScript | ES6+ | Lógica completa do jogo |
| ◈ | p5.js | 1.11.11 | Renderização no canvas e game loop |
| ◈ | p5.sound | 1.11.9 | Efeitos sonoros sincronizados |
| ◈ | HTML5 | 5 | Estrutura da página |

</div>

<br/>

---

## FUNCIONALIDADES

<details>
<summary><b>◈ Controles e Jogabilidade</b></summary>
<br/>

- Controle do paddle via mouse — responsivo e preciso
- Física angular: a bola desvia de forma diferente dependendo de onde bate no paddle
- Velocidade máxima limitada (`maxSpeed = 12`) para manter o equilíbrio entre desafio e jogabilidade
- Sistema de 3 vidas com reinício de posição entre rodadas

</details>

<details>
<summary><b>◈ Campo de Jogo</b></summary>
<br/>

- 32 tijolos por fase (4 linhas x 8 colunas) com cores aleatórias
- Tijolos descem gradualmente — quanto mais tempo passa, mais difícil fica
- Derrota imediata se os tijolos alcançam o paddle

</details>

<details>
<summary><b>◈ Progressão e Feedback</b></summary>
<br/>

- Placar em tempo real (+5 pontos por tijolo destruído)
- Bola acelera 5% a cada tijolo acertado
- Efeitos sonoros: `hit.mp3` (paddle) e `click.mp3` (tijolos)
- Tela de Game Over e tela de vitória ao destruir todos os tijolos

</details>

<br/>

---

## APRENDIZADOS

<details>
<summary><b>◈ Game Loop com p5.js</b></summary>
<br/>

Entender a separação entre `setup()` (inicialização única) e `draw()` (loop de 60fps) foi fundamental para estruturar a lógica corretamente — estado do jogo, física e renderização convivem no mesmo ciclo.

</details>

<details>
<summary><b>◈ Detecção de Colisão AABB</b></summary>
<br/>

Colisão entre círculo (bola) e retângulos (tijolos e paddle) usando bounding box — simples, eficiente e preciso para jogos 2D.

```js
if (ball.x + ball.r > b.x && ball.x - ball.r < b.x + b.w &&
    ball.y + ball.r > b.y && ball.y - ball.r < b.y + b.h) {
    ball.vy *= -1;
}
```

</details>

<details>
<summary><b>◈ Física Angular do Paddle</b></summary>
<br/>

A diferença entre o centro do paddle e o ponto de impacto da bola gera ângulos de rebote realistas e estratégicos — quanto mais longe do centro, mais inclinado o desvio.

```js
let diff = ball.x - paddle.x;
ball.vx = diff * 0.1;
```

</details>

<details>
<summary><b>◈ Mutação Reversa de Array</b></summary>
<br/>

`bricks.splice(i, 1)` dentro de um loop exige iteração de `bricks.length - 1` até `0` — caso contrário, ao remover um elemento, o índice pula o próximo inadvertidamente.

```js
for (let i = bricks.length - 1; i >= 0; i--) {
    // seguro remover bricks[i] aqui
}
```

</details>

<details>
<summary><b>◈ Controle de Velocidade Progressiva</b></summary>
<br/>

Incremento de 5% em `vx` e `vy` a cada colisão com tijolo, com `constrain()` impedindo velocidades absurdas — tensão crescente sem perder o controle.

```js
ball.vx *= 1.05;
ball.vy *= 1.05;
ball.vx = constrain(ball.vx, -maxSpeed, maxSpeed);
ball.vy = constrain(ball.vy, -maxSpeed, maxSpeed);
```

</details>

<br/>

---

## COMO JOGAR

```
PASSO 1   Clone o repositório e abra index.html no navegador
PASSO 2   Clique na tela para lançar a bola
PASSO 3   Mova o mouse para controlar o paddle
PASSO 4   Destrua todos os tijolos sem deixar a bola cair
PASSO 5   Você tem 3 vidas — use com sabedoria
```

**Rodando localmente:**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/atari-breakout.git

# Entre na pasta
cd atari-breakout

# Abra com Live Server (VS Code) ou Python
python -m http.server 5500
```

<br/>

---

## LICENÇA

**Permissão de Uso:** O código pode ser usado somente para fins educacionais.

**Modificação e Distribuição:** Qualquer pessoa pode modificar e redistribuir o código — na forma original ou modificada — desde que cite os autores originais.

**Inclusão da Licença:** Ao redistribuir, a licença original e o aviso de direitos autorais devem ser incluídos no código-fonte ou na documentação.

**Isenção de Garantia:** O software é fornecido "como está", sem garantias de qualquer tipo, explícitas ou implícitas. Os autores não se responsabilizam por danos decorrentes do uso.

<br/>

---

## AUTOR

<div align="center">

<br/>

Desenvolvido por **[Caetano](https://www.github.com/Caetano-2012)**

<br/>

![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=seu-usuario.atari-breakout&left_color=black&right_color=00aaff&left_text=visitas)

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00ffff,50:0080ff,100:00ffff&height=120&section=footer&animation=twinkling"/>

</div>
