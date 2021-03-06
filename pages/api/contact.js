/* eslint-disable consistent-return */
import admin from 'firebase-admin';
import axios from 'axios';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.client_x509_cert_url,
    }),
  });
}

export default async (req, res) => {
  const SLACK_URL =
    'https://hooks.slack.com/services/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';

  try {
    // const token = req.headers['x-access-token'];
    // const decoded = await admin.auth().verifyIdToken(token);

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, error: 'Bad Request' });
    }

    const text = `문의자: 김문의\n문의내용: ${question}\n`;

    await axios.post(SLACK_URL, {
      text,
    });

    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      error: 'Permission Denied',
    });
  }
};
