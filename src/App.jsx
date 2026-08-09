import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import NavigationMenu from './components/NavigationMenu';
import { ParallaxProvider } from './scene/Parallax';
import { WindProvider } from './scene/Wind';
import { PaintDefs } from './scene/Paint';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import { nodes, levelFor } from './data/site';
import { applyPalette } from './theme/palette';

const isNightNow = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

const App = () => {
  const [current, setCurrent] = useState('home');
  const [night, setNight] = useState(isNightNow);

  const node = nodes[current];
  const level = useMemo(() => levelFor(current), [current]);

  // Palette first, before paint, so a page never flashes the wrong light.
  useLayoutEffect(() => {
    applyPalette(node?.section ?? 'home', night);
  }, [node, night]);

  const navigate = useCallback((id) => {
    if (!nodes[id]) {
      console.warn(`No such node: '${id}'`);
      return;
    }
    setCurrent(id);
  }, []);

  const toggleTime = useCallback(() => setNight((value) => !value), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      current === 'home'
        ? 'Shaurya Chauhan'
        : `${node?.title} — Shaurya Chauhan`;
  }, [current, node]);

  const page = useMemo(() => {
    if (!node) return null;

    switch (node.kind) {
      case 'home':
        return (
          <HomePage
            key="home"
            night={night}
            onNavigate={navigate}
            onToggleTime={toggleTime}
          />
        );
      case 'section':
        return (
          <SectionPage
            key={current}
            node={node}
            night={night}
            onNavigate={navigate}
            onToggleTime={toggleTime}
          />
        );
      case 'about':
        return (
          <AboutPage
            key={current}
            node={node}
            night={night}
            onNavigate={navigate}
            onToggleTime={toggleTime}
          />
        );
      default:
        return (
          <ProjectPage
            key={current}
            node={node}
            night={night}
            onNavigate={navigate}
            onToggleTime={toggleTime}
          />
        );
    }
  }, [current, node, night, navigate, toggleTime]);

  return (
    <ErrorBoundary>
      <ParallaxProvider>
        <WindProvider>
          {/* The paint box: filters and gradients every scene references by id. */}
          <PaintDefs />
          <NavigationMenu
            level={level}
            currentNode={current}
            isNight={night}
            onNavigate={navigate}
          />
          <AnimatePresence mode="wait">{page}</AnimatePresence>
        </WindProvider>
      </ParallaxProvider>
    </ErrorBoundary>
  );
};

export default App;
