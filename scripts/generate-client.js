const { exec } = require('child_process');
const path = require('path');

async function generateClient() {
  const schema = path.join(process.cwd(), 'prisma', 'schema.prisma');
  const output = path.join(process.cwd(), 'node_modules', '.prisma', 'client');

  try {
    await new Promise((resolve, reject) => {
      exec(`npx prisma generate --schema=${schema} --generator-path=${output}`, (err, stdout, stderr) => {
        if (err) {
          console.error('Error during Prisma Client generation:', err);
          reject(err);
          return;
        }
        console.log(stdout);
        resolve();
      });
    });
  } catch (error) {
    console.error('Failed to generate Prisma Client:', error);
    process.exit(1);
  }
}

generateClient();