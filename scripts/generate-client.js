const { execSync } = require('child_process');
const path = require('path');

try {
  const schema = path.join(process.cwd(), 'prisma', 'schema.prisma');
  console.log('Running Prisma generate...');
  execSync(`npx prisma generate --schema=${schema}`, { stdio: 'inherit' });
  console.log('Prisma Client generated successfully');
} catch (error) {
  console.error('Failed to generate Prisma Client:', error);
  process.exit(1);
}