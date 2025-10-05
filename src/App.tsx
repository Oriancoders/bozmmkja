import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import IssueDetailPage from './pages/IssueDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('');

  const handleNavigate = (page: string, issueId?: string) => {
    setCurrentPage(page);
    if (issueId) {
      setSelectedIssueId(issueId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'archive' && <ArchivePage onNavigate={handleNavigate} />}
        {currentPage === 'issue' && (
          <IssueDetailPage issueId={selectedIssueId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
