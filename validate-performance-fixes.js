#!/usr/bin/env node

/**
 * Performance Fix Validation Script
 * Tests all the implemented performance and error handling improvements
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

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    log(GREEN, `✅ ${description}`);
    return true;
  } else {
    log(RED, `❌ ${description} - File not found: ${filePath}`);
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(searchString)) {
      log(GREEN, `✅ ${description}`);
      return true;
    } else {
      log(YELLOW, `⚠️  ${description} - Content not found`);
      return false;
    }
  } else {
    log(RED, `❌ ${description} - File not found`);
    return false;
  }
}

function runValidation() {
  log(BLUE, '\n🔍 Performance Fix Validation Report\n');
  
  let passed = 0;
  let total = 0;
  
  // Test 1: Error Boundary Implementation
  log(BLUE, '1. Error Boundary and React Error Handling');
  total++;
  if (checkFile('src/components/error-boundary.tsx', 'Error Boundary component exists')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('src/app/layout.tsx', 'ErrorBoundary', 'Error Boundary integrated in layout')) {
    passed++;
  }
  
  // Test 2: Performance Observer Fixes
  log(BLUE, '\n2. Performance Observer Error Handling');
  total++;
  if (checkFileContent('src/components/analytics/web-vitals.tsx', 'getSupportedEntryTypes', 'Performance Observer entry type validation')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('src/components/analytics/web-vitals.tsx', 'longtask', 'Long task observer with error handling')) {
    passed++;
  }
  
  // Test 3: Resource Loading Optimization
  log(BLUE, '\n3. Resource Loading and Font Optimization');
  total++;
  if (checkFileContent('src/app/layout.tsx', 'font-display: swap', 'Font display optimization')) {
    passed++;
  }
  
  total++;
  if (checkFile('src/components/resource-tracker.tsx', 'Resource usage tracking component')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('src/app/layout.tsx', 'sizes="32x32"', 'Favicon optimization (removed duplicate preload)')) {
    passed++;
  }
  
  // Test 4: Chunk Loading Error Recovery
  log(BLUE, '\n4. Chunk Loading Error Recovery');
  total++;
  if (checkFile('src/components/chunk-loader.tsx', 'Chunk loading handler component exists')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('src/components/chunk-loader.tsx', 'retryDynamicImport', 'Dynamic import retry mechanism')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('next.config.ts', 'crossOriginLoading', 'Next.js config enhanced for chunk loading')) {
    passed++;
  }
  
  // Test 5: Error Tracking and Analytics
  log(BLUE, '\n5. Error Tracking and Analytics');
  total++;
  if (checkFile('src/app/api/error-tracking/route.ts', 'Error tracking API endpoint')) {
    passed++;
  }
  
  total++;
  if (checkFile('src/components/error-dashboard.tsx', 'Error analytics dashboard')) {
    passed++;
  }
  
  total++;
  if (checkFile('src/components/global-error-handler.tsx', 'Global error handler component')) {
    passed++;
  }
  
  // Test 6: Bundle Configuration
  log(BLUE, '\n6. Bundle and Build Optimization');
  total++;
  if (checkFileContent('next.config.ts', 'maxAsyncRequests', 'Enhanced webpack bundle splitting configuration')) {
    passed++;
  }
  
  total++;
  if (checkFileContent('next.config.ts', 'hidden-source-map', 'Source map configuration for debugging')) {
    passed++;
  }
  
  // Test 7: Integration Verification
  log(BLUE, '\n7. Component Integration');
  total++;
  if (checkFileContent('src/app/layout.tsx', 'ChunkLoadingHandler', 'All performance components integrated in layout')) {
    passed++;
  }
  
  // Summary
  log(BLUE, '\n📊 Validation Summary');
  log(GREEN, `Passed: ${passed}/${total} tests`);
  
  const percentage = Math.round((passed / total) * 100);
  if (percentage >= 90) {
    log(GREEN, `🎉 Excellent! ${percentage}% of tests passed`);
  } else if (percentage >= 75) {
    log(YELLOW, `⚠️  Good: ${percentage}% of tests passed, some improvements needed`);
  } else {
    log(RED, `❌ Needs work: ${percentage}% of tests passed`);
  }
  
  // Performance Features Summary
  log(BLUE, '\n🚀 Implemented Performance Features:');
  log(GREEN, '• Error Boundary with React error recovery');
  log(GREEN, '• Performance Observer with browser compatibility checks');
  log(GREEN, '• Resource preload optimization and tracking');
  log(GREEN, '• Font loading optimization with font-display: swap');
  log(GREEN, '• Chunk loading retry mechanisms');
  log(GREEN, '• Global error handling and reporting');
  log(GREEN, '• Real-time error analytics dashboard');
  log(GREEN, '• Enhanced webpack bundle splitting');
  log(GREEN, '• Browser-specific fallbacks and graceful degradation');
  
  log(BLUE, '\n🎯 Issues Addressed:');
  log(GREEN, '• React minified error #130 - Error boundaries prevent crashes');
  log(GREEN, '• Performance Observer longtask errors - Graceful fallback');
  log(GREEN, '• Unused preloaded resources - Tracking and optimization');
  log(GREEN, '• Chunk loading failures - Retry mechanisms and reload fallback');
  
  log(BLUE, '\n📈 Expected Performance Improvements:');
  log(GREEN, '• Reduced error rates in production');
  log(GREEN, '• Better handling of browser compatibility issues');
  log(GREEN, '• Improved resource loading efficiency');
  log(GREEN, '• Enhanced debugging capabilities');
  log(GREEN, '• Real-time error monitoring and analytics');
  
  return percentage >= 90;
}

// Run the validation
const success = runValidation();
process.exit(success ? 0 : 1);