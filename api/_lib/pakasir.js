import axios from 'axios';
import QRCode from 'qrcode';

const config = { slug: process.env.PAKASIR_SLUG, apiKey: process.env.PAKASIR_API_KEY };

export async function createPayment(amount) {
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const res = await axios.post("https://app.pakasir.com/api/transactioncreate/qris", { project: config.slug, order_id: orderId, amount, api_key: config.apiKey }, { headers: { "Content-Type": "application/json" } });
    const payment = res.data?.payment;
    if (!payment?.payment_number) throw new Error("QR Pakasir tidak ditemukan");
    const qrBase64 = await QRCode.toDataURL(payment.payment_number, { width: 300 });
    return { orderId, qrBase64, amount };
}

export async function cekPaid(orderId, amount) {
    const res = await axios.get("https://app.pakasir.com/api/transactiondetail", { params: { project: config.slug, order_id: orderId, amount, api_key: config.apiKey } });
    const status = res.data?.transaction?.status || res.data?.payment?.status || res.data?.status || "";
    return ["paid", "success", "completed"].includes(String(status).toLowerCase());
}

// Fitur Baru: Cancel Payment
export async function cancelPayment(orderId, amount) {
    const { slug, apiKey } = config;
    const url = "https://app.pakasir.com/api/transactioncancel";
    const res = await axios.post(url, { project: slug, api_key: apiKey, order_id: orderId, amount }, { headers: { "Content-Type": "application/json" } });
    return res.data;
}

// Fitur Baru: Simulate Payment (Testing)
export async function simulatePayment(orderId, amount) {
    const { slug, apiKey } = config;
    const url = "https://app.pakasir.com/api/paymentsimulation";
    try {
        const res = await axios.post(url, { project: slug, api_key: apiKey, order_id: orderId, amount }, { headers: { "Content-Type": "application/json" } });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Gagal simulasi Pakasir");
    }
}
