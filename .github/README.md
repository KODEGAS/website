# GitHub Actions and CI/CD Setup

This repository is now configured with automated GitHub Actions workflows for continuous integration and deployment.

## 🚀 Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)
- **Triggers**: Push to `main`/`develop`, Pull Requests to `main`
- **Jobs**:
  - Tests on Node.js 18.x and 20.x
  - ESLint code quality checks
  - TypeScript compilation
  - Performance validation
  - Build verification
  - Automatic deployment to Firebase App Hosting (main branch only)

### 2. Production Deployment (`.github/workflows/deploy.yml`)
- **Triggers**: Release published, Manual dispatch
- **Features**:
  - Production-ready build validation
  - Firebase App Hosting deployment
  - Build artifacts verification
  - Deployment notifications

### 3. Pull Request Validation (`.github/workflows/pr-validation.yml`)
- **Triggers**: PR opened/updated to `main`/`develop`
- **Features**:
  - Code quality checks
  - Performance validation
  - Bundle size analysis
  - Security audit
  - Lighthouse performance testing
  - Automated PR comments with results

## 🔧 Required Secrets

Configure these secrets in your GitHub repository settings:

### Firebase Deployment
```
FIREBASE_SERVICE_ACCOUNT    # Firebase service account JSON
FIREBASE_PROJECT_ID         # Your Firebase project ID
FIREBASE_TOKEN             # Firebase CI token
```

### Application Secrets
```
SENDGRID_API_KEY           # SendGrid API key for contact form
LHCI_GITHUB_APP_TOKEN      # Lighthouse CI GitHub app token (optional)
```

## 📋 Setup Instructions

### 1. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (if not already done)
firebase init hosting

# Get deployment token for CI
firebase login:ci
```

### 2. Repository Secrets
1. Go to Repository Settings → Secrets and Variables → Actions
2. Add the required secrets listed above
3. For `FIREBASE_SERVICE_ACCOUNT`:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Copy the entire JSON content as the secret value

### 3. Environment Configuration
The workflows use these environment variables:
- `NEXT_PUBLIC_SITE_URL`: Site URL (https://kodegas.com)
- `NODE_ENV`: Environment (production/development)
- `SENDGRID_API_KEY`: Email service configuration

## 🔍 Monitoring

### Build Status
- Check the Actions tab in your GitHub repository
- Green checkmarks indicate successful workflows
- Red X marks indicate failures with detailed logs

### Performance Monitoring
- Lighthouse CI runs on every PR
- Performance validation script ensures all optimizations are working
- Bundle size analysis helps track application growth

### Error Handling
- Workflows include error handling and notifications
- Failed deployments don't affect the live site
- Rollback capabilities through Firebase Console

## 🛠 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript compilation errors

2. **Deployment Failures**
   - Verify Firebase project configuration
   - Check service account permissions
   - Ensure deployment token is valid

3. **Performance Issues**
   - Review Lighthouse CI reports
   - Check bundle size increases
   - Validate performance optimization features

### Manual Deployment
If automated deployment fails, you can deploy manually:
```bash
npm run build
firebase deploy
```

## 📈 Performance Features Validated

The CI/CD pipeline automatically validates these performance optimizations:
- ✅ Error Boundary implementation
- ✅ Performance Observer error handling
- ✅ Resource loading optimization
- ✅ Chunk loading error recovery
- ✅ Error tracking and analytics
- ✅ Bundle optimization
- ✅ Component integration

All workflows ensure these performance features continue working correctly with every code change.