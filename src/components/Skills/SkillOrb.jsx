'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { skills } from '@/data/portfolio';

// ─── Build graph data from skills ─────────────────────────
function buildGraph() {
  const nodes = [];
  const links = [];

  // Create category hub nodes
  skills.forEach((cat, ci) => {
    nodes.push({
      id: `hub-${cat.category}`,
      label: cat.category,
      color: cat.color,
      isHub: true,
      radius: 22,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    });

    // Create skill nodes
    cat.items.forEach((item, si) => {
      const nodeId = `${cat.category}-${item.name}`;
      nodes.push({
        id: nodeId,
        label: item.name,
        color: cat.color,
        isHub: false,
        radius: 6 + (item.level / 100) * 6,
        level: item.level,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });

      // Link skill to its hub
      links.push({
        source: `hub-${cat.category}`,
        target: nodeId,
        color: cat.color,
        strength: 0.8,
      });
    });
  });

  // Cross-category hub connections (all hubs weakly linked)
  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      links.push({
        source: `hub-${skills[i].category}`,
        target: `hub-${skills[j].category}`,
        color: '#ffffff',
        strength: 0.15,
        isInterHub: true,
      });
    }
  }

  return { nodes, links };
}

// ─── Simple force simulation ──────────────────────────────
function simulate(nodes, links, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  // Initialize random positions in a circle
  nodes.forEach((n, i) => {
    if (n.x === 0 && n.y === 0) {
      const angle = (i / nodes.length) * Math.PI * 2;
      const spread = n.isHub ? 120 : 60 + Math.random() * 140;
      n.x = centerX + Math.cos(angle) * spread;
      n.y = centerY + Math.sin(angle) * spread;
    }
  });

  return function tick() {
    const damping = 0.85;
    const repulsion = 800;
    const attraction = 0.008;
    const centerGravity = 0.002;

    // Reset forces
    nodes.forEach((n) => {
      n.vx = 0;
      n.vy = 0;
    });

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = a.radius + b.radius + 20;

        if (dist < 1) dist = 1;
        const force = repulsion / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;

        // Hard collision
        if (dist < minDist) {
          const overlap = (minDist - dist) / 2;
          a.x += (dx / dist) * overlap;
          a.y += (dy / dist) * overlap;
          b.x -= (dx / dist) * overlap;
          b.y -= (dy / dist) * overlap;
        }
      }
    }

    // Attraction along links
    links.forEach((link) => {
      const source = nodeMap[link.source];
      const target = nodeMap[link.target];
      if (!source || !target) return;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const idealDist = link.isInterHub ? 200 : 100;
      const force = (dist - idealDist) * attraction * link.strength;

      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    });

    // Center gravity
    nodes.forEach((n) => {
      n.vx += (centerX - n.x) * centerGravity;
      n.vy += (centerY - n.y) * centerGravity;
    });

    // Apply velocity with damping and boundary clamping
    const padding = 40;
    nodes.forEach((n) => {
      n.vx *= damping;
      n.vy *= damping;
      n.x += n.vx;
      n.y += n.vy;
      n.x = Math.max(padding, Math.min(width - padding, n.x));
      n.y = Math.max(padding, Math.min(height - padding, n.y));
    });
  };
}

// ─── Main Component ───────────────────────────────────────
export default function SkillOrb() {
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const tickRef = useRef(null);
  const animRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const hoveredRef = useRef(null);

  // Initialize graph
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

    // Run initial stabilization
    for (let i = 0; i < 200; i++) tick();

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    function draw() {
      tick();
      ctx.clearRect(0, 0, width, height);

      const nodeMap = {};
      graph.nodes.forEach((n) => (nodeMap[n.id] = n));
      const currentHover = hoveredRef.current;

      // Draw links
      graph.links.forEach((link) => {
        const s = nodeMap[link.source];
        const t = nodeMap[link.target];
        if (!s || !t) return;

        const isHighlighted =
          currentHover &&
          (link.source === currentHover || link.target === currentHover);
        const isFaded = currentHover && !isHighlighted;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (link.isInterHub) {
          ctx.strokeStyle = isHighlighted
            ? 'rgba(255,255,255,0.15)'
            : isFaded
            ? 'rgba(255,255,255,0.02)'
            : 'rgba(255,255,255,0.04)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
        } else {
          const alpha = isHighlighted ? 0.6 : isFaded ? 0.06 : 0.2;
          ctx.strokeStyle = hexToRgba(link.color, alpha);
          ctx.lineWidth = isHighlighted ? 1.5 : 1;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw nodes
      graph.nodes.forEach((node) => {
        const isNodeHovered = currentHover === node.id;
        const isConnected =
          currentHover &&
          graph.links.some(
            (l) =>
              (l.source === currentHover && l.target === node.id) ||
              (l.target === currentHover && l.source === node.id)
          );
        const isFaded = currentHover && !isNodeHovered && !isConnected;

        // Glow
        if ((isNodeHovered || node.isHub) && !isFaded) {
          const glowRadius = node.radius * (isNodeHovered ? 3 : 2);
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowRadius
          );
          gradient.addColorStop(0, hexToRgba(node.color, isNodeHovered ? 0.3 : 0.12));
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const nodeAlpha = isFaded ? 0.15 : isNodeHovered ? 1 : 0.75;
        ctx.fillStyle = hexToRgba(node.color, nodeAlpha * (node.isHub ? 0.25 : 0.5));
        ctx.fill();
        ctx.strokeStyle = hexToRgba(node.color, isFaded ? 0.1 : isNodeHovered ? 1 : 0.5);
        ctx.lineWidth = node.isHub ? 2 : 1;
        ctx.stroke();

        // Label
        const labelAlpha = isFaded ? 0.15 : isNodeHovered || isConnected ? 1 : 0.7;
        ctx.fillStyle = hexToRgba(node.color, labelAlpha);
        ctx.font = node.isHub
          ? 'bold 13px -apple-system, BlinkMacSystemFont, sans-serif'
          : '11px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, node.x, node.y + node.radius + 5);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Mouse interaction
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || !graphRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    for (const node of graphRef.current.nodes) {
      const dx = mx - node.x;
      const dy = my - node.y;
      const hitRadius = Math.max(node.radius + 8, 16);
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        found = node.id;
        break;
      }
    }

    if (found !== hoveredRef.current) {
      hoveredRef.current = found;
      setHovered(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = null;
    setHovered(null);
    if (canvasRef.current) canvasRef.current.style.cursor = 'default';
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

// ─── Utility ──────────────────────────────────────────────
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
