import { Employee, Selection } from '../../types/models';

interface Props {
  employees: Employee[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

export function PeopleTab({ employees, selection, onSelect, onAction }: Props) {
  return (
    <section>
      <div className="toolbar">
        <input className="search" placeholder="Поиск сотрудника" />
        <button>Фильтр</button>
        <button>Сортировка</button>
        <button>Список / Карточки</button>
      </div>
      {employees.length === 0 ? <div className="empty">В этом узле пока нет сотрудников.</div> : employees.map((person) => (
        <div key={person.id} className={`row ${selection.kind === 'employee' && selection.id === person.id ? 'selected' : ''}`} onClick={() => onSelect({ kind: 'employee', id: person.id })}>
          <div className="avatar">{person.initials}</div>
          <div className="grow">
            <strong>{person.name}</strong>
            <div>{person.position}</div>
            <small>{person.subtitle}</small>
          </div>
          <span className="status">{person.status}</span>
          <button onClick={(e) => { e.stopPropagation(); onAction(`Написать: ${person.name}`); }}>Написать</button>
          <button onClick={(e) => e.stopPropagation()}>Звонок</button>
          <button onClick={(e) => e.stopPropagation()}>...</button>
        </div>
      ))}
    </section>
  );
}
