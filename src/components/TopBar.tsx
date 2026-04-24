interface TopBarProps {
  activeModule: 'Компания' | 'Люди' | 'Чаты' | 'Файлы';
  breadcrumb: string[];
  onSwitchModule: (module: TopBarProps['activeModule']) => void;
  onCreate: () => void;
  onMore: () => void;
}

const modules: TopBarProps['activeModule'][] = ['Компания', 'Люди', 'Чаты', 'Файлы'];

export function TopBar({ activeModule, breadcrumb, onSwitchModule, onCreate, onMore }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <strong>Компания</strong>
        <span className="muted">{breadcrumb.join(' / ')}</span>
      </div>
      <input className="search" placeholder="Глобальный поиск" />
      <div className="tabs-inline">
        {modules.map((module) => (
          <button key={module} className={module === activeModule ? 'active' : ''} onClick={() => onSwitchModule(module)}>
            {module}
          </button>
        ))}
      </div>
      <button onClick={onCreate}>Создать</button>
      <button onClick={onMore}>Еще</button>
    </header>
  );
}
