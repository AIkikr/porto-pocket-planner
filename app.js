'use strict';

// All content is fictional and deliberately independent of external data or services.
const ideas = {
  culture: [
    ['01', 'タイル模様を見つける', '架空の通りを歩きながら、色や模様の違いを眺める時間。'],
    ['02', '川辺でひと息', '景色のよい場所を想像して、写真を撮ったり休んだり。'],
    ['03', '小さな展示をのぞく', '旅先で出会うアートや街の物語に、少しだけ寄り道。']
  ],
  food: [
    ['01', '朝のカフェを想像する', '窓辺の席で、飲み物とともにゆっくり一日を始める。'],
    ['02', '市場を散歩する', '色とりどりの食材を眺めて、気になる味を探す。'],
    ['03', '甘いものと休憩', '予定の合間に、好きなお菓子を味わう余白をつくる。']
  ],
  creative: [
    ['01', '小さな工房をのぞく', '手でつくられたものの形や素材に目を向ける。'],
    ['02', 'お気に入りの色を探す', '街歩きで見つけた色や模様をメモに残す。'],
    ['03', '旅のスケッチを描く', '上手さは気にせず、今日の発見を一枚にまとめる。']
  ]
};

const form = document.querySelector('#planner-form');
const result = document.querySelector('#result');
const cards = document.querySelector('#result-cards');
const summary = document.querySelector('#result-summary');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const mood = data.get('mood');
  const long = data.get('time') === 'long';
  const labels = { culture: '街と文化', food: '食と休憩', creative: '手しごと' };
  const selected = ideas[mood].slice(0, long ? 3 : 2);
  summary.textContent = `${labels[mood]}を楽しむ、${long ? '半日くらい' : '1〜2時間'}のアイデア。`;
  cards.replaceChildren(...selected.map(([number, title, description]) => {
    const article = document.createElement('article');
    article.className = 'result-card';
    const numberEl = document.createElement('span');
    numberEl.className = 'result-number';
    numberEl.textContent = number;
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
    article.append(numberEl, heading, paragraph);
    return article;
  }));
  result.hidden = false;
  result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
});

document.querySelector('#reset').addEventListener('click', () => {
  result.hidden = true;
  document.querySelector('#planner').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  document.querySelector('input[name="mood"]:checked').focus({ preventScroll: true });
});
