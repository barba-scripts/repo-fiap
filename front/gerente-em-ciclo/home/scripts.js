const data = [
   {
      name: "Pedro",
      missionsCompleted: 4,
      missionsNotCompleted: 1,
      missionsTotal: 5
   },
   {
      name: "Mariana",
      missionsCompleted: 6,
      missionsNotCompleted: 2,
      missionsTotal: 8
   },
   {
      name: "João",
      missionsCompleted: 5,
      missionsNotCompleted: 0,
      missionsTotal: 5
   },
   {
      name: "Fernanda",
      missionsCompleted: 3,
      missionsNotCompleted: 2,
      missionsTotal: 5
   },
   {
      name: "Lucas",
      missionsCompleted: 5,
      missionsNotCompleted: 1,
      missionsTotal: 6
   }
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

const initials = n => n.split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();

const list = document.getElementById('missionList');
list.innerHTML = '';
data.forEach(p => {
   const li = document.createElement('li');
   li.className = 'mission-row';
   li.innerHTML = `
    <span class="avatar">${initials(p.name)}</span>
    <div class="mission-text">
      <div class="name">${p.name}</div>
    </div>
  `;
   li.style.cursor = 'pointer';
   li.addEventListener('click', () => {
      window.location.href = '../mission-list/index.html';
   });
   list.appendChild(li);
});
document.getElementById('totalColabs').textContent = `${data.length} colaboradores`;

const totalDone = data.reduce((s, p) => s + p.missionsCompleted, 0);
const totalNot = data.reduce((s, p) => s + p.missionsNotCompleted, 0);
document.getElementById('kpiDone').textContent = totalDone;
document.getElementById('kpiNotDone').textContent = totalNot;

const tbody = document.getElementById('tableBody');
tbody.innerHTML = '';
data.forEach(p => {
   const tr = document.createElement('tr');
   tr.innerHTML = `<td>${p.name}</td><td>${p.missionsCompleted}</td>`;
   tbody.appendChild(tr);
});

(function drawDonut() {
   const canvas = document.getElementById('donut');
   const ctx = canvas.getContext('2d');
   const size = Math.min(canvas.width, canvas.height);
   const radius = size / 2 - 6;
   const cx = canvas.width / 2,
      cy = canvas.height / 2;
   const values = [totalDone, totalNot];
   const total = values.reduce((a, b) => a + b, 0) || 1;
   const colors = ['#3a7c59', '#c94f4f'];

   let start = -Math.PI / 2;
   values.forEach((v, i) => {
      const angle = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      start += angle;
   });

   ctx.globalCompositeOperation = 'destination-out';
   ctx.beginPath();
   ctx.arc(cx, cy, radius * 0.64, 0, Math.PI * 2);
   ctx.fill();
   ctx.globalCompositeOperation = 'source-over';

   ctx.font = '700 28px ui-sans-serif, system-ui, -apple-system, Segoe UI';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   const pct = Math.round((totalDone / total) * 100);
   ctx.fillStyle = '#0f172a';
   ctx.fillText(pct + '%', cx, cy);
})();