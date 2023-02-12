function generatePaymentMethod (currPayment) {
    const methods = [
        { key: "Crypto Wallet", label: "Crypto Wallet", selected: false },
        { key: "Credit Card", label: "Credit Card", selected: false },
        { key: "Debit Card", label: "Debit Card", selected: false },
        { key: "PayPal", label: "PayPal", selected: false },
    ];

    const result = methods.map(m => m.key === currPayment ? { ...m, selected: true} : m);
    return result;
}

module.exports = generatePaymentMethod;