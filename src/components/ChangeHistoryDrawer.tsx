import { useEffect, useMemo, useRef, useState } from 'react';

export type HistoryEventType =
  | 'created_department'
  | 'renamed_department'
  | 'reordered_nodes'
  | 'reset_order'
  | 'changed_leader'
  | 'created_chat'
  | 'changed_primary_chat'
  | 'added_employee'
  | 'added_position'
  | 'archived_node'
  | 'settings_changed';

export type HistoryFilter = 'all' | 'structure' | 'people' | 'chats' | 'settings';

export interface HistoryEntry {
  id: string;
  departmentId: string;
  eventType: HistoryEventType;
  description: string;
  actor: string;
  timeLabel: string;
  relatedEntity?: string;
}

interface Props {
  isOpen: boolean;
  departmentName: string;
  departmentId: string;
  entries: HistoryEntry[];
  onClose: () => void;
}

const filterLabels: Record<HistoryFilter, string> = {
  all: 'Все',
  structure: 'Структура',
  people: 'Люди',
  chats: 'Чаты',
  settings: 'Настройки',
};

const eventIcon: Record<HistoryEventType, string> = {
  created_department: '＋',
  renamed_department: '✎',
  reordered_nodes: '↕',
  reset_order: '↺',
  changed_leader: '👤',
  created_chat: '💬',
  changed_primary_chat: '◎',
  added_employee: '👥',
  added_position: '▤',
  archived_node: '🗄',
  settings_changed: '⚙',
};

const typeByFilter: Record<Exclude<HistoryFilter, 'all'>, HistoryEventType[]> = {
  structure: ['created_department', 'renamed_department', 'reordered_nodes', 'archived_node'],
  people: ['added_employee', 'added_position', 'changed_leader'],
  chats: ['created_chat', 'changed_primary_chat'],
  settings: ['settings_changed', 'reset_order'],
};

export function ChangeHistoryDrawer({ isOpen, departmentName, departmentId, entries, onClose }: Props) {
  const closeTimerRef = useRef<number | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');

  useEffect(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (isOpen) {
      setShouldRender(true);
      window.requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    setIsVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setShouldRender(false);
      closeTimerRef.current = null;
    }, 180);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const filteredEntries = useMemo(() => {
    const scoped = entries.filter((entry) => entry.departmentId === departmentId);
    if (activeFilter === 'all') return scoped;
    return scoped.filter((entry) => typeByFilter[activeFilter].includes(entry.eventType));
  }, [activeFilter, entries, departmentId]);

  if (!shouldRender) return null;

  return (
    <div
      className={`drawer-overlay ${isVisible ? 'open' : 'closing'}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="settings-drawer history-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>История изменений</h3>
            <div className="muted">Журнал изменений по подразделению и связанным сущностям</div>
            <div className="muted">Подразделение: {departmentName}</div>
          </div>
          <button onClick={onClose} aria-label="Закрыть историю">✕</button>
        </div>

        <div className="drawer-section">
          <div className="chips">
            {(Object.keys(filterLabels) as HistoryFilter[]).map((filter) => (
              <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>
                {filterLabels[filter]}
              </button>
            ))}
          </div>
        </div>

        <div className="drawer-section history-list">
          {filteredEntries.length === 0 ? (
            <div className="empty">Для выбранного фильтра пока нет записей.</div>
          ) : (
            filteredEntries.map((entry) => (
              <div className="history-row" key={entry.id}>
                <span className="history-icon">{eventIcon[entry.eventType]}</span>
                <div className="grow">
                  <div>{entry.description}</div>
                  {entry.relatedEntity ? <small className="muted">Связано с: {entry.relatedEntity}</small> : null}
                  <small className="muted">{entry.actor} · {entry.timeLabel}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
