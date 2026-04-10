import { Position, Selection } from '../../types/models';

interface Props {
  positions: Position[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

export function PositionsTab({ positions, selection, onSelect, onAction }: Props) {
  return (
    <section>
      <div className="toolbar">
        <input className="search" placeholder="Поиск должности" />
        <button>Все</button>
        <button>Занятые</button>
        <button>Вакантные</button>
        <button>Руководящие</button>
      </div>
      {positions.length === 0 ? <div className="empty">Нет должностей в выбранном узле.</div> : positions.map((position) => (
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
