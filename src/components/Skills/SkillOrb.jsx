'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { skills } from '@/data/portfolio';

// ─── Build graph data from skills ─────────────────────────
function buildGraph() {
  const nodes = [];
  const links = [];

  skills.forEach((cat) => {
    nodes.push({
      id: `hub-${cat.category}`,
      label: cat.category,
      color: cat.color,
      isHub: true,
      radius: 16,
      x: 0, y: 0, vx: 0, vy: 0,
    });

    cat.items.forEach((item) => {
      const nodeId = `${cat.category}-${item.name}`;
      nodes.push({
        id: nodeId,
        label: item.name,
        color: cat.color,
        isHub: false,
        radius: 4 + (item.level / 100) * 3,
        level: item.level,
        x: 0, y: 0, vx: 0, vy: 0,
      });

      links.push({
        source: `hub-${cat.category}`,
        target: nodeId,
        color: cat.color,
        strength: 0.6,
      });
    });
  });

  // Inter-hub links (only adjacent pairs for cleaner look)
  for (let i = 0; i < skills.length; i++) {
    const j = (i + 1) % skills.length;
    links.push({
      source: `hub-${skills[i].category}`,
      target: `hub-${skills[j].category}`,
      color: '#ffffff',
      strength: 0.08,
      isInterHub: true,
    });
  }

  return { nodes, links };
}

// ─── Force simulation ─────────────────────────────────────
function simulate(nodes, links, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  // Place hubs in a ring, skills near their hub
  const hubs = nodes.filter((n) => n.isHub);
  const ringRadius = Math.min(width, height) * 0.28;
  hubs.forEach((h, i) => {
    const angle = (i / hubs.length) * Math.PI * 2 - Math.PI / 2;
    h.x = cx + Math.cos(angle) * ringRadius;
    h.y = cy + Math.sin(angle) * ringRadius;
  });

  const nonHubs = nodes.filter((n) => !n.isHub);
  nonHubs.forEach((n) => {
    const hub = nodeMap[links.find((l) => l.target === n.id)?.source];
    if (hub) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 60;
      n.x = hub.x + Math.cos(angle) * dist;
      n.y = hub.y + Math.sin(angle) * dist;
    }
  });

  return function tick() {
    const repulsion = 1200;
    const attraction = 0.006;
    const centerPull = 0.001;
    const damping = 0.78;

    nodes.forEach((n) => { n.vx = 0; n.vy = 0; });

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsion / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;

        const minDist = a.radius + b.radius + 28;
        if (dist < minDist) {
          const push = (minDist - dist) / 2;
          a.x += (dx / dist) * push;
          a.y += (dy / dist) * push;
          b.x -= (dx / dist) * push;
          b.y -= (dy / dist) * push;
        }
      }
    }

    // Attraction
    links.forEach((link) => {
      const s = nodeMap[link.source], t = nodeMap[link.target];
      if (!s || !t) return;
      const dx = t.x - s.x, dy = t.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ideal = link.isInterHub ? 180 : 90;
      const force = (dist - ideal) * attraction * link.strength;
      s.vx += (dx / dist) * force; s.vy += (dy / dist) * force;
      t.vx -= (dx / dist) * force; t.vy -= (dy / dist) * force;
    });

    // Center pull
    nodes.forEach((n) => {
      n.vx += (cx - n.x) * centerPull;
      n.vy += (cy - n.y) * centerPull;
    });

    // Apply
    const pad = 50;
    nodes.forEach((n) => {
      n.vx *= damping; n.vy *= damping;
      n.x += n.vx; n.y += n.vy;
      n.x = Math.max(pad, Math.min(width - pad, n.x));
      n.y = Math.max(pad, Math.min(height - pad, n.y));
    });
  };
}

// ─── Draw helpers ─────────────────────────────────────────
function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function drawCurvedLine(ctx, x1, y1, x2, y2, curvature = 0.15) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const cx = mx + dy * curvature;
  const cy = my - dx * curvature;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  ctx.stroke();
}

// ─── Main Component ───────────────────────────────────────
export default function SkillOrb() {
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const tickRef = useRef(null);
  const animRef = useRef(null);
  const hoveredRef = useRef(null);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const graph = buildGraph();
    graphRef.current = graph;

    const tick = simulate(graph.nodes, graph.links, width, height);
    tickRef.current = tick;

    for (let i = 0; i < 300; i++) tick();

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const nodeMap = {};
    graph.nodes.forEach((n) => (nodeMap[n.id] = n));

    function draw() {
      tick();
      ctx.clearRect(0, 0, width, height);

      const hov = hoveredRef.current;

      // Determine connected set
      const connectedSet = new Set();
      if (hov) {
        connectedSet.add(hov);
        graph.links.forEach((l) => {
          if (l.source === hov) connectedSet.add(l.target);
          if (l.target === hov) connectedSet.add(l.source);
        });
      }

      // ── Draw links ──
      graph.links.forEach((link) => {
        const s = nodeMap[link.source], t = nodeMap[link.target];
        if (!s || !t) return;

        const highlighted = hov && connectedSet.has(link.source) && connectedSet.has(link.target);
        const faded = hov && !highlighted;

        if (link.isInterHub) {
          ctx.strokeStyle = faded
            ? 'rgba(255,255,255,0.01)'
            : highlighted
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 0.5;
          ctx.setLineDash([3, 6]);
          drawCurvedLine(ctx, s.x, s.y, t.x, t.y, 0.05);
          ctx.setLineDash([]);
        } else {
          const alpha = faded ? 0.03 : highlighted ? 0.5 : 0.12;
          ctx.strokeStyle = hexToRgba(link.color, alpha);
          ctx.lineWidth = highlighted ? 1.2 : 0.6;
          ctx.setLineDash([]);
          drawCurvedLine(ctx, s.x, s.y, t.x, t.y, 0.08);
        }
      });

      // ── Draw nodes ──
      graph.nodes.forEach((node) => {
        const isHov = hov === node.id;
        const isConn = hov && connectedSet.has(node.id);
        const faded = hov && !isHov && !isConn;

        // Glow for hovered / hub
        if ((isHov || (node.isHub && !faded))) {
          const glowR = node.radius * (isHov ? 4 : 2.5);
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          const glowAlpha = isHov ? 0.2 : faded ? 0.02 : 0.06;
          grad.addColorStop(0, hexToRgba(node.color, glowAlpha));
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        const baseAlpha = faded ? 0.08 : isHov ? 1 : isConn ? 0.9 : 0.55;

        if (node.isHub) {
          // Hub: ring style
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(node.color, baseAlpha * 0.12);
          ctx.fill();
          ctx.strokeStyle = hexToRgba(node.color, baseAlpha);
          ctx.lineWidth = isHov ? 2.5 : 1.5;
          ctx.stroke();

          // Inner dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(node.color, baseAlpha);
          ctx.fill();
        } else {
          // Skill node: filled dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(node.color, baseAlpha * 0.6);
          ctx.fill();
          ctx.strokeStyle = hexToRgba(node.color, baseAlpha * 0.9);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Label
        const labelAlpha = faded ? 0.08 : isHov ? 1 : isConn ? 0.85 : node.isHub ? 0.6 : 0.4;
        ctx.fillStyle = hexToRgba(node.color, labelAlpha);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        if (node.isHub) {
          ctx.font = '600 12px Inter, -apple-system, sans-serif';
          ctx.fillText(node.label, node.x, node.y + node.radius + 6);
        } else {
          ctx.font = '10px Inter, -apple-system, sans-serif';
          ctx.fillText(node.label, node.x, node.y + node.radius + 4);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  // Mouse
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || !graphRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let found = null;
    for (const node of graphRef.current.nodes) {
      const dx = mx - node.x, dy = my - node.y;
      const hit = Math.max(node.radius + 10, 18);
      if (dx * dx + dy * dy < hit * hit) { found = node.id; break; }
    }

    if (found !== hoveredRef.current) {
      hoveredRef.current = found;
      canvas.style.cursor = found ? 'pointer' : 'default';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'default';
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
