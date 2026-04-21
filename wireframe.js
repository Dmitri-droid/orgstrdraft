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
const initialEmployeeOrderByDepartment = data.people.reduce((acc, employee) => {
  if (!acc[employee.dep]) acc[employee.dep] = [];
  acc[employee.dep].push(employee.id);
  return acc;
}, {});

const state = {
  node: 'root', tab: 'people', sel: { kind: 'node', id: 'root' }, exp: { root: true, hq: true, feo: true },
  openTreeMenuNodeId: null, isCenterMenuOpen: false, isAddModalOpen: false, addType: 'employee', addContextNodeId: 'root',
  childOrderByParent: initialChildOrder,
  employeeOrderByDepartment: initialEmployeeOrderByDepartment,
  drag: { draggedNodeId: null, sourceParentId: null, overNodeId: null },
  peopleDrag: { draggedEmployeeId: null, overEmployeeId: null },
  isStructureSettingsOpen: false,
  isStructureSettingsClosing: false,
  isResetStructureConfirmOpen: false,
  isHistoryDrawerOpen: false,
  activeHistoryFilter: 'all',
  structureSettings: {
    dragAndDropEnabled: true,
    whoCanEdit: 'admins',
    whoCanAddDepartments: 'admins_leads',
    whoCanMoveNodes: 'admins',
  },
  detailsExpandedChildIds: {},
  historyEntries: [
    { id: 'h-1', departmentId: 'feo', eventType: 'reordered_nodes', description: 'Перемещён узел "Штаб ФЭО-Б"', actor: 'Иван Петров', timeLabel: 'сегодня, 14:32', relatedEntity: 'Штаб ФЭО-Б' },
    { id: 'h-2', departmentId: 'feo', eventType: 'created_chat', description: 'Создан чат "Руководители ФЭО"', actor: 'Марина Соколова', timeLabel: 'сегодня, 11:10', relatedEntity: 'Руководители ФЭО' },
    { id: 'h-3', departmentId: 'feo', eventType: 'changed_primary_chat', description: 'Назначен основной чат подразделения', actor: 'Иван Петров', timeLabel: 'вчера, 18:05' },
    { id: 'h-4', departmentId: 'feo', eventType: 'added_employee', description: 'Добавлен сотрудник "Кузнецова Мария"', actor: 'Елена Смирнова', timeLabel: 'вчера, 09:40', relatedEntity: 'Кузнецова Мария' },
    { id: 'h-5', departmentId: 'feo', eventType: 'changed_leader', description: 'Изменён руководитель подразделения', actor: 'Иван Петров', timeLabel: '12 апр, 16:20' },
    { id: 'h-6', departmentId: 'feo', eventType: 'reset_order', description: 'Сброшен пользовательский порядок', actor: 'Администратор', timeLabel: '12 апр, 15:02' },
    { id: 'h-7', departmentId: 'feo', eventType: 'settings_changed', description: 'Обновлены настройки оргструктуры', actor: 'Администратор', timeLabel: '12 апр, 14:10' },
    { id: 'h-8', departmentId: 'feo', eventType: 'created_department', description: 'Создано подразделение "Группа планирования"', actor: 'Марина Соколова', timeLabel: '10 апр, 12:44', relatedEntity: 'Группа планирования' },
    { id: 'h-9', departmentId: 'feo', eventType: 'archived_node', description: 'Архивирован узел "Планерки 2"', actor: 'Иван Петров', timeLabel: '08 апр, 17:28', relatedEntity: 'Планерки 2' },
    { id: 'h-10', departmentId: 'feo', eventType: 'renamed_department', description: 'Переименовано подразделение "Штаб ФЭО-А"', actor: 'Марина Соколова', timeLabel: '07 апр, 10:11', relatedEntity: 'Штаб ФЭО-А' },
    { id: 'h-11', departmentId: 'feo', eventType: 'added_position', description: 'Добавлена должность "Аналитик бюджета"', actor: 'Елена Смирнова', timeLabel: '06 апр, 16:54', relatedEntity: 'Аналитик бюджета' },
  ],
};
let drawerCloseTimerId = null;
const childPreviewByNodeId = {
  'feo-b': {
    label: 'Штаб ФЭО-Б',
    employees: 12,
    primaryChatLabel: 'Основной чат',
    participants: 12,
    linkedChats: ['Отчётность ФЭО', 'Методология бюджета'],
    employeeNames: ['Александров М.', 'Беляева О.', 'Волков С.'],
    files: 8,
    fileExamples: ['Отчёт Q1.xlsx', 'Бюджет_черновик.docx'],
  },
  'feo-a': {
    label: 'Группа планирования',
    employees: 8,
    primaryChatLabel: 'Основной чат',
    participants: 8,
    linkedChats: ['Планирование 2024', 'Сценарии'],
    employeeNames: ['Громова А.', 'Дмитриев И.', 'Кузнецова М.'],
    files: 6,
    fileExamples: ['План продаж.xlsx', 'Прогноз ФЭО.pdf'],
  },
  plan3: {
    label: 'Планерки 3',
    employees: 5,
    primaryChatLabel: 'Планерка ФЭО',
    participants: 5,
    linkedChats: ['Планерка ФЭО'],
    employeeNames: ['Иванов П.', 'Павлова Л.', 'Сидоров К.'],
    files: 4,
    fileExamples: ['Повестка 12.03.2024.docx', 'Протокол 05.03.2024.pdf'],
  },
};

const app = document.getElementById('app');
const getChildren = (parentId) => state.childOrderByParent[parentId] || [];
const historyFilterLabels = { all: 'Все', structure: 'Структура', people: 'Люди', chats: 'Чаты', settings: 'Настройки' };
const historyTypeByFilter = {
  structure: ['created_department', 'renamed_department', 'reordered_nodes', 'archived_node'],
  people: ['added_employee', 'added_position', 'changed_leader'],
  chats: ['created_chat', 'changed_primary_chat'],
  settings: ['settings_changed', 'reset_order'],
};
const historyEventIcon = {
  created_department: '＋',
  renamed_department: '✎',
  reordered_nodes: '↕',
  reset_order: '↺',
  changed_leader: '👤',
  created_chat: '💬',
  changed_primary_chat: '◎',
  added_employee: '👥',
  added_position: '▤',
  archived_node: '🗄',
  settings_changed: '⚙',
};

function toast(message) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = message; document.body.append(t); setTimeout(() => t.remove(), 1500); }
function breadcrumb(id) { const out = []; let cur = id; while (cur) { out.unshift(data.nodes[cur].name); cur = data.nodes[cur].parent; } return out.join(' / '); }
function addHistoryEntry(entry) { state.historyEntries = [{ id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...entry }, ...state.historyEntries]; }

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

function openStructureSettings() {
  if (drawerCloseTimerId !== null) {
    window.clearTimeout(drawerCloseTimerId);
    drawerCloseTimerId = null;
  }
  state.isStructureSettingsOpen = true;
  state.isStructureSettingsClosing = false;
  render();
}

function closeStructureSettings() {
  if (!state.isStructureSettingsOpen) return;
  if (drawerCloseTimerId !== null) {
    window.clearTimeout(drawerCloseTimerId);
  }
  state.isStructureSettingsClosing = true;
  render();
  drawerCloseTimerId = window.setTimeout(() => {
    state.isStructureSettingsOpen = false;
    state.isStructureSettingsClosing = false;
    state.isResetStructureConfirmOpen = false;
    drawerCloseTimerId = null;
    render();
  }, 180);
}

function reorderEmployeesInDepartment(departmentId, draggedEmployeeId, targetEmployeeId) {
  const list = [...(state.employeeOrderByDepartment[departmentId] || [])];
  const fromIndex = list.indexOf(draggedEmployeeId);
  const toIndex = list.indexOf(targetEmployeeId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return false;
  const [moved] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, moved);
  state.employeeOrderByDepartment[departmentId] = list;
  addHistoryEntry({ departmentId, eventType: 'reordered_nodes', description: 'Обновлён порядок сотрудников внутри подразделения', actor: 'Администратор', timeLabel: 'только что' });
  return true;
}

function reorderWithinLevel(parentId, draggedNodeId, targetNodeId) {
  const siblings = [...getChildren(parentId)];
  const fromIndex = siblings.indexOf(draggedNodeId);
  const toIndex = siblings.indexOf(targetNodeId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return false;
  const [moved] = siblings.splice(fromIndex, 1);
  siblings.splice(toIndex, 0, moved);
  state.childOrderByParent[parentId] = siblings;
  addHistoryEntry({ departmentId: parentId, eventType: 'reordered_nodes', description: `Перемещён узел "${data.nodes[draggedNodeId]?.name || draggedNodeId}"`, actor: 'Администратор', timeLabel: 'только что' });
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
        <button class='tree-drag-handle' data-drag-handle='${nodeId}' data-parent='${parentId || ''}' draggable='${parentId && state.structureSettings.dragAndDropEnabled ? 'true' : 'false'}'>⋮⋮</button>
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

function resetStructureOrder() {
  state.childOrderByParent = Object.fromEntries(Object.entries(initialChildOrder).map(([k, v]) => [k, [...v]]));
  addHistoryEntry({ departmentId: state.node, eventType: 'reset_order', description: 'Сброшен пользовательский порядок', actor: 'Администратор', timeLabel: 'только что' });
}

function list(items, kind, template) { if (!items.length) return `<div class='empty'>Пусто для выбранного узла.</div>`; return items.map((item) => `<div class='list-row ${state.sel.kind === kind && state.sel.id === item.id ? 'selected' : ''}' data-k='${kind}' data-id='${item.id}'>${template(item)}</div>`).join(''); }

function centerContent() {
  const node = data.nodes[state.node];
  const people = (state.employeeOrderByDepartment[state.node] || [])
    .map((id) => data.people.find((x) => x.id === id))
    .filter(Boolean);
  const positions = data.positions.filter((x) => x.dep === state.node);
  const chats = data.chats.filter((x) => x.dep === state.node || x.nodeId === state.node);
  const files = data.files.filter((x) => x.dep === state.node);
  let content = '';
  if (state.tab === 'people') content = `<div class='row-actions'><input placeholder='Поиск сотрудника'/><button>Фильтр</button><button>Сортировка</button></div>` + list(people, 'employee', (x) => `<button class='row-drag-handle' data-emp-drag='${x.id}' draggable='true'>⋮⋮</button><div class='row-main-hit' data-select-employee='${x.id}'><div class='avatar'>${x.name.split(' ').map((v) => v[0]).join('')}</div><div class='grow'><b>${x.name}</b><div>${x.pos}</div><small>${x.sub}</small></div><span class='status'>${x.status}</span></div><button data-msg='${x.name}'>Написать</button>`);
  if (state.tab === 'positions') content = `<div class='row-actions'><input placeholder='Поиск должности'/><button>Все</button><button>Занятые</button><button>Вакантные</button></div>` + list(positions, 'position', (x) => `<div class='grow'><b>${x.title}</b><div>${x.status} · ${x.assignee}</div></div><button>${x.status === 'Вакантна' ? 'Назначить' : 'Открыть'}</button>`);
  if (state.tab === 'chats') content = list(chats, 'chat', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${x.participants} участников</div><small>${x.last}</small></div><button data-open-chat='${x.id}'>Открыть</button>`);
  if (state.tab === 'files') content = list(files, 'file', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${x.owner}</div></div><button data-open-file='${x.id}'>Открыть</button>`);
  if (state.tab === 'about') content = `<div class='card'><p><b>Название:</b> ${node.name}</p><p><b>Тип:</b> ${node.typeLabel}</p><p><b>Руководитель:</b> ${node.leader}</p><p><b>Описание:</b> ${node.desc}</p></div>`;
  const centerMenu = state.isCenterMenuOpen ? `<div class='center-menu'>${(centerMenuByType[node.type] || centerMenuByType.department).map((action) => `<button data-center-action='${action}'>${action}</button>`).join('')}</div>` : '';
  return `<div class='header'><div><div class='muted'>${breadcrumb(state.node)}</div><h2>${node.name}</h2><div class='muted'>${node.summary}</div></div><div class='row-actions'><button data-primary-chat='${state.node}'>Открыть чат</button><button data-open-add='${state.node}'>Добавить</button><button data-open-structure-settings='1'>Настроить структуру</button><div class='menu-anchor'><button data-open-center-menu='1'>Еще</button>${centerMenu}</div></div></div><div class='tabs'>${[['people', 'Люди'], ['positions', 'Должности'], ['chats', 'Чаты'], ['files', 'Файлы'], ['about', 'О подразделении']].map(([k, l]) => `<button class='${state.tab === k ? 'active' : ''}' data-tab='${k}'>${l}</button>`).join('')}</div>${content}`;
}

function detailsContent() {
  const node = data.nodes[state.node]; const s = state.sel;
  if (s.kind === 'employee') { const e = data.people.find((x) => x.id === s.id); if (!e) return ''; return `<div class='card'><h3>${e.name}</h3><p>${e.pos}</p><p>Статус: ${e.status}</p><div class='row-actions'><button data-msg='${e.name}'>Написать</button><button>Позвонить</button></div></div>`; }
  if (s.kind === 'position') { const p = data.positions.find((x) => x.id === s.id); if (!p) return ''; return `<div class='card'><h3>${p.title}</h3><p>${p.status}</p><p>${p.assignee}</p><button>Назначить сотрудника</button></div>`; }
  if (s.kind === 'chat') { const c = data.chats.find((x) => x.id === s.id); if (!c) return ''; return `<div class='card'><h3>${c.name}</h3><p>${c.type}</p><button data-open-chat='${c.id}'>Открыть</button></div>`; }
  if (s.kind === 'file') { const f = data.files.find((x) => x.id === s.id); if (!f) return ''; return `<div class='card'><h3>${f.name}</h3><p>${f.type}</p><button data-open-file='${f.id}'>Открыть</button></div>`; }
  const parentNode = node.parent ? data.nodes[node.parent] : null;
  const primaryChat = data.chats.find((chat) => chat.id === node.primaryChatId) || data.chats.find((chat) => chat.dep === node.id);
  const relatedChats = data.chats.filter((chat) => chat.dep === node.id && (!primaryChat || chat.id !== primaryChat.id));
  const relatedFiles = data.files.filter((file) => file.dep === node.id);
  const childIds = node.children.filter((childId) => childPreviewByNodeId[childId]);
  const childBlocks = childIds.map((childId) => {
    const child = childPreviewByNodeId[childId];
    const expanded = !!state.detailsExpandedChildIds[childId];
    const extraCount = Math.max(child.employees - child.employeeNames.length, 1);
    return `<div class='child-accordion'><button class='child-accordion-head' data-toggle-details-child='${childId}'><span class='details-node-icon'>${childId === 'plan3' ? '💬' : '▦'}</span><span class='grow'><b>${child.label}</b><div class='muted'>${child.employees} сотрудников</div></span><span class='chevron ${expanded ? 'open' : ''}'>▾</span></button>${expanded ? `<div class='child-accordion-body'><div><b>${child.primaryChatLabel}</b> · ${child.participants} участников</div><div><b>Связанные чаты</b> · ${child.linkedChats.join(' · ')}</div><div><b>Сотрудники</b> · ${child.employees}</div><div>${child.employeeNames.join(', ')} и ещё ${extraCount}</div><div><b>Файлы</b> · ${child.files}</div><div>например: ${child.fileExamples.join(', ')}</div></div>` : ''}</div>`;
  }).join('');
  const relatedChatRows = (relatedChats.length ? relatedChats : [
    { id: 'rc1', name: 'Общий чат ФЭО', participants: 52 },
    { id: 'rc2', name: 'Руководители ФЭО', participants: 7 },
    { id: 'rc3', name: 'Планерка ФЭО', participants: 18 },
  ]).map((chat) => `<button class='link-row' data-open-chat='${chat.id}'><span>${chat.name}</span><small>${chat.participants} участников</small></button>`).join('');
  const fileRows = (relatedFiles.length ? relatedFiles : [
    { id: 'df1', name: 'Регламент работы ФЭО.pdf', updatedAt: '12.03.2024', type: '1.2 МБ' },
    { id: 'df2', name: 'Шаблон отчёта.xlsx', updatedAt: '01.02.2024', type: '96 КБ' },
  ]).slice(0, 2).map((file) => `<div class='subtle-box'><b>${file.name}</b><small>${Object.prototype.hasOwnProperty.call(file, 'fileType') ? file.fileType : file.type} · обновлён ${file.updatedAt}</small></div>`).join('');
  const leaderTitle = node.id === 'feo' ? 'Руководитель штаба ФЭО' : 'Руководитель подразделения';
  const icon = node.type === 'chat' ? '💬' : node.type === 'company' ? '🏢' : '▦';

  return `<div class='card details-rich-card'><div class='details-head'><div class='details-head-main'><span class='details-node-icon'>${icon}</span><div><h3>${node.name}</h3><small>${node.typeLabel}</small></div></div><button data-close-details='1'>✕</button></div><div class='details-section'><p>${node.id === 'feo' ? 'Финансово-экономическое обеспечение деятельности компании. Планирование, анализ, отчетность.' : node.desc}</p></div><div class='details-section'><div class='row-actions'><button data-primary-chat='${node.id}'>Открыть чат</button><button data-show-in-structure='${node.id}'>Показать в структуре</button><button data-msg='${node.leader}'>Написать руководителю</button></div></div><div class='details-section'><h4>Руководитель</h4><div class='leader-card'><div class='avatar'>${node.leader.split(' ').map((v) => v[0]).join('')}</div><div class='grow'><b>${node.leader}</b><div class='muted'>${leaderTitle}</div><button class='link-btn' data-open-profile='${node.leader}'>Открыть профиль</button></div><div class='row-actions'><button data-msg='${node.leader}'>✉</button><button data-quick-leader='${node.leader}'>⋯</button></div></div></div>${parentNode ? `<div class='details-section'><h4>Подчиняется / входит в</h4><div class='subtle-box'><b>${parentNode.name}</b><button class='link-btn' data-show-in-structure='${parentNode.id}'>Показать в структуре</button></div></div>` : ''}<div class='details-section'><h4>Подчинённые подразделения (${childIds.length})</h4><div class='details-list-stack'>${childBlocks || "<div class='empty'>Нет дочерних подразделений.</div>"}</div></div><div class='details-section'><h4>Основной чат</h4><div class='subtle-box'><div><b>${primaryChat ? primaryChat.name : `Чат ${node.name}`}</b><span class='wire-badge'>основной</span></div><div class='muted'>${primaryChat ? primaryChat.participants : 38} участников</div><button data-primary-chat='${node.id}'>Открыть чат</button></div></div><div class='details-section'><h4>Связанные чаты</h4><div class='details-list-stack'>${relatedChatRows}<button class='link-btn' data-open-all-chats='${node.id}'>Смотреть все</button></div></div><div class='details-section'><h4>Файлы и документы</h4><div class='details-list-stack'><div class='subtle-box'><b>Бюджет и планирование</b><small>24 файла</small></div>${fileRows}<button data-open-file-section='${node.id}'>Открыть раздел</button></div></div><div class='details-section'><h4>Быстрые действия</h4><div class='details-list-stack'><button data-primary-chat='${node.id}'>Открыть основной чат</button><button data-open-people='${node.id}'>Перейти к сотрудникам</button><button data-history='${node.id}'>Показать историю изменений</button><button data-open-add='${node.id}'>Добавить сотрудника</button></div></div></div>`;
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

function settingsDrawerContent() {
  if (!state.isStructureSettingsOpen) return '';
  return `<div class='drawer-overlay ${state.isStructureSettingsClosing ? 'closing' : 'open'}' data-close-structure-settings='1'><aside class='settings-drawer'><div class='drawer-header'><div><h3>Настройки оргструктуры</h3><div class='muted'>Параметры управления структурой компании</div></div><button data-close-structure-settings='1'>✕</button></div><div class='drawer-section'><label class='drawer-row'><span>Разрешить drag-and-drop</span><button type='button' class='toggle-switch ${state.structureSettings.dragAndDropEnabled ? 'on' : 'off'}' role='switch' aria-checked='${state.structureSettings.dragAndDropEnabled ? 'true' : 'false'}' data-toggle-tree-dnd='1'><span class='toggle-thumb'></span><span class='toggle-label'>${state.structureSettings.dragAndDropEnabled ? 'Вкл' : 'Выкл'}</span></button></label></div><div class='drawer-section'>${!state.isResetStructureConfirmOpen ? `<button class='danger-outline' data-ask-reset-structure='1'>Сбросить порядок</button>` : `<div class='confirm-box'><div>Сбросить пользовательский порядок?</div><div class='row-actions'><button data-cancel-reset-structure='1'>Отмена</button><button class='danger-outline' data-confirm-reset-structure='1'>Сбросить</button></div></div>`}</div><div class='drawer-section'><label>Кто может редактировать структуру<select data-structure-permission='whoCanEdit'><option value='admins' ${state.structureSettings.whoCanEdit === 'admins' ? 'selected' : ''}>Только администраторы</option><option value='admins_leads' ${state.structureSettings.whoCanEdit === 'admins_leads' ? 'selected' : ''}>Администраторы и руководители</option><option value='all_managers' ${state.structureSettings.whoCanEdit === 'all_managers' ? 'selected' : ''}>Все менеджеры структуры</option></select></label></div><div class='drawer-section'><label>Кто может добавлять подразделения<select data-structure-permission='whoCanAddDepartments'><option value='admins' ${state.structureSettings.whoCanAddDepartments === 'admins' ? 'selected' : ''}>Только администраторы</option><option value='admins_leads' ${state.structureSettings.whoCanAddDepartments === 'admins_leads' ? 'selected' : ''}>Администраторы и руководители</option><option value='all_managers' ${state.structureSettings.whoCanAddDepartments === 'all_managers' ? 'selected' : ''}>Все менеджеры структуры</option></select></label></div><div class='drawer-section'><label>Кто может перемещать узлы<select data-structure-permission='whoCanMoveNodes'><option value='admins' ${state.structureSettings.whoCanMoveNodes === 'admins' ? 'selected' : ''}>Только администраторы</option><option value='admins_leads' ${state.structureSettings.whoCanMoveNodes === 'admins_leads' ? 'selected' : ''}>Администраторы и руководители</option><option value='all_managers' ${state.structureSettings.whoCanMoveNodes === 'all_managers' ? 'selected' : ''}>Все менеджеры структуры</option></select></label></div></aside></div>`;
}

function historyDrawerContent() {
  if (!state.isHistoryDrawerOpen) return '';
  const activeNode = data.nodes[state.node];
  const scoped = state.historyEntries.filter((entry) => entry.departmentId === state.node);
  const filtered = state.activeHistoryFilter === 'all'
    ? scoped
    : scoped.filter((entry) => historyTypeByFilter[state.activeHistoryFilter].includes(entry.eventType));
  const filterButtons = Object.entries(historyFilterLabels)
    .map(([key, label]) => `<button class='${state.activeHistoryFilter === key ? 'active' : ''}' data-history-filter='${key}'>${label}</button>`)
    .join('');
  const rows = filtered.length
    ? filtered.map((entry) => `<div class='history-row'><span class='history-icon'>${historyEventIcon[entry.eventType]}</span><div class='grow'><div>${entry.description}</div>${entry.relatedEntity ? `<small class='muted'>Связано с: ${entry.relatedEntity}</small>` : ''}<small class='muted'>${entry.actor} · ${entry.timeLabel}</small></div></div>`).join('')
    : `<div class='empty'>Для выбранного фильтра пока нет записей.</div>`;

  return `<div class='drawer-overlay open' data-close-history='1'><aside class='settings-drawer history-drawer'><div class='drawer-header'><div><h3>История изменений</h3><div class='muted'>Журнал изменений по подразделению и связанным сущностям</div><div class='muted'>Подразделение: ${activeNode.name}</div></div><button data-close-history='1'>✕</button></div><div class='drawer-section'><div class='chips'>${filterButtons}</div></div><div class='drawer-section history-list'>${rows}</div></aside></div>`;
}

function render() {
  app.innerHTML = `<div class='layout'><div class='panel left'><h3>Оргструктура</h3><input placeholder='Поиск в структуре'/><div class='chips'><button class='active'>Все</button><button>Подразделения</button><button>Люди</button><button>Должности</button><button>Чаты</button><button>Вакансии</button></div>${renderTree('root')}</div><div class='panel center'>${centerContent()}</div><div class='panel right'>${detailsContent()}</div></div>${historyDrawerContent()}${settingsDrawerContent()}${modalContent()}`;
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
      if (!state.structureSettings.dragAndDropEnabled) {
        e.preventDefault();
        return;
      }
      state.drag = { draggedNodeId: nodeId, sourceParentId: parentId, overNodeId: null };
      state.openTreeMenuNodeId = null;
      e.dataTransfer.setData('application/org-node', JSON.stringify({ draggedNodeId: nodeId, sourceParentId: parentId }));
      e.dataTransfer.effectAllowed = 'move';
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
      if (!state.structureSettings.dragAndDropEnabled) return;
      const targetNodeId = zone.dataset.dropNode;
      const targetParentId = zone.dataset.dropParent || null;
      let payload = null;
      const raw = e.dataTransfer.getData('application/org-node');
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = null;
        }
      }
      const draggedNodeId = payload?.draggedNodeId || state.drag.draggedNodeId;
      const sourceParentId = payload?.sourceParentId || state.drag.sourceParentId;

      if (!draggedNodeId || !sourceParentId || !targetParentId) {
        state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
        return render();
      }
      if (sourceParentId !== targetParentId) {
        toast('Можно менять порядок только в пределах одного уровня.');
        state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
        return render();
      }
      if (reorderWithinLevel(targetParentId, draggedNodeId, targetNodeId)) toast('Порядок обновлен');
      state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
      state.openTreeMenuNodeId = null;
      render();
    };
  });

  app.querySelectorAll('[data-open-center-menu]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); state.isCenterMenuOpen = !state.isCenterMenuOpen; state.openTreeMenuNodeId = null; render(); });
  app.querySelectorAll('[data-center-action]').forEach((btn) => btn.onclick = () => { const action = btn.dataset.centerAction; state.isCenterMenuOpen = false; if (action === 'Открыть чат') return openPrimaryChat(state.node); toast(`${action}: ${data.nodes[state.node].name}`); render(); });
  app.querySelectorAll('[data-tab]').forEach((btn) => btn.onclick = () => { state.tab = btn.dataset.tab; state.sel = { kind: 'node', id: state.node }; render(); });
  app.querySelectorAll('.list-row').forEach((row) => row.onclick = () => { state.sel = { kind: row.dataset.k, id: row.dataset.id }; render(); });
  app.querySelectorAll('[data-select-employee]').forEach((body) => body.onclick = (e) => { e.stopPropagation(); state.sel = { kind: 'employee', id: body.dataset.selectEmployee }; render(); });

  app.querySelectorAll('[data-emp-drag]').forEach((handle) => {
    handle.ondragstart = (e) => {
      const employeeId = handle.dataset.empDrag;
      state.peopleDrag = { draggedEmployeeId: employeeId, overEmployeeId: null };
      e.dataTransfer.setData('application/employee-row', JSON.stringify({ draggedEmployeeId: employeeId, departmentId: state.node }));
      e.dataTransfer.effectAllowed = 'move';
      const row = handle.closest('.list-row');
      if (row) row.classList.add('dragging');
    };
    handle.ondragend = () => {
      state.peopleDrag = { draggedEmployeeId: null, overEmployeeId: null };
      render();
    };
  });

  app.querySelectorAll('.list-row[data-k="employee"]').forEach((row) => {
    row.ondragover = (e) => {
      e.preventDefault();
      row.classList.add('drop-target');
    };
    row.ondragleave = () => row.classList.remove('drop-target');
    row.ondrop = (e) => {
      e.preventDefault();
      row.classList.remove('drop-target');
      let payload = null;
      const raw = e.dataTransfer.getData('application/employee-row');
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = null;
        }
      }
      const targetEmployeeId = row.dataset.id;
      const draggedEmployeeId = payload?.draggedEmployeeId || state.peopleDrag.draggedEmployeeId;
      const departmentId = payload?.departmentId || state.node;
      if (draggedEmployeeId && targetEmployeeId && draggedEmployeeId !== targetEmployeeId) {
        if (reorderEmployeesInDepartment(departmentId, draggedEmployeeId, targetEmployeeId)) toast('Порядок сотрудников обновлен');
      }
      state.peopleDrag = { draggedEmployeeId: null, overEmployeeId: null };
      render();
    };
  });
  app.querySelectorAll('[data-msg]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); toast(`Написать: ${btn.dataset.msg}`); });
  app.querySelectorAll('[data-close-details]').forEach((btn) => btn.onclick = () => toast('Карточка свернута (mock)'));
  app.querySelectorAll('[data-show-in-structure]').forEach((btn) => btn.onclick = () => {
    const nodeId = btn.dataset.showInStructure;
    if (data.nodes[nodeId]) state.node = nodeId;
    state.sel = { kind: 'node', id: state.node };
    toast(`Показано в структуре: ${data.nodes[state.node].name}`);
    render();
  });
  app.querySelectorAll('[data-open-profile]').forEach((btn) => btn.onclick = () => toast(`Открыть профиль: ${btn.dataset.openProfile}`));
  app.querySelectorAll('[data-quick-leader]').forEach((btn) => btn.onclick = () => toast(`Быстрые действия: ${btn.dataset.quickLeader}`));
  app.querySelectorAll('[data-open-all-chats]').forEach((btn) => btn.onclick = () => toast(`Смотреть все чаты: ${btn.dataset.openAllChats}`));
  app.querySelectorAll('[data-open-file-section]').forEach((btn) => btn.onclick = () => toast(`Открыть раздел файлов: ${btn.dataset.openFileSection}`));
  app.querySelectorAll('[data-open-people]').forEach((btn) => btn.onclick = () => {
    state.tab = 'people';
    state.sel = { kind: 'node', id: btn.dataset.openPeople };
    render();
  });
  app.querySelectorAll('[data-history]').forEach((btn) => btn.onclick = () => { state.isHistoryDrawerOpen = true; state.activeHistoryFilter = 'all'; render(); });
  app.querySelectorAll('[data-history-filter]').forEach((btn) => btn.onclick = () => { state.activeHistoryFilter = btn.dataset.historyFilter; render(); });
  app.querySelectorAll('[data-close-history]').forEach((btn) => btn.onclick = (e) => {
    const target = e.target;
    if (target.closest('.history-drawer') && btn.classList.contains('drawer-overlay')) return;
    if (e.target === e.currentTarget || btn.dataset.closeHistory === '1') {
      state.isHistoryDrawerOpen = false;
      render();
    }
  });
  app.querySelectorAll('[data-toggle-details-child]').forEach((btn) => btn.onclick = () => {
    const childId = btn.dataset.toggleDetailsChild;
    state.detailsExpandedChildIds[childId] = !state.detailsExpandedChildIds[childId];
    render();
  });
  app.querySelectorAll('[data-primary-chat]').forEach((btn) => btn.onclick = () => openPrimaryChat(btn.dataset.primaryChat));
  app.querySelectorAll('[data-open-chat]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const chat = data.chats.find((c) => c.id === btn.dataset.openChat); if (chat) toast(`Открыть чат: ${chat.name}`); });
  app.querySelectorAll('[data-open-file]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); toast(`Открыть файл: ${btn.dataset.openFile}`); });
  app.querySelectorAll('[data-open-structure-settings]').forEach((btn) => btn.onclick = () => openStructureSettings());
  app.querySelectorAll('[data-close-structure-settings]').forEach((btn) => btn.onclick = (e) => {
    const target = e.target;
    if (target.closest('.settings-drawer') && btn.classList.contains('drawer-overlay')) return;
    if (e.target === e.currentTarget || btn.dataset.closeStructureSettings === '1') closeStructureSettings();
  });
  app.querySelectorAll('[data-toggle-tree-dnd]').forEach((toggleButton) => toggleButton.onclick = () => {
    state.structureSettings.dragAndDropEnabled = !state.structureSettings.dragAndDropEnabled;
    toast(state.structureSettings.dragAndDropEnabled ? 'Drag-and-drop включен' : 'Drag-and-drop отключен');
    addHistoryEntry({
      departmentId: state.node,
      eventType: 'settings_changed',
      description: `Изменена настройка drag-and-drop: ${state.structureSettings.dragAndDropEnabled ? 'включено' : 'выключено'}`,
      actor: 'Администратор',
      timeLabel: 'только что',
    });
    render();
  });
  app.querySelectorAll('[data-ask-reset-structure]').forEach((btn) => btn.onclick = () => { state.isResetStructureConfirmOpen = true; render(); });
  app.querySelectorAll('[data-cancel-reset-structure]').forEach((btn) => btn.onclick = () => { state.isResetStructureConfirmOpen = false; render(); });
  app.querySelectorAll('[data-confirm-reset-structure]').forEach((btn) => btn.onclick = () => {
    resetStructureOrder();
    state.isResetStructureConfirmOpen = false;
    toast('Пользовательский порядок сброшен');
    render();
  });
  app.querySelectorAll('[data-structure-permission]').forEach((select) => select.onchange = () => {
    state.structureSettings[select.dataset.structurePermission] = select.value;
    toast('Настройка обновлена');
    addHistoryEntry({
      departmentId: state.node,
      eventType: 'settings_changed',
      description: `Обновлены права в настройке "${select.dataset.structurePermission}"`,
      actor: 'Администратор',
      timeLabel: 'только что',
    });
  });

  app.querySelectorAll('[data-open-add]').forEach((btn) => btn.onclick = () => openAddModal(btn.dataset.openAdd, 'employee'));
  app.querySelectorAll('[data-add-type]').forEach((btn) => btn.onclick = () => { state.addType = btn.dataset.addType; render(); });
  app.querySelectorAll('[data-close-modal]').forEach((btn) => btn.onclick = (e) => { if (e.target === e.currentTarget || btn.dataset.closeModal === '1') { state.isAddModalOpen = false; render(); } });
  const modal = app.querySelector('.modal'); if (modal) modal.onclick = (event) => event.stopPropagation();
  app.querySelectorAll('[data-submit-add]').forEach((btn) => btn.onclick = () => {
    state.isAddModalOpen = false;
    toast(`${submitLabels[btn.dataset.submitAdd]}: mock flow`);
    const type = btn.dataset.submitAdd;
    const eventTypeByEntity = { employee: 'added_employee', position: 'added_position', department: 'created_department', chat: 'created_chat', file: 'settings_changed' };
    addHistoryEntry({
      departmentId: state.addContextNodeId,
      eventType: eventTypeByEntity[type],
      description: `${submitLabels[type]}: mock flow`,
      actor: 'Пользователь',
      timeLabel: 'только что',
    });
    render();
  });
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
    if (state.isHistoryDrawerOpen) { state.isHistoryDrawerOpen = false; render(); return; }
    if (state.isStructureSettingsOpen) { closeStructureSettings(); return; }
    if (state.openTreeMenuNodeId || state.isCenterMenuOpen) { state.openTreeMenuNodeId = null; state.isCenterMenuOpen = false; render(); }
  }
});

render();
