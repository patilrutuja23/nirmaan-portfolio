
// Lightweight local assistant stub.
// Provides deterministic, contextual replies using the local `data.ts` content.
// This keeps the UI fully functional without requiring external API keys.

import { TEAM_MEMBERS, PROJECTS } from '../data';

class GeminiAssistant {
  async askAboutTeam(query: string): Promise<string> {
    const q = query.trim().toLowerCase();

    // Simple intent detection and templated replies.
    if (!q) return "How can I help? Ask me about the team or projects.";

    if (q.includes('team') || q.includes('members') || q.includes('who')) {
      const names = TEAM_MEMBERS.map(m => m.name).join(', ');
      return `Nirmaan is a 4-member team: ${names}. We specialize in AI, web engineering, and hackathon-grade projects.`;
    }

    if (q.includes('projects') || q.includes('work') || q.includes('what do you build')) {
      const sample = PROJECTS.slice(0, 2).map(p => `${p.title} (${p.category})`).join(' and ');
      return `We build AI-driven dashboards and decentralized systems — examples include ${sample}.`;
    }

    // Lookup member by name or role
    for (const m of TEAM_MEMBERS) {
      if (q.includes(m.name.toLowerCase().split(' ')[0]) || q.includes(m.role.toLowerCase().split(' ')[0])) {
        return `${m.name} is our ${m.role}. ${m.bio}`;
      }
    }

    // Fallback short reply
    if (q.length < 40) {
      return "Great question — Nirmaan focuses on AI, scalable web apps, and fast prototyping. Ask for details.";
    }

    // Generic reply echoing helpful guidance
    return "Thanks for the question! We can help with AI systems, UI/UX design, and production ML pipelines. What would you like to know more about?";
  }
}

export const geminiAssistant = new GeminiAssistant();
