import { useEffect, useMemo, useRef, useState } from 'react';
import { nodeTypeLabel, orgNodes } from '../data/mockData';
import { AddEntityType, OrgNode } from '../types/models';
import { OrgTreeNode } from './OrgTreeNode';

interface Props {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  dragEnabled: boolean;
  resetOrderSignal: number;
  onAction: (message: string) => void;
  onOpenAddModal: (nodeId: string, entityType?: AddEntityType) => void;
  pendingRevealNodeId?: string | null;
  onRevealHandled?: () => void;
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

const buildInitialOrder = (): Record<string, string[]> =>
  Object.values(orgNodes).reduce<Record<string, string[]>>((acc, node) => {
    acc[node.id] = [...node.childrenIds];
    return acc;
  }, {});

export function OrgTreeSidebar({ activeNodeId, dragEnabled, resetOrderSignal, onSelectNode, onAction, onOpenAddModal, pendingRevealNodeId, onRevealHandled }: Props) {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [query, setQuery] = useState('');
  const [openMenuNodeId, setOpenMenuNodeId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true, hq: true, feo: true, 'feo-b': true, 'feo-b-2': true });
  const [childOrderByParent, setChildOrderByParent] = useState<Record<string, string[]>>(buildInitialOrder);
  const [dragState, setDragState] = useState<{ draggedNodeId: string | null; sourceParentId: string | null; overNodeId: string | null }>({
    draggedNodeId: null,
    sourceParentId: null,
    overNodeId: null,
  });
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [flashNodeId, setFlashNodeId] = useState<string | null>(null);
  const handledRevealRef = useRef<string | null>(null);

  const orderedNodes = useMemo<Record<string, OrgNode>>(
    () =>
      Object.fromEntries(
        Object.entries(orgNodes).map(([id, node]) => [
          id,
          {
            ...node,
            childrenIds: childOrderByParent[id] ?? node.childrenIds,
          },
        ]),
      ),
    [childOrderByParent],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openMenuNodeId) return;
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpenMenuNodeId(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenuNodeId(null);
        setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null });
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [openMenuNodeId]);


  useEffect(() => {
    setChildOrderByParent(buildInitialOrder());
    setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null });
    setOpenMenuNodeId(null);
  }, [resetOrderSignal]);

  useEffect(() => {
    if (!pendingRevealNodeId || !orderedNodes[pendingRevealNodeId]) return;
    if (handledRevealRef.current === pendingRevealNodeId) return;
    handledRevealRef.current = pendingRevealNodeId;

    const path: string[] = [];
    let current: string | null = pendingRevealNodeId;
    while (current) {
      path.push(current);
      current = orderedNodes[current]?.parentId ?? null;
    }
    setExpanded((prev) => {
      const next = { ...prev };
      path.forEach((id) => {
        if (orderedNodes[id]?.childrenIds?.length) next[id] = true;
      });
      return next;
    });

    window.requestAnimationFrame(() => {
      const nodeElement = sidebarRef.current?.querySelector<HTMLElement>(`[data-node-id="${pendingRevealNodeId}"]`);
      if (!nodeElement) return;
      nodeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setFlashNodeId(pendingRevealNodeId);
      window.setTimeout(() => setFlashNodeId((prev) => (prev === pendingRevealNodeId ? null : prev)), 1100);
      onRevealHandled?.();
    });
  }, [pendingRevealNodeId, orderedNodes, onRevealHandled]);

  useEffect(() => {
    if (!pendingRevealNodeId) handledRevealRef.current = null;
  }, [pendingRevealNodeId]);

  const reorderWithinLevel = (parentId: string, draggedNodeId: string, overNodeId: string) => {
    setChildOrderByParent((prev) => {
      const siblings = [...(prev[parentId] ?? [])];
      const fromIndex = siblings.indexOf(draggedNodeId);
      const toIndex = siblings.indexOf(overNodeId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev;

      const [moved] = siblings.splice(fromIndex, 1);
      siblings.splice(toIndex, 0, moved);
      return { ...prev, [parentId]: siblings };
    });
  };

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
          parentId={null}
          level={0}
          activeNodeId={activeNodeId}
          expanded={expanded}
          query={query}
          openMenuNodeId={openMenuNodeId}
          dragState={dragState}
          dragEnabled={dragEnabled}
          onDragStart={(draggedNodeId, sourceParentId) => {
            if (!dragEnabled) return;
            setOpenMenuNodeId(null);
            setDragState({ draggedNodeId, sourceParentId, overNodeId: null });
          }}
          onDragOver={(overNodeId) => {
            if (!dragEnabled) return;
            setDragState((prev) => ({ ...prev, overNodeId }));
          }}
          onDrop={(targetNodeId, targetParentId, payload) => {
            if (!dragEnabled) return;
            const draggedNodeId = payload?.draggedNodeId ?? dragState.draggedNodeId;
            const sourceParentId = payload?.sourceParentId ?? dragState.sourceParentId;

            if (!draggedNodeId || !sourceParentId || !targetParentId) {
              setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null });
              return;
            }
            if (sourceParentId !== targetParentId) {
              onAction('Можно менять порядок только в пределах одного уровня.');
              setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null });
              return;
            }
            reorderWithinLevel(targetParentId, draggedNodeId, targetNodeId);
            onAction('Порядок обновлен');
            setOpenMenuNodeId(null);
            setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null });
          }}
          onDragEnd={() => setDragState({ draggedNodeId: null, sourceParentId: null, overNodeId: null })}
          onSelect={(id) => {
            const prevScrollTop = sidebarRef.current?.scrollTop ?? null;
            setOpenMenuNodeId(null);
            onSelectNode(id);
            window.requestAnimationFrame(() => {
              if (prevScrollTop === null) return;
              if (pendingRevealNodeId) return;
              if (sidebarRef.current) sidebarRef.current.scrollTop = prevScrollTop;
            });
          }}
          onMenuAction={(nodeId, actionLabel) => {
            const node = orderedNodes[nodeId];
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
          onToggle={(id) => {
            setOpenMenuNodeId(null);
            setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
          }}
          menuItemsByType={menuItemsByType}
          nodeTypeLabel={nodeTypeLabel}
          nodes={orderedNodes}
          flashNodeId={flashNodeId}
        />
      </div>
    </aside>
  );
}
