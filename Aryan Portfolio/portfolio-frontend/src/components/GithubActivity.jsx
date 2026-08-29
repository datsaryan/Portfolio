import React, { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';

const GITHUB_USERNAME = 'datsaryan';

export default function GithubActivity() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">live from github</span>
          <h2 className="section-title">Open-source <span className="highlight">activity</span></h2>
          <p className="section-sub">Pulled live from the GitHub REST API — not hardcoded.</p>
        </div>

        <Reveal>
          {error && (
            <p className="github-error">Couldn't reach GitHub's API right now ({error}).</p>
          )}
          {!data && !error && <p className="github-loading">Fetching github.com/{GITHUB_USERNAME}…</p>}
          {data && (
            <div className="github-panel">
              <img src={data.avatar_url} alt={data.login} className="github-avatar" />
              <div className="github-meta">
                <h3>{data.name || data.login}</h3>
                <a href={data.html_url} target="_blank" rel="noreferrer">
                  github.com/{data.login}
                </a>
                <div className="github-stats">
                  <div>
                    <div className="github-stat-num">{data.public_repos}</div>
                    <div className="github-stat-label">public repos</div>
                  </div>
                  <div>
                    <div className="github-stat-num">{data.followers}</div>
                    <div className="github-stat-label">followers</div>
                  </div>
                  <div>
                    <div className="github-stat-num">{data.following}</div>
                    <div className="github-stat-label">following</div>
                  </div>
                  <div>
                    <div className="github-stat-num">{new Date(data.created_at).getFullYear()}</div>
                    <div className="github-stat-label">on GitHub since</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
