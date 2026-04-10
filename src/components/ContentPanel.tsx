import { DepartmentChat, DepartmentFile, Employee, OrgNode, Position, Selection, TabType } from '../types/models';
import { AboutTab } from './tabs/AboutTab';
import { ChatsTab } from './tabs/ChatsTab';
import { FilesTab } from './tabs/FilesTab';
import { PeopleTab } from './tabs/PeopleTab';
import { PositionsTab } from './tabs/PositionsTab';

interface Props {
  node: OrgNode;
  breadcrumb: string[];
  nodeTypeLabel: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  employees: Employee[];
  positions: Position[];
  chats: DepartmentChat[];
  files: DepartmentFile[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

const tabs: { key: TabType; label: string }[] = [
  { key: 'people', label: 'Люди' },
  { key: 'positions', label: 'Должности' },
  { key: 'chats', label: 'Чаты' },
  { key: 'files', label: 'Файлы' },
  { key: 'about', label: 'О подразделении' },
];

export function ContentPanel(props: Props) {
  const { node, breadcrumb, nodeTypeLabel, activeTab, onTabChange, onAction } = props;

  return (
    <main className="center-column">
      <div className="content-header">
        <div>
          <div className="muted">{breadcrumb.join(' / ')}</div>
          <h2>{node.name}</h2>
          <div className="muted">{node.summary.people} участника · {node.summary.leads} руководитель · {node.summary.chats} чат · {node.summary.files} файла</div>
        </div>
        <div className="actions-row">
          <button onClick={() => onAction('Открытие чата: mock действие')}>Открыть чат</button>
          <button onClick={() => onAction('Добавление объекта: mock действие')}>Добавить</button>
          <button onClick={() => onAction('Еще: mock меню')}>Еще</button>
        </div>
      </div>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => onTabChange(tab.key)} className={activeTab === tab.key ? 'active' : ''}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'people' && <PeopleTab employees={props.employees} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'positions' && <PositionsTab positions={props.positions} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'chats' && <ChatsTab chats={props.chats} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'files' && <FilesTab files={props.files} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'about' && <AboutTab node={node} nodeTypeLabel={nodeTypeLabel} />}
      </div>
    </main>
  );
}
