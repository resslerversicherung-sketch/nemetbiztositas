import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export function portalChangeEmail(userName: string, changeType: string, locale: string): EmailOptions {
  const subjects: Record<string, Record<string, string>> = {
    hu: {
      contract: "Szerződésmódosítás az ügyfélportálodon - NB24",
      mileage: "Kilométeróra bejelentés rögzítve - NB24",
      claim: "Kárbejelentés frissítve - NB24",
      document: "Új dokumentum elérhető - NB24",
      chat: "Új üzenet a chaten - NB24",
    },
    de: {
      contract: "Vertragsänderung in deinem Kundenportal - CV24",
      mileage: "Kilometerstand erfasst - CV24",
      claim: "Schadenmeldung aktualisiert - CV24",
      document: "Neues Dokument verfügbar - CV24",
      chat: "Neue Chat-Nachricht - CV24",
    },
    ro: {
      contract: "Modificare contract în portalul tău - AG24",
      mileage: "Kilometraj înregistrat - AG24",
      claim: "Raport daună actualizat - AG24",
      document: "Document nou disponibil - AG24",
      chat: "Mesaj nou în chat - AG24",
    },
  };

  const bodies: Record<string, Record<string, string>> = {
    hu: {
      contract: `<h2>Kedves ${userName}!</h2><p>A szerződésed módosítása megtörtént. Kérjük, lépj be az ügyfélportálra a részletekért.</p><p>Üdvözlettel,<br/>Német Biztosítás 24 csapata</p>`,
      mileage: `<h2>Kedves ${userName}!</h2><p>A kilométeróra bejelentésed sikeresen rögzítve lett.</p><p>Üdvözlettel,<br/>Német Biztosítás 24 csapata</p>`,
      claim: `<h2>Kedves ${userName}!</h2><p>A kárbejelentésed státusza frissült. Kérjük, lépj be az ügyfélportálra a részletekért.</p><p>Üdvözlettel,<br/>Német Biztosítás 24 csapata</p>`,
      document: `<h2>Kedves ${userName}!</h2><p>Új dokumentum érhető el az ügyfélportálodon. Kérjük, lépj be a megtekintéshez.</p><p>Üdvözlettel,<br/>Német Biztosítás 24 csapata</p>`,
      chat: `<h2>Kedves ${userName}!</h2><p>Új üzeneted érkezett a chaten. Kérjük, lépj be az ügyfélportálra a megtekintéshez.</p><p>Üdvözlettel,<br/>Német Biztosítás 24 csapata</p>`,
    },
    de: {
      contract: `<h2>Hallo ${userName}!</h2><p>Deine Vertragsänderung wurde durchgeführt. Bitte melde dich im Kundenportal an, um die Details zu sehen.</p><p>Viele Grüße,<br/>Dein Check Vroni 24 Team</p>`,
      mileage: `<h2>Hallo ${userName}!</h2><p>Dein Kilometerstand wurde erfolgreich erfasst.</p><p>Viele Grüße,<br/>Dein Check Vroni 24 Team</p>`,
      claim: `<h2>Hallo ${userName}!</h2><p>Der Status deiner Schadenmeldung wurde aktualisiert. Bitte melde dich im Kundenportal an.</p><p>Viele Grüße,<br/>Dein Check Vroni 24 Team</p>`,
      document: `<h2>Hallo ${userName}!</h2><p>Ein neues Dokument ist in deinem Kundenportal verfügbar.</p><p>Viele Grüße,<br/>Dein Check Vroni 24 Team</p>`,
      chat: `<h2>Hallo ${userName}!</h2><p>Du hast eine neue Chat-Nachricht erhalten. Bitte melde dich im Kundenportal an.</p><p>Viele Grüße,<br/>Dein Check Vroni 24 Team</p>`,
    },
    ro: {
      contract: `<h2>Bună ${userName}!</h2><p>Modificarea contractului tău a fost efectuată. Te rugăm să te autentifici în portal pentru detalii.</p><p>Cu stimă,<br/>Echipa Asigurări Germania 24</p>`,
      mileage: `<h2>Bună ${userName}!</h2><p>Kilometrajul tău a fost înregistrat cu succes.</p><p>Cu stimă,<br/>Echipa Asigurări Germania 24</p>`,
      claim: `<h2>Bună ${userName}!</h2><p>Statusul raportării de daune a fost actualizat. Te rugăm să te autentifici în portal.</p><p>Cu stimă,<br/>Echipa Asigurări Germania 24</p>`,
      document: `<h2>Bună ${userName}!</h2><p>Un document nou este disponibil în portalul tău.</p><p>Cu stimă,<br/>Echipa Asigurări Germania 24</p>`,
      chat: `<h2>Bună ${userName}!</h2><p>Ai primit un mesaj nou în chat. Te rugăm să te autentifici în portal.</p><p>Cu stimă,<br/>Echipa Asigurări Germania 24</p>`,
    },
  };

  const lang = locale in subjects ? locale : "hu";
  return {
    to: "",
    subject: subjects[lang][changeType] || subjects[lang].contract,
    html: bodies[lang][changeType] || bodies[lang].contract,
  };
}
