import { useState } from 'react';
import { Employee, Selection } from '../../types/models';

interface Props {
  employees: Employee[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
  onReorder: (draggedEmployeeId: string, targetEmployeeId: string) => void;
}

export function PeopleTab({ employees, selection, onSelect, onAction, onReorder }: Props) {
  const [dragState, setDragState] = useState<{ draggedEmployeeId: string | null; overEmployeeId: string | null }>({
    draggedEmployeeId: null,
    overEmployeeId: null,
  });

  return (
    <section>
      <div className="toolbar">
        <input className="search" placeholder="Поиск сотрудника" />
        <button>Фильтр</button>
        <button>Сортировка</button>
        <button>Список / Карточки</button>
      </div>
      {employees.length === 0 ? <div className="empty">В этом узле пока нет сотрудников.</div> : employees.map((person) => {
        const isDragging = dragState.draggedEmployeeId === person.id;
        const isDropTarget = dragState.overEmployeeId === person.id;
        return (
          <div
            key={person.id}
            className={`row ${selection.kind === 'employee' && selection.id === person.id ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragState((prev) => ({ ...prev, overEmployeeId: person.id }));
            }}
            onDrop={(event) => {
              event.preventDefault();
              let payload: { draggedEmployeeId: string | null } | undefined;
              const raw = event.dataTransfer.getData('application/employee-row');
              if (raw) {
                try {
                  payload = JSON.parse(raw) as { draggedEmployeeId: string | null };
                } catch {
                  payload = undefined;
                }
              }
              const draggedEmployeeId = payload?.draggedEmployeeId ?? dragState.draggedEmployeeId;
              if (draggedEmployeeId && draggedEmployeeId !== person.id) onReorder(draggedEmployeeId, person.id);
              setDragState({ draggedEmployeeId: null, overEmployeeId: null });
            }}
          >
            <button
              className="row-drag-handle"
              draggable
              aria-label="Перетащить сотрудника"
              onDragStart={(event) => {
                event.stopPropagation();
                setDragState({ draggedEmployeeId: person.id, overEmployeeId: null });
                event.dataTransfer.setData('application/employee-row', JSON.stringify({ draggedEmployeeId: person.id }));
                event.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={() => setDragState({ draggedEmployeeId: null, overEmployeeId: null })}
            >
              ⋮⋮
            </button>

            <div className="row-main-hit" onClick={() => onSelect({ kind: 'employee', id: person.id })}>
              <div className="avatar">{person.initials}</div>
              <div className="grow">
                <strong>{person.name}</strong>
                <div>{person.position}</div>
                <small>{person.subtitle}</small>
              </div>
              <span className="status">{person.status}</span>
            </div>

            <button onClick={(e) => { e.stopPropagation(); onAction(`Написать: ${person.name}`); }}>Написать</button>
            <button onClick={(e) => e.stopPropagation()}>Звонок</button>
            <button onClick={(e) => e.stopPropagation()}>...</button>
          </div>
        );
      })}
    </section>
  );
}
