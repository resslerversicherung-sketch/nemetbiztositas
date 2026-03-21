import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nb24.de" },
    update: {},
    create: {
      email: "admin@nb24.de",
      password: adminPassword,
      name: "Admin NB24",
      role: "admin",
      language: "de",
      phone: "+49 123 456 789",
    },
  });

  // Create agent user
  const agentPassword = await hash("agent123", 12);
  const agent = await prisma.user.upsert({
    where: { email: "agent@nb24.de" },
    update: {},
    create: {
      email: "agent@nb24.de",
      password: agentPassword,
      name: "Tanácsadó Péter",
      role: "agent",
      language: "hu",
      phone: "+49 987 654 321",
    },
  });

  // Create demo customer
  const customerPassword = await hash("customer123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "teszt@example.com" },
    update: {},
    create: {
      email: "teszt@example.com",
      password: customerPassword,
      name: "Kovács János",
      role: "customer",
      language: "hu",
      phone: "+49 176 12345678",
    },
  });

  // Create demo contracts
  const contract1 = await prisma.contract.create({
    data: {
      contractNumber: "KFZ-2024-001",
      type: "kfz",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      premium: 89.50,
      paymentInterval: "monthly",
      details: JSON.stringify({
        vehicle: "VW Golf VII",
        licensePlate: "B-KJ 1234",
        coverage: "fullCasco",
      }),
      userId: customer.id,
    },
  });

  const contract2 = await prisma.contract.create({
    data: {
      contractNumber: "HPF-2024-002",
      type: "liability",
      status: "active",
      startDate: new Date("2024-03-01"),
      premium: 5.90,
      paymentInterval: "monthly",
      details: JSON.stringify({ type: "family", coverage: "10M" }),
      userId: customer.id,
    },
  });

  // Create demo leads
  const leadTypes = [
    { type: "kfz_calculator", data: { vehicle: "BMW 320d", coverage: "fullCasco" }, priority: "high" },
    { type: "evb_request", data: { vehicle: "Opel Corsa", purpose: "new_registration" }, priority: "urgent" },
    { type: "sepa_mandate", data: { accountHolder: "Nagy Éva", iban: "DE89..." }, priority: "medium" },
    { type: "kfz_calculator", data: { vehicle: "Audi A4", coverage: "partialCasco" }, priority: "medium" },
    { type: "contact", data: { subject: "Frage zur Versicherung" }, priority: "low" },
    { type: "claim", data: { type: "kfz", description: "Parkschaden" }, priority: "high" },
    { type: "kfz_calculator", data: { vehicle: "Mercedes C200", coverage: "liability" }, priority: "medium" },
    { type: "evb_request", data: { vehicle: "Ford Focus", purpose: "transfer" }, priority: "high" },
  ];

  for (const lead of leadTypes) {
    await prisma.lead.create({
      data: {
        type: lead.type,
        data: JSON.stringify(lead.data),
        priority: lead.priority,
        status: ["open", "in_progress", "success", "failed"][Math.floor(Math.random() * 4)],
        language: ["hu", "de", "ro"][Math.floor(Math.random() * 3)],
        source: "website",
      },
    });
  }

  // Create demo documents
  await prisma.document.create({
    data: {
      title: "Versicherungspolice KFZ",
      fileName: "police_kfz_2024.pdf",
      fileUrl: "/documents/police_kfz_2024.pdf",
      type: "policy",
      translatedUrl: "/documents/police_kfz_2024_hu.pdf",
      language: "de",
      userId: customer.id,
      contractId: contract1.id,
    },
  });

  await prisma.document.create({
    data: {
      title: "Rechnung Q1 2024",
      fileName: "rechnung_q1_2024.pdf",
      fileUrl: "/documents/rechnung_q1_2024.pdf",
      type: "invoice",
      translatedUrl: "/documents/rechnung_q1_2024_hu.pdf",
      language: "de",
      userId: customer.id,
    },
  });

  // Create demo chat messages
  await prisma.chatMessage.createMany({
    data: [
      {
        content: "Szia! Szeretném módosítani a KFZ biztosításomat. Lehetséges?",
        sender: "customer",
        userId: customer.id,
        read: true,
      },
      {
        content: "Szia János! Természetesen, milyen módosítást szeretnél? Szívesen segítek!",
        sender: "agent",
        userId: customer.id,
        read: true,
      },
      {
        content: "Szeretném a teljes kaskót részkaskóra változtatni.",
        sender: "customer",
        userId: customer.id,
        read: true,
      },
      {
        content: "Rendben, megvizsgálom a lehetőségeket és hamarosan küldök egy új ajánlatot. 😊",
        sender: "agent",
        userId: customer.id,
        read: false,
      },
    ],
  });

  // Create demo mileage reports
  await prisma.mileageReport.createMany({
    data: [
      { mileage: 45000, userId: customer.id, contractId: contract1.id, reportDate: new Date("2024-01-15") },
      { mileage: 48500, userId: customer.id, contractId: contract1.id, reportDate: new Date("2024-04-15") },
      { mileage: 52000, userId: customer.id, contractId: contract1.id, reportDate: new Date("2024-07-15") },
    ],
  });

  console.log("Seed data created successfully!");
  console.log("Admin login: admin@nb24.de / admin123");
  console.log("Agent login: agent@nb24.de / agent123");
  console.log("Customer login: teszt@example.com / customer123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
