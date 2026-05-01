import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Subscriptions from './Subscriptions';
import AddSubscription from './AddSubscription';
import Insights from './Insights';
import Settings from './Settings';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subscriptions" 
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subscriptions/add" 
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subscriptions/edit/:id" 
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/insights" 
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
