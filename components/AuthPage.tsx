import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XIcon, EmailIcon, LockIcon, UserIcon } from './icons/Icons';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    required?: boolean;
    minLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, icon, required = true, minLength }) => (
    <div className="relative mb-6">
      <label className="text-sm font-medium text-white/90 text-shadow">{label}</label>
      <div className="relative mt-1">
          <input
              type={type}
              value={value}
              onChange={onChange}
              required={required}
              minLength={minLength}
              className="w-full pr-10 pl-2 py-2 bg-transparent border-b border-white/40 text-white focus:outline-none focus:border-white transition"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70">{icon}</span>
      </div>
    </div>
);


const AuthPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animated-gradient-bg"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative bg-black bg-opacity-20 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl w-full max-w-sm text-white animate-modal-fade-in" onClick={e => e.stopPropagation()}>
        <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-shadow">{isLogin ? 'Login' : 'Sign Up'}</h2>
            
            {isLogin ? <LoginForm onSuccess={onClose}/> : <SignupForm onSuccess={onClose}/>}
  
            <div className="mt-6 text-center">
              <button onClick={toggleForm} className="text-sm text-white/80 hover:underline font-medium text-shadow">
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </button>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white z-10 transition-colors">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const LoginForm: React.FC<{onSuccess: () => void}> = ({onSuccess}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="bg-red-500/30 text-white p-3 rounded-md mb-4 text-sm font-medium text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EmailIcon className="w-5 h-5" />} />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockIcon className="w-5 h-5" />} />
        
        <div className="flex justify-between items-center text-sm my-4">
            <label className="flex items-center gap-2 text-white/80 cursor-pointer text-shadow">
                <input type="checkbox" className="form-checkbox-custom" />
                Remember Me
            </label>
            <a href="#" className="hover:underline text-white/80">Forgot Password</a>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-white text-blue-600 py-2.5 mt-2 rounded-full font-bold text-base hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};


const SignupForm: React.FC<{onSuccess: () => void}> = ({onSuccess}) => {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (name.trim() === '') {
            setError("Please enter your name.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        try {
            await signup(email, password, name);
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {error && <p className="bg-red-500/30 text-white p-3 rounded-md mb-4 text-sm font-medium text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <InputField label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} icon={<UserIcon className="w-5 h-5" />} />
                <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EmailIcon className="w-5 h-5" />} />
                <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockIcon className="w-5 h-5" />} minLength={6} />
                
                <p className="text-xs text-white/60 text-center my-4 text-shadow">
                    By signing up, you agree to our Terms and Privacy Policy.
                </p>

                <button type="submit" disabled={loading} className="w-full bg-white text-blue-600 py-2.5 mt-2 rounded-full font-bold text-base hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;