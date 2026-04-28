import { useEffect } from 'react';
import { AddEntityType, OrgNode } from '../types/models';

interface Props {
  isOpen: boolean;
  contextNode: OrgNode;
  entityType: AddEntityType;
  onEntityTypeChange: (type: AddEntityType) => void;
  onClose: () => void;
  onSubmit: (type: AddEntityType) => void;
}

const entityLabels: Record<AddEntityType, string> = {
  employee: 'Сотрудника',
  position: 'Должность',
  department: 'Подразделение',
  chat: 'Чат',
  file: 'Файл',
};

const submitLabels: Record<AddEntityType, string> = {
  employee: 'Добавить сотрудника',
  position: 'Добавить должность',
  department: 'Добавить подразделение',
  chat: 'Создать чат',
  file: 'Добавить файл',
};

export function AddEntityModal({ isOpen, contextNode, entityType, onEntityTypeChange, onClose, onSubmit }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Добавить в подразделение</h3>
            <div className="muted">Текущий контекст: {contextNode.name}</div>
          </div>
          <button onClick={onClose} aria-label="Закрыть модалку">✕</button>
        </div>

        <div className="entity-switcher">
          {(Object.keys(entityLabels) as AddEntityType[]).map((type) => (
            <button
              key={type}
              className={type === entityType ? 'active' : ''}
              onClick={() => onEntityTypeChange(type)}
            >
              {entityLabels[type]}
            </button>
          ))}
        </div>

        <div className="modal-form">
          {entityType === 'employee' && (
            <>
              <label>Имя и фамилия <input placeholder="Например: Анна Смирнова" /></label>
              <label>Должность <input placeholder="Например: Аналитик" /></label>
              <label>Роль / функция <input placeholder="Например: Финансовый контроль" /></label>
              <label>Руководитель <select><option>Иван Демьянов</option><option>Лариса Иванова</option></select></label>
              <label>Email / логин (optional) <input placeholder="anna@neurocom.ru" /></label>
            </>
          )}

          {entityType === 'position' && (
            <>
              <label>Название должности <input placeholder="Например: Координатор" /></label>
              <label>Тип <select><option>Обычная</option><option>Руководящая</option><option>Вакансия</option></select></label>
              <label>Кому подчиняется <input placeholder="Например: Руководитель отдела" /></label>
              <label>Описание <textarea placeholder="Краткое описание роли" /></label>
              <label>Статус <select><option>Занята</option><option>Вакантна</option></select></label>
            </>
          )}

          {entityType === 'department' && (
            <>
              <label>Название подразделения <input placeholder="Например: Группа контроля" /></label>
              <label>Тип <select><option>Департамент</option><option>Отдел</option><option>Группа</option></select></label>
              <label>Родительский узел <input value={contextNode.name} readOnly /></label>
              <label>Руководитель (optional) <input placeholder="ФИО" /></label>
              <label>Описание <textarea placeholder="Описание подразделения" /></label>
            </>
          )}

          {entityType === 'chat' && (
            <>
              <label>Название чата <input placeholder="Например: Планерка отдела" /></label>
              <label>Тип чата <select><option>Общий</option><option>Служебный</option><option>Планерка</option></select></label>
              <label className="checkbox-row"><input type="checkbox" /> Сделать основным чатом подразделения</label>
              <label>Описание <textarea placeholder="Заметка о назначении чата" /></label>
            </>
          )}

          {entityType === 'file' && (
            <>
              <label>Название файла <input placeholder="Например: Регламент.pdf" /></label>
              <label>Тип файла <input placeholder="PDF / DOCX / XLSX" /></label>
              <label>Описание <textarea placeholder="Что содержит файл" /></label>
              <label>Загрузка файла <div className="upload-placeholder">Dropzone placeholder</div></label>
            </>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={() => onSubmit(entityType)}>{submitLabels[entityType]}</button>
        </div>
      </div>
    </div>
  );
}
