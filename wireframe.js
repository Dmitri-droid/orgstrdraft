const data = {
  nodes: {
    root: { id: 'root', name: 'Вся организация', type: 'company', typeLabel: 'Компания', icon: '🏢', parent: null, children: ['hq', 'rnd', 'vacancies'], summary: '8 участников · 3 руководителя · 4 чата · 5 файлов', leader: 'Генеральный директор', desc: 'Корневой узел', primaryChatId: null },
    hq: { id: 'hq', name: 'Штаб Нейроком', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'root', children: ['feo', 'hr-chat'], summary: '6 участников · 2 руководителя · 3 чата · 4 файла', leader: 'Лариса Иванова', desc: 'Операционный центр', primaryChatId: 'c3' },
    feo: { id: 'feo', name: 'Штаб ФЭО', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'hq', children: ['plan3', 'feo-b', 'all-system'], summary: '5 участников · 1 руководитель · 3 чата · 4 файла', leader: 'Иван Демьянов', desc: 'Финансы и аналитика', primaryChatId: 'c1' },
    plan3: { id: 'plan3', name: 'Планерки 3', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'feo', children: [], summary: '3 участника · 1 чат', leader: 'Марина Петрова', desc: 'Оперативные встречи', primaryChatId: 'c2' },
    'feo-b': { id: 'feo-b', name: 'Штаб ФЭО-Б', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'feo', children: [], summary: '3 участника · 2 файла', leader: 'Пенелопа Пыльная', desc: 'Аналитическая подгруппа', primaryChatId: 'c4' },
    'all-system': { id: 'all-system', name: 'Все', type: 'system', typeLabel: 'Системная выборка', icon: '☰', parent: 'feo', children: [], summary: '5 участников · 3 чата', leader: 'Система', desc: 'Системная smart-выборка', primaryChatId: null },
    rnd: { id: 'rnd', name: 'Штаб НИОКР', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'root', children: [], summary: '2 участника · 1 чат', leader: 'Павел Белов', desc: 'Исследования', primaryChatId: null },
    'hr-chat': { id: 'hr-chat', name: 'Руководители ФЭО', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'hq', children: [], summary: '5 участников', leader: 'Лариса Иванова', desc: 'Координационный чат', primaryChatId: 'c3' },
    vacancies: { id: 'vacancies', name: 'Вакансии', type: 'system', typeLabel: 'Системная группа · HR Hub', icon: '☰', parent: 'root', children: [], summary: 'Не привязан к подразделению', leader: 'HR / People Hub', desc: 'Системная витрина подбора и кадрового статуса', primaryChatId: null },
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
const vacanciesHubData = {
  employees: [
    { id: 'vh-e1', name: 'Анна Громова', status: 'online', role: 'Руководитель направления', action: 'Открыть' },
    { id: 'vh-e2', name: 'Иван Демьянов', status: 'offline', role: 'Аналитик', action: 'Открыть' },
    { id: 'vh-e3', name: 'Марина Петрова', status: 'online', role: 'Копирайтер', action: 'Связаться' },
    { id: 'vh-e4', name: 'Елена Смирнова', status: 'online', role: 'Руководитель финконтроля', action: 'Связаться' },
  ],
  candidates: [
    { id: 'vh-c1', name: 'Дмитрий Беляев', status: 'на рассмотрении', role: 'ML инженер' },
    { id: 'vh-c2', name: 'Олег Соколов', status: 'интервью', role: 'Юрист' },
    { id: 'vh-c3', name: 'Алина Сергеева', status: 'оффер', role: 'Аналитик' },
    { id: 'vh-c4', name: 'Никита Орлов', status: 'резерв', role: 'DevOps' },
  ],
  former: [
    { id: 'vh-f1', name: 'Роман Кузнецов', status: 'уволен', role: 'Юрист' },
    { id: 'vh-f2', name: 'Тимур Азаров', status: 'переведен', role: 'Руководитель лаборатории' },
  ],
  blocked: [
    { id: 'vh-b1', name: 'test_user_01', status: 'заблокирован', role: 'Тестовый аккаунт' },
    { id: 'vh-b2', name: 'contractor_x', status: 'доступ отозван', role: 'Внешний подрядчик' },
  ],
};
const chatParticipantsByChatId = {};

function extendMockTreeData() {
  const nodeDefs = [
    { id: 'fin-control', name: 'Центр финконтроля', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'hq', children: ['fin-control-chat', 'fin-control-a'], summary: '5 участников · 2 чата', leader: 'Елена Смирнова', desc: 'Контроль бюджетных лимитов.', primaryChatId: 'c5' },
    { id: 'fin-control-a', name: 'Группа комплаенс', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'fin-control', children: [], summary: '3 участника · 1 чат', leader: 'Анна Громова', desc: 'Контроль операций', primaryChatId: null },
    { id: 'fin-control-chat', name: 'Финконтроль · оперативка', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'fin-control', children: [], summary: '12 участников', leader: 'Елена Смирнова', desc: 'Оперативный чат', primaryChatId: 'c5' },
    { id: 'legal', name: 'Юридический блок', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'hq', children: ['legal-docs', 'legal-chat'], summary: '4 участника · 2 чата', leader: 'Роман Кузнецов', desc: 'Договорная работа', primaryChatId: 'c6' },
    { id: 'legal-docs', name: 'Группа договоров', type: 'team', typeLabel: 'Отдел', icon: '▤', parent: 'legal', children: [], summary: '2 участника', leader: 'Ольга Миронова', desc: 'Договоры и NDA', primaryChatId: null },
    { id: 'legal-chat', name: 'Юридический чат', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'legal', children: [], summary: '9 участников', leader: 'Роман Кузнецов', desc: 'Юридические вопросы', primaryChatId: 'c6' },
    { id: 'corp-it', name: 'Корпоративные системы', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'root', children: ['corp-it-infra', 'corp-it-helpdesk', 'corp-it-chat', 'corp-it-system'], summary: '8 участников · 3 чата', leader: 'Артем Волков', desc: 'ИТ-платформы компании', primaryChatId: 'c14' },
    { id: 'corp-it-infra', name: 'Инфраструктурная группа', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'corp-it', children: [], summary: '3 участника', leader: 'Артем Волков', desc: 'Сети и серверы', primaryChatId: null },
    { id: 'corp-it-helpdesk', name: 'Helpdesk', type: 'team', typeLabel: 'Отдел', icon: '▤', parent: 'corp-it', children: [], summary: '3 участника', leader: 'Полина Ершова', desc: 'Поддержка сотрудников', primaryChatId: null },
    { id: 'corp-it-chat', name: 'IT Ops чат', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'corp-it', children: [], summary: '13 участников', leader: 'Артем Волков', desc: 'Оперативный чат IT', primaryChatId: 'c14' },
    { id: 'corp-it-system', name: 'Системная выборка IT', type: 'system', typeLabel: 'Системная выборка', icon: '☰', parent: 'corp-it', children: [], summary: '8 участников · 4 файла', leader: 'Система', desc: 'ИТ-инциденты и метрики', primaryChatId: null },
    { id: 'rnd-core', name: 'Центр НИОКР', type: 'team', typeLabel: 'Отдел', icon: '▤', parent: 'rnd', children: ['rnd-core-a', 'rnd-core-chat'], summary: '4 участника · 2 чата', leader: 'Павел Белов', desc: 'Координация R&D', primaryChatId: 'c10' },
    { id: 'rnd-core-a', name: 'Группа прототипов', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'rnd-core', children: ['rnd-core-a-chat'], summary: '3 участника · 1 чат', leader: 'Дмитрий Беляев', desc: 'Прототипирование', primaryChatId: 'c11' },
    { id: 'rnd-core-a-chat', name: 'Прототипы · стендап', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'rnd-core-a', children: [], summary: '6 участников', leader: 'Дмитрий Беляев', desc: 'Стендап группы', primaryChatId: 'c11' },
    { id: 'rnd-core-chat', name: 'НИОКР · общий чат', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'rnd-core', children: [], summary: '16 участников', leader: 'Павел Белов', desc: 'Основной чат НИОКР', primaryChatId: 'c10' },
    { id: 'rnd-lab', name: 'Лаборатория ИИ', type: 'department', typeLabel: 'Департамент', icon: '▦', parent: 'rnd', children: ['rnd-lab-ml', 'rnd-lab-nlp', 'rnd-lab-chat'], summary: '5 участников · 2 чата', leader: 'Тимур Азаров', desc: 'ML/NLP направления', primaryChatId: 'c12' },
    { id: 'rnd-lab-ml', name: 'ML группа', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'rnd-lab', children: [], summary: '2 участника', leader: 'Алина Сергеева', desc: 'ML-модели', primaryChatId: null },
    { id: 'rnd-lab-nlp', name: 'NLP группа', type: 'group', typeLabel: 'Группа', icon: '◫', parent: 'rnd-lab', children: [], summary: '2 участника', leader: 'Илья Медведев', desc: 'NLP-пайплайны', primaryChatId: null },
    { id: 'rnd-lab-chat', name: 'Лаборатория ИИ · чат', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'rnd-lab', children: [], summary: '11 участников', leader: 'Тимур Азаров', desc: 'Чат лаборатории', primaryChatId: 'c12' },
    { id: 'rnd-system', name: 'Системная выборка НИОКР', type: 'system', typeLabel: 'Системная выборка', icon: '☰', parent: 'rnd', children: [], summary: '10 участников · 7 файлов', leader: 'Система', desc: 'R&D активность', primaryChatId: null },
    { id: 'rnd-chat', name: 'НИОКР · руководители', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'rnd', children: [], summary: '5 участников', leader: 'Павел Белов', desc: 'Управленческий чат', primaryChatId: 'c13' },
    { id: 'reporting-chat', name: 'Отчетность ФЭО', type: 'chat', typeLabel: 'Чат подразделения', icon: '💬', parent: 'feo', children: [], summary: '14 участников', leader: 'Иван Демьянов', desc: 'Кросс-командный чат отчетности', primaryChatId: 'c9' },
  ];
  nodeDefs.forEach((node) => { data.nodes[node.id] = node; });
  data.nodes.root.children = ['hq', 'rnd', 'corp-it', 'vacancies'];
  data.nodes.hq.children = ['feo', 'fin-control', 'legal', 'hr-chat'];
  data.nodes.feo.children = ['plan3', 'feo-b', 'all-system', 'reporting-chat'];
  data.nodes.rnd.children = ['rnd-core', 'rnd-lab', 'rnd-system', 'rnd-chat'];

  data.people.push(
    { id: 'e6', name: 'Елена Смирнова', pos: 'Руководитель финконтроля', sub: 'Контроль бюджета', status: 'online', dep: 'fin-control' },
    { id: 'e7', name: 'Анна Громова', pos: 'Комплаенс-аналитик', sub: 'Операционный контроль', status: 'away', dep: 'fin-control-a' },
    { id: 'e8', name: 'Роман Кузнецов', pos: 'Юрист', sub: 'Юридический блок', status: 'online', dep: 'legal' },
    { id: 'e9', name: 'Ольга Миронова', pos: 'Юрист по договорам', sub: 'Договоры', status: 'offline', dep: 'legal-docs' },
    { id: 'e10', name: 'Артем Волков', pos: 'IT Ops Lead', sub: 'Корпоративные системы', status: 'online', dep: 'corp-it' },
    { id: 'e11', name: 'Полина Ершова', pos: 'Helpdesk Lead', sub: 'Сервис-деск', status: 'away', dep: 'corp-it-helpdesk' },
    { id: 'e12', name: 'Тимур Азаров', pos: 'Руководитель лаборатории ИИ', sub: 'ML/NLP', status: 'online', dep: 'rnd-lab' },
    { id: 'e13', name: 'Алина Сергеева', pos: 'ML инженер', sub: 'ML группа', status: 'online', dep: 'rnd-lab-ml' },
    { id: 'e14', name: 'Илья Медведев', pos: 'NLP инженер', sub: 'NLP группа', status: 'away', dep: 'rnd-lab-nlp' },
  );
  data.positions.push(
    { id: 'p5', title: 'Руководитель финконтроля', status: 'Занята', assignee: 'Елена Смирнова', dep: 'fin-control' },
    { id: 'p6', title: 'Юрист', status: 'Занята', assignee: 'Роман Кузнецов', dep: 'legal' },
    { id: 'p7', title: 'IT Ops Lead', status: 'Занята', assignee: 'Артем Волков', dep: 'corp-it' },
    { id: 'p8', title: 'ML инженер', status: 'Занята', assignee: 'Алина Сергеева', dep: 'rnd-lab-ml' },
  );
  data.chats.push(
    { id: 'c5', name: 'Финконтроль · оперативка', type: 'Операционный', participants: 12, last: 'Лимиты обновлены', dep: 'fin-control', nodeId: 'fin-control-chat' },
    { id: 'c6', name: 'Юридический чат', type: 'Рабочий', participants: 9, last: 'Новый шаблон NDA', dep: 'legal', nodeId: 'legal-chat' },
    { id: 'c9', name: 'Отчетность ФЭО', type: 'Рабочий', participants: 14, last: 'Готова сводка', dep: 'feo', nodeId: 'reporting-chat' },
    { id: 'c10', name: 'НИОКР · общий чат', type: 'Командный', participants: 16, last: 'Статус экспериментов', dep: 'rnd-core', nodeId: 'rnd-core-chat' },
    { id: 'c11', name: 'Прототипы · стендап', type: 'Стендап', participants: 6, last: 'Демо в пятницу', dep: 'rnd-core-a', nodeId: 'rnd-core-a-chat' },
    { id: 'c12', name: 'Лаборатория ИИ · чат', type: 'Командный', participants: 11, last: 'Датасет загружен', dep: 'rnd-lab', nodeId: 'rnd-lab-chat' },
    { id: 'c13', name: 'НИОКР · руководители', type: 'Управленческий', participants: 5, last: 'KPI квартала', dep: 'rnd', nodeId: 'rnd-chat' },
    { id: 'c14', name: 'IT Ops чат', type: 'Операционный', participants: 13, last: 'Инцидент закрыт', dep: 'corp-it', nodeId: 'corp-it-chat' },
  );
  data.files.push(
    { id: 'f4', name: 'Регламент финконтроля.pdf', type: 'PDF', owner: 'Елена Смирнова', dep: 'fin-control' },
    { id: 'f5', name: 'Шаблон NDA.docx', type: 'DOCX', owner: 'Роман Кузнецов', dep: 'legal' },
    { id: 'f6', name: 'IT incident runbook.pdf', type: 'PDF', owner: 'Артем Волков', dep: 'corp-it' },
    { id: 'f7', name: 'ML metrics.csv', type: 'CSV', owner: 'Алина Сергеева', dep: 'rnd-lab-ml' },
    { id: 'f8', name: 'NLP glossary.docx', type: 'DOCX', owner: 'Илья Медведев', dep: 'rnd-lab-nlp' },
  );
}

extendMockTreeData();

function ensureRichDemoData() {
  const candidateNodeIds = Object.values(data.nodes)
    .filter((node) => node.type !== 'chat' && node.type !== 'system')
    .map((node) => node.id);

  const statuses = ['online', 'away', 'offline'];
  const rolePool = ['Аналитик', 'Координатор', 'Специалист', 'Менеджер', 'Контролёр', 'Эксперт', 'Руководитель направления'];
  const positionPool = ['Аналитик', 'Финансовый контролёр', 'Координатор', 'Руководитель отдела', 'Методолог', 'Операционный менеджер'];
  const chatPool = ['Общий чат', 'Планёрка', 'Руководители', 'Оперативка', 'Согласования'];
  const filePool = ['Регламент', 'План работ', 'KPI отчёт', 'Шаблон', 'Roadmap', 'Сводка'];
  const firstNames = ['Иван', 'Марина', 'Елена', 'Дмитрий', 'Ольга', 'Артем', 'Полина', 'Анна', 'Роман', 'Тимур', 'Алина', 'Илья'];
  const lastNames = ['Демьянов', 'Петрова', 'Смирнова', 'Беляев', 'Миронова', 'Волков', 'Ершова', 'Громова', 'Кузнецов', 'Азаров', 'Сергеева', 'Медведев'];

  let personSeq = data.people.length + 1;
  let positionSeq = data.positions.length + 1;
  let chatSeq = data.chats.length + 1;
  let fileSeq = data.files.length + 1;
  const nextName = () => `${firstNames[personSeq % firstNames.length]} ${lastNames[personSeq % lastNames.length]}`;

  candidateNodeIds.forEach((nodeId, index) => {
    const node = data.nodes[nodeId];
    const peopleInNode = data.people.filter((item) => item.dep === nodeId);
    while (peopleInNode.length < 3) {
      const name = nextName();
      peopleInNode.push({ id: `e${personSeq}`, name, pos: rolePool[(personSeq + index) % rolePool.length], sub: node.name, status: statuses[personSeq % statuses.length], dep: nodeId });
      personSeq += 1;
    }
    peopleInNode.forEach((person) => {
      if (!data.people.find((item) => item.id === person.id)) data.people.push(person);
    });

    const positionsInNode = data.positions.filter((item) => item.dep === nodeId);
    while (positionsInNode.length < 3) {
      const occupied = positionsInNode.length % 2 === 0;
      positionsInNode.push({
        id: `p${positionSeq}`,
        title: positionPool[(positionSeq + index) % positionPool.length],
        status: occupied ? 'Занята' : 'Вакантна',
        assignee: occupied ? (peopleInNode[positionsInNode.length % peopleInNode.length]?.name || '—') : '—',
        dep: nodeId,
      });
      positionSeq += 1;
    }
    if (!positionsInNode.some((item) => item.status === 'Вакантна')) {
      positionsInNode.push({ id: `p${positionSeq}`, title: 'Вакантная должность', status: 'Вакантна', assignee: '—', dep: nodeId });
      positionSeq += 1;
    }
    positionsInNode.forEach((position) => {
      if (!data.positions.find((item) => item.id === position.id)) data.positions.push(position);
    });

    const chatsInNode = data.chats.filter((item) => item.dep === nodeId || item.nodeId === nodeId);
    while (chatsInNode.length < 3) {
      const isMain = chatsInNode.length === 0;
      chatsInNode.push({
        id: `c${chatSeq}`,
        name: `${chatPool[(chatSeq + index) % chatPool.length]} ${node.name}`,
        type: isMain ? 'Основной' : 'Рабочий',
        participants: 5 + ((chatSeq + index) % 20),
        last: 'Обновление статуса',
        dep: nodeId,
        nodeId: null,
      });
      chatSeq += 1;
    }
    chatsInNode.forEach((chat) => {
      if (!data.chats.find((item) => item.id === chat.id)) data.chats.push(chat);
    });

    const filesInNode = data.files.filter((item) => item.dep === nodeId);
    const fileTypes = ['PDF', 'XLSX', 'DOCX'];
    while (filesInNode.length < 3) {
      filesInNode.push({
        id: `f${fileSeq}`,
        name: `${filePool[(fileSeq + index) % filePool.length]} ${node.name}.${fileTypes[fileSeq % fileTypes.length].toLowerCase()}`,
        type: fileTypes[fileSeq % fileTypes.length],
        owner: peopleInNode[fileSeq % peopleInNode.length]?.name || node.leader,
        dep: nodeId,
      });
      fileSeq += 1;
    }
    filesInNode.forEach((file) => {
      if (!data.files.find((item) => item.id === file.id)) data.files.push(file);
    });
  });
}

ensureRichDemoData();
function ensureChatParticipants() {
  const statusCycle = ['online', 'away', 'offline'];
  const firstNames = ['София', 'Кирилл', 'Виктория', 'Максим', 'Наталья', 'Егор', 'Дарья', 'Павел', 'Ксения', 'Лев', 'Вероника', 'Георгий'];
  const lastNames = ['Орлова', 'Никитин', 'Калинина', 'Титов', 'Селезнева', 'Фомин', 'Жукова', 'Крылов', 'Дроздова', 'Котов', 'Рябова', 'Сафонов'];
  let syntheticSeq = 1;
  const nextSynthetic = (dep, roleHint = 'Специалист') => {
    const id = `cp${syntheticSeq}`;
    const name = `${firstNames[syntheticSeq % firstNames.length]} ${lastNames[syntheticSeq % lastNames.length]}`;
    syntheticSeq += 1;
    return { id, name, pos: roleHint, sub: data.nodes[dep]?.name || 'Не привязан к подразделению', status: statusCycle[syntheticSeq % statusCycle.length], dep };
  };
  const targetCount = (chat) => {
    if (chat.name.includes('Общий чат ФЭО')) return 24;
    if (chat.name.includes('Руководители')) return 8;
    if (chat.name.includes('Планерка')) return 10;
    if (chat.name.includes('Юридический чат')) return 10;
    if (chat.name.includes('Финконтроль')) return 10;
    if (chat.type === 'Командный') return 20;
    if (chat.type === 'Управленческий') return 8;
    if (chat.type === 'Операционный') return 10;
    return Math.max(8, Math.min(12, Number(chat.participants) || 8));
  };
  const allPeople = [...data.people];
  data.chats.forEach((chat, chatIndex) => {
    const desired = targetCount(chat);
    const inDepartment = allPeople.filter((person) => person.dep === chat.dep);
    const leaders = allPeople.filter((person) => person.pos.toLowerCase().includes('руковод'));
    const basePool = chat.name.includes('Руководители') ? leaders : inDepartment;
    const pool = (basePool.length ? basePool : allPeople).map((person) => ({ ...person }));
    const participants = [];
    const used = new Set();
    while (participants.length < desired && pool.length) {
      const candidate = pool[(participants.length + chatIndex) % pool.length];
      if (used.has(candidate.id)) {
        if (used.size >= pool.length) break;
        continue;
      }
      used.add(candidate.id);
      participants.push(candidate);
    }
    while (participants.length < desired) {
      participants.push(nextSynthetic(chat.dep, chat.name.includes('Руководители') ? 'Руководитель направления' : 'Специалист'));
    }
    participants.forEach((participant) => {
      if (!data.people.find((person) => person.id === participant.id)) data.people.push(participant);
    });
    chatParticipantsByChatId[chat.id] = participants;
    chat.participants = participants.map((participant) => participant.id);
    chat.participantsIds = [...chat.participants];
  });
}
ensureChatParticipants();
function syncChatNodeSummaries() {
  Object.values(data.nodes).forEach((node) => {
    if (node.type !== 'chat') return;
    const chat = chatByNodeId(node.id);
    if (!chat) return;
    const count = chatParticipantCount(chat);
    node.summary = `${count} участников · 1 чат`;
  });
}
syncChatNodeSummaries();

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
  treeSearchInput: '',
  treeSearchQuery: '',
  treeSearchResults: [],
  treeSearchDropdownOpen: false,
  treeSearchActiveIndex: 0,
  activeTreeFilter: 'all',
  vacanciesTab: 'all',
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
  sidebarNestedContext: null,
  sidebarNavStack: [],
  rootTabMode: { people: 'summary', positions: 'summary', chats: 'summary', files: 'summary' },
  positionsSearchQuery: '',
  positionsStatusFilter: 'all',
  flashNodeId: null,
  pendingRevealNodeId: null,
  pendingRevealEmployeeId: null,
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
let treeSearchDebounceTimerId = null;
const VALID_TABS = ['people', 'positions', 'chats', 'files', 'about'];
function setActiveTab(nextTab) {
  state.tab = VALID_TABS.includes(nextTab) ? nextTab : 'people';
}
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
function flattenedTreeOrder() {
  const ordered = [];
  const walk = (nodeId) => {
    if (!data.nodes[nodeId]) return;
    ordered.push(nodeId);
    getChildren(nodeId).forEach((childId) => walk(childId));
  };
  walk('root');
  return ordered;
}
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
function breadcrumbNodeIds(id) { const out = []; let cur = id; while (cur) { out.unshift(cur); cur = data.nodes[cur].parent; } return out; }
function addHistoryEntry(entry) { state.historyEntries = [{ id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...entry }, ...state.historyEntries]; }
function escapeHtml(text) { return String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const source = String(text);
  const lower = source.toLowerCase();
  const needle = query.toLowerCase();
  const index = lower.indexOf(needle);
  if (index < 0) return escapeHtml(source);
  return `${escapeHtml(source.slice(0, index))}<mark>${escapeHtml(source.slice(index, index + needle.length))}</mark>${escapeHtml(source.slice(index + needle.length))}`;
}
function resolveNodeTypeLabel(nodeType) { return nodeType === 'chat' ? 'Чат' : 'Подразделение'; }
function chatByNodeId(nodeId) {
  const node = data.nodes[nodeId];
  if (!node || node.type !== 'chat') return null;
  return data.chats.find((chat) => chat.nodeId === nodeId) || data.chats.find((chat) => chat.id === node.primaryChatId) || data.chats.find((chat) => chat.dep === nodeId) || null;
}
function chatParticipants(chatId) {
  return chatParticipantsByChatId[chatId] || [];
}
function chatParticipantCount(chat) {
  if (Array.isArray(chat.participants) && chat.participants.length) return chat.participants.length;
  if (Array.isArray(chat.participantsIds) && chat.participantsIds.length) return chat.participantsIds.length;
  return chatParticipants(chat.id).length || Number(chat.participants) || 0;
}
function personById(personId) {
  return data.people.find((person) => person.id === personId) || null;
}
function chatPeople(chat) {
  if (!chat) return [];
  if (Array.isArray(chat.participants) && chat.participants.length) {
    return chat.participants.map((participantId) => personById(participantId)).filter(Boolean);
  }
  if (Array.isArray(chat.participantsIds) && chat.participantsIds.length) {
    return chat.participantsIds.map((participantId) => personById(participantId)).filter(Boolean);
  }
  return chatParticipants(chat.id);
}
function peopleForNode(nodeId) {
  const node = data.nodes[nodeId];
  if (!node) return [];
  if (node.type === 'chat') {
    const chat = chatByNodeId(nodeId);
    if (!chat) return [];
    const existing = chatPeople(chat);
    if (existing.length) return existing;
    const fallbackCount = chatParticipantCount(chat);
    return Array.from({ length: fallbackCount }).map((_, index) => ({
      id: `fallback-${chat.id}-${index + 1}`,
      name: `Участник ${index + 1}`,
      pos: 'Участник чата',
      sub: data.nodes[chat.dep]?.name || 'Чат',
      status: index % 3 === 0 ? 'online' : index % 3 === 1 ? 'away' : 'offline',
      dep: chat.dep,
    }));
  }
  if (nodeId === 'root') return data.people;
  return (state.employeeOrderByDepartment[nodeId] || []).map((id) => data.people.find((x) => x.id === id)).filter(Boolean);
}
function isOrgNode(node) { return ['company', 'department', 'team', 'group'].includes(node.type); }
function normalizeTreeFilter(filter) { return ['all', 'departments', 'chats'].includes(filter) ? filter : 'all'; }
function buildTreeFilterModel(activeFilter) {
  const safeFilter = normalizeTreeFilter(activeFilter);
  if (safeFilter === 'all') return { visibleNodeIds: null, hasRenderableNodes: true };

  const matchedNodeIds = Object.values(data.nodes)
    .filter((node) => (safeFilter === 'departments' ? isOrgNode(node) : node.type === 'chat'))
    .map((node) => node.id);
  const visibleNodeIds = new Set();
  matchedNodeIds.forEach((nodeId) => {
    let current = nodeId;
    while (current) {
      visibleNodeIds.add(current);
      current = data.nodes[current]?.parent || null;
    }
  });
  return { visibleNodeIds, hasRenderableNodes: matchedNodeIds.length > 0 };
}
function ensureNodeVisibleInTreeFilter(nodeId) {
  const filterModel = buildTreeFilterModel(state.activeTreeFilter);
  const isVisible = !filterModel.visibleNodeIds || filterModel.visibleNodeIds.has(nodeId);
  if (isVisible) return;
  state.activeTreeFilter = 'all';
  toast('Фильтр переключен на «Все», чтобы показать выбранный узел');
}
function buildTreeSearchModel(query, activeFilter = state.activeTreeFilter) {
  const safeFilter = normalizeTreeFilter(activeFilter);
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return { results: [], visibleNodeIds: null, autoExpandNodeIds: null, matchedNodeIds: null };

  const filterModel = buildTreeFilterModel(safeFilter);
  const results = [];
  const matchedNodeIds = new Set();
  const visibleNodeIds = new Set(['root']);
  const autoExpandNodeIds = new Set(['root']);
  const addNodePath = (nodeId) => {
    let current = nodeId;
    while (current) {
      visibleNodeIds.add(current);
      const parentId = data.nodes[current]?.parent || null;
      if (parentId) autoExpandNodeIds.add(parentId);
      current = parentId;
    }
  };
  const nodeContext = (nodeId) => {
    const parentId = data.nodes[nodeId]?.parent;
    return parentId ? data.nodes[parentId]?.name || 'Оргструктура' : 'Корень структуры';
  };

  Object.values(data.nodes).forEach((node) => {
    const nodeAllowedByFilter = safeFilter === 'all'
      || (safeFilter === 'departments' && isOrgNode(node))
      || (safeFilter === 'chats' && node.type === 'chat');
    if (!nodeAllowedByFilter) return;
    if (filterModel.visibleNodeIds && !filterModel.visibleNodeIds.has(node.id)) return;
    if (!node.name.toLowerCase().includes(normalizedQuery)) return;
    matchedNodeIds.add(node.id);
    addNodePath(node.id);
    results.push({ id: `node:${node.id}`, kind: 'node', title: node.name, typeLabel: resolveNodeTypeLabel(node.type), context: nodeContext(node.id), nodeId: node.id });
  });
  if (safeFilter === 'all') {
  data.people.forEach((person) => {
    if (!person.name.toLowerCase().includes(normalizedQuery)) return;
    addNodePath(person.dep);
    results.push({ id: `employee:${person.id}`, kind: 'employee', title: person.name, typeLabel: 'Сотрудник', context: data.nodes[person.dep]?.name || 'Оргструктура', employeeId: person.id, nodeId: person.dep });
  });
  }
  if (safeFilter === 'all' || safeFilter === 'chats') {
  data.chats.forEach((chat) => {
    if (!chat.name.toLowerCase().includes(normalizedQuery)) return;
    const nodeId = chat.nodeId && data.nodes[chat.nodeId] ? chat.nodeId : chat.dep;
    if (filterModel.visibleNodeIds && !filterModel.visibleNodeIds.has(nodeId)) return;
    addNodePath(nodeId);
    results.push({ id: `chat:${chat.id}`, kind: 'chat', title: chat.name, typeLabel: 'Чат', context: data.nodes[nodeId]?.name || 'Оргструктура', chatId: chat.id, nodeId });
  });
  }
  if (safeFilter === 'all') {
  data.positions.forEach((position) => {
    if (!position.title.toLowerCase().includes(normalizedQuery)) return;
    addNodePath(position.dep);
    results.push({ id: `position:${position.id}`, kind: 'position', title: position.title, typeLabel: 'Должность', context: data.nodes[position.dep]?.name || 'Оргструктура', positionId: position.id, nodeId: position.dep });
  });
  }

  return { results: results.slice(0, 30), visibleNodeIds, autoExpandNodeIds, matchedNodeIds };
}
function updateTreeSearch(nextValue) {
  state.treeSearchInput = nextValue;
  if (treeSearchDebounceTimerId !== null) window.clearTimeout(treeSearchDebounceTimerId);
  treeSearchDebounceTimerId = window.setTimeout(() => {
    state.treeSearchQuery = state.treeSearchInput.trim();
    const model = buildTreeSearchModel(state.treeSearchQuery, state.activeTreeFilter);
    state.treeSearchResults = model.results;
    state.treeSearchDropdownOpen = state.treeSearchQuery.length > 0 && model.results.length > 0;
    state.treeSearchActiveIndex = 0;
    renderForTreeInteraction();
  }, 150);
}
function clearTreeSearch({ keepFocus = false, preserveScroll = true } = {}) {
  if (treeSearchDebounceTimerId !== null) {
    window.clearTimeout(treeSearchDebounceTimerId);
    treeSearchDebounceTimerId = null;
  }
  state.treeSearchInput = '';
  state.treeSearchQuery = '';
  state.treeSearchResults = [];
  state.treeSearchDropdownOpen = false;
  state.treeSearchActiveIndex = 0;
  render({ preserveScroll, allowPreserveWithPendingReveal: preserveScroll });
  if (keepFocus) {
    window.requestAnimationFrame(() => {
      const input = app.querySelector('[data-tree-search-input]');
      if (input) input.focus();
    });
  }
}
function applyTreeSearchResult(result) {
  if (!result) return;
  focusNodeInTree(result.nodeId);
  if (result.kind === 'node') {
    state.sel = { kind: 'node', id: result.nodeId };
  }
  if (result.kind === 'employee') {
    setActiveTab('people');
    state.sel = { kind: 'employee', id: result.employeeId };
  }
  if (result.kind === 'chat') {
    setActiveTab('chats');
    state.sel = { kind: 'chat', id: result.chatId };
  }
  if (result.kind === 'position') {
    setActiveTab('positions');
    state.sel = { kind: 'position', id: result.positionId };
  }
  clearTreeSearch({ preserveScroll: false });
}

function focusNodeInTree(targetNodeId) {
  if (!data.nodes[targetNodeId]) return;
  let current = targetNodeId;
  while (current) {
    state.exp[current] = true;
    current = data.nodes[current].parent;
  }
  state.node = targetNodeId;
  state.sel = { kind: 'node', id: targetNodeId };
  state.pendingRevealNodeId = targetNodeId;
}
function navigateToNode(nodeId, { reveal = false } = {}) {
  if (!data.nodes[nodeId]) return;
  state.sidebarNestedContext = null;
  state.sidebarNavStack = [];
  if (reveal) {
    focusNodeInTree(nodeId);
  } else {
    state.node = nodeId;
    state.sel = { kind: 'node', id: nodeId };
    state.pendingRevealNodeId = null;
  }
  setActiveTab(data.nodes[nodeId].type === 'chat' ? 'chats' : 'people');
}
function pushSidebarContext() {
  state.sidebarNavStack.push({
    sel: { ...state.sel },
    node: state.node,
    tab: state.tab,
    nested: state.sidebarNestedContext ? { ...state.sidebarNestedContext } : null,
  });
}
function openSidebarSelection(selection) {
  pushSidebarContext();
  state.sidebarNestedContext = null;
  state.sel = { ...selection };
}
function openSidebarProfile(profileName) {
  const employee = data.people.find((item) => item.name === profileName);
  pushSidebarContext();
  state.sidebarNestedContext = {
    type: 'profile',
    name: profileName,
    subtitle: employee ? employee.pos : 'Профиль сотрудника',
  };
}
function sidebarBack() {
  const previous = state.sidebarNavStack.pop();
  if (!previous) return;
  state.node = previous.node;
  setActiveTab(previous.tab);
  state.sel = { ...previous.sel };
  state.sidebarNestedContext = previous.nested ? { ...previous.nested } : null;
}

function showInStructure(target) {
  state.sidebarNestedContext = null;
  state.sidebarNavStack = [];
  let targetNodeId = state.node;
  if (target.kind === 'node') {
    targetNodeId = target.nodeId;
    state.sel = { kind: 'node', id: target.nodeId };
  }
  if (target.kind === 'employee') {
    const employee = data.people.find((item) => item.id === target.employeeId);
    if (!employee) return;
    targetNodeId = employee.dep;
    setActiveTab('people');
    state.sel = { kind: 'employee', id: employee.id };
    state.pendingRevealEmployeeId = employee.id;
  }
  if (target.kind === 'position') {
    const position = data.positions.find((item) => item.id === target.positionId);
    if (!position) return;
    targetNodeId = position.dep;
    setActiveTab('positions');
    state.sel = { kind: 'position', id: position.id };
  }
  if (target.kind === 'chat') {
    const chat = data.chats.find((item) => item.id === target.chatId);
    if (!chat) return;
    targetNodeId = chat.nodeId && data.nodes[chat.nodeId] ? chat.nodeId : chat.dep;
    setActiveTab('chats');
    state.sel = { kind: 'chat', id: chat.id };
  }
  if (target.kind === 'file') {
    const file = data.files.find((item) => item.id === target.fileId);
    if (!file) return;
    targetNodeId = file.dep;
    setActiveTab('files');
    state.sel = { kind: 'file', id: file.id };
  }
  if (!data.nodes[targetNodeId]) return;
  ensureNodeVisibleInTreeFilter(targetNodeId);
  toast(`Показано в структуре: ${data.nodes[targetNodeId].name}`);
  focusNodeInTree(targetNodeId);
  render({ preserveScroll: false });
}

function processPendingReveal() {
  const targetNodeId = state.pendingRevealNodeId;
  if (!targetNodeId || !data.nodes[targetNodeId]) return;
  state.pendingRevealNodeId = null;
  state.flashNodeId = targetNodeId;
  const nodeEl = app.querySelector(`.tree-node[data-drop-node="${targetNodeId}"]`);
  if (nodeEl) nodeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  window.setTimeout(() => {
    if (state.flashNodeId === targetNodeId) {
      state.flashNodeId = null;
      render();
    }
  }, 1000);
}
function processPendingEmployeeReveal() {
  const employeeId = state.pendingRevealEmployeeId;
  if (!employeeId) return;
  state.pendingRevealEmployeeId = null;
  const employeeBody = app.querySelector(`[data-select-employee="${employeeId}"]`);
  const employeeRow = employeeBody?.closest('.list-row');
  if (!employeeRow) return;
  employeeRow.scrollIntoView({ block: 'center', behavior: 'smooth' });
  employeeRow.classList.add('focus-flash');
  window.setTimeout(() => employeeRow.classList.remove('focus-flash'), 900);
}

function openPrimaryChat(nodeId) {
  const node = data.nodes[nodeId];
  if (node.type === 'chat') {
    const chat = data.chats.find((c) => c.nodeId === nodeId) || data.chats.find((c) => c.id === node.primaryChatId);
    if (!chat) return toast('Для выбранного чат-узла не найден связанный чат.');
    state.sel = { kind: 'chat', id: chat.id }; setActiveTab('chats'); toast(`Открыт чат: ${chat.name}`); return render();
  }
  if (!node.primaryChatId) return toast('У этого подразделения пока нет основного чата.');
  const chat = data.chats.find((c) => c.id === node.primaryChatId);
  if (!chat) return toast('Основной чат не найден в мок-данных.');
  state.sel = { kind: 'chat', id: chat.id }; setActiveTab('chats'); toast(`Открыт основной чат: ${chat.name}`); render();
}

function openAddModal(contextNodeId, type = 'employee') {
  state.isAddModalOpen = true;
  state.addContextNodeId = contextNodeId;
  const selectedNode = data.nodes[state.node] || data.nodes[contextNodeId];
  state.addType = selectedNode?.type === 'chat' ? 'employee' : type;
  state.openTreeMenuNodeId = null;
  state.isCenterMenuOpen = false;
  render();
}

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

function renderTree(nodeId, parentId = null, level = 0, searchModel = buildTreeSearchModel(state.treeSearchQuery), filterModel = buildTreeFilterModel(state.activeTreeFilter)) {
  const node = data.nodes[nodeId];
  const isFilterMode = Boolean(state.treeSearchQuery.trim());
  const isVisibleBySearch = !isFilterMode || searchModel.visibleNodeIds.has(nodeId);
  const isVisibleByTreeFilter = !filterModel.visibleNodeIds || filterModel.visibleNodeIds.has(nodeId);
  const isVisible = isVisibleBySearch && isVisibleByTreeFilter;
  const hasChildren = getChildren(nodeId).length > 0;
  const expanded = isFilterMode ? !!state.exp[nodeId] || searchModel.autoExpandNodeIds.has(nodeId) : !!state.exp[nodeId];
  const selected = state.node === nodeId;
  const menuOpen = state.openTreeMenuNodeId === nodeId;
  const isDragging = state.drag.draggedNodeId === nodeId;
  const isDropTarget = state.drag.overNodeId === nodeId;
  const isFlashTarget = state.flashNodeId === nodeId;
  const isDirectMatch = isFilterMode && isVisibleByTreeFilter && searchModel.matchedNodeIds.has(nodeId);
  const renderedName = isDirectMatch ? highlightMatch(node.name, state.treeSearchQuery) : escapeHtml(node.name);

  const childrenHtml = hasChildren && expanded ? getChildren(nodeId).map((id) => renderTree(id, nodeId, level + 1, searchModel, filterModel)).join('') : '';
  const menu = menuOpen ? `<div class='tree-menu'>${(treeMenuByType[node.type] || treeMenuByType.department).map((action) => `<button data-tree-action='${action}' data-node='${nodeId}'>${action}</button>`).join('')}</div>` : '';

  return `
    <div class='tree-item-wrap ${isFilterMode ? 'is-filtered' : ''} ${isVisible ? '' : 'filtered-out'}'>
      <div class='tree-node ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''} ${isFlashTarget ? 'focus-flash' : ''}' style='padding-left:${12 + level * 16}px' data-drop-node='${nodeId}' data-drop-parent='${parentId || ''}'>
        <button class='tree-drag-handle' data-drag-handle='${nodeId}' data-parent='${parentId || ''}' draggable='${parentId && state.structureSettings.dragAndDropEnabled ? 'true' : 'false'}'>⋮⋮</button>
        <button class='tree-control' data-chevron='${nodeId}'>${hasChildren ? (expanded ? '▾' : '▸') : '·'}</button>
        <button class='tree-main-hit ${selected ? 'selected' : ''}' data-select-node='${nodeId}'>
          <span>${node.icon}</span>
          <span><div>${renderedName}</div><div class='tree-type'>${node.typeLabel}</div></span>
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
function rootSummaryMetrics() {
  return {
    employees: data.people.length,
    departments: Object.values(data.nodes).filter((node) => ['department', 'team', 'group'].includes(node.type)).length,
    chats: data.chats.length,
    files: data.files.length,
  };
}
function nodeSummaryLabel(nodeId) {
  if (nodeId !== 'root') {
    const node = data.nodes[nodeId];
    if (node.type === 'chat') {
      const chat = chatByNodeId(nodeId);
      const count = chat ? chatParticipantCount(chat) : 0;
      return `${count} участников · 1 чат`;
    }
    return node.summary;
  }
  const metrics = rootSummaryMetrics();
  return `${metrics.employees} сотрудников · ${metrics.departments} подразделений · ${metrics.chats} чатов · ${metrics.files} файлов`;
}
function aboutTabLabel(node) {
  if (node.id === 'root') return 'О компании';
  if (node.type === 'group') return 'О группе';
  if (node.type === 'chat') return 'О чате';
  return 'О подразделении';
}
function vacanciesRow(item, actions = [item.action || 'Открыть']) {
  const initials = item.name.split(' ').map((v) => v[0]).join('').slice(0, 2);
  const buttons = actions.map((label) => `<button data-vacancy-action='${label}' data-vacancy-id='${item.id}'>${label}</button>`).join('');
  return `<div class='list-row'><div class='avatar'>${initials}</div><div class='grow'><b>${item.name}</b><div>${item.status}</div><small>${item.role}</small></div><div class='row-actions'>${buttons}</div></div>`;
}
function vacanciesHubContent() {
  const sections = {
    all: `<div class='card'><h3>Сотрудники</h3>${vacanciesHubData.employees.map((item) => vacanciesRow(item)).join('')}</div><div class='card'><h3>Кандидаты</h3>${vacanciesHubData.candidates.map((item) => vacanciesRow(item, ['Назначить', 'Отклонить'])).join('')}</div><div class='card'><h3>Бывшие сотрудники</h3>${vacanciesHubData.former.map((item) => vacanciesRow(item)).join('')}</div><div class='card'><h3>Заблокированы</h3>${vacanciesHubData.blocked.map((item) => vacanciesRow(item)).join('')}</div>`,
    employees: vacanciesHubData.employees.map((item) => vacanciesRow(item)).join(''),
    candidates: vacanciesHubData.candidates.map((item) => vacanciesRow(item, ['Назначить', 'Отклонить'])).join(''),
    former: vacanciesHubData.former.map((item) => vacanciesRow(item)).join(''),
    blocked: vacanciesHubData.blocked.map((item) => vacanciesRow(item)).join(''),
  };
  return sections[state.vacanciesTab] || sections.all;
}
function hasHeaderChatAction(node) {
  if (node.id === 'root') return false;
  if (node.type === 'chat') return Boolean(data.chats.find((chat) => chat.nodeId === node.id || chat.id === node.primaryChatId || chat.dep === node.id));
  return Boolean(node.primaryChatId || data.chats.find((chat) => chat.dep === node.id || chat.nodeId === node.id));
}

function centerContent() {
  const node = data.nodes[state.node];
  const isRootNode = state.node === 'root';
  const isVacanciesNode = state.node === 'vacancies';
  const breadcrumbs = breadcrumbNodeIds(state.node)
    .map((nodeId, index, list) => `<button class='crumb-btn ${nodeId === state.node ? 'active' : ''}' data-breadcrumb-node='${nodeId}'>${data.nodes[nodeId].name}</button>${index < list.length - 1 ? "<span class='crumb-sep'>/</span>" : ''}`)
    .join('');
  const currentNodeChat = chatByNodeId(state.node);
  const people = peopleForNode(state.node);
  const positions = state.node === 'root' ? data.positions : data.positions.filter((x) => x.dep === state.node);
  const visiblePositions = positions
    .filter((position) => {
      if (state.positionsStatusFilter === 'occupied') return position.status !== 'Вакантна';
      if (state.positionsStatusFilter === 'vacant') return position.status === 'Вакантна';
      return true;
    })
    .filter((position) => position.title.toLowerCase().includes(state.positionsSearchQuery.trim().toLowerCase()));
  const chats = state.node === 'root' ? data.chats : data.chats.filter((x) => x.dep === state.node || x.nodeId === state.node);
  const files = state.node === 'root' ? data.files : data.files.filter((x) => x.dep === state.node);
  const openChatButton = hasHeaderChatAction(node) ? `<button data-primary-chat='${state.node}'>Открыть чат</button>` : '';
  let content = '';
  if (state.tab === 'people') {
    if (isRootNode && state.rootTabMode.people !== 'full') {
      const leaders = people.filter((person) => person.pos.toLowerCase().includes('руковод')).slice(0, 5);
      const recent = people.slice(-5);
      content = `<div class='card'><h3>Руководители</h3>${leaders.map((person) => `<div>${person.name} · ${person.pos}</div>`).join('') || "<div class='muted'>Нет данных</div>"}</div><div class='card'><h3>Недавно добавленные</h3>${recent.map((person) => `<div>${person.name} · ${person.sub}</div>`).join('')}</div><div class='card'><h3>Статусы</h3><div>Online: ${people.filter((p) => p.status === 'online').length}</div><div>Away: ${people.filter((p) => p.status === 'away').length}</div><div>Offline: ${people.filter((p) => p.status === 'offline').length}</div></div><button data-root-show-all='people'>Показать всех сотрудников</button>`;
    } else {
      const back = isRootNode ? `<div class='row-actions'><button data-root-summary-back='people'>← К обзору</button></div>` : '';
      const chatPeopleEmpty = node.type === 'chat' && !people.length ? "<div class='empty'>В этом чате пока нет участников.</div>" : '';
      const peopleRows = people.length ? list(people, 'employee', (x) => `<button class='row-drag-handle' data-emp-drag='${x.id}' draggable='true'>⋮⋮</button><div class='row-main-hit' data-select-employee='${x.id}'><div class='avatar'>${x.name.split(' ').map((v) => v[0]).join('')}</div><div class='grow'><b>${x.name}</b><div>${x.pos}</div><small>${x.sub}</small></div><span class='status'>${x.status}</span></div><button data-msg='${x.name}'>Написать</button>`) : chatPeopleEmpty;
      content = `${back}<div class='row-actions'><input placeholder='Поиск сотрудника'/><button>Фильтр</button><button>Сортировка</button></div>${peopleRows}`;
    }
  }
  if (state.tab === 'positions') {
    if (isRootNode && state.rootTabMode.positions !== 'full') {
      const vacant = positions.filter((position) => position.status === 'Вакантна').slice(0, 5);
      const occupied = positions.filter((position) => position.status !== 'Вакантна').slice(0, 5);
      content = `<div class='card'><h3>Вакантные позиции</h3>${vacant.map((position) => `<div>${position.title} · Вакантна</div>`).join('') || "<div class='muted'>Нет вакансий</div>"}</div><div class='card'><h3>Ключевые роли</h3>${occupied.map((position) => `<div>${position.title} · ${position.assignee}</div>`).join('')}</div><button data-root-show-all='positions'>Показать все должности</button>`;
    } else {
      const back = isRootNode ? `<div class='row-actions'><button data-root-summary-back='positions'>← К обзору</button></div>` : '';
      content = `${back}<div class='row-actions'><input data-positions-search value='${escapeHtml(state.positionsSearchQuery)}' placeholder='Поиск должности'/><button class='${state.positionsStatusFilter === 'all' ? 'active' : ''}' data-pos-filter='all'>Все</button><button class='${state.positionsStatusFilter === 'occupied' ? 'active' : ''}' data-pos-filter='occupied'>Занятые</button><button class='${state.positionsStatusFilter === 'vacant' ? 'active' : ''}' data-pos-filter='vacant'>Вакантные</button></div>${list(visiblePositions, 'position', (x) => `<div class='grow'><b>${x.title}</b><div>${x.status} · ${x.assignee}</div></div><button>${x.status === 'Вакантна' ? 'Назначить' : 'Открыть'}</button>`)}`;
    }
  }
  if (state.tab === 'chats') {
    if (isRootNode && state.rootTabMode.chats !== 'full') {
      const mainChats = chats.filter((chat) => chat.type === 'Основной').slice(0, 4);
      const recentChats = chats.slice(-4);
      content = `<div class='card'><h3>Основные чаты</h3>${mainChats.map((chat) => `<div>${chat.name} · ${chatParticipantCount(chat)} участников</div>`).join('') || "<div class='muted'>Нет данных</div>"}</div><div class='card'><h3>Ключевые / недавние</h3>${recentChats.map((chat) => `<div>${chat.name} · ${chat.last}</div>`).join('')}</div><button data-root-show-all='chats'>Показать все чаты</button>`;
    } else {
      const back = isRootNode ? `<div class='row-actions'><button data-root-summary-back='chats'>← К обзору</button></div>` : '';
      content = `${back}${list(chats, 'chat', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${chatParticipantCount(x)} участников</div><small>${x.last}</small></div><button data-open-chat='${x.id}'>Открыть</button>`)}`;
    }
  }
  if (state.tab === 'files') {
    if (isRootNode && state.rootTabMode.files !== 'full') {
      const recentFiles = files.slice(-5);
      const byType = ['PDF', 'XLSX', 'DOCX'].map((type) => `${type}: ${files.filter((file) => file.type === type).length}`).join(' · ');
      content = `<div class='card'><h3>Основные разделы</h3><div>${byType}</div></div><div class='card'><h3>Последние файлы</h3>${recentFiles.map((file) => `<div>${file.name} · ${file.type}</div>`).join('')}</div><button data-root-show-all='files'>Показать все файлы</button>`;
    } else {
      const back = isRootNode ? `<div class='row-actions'><button data-root-summary-back='files'>← К обзору</button></div>` : '';
      content = `${back}${list(files, 'file', (x) => `<div class='grow'><b>${x.name}</b><div>${x.type} · ${x.owner}</div></div><button data-open-file='${x.id}'>Открыть</button>`)}`;
    }
  }
  if (state.tab === 'about') content = state.node === 'root'
    ? `<div class='card'><p><b>Вся организация</b></p><p><b>Подразделения:</b> ${Object.values(data.nodes).filter((n) => n.type !== 'chat' && n.type !== 'system').length}</p><p><b>Сотрудники:</b> ${data.people.length}</p><p><b>Чаты:</b> ${data.chats.length}</p><p><b>Файлы:</b> ${data.files.length}</p></div>`
    : `<div class='card'><p><b>Название:</b> ${node.name}</p><p><b>Тип:</b> ${node.typeLabel}</p><p><b>Руководитель:</b> ${node.leader}</p><p><b>Описание:</b> ${node.desc}</p></div>`;
  const centerMenu = state.isCenterMenuOpen ? `<div class='center-menu'>${(centerMenuByType[node.type] || centerMenuByType.department).map((action) => `<button data-center-action='${action}'>${action}</button>`).join('')}</div>` : '';
  if (isVacanciesNode) {
    const vacanciesTabs = [['all', 'Все'], ['employees', 'Сотрудники'], ['candidates', 'Кандидаты'], ['former', 'Бывшие сотрудники'], ['blocked', 'Заблокированы']]
      .map(([key, label]) => `<button class='${state.vacanciesTab === key ? 'active' : ''}' data-vacancies-tab='${key}'>${label}</button>`).join('');
    return `<div class='header'><div><div class='muted breadcrumbs'>${breadcrumbs}</div><h2>${node.name}</h2><div class='muted'>${nodeSummaryLabel(state.node)}</div></div><div class='row-actions toolbar-actions'><button data-open-add='${state.node}'>Добавить</button><button data-open-structure-settings='1'>Настроить структуру</button><div class='menu-anchor'><button data-open-center-menu='1'>Еще</button>${centerMenu}</div></div></div><div class='tabs'>${vacanciesTabs}</div><div class='card'><p><b>HR / People Hub</b> · Не привязан к подразделению</p></div>${vacanciesHubContent()}`;
  }
  return `<div class='header'><div><div class='muted breadcrumbs'>${breadcrumbs}</div><h2>${node.name}</h2><div class='muted'>${nodeSummaryLabel(state.node)}</div></div><div class='row-actions toolbar-actions'>${openChatButton}<button data-open-add='${state.node}'>Добавить</button><button data-open-structure-settings='1'>Настроить структуру</button><div class='menu-anchor'><button data-open-center-menu='1'>Еще</button>${centerMenu}</div></div></div><div class='tabs'>${[['people', 'Люди'], ['positions', 'Должности'], ['chats', 'Чаты'], ['files', 'Файлы'], ['about', aboutTabLabel(node)]].map(([k, l]) => `<button class='${state.tab === k ? 'active' : ''}' data-tab='${k}'>${l}</button>`).join('')}</div>${content}`;
}

function detailsContent() {
  if (state.sidebarNestedContext?.type === 'profile') {
    const profile = state.sidebarNestedContext;
    return `<div class='card details-rich-card'><div class='row-actions'><div class='grow'></div><button data-close-profile-sidebar='1'>×</button></div><div class='details-section'><h3>${profile.name}</h3><p>${profile.subtitle}</p><div class='row-actions'><button data-msg='${profile.name}'>Написать</button><button data-show-profile-employee='${profile.name}'>Показать в структуре</button></div></div></div>`;
  }
  const node = data.nodes[state.node]; const s = state.sel;
  if (s.kind === 'employee') { const e = data.people.find((x) => x.id === s.id); if (!e) return ''; return `<div class='card'><div class='row-actions'><div class='grow'></div><button data-close-profile-sidebar='1'>×</button></div><h3>${e.name}</h3><p>${e.pos}</p><p>Статус: ${e.status}</p><div class='row-actions'><button data-msg='${e.name}'>Написать</button><button>Позвонить</button><button data-show-employee='${e.id}'>Показать в структуре</button></div></div>`; }
  if (s.kind === 'position') { const p = data.positions.find((x) => x.id === s.id); if (!p) return ''; return `<div class='card'><div class='row-actions'><button data-sidebar-back='1'>← назад</button></div><h3>${p.title}</h3><p>${p.status}</p><p>${p.assignee}</p><div class='row-actions'><button>${p.status === 'Вакантна' ? 'Назначить' : 'Открыть'}</button><button data-show-position='${p.id}'>Показать в структуре</button></div></div>`; }
  if (s.kind === 'chat') { const c = data.chats.find((x) => x.id === s.id); if (!c) return ''; return `<div class='card'><div class='row-actions'><button data-sidebar-back='1'>← назад</button></div><h3>${c.name}</h3><p>${c.type}</p><div class='row-actions'><button data-open-chat='${c.id}'>Открыть</button><button data-show-chat='${c.id}'>Показать в структуре</button></div></div>`; }
  if (s.kind === 'file') { const f = data.files.find((x) => x.id === s.id); if (!f) return ''; return `<div class='card'><div class='row-actions'><button data-sidebar-back='1'>← назад</button></div><h3>${f.name}</h3><p>${f.type}</p><div class='row-actions'><button data-open-file='${f.id}'>Открыть</button><button data-show-file='${f.id}'>Показать в структуре</button></div></div>`; }
  const parentNode = node.parent ? data.nodes[node.parent] : null;
  const primaryChat = data.chats.find((chat) => chat.id === node.primaryChatId) || data.chats.find((chat) => chat.dep === node.id);
  const relatedChats = node.id === 'root'
    ? data.chats.slice(0, 6)
    : data.chats.filter((chat) => chat.dep === node.id && (!primaryChat || chat.id !== primaryChat.id));
  const relatedFiles = data.files.filter((file) => file.dep === node.id);
  const childIds = node.children.filter((childId) => childPreviewByNodeId[childId]);
  const childBlocks = childIds.map((childId) => {
    const child = childPreviewByNodeId[childId];
    const expanded = !!state.detailsExpandedChildIds[childId];
    const extraCount = Math.max(child.employees - child.employeeNames.length, 1);
    return `<div class='child-accordion'><button class='child-accordion-head' data-toggle-details-child='${childId}'><span class='details-node-icon'>${childId === 'plan3' ? '💬' : '▦'}</span><span class='grow'><b>${child.label}</b><div class='muted'>${child.employees} сотрудников</div></span><span class='chevron ${expanded ? 'open' : ''}'>▾</span></button>${expanded ? `<div class='child-accordion-body'><div><b>${child.primaryChatLabel}</b> · ${child.participants} участников</div><div><b>Связанные чаты</b> · ${child.linkedChats.join(' · ')}</div><div><b>Сотрудники</b> · ${child.employees}</div><div>${child.employeeNames.join(', ')} и ещё ${extraCount}</div><div><b>Файлы</b> · ${child.files}</div><div>например: ${child.fileExamples.join(', ')}</div><button class='link-btn' data-show-in-structure='${childId}'>Показать в структуре</button></div>` : ''}</div>`;
  }).join('');
  const relatedChatRows = (node.id === 'root'
    ? data.chats.slice(0, 6)
    : relatedChats.length ? relatedChats : data.chats.filter((chat) => chat.dep === node.id || chat.nodeId === node.id).slice(0, 3))
    .map((chat) => `<button class='link-row' data-open-chat='${chat.id}'><span>${chat.name}</span><small>${chatParticipantCount(chat)} участников</small></button>`).join('');
  const fileRows = (relatedFiles.length ? relatedFiles : [
    { id: 'df1', name: 'Регламент работы ФЭО.pdf', updatedAt: '12.03.2024', type: '1.2 МБ' },
    { id: 'df2', name: 'Шаблон отчёта.xlsx', updatedAt: '01.02.2024', type: '96 КБ' },
  ]).slice(0, 2).map((file) => `<div class='subtle-box'><b>${file.name}</b><small>${Object.prototype.hasOwnProperty.call(file, 'fileType') ? file.fileType : file.type} · обновлён ${file.updatedAt}</small></div>`).join('');
  const leaderTitle = node.id === 'feo' ? 'Руководитель штаба ФЭО' : 'Руководитель подразделения';
  const icon = node.type === 'chat' ? '💬' : node.type === 'company' ? '🏢' : '▦';

  const orderedNodes = flattenedTreeOrder();
  const currentIndex = orderedNodes.indexOf(node.id);
  const previousNodeId = currentIndex > 0 ? orderedNodes[currentIndex - 1] : null;
  const nextNodeId = currentIndex >= 0 && currentIndex < orderedNodes.length - 1 ? orderedNodes[currentIndex + 1] : null;
  const hierarchyNav = `<div class='row-actions hierarchy-nav'><button data-nav-down='${nextNodeId || ''}' ${nextNodeId ? '' : 'disabled'}>↓</button><button data-nav-up='${previousNodeId || ''}' ${previousNodeId ? '' : 'disabled'}>↑</button></div>`;
  const chatSectionTitle = node.id === 'root' ? 'Глобальный чат компании' : 'Основной чат';
  const chatBadge = node.id === 'root' ? 'глобальный' : 'основной';
  const chatName = node.id === 'root' ? 'Общий чат компании' : (primaryChat ? primaryChat.name : `Чат ${node.name}`);
  const chatParticipants = node.id === 'root' ? Math.max(...data.chats.map((chat) => chatParticipantCount(chat)), 0) : (primaryChat ? chatParticipantCount(primaryChat) : 0);
  return `<div class='card details-rich-card'>${hierarchyNav}<div class='details-head'><div class='details-head-main'><span class='details-node-icon'>${icon}</span><div><h3>${node.name}</h3><small>${node.typeLabel}</small></div></div></div><div class='details-section'><p>${node.id === 'feo' ? 'Финансово-экономическое обеспечение деятельности компании. Планирование, анализ, отчетность.' : node.desc}</p></div><div class='details-section'><div class='row-actions'><button data-primary-chat='${node.id}'>Открыть чат</button><button data-show-in-structure='${node.id}'>Показать в структуре</button><button data-msg='${node.leader}'>Написать руководителю</button></div></div><div class='details-section'><h4>Руководитель</h4><div class='leader-card'><div class='avatar'>${node.leader.split(' ').map((v) => v[0]).join('')}</div><div class='grow'><b>${node.leader}</b><div class='muted'>${leaderTitle}</div><button class='link-btn' data-open-profile='${node.leader}'>Открыть профиль</button></div><div class='row-actions'><button data-msg='${node.leader}'>✉</button><button data-quick-leader='${node.leader}'>⋯</button></div></div></div>${parentNode ? `<div class='details-section'><h4>Подчиняется / входит в</h4><div class='subtle-box'><b>${parentNode.name}</b><button class='link-btn' data-show-in-structure='${parentNode.id}'>Показать в структуре</button></div></div>` : ''}<div class='details-section'><h4>Подчинённые подразделения (${childIds.length})</h4><div class='details-list-stack'>${childBlocks || "<div class='empty'>Нет дочерних подразделений.</div>"}</div></div><div class='details-section'><h4>${chatSectionTitle}</h4><div class='subtle-box'><div><b>${chatName}</b><span class='wire-badge'>${chatBadge}</span></div><div class='muted'>${chatParticipants} участников</div><button data-primary-chat='${node.id}'>Открыть чат</button></div></div><div class='details-section'><h4>Связанные чаты</h4><div class='details-list-stack'>${relatedChatRows}<button class='link-btn' data-open-all-chats='${node.id}'>Смотреть все</button></div></div><div class='details-section'><h4>Файлы и документы</h4><div class='details-list-stack'><div class='subtle-box'><b>Бюджет и планирование</b><small>24 файла</small></div>${fileRows}<button data-open-file-section='${node.id}'>Открыть раздел</button></div></div><div class='details-section'><h4>Быстрые действия</h4><div class='details-list-stack'><button data-primary-chat='${node.id}'>Открыть основной чат</button><button data-open-people='${node.id}'>Перейти к сотрудникам</button><button data-history='${node.id}'>Показать историю изменений</button><button data-open-add='${node.id}'>Добавить сотрудника</button></div></div></div>`;
}

function modalContent() {
  if (!state.isAddModalOpen) return '';
  const selectedNode = data.nodes[state.node] || data.nodes[state.addContextNodeId];
  const node = selectedNode || data.nodes[state.addContextNodeId];
  let form = '';
  const isChatNode = selectedNode?.type === 'chat';
  const allowedAddTypes = isChatNode ? ['employee', 'file'] : Object.keys(addTypes);
  const modalTypeLabels = isChatNode ? { employee: 'Сотрудника', file: 'Файл' } : addTypes;
  const contextLabel = isChatNode ? 'Текущий чат' : 'Текущий контекст';
  if (!allowedAddTypes.includes(state.addType)) state.addType = isChatNode ? 'employee' : 'employee';
  if (state.addType === 'employee') form = `<label>Имя и фамилия <input placeholder='Анна Смирнова'/></label><label>Должность <input placeholder='Аналитик'/></label><label>Роль / функция <input placeholder='Финансы'/></label><label>Руководитель <select><option>Иван Демьянов</option><option>Лариса Иванова</option></select></label><label>Email / логин (optional) <input placeholder='anna@neurocom.ru'/></label>`;
  if (state.addType === 'position') form = `<label>Название должности <input placeholder='Координатор'/></label><label>Тип <select><option>Обычная</option><option>Руководящая</option><option>Вакансия</option></select></label><label>Кому подчиняется <input placeholder='Руководитель отдела'/></label><label>Описание <textarea placeholder='Краткое описание'></textarea></label><label>Статус <select><option>Занята</option><option>Вакантна</option></select></label>`;
  if (state.addType === 'department') form = `<label>Название подразделения <input placeholder='Группа контроля'/></label><label>Тип <select><option>Департамент</option><option>Отдел</option><option>Группа</option></select></label><label>Родительский узел <input value='${node.name}'/></label><label>Руководитель (optional) <input placeholder='ФИО'/></label><label>Описание <textarea placeholder='Описание'></textarea></label>`;
  if (state.addType === 'chat') form = `<label>Название чата <input placeholder='Планерка отдела'/></label><label>Тип чата <select><option>Общий</option><option>Служебный</option><option>Планерка</option></select></label><label><input type='checkbox'/> Сделать основным чатом подразделения</label><label>Описание <textarea placeholder='Заметка'></textarea></label>`;
  if (state.addType === 'file') form = `<label>Название файла <input placeholder='Регламент.pdf'/></label><label>Тип файла <input placeholder='PDF / DOCX'/></label><label>Описание <textarea placeholder='Описание'></textarea></label><label>Загрузка файла <div class='upload-placeholder'>Dropzone placeholder</div></label>`;
  return `<div class='modal-overlay' data-close-modal='1'><div class='modal'><div class='modal-header'><div><h3>${isChatNode ? 'Добавить в чат' : 'Добавить в подразделение'}</h3><div class='muted'>${contextLabel}: ${node.name}</div></div><button data-close-modal='1'>✕</button></div><div class='entity-switcher'>${allowedAddTypes.map((key) => `<button class='${state.addType === key ? 'active' : ''}' data-add-type='${key}'>${modalTypeLabels[key]}</button>`).join('')}</div><div class='modal-form'>${form}</div><div class='modal-actions'><button data-close-modal='1'>Отмена</button><button data-submit-add='${state.addType}'>${submitLabels[state.addType]}</button></div></div></div>`;
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

function captureScrollState() {
  return {
    tree: app.querySelector('[data-scroll="tree"]')?.scrollTop ?? 0,
    content: app.querySelector('[data-scroll="content"]')?.scrollTop ?? 0,
    sidebar: app.querySelector('[data-scroll="sidebar"]')?.scrollTop ?? 0,
  };
}
function restoreScrollState(scrollState) {
  if (!scrollState) return;
  window.requestAnimationFrame(() => {
    const tree = app.querySelector('[data-scroll="tree"]');
    const content = app.querySelector('[data-scroll="content"]');
    const sidebar = app.querySelector('[data-scroll="sidebar"]');
    if (tree) tree.scrollTop = scrollState.tree;
    if (content) content.scrollTop = scrollState.content;
    if (sidebar) sidebar.scrollTop = scrollState.sidebar;
  });
}
function ensureLayoutShell() {
  let layout = app.querySelector('.layout');
  if (!layout) {
    app.innerHTML = `<div class='layout'><div class='panel left' data-scroll='tree'></div><div class='panel center' data-scroll='content'></div><div class='panel right' data-scroll='sidebar'></div></div><div data-ui-overlays='1'></div>`;
    layout = app.querySelector('.layout');
  }
  const leftPanel = app.querySelector('[data-scroll="tree"]');
  const centerPanel = app.querySelector('[data-scroll="content"]');
  const rightPanel = app.querySelector('[data-scroll="sidebar"]');
  let overlays = app.querySelector('[data-ui-overlays]');
  if (!overlays) {
    overlays = document.createElement('div');
    overlays.setAttribute('data-ui-overlays', '1');
    app.appendChild(overlays);
  }
  return { leftPanel, centerPanel, rightPanel, overlays };
}

function render({ preserveScroll = true, allowPreserveWithPendingReveal = false } = {}) {
  state.activeTreeFilter = normalizeTreeFilter(state.activeTreeFilter);
  const filterModel = buildTreeFilterModel(state.activeTreeFilter);
  const searchModel = buildTreeSearchModel(state.treeSearchQuery, state.activeTreeFilter);
  const searchResults = state.treeSearchQuery.trim() ? searchModel.results : [];
  state.treeSearchResults = searchResults;
  if (state.treeSearchActiveIndex >= searchResults.length) {
    state.treeSearchActiveIndex = Math.max(searchResults.length - 1, 0);
  }
  const dropdownVisible = state.treeSearchDropdownOpen && state.treeSearchQuery.trim().length > 0;
  const showSearchClear = state.treeSearchInput.length > 0;
  const searchDropdown = dropdownVisible
    ? `<div class='tree-search-dropdown'>${searchResults.map((result, index) => `<button class='tree-search-item ${index === state.treeSearchActiveIndex ? 'active' : ''}' data-search-result-id='${result.id}'><div>${highlightMatch(result.title, state.treeSearchQuery)}</div><small>${result.typeLabel} · ${highlightMatch(result.context, state.treeSearchQuery)}</small></button>`).join('')}</div>`
    : '';
  const treeFilterButtons = [
    ['all', 'Все'],
    ['departments', 'Подразделения'],
    ['chats', 'Чаты'],
  ].map(([key, label]) => `<button class='${state.activeTreeFilter === key ? 'active' : ''}' data-tree-filter='${key}'>${label}</button>`).join('');
  const treeContent = renderTree('root', null, 0, searchModel, filterModel);
  const previousScrollState = preserveScroll ? captureScrollState() : null;
  const { leftPanel, centerPanel, rightPanel, overlays } = ensureLayoutShell();
  leftPanel.className = `panel left ${(state.treeSearchQuery.trim() || state.activeTreeFilter !== 'all') ? 'is-filtered' : ''}`;
  leftPanel.innerHTML = `<h3>Оргструктура</h3><div class='tree-search-wrap'><input data-tree-search-input value='${escapeHtml(state.treeSearchInput)}' placeholder='Поиск в структуре'/><button class='tree-search-clear ${showSearchClear ? 'visible' : ''}' data-clear-tree-search='1' aria-label='Очистить поиск'>×</button>${searchDropdown}</div><div class='chips'>${treeFilterButtons}</div>${treeContent}`;
  centerPanel.className = 'panel center';
  centerPanel.innerHTML = centerContent();
  rightPanel.className = 'panel right';
  rightPanel.innerHTML = detailsContent();
  overlays.innerHTML = `${historyDrawerContent()}${settingsDrawerContent()}${modalContent()}`;
  bindInteractions();
  if (preserveScroll && previousScrollState && (allowPreserveWithPendingReveal || state.pendingRevealNodeId === null)) {
    restoreScrollState(previousScrollState);
  }
  processPendingReveal();
  processPendingEmployeeReveal();
}

function renderForTreeInteraction() {
  render({ preserveScroll: true });
}

function bindInteractions() {
  const searchInput = app.querySelector('[data-tree-search-input]');
  if (searchInput) {
    searchInput.oninput = () => updateTreeSearch(searchInput.value || '');
    searchInput.onkeydown = (event) => {
      if (!state.treeSearchDropdownOpen || !state.treeSearchResults.length) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        state.treeSearchActiveIndex = Math.min(state.treeSearchActiveIndex + 1, state.treeSearchResults.length - 1);
        renderForTreeInteraction();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        state.treeSearchActiveIndex = Math.max(state.treeSearchActiveIndex - 1, 0);
        renderForTreeInteraction();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        applyTreeSearchResult(state.treeSearchResults[state.treeSearchActiveIndex]);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        state.treeSearchDropdownOpen = false;
        renderForTreeInteraction();
      }
    };
  }
  app.querySelectorAll('[data-clear-tree-search]').forEach((btn) => btn.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearTreeSearch({ keepFocus: true });
  });
  app.querySelectorAll('[data-search-result-id]').forEach((btn) => btn.onclick = () => {
    const found = state.treeSearchResults.find((item) => item.id === btn.dataset.searchResultId);
    applyTreeSearchResult(found);
  });
  app.querySelectorAll('[data-tree-filter]').forEach((btn) => btn.onclick = () => {
    state.activeTreeFilter = normalizeTreeFilter(btn.dataset.treeFilter);
    state.treeSearchDropdownOpen = state.treeSearchQuery.trim().length > 0;
    renderForTreeInteraction();
  });
  app.querySelectorAll('[data-breadcrumb-node]').forEach((btn) => btn.onclick = () => {
    navigateToNode(btn.dataset.breadcrumbNode, { reveal: true });
    render({ preserveScroll: false });
  });
  app.querySelectorAll('[data-chevron]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const id = btn.dataset.chevron; state.exp[id] = !state.exp[id]; state.openTreeMenuNodeId = null; renderForTreeInteraction(); });
  app.querySelectorAll('[data-select-node]').forEach((btn) => btn.onclick = () => {
    const id = btn.dataset.selectNode;
    navigateToNode(id);
    state.openTreeMenuNodeId = null;
    state.isCenterMenuOpen = false;
    renderForTreeInteraction();
  });
  app.querySelectorAll('[data-open-tree-menu]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const id = btn.dataset.openTreeMenu; state.openTreeMenuNodeId = state.openTreeMenuNodeId === id ? null : id; state.isCenterMenuOpen = false; renderForTreeInteraction(); });
  app.querySelectorAll('[data-tree-action]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); const action = btn.dataset.treeAction; const nodeId = btn.dataset.node; if (action.includes('Добавить')) return openAddModal(nodeId, action.includes('сотрудника') ? 'employee' : 'department'); if (action.includes('Создать чат')) return openAddModal(nodeId, 'chat'); if (action.startsWith('Открыть')) { state.node = nodeId; state.sel = { kind: 'node', id: nodeId }; } state.openTreeMenuNodeId = null; toast(`${action}: ${data.nodes[nodeId].name}`); renderForTreeInteraction(); });

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
    handle.ondragend = () => { state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null }; renderForTreeInteraction(); };
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
        return renderForTreeInteraction();
      }
      if (sourceParentId !== targetParentId) {
        toast('Можно менять порядок только в пределах одного уровня.');
        state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
        return renderForTreeInteraction();
      }
      if (reorderWithinLevel(targetParentId, draggedNodeId, targetNodeId)) toast('Порядок обновлен');
      state.drag = { draggedNodeId: null, sourceParentId: null, overNodeId: null };
      state.openTreeMenuNodeId = null;
      renderForTreeInteraction();
    };
  });

  app.querySelectorAll('[data-open-center-menu]').forEach((btn) => btn.onclick = (e) => { e.stopPropagation(); state.isCenterMenuOpen = !state.isCenterMenuOpen; state.openTreeMenuNodeId = null; render(); });
  app.querySelectorAll('[data-center-action]').forEach((btn) => btn.onclick = () => { const action = btn.dataset.centerAction; state.isCenterMenuOpen = false; if (action === 'Открыть чат') return openPrimaryChat(state.node); toast(`${action}: ${data.nodes[state.node].name}`); render(); });
  app.querySelectorAll('[data-tab]').forEach((btn) => btn.onclick = () => {
    setActiveTab(btn.dataset.tab);
    state.sel = { kind: 'node', id: state.node };
    render();
  });
  app.querySelectorAll('[data-vacancies-tab]').forEach((btn) => btn.onclick = () => {
    state.vacanciesTab = btn.dataset.vacanciesTab;
    render();
  });
  app.querySelectorAll('[data-vacancy-action]').forEach((btn) => btn.onclick = () => toast(`${btn.dataset.vacancyAction}: ${btn.dataset.vacancyId}`));
  const positionsSearchInput = app.querySelector('[data-positions-search]');
  if (positionsSearchInput) positionsSearchInput.oninput = () => { state.positionsSearchQuery = positionsSearchInput.value || ''; render(); };
  app.querySelectorAll('[data-pos-filter]').forEach((btn) => btn.onclick = () => { state.positionsStatusFilter = btn.dataset.posFilter; render(); });
  app.querySelectorAll('[data-root-show-all]').forEach((btn) => btn.onclick = () => {
    state.rootTabMode[btn.dataset.rootShowAll] = 'full';
    render();
  });
  app.querySelectorAll('[data-root-summary-back]').forEach((btn) => btn.onclick = () => {
    state.rootTabMode[btn.dataset.rootSummaryBack] = 'summary';
    render();
  });
  app.querySelectorAll('.list-row').forEach((row) => row.onclick = () => { openSidebarSelection({ kind: row.dataset.k, id: row.dataset.id }); render(); });
  app.querySelectorAll('[data-select-employee]').forEach((body) => body.onclick = (e) => { e.stopPropagation(); openSidebarSelection({ kind: 'employee', id: body.dataset.selectEmployee }); render(); });

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
  app.querySelectorAll('[data-nav-up]').forEach((btn) => btn.onclick = () => {
    if (btn.disabled || !btn.dataset.navUp) return;
    navigateToNode(btn.dataset.navUp, { reveal: true });
    render({ preserveScroll: false });
  });
  app.querySelectorAll('[data-nav-down]').forEach((btn) => btn.onclick = () => {
    if (btn.disabled || !btn.dataset.navDown) return;
    navigateToNode(btn.dataset.navDown, { reveal: true });
    render({ preserveScroll: false });
  });
  app.querySelectorAll('[data-show-in-structure]').forEach((btn) => btn.onclick = () => showInStructure({ kind: 'node', nodeId: btn.dataset.showInStructure }));
  app.querySelectorAll('[data-show-employee]').forEach((btn) => btn.onclick = () => showInStructure({ kind: 'employee', employeeId: btn.dataset.showEmployee }));
  app.querySelectorAll('[data-show-position]').forEach((btn) => btn.onclick = () => showInStructure({ kind: 'position', positionId: btn.dataset.showPosition }));
  app.querySelectorAll('[data-show-chat]').forEach((btn) => btn.onclick = () => showInStructure({ kind: 'chat', chatId: btn.dataset.showChat }));
  app.querySelectorAll('[data-show-file]').forEach((btn) => btn.onclick = () => showInStructure({ kind: 'file', fileId: btn.dataset.showFile }));
  app.querySelectorAll('[data-show-profile-employee]').forEach((btn) => btn.onclick = () => {
    const employee = data.people.find((item) => item.name === btn.dataset.showProfileEmployee);
    if (!employee) return toast('Сотрудник не найден в мок-данных.');
    showInStructure({ kind: 'employee', employeeId: employee.id });
  });
  app.querySelectorAll('[data-open-profile]').forEach((btn) => btn.onclick = () => { openSidebarProfile(btn.dataset.openProfile); render(); });
  app.querySelectorAll('[data-close-profile-sidebar]').forEach((btn) => btn.onclick = () => {
    state.sidebarNestedContext = null;
    state.sidebarNavStack = [];
    state.sel = { kind: 'node', id: state.node };
    render();
  });
  app.querySelectorAll('[data-sidebar-back]').forEach((btn) => btn.onclick = () => { sidebarBack(); render(); });
  app.querySelectorAll('[data-quick-leader]').forEach((btn) => btn.onclick = () => toast(`Быстрые действия: ${btn.dataset.quickLeader}`));
  app.querySelectorAll('[data-open-all-chats]').forEach((btn) => btn.onclick = () => toast(`Смотреть все чаты: ${btn.dataset.openAllChats}`));
  app.querySelectorAll('[data-open-file-section]').forEach((btn) => btn.onclick = () => toast(`Открыть раздел файлов: ${btn.dataset.openFileSection}`));
  app.querySelectorAll('[data-open-people]').forEach((btn) => btn.onclick = () => {
    setActiveTab('people');
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
  const target = event.target;
  if (state.treeSearchDropdownOpen && !target.closest('.tree-search-wrap')) {
    state.treeSearchDropdownOpen = false;
    renderForTreeInteraction();
    return;
  }
  if (state.openTreeMenuNodeId || state.isCenterMenuOpen) {
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
