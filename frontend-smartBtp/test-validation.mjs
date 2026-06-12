/**
 * Test script for validating form behavior
 * Run with: node test-validation.mjs
 */

// Import validation function
import { validateMateriau } from './src/modules/materiaux/validations/materiauValidation.js';

console.log('='.repeat(60));
console.log('VALIDATION TEST SUITE - seuil_alerte Field');
console.log('='.repeat(60));

// Test cases
const testCases = [
  {
    name: 'Empty seuil_alerte (should pass)',
    data: {
      nom: 'Ciment',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: '',
      quantite_initiale: 0,
    },
    expectError: false,
  },
  {
    name: 'seuil_alerte = 980 (string, should pass)',
    data: {
      nom: 'Ciment',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: '980',
      quantite_initiale: 0,
    },
    expectError: false,
  },
  {
    name: 'seuil_alerte = 980 (number, should pass)',
    data: {
      nom: 'Ciment',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: 980,
      quantite_initiale: 0,
    },
    expectError: false,
  },
  {
    name: 'seuil_alerte = -50 (should fail)',
    data: {
      nom: 'Ciment',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: '-50',
      quantite_initiale: 0,
    },
    expectError: true,
  },
  {
    name: 'seuil_alerte = "abc" (should fail)',
    data: {
      nom: 'Ciment',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: 'abc',
      quantite_initiale: 0,
    },
    expectError: true,
  },
  {
    name: 'Missing required nom (should fail)',
    data: {
      nom: '',
      categorie: 'structure',
      unite: 'sac',
      description: '',
      seuil_alerte: '980',
      quantite_initiale: 0,
    },
    expectError: true,
  },
];

let passCount = 0;
let failCount = 0;

testCases.forEach((testCase, index) => {
  const errors = validateMateriau(testCase.data);
  const hasErrors = Object.keys(errors).length > 0;
  const passed = hasErrors === testCase.expectError;

  console.log(`\nTest ${index + 1}: ${testCase.name}`);
  console.log(`  Expected Error: ${testCase.expectError}`);
  console.log(`  Got Error: ${hasErrors}`);

  if (passed) {
    console.log(`  ✓ PASS`);
    passCount++;
  } else {
    console.log(`  ✗ FAIL`);
    failCount++;
    if (hasErrors) {
      console.log(`  Errors:`, errors);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log(`RESULTS: ${passCount} passed, ${failCount} failed`);
console.log('='.repeat(60));
