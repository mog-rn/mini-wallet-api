// prisma/seed.ts
import { prisma } from "../src/lib/prisma.ts";

async function main() {
  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();

  // Create wallets
  const john = await prisma.wallet.create({
    data: {
      ownerName: 'John Doe',
      balance: 5000.00,
    },
  });

  const jane = await prisma.wallet.create({
    data: {
      ownerName: 'Jane Smith',
      balance: 2500.00,
    },
  });

  const carol = await prisma.wallet.create({
    data: {
      ownerName: 'Carol Johnson',
      balance: 0.00,
    },
  });

  // Seed some transactions
  await prisma.transaction.create({
    data: {
      type: 'DEPOSIT',
      amount: 5000.00,
      status: 'SUCCESSFUL',
      toWalletId: john.id,
      reference: 'Initial deposit',
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'DEPOSIT',
      amount: 2500.00,
      status: 'SUCCESSFUL',
      toWalletId: jane.id,
      reference: 'Initial deposit',
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'TRANSFER',
      amount: 500.00,
      status: 'SUCCESSFUL',
      fromWalletId: john.id,
      toWalletId: jane.id,
      reference: 'Payment for supplies',
    },
  });

  console.log('Seed data created:');
  console.log(`   (${john.id}) - KES 5,000.00`);
  console.log(`  Jane   (${jane.id}) - KES 2,500.00`);
  console.log(`  Carol (${carol.id}) - KES 0.00 (empty wallet for testing)`);
  console.log('  3 transactions seeded');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });