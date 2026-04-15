import { useEffect } from 'react';

export type StructurePermission = 'admins' | 'admins_leads' | 'all_managers';

export interface StructureSettings {
  dragAndDropEnabled: boolean;
  whoCanEdit: StructurePermission;
  whoCanAddDepartments: StructurePermission;
  whoCanMoveNodes: StructurePermission;
}

interface Props {
  isOpen: boolean;
  settings: StructureSettings;
  isResetConfirmOpen: boolean;
  onClose: () => void;
  onToggleDrag: (value: boolean) => void;
  onChangePermission: (field: 'whoCanEdit' | 'whoCanAddDepartments' | 'whoCanMoveNodes', value: StructurePermission) => void;
  onAskResetOrder: () => void;
  onCancelResetOrder: () => void;
  onConfirmResetOrder: () => void;
}

const permissionOptions: { value: StructurePermission; label: string }[] = [
  { value: 'admins', label: 'Только администраторы' },
  { value: 'admins_leads', label: 'Администраторы и руководители' },
  { value: 'all_managers', label: 'Все менеджеры структуры' },
];

export function StructureSettingsDrawer({
  isOpen,
  settings,
  isResetConfirmOpen,
  onClose,
  onToggleDrag,
  onChangePermission,
  onAskResetOrder,
  onCancelResetOrder,
  onConfirmResetOrder,
}: Props) {
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
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="settings-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Настройки оргструктуры</h3>
            <div className="muted">Параметры управления структурой компании</div>
          </div>
          <button onClick={onClose} aria-label="Закрыть настройки">✕</button>
        </div>

        <div className="drawer-section">
          <label className="drawer-row">
            <span>Разрешить drag-and-drop</span>
            <input type="checkbox" checked={settings.dragAndDropEnabled} onChange={(event) => onToggleDrag(event.target.checked)} />
          </label>
        </div>

        <div className="drawer-section">
          {!isResetConfirmOpen ? (
            <button className="danger-outline" onClick={onAskResetOrder}>Сбросить порядок</button>
          ) : (
            <div className="confirm-box">
              <div>Сбросить пользовательский порядок?</div>
              <div className="actions-row">
                <button onClick={onCancelResetOrder}>Отмена</button>
                <button className="danger-outline" onClick={onConfirmResetOrder}>Сбросить</button>
              </div>
            </div>
          )}
        </div>

        <div className="drawer-section">
          <label>Кто может редактировать структуру
            <select value={settings.whoCanEdit} onChange={(event) => onChangePermission('whoCanEdit', event.target.value as StructurePermission)}>
              {permissionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div className="drawer-section">
          <label>Кто может добавлять подразделения
            <select value={settings.whoCanAddDepartments} onChange={(event) => onChangePermission('whoCanAddDepartments', event.target.value as StructurePermission)}>
              {permissionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div className="drawer-section">
          <label>Кто может перемещать узлы
            <select value={settings.whoCanMoveNodes} onChange={(event) => onChangePermission('whoCanMoveNodes', event.target.value as StructurePermission)}>
              {permissionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </aside>
    </div>
  );
}
