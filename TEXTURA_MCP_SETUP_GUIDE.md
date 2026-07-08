# Textura MCP Server Installation Guide for Claude AI Agent

This guide provides step-by-step instructions for installing and configuring the Textura Model Context Protocol (MCP) server in VS Code.

## Prerequisites

- ✅ macOS (or Linux/Windows with bash)
- ✅ Node.js v20+ installed
- ✅ npm installed and accessible from terminal
- ✅ VS Code with GitHub Copilot installed
- ✅ Azure DevOps credentials/token (for @exp-textura registry access)

## Installation Steps

### Step 1: Create MCP Configuration Directory

```bash
mkdir -p ~/.vscode
```

### Step 2: Create MCP Configuration File

Create the file `~/.vscode/mcp.json` with the following content:

```json
{
  "textura": {
    "command": "npx",
    "args": ["-y", "@exp-textura/mcp-server"],
    "env": {
      "NPM_CONFIG_USERCONFIG": "/Users/osamaeldrieny/.npmrc"
    },
    "type": "stdio"
  }
}
```

**What this does:**
- Registers the Textura MCP server with VS Code
- Configures it to run via `npx` (no global installation needed)
- Sets up authentication via the `.npmrc` config file
- Uses stdio transport for communication

### Step 3: Configure npm Registry Authentication

Create or update `~/.npmrc` with the following content:

```
@exp-textura:registry=https://pkgs.dev.azure.com/nintex/_packaging/Nintex/npm/registry/
; begin auth token
//pkgs.dev.azure.com/nintex/_packaging/Nintex/npm/registry/:_authToken=NjZZSTZhSUs4VUZpaU9zYUltMUZkaEF5Q0ZISGN0RkVucUxBZWl6ODhVUzV0dWM1R1Zjd0pRUUo5OUNHQUNBQUFBQW1KY09ZQUFBU0FaRE9ETWVN
; end auth token
```

**What this does:**
- Tells npm where to find the `@exp-textura` package (Azure DevOps)
- Provides authentication token for private package access
- Uses base64-encoded Personal Access Token for security

### Step 4: Install Global Helper Tool (One-Time)

```bash
npm install -g vsts-npm-auth
```

**What this does:**
- Installs a helper tool for Azure DevOps authentication
- Enables automatic token refresh
- Only needs to be run once per machine

### Step 5: Restart VS Code

Close and reopen VS Code completely:

1. Close the VS Code window
2. Reopen VS Code
3. Allow 10-30 seconds for MCP server initialization

## Verification

After completing all steps, verify the installation works:

### Method 1: Terminal Test

```bash
npx -y @exp-textura/mcp-server --help
```

**Expected output:**
```
Mode: Standalone
Loaded 64 design spec(s); Figma name index has 74 entries (11 orphan name(s))
Loaded 5 guideline(s): data-visualization, elevation, forms, iconography, layout-foundations
Textura MCP Server running on stdio (Textura React v0.10.1)
```

### Method 2: VS Code Verification

1. Open VS Code
2. Open Copilot Chat (Cmd+K Cmd+J on macOS)
3. Ask a question like: "What Textura components are available?"
4. If Claude responds with information about Textura components, the MCP is connected ✅

## Troubleshooting

### Issue: npm authentication fails

**Error message:** `npm ERR! 401 Unauthorized`

**Solution:**
```bash
# Verify .npmrc exists and has correct token
cat ~/.npmrc

# Regenerate token if expired:
npm install -g vsts-npm-auth
vsts-npm-auth -config ~/.npmrc
```

### Issue: MCP server doesn't start

**Error message:** `ENOENT: no such file or directory`

**Solution:**
1. Verify `~/.vscode/mcp.json` exists and is valid JSON:
   ```bash
   cat ~/.vscode/mcp.json
   ```
2. Verify Node.js is accessible:
   ```bash
   which node
   node --version  # Should be v20+
   ```
3. Try installing the package manually:
   ```bash
   npm install -g @exp-textura/mcp-server
   ```

### Issue: Header not visible in browser

This is a separate React/styling issue. See `TEXTURA_IMPLEMENTATION.md` for debugging.

## What Works After Setup

Once Textura MCP is installed, Claude can:

✅ List all 69 available Textura components  
✅ Explain component props and variants  
✅ Provide usage examples and code snippets  
✅ Reference Textura design tokens  
✅ Suggest component-specific accessibility patterns  
✅ Check design system compliance  

### Example Copilot Queries

```
"What's the Button component API?"
"Show me a Header with tabs example"
"How do I use the Card component?"
"What are the available Textura colors?"
"Give me an accessible form pattern using Textura"
```

## Configuration Files Reference

### `~/.vscode/mcp.json`
- **Location:** User's home directory, `.vscode` folder
- **Purpose:** Registers MCP servers for VS Code
- **Scope:** Global (applies to all VS Code projects)

### `~/.npmrc`
- **Location:** User's home directory
- **Purpose:** npm configuration and authentication
- **Scope:** Global (applies to all npm commands)

### Local Project Files
- **`package.json`:** Lists `@exp-textura/react` as a dependency (should already be present)
- **`vite.config.js`:** Build configuration (no changes needed)

## Environment

- **Project:** `/Users/osamaeldrieny/Sandbox/my-first-project`
- **Framework:** React 18+ with Vite
- **Design System:** Textura v0.10.1
- **Package Registry:** Azure DevOps (@exp-textura)

## Support

If issues persist:

1. Check the `~/.vscode/mcp.json` is valid JSON
2. Verify npm authentication: `npm whoami --registry=https://pkgs.dev.azure.com/nintex/_packaging/Nintex/npm/registry/`
3. Review VS Code output panel: View → Output → "Copilot" or "MCP"
4. Restart VS Code and wait 30 seconds for initialization

---

**Last Updated:** 2026-07-09  
**Status:** ✅ Ready for deployment
