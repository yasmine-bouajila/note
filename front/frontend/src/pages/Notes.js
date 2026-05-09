import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

export default function Notes() {
  const { logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApiError = useCallback(
    async (error) => {
      const status = error.response?.status;
      if (status === 401) {
        await logout();
        navigate('/login', { replace: true });
        return;
      }
      setFeedback({ type: 'error', text: 'Erreur de communication avec le serveur.' });
    },
    [logout, navigate]
  );

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/notes');
      const sortedNotes = [...response.data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setNotes(sortedNotes);
    } catch (error) {
      await handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const saveNote = async (note) => {
    setFeedback(null);
    console.log('saveNote called with:', note);
    try {
      if (note.id) {
        console.log('Updating note:', note.id);
        await API.put(`/notes/${note.id}`, note);
        setFeedback({ type: 'success', text: 'Note mise à jour avec succès.' });
      } else {
        console.log('Creating new note:', note);
        const response = await API.post('/notes', note);
        console.log('Note created:', response.data);
        setFeedback({ type: 'success', text: 'Note ajoutée avec succès.' });
      }
      setSelectedNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Save error:', error);
      console.error('Response:', error.response?.data);
      if (error.response?.status === 422) {
        const message = error.response?.data?.message || 'Validation invalide.';
        setFeedback({ type: 'error', text: message });
      } else {
        await handleApiError(error);
      }
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setFeedback(null);
  };

  const handleDelete = async (note) => {
    const confirmDelete = window.confirm(`Supprimer la note « ${note.title} » ?`);
    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/notes/${note.id}`);
      setFeedback({ type: 'success', text: 'Note supprimée avec succès.' });
      if (selectedNote?.id === note.id) {
        setSelectedNote(null);
      }
      fetchNotes();
    } catch (error) {
      await handleApiError(error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Mes notes</h1>
          <p className="small-text">Gérez vos pensées </p>
        </div>
        <button className="secondary" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      {feedback && <div className={`alert ${feedback.type}`}>{feedback.text}</div>}
      {loading && <div className="alert success">Chargement des notes...</div>}

      <div className="notes-form-section">
        <NoteForm note={selectedNote} onSave={saveNote} onCancel={() => setSelectedNote(null)} feedback={feedback} />
      </div>

      <div className="notes-list-section">
        {notes.length === 0 ? (
          <div className="note-item-empty">
            Aucune note. Créez votre première note avec le formulaire ci-dessus.
          </div>
        ) : (
          <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <div className="page-footer">
        Les notes sont triées par date de création décroissante. Vous pouvez modifier ou supprimer chaque note.
      </div>
    </div>
  );
}
