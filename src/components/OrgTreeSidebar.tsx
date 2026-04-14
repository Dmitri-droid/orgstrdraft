import { useState } from 'react';
import { nodeTypeLabel, orgNodes } from '../data/mockData';
import { OrgNode } from '../types/models';
import { OrgTreeNode } from './OrgTreeNode';

interface Props {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  onAction: (message: string) => void;
}

const filters = ['Все', 'Подразделения', 'Люди', 'Должности', 'Чаты', 'Вакансии'];

const menuItemsByType: Record<OrgNode['type'], string[]> = {
  company: ['Открыть', 'Переименовать', 'Добавить дочерний узел', 'Создать чат', 'Архивировать'],
  department: ['Открыть', 'Переименовать', 'Добавить дочерний узел', 'Создать чат', 'Архивировать'],
  team: ['Открыть', 'Переименовать', 'Добавить дочерний узел', 'Создать чат', 'Архивировать'],
  group: ['Открыть', 'Редактировать состав', 'Архивировать'],
  chat: ['Открыть чат', 'Переименовать', 'Архивировать'],
  system: ['Открыть', 'Переименовать', 'Архивировать'],
};

export function OrgTreeSidebar({ activeNodeId, onSelectNode, onAction }: Props) {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [query, setQuery] = useState('');
  const [openMenuNodeId, setOpenMenuNodeId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true, hq: true, feo: true, 'feo-b': true, 'feo-b-2': true });

  return (
    <aside className="left-column">
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
          onSelect={onSelectNode}
          onMenuAction={(nodeId, actionLabel) => {
            const node = orgNodes[nodeId];
            onAction(`${actionLabel}: ${node.name}`);
            setOpenMenuNodeId(null);
          }}
          onMenuToggle={(id) => setOpenMenuNodeId((prev) => (prev === id ? null : id))}
          onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
          menuItemsByType={menuItemsByType}
          nodeTypeLabel={nodeTypeLabel}
          nodes={orgNodes}
        />
      </div>
    </aside>
  );
}
