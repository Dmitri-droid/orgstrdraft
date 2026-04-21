import { useMemo, useState } from 'react';
import { orgNodes } from '../data/mockData';
import { DepartmentChat, DepartmentFile, Employee, OrgNode, Position, Selection } from '../types/models';

interface Props {
  selection: Selection;
  node: OrgNode;
  nodeTypeLabel: string;
  employees: Employee[];
  positions: Position[];
  chats: DepartmentChat[];
  files: DepartmentFile[];
  onPrimaryChatOpen: () => void;
  onOpenAddModal: () => void;
  onOpenHistory: () => void;
  onAction: (message: string) => void;
}

export function DetailsPanel({ selection, node, nodeTypeLabel, employees, positions, chats, files, onPrimaryChatOpen, onOpenAddModal, onOpenHistory, onAction }: Props) {
  const panel = (() => {
    if (selection.kind === 'employee') {
      const employee = employees.find((item) => item.id === selection.id);
      if (!employee) return null;
      return <EmployeeCard employee={employee} onAction={onAction} />;
    }
    if (selection.kind === 'position') {
      const position = positions.find((item) => item.id === selection.id);
      if (!position) return null;
      return <PositionCard position={position} onAction={onAction} />;
    }
    if (selection.kind === 'chat') {
      const chat = chats.find((item) => item.id === selection.id);
      if (!chat) return null;
      return <ChatCard chat={chat} onAction={onAction} />;
    }
    if (selection.kind === 'file') {
      const file = files.find((item) => item.id === selection.id);
      if (!file) return null;
      return <FileCard file={file} onAction={onAction} />;
    }

    // Если выбран в дереве chat-узел, справа показываем карточку чата, а не карточку подразделения.
    if (node.type === 'chat') {
      const linkedChat = chats.find((item) => item.nodeId === node.id) ?? chats.find((item) => item.id === node.primaryChatId);
      if (linkedChat) return <ChatCard chat={linkedChat} onAction={onAction} />;
    }

    return (
      <DepartmentCard
        node={node}
        nodeTypeLabel={nodeTypeLabel}
        employees={employees}
        chats={chats}
        files={files}
        onPrimaryChatOpen={onPrimaryChatOpen}
        onOpenAddModal={onOpenAddModal}
        onOpenHistory={onOpenHistory}
        onAction={onAction}
      />
    );
  })();

  return <aside className="right-column">{panel}</aside>;
}

const nodeIconByType: Record<OrgNode['type'], string> = {
  company: '🏢',
  department: '▦',
  team: '◫',
  group: '◪',
  chat: '💬',
  system: '☰',
};

const childPreviewByNodeId: Record<string, { label?: string; linkedChats?: string[]; employeeNames?: string[]; fileExamples?: string[] }> = {
  'feo-b': {
    linkedChats: ['Отчётность ФЭО', 'Методология бюджета'],
    employeeNames: ['Александров М.', 'Беляева О.', 'Волков С.'],
    fileExamples: ['Отчёт Q1.xlsx', 'Бюджет_черновик.docx'],
  },
  'feo-a': {
    label: 'Группа планирования',
    linkedChats: ['Планирование 2024', 'Сценарии'],
    employeeNames: ['Громова А.', 'Дмитриев И.', 'Кузнецова М.'],
    fileExamples: ['План продаж.xlsx', 'Прогноз ФЭО.pdf'],
  },
  plan3: {
    linkedChats: ['Планерка ФЭО'],
    employeeNames: ['Иванов П.', 'Павлова Л.', 'Сидоров К.'],
    fileExamples: ['Повестка 12.03.2024.docx', 'Протокол 05.03.2024.pdf'],
  },
};

function DepartmentCard({
  node,
  nodeTypeLabel,
  employees,
  chats,
  files,
  onPrimaryChatOpen,
  onOpenAddModal,
  onOpenHistory,
  onAction,
}: {
  node: OrgNode;
  nodeTypeLabel: string;
  employees: Employee[];
  chats: DepartmentChat[];
  files: DepartmentFile[];
  onPrimaryChatOpen: () => void;
  onOpenAddModal: () => void;
  onOpenHistory: () => void;
  onAction: (message: string) => void;
}) {
  const [expandedChildIds, setExpandedChildIds] = useState<Record<string, boolean>>({});

  const leaderProfile = useMemo(
    () => employees.find((employee) => employee.name === node.leader) ?? null,
    [employees, node.leader],
  );
  const parentNode = useMemo(() => (node.parentId ? orgNodes[node.parentId] ?? null : null), [node.parentId]);
  const primaryChat = useMemo(
    () => chats.find((chat) => chat.id === node.primaryChatId) ?? chats.find((chat) => chat.departmentId === node.id),
    [chats, node.id, node.primaryChatId],
  );
  const relatedChats = useMemo(
    () => chats.filter((chat) => chat.departmentId === node.id && chat.id !== primaryChat?.id),
    [chats, node.id, primaryChat?.id],
  );
  const nodeFiles = useMemo(() => files.filter((file) => file.departmentId === node.id), [files, node.id]);
  const childNodes = useMemo(
    () => node.childrenIds.map((childId) => ({ id: childId })).filter((child) => child.id !== 'all-system'),
    [node.childrenIds],
  );

  return (
    <div className="card details-rich-card">
      <div className="details-head">
        <div className="details-head-main">
          <span className="details-node-icon">{nodeIconByType[node.type]}</span>
          <div>
            <h3>{node.name}</h3>
            <small>{nodeTypeLabel}</small>
          </div>
        </div>
        <button aria-label="Закрыть карточку" onClick={() => onAction('Карточка свернута (mock)')}>✕</button>
      </div>

      <div className="details-section">
        <p>{node.id === 'feo' ? 'Финансово-экономическое обеспечение деятельности компании. Планирование, анализ, отчетность.' : node.description}</p>
      </div>

      <div className="details-section">
        <div className="actions-row">
          <button onClick={onPrimaryChatOpen}>Открыть чат</button>
          <button onClick={() => onAction(`Показать в структуре: ${node.name}`)}>Показать в структуре</button>
          <button onClick={() => onAction(`Написать руководителю: ${node.leader}`)}>Написать руководителю</button>
        </div>
      </div>

      <div className="details-section">
        <h4>Руководитель</h4>
        <div className="leader-card">
          <div className="avatar">{leaderProfile?.initials ?? node.leader.split(' ').map((part) => part[0]).join('')}</div>
          <div className="grow">
            <b>{leaderProfile?.name ?? node.leader}</b>
            <div className="muted">{node.id === 'feo' ? 'Руководитель штаба ФЭО' : leaderProfile?.position ?? 'Руководитель подразделения'}</div>
            <button className="link-btn" onClick={() => onAction(`Открыть профиль: ${node.leader}`)}>Открыть профиль</button>
          </div>
          <div className="actions-row">
            <button onClick={() => onAction(`Написать: ${node.leader}`)}>✉</button>
            <button onClick={() => onAction(`Быстрые действия: ${node.leader}`)}>⋯</button>
          </div>
        </div>
      </div>

      {parentNode && (
        <div className="details-section">
          <h4>Подчиняется / входит в</h4>
          <div className="subtle-box">
            <b>{parentNode.name}</b>
            <button className="link-btn" onClick={() => onAction(`Показать в структуре: ${parentNode.name}`)}>Показать в структуре</button>
          </div>
        </div>
      )}

      <div className="details-section">
        <h4>Подчинённые подразделения ({childNodes.length})</h4>
        <div className="details-list-stack">
          {childNodes.map(({ id }) => {
            const preview = childPreviewByNodeId[id];
            const title = preview?.label ?? (id === 'plan3' ? 'Планерки 3' : id === 'feo-b' ? 'Штаб ФЭО-Б' : id);
            const isOpen = Boolean(expandedChildIds[id]);
            const peopleCount = id === 'feo-b' ? 12 : id === 'feo-a' ? 8 : id === 'plan3' ? 5 : 0;
            const chatCount = id === 'plan3' ? 5 : id === 'feo-a' ? 8 : id === 'feo-b' ? 12 : 0;
            const fileCount = id === 'feo-b' ? 8 : id === 'feo-a' ? 6 : 4;
            const primaryChatLabel = id === 'plan3' ? 'Планерка ФЭО' : 'Основной чат';

            return (
              <div className="child-accordion" key={id}>
                <button
                  className="child-accordion-head"
                  onClick={() => setExpandedChildIds((prev) => ({ ...prev, [id]: !prev[id] }))}
                >
                  <span className="details-node-icon">{id === 'plan3' ? '💬' : '▦'}</span>
                  <span className="grow">
                    <b>{title}</b>
                    <div className="muted">{peopleCount} сотрудников</div>
                  </span>
                  <span className={`chevron ${isOpen ? 'open' : ''}`}>▾</span>
                </button>
                {isOpen && (
                  <div className="child-accordion-body">
                    <div><b>{primaryChatLabel}</b> · {chatCount} участников</div>
                    {preview?.linkedChats?.length ? <div><b>Связанные чаты</b> · {preview.linkedChats.join(' · ')}</div> : null}
                    <div><b>Сотрудники</b> · {peopleCount}</div>
                    {preview?.employeeNames?.length ? <div>{preview.employeeNames.join(', ')} и ещё {Math.max(peopleCount - preview.employeeNames.length, 1)}</div> : null}
                    <div><b>Файлы</b> · {fileCount}</div>
                    {preview?.fileExamples?.length ? <div>например: {preview.fileExamples.join(', ')}</div> : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="details-section">
        <h4>Основной чат</h4>
        <div className="subtle-box">
          <div><b>{primaryChat?.name ?? `Чат ${node.name}`}</b> <span className="wire-badge">основной</span></div>
          <div className="muted">{primaryChat?.participants ?? 38} участников</div>
          <button onClick={onPrimaryChatOpen}>Открыть чат</button>
        </div>
      </div>

      <div className="details-section">
        <h4>Связанные чаты</h4>
        <div className="details-list-stack">
          {(relatedChats.length ? relatedChats : [
            { id: 'rc-1', name: 'Общий чат ФЭО', participants: 52 },
            { id: 'rc-2', name: 'Руководители ФЭО', participants: 7 },
            { id: 'rc-3', name: 'Планерка ФЭО', participants: 18 },
          ]).map((chat) => (
            <button key={chat.id} className="link-row" onClick={() => onAction(`Открыть чат: ${chat.name}`)}>
              <span>{chat.name}</span>
              <small>{chat.participants} участников</small>
            </button>
          ))}
          <button className="link-btn" onClick={() => onAction('Смотреть все чаты')}>Смотреть все</button>
        </div>
      </div>

      <div className="details-section">
        <h4>Файлы и документы</h4>
        <div className="details-list-stack">
          <div className="subtle-box">
            <b>Бюджет и планирование</b>
            <small>24 файла</small>
          </div>
          {(nodeFiles.length ? nodeFiles : [
            { id: 'df-1', name: 'Регламент работы ФЭО.pdf', updatedAt: '12.03.2024' },
            { id: 'df-2', name: 'Шаблон отчёта.xlsx', updatedAt: '01.02.2024' },
          ]).slice(0, 2).map((file) => (
            <div className="subtle-box" key={file.id}>
              <b>{file.name}</b>
              <small>{'fileType' in file ? file.fileType : 'DOC/PDF'} · обновлён {file.updatedAt}</small>
            </div>
          ))}
          <button onClick={() => onAction('Открыть раздел файлов')}>Открыть раздел</button>
        </div>
      </div>

      <div className="details-section">
        <h4>Быстрые действия</h4>
        <div className="details-list-stack">
          <button onClick={onPrimaryChatOpen}>Открыть основной чат</button>
          <button onClick={() => onAction('Перейти к сотрудникам')}>Перейти к сотрудникам</button>
          <button onClick={onOpenHistory}>Показать историю изменений</button>
          <button onClick={onOpenAddModal}>Добавить сотрудника</button>
        </div>
      </div>
    </div>
  );
}

function EmployeeCard({ employee, onAction }: { employee: Employee; onAction: (message: string) => void }) {
  return <div className="card"><h3>{employee.name}</h3><p>{employee.position}</p><p>Подразделение: {employee.departmentId}</p><p>Статус: {employee.status}</p><p>Руководитель: {employee.manager}</p><p>Контакты: {employee.contacts}</p><p>Дата назначения: {employee.appointedAt}</p><div className="actions-row"><button onClick={() => onAction(`Написать: ${employee.name}`)}>Написать</button><button onClick={() => onAction(`Позвонить: ${employee.name}`)}>Позвонить</button><button onClick={() => onAction('Открыть профиль')}>Профиль</button><button onClick={() => onAction('Еще действия')}>Еще</button></div></div>;
}

function PositionCard({ position, onAction }: { position: Position; onAction: (message: string) => void }) {
  return <div className="card"><h3>{position.title}</h3><p>Статус: {position.status === 'occupied' ? 'Занята' : 'Вакантна'}</p><p>Назначенный сотрудник: {position.assignee}</p><p>Подчиненность: {position.reportsTo}</p><p>{position.description}</p><p>Дата создания: {position.createdAt}</p><div className="actions-row"><button onClick={() => onAction('Назначить сотрудника')}>Назначить сотрудника</button><button onClick={() => onAction('Редактировать должность')}>Редактировать</button><button onClick={() => onAction('Еще действия')}>Еще</button></div></div>;
}

function ChatCard({ chat, onAction }: { chat: DepartmentChat; onAction: (message: string) => void }) {
  return <div className="card"><h3>{chat.name}</h3><p>Тип: {chat.chatType}</p><p>Подразделение: {chat.departmentId}</p><p>Связано с: {chat.linkedEntity}</p><div className="actions-row"><button onClick={() => onAction(`Открыть чат: ${chat.name}`)}>Открыть</button><button onClick={() => onAction('Еще действия')}>Еще</button></div></div>;
}

function FileCard({ file, onAction }: { file: DepartmentFile; onAction: (message: string) => void }) {
  return <div className="card"><h3>{file.name}</h3><p>Тип: {file.fileType}</p><p>Владелец: {file.owner}</p><p>Подразделение: {file.departmentId}</p><p>Связано с: {file.linkedEntity}</p><div className="actions-row"><button onClick={() => onAction(`Открыть файл: ${file.name}`)}>Открыть</button><button onClick={() => onAction('Еще действия')}>Еще</button></div></div>;
}
