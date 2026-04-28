import { useMemo, useState } from 'react';
import { Position, Selection } from '../../types/models';

interface Props {
  positions: Position[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

export function PositionsTab({ positions, selection, onSelect, onAction }: Props) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'occupied' | 'vacant'>('all');

  const visiblePositions = useMemo(
    () => positions
      .filter((position) => {
        if (statusFilter === 'occupied') return position.status === 'occupied';
        if (statusFilter === 'vacant') return position.status === 'vacant';
        return true;
      })
      .filter((position) => position.title.toLowerCase().includes(query.trim().toLowerCase())),
    [positions, query, statusFilter],
  );

  return (
    <section>
      <div className="toolbar">
        <input className="search" placeholder="Поиск должности" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className={statusFilter === 'all' ? 'active' : ''} onClick={() => setStatusFilter('all')}>Все</button>
        <button className={statusFilter === 'occupied' ? 'active' : ''} onClick={() => setStatusFilter('occupied')}>Занятые</button>
        <button className={statusFilter === 'vacant' ? 'active' : ''} onClick={() => setStatusFilter('vacant')}>Вакантные</button>
      </div>
      {visiblePositions.length === 0 ? <div className="empty">Нет должностей в выбранном узле.</div> : visiblePositions.map((position) => (
        <div key={position.id} className={`row ${selection.kind === 'position' && selection.id === position.id ? 'selected' : ''}`} onClick={() => onSelect({ kind: 'position', id: position.id })}>
          <div className="grow">
            <strong>{position.title}</strong>
            <div>{position.status === 'occupied' ? 'Занята' : 'Вакантна'} · Назначен: {position.assignee}</div>
            <small>Подчиненность: {position.reportsTo}</small>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAction(position.status === 'vacant' ? 'Назначить сотрудника: mock действие' : 'Открыть карточку должности'); }}>
            {position.status === 'vacant' ? 'Назначить' : 'Открыть'}
          </button>
        </div>
      ))}
    </section>
  );
}
