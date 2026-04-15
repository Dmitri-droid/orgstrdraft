import { useEffect, useRef, useState } from 'react';
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
  onPrimaryChatOpen: () => void;
  onOpenAddModal: () => void;
  employees: Employee[];
  positions: Position[];
  chats: DepartmentChat[];
  files: DepartmentFile[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
  onReorderEmployees: (draggedEmployeeId: string, targetEmployeeId: string) => void;
}

const tabs: { key: TabType; label: string }[] = [
  { key: 'people', label: 'Люди' },
  { key: 'positions', label: 'Должности' },
  { key: 'chats', label: 'Чаты' },
  { key: 'files', label: 'Файлы' },
  { key: 'about', label: 'О подразделении' },
];

const centerMenuByType: Record<OrgNode['type'], string[]> = {
  company: ['Редактировать структуру', 'Настроить права доступа', 'Архивировать'],
  department: ['Редактировать подразделение', 'Переименовать', 'Назначить руководителя', 'Настроить права доступа', 'Переместить', 'Архивировать'],
  team: ['Редактировать подразделение', 'Переименовать', 'Назначить руководителя', 'Настроить права доступа', 'Переместить', 'Архивировать'],
  group: ['Редактировать группу', 'Переименовать', 'Архивировать'],
  chat: ['Открыть чат', 'Переименовать чат', 'Настроить участников', 'Архивировать'],
  system: ['Настроить отображение', 'Архивировать'],
};

export function ContentPanel(props: Props) {
  const { node, breadcrumb, nodeTypeLabel, activeTab, onTabChange, onPrimaryChatOpen, onOpenAddModal, onAction } = props;
  const [isCenterActionsMenuOpen, setIsCenterActionsMenuOpen] = useState(false);
  const centerMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isCenterActionsMenuOpen) return;
      if (centerMenuRef.current && !centerMenuRef.current.contains(event.target as Node)) {
        setIsCenterActionsMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCenterActionsMenuOpen(false);
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCenterActionsMenuOpen]);

  return (
    <main className="center-column">
      <div className="content-header">
        <div>
          <div className="muted">{breadcrumb.join(' / ')}</div>
          <h2>{node.name}</h2>
          <div className="muted">{node.summary.people} участника · {node.summary.leads} руководитель · {node.summary.chats} чат · {node.summary.files} файла</div>
        </div>
        <div className="actions-row">
          <button onClick={onPrimaryChatOpen}>Открыть чат</button>
          <button onClick={onOpenAddModal}>Добавить</button>
          <div className="menu-anchor" ref={centerMenuRef}>
            <button onClick={() => setIsCenterActionsMenuOpen((prev) => !prev)}>Еще</button>
            {isCenterActionsMenuOpen && (
              <div className="center-menu">
                {centerMenuByType[node.type].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setIsCenterActionsMenuOpen(false);
                      if (action === 'Открыть чат') {
                        onPrimaryChatOpen();
                        return;
                      }
                      onAction(`${action}: ${node.name}`);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
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
        {activeTab === 'people' && <PeopleTab employees={props.employees} selection={props.selection} onSelect={props.onSelect} onAction={onAction} onReorder={props.onReorderEmployees} />}
        {activeTab === 'positions' && <PositionsTab positions={props.positions} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'chats' && <ChatsTab chats={props.chats} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'files' && <FilesTab files={props.files} selection={props.selection} onSelect={props.onSelect} onAction={onAction} />}
        {activeTab === 'about' && <AboutTab node={node} nodeTypeLabel={nodeTypeLabel} />}
      </div>
    </main>
  );
}
