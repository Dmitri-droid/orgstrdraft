import { useEffect, useRef, useState } from 'react';
import { nodeTypeLabel, orgNodes } from '../data/mockData';
import { AddEntityType, OrgNode } from '../types/models';
import { OrgTreeNode } from './OrgTreeNode';

interface Props {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  onAction: (message: string) => void;
  onOpenAddModal: (nodeId: string, entityType?: AddEntityType) => void;
}

const filters = ['Все', 'Подразделения', 'Люди', 'Должности', 'Чаты', 'Вакансии'];

const menuItemsByType: Record<OrgNode['type'], string[]> = {
  company: ['Открыть', 'Добавить подразделение', 'Импорт структуры', 'Настроить структуру'],
  department: ['Открыть', 'Переименовать', 'Добавить дочернее подразделение', 'Добавить сотрудника', 'Создать чат подразделения', 'Архивировать'],
  team: ['Открыть', 'Переименовать', 'Добавить дочернее подразделение', 'Добавить сотрудника', 'Создать чат подразделения', 'Архивировать'],
  group: ['Открыть', 'Редактировать состав', 'Переименовать', 'Архивировать'],
  chat: ['Открыть чат', 'Переименовать', 'Архивировать'],
  system: ['Открыть', 'Настроить отображение'],
};

export function OrgTreeSidebar({ activeNodeId, onSelectNode, onAction, onOpenAddModal }: Props) {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [query, setQuery] = useState('');
  const [openMenuNodeId, setOpenMenuNodeId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true, hq: true, feo: true, 'feo-b': true, 'feo-b-2': true });
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openMenuNodeId) return;
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpenMenuNodeId(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenuNodeId(null);
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [openMenuNodeId]);

  return (
    <aside className="left-column" ref={sidebarRef}>
      <h3>Оргструктура</h3>
      <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск в структуре" />
      <div className="chips">
        {filters.map((item) => (
          <button key={item} className={item === activeFilter ? 'active' : ''} onClick={() => setActiveFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="tree-scroll">
        <OrgTreeNode
          nodeId="root"
          level={0}
          activeNodeId={activeNodeId}
          expanded={expanded}
          query={query}
          openMenuNodeId={openMenuNodeId}
          onSelect={(id) => { setOpenMenuNodeId(null); onSelectNode(id); }}
          onMenuAction={(nodeId, actionLabel) => {
            const node = orgNodes[nodeId];
            if (actionLabel.includes('Добавить')) {
              const mappedType: AddEntityType = actionLabel.includes('сотрудника') ? 'employee' : 'department';
              onOpenAddModal(nodeId, mappedType);
            } else if (actionLabel.includes('Создать чат')) {
              onOpenAddModal(nodeId, 'chat');
            } else {
              onAction(`${actionLabel}: ${node.name}`);
            }
            setOpenMenuNodeId(null);
          }}
          onMenuToggle={(id) => setOpenMenuNodeId((prev) => (prev === id ? null : id))}
          onToggle={(id) => { setOpenMenuNodeId(null); setExpanded((prev) => ({ ...prev, [id]: !prev[id] })); }}
          menuItemsByType={menuItemsByType}
          nodeTypeLabel={nodeTypeLabel}
          nodes={orgNodes}
        />
      </div>
    </aside>
  );
}
