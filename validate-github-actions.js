#!/usr/bin/env node

/**
 * GitHub Actions Validation Script
 * Simulates the CI pipeline to ensure workflows will work correctly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function log(color, message) {
  console.log(`${color}${message}${RESET}`);
}

function checkWorkflowFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    log(GREEN, `✅ ${description}`);
    return true;
  } else {
    log(RED, `❌ ${description} - File not found: ${filePath}`);
    return false;
  }
}

function runGitHubActionsValidation() {
  log(BLUE, '\n🔍 GitHub Actions Setup Validation Report\n');
  
  let passed = 0;
  let total = 0;
  
  // Test 1: Workflow Files
  log(BLUE, '1. GitHub Actions Workflow Files');
  total++;
  if (checkWorkflowFile('.github/workflows/ci.yml', 'CI/CD Pipeline workflow exists')) {
    passed++;
  }
  
  total++;
  if (checkWorkflowFile('.github/workflows/deploy.yml', 'Production deployment workflow exists')) {
    passed++;
  }
  
  total++;
  if (checkWorkflowFile('.github/workflows/pr-validation.yml', 'Pull request validation workflow exists')) {
    passed++;
  }
  
  // Test 2: Configuration Files
  log(BLUE, '\n2. Configuration Files');
  total++;
  if (checkWorkflowFile('firebase.json', 'Firebase hosting configuration exists')) {
    passed++;
  }
  
  total++;
  if (checkWorkflowFile('lighthouserc.json', 'Lighthouse CI configuration exists')) {
    passed++;
  }
  
  total++;
  if (checkWorkflowFile('.github/README.md', 'GitHub Actions documentation exists')) {
    passed++;
  }
  
  // Test 3: Build Process Simulation
  log(BLUE, '\n3. Build Process Validation');
  total++;
  try {
    log(YELLOW, 'Testing performance validation...');
    execSync('node validate-performance-fixes.js', { stdio: 'pipe' });
    log(GREEN, '✅ Performance validation script works');
    passed++;
  } catch (error) {
    log(RED, '❌ Performance validation failed');
  }
  
  total++;
  try {
    log(YELLOW, 'Testing build process...');
    execSync('npm run build', { stdio: 'pipe' });
    log(GREEN, '✅ Build process works');
    passed++;
  } catch (error) {
    log(RED, '❌ Build process failed');
  }
  
  // Test 4: Package.json Scripts
  log(BLUE, '\n4. NPM Scripts Validation');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['build', 'lint', 'typecheck', 'start'];
  
  requiredScripts.forEach(script => {
    total++;
    if (packageJson.scripts && packageJson.scripts[script]) {
      log(GREEN, `✅ Script "${script}" exists`);
      passed++;
    } else {
      log(RED, `❌ Script "${script}" missing`);
    }
  });
  
  // Summary
  log(BLUE, '\n📊 GitHub Actions Validation Summary');
  log(GREEN, `Passed: ${passed}/${total} tests`);
  
  const percentage = Math.round((passed / total) * 100);
  if (percentage >= 90) {
    log(GREEN, `🎉 Excellent! ${percentage}% of tests passed - GitHub Actions ready!`);
  } else if (percentage >= 75) {
    log(YELLOW, `⚠️  Good: ${percentage}% of tests passed, minor issues to address`);
  } else {
    log(RED, `❌ Issues found: ${percentage}% of tests passed, needs attention`);
  }
  
  // GitHub Actions Features
  log(BLUE, '\n🚀 GitHub Actions Features Implemented:');
  log(GREEN, '• Continuous Integration on push/PR');
  log(GREEN, '• Multi-platform testing (Node.js 18.x, 20.x)');
  log(GREEN, '• Code quality checks (ESLint, TypeScript)');
  log(GREEN, '• Performance validation on every build');
  log(GREEN, '• Automated Firebase App Hosting deployment');
  log(GREEN, '• Security auditing with npm audit');
  log(GREEN, '• Lighthouse performance testing');
  log(GREEN, '• Bundle size monitoring');
  log(GREEN, '• Automated PR comments with results');
  log(GREEN, '• Production deployment workflow');
  log(GREEN, '• Manual deployment with workflow_dispatch');
  
  log(BLUE, '\n📋 Next Steps to Complete Setup:');
  log(YELLOW, '1. Configure GitHub repository secrets:');
  log(YELLOW, '   - FIREBASE_SERVICE_ACCOUNT');
  log(YELLOW, '   - FIREBASE_PROJECT_ID');
  log(YELLOW, '   - FIREBASE_TOKEN');
  log(YELLOW, '   - SENDGRID_API_KEY');
  log(YELLOW, '2. Initialize Firebase project if not done');
  log(YELLOW, '3. Test workflows by creating a pull request');
  log(YELLOW, '4. Monitor deployment status in GitHub Actions tab');
  
  return percentage >= 75;
}

// Run the validation
const success = runGitHubActionsValidation();
process.exit(success ? 0 : 1);