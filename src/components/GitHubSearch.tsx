import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchGitHubData } from '../features/github/githubSlice';

const GitHubSearch = () => {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const { user, repos, loading, error } = useAppSelector((state) => state.github);

  const handleSearch = () => {
    if (username.trim()) {
      dispatch(fetchGitHubData(username.trim()));
    }
  };

  return (
    <div className="github-container">
      {/* Left: Search input */}
      <div className="github-search">
        <h1>GitHub Profile Search</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Right: Results */}
      <div className="github-results">
        {user && (
          <div className="user-card">
            <h2>{user.name || user.login}</h2>
            <img src={user.avatar_url} alt="avatar" className="avatar" />
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
            <p><strong>Repos:</strong> {user.public_repos}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              View Profile
            </a>
          </div>
        )}

        {repos.length > 0 && (
          <div className="repos">
            <h3>Public Repositories:</h3>
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo"
              >
                <div className="repo-name">{repo.name}</div>
                <div className="repo-desc">
                  {repo.description || 'No description'}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubSearch;
