import { OrgNode } from '../types/models';

interface Props {
  nodeId: string;
  level: number;
  activeNodeId: string;
  expanded: Record<string, boolean>;
  query: string;
  openMenuNodeId: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onMenuToggle: (id: string) => void;
  onMenuAction: (nodeId: string, actionLabel: string) => void;
  menuItemsByType: Record<OrgNode['type'], string[]>;
  nodeTypeLabel: Record<OrgNode['type'], string>;
  nodes: Record<string, OrgNode>;
}

const nodeIcons: Record<OrgNode['type'], string> = {
  company: '🏢',
  department: '▦',
  team: '▤',
  group: '◫',
  chat: '💬',
  system: '☰',
};

export function OrgTreeNode({ nodeId, level, activeNodeId, expanded, query, openMenuNodeId, onSelect, onToggle, onMenuToggle, onMenuAction, menuItemsByType, nodeTypeLabel, nodes }: Props) {
  const node = nodes[nodeId];
  const isActive = activeNodeId === nodeId;
  const hasChildren = node.childrenIds.length > 0;
  const isExpanded = Boolean(expanded[nodeId]);
  const isMenuOpen = openMenuNodeId === nodeId;
  const matched = !query || node.name.toLowerCase().includes(query.toLowerCase());

  if (!matched && !node.childrenIds.some((id) => nodes[id].name.toLowerCase().includes(query.toLowerCase()))) {
    return null;
  }

  return (
    <div className="tree-item-wrap">
      <div className="tree-node" style={{ paddingLeft: `${12 + level * 16}px` }}>
        {/* 1) Отдельная зона только для expand/collapse */}
        <button
          className="tree-control"
          aria-label={hasChildren ? (isExpanded ? 'Свернуть ветку' : 'Развернуть ветку') : 'Без дочерних элементов'}
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(nodeId);
          }}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : '·'}
        </button>

        {/* 2) Отдельная зона только для выбора узла */}
        <button className={`tree-main-hit ${isActive ? 'selected' : ''}`} onClick={() => onSelect(nodeId)}>
          <span className="tree-icon">{nodeIcons[node.type]}</span>
          <span className="tree-title-wrap">
            <span>{node.name}</span>
            <small>{nodeTypeLabel[node.type]}</small>
          </span>
        </button>

        {/* 3) Отдельная зона только для контекстного меню */}
        <button
          className={`tree-menu-btn ${isMenuOpen ? 'menu-open' : ''}`}
          aria-label="Открыть меню узла"
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle(nodeId);
          }}
        >
          ...
        </button>
      </div>

      {isMenuOpen && (
        <div className="tree-menu" role="menu">
          {menuItemsByType[node.type].map((action) => (
            <button
              key={action}
              onClick={(e) => {
                e.stopPropagation();
                onMenuAction(nodeId, action);
                if (action.startsWith('Открыть')) onSelect(nodeId);
              }}
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {hasChildren && isExpanded && node.childrenIds.map((childId) => (
        <OrgTreeNode
          key={childId}
          nodeId={childId}
          level={level + 1}
          activeNodeId={activeNodeId}
          expanded={expanded}
          query={query}
          openMenuNodeId={openMenuNodeId}
          onSelect={onSelect}
          onToggle={onToggle}
          onMenuToggle={onMenuToggle}
          onMenuAction={onMenuAction}
          menuItemsByType={menuItemsByType}
          nodeTypeLabel={nodeTypeLabel}
          nodes={nodes}
        />
      ))}
    </div>
  );
}
