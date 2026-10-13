# 使用 PowerShell 7：pwsh -NoProfile -File D:/mota-50-local/start.ps1
$ErrorActionPreference = 'Stop'
& 'D:/software/nvm/v22.20.0/node.exe' (Join-Path $PSScriptRoot 'serve.mjs')
