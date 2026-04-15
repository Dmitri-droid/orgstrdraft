const data = {
  nodes: {
    root: { id: 'root', name: 'Вся организация', type: 'company', typeLabel: 'Компания', icon: '🏢', parent: null, children: ['hq', 'rnd'], summary: '8 участников · 3 руководителя · 4 чата · 5 файлов', leader: 'Генеральный директор', desc: 'Корневой узел', primaryChatId: null },
    hq: { id: 'hq', name: 'Штаб Нейроком', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'root', children: ['feo', 'hr-chat'], summary: '6 участников · 2 руководителя · 3 чата · 4 файла', leader: 'Лариса Иванова', desc: 'Операционный центр', primaryChatId: 'c3' },
    feo: { id: 'feo', name: 'Штаб ФЭО', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'hq', children: ['plan3', 'feo-b', 'all-system'], summary: '5 участников · 1 руководитель · 3 чата · 4 файла', leader: 'Иван Демьянов', desc: 'Финансы и аналитика', primaryChatId: 'c1' },
    plan3: { id: 'plan3', name: 'Планерки 3', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'feo', children: [], summary: '3 участника · 1 чат', leader: 'Марина Петрова', desc: 'Оперативные встречи', primaryChatId: 'c2' },
    'feo-b': { id: 'feo-b', name: 'Штаб ФЭО-Б', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'feo', children: [], summary: '3 участника · 2 файла', leader: 'Пенелопа Пыльная', desc: 'Аналитическая подгруппа', primaryChatId: 'c4' },
    'all-system': { id: 'all-system', name: 'Все', type: 'system', typeLabel: 'Системная выборка', icon: '☰', parent: 'feo', children: [], summary: '5 участников · 3 чата', leader: 'Система', desc: 'Системная smart-выборка', primaryChatId: null },
    rnd: { id: 'rnd', name: 'Штаб НИОКР', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'root', children: [], summary: '2 участника · 1 чат', leader: 'Павел Белов', desc: 'Исследования', primaryChatId: null },
    'hr-chat': { id: 'hr-chat', name: 'Руководители ФЭО', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'hq', children: [], summary: '5 участников', leader: 'Лариса Иванова', desc: 'Координационный чат', primaryChatId: 'c3' },
  },
  people: [
    { id: 'e1', name: 'Лариса Иванова', pos: 'Менеджер', sub: 'Руководитель', status: 'online', dep: 'hq' },
    { id: 'e2', name: 'Иван Иванов', pos: 'Секретарь', sub: 'Координатор', status: 'away', dep: 'feo' },
    { id: 'e3', name: 'Марина Петрова', pos: 'Копирайтер', sub: 'Коммуникации', status: 'online', dep: 'feo' },
    { id: 'e4', name: 'Иван Демьянов', pos: 'Аналитик', sub: 'Финансы', status: 'offline', dep: 'feo' },
    { id: 'e5', name: 'Пенелопа Пыльная', pos: 'Методолог', sub: 'Регламенты', status: 'online', dep: 'feo-b' },
  ],
  positions: [
    { id: 'p1', title: 'Руководитель отдела', status: 'Занята', assignee: 'Лариса Иванова', dep: 'hq' },
    { id: 'p2', title: 'Копирайтер', status: 'Занята', assignee: 'Марина Петрова', dep: 'feo' },
    { id: 'p3', title: 'Аналитик', status: 'Занята', assignee: 'Иван Демьянов', dep: 'feo' },
    { id: 'p4', title: 'Вакантная должность', status: 'Вакантна', assignee: '—', dep: 'feo' },
  ],
  chats: [
    { id: 'c1', name: 'Общий чат ФЭО', type: 'Командный', participants: 18, last: 'Новый регламент', dep: 'feo', nodeId: null },
    { id: 'c2', name: 'Планерка 3', type: 'Планерка', participants: 8, last: 'Встреча в 15:00', dep: 'feo', nodeId: 'plan3' },
    { id: 'c3', name: 'Руководители ФЭО', type: 'Управленческий', participants: 5, last: 'Подготовить KPI', dep: 'hq', nodeId: 'hr-chat' },
    { id: 'c4', name: 'Архив обсуждений', type: 'Системный', participants: 23, last: 'Только чтение', dep: 'feo-b', nodeId: null },
  ],
  files: [
    { id: 'f1', name: 'Регламент отдела.pdf', type: 'PDF', owner: 'Лариса Иванова', dep: 'hq' },
    { id: 'f2', name: 'Шаблон планерки.docx', type: 'DOCX', owner: 'Марина Петрова', dep: 'feo' },
    { id: 'f3', name: 'Список задач.xlsx', type: 'XLSX', owner: 'Иван Иванов', dep: 'feo' },
  ],
};

const treeMenuByType = {
  company: ['Открыть', 'Добавить подразделение', 'Импорт структуры', 'Настроить структуру'],
  department: ['Открыть', 'Переименовать', 'Добавить дочернее подразделение', 'Добавить сотрудника', 'Создать чат подразделения', 'Архивировать'],
  group: ['Открыть', 'Редактировать состав', 'Переименовать', 'Архивировать'],
  chat: ['Открыть чат', 'Переименовать', 'Архивировать'],
  system: ['Открыть', 'Настроить отображение'],
};

const centerMenuByType = {
  company: ['Редактировать структуру', 'Настроить права доступа', 'Архивировать'],
  department: ['Редактировать подразделение', 'Переименовать', 'Назначить руководителя', 'Настроить права доступа', 'Переместить', 'Архивировать'],
  group: ['Редактировать группу', 'Переименовать', 'Архивировать'],
  chat: ['Открыть чат', 'Переименовать чат', 'Настроить участников', 'Архивировать'],
  system: ['Настроить отображение', 'Архивировать'],
};

const addTypes = { employee: 'Сотрудника', position: 'Должность', department: 'Подразделение', chat: 'Чат', file: 'Файл' };
const submitLabels = { employee: 'Добавить сотрудника', position: 'Добавить должность', department: 'Добавить подразделение', chat: 'Создать чат', file: 'Добавить файл' };

const initialChildOrder = Object.fromEntries(Object.values(data.nodes).map((n) => [n.id, [...n.children]]));

const state = {
  node: 'root', tab: 'people', sel: { kind: 'node', id: 'root' }, exp: { root: true, hq: true, feo: true },
  openTreeMenuNodeId: null, isCenterMenuOpen: false, isAddModalOpen: false, addType: 'employee', addContextNodeId: 'root',
  childOrderByParent: initialChildOrder,
  drag: { draggedNodeId: null, sourceParentId: null, overNodeId: null },
};

const app = document.getElementById('app');
const getChildren = (parentId) => state.childOrderByParent[parentId] || [];

function toast(message) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = message; document.body.append(t); setTimeout(() => t.remove(), 1500); }
function breadcrumb(id) { const out = []; let cur = id; while (cur) { out.unshift(data.nodes[cur].name); cur = data.nodes[cur].parent; } return out.join(' / '); }

function openPrimaryChat(nodeId) {
  const node = data.nodes[nodeId];
  if (node.type === 'chat') {
    const chat = data.chats.find((c) => c.nodeId === nodeId) || data.chats.find((c) => c.id === node.primaryChatId);
    if (!chat) return toast('Для выбранного чат-узла не найден связанный чат.');
    state.sel = { kind: 'chat', id: chat.id }; state.tab = 'chats'; toast(`Открыт чат: ${chat.name}`); return render();
  }
  if (!node.primaryChatId) return toast('У этого подразделения пока нет основного чата.');
  const chat = data.chats.find((c) => c.id === node.primaryChatId);
  if (!chat) return toast('Основной чат не найден в мок-данных.');
  state.sel = { kind: 'chat', id: chat.id }; state.tab = 'chats'; toast(`Открыт основной чат: ${chat.name}`); render();
}

function openAddModal(contextNodeId, type = 'employee') { state.isAddModalOpen = true; state.addType = type; state.addContextNodeId = contextNodeId; state.openTreeMenuNodeId = null; state.isCenterMenuOpen = false; render(); }

function reorderWithinLevel(parentId, draggedNodeId, targetNodeId) {
  const siblings = [...getChildren(parentId)];
  const fromIndex = siblings.indexOf(draggedNodeId);
  const toIndex = siblings.indexOf(targetNodeId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return false;
  const [moved] = siblings.splice(fromIndex, 1);
  siblings.splice(toIndex, 0, moved);
  state.childOrderByParent[parentId] = siblings;
  return true;
}

function renderTree(nodeId, parentId = null, level = 0) {
  const node = data.nodes[nodeId];
  const hasChildren = getChildren(nodeId).length > 0;
  const expanded = !!state.exp[nodeId];
  const selected = state.node === nodeId;
  const menuOpen = state.openTreeMenuNodeId === nodeId;
  const isDragging = state.drag.draggedNodeId === nodeId;
  const isDropTarget = state.drag.overNodeId === nodeId;

  const childrenHtml = hasChildren && expanded ? getChildren(nodeId).map((id) => renderTree(id, nodeId, level + 1)).join('') : '';
  const menu = menuOpen ? `<div class='tree-menu'>${(treeMenuByType[node.type] || treeMenuByType.department).map((action) => `<button data-tree-action='${action}' data-node='${nodeId}'>${action}</button>`).join('')}</div>` : '';

  return `
    <div class='tree-item-wrap'>
      <div class='tree-node ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}' style='padding-left:${12 + level * 16}px' data-drop-node='${nodeId}' data-drop-parent='${parentId || ''}'>
        <button class='tree-drag-handle' data-drag-handle='${nodeId}' data-parent='${parentId || ''}' draggable='${parentId ? 'true' : 'false'}'>⋮⋮</button>
        <button class='tree-control' data-chevron='${nodeId}'>${hasChildren ? (expanded ? '▾' : '▸') : '·'}</button>
        <button class='tree-main-hit ${selected ? 'selected' : ''}' data-select-node='${nodeId}'>
          <span>${node.icon}</span>
          <span><div>${node.name}</div><div class='tree-type'>${node.typeLabel}</div></span>
        </button>
        <button class='tree-menu-btn' data-open-tree-menu='${nodeId}'>...</button>
      </div>
      ${menu}
      ${childrenHtml}
    </div>
  `;
}

function list(items, kind, template) { if (!items.length) return `<div class='empty'>Пусто для выбранного узла.</div>`; return items.map((item) => `<div class='list-row ${state.sel.kind === kind && state.sel.id === item.id ? 'selected' : ''}' data-k='${kind}' data-id='${item.id}'>${template(item)}</div>`).join(''); }

function centerContent() {
  const node = data.nodes[state.node];
  const people = data.people.filter((x) => x.dep === state.node);
  const positions = data.positions.filter((x) => x.dep === state.node);
  const chats = data.chats.filter((x) => x.dep === state.node || x.nodeId === state.node);
  const files = data.files.filter((x) => x.dep === state.node);
  let content = '';
  if (state.tab === 'people') content = `<div class='row-actions'><input placeholder='Поиск сотрудника'/><button>Фильтр</button><button>Сортировка</button></div>` + list(people, 'employee', (x) => `<div class='avatar'>${x.name.split(' ').map((v) => v[0]).join('')}</div><div class='grow'><b>${x.name}</b><div>${x.pos}</div><small>${x.sub}</small></div><button data-msg='${x.name}'>Написать</button>`);
  if (state.tab === 'positions') content = `<div class='row-actions'><input placeholder='Поиск должности'/><button>Все</button><button>Занятые</button><button>Вакантные</button></div>` + list(positions, 'position', (x) => `<div class='grow'><b>${x.title}</b><div>${x.status} · ${x.assignee}</div></div><button>${x.status === 'Вакантна' ? 'Назначить' : 'Открыть'}</button>`);
  if (state.tab === 'chats') content = list(chats, 'chat', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${x.participants} участников</div><small>${x.last}</small></div><button data-open-chat='${x.id}'>Открыть</button>`);
  if (state.tab === 'files') content = list(files, 'file', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${x.owner}</div></div><button data-open-file='${x.id}'>Открыть</button>`);
  if (state.tab === 'about') content = `<div class='card'><p><b>Название:</b> ${node.name}</p><p><b>Тип:</b> ${node.typeLabel}</p><p><b>Руководитель:</b> ${node.leader}</p><p><b>Описание:</b> ${node.desc}</p></div>`;
  const centerMenu = state.isCenterMenuOpen ? `<div class='center-menu'>${(centerMenuByType[node.type] || centerMenuByType.department).map((action) => `<button data-center-action='${action}'>${action}</button>`).join('')}</div>` : '';
  return `<div class='header'><div><div class='muted'>${breadcrumb(state.node)}</div><h2>${node.name}</h2><div class='muted'>${node.summary}</div></div><div class='row-actions'><button data-primary-chat='${state.node}'>Открыть чат</button><button data-open-add='${state.node}'>Добавить</button><div class='menu-anchor'><button data-open-center-menu='1'>Еще</button>${centerMenu}</div></div></div><div class='tabs'>${[['people', 'Люди'], ['positions', 'Должности'], ['chats', 'Чаты'], ['files', 'Файлы'], ['about', 'О подразделении']].map(([k, l]) => `<button class='${state.tab === k ? 'active' : ''}' data-tab='${k}'>${l}</button>`).join('')}</div>${content}`;
}

function detailsContent() {
  const node = data.nodes[state.node]; const s = state.sel;
  if (s.kind === 'employee') { const e = data.people.find((x) => x.id === s.id); if (!e) return ''; return `<div class='card'><h3>${e.name}</h3><p>${e.pos}</p><p>Статус: ${e.status}</p><div class='row-actions'><button data-msg='${e.name}'>Написать</button><button>Позвонить</button></div></div>`; }
  if (s.kind === 'position') { const p = data.positions.find((x) => x.id === s.id); if (!p) return ''; return `<div class='card'><h3>${p.title}</h3><p>${p.status}</p><p>${p.assignee}</p><button>Назначить сотрудника</button></div>`; }
  if (s.kind === 'chat') { const c = data.chats.find((x) => x.id === s.id); if (!c) return ''; return `<div class='card'><h3>${c.name}</h3><p>${c.type}</p><button data-open-chat='${c.id}'>Открыть</button></div>`; }
  if (s.kind === 'file') { const f = data.files.find((x) => x.id === s.id); if (!f) return ''; return `<div class='card'><h3>${f.name}</h3><p>${f.type}</p><button data-open-file='${f.id}'>Открыть</button></div>`; }
  return `<div class='card'><h3>${node.name}</h3><p>${node.typeLabel}</p><p>${node.desc}</p><p>Руководитель: ${node.leader}</p><div class='row-actions'><button data-primary-chat='${node.id}'>Открыть чат</button><button data-open-add='${node.id}'>Добавить сотрудника</button></div></div>`;
}

function modalContent() {
  if (!state.isAddModalOpen) return ''; const node = data.nodes[state.addContextNodeId]; let form = '';
  if (state.addType === 'employee') form = `<label>Имя и фамилия <input placeholder='Анна Смирнова'/></label><label>Должность <input placeholder='Аналитик'/></label><label>Роль / функция <input placeholder='Финансы'/></label><label>Руководитель <select><option>Иван Демьянов</option><option>Лариса Иванова</option></select></label><label>Email / логин (optional) <input placeholder='anna@neurocom.ru'/></label>`;
  if (state.addType === 'position') form = `<label>Название должности <input placeholder='Координатор'/></label><label>Тип <select><option>Обычная</option><option>Руководящая</option><option>Вакансия</option></select></label><label>Кому подчиняется <input placeholder='Руководитель отдела'/></label><label>Описание <textarea placeholder='Краткое описание'></textarea></label><label>Статус <select><option>Занята</option><option>Вакантна</option></select></label>`;
  if (state.addType === 'department') form = `<label>Название подразделения <input placeholder='Группа контроля'/></label><label>Тип <select><option>Департамент</option><option>Отдел</option><option>Группа</option></select></label><label>Родительский узел <input value='${node.name}'/></label><label>Руководитель (optional) <input placeholder='ФИО'/></label><label>Описание <textarea placeholder='Описание'></textarea></label>`;
  if (state.addType === 'chat') form = `<label>Название чата <input placeholder='Планерка отдела'/></label><label>Тип чата <select><option>Общий</option><option>Служебный</option><option>Планерка</option></select></label><label><input type='checkbox'/> Сделать основным чатом подразделения</label><label>Описание <textarea placeholder='Заметка'></textarea></label>`;
  if (state.addType === 'file') form = `<label>Название файла <input placeholder='Регламент.pdf'/></label><label>Тип файла <input placeholder='PDF / DOCX'/></label><label>Описание <textarea placeholder='Описание'></textarea></label><label>Загрузка файла <div class='upload-placeholder'>Dropzone placeholder</div></label>`;
  return `<div class='modal-overlay' data-close-modal='1'><div class='modal'><div class='modal-header'><div><h3>Добавить в подразделение</h3><div class='muted'>Текущий контекст: ${node.name}</div></div><button data-close-modal='1'>✕</button></div><div class='entity-switcher'>${Object.entries(addTypes).map(([k, v]) => `<button class='${state.addType === k ? 'active' : ''}' data-add-type='${k}'>${v}</button>`).join('')}</div><div class='modal-form'>${form}</div><div class='modal-actions'><button data-close-modal='1'>Отмена</button><button data-submit-add='${state.addType}'>${submitLabels[state.addType]}</button></div></div></div>`;
}

function render() {
  app.innerHTML = `<div class='layout'><div class='panel left'><h3>Оргструктура</h3><input placeholder='Поиск в структуре'/><div class='chips'><button class='active'>Все</button><button>Подразделения</button><button>Люди</button><button>Должности</button><button>Чаты</button><button>Вакансии</button></div>${renderTree('root')}</div><div class='panel center'>${centerContent()}</div><div class='panel right'>${detailsContent()}</div></div>${modalContent()}`;
  bindInteractions();
}

function bindInteractions() {
  app.querySelectorAll('[data-chevron]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const id = btn.dataset.chevron; state.exp[id] = !state.exp[id]; state.openTreeMenuNodeId = null; render(); });
  app.querySelectorAll('[data-select-node]').forEach((btn) => btn.onclick = () => { const id = btn.dataset.selectNode; state.node = id; state.sel = { kind: 'node', id }; state.tab = data.nodes[id].type === 'chat' ? 'chats' : 'people'; state.openTreeMenuNodeId = null; state.isCenterMenuOpen = false; render(); });
  app.querySelectorAll('[data-open-tree-menu]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const id = btn.dataset.openTreeMenu; state.openTreeMenuNodeId = state.openTreeMenuNodeId === id ? null : id; state.isCenterMenuOpen = false; render(); });
  app.querySelectorAll('[data-tree-action]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const action = btn.dataset.treeAction; const nodeId = btn.dataset.node; if (action.includes('Добавить')) return openAddModal(nodeId, action.includes('сотрудника') ? 'employee' : 'department'); if (action.includes('Создать чат')) return openAddModal(nodeId, 'chat'); if (action.startsWith('Открыть')) { state.node = nodeId; state.sel = { kind: 'node', id: nodeId }; } state.openTreeMenuNodeId = null; toast(`${action}: ${data.nodes[nodeId].name}`); render(); });

  app.querySelectorAll('[data-drag-handle]').forEach((handle) => {
    handle.ondragstart = (e) => {
      const nodeId = handle.dataset.dragHandle;
      const parentId = handle.dataset.parent || null;
      if (!parentId) { e.preventDefault(); return; }
      state.drag = { draggedNodeId: nodeId, sourceParentId: parentId, overNodeId: null };
      state.openTreeMenuNodeId = null;
      e.dataTransfer.effectAllowed = 'move';
      render();
    };
    handle.ondragend = () => { state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null }; render(); };
  });

  app.querySelectorAll('[data-drop-node]').forEach((zone) => {
    zone.ondragover = (e) => {
      e.preventDefault();
      if (!state.drag.draggedNodeId) return;
      state.drag.overNodeId = zone.dataset.dropNode;
      zone.classList.add('drop-target');
    };
    zone.ondragleave = () => zone.classList.remove('drop-target');
    zone.ondrop = (e) => {
      e.preventDefault();
      const targetNodeId = zone.dataset.dropNode;
      const targetParentId = zone.dataset.dropParent || null;
      if (!state.drag.draggedNodeId || !state.drag.sourceParentId || !targetParentId) {
        state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
        return render();
      }
      if (state.drag.sourceParentId !== targetParentId) {
        toast('Можно менять порядок только в пределах одного уровня.');
        state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
        return render();
      }
      if (reorderWithinLevel(targetParentId, state.drag.draggedNodeId, targetNodeId)) toast('Порядок обновлен');
      state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
      state.openTreeMenuNodeId = null;
      render();
    };
  });

  app.querySelectorAll('[data-open-center-menu]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); state.isCenterMenuOpen = !state.isCenterMenuOpen; state.openTreeMenuNodeId = null; render(); });
  app.querySelectorAll('[data-center-action]').forEach((btn) => btn.onclick = () => { const action = btn.dataset.centerAction; state.isCenterMenuOpen = false; if (action === 'Открыть чат') return openPrimaryChat(state.node); toast(`${action}: ${data.nodes[state.node].name}`); render(); });
  app.querySelectorAll('[data-tab]').forEach((btn) => btn.onclick = () => { state.tab = btn.dataset.tab; state.sel = { kind: 'node', id: state.node }; render(); });
  app.querySelectorAll('.list-row').forEach((row) => row.onclick = () => { state.sel = { kind: row.dataset.k, id: row.dataset.id }; render(); });
  app.querySelectorAll('[data-msg]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); toast(`Написать: ${btn.dataset.msg}`); });
  app.querySelectorAll('[data-primary-chat]').forEach((btn) => btn.onclick = () => openPrimaryChat(btn.dataset.primaryChat));
  app.querySelectorAll('[data-open-chat]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const chat = data.chats.find((c) => c.id === btn.dataset.openChat); if (chat) toast(`Открыть чат: ${chat.name}`); });
  app.querySelectorAll('[data-open-file]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); toast(`Открыть файл: ${btn.dataset.openFile}`); });
  app.querySelectorAll('[data-open-add]').forEach((btn) => btn.onclick = () => openAddModal(btn.dataset.openAdd, 'employee'));
  app.querySelectorAll('[data-add-type]').forEach((btn) => btn.onclick = () => { state.addType = btn.dataset.addType; render(); });
  app.querySelectorAll('[data-close-modal]').forEach((btn) => btn.onclick = (e) => { if (e.target === e.currentTarget || btn.dataset.closeModal === '1') { state.isAddModalOpen = false; render(); } });
  const modal = app.querySelector('.modal'); if (modal) modal.onclick = (event) => event.stopPropagation();
  app.querySelectorAll('[data-submit-add]').forEach((btn) => btn.onclick = () => { state.isAddModalOpen = false; toast(`${submitLabels[btn.dataset.submitAdd]}: mock flow`); render(); });
}

window.addEventListener('mousedown', (event) => {
  if (state.openTreeMenuNodeId || state.isCenterMenuOpen) {
    const target = event.target;
    if (!target.closest('.tree-item-wrap') && !target.closest('.menu-anchor')) {
      state.openTreeMenuNodeId = null;
      state.isCenterMenuOpen = false;
      render();
    }
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (state.isAddModalOpen) { state.isAddModalOpen = false; render(); return; }
    if (state.openTreeMenuNodeId || state.isCenterMenuOpen) { state.openTreeMenuNodeId = null; state.isCenterMenuOpen = false; render(); }
  }
});

render();
