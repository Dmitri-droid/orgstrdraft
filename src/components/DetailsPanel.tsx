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
  onAction: (message: string) => void;
}

export function DetailsPanel({ selection, node, nodeTypeLabel, employees, positions, chats, files, onPrimaryChatOpen, onAction }: Props) {
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

    return <DepartmentCard node={node} nodeTypeLabel={nodeTypeLabel} onPrimaryChatOpen={onPrimaryChatOpen} onAction={onAction} />;
  })();

  return <aside className="right-column">{panel}</aside>;
}

function DepartmentCard({ node, nodeTypeLabel, onPrimaryChatOpen, onAction }: { node: OrgNode; nodeTypeLabel: string; onPrimaryChatOpen: () => void; onAction: (message: string) => void }) {
  return <div className="card"><h3>{node.name}</h3><small>{nodeTypeLabel}</small><p>{node.description}</p><p>Руководитель: {node.leader}</p><p>Сотрудники: {node.summary.people}</p><p>Чаты: {node.summary.chats}</p><p>Файлы: {node.summary.files}</p><div className="actions-row"><button onClick={onPrimaryChatOpen}>Открыть чат</button><button onClick={() => onAction('Добавить сотрудника')}>Добавить сотрудника</button><button onClick={() => onAction('Еще действия')}>Еще</button></div></div>;
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
