import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ProposalDetail } from './components/ProposalDetail';
import { TaskDetail } from './components/TaskDetail';
import { PublicProposalView } from './components/PublicProposalView';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="dark min-h-screen bg-background text-foreground">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/public/:id" element={<PublicProposalView />} />

          {/* Protected routes with navigation */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/proposal/:id" element={<ProposalDetail />} />
                  <Route path="/task/:id" element={<TaskDetail />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
