#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const geminiPath = path.join(process.env.APPDATA || '', 'npm', 'gemini.ps1');
const args = process.argv.slice(2);

const child = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', geminiPath, ...args], {
    stdio: 'inherit'
});

child.on('exit', (code) => {
    process.exit(code || 0);
});