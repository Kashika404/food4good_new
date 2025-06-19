import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 2. Email for when a user's account is approved
export const sendApprovalEmail = async (user) => {
    if (!user || !user.email) return;

    await transporter.sendMail({
        from: `"Food4Good" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your Food4Good Account has been Approved!',
        html: `
            <h1>Welcome, ${user.fullName}!</h1>
            <p>We are happy to inform you that your account on Food4Good has been approved by our admin team.</p>
            <p>You can now log in and start connecting. Thank you for joining our community!</p>
        `,
    });
};

// 3. Email for when a user's account is rejected
export const sendRejectionEmail = async (user) => {
    if (!user || !user.email) return;

    await transporter.sendMail({
        from: `"Food4Good" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Update on Your Food4Good Account Application',
        html: `
            <h1>Hello ${user.fullName},</h1>
            <p>Thank you for your interest in joining Food4Good. After reviewing your application, we are unable to approve your account at this time.</p>
            <p>If you believe this is an error, please contact our support team.</p>
        `,
    });
};

// 4. Email for the Donor when their donation is claimed
export const sendDonationClaimedEmail = async (donor, receiver, donation) => {
    if (!donor || !donor.email) return;

    const receiverName = receiver.roleDetails.organizationName || receiver.fullName;

    await transporter.sendMail({
        from: `"Food4Good" <${process.env.EMAIL_USER}>`,
        to: donor.email,
        subject: `Good News! Your donation "${donation.title}" has been claimed.`,
        html: `
            <h1>Hello ${donor.fullName},</h1>
            <p>Great news! Your donation of "<strong>${donation.title}</strong>" has been claimed by <strong>${receiverName}</strong>.</p>
            <p>A volunteer will be assigned shortly to coordinate the pickup. Thank you for your generosity!</p>
        `,
    });
};

// 5. Email for all parties when a donation is completed
export const sendDonationCompletedEmail = async (donor, receiver, volunteer, donation) => {
    const emails = [donor.email, receiver.email, volunteer.email].filter(Boolean);
    if (emails.length === 0) return;

    const receiverName = receiver.roleDetails.organizationName || receiver.fullName;

    await transporter.sendMail({
        from: `"Food4Good" <${process.env.EMAIL_USER}>`,
        to: emails.join(', '), // Send to all three users
        subject: `Donation Completed: "${donation.title}"`,
        html: `
            <h1>Donation Successfully Completed!</h1>
            <p>This is to confirm that the donation of "<strong>${donation.title}</strong>" from <strong>${donor.fullName}</strong> has been successfully delivered to <strong>${receiverName}</strong> by our volunteer, <strong>${volunteer.fullName}</strong>.</p>
            <p>Thank you all for making a difference in our community!</p>
        `,
    });
};