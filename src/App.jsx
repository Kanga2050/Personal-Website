import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import NavMap from './components/NavMap';
import StartPage from './pages/StartPage';
import UniversePage from './pages/UniversePage';
import MemoriesPage from './pages/MemoriesPage';
import CollectionPage from './pages/CollectionPage';
import DetailPage from './pages/DetailPage';
import { nodes, levelAt, pathTo } from './data/site';

const isNightNow = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

const App = () => {
  const [current, setCurrent] = useState('start');
  const [path, setPath] = useState([]);
  const [isNight, setIsNight] = useState(isNightNow);

  const level = useMemo(() => levelAt(path), [path]);

  /** Move to a node, opening whichever graph level actually holds it. */
  const navigate = useCallback((id) => {
    const target = pathTo(id);
    if (!target) {
      console.warn(`No graph level contains '${id}'`);
      return;
    }
    setPath(target);
    setCurrent(id);
  }, []);

  /** Descend into the level a hub node contains. */
  const enterLevel = useCallback(
    (id) => {
      if (!level.children?.[id]) return;
      setPath((previous) => [...previous, id]);
    },
    [level],
  );

  /** Step back out to the parent level, landing on the hub we came through. */
  const exitLevel = useCallback(() => {
    if (path.length === 0) return;
    setCurrent(path[path.length - 1]);
    setPath(path.slice(0, -1));
  }, [path]);

  const toggleTime = useCallback(() => setIsNight((value) => !value), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const title = current === 'start' ? null : nodes[current]?.title;
    document.title = title ? `${title} — Universe` : 'Universe';
  }, [current]);

  const page = useMemo(() => {
    if (current === 'start') {
      return <StartPage key="start" onEnter={() => navigate('universe')} />;
    }
    if (current === 'universe') {
      return (
        <UniversePage key="universe" isNight={isNight} onNavigate={navigate} />
      );
    }
    if (current === 'memories') {
      return <MemoriesPage key="memories" onNavigate={navigate} />;
    }

    const node = nodes[current];
    if (!node) return null;

    return node.kind === 'collection' ? (
      <CollectionPage key={current} node={node} onNavigate={navigate} />
    ) : (
      <DetailPage key={current} node={node} onNavigate={navigate} />
    );
  }, [current, isNight, navigate]);

  return (
    <ErrorBoundary>
      {current !== 'start' && (
        <NavMap
          level={level}
          currentNode={current}
          path={path}
          onNavigate={navigate}
          onEnter={enterLevel}
          onExit={exitLevel}
          showTimeToggle={current === 'universe'}
          isNight={isNight}
          onToggleTime={toggleTime}
        />
      )}

      <AnimatePresence mode="wait">{page}</AnimatePresence>
    </ErrorBoundary>
  );
};

export default App;
