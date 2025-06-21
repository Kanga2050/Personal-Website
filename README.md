# __ Universe

An interactive React-based navigation system featuring a memory graph with themed sections, particle effects, and smooth animations. Explore different areas of the universe - from techno realms to engineering cosmos to project showcases.

**This is a personal website** that serves as an interactive portfolio and digital space to showcase projects, technical experiences, and creative explorations. Each section represents different aspects of my work and interests, connected through an intuitive navigation system.

## 🚀 Getting Started

```bash
npm install
npm start
```

Visit `http://localhost:3000` and click the golden "**__**" button to enter the universe.

## 🎨 How It Works

### Universal Theming System
- Each section has its own gradient-based theme (gold, blue, green, purple, orange)
- Navigation elements automatically use destination site colors
- Themes defined in `src/theme/universalTheme.js`

### Memory Graph Navigation
- Hierarchical node-based navigation system
- Smooth transitions between sections using Framer Motion
- Circular navigation menu with themed connections

### Key Components
- **StartNode**: Black background entry point with sparkle effects
- **YinYangNode**: Dual-themed navigation between techno sections
- **ParticleSystem**: Interactive particle effects throughout
- **NavigationMenu**: Circular graph-based navigation interface

## 🛠 Customization

### Adding New Themes
1. Define theme in `src/theme/universalTheme.js`:
```javascript
'custom-theme': {
  gradient: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
  colors: { primary: '#ff6b6b', textPrimary: '#ffffff' }
}
```

2. Add site reference and connect to memory graph in `App.jsx`

### Modifying Sections
- Update content in `src/nodes/` components
- Adjust particle effects in `ParticleSystem.jsx`
- Customize animations with Framer Motion properties

## 🎭 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests

---

**Thank you for exploring the __ Universe!** ✨

*Built with React, Vite, Framer Motion, and lots of creative energy* 🌌
