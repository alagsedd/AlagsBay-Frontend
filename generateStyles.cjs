const fs = require('fs');
const path = require('path');

// Add all existing components & pages here
const names = [
  'Navbar',
  'Footer',
  'ProductCard',
  'CartItem',
  'HeroSection',
  'Sidebar',
  'OrderSummary',
  'Home',
  'Login',
  'Register',
  'Cart',
  'Checkout',
  'ProductDetails',
  'Profile'
];

const stylesDir = path.join(__dirname, 'src', 'styles');

// Ensure styles folder exists
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

const cssTemplate = (name) =>
`.container {
  /* Styles for ${name} component */
}

.page {
  /* Styles for ${name} page */
}
`;

names.forEach(name => {
  const cssPath = path.join(stylesDir, `${name}.module.css`);
  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, cssTemplate(name));
    console.log(`🎨 Created: ${cssPath}`);
  } else {
    console.log(`⚠️ Skipped (already exists): ${cssPath}`);
  }
});
