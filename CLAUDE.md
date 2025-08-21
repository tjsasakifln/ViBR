# CLAUDE.md

# Using Gemini CLI for Large Codebase Analysis

  When analyzing large codebases or multiple files that might exceed context limits, use the Gemini CLI with its massive
  context window. Use `gemini -p` to leverage Google Gemini's large context capacity.

  ## File and Directory Inclusion Syntax

  Use the `@` syntax to include files and directories in your Gemini prompts. The paths should be relative to WHERE you run the
   gemini command:

  ### Examples:

  **Single file analysis:**
  ```bash
  gemini -p "@src/main.py Explain this file's purpose and structure"

  Multiple files:
  gemini -p "@package.json @src/index.js Analyze the dependencies used in the code"

  Entire directory:
  gemini -p "@src/ Summarize the architecture of this codebase"

  Multiple directories:
  gemini -p "@src/ @tests/ Analyze test coverage for the source code"

  Current directory and subdirectories:
  gemini -p "@./ Give me an overview of this entire project"
  
#
 Or use --all_files flag:
  gemini --all_files -p "Analyze the project structure and dependencies"

  Implementation Verification Examples

  Check if a feature is implemented:
  gemini -p "@src/ @lib/ Has dark mode been implemented in this codebase? Show me the relevant files and functions"

  Verify authentication implementation:
  gemini -p "@src/ @middleware/ Is JWT authentication implemented? List all auth-related endpoints and middleware"

  Check for specific patterns:
  gemini -p "@src/ Are there any React hooks that handle WebSocket connections? List them with file paths"

  Verify error handling:
  gemini -p "@src/ @api/ Is proper error handling implemented for all API endpoints? Show examples of try-catch blocks"

  Check for rate limiting:
  gemini -p "@backend/ @middleware/ Is rate limiting implemented for the API? Show the implementation details"

  Verify caching strategy:
  gemini -p "@src/ @lib/ @services/ Is Redis caching implemented? List all cache-related functions and their usage"

  Check for specific security measures:
  gemini -p "@src/ @api/ Are SQL injection protections implemented? Show how user inputs are sanitized"

  Verify test coverage for features:
  gemini -p "@src/payment/ @tests/ Is the payment processing module fully tested? List all test cases"

  When to Use Gemini CLI

  Use gemini -p when:
  - Analyzing entire codebases or large directories
  - Comparing multiple large files
  - Need to understand project-wide patterns or architecture
  - Current context window is insufficient for the task
  - Working with files totaling more than 100KB
  - Verifying if specific features, patterns, or security measures are implemented
  - Checking for the presence of certain coding patterns across the entire codebase

  Important Notes

  - Paths in @ syntax are relative to your current working directory when invoking gemini
  - The CLI will include file contents directly in the context
  - No need for --yolo flag for read-only analysis
  - Gemini's context window can handle entire codebases that would overflow Claude's context
  - When checking implementations, be specific about what you're looking for to get accurate results # Using Gemini CLI for Large Codebase Analysis


  When analyzing large codebases or multiple files that might exceed context limits, use the Gemini CLI with its massive
  context window. Use `gemini -p` to leverage Google Gemini's large context capacity.


  ## File and Directory Inclusion Syntax


  Use the `@` syntax to include files and directories in your Gemini prompts. The paths should be relative to WHERE you run the
   gemini command:


  ### Examples:


  **Single file analysis:**
  ```bash
  gemini -p "@src/main.py Explain this file's purpose and structure"


  Multiple files:
  gemini -p "@package.json @src/index.js Analyze the dependencies used in the code"


  Entire directory:
  gemini -p "@src/ Summarize the architecture of this codebase"


  Multiple directories:
  gemini -p "@src/ @tests/ Analyze test coverage for the source code"


  Current directory and subdirectories:
  gemini -p "@./ Give me an overview of this entire project"
  # Or use --all_files flag:
  gemini --all_files -p "Analyze the project structure and dependencies"


  Implementation Verification Examples


  Check if a feature is implemented:
  gemini -p "@src/ @lib/ Has dark mode been implemented in this codebase? Show me the relevant files and functions"


  Verify authentication implementation:
  gemini -p "@src/ @middleware/ Is JWT authentication implemented? List all auth-related endpoints and middleware"


  Check for specific patterns:
  gemini -p "@src/ Are there any React hooks that handle WebSocket connections? List them with file paths"


  Verify error handling:
  gemini -p "@src/ @api/ Is proper error handling implemented for all API endpoints? Show examples of try-catch blocks"


  Check for rate limiting:
  gemini -p "@backend/ @middleware/ Is rate limiting implemented for the API? Show the implementation details"


  Verify caching strategy:
  gemini -p "@src/ @lib/ @services/ Is Redis caching implemented? List all cache-related functions and their usage"


  Check for specific security measures:
  gemini -p "@src/ @api/ Are SQL injection protections implemented? Show how user inputs are sanitized"


  Verify test coverage for features:
  gemini -p "@src/payment/ @tests/ Is the payment processing module fully tested? List all test cases"


  When to Use Gemini CLI


  Use gemini -p when:
  - Analyzing entire codebases or large directories
  - Comparing multiple large files
  - Need to understand project-wide patterns or architecture
  - Current context window is insufficient for the task
  - Working with files totaling more than 100KB
  - Verifying if specific features, patterns, or security measures are implemented
  - Checking for the presence of certain coding patterns across the entire codebase


  Important Notes


  - Paths in @ syntax are relative to your current working directory when invoking gemini
  - The CLI will include file contents directly in the context
  - No need for --yolo flag for read-only analysis
  - Gemini's context window can handle entire codebases that would overflow Claude's context
  - When checking implementations, be specific about what you're looking for to get accurate results


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
```bash
# Start development server
pnpm run dev

# Build the application
pnpm run build

# Production start (requires build first)
pnpm run start

# Preview build locally
pnpm run preview
```

### Testing & Quality
```bash
# Run tests once
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Type checking
pnpm run typecheck

# Generate Cloudflare types
pnpm run typegen
```

### Deployment
```bash
# Deploy to Cloudflare Pages
pnpm run deploy
```

## Project Architecture

### Tech Stack
- **Framework**: Remix (React-based full-stack framework)
- **Runtime**: Cloudflare Workers/Pages
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk.dev
- **AI**: Anthropic Claude API
- **Styling**: UnoCSS (atomic CSS framework) + SCSS
- **Code Editor**: CodeMirror 6
- **Terminal**: xterm.js
- **WebContainer**: StackBlitz WebContainer API for in-browser development environment

### Core Architecture Patterns

**State Management**: Uses Nanostores for reactive state management across components:
- `workbenchStore`: Main container orchestrating editor, files, terminal, and previews
- `chatStore`: Manages AI chat interactions and message history  
- `filesStore`: Handles file system operations with WebContainer
- `editorStore`: Manages document editing and selection
- `terminalStore`: Controls terminal sessions

**Repository Pattern**: Database layer uses repository interfaces (`IUserRepository`, `IProjectRepository`, `IConversationRepository`) with Supabase implementations.

**Workbench System**: The core development environment consists of:
- **EditorPanel**: CodeMirror-based editor with syntax highlighting
- **FileTree**: File browser with create/delete/rename operations
- **Terminal**: In-browser terminal using xterm.js
- **Preview**: Live preview of applications running in WebContainer
- **Chat**: AI assistant for code generation and assistance

### Key Components

**WebContainer Integration**: The app runs a full Node.js environment in the browser using StackBlitz's WebContainer API, enabling:
- Real-time file system operations
- Terminal command execution
- Package installation and build processes
- Live preview of web applications

**AI Integration**: Uses Anthropic's Claude API for:
- Code generation and editing
- Natural language programming assistance
- Project scaffolding and setup
- Brazilian Portuguese interface and interaction support (UI messages, user communication)

**Authentication Flow**: Clerk.dev handles user authentication with:
- OAuth providers support
- Session management
- User profile management
- Plan-based access control (free/pro)
- Key files: `app/routes/auth/signin.tsx`, `app/components/auth/UserMenu.client.tsx`

## File Organization

```
app/
├── components/           # React components
│   ├── chat/            # AI chat interface
│   ├── editor/          # Code editor (CodeMirror)
│   ├── workbench/       # Main development environment
│   ├── auth/            # Authentication components
│   └── ui/              # Reusable UI components
├── lib/
│   ├── stores/          # Nanostores state management
│   ├── webcontainer/    # WebContainer integration
│   ├── database/        # Database repositories and services
│   ├── runtime/         # Action runner and message parser
│   └── hooks/           # Custom React hooks
├── routes/              # Remix routes (file-based routing)
├── styles/              # SCSS stylesheets
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Development Guidelines

### Import Conventions
- Use `~/` alias for app imports (configured in tsconfig.json)
- Relative imports are restricted by ESLint - use absolute imports instead
- Client-side only code should be in `.client.tsx` files
- Server-side only code should be in `.server.ts` files

### Styling
- Primary styling uses UnoCSS with custom ViBR theme colors
- Brazilian brand colors: Royal blue (`#0066cc`) and lime green (`#7ed321`)
  - Accent palette: Royal blue variations from `#e6f3ff` to `#003d7a`
  - ViBR palette: Lime green variations from `#f7fef0` to `#1f3d09`
- Theme system supports light/dark modes with CSS custom properties
- Component-specific styles use SCSS modules

### State Management
- Use Nanostores for global state
- Store instances are singleton and persist during HMR
- File modifications are tracked to enable save/reset operations
- Unsaved files are managed separately from file system state

### AI Integration
- All AI interactions route through `api.chat.ts`
- Messages are parsed to extract code actions and artifacts
- Action runner executes file operations and commands in WebContainer
- Streaming responses provide real-time feedback

### WebContainer Operations
- File operations are async and use WebContainer's file system API
- Terminal operations spawn processes in the container environment
- Preview URLs are managed through WebContainer's port system
- Build processes run within the container for isolation

### Database Operations
- Use repository pattern interfaces for all database operations
- Supabase RLS policies enforce user data isolation
- JSONB fields store complex data (files, messages, project metadata)
- Database schema is maintained in `database/schema.sql` with manual SQL migrations
- Schema includes users, projects, and conversations tables with proper indexing
- Use Supabase dashboard or SQL editor to apply schema changes to production

### Testing
- Uses Vitest for unit testing
- Test files should be co-located with source files
- Integration tests can use WebContainer for file system testing

## Browser Compatibility

- Some Chrome versions may have issues with Vite dev server (handled by custom plugin)
- WebContainer requires modern browsers with SharedArrayBuffer support
- Modern JavaScript features require browsers supporting ES2020+
- Fallback components provide SSR compatibility where needed
- For specific browser issues, check GitHub issues or compatibility matrices