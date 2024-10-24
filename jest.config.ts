import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  
  testEnvironment: 'node', 
  verbose: true,  
  collectCoverage: true, 
  coverageDirectory: 'coverage',  
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],  
  moduleFileExtensions: ['ts', 'js'],  
};

export default config;
