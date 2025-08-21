# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Add health check user (non-root for security)
RUN addgroup -g 1001 -S nodejs && adduser -S vibr -u 1001

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Remove dev dependencies to reduce image size
RUN pnpm prune --production

# Change ownership to non-root user
RUN chown -R vibr:nodejs /app
USER vibr

# Expose port (Railway will set PORT env var)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/healthz', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "run", "start"]