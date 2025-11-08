const missions = window.missions ?? [
   // {
   //    description: 'Vender R$500 em um único dia',
   //    status: 'In Progress',
   //    level: 2
   // },
   // {
   //    description: 'Vender R$500 em um único dia',
   //    status: 'Done',
   //    level: 3
   // },
   // {
   //    description: 'Vender 3 kits ou combos diferentes no mês',
   //    status: 'Not Started',
   //    level: 1
   // },
   // {
   //    description: 'Vender produtos de 3 categorias diferentes no mesmo atendimento...',
   //    status: 'In Progress',
   //    level: 2
   // },
   // {
   //    description: 'Acertar 90% de um quiz de produtos novos',
   //    status: 'Done',
   //    level: 4
   // },
];

(function () {
   const params = new URLSearchParams(location.search);
   const stored = localStorage.getItem('userName');
   const name = (params.get('name') || stored || 'Renata').trim();
   localStorage.setItem('userName', name);
   const h = new Date().getHours();
   const saud = h < 12 && h >= 5 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
   document.getElementById('greeting').textContent = `${saud}, ${name}!`;
})();

const empty = document.getElementById('empty');
const tableWrap = document.getElementById('tableWrap');
const rows = document.getElementById('missionRows');
const totalCount = document.getElementById('totalCount');

if (!missions || missions.length === 0) {
   empty.hidden = false;
   tableWrap.hidden = true;
} else {
   empty.hidden = true;
   tableWrap.hidden = false;

   const statusClass = s => {
      if (/^done$/i.test(s)) return 'done';
      if (/^in\s*progress$/i.test(s)) return 'progress';
      return 'not';
   };

   rows.innerHTML = '';
   missions.forEach(m => {
      const li = document.createElement('li');
      li.className = 'row';
      li.innerHTML = `
<div class="mission-text">${m.description}</div>
<div class="status"><span class="badge ${statusClass(m.status)}">${m.status}</span></div>
`;
      li.addEventListener('click', () => openSheet(m));
      rows.appendChild(li);
   });
   totalCount.textContent = `${missions.length} missão${missions.length>1?'s':''}`;

   const overlay = document.getElementById('sheetOverlay');
   const sheetTitle = document.getElementById('sheetTitle');
   const sheetDesc = document.getElementById('sheetDesc');
   const sheetStatus = document.getElementById('sheetStatus');
   const sheetLevel = document.getElementById('sheetLevel');

   function openSheet(m) {
      sheetTitle.textContent = m.title || m.name || m.description || 'Missão';
      sheetDesc.textContent = m.longDescription || m.description || '';
      sheetStatus.textContent = m.status;
      sheetStatus.className = `badge ${statusClass(m.status)}`;
      sheetLevel.textContent = `Nível ${m.level ?? 3}`;
      overlay.hidden = false;
   }

   overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.hidden = true;
   });
   document.querySelector('.sheet-close')?.addEventListener('click', () => overlay.hidden = true);
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') overlay.hidden = true;
   });
}