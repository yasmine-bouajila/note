import { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  content: '',
  priority: 'Basse',
};

export default function NoteForm({ note, onSave, onCancel, feedback }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title,
        content: note.content || '',
        priority: note.priority || 'Basse',
      });
      setError('');
    } else {
      setForm(initialForm);
      setError('');
    }
  }, [note]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }

    if (!form.priority) {
      setError('La priorité est obligatoire.');
      return;
    }

    if (note) {
      onSave({ ...note, ...form });
    } else {
      onSave(form);
    }
  };

  return (
    <div className="card">
      <h2>{note ? 'Modifier la note' : 'Ajouter une note'}</h2>

      <p className="small-text">Titre requis, priorité et contenu facultatif.</p>

      {error && <div className="alert error">{error}</div>}

      {feedback && (
        <div className={`alert ${feedback.type}`}>{feedback.text}</div>
      )}

      <form className="form-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          maxLength={50}
        />

        <select
          value={form.priority}
          onChange={(event) => setForm({ ...form, priority: event.target.value })}
        >
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>

        <textarea
          rows={6}
          placeholder="Contenu de la note"
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
        />

        <div className="top-actions">
          <button type="submit" className="primary">
            {note ? 'Mettre à jour' : 'Enregistrer'}
          </button>

          {note && (
            <button type="button" className="secondary" onClick={onCancel}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}