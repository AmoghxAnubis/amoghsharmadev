'use client';

import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'AmoghxAnubis'; // Change to your GitHub username

export function useGitHubData() {
  const [data, setData] = useState({
    profile: null,
    events: [],
    contributions: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [profileRes, eventsRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
        ]);

        if (cancelled) return;

        const profile = profileRes.status === 'fulfilled' && profileRes.value.ok
          ? await profileRes.value.json()
          : null;

        const events = eventsRes.status === 'fulfilled' && eventsRes.value.ok
          ? await eventsRes.value.json()
          : [];

        const contributions = contribRes.status === 'fulfilled' && contribRes.value.ok
          ? await contribRes.value.json()
          : null;

        // Calculate stats from contributions
        let totalContributions = 0;
        let longestStreak = 0;
        let currentStreak = 0;
        let tempStreak = 0;
        let contributionDays = [];

        if (contributions?.contributions) {
          contributions.contributions.forEach((day) => {
            totalContributions += day.count;
            contributionDays.push({ date: day.date, count: day.count });

            if (day.count > 0) {
              tempStreak++;
              if (tempStreak > longestStreak) longestStreak = tempStreak;
            } else {
              tempStreak = 0;
            }
          });

          // Current streak: count backwards from today
          const reversed = [...contributions.contributions].reverse();
          // Skip today if no contributions yet
          let started = false;
          for (const day of reversed) {
            if (day.count > 0) {
              currentStreak++;
              started = true;
            } else if (started) {
              break;
            }
          }
        }

        // Parse events into build log entries
        const buildLogs = events
          .filter((e) => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type))
          .slice(0, 6)
          .map((event) => {
            let title = '';
            let description = '';
            let tags = [];
            let status = 'completed';

            switch (event.type) {
              case 'PushEvent': {
                const commits = event.payload?.commits || [];
                const commitCount = event.payload?.size || commits.length;
                title = commits[0]?.message || `Pushed ${commitCount} commit(s)`;
                description = commitCount > 1
                  ? `${commitCount} commits to ${event.repo.name.split('/')[1]}`
                  : `Commit to ${event.repo.name.split('/')[1]}`;
                tags = ['Push', event.repo.name.split('/')[1]];
                break;
              }
              case 'CreateEvent':
                title = `Created ${event.payload?.ref_type} ${event.payload?.ref || ''}`.trim();
                description = `New ${event.payload?.ref_type} in ${event.repo.name.split('/')[1]}`;
                tags = ['Create', event.payload?.ref_type];
                break;
              case 'PullRequestEvent':
                title = event.payload?.pull_request?.title || 'Pull Request';
                description = `${event.payload?.action} in ${event.repo.name.split('/')[1]}`;
                tags = ['PR', event.payload?.action];
                status = event.payload?.action === 'closed' ? 'merged' : 'open';
                break;
              case 'IssuesEvent':
                title = event.payload?.issue?.title || 'Issue';
                description = `${event.payload?.action} in ${event.repo.name.split('/')[1]}`;
                tags = ['Issue', event.payload?.action];
                break;
            }

            return {
              id: event.id,
              date: event.created_at,
              title: title.slice(0, 80),
              description,
              tags,
              status,
              repo: event.repo.name,
              url: `https://github.com/${event.repo.name}`,
            };
          });

        setData({
          profile,
          events: buildLogs,
          contributions: {
            total: totalContributions || profile?.public_repos * 15 || 0,
            longestStreak,
            currentStreak,
            days: contributionDays,
          },
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return data;
}
