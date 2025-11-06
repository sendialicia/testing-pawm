const { execSync } = require('child_process');

try {
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL detected — running prisma generate');
    execSync('npx prisma generate --schema=prisma/schema.prisma', { stdio: 'inherit' });
  } else {
    console.log('DATABASE_URL not set — skipping prisma generate in postinstall');
  }
} catch (err) {
  console.error('Prisma generate failed in postinstall:', err);
  process.exit(0); // Exit gracefully even if prisma generate fails
}