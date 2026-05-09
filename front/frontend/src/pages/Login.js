import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setMessage({ type: 'error', text: 'Veuillez saisir un email et un mot de passe.' });
      return;
    }

    try {
      await login(form);
      navigate('/notes', { replace: true });
    } catch (error) {
      console.error('Login error', error);
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;
      if (status === 401) {
        setMessage({ type: 'error', text: 'Email ou mot de passe incorrect.' });
      } else if (backendMessage) {
        setMessage({ type: 'error', text: `Erreur backend : ${backendMessage}` });
      } else {
        setMessage({ type: 'error', text: `Impossible de se connecter. ${error.message}` });
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-subtitle">Accédez à vos notes personnelles</p>
          
          {message && <div className={`alert ${message.type}`}>{message.text}</div>}
          
          <form className="form-row" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            <button type="submit" className="primary" disabled={loading}>
              Se connecter
            </button>
          </form>

          <div className="auth-link">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
