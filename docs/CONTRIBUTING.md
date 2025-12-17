# 🤝 Contributing to CodeShare

Thank you for considering contributing to CodeShare! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, etc.)

**Example:**
```markdown
**Bug:** Login fails with valid credentials

**Steps to Reproduce:**
1. Go to /login
2. Enter valid email and password
3. Click "Sign In"

**Expected:** User should be logged in
**Actual:** Error message appears

**Environment:**
- OS: macOS 13.0
- Node: v18.0.0
- Browser: Chrome 120
```

### Suggesting Features

Feature suggestions are welcome! Please include:

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What other approaches did you think about?
- **Additional context** - Mockups, examples, etc.

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🔧 Development Setup

### Prerequisites

- Node.js v16+
- MongoDB v5+
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/CodeShare.git
cd CodeShare

# Add upstream remote
git remote add upstream https://github.com/shubhamjadhav0715/CodeShare.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development servers
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commits follow commit guidelines

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by maintainers
3. **Changes requested** if needed
4. **Approval** and merge

## 💻 Coding Standards

### JavaScript/React

```javascript
// ✅ Good
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await dispatch(login(credentials));
    if (result.type === 'auth/login/fulfilled') {
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

// ❌ Bad
const handleSubmit = async e => {
  e.preventDefault()
  const result = await dispatch(login(credentials))
  if(result.type==='auth/login/fulfilled'){navigate('/dashboard')}
}
```

### File Naming

- **Components:** PascalCase (`UserProfile.jsx`)
- **Utilities:** camelCase (`apiHelper.js`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL.js`)
- **CSS:** kebab-case (`user-profile.css`)

### Code Organization

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── redux/           # State management
├── utils/           # Helper functions
├── services/        # API services
└── constants/       # Constants
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting)
- **refactor:** Code refactoring
- **test:** Adding/updating tests
- **chore:** Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(editor): resolve syntax highlighting bug"
git commit -m "docs(api): update authentication endpoints"

# Bad commits
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfasdf"
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# E2E tests
npm run test:e2e
```

### Writing Tests

```javascript
// Example test
describe('Login Component', () => {
  it('should display error for invalid credentials', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid@email.com' }
    });
    
    fireEvent.click(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)

## 🆘 Getting Help

- **Discord:** [Join our community](#)
- **GitHub Issues:** [Open an issue](https://github.com/shubhamjadhav0715/CodeShare/issues)
- **Email:** shubhamjadhav0715@gmail.com

## 🎉 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to CodeShare! 🚀**
