import { useState } from 'react';
import { nodeTypeLabel, orgNodes } from '../data/mockData';
import { OrgTreeNode } from './OrgTreeNode';

interface Props {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
}

const filters = ['Все', 'Подразделения', 'Люди', 'Должности', 'Чаты', 'Вакансии'];

export function OrgTreeSidebar({ activeNodeId, onSelectNode }: Props) {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [query, setQuery] = useState('');
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
          onSelect={onSelectNode}
          onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
          nodeTypeLabel={nodeTypeLabel}
          nodes={orgNodes}
        />
      </div>
    </aside>
  );
}
