import { DepartmentFile, Selection } from '../../types/models';

interface Props {
  files: DepartmentFile[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

export function FilesTab({ files, selection, onSelect, onAction }: Props) {
  return (
    <section>
      {files.length === 0 ? <div className="empty">Файлы не найдены для выбранного узла.</div> : files.map((file) => (
        <div key={file.id} className={`row ${selection.kind === 'file' && selection.id === file.id ? 'selected' : ''}`} onClick={() => onSelect({ kind: 'file', id: file.id })}>
          <div className="grow">
            <strong>{file.name}</strong>
            <div>{file.fileType} · {file.owner}</div>
            <small>Обновлено: {file.updatedAt}</small>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAction(`Открыть файл: ${file.name}`); }}>Открыть</button>
        </div>
      ))}
    </section>
  );
}
