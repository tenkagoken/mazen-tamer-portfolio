import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { preview } from 'vite'

const server = await preview({
  preview: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: true,
  },
})

let exitCode = 1
try {
  exitCode = await new Promise((resolveExit, reject) => {
    const runner = spawn(
      process.execPath,
      [resolve('node_modules/@playwright/test/cli.js'), 'test'],
      { stdio: 'inherit', env: process.env },
    )
    runner.once('error', reject)
    runner.once('exit', (code, signal) => {
      if (signal) reject(new Error(`Playwright exited on ${signal}`))
      else resolveExit(code ?? 1)
    })
  })
} finally {
  await server.close()
}

process.exitCode = exitCode
