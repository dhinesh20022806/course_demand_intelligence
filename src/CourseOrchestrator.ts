import prisma from "./lib/prisma";
import nodemailer from "nodemailer";

export class CourseSyncService {
  async syncCourse(courses: unknown) {
    await Promise.all(
      courses.map(async (course: NewCourseType) => {
        const resultCourse = await prisma.course.upsert({
          where: {
            courseUrl: course.courseUrl,
          },
          create: course,
          update: course,
        });

        await prisma.priceHistory.create({
          data: {
            courseId: resultCourse.id,
            price: resultCourse.price,
          },
        });
      }),
    );
  }
}

export class PriceAlertService {
  async sendPriceAlert() {
    const priceAlerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
      },
    });

    priceAlerts.forEach(async (priceAlert) => {
      const course = await prisma.course.findUnique({
        where: {
          id: priceAlert.courseId,
          price: {
            lte: priceAlert.price,
          },
        },
      });

      if (!course) {
        return;
      }

      const user = await prisma.users.findUnique({
        where: {
          id: priceAlert.userId,
        },
      });

      if (!user) {
        return;
      }

      const html = this.generateHtmlTemplate({
        username: user.name,
        courseTitle: course.title,
        courseUrl: course.courseUrl,
        email: user.email,
        price: course.price,
      });
      await this.sendEmail({ email: user.email, html });
    });

    // check wheather price meets condition to the course
    // should alert those users
    // html prepare
    // send to mailpit
  }

  private async sendEmail({ email, html }: { email: string; html: string }) {
    const transporter = nodemailer.createTransport({
      host: "mailpit", // or "mailpit" if running in Docker
      port: 1025,
      secure: false,
    });

    await transporter.sendMail({
      from: '"My App" <noreply@example.com>',
      to: email,
      subject: "Your Subject",
      html,
    });
  }

  private generateHtmlTemplate({
    username,
    email,
    courseTitle,
    courseUrl,
    price,
  }: {
    username: string;
    email: string;
    courseUrl: string;
    courseTitle: string;
    price: number;
  }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Course Price Alert</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#2563eb;padding:24px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;">Course Price Alert</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;color:#333;">
              <p>Hi <strong>${username}</strong>,</p>

              <p>
                The course you're tracking has a price update.
              </p>

              <table cellpadding="8" cellspacing="0" width="100%" style="margin:24px 0;border:1px solid #eee;border-collapse:collapse;">
                <tr>
                  <td><strong>Course</strong></td>
                  <td>${courseTitle}</td>
                </tr>
                <tr>
                  <td><strong>Current Price</strong></td>
                  <td>₹${price.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>${email}</td>
                </tr>
              </table>

              <p style="text-align:center;margin:30px 0;">
                <a
                  href="${courseUrl}"
                  style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;"
                >
                  View Course
                </a>
              </p>

              <p>
                Happy learning!
              </p>

              <p>
                Regards,<br />
                <strong>Your Course Tracker</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f8f8;padding:16px;text-align:center;color:#888;font-size:12px;">
              You're receiving this email because you subscribed to price alerts.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  }
}
