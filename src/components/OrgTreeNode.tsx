import { OrgNode } from '../types/models';

interface Props {
  nodeId: string;
  level: number;
  activeNodeId: string;
  expanded: Record<string, boolean>;
  query: string;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  nodeTypeLabel: Record<OrgNode['type'], string>;
  nodes: Record<string, OrgNode>;
}

export function OrgTreeNode({ nodeId, level, activeNodeId, expanded, query, onSelect, onToggle, nodeTypeLabel, nodes }: Props) {
  const node = nodes[nodeId];
  const isActive = activeNodeId === nodeId;
  const hasChildren = node.childrenIds.length > 0;
  const isExpanded = Boolean(expanded[nodeId]);
  const matched = !query || node.name.toLowerCase().includes(query.toLowerCase());

  if (!matched && !node.childrenIds.some((id) => nodes[id].name.toLowerCase().includes(query.toLowerCase()))) {
    return null;
  }

  return (
    <div>
      <div
        className={`tree-node ${isActive ? 'selected' : ''}`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => onSelect(nodeId)}
      >
        <button className="ghost" onClick={(e) => { e.stopPropagation(); if (hasChildren) onToggle(nodeId); }}>
          {hasChildren ? (isExpanded ? '▾' : '▸') : '·'}
        </button>
        <div className="tree-title-wrap">
          <span>{node.name}</span>
          <small>{nodeTypeLabel[node.type]}</small>
        </div>
        <button className="ghost">...</button>
      </div>
      {hasChildren && isExpanded && node.childrenIds.map((childId) => (
        <OrgTreeNode
          key={childId}
          nodeId={childId}
          level={level + 1}
          activeNodeId={activeNodeId}
          expanded={expanded}
          query={query}
          onSelect={onSelect}
          onToggle={onToggle}
          nodeTypeLabel={nodeTypeLabel}
          nodes={nodes}
        />
      ))}
    </div>
  );
}
