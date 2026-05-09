function formatCreatedAt(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function priorityClass(priority) {
  if (priority === 'Haute') return 'badge high';
  if (priority === 'Moyenne') return 'badge medium';
  return 'badge low';
}

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <article className="note-item">
      <div className="note-header">
        <div>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-date">Créée le {formatCreatedAt(note.created_at)}</p>
        </div>
        <span className={priorityClass(note.priority)}>{note.priority}</span>
      </div>
      <p className="note-content">{note.content || 'Aucun contenu ajouté.'}</p>
      <div className="note-actions">
        <button className="secondary" onClick={() => onEdit(note)}>
          Modifier
        </button>
        <button className="danger" onClick={() => onDelete(note)}>
          Supprimer
        </button>
      </div>
    </article>
  );
}